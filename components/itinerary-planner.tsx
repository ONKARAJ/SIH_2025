"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, MapPin, Clock, Utensils, Camera, Heart, Users, Wallet, Sparkles } from "lucide-react";

// Jharkhand-specific data
const cities = [
  "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", 
  "Giridih", "Daltonganj", "Phusro", "Adityapur", "Chaibasa", "Dumka",
  "Godda", "Gumla", "Lohardaga", "Pakur", "Ramgarh", "Sahibganj"
];

const interests = [
  { id: "nature", label: "Nature & Waterfalls", icon: "🌊" },
  { id: "history", label: "History & Heritage", icon: "🏛️" },
  { id: "adventure", label: "Adventure Sports", icon: "🏕️" },
  { id: "religious", label: "Religious Tourism", icon: "🕉️" },
  { id: "food", label: "Food & Culture", icon: "🍽️" },
  { id: "shopping", label: "Shopping & Handicrafts", icon: "🛍️" },
  { id: "wildlife", label: "Wildlife & Nature", icon: "🦌" },
  { id: "tribal", label: "Tribal Culture", icon: "🎭" },
];

const travelStyles = [
  { id: "family", label: "Family Trip", icon: "👨‍👩‍👧‍👦" },
  { id: "solo", label: "Solo Travel", icon: "🚶" },
  { id: "couple", label: "Couple Getaway", icon: "💑" },
  { id: "friends", label: "Friends Group", icon: "👥" },
  { id: "luxury", label: "Luxury Experience", icon: "✨" },
  { id: "budget", label: "Budget Friendly", icon: "💰" },
  { id: "backpacking", label: "Backpacking", icon: "🎒" },
];

interface ItineraryResponse {
  title: string;
  overview: string;
  days: Array<{
    day: number;
    title: string;
    morning: string;
    afternoon: string;
    evening: string;
    transport?: string;
  }>;
  recommendations: {
    foods: string[];
    markets: string[];
    experiences: string[];
  };
  tips: {
    weather: string;
    customs: string;
    budget: string;
  };
}

export function ItineraryPlanner() {
  const [formData, setFormData] = useState({
    duration: "",
    cities: [] as string[],
    interests: [] as string[],
    travelStyle: "",
    groupSize: "",
    budget: "",
    accommodation: "",
    transport: "",
    specialRequests: "",
  });

  const [itinerary, setItinerary] = useState<ItineraryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInterestChange = (interestId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interestId]
        : prev.interests.filter(id => id !== interestId)
    }));
  };

  const handleCityChange = (city: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      cities: checked 
        ? [...prev.cities, city]
        : prev.cities.filter(c => c !== city)
    }));
  };

  const generateItinerary = async () => {
    if (!formData.duration || formData.cities.length === 0 || formData.interests.length === 0) {
      alert("Please fill in duration, select at least one city, and choose your interests.");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call - In real implementation, this would call an AI service
    setTimeout(() => {
      const sampleItinerary: ItineraryResponse = {
        title: `${formData.duration} Days in ${formData.cities.join(" & ")} – ${
          formData.interests.includes("nature") ? "Nature & Culture" : 
          formData.interests.includes("religious") ? "Spiritual Journey" :
          "Complete"
        } Experience`,
        overview: `A perfect ${formData.travelStyle === "family" ? "family-friendly" : formData.travelStyle} blend of ${
          formData.interests.includes("nature") ? "waterfalls, temples, and city vibes" :
          formData.interests.includes("history") ? "ancient heritage and cultural exploration" :
          "diverse experiences across Jharkhand's highlights"
        }.`,
        days: Array.from({ length: parseInt(formData.duration) }, (_, i) => ({
          day: i + 1,
          title: i === 0 ? "Arrival & City Exploration" : 
                i === parseInt(formData.duration) - 1 ? "Cultural Immersion & Departure" :
                `Adventure & Discovery Day ${i + 1}`,
          morning: formData.interests.includes("nature") && i === 0 ? 
            "Visit Hundru Falls (9:00 AM) - Experience the 320-foot cascade surrounded by rocky cliffs" :
            formData.interests.includes("religious") && formData.cities.includes("Deoghar") ?
            "Darshan at Baidyanath Dham (6:00 AM) - One of the 12 Jyotirlingas, perfect for morning prayers" :
            `Morning sightseeing in ${formData.cities[0]} - Explore local attractions and scenic spots`,
          afternoon: "Enjoy authentic litti chokha at a traditional local eatery - Yeh jagah zaroor dekhni chahiye! Try local specialties like dhuska and pua",
          evening: i === 0 ? "Sunset at Ranchi Lake with boating - Perfect for family photos and relaxation" :
            i === parseInt(formData.duration) - 1 ? "Local shopping at Main Road market - Buy Dokra art and tribal handicrafts" :
            "Evening cultural program or nature walk - Experience local traditions",
          transport: formData.transport === "private" ? "Private vehicle with local guide" : "Local transport available"
        })),
        recommendations: {
          foods: [
            "Litti Chokha - Traditional roasted wheat balls with spiced mashed vegetables",
            "Dhuska - Deep-fried rice and black gram pancakes", 
            "Mitha Pua - Sweet rice flour fritters perfect with evening chai",
            "Thekua - Crunchy sweet snacks made during festivals",
            "Local chai stalls - Experience authentic flavors"
          ],
          markets: [
            "Main Road Market, Ranchi - Tribal handicrafts and Dokra art",
            "Sakchi Market, Jamshedpur - Local textiles and souvenirs",
            "Local weekly haats - Authentic tribal products and vegetables"
          ],
          experiences: [
            "Tribal village visit - Learn about Santhal, Munda, and Ho cultures",
            "Waterfall photography - Best during monsoon season",
            "Traditional dance performances - Jhumur and Chhau dance forms"
          ]
        },
        tips: {
          weather: "Best time to visit is October to March. Monsoon season (July-September) is perfect for waterfalls but carry rain gear.",
          customs: "Respect tribal customs and photography permissions. Remove shoes before entering temples. Jharkhand mein aapka swagat hai! 🙏",
          budget: formData.budget === "budget" ? 
            "Budget tip: Use local buses, stay in government guest houses, eat at local dhabas - save 40-50% on expenses" :
            "Mid-range accommodations and private transport recommended for comfort. Local guides cost ₹500-800 per day"
        }
      };

      setItinerary(sampleItinerary);
      setIsLoading(false);
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      duration: "",
      cities: [],
      interests: [],
      travelStyle: "",
      groupSize: "",
      budget: "",
      accommodation: "",
      transport: "",
      specialRequests: "",
    });
    setItinerary(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Sparkles className="h-8 w-8 text-orange-500" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            AI Travel Planner
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Create your personalized Jharkhand itinerary with our AI-powered planner. 
          Tell us your preferences and get a detailed day-by-day travel plan!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Plan Your Journey</span>
            </CardTitle>
            <CardDescription>
              Share your travel preferences and let our AI create the perfect itinerary for you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-sm font-medium">
                Trip Duration (Days) *
              </Label>
              <Select value={formData.duration} onValueChange={(value) => setFormData(prev => ({...prev, duration: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({length: 10}, (_, i) => i + 1).map(day => (
                    <SelectItem key={day} value={day.toString()}>{day} {day === 1 ? 'Day' : 'Days'}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Cities */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Preferred Cities *</Label>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {cities.map(city => (
                  <div key={city} className="flex items-center space-x-2">
                    <Checkbox
                      id={city}
                      checked={formData.cities.includes(city)}
                      onCheckedChange={(checked) => handleCityChange(city, checked as boolean)}
                    />
                    <Label htmlFor={city} className="text-sm">{city}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Your Interests *</Label>
              <div className="grid grid-cols-1 gap-2">
                {interests.map(interest => (
                  <div key={interest.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
                    <Checkbox
                      id={interest.id}
                      checked={formData.interests.includes(interest.id)}
                      onCheckedChange={(checked) => handleInterestChange(interest.id, checked as boolean)}
                    />
                    <span className="text-lg">{interest.icon}</span>
                    <Label htmlFor={interest.id} className="text-sm font-medium">{interest.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Style */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Travel Style</Label>
              <div className="grid grid-cols-2 gap-2">
                {travelStyles.map(style => (
                  <div
                    key={style.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all hover:border-primary ${
                      formData.travelStyle === style.id ? 'border-primary bg-primary/5' : 'border-muted'
                    }`}
                    onClick={() => setFormData(prev => ({...prev, travelStyle: style.id}))}
                  >
                    <div className="text-center space-y-1">
                      <div className="text-lg">{style.icon}</div>
                      <div className="text-xs font-medium">{style.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Options */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Budget Range</Label>
                <Select value={formData.budget} onValueChange={(value) => setFormData(prev => ({...prev, budget: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">Budget (₹1000-2000/day)</SelectItem>
                    <SelectItem value="mid">Mid-range (₹2000-4000/day)</SelectItem>
                    <SelectItem value="luxury">Luxury (₹4000+/day)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Group Size</Label>
                <Select value={formData.groupSize} onValueChange={(value) => setFormData(prev => ({...prev, groupSize: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Group size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Solo (1 person)</SelectItem>
                    <SelectItem value="2">Couple (2 people)</SelectItem>
                    <SelectItem value="3-4">Small group (3-4)</SelectItem>
                    <SelectItem value="5+">Large group (5+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Special Requests */}
            <div className="space-y-2">
              <Label htmlFor="special" className="text-sm font-medium">Special Requests</Label>
              <Textarea
                id="special"
                placeholder="Any specific preferences, dietary requirements, or accessibility needs..."
                value={formData.specialRequests}
                onChange={(e) => setFormData(prev => ({...prev, specialRequests: e.target.value}))}
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                onClick={generateItinerary}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Your Plan...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Itinerary
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          {isLoading && (
            <Card>
              <CardContent className="flex items-center justify-center p-8">
                <div className="text-center space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                  <div>
                    <p className="font-medium">Creating your perfect itinerary...</p>
                    <p className="text-sm text-muted-foreground">Analyzing Jharkhand's best experiences for you</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {itinerary && (
            <div className="space-y-6">
              {/* Title & Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{itinerary.title}</CardTitle>
                  <CardDescription className="text-base">{itinerary.overview}</CardDescription>
                </CardHeader>
              </Card>

              {/* Day-wise Plan */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Day-by-Day Itinerary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {itinerary.days.map((day, index) => (
                    <div key={day.day} className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-sm">
                          Day {day.day}
                        </Badge>
                        <h4 className="font-semibold">{day.title}</h4>
                      </div>
                      <div className="pl-4 space-y-2 text-sm">
                        <div className="flex items-start space-x-2">
                          <span className="font-medium text-orange-600 min-w-[70px]">Morning:</span>
                          <span>{day.morning}</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <span className="font-medium text-blue-600 min-w-[70px]">Afternoon:</span>
                          <span>{day.afternoon}</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <span className="font-medium text-purple-600 min-w-[70px]">Evening:</span>
                          <span>{day.evening}</span>
                        </div>
                        {day.transport && (
                          <div className="flex items-start space-x-2">
                            <span className="font-medium text-green-600 min-w-[70px]">Transport:</span>
                            <span>{day.transport}</span>
                          </div>
                        )}
                      </div>
                      {index < itinerary.days.length - 1 && <Separator />}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center space-x-2">
                      <Utensils className="h-4 w-4" />
                      <span>Must-Try Foods</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {itinerary.recommendations.foods.map((food, index) => (
                      <div key={index} className="text-sm text-muted-foreground">
                        • {food}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>Local Markets</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {itinerary.recommendations.markets.map((market, index) => (
                      <div key={index} className="text-sm text-muted-foreground">
                        • {market}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center space-x-2">
                      <Camera className="h-4 w-4" />
                      <span>Unique Experiences</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {itinerary.recommendations.experiences.map((exp, index) => (
                      <div key={index} className="text-sm text-muted-foreground">
                        • {exp}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Travel Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5" />
                    <span>Travel Tips</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h5 className="font-medium text-sm text-orange-600 mb-1">Weather & Best Time</h5>
                    <p className="text-sm text-muted-foreground">{itinerary.tips.weather}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm text-blue-600 mb-1">Local Customs</h5>
                    <p className="text-sm text-muted-foreground">{itinerary.tips.customs}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm text-green-600 mb-1">Budget Tips</h5>
                    <p className="text-sm text-muted-foreground">{itinerary.tips.budget}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Footer Message */}
              <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
                <CardContent className="text-center p-6">
                  <p className="text-lg font-medium text-orange-800 mb-2">
                    Safe travels! ✈️ Jharkhand mein aapka swagat hai 🙏
                  </p>
                  <p className="text-sm text-orange-700">
                    Your personalized itinerary is ready! Book your accommodations and start your amazing journey.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}