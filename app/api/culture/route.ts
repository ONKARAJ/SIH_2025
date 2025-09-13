import { NextRequest, NextResponse } from 'next/server';
import { culturalData, getCulturalElementsByType } from '@/lib/festival-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const tribe = searchParams.get('tribe');
    const region = searchParams.get('region');
    const search = searchParams.get('search');
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');

    let elements = culturalData;

    // Apply filters
    if (type) {
      elements = getCulturalElementsByType(type);
    }

    if (tribe) {
      elements = elements.filter(element => element.tribe?.toLowerCase().includes(tribe.toLowerCase()));
    }

    if (region) {
      elements = elements.filter(element => element.region.toLowerCase().includes(region.toLowerCase()));
    }

    if (search) {
      const lowercaseQuery = search.toLowerCase();
      elements = elements.filter(element => 
        element.name.toLowerCase().includes(lowercaseQuery) ||
        element.nameLocal.includes(lowercaseQuery) ||
        element.description.toLowerCase().includes(lowercaseQuery) ||
        element.region.toLowerCase().includes(lowercaseQuery)
      );
    }

    // Pagination
    const startIndex = offset ? parseInt(offset) : 0;
    const endIndex = limit ? startIndex + parseInt(limit) : elements.length;
    const paginatedElements = elements.slice(startIndex, endIndex);

    return NextResponse.json({
      elements: paginatedElements,
      total: elements.length,
      page: Math.floor(startIndex / (limit ? parseInt(limit) : elements.length)) + 1,
      totalPages: Math.ceil(elements.length / (limit ? parseInt(limit) : elements.length))
    });

  } catch (error) {
    console.error('Culture API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cultural data' },
      { status: 500 }
    );
  }
}

// GET specific cultural element by ID
export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Cultural element ID is required' },
        { status: 400 }
      );
    }

    const element = culturalData.find(e => e.id === id);
    
    if (!element) {
      return NextResponse.json(
        { error: 'Cultural element not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ element });

  } catch (error) {
    console.error('Cultural Element Detail API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cultural element details' },
      { status: 500 }
    );
  }
}
