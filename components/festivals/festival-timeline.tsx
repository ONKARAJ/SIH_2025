'use client';

import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Mock timeline data
const timelineData = [
  {
    id: 1,
    period: "Ancient Times (Pre-1000 CE)",
    title: "Origins of Tribal Festivals",
    description: "The earliest Jharkhand festivals originated from ancient tribal traditions celebrating nature, harvest cycles, and ancestral worship.",
    festivals: ["Proto-Sarhul", "Early Harvest Celebrations"],
    significance: "Foundation of tribal cultural identity",
    icon: "🌱",
    color: "bg-green-500"
  },
  {
    id: 2,
    period: "Medieval Period (1000-1500 CE)",
    title: "Cultural Synthesis",
    description: "Integration of various tribal customs with regional influences, forming distinctive festival traditions.",
    festivals: ["Sarhul Festival", "Karam Festival"],
    significance: "Cultural amalgamation and festival standardization",
    icon: "🎭",
    color: "bg-blue-500"
  },
  {
    id: 3,
    period: "Colonial Era (1500-1947)",
    title: "Preservation Through Resistance",
    description: "Despite colonial pressures, tribal communities maintained their festival traditions as acts of cultural resistance.",
    festivals: ["Sohrai Festival", "Banda Festival"],
    significance: "Cultural preservation and identity protection",
    icon: "🛡️",
    color: "bg-purple-500"
  },
  {
    id: 4,
    period: "Post-Independence (1947-2000)",
    title: "Revival and Recognition",
    description: "Government recognition and support led to revival of traditional festivals and cultural practices.",
    festivals: ["Tusu Festival", "Jitiya Festival"],
    significance: "Official recognition and cultural revival",
    icon: "🎪",
    color: "bg-orange-500"
  },
  {
    id: 5,
    period: "Modern Era (2000-Present)",
    title: "Global Celebration",
    description: "Traditional festivals gain international recognition while maintaining authentic cultural roots.",
    festivals: ["Chauth Festival", "Modern Cultural Programs"],
    significance: "Global recognition and cultural tourism",
    icon: "🌍",
    color: "bg-red-500"
  }
];

interface TimelinePeriod {
  id: number;
  period: string;
  title: string;
  description: string;
  festivals: string[];
  significance: string;
  icon: string;
  color: string;
}

export default function FestivalTimeline() {
  const [selectedPeriod, setSelectedPeriod] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'timeline' | 'grid'>('timeline');

  const handlePeriodClick = (periodId: number) => {
    setSelectedPeriod(selectedPeriod === periodId ? null : periodId);
  };

  return (
    <div className="space-y-8">
      {/* View Mode Toggle */}
      <div className="flex justify-center">
        <div className="flex gap-2 p-2 bg-muted rounded-lg">
          <Button
            variant={viewMode === 'timeline' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('timeline')}
          >
            Timeline View
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            Grid View
          </Button>
        </div>
      </div>

      {viewMode === 'timeline' ? (
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/80 to-primary/40 transform md:-translate-x-1/2" />
          
          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData.map((period, index) => (
              <div
                key={period.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-background border-4 border-primary rounded-full transform -translate-x-1/2 z-10">
                  <div className="absolute inset-1 bg-primary rounded-full" />
                </div>

                {/* Content Card */}
                <Card 
                  className={`ml-20 md:ml-0 md:w-5/12 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedPeriod === period.id ? 'ring-2 ring-primary shadow-lg' : ''
                  } ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}
                  onClick={() => handlePeriodClick(period.id)}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">{period.icon}</span>
                            <Badge variant="outline" className="text-xs">
                              {period.period}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-bold mb-2">{period.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {period.description}
                          </p>
                        </div>
                      </div>

                      {/* Festivals List */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Key Festivals
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {period.festivals.map((festival, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {festival}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Significance */}
                      <div className="pt-2 border-t">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Star className="w-4 h-4" />
                          <span className="font-medium">Significance:</span>
                          <span>{period.significance}</span>
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {selectedPeriod === period.id && (
                        <div className="pt-4 border-t space-y-3 animate-in slide-in-from-top-2 duration-300">
                          <h4 className="font-semibold text-sm">Historical Context</h4>
                          <p className="text-sm text-muted-foreground">
                            This period represents a crucial phase in the evolution of Jharkhand's 
                            cultural landscape, with festivals serving as both community bonding 
                            events and preservation mechanisms for ancient traditions.
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>Historical Era</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              <span>Community Impact</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {timelineData.map((period) => (
            <Card 
              key={period.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedPeriod === period.id ? 'ring-2 ring-primary shadow-lg' : ''
              }`}
              onClick={() => handlePeriodClick(period.id)}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="text-center">
                    <div className="text-4xl mb-3">{period.icon}</div>
                    <Badge variant="outline" className="text-xs mb-2">
                      {period.period}
                    </Badge>
                    <h3 className="text-lg font-bold">{period.title}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm text-center leading-relaxed">
                    {period.description}
                  </p>

                  {/* Festivals */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-center">Key Festivals</h4>
                    <div className="flex flex-wrap justify-center gap-1">
                      {period.festivals.map((festival, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {festival}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Significance */}
                  <div className="text-center pt-3 border-t">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Star className="w-4 h-4" />
                      <span>{period.significance}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Selected Period Details */}
      {selectedPeriod && (
        <Card className="mt-8 border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">
                {timelineData.find(p => p.id === selectedPeriod)?.title} - Detailed View
              </h3>
              <p className="text-muted-foreground">
                This period marked a significant transformation in how festivals were celebrated 
                and preserved within Jharkhand's tribal communities. The cultural practices 
                developed during this time continue to influence modern celebrations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <Calendar className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold text-sm">Cultural Evolution</h4>
                  <p className="text-xs text-muted-foreground">Festivals evolved to reflect changing social needs</p>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold text-sm">Community Bond</h4>
                  <p className="text-xs text-muted-foreground">Strengthened tribal unity and identity</p>
                </div>
                <div className="text-center">
                  <Star className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold text-sm">Cultural Legacy</h4>
                  <p className="text-xs text-muted-foreground">Lasting impact on modern celebrations</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
