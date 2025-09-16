"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  TrendingUp,
  ExternalLink,
  Clock,
  Navigation as NavigationIcon,
  Heart,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getPlaceDescription, hasPlacePage, getPlacePageRoute, PlaceDescription } from "@/lib/place-descriptions";

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
    name: "Bokaro",
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
  const router = useRouter();
  
  // Carousel states
  const [beautyIndex, setBeautyIndex] = useState(0);
  const [cityIndex, setCityIndex] = useState(0);
  const [glimpseIndex, setGlimpseIndex] = useState(0);
  const [cuisineIndex, setCuisineIndex] = useState(0);
  const [festivalIndex, setFestivalIndex] = useState(0);
  const [placeIndex, setPlaceIndex] = useState(0);
  
  // Popup modal states
  const [selectedPlace, setSelectedPlace] = useState<PlaceDescription | null>(null);
  const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [selectedGlimpse, setSelectedGlimpse] = useState<any>(null);
  const [isGlimpseModalOpen, setIsGlimpseModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [glimpseImageIndex, setGlimpseImageIndex] = useState(0);

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
  
  // Handle place click - redirect to page if exists, otherwise show popup
  const handlePlaceClick = (placeName: string) => {
    const pageRoute = getPlacePageRoute(placeName);
    const placeDescription = getPlaceDescription(placeName);
    
    if (hasPlacePage(placeName) && pageRoute) {
      router.push(pageRoute);
    } else if (placeDescription) {
      setSelectedPlace(placeDescription);
      setCurrentImageIndex(0);
      setIsPlaceModalOpen(true);
    }
  };
  
  // Handle city click - show popup with detailed info
  const handleCityClick = (city: any) => {
    // Normalize city name for comparison
    const normalizedCityName = city.name.toLowerCase().trim();
    
    // Map city names to their routes
    const cityRouteMap: { [key: string]: string } = {
      'ranchi': '/cities/ranchi',
      'jamshedpur': '/cities/jamshedpur', 
      'dhanbad': '/cities/dhanbad',
      'bokaro': '/cities/bokaro',
      'bokaro steel city': '/cities/bokaro',
      'deoghar': '/cities/deoghar'
    };
    
    // Check if city has a dedicated page
    const cityRoute = cityRouteMap[normalizedCityName];
    
    if (cityRoute) {
      console.log(`Redirecting to: ${cityRoute}`);
      router.push(cityRoute);
    } else {
      console.log(`Showing popup for: ${city.name}`);
      setSelectedCity(city);
      setIsCityModalOpen(true);
    }
  };
  
  // Handle glimpse click - show scrolling photos modal
  const handleGlimpseClick = (glimpse: any) => {
    setSelectedGlimpse(glimpse);
    setGlimpseImageIndex(0);
    setIsGlimpseModalOpen(true);
  };
  
  // Handle cuisine click - redirect to cuisine page with anchor
  const handleCuisineClick = (cuisine: any) => {
    const cuisineName = cuisine.name.toLowerCase().replace(/\s+/g, '-');
    router.push(`/cuisine-of-jharkhand#${cuisineName}`);
  };
  
  // Handle festival click - redirect to explore-festivals page with anchor
  const handleFestivalClick = (festival: any) => {
    const festivalName = festival.name.toLowerCase().replace(/\s+/g, '-').replace('festival', '').trim();
    router.push(`/explore-festivals#${festivalName}`);
  };
  
  // Image navigation for modals
  const nextImage = () => {
    if (selectedPlace && selectedPlace.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedPlace.images.length);
    }
  };
  
  const prevImage = () => {
    if (selectedPlace && selectedPlace.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedPlace.images.length) % selectedPlace.images.length);
    }
  };
  
  // Glimpse image navigation
  const nextGlimpseImage = () => {
    if (selectedGlimpse) {
      // Create an array of related images for glimpses (we'll use the same image multiple times for demo)
      const images = [selectedGlimpse.image, selectedGlimpse.image, selectedGlimpse.image];
      setGlimpseImageIndex((prev) => (prev + 1) % images.length);
    }
  };
  
  const prevGlimpseImage = () => {
    if (selectedGlimpse) {
      const images = [selectedGlimpse.image, selectedGlimpse.image, selectedGlimpse.image];
      setGlimpseImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/jharkhand.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="max-w-7xl mx-auto text-center relative z-20">
          <Badge className="mb-6 bg-emerald-100 text-emerald-700 border-emerald-200 px-6 py-2 text-sm font-medium">
            🌿 Discover Jharkhand
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight mb-8">
            About Jharkhand
          </h1>
          
          <p className="text-xl text-white max-w-4xl mx-auto leading-relaxed mb-12">
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
                  className={`bg-white/90 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
                    index === cityIndex ? 'ring-2 ring-blue-500 shadow-xl scale-105' : 'hover:scale-105'
                  }`}
                  onClick={() => handleCityClick(city)}
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
                  className={`bg-white/90 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
                    index === glimpseIndex ? 'ring-2 ring-green-500 shadow-xl scale-105' : 'hover:scale-105'
                  }`}
                  onClick={() => handleGlimpseClick(glimpse)}
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
                  className={`bg-white/90 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 cursor-pointer ${
                    index === cuisineIndex ? 'ring-2 ring-orange-500 shadow-xl scale-105' : 'hover:shadow-xl hover:scale-105'
                  }`}
                  onClick={() => handleCuisineClick(cuisine)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Utensils className="h-6 w-6 text-orange-600" />
                      <Badge variant="outline" className="text-xs">
                        {cuisine.type}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-orange-600 transition-colors">{cuisine.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{cuisine.description}</p>
                    <div className="text-xs text-gray-500">
                      <strong>Taste:</strong> {cuisine.taste}
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-xs text-orange-600">
                      <span>View Recipe</span>
                      <ExternalLink className="h-3 w-3" />
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
                  className={`bg-white/90 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 cursor-pointer ${
                    index === festivalIndex ? 'ring-2 ring-amber-500 shadow-xl scale-105' : 'hover:shadow-xl hover:scale-105'
                  }`}
                  onClick={() => handleFestivalClick(festival)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar className="h-6 w-6 text-amber-600" />
                      <Badge variant="outline" className="text-xs">
                        {festival.month}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-amber-600 transition-colors">{festival.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{festival.description}</p>
                    <div className="text-xs text-gray-500 mb-2">
                      <strong>Significance:</strong> {festival.significance}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-amber-600">
                      <span>Learn More</span>
                      <ExternalLink className="h-3 w-3" />
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
                  className={`bg-white/90 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 cursor-pointer ${
                    index === placeIndex ? 'ring-2 ring-green-500 shadow-xl scale-105' : 'hover:shadow-xl hover:scale-105'
                  }`}
                  onClick={() => handlePlaceClick(place.name)}
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
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-green-600 transition-colors">{place.name}</h3>
                        <p className="text-gray-600 text-sm">{place.description}</p>
                      </div>
                      <ExternalLink className="h-5 w-5 text-gray-400 ml-2" />
                    </div>
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
            <Button asChild size="lg" className="bg-green-400 text-white hover:bg-green-500">
              <Link href="/contact">Plan Your Trip</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Place Details Modal */}
      <Dialog open={isPlaceModalOpen} onOpenChange={setIsPlaceModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedPlace && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl font-bold">{selectedPlace.name}</DialogTitle>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">{selectedPlace.category}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{selectedPlace.rating}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {selectedPlace.location}
                </p>
              </DialogHeader>
              
              {/* Image Gallery */}
              <div className="relative h-64 rounded-lg overflow-hidden mb-6">
                <Image
                  src={selectedPlace.images[currentImageIndex]}
                  alt={selectedPlace.name}
                  fill
                  className="object-cover"
                />
                {selectedPlace.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                      {selectedPlace.images.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              {/* Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">About</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedPlace.detailedDescription}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      Highlights
                    </h4>
                    <ul className="space-y-1">
                      {selectedPlace.highlights.map((highlight, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      Best Time to Visit
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">{selectedPlace.bestTimeToVisit}</p>
                    
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <NavigationIcon className="h-4 w-4 text-green-500" />
                      How to Reach
                    </h4>
                    <p className="text-sm text-gray-600">{selectedPlace.howToReach}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-red-500" />
                      Nearby Attractions
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPlace.nearbyAttractions.map((attraction, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {attraction}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Heart className="h-4 w-4 text-pink-500" />
                      Activities
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPlace.activities.map((activity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {activity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-orange-500" />
                    Travel Tips
                  </h4>
                  <ul className="space-y-2">
                    {selectedPlace.tips.map((tip, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <div className="w-1 h-1 bg-orange-500 rounded-full mt-2" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    onClick={() => setIsPlaceModalOpen(false)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    Plan Visit
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsPlaceModalOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* City Details Modal */}
      <Dialog open={isCityModalOpen} onOpenChange={setIsCityModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedCity && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedCity.name}</DialogTitle>
                <p className="text-gray-600 flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {selectedCity.district} District • Population: {selectedCity.population}
                </p>
              </DialogHeader>
              
              <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                <Image
                  src={selectedCity.image}
                  alt={selectedCity.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{selectedCity.description}</p>
                
                <div>
                  <h4 className="font-semibold mb-2">Key Highlights</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCity.highlights.map((highlight: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    onClick={() => {
                      setIsCityModalOpen(false);
                      router.push('/places');
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Explore Places
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsCityModalOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Glimpse Details Modal */}
      <Dialog open={isGlimpseModalOpen} onOpenChange={setIsGlimpseModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedGlimpse && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl font-bold">{selectedGlimpse.title}</DialogTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{selectedGlimpse.icon}</span>
                    <Badge className="bg-green-100 text-green-800">{selectedGlimpse.fact}</Badge>
                  </div>
                </div>
              </DialogHeader>
              
              {/* Scrolling Image Gallery */}
              <div className="relative h-80 rounded-lg overflow-hidden mb-6">
                <div className="flex transition-transform duration-500 ease-in-out h-full">
                  {/* Display multiple variations of the same image for demo */}
                  {[selectedGlimpse.image, selectedGlimpse.image, selectedGlimpse.image].map((img, index) => (
                    <div key={index} className="w-full h-full flex-shrink-0 relative">
                      <Image
                        src={img}
                        alt={`${selectedGlimpse.title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-sm opacity-80">Image {index + 1} of 3</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Navigation Buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  onClick={prevGlimpseImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  onClick={nextGlimpseImage}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
                
                {/* Dots Indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {[0, 1, 2].map((index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === glimpseImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">About</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedGlimpse.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      Key Facts
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm text-gray-600">{selectedGlimpse.fact}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm text-gray-600">Rich cultural heritage</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm text-gray-600">Natural diversity</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-blue-500" />
                      Significance
                    </h4>
                    <p className="text-sm text-gray-600">
                      This aspect of Jharkhand represents the unique character and identity of the state, 
                      showcasing its contribution to India's cultural and natural heritage.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    onClick={() => {
                      setIsGlimpseModalOpen(false);
                      router.push('/places');
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    Explore Related Places
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsGlimpseModalOpen(false)}
                  >
                    Close
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
