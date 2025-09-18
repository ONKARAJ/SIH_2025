// Booking system integration for transport price comparisons
// Note: Database is lazy-loaded to avoid build-time issues

interface TransportOption {
  type: 'train' | 'bus' | 'flight';
  operator: string;
  departure_time: string;
  arrival_time: string;
  duration: string;
  price: number;
  class?: string;
  seats_available: number;
  route_details?: string;
}

interface BookingRecommendation {
  cheapest: TransportOption;
  fastest: TransportOption;
  recommended: TransportOption;
  all_options: TransportOption[];
  summary: string;
}

export class BookingService {
  // Lazy load database to avoid build-time issues
  private async getDb() {
    try {
      const { prisma } = await import('@/lib/prisma');
      if (!prisma || typeof prisma.train?.findMany !== 'function') {
        throw new Error('Database not available');
      }
      return prisma;
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw new Error('Database service unavailable');
    }
  }

  // Get transport options between two locations
  async getTransportOptions(origin: string, destination: string, date?: Date): Promise<BookingRecommendation | null> {
    try {
      const travelDate = date || new Date();
      
      // Get train options
      const trainOptions = await this.getTrainOptions(origin, destination, travelDate);
      
      // Get flight options  
      const flightOptions = await this.getFlightOptions(origin, destination, travelDate);
      
      // For now, simulate bus options (can be replaced with real API)
      const busOptions = this.getBusOptionsSimulated(origin, destination);

      const allOptions = [...trainOptions, ...flightOptions, ...busOptions];
      
      if (allOptions.length === 0) {
        return null;
      }

      // Find cheapest, fastest, and recommended options
      const cheapest = allOptions.reduce((prev, current) => 
        prev.price < current.price ? prev : current
      );

      const fastest = allOptions.reduce((prev, current) => {
        const prevMinutes = this.parseTimeToMinutes(prev.duration);
        const currentMinutes = this.parseTimeToMinutes(current.duration);
        return prevMinutes < currentMinutes ? prev : current;
      });

      // Recommended: balance of price and time
      const recommended = this.findRecommendedOption(allOptions);

      const summary = this.generateRecommendationSummary(cheapest, fastest, recommended);

      return {
        cheapest,
        fastest,
        recommended,
        all_options: allOptions,
        summary
      };
    } catch (error) {
      console.error('Error getting transport options:', error);
      return null;
    }
  }

  // Get train options from database
  private async getTrainOptions(origin: string, destination: string, date: Date): Promise<TransportOption[]> {
    try {
      const db = await this.getDb();
      const trains = await db.train.findMany({
        where: {
          isActive: true,
          OR: [
            {
              departure: {
                contains: origin,
                mode: 'insensitive'
              }
            },
            {
              route: {
                path: ['$[*]'],
                string_contains: origin
              }
            }
          ],
          AND: [
            {
              OR: [
                {
                  arrival: {
                    contains: destination,
                    mode: 'insensitive'
                  }
                },
                {
                  route: {
                    path: ['$[*]'],
                    string_contains: destination
                  }
                }
              ]
            }
          ]
        },
        take: 10
      });

      return trains.map(train => ({
        type: 'train' as const,
        operator: `${train.trainName} (${train.trainNumber})`,
        departure_time: train.departureTime,
        arrival_time: train.arrivalTime,
        duration: train.duration,
        price: train.basePrice,
        class: 'SL', // Default class
        seats_available: train.availableSeats,
        route_details: `${train.departure} → ${train.arrival}`
      }));
    } catch (error) {
      console.error('Error fetching train options:', error);
      return [];
    }
  }

  // Get flight options from database
  private async getFlightOptions(origin: string, destination: string, date: Date): Promise<TransportOption[]> {
    try {
      const db = await this.getDb();
      const flights = await db.flight.findMany({
        where: {
          isActive: true,
          departure: {
            contains: origin,
            mode: 'insensitive'
          },
          arrival: {
            contains: destination,
            mode: 'insensitive'
          },
          departureDate: {
            gte: new Date(date.setHours(0, 0, 0, 0)),
            lt: new Date(date.setHours(23, 59, 59, 999))
          }
        },
        take: 10
      });

      return flights.map(flight => ({
        type: 'flight' as const,
        operator: `${flight.airline} ${flight.flightNumber}`,
        departure_time: flight.departureTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        arrival_time: flight.arrivalTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        duration: flight.duration,
        price: flight.basePrice,
        class: 'Economy',
        seats_available: flight.availableSeats,
        route_details: `${flight.departure} → ${flight.arrival}`
      }));
    } catch (error) {
      console.error('Error fetching flight options:', error);
      return [];
    }
  }

  // Simulated bus options (replace with real API later)
  private getBusOptionsSimulated(origin: string, destination: string): TransportOption[] {
    const routes = [
      { from: 'Dhanbad', to: 'Deoghar', duration: '3h 30m', price: 150 },
      { from: 'Ranchi', to: 'Jamshedpur', duration: '3h 45m', price: 180 },
      { from: 'Ranchi', to: 'Deoghar', duration: '5h 20m', price: 220 },
      { from: 'Dhanbad', to: 'Ranchi', duration: '4h 15m', price: 200 }
    ];

    const matchingRoute = routes.find(route => 
      route.from.toLowerCase().includes(origin.toLowerCase()) &&
      route.to.toLowerCase().includes(destination.toLowerCase())
    );

    if (!matchingRoute) {
      return [];
    }

    return [
      {
        type: 'bus' as const,
        operator: 'Jharkhand State Bus',
        departure_time: '06:00',
        arrival_time: this.addDurationToTime('06:00', matchingRoute.duration),
        duration: matchingRoute.duration,
        price: matchingRoute.price,
        seats_available: 25,
        route_details: `${matchingRoute.from} → ${matchingRoute.to}`
      },
      {
        type: 'bus' as const,
        operator: 'Private Volvo',
        departure_time: '14:30',
        arrival_time: this.addDurationToTime('14:30', matchingRoute.duration),
        duration: matchingRoute.duration,
        price: matchingRoute.price + 50,
        seats_available: 18,
        route_details: `${matchingRoute.from} → ${matchingRoute.to} (AC Bus)`
      }
    ];
  }

  // Helper methods
  private parseTimeToMinutes(timeString: string): number {
    const hoursMatch = timeString.match(/(\d+)h/);
    const minutesMatch = timeString.match(/(\d+)m/);
    
    const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
    const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
    
    return hours * 60 + minutes;
  }

  private addDurationToTime(startTime: string, duration: string): string {
    const [hours, minutes] = startTime.split(':').map(Number);
    const durationMinutes = this.parseTimeToMinutes(duration);
    
    const totalMinutes = hours * 60 + minutes + durationMinutes;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;
    
    return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
  }

  private findRecommendedOption(options: TransportOption[]): TransportOption {
    // Score each option based on price and time (lower is better)
    const scoredOptions = options.map(option => {
      const timeScore = this.parseTimeToMinutes(option.duration) / 60; // Hours
      const priceScore = option.price / 100; // Scaled price
      const totalScore = timeScore + priceScore; // Balance of time and cost
      
      return { option, score: totalScore };
    });

    return scoredOptions.reduce((prev, current) => 
      prev.score < current.score ? prev : current
    ).option;
  }

  private generateRecommendationSummary(cheapest: TransportOption, fastest: TransportOption, recommended: TransportOption): string {
    let summary = `🎯 **My Recommendation**: ${recommended.operator} `;
    
    if (recommended === cheapest && recommended === fastest) {
      summary += '(Best overall - cheapest AND fastest!)';
    } else if (recommended === cheapest) {
      summary += '(Best value for money)';
    } else if (recommended === fastest) {
      summary += '(Best for time-conscious travelers)';
    } else {
      summary += '(Great balance of cost and time)';
    }

    summary += `\n💰 **Cheapest**: ${cheapest.operator} - ₹${cheapest.price}`;
    summary += `\n⚡ **Fastest**: ${fastest.operator} - ${fastest.duration}`;

    return summary;
  }
}

// Jharkhand-specific route knowledge
export const JHARKHAND_ROUTES = {
  popular_connections: [
    {
      route: 'Dhanbad → Deoghar',
      description: 'Main pilgrimage route to Baidyanath Dham',
      best_options: ['bus', 'taxi'],
      peak_season: 'Shravan month (July-August)',
      tips: 'Book early during festival season. Morning departures recommended.'
    },
    {
      route: 'Ranchi → Jamshedpur', 
      description: 'Capital to industrial hub',
      best_options: ['train', 'bus'],
      tips: 'Multiple train options available. Good road connectivity.'
    },
    {
      route: 'Ranchi → Netarhat',
      description: 'Capital to hill station',
      best_options: ['taxi', 'private vehicle'],
      tips: 'Mountain roads - experienced drivers recommended.'
    }
  ],

  transport_tips: {
    trains: 'Generally reliable. Book in advance for popular routes.',
    buses: 'State buses are economical. Private buses offer better comfort.',
    flights: 'Limited options within state. Mainly for connections to major cities.',
    taxis: 'Good for flexible travel. Negotiate rates for longer distances.'
  }
};

export const bookingService = new BookingService();
