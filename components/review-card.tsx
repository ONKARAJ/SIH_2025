import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Trash2, MoreVertical } from "lucide-react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ReviewCardProps {
  name: string
  rating: number
  feedback: string
  date: string
  spotImage?: string
  spotVideo?: string
  spotName?: string
  location?: string
  canDelete?: boolean
  onDelete?: () => void
}

export function ReviewCard({ name, rating, feedback, date, spotImage, spotVideo, spotName, location, canDelete = false, onDelete }: ReviewCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  return (
    <Card className="border-border bg-background hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden group">
      {/* Video - Priority over image */}
      {spotVideo && (
        <div className="relative h-48 w-full overflow-hidden">
          <video 
            src={spotVideo}
            className="w-full h-full object-cover"
            controls
            preload="metadata"
            poster={spotImage}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          >
            Your browser does not support the video tag.
          </video>
          {spotName && (
            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              <span>{spotName}</span>
            </div>
          )}
        </div>
      )}
      
      {/* Image - Only show if spotImage exists and no video */}
      {!spotVideo && spotImage && (
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={spotImage} 
            alt={spotName || 'Jharkhand Tourist Spot'}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          {spotName && (
            <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{spotName}</span>
            </div>
          )}
        </div>
      )}

      <CardContent className={`${spotImage || spotVideo ? 'p-5' : 'p-6'}`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="font-semibold text-foreground text-base">{name}</h4>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-xs text-muted-foreground">{date}</p>
              {location && (
                <>
                  <span className="text-xs text-muted-foreground">•</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{location}</span>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < rating ? 'fill-secondary text-secondary' : 'text-muted-foreground'}`}
                />
              ))}
            </div>
            {canDelete && onDelete && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem 
                    onClick={() => setShowDeleteDialog(true)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Review
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Spot name for non-media reviews */}
        {!spotImage && !spotVideo && spotName && (
          <div className="mb-3">
            <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">
              {spotName}
            </span>
          </div>
        )}

        {/* Feedback */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {feedback}
        </p>
      </CardContent>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Review</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this review? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                onDelete?.()
                setShowDeleteDialog(false)
              }}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
