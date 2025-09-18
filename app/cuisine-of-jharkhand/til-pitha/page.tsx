'use client'

import { Navigation } from '@/components/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, ChefHat, Leaf, ArrowLeft, BookOpen, Utensils } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function TilPithaPage() {
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
                  Traditional Sweet
                </Badge>
                <h1 className="text-4xl font-bold mb-4">Til Pitha</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A sweet dumpling made with rice flour and sesame seeds, specially prepared during Makar Sankranti. 
                  This traditional delicacy symbolizes warmth and energy during the winter season, bringing families 
                  together for this cherished festive treat.
                </p>
              </div>
              
              {/* Recipe Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <div className="text-sm font-medium">45 Minutes</div>
                  <div className="text-xs text-muted-foreground">Cook Time</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <Users className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <div className="text-sm font-medium">4-6</div>
                  <div className="text-xs text-muted-foreground">Servings</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <ChefHat className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <div className="text-sm font-medium">Moderate</div>
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
                  <Badge variant="outline" className="border-green-200 text-green-800">High in healthy fats</Badge>
                  <Badge variant="outline" className="border-green-200 text-green-800">Rich in calcium</Badge>
                  <Badge variant="outline" className="border-green-200 text-green-800">Good source of protein</Badge>
                  <Badge variant="outline" className="border-green-200 text-green-800">Provides winter energy</Badge>
                </div>
              </div>
            </div>
            
            {/* Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="https://masalachilli.com/wp-content/uploads/2018/07/dal-pitha-10.jpg"
                alt="Til Pitha - Sesame Rice Dumplings"
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
                <div className="bg-background rounded-lg p-4 shadow-sm">
                  <h3 className="font-semibold mb-3 text-primary">For Dough:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">Rice flour</span>
                          <span className="text-primary font-semibold">2 cups</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Fine quality</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">Hot water</span>
                          <span className="text-primary font-semibold">1.5 cups</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Boiling hot</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">Salt</span>
                          <span className="text-primary font-semibold">1/2 tsp</span>
                        </div>
                        <p className="text-sm text-muted-foreground">To taste</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-background rounded-lg p-4 shadow-sm">
                  <h3 className="font-semibold mb-3 text-primary">For Filling:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">White sesame seeds</span>
                          <span className="text-primary font-semibold">1 cup</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Cleaned and roasted</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">Jaggery</span>
                          <span className="text-primary font-semibold">1/2 cup</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Grated or powdered</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">Coconut</span>
                          <span className="text-primary font-semibold">1/4 cup</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Grated fresh</p>
                      </div>
                    </div>
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
                    <h3 className="font-semibold mb-2">Prepare the Filling</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      Dry roast sesame seeds until they turn light golden. Let cool, then grind coarsely. Mix with grated jaggery and coconut to make the sweet filling.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                      <p className="text-blue-700 text-sm">💡 Don't over-roast sesame seeds to avoid bitterness</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Make the Dough</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      In a bowl, add rice flour and salt. Gradually pour hot water while mixing continuously to avoid lumps. Knead into a smooth dough when cool enough to handle.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                      <p className="text-blue-700 text-sm">💡 Water should be boiling hot for the right texture</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Shape the Pithas</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      Take small portions of dough, flatten into circles. Place a spoonful of filling in the center and seal by bringing edges together to form dumplings.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                      <p className="text-blue-700 text-sm">💡 Ensure proper sealing to prevent filling from leaking</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Steam and Serve</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      Steam the shaped pithas for 15-20 minutes until cooked. Serve hot as a delicious sweet treat, perfect for festive occasions.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                      <p className="text-blue-700 text-sm">💡 Test doneness by checking if dough is no longer sticky</p>
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
                Til Pitha holds special significance during Makar Sankranti, symbolizing the transition from winter to spring. 
                The use of sesame seeds is believed to bring warmth to the body during cold weather, while the sweet preparation 
                represents prosperity and happiness. Families come together to prepare this delicacy, strengthening bonds and 
                passing down traditional recipes through generations.
              </p>
              
              <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
                <h3 className="font-bold text-primary mb-3">Serving Traditions</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    Traditionally served during Makar Sankranti festival
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    Often prepared in large quantities for community sharing
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    Best enjoyed warm with a cup of milk or tea
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    Can be stored for 2-3 days and reheated
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
