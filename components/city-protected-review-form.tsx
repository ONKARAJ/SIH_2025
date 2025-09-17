"use client"

import React, { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  User, 
  Shield, 
  AlertCircle, 
  CheckCircle2,
  ExternalLink,
  LogIn,
  UserPlus,
  Star,
  Camera,
  Upload,
  X
} from "lucide-react"
import { checkProfileCompletion, getProfileCompletionMessage } from "@/lib/profile-utils"
import { toast } from "sonner"

interface CityProtectedReviewFormProps {
  cityId: string
  cityName: string
  onReviewSubmitted: () => void
}

export function CityProtectedReviewForm({ cityId, cityName, onReviewSubmitted }: CityProtectedReviewFormProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: '',
    images: [] as string[]
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hoveredRating, setHoveredRating] = useState(0)

  // Check if user is loading
  if (status === "loading") {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Share Your Experience</CardTitle>
        </CardHeader>
        <CardContent className="py-12">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
            <span className="text-gray-300">Loading...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Get profile completion status
  const profileStatus = checkProfileCompletion(session)
  const completionMessage = getProfileCompletionMessage(profileStatus)

  // If not authenticated, show sign-in prompt
  if (!session) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <Shield className="h-6 w-6 text-amber-400" />
            Sign In to Review {cityName}
          </CardTitle>
          <p className="text-gray-300">
            Share your experience and help fellow travelers discover what makes {cityName} special.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-amber-200 mb-1">
                  Why sign in to review?
                </h4>
                <ul className="text-sm text-amber-300 space-y-1">
                  <li>• Help other travelers with authentic experiences</li>
                  <li>• Maintain review quality and trustworthiness</li>
                  <li>• Build your travel profile and contributions</li>
                  <li>• Get notified when your reviews help others</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={() => router.push(`/auth/signin?callbackUrl=/cities/${cityId}`)}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button 
              variant="outline"
              onClick={() => router.push(`/auth/signup?callbackUrl=/cities/${cityId}`)}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Create Account
            </Button>
          </div>

          <p className="text-xs text-center text-gray-400">
            Join our community of travelers sharing authentic experiences.
          </p>
        </CardContent>
      </Card>
    )
  }

  // If profile is incomplete, show completion prompt
  if (!profileStatus.isComplete) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <User className="h-6 w-6 text-blue-400" />
            Complete Profile to Review {cityName}
          </CardTitle>
          <p className="text-gray-300">
            Please complete your profile to submit reviews and maintain our community standards.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-blue-200 mb-2">
                  Profile Completion Status
                </h4>
                
                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-blue-300">Progress</span>
                    <span className="text-blue-300 font-medium">
                      {profileStatus.completionPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-blue-800/50 rounded-full h-2">
                    <div 
                      className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${profileStatus.completionPercentage}%` }}
                    />
                  </div>
                </div>

                <p className="text-sm text-blue-300 mb-3">
                  {completionMessage}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {session.user.name ? (
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                    ) : (
                      <div className="h-4 w-4 border-2 border-gray-500 rounded" />
                    )}
                    <span className="text-sm text-blue-200">
                      Full name {session.user.name ? '✓' : '(missing)'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {session.user.phone ? (
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                    ) : (
                      <div className="h-4 w-4 border-2 border-gray-500 rounded" />
                    )}
                    <span className="text-sm text-blue-200">
                      Phone number {session.user.phone ? '✓' : '(missing)'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-green-400 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-green-200 mb-1">
                  Why we require complete profiles
                </h4>
                <ul className="text-sm text-green-300 space-y-1">
                  <li>• Ensures authentic and trustworthy reviews</li>
                  <li>• Helps prevent spam and fake reviews</li>
                  <li>• Enables better community engagement</li>
                  <li>• Required for account recovery and security</li>
                </ul>
              </div>
            </div>
          </div>

          <Button 
            onClick={() => router.push("/profile")}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Complete Profile
          </Button>

          <p className="text-xs text-center text-gray-400">
            This helps us maintain high-quality, authentic reviews for {cityName}.
          </p>
        </CardContent>
      </Card>
    )
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setReviewData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, 5) // Limit to 5 images
      }))
    }
  }

  const removeImage = (index: number) => {
    setReviewData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reviewData.comment.trim()) {
      toast.error("Please write a review comment")
      return
    }

    setIsSubmitting(true)

    try {
      const newReview = {
        id: Date.now().toString(),
        name: session.user.name || 'Anonymous',
        rating: reviewData.rating,
        comment: reviewData.comment.trim(),
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
        images: reviewData.images
      }

      // Get existing reviews from localStorage
      const storageKey = `city-reviews-${cityId}`
      const existingReviews = JSON.parse(localStorage.getItem(storageKey) || '[]')
      
      // Add new review
      const updatedReviews = [newReview, ...existingReviews]
      localStorage.setItem(storageKey, JSON.stringify(updatedReviews))

      // Show success message
      toast.success(`Thank you for reviewing ${cityName}!`)

      // Reset form
      setReviewData({
        rating: 5,
        comment: '',
        images: []
      })

      // Callback to parent to refresh reviews
      onReviewSubmitted()

    } catch (error) {
      toast.error("Failed to submit review. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // If everything is good, show the review form
  return (
    <div className="space-y-4">
      {/* Success badge */}
      <div className="flex items-center justify-center">
        <Badge className="bg-green-900/20 text-green-300 border-green-700/50">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Ready to review {cityName}
        </Badge>
      </div>
      
      {/* Review Form */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-xl">Share Your Experience in {cityName}</CardTitle>
          <p className="text-gray-300">Help others discover what makes this city special</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Info Display */}
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {session.user.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="text-white font-medium">{session.user.name}</p>
                  <p className="text-gray-400 text-sm">Posting as verified user</p>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Rating</label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="p-1 hover:scale-110 transition-transform"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setReviewData(prev => ({ ...prev, rating: star }))}
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= (hoveredRating || reviewData.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-500 hover:text-yellow-400"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-300">
                  {reviewData.rating} star{reviewData.rating !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* Comment */}
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-white mb-2">
                Your Review
              </label>
              <Textarea
                id="comment"
                value={reviewData.comment}
                onChange={(e) => setReviewData(prev => ({ ...prev, comment: e.target.value }))}
                placeholder={`Share your experience visiting ${cityName}...`}
                rows={4}
                required
                className="w-full resize-none bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Add Photos <span className="text-gray-400">(Optional - Max 5 photos)</span>
              </label>
              
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-blue-500/50 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                
                <div className="flex flex-col items-center space-y-2">
                  <div className="p-3 bg-gray-700 rounded-full">
                    <Camera className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      Add photos from your visit
                    </p>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, GIF up to 10MB each
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('image-upload')?.click()}
                    className="mt-2 border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Photos
                  </Button>
                </div>
              </div>

              {/* Image Preview */}
              {reviewData.images.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-white mb-3">
                    Selected Photos ({reviewData.images.length}/5)
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {reviewData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden bg-gray-700">
                          <img
                            src={image}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full shadow-sm hover:bg-red-700 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={!reviewData.comment.trim() || isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : `Submit Review for ${cityName}`}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}