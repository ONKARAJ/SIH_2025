'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Calendar, MapPin, Clock, Users, Heart, Share2, Eye, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { festivalData, Festival } from '@/lib/festival-data';
import { FilterOptions } from './festival-filters';
import FestivalDetailModal from './festival-detail-modal';
import EnhancedFestivalCard from './enhanced-festival-card';

interface FestivalGridProps {
  filters?: FilterOptions;
  className?: string;
  limit?: number;
}

export default function FestivalGrid({ filters, className = '', limit }: FestivalGridProps) {
  const [filteredFestivals, setFilteredFestivals] = useState<Festival[]>([]);
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Core tribal festivals to display in Explore Festivals section
  const coreFestivals = ['sarhul', 'sohrai', 'tusu', 'karma', 'bandna', 'jitiya'];

  // Filter festivals based on provided filters
  useEffect(() => {
    // Start with only core festivals for Explore Festivals section
    let filtered = festivalData.filter(festival => coreFestivals.includes(festival.id));

    if (filters) {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(festival =>
          festival.name.toLowerCase().includes(searchLower) ||
          festival.nameLocal.includes(searchLower) ||
          festival.description.short.toLowerCase().includes(searchLower) ||
          festival.location.districts.some(district => 
            district.toLowerCase().includes(searchLower)
          )
        );
      }

      // Category filter
      if (filters.category && filters.category !== 'all') {
        filtered = filtered.filter(festival => festival.category === filters.category);
      }

      // Season filter
      if (filters.season && filters.season !== 'all') {
        filtered = filtered.filter(festival => festival.season === filters.season);
      }

      // Location filter
      if (filters.location && filters.location !== 'all') {
        filtered = filtered.filter(festival =>
          festival.location.primary.toLowerCase().includes(filters.location.toLowerCase()) ||
          festival.location.districts.some(district =>
            district.toLowerCase().includes(filters.location.toLowerCase())
          )
        );
      }

      // Month filter
      if (filters.month && filters.month !== 'all') {
        filtered = filtered.filter(festival => festival.months.includes(filters.month));
      }
    }

    // Apply limit if specified
    if (limit) {
      filtered = filtered.slice(0, limit);
    }

    setFilteredFestivals(filtered);
  }, [filters, limit]);

  const toggleFavorite = useCallback((festivalId: string) => {
    setFavorites(prev => 
      prev.includes(festivalId)
        ? prev.filter(id => id !== festivalId)
        : [...prev, festivalId]
    );
  }, []);

  const handleFestivalClick = useCallback((festival: Festival) => {
    setSelectedFestival(festival);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedFestival(null);
  };

  const FestivalCard = ({ festival, index }: { festival: Festival; index: number }) => (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
      onClick={() => handleFestivalClick(festival)}
    >
      <CardHeader className="p-0">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={festival.media.hero}
            alt={festival.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Season Badge */}
          <Badge 
            className={`absolute top-3 left-3 ${
              festival.season === 'spring' ? 'bg-green-500' :
              festival.season === 'summer' ? 'bg-yellow-500' :
              festival.season === 'monsoon' ? 'bg-blue-500' :
              'bg-purple-500'
            } text-white`}
          >
            {festival.season}
          </Badge>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(festival.id);
              }}
            >
              <Heart 
                className={`h-4 w-4 ${
                  favorites.includes(festival.id) 
                    ? 'fill-red-500 text-red-500' 
                    : 'text-white'
                }`} 
              />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
            >
              <Share2 className="h-4 w-4 text-white" />
            </Button>
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-sm">
              <Clock className="h-3 w-3 mr-1" />
              {festival.dates.duration} days
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Title */}
          <div>
            <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
              {festival.name}
            </h3>
            <p className="text-sm text-muted-foreground">{festival.nameLocal}</p>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {festival.description.short}
          </p>

          {/* Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{festival.dates.lunar}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{festival.location.primary}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{festival.category}</span>
            </div>
          </div>

          {/* Months */}
          <div className="flex flex-wrap gap-1">
            {festival.months.slice(0, 2).map((month) => (
              <Badge key={month} variant="outline" size="sm">
                {month}
              </Badge>
            ))}
            {festival.months.length > 2 && (
              <Badge variant="outline" size="sm">
                +{festival.months.length - 2} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Button 
            className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground"
            onClick={(e) => {
              e.stopPropagation();
              handleFestivalClick(festival);
            }}
          >
            Explore Festival
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );

  const FestivalListItem = ({ festival }: { festival: Festival }) => (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex gap-6">
          {/* Image */}
          <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={festival.media.hero}
              alt={festival.name}
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold">{festival.name}</h3>
                <p className="text-muted-foreground">{festival.nameLocal}</p>
              </div>
              <div className="flex gap-2">
                <Badge className={`${
                  festival.season === 'spring' ? 'bg-green-500' :
                  festival.season === 'summer' ? 'bg-yellow-500' :
                  festival.season === 'monsoon' ? 'bg-blue-500' :
                  'bg-purple-500'
                } text-white`}>
                  {festival.season}
                </Badge>
                <Badge variant="outline">{festival.category}</Badge>
              </div>
            </div>

            <p className="text-muted-foreground">{festival.description.short}</p>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{festival.dates.lunar}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{festival.location.primary}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{festival.dates.duration} days</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {festival.months.map((month) => (
                  <Badge key={month} variant="outline" size="sm">
                    {month}
                  </Badge>
                ))}
              </div>
              <Button>Learn More</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (filteredFestivals.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="space-y-4">
          <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
            <Calendar className="h-12 w-12 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">No festivals available</h3>
            <p className="text-muted-foreground">
              Check back later for upcoming festivals and celebrations
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredFestivals.length} festival{filteredFestivals.length !== 1 ? 's' : ''}
        </p>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            onClick={() => setViewMode('grid')}
          >
            Grid
          </Button>
          <Button
            size="sm"
            variant={viewMode === 'list' ? 'default' : 'outline'}
            onClick={() => setViewMode('list')}
          >
            List
          </Button>
        </div>
      </div>

      {/* Festival Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFestivals.map((festival, index) => (
            <EnhancedFestivalCard 
              key={festival.id} 
              festival={festival} 
              index={index} 
              onFestivalClick={handleFestivalClick}
              onToggleFavorite={toggleFavorite}
              favorites={favorites}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFestivals.map((festival) => (
            <FestivalListItem key={festival.id} festival={festival} />
          ))}
        </div>
      )}

      {/* Festival Detail Modal */}
      <FestivalDetailModal
        festival={selectedFestival}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}
