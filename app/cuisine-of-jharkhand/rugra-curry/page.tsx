'use client'

import { Navigation } from '@/components/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, ChefHat, Leaf, ArrowLeft, BookOpen, Utensils } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function RugraCurryPage() {
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
                <h1 className="text-4xl font-bold mb-4">Rugra Curry</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Wild mushroom curry made with forest mushrooms, showcasing the deep connection between tribal 
                  cuisine and nature. This earthy, flavorful dish represents sustainable foraging practices and 
                  the harmony between humans and forest ecosystems.
                </p>
              </div>
              
              {/* Recipe Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <div className="text-sm font-medium">25 Minutes</div>
                  <div className="text-xs text-muted-foreground">Cook Time</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <Users className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <div className="text-sm font-medium">3-4</div>
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
                  <Badge variant="outline" className="border-green-200 text-green-800">Rich in protein and minerals</Badge>
                  <Badge variant="outline" className="border-green-200 text-green-800">Low in calories</Badge>
                  <Badge variant="outline" className="border-green-200 text-green-800">High in antioxidants</Badge>
                  <Badge variant="outline" className="border-green-200 text-green-800">Boosts immunity</Badge>
                </div>
              </div>
            </div>
            
            {/* Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=80"
                alt="Rugra Curry - Wild Mushroom Curry"
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
                      <span className="font-medium">Wild mushrooms (Rugra)</span>
                      <span className="text-primary font-semibold">200g</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Fresh or dried, cleaned properly</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-background rounded-lg shadow-sm">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Onions</span>
                      <span className="text-primary font-semibold">1 medium</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Finely chopped</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-background rounded-lg shadow-sm">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Tomatoes</span>
                      <span className="text-primary font-semibold">1 medium</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Chopped</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-background rounded-lg shadow-sm">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Mustard oil</span>
                      <span className="text-primary font-semibold">2 tbsp</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Traditional choice</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-background rounded-lg shadow-sm">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Garlic & Ginger</span>
                      <span className="text-primary font-semibold">5-6 cloves + 1 inch</span>
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
                    <h3 className="font-semibold mb-2">Clean the Mushrooms</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      Clean rugra mushrooms thoroughly, removing any dirt or debris. If using dried mushrooms, soak them in warm water for 15 minutes.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                      <p className="text-blue-700 text-sm">💡 Be gentle while cleaning to maintain texture</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Prepare the Base</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      Heat mustard oil in a pan. Add minced garlic and ginger, sauté until fragrant. Add chopped onions and cook until golden brown.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                      <p className="text-blue-700 text-sm">💡 Don't let garlic burn as it will turn bitter</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Add Spices and Tomatoes</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      Add turmeric and red chili powder, mix well. Add tomatoes and cook until they break down and become mushy.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                      <p className="text-blue-700 text-sm">💡 Cook spices briefly to remove raw taste</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Cook and Serve</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      Add cleaned rugra mushrooms and cook for 3-4 minutes. Add water, salt, and simmer until tender. Garnish with fresh coriander.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                      <p className="text-blue-700 text-sm">💡 Don't overcook mushrooms as they become rubbery</p>
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
                Rugra represents the sustainable foraging practices of tribal communities and their deep knowledge 
                of edible forest produce. It showcases the harmony between humans and forest ecosystems, demonstrating 
                how tribal communities have lived in balance with nature for centuries, using only what they need 
                and ensuring the forest's continued abundance.
              </p>
              
              <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
                <h3 className="font-bold text-primary mb-3">Serving Suggestions</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    Best served with steamed rice
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    Can be paired with roti or bread
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary">•</span>
                    Complement with dal and vegetables for a complete meal
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
