'use client';

import { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, MapPin, Clock, Users, X, Star, Heart, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { festivalData, Festival } from '@/lib/festival-data';
import Image from 'next/image';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const seasons = {
  spring: { months: [2, 3, 4], color: 'bg-green-500', gradient: 'from-green-500 to-green-600', name: 'Spring', emoji: '🌸' },
  summer: { months: [5, 6, 7], color: 'bg-yellow-500', gradient: 'from-yellow-500 to-orange-500', name: 'Summer', emoji: '☀️' },
  monsoon: { months: [8, 9], color: 'bg-blue-500', gradient: 'from-blue-500 to-blue-600', name: 'Monsoon', emoji: '🌧️' },
  winter: { months: [10, 11, 0, 1], color: 'bg-purple-500', gradient: 'from-purple-500 to-purple-600', name: 'Winter', emoji: '❄️' }
};

interface CalendarEvent {
  festival: Festival;
  month: number;
  intensity: number; // 1-5 scale
}

export default function FestivalCalendar() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  useEffect(() => {
    // Process festival data into calendar events
    const events: CalendarEvent[] = [];
    
    festivalData.forEach(festival => {
      festival.months.forEach(monthName => {
        const monthIndex = months.findIndex(m => m === monthName);
        if (monthIndex !== -1) {
          events.push({
            festival,
            month: monthIndex,
            intensity: festival.dates.duration > 7 ? 5 : Math.max(1, festival.dates.duration)
          });
        }
      });
    });

    setCalendarEvents(events);
  }, []);

  const handleFestivalClick = (festival: Festival) => {
    setSelectedFestival(festival);
    setIsModalOpen(true);
  };

  const toggleFavorite = (festivalId: string) => {
    setFavorites(prev => 
      prev.includes(festivalId) 
        ? prev.filter(id => id !== festivalId)
        : [...prev, festivalId]
    );
  };

  const getSeasonForMonth = (monthIndex: number) => {
    return Object.entries(seasons).find(([_, season]) => 
      season.months.includes(monthIndex)
    )?.[0] || 'spring';
  };

  const getCurrentSeasonEvents = () => {
    if (!selectedSeason) return calendarEvents;
    const seasonMonths = seasons[selectedSeason as keyof typeof seasons].months;
    return calendarEvents.filter(event => seasonMonths.includes(event.month));
  };

  const getMonthEvents = (monthIndex: number) => {
    return calendarEvents.filter(event => event.month === monthIndex);
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Season Selector */}
      <div className="flex justify-center">
        <div className="flex gap-3 p-3 bg-gradient-to-r from-muted/50 to-background rounded-xl border shadow-sm">
          <Button
            variant={selectedSeason === null ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedSeason(null)}
            className="transition-all duration-300 hover:scale-105"
          >
            🌍 All Seasons
          </Button>
          {Object.entries(seasons).map(([season, config]) => (
            <Button
              key={season}
              variant={selectedSeason === season ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedSeason(season)}
              className={`transition-all duration-300 hover:scale-105 ${
                selectedSeason === season 
                  ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg` 
                  : 'hover:bg-muted'
              }`}
            >
              {config.emoji} {config.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Enhanced Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {months.map((month, index) => {
          const monthEvents = getMonthEvents(index);
          const season = getSeasonForMonth(index);
          const seasonConfig = seasons[season as keyof typeof seasons];
          
          // Filter events based on selected season
          const visibleEvents = selectedSeason 
            ? monthEvents.filter(event => 
                seasons[selectedSeason as keyof typeof seasons].months.includes(event.month)
              )
            : monthEvents;

          const isCurrentMonth = new Date().getMonth() === index;
          const hasEvents = visibleEvents.length > 0;

          return (
            <Card 
              key={month}
              className={`group cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border-2 overflow-hidden ${
                selectedMonth === index 
                  ? 'border-primary shadow-lg scale-105' 
                  : 'border-border hover:border-primary/50'
              } ${visibleEvents.length === 0 && selectedSeason ? 'opacity-50' : ''} ${
                isCurrentMonth ? 'ring-2 ring-primary/20' : ''
              }`}
              onClick={() => setSelectedMonth(index)}
              onMouseEnter={() => setHoveredMonth(index)}
              onMouseLeave={() => setHoveredMonth(null)}
            >
              {/* Month Header with Season Gradient */}
              <CardHeader className={`pb-3 bg-gradient-to-r ${seasonConfig.gradient} text-white relative`}>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      {seasonConfig.emoji} {month}
                    </CardTitle>
                    <p className="text-xs opacity-90">{seasonConfig.name}</p>
                  </div>
                  {isCurrentMonth && (
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      Current
                    </Badge>
                  )}
                </div>
                {hasEvents && (
                  <div className="absolute -bottom-2 right-4">
                    <Badge variant="secondary" className="bg-white text-primary font-semibold">
                      {visibleEvents.length} {visibleEvents.length === 1 ? 'Festival' : 'Festivals'}
                    </Badge>
                  </div>
                )}
              </CardHeader>

              {/* Festival Events */}
              <CardContent className="p-4 space-y-3">
                {visibleEvents.slice(0, 3).map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className="group/event p-3 rounded-lg bg-gradient-to-r from-muted/50 to-background hover:from-primary/10 hover:to-primary/5 transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/20 hover:shadow-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFestivalClick(event.festival);
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate group-hover/event:text-primary transition-colors">
                          {event.festival.name}
                        </p>
                        <p className="text-xs text-muted-foreground font-medium">
                          {event.festival.nameLocal}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge 
                          variant="outline" 
                          size="sm" 
                          className={`text-xs group-hover/event:border-primary/50 ${
                            event.festival.category === 'tribal' ? 'border-green-300 text-green-700' :
                            event.festival.category === 'harvest' ? 'border-orange-300 text-orange-700' :
                            'border-blue-300 text-blue-700'
                          }`}
                        >
                          {event.festival.dates.duration}d
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate max-w-[100px]">
                          {event.festival.location.primary}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span className="font-medium">{event.festival.category}</span>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center justify-between mt-2 opacity-0 group-hover/event:opacity-100 transition-opacity duration-300">
                      <p className="text-xs text-muted-foreground truncate flex-1 mr-2">
                        {event.festival.description.short.slice(0, 50)}...
                      </p>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 hover:bg-primary/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(event.festival.id);
                          }}
                        >
                          <Heart className={`h-3 w-3 ${
                            favorites.includes(event.festival.id) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-muted-foreground'
                          }`} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 hover:bg-primary/10"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Eye className="h-3 w-3 text-muted-foreground" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {visibleEvents.length > 3 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMonth(index);
                    }}
                  >
                    +{visibleEvents.length - 3} more festivals
                  </Button>
                )}
                
                {visibleEvents.length === 0 && (
                  <div className="text-center py-6">
                    <Calendar className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No festivals this month
                    </p>
                  </div>
                )}
              </CardContent>
              
              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </Card>
          );
        })}
      </div>

      {/* Festival Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedFestival && (
            <>
              <DialogHeader className="relative">
                <DialogClose className="absolute right-0 top-0 z-10">
                  <Button variant="ghost" size="sm">
                    <X className="h-4 w-4" />
                  </Button>
                </DialogClose>
                
                {/* Hero Image */}
                <div className="relative h-64 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-lg">
                  <Image
                    src={selectedFestival.media.hero}
                    alt={selectedFestival.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6 text-white">
                    <DialogTitle className="text-3xl font-bold mb-2">
                      {selectedFestival.name}
                    </DialogTitle>
                    <p className="text-lg opacity-90">{selectedFestival.nameLocal}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge className={`${
                        selectedFestival.season === 'spring' ? 'bg-green-500' :
                        selectedFestival.season === 'summer' ? 'bg-yellow-500' :
                        selectedFestival.season === 'monsoon' ? 'bg-blue-500' :
                        'bg-purple-500'
                      } text-white`}>
                        {selectedFestival.season}
                      </Badge>
                      <Badge variant="secondary">
                        {selectedFestival.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Quick Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="font-semibold">{selectedFestival.dates.duration} Days</p>
                      <p className="text-sm text-muted-foreground">{selectedFestival.dates.lunar}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="font-semibold">{selectedFestival.location.primary}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedFestival.location.districts.length} Districts
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="font-semibold capitalize">{selectedFestival.category}</p>
                      <p className="text-sm text-muted-foreground">Festival Type</p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Description */}
                <div>
                  <h3 className="text-xl font-semibold mb-3">About the Festival</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedFestival.description.detailed}
                  </p>
                </div>
                
                {/* Significance */}
                <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2 text-primary">Cultural Significance</h4>
                    <p className="text-sm leading-relaxed">
                      {selectedFestival.description.significance}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Traditions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Music & Dance</h4>
                    <div className="space-y-2">
                      {selectedFestival.traditions.music.slice(0, 3).map((item, index) => (
                        <Badge key={index} variant="outline" className="mr-2 mb-2">
                          {item}
                        </Badge>
                      ))}
                      {selectedFestival.traditions.dance.slice(0, 2).map((item, index) => (
                        <Badge key={index} variant="outline" className="mr-2 mb-2">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Traditional Food</h4>
                    <div className="space-y-2">
                      {selectedFestival.traditions.food.slice(0, 4).map((item, index) => (
                        <Badge key={index} variant="outline" className="mr-2 mb-2">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-center pt-4 border-t">
                  <Button 
                    variant="outline"
                    onClick={() => toggleFavorite(selectedFestival.id)}
                    className={`px-6 ${favorites.includes(selectedFestival.id) ? 'text-red-500 border-red-500 bg-red-50' : ''}`}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${
                      favorites.includes(selectedFestival.id) ? 'fill-current' : ''
                    }`} />
                    {favorites.includes(selectedFestival.id) ? 'Saved to Favorites' : 'Save to Favorites'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
