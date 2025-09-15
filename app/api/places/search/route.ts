import { NextRequest, NextResponse } from 'next/server';
import { allPlaces } from '@/data/places-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase() || '';
    const category = searchParams.get('category') || 'All';
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');

    // Filter places based on search query
    let filteredPlaces = allPlaces.filter((place) => {
      const matchesSearch = query === '' || 
        place.title.toLowerCase().includes(query) ||
        place.shortDescription.toLowerCase().includes(query) ||
        place.location.toLowerCase().includes(query) ||
        place.category.toLowerCase().includes(query) ||
        place.overview.toLowerCase().includes(query) ||
        place.attractions.some(attraction => 
          attraction.toLowerCase().includes(query)
        ) ||
        place.reviews.some(review => 
          review.comment.toLowerCase().includes(query)
        );

      const matchesCategory = category === 'All' || place.category === category;
      
      return matchesSearch && matchesCategory;
    });

    // Sort by relevance (title matches first, then description matches)
    if (query) {
      filteredPlaces.sort((a, b) => {
        const aTitle = a.title.toLowerCase().includes(query) ? 1 : 0;
        const bTitle = b.title.toLowerCase().includes(query) ? 1 : 0;
        if (aTitle !== bTitle) return bTitle - aTitle;
        
        const aCategory = a.category.toLowerCase().includes(query) ? 1 : 0;
        const bCategory = b.category.toLowerCase().includes(query) ? 1 : 0;
        if (aCategory !== bCategory) return bCategory - aCategory;

        return b.rating - a.rating; // Higher rated places first
      });
    } else {
      // Default sort by rating
      filteredPlaces.sort((a, b) => b.rating - a.rating);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPlaces = filteredPlaces.slice(startIndex, endIndex);

    // Get categories and their counts
    const categories = Array.from(new Set(allPlaces.map(place => place.category))).sort();
    const categoryStats = categories.map(cat => ({
      name: cat,
      count: allPlaces.filter(place => place.category === cat).length
    }));

    // Search suggestions based on common terms
    const suggestions = [
      'waterfalls', 'temples', 'wildlife', 'hills', 'heritage', 
      'Ranchi', 'Deoghar', 'Jamshedpur', 'nature', 'trekking',
      'spiritual', 'adventure', 'photography', 'family', 'peaceful'
    ];

    const response = {
      places: paginatedPlaces,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredPlaces.length / limit),
        totalItems: filteredPlaces.length,
        itemsPerPage: limit,
        hasNextPage: endIndex < filteredPlaces.length,
        hasPrevPage: page > 1
      },
      filters: {
        categories: categoryStats,
        appliedCategory: category,
        appliedQuery: query
      },
      suggestions: suggestions.filter(s => 
        s.toLowerCase().includes(query) && s.toLowerCase() !== query
      ).slice(0, 5),
      stats: {
        totalPlaces: allPlaces.length,
        averageRating: (allPlaces.reduce((sum, place) => sum + place.rating, 0) / allPlaces.length).toFixed(1),
        topCategory: categoryStats.reduce((prev, current) => 
          (prev.count > current.count) ? prev : current
        ).name
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Places search API error:', error);
    return NextResponse.json(
      { error: 'Failed to search places' },
      { status: 500 }
    );
  }
}

// Get popular search terms
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { searchTerm } = body;

    // In a real app, you'd save search analytics to database
    // For now, return popular searches based on place data
    const popularSearches = [
      { term: 'waterfall', count: 4 },
      { term: 'temple', count: 3 },
      { term: 'hill station', count: 2 },
      { term: 'wildlife', count: 2 },
      { term: 'Ranchi', count: 6 },
      { term: 'nature', count: 8 }
    ];

    return NextResponse.json({ popularSearches });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to log search' },
      { status: 500 }
    );
  }
}
