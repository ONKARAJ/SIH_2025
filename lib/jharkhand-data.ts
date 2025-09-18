// Comprehensive Jharkhand Tourism Data

export const jharkhnadCities = [
  { 
    name: "Ranchi", 
    description: "Capital city with waterfalls and lakes", 
    highlights: ["Hundru Falls", "Dassam Falls", "Ranchi Lake", "Jagannath Temple"],
    bestFor: ["nature", "religious", "city-experience"]
  },
  { 
    name: "Jamshedpur", 
    description: "Steel city with modern amenities", 
    highlights: ["Jubilee Park", "Tata Steel Zoological Park", "Dalma Wildlife Sanctuary"],
    bestFor: ["urban", "wildlife", "industrial-heritage"]
  },
  { 
    name: "Deoghar", 
    description: "Spiritual hub with Baidyanath Temple", 
    highlights: ["Baidyanath Dham", "Naulakha Mandir", "Basukinath Temple"],
    bestFor: ["religious", "spiritual", "pilgrimage"]
  },
  { 
    name: "Dhanbad", 
    description: "Coal capital with scenic surroundings", 
    highlights: ["Maithon Dam", "Kalyaneshwari Temple", "Topchanchi Lake"],
    bestFor: ["nature", "lakes", "heritage"]
  },
  { 
    name: "Bokaro", 
    description: "Steel city with parks and lakes", 
    highlights: ["City Park", "Bokaro Steel Plant", "Garga Dam"],
    bestFor: ["urban", "industrial", "family"]
  },
  { 
    name: "Hazaribagh", 
    description: "Hill station with wildlife sanctuary", 
    highlights: ["Hazaribagh National Park", "Canary Hill", "Konar Dam"],
    bestFor: ["wildlife", "nature", "hill-station"]
  },
  { 
    name: "Giridih", 
    description: "Home to Parasnath Hill", 
    highlights: ["Parasnath Hill", "Jain Temples", "Usri Falls"],
    bestFor: ["trekking", "religious", "adventure"]
  }
];

export const majorAttractions = {
  waterfalls: [
    { 
      name: "Hundru Falls", 
      height: "320 feet", 
      location: "Ranchi", 
      bestTime: "Monsoon to Winter",
      description: "Spectacular waterfall formed by river Subarnarekha"
    },
    { 
      name: "Dassam Falls", 
      height: "144 feet", 
      location: "Ranchi", 
      bestTime: "July to February",
      description: "Also known as Dassam Ghagh, perfect for photography"
    },
    { 
      name: "Jonha Falls", 
      height: "140 feet", 
      location: "Ranchi", 
      bestTime: "Monsoon season",
      description: "Also called Gautamdhara, accessible via steps"
    },
    { 
      name: "Hirni Falls", 
      height: "120 feet", 
      location: "Ranchi", 
      bestTime: "Post-monsoon",
      description: "Secluded waterfall ideal for nature lovers"
    }
  ],
  
  temples: [
    { 
      name: "Baidyanath Dham", 
      location: "Deoghar", 
      significance: "One of 12 Jyotirlingas",
      festivals: ["Shravan Mela", "Maha Shivratri"]
    },
    { 
      name: "Jagannath Temple", 
      location: "Ranchi", 
      significance: "Replica of Puri Jagannath Temple",
      festivals: ["Rath Yatra", "Jagannath Puri Festival"]
    },
    { 
      name: "Parasnath Temple", 
      location: "Giridih", 
      significance: "Jain pilgrimage site",
      elevation: "4,431 feet"
    }
  ],

  nationalParks: [
    { 
      name: "Betla National Park", 
      location: "Latehar", 
      area: "979 sq km",
      wildlife: ["Tigers", "Elephants", "Leopards", "Sloth Bears"],
      activities: ["Wildlife Safari", "Bird Watching", "Nature Walks"]
    },
    { 
      name: "Hazaribagh National Park", 
      location: "Hazaribagh", 
      area: "186 sq km",
      wildlife: ["Sambar", "Cheetal", "Wild Boar", "Nilgai"],
      activities: ["Safari", "Trekking", "Photography"]
    }
  ]
};

export const localCuisine = [
  { 
    name: "Litti Chokha", 
    description: "Traditional roasted wheat balls with spiced mashed vegetables",
    type: "Main Course",
    occasions: "Daily meal, festivals"
  },
  { 
    name: "Dhuska", 
    description: "Deep-fried rice and black gram pancakes",
    type: "Snack",
    servingTime: "Evening snack with tea"
  },
  { 
    name: "Mitha Pua", 
    description: "Sweet rice flour fritters",
    type: "Dessert",
    occasions: "Festivals, celebrations"
  },
  { 
    name: "Thekua", 
    description: "Crunchy sweet snacks made with wheat flour and jaggery",
    type: "Sweet Snack",
    occasions: "Chhath Puja, festivals"
  },
  { 
    name: "Pittha", 
    description: "Steamed rice dumplings with coconut and jaggery",
    type: "Dessert",
    occasions: "Special occasions"
  },
  { 
    name: "Chilka Roti", 
    description: "Thin rice flour bread",
    type: "Bread",
    servingTime: "Breakfast, dinner"
  },
  { 
    name: "Arsa Roti", 
    description: "Sweet rice pancake",
    type: "Dessert",
    occasions: "Festivities"
  }
];

export const festivals = [
  { 
    name: "Sohrai", 
    season: "Autumn/Winter", 
    significance: "Harvest festival celebrating cattle",
    activities: ["Wall paintings", "Folk dances", "Cattle decoration"],
    regions: ["Hazaribagh", "Ranchi", "Rural areas"]
  },
  { 
    name: "Sarhul", 
    season: "Spring", 
    significance: "Worship of nature and Sal trees",
    activities: ["Sal flower offerings", "Traditional dances", "Community feasts"],
    regions: ["Tribal areas across Jharkhand"]
  },
  { 
    name: "Karma", 
    season: "Monsoon", 
    significance: "Worshipping Karma tree for prosperity",
    activities: ["Karma dance", "Folk songs", "Tree worship"],
    regions: ["Central and Eastern Jharkhand"]
  },
  { 
    name: "Tusu", 
    season: "Winter", 
    significance: "Harvest festival by Kurmali community",
    activities: ["Tusu idol making", "Folk songs", "Community celebrations"],
    regions: ["Dhanbad", "Bokaro", "Giridih"]
  }
];

export const tribalCommunities = [
  { 
    name: "Santhal", 
    population: "Largest tribal group",
    language: "Santhali",
    crafts: ["Dokra metal work", "Traditional paintings"],
    dances: ["Jhumur", "Lagre"]
  },
  { 
    name: "Munda", 
    significance: "Known for their leadership in tribal movements",
    language: "Mundari",
    crafts: ["Bamboo crafts", "Traditional textiles"],
    dances: ["Munda dance", "Jadur"]
  },
  { 
    name: "Ho", 
    region: "Singbhum district",
    language: "Ho",
    crafts: ["Metal crafts", "Traditional jewelry"],
    dances: ["Ho dance", "Japi"]
  }
];

export const accommodationTypes = {
  luxury: {
    price: "₹4000-8000/night",
    amenities: ["AC", "Restaurant", "Room Service", "WiFi", "Spa"],
    locations: ["Ranchi", "Jamshedpur", "Deoghar"]
  },
  midRange: {
    price: "₹1500-4000/night",
    amenities: ["AC/Non-AC", "Restaurant", "WiFi", "Parking"],
    locations: ["Most cities", "Tourist spots"]
  },
  budget: {
    price: "₹500-1500/night",
    amenities: ["Basic rooms", "Shared facilities", "Local food"],
    locations: ["All cities", "Tourist areas", "Government guest houses"]
  },
  homestays: {
    price: "₹800-2500/night",
    amenities: ["Home-cooked meals", "Cultural experience", "Local guidance"],
    locations: ["Rural areas", "Tribal villages", "Hill stations"]
  }
};

export const transportOptions = {
  byAir: {
    airports: ["Birsa Munda Airport (Ranchi)", "Sonari Airport (Jamshedpur)"],
    connectivity: "Connected to major Indian cities"
  },
  byRail: {
    mainStations: ["Ranchi", "Jamshedpur", "Dhanbad", "Deoghar"],
    connectivity: "Well connected to Delhi, Kolkata, Mumbai"
  },
  byRoad: {
    highways: ["NH-33", "NH-23", "NH-100"],
    buses: ["State transport", "Private operators", "Volvo services"]
  },
  localTransport: {
    options: ["Auto-rickshaws", "Taxis", "Local buses", "Shared cabs"],
    costs: "₹10-500 depending on distance"
  }
};

export const seasonalGuide = {
  winter: {
    months: "November to February",
    weather: "Pleasant and cool (10-25°C)",
    bestFor: ["Sightseeing", "Waterfalls", "Festivals", "Trekking"],
    clothing: "Light woolens required"
  },
  summer: {
    months: "March to June", 
    weather: "Warm to hot (25-40°C)",
    bestFor: ["Hill stations", "Indoor activities", "Early morning visits"],
    clothing: "Light cotton clothes"
  },
  monsoon: {
    months: "July to October",
    weather: "Rainy and humid (20-35°C)",
    bestFor: ["Waterfalls", "Greenery", "Photography"],
    precautions: "Carry rain gear, check road conditions"
  }
};

export const budgetGuide = {
  budget: {
    dailyBudget: "₹1000-2000",
    accommodation: "Government guest houses, budget hotels",
    food: "Local dhabas, street food",
    transport: "State buses, shared transport",
    tips: "Book government accommodations in advance"
  },
  midRange: {
    dailyBudget: "₹2500-4500",
    accommodation: "3-star hotels, good homestays",
    food: "Hotel restaurants, local specialties",
    transport: "Private taxis, AC buses",
    tips: "Pre-book hotels during peak season"
  },
  luxury: {
    dailyBudget: "₹5000+",
    accommodation: "4-5 star hotels, luxury resorts",
    food: "Fine dining, hotel restaurants",
    transport: "Private cars with drivers",
    tips: "Book helicopter rides for scenic views"
  }
};

// Helper function to get recommendations based on interests
export function getRecommendationsByInterest(interests: string[]) {
  const recommendations = {
    nature: {
      places: ["Hundru Falls", "Netarhat Hill Station", "Betla National Park"],
      activities: ["Waterfall photography", "Bird watching", "Nature walks"],
      foods: ["Litti Chokha at scenic spots", "Local chai at viewpoints"]
    },
    religious: {
      places: ["Baidyanath Dham", "Jagannath Temple", "Parasnath Hill"],
      activities: ["Temple visits", "Spiritual walks", "Festival participation"],
      foods: ["Prasad", "Temple food", "Vegetarian meals"]
    },
    adventure: {
      places: ["Parasnath Hill", "Netarhat", "Betla National Park"],
      activities: ["Trekking", "Rock climbing", "Wildlife safari"],
      foods: ["High-energy snacks", "Local tribal cuisine"]
    },
    cultural: {
      places: ["Tribal villages", "Local markets", "Cultural centers"],
      activities: ["Village visits", "Handicraft workshops", "Folk dance shows"],
      foods: ["Traditional tribal meals", "Festival foods"]
    }
  };

  return interests.map(interest => recommendations[interest as keyof typeof recommendations] || {}).filter(Boolean);
}