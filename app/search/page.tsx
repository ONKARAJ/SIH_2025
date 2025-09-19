'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  MapPin,
  Calendar,
  Building,
  Sparkles,
  Star,
  Filter,
  SortAsc,
  Grid,
  List,
  Search as SearchIcon
} from 'lucide-react';
import {
  searchItems,
  SearchItem,
  SearchResult,
  SearchFilters
} from '@/lib/search-data';
import EnhancedSearch from '@/components/search/enhanced-search';

function SearchResults() {
  const searchParams = useSearchParams();
  const [searchResult, setSearchResult] = useState<SearchResult>({ items: [], total: 0, categories: {}, locations: {} });
  const [filters, setFilters] = useState<SearchFilters>({});
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'name'>('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  const query = searchParams.get('q') || '';
  const itemsPerPage = 12;

  // Perform search
  useEffect(() => {
    setIsLoading(true);
    const result = searchItems(query, filters, 100); // Get more results for pagination
    
    // Sort results
    let sortedItems = [...result.items];
    switch (sortBy) {
      case 'rating':
        sortedItems.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'name':
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      // 'relevance' is already handled by the search function
    }
    
    setSearchResult({ ...result, items: sortedItems });
    setIsLoading(false);
    setCurrentPage(1);
  }, [query, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(searchResult.total / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = searchResult.items.slice(startIndex, endIndex);

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'place': return <MapPin className="h-4 w-4 text-green-600" />;
      case 'festival': return <Calendar className="h-4 w-4 text-orange-600" />;
      case 'city': return <Building className="h-4 w-4 text-blue-600" />;
      default: return <Sparkles className="h-4 w-4 text-purple-600" />;
    }
  };

  const getItemTypeColor = (type: string) => {
    switch (type) {
      case 'place': return 'bg-green-100 text-green-700';
      case 'festival': return 'bg-orange-100 text-orange-700';
      case 'city': return 'bg-blue-100 text-blue-700';
      default: return 'bg-purple-100 text-purple-700';
    }
  };

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'all' ? undefined : value
    }));
  };

  if (!query) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center">
            <SearchIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Search Jharkhand</h1>
            <p className="text-gray-600 mb-8">
              Discover amazing places, festivals, cities, and cultural heritage sites
            </p>
            <div className="max-w-md mx-auto">
              <EnhancedSearch autoFocus showPopular />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Search Results for "{query}"
            </h1>
            {!isLoading && (
              <p className="text-green-100 text-lg">
                Found {searchResult.total} results
              </p>
            )}
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <EnhancedSearch 
              placeholder="Search destinations, festivals, cities..."
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Filters:</span>
                </div>
                
                <Select value={filters.type || 'all'} onValueChange={(value) => handleFilterChange('type', value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="place">Places</SelectItem>
                    <SelectItem value="festival">Festivals</SelectItem>
                    <SelectItem value="city">Cities</SelectItem>
                  </SelectContent>
                </Select>

                {Object.keys(searchResult.categories).length > 0 && (
                  <Select value={filters.category || 'all'} onValueChange={(value) => handleFilterChange('category', value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {Object.keys(searchResult.categories).map(category => (
                        <SelectItem key={category} value={category}>
                          {category} ({searchResult.categories[category]})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {Object.keys(searchResult.locations).length > 0 && (
                  <Select value={filters.location || 'all'} onValueChange={(value) => handleFilterChange('location', value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {Object.keys(searchResult.locations).map(location => (
                        <SelectItem key={location} value={location}>
                          {location} ({searchResult.locations[location]})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <SortAsc className="h-4 w-4 text-gray-500" />
                  <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-1 border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="h-8 w-8 p-0"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="h-8 w-8 p-0"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin h-8 w-8 border-2 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Searching...</p>
            </div>
          )}

          {/* No Results */}
          {!isLoading && searchResult.total === 0 && (
            <div className="text-center py-12">
              <SearchIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No results found</h2>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters
              </p>
            </div>
          )}

          {/* Results Grid */}
          {!isLoading && currentItems.length > 0 && (
            <>
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {currentItems.map((item) => (
                  <Card key={`${item.type}-${item.id}`} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge className={`${getItemTypeColor(item.type)} mb-2`}>
                          {item.type}
                        </Badge>
                        <h3 className="text-white font-bold text-lg">{item.name}</h3>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {item.shortDescription || item.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="truncate">{item.location}</span>
                        </div>
                        {item.rating && (
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-500" />
                            <span>{item.rating}</span>
                          </div>
                        )}
                      </div>
                      
                      <Link href={item.url}>
                        <Button className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? 'default' : 'outline'}
                          onClick={() => setCurrentPage(page)}
                          className="w-10"
                        >
                          {page}
                        </Button>
                      );
                    })}
                    
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-green-500 border-t-transparent rounded-full"></div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}