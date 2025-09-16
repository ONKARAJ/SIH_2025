'use client'

import { Navigation } from '@/components/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, ChefHat, Leaf, ArrowLeft, BookOpen, Utensils } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function DhuskaPage() {
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
                <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200 px-4 py-2">
                  Traditional Main Dish
                </Badge>
                <h1 className="text-4xl font-bold mb-4">Dhuska</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Crispy deep-fried pancakes made from rice and lentils. This popular breakfast dish is perfect 
                  with spicy chutneys and curries, representing the tribal technique of using minimal spices for 
                  maximum flavor and nutrition.
                </p>
              </div>
              
              {/* Recipe Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <div className="text-sm font-medium">30 Minutes</div>
                  <div className="text-xs text-muted-foreground">Cook Time</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <Users className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <div className="text-sm font-medium">4-5</div>
                  <div className="text-xs text-muted-foreground">Servings</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <ChefHat className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <div className="text-sm font-medium">Medium</div>
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
                  <Badge variant="outline" className="border-green-200 text-green-800">High protein from lentils</Badge>
                  <Badge variant="outline" className="border-green-200 text-green-800">Complex carbohydrates</Badge>
                  <Badge variant="outline" className="border-green-200 text-green-800">Iron and folate rich</Badge>
                  <Badge variant="outline" className="border-green-200 text-green-800">Probiotic benefits</Badge>
                </div>
              </div>
            </div>
            
            {/* Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&q=80"
                alt="Dhuska - Traditional Rice and Lentil Pancakes"
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
                      <span className="font-medium">Rice</span>
                      <span className="text-primary font-semibold">1 cup</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Soaked for 4 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-background rounded-lg shadow-sm">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Chana dal</span>
                      <span className="text-primary font-semibold">1/2 cup</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Soaked for 4 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-background rounded-lg shadow-sm">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Green chilies</span>
                      <span className="text-primary font-semibold">3-4</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Adjust to taste</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-background rounded-lg shadow-sm">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Ginger</span>
                      <span className="text-primary font-semibold">1 inch piece</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Fresh ginger</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-background rounded-lg shadow-sm">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Oil for frying</span>
                      <span className="text-primary font-semibold">As needed</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Mustard oil preferred</p>
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
                    <h3 className="font-semibold mb-2">Soak the Grains</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      Soak rice and chana dal separately in water for at least 4 hours or overnight for better fermentation.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                      <p className="text-blue-700 text-sm">💡 Use enough water to cover completely</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Prepare the Batter</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      Drain and grind rice and dal together with green chilies and ginger to make a coarse batter.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                      <p className="text-blue-700 text-sm">💡 Don't make the batter too smooth</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Season and Rest</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      Add salt to the batter and mix well. Let it rest for 2-3 hours for better fermentation and taste.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                      <p className="text-blue-700 text-sm">💡 Cover and keep in a warm place</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Fry and Serve</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      Heat oil and drop spoonfuls of batter into hot oil. Fry until golden brown and crispy. Serve hot.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                      <p className="text-blue-700 text-sm">💡 Fry in batches to avoid overcrowding</p>
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
                Dhuska is a staple breakfast food that showcases tribal culinary wisdom. It demonstrates the art of 
                using local grains and minimal spices to create flavorful, nutritious meals. This dish represents 
                the practical approach of tribal communities to cooking - creating maximum nutrition and taste with 
                simple, available ingredients.
              </p>
              
              <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
                <h3 className="font-bold text-primary mb-3">Serving Suggestions</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    Serve hot with green chutney or tomato chutney
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    Pairs excellently with aloo curry or dal
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    Can be served as breakfast, snack, or light meal
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
