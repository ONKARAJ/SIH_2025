// Enhanced Google Maps integration for travel assistance

interface PlaceDetails {
  name: string;
  rating?: number;
  reviews_count?: number;
  location: {
    lat: number;
    lng: number;
  };
  types: string[];
  vicinity?: string;
  opening_hours?: {
    open_now: boolean;
  };
}

interface DirectionsResult {
  routes: Array<{
    legs: Array<{
      distance: { text: string; value: number };
      duration: { text: string; value: number };
      steps: Array<{
        travel_mode: string;
        instructions: string;
      }>;
    }>;
    overview_polyline: { points: string };
  }>;
  status: string;
}

interface TravelModeOption {
  mode: 'DRIVING' | 'TRANSIT' | 'WALKING';
  duration: string;
  distance: string;
  cost_estimate?: string;
  description: string;
}

export class GoogleMapsService {
  private apiKey: string;
  private baseUrl = 'https://maps.googleapis.com/maps/api';

  constructor() {
    this.apiKey = process.env.GOOGLE_MAPS_API_KEY || '';
  }

  // Get place details including reviews and ratings
  async getPlaceDetails(query: string, location?: string): Promise<PlaceDetails[]> {
    if (!this.apiKey) {
      throw new Error('Google Maps API key not configured');
    }

    try {
      const searchQuery = location ? `${query} in ${location}` : query;
      const url = `${this.baseUrl}/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&key=${this.apiKey}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.status !== 'OK') {
        throw new Error(`Places API error: ${data.status}`);
      }

      return data.results.slice(0, 5).map((place: any) => ({
        name: place.name,
        rating: place.rating,
        reviews_count: place.user_ratings_total,
        location: {
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng
        },
        types: place.types || [],
        vicinity: place.vicinity,
        opening_hours: place.opening_hours
      }));
    } catch (error) {
      console.error('Error fetching place details:', error);
      throw error;
    }
  }

  // Get multiple travel mode options between two places
  async getTravelModeOptions(origin: string, destination: string): Promise<TravelModeOption[]> {
    if (!this.apiKey) {
      throw new Error('Google Maps API key not configured');
    }

    const modes: Array<'DRIVING' | 'TRANSIT' | 'WALKING'> = ['DRIVING', 'TRANSIT', 'WALKING'];
    const options: TravelModeOption[] = [];

    for (const mode of modes) {
      try {
        const url = `${this.baseUrl}/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=${mode}&key=${this.apiKey}`;
        
        const response = await fetch(url);
        const data: DirectionsResult = await response.json();

        if (data.status === 'OK' && data.routes.length > 0) {
          const route = data.routes[0];
          const leg = route.legs[0];
          
          let description = '';
          let cost_estimate = '';

          switch (mode) {
            case 'DRIVING':
              description = 'By car/taxi - Most flexible, door-to-door service';
              cost_estimate = this.estimateDrivingCost(leg.distance.value);
              break;
            case 'TRANSIT':
              description = 'By public transport - Most economical option';
              cost_estimate = this.estimateTransitCost(leg.distance.value);
              break;
            case 'WALKING':
              if (leg.duration.value > 7200) { // More than 2 hours
                continue; // Skip walking for long distances
              }
              description = 'Walking - Free and good exercise';
              cost_estimate = 'Free';
              break;
          }

          options.push({
            mode,
            duration: leg.duration.text,
            distance: leg.distance.text,
            cost_estimate,
            description
          });
        }
      } catch (error) {
        console.error(`Error getting ${mode} directions:`, error);
      }
    }

    return options.sort((a, b) => {
      // Sort by duration (fastest first)
      const aDuration = this.parseTimeToMinutes(a.duration);
      const bDuration = this.parseTimeToMinutes(b.duration);
      return aDuration - bDuration;
    });
  }

  // Get tourist attractions near a location
  async getNearbyAttractions(location: string, radius: number = 50000): Promise<PlaceDetails[]> {
    if (!this.apiKey) {
      throw new Error('Google Maps API key not configured');
    }

    try {
      // First get coordinates of the location
      const geocodeUrl = `${this.baseUrl}/geocode/json?address=${encodeURIComponent(location)}&key=${this.apiKey}`;
      const geocodeResponse = await fetch(geocodeUrl);
      const geocodeData = await geocodeResponse.json();

      if (geocodeData.status !== 'OK' || !geocodeData.results.length) {
        throw new Error('Location not found');
      }

      const { lat, lng } = geocodeData.results[0].geometry.location;

      // Search for tourist attractions
      const attractionsUrl = `${this.baseUrl}/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=tourist_attraction&key=${this.apiKey}`;
      const attractionsResponse = await fetch(attractionsUrl);
      const attractionsData = await attractionsResponse.json();

      if (attractionsData.status !== 'OK') {
        throw new Error(`Nearby search error: ${attractionsData.status}`);
      }

      return attractionsData.results
        .filter((place: any) => place.rating && place.rating >= 3.5) // Filter by minimum rating
        .sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0)) // Sort by rating
        .slice(0, 8)
        .map((place: any) => ({
          name: place.name,
          rating: place.rating,
          reviews_count: place.user_ratings_total,
          location: {
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng
          },
          types: place.types || [],
          vicinity: place.vicinity,
          opening_hours: place.opening_hours
        }));
    } catch (error) {
      console.error('Error fetching nearby attractions:', error);
      throw error;
    }
  }

  // Private helper methods
  private estimateDrivingCost(distanceMeters: number): string {
    const distanceKm = distanceMeters / 1000;
    // Rough estimates for India: ₹8-15 per km for taxi
    const minCost = Math.round(distanceKm * 8);
    const maxCost = Math.round(distanceKm * 15);
    return `₹${minCost}-${maxCost} (taxi)`;
  }

  private estimateTransitCost(distanceMeters: number): string {
    const distanceKm = distanceMeters / 1000;
    // Rough estimates for India: ₹1-3 per km for public transport
    const minCost = Math.round(distanceKm * 1);
    const maxCost = Math.round(distanceKm * 3);
    return `₹${minCost}-${maxCost} (bus/train)`;
  }

  private parseTimeToMinutes(timeString: string): number {
    const hoursMatch = timeString.match(/(\d+)\s*hour/);
    const minutesMatch = timeString.match(/(\d+)\s*min/);
    
    const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
    const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
    
    return hours * 60 + minutes;
  }
}

// Jharkhand-specific travel recommendations
export const JHARKHAND_TRAVEL_TIPS = {
  popular_routes: [
    {
      route: 'Dhanbad to Deoghar (Baidyanath Dham)',
      best_mode: 'DRIVING',
      duration: '2-3 hours',
      tips: 'Best route for pilgrims. Early morning departure recommended to avoid crowds.'
    },
    {
      route: 'Ranchi to Hundru Falls',
      best_mode: 'DRIVING',
      duration: '1.5 hours',
      tips: 'Scenic route. Best during monsoon (July-Sept) when falls are at full flow.'
    },
    {
      route: 'Ranchi to Netarhat',
      best_mode: 'DRIVING',
      duration: '4-5 hours',
      tips: 'Hill station route. Carry warm clothes, especially in winter.'
    }
  ],
  
  transport_hubs: {
    'Ranchi': {
      airport: 'Birsa Munda Airport',
      major_railway: 'Ranchi Junction',
      note: 'Main gateway to Jharkhand'
    },
    'Deoghar': {
      nearest_railway: 'Jasidih (7 km away)',
      note: 'Major pilgrimage center'
    },
    'Jamshedpur': {
      airport: 'Sonari Airport',
      railway: 'Tatanagar Junction',
      note: 'Industrial city with good connectivity'
    }
  },
  
  seasonal_advice: {
    'Oct-Mar': 'Best weather for sightseeing. Pleasant temperature.',
    'Apr-Jun': 'Hot weather. Early morning/evening travel recommended.',
    'Jul-Sep': 'Monsoon season. Best for waterfalls but check road conditions.'
  }
};

export const googleMapsService = new GoogleMapsService();