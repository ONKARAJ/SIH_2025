"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bus,
  Calendar,
  MapPin,
  Clock,
  Users,
  ArrowRight,
  Star,
  Zap
} from "lucide-react";

export function QuickBookingOptions() {
  const bookingOptions = [
    {
      id: "buses",
      title: "Bus Tickets",
      description: "Comfortable inter-state bus travel",
      icon: Bus,
      href: "/book-buses",
      color: "bg-orange-600 hover:bg-orange-700",
      features: ["AC & Non-AC Options", "Multiple Routes", "Online Booking"],
      popular: true,
      routes: ["Ranchi ↔ Kolkata", "Dhanbad ↔ Patna", "Jamshedpur ↔ Bhubaneswar"]
    },
    {
      id: "tours",
      title: "Cultural Tours",
      description: "Guided cultural and heritage tours",
      icon: Calendar,
      href: "/book-tour",
      color: "bg-green-600 hover:bg-green-700",
      features: ["Expert Guides", "All Inclusive", "Group Tours"],
      popular: false,
      routes: ["Heritage Trails", "Tribal Culture", "Nature Expeditions"]
    }
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Quick Booking Options
        </h2>
        <p className="text-lg text-gray-600">
          Book your travel and tours with just a few clicks
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {bookingOptions.map((option) => {
          const IconComponent = option.icon;
          
          return (
            <Card key={option.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-orange-100 rounded-xl">
                      <IconComponent className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        {option.title}
                        {option.popular && (
                          <Badge className="bg-orange-100 text-orange-800 text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                      </CardTitle>
                      <p className="text-gray-600 text-sm">{option.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Features */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 text-sm">Key Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {option.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-gray-50">
                        <Zap className="w-3 h-3 mr-1" />
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Routes/Options */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 text-sm">Available Options</h4>
                  <div className="space-y-1">
                    {option.routes.map((route, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-3 h-3 text-orange-500" />
                        <span>{route}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-500" />
                        <span className="text-gray-600">
                          {option.id === "buses" ? "24/7 Available" : "Daily Departures"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-gray-500" />
                        <span className="text-gray-600">
                          {option.id === "buses" ? "1-50 Seats" : "Group Tours"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Button asChild className={`w-full ${option.color} text-white`}>
                  <Link href={option.href} className="flex items-center justify-center gap-2">
                    <IconComponent className="w-4 h-4" />
                    Book {option.title}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="mt-8 text-center">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Why Book With Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>Instant Confirmation</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-blue-600" />
              <span>Best Price Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
