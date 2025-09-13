'use client';

import { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, MapPin, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock festival data - replace with actual import when available
const festivalData = [
  {
    name: "Sarhul Festival",
    nameLocal: "सरहुल",
    months: ["March", "April"],
    dates: { duration: 3 },
    location: { primary: "Ranchi" }
  },
  {
    name: "Sohrai Festival",
    nameLocal: "सोहराई",
    months: ["October", "November"],
    dates: { duration: 5 },
    location: { primary: "Hazaribagh" }
  },
  {
    name: "Karam Festival",
    nameLocal: "करम",
    months: ["September"],
    dates: { duration: 2 },
    location: { primary: "Dumka" }
  }
];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const seasons = {
  spring: { months: [2, 3, 4], color: 'bg-green-500', name: 'Spring' },
  summer: { months: [5, 6, 7], color: 'bg-yellow-500', name: 'Summer' },
  monsoon: { months: [8, 9], color: 'bg-blue-500', name: 'Monsoon' },
  winter: { months: [10, 11, 0, 1], color: 'bg-purple-500', name: 'Winter' }
};

interface Festival {
  name: string;
  nameLocal: string;
  months: string[];
  dates: { duration: number };
  location: { primary: string };
}

interface CalendarEvent {
  festival: Festival;
  month: number;
  intensity: number; // 1-5 scale
}

export default function FestivalCalendar() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [hoveredEvent, setHoveredEvent] = useState<CalendarEvent | null>(null);

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
      {/* Season Selector */}
      <div className="flex justify-center">
        <div className="flex gap-2 p-2 bg-muted rounded-lg">
          <Button
            variant={selectedSeason === null ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedSeason(null)}
          >
            All Seasons
          </Button>
          {Object.entries(seasons).map(([season, config]) => (
            <Button
              key={season}
              variant={selectedSeason === season ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedSeason(season)}
              className={selectedSeason === season ? config.color + ' text-white' : ''}
            >
              {config.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {months.map((month, index) => {
          const monthEvents = getMonthEvents(index);
          const season = getSeasonForMonth(index);
          const seasonColor = seasons[season as keyof typeof seasons].color;
          
          // Filter events based on selected season
          const visibleEvents = selectedSeason 
            ? monthEvents.filter(event => 
                seasons[selectedSeason as keyof typeof seasons].months.includes(event.month)
              )
            : monthEvents;

          return (
            <Card 
              key={month}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                selectedMonth === index 
                  ? 'border-primary shadow-lg' 
                  : 'border-border hover:border-muted-foreground'
              } ${visibleEvents.length === 0 && selectedSeason ? 'opacity-50' : ''}`}
              onClick={() => setSelectedMonth(index)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{month}</CardTitle>
                  <div className={`w-3 h-3 rounded-full ${seasonColor}`} title={season} />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {visibleEvents.map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors cursor-pointer"
                    onMouseEnter={() => setHoveredEvent(event)}
                    onMouseLeave={() => setHoveredEvent(null)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {event.festival.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {event.festival.nameLocal}
                        </p>
                      </div>
                      <Badge variant="outline" size="sm" className="ml-2 text-xs">
                        {event.festival.dates.duration}d
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground truncate">
                        {event.festival.location.primary}
                      </span>
                    </div>
                  </div>
                ))}
                {visibleEvents.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No festivals this month
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Selected Month Details */}
      {selectedMonth !== null && (
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">
                {months[selectedMonth]} Festivals
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedMonth((selectedMonth - 1 + 12) % 12)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedMonth((selectedMonth + 1) % 12)}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {getMonthEvents(selectedMonth).map((event, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-lg">{event.festival.name}</h4>
                        <p className="text-muted-foreground">{event.festival.nameLocal}</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{event.festival.dates.duration} days</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{event.festival.location.primary}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {getMonthEvents(selectedMonth).length === 0 && (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">No festivals scheduled for {months[selectedMonth]}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hovered Event Tooltip */}
      {hoveredEvent && (
        <div className="fixed bottom-4 right-4 bg-popover border rounded-lg p-3 shadow-lg z-50 max-w-sm">
          <h4 className="font-medium">{hoveredEvent.festival.name}</h4>
          <p className="text-sm text-muted-foreground">{hoveredEvent.festival.nameLocal}</p>
          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{hoveredEvent.festival.dates.duration} days</span>
            <MapPin className="w-3 h-3 ml-2" />
            <span>{hoveredEvent.festival.location.primary}</span>
          </div>
        </div>
      )}
    </div>
  );
}
