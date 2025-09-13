"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"

interface ReviewFormProps {
  onSubmit: (review: { name: string; rating: number; feedback: string }) => void
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [name, setName] = useState("")
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !feedback.trim() || rating === 0) return

    setIsSubmitting(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    onSubmit({ name: name.trim(), rating, feedback: feedback.trim() })

    // Reset form
    setName("")
    setRating(0)
    setFeedback("")
    setIsSubmitting(false)
  }

  return (
    <Card className="border-border bg-background">
      <CardHeader>
        <CardTitle className="text-2xl text-foreground">Share Your Experience</CardTitle>
        <p className="text-muted-foreground">Help others discover the beauty of Jharkhand</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Your Name
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Rating</label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1 hover:scale-110 transition-transform"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= (hoveredRating || rating)
                        ? "fill-secondary text-secondary"
                        : "text-muted-foreground hover:text-secondary"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {rating > 0 && `${rating} star${rating !== 1 ? "s" : ""}`}
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-foreground mb-2">
              Your Review
            </label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your experience visiting Jharkhand..."
              rows={4}
              required
              className="w-full resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={!name.trim() || !feedback.trim() || rating === 0 || isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-white disabled:bg-muted disabled:text-muted-foreground"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
