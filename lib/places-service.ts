"use client";

import { Coordinates, NearbyPlace, PlaceCategory, DirectionsInfo, TravelMode } from '@/types/place';

// Google Maps service for fetching nearby places and directions
export class PlacesService {
  private static instance: PlacesService;
  private mapsService: any = null;

  private constructor() {}

  public static getInstance(): PlacesService {
    if (!PlacesService.instance) {
      PlacesService.instance = new PlacesService();
    }
    return PlacesService.instance;
  }

  // Initialize Google Maps service
  public async initializeService(): Promise<void> {
    if (this.mapsService) return;

    if (typeof window !== 'undefined' && window.google) {
      this.mapsService = window.google.maps;
    } else {
      throw new Error('Google Maps API not loaded');
    }
  }

  // Define place categories with icons and colors
  public getPlaceCategories(): PlaceCategory[] {
    return [
      {
        key: 'all',
        label: 'All Places',
        icon: '🌍',
        color: '#6366f1'
      },
      {
        key: 'tourist_attraction',
        label: 'Tourist Attractions',
        icon: '🎯',
        color: '#ec4899'
      },
      {
        key: 'gas_station',
        label: 'Fuel Stations',
        icon: '⛽',
        color: '#f59e0b'
      },
      {
        key: 'restaurant',
        label: 'Restaurants',
        icon: '🍽️',
        color: '#10b981'
      },
      {
        key: 'hospital',
        label: 'Hospitals',
        icon: '🏥',
        color: '#ef4444'
      },
      {
        key: 'police',
        label: 'Police Stations',
        icon: '👮‍♂️',
        color: '#3b82f6'
      }
    ];
  }

  // Get travel mode options
  public getTravelModes(): TravelMode[] {
    return [
      {
        mode: 'DRIVING',
        label: 'Driving',
        icon: '🚗',
        available: true
      },
      {
        mode: 'WALKING',
        label: 'Walking',
        icon: '🚶‍♂️',
        available: true
      },
      {
        mode: 'TRANSIT',
        label: 'Transit',
        icon: '🚌',
        available: true
      }
    ];
  }

  // Fetch nearby places using Google Maps Places API
  public async fetchNearbyPlaces(
    center: Coordinates,
    category: string = 'all',
    radius: number = 5000
  ): Promise<NearbyPlace[]> {
    await this.initializeService();

    if (!this.mapsService) {
      throw new Error('Google Maps service not initialized');
    }

    return new Promise((resolve, reject) => {
      const map = new this.mapsService.Map(document.createElement('div'));
      const service = new this.mapsService.places.PlacesService(map);

      let types: string[] = [];
      
      // Map our categories to Google Places types
      switch (category) {
        case 'tourist_attraction':
          types = ['tourist_attraction', 'museum', 'park', 'zoo'];
          break;
        case 'gas_station':
          types = ['gas_station'];
          break;
        case 'restaurant':
          types = ['restaurant', 'food', 'meal_takeaway'];
          break;
        case 'hospital':
          types = ['hospital', 'pharmacy'];
          break;
        case 'police':
          types = ['police'];
          break;
        default:
          types = ['tourist_attraction', 'gas_station', 'restaurant', 'hospital', 'police'];
      }

      const requests = types.map(type => 
        new Promise<any[]>((resolveType) => {
          service.nearbySearch({
            location: new this.mapsService.LatLng(center.lat, center.lng),
            radius: radius,
            type: type
          }, (results: any[], status: any) => {
            if (status === this.mapsService.places.PlacesServiceStatus.OK) {
              resolveType(results.slice(0, 10).map(place => ({ ...place, searchType: type })));
            } else {
              resolveType([]);
            }
          });
        })
      );

      Promise.all(requests).then(resultArrays => {
        const allResults = resultArrays.flat();
        
        const nearbyPlaces: NearbyPlace[] = allResults
          .filter(place => place.place_id) // Ensure place has valid ID
          .map(place => ({
            id: place.place_id,
            name: place.name,
            type: this.mapGoogleTypeToOurType(place.searchType),
            coordinates: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            },
            rating: place.rating,
            priceLevel: place.price_level,
            openNow: place.opening_hours?.open_now,
            vicinity: place.vicinity,
            photoReference: place.photos?.[0]?.photo_reference,
            distance: this.calculateDistance(center, {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            })
          }))
          .sort((a, b) => (a.distance || 0) - (b.distance || 0)) // Sort by distance
          .slice(0, 20); // Limit to top 20 results

        resolve(nearbyPlaces);
      }).catch(reject);
    });
  }

  // Get directions between two points
  public async getDirections(
    origin: Coordinates,
    destination: Coordinates,
    travelMode: 'DRIVING' | 'WALKING' | 'TRANSIT' = 'DRIVING'
  ): Promise<DirectionsInfo> {
    await this.initializeService();

    if (!this.mapsService) {
      throw new Error('Google Maps service not initialized');
    }

    return new Promise((resolve, reject) => {
      const directionsService = new this.mapsService.DirectionsService();

      directionsService.route({
        origin: new this.mapsService.LatLng(origin.lat, origin.lng),
        destination: new this.mapsService.LatLng(destination.lat, destination.lng),
        travelMode: this.mapsService.TravelMode[travelMode],
        unitSystem: this.mapsService.UnitSystem.METRIC
      }, (result: any, status: any) => {
        if (status === this.mapsService.DirectionsStatus.OK && result.routes.length > 0) {
          const route = result.routes[0];
          const leg = route.legs[0];

          const directionsInfo: DirectionsInfo = {
            distance: leg.distance.text,
            duration: leg.duration.text,
            steps: leg.steps.map((step: any) => ({
              instruction: step.instructions.replace(/<[^>]*>/g, ''), // Remove HTML tags
              distance: step.distance.text,
              duration: step.duration.text
            })),
            polylinePoints: route.overview_polyline.points
          };

          resolve(directionsInfo);
        } else {
          reject(new Error(`Directions request failed: ${status}`));
        }
      });
    });
  }

  // Calculate distance between two coordinates (Haversine formula)
  private calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = coord1.lat * Math.PI / 180;
    const φ2 = coord2.lat * Math.PI / 180;
    const Δφ = (coord2.lat - coord1.lat) * Math.PI / 180;
    const Δλ = (coord2.lng - coord1.lng) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  }

  // Map Google Places types to our simplified types
  private mapGoogleTypeToOurType(googleType: string): NearbyPlace['type'] {
    const typeMap: { [key: string]: NearbyPlace['type'] } = {
      'tourist_attraction': 'tourist_attraction',
      'museum': 'tourist_attraction',
      'park': 'tourist_attraction',
      'zoo': 'tourist_attraction',
      'gas_station': 'gas_station',
      'restaurant': 'restaurant',
      'food': 'restaurant',
      'meal_takeaway': 'restaurant',
      'hospital': 'hospital',
      'pharmacy': 'hospital',
      'police': 'police'
    };

    return typeMap[googleType] || 'tourist_attraction';
  }

  // Get photo URL from Google Places photo reference
  public getPhotoUrl(photoReference: string, maxWidth: number = 400): string {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!photoReference || !apiKey) return '';
    
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${apiKey}`;
  }
}

// Export singleton instance
export const placesService = PlacesService.getInstance();