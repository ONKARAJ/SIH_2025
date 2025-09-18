'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Heart, Share2, Eye, MapPin, Calendar, Users, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const culturalCategories = {
  'tribal-art-crafts': {
    title: 'Tribal Art & Crafts',
    category: 'Visual Arts',
    description: 'The tribal communities of Jharkhand have developed unique artistic traditions that reflect their deep spiritual connection with nature and their ancestors. These art forms serve not just as decoration, but as a means of storytelling, spiritual expression, and cultural preservation.',
    image: 'https://st.adda247.com/https://wpassets.adda247.com/wp-content/uploads/multisite/sites/5/2022/04/07080859/Sarhul-Festival-04-1.jpg',
    highlights: ['Sohrai Wall Paintings', 'Kohvar Art', 'Tribal Jewelry', 'Bamboo Crafts'],
    detailedContent: {
      history: 'For over a thousand years, the tribal women of Jharkhand have been creating intricate wall paintings and crafts that tell stories of their ancestors, celebrate the harvest, and honor their connection to nature. These traditions have been passed down through generations, with mothers teaching daughters the sacred techniques and meanings behind each symbol.',
      techniques: [
        {
          name: 'Sohrai Paintings',
          description: 'Created during the harvest festival, these vibrant wall paintings use natural pigments to depict animals, geometric patterns, and symbols of prosperity.',
          materials: ['Natural clay', 'Ochre', 'Charcoal', 'Rice paste']
        },
        {
          name: 'Kohvar Art',
          description: 'Traditional wedding art that decorates the nuptial chambers with intricate designs symbolizing fertility and happiness.',
          materials: ['White clay', 'Natural dyes', 'Finger painting technique']
        },
        {
          name: 'Bamboo Crafts',
          description: 'Functional and decorative items made from locally sourced bamboo using traditional weaving and carving techniques.',
          materials: ['Bamboo shoots', 'Natural binding materials', 'Traditional tools']
        }
      ],
      culturalSignificance: 'These art forms are not merely decorative; they are integral to tribal identity and spiritual life. Each design carries meaning, from protective symbols to celebrations of abundance, connecting the community to their ancestral wisdom.',
      modernRelevance: 'Today, these traditional crafts are gaining international recognition, providing sustainable livelihoods for tribal artisans while preserving their cultural heritage for future generations.'
    }
  },
  'folk-music-dance': {
    title: 'Folk Music & Dance',
    category: 'Performing Arts',
    description: 'The rhythmic heartbeat of Jharkhand\'s tribal culture resonates through centuries-old music and dance traditions that celebrate life, nature, and community bonds.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    highlights: ['Jhumar Dance', 'Paika Dance', 'Nagpuri Folk Songs', 'Tribal Instruments'],
    detailedContent: {
      history: 'Music and dance have been the soul of tribal celebrations in Jharkhand for millennia. These performing arts serve multiple purposes: religious worship, seasonal celebrations, storytelling, and community bonding. Each tribe has developed its own distinct styles while sharing common themes of nature worship and ancestral reverence.',
      techniques: [
        {
          name: 'Jhumar Dance',
          description: 'A group dance performed during festivals, characterized by synchronized movements and rhythmic steps that mimic natural phenomena.',
          materials: ['Traditional drums', 'Ankle bells', 'Colorful costumes', 'Feathered headgear']
        },
        {
          name: 'Paika Dance',
          description: 'A warrior dance that tells stories of bravery and tribal history through dramatic movements and expressions.',
          materials: ['Swords and shields', 'Warrior costumes', 'Traditional makeup', 'Percussion instruments']
        },
        {
          name: 'Nagpuri Folk Songs',
          description: 'Melodious songs in the local Nagpuri language that preserve oral history and cultural values.',
          materials: ['Voice harmonies', 'Simple instruments', 'Call and response patterns']
        }
      ],
      culturalSignificance: 'Music and dance are essential for maintaining tribal unity and passing down cultural values. They serve as a living library of tribal history, mythology, and social customs.',
      modernRelevance: 'Contemporary artists are blending traditional folk elements with modern music, creating fusion genres that appeal to younger generations while preserving cultural authenticity.'
    }
  },
  'traditional-craftsmanship': {
    title: 'Traditional Craftsmanship',
    category: 'Handicrafts',
    description: 'Skilled artisans in Jharkhand continue ancient crafting traditions, creating beautiful and functional items that showcase the ingenuity and artistic sensibility of tribal communities.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
    highlights: ['Dokra Metal Craft', 'Bamboo Products', 'Terracotta Items', 'Handwoven Textiles'],
    detailedContent: {
      history: 'The craftsmanship traditions of Jharkhand date back to the Bronze Age, with archaeological evidence of metalworking and pottery from over 3000 years ago. These skills have been refined and passed down through generations of artisan families.',
      techniques: [
        {
          name: 'Dokra Metal Craft',
          description: 'An ancient lost-wax casting technique used to create bronze figurines and decorative items with intricate details.',
          materials: ['Bronze alloy', 'Beeswax', 'Clay molds', 'Charcoal furnaces']
        },
        {
          name: 'Terracotta Pottery',
          description: 'Earthenware pottery created using traditional wheel and hand-building techniques for both functional and artistic purposes.',
          materials: ['Local clay', 'Natural pigments', 'Traditional kilns', 'Glazing materials']
        },
        {
          name: 'Handwoven Textiles',
          description: 'Traditional fabrics woven on handlooms using indigenous cotton and silk, often incorporating tribal motifs.',
          materials: ['Handspun cotton', 'Natural dyes', 'Traditional looms', 'Tribal design patterns']
        }
      ],
      culturalSignificance: 'Traditional crafts represent the practical wisdom of tribal communities, showing how they have sustainably used local resources to meet their daily needs while creating objects of beauty.',
      modernRelevance: 'These handicrafts are now appreciated globally as sustainable, eco-friendly alternatives to mass-produced items, providing economic opportunities for rural artisans.'
    }
  },
  'cultural-festivals': {
    title: 'Cultural Festivals',
    category: 'Festivals',
    description: 'Jharkhand\'s festival calendar is rich with celebrations that mark seasonal changes, honor deities, and strengthen community bonds through collective participation.',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80',
    highlights: ['Sarhul Festival', 'Sohrai Festival', 'Karma Puja', 'Tusu Parab'],
    detailedContent: {
      history: 'Festivals in Jharkhand are deeply rooted in agricultural cycles and spiritual beliefs. They serve as important markers of time, bringing communities together to celebrate harvests, honor ancestors, and seek blessings for prosperity.',
      techniques: [
        {
          name: 'Sarhul Festival',
          description: 'The most important tribal festival celebrating the flowering of Sal trees and the arrival of spring.',
          materials: ['Sal flowers', 'Traditional rice beer', 'Sacred groves', 'Community participation']
        },
        {
          name: 'Sohrai Festival',
          description: 'A harvest festival famous for elaborate wall paintings and cattle worship ceremonies.',
          materials: ['Natural pigments', 'Clay walls', 'Decorated cattle', 'Traditional sweets']
        },
        {
          name: 'Karma Puja',
          description: 'A festival dedicated to the Karma tree, seeking blessings for prosperity and family welfare.',
          materials: ['Karma tree branches', 'Traditional offerings', 'Community prayers', 'Folk dances']
        }
      ],
      culturalSignificance: 'Festivals maintain the spiritual and social fabric of tribal communities, providing opportunities for cultural transmission, social bonding, and collective celebration.',
      modernRelevance: 'These festivals are increasingly attracting cultural tourists and researchers, helping to document and preserve tribal traditions while providing economic benefits to communities.'
    }
  },
  'language-literature': {
    title: 'Language & Literature',
    category: 'Literature',
    description: 'The oral traditions of Jharkhand preserve a rich treasury of folklore, mythology, and ancestral wisdom through indigenous languages and storytelling.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    highlights: ['Folk Tales', 'Oral Traditions', 'Tribal Languages', 'Ancient Wisdom'],
    detailedContent: {
      history: 'The linguistic heritage of Jharkhand includes numerous tribal languages and dialects that have preserved oral traditions for centuries. These languages carry within them the worldview, values, and accumulated wisdom of tribal communities.',
      techniques: [
        {
          name: 'Oral Storytelling',
          description: 'Traditional method of passing down history, mythology, and moral teachings through engaging narratives.',
          materials: ['Memory techniques', 'Rhythmic patterns', 'Interactive participation', 'Seasonal contexts']
        },
        {
          name: 'Folk Songs',
          description: 'Musical narratives that preserve historical events, cultural values, and spiritual beliefs.',
          materials: ['Traditional melodies', 'Lyrical composition', 'Collective singing', 'Instrumental accompaniment']
        },
        {
          name: 'Proverbs and Sayings',
          description: 'Condensed wisdom expressed through memorable phrases that guide daily life and decision-making.',
          materials: ['Metaphorical language', 'Cultural references', 'Practical wisdom', 'Moral guidance']
        }
      ],
      culturalSignificance: 'Oral literature serves as the primary means of cultural transmission in tribal societies, encoding complex knowledge systems about nature, society, and spirituality.',
      modernRelevance: 'Efforts are underway to document and preserve these oral traditions through digital archives and educational programs, ensuring they survive for future generations.'
    }
  },
  'spiritual-traditions': {
    title: 'Spiritual Traditions',
    category: 'Spirituality',
    description: 'The spiritual life of Jharkhand\'s tribal communities is characterized by nature worship, ancestral reverence, and a deep understanding of the interconnectedness of all life.',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80',
    highlights: ['Sarna Religion', 'Nature Worship', 'Sacred Groves', 'Ancestral Reverence'],
    detailedContent: {
      history: 'The spiritual traditions of Jharkhand\'s tribal communities are among the oldest religious practices in India, predating organized religions by thousands of years. These animistic beliefs center on the worship of natural forces and ancestral spirits.',
      techniques: [
        {
          name: 'Sarna Worship',
          description: 'Sacred grove worship where deities are believed to reside in specific trees and natural spaces.',
          materials: ['Sacred groves', 'Natural offerings', 'Community prayers', 'Ritual ceremonies']
        },
        {
          name: 'Ancestor Veneration',
          description: 'Practices that honor deceased family members and seek their guidance and protection.',
          materials: ['Memorial stones', 'Ritual offerings', 'Family traditions', 'Seasonal ceremonies']
        },
        {
          name: 'Nature Rituals',
          description: 'Ceremonies that acknowledge the spiritual presence in natural phenomena and seasonal cycles.',
          materials: ['Natural elements', 'Traditional prayers', 'Seasonal timing', 'Community participation']
        }
      ],
      culturalSignificance: 'Spiritual traditions provide the foundation for tribal worldview, ethics, and environmental consciousness, emphasizing harmony with nature and community welfare.',
      modernRelevance: 'These ancient spiritual practices offer valuable insights for contemporary environmental and sustainability movements, highlighting indigenous wisdom about living in harmony with nature.'
    }
  }
}

function CultureContent() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || 'tribal-art-crafts'
  const [selectedCategory, setSelectedCategory] = useState(culturalCategories[category as keyof typeof culturalCategories] || culturalCategories['tribal-art-crafts'])

  useEffect(() => {
    const categoryData = culturalCategories[category as keyof typeof culturalCategories]
    if (categoryData) {
      setSelectedCategory(categoryData)
    }
  }, [category])

  return (
    <>
      
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
                selectedCategory.category === 'Visual Arts' ? 'bg-green-500' :
                selectedCategory.category === 'Performing Arts' ? 'bg-blue-500' :
                selectedCategory.category === 'Handicrafts' ? 'bg-yellow-500' :
                selectedCategory.category === 'Festivals' ? 'bg-orange-500' :
                selectedCategory.category === 'Literature' ? 'bg-purple-500' :
                'bg-pink-500'
              } text-white px-4 py-2`}>
                {selectedCategory.category}
              </Badge>
              
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {selectedCategory.title}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {selectedCategory.description}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Save to Favorites
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image
                  src={selectedCategory.image}
                  alt={selectedCategory.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-6 left-6 right-6 grid grid-cols-3 gap-4">
                {selectedCategory.highlights.slice(0, 3).map((highlight, index) => (
                  <Card key={index} className="text-center p-3 bg-background/95 backdrop-blur-sm">
                    <CardContent className="p-0">
                      <div className="text-primary font-semibold text-sm">{highlight}</div>
                    </CardContent>
                  </Card>
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
                {selectedCategory.detailedContent.history}
              </p>
            </CardContent>
          </Card>

          {/* Techniques/Practices */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">Key Practices & Techniques</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {selectedCategory.detailedContent.techniques.map((technique, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{technique.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {technique.description}
                    </p>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Materials & Elements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {technique.materials.map((material, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {material}
                          </Badge>
                        ))}
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
                  {selectedCategory.detailedContent.culturalSignificance}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-secondary/5 to-primary/5">
              <CardHeader>
                <CardTitle className="text-xl text-secondary">Modern Relevance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedCategory.detailedContent.modernRelevance}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Related Categories */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center">Explore Other Cultural Aspects</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Object.entries(culturalCategories).map(([key, cat]) => (
                <Link
                  key={key}
                  href={`/explore-culture?category=${key}`}
                  className={`text-center p-4 rounded-lg transition-all duration-300 hover:shadow-md ${
                    key === category 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <div className="text-sm font-medium">{cat.title}</div>
                  <div className="text-xs opacity-80">{cat.category}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Experience This Culture Firsthand</h2>
          <p className="text-lg mb-8 opacity-90">
            Join our cultural tours and workshops to experience {selectedCategory.title.toLowerCase()} with local artisans and community members.
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
    </>
  )
}

export default function ExploreCulturePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <CultureContent />
      </Suspense>
    </div>
  )
}
