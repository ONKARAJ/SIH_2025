import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const originLat = searchParams.get('origin_lat');
  const originLng = searchParams.get('origin_lng');
  const destLat = searchParams.get('dest_lat');
  const destLng = searchParams.get('dest_lng');
  const travelMode = searchParams.get('travel_mode') || 'DRIVING';

  if (!originLat || !originLng || !destLat || !destLng) {
    return NextResponse.json(
      { error: 'Origin and destination coordinates are required' },
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
    const origin = `${originLat},${originLng}`;
    const destination = `${destLat},${destLng}`;
    
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=${travelMode.toLowerCase()}&units=metric&key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status !== 'OK') {
      return NextResponse.json(
        { error: `Directions API error: ${data.status}` },
        { status: 400 }
      );
    }

    if (!data.routes || data.routes.length === 0) {
      return NextResponse.json(
        { error: 'No routes found' },
        { status: 404 }
      );
    }

    const route = data.routes[0];
    const leg = route.legs[0];

    const directionsInfo = {
      distance: leg.distance.text,
      duration: leg.duration.text,
      steps: leg.steps.map((step: any) => ({
        instruction: step.html_instructions.replace(/<[^>]*>/g, ''), // Remove HTML tags
        distance: step.distance.text,
        duration: step.duration.text,
        maneuver: step.maneuver || null
      })),
      polylinePoints: route.overview_polyline.points,
      bounds: {
        northeast: route.bounds.northeast,
        southwest: route.bounds.southwest
      },
      travelMode: travelMode,
      warnings: route.warnings || [],
      copyrights: route.copyrights || []
    };

    return NextResponse.json({
      success: true,
      directions: directionsInfo
    });

  } catch (error) {
    console.error('Error fetching directions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch directions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { origin, destination, travelMode = 'DRIVING', waypoints = [] } = body;

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

    let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=${travelMode.toLowerCase()}&units=metric&key=${apiKey}`;
    
    // Add waypoints if provided
    if (waypoints.length > 0) {
      const waypointsStr = waypoints.map((wp: string) => encodeURIComponent(wp)).join('|');
      url += `&waypoints=${waypointsStr}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status !== 'OK') {
      return NextResponse.json(
        { error: `Directions API error: ${data.status}` },
        { status: 400 }
      );
    }

    if (!data.routes || data.routes.length === 0) {
      return NextResponse.json(
        { error: 'No routes found' },
        { status: 404 }
      );
    }

    const processedRoutes = data.routes.map((route: any) => ({
      bounds: route.bounds,
      copyrights: route.copyrights,
      legs: route.legs.map((leg: any) => ({
        distance: leg.distance,
        duration: leg.duration,
        endAddress: leg.end_address,
        startAddress: leg.start_address,
        steps: leg.steps.map((step: any) => ({
          instruction: step.html_instructions.replace(/<[^>]*>/g, ''),
          distance: step.distance,
          duration: step.duration,
          startLocation: step.start_location,
          endLocation: step.end_location,
          maneuver: step.maneuver || null,
          polylinePoints: step.polyline.points
        }))
      })),
      overviewPolyline: route.overview_polyline.points,
      summary: route.summary,
      warnings: route.warnings || [],
      waypointOrder: route.waypoint_order || []
    }));

    return NextResponse.json({
      success: true,
      routes: processedRoutes,
      status: data.status
    });

  } catch (error) {
    console.error('Error processing directions request:', error);
    return NextResponse.json(
      { error: 'Failed to process directions request' },
      { status: 500 }
    );
  }
}