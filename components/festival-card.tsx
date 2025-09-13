"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Sparkles } from "lucide-react"

interface FestivalCardProps {
  name: string
  description: string
  season: string
  significance: string
  image: string
  tribes: string[]
}

export function FestivalCard({ name, description, season, significance, image, tribes }: FestivalCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-border bg-card">
      <div className="relative overflow-hidden">
        <div
          className="h-48 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url('${image}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-secondary" />
              <span className="text-sm text-white/90">{season}</span>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>

        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <Sparkles className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-card-foreground text-sm">Significance</h4>
              <p className="text-sm text-muted-foreground">{significance}</p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Users className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-card-foreground text-sm">Celebrated by</h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {tribes.map((tribe, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tribe}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
