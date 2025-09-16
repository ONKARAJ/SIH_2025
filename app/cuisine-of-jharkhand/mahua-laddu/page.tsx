'use client'

import { Navigation } from '@/components/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, ChefHat, Leaf, ArrowLeft, BookOpen, Utensils } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function MahuaLadduPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Back Navigation */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/cuisine-of-jharkhand" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Cuisine of Jharkhand
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div>
                <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-200 px-4 py-2">
                  Traditional Dessert
                </Badge>
                <h1 className="text-4xl font-bold mb-4">Mahua Laddu</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Sweet balls made from mahua flowers, a seasonal delicacy that celebrates the flowering of mahua 
                  trees. This traditional dessert connects tribal communities to seasonal cycles and represents the 
                  sacred connection to forest resources.
                </p>
              </div>
              
              {/* Recipe Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <div className="text-sm font-medium">20 Minutes</div>
                  <div className="text-xs text-muted-foreground">Cook Time</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <Users className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <div className="text-sm font-medium">8-10</div>
                  <div className="text-xs text-muted-foreground">Servings</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <ChefHat className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <div className="text-sm font-medium">Easy</div>
                  <div className="text-xs text-muted-foreground">Difficulty</div>
                </div>
              </div>
              
              {/* Health Benefits */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  Health Benefits
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-green-200 text-green-800">Rich in iron and calcium</Badge>
                  <Badge variant="outline" className="border-green-200 text-green-800">Natural antioxidants</Badge>
                  <Badge variant="outline" className="border-green-200 text-green-800">Energy boosting</Badge>
                  <Badge variant="outline" className="border-green-200 text-green-800">Digestive aid</Badge>
                </div>
              </div>
            </div>
            
            {/* Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&q=80"
                alt="Mahua Laddu - Traditional Forest Flower Sweet"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients & Instructions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Ingredients */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Utensils className="h-6 w-6 text-primary" />
                Ingredients
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-background rounded-lg shadow-sm">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Dried mahua flowers</span>
                      <span className="text-primary font-semibold">1 cup</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Cleaned and sorted</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-background rounded-lg shadow-sm">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Jaggery</span>
                      <span className="text-primary font-semibold">3/4 cup</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Grated</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-background rounded-lg shadow-sm">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Ghee</span>
                      <span className="text-primary font-semibold">2 tbsp</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Pure desi ghee</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-background rounded-lg shadow-sm">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Cardamom powder</span>
                      <span className="text-primary font-semibold">1/2 tsp</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Freshly ground</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-background rounded-lg shadow-sm">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Chopped nuts</span>
                      <span className="text-primary font-semibold">1/4 cup</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Almonds and cashews</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-background rounded-lg shadow-sm">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Sesame seeds</span>
                      <span className="text-primary font-semibold">1 tbsp</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Roasted (optional)</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Instructions */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <ChefHat className="h-6 w-6 text-primary" />
                Cooking Steps
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Prepare Mahua Flowers</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      Clean dried mahua flowers, removing any stems or debris. Dry roast them in a pan until they become crisp and aromatic.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                      <p className="text-blue-700 text-sm">💡 Roast on low heat to prevent burning</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Make Jaggery Syrup</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      In the same pan, melt jaggery with a little water to make a thick syrup. Cook until it reaches soft ball consistency.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                      <p className="text-blue-700 text-sm">💡 Test syrup by dropping a small amount in cold water</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Combine Ingredients</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      Add roasted mahua flowers to the jaggery syrup. Mix well and add cardamom powder and chopped nuts.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                      <p className="text-blue-700 text-sm">💡 Work quickly as mixture hardens fast</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Shape into Laddus</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      While the mixture is still warm, grease hands with ghee and shape into small round balls or laddus.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                      <p className="text-blue-700 text-sm">💡 If mixture hardens, warm it slightly</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Cool and Store</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      Let the laddus cool completely before storing in an airtight container. They can be kept for up to one week.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                      <p className="text-blue-700 text-sm">💡 Store in a cool, dry place for best freshness</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Significance */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-orange-800">
                <BookOpen className="h-6 w-6" />
                Cultural Significance
              </h2>
              <p className="text-orange-700 leading-relaxed mb-6">
                Mahua laddu is prepared during the flowering season and represents the tribal connection to seasonal 
                cycles and forest resources. Mahua flowers are considered sacred and nutritious, and their collection 
                is a community activity that brings people together. This sweet represents the abundance of nature 
                and the wisdom of utilizing seasonal forest produce for both nutrition and celebration.
              </p>
              
              <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
                <h3 className="font-bold text-primary mb-3">Serving Traditions</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    Best enjoyed as an after-meal dessert
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    Can be offered during festivals and special occasions
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    Pairs well with milk or traditional beverages
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    Often shared with guests as a symbol of hospitality
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
