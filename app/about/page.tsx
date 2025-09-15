"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
  Calendar,
  Utensils,
  Camera,
  Mountain,
  Users,
  Award,
  TrendingUp
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Data for different sections with sliding images
const beautyImages = [
  { 
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    title: "Pristine Waterfalls",
    description: "Hundru Falls cascading through lush green valleys"
  },
  {
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80", 
    title: "Dense Forests",
    description: "Rich biodiversity in Jharkhand's forest reserves"
  },
  {
    url: "https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=800&q=80",
    title: "Rolling Hills",
    description: "The scenic beauty of Netarhat hill station"
  },
  {
    url: "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80",
    title: "Wildlife Sanctuaries", 
    description: "Home to elephants, tigers, and diverse fauna"
  }
];

const allJharkhandCities = [
  {
    name: "Ranchi",
    description: "The capital city known for its hills and waterfalls",
    population: "1.2 Million",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf5a?w=800&q=80",
    highlights: ["State Capital", "Educational Hub", "Hill Station"],
    district: "Ranchi"
  },
  {
    name: "Jamshedpur", 
    description: "Steel city and industrial hub of eastern India",
    population: "1.3 Million",
    image: "https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=800&q=80",
    highlights: ["Steel Production", "Planned City", "Industrial Hub"],
    district: "East Singhbhum"
  },
  {
    name: "Dhanbad",
    description: "Coal capital of India with rich mineral resources", 
    population: "1.2 Million",
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80",
    highlights: ["Coal Mining", "Energy Hub", "Educational Centers"],
    district: "Dhanbad"
  },
  {
    name: "Bokaro Steel City",
    description: "Modern steel city with planned infrastructure",
    population: "600k",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    highlights: ["Steel Plant", "Planned Development", "Industrial Growth"],
    district: "Bokaro"
  },
  {
    name: "Deoghar",
    description: "Holy city famous for Baidyanath Temple",
    population: "204k",
    image: "https://images.unsplash.com/photo-1582632443527-6747dfed4a37?w=800&q=80",
    highlights: ["Religious Tourism", "Jyotirlinga", "Pilgrimage Center"],
    district: "Deoghar"
  },
  {
    name: "Hazaribagh",
    description: "Known for national park and natural beauty",
    population: "154k",
    image: "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80",
    highlights: ["National Park", "Wildlife", "Natural Beauty"],
    district: "Hazaribagh"
  },
  {
    name: "Giridih",
    description: "Land of hills with Parasnath peak",
    population: "168k",
    image: "https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=800&q=80",
    highlights: ["Parasnath Hills", "Jain Pilgrimage", "Mining"],
    district: "Giridih"
  },
  {
    name: "Ramgarh",
    description: "Summer capital during British era",
    population: "78k",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    highlights: ["Hill Station", "Historical", "Cool Climate"],
    district: "Ramgarh"
  },
  {
    name: "Chaibasa",
    description: "Headquarters of West Singhbhum district",
    population: "80k",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    highlights: ["Tribal Culture", "Administrative Center", "Mining"],
    district: "West Singhbhum"
  },
  {
    name: "Medininagar (Daltonganj)",
    description: "Gateway to Betla National Park",
    population: "178k",
    image: "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80",
    highlights: ["Wildlife Tourism", "Betla National Park", "Tribal Heritage"],
    district: "Palamu"
  },
  {
    name: "Dumka",
    description: "Sub-capital and cultural hub of Santhal Pargana",
    population: "55k",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf5a?w=800&q=80",
    highlights: ["Sub-capital", "Santhal Culture", "Terracotta Temples"],
    district: "Dumka"
  },
  {
    name: "Sahibganj",
    description: "River port town on the banks of Ganges",
    population: "65k",
    image: "https://images.unsplash.com/photo-1582632443527-6747dfed4a37?w=800&q=80",
    highlights: ["Ganges River", "Port Town", "Trade Center"],
    district: "Sahibganj"
  }
];

// Glimpses of Jharkhand - Key highlights and facts
const glimpsesOfJharkhand = [
  {
    title: "The Land of Forests",
    description: "29% of Jharkhand is covered by forests, making it one of India's greenest states",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    fact: "Home to 5 National Parks",
    icon: "🌲"
  },
  {
    title: "Mineral Powerhouse",
    description: "Contains 40% of India's coal reserves and rich deposits of iron ore, copper, and mica",
    image: "https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=800&q=80",
    fact: "Leading producer of minerals",
    icon: "⛏️"
  },
  {
    title: "Tribal Heritage",
    description: "Home to 32 tribal communities preserving ancient traditions and cultural practices",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    fact: "32 Tribal Communities",
    icon: "🎭"
  },
  {
    title: "Waterfall Paradise",
    description: "Over 100 spectacular waterfalls including India's highest single-drop waterfall",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    fact: "100+ Waterfalls",
    icon: "💧"
  },
  {
    title: "Industrial Hub",
    description: "Major industrial centers contributing significantly to India's steel and coal production",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf5a?w=800&q=80",
    fact: "Steel & Coal Capital",
    icon: "🏭"
  },
  {
    title: "Spiritual Destination",
    description: "Sacred temples including Baidyanath Jyotirlinga and Parasnath Hills for Jains",
    image: "https://images.unsplash.com/photo-1582632443527-6747dfed4a37?w=800&q=80",
    fact: "Sacred Pilgrimage Sites",
    icon: "🛕"
  }
];

const topCuisines = [
  {
    name: "Litti Chokha",
    description: "Traditional stuffed wheat balls with spiced mashed vegetables",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=80",
    type: "Main Course",
    taste: "Spicy & Smoky"
  },
  {
    name: "Dhuska",
    description: "Deep-fried lentil and rice pancakes served with curry",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80", 
    type: "Breakfast",
    taste: "Crispy & Savory"
  },
  {
    name: "Pittha",
    description: "Steamed rice flour dumplings with jaggery filling",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d973?w=800&q=80",
    type: "Dessert", 
    taste: "Sweet & Soft"
  },
  {
    name: "Handia",
    description: "Traditional fermented rice beer of tribal communities",
    image: "https://images.unsplash.com/photo-1558642891-54be180ea339?w=800&q=80",
    type: "Beverage",
    taste: "Mild & Refreshing"
  }
];

const topFestivals = [
  {
    name: "Sarhul Festival",
    description: "Spring festival celebrating nature and Sal trees",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    month: "March-April",
    significance: "Tribal New Year"
  },
  {
    name: "Sohrai Festival", 
    description: "Harvest festival with beautiful tribal wall paintings",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
    month: "October-November",
    significance: "Cattle & Harvest"
  },
  {
    name: "Karma Festival",
    description: "Festival dedicated to the worship of Karma tree",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80", 
    month: "August-September",
    significance: "Nature Worship"
  },
  {
    name: "Tusu Festival",
    description: "Folk festival marking the end of harvest season",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    month: "December-January", 
    significance: "Folk Celebration"
  }
];

const topPlaces = [
  {
    name: "Betla National Park",
    description: "First national park of Jharkhand with tigers and elephants",
    image: "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80",
    category: "Wildlife",
    rating: 4.5
  },
  {
    name: "Netarhat Hill Station",
    description: "Queen of Chotanagpur with spectacular sunrise views", 
    image: "https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=800&q=80",
    category: "Hill Station",
    rating: 4.6
  },
  {
    name: "Baidyanath Dham",
    description: "One of the 12 Jyotirlingas, major pilgrimage site",
    image: "https://images.unsplash.com/photo-1582632443527-6747dfed4a37?w=800&q=80",
    category: "Religious",
    rating: 4.7
  },
  {
    name: "Hundru Falls",
    description: "98-meter spectacular waterfall near Ranchi",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    category: "Waterfall", 
    rating: 4.5
  }
];

// Reusable Carousel Component
const ImageCarousel = ({ images, currentIndex, onNext, onPrev, children }: any) => (
  <div className="relative h-96 overflow-hidden rounded-2xl group">
    <div 
      className="flex transition-transform duration-500 ease-in-out h-full"
      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
    >
      {images.map((item: any, index: number) => (
        <div key={index} className="w-full h-full flex-shrink-0 relative">
          <Image
            src={item.image || item.url}
            alt={item.title || item.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          {children && children(item, index)}
        </div>
      ))}
    </div>
    
    {/* Navigation Buttons */}
    <Button
      variant="ghost"
      size="icon"
      onClick={onPrev}
      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
    >
      <ChevronLeft className="h-5 w-5" />
    </Button>
    <Button
      variant="ghost"
      size="icon"
      onClick={onNext}
      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
    >
      <ChevronRight className="h-5 w-5" />
    </Button>

    {/* Dots Indicator */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
      {images.map((_: any, index: number) => (
        <button
          key={index}
          onClick={() => {}}
          className={`w-2 h-2 rounded-full transition-all duration-200 ${
            index === currentIndex ? 'bg-white scale-125' : 'bg-white/60'
          }`}
        />
      ))}
    </div>
  </div>
);

export default function AboutJharkhandPage() {
  // Carousel states
  const [beautyIndex, setBeautyIndex] = useState(0);
  const [cityIndex, setCityIndex] = useState(0);
  const [glimpseIndex, setGlimpseIndex] = useState(0);
  const [cuisineIndex, setCuisineIndex] = useState(0);
  const [festivalIndex, setFestivalIndex] = useState(0);
  const [placeIndex, setPlaceIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const intervals = [
      setInterval(() => setBeautyIndex(prev => (prev + 1) % beautyImages.length), 4000),
      setInterval(() => setCityIndex(prev => (prev + 1) % allJharkhandCities.length), 4500),
      setInterval(() => setGlimpseIndex(prev => (prev + 1) % glimpsesOfJharkhand.length), 3500),
      setInterval(() => setCuisineIndex(prev => (prev + 1) % topCuisines.length), 5000),
      setInterval(() => setFestivalIndex(prev => (prev + 1) % topFestivals.length), 5500),
      setInterval(() => setPlaceIndex(prev => (prev + 1) % topPlaces.length), 6000),
    ];

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-blue-600/5 to-purple-600/10" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-emerald-100 text-emerald-700 border-emerald-200 px-6 py-2 text-sm font-medium">
            🌿 Discover Jharkhand
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight mb-8">
            About Jharkhand
          </h1>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            Discover the land of forests, where nature meets culture. Jharkhand, meaning "land of trees," 
            is blessed with pristine waterfalls, rich mineral resources, vibrant tribal heritage, and warm hospitality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/places">Explore Destinations</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/festivals">Cultural Heritage</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Beauty of Jharkhand */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Beauty of Jharkhand</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From cascading waterfalls to dense forests, Jharkhand's natural beauty is unparalleled
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <ImageCarousel
                images={beautyImages}
                currentIndex={beautyIndex}
                onNext={() => setBeautyIndex(prev => (prev + 1) % beautyImages.length)}
                onPrev={() => setBeautyIndex(prev => (prev - 1 + beautyImages.length) % beautyImages.length)}
              >
                {(item: any) => (
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-white/90">{item.description}</p>
                  </div>
                )}
              </ImageCarousel>
            </div>
            
            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Mountain className="h-6 w-6 text-emerald-600" />
                    <h3 className="text-xl font-semibold">Natural Wonders</h3>
                  </div>
                  <p className="text-gray-600">Home to over 100 waterfalls, dense forests covering 29% of the state, and the Eastern Ghats.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="h-6 w-6 text-emerald-600" />
                    <h3 className="text-xl font-semibold">Rich Biodiversity</h3>
                  </div>
                  <p className="text-gray-600">Habitat to tigers, elephants, leopards and over 500 bird species across 5 national parks.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="h-6 w-6 text-emerald-600" />
                    <h3 className="text-xl font-semibold">Geological Heritage</h3>
                  </div>
                  <p className="text-gray-600">Rich in minerals with 40% of India's coal reserves and significant deposits of iron ore and copper.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* All Cities of Jharkhand */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Cities of Jharkhand</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore all the major cities that make Jharkhand a diverse and vibrant state
            </p>
            <Badge className="mt-4 bg-blue-100 text-blue-700 border-blue-200">
              {allJharkhandCities.length} Major Cities
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Cities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[800px] overflow-y-auto pr-4">
              {allJharkhandCities.map((city, index) => (
                <Card 
                  key={city.name} 
                  className={`bg-white/90 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 hover:shadow-xl ${
                    index === cityIndex ? 'ring-2 ring-blue-500 shadow-xl scale-105' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{city.name}</h3>
                        <p className="text-xs text-gray-500">{city.district} • {city.population}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{city.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {city.highlights.map((highlight, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Featured City Carousel */}
            <div className="sticky top-8">
              <h3 className="text-2xl font-semibold mb-6 text-center">Featured City</h3>
              <ImageCarousel
                images={allJharkhandCities}
                currentIndex={cityIndex}
                onNext={() => setCityIndex(prev => (prev + 1) % allJharkhandCities.length)}
                onPrev={() => setCityIndex(prev => (prev - 1 + allJharkhandCities.length) % allJharkhandCities.length)}
              >
                {(city: any) => (
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <Badge className="mb-2 bg-blue-600 text-white border-0">
                      {city.district}
                    </Badge>
                    <h3 className="text-2xl font-bold mb-2">{city.name}</h3>
                    <p className="text-white/90 mb-2">{city.description}</p>
                    <div className="text-sm text-white/80">Population: {city.population}</div>
                  </div>
                )}
              </ImageCarousel>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-4">
                  {cityIndex + 1} of {allJharkhandCities.length} cities
                </p>
                <Button 
                  onClick={() => setCityIndex(prev => (prev + 1) % allJharkhandCities.length)}
                  variant="outline" 
                  size="sm"
                >
                  Next City →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Glimpses of Jharkhand */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Glimpses of Jharkhand</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover fascinating facts and unique aspects that make Jharkhand truly special
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <ImageCarousel
                images={glimpsesOfJharkhand}
                currentIndex={glimpseIndex}
                onNext={() => setGlimpseIndex(prev => (prev + 1) % glimpsesOfJharkhand.length)}
                onPrev={() => setGlimpseIndex(prev => (prev - 1 + glimpsesOfJharkhand.length) % glimpsesOfJharkhand.length)}
              >
                {(glimpse: any) => (
                  <div className="absolute inset-6 flex flex-col justify-end text-white">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{glimpse.icon}</span>
                        <Badge className="bg-green-600 text-white border-0">
                          {glimpse.fact}
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{glimpse.title}</h3>
                      <p className="text-white/90">{glimpse.description}</p>
                    </div>
                  </div>
                )}
              </ImageCarousel>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {glimpsesOfJharkhand.map((glimpse, index) => (
                <Card 
                  key={glimpse.title}
                  className={`bg-white/90 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 hover:shadow-xl ${
                    index === glimpseIndex ? 'ring-2 ring-green-500 shadow-xl scale-105' : ''
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{glimpse.icon}</span>
                      <div>
                        <h3 className="text-lg font-semibold">{glimpse.title}</h3>
                        <Badge variant="outline" className="text-xs mt-1">
                          {glimpse.fact}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{glimpse.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">29%</div>
                <div className="text-sm text-gray-600">Forest Cover</div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">24</div>
                <div className="text-sm text-gray-600">Districts</div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">32</div>
                <div className="text-sm text-gray-600">Tribal Groups</div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">100+</div>
                <div className="text-sm text-gray-600">Waterfalls</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Top Cuisine */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Top Cuisine</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Authentic flavors from tribal kitchens that tell stories of tradition and culture
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <ImageCarousel
                images={topCuisines}
                currentIndex={cuisineIndex}
                onNext={() => setCuisineIndex(prev => (prev + 1) % topCuisines.length)}
                onPrev={() => setCuisineIndex(prev => (prev - 1 + topCuisines.length) % topCuisines.length)}
              >
                {(cuisine: any) => (
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-orange-500 text-white border-0">
                        {cuisine.type}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{cuisine.name}</h3>
                    <p className="text-white/90 mb-2">{cuisine.description}</p>
                    <div className="text-sm text-white/80">Taste: {cuisine.taste}</div>
                  </div>
                )}
              </ImageCarousel>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {topCuisines.map((cuisine, index) => (
                <Card 
                  key={cuisine.name}
                  className={`bg-white/90 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 ${
                    index === cuisineIndex ? 'ring-2 ring-orange-500 shadow-xl scale-105' : 'hover:shadow-xl'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Utensils className="h-6 w-6 text-orange-600" />
                      <Badge variant="outline" className="text-xs">
                        {cuisine.type}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{cuisine.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{cuisine.description}</p>
                    <div className="text-xs text-gray-500">
                      <strong>Taste:</strong> {cuisine.taste}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Festivals */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Top Festivals</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Celebrate the rich tribal heritage through colorful festivals that connect us to nature
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {topFestivals.map((festival, index) => (
                <Card 
                  key={festival.name}
                  className={`bg-white/90 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 ${
                    index === festivalIndex ? 'ring-2 ring-amber-500 shadow-xl scale-105' : 'hover:shadow-xl'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar className="h-6 w-6 text-amber-600" />
                      <Badge variant="outline" className="text-xs">
                        {festival.month}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{festival.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{festival.description}</p>
                    <div className="text-xs text-gray-500">
                      <strong>Significance:</strong> {festival.significance}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div>
              <ImageCarousel
                images={topFestivals}
                currentIndex={festivalIndex}
                onNext={() => setFestivalIndex(prev => (prev + 1) % topFestivals.length)}
                onPrev={() => setFestivalIndex(prev => (prev - 1 + topFestivals.length) % topFestivals.length)}
              >
                {(festival: any) => (
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-amber-500 text-white border-0">
                        {festival.month}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{festival.name}</h3>
                    <p className="text-white/90 mb-2">{festival.description}</p>
                    <div className="text-sm text-white/80">Significance: {festival.significance}</div>
                  </div>
                )}
              </ImageCarousel>
            </div>
          </div>
        </div>
      </section>

      {/* Top Places */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Top Places</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Must-visit destinations that showcase the diverse beauty and heritage of Jharkhand
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <ImageCarousel
                images={topPlaces}
                currentIndex={placeIndex}
                onNext={() => setPlaceIndex(prev => (prev + 1) % topPlaces.length)}
                onPrev={() => setPlaceIndex(prev => (prev - 1 + topPlaces.length) % topPlaces.length)}
              >
                {(place: any) => (
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-green-500 text-white border-0">
                        {place.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm">{place.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{place.name}</h3>
                    <p className="text-white/90">{place.description}</p>
                  </div>
                )}
              </ImageCarousel>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {topPlaces.map((place, index) => (
                <Card 
                  key={place.name}
                  className={`bg-white/90 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 ${
                    index === placeIndex ? 'ring-2 ring-green-500 shadow-xl scale-105' : 'hover:shadow-xl'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="text-xs">
                        {place.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{place.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{place.name}</h3>
                    <p className="text-gray-600 text-sm">{place.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Explore Jharkhand?</h2>
          <p className="text-xl mb-8 text-white/90 leading-relaxed">
            From pristine forests to vibrant festivals, from ancient temples to modern cities - 
            Jharkhand offers experiences that will create memories for a lifetime.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
              <Link href="/places">Start Exploring</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link href="/contact">Plan Your Trip</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
