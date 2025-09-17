"use client"

import React, { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ReviewForm } from "@/components/review-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  Shield, 
  AlertCircle, 
  CheckCircle2,
  ExternalLink,
  LogIn,
  UserPlus
} from "lucide-react"
import { checkProfileCompletion, getProfileCompletionMessage } from "@/lib/profile-utils"

interface ProtectedReviewFormProps {
  onSubmit: (review: { name: string; rating: number; feedback: string; photos?: string[]; videos?: string[] }) => void
}

export function ProtectedReviewForm({ onSubmit }: ProtectedReviewFormProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [showProfileDialog, setShowProfileDialog] = useState(false)

  // Check if user is loading
  if (status === "loading") {
    return (
      <Card className="border-border bg-background">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground">Share Your Experience</CardTitle>
        </CardHeader>
        <CardContent className="py-12">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="text-muted-foreground">Loading...</span>
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
      <Card className="border-border bg-background">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground flex items-center gap-3">
            <Shield className="h-7 w-7 text-amber-500" />
            Sign In Required
          </CardTitle>
          <p className="text-muted-foreground">
            Please sign in to share your experience and help other travelers discover Jharkhand's beauty.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-1">
                  Why sign in?
                </h4>
                <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                  <li>• Verify your identity as a real traveler</li>
                  <li>• Help maintain review quality and trustworthiness</li>
                  <li>• Track your contributions and build your travel profile</li>
                  <li>• Get notified when others find your reviews helpful</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={() => router.push("/auth/signin?callbackUrl=/reviews")}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button 
              variant="outline"
              onClick={() => router.push("/auth/signup?callbackUrl=/reviews")}
              className="flex-1"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Create Account
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            By signing in, you agree to our terms of service and privacy policy.
          </p>
        </CardContent>
      </Card>
    )
  }

  // If profile is incomplete, show completion prompt
  if (!profileStatus.isComplete) {
    return (
      <Card className="border-border bg-background">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground flex items-center gap-3">
            <User className="h-7 w-7 text-blue-500" />
            Complete Your Profile
          </CardTitle>
          <p className="text-muted-foreground">
            Please complete your profile to submit reviews and help maintain our community standards.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                  Profile Completion Status
                </h4>
                
                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-blue-700 dark:text-blue-300">Progress</span>
                    <span className="text-blue-700 dark:text-blue-300 font-medium">
                      {profileStatus.completionPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-blue-100 dark:bg-blue-800 rounded-full h-2">
                    <div 
                      className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${profileStatus.completionPercentage}%` }}
                    />
                  </div>
                </div>

                <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                  {completionMessage}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {session.user.name ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <div className="h-4 w-4 border-2 border-gray-400 rounded" />
                    )}
                    <span className="text-sm text-blue-800 dark:text-blue-200">
                      Full name {session.user.name ? '✓' : '(missing)'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {session.user.phone ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <div className="h-4 w-4 border-2 border-gray-400 rounded" />
                    )}
                    <span className="text-sm text-blue-800 dark:text-blue-200">
                      Phone number {session.user.phone ? '✓' : '(missing)'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
                  Why we require complete profiles
                </h4>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
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
            className="w-full bg-primary hover:bg-primary/90"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Complete Profile
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            This will only take a minute and helps maintain our community quality.
          </p>
        </CardContent>
      </Card>
    )
  }

  // If everything is good, show the review form
  return (
    <div className="space-y-4">
      {/* Success badge */}
      <div className="flex items-center justify-center">
        <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Profile verified - Ready to submit reviews
        </Badge>
      </div>
      
      {/* Enhanced review form with user info */}
      <ReviewForm 
        onSubmit={(review) => {
          // Add user info from session
          const enhancedReview = {
            ...review,
            name: session.user.name || review.name // Use session name if available
          }
          onSubmit(enhancedReview)
        }} 
        defaultName={session.user.name || ""}
        disabled={false}
      />
    </div>
  )
}