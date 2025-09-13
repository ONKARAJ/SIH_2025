import { NextRequest, NextResponse } from 'next/server';
import { festivalData, getSeasonalFestivals, getFestivalsByMonth, searchFestivals } from '@/lib/festival-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const season = searchParams.get('season');
    const month = searchParams.get('month');
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');

    let festivals = festivalData;

    // Apply filters
    if (season) {
      festivals = getSeasonalFestivals(season);
    }

    if (month) {
      festivals = getFestivalsByMonth(month);
    }

    if (search) {
      festivals = searchFestivals(search);
    }

    if (category) {
      festivals = festivals.filter(festival => festival.category === category);
    }

    // Pagination
    const startIndex = offset ? parseInt(offset) : 0;
    const endIndex = limit ? startIndex + parseInt(limit) : festivals.length;
    const paginatedFestivals = festivals.slice(startIndex, endIndex);

    return NextResponse.json({
      festivals: paginatedFestivals,
      total: festivals.length,
      page: Math.floor(startIndex / (limit ? parseInt(limit) : festivals.length)) + 1,
      totalPages: Math.ceil(festivals.length / (limit ? parseInt(limit) : festivals.length))
    });

  } catch (error) {
    console.error('Festivals API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch festivals data' },
      { status: 500 }
    );
  }
}

// GET specific festival by ID
export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Festival ID is required' },
        { status: 400 }
      );
    }

    const festival = festivalData.find(f => f.id === id);
    
    if (!festival) {
      return NextResponse.json(
        { error: 'Festival not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ festival });

  } catch (error) {
    console.error('Festival Detail API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch festival details' },
      { status: 500 }
    );
  }
}
