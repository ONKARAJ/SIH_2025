'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  X, Play, Pause, Volume2, VolumeX, MapPin, Calendar, Clock, Users, 
  Heart, Share2, BookOpen, ChefHat, Palette, Music, Camera, 
  Star, Award, Download, ExternalLink, ArrowRight, Sparkles,
  PlayCircle, Eye, ThumbsUp, MessageCircle, Bookmark
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Festival } from '@/lib/festival-data';

interface FestivalDetailModalProps {
  festival: Festival | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function FestivalDetailModal({ festival, isOpen, onClose }: FestivalDetailModalProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 1000) + 100);
  const [hasLiked, setHasLiked] = useState(false);

  // Simulate reading progress
  useEffect(() => {
    if (isOpen && activeTab === 'overview') {
      const interval = setInterval(() => {
        setReadingProgress(prev => Math.min(prev + 2, 100));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isOpen, activeTab]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setActiveTab('overview');
      setReadingProgress(0);
    }
  }, [isOpen]);

  if (!festival) return null;

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: festival.name,
          text: festival.description.short,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] p-0 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        <DialogHeader className="sr-only">
          <DialogTitle>{festival.name}</DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 z-50">
          <Progress value={readingProgress} className="h-1 bg-primary/20" />
        </div>

        {/* Header Section */}
        <div className="relative h-80 overflow-hidden">
          <Image
            src={festival.media.hero}
            alt={festival.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 z-50 bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Header Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex items-end justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge className={`${
                    festival.season === 'spring' ? 'bg-green-500' :
                    festival.season === 'summer' ? 'bg-yellow-500' :
                    festival.season === 'monsoon' ? 'bg-blue-500' :
                    'bg-purple-500'
                  } text-white px-3 py-1`}>
                    {festival.season}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-sm">
                    {festival.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">4.8</span>
                  </div>
                </div>
                
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">{festival.name}</h1>
                  <p className="text-xl text-white/90 font-light">{festival.nameLocal}</p>
                </div>

                <div className="flex items-center gap-6 text-white/80">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>{festival.dates.lunar}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>{festival.dates.duration} days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span>{festival.location.primary}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleLike}
                  className={`bg-white/20 hover:bg-white/30 backdrop-blur-sm ${
                    hasLiked ? 'text-red-400' : 'text-white'
                  }`}
                >
                  <ThumbsUp className={`h-4 w-4 mr-2 ${hasLiked ? 'fill-current' : ''}`} />
                  {likes}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white"
                >
                  <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleShare}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="mx-8 mt-6 grid w-full grid-cols-6 bg-muted/50">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="gallery" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Gallery
              </TabsTrigger>
              <TabsTrigger value="traditions" className="flex items-center gap-2">
                <Music className="h-4 w-4" />
                Traditions
              </TabsTrigger>
              <TabsTrigger value="recipes" className="flex items-center gap-2">
                <ChefHat className="h-4 w-4" />
                Food
              </TabsTrigger>
              <TabsTrigger value="crafts" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Crafts
              </TabsTrigger>
              <TabsTrigger value="travel" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Travel
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto px-8 pb-8">
              <TabsContent value="overview" className="space-y-8 mt-6">
                {/* Festival Description */}
                <Card className="border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <Sparkles className="h-6 w-6 text-primary" />
                      About {festival.name}
                    </h3>
                    <p className="text-lg leading-relaxed mb-4">{festival.description.detailed}</p>
                    <p className="text-muted-foreground">{festival.description.significance}</p>
                  </CardContent>
                </Card>

                {/* Historical Context */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Historical Significance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-primary">Origins</h4>
                      <p className="text-muted-foreground">{festival.history.origin}</p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2 text-primary">Evolution</h4>
                      <p className="text-muted-foreground">{festival.history.evolution}</p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2 text-primary">Modern Practices</h4>
                      <p className="text-muted-foreground">{festival.history.modernPractices}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Mythology */}
                {festival.description.mythology && (
                  <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        Mythology & Legends
                      </h3>
                      <p className="text-muted-foreground italic leading-relaxed">
                        {festival.description.mythology}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Economic Impact */}
                <Card>
                  <CardHeader>
                    <CardTitle>Cultural Impact</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">₹25Cr</div>
                      <div className="text-sm text-muted-foreground">Annual Tourism Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">5000+</div>
                      <div className="text-sm text-muted-foreground">Artists Supported</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                      <div className="text-sm text-muted-foreground">Annual Visitors</div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gallery" className="space-y-6 mt-6">
                {/* Main Image Display */}
                <Card className="overflow-hidden">
                  <div className="relative h-96">
                    <Image
                      src={festival.media.gallery[selectedImage]}
                      alt={`${festival.name} gallery ${selectedImage + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-black/50 text-white">
                        {selectedImage + 1} of {festival.media.gallery.length}
                      </Badge>
                    </div>
                  </div>
                </Card>

                {/* Thumbnail Gallery */}
                <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                  {festival.media.gallery.map((image, index) => (
                    <div
                      key={index}
                      className={`relative h-24 cursor-pointer rounded-lg overflow-hidden transition-all ${
                        selectedImage === index ? 'ring-2 ring-primary' : 'hover:scale-105'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <Image
                        src={image}
                        alt={`${festival.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Video Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PlayCircle className="h-5 w-5" />
                      Festival Videos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative h-64 bg-muted rounded-lg flex items-center justify-center">
                      <Button size="lg" className="gap-2">
                        <Play className="h-5 w-5" />
                        Watch Festival Highlights
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="traditions" className="space-y-6 mt-6">
                {/* Music & Dance */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Music className="h-5 w-5 text-primary" />
                      Music & Dance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Traditional Music</h4>
                        <div className="space-y-2">
                          {festival.traditions.music.map((music, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 rounded bg-muted/50">
                              <Music className="h-4 w-4 text-primary" />
                              <span>{music}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Folk Dances</h4>
                        <div className="space-y-2">
                          {festival.traditions.dance.map((dance, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 rounded bg-muted/50">
                              <Users className="h-4 w-4 text-primary" />
                              <span>{dance}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Traditional Attire */}
                <Card>
                  <CardHeader>
                    <CardTitle>Traditional Attire</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {festival.traditions.attire.map((attire, index) => (
                        <div key={index} className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 border">
                          <p className="font-medium">{attire}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recipes" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {festival.recipes.map((recipe, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={recipe.image || '/recipes/default-recipe.jpg'}
                          alt={recipe.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-xl font-bold mb-2">{recipe.name}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{recipe.significance}</p>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Ingredients</h4>
                            <ul className="text-sm space-y-1">
                              {recipe.ingredients.map((ingredient, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                  {ingredient}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <Button variant="outline" className="w-full">
                            <ChefHat className="h-4 w-4 mr-2" />
                            View Full Recipe
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="crafts" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {festival.crafts.map((craft, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Palette className="h-5 w-5 text-primary" />
                          {craft.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">{craft.symbolism}</p>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Materials</h4>
                          <div className="flex flex-wrap gap-2">
                            {craft.materials.map((material, i) => (
                              <Badge key={i} variant="outline" size="sm">
                                {material}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Process</h4>
                          <ol className="text-sm space-y-2">
                            {craft.process.map((step, i) => (
                              <li key={i} className="flex gap-3">
                                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                                  {i + 1}
                                </div>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        <Button variant="outline" className="w-full">
                          Learn This Craft
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="travel" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Travel Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        Getting There
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Best Time to Visit</h4>
                        <p className="text-muted-foreground">{festival.travelInfo.bestTimeToVisit}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">How to Reach</h4>
                        <p className="text-muted-foreground">{festival.travelInfo.howToReach}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Local Transport</h4>
                        <p className="text-muted-foreground">{festival.travelInfo.localTransport}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Travel Tips */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Travel Tips</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-green-600">Do's</h4>
                        <ul className="space-y-1">
                          {festival.travelInfo.dos.map((tip, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2 text-red-600">Don'ts</h4>
                        <ul className="space-y-1">
                          {festival.travelInfo.donts.map((tip, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Accommodation */}
                <Card>
                  <CardHeader>
                    <CardTitle>Accommodation Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {festival.travelInfo.accommodation.map((option, index) => (
                        <div key={index} className="p-4 rounded-lg bg-muted/50 border text-center">
                          <p className="font-medium">{option}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-4 bg-muted/20 border-t flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>{Math.floor(Math.random() * 5000) + 1000} views</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageCircle className="h-4 w-4" />
              <span>{Math.floor(Math.random() * 100) + 20} reviews</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download Guide
            </Button>
            <Button size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              Plan Visit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
