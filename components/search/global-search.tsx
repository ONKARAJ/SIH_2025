'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, Calendar, MapPin, Users, BookOpen, ChefHat, Palette } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'festival' | 'cultural-element' | 'recipe' | 'folklore' | 'place' | 'craft';
  category?: string;
  url: string;
  image?: string;
  tags: string[];
}

const searchData: SearchResult[] = [
  // Festivals
  {
    id: 'sohrai',
    title: 'Sohrai Festival',
    description: 'Harvest festival celebrated with cattle worship and beautiful wall paintings',
    type: 'festival',
    category: 'harvest',
    url: '/festivals#sohrai',
    tags: ['harvest', 'cattle', 'painting', 'november', 'santhal', 'tribal']
  },
  {
    id: 'karma',
    title: 'Karma Festival',
    description: 'Monsoon festival celebrating the Karma tree with traditional dances',
    type: 'festival',
    category: 'seasonal',
    url: '/festivals#karma',
    tags: ['monsoon', 'tree', 'dance', 'august', 'oraon', 'tribal']
  },
  {
    id: 'tusu',
    title: 'Tusu Festival',
    description: 'Winter celebration marking the end of harvest season',
    type: 'festival',
    category: 'harvest',
    url: '/festivals#tusu',
    tags: ['winter', 'harvest', 'singing', 'january', 'kurukh', 'tribal']
  },
  {
    id: 'bandna',
    title: 'Bandna Festival',
    description: 'Festival dedicated to cattle and livestock worship',
    type: 'festival',
    category: 'livestock',
    url: '/festivals#bandna',
    tags: ['cattle', 'livestock', 'worship', 'november', 'munda', 'tribal']
  },
  {
    id: 'jitia',
    title: 'Jitia Festival',
    description: 'Fasting festival for the well-being of children',
    type: 'festival',
    category: 'religious',
    url: '/festivals#jitia',
    tags: ['fasting', 'children', 'mothers', 'september', 'hindu', 'tribal']
  },
  {
    id: 'karam',
    title: 'Karam Festival',
    description: 'Festival celebrating youth and the Karam tree',
    type: 'festival',
    category: 'youth',
    url: '/festivals#karam',
    tags: ['youth', 'tree', 'dance', 'august', 'ho', 'tribal']
  },
  {
    id: 'sarhul',
    title: 'Sarhul Festival',
    description: 'Spring festival welcoming the new year and Sal blossoms',
    type: 'festival',
    category: 'spring',
    url: '/festivals#sarhul',
    tags: ['spring', 'new year', 'sal tree', 'march', 'munda', 'tribal']
  },
  {
    id: 'baha',
    title: 'Baha Festival',
    description: 'Flower festival celebrating the arrival of spring',
    type: 'festival',
    category: 'spring',
    url: '/festivals#baha',
    tags: ['flower', 'spring', 'nature', 'february', 'santhal', 'tribal']
  },
  // Cultural Elements
  {
    id: 'jhumair',
    title: 'Jhumair Dance',
    description: 'Traditional folk dance performed during festivals',
    type: 'cultural-element',
    category: 'dance',
    url: '/festivals#culture',
    tags: ['dance', 'folk', 'music', 'traditional', 'tribal']
  },
  {
    id: 'sohrai-painting',
    title: 'Sohrai Painting',
    description: 'Traditional wall art with geometric patterns and natural motifs',
    type: 'cultural-element',
    category: 'art',
    url: '/festivals#culture',
    tags: ['painting', 'wall art', 'geometric', 'tribal', 'traditional']
  },
  {
    id: 'bamboo-craft',
    title: 'Bamboo & Cane Work',
    description: 'Intricate basketry and furniture crafted from bamboo and cane',
    type: 'craft',
    category: 'handicraft',
    url: '/festivals#crafts',
    tags: ['bamboo', 'basket', 'furniture', 'craft', 'sustainable']
  },
  {
    id: 'pottery',
    title: 'Tribal Pottery',
    description: 'Traditional pottery using local clay and glazing techniques',
    type: 'craft',
    category: 'pottery',
    url: '/festivals#crafts',
    tags: ['pottery', 'clay', 'traditional', 'functional', 'decorative']
  },
  {
    id: 'textile-weaving',
    title: 'Traditional Textiles',
    description: 'Handwoven fabrics with geometric patterns and natural dyes',
    type: 'craft',
    category: 'textile',
    url: '/festivals#crafts',
    tags: ['textile', 'weaving', 'natural dyes', 'patterns', 'handloom']
  },
  // Recipes
  {
    id: 'pitha',
    title: 'Pitha (Rice Cakes)',
    description: 'Traditional rice cakes prepared during festivals',
    type: 'recipe',
    category: 'festival food',
    url: '/festivals#recipes',
    tags: ['rice', 'cake', 'festival', 'sweet', 'traditional']
  },
  {
    id: 'handia',
    title: 'Handia (Rice Beer)',
    description: 'Traditional fermented rice beverage',
    type: 'recipe',
    category: 'beverage',
    url: '/festivals#recipes',
    tags: ['rice', 'fermented', 'traditional', 'beverage', 'tribal']
  },
  {
    id: 'rugra',
    title: 'Rugra Curry',
    description: 'Mushroom curry made with wild mushrooms',
    type: 'recipe',
    category: 'curry',
    url: '/festivals#recipes',
    tags: ['mushroom', 'curry', 'wild', 'traditional', 'tribal']
  },
  // Places
  {
    id: 'ranchi',
    title: 'Ranchi',
    description: 'Capital city and cultural hub of Jharkhand',
    type: 'place',
    category: 'city',
    url: '/places/ranchi',
    tags: ['capital', 'city', 'cultural hub', 'waterfalls', 'temples']
  },
  {
    id: 'deoghar',
    title: 'Deoghar',
    description: 'Spiritual city famous for Baidyanath Temple',
    type: 'place',
    category: 'religious',
    url: '/places/deoghar',
    tags: ['spiritual', 'temple', 'pilgrimage', 'religious', 'baidyanath']
  }
];

const typeIcons = {
  festival: Calendar,
  'cultural-element': Users,
  recipe: ChefHat,
  folklore: BookOpen,
  place: MapPin,
  craft: Palette
};

const typeColors = {
  festival: 'bg-orange-100 text-orange-700',
  'cultural-element': 'bg-purple-100 text-purple-700',
  recipe: 'bg-green-100 text-green-700',
  folklore: 'bg-blue-100 text-blue-700',
  place: 'bg-red-100 text-red-700',
  craft: 'bg-yellow-100 text-yellow-700'
};

interface GlobalSearchProps {
  placeholder?: string;
  className?: string;
  showResults?: boolean;
  onResultClick?: (result: SearchResult) => void;
}

export default function GlobalSearch({ 
  placeholder = "Search destinations, festivals, culture...", 
  className = "",
  showResults = true,
  onResultClick 
}: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Search function
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const searchTerms = searchQuery.toLowerCase().split(' ');
    
    const filteredResults = searchData.filter(item => {
      const searchableText = [
        item.title,
        item.description,
        item.category || '',
        ...item.tags
      ].join(' ').toLowerCase();

      return searchTerms.every(term => 
        searchableText.includes(term)
      );
    });

    // Sort by relevance (title matches first, then description, then tags)
    const sortedResults = filteredResults.sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0;
      const bTitle = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0;
      if (aTitle !== bTitle) return bTitle - aTitle;

      const aDesc = a.description.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0;
      const bDesc = b.description.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0;
      return bDesc - aDesc;
    });

    setResults(sortedResults.slice(0, 8)); // Limit to 8 results
  };

  // Handle input change
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % results.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleResultClick(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle result click
  const handleResultClick = (result: SearchResult) => {
    setQuery(result.title);
    setIsOpen(false);
    setSelectedIndex(-1);
    
    if (onResultClick) {
      onResultClick(result);
    } else {
      router.push(result.url);
    }
  };

  // Clear search
  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className={`relative w-full max-w-lg ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query.trim() && results.length > 0) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10 py-2 w-full"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search Results */}
      {isOpen && showResults && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-96 overflow-y-auto shadow-lg">
          <CardContent className="p-0">
            {results.map((result, index) => {
              const Icon = typeIcons[result.type];
              return (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className={`w-full text-left p-4 hover:bg-muted transition-colors border-b last:border-b-0 ${
                    index === selectedIndex ? 'bg-muted' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${typeColors[result.type]}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm truncate">{result.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {result.type.replace('-', ' ')}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-xs line-clamp-2">
                        {result.description}
                      </p>
                      {result.category && (
                        <p className="text-primary text-xs mt-1 capitalize">
                          {result.category}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* No Results */}
      {isOpen && showResults && query.trim() && results.length === 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 shadow-lg">
          <CardContent className="p-4 text-center text-muted-foreground">
            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No results found for "{query}"</p>
            <p className="text-xs mt-1">Try searching for festivals, places, or cultural elements</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
