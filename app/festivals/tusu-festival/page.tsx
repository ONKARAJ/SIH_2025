"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TusuFestivalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
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
            <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200">
              🎪 Folk Festival
            </Badge>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Tusu Festival</h1>
            <p className="text-xl text-gray-600">
              Folk festival marking the end of harvest season with joyous celebrations
            </p>
          </div>

          <Card className="mt-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">About Tusu Festival</h2>
              <p className="text-gray-700 leading-relaxed">
                Tusu Festival is a vibrant folk celebration that marks the end of the harvest season. 
                It features traditional songs, dances, and community gatherings that celebrate the 
                successful completion of agricultural activities.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
