"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation'
import {
  MapPin,
  Calendar,
  ChevronDown,
  Plane,
  Hotel,
  Package,
} from "lucide-react";

interface PlaceCardProps {
  name: string;
  description: string;
  bestTime: string;
  image: string;
  category: string;
}

export function PlaceCard({
  name,
  description,
  bestTime,
  image,
  category,
}: PlaceCardProps) {
  const router = useRouter();

  const handleBookingClick = (type: string) => {
    if (type === 'hotel') {
      router.push('/book-hotels');
    } else if (type === 'flight') {
      router.push('/book-flights');
    } else if (type === 'package') {
      router.push('/book-tour');
    }
  };

  return (
    <>
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-border bg-card">
        <div className="relative overflow-hidden">
          <div
            className="h-64 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundImage: `url('${image}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <Badge
              variant="secondary"
              className="absolute top-4 left-4 bg-secondary/90 text-secondary-foreground"
            >
              {category}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors">
            {name}
          </h3>

          <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
            {description}
          </p>

          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm text-card-foreground font-medium">
              Best Time:
            </span>
            <span className="text-sm text-muted-foreground">{bestTime}</span>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent"
            >
              <MapPin className="h-4 w-4 mr-2" />
              View Details
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="flex-1">
                  Book Now
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => handleBookingClick("hotel")}>
                  <Hotel className="mr-2 h-4 w-4" />
                  Book Hotel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBookingClick("flight")}>
                  <Plane className="mr-2 h-4 w-4" />
                  Book Flight
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBookingClick("package")}>
                  <Package className="mr-2 h-4 w-4" />
                  Book Package
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
