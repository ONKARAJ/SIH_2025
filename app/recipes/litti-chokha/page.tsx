"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Users, ChefHat, Flame } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LittiChokhaRecipePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/about" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to About
            </Link>
          </Button>
          
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-orange-100 text-orange-700 border-orange-200">
              🍽️ Traditional Main Course
            </Badge>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Litti Chokha</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The iconic dish of Jharkhand - stuffed wheat balls with spiced mashed vegetables
            </p>
          </div>
        </div>
      </section>

      {/* Main Image */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-6xl mx-auto">
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1200&q=80"
              alt="Litti Chokha Traditional Dish"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <div className="flex items-center gap-4 mb-2">
                <Badge className="bg-orange-500 text-white">Spicy & Smoky</Badge>
                <Badge className="bg-red-500 text-white">Traditional</Badge>
              </div>
              <h2 className="text-2xl font-bold">Authentic Jharkhand Cuisine</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">About Litti Chokha</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Litti Chokha is the most famous traditional dish of Jharkhand and Bihar, representing 
                    the authentic flavors of rural India. Litti is a round wheat flour ball stuffed with 
                    roasted gram flour (sattu) and spices, traditionally cooked over cow dung cakes or 
                    charcoal for that distinctive smoky flavor.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Chokha is the accompanying side dish made from mashed roasted vegetables like brinjal, 
                    tomatoes, and potatoes, mixed with onions, garlic, and mustard oil. Together, they 
                    create a nutritious and flavorful meal that's been enjoyed for centuries.
                  </p>

                  <h3 className="text-xl font-semibold mb-4">Ingredients for Litti</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="font-medium mb-2">For the Dough:</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• 2 cups whole wheat flour</li>
                        <li>• 1 tbsp ghee</li>
                        <li>• 1/2 tsp salt</li>
                        <li>• Water as needed</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">For the Stuffing:</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• 1 cup roasted gram flour (sattu)</li>
                        <li>• 2 tbsp mustard oil</li>
                        <li>• 1 tsp ginger-garlic paste</li>
                        <li>• 1 tsp carom seeds (ajwain)</li>
                        <li>• 1 tsp red chili powder</li>
                        <li>• Salt to taste</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-4">Ingredients for Chokha</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6 text-sm text-gray-600">
                    <li>• 2 large brinjals (roasted)</li>
                    <li>• 3 tomatoes (roasted)</li>
                    <li>• 2 potatoes (boiled)</li>
                    <li>• 1 onion (finely chopped)</li>
                    <li>• 3-4 garlic cloves</li>
                    <li>• 2 tbsp mustard oil</li>
                    <li>• Green chilies to taste</li>
                    <li>• Salt to taste</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-4">Cooking Instructions</h3>
                  
                  <h4 className="font-medium mb-2">For Litti:</h4>
                  <ol className="space-y-2 mb-6 text-gray-700">
                    <li className="flex gap-2">
                      <span className="bg-orange-100 text-orange-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">1</span>
                      <span>Make a firm dough with wheat flour, ghee, salt, and water. Let it rest.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-orange-100 text-orange-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">2</span>
                      <span>Mix all stuffing ingredients to make the sattu mixture.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-orange-100 text-orange-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">3</span>
                      <span>Roll the dough, stuff with sattu mixture, and shape into balls.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-orange-100 text-orange-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">4</span>
                      <span>Cook over charcoal or in an oven at 200°C for 15-20 minutes until golden.</span>
                    </li>
                  </ol>

                  <h4 className="font-medium mb-2">For Chokha:</h4>
                  <ol className="space-y-2 text-gray-700">
                    <li className="flex gap-2">
                      <span className="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">1</span>
                      <span>Roast brinjals and tomatoes over open flame until charred.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">2</span>
                      <span>Peel and mash the roasted vegetables with boiled potatoes.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">3</span>
                      <span>Heat mustard oil, add onions, garlic, and green chilies.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">4</span>
                      <span>Mix with mashed vegetables, add salt, and serve hot.</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <ChefHat className="h-5 w-5 text-orange-500" />
                    Recipe Info
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Prep: 30 mins, Cook: 25 mins</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Serves 4-6 people</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Difficulty: Medium</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Nutritional Benefits</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• High in protein from gram flour</li>
                    <li>• Rich in fiber from whole wheat</li>
                    <li>• Good source of vitamins from vegetables</li>
                    <li>• Contains healthy fats from mustard oil</li>
                    <li>• Provides complex carbohydrates</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Cooking Tips</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Use cow dung cakes for authentic smoky flavor</li>
                    <li>• Don't overstuff the litti</li>
                    <li>• Roast vegetables over open flame for best taste</li>
                    <li>• Serve hot with ghee on top</li>
                    <li>• Pair with green chutney</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-4">Try This Recipe</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Master the art of traditional Jharkhand cooking
                  </p>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    Share Recipe
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
