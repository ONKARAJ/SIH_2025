'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, MapPin, Calendar, Building, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  getSearchSuggestions,
  getPopularSearches,
  SearchItem,
  searchItems
} from '@/lib/search-data';

interface EnhancedSearchProps {
  placeholder?: string;
  className?: string;
  showPopular?: boolean;
  autoFocus?: boolean;
  onSelect?: (item: SearchItem) => void;
}

export default function EnhancedSearch({
  placeholder = "Search destinations, festivals, cities...",
  className = "",
  showPopular = true,
  autoFocus = false,
  onSelect
}: EnhancedSearchProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchItem[]>([]);
  const [popularSearches, setPopularSearches] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load popular searches
  useEffect(() => {
    setPopularSearches(getPopularSearches());
  }, []);

  // Handle search suggestions
  useEffect(() => {
    if (query.trim()) {
      setIsLoading(true);
      const debounceTimer = setTimeout(() => {
        const searchSuggestions = getSearchSuggestions(query, 8);
        setSuggestions(searchSuggestions);
        setIsLoading(false);
        setSelectedIndex(-1);
      }, 300);
      
      return () => clearTimeout(debounceTimer);
    } else {
      setSuggestions([]);
      setIsLoading(false);
    }
  }, [query]);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    const items = query.trim() ? suggestions : [];
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < items.length - 1 ? prev + 1 : prev
        );
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > -1 ? prev - 1 : prev);
        break;
        
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && items[selectedIndex]) {
          handleSelectItem(items[selectedIndex]);
        } else if (query.trim()) {
          handleSearch();
        }
        break;
        
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSelectItem = (item: SearchItem) => {
    setQuery(item.name);
    setIsOpen(false);
    setSelectedIndex(-1);
    
    if (onSelect) {
      onSelect(item);
    } else {
      router.push(item.url);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      const encodedQuery = encodeURIComponent(query.trim());
      router.push(`/search?q=${encodedQuery}`);
      setIsOpen(false);
    }
  };

  const handlePopularClick = (searchTerm: string) => {
    setQuery(searchTerm);
    const encodedQuery = encodeURIComponent(searchTerm);
    router.push(`/search?q=${encodedQuery}`);
    setIsOpen(false);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

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

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          autoFocus={autoFocus}
          aria-label="Search"
          autoComplete="off"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
          >
            <X className="h-4 w-4 text-gray-400" />
          </Button>
        )}
      </div>

      {/* Search Dropdown */}
      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 shadow-xl border z-50 max-h-96 overflow-hidden">
          <CardContent className="p-0">
            {/* Loading State */}
            {isLoading && (
              <div className="p-4 text-center text-gray-500">
                <div className="animate-spin h-5 w-5 border-2 border-green-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                Searching...
              </div>
            )}

            {/* Search Results */}
            {!isLoading && query.trim() && suggestions.length > 0 && (
              <div className="max-h-80 overflow-y-auto">
                <div className="p-2 border-b bg-gray-50 text-xs font-medium text-gray-600">
                  Search Results
                </div>
                {suggestions.map((item, index) => (
                  <button
                    key={`${item.type}-${item.id}`}
                    onClick={() => handleSelectItem(item)}
                    className={`w-full text-left p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                      index === selectedIndex ? 'bg-green-50 border-green-200' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getItemIcon(item.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-900 truncate">
                            {item.name}
                          </h4>
                          <Badge className={`text-xs ${getItemTypeColor(item.type)}`}>
                            {item.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 truncate mb-1">
                          {item.shortDescription || item.description}
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          {item.location}
                          {item.rating && (
                            <>
                              <span className="mx-2">•</span>
                              <span className="text-yellow-600">★ {item.rating}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && query.trim() && suggestions.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p className="font-medium mb-1">No results found</p>
                <p className="text-sm">Try searching for places, festivals, or cities</p>
              </div>
            )}

            {/* Popular Searches */}
            {!query.trim() && showPopular && popularSearches.length > 0 && (
              <div>
                <div className="p-2 border-b bg-gray-50 text-xs font-medium text-gray-600">
                  Popular Searches
                </div>
                <div className="p-3 space-y-2">
                  {popularSearches.map((searchTerm, index) => (
                    <button
                      key={searchTerm}
                      onClick={() => handlePopularClick(searchTerm)}
                      className={`w-full text-left p-2 rounded hover:bg-gray-50 transition-colors flex items-center space-x-2 ${
                        index === selectedIndex ? 'bg-green-50' : ''
                      }`}
                    >
                      <Search className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700">{searchTerm}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search All Results */}
            {query.trim() && (
              <button
                onClick={handleSearch}
                className="w-full p-3 text-left hover:bg-gray-50 border-t border-gray-200 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-green-600" />
                  <span className="text-green-700 font-medium">
                    Search all results for "{query}"
                  </span>
                </div>
              </button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}