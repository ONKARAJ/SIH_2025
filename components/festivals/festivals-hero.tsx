"use client";

import { useState, useEffect } from "react";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FestivalsHero = () => {
  const heroSlides = [
    {
      title: "Sarhul Festival",
      subtitle: "Spring Celebration of Nature",
      description: "Experience the vibrant Sarhul festival, celebrating the renewal of life and nature's bounty with traditional dances and rituals.",
      image: "/images/sarhul-hero.svg",
      video: "/videos/sarhul.mp4"
    },
    {
      title: "Sohrai Festival",
      subtitle: "Harvest Festival of Joy",
      description: "Join the colorful Sohrai celebration, where communities come together to celebrate the harvest season with folk art and music.",
      image: "/images/sohrai-hero.svg",
      video: "/videos/sohrai.mp4"
    },
    {
      title: "Tusu Festival",
      subtitle: "Winter Folk Celebration",
      description: "Discover the enchanting Tusu festival, marking the winter season with traditional songs, dances, and cultural performances.",
      image: "/images/tusu-hero.svg",
      video: "/videos/tusu.mp4"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [useVideo, setUseVideo] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const currentHero = heroSlides[currentSlide];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        {useVideo && isPlaying ? (
          <video
            key={currentSlide}
            src={currentHero.video}
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
            onError={() => setUseVideo(false)}
          />
        ) : (
          <img
            src={currentHero.image}
            alt={currentHero.title}
            className="w-full h-full object-cover"
          />
        )}
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 z-20 bg-white/10 border-white/20 text-white hover:bg-white/20"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 z-20 bg-white/10 border-white/20 text-white hover:bg-white/20"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Main Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold drop-shadow-lg mb-4 animate-fade-in">
          {currentHero.title}
        </h1>
        <p className="text-xl md:text-2xl font-medium drop-shadow-md mb-6 animate-fade-in-delayed">
          {currentHero.subtitle}
        </p>
        <p className="text-lg md:text-xl drop-shadow-md mb-8 max-w-2xl mx-auto opacity-90 animate-fade-in-delayed">
          {currentHero.description}
        </p>
        
        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="px-8 py-3 text-lg font-semibold">
            Explore Festivals
          </Button>
          <Button variant="outline" size="lg" className="px-8 py-3 text-lg font-semibold border-white text-white hover:bg-white hover:text-black">
            Plan Your Visit
          </Button>
        </div>
      </div>

      {/* Video Controls */}
      {useVideo && (
        <div className="absolute bottom-4 right-4 z-20">
          <Button
            variant="outline"
            size="icon"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>
      )}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-white scale-110" 
                : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default FestivalsHero;
