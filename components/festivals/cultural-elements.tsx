'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Palette, Music, Hammer, Utensils, Users, ArrowRight, Zap, Star, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Use the same cultural elements data structure as the main cultural heritage page
const culturalElements = [
  {
    id: "dokra-metal-craft",
    title: "Dokra Metal Craft",
    briefDescription: "Ancient lost-wax casting technique creating exquisite bronze sculptures and decorative items that showcase thousands of years of metallurgical expertise.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
    category: "Metal Craft",
    highlights: ["Lost-Wax Casting", "Bronze Figurines", "Tribal Motifs"],
    type: "craft"
  },
  {
    id: "jhumar-dance",
    title: "Jhumar Dance",
    briefDescription: "Energetic group dance performed during festivals and celebrations, characterized by rhythmic movements that celebrate community unity and cultural identity.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    category: "Performance Arts",
    highlights: ["Circle Formation", "Rhythmic Steps", "Festival Performances"],
    type: "music"
  },
  {
    id: "bamboo-cane-craft",
    title: "Bamboo & Cane Craft",
    briefDescription: "Sustainable handicrafts made from locally sourced bamboo and cane, creating functional and decorative items using traditional weaving techniques.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    category: "Handicrafts",
    highlights: ["Eco-friendly Materials", "Traditional Weaving", "Functional Items"],
    type: "craft"
  },
  {
    id: "tribal-folk-music",
    title: "Tribal Folk Music",
    briefDescription: "Melodious traditional songs and instrumental music that preserve oral history, cultural values, and spiritual beliefs of tribal communities.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
    category: "Music",
    highlights: ["Traditional Instruments", "Tribal Languages", "Oral Traditions"],
    type: "music"
  },
  {
    id: "traditional-tribal-cuisine",
    title: "Traditional Tribal Cuisine",
    briefDescription: "Authentic culinary traditions featuring organic ingredients, traditional cooking methods, and recipes passed down through generations of tribal communities.",
    image: "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80",
    category: "Cuisine",
    highlights: ["Organic Ingredients", "Traditional Recipes", "Forest Produce"],
    type: "cuisine"
  }
];

const culturalCategories = [
  { id: 'art', name: 'Visual Arts', icon: Palette, color: 'bg-pink-500' },
  { id: 'craft', name: 'Handicrafts', icon: Hammer, color: 'bg-amber-600' },
  { id: 'music', name: 'Music & Dance', icon: Music, color: 'bg-purple-500' },
  { id: 'cuisine', name: 'Traditional Cuisine', icon: Utensils, color: 'bg-orange-500' },
  { id: 'language', name: 'Languages', icon: Users, color: 'bg-blue-500' }
];

export default function CulturalElements() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const router = useRouter();

  const filteredElements = selectedCategory === 'all' 
    ? culturalElements 
    : culturalElements.filter(element => element.type === selectedCategory);

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
              className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden"
              onMouseEnter={() => setHoveredElement(element.id)}
              onMouseLeave={() => setHoveredElement(null)}
              onClick={() => router.push(`/cultural-heritage/${element.id}`)}
            >
              <CardHeader className="pb-4">
                <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={element.image}
                    alt={element.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <Badge className={`${category?.color || 'bg-gray-500'} text-white`}>
                      <Icon className="h-3 w-3 mr-1" />
                      {element.category}
                    </Badge>
                  </div>

                  {/* Stats */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2 py-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-white text-xs">4.8</span>
                    </div>
                    <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2 py-1">
                      <Eye className="h-3 w-3 text-white" />
                      <span className="text-white text-xs">2.1k</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {element.title}
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4">
                  <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                    {element.briefDescription}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Key Highlights:</h4>
                    <div className="flex flex-wrap gap-1">
                      {element.highlights.slice(0, 3).map((highlight, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                        >
                          {highlight}
                        </Badge>
                      ))}
                      {element.highlights.length > 3 && (
                        <Badge variant="outline" size="sm" className="text-xs">
                          +{element.highlights.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/cultural-heritage/${element.id}`);
                    }}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Explore Heritage
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Explore More Section */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Explore More Cultural Heritage</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover the complete collection of Jharkhand's cultural treasures, with detailed information 
                about traditions, techniques, and the communities that keep them alive.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/cultural-heritage">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Zap className="h-5 w-5 mr-2" />
                  View All Cultural Heritage
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <Hammer className="h-8 w-8 mx-auto mb-2 text-amber-600" />
                  <h4 className="font-semibold">Dokra Craft</h4>
                  <p className="text-sm text-muted-foreground">Ancient metal casting</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Music className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <h4 className="font-semibold">Jhumar Dance</h4>
                  <p className="text-sm text-muted-foreground">Traditional folk dance</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Utensils className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                  <h4 className="font-semibold">Tribal Cuisine</h4>
                  <p className="text-sm text-muted-foreground">Traditional recipes</p>
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
