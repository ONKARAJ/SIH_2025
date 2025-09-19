import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Star,
  Clock,
  Calendar,
  Users,
  Bookmark,
  Share2,
  ArrowRight,
  Music,
  Palette,
  ChefHat
} from 'lucide-react';
import { festivalData } from '@/lib/festival-data';
import { getRelatedItems } from '@/lib/search-data';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return festivalData.map((festival) => ({
    id: festival.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const festival = festivalData.find(f => f.id === params.id);
  
  if (!festival) {
    return {
      title: 'Festival Not Found',
    };
  }

  return {
    title: `${festival.name} (${festival.nameLocal}) - ${festival.location.primary} | Jharkhand Tourism`,
    description: festival.description.short,
    keywords: [festival.name, festival.nameLocal, festival.category, festival.season, 'Jharkhand', 'festival', 'culture'],
    openGraph: {
      title: `${festival.name} - Traditional festival in ${festival.location.primary}`,
      description: festival.description.short,
      images: [festival.media.hero, ...festival.media.gallery],
      type: 'website',
    },
  };
}

export default function FestivalDetailPage({ params }: PageProps) {
  const festival = festivalData.find(f => f.id === params.id);

  if (!festival) {
    notFound();
  }

  // Get related festivals
  const festivalSearchItem = {
    id: festival.id,
    type: 'festival' as const,
    name: festival.name,
    description: festival.description.detailed,
    shortDescription: festival.description.short,
    image: festival.media.hero,
    location: festival.location.primary,
    category: festival.category,
    keywords: [],
    url: `/festivals/${festival.id}`
  };
  
  const relatedItems = getRelatedItems(festivalSearchItem, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <Image
          src={festival.media.hero}
          alt={festival.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge className="bg-orange-600 text-white capitalize">{festival.category}</Badge>
              <Badge className="bg-blue-600 text-white capitalize">{festival.season}</Badge>
              <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{festival.dates.duration} days</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{festival.name}</h1>
            <p className="text-xl md:text-2xl text-orange-200 mb-4">{festival.nameLocal}</p>
            
            <div className="flex items-center space-x-6 mb-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span className="text-lg">{festival.location.primary}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>{festival.dates.lunar}</span>
              </div>
            </div>
            
            <p className="text-lg text-gray-200 max-w-4xl mb-6">
              {festival.description.short}
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                <Bookmark className="mr-2 h-5 w-5" />
                Save Festival
              </Button>
              <Button size="lg" variant="secondary">
                <Share2 className="mr-2 h-5 w-5" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">About {festival.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-lg mb-4">
                    {festival.description.detailed}
                  </p>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">Cultural Significance</h4>
                    <p className="text-orange-800">{festival.description.significance}</p>
                  </div>
                  {festival.description.mythology && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Mythology & Legend</h4>
                      <p className="text-blue-800">{festival.description.mythology}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Traditions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Festival Traditions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {festival.traditions.music.length > 0 && (
                    <div>
                      <div className="flex items-center mb-3">
                        <Music className="h-5 w-5 text-green-600 mr-2" />
                        <h4 className="font-semibold text-gray-900">Music & Instruments</h4>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {festival.traditions.music.map((music, index) => (
                          <Badge key={index} variant="outline" className="justify-center">
                            {music}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {festival.traditions.dance.length > 0 && (
                    <div>
                      <div className="flex items-center mb-3">
                        <Users className="h-5 w-5 text-blue-600 mr-2" />
                        <h4 className="font-semibold text-gray-900">Dance Forms</h4>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {festival.traditions.dance.map((dance, index) => (
                          <Badge key={index} variant="outline" className="justify-center">
                            {dance}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {festival.traditions.food.length > 0 && (
                    <div>
                      <div className="flex items-center mb-3">
                        <ChefHat className="h-5 w-5 text-orange-600 mr-2" />
                        <h4 className="font-semibold text-gray-900">Traditional Food</h4>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {festival.traditions.food.map((food, index) => (
                          <Badge key={index} variant="outline" className="justify-center">
                            {food}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {festival.traditions.attire.length > 0 && (
                    <div>
                      <div className="flex items-center mb-3">
                        <Palette className="h-5 w-5 text-purple-600 mr-2" />
                        <h4 className="font-semibold text-gray-900">Traditional Attire</h4>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {festival.traditions.attire.map((attire, index) => (
                          <Badge key={index} variant="outline" className="justify-center">
                            {attire}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Gallery */}
              {festival.media.gallery.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Photo Gallery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {festival.media.gallery.slice(0, 4).map((image, index) => (
                        <div key={index} className="relative h-48 rounded-lg overflow-hidden group cursor-pointer">
                          <Image
                            src={image}
                            alt={`${festival.name} - Image ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        </div>
                      ))}
                    </div>
                    {festival.media.gallery.length > 4 && (
                      <Button variant="outline" className="mt-4">
                        View All Photos ({festival.media.gallery.length})
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Quick Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Festival Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Season:</span>
                    <Badge className="capitalize">{festival.season}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Category:</span>
                    <Badge variant="outline" className="capitalize">{festival.category}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{festival.dates.duration} days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">When:</span>
                    <span className="font-medium">{festival.dates.lunar}</span>
                  </div>
                  
                  {festival.months.length > 0 && (
                    <div>
                      <span className="text-gray-600 block mb-2">Months:</span>
                      <div className="flex flex-wrap gap-1">
                        {festival.months.map((month) => (
                          <Badge key={month} variant="secondary" className="text-xs">
                            {month}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Locations */}
              {festival.location.districts.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Where to Experience</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2 text-green-700 font-medium">
                      <MapPin className="h-4 w-4" />
                      <span>Primary: {festival.location.primary}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 block mb-2">Also celebrated in:</span>
                      <div className="space-y-2">
                        {festival.location.districts.map((district) => (
                          <div key={district} className="text-sm text-gray-700">
                            • {district}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Related Festivals */}
              {relatedItems.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Related Festivals</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {relatedItems.map((item) => (
                      <Link key={item.id} href={item.url} className="block">
                        <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                            <p className="text-sm text-gray-600 truncate">{item.location}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Travel Planning */}
              <Card>
                <CardHeader>
                  <CardTitle>Plan Your Visit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/book-hotels">
                    <Button variant="outline" className="w-full justify-start">
                      <MapPin className="mr-2 h-4 w-4" />
                      Find Hotels
                    </Button>
                  </Link>
                  <Link href="/book-tour">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="mr-2 h-4 w-4" />
                      Cultural Tours
                    </Button>
                  </Link>
                  <Link href="/book-trains">
                    <Button variant="outline" className="w-full justify-start">
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Book Transportation
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}