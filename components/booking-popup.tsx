"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plane, Train, Hotel, X, MapPin, Clock, Star } from "lucide-react";

interface BookingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  placeName: string;
}

export function BookingPopup({ isOpen, onClose, placeName }: BookingPopupProps) {
  const router = useRouter();
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

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
      <DialogContent className="max-w-md p-0 bg-gradient-to-br from-slate-50 to-gray-100 rounded-3xl border-0 shadow-2xl overflow-hidden animate-scaleIn">
        {/* Header */}
        <div className="relative px-6 py-8 text-center">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200 group"
          >
            <X className="h-4 w-4 text-gray-600 group-hover:rotate-90 transition-transform duration-200" />
          </button>
          
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
              <span className="text-2xl">🚀</span>
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
              Book Your Journey
            </DialogTitle>
            <p className="text-gray-600 text-sm">
              Choose how you'd like to travel to <span className="font-semibold text-gray-800">{placeName}</span>
            </p>
          </div>
        </div>
        
        {/* Main content */}
        <div className="px-6 pb-6 space-y-3">
          {/* Flight Option */}
          <div className={`group transition-all duration-300 transform ${
            hoveredOption === 'flight' ? 'scale-105' : 'scale-100'
          }`}
            onMouseEnter={() => setHoveredOption('flight')}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <Button
              onClick={handleBookFlight}
              className="w-full h-16 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-0"
            >
              <div className="flex items-center justify-center w-full px-6">
                <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-xl mr-4">
                  <Plane className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-bold text-lg leading-tight">Book Flight</div>
                  <div className="text-white/80 text-sm">Fastest way to reach</div>
                </div>
                <div className={`transition-transform duration-300 ${
                  hoveredOption === 'flight' ? 'translate-x-1' : ''
                }`}>
                  <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Button>
          </div>
          
          {/* Train Option */}
          <div className={`group transition-all duration-300 transform ${
            hoveredOption === 'train' ? 'scale-105' : 'scale-100'
          }`}
            onMouseEnter={() => setHoveredOption('train')}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <Button
              onClick={handleBookTrain}
              className="w-full h-16 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-0"
            >
              <div className="flex items-center justify-center w-full px-6">
                <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-xl mr-4">
                  <Train className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-bold text-lg leading-tight">Book Train</div>
                  <div className="text-white/80 text-sm">Scenic and comfortable</div>
                </div>
                <div className={`transition-transform duration-300 ${
                  hoveredOption === 'train' ? 'translate-x-1' : ''
                }`}>
                  <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Button>
          </div>
          
          {/* Hotel Option */}
          <div className={`group transition-all duration-300 transform ${
            hoveredOption === 'hotel' ? 'scale-105' : 'scale-100'
          }`}
            onMouseEnter={() => setHoveredOption('hotel')}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <Button
              onClick={handleBookHotel}
              className="w-full h-16 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-0"
            >
              <div className="flex items-center justify-center w-full px-6">
                <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-xl mr-4">
                  <Hotel className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-bold text-lg leading-tight">Book Hotel</div>
                  <div className="text-white/80 text-sm">Perfect stay options</div>
                </div>
                <div className={`transition-transform duration-300 ${
                  hoveredOption === 'hotel' ? 'translate-x-1' : ''
                }`}>
                  <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Button>
          </div>
          
          {/* Cancel Button */}
          <div className="pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full h-12 rounded-2xl border-2 border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium transition-all duration-200"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
