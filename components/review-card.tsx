import { Card, CardContent } from "@/components/ui/card"
import { Star, Image as ImageIcon } from "lucide-react"
import { useState } from "react"

interface ReviewCardProps {
  name: string
  rating: number
  feedback: string
  date: string
  photos?: string[]
}

export function ReviewCard({ name, rating, feedback, date, photos }: ReviewCardProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)

  return (
    <>
      <Card className="border-border bg-background hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="font-semibold text-foreground text-lg">{name}</h4>
              <p className="text-sm text-muted-foreground">{date}</p>
            </div>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < rating ? "fill-secondary text-secondary" : "text-muted-foreground"}`}
                />
              ))}
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">{feedback}</p>
          
          {/* Photos Grid */}
          {photos && photos.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-3">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {photos.length} photo{photos.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {photos.slice(0, 6).map((photo, index) => (
                  <div key={index} className="relative">
                    <div 
                      className="aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer group"
                      onClick={() => setSelectedPhotoIndex(index)}
                    >
                      <img
                        src={photo}
                        alt={`Review photo ${index + 1}`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      {index === 5 && photos.length > 6 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            +{photos.length - 6} more
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Photo Lightbox */}
      {selectedPhotoIndex !== null && photos && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <img
              src={photos[selectedPhotoIndex]}
              alt={`Review photo ${selectedPhotoIndex + 1}`}
              className="w-full h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white"
            >
              ✕
            </button>
            
            {/* Navigation */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedPhotoIndex(selectedPhotoIndex > 0 ? selectedPhotoIndex - 1 : photos.length - 1)
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white"
                >
                  ←
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedPhotoIndex(selectedPhotoIndex < photos.length - 1 ? selectedPhotoIndex + 1 : 0)
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white"
                >
                  →
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 rounded-full px-3 py-1">
                  <span className="text-white text-sm">
                    {selectedPhotoIndex + 1} / {photos.length}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
