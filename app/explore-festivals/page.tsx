"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users, Star, Clock, Heart, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

// Festival data with detailed information
const festivals = [
  {
    id: "sarhul",
    name: "Sarhul Festival",
    nameLocal: "सरहुल",
    subtitle: "Spring Celebration of Nature",
    season: "Spring",
    months: ["March", "April"],
    duration: 7,
    location: "Ranchi, Khunti, Gumla",
    description: "Sarhul is the most sacred festival of the tribal communities in Jharkhand, marking the beginning of the new year and celebrating the worship of Sal trees. This vibrant festival represents the deep connection between tribal people and nature.",
    longDescription: "The Sarhul festival is celebrated with great enthusiasm by the Munda, Ho, and Oraon tribes of Jharkhand. During this festival, the village priest (Pahan) offers prayers to the Sal trees, seeking blessings for prosperity and good harvest. The festival involves traditional dances, folk songs, and community feasting. Young men and women dressed in colorful traditional attire perform the famous Sarhul dance around the sacred Sal trees.",
    significance: "Celebrates the arrival of spring, new beginnings, and the sacred relationship between humans and nature",
    rituals: [
      "Worship of Sal trees with offerings of flowers and vermillion",
      "Traditional Sarhul dance performed in circles",
      "Community prayers led by the village priest (Pahan)",
      "Offering of Handia (traditional rice beer) to the deities",
      "Exchange of gifts and community feasting"
    ],
    images: [
      "https://www.shutterstock.com/image-photo/ranchi-jharkhand-08-tuesday-2019-260nw-1488666659.jpg",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80"
    ],
    traditions: {
      music: ["Nagara drums", "Tribal folk songs", "Mandar beats"],
      dance: ["Sarhul circle dance", "Paika dance", "Traditional tribal dance"],
      attire: ["White dhoti for men", "Red-bordered sari for women", "Traditional tribal jewelry"],
      food: ["Handia (rice beer)", "Dhuska", "Pittha", "Traditional tribal cuisine"]
    },
    bestTimeToVisit: "March-April when Sal trees are in full bloom",
    rating: 4.8,
    visitors: "50,000+"
  },
  {
    id: "sohrai",
    name: "Sohrai Festival",
    nameLocal: "सोहराई",
    subtitle: "Harvest Festival of Joy",
    season: "Winter",
    months: ["November", "December"],
    duration: 15,
    location: "Hazaribagh, Ramgarh, Chatra",
    description: "Sohrai is a magnificent harvest festival dedicated to cattle, celebrated with elaborate wall paintings and cultural performances. This festival showcases the artistic heritage of tribal communities.",
    longDescription: "The Sohrai festival is famous worldwide for its spectacular wall paintings created by tribal women using natural pigments. These intricate artworks depict animals, geometric patterns, and symbols of prosperity. The festival honors cattle for their contribution to agriculture and celebrates the bond between humans and animals. Villages come alive with colorful decorations, traditional songs, and community celebrations.",
    significance: "Celebrates the harvest season, honors cattle, and showcases traditional tribal art forms",
    rituals: [
      "Creating elaborate Sohrai wall paintings on house walls",
      "Decorating and worshipping cattle",
      "Cleaning and beautifying cattle sheds",
      "Community singing and dancing",
      "Preparation of traditional sweets and delicacies"
    ],
    images: [
      "https://pbs.twimg.com/media/EmwhdmKVkAA5nCm.jpg",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80"
    ],
    traditions: {
      music: ["Folk songs about cattle", "Harvest celebration songs", "Traditional drums"],
      dance: ["Jhumar dance", "Domkach dance", "Circle dances"],
      attire: ["Festive saris", "Traditional jewelry", "Colorful turbans"],
      food: ["Pitha", "Rice preparations", "Sweet delicacies", "Local liquor"]
    },
    bestTimeToVisit: "November-December during the festival period",
    rating: 4.7,
    visitors: "30,000+"
  },
  {
    id: "tusu",
    name: "Tusu Festival",
    nameLocal: "तुसू पर्व",
    subtitle: "Winter Folk Celebration",
    season: "Winter",
    months: ["December", "January"],
    duration: 10,
    location: "Jamshedpur, East Singhbhum",
    description: "Tusu is a vibrant folk festival marking the end of the harvest season, celebrated with beautiful Tusu idols, traditional songs, and colorful processions.",
    longDescription: "The Tusu festival is celebrated by unmarried girls who create beautiful Tusu idols using bamboo, cloth, and decorative materials. These idols are carried in processions with traditional songs and dances. The festival concludes with the immersion of Tusu idols in rivers or ponds. Young girls dress in their finest traditional attire and sing Tusu songs that narrate stories of love, nature, and rural life.",
    significance: "Celebrates the end of harvest season, promotes community bonding, and preserves folk traditions",
    rituals: [
      "Creating decorative Tusu idols by young girls",
      "Daily evening prayers and songs for 30 days",
      "Colorful processions with Tusu idols",
      "Traditional folk songs and dances",
      "Immersion of Tusu idols in water bodies"
    ],
    images: [
      "https://i.pinimg.com/736x/d1/5e/0c/d15e0c73f97fe02eaafd28dfc88b4a0f.jpg",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80"
    ],
    traditions: {
      music: ["Tusu folk songs", "Traditional melodies", "Village chorus"],
      dance: ["Tusu dance", "Folk circle dances", "Village performances"],
      attire: ["Colorful saris", "Traditional ornaments", "Festive clothing"],
      food: ["Traditional sweets", "Rice delicacies", "Seasonal fruits"]
    },
    bestTimeToVisit: "December-January during winter celebrations",
    rating: 4.6,
    visitors: "25,000+"
  },
  {
    id: "karma",
    name: "Karma Festival",
    nameLocal: "कर्मा पर्व",
    subtitle: "Festival of the Sacred Tree",
    season: "Monsoon",
    months: ["August", "September"],
    duration: 5,
    location: "Gumla, Khunti, Ranchi",
    description: "Karma is a significant tribal festival dedicated to the worship of the Karma tree, celebrated for prosperity, fertility, and the well-being of family members.",
    longDescription: "The Karma festival is celebrated by various tribal communities including Oraon, Munda, and Ho tribes. The festival centers around the worship of the Karma tree (Adina cordifolia), which is considered sacred. Devotees fast for the day and perform traditional dances around the Karma tree. The festival emphasizes the importance of nature worship and seeking blessings for prosperity and good fortune.",
    significance: "Worships the sacred Karma tree, seeks blessings for prosperity, and celebrates nature's bounty",
    rituals: [
      "Bringing fresh Karma branches to homes",
      "Worship of the Karma tree with offerings",
      "Traditional circle dance around the tree",
      "Fasting and prayers by married women",
      "Community celebration and feasting"
    ],
    images: [
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80"
    ],
    traditions: {
      music: ["Karma songs", "Traditional folk music", "Ritual chants"],
      dance: ["Karma circle dance", "Traditional tribal dance", "Community performances"],
      attire: ["Traditional tribal dress", "Festive clothing", "Cultural ornaments"],
      food: ["Traditional delicacies", "Seasonal preparations", "Community feast"]
    },
    bestTimeToVisit: "August-September during monsoon season",
    rating: 4.5,
    visitors: "20,000+"
  },
  {
    id: "bandna",
    name: "Bandna Festival",
    nameLocal: "बांदना पर्व",
    subtitle: "Cattle Worship Festival",
    season: "Winter",
    months: ["October", "November"],
    duration: 8,
    location: "Purulia Border, West Singhbhum",
    description: "Bandna is a cattle worship festival celebrated by tribal communities, emphasizing the importance of livestock in agricultural life and rural economy.",
    longDescription: "The Bandna festival is dedicated to honoring cattle and their contribution to agricultural life. During this festival, cattle are decorated with colorful ornaments, fed special food, and worshipped with traditional rituals. The festival reflects the deep respect and gratitude that tribal communities have for their livestock. Folk songs praising cattle and agricultural prosperity are sung during the celebrations.",
    significance: "Honors cattle and their contribution to agriculture, celebrates rural life and farming traditions",
    rituals: [
      "Decorating cattle with colorful ornaments",
      "Special feeding and care of livestock",
      "Traditional prayers and worship ceremonies",
      "Folk songs praising agricultural life",
      "Community celebrations and feasting"
    ],
    images: [
      "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80"
    ],
    traditions: {
      music: ["Folk songs about cattle", "Agricultural melodies", "Traditional music"],
      dance: ["Rural folk dances", "Agricultural themed performances", "Community dances"],
      attire: ["Rural traditional dress", "Farmer clothing", "Festive wear"],
      food: ["Agricultural produce", "Traditional preparations", "Cattle-based delicacies"]
    },
    bestTimeToVisit: "October-November post-harvest season",
    rating: 4.4,
    visitors: "15,000+"
  },
  {
    id: "jitiya",
    name: "Jitiya Festival",
    nameLocal: "जितिया व्रत",
    subtitle: "Maternal Devotion Festival",
    season: "Monsoon",
    months: ["September", "October"],
    duration: 3,
    location: "Palamu, Garhwa, Latehar",
    description: "Jitiya is a sacred fasting festival observed by mothers for the well-being and long life of their children, showcasing the strength of maternal love.",
    longDescription: "The Jitiya festival is one of the most important festivals for mothers in Jharkhand. Mothers observe a strict fast (nirjala vrat) without water for their children's welfare. The festival is based on the legendary devotion of a mother who sacrificed everything for her child's well-being. Women gather in groups, share stories, and perform traditional rituals while maintaining their fast.",
    significance: "Celebrates maternal love and devotion, seeks blessings for children's welfare and prosperity",
    rituals: [
      "Strict nirjala (waterless) fasting by mothers",
      "Traditional storytelling about maternal devotion",
      "Community prayers and worship ceremonies",
      "Breaking of fast with traditional food",
      "Blessings and prayers for children's well-being"
    ],
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
      "https://images.unsplash.com/photo-1582632443527-6747dfed4a37?w=800&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80"
    ],
    traditions: {
      music: ["Devotional songs", "Maternal folk songs", "Traditional prayers"],
      dance: ["Devotional performances", "Traditional women's dances", "Prayer dances"],
      attire: ["Traditional saris", "Devotional clothing", "Religious ornaments"],
      food: ["Special prasad", "Traditional sweets", "Ceremonial food"]
    },
    bestTimeToVisit: "September-October during festival period",
    rating: 4.6,
    visitors: "40,000+"
  }
];

// Image carousel component
const ImageCarousel = ({ images, currentIndex, onNext, onPrev }: any) => (
  <div className="relative h-96 overflow-hidden rounded-2xl group">
    <div 
      className="flex transition-transform duration-500 ease-in-out h-full"
      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
    >
      {images.map((image: string, index: number) => (
        <div key={index} className="w-full h-full flex-shrink-0 relative">
          <Image
            src={image}
            alt={`Festival image ${index + 1}`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      ))}
    </div>
    
    {/* Navigation Buttons */}
    <Button
      variant="ghost"
      size="icon"
      onClick={onPrev}
      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
    >
      <ChevronLeft className="h-5 w-5" />
    </Button>
    <Button
      variant="ghost"
      size="icon"
      onClick={onNext}
      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
    >
      <ChevronRight className="h-5 w-5" />
    </Button>

    {/* Dots Indicator */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
      {images.map((_: any, index: number) => (
        <button
          key={index}
          className={`w-2 h-2 rounded-full transition-all duration-200 ${
            index === currentIndex ? 'bg-white scale-125' : 'bg-white/60'
          }`}
        />
      ))}
    </div>
  </div>
);

export default function ExploreFestivalsPage() {
  const [imageIndices, setImageIndices] = useState<{ [key: string]: number }>({});
  
  // Handle anchor navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    // Handle initial hash on page load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Initialize image indices
  useEffect(() => {
    const indices: { [key: string]: number } = {};
    festivals.forEach(festival => {
      indices[festival.id] = 0;
    });
    setImageIndices(indices);
  }, []);

  // Auto-slide effect for images
  useEffect(() => {
    const intervals = festivals.map((festival, index) => 
      setInterval(() => {
        setImageIndices(prev => ({
          ...prev,
          [festival.id]: (prev[festival.id] + 1) % festival.images.length
        }));
      }, 5000 + (index * 500)) // Stagger the intervals consistently
    );

    return () => intervals.forEach(clearInterval);
  }, []);

  const handleNextImage = (festivalId: string) => {
    setImageIndices(prev => ({
      ...prev,
      [festivalId]: (prev[festivalId] + 1) % festivals.find(f => f.id === festivalId)!.images.length
    }));
  };

  const handlePrevImage = (festivalId: string) => {
    const festival = festivals.find(f => f.id === festivalId)!;
    setImageIndices(prev => ({
      ...prev,
      [festivalId]: (prev[festivalId] - 1 + festival.images.length) % festival.images.length
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-red-600/5 to-yellow-600/10" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-orange-100 text-orange-700 border-orange-200 px-6 py-2 text-sm font-medium">
            🎭 Cultural Heritage of Jharkhand
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 bg-clip-text text-transparent leading-tight mb-8">
            Explore Festivals
          </h1>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            Discover the rich tapestry of Jharkhand's tribal festivals. Each celebration tells a story of ancient traditions, 
            cultural heritage, and the deep connection between people and nature.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Link href="/festivals">Festival Calendar</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/book-tour">Plan Your Visit</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Festivals Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-24">
            {festivals.map((festival, index) => (
              <div 
                key={festival.id} 
                id={festival.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center scroll-mt-24 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
              >
                {/* Image Section */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <ImageCarousel
                    images={festival.images}
                    currentIndex={imageIndices[festival.id] || 0}
                    onNext={() => handleNextImage(festival.id)}
                    onPrev={() => handlePrevImage(festival.id)}
                  />
                  
                  {/* Image Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="text-center p-4">
                      <CardContent className="p-0">
                        <div className="text-2xl font-bold text-orange-600">{festival.rating}</div>
                        <div className="text-sm text-gray-500 flex items-center justify-center">
                          <Star className="h-3 w-3 text-yellow-500 fill-current mr-1" />
                          Rating
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="text-center p-4">
                      <CardContent className="p-0">
                        <div className="text-2xl font-bold text-orange-600">{festival.duration}</div>
                        <div className="text-sm text-gray-500">Days</div>
                      </CardContent>
                    </Card>
                    <Card className="text-center p-4">
                      <CardContent className="p-0">
                        <div className="text-lg font-bold text-orange-600">{festival.visitors}</div>
                        <div className="text-sm text-gray-500">Visitors</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Content Section */}
                <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div>
                    <Badge className={`mb-4 ${
                      festival.season === 'Spring' ? 'bg-green-100 text-green-700 border-green-200' :
                      festival.season === 'Summer' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                      festival.season === 'Monsoon' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                      'bg-purple-100 text-purple-700 border-purple-200'
                    }`}>
                      {festival.season} Festival
                    </Badge>
                    
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">{festival.name}</h2>
                    <p className="text-xl text-gray-600 mb-4">{festival.nameLocal}</p>
                    <p className="text-lg text-orange-600 font-medium mb-6">{festival.subtitle}</p>
                  </div>

                  {/* Festival Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{festival.months.join(' - ')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{festival.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{festival.duration} days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>{festival.visitors} annual visitors</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">{festival.description}</p>
                    <p className="text-gray-600 leading-relaxed text-sm">{festival.longDescription}</p>
                  </div>

                  {/* Significance */}
                  <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-orange-800 mb-3">Cultural Significance</h3>
                      <p className="text-orange-700 text-sm leading-relaxed">{festival.significance}</p>
                    </CardContent>
                  </Card>

                  {/* Rituals */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Traditional Rituals</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {festival.rituals.map((ritual, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-700">{ritual}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Traditions */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Music & Dance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {festival.traditions.music.concat(festival.traditions.dance).slice(0, 3).map((item, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs mr-1 mb-1">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Traditional Food</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {festival.traditions.food.slice(0, 3).map((item, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs mr-1 mb-1">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <Button asChild className="flex-1">
                      <Link href="/festivals">Learn More</Link>
                    </Button>
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Best Time to Visit */}
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-blue-800 mb-2">Best Time to Visit</h4>
                      <p className="text-blue-700 text-sm">{festival.bestTimeToVisit}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Experience Jharkhand's Cultural Heritage</h2>
          <p className="text-xl mb-8 opacity-90">
            Join us in celebrating these magnificent festivals and become part of Jharkhand's rich cultural legacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              <Link href="/book-tour">Plan Your Cultural Journey</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-red-800 hover:bg-white/10">
              <Link href="/festival-calendar">View Festival Calendar</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
