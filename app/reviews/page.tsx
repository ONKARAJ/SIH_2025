"use client";

import { Navigation } from "@/components/navigation";
import { ReviewCard } from "@/components/review-card";
import { ProtectedReviewForm } from "@/components/protected-review-form";
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
import { useSession } from "next-auth/react";

export default function ReviewsPage() {
  const { data: session } = useSession()
  
  // Default reviews with 12 total reviews (3 with photos, 9 without photos)
  const defaultReviews = [
    // Reviews WITH photos (3 reviews)
    {
      id: "review-1",
      name: "Priya Sharma",
      userId: "user-1", // Add userId to track ownership
      rating: 5,
      feedback:
        "Absolutely breathtaking! The powerful cascade and surrounding greenery create a magical atmosphere. The 320-foot waterfall is truly spectacular and a must-visit destination in Jharkhand.",
      date: "2 weeks ago",
      location: "Hundru Falls",
      category: "Nature",
      spotImage: "/hundru-falls-waterfall-jharkhand-rocky-cliffs-fore.jpg",
      spotName: "Hundru Falls"
    },
    {
      id: "review-2",
      userId: "user-2",
      name: "Vikram Singh",
      rating: 5,
      feedback:
        "The sunrise view from Parasnath Hill is simply divine! At 4,431 feet, it's the highest peak in Jharkhand. The trek is challenging but absolutely worth it for the panoramic views and sacred Jain temples.",
      date: "1 week ago",
      location: "Parasnath Hill",
      category: "Adventure",
      spotImage: "/parasnath-hill-jharkhand-highest-peak-sunrise-panor.jpg",
      spotName: "Parasnath Hill"
    },
    {
      id: "review-3",
      userId: "user-3",
      name: "Meera Gupta",
      rating: 4,
      feedback:
        "Dassam Falls during monsoon is a sight to behold! The 144-foot waterfall creates a thunderous roar and misty atmosphere. Perfect for nature photography and peaceful meditation.",
      date: "3 weeks ago",
      location: "Dassam Falls",
      category: "Nature",
      spotImage: "/dassam-falls-jharkhand-monsoon-waterfall-mist-thund.jpg",
      spotName: "Dassam Falls"
    },
    // Reviews WITHOUT photos (9 reviews)
    {
      id: "review-4",
      userId: "user-4",
      name: "Rajesh Kumar",
      rating: 5,
      feedback:
        "Amazing wildlife experience! Spotted tigers, elephants, and various bird species in Betla National Park. The forest guides were incredibly knowledgeable about local wildlife and tribal traditions. A true gem for nature lovers.",
      date: "1 month ago",
      location: "Betla National Park",
      category: "Wildlife",
      spotName: "Betla National Park"
    },
    {
      id: "review-test-user",
      userId: "test@example.com", // Common test email
      name: "ONKAR Raj", // User from the screenshot
      rating: 5,
      feedback:
        "Testing the review system! This is a test review that can be deleted by the current user.",
      date: "Just now",
      location: "Jharkhand",
      category: "General",
      spotName: "Test Location"
    },
    {
      id: "review-5",
      userId: "user-5",
      name: "Anita Devi",
      rating: 5,
      feedback:
        "One of the most sacred Jyotirlinga temples in India. The spiritual energy at Baidyanath Dham and the devotion of pilgrims create an unforgettable divine experience. A must-visit for spiritual seekers.",
      date: "2 months ago",
      location: "Deoghar",
      category: "Spiritual",
      spotName: "Baidyanath Dham"
    },
    {
      id: "review-6",
      userId: "user-6",
      name: "Arjun Mahato",
      rating: 4,
      feedback:
        "Netarhat is truly the 'Queen of Chotanagpur'! The hill station offers cool climate, stunning sunsets, and lush green valleys. The tribal culture here is authentic and welcoming. Perfect for a peaceful retreat.",
      date: "6 weeks ago",
      location: "Netarhat",
      category: "Hill Station",
      spotName: "Netarhat Hill Station"
    },
    {
      id: "review-7",
      userId: "user-7",
      name: "Kavita Singh",
      rating: 5,
      feedback:
        "The Sohrai festival and traditional wall paintings were extraordinary. Staying in a tribal village and learning about their ancient art traditions was educational and heartwarming. The hospitality was exceptional.",
      date: "2 months ago",
      location: "Hazaribagh",
      category: "Culture",
      spotName: "Sohrai Festival"
    },
    {
      id: "review-8",
      userId: "user-8",
      name: "Deepak Verma",
      rating: 4,
      feedback:
        "Jonha Falls (Gautamdhara) is a hidden gem! The 43-meter waterfall surrounded by dense forest creates a serene atmosphere. The natural pool at the bottom is perfect for a refreshing dip.",
      date: "3 months ago",
      location: "Jonha Falls",
      category: "Nature",
      spotName: "Jonha Falls"
    },
    {
      id: "review-9",
      userId: "user-9",
      name: "Sunita Rani",
      rating: 5,
      feedback:
        "Jagannath Temple in Ranchi during Rath Yatra was an incredible spiritual experience. The festival celebrations, devotional atmosphere, and architectural beauty make it a must-visit destination.",
      date: "4 months ago",
      location: "Ranchi",
      category: "Spiritual",
      spotName: "Jagannath Temple"
    },
    {
      id: "review-10",
      userId: "user-10",
      name: "Manoj Kumar",
      rating: 4,
      feedback:
        "Dalma Wildlife Sanctuary offers great opportunities for wildlife spotting and trekking. Saw elephants, sloth bears, and various bird species. The natural beauty and biodiversity are remarkable.",
      date: "5 months ago",
      location: "Dalma Wildlife Sanctuary",
      category: "Wildlife",
      spotName: "Dalma Wildlife Sanctuary"
    },
    {
      id: "review-11",
      userId: "user-11",
      name: "Ravi Prakash",
      rating: 4,
      feedback:
        "Birsa Zoological Park is perfect for families! The variety of animals, well-maintained enclosures, and educational exhibits make it an enjoyable and informative experience. Kids will love the safari.",
      date: "7 weeks ago",
      location: "Ranchi",
      category: "Wildlife",
      spotName: "Birsa Zoological Park"
    },
    {
      id: "review-12",
      userId: "user-12",
      name: "Rohini Sharma",
      rating: 5,
      feedback:
        "Rock Garden in Ranchi is a masterpiece of creativity! The sculptures carved from rocks and the beautiful landscaping make it a perfect spot for family picnics and photography. A must-see attraction.",
      date: "5 days ago",
      location: "Ranchi",
      category: "Nature",
      spotName: "Rock Garden"
    },
    // Additional 10 reviews for more content
    {
      id: "review-13",
      userId: "user-13",
      name: "Amit Chakraborty",
      rating: 5,
      feedback:
        "Visited Tagore Hill during sunrise and it was absolutely magical! The panoramic view of Ranchi city from the top is breathtaking. The peaceful atmosphere and the memorial make it a perfect spot for meditation and photography.",
      date: "3 days ago",
      location: "Ranchi",
      category: "Nature",
      spotName: "Tagore Hill"
    },
    {
      id: "review-14",
      userId: "user-14", 
      name: "Sneha Pandey",
      rating: 4,
      feedback:
        "Rajrappa Temple is a unique blend of spirituality and natural beauty. The temple situated at the confluence of two rivers creates a serene atmosphere. The drive through the forests was equally enjoyable.",
      date: "1 week ago",
      location: "Ramgarh",
      category: "Spiritual",
      spotName: "Rajrappa Temple"
    },
    {
      id: "review-15",
      userId: "user-15",
      name: "Rahul Gupta",
      rating: 5,
      feedback:
        "Hazaribagh National Park exceeded my expectations! Spotted deer, wild boar, and various bird species. The safari experience was thrilling and our guide was very knowledgeable about the local wildlife and ecosystem.",
      date: "2 weeks ago",
      location: "Hazaribagh",
      category: "Wildlife",
      spotName: "Hazaribagh National Park"
    },
    {
      id: "review-16",
      userId: "user-16",
      name: "Priyanka Singh",
      rating: 4,
      feedback:
        "The tribal villages around Khunti offer an authentic cultural experience. The traditional Mundari houses, local crafts, and warm hospitality of the tribal people make it a memorable visit. Great for cultural enthusiasts.",
      date: "3 weeks ago",
      location: "Khunti",
      category: "Culture",
      spotName: "Mundari Tribal Villages"
    },
    {
      id: "review-17",
      userId: "user-17",
      name: "Vikash Kumar",
      rating: 5,
      feedback:
        "Lodh Falls during monsoon is simply spectacular! The 468-feet cascade creates a thunderous sound and misty atmosphere. Perfect for adventure seekers and nature photographers. Don't miss this hidden gem!",
      date: "1 month ago",
      location: "Latehar",
      category: "Adventure",
      spotImage: "/lodh-falls-jharkhand-monsoon-adventure.jpg",
      spotName: "Lodh Falls"
    },
    {
      id: "review-18",
      userId: "user-18",
      name: "Shalini Mishra",
      rating: 4,
      feedback:
        "Maithon Dam offers a perfect weekend getaway! The boating facility, beautiful gardens, and the vast reservoir create a refreshing environment. Great for families looking for a peaceful retreat near nature.",
      date: "10 days ago",
      location: "Dhanbad",
      category: "Nature",
      spotName: "Maithon Dam"
    },
    {
      id: "review-19",
      userId: "user-19",
      name: "Arjun Oraon",
      rating: 5,
      feedback:
        "As a local, I'm proud to share that the Sendra Festival in our village was amazing this year! The traditional Oraon dances, local music, and community feast showcase the rich cultural heritage of Jharkhand.",
      date: "5 days ago",
      location: "Gumla",
      category: "Culture",
      spotName: "Sendra Festival"
    },
    {
      id: "review-20",
      userId: "user-20",
      name: "Neha Jha",
      rating: 4,
      feedback:
        "Dimna Lake is perfect for evening walks and water sports. The peaceful environment, clean facilities, and beautiful sunset views make it an ideal spot for couples and families. Boating here was really enjoyable.",
      date: "4 days ago",
      location: "Jamshedpur",
      category: "Nature",
      spotName: "Dimna Lake"
    },
    {
      id: "review-21",
      userId: "user-21",
      name: "Santosh Mahto",
      rating: 5,
      feedback:
        "Patratu Valley offers breathtaking views especially during winter mornings! The misty hills, peaceful lake, and cool weather create a perfect hill station experience. Great for photography and nature walks.",
      date: "6 days ago",
      location: "Ramgarh",
      category: "Hill Station",
      spotImage: "/patratu-valley-jharkhand-misty-hills.jpg",
      spotName: "Patratu Valley"
    },
    {
      id: "review-22",
      userId: "user-22",
      name: "Ritu Sharma",
      rating: 4,
      feedback:
        "Jubilee Park in Jamshedpur is beautifully maintained! The rose gardens, musical fountain, and children's play area make it perfect for family outings. Evening shows and cultural programs add to the charm.",
      date: "1 week ago",
      location: "Jamshedpur",
      category: "Nature",
      spotName: "Jubilee Park"
    }
  ];
  
  const [reviews, setReviews] = useState(defaultReviews);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Initialize with default reviews and save to localStorage if not exists
  useEffect(() => {
    const savedReviews = localStorage.getItem("jharkhand-reviews");
    
    // Check if we need to update with new default reviews
    const shouldUpdate = !savedReviews || 
      (savedReviews && JSON.parse(savedReviews).length < defaultReviews.length);
    
    if (shouldUpdate) {
      console.log('Updating reviews with new default data');
      localStorage.setItem("jharkhand-reviews", JSON.stringify(defaultReviews));
      setReviews(defaultReviews);
    } else {
      // Load saved reviews from localStorage
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

  const handleNewReview = (newReview: {
    name: string;
    rating: number;
    feedback: string;
    photos?: string[];
    videos?: string[];
  }) => {
    const reviewWithDetails = {
      ...newReview,
      id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: session?.user?.id || session?.user?.email || 'anonymous',
      date: "Just now",
      location: "Jharkhand",
      category: "General",
      spotVideo: newReview.videos?.[0], // Use first video if available
      spotImage: newReview.photos?.[0], // Use first photo if available
      spotName: "Jharkhand Experience"
    };
    const updatedReviews = [reviewWithDetails, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem("jharkhand-reviews", JSON.stringify(updatedReviews));
  };

  const handleDeleteReview = (reviewId: string) => {
    console.log('Attempting to delete review with ID:', reviewId);
    console.log('Current reviews before deletion:', reviews.map(r => ({ id: r.id, name: r.name })));
    
    if (!reviewId) {
      console.error('No review ID provided for deletion');
      return;
    }
    
    const updatedReviews = reviews.filter(review => {
      const keepReview = review.id !== reviewId;
      if (!keepReview) {
        console.log('Deleting review:', { id: review.id, name: review.name });
      }
      return keepReview;
    });
    
    console.log('Updated reviews after deletion:', updatedReviews.map(r => ({ id: r.id, name: r.name })));
    console.log(`Reviews count: ${reviews.length} -> ${updatedReviews.length}`);
    
    setReviews(updatedReviews);
    localStorage.setItem("jharkhand-reviews", JSON.stringify(updatedReviews));
  };
  
  // Function to reset reviews to default (for debugging)
  const resetReviewsToDefault = () => {
    console.log('Resetting reviews to default');
    setReviews(defaultReviews);
    localStorage.setItem("jharkhand-reviews", JSON.stringify(defaultReviews));
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
            
            {/* Load New Reviews Button */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800 mb-2">
                📋 <strong>New reviews added!</strong> Click below to load all 22 reviews (including 10 new ones)
              </p>
              <Button 
                onClick={() => {
                  localStorage.removeItem("jharkhand-reviews");
                  resetReviewsToDefault();
                  window.location.reload();
                }}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                🔄 Load All 22 Reviews (Click Me!)
              </Button>
            </div>
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
                {filteredReviews.map((review, index) => {
                  const canDelete = session?.user && (
                    review.userId === session.user.id || 
                    review.userId === session.user.email ||
                    review.name === session.user.name
                  );
                  
                  return (
                  <div key={review.id || index}>
                    <ReviewCard
                      name={review.name}
                      rating={review.rating}
                      feedback={review.feedback}
                      date={review.date}
                      spotImage={review.spotImage}
                      spotVideo={review.spotVideo}
                      spotName={review.spotName}
                      location={review.location}
                      canDelete={canDelete}
                      onDelete={() => {
                        console.log('ReviewCard onDelete called for review:', review.id, review.name);
                        if (review.id) {
                          handleDeleteReview(review.id);
                        } else {
                          console.error('Review has no ID, cannot delete:', review);
                        }
                      }}
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
                  );
                })}
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

              {/* Protected Review Form */}
              <div className="mt-12">
                <ProtectedReviewForm onSubmit={handleNewReview} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
