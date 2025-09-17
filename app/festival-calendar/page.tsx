import { Navigation } from '@/components/navigation'
import FestivalCalendar from '@/components/festivals/festival-calendar'
import { Calendar, Sparkles, MapPin, Heart } from 'lucide-react'

export default function FestivalCalendarPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Festival Calendar
            </h1>
          </div>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Discover the vibrant festivals of Jharkhand throughout the year. Plan your visit around these 
            magnificent cultural celebrations and immerse yourself in the rich traditions of our land.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span>12+ Festivals</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>Across Jharkhand</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              <span>Cultural Heritage</span>
            </div>
          </div>
        </div>
      </section>

      {/* Festival Calendar Component */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore Festivals by Season</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each season in Jharkhand brings unique festivals that celebrate the rhythm of life, 
              nature, and cultural traditions. Click on any month to explore festivals in detail.
            </p>
          </div>

          {/* Festival Calendar Component */}
          <FestivalCalendar />
        </div>
      </section>

      {/* Festival Guidelines */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Festival Participation Guidelines</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              To help you make the most of these cultural experiences while respecting local traditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Respect Traditions</h3>
              <p className="text-gray-600 text-sm">
                Follow local customs and dress codes. Participate with respect for the cultural and religious significance of each festival.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Plan Your Visit</h3>
              <p className="text-gray-600 text-sm">
                Book accommodations early during festival seasons. Check local weather and transportation options for a smooth experience.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Engage Mindfully</h3>
              <p className="text-gray-600 text-sm">
                Ask permission before taking photos. Support local artisans and vendors. Leave no trace and help preserve these celebrations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export async function generateMetadata() {
  return {
    title: 'Festival Calendar - Jharkhand Tourism',
    description: 'Explore the vibrant festival calendar of Jharkhand. Discover traditional celebrations, cultural events, and spiritual festivals throughout the year. Plan your visit to experience the rich cultural heritage.',
    keywords: 'Jharkhand festivals, festival calendar, cultural events, traditional celebrations, tribal festivals, harvest festivals, spiritual festivals, cultural heritage',
  }
}
