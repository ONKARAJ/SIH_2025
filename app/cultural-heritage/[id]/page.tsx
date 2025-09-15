'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Heart, Share2, Calendar, MapPin, Users, Star, Eye, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const culturalElements = {
  'dokra-metal-craft': {
    id: 'dokra-metal-craft',
    title: 'Dokra Metal Craft',
    category: 'Metal Craft',
    briefDescription: 'Ancient lost-wax casting technique creating exquisite bronze sculptures and decorative items that showcase thousands of years of metallurgical expertise.',
    fullDescription: 'Dokra is an ancient metal casting art form that has been practiced in Jharkhand for over 4,000 years. This non-ferrous metal casting technique uses the lost-wax method to create stunning bronze figurines, jewelry, utensils, and decorative items. The art form gets its name from the Dhokra Damar tribes, the traditional metal smiths of West Bengal and Jharkhand.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
    highlights: ['Lost-Wax Casting', 'Bronze Figurines', 'Tribal Motifs', 'Handcrafted Jewelry', 'Traditional Tools'],
    detailedContent: {
      history: 'Dokra metal casting is believed to have originated over 4,000 years ago and is one of the earliest known methods of non-ferrous metal casting. Archaeological evidence suggests that this technique was practiced in the Indus Valley Civilization. The craft gets its name from the Dhokra Damar tribes who are the traditional metal smiths. In Jharkhand, this art form has been preserved by tribal communities who have passed down the techniques through generations.',
      practices: [
        {
          name: 'Lost-Wax Casting Process',
          description: 'The traditional Dokra technique involves creating a clay core, covering it with wax, and then applying another layer of clay. When heated, the wax melts away leaving a cavity for molten bronze to be poured.',
          techniques: ['Clay core preparation', 'Wax modeling', 'Clay covering', 'Bronze pouring', 'Finishing work'],
          significance: 'Each piece is unique as the mold is destroyed during casting, making every creation one-of-a-kind.',
          modernRelevance: 'Dokra art has gained international recognition and provides sustainable livelihood to tribal artisans while preserving ancient metallurgical knowledge.'
        },
        {
          name: 'Bronze Figurines',
          description: 'Traditional figurines depicting deities, animals, birds, and tribal life scenes. Common motifs include elephants, horses, peacocks, and human figures in various poses.',
          techniques: ['Figurine modeling', 'Detail work', 'Proportion balancing', 'Surface texturing'],
          significance: 'These figurines often have religious and cultural significance, representing various aspects of tribal life and beliefs.',
          modernRelevance: 'Modern Dokra figurines are popular as home decor items and collectibles, bridging traditional art with contemporary aesthetics.'
        },
        {
          name: 'Functional Items',
          description: 'Creation of utility items like lamps, bowls, jewelry, and decorative vessels that combine artistic beauty with practical functionality.',
          techniques: ['Utility design', 'Functional modeling', 'Decorative elements', 'Quality finishing'],
          significance: 'Demonstrates the integration of art with daily life, showing how beauty and utility can coexist.',
          modernRelevance: 'These items are now popular in urban markets as authentic handcrafted products supporting rural artisans.'
        }
      ],
      culturalSignificance: 'Dokra metal craft represents the sophisticated metallurgical knowledge of tribal communities and their artistic sensibilities. It embodies the harmony between functionality and aesthetics that characterizes tribal art forms.',
      modernRelevance: 'The craft has gained UNESCO recognition and provides sustainable employment to tribal artisans. It represents eco-friendly manufacturing practices and preserves ancient knowledge systems.',
      galleries: [
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
        'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80'
      ]
    }
  },
  'jhumar-dance': {
    id: 'jhumar-dance',
    title: 'Jhumar Dance',
    category: 'Performance Arts',
    briefDescription: 'The rhythmic heart of Jharkhand beats through its traditional Jhumar dance, a vibrant celebration of tribal culture.',
    fullDescription: 'Jhumar is one of the most celebrated folk dances of Jharkhand, traditionally performed by tribal communities during festivals, harvests, and special occasions. This energetic dance form brings people together in circular formations, creating a mesmerizing display of synchronized movements.',
    image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80',
    highlights: ['Circular Formation', 'Community Participation', 'Traditional Music', 'Festival Celebrations', 'Cultural Unity'],
    detailedContent: {
      history: 'Jhumar is one of the most celebrated folk dances of Jharkhand, traditionally performed by tribal communities during festivals, harvests, and special occasions. The dance has its roots in ancient tribal traditions and is believed to have been practiced for over 500 years. It originated as a community dance that brought people together to celebrate the bounties of nature and strengthen social bonds.',
      practices: [
        {
          name: 'Group Formation',
          description: 'Jhumar is performed in a circular formation where dancers hold hands and move in synchronized steps. The formation represents unity and community spirit.',
          techniques: ['Circular arrangement', 'Hand-holding formation', 'Synchronized movement', 'Group coordination'],
          significance: 'The circular formation symbolizes the cycle of life and the eternal connection between community members.',
          modernRelevance: 'Modern Jhumar performances maintain the traditional formation while incorporating contemporary staging for cultural events.'
        },
        {
          name: 'Rhythmic Movements',
          description: 'The dance features rhythmic swaying, jumping, and coordinated steps that match the beat of traditional drums and musical instruments.',
          techniques: ['Rhythmic stepping', 'Body swaying', 'Jumping movements', 'Coordinated timing'],
          significance: 'The movements reflect the joy of community celebration and the rhythm of tribal life connected to nature.',
          modernRelevance: 'These traditional movements are now taught in cultural centers and schools to preserve the dance form.'
        },
        {
          name: 'Musical Accompaniment',
          description: 'Jhumar is accompanied by traditional instruments like dhol, nagara, and shehnai, creating an infectious rhythm that drives the dance.',
          techniques: ['Live musical performance', 'Traditional instruments', 'Call and response singing', 'Rhythmic coordination'],
          significance: 'Music is integral to Jhumar, with songs often telling stories of tribal heroes, nature, and daily life.',
          modernRelevance: 'Traditional Jhumar music is being recorded and preserved digitally, while fusion versions incorporate modern instruments.'
        }
      ],
      culturalSignificance: 'Jhumar represents the communal spirit of tribal societies and their deep connection to nature and seasons. It serves as a medium for storytelling, cultural transmission, and community bonding.',
      modernRelevance: 'Jhumar is now performed on national and international stages, representing Jharkhand\'s cultural identity. It provides livelihood opportunities for traditional artists and helps preserve tribal culture.',
      galleries: [
        'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80',
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80'
      ]
    }
  },
  'bamboo-cane-craft': {
    id: 'bamboo-cane-craft',
    title: 'Bamboo & Cane Craft',
    category: 'Handicrafts',
    briefDescription: 'Sustainable artistry transforming bamboo and cane into beautiful and functional items using traditional weaving techniques.',
    fullDescription: 'The bamboo and cane craft tradition of Jharkhand represents the perfect harmony between nature and human ingenuity. Skilled artisans transform locally sourced bamboo and cane into a wide variety of functional and decorative items using time-tested techniques.',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80',
    highlights: ['Traditional Weaving', 'Sustainable Materials', 'Functional Design', 'Eco-friendly Crafts', 'Rural Livelihood'],
    detailedContent: {
      history: 'Bamboo and cane crafting in Jharkhand has ancient roots, with evidence of these crafts dating back over 2,000 years. The abundant bamboo forests in the region have provided sustainable raw materials for tribal communities who developed sophisticated techniques to create everything from household items to decorative pieces.',
      practices: [
        {
          name: 'Traditional Basket Weaving',
          description: 'Creating functional baskets of various sizes and shapes using traditional weaving patterns passed down through generations.',
          techniques: ['Strip preparation', 'Pattern weaving', 'Natural coloring', 'Traditional binding methods'],
          significance: 'Baskets are essential for daily life activities like carrying grains, storing food, and market transactions.',
          modernRelevance: 'Traditional baskets are now popular as eco-friendly storage solutions and home decor items in urban markets.'
        },
        {
          name: 'Furniture Making',
          description: 'Crafting furniture items like chairs, tables, and storage units using bamboo and cane with traditional joinery techniques.',
          techniques: ['Bamboo preparation', 'Traditional joining', 'Cane weaving for seats', 'Natural finishing'],
          significance: 'Provides comfortable and durable furniture while utilizing renewable resources sustainably.',
          modernRelevance: 'Bamboo furniture is increasingly popular for its eco-friendly properties and aesthetic appeal in modern homes.'
        },
        {
          name: 'Decorative Items',
          description: 'Creating artistic pieces like wall hangings, lampshades, and ornamental objects that blend functionality with aesthetic beauty.',
          techniques: ['Artistic weaving', 'Color application', 'Pattern design', 'Decorative finishing'],
          significance: 'Combines practical utility with artistic expression, reflecting the cultural aesthetics of tribal communities.',
          modernRelevance: 'These decorative items are now sought after as authentic handcrafted art pieces for interior decoration.'
        }
      ],
      culturalSignificance: 'Bamboo and cane craft represents the deep understanding of natural materials and sustainable living practices of tribal communities. It embodies the principle of using renewable resources responsibly.',
      modernRelevance: 'With growing environmental consciousness, bamboo and cane crafts are gaining recognition as sustainable alternatives to plastic and synthetic materials, providing livelihood opportunities for rural artisans.',
      galleries: [
        'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80'
      ]
    }
  },
  'tribal-folk-music': {
    id: 'tribal-folk-music',
    title: 'Tribal Folk Music',
    category: 'Music',
    briefDescription: 'Melodious expressions of tribal life, nature worship, and ancestral wisdom through traditional songs and instruments.',
    fullDescription: 'Tribal folk music of Jharkhand is a rich tapestry of melodies that capture the essence of tribal life, seasonal celebrations, and spiritual beliefs. These musical traditions serve as repositories of oral history and cultural values.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    highlights: ['Traditional Instruments', 'Seasonal Songs', 'Oral History', 'Community Singing', 'Cultural Preservation'],
    detailedContent: {
      history: 'The folk music tradition of Jharkhand\'s tribal communities dates back thousands of years, serving as the primary medium for preserving oral history, transmitting cultural values, and strengthening community bonds. Each tribe has developed its unique musical identity while sharing common themes of nature worship and ancestral reverence.',
      practices: [
        {
          name: 'Traditional Instruments',
          description: 'Various indigenous instruments like dhol, nagara, flute, and string instruments create the rhythmic foundation for tribal music.',
          techniques: ['Handcrafted instrument making', 'Traditional playing methods', 'Ensemble coordination', 'Rhythmic patterns'],
          significance: 'Instruments are not just musical tools but sacred objects that connect performers with spiritual forces.',
          modernRelevance: 'Traditional instruments are being documented and their crafting techniques preserved through cultural programs.'
        },
        {
          name: 'Seasonal Songs',
          description: 'Different songs for different seasons and occasions, from harvest celebrations to rain invocation ceremonies.',
          techniques: ['Seasonal themes', 'Call and response patterns', 'Community participation', 'Improvised verses'],
          significance: 'Songs mark important agricultural and social cycles, maintaining connection with natural rhythms.',
          modernRelevance: 'Seasonal songs are being recorded and studied for their environmental and agricultural knowledge.'
        },
        {
          name: 'Narrative Ballads',
          description: 'Epic songs that tell stories of tribal heroes, mythological figures, and historical events through musical narration.',
          techniques: ['Storytelling through song', 'Character voices', 'Dramatic expression', 'Memory techniques'],
          significance: 'Serves as oral history, preserving important cultural narratives and teaching moral values.',
          modernRelevance: 'These ballads are being documented as valuable historical and cultural resources for future generations.'
        }
      ],
      culturalSignificance: 'Tribal folk music is the heartbeat of community life, providing a medium for cultural expression, social bonding, and spiritual connection. It embodies the collective memory and identity of tribal communities.',
      modernRelevance: 'Contemporary musicians are incorporating tribal folk elements into modern compositions, creating fusion music that appeals to younger generations while preserving traditional melodies.',
      galleries: [
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
        'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80'
      ]
    }
  },
  'traditional-tribal-cuisine': {
    id: 'traditional-tribal-cuisine',
    title: 'Traditional Tribal Cuisine',
    category: 'Culinary Arts',
    briefDescription: 'Authentic flavors and traditional cooking methods that celebrate local ingredients and ancestral culinary wisdom.',
    fullDescription: 'The traditional tribal cuisine of Jharkhand reflects the deep connection between the tribal communities and their natural environment. Using locally sourced ingredients and time-honored cooking methods, this cuisine offers unique flavors and nutritional wisdom.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=80',
    highlights: ['Local Ingredients', 'Traditional Methods', 'Forest Foods', 'Seasonal Cooking', 'Cultural Significance'],
    detailedContent: {
      history: 'The culinary traditions of Jharkhand\'s tribal communities have evolved over thousands of years, deeply rooted in the abundance of the region\'s forests and agricultural practices. These food traditions reflect the sustainable relationship between tribal communities and their natural environment.',
      practices: [
        {
          name: 'Forest-Based Ingredients',
          description: 'Utilizing wild vegetables, fruits, mushrooms, and other forest products that are sustainably harvested according to traditional knowledge.',
          techniques: ['Sustainable foraging', 'Seasonal collection', 'Traditional preservation', 'Natural processing'],
          significance: 'Demonstrates deep ecological knowledge and sustainable use of forest resources for nutrition and health.',
          modernRelevance: 'Forest foods are being recognized for their nutritional value and contribution to biodiversity conservation.'
        },
        {
          name: 'Traditional Cooking Methods',
          description: 'Time-tested cooking techniques using clay pots, wood fires, and natural fermentation processes that enhance flavors and nutrition.',
          techniques: ['Clay pot cooking', 'Wood fire preparation', 'Natural fermentation', 'Steam cooking in leaves'],
          significance: 'Preserves authentic flavors while maximizing nutritional value through traditional cooking wisdom.',
          modernRelevance: 'These methods are being studied for their health benefits and sustainable cooking practices.'
        },
        {
          name: 'Seasonal Specialties',
          description: 'Dishes that correspond to different seasons and agricultural cycles, utilizing ingredients at their peak freshness and nutritional value.',
          techniques: ['Seasonal ingredient selection', 'Traditional preservation', 'Festival preparations', 'Community cooking'],
          significance: 'Maintains connection with natural cycles and ensures optimal nutrition throughout the year.',
          modernRelevance: 'Seasonal eating practices are being appreciated for their environmental sustainability and health benefits.'
        }
      ],
      culturalSignificance: 'Tribal cuisine is more than just food; it represents the cultural identity, ecological wisdom, and social traditions of the community. Meals are often communal experiences that strengthen social bonds.',
      modernRelevance: 'Traditional tribal cuisine is gaining recognition for its organic, sustainable, and nutritious qualities, inspiring contemporary movements toward healthy and environmentally conscious eating.',
      galleries: [
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=80',
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
        'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&q=80'
      ]
    }
  }
}

export default function CulturalHeritageDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(0)
  
  const element = culturalElements[id as keyof typeof culturalElements]

  useEffect(() => {
    if (!element) {
      // Redirect to cultural heritage main page if element not found
      window.location.href = '/cultural-heritage'
    }
  }, [element])

  const toggleFavorite = () => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    )
  }

  if (!element) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Cultural Element Not Found</h1>
          <Link href="/cultural-heritage" className="text-primary hover:underline">
            Return to Cultural Heritage
          </Link>
        </div>
      </div>
    )
  }

  const isFavorited = favorites.includes(id)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link href="/cultural-heritage" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Cultural Heritage
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <Badge className={`mb-4 ${
                element.category === 'Metal Craft' ? 'bg-amber-600' :
                element.category === 'Performance Arts' ? 'bg-blue-500' :
                element.category === 'Handicrafts' ? 'bg-green-600' :
                element.category === 'Music' ? 'bg-purple-500' :
                element.category === 'Culinary Arts' ? 'bg-orange-500' :
                'bg-pink-500'
              } text-white px-4 py-2`}>
                {element.category}
              </Badge>
              
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {element.title}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {element.fullDescription}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
                  <div className="text-2xl font-bold">4.8</div>
                  <div className="text-xs text-muted-foreground">Rating</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Eye className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl font-bold">12K</div>
                  <div className="text-xs text-muted-foreground">Views</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold">Ancient</div>
                  <div className="text-xs text-muted-foreground">Tradition</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button onClick={toggleFavorite} className={`flex items-center gap-2 ${isFavorited ? 'bg-red-500 hover:bg-red-600' : ''}`}>
                  <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                  {isFavorited ? 'Saved' : 'Save to Favorites'}
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden mb-4">
                <Image
                  src={element.detailedContent.galleries[selectedGalleryImage]}
                  alt={element.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              
              {/* Gallery Thumbnails */}
              <div className="grid grid-cols-3 gap-4">
                {element.detailedContent.galleries.map((image, index) => (
                  <div 
                    key={index}
                    className={`relative h-24 rounded-lg overflow-hidden cursor-pointer ${selectedGalleryImage === index ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setSelectedGalleryImage(index)}
                  >
                    <Image
                      src={image}
                      alt={`${element.title} gallery ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="150px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* History Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Historical Background</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {element.detailedContent.history}
              </p>
            </CardContent>
          </Card>

          {/* Practices/Techniques */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">Key Practices & Techniques</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {element.detailedContent.practices.map((practice, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{practice.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {practice.description}
                    </p>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Techniques & Materials:</h4>
                      <div className="flex flex-wrap gap-2">
                        {practice.techniques.map((technique, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {technique}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <h5 className="text-sm font-medium text-primary">Cultural Significance:</h5>
                        <p className="text-xs text-muted-foreground">{practice.significance}</p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-secondary">Modern Relevance:</h5>
                        <p className="text-xs text-muted-foreground">{practice.modernRelevance}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Cultural Significance & Modern Relevance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Cultural Significance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {element.detailedContent.culturalSignificance}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-secondary/5 to-primary/5">
              <CardHeader>
                <CardTitle className="text-xl text-secondary">Modern Relevance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {element.detailedContent.modernRelevance}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Related Elements */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center">Explore Other Cultural Aspects</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Object.entries(culturalElements)
                .filter(([key]) => key !== id)
                .map(([key, el]) => (
                <Link
                  key={key}
                  href={`/cultural-heritage/${key}`}
                  className="text-center p-4 rounded-lg bg-muted hover:bg-muted/80 transition-all duration-300 hover:shadow-md"
                >
                  <div className="text-sm font-medium">{el.title}</div>
                  <div className="text-xs opacity-80">{el.category}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Experience This Heritage Firsthand</h2>
          <p className="text-lg mb-8 opacity-90">
            Join our cultural tours and workshops to experience {element.title.toLowerCase()} with local artisans and community members.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
              <Link href="/book-tour">Book Cultural Tour</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link href="/festivals">Explore Festivals</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
