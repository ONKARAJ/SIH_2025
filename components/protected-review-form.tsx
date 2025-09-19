"use client"

import React, { useState } from "react"
import { useUser } from "@clerk/nextjs"
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

interface ProtectedReviewFormProps {
  onSubmit: (review: { name: string; rating: number; feedback: string; photos?: string[]; videos?: string[] }) => void
}

export function ProtectedReviewForm({ onSubmit }: ProtectedReviewFormProps) {
  const { user, isSignedIn, isLoaded } = useUser()
  const router = useRouter()

  // Check if Clerk is still loading
  if (!isLoaded) {
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

  // If not authenticated, show sign-in prompt
  if (!isSignedIn) {
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
              onClick={() => router.push("/sign-in?redirect_url=/reviews")}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button 
              variant="outline"
              onClick={() => router.push("/sign-up?redirect_url=/reviews")}
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

  // User is signed in with Clerk - show the review form
  return (
    <div className="space-y-4">
      {/* Success badge */}
      <div className="flex items-center justify-center">
        <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Signed in with Clerk - Ready to submit reviews
        </Badge>
      </div>
      
      {/* Enhanced review form with Clerk user info */}
      <ReviewForm 
        onSubmit={(review) => {
          // Add user info from Clerk
          const enhancedReview = {
            ...review,
            name: user?.fullName || user?.firstName || review.name // Use Clerk name if available
          }
          onSubmit(enhancedReview)
        }} 
        defaultName={user?.fullName || user?.firstName || ""}
        disabled={false}
      />
    </div>
  )
}