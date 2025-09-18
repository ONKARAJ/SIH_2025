import { NextRequest, NextResponse } from 'next/server';
import { busesData, searchBuses, getBusesByRoute, getBusesBySource, getBusesByDestination, getFeaturedBuses } from '@/data/buses-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const source = searchParams.get('source');
    const destination = searchParams.get('destination');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');
    const busType = searchParams.get('busType');

    let buses = busesData;

    // Apply filters
    if (search) {
      buses = searchBuses(search);
    } else if (source && destination) {
      buses = getBusesByRoute(source, destination);
    } else if (source) {
      buses = getBusesBySource(source);
    } else if (destination) {
      buses = getBusesByDestination(destination);
    } else if (featured === 'true') {
      buses = getFeaturedBuses();
    }

    // Filter by bus type if specified
    if (busType && busType !== 'All') {
      buses = buses.filter(bus => bus.busType === busType);
    }

    // Apply limit if specified
    if (limit) {
      const limitNum = parseInt(limit);
      buses = buses.slice(0, limitNum);
    }

    // Only return active buses
    buses = buses.filter(bus => bus.isActive);

    return NextResponse.json({
      success: true,
      data: buses,
      total: buses.length,
      message: `Found ${buses.length} buses`
    });

  } catch (error) {
    console.error('Bus search error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search buses' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { source, destination, travelDate, passengers, busType } = body;

    let buses = busesData;

    // Filter by source and destination if provided
    if (source && destination) {
      buses = getBusesByRoute(source, destination);
    } else if (source) {
      buses = getBusesBySource(source);
    } else if (destination) {
      buses = getBusesByDestination(destination);
    }

    // Filter by bus type
    if (busType && busType !== 'All') {
      buses = buses.filter(bus => bus.busType === busType);
    }

    // Check seat availability (simplified logic)
    if (passengers) {
      buses = buses.filter(bus => bus.availableSeats >= passengers);
    }

    // Only return active buses
    buses = buses.filter(bus => bus.isActive);

    // Sort by price (lowest first)
    buses = buses.sort((a, b) => a.basePrice - b.basePrice);

    return NextResponse.json({
      success: true,
      data: buses,
      total: buses.length,
      searchCriteria: {
        source,
        destination,
        travelDate,
        passengers,
        busType
      }
    });

  } catch (error) {
    console.error('Bus search POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search buses' },
      { status: 500 }
    );
  }
}
