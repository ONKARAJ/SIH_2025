"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Star, 
  MessageSquare, 
  User, 
  ThumbsUp, 
  Calendar, 
  MoreHorizontal,
  Edit3,
  UserCircle
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Review {
  id?: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  helpful?: number;
  avatar?: string;
  verified?: boolean;
}

interface PlaceReviewsProps {
  placeId: string;
  placeName: string;
  existingReviews: Review[];
  averageRating: number;
  onReviewSubmit?: (review: Omit<Review, 'id' | 'date'>) => void;
}

export default function PlaceReviews({ 
  placeId, 
  placeName, 
  existingReviews, 
  averageRating,
  onReviewSubmit 
}: PlaceReviewsProps) {
  const { data: session, status } = useSession();
  const [reviews, setReviews] = useState<Review[]>(existingReviews);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWriteReview, setShowWriteReview] = useState(false);

  // Update reviews when prop changes
  useEffect(() => {
    setReviews(existingReviews);
  }, [existingReviews]);

  const handleStarClick = (rating: number) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  const handleSubmitReview = async () => {
    if (!session) return;
    
    if (newReview.rating === 0 || newReview.comment.trim() === '') {
      alert('Please provide a rating and comment');
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData = {
        name: session.user?.name || 'Anonymous User',
        rating: newReview.rating,
        comment: newReview.comment.trim(),
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        helpful: 0,
        verified: true
      };

      // Add to local state immediately
      setReviews(prev => [reviewData, ...prev]);
      
      // Call parent callback if provided
      if (onReviewSubmit) {
        onReviewSubmit(reviewData);
      }

      // Reset form
      setNewReview({ rating: 0, comment: '' });
      setShowWriteReview(false);

      // Here you would normally make an API call to save the review
      console.log('Review submitted for place:', placeId, reviewData);

    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive = false, size = 'w-4 h-4') => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`${size} cursor-${interactive ? 'pointer' : 'default'} transition-colors ${
          index < rating
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300'
        }`}
        onClick={interactive ? () => handleStarClick(index + 1) : undefined}
      />
    ));
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      if (distribution[review.rating as keyof typeof distribution] !== undefined) {
        distribution[review.rating as keyof typeof distribution]++;
      }
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();
  const totalReviews = reviews.length;

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Guest Reviews</h2>
            <p className="text-gray-600">See what travelers say about {placeName}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {totalReviews > 0 ? averageRating.toFixed(1) : 'N/A'}
            </div>
            <div className="flex items-center gap-1 mb-1">
              {renderStars(Math.round(averageRating))}
            </div>
            <p className="text-sm text-gray-500">{totalReviews} reviews</p>
          </div>
        </div>

        {/* Rating Distribution */}
        {totalReviews > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {Object.entries(ratingDistribution).reverse().map(([rating, count]) => (
              <div key={rating} className="bg-white/70 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">{rating}</span>
                </div>
                <div className="text-lg font-bold text-gray-900">{count}</div>
                <div className="text-xs text-gray-500">
                  {totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0}%
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Write Review Section */}
      <Card className="border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors">
        <CardContent className="p-6">
          {status === 'loading' ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading...</p>
            </div>
          ) : !session ? (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Share Your Experience</h3>
              <p className="text-gray-600 mb-4">Help other travelers by sharing your experience</p>
              <div className="space-y-3">
                <Link href="/sign-in">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                    Sign In to Add Review
                  </Button>
                </Link>
                <p className="text-sm text-gray-500">
                  Don't have an account? <Link href="/sign-up" className="text-blue-600 hover:underline">Sign up here</Link>
                </p>
              </div>
            </div>
          ) : !showWriteReview ? (
            <div className="text-center py-6">
              <UserCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Hi, {session.user?.name || 'Traveler'}!
              </h3>
              <p className="text-gray-600 mb-4">Ready to share your experience at {placeName}?</p>
              <Button
                onClick={() => setShowWriteReview(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Write a Review
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Write Your Review</h3>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShowWriteReview(false);
                    setNewReview({ rating: 0, comment: '' });
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </Button>
              </div>

              {/* Rating Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Rating *
                </label>
                <div className="flex items-center gap-1">
                  {renderStars(newReview.rating, true, 'w-6 h-6')}
                  <span className="ml-2 text-sm text-gray-600">
                    {newReview.rating > 0 ? `${newReview.rating} star${newReview.rating > 1 ? 's' : ''}` : 'Select rating'}
                  </span>
                </div>
              </div>

              {/* Comment Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review *
                </label>
                <Textarea
                  placeholder="Share your experience... What did you like most? Any tips for other travelers?"
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  className="min-h-[100px] resize-none"
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-500">
                    Be specific and helpful to other travelers
                  </p>
                  <p className="text-xs text-gray-500">
                    {newReview.comment.length}/500
                  </p>
                </div>
              </div>

              <Button
                onClick={handleSubmitReview}
                disabled={isSubmitting || newReview.rating === 0 || newReview.comment.trim() === ''}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Review'
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* Reviews List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">
            All Reviews ({totalReviews})
          </h3>
          {totalReviews > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {averageRating.toFixed(1)} ★ Average
              </Badge>
            </div>
          )}
        </div>

        {totalReviews === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
            <p className="text-gray-600 max-w-sm mx-auto">
              Be the first to share your experience and help other travelers discover this amazing place!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <Card key={index} className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {review.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900">{review.name}</h4>
                          {review.verified && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {review.comment}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      Helpful {review.helpful ? `(${review.helpful})` : ''}
                    </Button>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {review.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}