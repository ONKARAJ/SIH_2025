"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DhuskaRecipePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <Navigation />
      
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/about" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to About
            </Link>
          </Button>
          
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-yellow-100 text-yellow-700 border-yellow-200">
              🥞 Breakfast Delicacy
            </Badge>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Dhuska</h1>
            <p className="text-xl text-gray-600">
              Deep-fried lentil and rice pancakes served with curry - a crispy and savory delight
            </p>
          </div>

          <Card className="mt-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">About Dhuska</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Dhuska is a popular breakfast item in Jharkhand, made from a batter of lentils and rice. 
                These golden, crispy pancakes are deep-fried and served hot with spicy curry or chutney.
              </p>
              
              <h3 className="text-xl font-semibold mb-4">Key Ingredients</h3>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• Rice and lentil batter</li>
                <li>• Onions and green chilies</li>
                <li>• Ginger and spices</li>
                <li>• Oil for deep frying</li>
              </ul>
              
              <p className="text-gray-700">
                The crispy exterior and soft interior make Dhuska a favorite among locals, 
                especially when paired with traditional jharkhand curry.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
