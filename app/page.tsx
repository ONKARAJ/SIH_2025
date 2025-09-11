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
  const [recentReviews, setRecentReviews] = useState([
    {
      name: "Priya Sharma",
      rating: 5,
      feedback:
        "Absolutely breathtaking! The Hundru Falls were spectacular, and the tribal culture experience was authentic and enriching. Jharkhand exceeded all my expectations.",
      date: "2 weeks ago",
    },
    {
      name: "Rajesh Kumar",
      rating: 4,
      feedback:
        "Great experience visiting Betla National Park. Saw tigers and elephants in their natural habitat. The local guides were very knowledgeable about the wildlife.",
      date: "1 month ago",
    },
    {
      name: "Anita Devi",
      rating: 5,
      feedback:
        "The Sarhul festival was a once-in-a-lifetime experience. The connection between the tribal communities and nature is truly inspiring. Highly recommend visiting during festival season.",
      date: "2 months ago",
    },
  ]);

  useEffect(() => {
    const savedReviews = localStorage.getItem("jharkhand-reviews");
    if (savedReviews) {
      const allReviews = JSON.parse(savedReviews);
      setRecentReviews(allReviews.slice(0, 3));
    }
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

      {/* Enhanced Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/jharkhand-forest-landscape-with-tribal-culture-ele.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
          <div className="mb-6">
            <span className="inline-block bg-secondary/90 text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
              Explore India's Hidden Gem
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight">
            Discover the Untouched Beauty of
            <span className="text-secondary"> Jharkhand</span>
          </h1>

          <div className="max-w-4xl mx-auto mb-8">
            <p className="text-lg md:text-xl lg:text-2xl mb-6 text-pretty leading-relaxed opacity-95">
              Journey through India's mineral-rich heartland where ancient
              tribal traditions meet pristine wilderness. Experience the harmony
              of 32 tribal communities, witness sacred festivals like Sarhul and
              Sohrai, and explore breathtaking waterfalls, dense forests, and
              spiritual temples.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-sm md:text-base">
              <div className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg py-3 px-4">
                <Leaf className="h-5 w-5 text-primary" />
                <span>Eco-Tourism Paradise</span>
              </div>
              <div className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg py-3 px-4">
                <Users className="h-5 w-5 text-secondary" />
                <span>Rich Tribal Heritage</span>
              </div>
              <div className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg py-3 px-4">
                <Mountain className="h-5 w-5 text-accent" />
                <span>Untouched Landscapes</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/places">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore Places
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/culture">
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-8 py-4"
              >
                Discover Culture
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

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Travelers Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover why visitors fall in love with Jharkhand through their
              authentic experiences and stories.
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {recentReviews.map((review, index) => (
              <ReviewCard
                key={index}
                name={review.name}
                rating={review.rating}
                feedback={review.feedback}
                date={review.date}
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
                  href="/culture"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Festivals & Culture
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
