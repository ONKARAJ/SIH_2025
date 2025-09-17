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
  Bell,
  X,
  ExternalLink,
  AlertCircle,
  Info,
  Clock
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ReviewCard } from "@/components/review-card";

// Notice board data
const noticesData = [
  {
    id: 1,
    type: 'important',
    title: 'Special Monsoon Festival - Sohrai 2025',
    description: 'Experience the vibrant Sohrai festival celebrating the harvest season with traditional tribal art, cultural performances, and authentic cuisine.',
    date: '2025-01-15',
    location: 'Hazaribagh District',
    details: 'The Sohrai festival is one of the most significant tribal festivals in Jharkhand, celebrated with great enthusiasm across rural areas. This year\'s celebration will feature traditional wall paintings, folk dances, music performances, and a special exhibition of tribal handicrafts. Visitors can participate in art workshops, taste authentic Sohrai delicacies, and witness the beautiful Kohbar and Sohrai wall art created by local women artists. The festival promotes women empowerment and preserves ancient artistic traditions.',
    status: 'active'
  },
  {
    id: 2,
    type: 'info',
    title: 'New Adventure Trail Opens at Netarhat',
    description: 'Explore the newly inaugurated eco-friendly trekking trail at Netarhat Hill Station with guided tours and camping facilities.',
    date: '2024-12-20',
    location: 'Netarhat, Latehar District',
    details: 'The Netarhat Adventure Trail spans 15 kilometers through pristine forests, offering breathtaking views of sunrise and sunset points. The trail includes rest stations, eco-friendly camping sites, and guided tours by local tribal guides who share knowledge about local flora, fauna, and tribal traditions. Safety equipment and first aid facilities are available at all checkpoints. The trail is suitable for beginners to intermediate trekkers and promotes sustainable tourism practices.',
    status: 'active'
  },
  {
    id: 3,
    type: 'alert',
    title: 'Seasonal Closure: Hundru Falls Area',
    description: 'Hundru Falls viewing area will be temporarily closed for safety maintenance and infrastructure upgrades from January 10-25, 2025.',
    date: '2025-01-10',
    location: 'Hundru Falls, Ranchi',
    details: 'The popular Hundru Falls tourist area will undergo essential safety maintenance including pathway repairs, railing installations, and visitor facility upgrades. Alternative viewing points at Dassam Falls and Jonha Falls remain open for visitors. The closure ensures enhanced safety measures and improved visitor experience. Upon reopening, the area will feature new viewing decks, improved accessibility, and enhanced safety protocols. We apologize for any inconvenience and appreciate your understanding.',
    status: 'active'
  }
];

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
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

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

  const openNoticeModal = (notice: any) => {
    setSelectedNotice(notice);
    setIsNoticeModalOpen(true);
  };

  const closeNoticeModal = () => {
    setIsNoticeModalOpen(false);
    setSelectedNotice(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Enhanced Hero Section with Cinematic Background Video */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video with Enhanced Overlays */}
        <div className="absolute inset-0">
          <video 
            className="w-full h-full object-cover scale-105 transition-transform duration-1000"
            autoPlay 
            muted 
            loop 
            playsInline
            poster="/images/home-hero-poster.jpg"
            onError={(e) => {
              // Hide video if it fails to load, fallback to background image
              e.currentTarget.style.display = 'none';
            }}
          >
            <source src="/videos/home-background.mp4" type="video/mp4" />
            <source src="/videos/home-background.webm" type="video/webm" />
          </video>
          
          {/* Multiple Overlay Layers for Cinematic Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
          
          {/* Animated Particles Effect */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-orange-300 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-green-300 rounded-full animate-ping" style={{animationDelay: '4s'}}></div>
            <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{animationDelay: '6s'}}></div>
          </div>
          
          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M20 20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8zm0-20v20c0-4.4-3.6-8-8-8s-8 3.6-8 8v-20h16zm0 0'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Interactive Hero Content with Enhanced Animations */}
        <div className="relative z-20 text-center text-white max-w-7xl mx-auto px-4">
          {/* Notice Board - Positioned to the side */}
          <div className="hidden md:block fixed top-1/2 right-8 transform -translate-y-1/2 z-30 animate-in fade-in slide-in-from-right-4 duration-1000 delay-500">
            <button
              onClick={() => openNoticeModal(noticesData[0])}
              className="group bg-gradient-to-br from-orange-600 to-red-600 backdrop-blur-md border-2 border-orange-400 shadow-orange-500/50 rounded-2xl p-4 hover:from-orange-700 hover:to-red-700 hover:scale-110 hover:shadow-orange-500/70 transition-all duration-300 shadow-2xl"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="relative">
                  <Bell className="h-6 w-6 text-white group-hover:text-yellow-200 transition-colors duration-300 drop-shadow-md" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-xs text-black font-bold">{noticesData.length}</span>
                  </div>
                </div>
                <span className="text-xs text-white group-hover:text-yellow-200 font-semibold transition-colors duration-300 drop-shadow-md">
                  Notice
                  <br />
                  Board
                </span>
              </div>
            </button>
          </div>

          {/* Main Heading with Text Effects */}
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-balance leading-[0.9] tracking-tight">
              <span className="block bg-gradient-to-r from-white via-white to-gray-100 bg-clip-text text-transparent drop-shadow-2xl">
                Discover the
              </span>
              <span className="block bg-gradient-to-r from-orange-300 via-orange-400 to-red-400 bg-clip-text text-transparent mt-2 drop-shadow-2xl">
                Untouched Beauty
              </span>
              <span className="block text-white/90 text-4xl md:text-5xl lg:text-6xl mt-3 font-light drop-shadow-2xl">
                of Jharkhand
              </span>
            </h1>
          </div>

          {/* Enhanced Description */}
          <div className="max-w-5xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-700">
            <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-white/95 drop-shadow-lg mb-8">
              Journey through India's mineral-rich heartland where ancient
              tribal traditions meet pristine wilderness.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    <Leaf className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Eco-Tourism Paradise</h3>
                <p className="text-sm text-white/80">32 tribal communities in harmony with nature</p>
              </div>
              
              <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Rich Tribal Heritage</h3>
                <p className="text-sm text-white/80">Sacred festivals and ancient traditions</p>
              </div>
              
              <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    <Mountain className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Untouched Landscapes</h3>
                <p className="text-sm text-white/80">Pristine waterfalls and dense forests</p>
              </div>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1000">
            <Link href="/places">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-xl px-12 py-6 shadow-2xl hover:shadow-orange-500/25 border-0 rounded-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
              >
                <span className="mr-3">Explore Places</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            
            <Link href="/festivals">
              <Button
                variant="outline"
                size="lg"
                className="group bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 text-xl px-12 py-6 rounded-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-white/10"
              >
                <span className="mr-3">Discover Culture</span>
                <Calendar className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
              </Button>
            </Link>
          </div>

          {/* Enhanced Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-in fade-in duration-1000 delay-1200">
            <div className="flex flex-col items-center space-y-2 cursor-pointer group" onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}>
              <span className="text-white/60 text-sm font-medium group-hover:text-white transition-colors duration-300">Explore More</span>
              <div className="w-6 h-12 border-2 border-white/40 group-hover:border-white/60 rounded-full flex justify-center transition-all duration-300">
                <div className="w-1.5 h-4 bg-white/60 group-hover:bg-white rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Corner Decorative Elements */}
        <div className="absolute top-8 left-8 w-24 h-24 border border-white/20 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-8 right-8 w-32 h-32 border border-orange-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-12 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rounded-full animate-float"></div>
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
      
      {/* Notice Modal */}
      {isNoticeModalOpen && selectedNotice && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeNoticeModal}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[70vh] overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedNotice.type === 'important' ? 'bg-orange-500' :
                      selectedNotice.type === 'alert' ? 'bg-red-500' :
                      'bg-blue-500'
                    }`}>
                      {selectedNotice.type === 'important' ? <AlertCircle className="h-5 w-5" /> :
                       selectedNotice.type === 'alert' ? <AlertCircle className="h-5 w-5" /> :
                       <Info className="h-5 w-5" />}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedNotice.title}</h2>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-white/80">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{new Date(selectedNotice.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{selectedNotice.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeNoticeModal}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[50vh]">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{selectedNotice.description}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Details</h3>
                <p className="text-gray-600 leading-relaxed">{selectedNotice.details}</p>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedNotice.type === 'important' ? 'bg-orange-100 text-orange-700' :
                  selectedNotice.type === 'alert' ? 'bg-red-100 text-red-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {selectedNotice.type.toUpperCase()}
                </span>
                <span className="text-xs text-gray-500">Status: {selectedNotice.status}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    const currentIndex = noticesData.findIndex(n => n.id === selectedNotice.id);
                    const nextIndex = (currentIndex + 1) % noticesData.length;
                    setSelectedNotice(noticesData[nextIndex]);
                  }}
                >
                  Next Notice
                </Button>
                <Button onClick={closeNoticeModal}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
