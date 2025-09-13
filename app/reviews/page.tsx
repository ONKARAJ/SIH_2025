"use client";

import { Navigation } from "@/components/navigation";
import { ReviewCard } from "@/components/review-card";
import { ReviewForm } from "@/components/review-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Star,
  Search,
  Filter,
  TrendingUp,
  Users,
  MessageSquare,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([
    {
      name: "Priya Sharma",
      rating: 5,
      feedback:
        "Absolutely breathtaking! The Hundru Falls were spectacular, and the tribal culture experience was authentic and enriching. The local guides were incredibly knowledgeable about the history and traditions. Jharkhand exceeded all my expectations and I'm already planning my next visit.",
      date: "2 weeks ago",
      location: "Hundru Falls",
      category: "Nature",
    },
    {
      name: "Rajesh Kumar",
      rating: 4,
      feedback:
        "Great experience visiting Betla National Park. Saw tigers and elephants in their natural habitat. The safari was well-organized and the local guides were very knowledgeable about the wildlife. The accommodation was comfortable and the food was delicious.",
      date: "1 month ago",
      location: "Betla National Park",
      category: "Wildlife",
    },
    {
      name: "Anita Devi",
      rating: 5,
      feedback:
        "The Sarhul festival was a once-in-a-lifetime experience. The connection between the tribal communities and nature is truly inspiring. The traditional dances, music, and rituals were mesmerizing. Highly recommend visiting during festival season.",
      date: "2 months ago",
      location: "Ranchi",
      category: "Culture",
    },
    {
      name: "Vikram Singh",
      rating: 4,
      feedback:
        "Netarhat hill station was perfect for a peaceful getaway. The sunrise views were incredible, and the cool climate was a welcome relief from the city heat. The colonial architecture and pine forests create a magical atmosphere.",
      date: "3 months ago",
      location: "Netarhat",
      category: "Hill Station",
    },
    {
      name: "Meera Patel",
      rating: 5,
      feedback:
        "Visited Deoghar during Shravan month - what an incredible spiritual experience! The Baidyanath Temple is magnificent and the devotion of pilgrims is deeply moving. The town has excellent facilities for visitors.",
      date: "3 months ago",
      location: "Deoghar",
      category: "Spiritual",
    },
    {
      name: "Arjun Reddy",
      rating: 4,
      feedback:
        "Dassam Falls during monsoon was absolutely stunning. The power of the water and the lush green surroundings create a perfect natural setting. Great for photography and nature lovers.",
      date: "4 months ago",
      location: "Dassam Falls",
      category: "Nature",
    },
    {
      name: "Kavita Joshi",
      rating: 5,
      feedback:
        "The Sohrai festival and wall paintings were extraordinary. Staying in a tribal village and learning about their art traditions was educational and heartwarming. The hospitality was exceptional.",
      date: "5 months ago",
      location: "Hazaribagh",
      category: "Culture",
    },
    {
      name: "Rohit Gupta",
      rating: 4,
      feedback:
        "Parasnath Hill trek was challenging but rewarding. The Jain temples at the summit are beautiful and the panoramic views are worth the effort. Well-maintained trails and good facilities.",
      date: "6 months ago",
      location: "Parasnath Hill",
      category: "Adventure",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const savedReviews = localStorage.getItem("jharkhand-reviews");
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

  const handleNewReview = (newReview: {
    name: string;
    rating: number;
    feedback: string;
  }) => {
    const reviewWithDetails = {
      ...newReview,
      date: "Just now",
      location: "Jharkhand",
      category: "General",
    };
    const updatedReviews = [reviewWithDetails, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem("jharkhand-reviews", JSON.stringify(updatedReviews));
  };

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter((review) => {
      const matchesSearch =
        review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.feedback.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRating =
        selectedRating === "all" || review.rating.toString() === selectedRating;
      const matchesCategory =
        selectedCategory === "all" || review.category === selectedCategory;
      return matchesSearch && matchesRating && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return 0; // Keep original order (newest first)
      if (sortBy === "oldest") return 1;
      if (sortBy === "highest") return b.rating - a.rating;
      if (sortBy === "lowest") return a.rating - b.rating;
      return 0;
    });

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage:
      reviews.length > 0
        ? (reviews.filter((r) => r.rating === rating).length / reviews.length) *
          100
        : 0,
  }));

  const categories = [
    "all",
    "Nature",
    "Wildlife",
    "Culture",
    "Spiritual",
    "Hill Station",
    "Adventure",
    "General",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-card-foreground mb-6">
              Traveler Reviews
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover why visitors fall in love with Jharkhand through their
              authentic experiences and stories. Read genuine reviews from
              fellow travelers and share your own journey.
            </p>
          </div>

          {/* Review Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="border-border bg-background text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-8 w-8 text-secondary fill-secondary" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-1">
                  {averageRating}
                </h3>
                <p className="text-muted-foreground">Average Rating</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-background text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-2">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-1">
                  {reviews.length}
                </h3>
                <p className="text-muted-foreground">Total Reviews</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-background text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-1">
                  {Math.round(
                    ratingDistribution.find((r) => r.rating === 5)
                      ?.percentage || 0
                  )}
                  %
                </h3>
                <p className="text-muted-foreground">5-Star Reviews</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-background text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-1">98%</h3>
                <p className="text-muted-foreground">Recommend Rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Rating Distribution */}
          <Card className="border-border bg-background mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Rating Distribution
              </h3>
              <div className="space-y-2">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 w-16">
                      <span className="text-sm font-medium">{rating}</span>
                      <Star className="h-3 w-3 fill-secondary text-secondary" />
                    </div>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className="bg-secondary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-12">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Card className="border-border bg-card sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">
                    Filter Reviews
                  </h3>

                  {/* Search */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Search
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        type="text"
                        placeholder="Search reviews..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Rating
                    </label>
                    <Select
                      value={selectedRating}
                      onValueChange={setSelectedRating}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All ratings" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Ratings</SelectItem>
                        <SelectItem value="5">5 Stars</SelectItem>
                        <SelectItem value="4">4 Stars</SelectItem>
                        <SelectItem value="3">3 Stars</SelectItem>
                        <SelectItem value="2">2 Stars</SelectItem>
                        <SelectItem value="1">1 Star</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Category Filter */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Category
                    </label>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All categories" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category === "all" ? "All Categories" : category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sort By */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Sort By
                    </label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="highest">Highest Rating</SelectItem>
                        <SelectItem value="lowest">Lowest Rating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedRating("all");
                      setSelectedCategory("all");
                      setSortBy("newest");
                    }}
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Reviews Content */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  Reviews ({filteredReviews.length})
                </h2>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Showing {filteredReviews.length} of {reviews.length} reviews
                  </span>
                </div>
              </div>

              {/* Reviews Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {filteredReviews.map((review, index) => (
                  <div key={index}>
                    <ReviewCard
                      name={review.name}
                      rating={review.rating}
                      feedback={review.feedback}
                      date={review.date}
                    />
                    <div className="flex items-center space-x-2 mt-2 ml-6">
                      <Badge variant="outline" className="text-xs">
                        {review.location}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {review.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              {filteredReviews.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg mb-4">
                    No reviews found matching your criteria.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedRating("all");
                      setSelectedCategory("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}

              {/* Review Form */}
              <div className="mt-12">
                <ReviewForm onSubmit={handleNewReview} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
