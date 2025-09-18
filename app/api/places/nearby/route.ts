import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const type = searchParams.get('type') || 'tourist_attraction';
  const radius = searchParams.get('radius') || '10000';

  if (!lat || !lng) {
    return NextResponse.json(
      { error: 'Latitude and longitude are required' },
      { status: 400 }
    );
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Google Maps API key not configured' },
      { status: 500 }
    );
  }

  try {
    let types: string[] = [];
    
    // Map our categories to Google Places types
    switch (type) {
      case 'tourist_attraction':
        types = ['tourist_attraction', 'museum', 'park', 'zoo'];
        break;
      case 'gas_station':
        types = ['gas_station'];
        break;
      case 'restaurant':
        types = ['restaurant', 'food', 'meal_takeaway'];
        break;
      case 'hospital':
        types = ['hospital', 'pharmacy'];
        break;
      case 'police':
        types = ['police'];
        break;
      default:
        types = ['tourist_attraction', 'gas_station', 'restaurant', 'hospital', 'police'];
    }

    const allPlaces = [];
    
    // Fetch places for each type
    for (const placeType of types) {
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${placeType}&key=${apiKey}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status === 'OK' && data.results) {
        const placesWithType = data.results.map((place: any) => ({
          ...place,
          searchType: placeType
        }));
        allPlaces.push(...placesWithType);
      }
    }

    // Process and format the results
    const processedPlaces = allPlaces
      .filter(place => place.place_id && place.name) // Ensure place has valid data
      .map(place => ({
        id: place.place_id,
        name: place.name,
        type: mapGoogleTypeToOurType(place.searchType),
        coordinates: {
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng
        },
        rating: place.rating,
        priceLevel: place.price_level,
        openNow: place.opening_hours?.open_now,
        vicinity: place.vicinity,
        photoReference: place.photos?.[0]?.photo_reference,
        distance: calculateDistance(
          { lat: parseFloat(lat), lng: parseFloat(lng) },
          { lat: place.geometry.location.lat, lng: place.geometry.location.lng }
        )
      }))
      .sort((a, b) => (a.distance || 0) - (b.distance || 0)) // Sort by distance
      .slice(0, 20); // Limit to top 20 results

    return NextResponse.json({
      success: true,
      places: processedPlaces,
      total: processedPlaces.length
    });

  } catch (error) {
    console.error('Error fetching nearby places:', error);
    return NextResponse.json(
      { error: 'Failed to fetch nearby places' },
      { status: 500 }
    );
  }
}

// Helper function to map Google Places types to our simplified types
function mapGoogleTypeToOurType(googleType: string): string {
  const typeMap: { [key: string]: string } = {
    'tourist_attraction': 'tourist_attraction',
    'museum': 'tourist_attraction',
    'park': 'tourist_attraction',
    'zoo': 'tourist_attraction',
    'gas_station': 'gas_station',
    'restaurant': 'restaurant',
    'food': 'restaurant',
    'meal_takeaway': 'restaurant',
    'hospital': 'hospital',
    'pharmacy': 'hospital',
    'police': 'police'
  };

  return typeMap[googleType] || 'tourist_attraction';
}

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(coord1: { lat: number; lng: number }, coord2: { lat: number; lng: number }): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = coord1.lat * Math.PI / 180;
  const φ2 = coord2.lat * Math.PI / 180;
  const Δφ = (coord2.lat - coord1.lat) * Math.PI / 180;
  const Δλ = (coord2.lng - coord1.lng) * Math.PI / 180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c; // Distance in meters
}