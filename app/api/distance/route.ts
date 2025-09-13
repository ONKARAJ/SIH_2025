import { NextRequest, NextResponse } from 'next/server';

interface DistanceMatrixResponse {
  rows: Array<{
    elements: Array<{
      distance: {
        text: string;
        value: number;
      };
      duration: {
        text: string;
        value: number;
      };
      status: string;
    }>;
  }>;
  status: string;
}

export async function POST(request: NextRequest) {
  try {
    const { origin, destination } = await request.json();

    if (!origin || !destination) {
      return NextResponse.json(
        { error: 'Origin and destination are required' },
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

    // Clean and prepare the location names
    const cleanOrigin = encodeURIComponent(origin.trim());
    const cleanDestination = encodeURIComponent(destination.trim());

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${cleanOrigin}&destinations=${cleanDestination}&units=metric&mode=driving&key=${apiKey}`;

    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('Google Maps API Error:', response.statusText);
      return NextResponse.json(
        { error: 'Failed to fetch distance data' },
        { status: 500 }
      );
    }

    const data: DistanceMatrixResponse = await response.json();

    if (data.status !== 'OK') {
      console.error('Distance Matrix API Error:', data.status);
      return NextResponse.json(
        { error: `Distance calculation failed: ${data.status}` },
        { status: 500 }
      );
    }

    const element = data.rows[0]?.elements[0];

    if (!element || element.status !== 'OK') {
      return NextResponse.json(
        { error: 'Could not calculate distance between these locations' },
        { status: 404 }
      );
    }

    // Format the response
    const result = {
      origin: origin,
      destination: destination,
      distance: {
        text: element.distance.text,
        kilometers: Math.round(element.distance.value / 1000),
      },
      duration: {
        text: element.duration.text,
        minutes: Math.round(element.duration.value / 60),
        hours: Math.round(element.duration.value / 3600 * 10) / 10, // Round to 1 decimal
      },
      travelMode: 'driving',
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('Distance API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error while calculating distance' },
      { status: 500 }
    );
  }
}

// GET endpoint for simple distance queries via URL params
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');

  if (!origin || !destination) {
    return NextResponse.json(
      { error: 'Origin and destination query parameters are required' },
      { status: 400 }
    );
  }

  // Use the same logic as POST
  const postRequest = new Request(request.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ origin, destination }),
  });

  return POST(postRequest as NextRequest);
}
