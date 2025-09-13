'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { 
  Calendar, MapPin, Clock, Users, Heart, Share2, Eye, ArrowRight, 
  Star, Sparkles, Play, Bookmark, TrendingUp, Zap
} from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Festival } from '@/lib/festival-data';

interface EnhancedFestivalCardProps {
  festival: Festival;
  index: number;
  onFestivalClick: (festival: Festival) => void;
  onToggleFavorite: (festivalId: string) => void;
  favorites: string[];
}

export default function EnhancedFestivalCard({ 
  festival, 
  index, 
  onFestivalClick, 
  onToggleFavorite, 
  favorites 
}: EnhancedFestivalCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 50, y: 50 });
  };

  const isFavorited = favorites.includes(festival.id);
  const rating = 4.2 + (Math.random() * 0.8);
  const views = Math.floor(Math.random() * 10000) + 1000;
  const popularity = Math.floor(Math.random() * 100);

  return (
    <div
      ref={cardRef}
      className="relative group perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onFestivalClick(festival)}
      style={{
        transform: isHovered 
          ? `rotateX(${(mousePosition.y - 50) * 0.1}deg) rotateY(${(mousePosition.x - 50) * 0.1}deg) translateZ(20px)` 
          : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
        transition: 'transform 0.1s ease-out',
      }}
    >
      <Card className="cursor-pointer transition-all duration-500 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 border-2 hover:border-primary/20 hover:shadow-2xl relative">
        {/* Animated Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10 transition-opacity duration-500"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, var(--primary) 0%, transparent 50%)`,
            opacity: isHovered ? 0.15 : 0.05,
          }}
        />

        <CardHeader className="p-0 relative overflow-hidden">
          <div className="relative h-56 group-hover:h-64 transition-all duration-500">
            <Image
              src={festival.media.hero}
              alt={festival.name}
              fill
              className={`object-cover transition-all duration-700 ${
                isHovered ? 'scale-110 brightness-110' : 'scale-100'
              }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div 
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.1) 0%, transparent 60%)`,
                opacity: isHovered ? 1 : 0,
              }}
            />

            {/* Floating Elements */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <Badge 
                className={`${
                  festival.season === 'spring' ? 'bg-green-500' :
                  festival.season === 'summer' ? 'bg-yellow-500' :
                  festival.season === 'monsoon' ? 'bg-blue-500' :
                  'bg-purple-500'
                } text-white px-3 py-1 transform transition-transform duration-300 ${
                  isHovered ? 'scale-110 -translate-y-1' : ''
                }`}
              >
                <Sparkles className="h-3 w-3 mr-1" />
                {festival.season}
              </Badge>
              
              {popularity > 70 && (
                <Badge 
                  className={`bg-orange-500 text-white px-2 py-1 text-xs transform transition-all duration-300 delay-100 ${
                    isHovered ? 'scale-110 translate-x-1' : 'scale-0'
                  }`}
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Trending
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                className={`h-9 w-9 p-0 bg-black/20 hover:bg-black/40 backdrop-blur-sm transition-all duration-300 ${
                  isHovered ? 'scale-110 -translate-y-1' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(festival.id);
                }}
              >
                <Heart 
                  className={`h-4 w-4 transition-all duration-300 ${
                    isFavorited 
                      ? 'fill-red-500 text-red-500 scale-125' 
                      : 'text-white hover:text-red-400'
                  }`} 
                />
              </Button>
              
              <Button
                size="sm"
                variant="secondary"
                className={`h-9 w-9 p-0 bg-black/20 hover:bg-black/40 backdrop-blur-sm transition-all duration-300 delay-75 ${
                  isHovered ? 'scale-110 -translate-y-1' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (navigator.share) {
                    navigator.share({
                      title: festival.name,
                      text: festival.description.short,
                    });
                  }
                }}
              >
                <Share2 className="h-4 w-4 text-white" />
              </Button>
            </div>

            {/* Rating & Stats */}
            <div className="absolute bottom-4 left-4 flex items-center gap-3">
              <div className={`flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 transition-all duration-300 ${
                isHovered ? 'scale-110 translate-y-1' : ''
              }`}>
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-white text-sm font-medium">{rating.toFixed(1)}</span>
              </div>
              
              <div className={`flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 transition-all duration-300 delay-75 ${
                isHovered ? 'scale-110 translate-y-1' : ''
              }`}>
                <Eye className="h-3 w-3 text-white" />
                <span className="text-white text-sm">{views.toLocaleString()}</span>
              </div>
            </div>

            {/* Duration Badge */}
            <div className="absolute bottom-4 right-4">
              <Badge 
                variant="secondary" 
                className={`bg-white/20 text-white backdrop-blur-sm transition-all duration-300 ${
                  isHovered ? 'scale-110 translate-y-1' : ''
                }`}
              >
                <Clock className="h-3 w-3 mr-1" />
                {festival.dates.duration} days
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-4 relative">
          {/* Animated Title */}
          <div className="space-y-2">
            <h3 className={`text-xl font-bold transition-all duration-300 ${
              isHovered ? 'text-primary scale-105' : ''
            }`}>
              {festival.name}
            </h3>
            <p className="text-muted-foreground text-sm">{festival.nameLocal}</p>
          </div>

          {/* Description with Animated Lines */}
          <div className="relative">
            <p className="text-muted-foreground line-clamp-2 leading-relaxed">
              {festival.description.short}
            </p>
            <div 
              className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-500 ${
                isHovered ? 'w-full' : 'w-0'
              }`}
            />
          </div>

          {/* Details with Hover Animations */}
          <div className="space-y-3">
            {[
              { icon: Calendar, text: festival.dates.lunar },
              { icon: MapPin, text: festival.location.primary },
              { icon: Users, text: festival.category }
            ].map((item, idx) => (
              <div 
                key={idx}
                className={`flex items-center gap-2 text-muted-foreground transition-all duration-300 ${
                  isHovered ? 'translate-x-2 text-foreground' : ''
                }`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <item.icon className={`h-4 w-4 transition-all duration-300 ${
                  isHovered ? 'text-primary scale-110' : ''
                }`} />
                <span className="truncate text-sm">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Months with Staggered Animation */}
          <div className="flex flex-wrap gap-2">
            {festival.months.slice(0, 2).map((month, idx) => (
              <Badge 
                key={month} 
                variant="outline" 
                size="sm"
                className={`transition-all duration-300 ${
                  isHovered ? 'scale-110 -translate-y-1 border-primary' : ''
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {month}
              </Badge>
            ))}
            {festival.months.length > 2 && (
              <Badge 
                variant="outline" 
                size="sm"
                className={`transition-all duration-300 ${
                  isHovered ? 'scale-110 -translate-y-1 border-primary' : ''
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                +{festival.months.length - 2} more
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <div className="flex gap-3 w-full">
            <Button 
              className={`flex-1 relative overflow-hidden transition-all duration-300 group/button ${
                isHovered ? 'scale-105 shadow-lg' : ''
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onFestivalClick(festival);
              }}
            >
              {/* Button Background Animation */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"
                style={{
                  transform: `translateX(${mousePosition.x - 50}%)`,
                }}
              />
              
              <span className="relative flex items-center justify-center gap-2">
                <Zap className="h-4 w-4" />
                Explore Festival
                <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${
                  isHovered ? 'translate-x-2' : ''
                }`} />
              </span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className={`transition-all duration-300 ${
                isHovered ? 'scale-110 -rotate-12' : ''
              }`}
              onClick={(e) => {
                e.stopPropagation();
                // Quick preview functionality
              }}
            >
              <Play className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>

        {/* Hover Glow Effect */}
        <div 
          className={`absolute inset-0 rounded-lg transition-opacity duration-300 pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `conic-gradient(from ${mousePosition.x * 3.6}deg, var(--primary), var(--secondary), var(--primary))`,
            padding: '2px',
            zIndex: -1,
            filter: 'blur(8px)',
          }}
        />
      </Card>
    </div>
  );
}
