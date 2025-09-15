const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const sampleHotels = [
  {
    id: 'hotel-001',
    name: 'Jharkhand Tourism Lodge Ranchi',
    location: 'Ranchi',
    description: 'Comfortable accommodation in the heart of Jharkhand capital with modern amenities',
    rating: 4.2,
    amenities: ['WiFi', 'Restaurant', 'Parking', 'AC', '24/7 Room Service'],
    images: ['/hotels/ranchi-lodge.jpg'],
    pricePerNight: 2500,
    availableRooms: 25
  },
  {
    id: 'hotel-002', 
    name: 'Netarhat Hill Resort',
    location: 'Netarhat',
    description: 'Scenic hill station resort with panoramic valley views and sunrise point access',
    rating: 4.5,
    amenities: ['WiFi', 'Restaurant', 'Nature Walks', 'Bonfire', 'Valley View'],
    images: ['/hotels/netarhat-resort.jpg'],
    pricePerNight: 3200,
    availableRooms: 15
  },
  {
    id: 'hotel-003',
    name: 'Dalma Wildlife Eco Lodge',
    location: 'Dalma',
    description: 'Eco-friendly lodge near Dalma Wildlife Sanctuary with guided nature tours',
    rating: 4.1,
    amenities: ['Nature Walks', 'Wildlife Tours', 'Restaurant', 'Library', 'Birding'],
    images: ['/hotels/dalma-lodge.jpg'],
    pricePerNight: 2800,
    availableRooms: 12
  },
  {
    id: 'hotel-004',
    name: 'Deoghar Pilgrimage Hotel',
    location: 'Deoghar',
    description: 'Comfortable stay near Baidyanath Temple with spiritual ambiance',
    rating: 4.0,
    amenities: ['WiFi', 'Restaurant', 'Parking', 'AC', 'Temple Shuttle'],
    images: ['/hotels/deoghar-pilgrimage.jpg'],
    pricePerNight: 2200,
    availableRooms: 30
  },
  {
    id: 'hotel-005',
    name: 'Jamshedpur Business Hotel',
    location: 'Jamshedpur',
    description: 'Modern business hotel in the steel city with corporate facilities',
    rating: 4.3,
    amenities: ['WiFi', 'Restaurant', 'Gym', 'Business Center', 'Conference Rooms'],
    images: ['/hotels/jamshedpur-business.jpg'],
    pricePerNight: 3500,
    availableRooms: 40
  },
  {
    id: 'hotel-006',
    name: 'Betla Forest Lodge',
    location: 'Betla',
    description: 'Wildlife lodge inside Betla National Park for nature enthusiasts',
    rating: 4.2,
    amenities: ['Nature Walks', 'Wildlife Safari', 'Restaurant', 'Campfire'],
    images: ['/hotels/betla-lodge.jpg'],
    pricePerNight: 3800,
    availableRooms: 18
  },
  {
    id: 'hotel-007',
    name: 'Hazaribagh Lake View Resort',
    location: 'Hazaribagh',
    description: 'Lakeside resort with beautiful views and water sports activities',
    rating: 4.1,
    amenities: ['WiFi', 'Restaurant', 'Lake View', 'Boating', 'Water Sports'],
    images: ['/hotels/hazaribagh-resort.jpg'],
    pricePerNight: 2900,
    availableRooms: 22
  },
  {
    id: 'hotel-008',
    name: 'Dhanbad Heritage Hotel',
    location: 'Dhanbad',
    description: 'Heritage property showcasing coal mining history of Jharkhand',
    rating: 3.9,
    amenities: ['WiFi', 'Restaurant', 'Heritage Tours', 'Museum', 'Library'],
    images: ['/hotels/dhanbad-heritage.jpg'],
    pricePerNight: 2600,
    availableRooms: 20
  },
  {
    id: 'hotel-009',
    name: 'Bokaro Spa Resort',
    location: 'Bokaro',
    description: 'Relaxing spa resort with wellness treatments and steel city views',
    rating: 4.4,
    amenities: ['Spa', 'Gym', 'Swimming Pool', 'Restaurant', 'Wellness Center'],
    images: ['/hotels/bokaro-spa.jpg'],
    pricePerNight: 4200,
    availableRooms: 35
  },
  {
    id: 'hotel-010',
    name: 'Giridih Rock Garden Hotel',
    location: 'Giridih',
    description: 'Unique hotel with rock garden views and mineral spring access',
    rating: 4.0,
    amenities: ['WiFi', 'Restaurant', 'Rock Garden', 'Spring Water', 'Hiking'],
    images: ['/hotels/giridih-rock.jpg'],
    pricePerNight: 2400,
    availableRooms: 16
  }
];

const sampleRooms = [
  // Ranchi Hotels
  {
    id: 'room-001',
    hotelId: 'hotel-001',
    name: 'Standard Room',
    type: 'Standard',
    capacity: 2,
    pricePerNight: 2500,
    amenities: ['AC', 'TV', 'WiFi', '24/7 Room Service'],
    available: true
  },
  {
    id: 'room-002',
    hotelId: 'hotel-001',
    name: 'Executive Suite',
    type: 'Suite',
    capacity: 4,
    pricePerNight: 4000,
    amenities: ['AC', 'TV', 'WiFi', 'Minibar', 'Living Area'],
    available: true
  },
  // Netarhat
  {
    id: 'room-003',
    hotelId: 'hotel-002',
    name: 'Valley View Room',
    type: 'Premium',
    capacity: 2,
    pricePerNight: 3200,
    amenities: ['Valley View', 'AC', 'TV', 'WiFi', 'Balcony'],
    available: true
  },
  {
    id: 'room-004',
    hotelId: 'hotel-002',
    name: 'Sunrise Suite',
    type: 'Suite',
    capacity: 4,
    pricePerNight: 4500,
    amenities: ['Sunrise View', 'AC', 'TV', 'WiFi', 'Fireplace'],
    available: true
  },
  // Dalma
  {
    id: 'room-005',
    hotelId: 'hotel-003',
    name: 'Forest Room',
    type: 'Standard',
    capacity: 2,
    pricePerNight: 2800,
    amenities: ['Forest View', 'Fan', 'WiFi', 'Nature Sounds'],
    available: true
  },
  // Deoghar
  {
    id: 'room-006',
    hotelId: 'hotel-004',
    name: 'Pilgrimage Room',
    type: 'Standard',
    capacity: 3,
    pricePerNight: 2200,
    amenities: ['AC', 'TV', 'WiFi', 'Temple View'],
    available: true
  },
  {
    id: 'room-007',
    hotelId: 'hotel-004',
    name: 'Family Suite',
    type: 'Family',
    capacity: 6,
    pricePerNight: 3500,
    amenities: ['AC', 'TV', 'WiFi', 'Kitchen', 'Living Room'],
    available: true
  },
  // Jamshedpur
  {
    id: 'room-008',
    hotelId: 'hotel-005',
    name: 'Business Room',
    type: 'Business',
    capacity: 2,
    pricePerNight: 3500,
    amenities: ['AC', 'TV', 'WiFi', 'Work Desk', 'Business Center Access'],
    available: true
  },
  // Betla
  {
    id: 'room-009',
    hotelId: 'hotel-006',
    name: 'Safari Lodge',
    type: 'Premium',
    capacity: 2,
    pricePerNight: 3800,
    amenities: ['Wildlife View', 'AC', 'TV', 'Safari Kit', 'Binoculars'],
    available: true
  },
  // Hazaribagh
  {
    id: 'room-010',
    hotelId: 'hotel-007',
    name: 'Lake View Room',
    type: 'Premium',
    capacity: 2,
    pricePerNight: 2900,
    amenities: ['Lake View', 'AC', 'TV', 'WiFi', 'Balcony'],
    available: true
  },
  // Dhanbad
  {
    id: 'room-011',
    hotelId: 'hotel-008',
    name: 'Heritage Room',
    type: 'Heritage',
    capacity: 2,
    pricePerNight: 2600,
    amenities: ['Heritage Decor', 'AC', 'TV', 'WiFi', 'Museum Access'],
    available: true
  },
  // Bokaro
  {
    id: 'room-012',
    hotelId: 'hotel-009',
    name: 'Spa Suite',
    type: 'Luxury',
    capacity: 2,
    pricePerNight: 4200,
    amenities: ['Spa Access', 'AC', 'TV', 'WiFi', 'Jacuzzi', 'Private Balcony'],
    available: true
  },
  // Giridih
  {
    id: 'room-013',
    hotelId: 'hotel-010',
    name: 'Rock Garden View',
    type: 'Standard',
    capacity: 2,
    pricePerNight: 2400,
    amenities: ['Garden View', 'AC', 'TV', 'WiFi', 'Spring Water'],
    available: true
  }
];

const sampleFlights = [
  // Flights to Ranchi (IXR)
  {
    id: 'flight-001',
    airline: 'IndiGo',
    flightNumber: '6E-123',
    departure: 'Delhi (DEL)',
    arrival: 'Ranchi (IXR)',
    departureTime: '06:30',
    arrivalTime: '08:45',
    duration: '2h 15m',
    price: 8500,
    availableSeats: 45,
    aircraft: 'A320'
  },
  {
    id: 'flight-002',
    airline: 'IndiGo',
    flightNumber: '6E-247',
    departure: 'Delhi (DEL)',
    arrival: 'Ranchi (IXR)',
    departureTime: '14:15',
    arrivalTime: '16:30',
    duration: '2h 15m',
    price: 9200,
    availableSeats: 38,
    aircraft: 'A320'
  },
  {
    id: 'flight-003',
    airline: 'SpiceJet',
    flightNumber: 'SG-456',
    departure: 'Mumbai (BOM)',
    arrival: 'Ranchi (IXR)', 
    departureTime: '14:20',
    arrivalTime: '16:50',
    duration: '2h 30m',
    price: 7800,
    availableSeats: 42,
    aircraft: 'B737'
  },
  {
    id: 'flight-004',
    airline: 'SpiceJet',
    flightNumber: 'SG-892',
    departure: 'Mumbai (BOM)',
    arrival: 'Ranchi (IXR)', 
    departureTime: '07:45',
    arrivalTime: '10:15',
    duration: '2h 30m',
    price: 7200,
    availableSeats: 48,
    aircraft: 'B737'
  },
  {
    id: 'flight-005',
    airline: 'Air India',
    flightNumber: 'AI-789',
    departure: 'Kolkata (CCU)',
    arrival: 'Ranchi (IXR)',
    departureTime: '11:15',
    arrivalTime: '12:25',
    duration: '1h 10m',
    price: 6500,
    availableSeats: 52,
    aircraft: 'ATR 72'
  },
  {
    id: 'flight-006',
    airline: 'Air India',
    flightNumber: 'AI-445',
    departure: 'Kolkata (CCU)',
    arrival: 'Ranchi (IXR)',
    departureTime: '17:30',
    arrivalTime: '18:40',
    duration: '1h 10m',
    price: 6800,
    availableSeats: 44,
    aircraft: 'ATR 72'
  },
  {
    id: 'flight-007',
    airline: 'Vistara',
    flightNumber: 'UK-673',
    departure: 'Bangalore (BLR)',
    arrival: 'Ranchi (IXR)',
    departureTime: '13:25',
    arrivalTime: '16:10',
    duration: '2h 45m',
    price: 9800,
    availableSeats: 36,
    aircraft: 'A320neo'
  },
  {
    id: 'flight-008',
    airline: 'IndiGo',
    flightNumber: '6E-534',
    departure: 'Chennai (MAA)',
    arrival: 'Ranchi (IXR)',
    departureTime: '10:50',
    arrivalTime: '13:20',
    duration: '2h 30m',
    price: 8900,
    availableSeats: 40,
    aircraft: 'A320'
  },
  {
    id: 'flight-009',
    airline: 'SpiceJet',
    flightNumber: 'SG-718',
    departure: 'Pune (PNQ)',
    arrival: 'Ranchi (IXR)',
    departureTime: '16:15',
    arrivalTime: '18:45',
    duration: '2h 30m',
    price: 8200,
    availableSeats: 35,
    aircraft: 'B737'
  },
  {
    id: 'flight-010',
    airline: 'Air India Express',
    flightNumber: 'IX-234',
    departure: 'Hyderabad (HYD)',
    arrival: 'Ranchi (IXR)',
    departureTime: '12:30',
    arrivalTime: '14:50',
    duration: '2h 20m',
    price: 7600,
    availableSeats: 50,
    aircraft: 'B737-800'
  },
  
  // Flights to Deoghar (DGH)
  {
    id: 'flight-011',
    airline: 'IndiGo',
    flightNumber: '6E-789',
    departure: 'Delhi (DEL)',
    arrival: 'Deoghar (DGH)',
    departureTime: '07:00',
    arrivalTime: '09:20',
    duration: '2h 20m',
    price: 9500,
    availableSeats: 42,
    aircraft: 'A320'
  },
  {
    id: 'flight-012',
    airline: 'IndiGo',
    flightNumber: '6E-912',
    departure: 'Delhi (DEL)',
    arrival: 'Deoghar (DGH)',
    departureTime: '19:30',
    arrivalTime: '21:50',
    duration: '2h 20m',
    price: 10200,
    availableSeats: 38,
    aircraft: 'A320'
  },
  {
    id: 'flight-013',
    airline: 'Air India',
    flightNumber: 'AI-567',
    departure: 'Kolkata (CCU)',
    arrival: 'Deoghar (DGH)',
    departureTime: '09:45',
    arrivalTime: '11:00',
    duration: '1h 15m',
    price: 7200,
    availableSeats: 48,
    aircraft: 'ATR 72'
  },
  {
    id: 'flight-014',
    airline: 'Air India',
    flightNumber: 'AI-834',
    departure: 'Kolkata (CCU)',
    arrival: 'Deoghar (DGH)',
    departureTime: '15:20',
    arrivalTime: '16:35',
    duration: '1h 15m',
    price: 7500,
    availableSeats: 46,
    aircraft: 'ATR 72'
  },
  {
    id: 'flight-015',
    airline: 'SpiceJet',
    flightNumber: 'SG-691',
    departure: 'Mumbai (BOM)',
    arrival: 'Deoghar (DGH)',
    departureTime: '11:30',
    arrivalTime: '14:05',
    duration: '2h 35m',
    price: 8800,
    availableSeats: 40,
    aircraft: 'B737'
  },
  {
    id: 'flight-016',
    airline: 'Vistara',
    flightNumber: 'UK-945',
    departure: 'Chennai (MAA)',
    arrival: 'Deoghar (DGH)',
    departureTime: '08:15',
    arrivalTime: '11:05',
    duration: '2h 50m',
    price: 10500,
    availableSeats: 32,
    aircraft: 'A320neo'
  },
  {
    id: 'flight-017',
    airline: 'IndiGo',
    flightNumber: '6E-456',
    departure: 'Bangalore (BLR)',
    arrival: 'Deoghar (DGH)',
    departureTime: '16:45',
    arrivalTime: '19:30',
    duration: '2h 45m',
    price: 9900,
    availableSeats: 44,
    aircraft: 'A320'
  },
  {
    id: 'flight-018',
    airline: 'Air India Express',
    flightNumber: 'IX-678',
    departure: 'Ahmedabad (AMD)',
    arrival: 'Deoghar (DGH)',
    departureTime: '13:40',
    arrivalTime: '16:20',
    duration: '2h 40m',
    price: 8600,
    availableSeats: 55,
    aircraft: 'B737-800'
  },
  
  // Return flights from Ranchi
  {
    id: 'flight-019',
    airline: 'IndiGo',
    flightNumber: '6E-124',
    departure: 'Ranchi (IXR)',
    arrival: 'Delhi (DEL)',
    departureTime: '09:30',
    arrivalTime: '11:45',
    duration: '2h 15m',
    price: 8500,
    availableSeats: 43,
    aircraft: 'A320'
  },
  {
    id: 'flight-020',
    airline: 'SpiceJet',
    flightNumber: 'SG-457',
    departure: 'Ranchi (IXR)',
    arrival: 'Mumbai (BOM)',
    departureTime: '17:30',
    arrivalTime: '20:00',
    duration: '2h 30m',
    price: 7800,
    availableSeats: 41,
    aircraft: 'B737'
  },
  {
    id: 'flight-021',
    airline: 'Air India',
    flightNumber: 'AI-790',
    departure: 'Ranchi (IXR)',
    arrival: 'Kolkata (CCU)',
    departureTime: '13:10',
    arrivalTime: '14:20',
    duration: '1h 10m',
    price: 6500,
    availableSeats: 49,
    aircraft: 'ATR 72'
  },
  
  // Return flights from Deoghar
  {
    id: 'flight-022',
    airline: 'IndiGo',
    flightNumber: '6E-790',
    departure: 'Deoghar (DGH)',
    arrival: 'Delhi (DEL)',
    departureTime: '10:10',
    arrivalTime: '12:30',
    duration: '2h 20m',
    price: 9500,
    availableSeats: 40,
    aircraft: 'A320'
  },
  {
    id: 'flight-023',
    airline: 'Air India',
    flightNumber: 'AI-568',
    departure: 'Deoghar (DGH)',
    arrival: 'Kolkata (CCU)',
    departureTime: '11:45',
    arrivalTime: '13:00',
    duration: '1h 15m',
    price: 7200,
    availableSeats: 47,
    aircraft: 'ATR 72'
  }
];

async function main() {
  console.log('🌱 Seeding database with sample data...');

  try {
    // Clear existing data
    console.log('🧹 Cleaning existing data...');
    try {
      await prisma.payment.deleteMany();
      await prisma.refund.deleteMany();
      await prisma.hotelBooking.deleteMany();
      await prisma.flightBooking.deleteMany();
    } catch (e) {
      console.log('⚠️ Some tables don\'t exist yet, skipping cleanup...');
    }
    
    await prisma.room.deleteMany().catch(() => {});
    await prisma.hotel.deleteMany().catch(() => {});
    await prisma.flight.deleteMany().catch(() => {});

    // Seed Hotels
    console.log('🏨 Seeding hotels...');
    for (const hotel of sampleHotels) {
      await prisma.hotel.create({
        data: {
          id: hotel.id,
          name: hotel.name,
          location: hotel.location,
          description: hotel.description,
          rating: hotel.rating,
          amenities: hotel.amenities,
          images: hotel.images,
          pricePerNight: hotel.pricePerNight,
          availableRooms: hotel.availableRooms
        }
      });
    }

    // Seed Rooms
    console.log('🛏️ Seeding rooms...');
    for (const room of sampleRooms) {
      await prisma.room.create({
        data: {
          id: room.id,
          hotelId: room.hotelId,
          name: room.name,
          type: room.type,
          capacity: room.capacity,
          pricePerNight: room.pricePerNight,
          amenities: room.amenities,
          available: room.available
        }
      });
    }

    // Seed Flights
    console.log('✈️ Seeding flights...');
    for (const flight of sampleFlights) {
      await prisma.flight.create({
        data: {
          id: flight.id,
          airline: flight.airline,
          flightNumber: flight.flightNumber,
          departure: flight.departure,
          arrival: flight.arrival,
          departureTime: flight.departureTime,
          arrivalTime: flight.arrivalTime,
          duration: flight.duration,
          price: flight.price,
          availableSeats: flight.availableSeats,
          aircraft: flight.aircraft
        }
      });
    }

    console.log('✅ Database seeded successfully!');
    console.log(`📊 Seeded:
    - ${sampleHotels.length} hotels across Jharkhand
    - ${sampleRooms.length} rooms with different types  
    - ${sampleFlights.length} flights to/from Ranchi & Deoghar`);
    console.log('🏨 Hotels in: Ranchi, Netarhat, Dalma, Deoghar, Jamshedpur, Betla, Hazaribagh, Dhanbad, Bokaro, Giridih');
    console.log('✈️ Flight routes: Delhi, Mumbai, Kolkata, Bangalore, Chennai, Pune, Hyderabad, Ahmedabad → Ranchi/Deoghar');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
