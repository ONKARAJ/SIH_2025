export interface PlaceReview {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface NearbyPlace {
  id: string;
  name: string;
  type: 'tourist_attraction' | 'gas_station' | 'restaurant' | 'hospital' | 'police';
  coordinates: Coordinates;
  rating?: number;
  priceLevel?: number;
  openNow?: boolean;
  vicinity?: string;
  photoReference?: string;
  distance?: number; // in meters
  duration?: string; // travel time
}

export interface PlaceCategory {
  key: 'all' | 'tourist_attraction' | 'gas_station' | 'restaurant' | 'hospital' | 'police';
  label: string;
  icon: string;
  color: string;
}

export interface DirectionsInfo {
  distance: string;
  duration: string;
  steps: Array<{
    instruction: string;
    distance: string;
    duration: string;
  }>;
  polylinePoints?: string;
}

export interface TravelMode {
  mode: 'DRIVING' | 'WALKING' | 'TRANSIT';
  label: string;
  icon: string;
  available: boolean;
}

export interface Place {
  id: string;
  title: string;
  shortDescription: string;
  category: string;
  image: string;
  images?: string[];
  location: string;
  coordinates?: Coordinates; // Added coordinates for map integration
  rating: number;
  bestTimeToVisit: string;
  overview: string;
  attractions: string[];
  reviews: PlaceReview[];
  nearbyPlaces?: NearbyPlace[]; // Cached nearby places
}
