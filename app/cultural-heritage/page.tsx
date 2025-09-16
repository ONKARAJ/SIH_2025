'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'

// Note: metadata moved to layout or parent component since this is now a client component

// Detailed content data (from the individual detail pages)
const detailedCulturalData = {
  'dokra-metal-craft': {
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
  },
  'jhumar-dance': {
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
  },
  'bamboo-cane-craft': {
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
  },
  'tribal-folk-music': {
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
  },
  'traditional-tribal-cuisine': {
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
};

// Helper function to get detailed content
const getDetailedContent = (id: string) => {
  return detailedCulturalData[id as keyof typeof detailedCulturalData];
};

export default function CulturalHeritagePage() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (elementId: string) => {
    setFavorites(prev => 
      prev.includes(elementId)
        ? prev.filter(id => id !== elementId)
        : [...prev, elementId]
    );
  };

  const handleElementClick = (element: any) => {
    // This will be handled by the card's internal navigation
  };

  const culturalElements = [
    {
      id: "dokra-metal-craft",
      title: "Dokra Metal Craft",
      briefDescription: "Ancient lost-wax casting technique creating exquisite bronze sculptures and decorative items that showcase thousands of years of metallurgical expertise.",
      fullDescription: "Dokra is an ancient metal casting art form that has been practiced in Jharkhand for over 4,000 years. This non-ferrous metal casting technique uses the lost-wax method to create stunning bronze figurines, jewelry, utensils, and decorative items. The art form gets its name from the Dhokra Damar tribes, the traditional metal smiths of West Bengal and Jharkhand. Each piece is unique as the mold is broken after casting, making it impossible to create identical pieces.",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
      category: "Metal Craft",
      highlights: ["Lost-Wax Casting", "Bronze Figurines", "Tribal Motifs", "Handcrafted Jewelry", "Traditional Tools"]
    },
    {
      id: "jhumar-dance",
      title: "Jhumar Dance",
      briefDescription: "Energetic group dance performed during festivals and celebrations, characterized by rhythmic movements that celebrate community unity and cultural identity.",
      fullDescription: "Jhumar is the most popular folk dance of Jharkhand, performed by both men and women during festivals, weddings, and harvest celebrations. The dance is characterized by vigorous movements, with dancers forming circles and moving in synchronized steps to the beat of traditional drums. The word 'Jhumar' comes from 'jhum', which means to move or sway. This dance form celebrates the joy of life, community bonding, and connection with nature through expressive body movements and rhythmic footwork.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
      category: "Folk Dance",
      highlights: ["Circle Formation", "Rhythmic Steps", "Festival Performances", "Community Dance", "Traditional Costumes"]
    },
    {
      id: "bamboo-cane-craft",
      title: "Bamboo & Cane Craft",
      briefDescription: "Sustainable handicrafts made from locally sourced bamboo and cane, creating functional and decorative items using traditional weaving techniques.",
      fullDescription: "Bamboo and cane crafting is one of the oldest and most sustainable craft traditions of Jharkhand. Skilled artisans create a wide variety of products including baskets, furniture, decorative items, fishing traps, and household utilities. The craft utilizes different species of bamboo found abundantly in the region's forests. Traditional techniques include splitting, weaving, binding, and joining methods passed down through generations. The craft not only provides livelihood to rural communities but also promotes environmental sustainability.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      category: "Handicraft",
      highlights: ["Eco-friendly Materials", "Traditional Weaving", "Functional Items", "Forest Resources", "Sustainable Craft"]
    },
    {
      id: "tribal-folk-music",
      title: "Tribal Folk Music",
      briefDescription: "Melodious traditional songs and instrumental music that preserve oral history, cultural values, and spiritual beliefs of tribal communities.",
      fullDescription: "Tribal folk music of Jharkhand is a rich tapestry of melodious songs, rhythmic compositions, and traditional instrumental music that has been the soul of tribal culture for millennia. The music encompasses various genres including devotional songs, work songs, seasonal songs, love ballads, and ceremonial music. Traditional instruments like Nagara (drums), Dhol, Mandar, Flute, and Shehnai create the distinctive sound. Folk songs are sung in various tribal languages including Santali, Mundari, Ho, and Oraon, preserving the linguistic diversity and cultural heritage of the region.",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
      category: "Music",
      highlights: ["Traditional Instruments", "Tribal Languages", "Oral Traditions", "Seasonal Songs", "Cultural Preservation"]
    },
    {
      id: "traditional-tribal-cuisine",
      title: "Traditional Tribal Cuisine",
      briefDescription: "Authentic culinary traditions featuring organic ingredients, traditional cooking methods, and recipes passed down through generations of tribal communities.",
      fullDescription: "Traditional tribal cuisine of Jharkhand represents a harmonious blend of nutrition, flavor, and cultural significance. The cuisine is characterized by the extensive use of locally available ingredients including millets, rice, seasonal vegetables, leafy greens, forest produces, and indigenous spices. Cooking methods include steaming, roasting, and slow cooking in earthen pots. Signature dishes include Handia (rice beer), Dhuska (fried pancakes), Pittha (rice dumplings), Rugra (a type of mushroom curry), and various preparations of indigenous vegetables and greens. The food culture emphasizes organic, chemical-free ingredients and sustainable food practices.",
      image: "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80",
      category: "Cuisine",
      highlights: ["Organic Ingredients", "Traditional Recipes", "Forest Produce", "Fermented Foods", "Earthen Pot Cooking"]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-sm font-medium">
              🎭 Rich Cultural Legacy
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-orange-600 to-secondary bg-clip-text text-transparent leading-tight mb-8">
            Cultural Heritage
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
            Discover the vibrant cultural tapestry of Jharkhand, where ancient tribal traditions, 
            folk art, music, and spiritual practices have been preserved and celebrated for centuries. 
            Experience the living heritage of indigenous communities that continues to thrive today.
          </p>
        </div>
      </section>

      {/* Cultural Heritage Descriptions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Cultural Heritage</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover the rich cultural traditions of Jharkhand's tribal communities
            </p>
          </div>

          <div className="space-y-16">
            {culturalElements.map((element, index) => {
              // Get detailed content from the cultural elements data
              const detailedElement = getDetailedContent(element.id);
              
              return (
                <div key={element.id} className="space-y-8">
                  <div className="space-y-6">
                    <div>
                      <Badge className={`mb-4 ${
                        element.category === 'Metal Craft' ? 'bg-amber-600' :
                        element.category === 'Folk Dance' ? 'bg-blue-500' :
                        element.category === 'Handicraft' ? 'bg-green-600' :
                        element.category === 'Music' ? 'bg-purple-500' :
                        element.category === 'Cuisine' ? 'bg-red-500' :
                        'bg-gray-500'
                      } text-white px-4 py-2 text-sm`}>
                        {element.category}
                      </Badge>
                      <h3 className="text-3xl font-bold mb-6">{element.title}</h3>
                    </div>
                    
                    {/* Featured Image */}
                    <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-6">
                      <Image
                        src={element.image}
                        alt={element.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <p className="text-white text-sm font-medium bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                          Traditional {element.category}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* History Section */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-primary">History & Origins</h4>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {detailedElement?.history}
                    </p>
                  </div>

                  {/* Practices Section */}
                  {detailedElement?.practices && (
                    <div className="space-y-6">
                      <h4 className="text-xl font-semibold text-primary">Traditional Practices</h4>
                      {detailedElement.practices.map((practice, practiceIndex) => (
                        <div key={practiceIndex} className="space-y-3 pl-4 border-l-2 border-muted">
                          <h5 className="text-lg font-medium">{practice.name}</h5>
                          <p className="text-muted-foreground leading-relaxed">
                            {practice.description}
                          </p>
                          
                          {/* Techniques */}
                          <div>
                            <h6 className="font-medium text-sm mb-2">Key Techniques:</h6>
                            <div className="flex flex-wrap gap-2">
                              {practice.techniques.map((technique, techIndex) => (
                                <span 
                                  key={techIndex}
                                  className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground"
                                >
                                  {technique}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {/* Significance */}
                          <div className="bg-muted/30 p-4 rounded-lg">
                            <h6 className="font-medium text-sm mb-2">Cultural Significance:</h6>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {practice.significance}
                            </p>
                          </div>
                          
                          {/* Modern Relevance */}
                          <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                            <h6 className="font-medium text-sm mb-2 text-primary">Modern Relevance:</h6>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {practice.modernRelevance}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Cultural Significance */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-primary">Cultural Significance</h4>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {detailedElement?.culturalSignificance}
                    </p>
                  </div>

                  {/* Modern Relevance */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-primary">Modern Relevance</h4>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {detailedElement?.modernRelevance}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-primary">Key Highlights</h4>
                    <div className="flex flex-wrap gap-3">
                      {element.highlights.map((highlight, idx) => (
                        <span 
                          key={idx}
                          className="bg-secondary/10 text-secondary px-4 py-2 rounded-full font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Image Gallery */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-primary">Visual Gallery</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {detailedElement?.galleries?.map((imageUrl, imgIndex) => (
                        <div key={imgIndex} className="relative h-48 rounded-lg overflow-hidden group">
                          <Image
                            src={imageUrl}
                            alt={`${element.title} - Image ${imgIndex + 1}`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      )) || (
                        // Default gallery if no specific gallery images
                        <div className="relative h-48 rounded-lg overflow-hidden group">
                          <Image
                            src={element.image}
                            alt={`${element.title} - Gallery`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {index < culturalElements.length - 1 && (
                    <hr className="border-muted mt-12" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cultural Preservation Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Preserving Our Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Jharkhand's cultural heritage is not just a window into the past—it's a living, 
                breathing part of our present and future. Our tribal communities continue to 
                practice and preserve these traditions, ensuring they remain vibrant and relevant 
                for generations to come.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Cultural Education:</span> 
                    Teaching traditional arts and crafts to younger generations
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Artisan Support:</span> 
                    Providing platforms for local artisans to showcase their work
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Cultural Tourism:</span> 
                    Promoting responsible tourism that supports local communities
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Card className="border-2 border-primary/20">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎨</div>
                    <h3 className="text-2xl font-bold mb-4">Experience the Culture</h3>
                    <p className="text-muted-foreground mb-6">
                      Join us in celebrating and preserving Jharkhand's rich cultural heritage through immersive experiences and cultural tours.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">32+</div>
                        <div className="text-sm text-muted-foreground">Tribal Communities</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">1000+</div>
                        <div className="text-sm text-muted-foreground">Years of Heritage</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Explore Cultural Heritage</h2>
          <p className="text-xl mb-8 opacity-90">
            Immerse yourself in the rich cultural traditions of Jharkhand and become part of our heritage preservation efforts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/festivals" 
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore Festivals
            </a>
            <a 
              href="/book-tour" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Book Cultural Tour
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
