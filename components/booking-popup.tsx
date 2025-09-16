"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plane, Train, Hotel } from "lucide-react";

interface BookingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  placeName: string;
}

export function BookingPopup({ isOpen, onClose, placeName }: BookingPopupProps) {
  const router = useRouter();

  const handleBookFlight = () => {
    onClose();
    router.push('/book-flights');
  };

  const handleBookTrain = () => {
    onClose();
    router.push('/book-trains');
  };

  const handleBookHotel = () => {
    onClose();
    router.push('/book-hotels');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 text-center">
            🚀 Book Your Journey
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="text-gray-600 text-center mb-6">
            Choose how you'd like to travel to {placeName}
          </p>
          
          <div className="space-y-3">
            <Button
              onClick={handleBookFlight}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white border-0 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 py-4 text-lg"
            >
              <Plane className="h-6 w-6" />
              <div className="text-left">
                <div className="font-semibold">Book Flight</div>
                <div className="text-xs opacity-90">Fastest way to reach</div>
              </div>
            </Button>
            
            <Button
              onClick={handleBookTrain}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 py-4 text-lg"
            >
              <Train className="h-6 w-6" />
              <div className="text-left">
                <div className="font-semibold">Book Train</div>
                <div className="text-xs opacity-90">Scenic and comfortable</div>
              </div>
            </Button>
            
            <Button
              onClick={handleBookHotel}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 py-4 text-lg"
            >
              <Hotel className="h-6 w-6" />
              <div className="text-left">
                <div className="font-semibold">Book Hotel</div>
                <div className="text-xs opacity-90">Perfect stay options</div>
              </div>
            </Button>
          </div>
          
          <div className="pt-4 border-t">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full rounded-xl"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
