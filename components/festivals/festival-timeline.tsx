'use client';

import { useState, useEffect } from 'react';
import { Calendar, Users, Star, X, Clock, MapPin, Music, Palette, Heart, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Enhanced timeline data with detailed festival information
const timelineData = [
  {
    id: 1,
    period: "Ancient Times (Pre-1000 CE)",
    title: "Origins of Tribal Festivals",
    description: "The earliest Jharkhand festivals originated from ancient tribal traditions celebrating nature, harvest cycles, and ancestral worship.",
    festivals: [
      {
        name: "Proto-Sarhul",
        description: "The ancient spring festival celebrating Sal tree blossoms and nature's renewal. Communities would gather to worship trees and pray for good harvests.",
        timing: "Spring Season (March-April)",
        rituals: ["Tree worship", "Community prayers", "Offering of flowers"],
        significance: "Marked the beginning of agricultural activities"
      },
      {
        name: "Early Harvest Celebrations",
        description: "Simple harvest festivals where tribes thanked nature spirits for abundant crops and planned for the coming season.",
        timing: "Post-Harvest (November-December)",
        rituals: ["Grain offering", "Community feasts", "Traditional dances"],
        significance: "Established gratitude traditions toward nature"
      }
    ],
    significance: "Foundation of tribal cultural identity",
    icon: "🌱",
    color: "from-green-400 to-emerald-600",
    bgGradient: "bg-gradient-to-br from-green-50 to-emerald-100"
  },
  {
    id: 2,
    period: "Medieval Period (1000-1500 CE)",
    title: "Cultural Synthesis",
    description: "Integration of various tribal customs with regional influences, forming distinctive festival traditions.",
    festivals: [
      {
        name: "Sarhul Festival",
        description: "The Sal tree worship festival evolved into a grand celebration with elaborate rituals, community participation, and cultural performances.",
        timing: "Chaitra Month (March-April)",
        rituals: ["Sal flower offerings", "Traditional music", "Community dances", "Village processions"],
        significance: "Became the most important festival of Munda and Oraon tribes"
      },
      {
        name: "Karam Festival",
        description: "Youth-focused festival celebrating the Karam tree, with elaborate songs, dances, and courtship rituals.",
        timing: "Bhadra Month (August-September)",
        rituals: ["Karam branch installation", "Night-long dancing", "Folk songs", "Youth participation"],
        significance: "Strengthened social bonds among young community members"
      }
    ],
    significance: "Cultural amalgamation and festival standardization",
    icon: "🎭",
    color: "from-blue-400 to-indigo-600",
    bgGradient: "bg-gradient-to-br from-blue-50 to-indigo-100"
  },
  {
    id: 3,
    period: "Colonial Era (1500-1947)",
    title: "Preservation Through Resistance",
    description: "Despite colonial pressures, tribal communities maintained their festival traditions as acts of cultural resistance.",
    festivals: [
      {
        name: "Sohrai Festival",
        description: "Cattle worship festival featuring spectacular wall paintings and artistic expressions that preserved tribal art forms during colonial rule.",
        timing: "Kartik Amavasya (October-November)",
        rituals: ["Cattle decoration", "Wall painting (Sohrai art)", "Harvest celebrations", "Community feasts"],
        significance: "Preserved traditional art and strengthened cultural identity"
      },
      {
        name: "Banda Festival",
        description: "Hunting festival that maintained tribal connections to forest life and traditional survival skills despite colonial restrictions.",
        timing: "Winter Season (December-January)",
        rituals: ["Community hunting", "Forest offerings", "Sharing of hunt", "Tribal ceremonies"],
        significance: "Maintained traditional forest relationships and skills"
      }
    ],
    significance: "Cultural preservation and identity protection",
    icon: "🛡️",
    color: "from-purple-400 to-violet-600",
    bgGradient: "bg-gradient-to-br from-purple-50 to-violet-100"
  },
  {
    id: 4,
    period: "Post-Independence (1947-2000)",
    title: "Revival and Recognition",
    description: "Government recognition and support led to revival of traditional festivals and cultural practices.",
    festivals: [
      {
        name: "Tusu Festival",
        description: "Young women's festival celebrating the end of harvest season with beautiful songs, folk tales, and cultural performances.",
        timing: "Paush Month (December-January)",
        rituals: ["Tusu songs", "Folk storytelling", "Cultural competitions", "Community gatherings"],
        significance: "Empowered women's cultural participation and preserved oral traditions"
      },
      {
        name: "Jitiya Festival",
        description: "Mother's fasting festival for children's well-being that gained official recognition and state support during this period.",
        timing: "Ashwin Month (September-October)",
        rituals: ["Day-long fasting", "Evening prayers", "Community support", "Children's blessings"],
        significance: "Received governmental recognition and cultural support"
      }
    ],
    significance: "Official recognition and cultural revival",
    icon: "🎪",
    color: "from-orange-400 to-red-600",
    bgGradient: "bg-gradient-to-br from-orange-50 to-red-100"
  },
  {
    id: 5,
    period: "Modern Era (2000-Present)",
    title: "Global Celebration",
    description: "Traditional festivals gain international recognition while maintaining authentic cultural roots.",
    festivals: [
      {
        name: "Chauth Festival",
        description: "Moon worship festival that now attracts cultural tourists and international attention while preserving traditional rituals.",
        timing: "Kartik Month (October-November)",
        rituals: ["Moon worship", "Cultural performances", "Tourist participation", "Media coverage"],
        significance: "Achieved international recognition while maintaining authenticity"
      },
      {
        name: "Modern Cultural Programs",
        description: "Contemporary cultural festivals that blend traditional elements with modern presentation, attracting global audiences.",
        timing: "Year-round",
        rituals: ["Cultural exhibitions", "International participation", "Media documentation", "Tourism integration"],
        significance: "Globalized tribal culture while preserving core values"
      }
    ],
    significance: "Global recognition and cultural tourism",
    icon: "🌍",
    color: "from-emerald-400 to-teal-600",
    bgGradient: "bg-gradient-to-br from-emerald-50 to-teal-100"
  }
];

interface Festival {
  name: string;
  description: string;
  timing: string;
  rituals: string[];
  significance: string;
}

interface TimelinePeriod {
  id: number;
  period: string;
  title: string;
  description: string;
  festivals: Festival[];
  significance: string;
  icon: string;
  color: string;
  bgGradient: string;
}

export default function FestivalTimeline() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimelinePeriod | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePeriodClick = (period: TimelinePeriod) => {
    setSelectedPeriod(period);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPeriod(null), 300);
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <div className="space-y-8">
      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {timelineData.map((period) => (
          <Card 
            key={period.id}
            className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-105 transform perspective-1000"
            onClick={() => handlePeriodClick(period)}
          >
            <CardContent className="p-0 overflow-hidden">
              {/* Gradient Header */}
              <div className={`h-20 bg-gradient-to-r ${period.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                    {period.icon}
                  </div>
                </div>
                {/* Sparkle Effect */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="w-4 h-4 text-white/80" />
                </div>
              </div>

              <div className={`p-6 space-y-4 ${period.bgGradient}`}>
                {/* Period Badge */}
                <div className="text-center">
                  <Badge variant="outline" className="text-xs mb-2 bg-white/80 backdrop-blur-sm">
                    {period.period}
                  </Badge>
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                    {period.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm text-center leading-relaxed line-clamp-3">
                  {period.description}
                </p>

                {/* Festival Count */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-full">
                    <Calendar className="w-3 h-3 text-primary" />
                    <span className="text-xs font-medium text-gray-700">
                      {period.festivals.length} Festival{period.festivals.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                {/* Click Hint */}
                <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-xs text-gray-500 font-medium">Click to explore festivals →</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Interactive Modal */}
      {isModalOpen && selectedPeriod && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 zoom-in-95 duration-300">
            {/* Header */}
            <div className={`relative bg-gradient-to-r ${selectedPeriod.color} p-6 text-white overflow-hidden`}>
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{selectedPeriod.icon}</div>
                    <div>
                      <Badge variant="secondary" className="text-xs mb-2 bg-white/20 text-white border-white/30">
                        {selectedPeriod.period}
                      </Badge>
                      <h2 className="text-2xl font-bold">{selectedPeriod.title}</h2>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={closeModal}
                    className="text-white hover:bg-white/20 rounded-full w-10 h-10 p-0"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <p className="text-white/90 text-sm mt-3 max-w-3xl">
                  {selectedPeriod.description}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {selectedPeriod.festivals.map((festival, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 space-y-4">
                      {/* Festival Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors">
                            {festival.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600 font-medium">{festival.timing}</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center">
                            <Music className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                      </div>

                      {/* Festival Description */}
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {festival.description}
                      </p>

                      {/* Rituals */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-gray-800 flex items-center gap-2">
                          <Palette className="w-4 h-4" />
                          Key Rituals & Activities
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {festival.rituals.map((ritual, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs bg-gray-50 hover:bg-gray-100 transition-colors">
                              {ritual}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Significance */}
                      <div className="pt-3 border-t border-gray-100">
                        <div className="flex items-start gap-2">
                          <Heart className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-sm text-gray-800 mb-1">Cultural Significance</h4>
                            <p className="text-xs text-gray-600 leading-relaxed">{festival.significance}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Period Significance */}
              <Card className="mt-6 border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">Historical Impact</h3>
                      <p className="text-sm text-gray-600">Why this period matters</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold text-primary">{selectedPeriod.significance}.</span> This era
                    represents a crucial phase in Jharkhand's cultural evolution, where festivals served as vital
                    mechanisms for community bonding, cultural preservation, and identity formation. The traditions
                    established during this time continue to influence contemporary celebrations and maintain their
                    relevance in modern tribal society.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-4 bg-white/60 rounded-lg">
                      <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-semibold text-sm text-gray-800">Community Unity</h4>
                      <p className="text-xs text-gray-600">Strengthened tribal bonds</p>
                    </div>
                    <div className="text-center p-4 bg-white/60 rounded-lg">
                      <Palette className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-semibold text-sm text-gray-800">Cultural Arts</h4>
                      <p className="text-xs text-gray-600">Preserved traditional skills</p>
                    </div>
                    <div className="text-center p-4 bg-white/60 rounded-lg">
                      <MapPin className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-semibold text-sm text-gray-800">Legacy</h4>
                      <p className="text-xs text-gray-600">Lasting cultural impact</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
