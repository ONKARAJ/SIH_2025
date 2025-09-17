import { citiesData } from '@/lib/cities-data'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin,
  Users,
  Star,
  ArrowRight,
  Building2,
  Plane,
  Train,
  Clock,
  Hotel
} from 'lucide-react'

export default function CitiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Explore Jharkhand's <span className="text-yellow-400">Major Cities</span>
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Discover the vibrant urban centers of Jharkhand, each with its unique character, 
              rich history, and cultural significance. From the capital city to industrial hubs, 
              explore what makes each city special.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-8 text-green-200">
                <div className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  <span>{citiesData.length} Major Cities</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>Rich Cultural Heritage</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  <span>Unique Experiences</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Cities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each city in Jharkhand tells a unique story. Explore their attractions, 
              culture, cuisine, and find the best places to stay and visit.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {citiesData.map((city) => (
              <Card key={city.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white border-0 shadow-lg">
                <div className="relative h-64">
                  <Image
                    src={city.images.hero}
                    alt={city.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <h3 className="text-2xl font-bold">{city.name}</h3>
                        <p className="text-green-200 text-sm">{city.district} District</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-yellow-400">
                          <Users className="h-4 w-4 mr-1" />
                          <span className="text-xs font-medium">{city.population}</span>
                        </div>
                        <div className="flex items-center text-blue-400 mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-xs">{city.altitude}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {city.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {city.highlights.slice(0, 3).map((highlight, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="text-xs bg-green-100 text-green-700 hover:bg-green-200"
                        >
                          {highlight}
                        </Badge>
                      ))}
                      {city.highlights.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{city.highlights.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-xs text-gray-600">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Building2 className="h-3 w-3 mr-2 text-blue-500" />
                        <span>{city.attractions.length} Attractions</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-2 text-green-500" />
                        <span>{city.bestTimeToVisit}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        {city.transport.airport ? (
                          <>
                            <Plane className="h-3 w-3 mr-2 text-purple-500" />
                            <span>Airport Available</span>
                          </>
                        ) : (
                          <>
                            <Train className="h-3 w-3 mr-2 text-orange-500" />
                            <span>Railway Connected</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 mr-2 text-yellow-500" />
                        <span>{city.reviews.length} Reviews</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button asChild className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white">
                      <Link href={`/cities/${city.id}`} className="flex items-center justify-center">
                        <span>Explore {city.name}</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
                      <Link href={`/book-hotels?city=${city.id}`} className="flex items-center justify-center">
                        <Hotel className="mr-2 h-4 w-4" />
                        <span>Book Hotels</span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-green-800 to-green-900 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Plan Your City Tour</h2>
          <p className="text-green-100 text-lg mb-8">
            Ready to explore these amazing cities? Book a customized tour package 
            and discover the best of Jharkhand's urban treasures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="outline" className="border-white text-green-400 hover:bg-white hover:text-green-800">
              <Link href="/book-tour">Book City Tour</Link>
            </Button>
            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Link href="/contact">Get Travel Guide</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export async function generateMetadata() {
  return {
    title: 'Major Cities of Jharkhand - Urban Destinations | Jharkhand Tourism',
    description: `Explore the major cities of Jharkhand including ${citiesData.map(city => city.name).join(', ')}. Discover attractions, culture, cuisine, and accommodation in each city.`,
    keywords: `Jharkhand cities, ${citiesData.map(city => city.name).join(', ')}, urban tourism, city guide, Jharkhand travel`,
  }
}
