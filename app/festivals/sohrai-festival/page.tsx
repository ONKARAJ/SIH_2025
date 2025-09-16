"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SohraiFestivalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
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
            <Badge className="mb-4 bg-amber-100 text-amber-700 border-amber-200">
              🎨 Harvest Festival
            </Badge>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Sohrai Festival</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Harvest festival with beautiful tribal wall paintings celebrating cattle and harvest
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <div className="relative h-64 rounded-lg overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80"
                  alt="Sohrai Festival"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold mb-4">About Sohrai Festival</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Sohrai is a major harvest festival celebrated by the tribal communities of Jharkhand, 
                particularly known for its elaborate wall paintings and cattle worship ceremonies.
              </p>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-amber-500" />
                <span className="font-medium">Celebrated: October-November</span>
              </div>
              <p className="text-gray-700">
                The festival involves decorating homes with intricate mud paintings, worshipping cattle, 
                and celebrating the harvest season with community feasts and traditional music.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
