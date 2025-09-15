"use client";

import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  MapPin,
  Calendar,
  Star,
  Leaf,
  Users,
  Mountain,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ReviewCard } from "@/components/review-card";

export default function Home() {
  // Default reviews that always show on homepage
  const defaultReviews = [
    // Reviews with videos (2 reviews) - Using available images as poster/fallback
    {
      name: "Priya Sharma",
      rating: 5,
      feedback:
        "Absolutely breathtaking! The powerful cascade and surrounding greenery create a magical atmosphere. Hundru Falls is truly a spectacular natural wonder of Jharkhand!",
      date: "2 weeks ago",
      // Using existing image since video doesn't exist
      spotImage: "/hundru-falls-waterfall-jharkhand-rocky-cliffs-fore.jpg",
      spotName: "Hundru Falls",
      location: "Ranchi"
    },
    {
      name: "Vikram Singh",
      rating: 5,
      feedback:
        "The sunrise view from Parasnath Hill is simply divine! At 4,431 feet, it's the highest peak in Jharkhand with breathtaking panoramic views and sacred Jain temples.",
      date: "1 week ago",
      // Using existing image since video doesn't exist
      spotImage: "/parasnath-hill-jharkhand-highest-peak-jain-temple.jpg",
      spotName: "Parasnath Hill",
      location: "Giridih"
    },
    // Reviews with photos (2 reviews)
    {
      name: "Meera Gupta",
      rating: 4,
      feedback:
        "Dassam Falls during monsoon is a sight to behold! The 144-foot waterfall creates a thunderous roar and misty atmosphere. Perfect for nature photography.",
      date: "3 weeks ago",
      spotImage: "/dassam-falls-jharkhand-niagara-waterfall-rocks.jpg",
      spotName: "Dassam Falls",
      location: "Ranchi"
    },
    {
      name: "Rohini Sharma",
      rating: 5,
      feedback:
        "Jagannath Temple in Ranchi is a magnificent replica of the famous Puri temple! The architecture and spiritual atmosphere make it a must-visit destination for devotees.",
      date: "5 days ago",
      spotImage: "/jagannath-temple-ranchi-architecture-spiritual.jpg",
      spotName: "Jagannath Temple",
      location: "Ranchi"
    },
    // More photo reviews (2 additional)
    {
      name: "Arjun Kumar",
      rating: 5,
      feedback:
        "Netarhat Hill Station is truly the 'Queen of Chotanagpur'! The sunrise and sunset views are absolutely mesmerizing. The cool climate and lush greenery make it a perfect getaway.",
      date: "1 week ago",
      spotImage: "/netarhat-hill-station-jharkhand-sunrise-sunset-pin.jpg",
      spotName: "Netarhat Hill Station",
      location: "Latehar"
    },
    {
      name: "Kavita Singh",
      rating: 4,
      feedback:
        "Baidyanath Temple in Deoghar is one of the most sacred Jyotirlingas! The spiritual energy during Shravan month is incredible. A must-visit for devotees and spiritual seekers.",
      date: "4 days ago",
      spotImage: "/baidyanath-temple-deoghar-jyotirlinga-shiva-pilgri.jpg",
      spotName: "Baidyanath Dham",
      location: "Deoghar"
    },
    // Reviews without media (2 reviews)
    {
      name: "Rajesh Kumar",
      rating: 5,
      feedback:
        "Amazing wildlife experience! Spotted tigers, elephants, and various bird species in Betla National Park. The forest guides were incredibly knowledgeable about local wildlife and tribal traditions.",
      date: "1 month ago",
      spotName: "Betla National Park",
      location: "Latehar"
    },
    {
      name: "Anita Devi",
      rating: 5,
      feedback:
        "One of the most sacred Jyotirlinga temples in India. The spiritual energy at Baidyanath Dham and the devotion of pilgrims create an unforgettable divine experience. A must-visit for spiritual seekers.",
      date: "2 months ago",
      spotName: "Baidyanath Dham",
      location: "Deoghar"
    },
  ];
  
  const [recentReviews, setRecentReviews] = useState(defaultReviews);

  // Always show default reviews on homepage - don't override with localStorage
  // This ensures consistent display for all visitors
  useEffect(() => {
    // Keep the default reviews as the primary display
    setRecentReviews(defaultReviews);
  }, []);

  const averageRating =
    recentReviews.length > 0
      ? (
          recentReviews.reduce((sum, review) => sum + review.rating, 0) /
          recentReviews.length
        ).toFixed(1)
      : "4.8";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Enhanced Hero Section with Background Video */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/jharkhand-forest-landscape-with-tribal-culture-ele.jpg')"
          }}
        >
          <video 
            className="w-full h-full object-cover"
            autoPlay 
            muted 
            loop 
            playsInline
            poster="/jharkhand-forest-landscape-with-tribal-culture-ele.jpg"
            onError={(e) => {
              // Hide video if it fails to load, fallback to background image
              e.currentTarget.style.display = 'none';
            }}
          >
            <source src="/jharkhand-landscape-video.mp4" type="video/mp4" />
            <source src="/jharkhand-landscape-video.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4 animate-fade-in">
          <div className="mb-6 animate-fade-in-delay-200">
            <span className="inline-block bg-orange-500/90 text-white px-6 py-3 rounded-full text-sm font-medium mb-4 shadow-lg">
              Explore India's Hidden Gem
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight animate-fade-in-delay-400">
            Discover the Untouched Beauty of
            <span className="text-orange-400"> Jharkhand</span>
          </h1>

          <div className="max-w-4xl mx-auto mb-8 animate-fade-in-delay-600">
            <p className="text-lg md:text-xl lg:text-2xl mb-6 text-pretty leading-relaxed opacity-95">
              Journey through India's mineral-rich heartland where ancient
              tribal traditions meet pristine wilderness. Experience the harmony
              of 32 tribal communities, witness sacred festivals like Sarhul and
              Sohrai, and explore breathtaking waterfalls, dense forests, and
              spiritual temples.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-sm md:text-base">
              <div className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg py-3 px-4 hover:bg-white/20 transition-all duration-300">
                <Leaf className="h-5 w-5 text-green-400" />
                <span>Eco-Tourism Paradise</span>
              </div>
              <div className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg py-3 px-4 hover:bg-white/20 transition-all duration-300">
                <Users className="h-5 w-5 text-orange-400" />
                <span>Rich Tribal Heritage</span>
              </div>
              <div className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg py-3 px-4 hover:bg-white/20 transition-all duration-300">
                <Mountain className="h-5 w-5 text-blue-400" />
                <span>Untouched Landscapes</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-delay-800">
            <Link href="/places">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Explore Places
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/festivals">
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/50 text-lg px-8 py-4 transition-all duration-300 transform hover:scale-105"
              >
                Discover Festivals
              </Button>
            </Link>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Quick Stats Section */}
      <section className="py-20 bg-card relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-secondary rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
              Why Choose Jharkhand?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From pristine waterfalls to vibrant tribal festivals, Jharkhand
              offers authentic experiences that connect you with nature and
              culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6 mx-auto group-hover:shadow-lg transition-shadow">
                <MapPin className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="text-3xl font-bold text-card-foreground mb-2">
                50+
              </h3>
              <h4 className="text-xl font-semibold text-card-foreground mb-3">
                Tourist Destinations
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Explore magnificent waterfalls like Hundru and Dassam, ancient
                temples, dense forests, and authentic tribal villages across the
                state.
              </p>
            </div>

            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6 mx-auto group-hover:shadow-lg transition-shadow">
                <Calendar className="h-10 w-10 text-secondary-foreground" />
              </div>
              <h3 className="text-3xl font-bold text-card-foreground mb-2">
                12+
              </h3>
              <h4 className="text-xl font-semibold text-card-foreground mb-3">
                Cultural Festivals
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Experience vibrant tribal festivals like Sarhul, Sohrai, Tusu,
                and Karma that celebrate the deep connection between nature and
                tribal communities.
              </p>
            </div>

            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mb-6 mx-auto group-hover:shadow-lg transition-shadow">
                <Star className="h-10 w-10 text-accent-foreground" />
              </div>
              <h3 className="text-3xl font-bold text-card-foreground mb-2">
                {averageRating}
              </h3>
              <h4 className="text-xl font-semibold text-card-foreground mb-3">
                Traveler Rating
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Highly rated by travelers for authentic cultural experiences,
                pristine natural beauty, and warm hospitality of local
                communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-background to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Traveler Experiences
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover what makes Jharkhand special through authentic stories and 
              experiences from fellow travelers who have explored our beautiful state.
            </p>
            <div className="flex items-center justify-center mt-6 space-x-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(Number.parseFloat(averageRating))
                        ? "fill-secondary text-secondary"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-foreground">
                {averageRating}
              </span>
              <span className="text-muted-foreground">
                based on recent reviews
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {recentReviews.map((review, index) => (
              <ReviewCard
                key={index}
                name={review.name}
                rating={review.rating}
                feedback={review.feedback}
                date={review.date}
                spotImage={review.spotImage}
                spotVideo={review.spotVideo}
                spotName={review.spotName}
                location={review.location}
              />
            ))}
          </div>

          <div className="text-center">
            <Link href="/reviews">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-3 bg-transparent"
              >
                View All Reviews
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-card py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">
                    JH
                  </span>
                </div>
                <span className="font-bold text-xl text-primary">
                  Jharkhand Tourism
                </span>
              </div>
              <p className="text-muted-foreground mb-4">
                Discover the untouched beauty of Jharkhand – a land where
                ancient tribal traditions meet cascading waterfalls, dense
                forests, sacred temples, and vibrant cultural heritage, offering
                travelers an authentic and unforgettable experience
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground mb-4">
                Quick Links
              </h3>
              <div className="space-y-2">
                <Link
                  href="/places"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Places to Visit
                </Link>
                <Link
                  href="/festivals"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Festivals & Heritage
                </Link>
                <Link
                  href="/reviews"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Reviews
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground mb-4">
                Contact
              </h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Jharkhand Tourism Board</p>
                <p>Ranchi, Jharkhand</p>
                <p>info@jharkhnadtourism.gov.in</p>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 Jharkhand Tourism. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
