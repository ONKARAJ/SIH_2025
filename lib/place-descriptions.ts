// Detailed place descriptions for popup functionality
export interface PlaceDescription {
  name: string;
  category: string;
  rating: number;
  location: string;
  description: string;
  detailedDescription: string;
  highlights: string[];
  bestTimeToVisit: string;
  howToReach: string;
  nearbyAttractions: string[];
  activities: string[];
  tips: string[];
  images: string[];
  hasPage: boolean; // Whether it has a dedicated page
  pageRoute?: string; // Route to dedicated page if it exists
}

export const placeDescriptions: { [key: string]: PlaceDescription } = {
  "Betla National Park": {
    name: "Betla National Park",
    category: "National Park",
    rating: 4.5,
    location: "Palamu district, Jharkhand",
    description: "First national park of Jharkhand with tigers and elephants",
    detailedDescription: "Betla National Park, established in 1989, is Jharkhand's first national park and a prime wildlife sanctuary. Spanning over 979 square kilometers, it's part of the Palamu Tiger Reserve and is renowned for its diverse flora and fauna. The park is home to tigers, elephants, leopards, sloth bears, and over 180 bird species. The landscape features dense sal forests, grasslands, and the scenic Koel River flowing through it.",
    highlights: [
      "Part of Palamu Tiger Reserve",
      "Home to Royal Bengal Tigers",
      "Asian Elephants habitat", 
      "Over 180 bird species",
      "Historic Betla Fort within park",
      "Dense Sal forests",
      "Koel River ecosystem"
    ],
    bestTimeToVisit: "October to May (avoid monsoons July-September)",
    howToReach: "Nearest town is Daltonganj (25 km). Fly to Ranchi (170 km) then drive. Direct buses available from major cities.",
    nearbyAttractions: [
      "Betla Fort (historic fort within park)",
      "Kechki village (tribal heritage)",
      "Lodh Falls (35 km away)",
      "Palamau Fort ruins"
    ],
    activities: [
      "Wildlife Safari",
      "Bird watching",
      "Photography",
      "Nature walks",
      "Tribal village visits",
      "Fort exploration"
    ],
    tips: [
      "Book safari in advance during peak season",
      "Carry binoculars for wildlife viewing", 
      "Wear neutral colored clothing",
      "Stay quiet during safari",
      "Follow park rules strictly"
    ],
    images: [
      "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
    ],
    hasPage: true,
    pageRoute: "/national-park"
  },

  "Netarhat Hill Station": {
    name: "Netarhat Hill Station",
    category: "Hill Station", 
    rating: 4.6,
    location: "Latehar district, Jharkhand",
    description: "Queen of Chotanagpur with spectacular sunrise views",
    detailedDescription: "Netarhat, fondly called the 'Queen of Chotanagpur', is a picturesque hill station situated at an elevation of 1,128 meters. Famous for its breathtaking sunrise and sunset views, rolling hills, dense forests, and pleasant climate year-round. The hill station offers panoramic views of the surrounding valleys and is perfect for those seeking tranquility away from city life. Colonial-era buildings and the famous Netarhat Residential School add to its charm.",
    highlights: [
      "Spectacular sunrise and sunset views",
      "1,128 meters elevation",
      "Pleasant climate year-round", 
      "Colonial architecture",
      "Dense forest surroundings",
      "Panoramic valley views",
      "Historic Netarhat School"
    ],
    bestTimeToVisit: "October to March (pleasant weather), April-May for summer retreat",
    howToReach: "120 km from Ranchi by road. Regular buses and taxis available. Nearest railway station is Latehar (25 km).",
    nearbyAttractions: [
      "Lower Ghaghri Falls",
      "Upper Ghaghri Falls", 
      "Patratu Valley",
      "Lodh Falls (40 km)",
      "Hundru Falls (140 km)"
    ],
    activities: [
      "Sunrise/sunset viewing",
      "Photography",
      "Nature walks",
      "Trekking",
      "Sightseeing",
      "Picnicking",
      "Forest exploration"
    ],
    tips: [
      "Wake up early for sunrise views",
      "Carry warm clothes (gets cold at night)",
      "Book accommodation in advance",
      "Try local tribal cuisine",
      "Respect the peaceful environment"
    ],
    images: [
      "https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
    ],
    hasPage: true,
    pageRoute: "/hill-station"
  },

  "Baidyanath Dham": {
    name: "Baidyanath Dham",
    category: "Religious Site",
    rating: 4.7,
    location: "Deoghar, Jharkhand", 
    description: "One of the 12 Jyotirlingas, major pilgrimage site",
    detailedDescription: "Baidyanath Dham, also known as Baba Baidyanath Temple, is one of the twelve sacred Jyotirlingas of Lord Shiva. Located in Deoghar, it's one of the most revered pilgrimage sites in India. The temple complex houses the main Jyotirlinga along with 21 other temples. During the holy month of Shravan, millions of devotees undertake the sacred journey carrying holy water from the Ganges River to offer to the deity. The temple's architecture reflects ancient Indian craftsmanship.",
    highlights: [
      "One of 12 sacred Jyotirlingas",
      "Ancient temple complex",
      "21 temples in the complex",
      "Major pilgrimage destination",
      "Shravan month festivities",
      "Traditional architecture",
      "Spiritual significance"
    ],
    bestTimeToVisit: "October to March (pleasant weather), Shravan month (July-August) for festivals",
    howToReach: "Deoghar has airport and railway connectivity. 250 km from Ranchi, 280 km from Patna. Well connected by road.",
    nearbyAttractions: [
      "Basukinath Temple (43 km)",
      "Trikuta Hills",
      "Nandan Pahar", 
      "Satsang Ashram",
      "Deoghar Airport Museum"
    ],
    activities: [
      "Temple worship",
      "Spiritual meditation",
      "Religious ceremonies",
      "Photography (outside temple)",
      "Local market exploration",
      "Cultural immersion"
    ],
    tips: [
      "Follow dress code strictly",
      "No leather items allowed",
      "Respect temple timings",
      "Book accommodation early during festivals",
      "Try local prasad and sweets"
    ],
    images: [
      "https://images.unsplash.com/photo-1582632443527-6747dfed4a37?w=800&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80"
    ],
    hasPage: true,
    pageRoute: "/religious-site"
  },

  "Hundru Falls": {
    name: "Hundru Falls",
    category: "Waterfall",
    rating: 4.5,
    location: "Ranchi district, Jharkhand",
    description: "98-meter spectacular waterfall near Ranchi",
    detailedDescription: "Hundru Falls, one of Jharkhand's most spectacular waterfalls, plunges 98 meters (320 feet) from a height, making it one of the highest waterfalls in the state. Located on the Subarnarekha River, about 45 km from Ranchi, it's surrounded by dense forests and rocky terrain. The waterfall is at its magnificent best during and after the monsoon season when the water volume is at its peak. The area around the falls offers excellent opportunities for photography, picnicking, and nature walks.",
    highlights: [
      "98-meter high waterfall",
      "One of highest falls in Jharkhand",
      "Subarnarekha River source",
      "Dense forest surroundings",
      "Rocky terrain landscape",
      "Photography paradise",
      "Natural pool at bottom"
    ],
    bestTimeToVisit: "July to February (post-monsoon for maximum flow), avoid during heavy rains",
    howToReach: "45 km from Ranchi city center. Drive via NH33 highway. Local buses and taxis available.",
    nearbyAttractions: [
      "Dassam Falls (20 km)",
      "Jonha Falls (35 km)", 
      "Ranchi Rock Garden",
      "Pahari Mandir",
      "Tagore Hill"
    ],
    activities: [
      "Waterfall viewing",
      "Photography", 
      "Picnicking",
      "Nature walks",
      "Rock climbing (experienced)",
      "Bird watching"
    ],
    tips: [
      "Wear non-slip footwear",
      "Be careful near rocks (can be slippery)",
      "Don't venture too close to the fall base",
      "Carry water and snacks",
      "Visit early morning for best light"
    ],
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
    ],
    hasPage: true,
    pageRoute: "/waterfall"
  },

  // Major cities with dedicated pages
  "Ranchi": {
    name: "Ranchi",
    category: "Capital City",
    rating: 4.5,
    location: "Ranchi district, Jharkhand",
    description: "The capital city known for its hills and waterfalls",
    detailedDescription: "Ranchi, the capital city of Jharkhand, is often called the 'City of Waterfalls' due to its numerous cascading falls. Situated at an altitude of 2,140 feet above sea level, it enjoys a pleasant climate throughout the year. The city is a perfect blend of natural beauty and modern development, serving as the political and educational hub of the state.",
    highlights: ["State Capital", "Educational Hub", "Hill Station", "Waterfalls", "Tribal Culture"],
    bestTimeToVisit: "October to March (pleasant weather)",
    howToReach: "Birsa Munda Airport (IXR). Well connected by rail and road.",
    nearbyAttractions: ["Hundru Falls", "Dassam Falls", "Tagore Hill", "Rock Garden"],
    activities: ["Waterfall visits", "City tours", "Cultural exploration", "Educational visits"],
    tips: ["Visit waterfalls during monsoon", "Explore tribal culture", "Try local cuisine"],
    images: ["https://images.unsplash.com/photo-1570194065650-d99fb4bedf5a?w=800&q=80"],
    hasPage: true,
    pageRoute: "/cities/ranchi"
  },

  "Jamshedpur": {
    name: "Jamshedpur",
    category: "Steel City",
    rating: 4.3,
    location: "East Singhbhum district, Jharkhand",
    description: "Steel city and industrial hub of eastern India",
    detailedDescription: "Jamshedpur, fondly known as the 'Steel City' and 'Pittsburgh of India,' is a testament to India's industrial prowess. Founded by the visionary industrialist Jamsetji Tata, this planned city is home to Tata Steel, one of India's largest steel manufacturing companies.",
    highlights: ["Steel Production", "Planned City", "Industrial Hub", "Clean & Green", "Modern Infrastructure"],
    bestTimeToVisit: "October to March (pleasant weather)",
    howToReach: "Tatanagar Junction railway station. 140 km from Ranchi airport.",
    nearbyAttractions: ["Jubilee Park", "Dimna Lake", "Dalma Wildlife Sanctuary"],
    activities: ["Industrial tours", "City exploration", "Wildlife visits", "Park visits"],
    tips: ["Visit Tata Steel plant", "Explore Jubilee Park", "Try steel city cuisine"],
    images: ["https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=800&q=80"],
    hasPage: true,
    pageRoute: "/cities/jamshedpur"
  },

  "Dhanbad": {
    name: "Dhanbad",
    category: "Coal Capital",
    rating: 4.0,
    location: "Dhanbad district, Jharkhand",
    description: "Coal capital of India with rich mineral resources",
    detailedDescription: "Dhanbad is known as the Coal Capital of India. Beyond its industrial significance, it features natural escapes like lakes, waterfalls, and dams. The city is home to IIT Dhanbad and serves as an important educational center.",
    highlights: ["Coal Mining", "Energy Hub", "Educational Centers", "IIT Dhanbad"],
    bestTimeToVisit: "October to February (pleasant weather)",
    howToReach: "Dhanbad Junction railway station. Well connected by road.",
    nearbyAttractions: ["Maithon Dam", "Topchanchi Lake", "Bhatinda Falls"],
    activities: ["Educational visits", "Lake visits", "Dam exploration", "Cultural tours"],
    tips: ["Visit IIT Dhanbad campus", "Explore nearby lakes", "Learn about coal heritage"],
    images: ["https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=800&q=80"],
    hasPage: true,
    pageRoute: "/cities/dhanbad"
  },

  "Bokaro": {
    name: "Bokaro",
    category: "Steel City",
    rating: 4.0,
    location: "Bokaro district, Jharkhand",
    description: "Planned steel city with lakes and green spaces",
    detailedDescription: "Bokaro Steel City is one of India's first planned cities, known for its steel plant, serene lakes, and organized urban layout. It offers a balanced mix of industry and nature with well-planned sectors and green spaces.",
    highlights: ["Planned City", "Steel Plant", "Lakes", "Green Spaces", "Urban Planning"],
    bestTimeToVisit: "October to February (pleasant weather)",
    howToReach: "Bokaro Steel City railway station. Well connected by road.",
    nearbyAttractions: ["Garga Dam", "City Lake", "Parasnath Hills"],
    activities: ["City tours", "Lake visits", "Industrial visits", "Photography"],
    tips: ["Explore planned city layout", "Visit city lake", "See steel plant (with permission)"],
    images: ["https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80"],
    hasPage: true,
    pageRoute: "/cities/bokaro"
  },

  "Deoghar": {
    name: "Deoghar",
    category: "Holy City",
    rating: 4.7,
    location: "Deoghar district, Jharkhand",
    description: "Holy city famous for Baidyanath Temple",
    detailedDescription: "Deoghar is a major pilgrimage destination housing the revered Baidyanath Temple, one of the twelve Jyotirlingas. The town also offers hills, parks, and spiritual centers making it a complete spiritual and natural destination.",
    highlights: ["Religious Tourism", "Jyotirlinga", "Pilgrimage Center", "Spiritual Heritage"],
    bestTimeToVisit: "October to March, Shravan month (July-August) for festivals",
    howToReach: "Deoghar Airport and railway station. Well connected by road.",
    nearbyAttractions: ["Baidyanath Temple", "Basukinath", "Trikuta Hills", "Nandan Pahar"],
    activities: ["Temple visits", "Pilgrimage", "Spiritual meditation", "Hill visits"],
    tips: ["Follow temple dress code", "Visit during festivals", "Respect religious customs"],
    images: ["https://images.unsplash.com/photo-1582632443527-6747dfed4a37?w=800&q=80"],
    hasPage: true,
    pageRoute: "/cities/deoghar"
  },

  // Additional places from cities and other sections
  "Hazaribagh": {
    name: "Hazaribagh",
    category: "City",
    rating: 4.2,
    location: "Hazaribagh district, Jharkhand",
    description: "Known for national park and natural beauty",
    detailedDescription: "Hazaribagh, literally meaning 'thousand gardens', is a picturesque city known for its natural beauty and wildlife sanctuary. The Hazaribagh Wildlife Sanctuary, covering 186 square kilometers, is home to tigers, leopards, sambars, and various bird species. The city serves as a base for exploring the sanctuary and is famous for its pleasant climate, rolling hills, and tribal culture. The area also has historical significance with several ancient temples and colonial-era buildings.",
    highlights: [
      "Hazaribagh Wildlife Sanctuary",
      "Pleasant hilly terrain",
      "Rich wildlife including tigers",
      "Tribal culture heritage",
      "Historical temples",
      "Colonial architecture",
      "Natural landscapes"
    ],
    bestTimeToVisit: "October to March (ideal weather for wildlife viewing)",
    howToReach: "100 km from Ranchi by NH33. Regular bus service and taxi available. Railway station connects to major cities.",
    nearbyAttractions: [
      "Hazaribagh Wildlife Sanctuary",
      "Canary Hill",
      "Hazaribagh Lake", 
      "Konar Dam",
      "Isko Temple"
    ],
    activities: [
      "Wildlife safari",
      "Bird watching",
      "Photography",
      "Temple visits",
      "Cultural exploration",
      "Nature walks"
    ],
    tips: [
      "Book safari permits in advance",
      "Carry warm clothes in winter",
      "Respect wildlife and maintain distance",
      "Try local tribal handicrafts",
      "Visit during weekdays for less crowds"
    ],
    images: [
      "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=800&q=80"
    ],
    hasPage: false
  },

  "Giridih": {
    name: "Giridih", 
    category: "City",
    rating: 4.1,
    location: "Giridih district, Jharkhand",
    description: "Land of hills with Parasnath peak",
    detailedDescription: "Giridih, known as the 'Land of Hills', is home to the famous Parasnath Hills, the highest peak in Jharkhand at 1,365 meters. The city is an important pilgrimage site for Jains, as Parasnath Hills houses several Jain temples and is believed to be where 20 of the 24 Jain Tirthankaras attained moksha. The area is rich in coal and mica deposits, contributing to its industrial significance. The landscape features beautiful hills, dense forests, and several waterfalls.",
    highlights: [
      "Parasnath Hills (highest peak in Jharkhand)",
      "Important Jain pilgrimage site",
      "20 Jain Tirthankaras attained moksha here",
      "Rich in coal and mica",
      "Beautiful hill landscapes", 
      "Dense forest cover",
      "Multiple waterfalls"
    ],
    bestTimeToVisit: "October to March (pleasant for trekking and pilgrimage)",
    howToReach: "150 km from Ranchi, well connected by rail and road. Giridih Junction is on the main railway line.",
    nearbyAttractions: [
      "Parasnath Hills",
      "Shikharji Temple Complex",
      "Usri Falls",
      "Khandoli Park",
      "Madhuban"
    ],
    activities: [
      "Parasnath trek",
      "Jain temple visits",
      "Pilgrimage",
      "Photography",
      "Nature walks",
      "Spiritual meditation"
    ],
    tips: [
      "Wear appropriate clothing for temple visits",
      "Trek to Parasnath requires good fitness",
      "Carry water during treks",
      "Respect religious sentiments",
      "Book accommodation near temple complex"
    ],
    images: [
      "https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=800&q=80",
      "https://images.unsplash.com/photo-1582632443527-6747dfed4a37?w=800&q=80"
    ],
    hasPage: false
  },

  "Ramgarh": {
    name: "Ramgarh",
    category: "Hill Station", 
    rating: 4.0,
    location: "Ramgarh district, Jharkhand",
    description: "Summer capital during British era",
    detailedDescription: "Ramgarh, known as the 'Summer Capital' of undivided Bihar during the British era, is a charming hill station with a rich colonial history. Situated at an elevation of 2,140 feet, it enjoys a pleasant climate throughout the year. The town is famous for its colonial-era buildings, beautiful landscapes, and historical significance. British officials used to retreat here during hot summers, leaving behind beautiful architecture and well-planned settlements that still retain their old-world charm.",
    highlights: [
      "Former British summer capital",
      "2,140 feet elevation",
      "Colonial architecture",
      "Pleasant year-round climate",
      "Historical significance",
      "Beautiful landscapes",
      "Well-planned hill station"
    ],
    bestTimeToVisit: "Year-round destination, especially good during summers (April-June)",
    howToReach: "35 km from Ranchi city. Well connected by road with regular bus service and taxi facilities.",
    nearbyAttractions: [
      "Ramgarh Cantonment", 
      "Colonial buildings",
      "Patratu Valley",
      "Netarhat (60 km)",
      "Ranchi (35 km)"
    ],
    activities: [
      "Heritage walks",
      "Colonial architecture exploration", 
      "Photography",
      "Sightseeing",
      "Relaxation",
      "Cultural tours"
    ],
    tips: [
      "Best for those interested in colonial history",
      "Carry camera for architectural photography",
      "Respect historical monuments",
      "Try local cuisine",
      "Ideal for peaceful getaways"
    ],
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=800&q=80"
    ],
    hasPage: false
  },

  "Chaibasa": {
    name: "Chaibasa",
    category: "City",
    rating: 3.9,
    location: "West Singhbhum district, Jharkhand", 
    description: "Headquarters of West Singhbhum district",
    detailedDescription: "Chaibasa, the administrative headquarters of West Singhbhum district, is known for its rich tribal culture and natural beauty. The city is surrounded by hills and forests, making it a gateway to explore the tribal heartland of Jharkhand. It's famous for its Ho tribal culture, traditional crafts, and mining activities. The area is rich in iron ore and other minerals. The landscape features dense forests, small hills, and tribal villages that preserve ancient customs and traditions.",
    highlights: [
      "Administrative headquarters",
      "Rich Ho tribal culture",
      "Traditional handicrafts",
      "Mining region (iron ore)",
      "Dense forest surroundings",
      "Tribal heritage preservation",
      "Natural landscapes"
    ],
    bestTimeToVisit: "October to March (pleasant weather for exploration)",
    howToReach: "150 km from Ranchi, connected by road and rail. Regular bus service available.",
    nearbyAttractions: [
      "Tribal villages",
      "Local handicraft centers",
      "Forest areas",
      "Mining sites (for educational tours)",
      "Traditional tribal fairs"
    ],
    activities: [
      "Tribal culture exploration",
      "Handicraft shopping",
      "Cultural immersion",
      "Village visits",
      "Photography",
      "Nature walks"
    ],
    tips: [
      "Respect tribal customs and traditions",
      "Learn about Ho tribal culture",
      "Buy authentic handicrafts from local artisans",
      "Carry local guide for village visits",
      "Be sensitive while photographing people"
    ],
    images: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80"
    ],
    hasPage: false
  }
};

// Function to get place description
export function getPlaceDescription(placeName: string): PlaceDescription | null {
  return placeDescriptions[placeName] || null;
}

// Function to check if a place has a dedicated page
export function hasPlacePage(placeName: string): boolean {
  const place = placeDescriptions[placeName];
  return place ? place.hasPage : false;
}

// Function to get place page route
export function getPlacePageRoute(placeName: string): string | null {
  const place = placeDescriptions[placeName];
  return place && place.hasPage ? place.pageRoute : null;
}
