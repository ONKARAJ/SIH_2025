'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import {
  MapPin,
  Star,
  Clock,
  Users,
  Thermometer,
  Calendar,
  Camera,
  Heart,
  Plane,
  Train,
  Bus,
  Building,
  Wifi,
  Car,
  Coffee,
  Utensils,
  ArrowLeft,
  Upload,
  Send,
  ExternalLink,
  Navigation as NavigationIcon,
  Phone,
  Mail,
  Globe,
  DollarSign,
  CheckCircle,
  Info,
  X
} from 'lucide-react'
import { CityData, citiesData } from '@/lib/cities-data'
import { InteractiveCityMap } from '@/components/interactive-city-map'
import { CityProtectedReviewForm } from '@/components/city-protected-review-form'

// Function to calculate hotel ID based on global position
const calculateHotelId = (cityId: string, hotelIndex: number) => {
  let globalHotelIndex = 1;
  
  // Iterate through cities to find the global position
  for (const city of citiesData) {
    if (city.id === cityId) {
      // Found the target city, add the hotel index
      globalHotelIndex += hotelIndex;
      break;
    }
    // Add all hotels from this city to the global index
    globalHotelIndex += city.hotels.length;
  }
  
  return {
    hotelId: `hotel-${String(globalHotelIndex).padStart(3, '0')}`
  };
};

interface CityPageTemplateProps {
  city: CityData
}

export function CityPageTemplate({ city }: CityPageTemplateProps) {
  const router = useRouter()
  const [selectedHotelCategory, setSelectedHotelCategory] = useState<'all' | 'luxury' | 'business' | 'budget'>('all')
  const [selectedImage, setSelectedImage] = useState(0)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [selectedAttraction, setSelectedAttraction] = useState<any>(null)
  const [showAttractionPopup, setShowAttractionPopup] = useState(false)
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null)
  const [showSpecialtyPopup, setShowSpecialtyPopup] = useState(false)
  const [reviewData, setReviewData] = useState({
    name: '',
    rating: 5,
    comment: '',
    images: [] as string[]
  })
  const [allReviews, setAllReviews] = useState(city.reviews)
  const [refreshKey, setRefreshKey] = useState(0)

  const filteredHotels = selectedHotelCategory === 'all' 
    ? city.hotels 
    : city.hotels.filter(hotel => hotel.category === selectedHotelCategory)

  // Load reviews from localStorage on component mount
  useEffect(() => {
    const storageKey = `city-reviews-${city.id}`
    const savedReviews = JSON.parse(localStorage.getItem(storageKey) || '[]')
    // Combine default reviews with saved reviews
    const combinedReviews = [...savedReviews, ...city.reviews]
    setAllReviews(combinedReviews)
  }, [city.id, city.reviews, refreshKey])

  const averageRating = allReviews.length > 0 
    ? allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length 
    : 0

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setReviewData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }))
    }
  }

  const submitReview = () => {
    console.log('Submitting review:', reviewData)
    setShowReviewForm(false)
    setReviewData({ name: '', rating: 5, comment: '', images: [] })
  }

  const handleReviewSubmitted = () => {
    // Trigger a refresh of reviews
    setRefreshKey(prev => prev + 1)
  }

  // Get video paths with multiple sources for better fallback
  const getVideoPaths = () => {
    const cityNameLower = city.name.toLowerCase().replace(/\s+/g, '-')
    return {
      mp4: `/videos/cities/${cityNameLower}.mp4`,
      webm: `/videos/cities/${cityNameLower}.webm`,
      fallback: `/videos/cities/default-city.mp4`
    }
  }

  // Get brief specialty descriptions for cards
  const getBriefSpecialtyDescription = (specialty: string) => {
    const briefDescriptions: { [key: string]: string } = {
      'Tribal Culture': 'Rich indigenous heritage and ancient traditions',
      'Handloom': 'Traditional textile weaving and handicrafts',
      'Natural Beauty': 'Breathtaking landscapes and scenic valleys',
      'Educational Excellence': 'Prestigious institutions and centers of learning',
      'Steel Production': 'Major hub for steel manufacturing',
      'Planned City': 'Well-organized urban development',
      'Industrial Hub': 'Center of industrial activity',
      'Clean & Green': 'Environmentally conscious city',
      'Modern Infrastructure': 'Contemporary facilities and amenities',
      'Coal Mining': 'Major coal extraction center',
      'Energy Hub': 'Critical center for power generation',
      'Educational Centers': 'Hub of academic institutions',
      'IIT Dhanbad': 'Prestigious engineering institute',
      'Industrial Heritage': 'Rich history of industrial development',
      'Urban Planning': 'Exemplary city design',
      'Steel Industry': 'Backbone of steel manufacturing',
      'Planned Urban Development': 'Systematic approach to city growth',
      'Industrial Tourism': 'Unique industrial tourism opportunities',
      'Green City': 'Abundant parks and green spaces',
      'Religious Tourism': 'Sacred destination for pilgrims',
      'Jyotirlinga': 'One of twelve sacred Shiva temples',
      'Pilgrimage Center': 'Major religious destination',
      'Spiritual Heritage': 'Deep-rooted religious traditions',
      'Cultural Festivals': 'Vibrant local celebrations',
      'Traditional Crafts': 'Skilled artisans and handicrafts',
      'Engineering Education': 'Premier technical education',
      'Energy Sector': 'Power generation and infrastructure',
      'Spiritual Retreats': 'Peaceful meditation environments'
    }
    
    return briefDescriptions[specialty] || 'Distinctive local feature'
  }

  // Get specialty descriptions
  const getSpecialtyDescription = (specialty: string, cityName: string) => {
    const descriptions: { [key: string]: string } = {
      'Tribal Culture': 'Rich indigenous heritage with diverse tribal communities preserving ancient traditions, art forms, and lifestyle practices that have been passed down through generations.',
      'Handloom': 'Traditional textile weaving techniques creating beautiful fabrics, sarees, and handicrafts that showcase the artistic skills of local artisans.',
      'Natural Beauty': 'Breathtaking landscapes featuring lush forests, rolling hills, pristine waterfalls, and scenic valleys that offer stunning views and peaceful retreats.',
      'Educational Excellence': 'Home to prestigious institutions and centers of learning that contribute to academic advancement and research in various fields.',
      'Steel Production': 'Major industrial hub for steel manufacturing, contributing significantly to India\'s steel production and economic growth.',
      'Planned City': 'Well-organized urban development with systematic infrastructure, proper zoning, and modern amenities that serve as a model for urban planning.',
      'Industrial Hub': 'Center of industrial activity with major manufacturing units, providing employment and driving economic development in the region.',
      'Clean & Green': 'Environmentally conscious city with well-maintained green spaces, clean infrastructure, and sustainable development practices.',
      'Modern Infrastructure': 'Contemporary facilities including roads, utilities, telecommunications, and public amenities that support modern living standards.',
      'Coal Mining': 'Major coal extraction center contributing to India\'s energy production with extensive mining operations and related industries.',
      'Energy Hub': 'Critical center for power generation and energy distribution, supporting the electrical needs of multiple states and industrial sectors.',
      'Educational Centers': 'Hub of academic institutions including technical colleges, universities, and research centers fostering education and innovation.',
      'Industrial Heritage': 'Rich history of industrial development showcasing the evolution of manufacturing and technological advancement in the region.',
      'Urban Planning': 'Exemplary city design with organized sectors, efficient traffic management, and balanced residential-commercial development.',
      'Steel Industry': 'Backbone of steel manufacturing with state-of-the-art plants and facilities contributing to national steel production.',
      'Planned Urban Development': 'Systematic approach to city growth with proper infrastructure planning and sustainable development practices.',
      'Industrial Tourism': 'Unique tourism opportunities showcasing industrial processes, heritage sites, and the evolution of manufacturing in India.',
      'Religious Tourism': 'Sacred destination attracting pilgrims and spiritual seekers with ancient temples, holy sites, and religious significance.',
      'Jyotirlinga': 'One of the twelve most sacred Shiva temples in Hinduism, holding immense spiritual significance for devotees worldwide.',
      'Pilgrimage Center': 'Major religious destination where millions of devotees visit annually for spiritual fulfillment and religious ceremonies.',
      'Spiritual Heritage': 'Deep-rooted religious traditions and spiritual practices that have been preserved and celebrated for centuries.',
      'Cultural Festivals': 'Vibrant celebrations showcasing local traditions, religious observances, and cultural events that bring communities together.',
      'Traditional Crafts': 'Skilled artisans creating beautiful handicrafts, artwork, and traditional items using age-old techniques and local materials.',
      'Green City': 'Abundant parks, gardens, and green spaces that provide a healthy environment and enhance the quality of urban living.',
      'Engineering Education': 'Premier educational institutions specializing in engineering and technical education, producing skilled professionals.',
      'Energy Sector': 'Major contributor to power generation and energy infrastructure development supporting regional and national energy needs.',
      'Spiritual Retreats': 'Peaceful environments ideal for meditation, spiritual practices, and inner reflection away from urban distractions.'
    }
    
    return descriptions[specialty] || `${specialty} is a distinctive feature that makes ${cityName} unique and special, contributing to its cultural and economic significance in Jharkhand.`
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navigation />
      
      {/* Modern Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          {/* Background Video */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={(e) => {
              console.log('Video failed to load for city:', city.name)
              // Fallback to image if video fails to load
              const target = e.target as HTMLVideoElement
              target.style.display = 'none'
              const fallbackImg = target.nextElementSibling as HTMLElement
              if (fallbackImg) {
                fallbackImg.style.display = 'block'
              }
            }}
          >
            <source src={getVideoPaths().mp4} type="video/mp4" />
            <source src={getVideoPaths().webm} type="video/webm" />
            <source src={getVideoPaths().fallback} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Fallback Image (hidden by default, shown if video fails) */}
          <Image
            src={city.images.hero}
            alt={city.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            style={{ display: 'none' }}
          />
          
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
        
        {/* Floating Back Button */}
        <div className="absolute top-28 left-8 z-20">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white/90 border-white/20 text-gray-800 hover:bg-white backdrop-blur-md"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cities
          </Button>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center min-h-screen">
          <div className="max-w-7xl mx-auto px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-medium">
                      {city.district} District
                    </Badge>
                    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                      <Star className="h-4 w-4 text-amber-500 fill-current" />
                      <span className="text-sm font-medium text-gray-900">{averageRating.toFixed(1)}</span>
                      <span className="text-gray-700 text-sm">({allReviews.length} reviews)</span>
                    </div>
                  </div>
                  
                  <h1 className="text-6xl md:text-8xl font-black tracking-tight">
                    <span className="bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent drop-shadow-lg">
                      {city.name}
                    </span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-white leading-relaxed max-w-3xl font-light drop-shadow-md">
                    {city.description}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {city.highlights.slice(0, 4).map((highlight, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="border-white/30 text-white bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all duration-300 px-4 py-2"
                    >
                      {highlight}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-4 text-lg font-medium">
                    <Heart className="h-5 w-5 mr-3" />
                    Add to Favorites
                  </Button>
                </div>
              </div>

              {/* Modern Info Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="bg-gradient-to-br from-white/95 to-gray-50/90 backdrop-blur-md border border-white/30 rounded-2xl p-6 hover:from-white/100 hover:to-gray-50/95 transition-all duration-300 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{city.population}</div>
                      <div className="text-sm text-gray-600">Population</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-white/95 to-gray-50/90 backdrop-blur-md border border-white/30 rounded-2xl p-6 hover:from-white/100 hover:to-gray-50/95 transition-all duration-300 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <MapPin className="h-8 w-8 text-green-600" />
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{city.area}</div>
                      <div className="text-sm text-gray-600">Area</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-white/95 to-gray-50/90 backdrop-blur-md border border-white/30 rounded-2xl p-6 hover:from-white/100 hover:to-gray-50/95 transition-all duration-300 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <Thermometer className="h-8 w-8 text-orange-600" />
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{city.altitude}</div>
                      <div className="text-sm text-gray-600">Altitude</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-white/95 to-gray-50/90 backdrop-blur-md border border-white/30 rounded-2xl p-6 hover:from-white/100 hover:to-gray-50/95 transition-all duration-300 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <Calendar className="h-8 w-8 text-purple-600" />
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900">{city.bestTimeToVisit}</div>
                      <div className="text-sm text-gray-600">Best Time</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center drop-shadow-lg">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern About Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Discover <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{city.name}</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Immerse yourself in the rich culture, history, and natural beauty of this extraordinary destination
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
            {/* Enhanced Main Description */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-3xl p-8 shadow-lg">
                <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full mr-4"></div>
                  About {city.name}
                </h3>
                <div className="text-lg text-gray-700 leading-relaxed space-y-4">
                  {city.longDescription.split('.').filter(sentence => sentence.trim()).map((sentence, index) => (
                    <p key={index} className="mb-4">{sentence.trim()}.</p>
                  ))}
                </div>
              </div>

              {/* Modern Key Facts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:from-slate-700/60 hover:to-slate-600/40 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl">
                      <Thermometer className="h-6 w-6 text-orange-400" />
                    </div>
                    <h4 className="font-bold text-white text-lg">Climate</h4>
                  </div>
                  <p className="text-slate-300">{city.climate}</p>
                </div>

                <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:from-slate-700/60 hover:to-slate-600/40 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl">
                      <Calendar className="h-6 w-6 text-purple-400" />
                    </div>
                    <h4 className="font-bold text-white text-lg">Best Time to Visit</h4>
                  </div>
                  <p className="text-slate-300">{city.bestTimeToVisit}</p>
                </div>

                <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:from-slate-700/60 hover:to-slate-600/40 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl">
                      <Users className="h-6 w-6 text-blue-400" />
                    </div>
                    <h4 className="font-bold text-white text-lg">Population</h4>
                  </div>
                  <p className="text-slate-300">{city.population}</p>
                </div>

                <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:from-slate-700/60 hover:to-slate-600/40 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl">
                      <MapPin className="h-6 w-6 text-green-400" />
                    </div>
                    <h4 className="font-bold text-white text-lg">Area</h4>
                  </div>
                  <p className="text-slate-300">{city.area}</p>
                </div>
              </div>
            </div>
            
            {/* Ultra-Modern Image Gallery */}
            <div className="lg:col-span-3 space-y-6">
              <div className="relative h-96 rounded-3xl overflow-hidden group">
                <Image
                  src={city.images.gallery[selectedImage]}
                  alt={`${city.name} view ${selectedImage + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl px-4 py-2">
                    <span className="text-white font-medium">
                      {selectedImage + 1} of {city.images.gallery.length}
                    </span>
                  </div>
                </div>
                
                {/* Navigation */}
                <button 
                  onClick={() => setSelectedImage(selectedImage === 0 ? city.images.gallery.length - 1 : selectedImage - 1)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-slate-900/80 backdrop-blur-md text-white p-3 rounded-full hover:bg-slate-800 transition-all duration-300 border border-slate-700/50"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => setSelectedImage(selectedImage === city.images.gallery.length - 1 ? 0 : selectedImage + 1)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-slate-900/80 backdrop-blur-md text-white p-3 rounded-full hover:bg-slate-800 transition-all duration-300 border border-slate-700/50 rotate-180"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                {city.images.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-24 rounded-xl overflow-hidden transition-all duration-300 ${ 
                      selectedImage === index 
                        ? 'ring-2 ring-blue-400 ring-offset-2 ring-offset-slate-900 scale-105' 
                        : 'opacity-60 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${city.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                    <div className="absolute inset-0 bg-slate-900/20 hover:bg-transparent transition-all duration-300"></div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Specialties Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            What Makes <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{city.name}</span> Special
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {city.specialties.map((specialty, index) => (
              <div key={index} className="group">
                <button 
                  onClick={() => {
                    setSelectedSpecialty(specialty)
                    setShowSpecialtyPopup(true)
                  }}
                  className="w-full bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 text-center hover:from-slate-700/60 hover:to-slate-600/40 transition-all duration-300 hover:scale-105 cursor-pointer min-h-[180px] flex flex-col justify-between"
                >
                  <div>
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Star className="h-8 w-8 text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-white text-lg mb-3">{specialty}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-3">
                      {getBriefSpecialtyDescription(specialty)}
                    </p>
                  </div>
                  <p className="text-slate-400 text-xs opacity-75">Click to learn more</p>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Attractions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Top Attractions in <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">{city.name}</span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Explore the most captivating destinations and experiences this extraordinary city has to offer
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {city.attractions.map((attraction, index) => (
              <div 
                key={index} 
                className="bg-gray-800 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group cursor-pointer"
                onClick={() => {
                  setSelectedAttraction(attraction)
                  setShowAttractionPopup(true)
                }}
              >
                <div className="relative h-48">
                  <Image
                    src={attraction.image}
                    alt={attraction.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center bg-yellow-500 text-black px-2 py-1 rounded-lg text-sm font-semibold">
                      <Star className="h-3 w-3 mr-1" />
                      {attraction.rating}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-blue-500 text-white border-0">
                      {attraction.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center text-white text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{attraction.distance} from city center</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{attraction.name}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {attraction.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-400">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Best visited morning</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Stays Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Luxury Stays in <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">{city.name}</span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Experience world-class hospitality with our carefully curated selection of premium hotels
            </p>
          </div>
          
          {/* Hotel Category Filters */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-gray-800 rounded-lg p-1">
              {(['all', 'luxury', 'business', 'budget'] as const).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedHotelCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    selectedHotelCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {category === 'all' && <Building className="h-4 w-4" />}
                  {category === 'luxury' && <Star className="h-4 w-4" />}
                  {category === 'business' && <Building className="h-4 w-4" />}
                  {category === 'budget' && <DollarSign className="h-4 w-4" />}
                  {category === 'all' ? `All Hotels` : category.charAt(0).toUpperCase() + category.slice(1)}
                  <span className="bg-gray-600 text-xs px-2 py-1 rounded-full">
                    {category === 'all' ? city.hotels.length : city.hotels.filter(h => h.category === category).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredHotels.map((hotel, index) => (
              <div key={index} className="bg-gray-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64">
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center bg-yellow-500 text-black px-2 py-1 rounded-lg text-sm font-semibold">
                      <Star className="h-3 w-3 mr-1" />
                      {hotel.rating}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className={`border-0 ${
                      hotel.category === 'luxury' ? 'bg-yellow-500 text-black' :
                      hotel.category === 'business' ? 'bg-blue-500 text-white' :
                      'bg-green-500 text-white'
                    }`}>
                      {hotel.category.charAt(0).toUpperCase() + hotel.category.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{hotel.name}</h3>
                  <p className="text-gray-300 text-sm mb-4">{hotel.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex items-center text-green-400 mb-2">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span className="font-semibold">Premium Amenities</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {hotel.amenities.slice(0, 6).map((amenity, idx) => (
                        <div key={idx} className="flex items-center text-gray-300 text-sm">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                          {amenity}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="text-2xl font-bold text-white">{hotel.price}</div>
                        <div className="text-gray-400 text-sm">per night</div>
                      </div>
                      <Button 
                        asChild
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-6 py-2"
                        onClick={() => {
                          // Calculate hotel ID based on its position across all cities
                          const { hotelId } = calculateHotelId(city.id, index);
                          // Store hotel data in localStorage for the booking page
                          const hotelData = {
                            id: hotelId,
                            name: hotel.name,
                            location: city.name,
                            description: hotel.description,
                            rating: hotel.rating,
                            reviews: Math.floor(Math.random() * 150) + 50,
                            price: parseInt(hotel.price.match(/(\d{1,3}(?:,\d{3})*)/) ? hotel.price.match(/(\d{1,3}(?:,\d{3})*)/)[1].replace(/,/g, '') : '3000'),
                            originalPrice: Math.floor(parseInt(hotel.price.match(/(\d{1,3}(?:,\d{3})*)/) ? hotel.price.match(/(\d{1,3}(?:,\d{3})*)/)[1].replace(/,/g, '') : '3000') * 1.25),
                            image: hotel.image,
                            amenities: hotel.amenities,
                            rooms: [{
                              type: hotel.category === 'luxury' ? 'Luxury Suite' : hotel.category === 'business' ? 'Business Room' : 'Standard Room',
                              price: parseInt(hotel.price.match(/(\d{1,3}(?:,\d{3})*)/) ? hotel.price.match(/(\d{1,3}(?:,\d{3})*)/)[1].replace(/,/g, '') : '3000'),
                              capacity: 2
                            }],
                            cityId: city.id
                          };
                          localStorage.setItem('selectedHotel', JSON.stringify(hotelData));
                        }}
                      >
                        <Link href={`/booking/hotel/${calculateHotelId(city.id, index).hotelId}`}>
                          Book Now
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Help Section */}
          <div className="mt-16 bg-gray-800 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Need Help Finding the Perfect Stay?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Our travel experts can help you find the ideal accommodation based on your preferences, budget, and travel dates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Building className="h-4 w-4 mr-2" />
                View All Hotels
              </Button>
              <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white">
                <Phone className="h-4 w-4 mr-2" />
                Contact Travel Expert
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How to Reach Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              How to Reach <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">{city.name}</span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Plan your journey with comprehensive transport information and connectivity options
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* By Air */}
            <div className="bg-gray-900 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">By Air</h3>
              {city.transport.airport ? (
                <div>
                  <p className="text-gray-300 mb-2">
                    <strong className="text-white">{city.transport.airport}</strong>
                  </p>
                  <p className="text-gray-400 text-sm">Direct flights from major Indian cities</p>
                </div>
              ) : city.transport.nearestAirport ? (
                <div>
                  <p className="text-gray-300 mb-2">
                    <strong className="text-white">{city.transport.nearestAirport.name}</strong>
                  </p>
                  <p className="text-gray-400 text-sm">{city.transport.nearestAirport.distance} away</p>
                </div>
              ) : (
                <p className="text-gray-400">No direct airport connectivity</p>
              )}
            </div>
            
            {/* By Train */}
            <div className="bg-gray-900 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Train className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">By Train</h3>
              <div className="space-y-2">
                {city.transport.railway.map((station, index) => (
                  <p key={index} className="text-gray-300">
                    <strong className="text-white">{station}</strong>
                  </p>
                ))}
                <p className="text-gray-400 text-sm">Well connected to major cities</p>
              </div>
            </div>
            
            {/* By Road */}
            <div className="bg-gray-900 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bus className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">By Road</h3>
              <div>
                <p className="text-gray-300 mb-2">
                  <strong className="text-white">{city.transport.busStand}</strong>
                </p>
                <p className="text-gray-400 text-sm">Regular bus services from neighboring states</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visitor Reviews Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Visitor Reviews</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Read authentic experiences from travelers who have explored {city.name}
            </p>
          </div>
          
          <div className="space-y-6 mb-12">
            {/* Show all reviews in a single column for better readability */}
            {allReviews.slice(0, 6).map((review, index) => (
              <div key={`${review.id}-${index}`} className="bg-gray-800 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-white font-semibold">{review.name}</h4>
                      {index === 0 && allReviews.length > city.reviews.length && (
                        <Badge className="bg-green-600 text-white text-xs">
                          Latest Review
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                          }`} 
                        />
                      ))}
                      <span className="text-gray-400 text-sm ml-2">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">{review.comment}</p>
                {review.images && review.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {review.images.slice(0, 4).map((image, imgIndex) => (
                      <div key={imgIndex} className="aspect-square rounded-lg overflow-hidden">
                        <img
                          src={image}
                          alt={`Review photo ${imgIndex + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    ))}
                    {review.images.length > 4 && (
                      <div className="aspect-square rounded-lg bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">+{review.images.length - 4} more</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            
            {allReviews.length > 6 && (
              <div className="text-center py-4">
                <p className="text-gray-400">
                  Showing 6 of {allReviews.length} reviews
                </p>
              </div>
            )}
          </div>
          
          {/* Protected Review Form */}
          <div className="mt-8">
            <CityProtectedReviewForm 
              cityId={city.id}
              cityName={city.name}
              onReviewSubmitted={handleReviewSubmitted}
            />
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Explore <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">{city.name}</span> on the Map
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Discover the exact location and plan your route to major attractions with our interactive mapping tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
                <InteractiveCityMap
                  city={city}
                  height="500px"
                  className="rounded-2xl"
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-400" />
                  Location Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400 text-sm">Coordinates</span>
                    <p className="text-white font-mono text-sm">{city.coordinates.lat}°N, {city.coordinates.lng}°E</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">District</span>
                    <p className="text-white">{city.district}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">State</span>
                    <p className="text-white">Jharkhand, India</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Elevation</span>
                    <p className="text-white">{city.altitude} above sea level</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <NavigationIcon className="h-5 w-5 mr-2 text-green-400" />
                  Get Directions
                </h3>
                <div className="space-y-3">
                  <Button 
                    onClick={() => {
                      window.open(`https://www.google.com/maps/dir//${city.coordinates.lat},${city.coordinates.lng}`, '_blank')
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Get Directions (Google Maps)
                  </Button>
                  <Button 
                    onClick={() => {
                      window.open(`https://maps.apple.com/?daddr=${city.coordinates.lat},${city.coordinates.lng}`, '_blank')
                    }}
                    variant="outline" 
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Open in Apple Maps
                  </Button>
                  <Button 
                    onClick={() => {
                      navigator.clipboard.writeText(`${city.coordinates.lat}, ${city.coordinates.lng}`)
                      // You could add a toast notification here
                      alert('Coordinates copied to clipboard!')
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Copy Coordinates
                  </Button>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-800/50 to-green-700/50 rounded-2xl p-6 border border-green-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2 text-green-400" />
                  Essential Travel Tips
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <p className="text-green-100 text-sm">
                      <strong>Best visited during {city.bestTimeToVisit.toLowerCase()}</strong>
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <p className="text-green-100 text-sm">
                      {city.climate}
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <p className="text-green-100 text-sm">
                      Multiple transportation options available
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <p className="text-green-100 text-sm">
                      Local guides recommended for attractions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Visit Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Visit <span className="text-yellow-400">{city.name}</span>?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Start planning your perfect trip to {city.name}. From booking accommodations to 
            discovering hidden gems, we'll help make your journey unforgettable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              <Link href="/book-tour">Plan Your Trip</Link>
            </Button>
            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              <Link href="/book-hotels">Book Hotels</Link>
            </Button>
            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              <Link href="/contact">Get Travel Guide</Link>
            </Button>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-blue-800">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">{city.attractions.length}</div>
              <div className="text-sm text-blue-200">Top Attractions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">{city.hotels.length}</div>
              <div className="text-sm text-blue-200">Hotels Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">{averageRating.toFixed(1)}</div>
              <div className="text-sm text-blue-200">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Attraction Details Popup */}
      {showAttractionPopup && selectedAttraction && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowAttractionPopup(false)}>
          <div 
            className="bg-slate-900 rounded-2xl max-w-2xl w-full border border-slate-700 transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Image Header */}
              <div className="relative h-64 rounded-t-2xl overflow-hidden">
                <Image
                  src={selectedAttraction.image}
                  alt={selectedAttraction.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAttractionPopup(false)}
                    className="text-white hover:text-gray-300 bg-black/50 backdrop-blur-sm"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="absolute top-4 left-4">
                  <div className="flex items-center bg-yellow-500 text-black px-3 py-1 rounded-lg text-sm font-semibold">
                    <Star className="h-3 w-3 mr-1" />
                    {selectedAttraction.rating}
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-blue-500 text-white border-0">
                    {selectedAttraction.category}
                  </Badge>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedAttraction.name}</h3>
                  <p className="text-slate-300 leading-relaxed">{selectedAttraction.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="flex items-center text-blue-400 mb-1">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Distance</span>
                    </div>
                    <p className="text-white text-sm">{selectedAttraction.distance} from city center</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="flex items-center text-green-400 mb-1">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Best Time</span>
                    </div>
                    <p className="text-white text-sm">Morning hours</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    onClick={() => {
                      // Generate approximate coordinates for the attraction
                      const latOffset = (Math.random() - 0.5) * 0.05
                      const lngOffset = (Math.random() - 0.5) * 0.05
                      const attractionLat = city.coordinates.lat + latOffset
                      const attractionLng = city.coordinates.lng + lngOffset
                      window.open(`https://www.google.com/maps/dir//${attractionLat},${attractionLng}`, '_blank')
                    }}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                  >
                    <NavigationIcon className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAttractionPopup(false)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Specialty Details Popup */}
      {showSpecialtyPopup && selectedSpecialty && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowSpecialtyPopup(false)}>
          <div 
            className="bg-slate-900 rounded-2xl max-w-lg w-full border border-slate-700 transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                    <Star className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{selectedSpecialty}</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSpecialtyPopup(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4">
                  <p className="text-slate-200 leading-relaxed">
                    {getSpecialtyDescription(selectedSpecialty, city.name)}
                  </p>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" />
                  <span>One of the key features that defines {city.name}</span>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={() => setShowSpecialtyPopup(false)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                >
                  Got it!
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
