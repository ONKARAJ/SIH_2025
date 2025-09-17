import { NextRequest, NextResponse } from 'next/server';
import { allPlaces } from '@/data/places-data';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const placeId = params.id;
    
    if (!placeId) {
      return NextResponse.json(
        { error: 'Place ID is required' },
        { status: 400 }
      );
    }

    const place = allPlaces.find(p => p.id === placeId);
    
    if (!place) {
      return NextResponse.json(
        { error: 'Place not found' },
        { status: 404 }
      );
    }

    // Get related places in the same category
    const relatedPlaces = allPlaces
      .filter(p => p.category === place.category && p.id !== place.id)
      .slice(0, 6);

    const response = {
      place,
      relatedPlaces,
      category: place.category,
      location: place.location
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Place details API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch place details' },
      { status: 500 }
    );
  }
}
