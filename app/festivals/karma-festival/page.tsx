"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function KarmaFestivalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
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
            <Badge className="mb-4 bg-green-100 text-green-700 border-green-200">
              🌳 Nature Worship
            </Badge>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Karma Festival</h1>
            <p className="text-xl text-gray-600">
              Festival dedicated to the worship of Karma tree and nature conservation
            </p>
          </div>

          <Card className="mt-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">About Karma Festival</h2>
              <p className="text-gray-700 leading-relaxed">
                Karma Festival is celebrated to worship the Karma tree, which is considered sacred 
                by tribal communities. The festival emphasizes the importance of trees and environmental 
                conservation in tribal culture.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
