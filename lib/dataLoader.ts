import fs from 'fs';
import path from 'path';

// Types for our local data
export interface Location {
  id: string;
  name: string;
  type: string;
  district: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  attractions?: string[];
  connectivity?: {
    airport?: string;
    railway?: string;
    highways?: string[];
    nearest_railway?: string;
  };
  elevation?: string;
}

export interface PointOfInterest {
  id: string;
  name: string;
  category: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  best_time: string;
  activities?: string[];
  entry_fee?: string;
  timings?: string;
  height?: string;
  significance?: string;
  distance_from_ranchi?: string;
  [key: string]: any;
}

// Cache for loaded data
let cachedLocations: Location[] | null = null;
let cachedPOIs: PointOfInterest[] | null = null;

// Load locations data
export function loadLocations(): Location[] {
  if (cachedLocations) {
    return cachedLocations;
  }

  try {
    const dataPath = path.join(process.cwd(), 'data', 'locations.json');
    const data = fs.readFileSync(dataPath, 'utf8');
    cachedLocations = JSON.parse(data);
    return cachedLocations || [];
  } catch (error) {
    console.error('Error loading locations data:', error);
    return [];
  }
}

// Load points of interest data
export function loadPointsOfInterest(): PointOfInterest[] {
  if (cachedPOIs) {
    return cachedPOIs;
  }

  try {
    const dataPath = path.join(process.cwd(), 'data', 'pointsOfInterest.json');
    const data = fs.readFileSync(dataPath, 'utf8');
    cachedPOIs = JSON.parse(data);
    return cachedPOIs || [];
  } catch (error) {
    console.error('Error loading points of interest data:', error);
    return [];
  }
}

// Search functions
export function searchLocations(query: string): Location[] {
  const locations = loadLocations();
  const lowerQuery = query.toLowerCase();

  return locations.filter(location => 
    location.name.toLowerCase().includes(lowerQuery) ||
    location.district.toLowerCase().includes(lowerQuery) ||
    location.description.toLowerCase().includes(lowerQuery) ||
    location.type.toLowerCase().includes(lowerQuery) ||
    (location.attractions && location.attractions.some(attraction => 
      attraction.toLowerCase().includes(lowerQuery)
    ))
  );
}

export function searchPOIs(query: string): PointOfInterest[] {
  const pois = loadPointsOfInterest();
  const lowerQuery = query.toLowerCase();

  return pois.filter(poi => 
    poi.name.toLowerCase().includes(lowerQuery) ||
    poi.category.toLowerCase().includes(lowerQuery) ||
    poi.location.toLowerCase().includes(lowerQuery) ||
    poi.description.toLowerCase().includes(lowerQuery) ||
    (poi.activities && poi.activities.some(activity => 
      activity.toLowerCase().includes(lowerQuery)
    ))
  );
}

// Get relevant local data based on query
export function getRelevantLocalData(query: string): {
  locations: Location[];
  pois: PointOfInterest[];
  hasLocalData: boolean;
} {
  const locations = searchLocations(query);
  const pois = searchPOIs(query);

  return {
    locations,
    pois,
    hasLocalData: locations.length > 0 || pois.length > 0
  };
}

// Format local data for context
export function formatLocalDataForContext(locations: Location[], pois: PointOfInterest[]): string {
  let context = '';

  if (locations.length > 0) {
    context += '**Local Locations Data:**\n';
    locations.forEach(location => {
      context += `- ${location.name} (${location.type}): ${location.description}\n`;
      if (location.attractions) {
        context += `  Attractions: ${location.attractions.join(', ')}\n`;
      }
      if (location.connectivity) {
        context += `  Connectivity: ${JSON.stringify(location.connectivity)}\n`;
      }
    });
    context += '\n';
  }

  if (pois.length > 0) {
    context += '**Points of Interest:**\n';
    pois.forEach(poi => {
      context += `- ${poi.name} (${poi.category}): ${poi.description}\n`;
      if (poi.best_time) context += `  Best time: ${poi.best_time}\n`;
      if (poi.entry_fee) context += `  Entry fee: ${poi.entry_fee}\n`;
      if (poi.activities) context += `  Activities: ${poi.activities.join(', ')}\n`;
    });
  }

  return context;
}

// Check if query is specifically about Jharkhand tourism (strict validation)
export function isJharkhandTourismQuery(query: string): boolean {
  const lowerQuery = query.toLowerCase();
  
  // Comprehensive Jharkhand-specific places, districts, and attractions
  const jharkhandKeywords = [
    'jharkhand', 'ranchi', 'jamshedpur', 'deoghar', 'netarhat', 'hazaribagh',
    'dhanbad', 'bokaro', 'giridih', 'palamu', 'chatra', 'khunti', 'gumla',
    'lohardaga', 'simdega', 'west singhbhum', 'east singhbhum', 'saraikela',
    'hundru', 'dassam', 'betla', 'baidyanath', 'parasnath', 'lodh falls',
    'jonha falls', 'tagore hill', 'rock garden', 'jubilee park', 'birsa munda',
    'tribal', 'sarhul', 'sohrai', 'tusu', 'karma', 'chotanagpur', 'dalma',
    'maithon dam', 'konar dam', 'getalsud dam', 'tilaiya dam'
  ];

  // Check if query mentions any Jharkhand-specific location or attraction
  const hasJharkhandLocation = jharkhandKeywords.some(keyword => 
    lowerQuery.includes(keyword)
  );

  // Check if query has local data from Jharkhand locations database
  const hasJharkhandData = getRelevantLocalData(query).hasLocalData;

  // Only allow if specifically mentions Jharkhand places or has local data
  return hasJharkhandLocation || hasJharkhandData;
}

// Additional function to check for non-Jharkhand places (to reject them)
export function isNonJharkhandLocationQuery(query: string): boolean {
  const lowerQuery = query.toLowerCase();
  
  // Common non-Jharkhand places that should be rejected
  const nonJharkhandPlaces = [
    'delhi', 'mumbai', 'kolkata', 'chennai', 'bangalore', 'hyderabad',
    'pune', 'ahmedabad', 'surat', 'jaipur', 'lucknow', 'kanpur', 'nagpur',
    'indore', 'thane', 'bhopal', 'visakhapatnam', 'pimpri', 'patna',
    'vadodara', 'ludhiana', 'agra', 'nashik', 'faridabad', 'meerut',
    'rajkot', 'kalyan', 'vasai', 'varanasi', 'srinagar', 'aurangabad',
    'dhanbad', 'amritsar', 'navi mumbai', 'allahabad', 'howrah', 'gwalior',
    'jabalpur', 'coimbatore', 'vijayawada', 'jodhpur', 'madurai', 'raipur',
    'kota', 'guwahati', 'chandigarh', 'solapur', 'hubli', 'dharwad',
    'bareilly', 'moradabad', 'mysore', 'gurgaon', 'aligarh', 'jalandhar',
    'tiruchirappalli', 'bhubaneswar', 'salem', 'mira', 'bhiwandi', 'tiruppur',
    'bihar', 'west bengal', 'uttar pradesh', 'odisha', 'chhattisgarh'
  ];
  
  return nonJharkhandPlaces.some(place => lowerQuery.includes(place));
}

// Get location by name
export function getLocationByName(name: string): Location | undefined {
  const locations = loadLocations();
  return locations.find(loc => 
    loc.name.toLowerCase() === name.toLowerCase() ||
    loc.id.toLowerCase() === name.toLowerCase()
  );
}

// Get POI by name
export function getPOIByName(name: string): PointOfInterest | undefined {
  const pois = loadPointsOfInterest();
  return pois.find(poi => 
    poi.name.toLowerCase() === name.toLowerCase() ||
    poi.id.toLowerCase() === name.toLowerCase()
  );
}

// Get nearby POIs for a location
export function getNearbyPOIs(locationName: string): PointOfInterest[] {
  const pois = loadPointsOfInterest();
  return pois.filter(poi => 
    poi.location.toLowerCase().includes(locationName.toLowerCase())
  );
}