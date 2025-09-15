import { NextRequest, NextResponse } from 'next/server';
import { trainsToJharkhand, searchTrains, getTrainsByDestination, getTrainsBySource, getFeaturedTrains } from '@/data/trains-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const source = searchParams.get('source');
    const destination = searchParams.get('destination');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    let trains = trainsToJharkhand;

    // Apply filters
    if (search) {
      trains = searchTrains(search);
    } else if (source && destination) {
      trains = trains.filter(train => 
        train.departure.toLowerCase().includes(source.toLowerCase()) &&
        train.arrival.toLowerCase().includes(destination.toLowerCase())
      );
    } else if (source) {
      trains = getTrainsBySource(source);
    } else if (destination) {
      trains = getTrainsByDestination(destination);
    } else if (featured === 'true') {
      trains = getFeaturedTrains();
    }

    // Apply limit if specified
    if (limit) {
      const limitNum = parseInt(limit);
      trains = trains.slice(0, limitNum);
    }

    // Only return active trains
    trains = trains.filter(train => train.isActive);

    return NextResponse.json({
      success: true,
      data: trains,
      total: trains.length,
      message: `Found ${trains.length} trains`
    });

  } catch (error) {
    console.error('Train search error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search trains' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { source, destination, travelDate, passengers, trainClass } = body;

    let trains = trainsToJharkhand;

    // Filter by source and destination if provided
    if (source && destination) {
      trains = trains.filter(train => 
        train.departure.toLowerCase().includes(source.toLowerCase()) &&
        train.arrival.toLowerCase().includes(destination.toLowerCase())
      );
    }

    // Filter by available class
    if (trainClass) {
      trains = trains.filter(train => train.classes.includes(trainClass));
    }

    // Check seat availability (simplified logic)
    if (passengers) {
      trains = trains.filter(train => train.availableSeats >= passengers);
    }

    // Only return active trains
    trains = trains.filter(train => train.isActive);

    // Sort by price (lowest first)
    trains = trains.sort((a, b) => a.basePrice - b.basePrice);

    return NextResponse.json({
      success: true,
      data: trains,
      total: trains.length,
      searchCriteria: {
        source,
        destination,
        travelDate,
        passengers,
        trainClass
      }
    });

  } catch (error) {
    console.error('Train search POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search trains' },
      { status: 500 }
    );
  }
}
