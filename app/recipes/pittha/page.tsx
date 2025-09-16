"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PitthaRecipePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
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
            <Badge className="mb-4 bg-pink-100 text-pink-700 border-pink-200">
              🍰 Traditional Dessert
            </Badge>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Pittha</h1>
            <p className="text-xl text-gray-600">
              Steamed rice flour dumplings with jaggery filling - sweet and soft traditional treat
            </p>
          </div>

          <Card className="mt-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">About Pittha</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Pittha is a beloved traditional dessert from Jharkhand, made with rice flour and filled 
                with sweet jaggery. These steamed dumplings are soft, sweet, and often prepared during 
                festivals and special occasions.
              </p>
              
              <h3 className="text-xl font-semibold mb-4">Key Ingredients</h3>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• Rice flour for the outer layer</li>
                <li>• Jaggery for sweet filling</li>
                <li>• Coconut (optional)</li>
                <li>• Cardamom for flavoring</li>
              </ul>
              
              <p className="text-gray-700">
                The combination of the soft rice flour exterior and sweet jaggery filling makes 
                Pittha a delightful dessert that represents the traditional flavors of Jharkhand.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
