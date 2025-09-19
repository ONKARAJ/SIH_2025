import { allPlaces } from '@/data/places-data';
import { festivalData } from '@/lib/festival-data';
import { citiesData } from '@/lib/cities-data';

export interface SearchItem {
  id: string;
  type: 'place' | 'festival' | 'city' | 'cultural-heritage';
  name: string;
  description: string;
  shortDescription?: string;
  image: string;
  location: string;
  category: string;
  rating?: number;
  keywords: string[];
  url: string;
}

export interface SearchFilters {
  type?: 'all' | 'place' | 'festival' | 'city' | 'cultural-heritage';
  category?: string;
  location?: string;
  rating?: number;
}

export interface SearchResult {
  items: SearchItem[];
  total: number;
  categories: Record<string, number>;
  locations: Record<string, number>;
}

// Convert places data to search items
const placesSearchItems: SearchItem[] = allPlaces.map(place => ({
  id: place.id,
  type: 'place' as const,
  name: place.title,
  description: place.overview,
  shortDescription: place.shortDescription,
  image: place.image,
  location: place.location,
  category: place.category,
  rating: place.rating,
  keywords: [
    place.title.toLowerCase(),
    place.category.toLowerCase(),
    place.location.toLowerCase(),
    ...place.attractions.map(a => a.toLowerCase()),
    place.shortDescription.toLowerCase(),
    place.overview.toLowerCase(),
    place.bestTimeToVisit.toLowerCase()
  ],
  url: `/places/${place.id}`
}));

// Convert festivals data to search items
const festivalsSearchItems: SearchItem[] = festivalData.map(festival => ({
  id: festival.id,
  type: 'festival' as const,
  name: festival.name,
  description: festival.description.detailed,
  shortDescription: festival.description.short,
  image: festival.media.hero,
  location: festival.location.primary,
  category: festival.category,
  keywords: [
    festival.name.toLowerCase(),
    festival.nameLocal.toLowerCase(),
    festival.category.toLowerCase(),
    festival.season.toLowerCase(),
    festival.location.primary.toLowerCase(),
    ...festival.location.districts.map(d => d.toLowerCase()),
    ...festival.months.map(m => m.toLowerCase()),
    festival.description.short.toLowerCase(),
    festival.description.detailed.toLowerCase(),
    festival.description.significance.toLowerCase(),
    ...festival.traditions.music.map(m => m.toLowerCase()),
    ...festival.traditions.dance.map(d => d.toLowerCase()),
    ...festival.traditions.food.map(f => f.toLowerCase())
  ],
  url: `/festivals/${festival.id}`
}));

// Convert cities data to search items
const citiesSearchItems: SearchItem[] = citiesData.map(city => ({
  id: city.id,
  type: 'city' as const,
  name: city.name,
  description: city.longDescription,
  shortDescription: city.description,
  image: city.images.hero,
  location: city.district + ', Jharkhand',
  category: 'City',
  keywords: [
    city.name.toLowerCase(),
    city.description.toLowerCase(),
    city.longDescription.toLowerCase(),
    city.district.toLowerCase(),
    ...city.highlights.map(h => h.toLowerCase()),
    ...city.attractions.map(a => a.name.toLowerCase()),
    ...city.specialties.map(s => s.toLowerCase()),
    city.climate.toLowerCase(),
    city.bestTimeToVisit.toLowerCase()
  ],
  url: `/cities/${city.id}`
}));

// Combine all search items
export const allSearchItems: SearchItem[] = [
  ...placesSearchItems,
  ...festivalsSearchItems,
  ...citiesSearchItems
];

// Search function
export function searchItems(
  query: string,
  filters: SearchFilters = {},
  limit = 50
): SearchResult {
  let filteredItems = allSearchItems;

  // Apply type filter
  if (filters.type && filters.type !== 'all') {
    filteredItems = filteredItems.filter(item => item.type === filters.type);
  }

  // Apply category filter
  if (filters.category) {
    filteredItems = filteredItems.filter(item => 
      item.category.toLowerCase() === filters.category?.toLowerCase()
    );
  }

  // Apply location filter
  if (filters.location) {
    filteredItems = filteredItems.filter(item =>
      item.location.toLowerCase().includes(filters.location!.toLowerCase())
    );
  }

  // Apply rating filter
  if (filters.rating) {
    filteredItems = filteredItems.filter(item =>
      item.rating && item.rating >= filters.rating!
    );
  }

  // Apply search query
  if (query.trim()) {
    const searchTerms = query.toLowerCase().trim().split(' ');
    filteredItems = filteredItems.filter(item =>
      searchTerms.every(term =>
        item.keywords.some(keyword => keyword.includes(term))
      )
    ).sort((a, b) => {
      // Sort by relevance - exact name matches first, then partial matches
      const aExactMatch = a.name.toLowerCase().includes(query.toLowerCase());
      const bExactMatch = b.name.toLowerCase().includes(query.toLowerCase());
      
      if (aExactMatch && !bExactMatch) return -1;
      if (!aExactMatch && bExactMatch) return 1;
      
      // Then by rating if available
      if (a.rating && b.rating) return b.rating - a.rating;
      
      return 0;
    });
  }

  // Apply limit
  const limitedItems = filteredItems.slice(0, limit);

  // Generate category and location counts
  const categories: Record<string, number> = {};
  const locations: Record<string, number> = {};

  filteredItems.forEach(item => {
    categories[item.category] = (categories[item.category] || 0) + 1;
    const locationKey = item.location.split(',')[0].trim();
    locations[locationKey] = (locations[locationKey] || 0) + 1;
  });

  return {
    items: limitedItems,
    total: filteredItems.length,
    categories,
    locations
  };
}

// Get search suggestions
export function getSearchSuggestions(query: string, limit = 8): SearchItem[] {
  if (!query.trim()) return [];
  
  const suggestions = allSearchItems
    .filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.location.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => {
      // Prioritize exact name matches
      const aNameMatch = a.name.toLowerCase().startsWith(query.toLowerCase());
      const bNameMatch = b.name.toLowerCase().startsWith(query.toLowerCase());
      
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      
      return 0;
    })
    .slice(0, limit);
    
  return suggestions;
}

// Get popular searches (can be enhanced with analytics later)
export function getPopularSearches(): string[] {
  return [
    'Hundru Falls',
    'Sarhul Festival',
    'Ranchi',
    'Netarhat',
    'Baidyanath Temple',
    'Betla National Park',
    'Jamshedpur',
    'Sohrai Festival',
    'Parasnath Hills',
    'Dassam Falls'
  ];
}

// Get items by category
export function getItemsByCategory(category: string, limit = 12): SearchItem[] {
  return allSearchItems
    .filter(item => item.category.toLowerCase() === category.toLowerCase())
    .sort((a, b) => {
      if (a.rating && b.rating) return b.rating - a.rating;
      return 0;
    })
    .slice(0, limit);
}

// Get related items
export function getRelatedItems(currentItem: SearchItem, limit = 6): SearchItem[] {
  return allSearchItems
    .filter(item => 
      item.id !== currentItem.id && (
        item.category === currentItem.category ||
        item.location.includes(currentItem.location.split(',')[0]) ||
        item.type === currentItem.type
      )
    )
    .sort((a, b) => {
      // Prioritize same category and location
      const aScore = 
        (a.category === currentItem.category ? 2 : 0) +
        (a.location.includes(currentItem.location.split(',')[0]) ? 1 : 0);
      const bScore = 
        (b.category === currentItem.category ? 2 : 0) +
        (b.location.includes(currentItem.location.split(',')[0]) ? 1 : 0);
        
      if (aScore !== bScore) return bScore - aScore;
      
      if (a.rating && b.rating) return b.rating - a.rating;
      return 0;
    })
    .slice(0, limit);
}