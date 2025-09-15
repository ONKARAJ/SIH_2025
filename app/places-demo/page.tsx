'use client'

import { Navigation } from '@/components/navigation'
import { PlaceCardModal } from '@/components/place-card-modal'
import { allPlaces } from '@/data/places-data'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

// Sample data showcasing key features - using actual data
const featuredPlaces = allPlaces.slice(0, 6) // Show first 6 places as featured

export default function PlacesDemoPage() {
  const [showAll, setShowAll] = useState(false)
  const displayedPlaces = showAll ? allPlaces : featuredPlaces
  
  // Calculate statistics
  const categories = Array.from(new Set(allPlaces.map(place => place.category)))
  const avgRating = (allPlaces.reduce((sum, place) => sum + place.rating, 0) / allPlaces.length).toFixed(1)
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ✨ Glimpse of Jharkhand - Demo
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Experience all {allPlaces.length} spectacular destinations in Jharkhand with detailed information, 
              user reviews, and instant booking capabilities. From majestic waterfalls 
              to ancient temples, wildlife sanctuaries to serene hill stations.
            </p>
            
            {/* Statistics */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="bg-white/80 backdrop-blur rounded-lg px-4 py-2 shadow-sm">
                <div className="text-2xl font-bold text-emerald-600">{allPlaces.length}</div>
                <div className="text-sm text-gray-600">Total Destinations</div>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-lg px-4 py-2 shadow-sm">
                <div className="text-2xl font-bold text-blue-600">{categories.length}</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-lg px-4 py-2 shadow-sm">
                <div className="text-2xl font-bold text-yellow-600">{avgRating}⭐</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Category Overview */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const count = allPlaces.filter(place => place.category === category).length
              return (
                <Badge key={category} variant="outline" className="px-3 py-1">
                  {category} ({count})
                </Badge>
              )
            })}
          </div>
        </div>
      </section>
      
      {/* Places Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {showAll ? `All ${allPlaces.length} Destinations` : 'Featured Destinations'}
            </h2>
            <p className="text-gray-600 mb-6">
              {showAll 
                ? 'Explore every single destination with detailed information and reviews'
                : 'Discover our handpicked selection of must-visit places in Jharkhand'
              }
            </p>
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full transition-colors"
            >
              {showAll ? 'Show Featured Only' : `View All ${allPlaces.length} Places`}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedPlaces.map((place) => (
              <PlaceCardModal key={place.id} place={place} />
            ))}
          </div>
          
          {!showAll && (
            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  ✨ {allPlaces.length - featuredPlaces.length} More Amazing Destinations Await!
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                  From the highest waterfalls to ancient temples, sacred hills to pristine wildlife reserves - 
                  discover all the incredible places Jharkhand has to offer.
                </p>
                <button
                  onClick={() => setShowAll(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors shadow-lg hover:shadow-xl"
                >
                  Explore All Destinations →
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Features Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Key Features of Our Place Cards
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🖼️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Image Carousel</h3>
              <p className="text-sm text-gray-600">
                Multiple images with navigation controls and indicators
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎫</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quick Booking</h3>
              <p className="text-sm text-gray-600">
                Direct links to book flights, trains, and hotels
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Responsive Design</h3>
              <p className="text-sm text-gray-600">
                Perfect viewing experience on all devices
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">User Reviews</h3>
              <p className="text-sm text-gray-600">
                Real visitor experiences and ratings
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
