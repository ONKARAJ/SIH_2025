"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star, Camera, X, Upload, Image as ImageIcon, Video, Play } from "lucide-react"

interface ReviewFormProps {
  onSubmit: (review: { name: string; rating: number; feedback: string; photos?: string[]; videos?: string[] }) => void
  defaultName?: string
  disabled?: boolean
}

export function ReviewForm({ onSubmit, defaultName = "", disabled = false }: ReviewFormProps) {
  const [name, setName] = useState(defaultName)
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [photos, setPhotos] = useState<string[]>([])
  const [videos, setVideos] = useState<string[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isDraggingVideo, setIsDraggingVideo] = useState(false)
  const [isUploadingPhotos, setIsUploadingPhotos] = useState(false)
  const [isUploadingVideos, setIsUploadingVideos] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelection = async (files: FileList | null) => {
    if (!files) return
    
    const maxPhotos = 5 // Limit to 5 photos
    const remainingSlots = maxPhotos - photos.length
    const filesToProcess = Math.min(files.length, remainingSlots)
    
    if (filesToProcess === 0) {
      alert(`Maximum ${maxPhotos} photos allowed. Please remove some photos first.`)
      return
    }
    
    setIsUploadingPhotos(true)
    const newPhotos: string[] = []
    
    try {
      for (let i = 0; i < filesToProcess; i++) {
        const file = files[i]
        if (file && file.type.startsWith('image/')) {
          // Check file size (limit to 10MB)
          if (file.size > 10 * 1024 * 1024) {
            alert(`File ${file.name} is too large. Please use images smaller than 10MB.`)
            continue
          }
          
          // Convert file to base64
          const base64 = await fileToBase64(file)
          if (base64) {
            newPhotos.push(base64)
          }
        } else {
          alert(`File ${files[i]?.name || 'unknown'} is not a valid image format.`)
        }
      }
      
      if (newPhotos.length > 0) {
        setPhotos(prev => [...prev, ...newPhotos])
      }
    } catch (error) {
      console.error('Error processing files:', error)
      alert('Error uploading photos. Please try again.')
    } finally {
      setIsUploadingPhotos(false)
    }
  }
  
  const fileToBase64 = (file: File): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result as string)
      }
      reader.onerror = () => {
        console.error('Error reading file:', file.name)
        reject(new Error('Failed to read file'))
      }
      reader.readAsDataURL(file)
    })
  }

  const handleVideoSelection = async (files: FileList | null) => {
    if (!files) return
    
    const maxVideos = 2 // Limit to 2 videos
    const remainingSlots = maxVideos - videos.length
    const filesToProcess = Math.min(files.length, remainingSlots)
    
    if (filesToProcess === 0) {
      alert(`Maximum ${maxVideos} videos allowed. Please remove some videos first.`)
      return
    }
    
    setIsUploadingVideos(true)
    const newVideos: string[] = []
    
    try {
      for (let i = 0; i < filesToProcess; i++) {
        const file = files[i]
        if (file && file.type.startsWith('video/')) {
          // Check file size (limit to 50MB)
          if (file.size > 50 * 1024 * 1024) {
            alert(`File ${file.name} is too large. Please use videos smaller than 50MB.`)
            continue
          }
          
          // Convert file to base64
          const base64 = await fileToBase64(file)
          if (base64) {
            newVideos.push(base64)
          }
        } else {
          alert(`File ${files[i]?.name || 'unknown'} is not a valid video format.`)
        }
      }
      
      if (newVideos.length > 0) {
        setVideos(prev => [...prev, ...newVideos])
      }
    } catch (error) {
      console.error('Error processing video files:', error)
      alert('Error uploading videos. Please try again.')
    } finally {
      setIsUploadingVideos(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    try {
      await handleFileSelection(e.dataTransfer.files)
    } catch (error) {
      console.error('Error handling dropped files:', error)
      alert('Error processing dropped files. Please try again.')
    }
  }

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
  }

  const removeVideo = (index: number) => {
    setVideos(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !feedback.trim() || rating === 0) return

    setIsSubmitting(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    onSubmit({ 
      name: name.trim(), 
      rating, 
      feedback: feedback.trim(),
      photos: photos.length > 0 ? photos : undefined,
      videos: videos.length > 0 ? videos : undefined
    })

    // Reset form
    setName(defaultName || "")
    setRating(0)
    setFeedback("")
    setPhotos([])
    setVideos([])
    setIsUploadingPhotos(false)
    setIsUploadingVideos(false)
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
              placeholder={defaultName ? "Name from profile" : "Enter your name"}
              required
              disabled={!!defaultName || disabled}
              className={`w-full ${defaultName ? 'bg-muted' : ''}`}
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

          {/* Photo Upload Section */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Add Photos <span className="text-muted-foreground">(Optional - Max 5 photos)</span>
            </label>
            
            {/* Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isUploadingPhotos
                  ? 'border-primary bg-primary/10 pointer-events-none'
                  : isDragging 
                  ? 'border-primary bg-primary/10' 
                  : 'border-muted-foreground/25 hover:border-primary/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={async (e) => {
                  try {
                    await handleFileSelection(e.target.files)
                  } catch (error) {
                    console.error('Error handling file input:', error)
                  }
                  // Reset input value to allow selecting the same file again
                  e.target.value = ''
                }}
                className="hidden"
                disabled={isUploadingPhotos}
              />
              
              <div className="flex flex-col items-center space-y-2">
                <div className="p-3 bg-muted rounded-full">
                  {isUploadingPhotos ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  ) : (
                    <Camera className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    {isUploadingPhotos ? 'Processing photos...' : 'Drag & drop photos here, or click to browse'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, GIF up to 10MB each
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingPhotos}
                  className="mt-2"
                >
                  {isUploadingPhotos ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Photos
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Photo Preview Grid */}
            {photos.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-foreground mb-3">
                  Selected Photos ({photos.length}/5)
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                        <img
                          src={photo}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full shadow-sm hover:bg-destructive/90 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Video Upload Section */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Add Videos <span className="text-muted-foreground">(Optional - Max 2 videos, 50MB each)</span>
            </label>
            
            {/* Video Upload Area */}
            <div className="border-2 border-dashed rounded-lg p-6 text-center border-muted-foreground/25 hover:border-primary/50 transition-colors">
              <input
                ref={videoInputRef}
                type="file"
                multiple
                accept="video/*"
                onChange={async (e) => {
                  try {
                    await handleVideoSelection(e.target.files)
                  } catch (error) {
                    console.error('Error handling video input:', error)
                  }
                  // Reset input value to allow selecting the same file again
                  e.target.value = ''
                }}
                className="hidden"
                disabled={isUploadingVideos}
              />
              
              <div className="flex flex-col items-center space-y-2">
                <div className="p-3 bg-muted rounded-full">
                  <Video className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    Click to upload videos
                  </p>
                  <p className="text-xs text-muted-foreground">
                    MP4, WebM, MOV up to 50MB each
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => videoInputRef.current?.click()}
                  disabled={isUploadingVideos}
                  className="mt-2"
                >
                  {isUploadingVideos ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Videos
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Video Preview Grid */}
            {videos.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-foreground mb-3">
                  Selected Videos ({videos.length}/2)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {videos.map((video, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                        <video
                          src={video}
                          className="w-full h-full object-cover"
                          controls
                          preload="metadata"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeVideo(index)}
                        className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full shadow-sm hover:bg-destructive/90 transition-colors"
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
