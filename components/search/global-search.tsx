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
  // Major Cities
  {
    id: 'ranchi',
    title: 'Ranchi',
    description: 'Capital city of Jharkhand, known for its pleasant climate and educational institutions',
    type: 'place',
    category: 'city',
    url: '/places',
    tags: ['capital', 'city', 'cultural hub', 'waterfalls', 'temples', 'rock garden', 'tagore hill']
  },
  {
    id: 'jamshedpur',
    title: 'Jamshedpur',
    description: 'Industrial city known as the Steel City of India, founded by Jamsetji Tata',
    type: 'place',
    category: 'city', 
    url: '/places',
    tags: ['steel city', 'industrial', 'jubilee park', 'tata', 'dimna lake']
  },
  {
    id: 'deoghar',
    title: 'Deoghar',
    description: 'Sacred city home to the famous Baidyanath Jyotirlinga temple',
    type: 'place',
    category: 'religious',
    url: '/religious-site',
    tags: ['spiritual', 'temple', 'pilgrimage', 'religious', 'baidyanath', 'jyotirlinga']
  },
  {
    id: 'hazaribagh',
    title: 'Hazaribagh',
    description: 'District headquarters known for its lakes and Hazaribagh National Park',
    type: 'place',
    category: 'city',
    url: '/places',
    tags: ['lakes', 'national park', 'canary hill', 'district']
  },
  {
    id: 'giridih',
    title: 'Giridih',
    description: 'District known for coal mining and home to Parasnath Hill',
    type: 'place',
    category: 'city',
    url: '/places',
    tags: ['coal mining', 'parasnath hill', 'usri falls', 'district']
  },

  // Waterfalls
  {
    id: 'hundru-falls',
    title: 'Hundru Falls',
    description: '98-meter spectacular waterfall cascading down rocky cliffs, surrounded by dense forests',
    type: 'place',
    category: 'waterfall',
    url: '/waterfall',
    tags: ['waterfall', '98 meters', 'ranchi', 'subarnarekha river', 'photography', 'trekking']
  },
  {
    id: 'dassam-falls',
    title: 'Dassam Falls',
    description: 'Known as the "Niagara of Jharkhand", this 44-meter waterfall creates a mesmerizing curtain of water',
    type: 'place',
    category: 'waterfall',
    url: '/waterfall',
    tags: ['waterfall', '44 meters', 'niagara of jharkhand', 'ranchi', 'kanchi river', 'rock climbing']
  },
  {
    id: 'jonha-falls',
    title: 'Jonha Falls (Gautamdhara)',
    description: '43-meter waterfall with religious significance, believed to be blessed by Lord Buddha',
    type: 'place',
    category: 'waterfall',
    url: '/waterfall',
    tags: ['waterfall', '43 meters', 'gautamdhara', 'buddha', 'meditation', 'ranchi', 'religious']
  },
  {
    id: 'lodh-falls',
    title: 'Lodh Falls',
    description: 'Jharkhand\'s highest waterfall at 143 meters, creating a spectacular cascade through multiple tiers',
    type: 'place',
    category: 'waterfall',
    url: '/waterfall',
    tags: ['waterfall', '143 meters', 'highest', 'netarhat', 'latehar', 'trekking']
  },
  {
    id: 'hirni-falls',
    title: 'Hirni Falls',
    description: 'Hidden gem nestled in dense forests, offering a serene escape with natural pools',
    type: 'place',
    category: 'waterfall',
    url: '/waterfall',
    tags: ['waterfall', '37 meters', 'hidden gem', 'ranchi', 'natural pools', 'swimming']
  },
  {
    id: 'usri-falls',
    title: 'Usri Falls',
    description: 'Picturesque waterfall near Giridih, perfect for picnics and photography',
    type: 'place',
    category: 'waterfall',
    url: '/waterfall',
    tags: ['waterfall', 'giridih', 'picnic', 'photography', 'family friendly']
  },
  {
    id: 'nakti-falls',
    title: 'Nakti Falls',
    description: 'Pristine waterfall hidden in dense forests with crystal-clear natural pools',
    type: 'place',
    category: 'waterfall',
    url: '/waterfall',
    tags: ['waterfall', '25 meters', 'pristine', 'ranchi', 'crystal clear', 'swimming', 'trekking']
  },
  {
    id: 'bhatinda-falls',
    title: 'Bhatinda Falls',
    description: 'Spectacular waterfall cascading down rocky terrain, surrounded by dense forests',
    type: 'place',
    category: 'waterfall',
    url: '/waterfall',
    tags: ['waterfall', 'dhanbad', 'rocky terrain', 'dense forests', 'trekking', 'adventure']
  },

  // Hill Stations
  {
    id: 'netarhat',
    title: 'Netarhat',
    description: 'Known as the "Queen of Chotanagpur", offering breathtaking sunrise and sunset views',
    type: 'place',
    category: 'hill station',
    url: '/hill-station',
    tags: ['hill station', 'queen of chotanagpur', 'sunrise', 'sunset', 'latehar', 'cool climate']
  },
  {
    id: 'parasnath-hills',
    title: 'Parasnath Hills',
    description: 'Highest peak in Jharkhand at 1,365 meters, sacred to Jains with 20 Tirthankara temples',
    type: 'place',
    category: 'hill station',
    url: '/hill-station',
    tags: ['hill station', 'highest peak', '1365 meters', 'jain', 'tirthankara', 'giridih', 'trekking']
  },
  {
    id: 'dalma-hills',
    title: 'Dalma Hills',
    description: 'Wildlife sanctuary and hill station near Jamshedpur, home to elephants and leopards',
    type: 'place',
    category: 'wildlife sanctuary',
    url: '/wildlife-sanctuary',
    tags: ['wildlife sanctuary', 'hill station', 'elephants', 'leopards', 'jamshedpur', 'migration corridor']
  },
  {
    id: 'rajmahal-hills',
    title: 'Rajmahal Hills',
    description: 'Ancient hills with archaeological significance, featuring prehistoric rock paintings and fossil sites',
    type: 'place',
    category: 'historic site',
    url: '/historic-site',
    tags: ['historic site', 'prehistoric', 'rock paintings', 'fossils', 'sahibganj', 'archaeology']
  },

  // Religious Sites & Temples
  {
    id: 'baidyanath-temple',
    title: 'Baba Baidyanath Temple',
    description: 'One of the 12 Jyotirlingas, ancient temple dedicated to Lord Shiva attracting millions of devotees',
    type: 'place',
    category: 'religious site',
    url: '/religious-site',
    tags: ['jyotirlinga', 'shiva temple', 'pilgrimage', 'deoghar', 'shravan', 'religious']
  },
  {
    id: 'rajrappa-temple',
    title: 'Rajrappa Temple',
    description: 'Ancient temple dedicated to Goddess Chinnamasta at confluence of rivers',
    type: 'place',
    category: 'religious site',
    url: '/religious-site',
    tags: ['chinnamasta', 'goddess temple', 'river confluence', 'ramgarh', 'tantric', 'religious']
  },
  {
    id: 'jagannath-temple-ranchi',
    title: 'Jagannath Temple Ranchi',
    description: 'Replica of famous Puri Jagannath Temple featuring traditional Kalinga architecture',
    type: 'place',
    category: 'religious site',
    url: '/religious-site',
    tags: ['jagannath temple', 'kalinga architecture', 'rath yatra', 'ranchi', 'replica']
  },
  {
    id: 'pahari-mandir',
    title: 'Pahari Mandir',
    description: 'Hilltop temple dedicated to Lord Shiva offering panoramic views of Ranchi city',
    type: 'place',
    category: 'religious site',
    url: '/religious-site',
    tags: ['hilltop temple', 'shiva temple', 'panoramic views', 'ranchi', '468 steps', 'sunrise']
  },
  {
    id: 'kunderdoba-temple',
    title: 'Kunderdoba Temple',
    description: 'Ancient temple dedicated to Lord Shiva located on hilltop with panoramic views',
    type: 'place',
    category: 'religious site',
    url: '/religious-site',
    tags: ['shiva temple', 'ancient', 'hilltop', 'sahibganj', 'panoramic views']
  },
  {
    id: 'ganges-ghats-sahibganj',
    title: 'Ganges River Ghats Sahibganj',
    description: 'Sacred ghats along holy Ganges River offering spiritual experiences and boat rides',
    type: 'place',
    category: 'religious site',
    url: '/religious-site',
    tags: ['ganges ghats', 'holy river', 'spiritual', 'boat rides', 'sahibganj', 'pilgrimage']
  },

  // National Parks & Wildlife
  {
    id: 'betla-national-park',
    title: 'Betla National Park',
    description: 'First national park of Jharkhand, home to tigers, elephants, leopards and diverse wildlife',
    type: 'place',
    category: 'national park',
    url: '/national-park',
    tags: ['national park', 'tigers', 'elephants', 'safari', 'palamu', 'betla fort', 'wildlife']
  },
  {
    id: 'hazaribagh-national-park',
    title: 'Hazaribagh National Park',
    description: 'Dense forest sanctuary known for tiger population and scenic beauty',
    type: 'place',
    category: 'national park',
    url: '/national-park',
    tags: ['national park', 'tigers', 'dense forest', 'hazaribagh', 'wildlife photography']
  },
  {
    id: 'udhwa-lake-bird-sanctuary',
    title: 'Udhwa Lake Bird Sanctuary',
    description: 'Important bird sanctuary around Udhwa Lake, home to migratory and resident bird species',
    type: 'place',
    category: 'wildlife sanctuary',
    url: '/wildlife-sanctuary',
    tags: ['bird sanctuary', 'migratory birds', 'udhwa lake', 'sahibganj', 'bird watching']
  },

  // Lakes & Dams
  {
    id: 'kanke-dam',
    title: 'Kanke Dam',
    description: 'Scenic reservoir surrounded by hills and forests, perfect for picnics and water sports',
    type: 'place',
    category: 'lake',
    url: '/lake',
    tags: ['dam', 'reservoir', 'ranchi', 'water sports', 'fishing', 'picnic']
  },
  {
    id: 'dimna-lake',
    title: 'Dimna Lake',
    description: 'Artificial lake created by Dimna Dam, surrounded by Dalma Hills offering boating and fishing',
    type: 'place',
    category: 'lake',
    url: '/lake',
    tags: ['artificial lake', 'dimna dam', 'dalma hills', 'jamshedpur', 'boating', 'water sports']
  },
  {
    id: 'maithon-dam',
    title: 'Maithon Dam',
    description: 'Major dam on Damodar River creating large reservoir perfect for boating and water sports',
    type: 'place',
    category: 'dam',
    url: '/dam',
    tags: ['major dam', 'damodar river', 'dhanbad', 'reservoir', 'engineering marvel', 'boating']
  },
  {
    id: 'panchet-dam',
    title: 'Panchet Dam',
    description: 'Beautiful dam creating scenic reservoir perfect for fishing and boating',
    type: 'place',
    category: 'dam',
    url: '/dam',
    tags: ['dam', 'damodar river', 'dhanbad', 'fishing', 'boating', 'peaceful']
  },
  {
    id: 'tilaiya-dam',
    title: 'Tilaiya Dam',
    description: 'Scenic dam and reservoir offering water sports, fishing and beautiful sunset views',
    type: 'place',
    category: 'dam',
    url: '/dam',
    tags: ['dam', 'barakar river', 'koderma', 'water sports', 'sunset views', 'photography']
  },
  {
    id: 'patratu-valley',
    title: 'Patratu Valley',
    description: 'Breathtaking valley known as "Kashmir of Jharkhand" with scenic beauty and Patratu Dam',
    type: 'place',
    category: 'valley',
    url: '/valley',
    tags: ['valley', 'kashmir of jharkhand', 'patratu dam', 'ramgarh', 'photography', 'panoramic views']
  },
  {
    id: 'udhuwa-lake',
    title: 'Udhuwa Lake',
    description: 'Serene artificial lake surrounded by hills and forests, perfect for picnics and water activities',
    type: 'place',
    category: 'lake',
    url: '/lake',
    tags: ['artificial lake', 'dhanbad', 'picnic', 'water activities', 'bird watching']
  },
  {
    id: 'topchachi-lake',
    title: 'Topchachi Lake',
    description: 'Pristine natural lake surrounded by lush forests offering boating, fishing and scenic beauty',
    type: 'place',
    category: 'lake',
    url: '/lake',
    tags: ['natural lake', 'crystal clear', 'dhanbad', 'boating', 'fishing', 'bird watching']
  },

  // Parks & Gardens
  {
    id: 'rock-garden-ranchi',
    title: 'Rock Garden Ranchi',
    description: 'Artistic garden featuring sculptures and structures made from natural rocks and stones',
    type: 'place',
    category: 'park',
    url: '/park',
    tags: ['rock garden', 'sculptures', 'ranchi', 'family friendly', 'artistic', 'musical fountains']
  },
  {
    id: 'jubilee-park',
    title: 'Jubilee Park',
    description: 'Sprawling 225-acre urban park with beautiful lake, rose garden and recreational facilities',
    type: 'place',
    category: 'park',
    url: '/park',
    tags: ['urban park', '225 acres', 'jamshedpur', 'rose garden', 'lake', 'zoo', 'boating']
  },

  // Historic Sites
  {
    id: 'palamu-fort',
    title: 'Palamu Fort',
    description: 'Ancient fort complex with old and new sections showcasing medieval architecture by Chero rulers',
    type: 'place',
    category: 'historic site',
    url: '/historic-site',
    tags: ['ancient fort', 'medieval architecture', 'chero rulers', 'palamu', 'stone work']
  },
  {
    id: 'maluti-temples',
    title: 'Maluti Temples',
    description: 'Group of 72 ancient terracotta temples showcasing exquisite craftsmanship from 17th-18th centuries',
    type: 'place',
    category: 'historic site',
    url: '/historic-site',
    tags: ['72 temples', 'terracotta', 'ancient', 'dumka', '17th century', 'craftsmanship']
  },
  {
    id: 'tagore-hill',
    title: 'Tagore Hill',
    description: 'Historic hill where Rabindranath Tagore stayed, featuring gardens, observatory and cultural significance',
    type: 'place',
    category: 'historic site',
    url: '/historic-site',
    tags: ['tagore', 'historic', 'observatory', 'ranchi', 'literary heritage', 'cultural']
  },

  // Adventure Sports
  {
    id: 'getalsud-dam',
    title: 'Getalsud Dam',
    description: 'Perfect destination for adventure sports including water skiing, jet skiing and parasailing',
    type: 'place',
    category: 'adventure sports',
    url: '/adventure-sports',
    tags: ['adventure sports', 'water skiing', 'jet skiing', 'parasailing', 'ranchi', 'reservoir']
  },

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
    id: 'sarhul',
    title: 'Sarhul Festival',
    description: 'Spring festival welcoming the new year and Sal blossoms',
    type: 'festival',
    category: 'spring',
    url: '/festivals#sarhul',
    tags: ['spring', 'new year', 'sal tree', 'march', 'munda', 'tribal']
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
