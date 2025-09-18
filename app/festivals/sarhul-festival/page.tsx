"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, Users, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SarhulFestivalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
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
            <Badge className="mb-4 bg-amber-100 text-amber-700 border-amber-200">
              🌸 Spring Festival
            </Badge>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Sarhul Festival</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The sacred spring festival celebrating the worship of nature and Sal trees
            </p>
          </div>
        </div>
      </section>

      {/* Main Image */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-6xl mx-auto">
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80"
              alt="Sarhul Festival Celebration"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <div className="flex items-center gap-4 mb-2">
                <Badge className="bg-amber-500 text-white">March-April</Badge>
                <Badge className="bg-green-500 text-white">Tribal New Year</Badge>
              </div>
              <h2 className="text-2xl font-bold">Celebration of Nature's Revival</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">About Sarhul Festival</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Sarhul is one of the most important festivals celebrated by the tribal communities of Jharkhand, 
                    particularly the Santal, Munda, Ho, and Oraon tribes. The festival marks the arrival of spring 
                    and is dedicated to the worship of Sal trees (Shorea robusta), which hold sacred significance 
                    in tribal culture.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    The word "Sarhul" is derived from "Sar" meaning year and "Hul" meaning beginning, making it 
                    literally the beginning of the new year for tribal communities. The festival celebrates the 
                    divine relationship between humans and nature, emphasizing the importance of environmental 
                    conservation.
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-4">Festival Rituals</h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2" />
                      <span className="text-gray-700">Worship of Sal trees with offerings of rice beer and flowers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2" />
                      <span className="text-gray-700">Traditional dances like Jhumar and Sohrai performed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2" />
                      <span className="text-gray-700">Community feasting with traditional dishes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2" />
                      <span className="text-gray-700">Ceremonial hunting and fishing activities</span>
                    </li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-4">Cultural Significance</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Sarhul represents the deep connection between tribal communities and nature. It reinforces 
                    the belief that trees, especially Sal trees, are sacred and should be protected. The festival 
                    serves as a reminder of sustainable living and the importance of maintaining ecological balance.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-amber-500" />
                    Festival Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">3-5 Days</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium">March-April</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Celebrated By</p>
                      <p className="font-medium">Tribal Communities</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-green-500" />
                    Where to Experience
                  </h3>
                  <div className="space-y-2">
                    <Badge variant="outline">Ranchi</Badge>
                    <Badge variant="outline">Khunti</Badge>
                    <Badge variant="outline">Gumla</Badge>
                    <Badge variant="outline">Simdega</Badge>
                    <Badge variant="outline">West Singhbhum</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    Traditional Activities
                  </h3>
                  <ul className="space-y-2">
                    <li className="text-sm">• Sal tree worship ceremonies</li>
                    <li className="text-sm">• Folk dances and music</li>
                    <li className="text-sm">• Community feasting</li>
                    <li className="text-sm">• Traditional games</li>
                    <li className="text-sm">• Cultural performances</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-4">Plan Your Visit</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Experience the authentic tribal culture during Sarhul festival
                  </p>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700">
                    Plan Festival Tour
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
