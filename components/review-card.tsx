import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface ReviewCardProps {
  name: string
  rating: number
  feedback: string
  date: string
}

export function ReviewCard({ name, rating, feedback, date }: ReviewCardProps) {
  return (
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
        <p className="text-muted-foreground leading-relaxed">{feedback}</p>
      </CardContent>
    </Card>
  )
}
