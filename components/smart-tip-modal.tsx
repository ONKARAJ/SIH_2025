"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Clock, IndianRupee, Calendar, ArrowRight } from "lucide-react";

interface SmartTipModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: string;
  bookingType: string;
  externalUrl: string;
}

export function SmartTipModal({
  isOpen,
  onClose,
  destination,
  bookingType,
  externalUrl,
}: SmartTipModalProps) {
  if (!isOpen) return null;

  const tips = {
    hotel: {
      budget: "Book homestays or government guesthouses for 50-70% savings",
      duration: "2-3 days recommended for full exploration",
      pricing:
        "Peak season (Oct-Mar): ₹2000-4000/night, Off-season: ₹800-1500/night",
    },
    flight: {
      budget:
        "Book Ranchi flights, then local transport saves 40% vs direct routes",
      duration: "Plan 4-5 days minimum including travel time",
      pricing: "Peak season: ₹8000-15000, Off-season: ₹4000-8000",
    },
    package: {
      budget:
        "Local tour operators offer 30-50% better rates than online platforms",
      duration: "3-7 days packages available with cultural immersion",
      pricing: "Peak season: ₹5000-12000/person, Off-season: ₹3000-7000/person",
    },
  };

  const currentTips = tips[bookingType as keyof typeof tips];

  const handleProceed = () => {
    window.location.href = externalUrl;
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold text-card-foreground">
            Smart Travel Tips
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center mb-4">
            <Badge variant="secondary" className="mb-2">
              {destination} -{" "}
              {bookingType.charAt(0).toUpperCase() + bookingType.slice(1)}{" "}
              Booking
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <IndianRupee className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-card-foreground">
                  Budget Tips
                </h4>
                <p className="text-sm text-muted-foreground">
                  {currentTips.budget}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-card-foreground">Duration</h4>
                <p className="text-sm text-muted-foreground">
                  {currentTips.duration}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-card-foreground">
                  Seasonal Pricing
                </h4>
                <p className="text-sm text-muted-foreground">
                  {currentTips.pricing}
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent"
            >
              Maybe Later
            </Button>
            <Button onClick={handleProceed} className="flex-1">
              Book Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
