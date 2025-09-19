import { NextRequest, NextResponse } from "next/server";

interface ItineraryRequest {
  duration: string;
  cities: string[];
  interests: string[];
  travelStyle: string;
  groupSize: string;
  budget: string;
  accommodation: string;
  transport: string;
  specialRequests: string;
}

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

export async function POST(request: NextRequest) {
  try {
    const formData: ItineraryRequest = await request.json();

    if (!formData.duration || !formData.cities || formData.cities.length === 0) {
      return NextResponse.json(
        { error: "Duration and cities are required" },
        { status: 400 }
      );
    }

    console.log('🚀 Generating dynamic itinerary for:', formData.cities.join(', '), formData.duration, 'days');

    // Generate dynamic content based on user preferences
    const itinerary = generateDynamicItinerary(formData);

    console.log('✅ Dynamic itinerary generated successfully');
    return NextResponse.json(itinerary);
  } catch (error) {
    console.error("❌ Itinerary API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate itinerary: " + error },
      { status: 500 }
    );
  }
}

function generateDynamicItinerary(formData: ItineraryRequest): ItineraryResponse {
  const days = parseInt(formData.duration);
  const cities = formData.cities;
  const interests = formData.interests;
  const isSoloFemale = formData.travelStyle === "solo-female";
  const isFamily = formData.travelStyle === "family";
  const isBudget = formData.budget === "budget";

  // Generate dynamic title
  let titleSuffix = "Jharkhand Experience";
  if (interests.includes("nature") && interests.includes("religious")) {
    titleSuffix = "Sacred Nature & Spiritual Journey";
  } else if (interests.includes("nature")) {
    titleSuffix = "Nature & Waterfall Adventure";
  } else if (interests.includes("religious")) {
    titleSuffix = "Spiritual Pilgrimage";
  } else if (interests.includes("tribal")) {
    titleSuffix = "Tribal Culture Discovery";
  }
  
  if (isSoloFemale) titleSuffix += " (Solo Female Friendly)";

  // Generate dynamic overview
  let overview = `Embark on a personalized ${days}-day journey through Jharkhand's `;
  const experienceTypes = [];
  if (interests.includes("nature")) experienceTypes.push("breathtaking waterfalls");
  if (interests.includes("religious")) experienceTypes.push("sacred temples");
  if (interests.includes("tribal")) experienceTypes.push("authentic tribal culture");
  
  overview += experienceTypes.length > 0 ? experienceTypes.join(" and ") : "diverse attractions";
  overview += ` across ${cities.join(" and ")}.`;
  
  if (isSoloFemale) {
    overview += " This itinerary prioritizes safety with women-friendly accommodations and well-lit destinations.";
  }
  
  if (formData.specialRequests) {
    overview += ` Special focus on: ${formData.specialRequests}.`;
  }

  // Generate day-by-day itinerary
  const dayItems = Array.from({ length: days }, (_, i) => {
    const dayNum = i + 1;
    const isFirst = dayNum === 1;
    const isLast = dayNum === days;
    
    let morning = "";
    let afternoon = "";
    let evening = "";
    
    if (isFirst) {
      if (interests.includes("nature") && cities.includes("Ranchi")) {
        morning = isSoloFemale 
          ? "Visit Hundru Falls - 98m waterfall with morning crowd for safety"
          : "Explore Hundru Falls - Marvel at the spectacular 98m cascade";
      } else if (interests.includes("religious") && cities.includes("Deoghar")) {
        morning = isSoloFemale
          ? "Baidyanath Dham darshan - Early morning visit for peaceful experience"
          : "Baidyanath Dham temple visit - Sacred Jyotirlinga darshan";
      } else {
        morning = `Explore ${cities[0]} city center and local attractions`;
      }
      
      afternoon = "Authentic Jharkhand lunch with local specialties like Litti Chokha";
      evening = isSoloFemale 
        ? "Sunset at safe, well-lit areas with local snacks"
        : "Evening at Ranchi Lake with boating and local culture";
    } else if (isLast) {
      morning = "Final sightseeing and cultural exploration";
      afternoon = "Shopping for tribal handicrafts and local souvenirs";
      evening = "Departure preparations and farewell to Jharkhand";
    } else {
      morning = "Continue exploring Jharkhand's natural and cultural attractions";
      afternoon = "Local cuisine experience and cultural immersion";
      evening = "Traditional performances or nature walks";
    }

    return {
      day: dayNum,
      title: isFirst ? "Arrival & Discovery" : 
            isLast ? "Cultural Immersion & Departure" :
            `Adventure Day ${dayNum}`,
      morning,
      afternoon,
      evening,
      transport: formData.transport === "private" ? "Private vehicle" : "Local transport"
    };
  });

  // Generate dynamic foods based on cities
  const foods = generateFoodsForCities(cities, interests.includes("tribal"), isBudget);
  
  // Generate dynamic markets based on cities
  const markets = generateMarketsForCities(cities, interests.includes("tribal"));
  
  // Generate dynamic experiences based on interests
  const experiences = generateExperiencesForInterests(interests, cities, isFamily);

  // Solo female safety features
  let safetyTips: string[] | undefined;
  let womenFriendlyPlaces: string[] | undefined;

  if (isSoloFemale) {
    safetyTips = [
      "Choose well-reviewed accommodations with 24/7 front desk service",
      "Share your itinerary with trusted friends or family members",
      "Keep emergency contacts easily accessible on your phone",
      "Use reputable ride-sharing apps or pre-booked taxis",
      "Visit tourist spots during daytime with good crowd presence",
      "Trust your instincts and avoid isolated areas after sunset",
      "Carry a charged power bank and keep phone battery full",
      "Dress modestly and respect local customs for comfortable travel"
    ];

    womenFriendlyPlaces = [
      "Hotel Radisson Blu, Ranchi - Women-safe accommodation with security",
      "Jagannath Temple, Ranchi - Well-maintained with good crowd",
      "Nakshatra Van, Ranchi - Family-friendly park environment",
      "City Centre Mall - Safe shopping with good security",
      "Main Road markets - Well-lit and crowded shopping areas"
    ];
  }

  return {
    title: `${days} Days in ${cities.join(" & ")} - ${titleSuffix}`,
    overview,
    days: dayItems,
    recommendations: {
      foods,
      markets,
      experiences,
      ...(safetyTips && { safetyTips }),
      ...(womenFriendlyPlaces && { womenFriendlyPlaces })
    },
    tips: {
      weather: "Best time: October to March. Monsoon (July-September) perfect for waterfalls.",
      customs: "Respect tribal customs, remove shoes in temples. Greet with 'Johar'! 🙏",
      budget: isBudget 
        ? "Budget tips: Use local transport, government guest houses, local eateries - save 40-50%"
        : "Mid-range accommodations recommended. Local guides ₹500-800/day",
      ...(isSoloFemale && { 
        safety: "Solo female travelers: Book verified accommodations, inform contacts, avoid late travel. Emergency: 112 📞" 
      })
    }
  };
}

function generateFoodsForCities(cities: string[], isTribal: boolean, isBudget: boolean): string[] {
  const cityFoods: { [key: string]: string[] } = {
    "Ranchi": [
      "Litti Chokha at Pantaloons Food Court - Traditional wheat balls with spiced vegetables",
      "Dhuska at local vendors - Crispy rice pancakes with chutneys"
    ],
    "Deoghar": [
      "Prasadam at Baidyanath Temple - Sacred blessed offerings",
      "Jalebi at Deoghar Main Market - Fresh sugar-soaked spirals"
    ],
    "Jamshedpur": [
      "Biryani at New Market - Fragrant rice with local spices",
      "Samosa at Sakchi Market - Crispy potato-filled pastries"
    ]
  };

  let foods: string[] = [];
  
  // Add city-specific foods
  cities.forEach(city => {
    if (cityFoods[city]) {
      foods.push(...cityFoods[city]);
    }
  });

  // Add tribal foods if interested
  if (isTribal) {
    foods.push("Rugra Curry - Wild mushrooms in tribal style");
    foods.push("Bamboo Shoot Curry - Traditional Santhal preparation");
  }

  // Add budget option if needed
  if (isBudget) {
    foods.push("Street Food Combo - Local snacks at ₹20-50");
  }

  // Ensure 5 foods
  const defaultFoods = [
    "Thekua - Traditional festival sweet",
    "Mitha Pua - Rice flour fritters with chai",
    "Tilkut - Sesame seed brittle"
  ];

  while (foods.length < 5) {
    foods.push(defaultFoods[foods.length % defaultFoods.length]);
  }

  return foods.slice(0, 5);
}

function generateMarketsForCities(cities: string[], isTribal: boolean): string[] {
  const cityMarkets: { [key: string]: string[] } = {
    "Ranchi": [
      "Main Road Market - Traditional Dokra art and tribal handicrafts",
      "Firayalal Market - Local spices and traditional jewelry"
    ],
    "Deoghar": [
      "Baidyanath Temple Market - Religious items and sacred books",
      "Tower Chowk Market - Local handicrafts and pilgrim souvenirs"
    ],
    "Jamshedpur": [
      "Sakchi Market - Tribal textiles and local products",
      "Bistupur Market - Commercial hub with handicrafts"
    ]
  };

  let markets: string[] = [];
  
  cities.forEach(city => {
    if (cityMarkets[city]) {
      markets.push(...cityMarkets[city]);
    }
  });

  if (isTribal) {
    markets.push("Weekly Tribal Haats - Authentic tribal products and crafts");
  }

  // Ensure 3 markets
  while (markets.length < 3) {
    markets.push("Local Handicraft Centers - Government-supported authentic shops");
  }

  return markets.slice(0, 3);
}

function generateExperiencesForInterests(interests: string[], cities: string[], isFamily: boolean): string[] {
  const experiences: string[] = [];

  if (interests.includes("nature")) {
    if (cities.includes("Ranchi")) {
      experiences.push("Hundru Falls Photography & Nature Walk - 98m waterfall exploration");
    }
    experiences.push("Sunrise at Parasnath Hill - Trek to Jharkhand's highest peak");
  }

  if (interests.includes("religious")) {
    if (cities.includes("Deoghar")) {
      experiences.push("Baidyanath Dham Aarti - Evening prayers at Jyotirlinga temple");
    }
    experiences.push("Temple Hopping Tour - Ancient temples with priest guidance");
  }

  if (interests.includes("tribal")) {
    experiences.push("Santhal Village Immersion - Stay with tribal families");
    experiences.push("Tribal Art Workshop - Learn Dokra casting and Sohrai painting");
  }

  if (isFamily) {
    experiences.push("Jharkhand Folk Dance Show - Jhumur and Chhau performances");
  }

  // Default experiences
  const defaultExperiences = [
    "Local Market Food Tour - Guided culinary exploration",
    "Heritage Walk - Colonial architecture and history tour",
    "Traditional Music Session - Local instruments and folk songs"
  ];

  while (experiences.length < 3) {
    experiences.push(defaultExperiences[experiences.length % defaultExperiences.length]);
  }

  return experiences.slice(0, 3);
}