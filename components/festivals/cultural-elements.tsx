'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Palette, Music, Hammer, Utensils, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { culturalData } from '@/lib/festival-data';

const culturalCategories = [
  { id: 'art', name: 'Visual Arts', icon: Palette, color: 'bg-pink-500' },
  { id: 'craft', name: 'Handicrafts', icon: Hammer, color: 'bg-orange-500' },
  { id: 'music', name: 'Music & Dance', icon: Music, color: 'bg-purple-500' },
  { id: 'cuisine', name: 'Traditional Cuisine', icon: Utensils, color: 'bg-green-500' },
  { id: 'language', name: 'Languages', icon: Users, color: 'bg-blue-500' }
];

export default function CulturalElements() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  const filteredElements = selectedCategory === 'all' 
    ? culturalData 
    : culturalData.filter(element => element.type === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('all')}
          className="flex items-center gap-2"
        >
          All Elements
        </Button>
        {culturalCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {category.name}
            </Button>
          );
        })}
      </div>

      {/* Cultural Elements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredElements.map((element) => {
          const category = culturalCategories.find(cat => cat.id === element.type);
          const Icon = category?.icon || Users;
          
          return (
            <Card
              key={element.id}
              className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              onMouseEnter={() => setHoveredElement(element.id)}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <CardHeader className="pb-4">
                <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={element.media.images[0]}
                    alt={element.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <Badge className={`${category?.color} text-white`}>
                      <Icon className="h-3 w-3 mr-1" />
                      {category?.name}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {element.name}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">{element.nameLocal}</p>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4">
                  <p className="text-muted-foreground line-clamp-2">
                    {element.description}
                  </p>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" size="sm">{element.region}</Badge>
                    {element.tribe && (
                      <Badge variant="outline" size="sm">{element.tribe}</Badge>
                    )}
                  </div>

                  {/* Techniques Preview */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Key Techniques:</h4>
                    <div className="flex flex-wrap gap-1">
                      {element.techniques.slice(0, 3).map((technique, index) => (
                        <span
                          key={index}
                          className="text-xs bg-muted px-2 py-1 rounded-md"
                        >
                          {technique}
                        </span>
                      ))}
                      {element.techniques.length > 3 && (
                        <span className="text-xs bg-muted px-2 py-1 rounded-md">
                          +{element.techniques.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Artisans */}
                  {element.artisans.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Featured Artisans:</h4>
                      <div className="space-y-1">
                        {element.artisans.slice(0, 2).map((artisan, index) => (
                          <div key={index} className="text-sm text-muted-foreground">
                            <span className="font-medium">{artisan.name}</span>
                            <span className="text-xs"> • {artisan.location}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground">
                    Explore Tradition
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Featured Workshop Section */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Learn Traditional Arts</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join hands-on workshops with master artisans and learn authentic Jharkhand crafts, 
                from Dokra metal casting to Sohrai painting techniques.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <Hammer className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                  <h4 className="font-semibold">Dokra Workshop</h4>
                  <p className="text-sm text-muted-foreground">3-day intensive</p>
                  <Button size="sm" className="mt-2">Book Now</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Palette className="h-8 w-8 mx-auto mb-2 text-pink-500" />
                  <h4 className="font-semibold">Sohrai Painting</h4>
                  <p className="text-sm text-muted-foreground">2-day course</p>
                  <Button size="sm" className="mt-2">Book Now</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Music className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <h4 className="font-semibold">Folk Music</h4>
                  <p className="text-sm text-muted-foreground">Weekend sessions</p>
                  <Button size="sm" className="mt-2">Book Now</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cultural Significance */}
      <Card className="bg-muted/50">
        <CardContent className="p-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h3 className="text-2xl font-bold">Cultural Preservation</h3>
            <p className="text-lg text-muted-foreground">
              Jharkhand's cultural elements are living traditions that connect communities to their ancestral roots. 
              Through tourism and education, we help preserve these invaluable art forms for future generations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Active Artisans</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">25+</div>
                <div className="text-sm text-muted-foreground">Art Forms</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Tribal Communities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">2000+</div>
                <div className="text-sm text-muted-foreground">Years of Heritage</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
