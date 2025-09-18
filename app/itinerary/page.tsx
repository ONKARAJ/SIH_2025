import { Navigation } from "@/components/navigation";
import { ItineraryPlanner } from "@/components/itinerary-planner";

export default function ItineraryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16"> {/* Account for sticky navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              Plan Your Perfect Journey
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Create your personalized Jharkhand itinerary with our AI-powered planner. 
              From waterfalls to tribal culture, let us help you discover the best of Jharkhand!
            </p>
          </div>
          
          <ItineraryPlanner />
        </div>
      </div>
    </div>
  );
}
