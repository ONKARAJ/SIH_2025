'use client'

import { Navigation } from '@/components/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, ChefHat, Leaf, ArrowLeft, BookOpen, Utensils } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function BambooShootCurryPage() {
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
                <Badge className="mb-4 bg-green-100 text-green-800 border-green-200 px-4 py-2">
                  Traditional Main Dish
                </Badge>
                <h1 className="text-4xl font-bold mb-4">Bamboo Shoot Curry</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Tender bamboo shoots cooked with minimal spices, highlighting the natural flavors of this forest 
                  vegetable. This dish represents the tribal philosophy of using every part of nature sustainably 
                  and showcases their extensive knowledge of forest vegetables.
                </p>
              </div>
              
              {/* Recipe Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <div className="text-sm font-medium">40 Minutes</div>
                  <div className="text-xs text-muted-foreground">Cook Time</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <Users className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <div className="text-sm font-medium">4-6</div>
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
                  <Badge variant="outline" className="border-green-200 text-green-800">High in fiber</Badge>
                  <Badge variant="outline" className="border-green-200 text-green-800">Rich in potassium</Badge>
                  <Badge variant="outline" className="border-green-200 text-green-800">Low in calories</Badge>
                  <Badge variant="outline" className="border-green-200 text-green-800">Anti-inflammatory</Badge>
                </div>
              </div>
            </div>
            
            {/* Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80"
                alt="Bamboo Shoot Curry - Forest Vegetable Dish"
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
                      <span className="font-medium">Fresh bamboo shoots</span>
                      <span className="text-primary font-semibold">300g</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Young and tender preferred</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-background rounded-lg shadow-sm">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Mustard seeds</span>
                      <span className="text-primary font-semibold">1 tsp</span>
                    </div>
                    <p className="text-sm text-muted-foreground">For tempering</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-background rounded-lg shadow-sm">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Turmeric powder</span>
                      <span className="text-primary font-semibold">1/2 tsp</span>
                    </div>
                    <p className="text-sm text-muted-foreground">For color and health</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-background rounded-lg shadow-sm">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Green chilies</span>
                      <span className="text-primary font-semibold">2-3</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Slit lengthwise</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-background rounded-lg shadow-sm">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Mustard oil</span>
                      <span className="text-primary font-semibold">3 tbsp</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Traditional choice</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-background rounded-lg shadow-sm">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Garlic</span>
                      <span className="text-primary font-semibold">3-4 cloves</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Minced</p>
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
                    <h3 className="font-semibold mb-2">Prepare Bamboo Shoots</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      Clean and slice bamboo shoots into thin pieces. Remove any tough outer layers and cut into manageable sizes.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                      <p className="text-blue-700 text-sm">💡 Choose young, tender shoots for better taste</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Boil to Remove Bitterness</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      Boil bamboo shoots in salted water for 15 minutes to remove natural bitterness. Drain and set aside.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                      <p className="text-blue-700 text-sm">💡 Boiling is essential to remove toxins and bitterness</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Prepare the Tempering</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      Heat mustard oil in a pan. Add mustard seeds and let them splutter. Add minced garlic and green chilies.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                      <p className="text-blue-700 text-sm">💡 Don't let mustard seeds burn - they turn bitter</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Add Bamboo Shoots</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      Add the boiled bamboo shoots to the pan. Mix well with the tempering and add turmeric powder.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                      <p className="text-blue-700 text-sm">💡 Mix gently to coat with spices without mashing</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Simmer and Serve</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      Add a little water, salt, and simmer covered until bamboo shoots are completely tender and flavors are absorbed.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                      <p className="text-blue-700 text-sm">💡 Check occasionally and add water if needed</p>
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
                This dish represents the tribal philosophy of using every part of nature sustainably and showcases 
                their extensive knowledge of forest vegetables. Bamboo shoots are considered a delicacy and are rich 
                in nutrients. The traditional preparation method removes toxins while preserving nutritional value, 
                demonstrating centuries of culinary wisdom.
              </p>
              
              <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
                <h3 className="font-bold text-primary mb-3">Serving Traditions</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    Serve with steamed rice as a side dish
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    Pairs well with dal and other vegetarian curries
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    Can be eaten with roti or bread
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    Best enjoyed fresh during bamboo season
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
