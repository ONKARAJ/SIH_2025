"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function HandiaRecipePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
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
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
              🍺 Traditional Beverage
            </Badge>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Handia</h1>
            <p className="text-xl text-gray-600">
              Traditional fermented rice beer of tribal communities - mild and refreshing
            </p>
          </div>

          <Card className="mt-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">About Handia</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Handia is a traditional fermented rice beer that holds great cultural significance 
                among the tribal communities of Jharkhand. This mildly alcoholic beverage is prepared 
                using rice and natural fermentation agents.
              </p>
              
              <h3 className="text-xl font-semibold mb-4">Cultural Significance</h3>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• Used in religious and cultural ceremonies</li>
                <li>• Symbol of hospitality in tribal communities</li>
                <li>• Traditionally prepared by women</li>
                <li>• Important part of festival celebrations</li>
              </ul>
              
              <p className="text-gray-700">
                Note: Handia is a traditional cultural beverage with religious and social importance. 
                It represents the rich brewing traditions of Jharkhand's tribal heritage.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
