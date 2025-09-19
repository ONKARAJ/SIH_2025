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
import { Loader2, MapPin, Clock, Utensils, Camera, Heart, Users, Wallet, Sparkles, Shield, User, AlertCircle } from "lucide-react";

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
  { id: "solo-female", label: "Solo Female", icon: "👩" },
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
    safetyTips?: string[];
    womenFriendlyPlaces?: string[];
  };
  tips: {
    weather: string;
    customs: string;
    budget: string;
    safety?: string;
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
    
    try {
      // Call the AI-powered itinerary API
      const response = await fetch('/api/itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate itinerary');
      }

      const aiGeneratedItinerary: ItineraryResponse = await response.json();
      setItinerary(aiGeneratedItinerary);
    } catch (error) {
      console.error('Error generating itinerary:', error);
      // Fallback to a basic error message
      alert('Sorry, there was an issue generating your itinerary. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
                    className={`p-3 rounded-lg border cursor-pointer transition-all hover:border-primary relative ${
                      formData.travelStyle === style.id ? 'border-primary bg-primary/5' : 'border-muted'
                    } ${
                      style.id === 'solo-female' ? 'border-purple-200 hover:border-purple-400' : ''
                    }`}
                    onClick={() => setFormData(prev => ({...prev, travelStyle: style.id}))}
                  >
                    <div className="text-center space-y-1">
                      <div className="text-lg">{style.icon}</div>
                      <div className="text-xs font-medium">{style.label}</div>
                      {style.id === 'solo-female' && (
                        <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700 hover:bg-purple-200">
                          <Shield className="h-2 w-2 mr-1" />
                          Safe
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Solo Female Traveler Info */}
            {formData.travelStyle === "solo-female" && (
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-purple-800 mb-2">Solo Female Travel - Safety First! 💜</h4>
                      <p className="text-sm text-purple-700 mb-2">
                        Your itinerary will include safety-conscious timing, well-reviewed accommodations, and women-friendly locations. We prioritize your security while ensuring you experience Jharkhand's beauty.
                      </p>
                      <div className="flex items-center text-xs text-purple-600">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        <span>Emergency helpline: 112 | Women Helpline: 1091</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

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

              {/* Safety Recommendations for Solo Female Travelers */}
              {itinerary.recommendations.safetyTips && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-lg font-semibold text-purple-600">
                    <Shield className="h-5 w-5" />
                    <span>Safety Recommendations for Solo Female Travelers</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-purple-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center space-x-2 text-purple-600">
                          <AlertCircle className="h-4 w-4" />
                          <span>Essential Safety Tips</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {itinerary.recommendations.safetyTips.map((tip, index) => (
                          <div key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                            <span className="text-purple-500 mt-1 text-xs">✓</span>
                            <span>{tip}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card className="border-green-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center space-x-2 text-green-600">
                          <User className="h-4 w-4" />
                          <span>Women-Friendly Places</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {itinerary.recommendations.womenFriendlyPlaces?.map((place, index) => (
                          <div key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                            <span className="text-green-500 mt-1 text-xs">✓</span>
                            <span>{place}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

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
                  {itinerary.tips.safety && (
                    <div>
                      <h5 className="font-medium text-sm text-purple-600 mb-1 flex items-center space-x-1">
                        <Shield className="h-3 w-3" />
                        <span>Safety Guidelines</span>
                      </h5>
                      <p className="text-sm text-muted-foreground">{itinerary.tips.safety}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Footer Message */}
              <Card className={`bg-gradient-to-r ${formData.travelStyle === "solo-female" ? "from-purple-50 to-pink-50 border-purple-200" : "from-orange-50 to-red-50 border-orange-200"}`}>
                <CardContent className="text-center p-6">
                  <p className={`text-lg font-medium mb-2 ${
                    formData.travelStyle === "solo-female" ? "text-purple-800" : "text-orange-800"
                  }`}>
                    {formData.travelStyle === "solo-female" ? 
                      "Safe & empowering travels! ✈️ You've got this, sister! 💪 Jharkhand mein aapka swagat hai 🙏" :
                      "Safe travels! ✈️ Jharkhand mein aapka swagat hai 🙏"
                    }
                  </p>
                  <p className={`text-sm ${
                    formData.travelStyle === "solo-female" ? "text-purple-700" : "text-orange-700"
                  }`}>
                    {formData.travelStyle === "solo-female" ? 
                      "Your safety-conscious itinerary is ready! Remember to inform someone about your plans, trust your instincts, and enjoy every moment of your solo adventure." :
                      "Your personalized itinerary is ready! Book your accommodations and start your amazing journey."
                    }
                  </p>
                  {formData.travelStyle === "solo-female" && (
                    <div className="mt-3 flex items-center justify-center space-x-1 text-xs text-purple-600">
                      <Shield className="h-3 w-3" />
                      <span>24/7 Emergency: 112 | Women Helpline: 1091</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}