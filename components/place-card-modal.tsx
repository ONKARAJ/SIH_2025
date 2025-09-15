'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { 
  MapPin, 
  Star, 
  Calendar, 
  Users, 
  Camera,
  ChevronLeft,
  ChevronRight,
  Plane,
  Train,
  Hotel
} from 'lucide-react'

interface PlaceData {
  id: string
  title: string
  shortDescription: string
  category: string
  image: string
  images?: string[]
  location: string
  rating: number
  bestTimeToVisit: string
  overview: string
  attractions: string[]
  reviews: {
    name: string
    rating: number
    comment: string
    date: string
  }[]
}

interface PlaceCardModalProps {
  place: PlaceData
}

export function PlaceCardModal({ place }: PlaceCardModalProps) {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const allImages = place.images || [place.image]
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  const handleBooking = (type: 'flight' | 'train' | 'hotel') => {
    const routes = {
      flight: '/book-flights',
      train: '/book-trains', 
      hotel: '/book-hotels'
    }
    router.push(routes[type])
  }

  return (
    <>
      {/* Place Card */}
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative overflow-hidden">
          <img
            src={place.image}
            alt={place.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-white/90 text-gray-800">
              {place.category}
            </Badge>
          </div>
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center gap-1 bg-white/90 rounded-full px-2 py-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">{place.rating}</span>
            </div>
          </div>
        </div>
        
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl font-bold text-gray-900 line-clamp-1">
                {place.title}
              </CardTitle>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{place.location}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {place.shortDescription}
          </p>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>Best time: {place.bestTimeToVisit}</span>
          </div>
          
          {/* Booking Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => handleBooking('flight')}
              className="text-xs hover:bg-blue-50 hover:border-blue-300"
            >
              <Plane className="w-3 h-3 mr-1" />
              Flight
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => handleBooking('train')}
              className="text-xs hover:bg-green-50 hover:border-green-300"
            >
              <Train className="w-3 h-3 mr-1" />
              Train
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => handleBooking('hotel')}
              className="text-xs hover:bg-purple-50 hover:border-purple-300"
            >
              <Hotel className="w-3 h-3 mr-1" />
              Hotel
            </Button>
          </div>
          
          {/* View Details Button */}
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            View Details
          </Button>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-emerald-600" />
              {place.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Image Carousel */}
            {allImages.length > 0 && (
              <div className="relative">
                <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
                  <img
                    src={allImages[currentImageIndex]}
                    alt={`${place.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      
                      {/* Image indicators */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {allImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{place.rating}</span>
                    </div>
                    <Badge variant="secondary">{place.category}</Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Camera className="w-4 h-4" />
                    <span>{allImages.length} photo{allImages.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Overview Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                Overview
              </h3>
              <p className="text-gray-600 leading-relaxed">{place.overview}</p>
            </div>
            
            {/* Key Attractions */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-emerald-600" />
                Key Attractions
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {place.attractions.map((attraction, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-600">{attraction}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Best Time to Visit */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                Best Time to Visit
              </h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 font-medium">{place.bestTimeToVisit}</p>
                <p className="text-blue-600 text-sm mt-1">
                  Weather is pleasant and ideal for outdoor activities during this period.
                </p>
              </div>
            </div>
            
            {/* Reviews */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                Visitor Reviews
              </h3>
              <div className="space-y-4">
                {place.reviews.map((review, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          <span className="text-emerald-600 font-semibold text-sm">
                            {review.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">{review.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < review.rating 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                    <p className="text-xs text-gray-400 mt-2">{review.date}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              <Button 
                onClick={() => handleBooking('flight')}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <Plane className="w-4 h-4 mr-2" />
                Book Flight
              </Button>
              <Button 
                onClick={() => handleBooking('train')}
                variant="outline"
                className="flex-1 border-green-300 text-green-700 hover:bg-green-50"
              >
                <Train className="w-4 h-4 mr-2" />
                Book Train
              </Button>
              <Button 
                onClick={() => handleBooking('hotel')}
                variant="outline"
                className="flex-1 border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                <Hotel className="w-4 h-4 mr-2" />
                Book Hotel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
