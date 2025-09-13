import { db } from './db'

const sampleHotels = [
  {
    name: "Jharkhand Tourism Resort Ranchi",
    description: "A premium resort located in the heart of Ranchi with modern amenities and traditional hospitality.",
    address: "Main Road, Doranda",
    city: "Ranchi",
    pincode: "834002",
    phone: "+91-9876543210",
    email: "info@jharkhnadresort.com",
    rating: 4.5,
    images: [
      "/images/hotels/jharkhand-tourism-resort/exterior.jpg",
      "/images/hotels/jharkhand-tourism-resort/lobby.jpg",
      "/images/hotels/jharkhand-tourism-resort/pool.jpg",
      "/images/hotels/jharkhand-tourism-resort/deluxe-room.jpg",
      "/images/hotels/jharkhand-tourism-resort/spa.jpg"
    ],
    amenities: ["WiFi", "Restaurant", "Swimming Pool", "Spa", "Gym"],
    latitude: 23.3441,
    longitude: 85.3096
  },
  {
    name: "Hotel Capitol Hill Ranchi",
    description: "Luxury business hotel in the heart of Ranchi offering world-class amenities and services.",
    address: "Circular Road, Ranchi",
    city: "Ranchi",
    pincode: "834001",
    phone: "+91-9876543213",
    email: "reservations@capitolhillranchi.com",
    rating: 4.6,
    images: [
      "/images/hotels/capitol-hill-ranchi/exterior.jpg",
      "/images/hotels/capitol-hill-ranchi/luxury-lobby.jpg",
      "/images/hotels/capitol-hill-ranchi/executive-room.jpg",
      "/images/hotels/capitol-hill-ranchi/restaurant.jpg",
      "/images/hotels/capitol-hill-ranchi/bar.jpg"
    ],
    amenities: ["WiFi", "Restaurant", "Conference Hall", "Spa", "Gym", "Bar"],
    latitude: 23.3441,
    longitude: 85.3096
  },
  {
    name: "Forest View Lodge Betla",
    description: "Experience wildlife up close at this eco-friendly lodge near Betla National Park.",
    address: "Near Betla National Park",
    city: "Latehar",
    pincode: "822124",
    phone: "+91-9876543211",
    email: "stay@forestviewlodge.com",
    rating: 4.2,
    images: ["/placeholder.jpg"],
    amenities: ["WiFi", "Restaurant", "Wildlife Safari", "Nature Walks"],
    latitude: 23.8773,
    longitude: 84.1939
  },
  {
    name: "Netarhat Hill Resort",
    description: "Enjoy breathtaking sunrise views from this hilltop resort in the Queen of Chotanagpur.",
    address: "Netarhat Hills",
    city: "Latehar",
    pincode: "822119",
    phone: "+91-9876543212",
    email: "bookings@netarhathills.com",
    rating: 4.3,
    images: ["/placeholder.jpg"],
    amenities: ["WiFi", "Restaurant", "Mountain View", "Bonfire", "Trekking"],
    latitude: 23.4676,
    longitude: 84.2610
  },
  {
    name: "Baidyanath Temple Guest House",
    description: "Traditional guest house near the famous Baidyanath Jyotirlinga Temple, perfect for pilgrims.",
    address: "Temple Road, Near Baidyanath Temple",
    city: "Deoghar",
    pincode: "814112",
    phone: "+91-9876543214",
    email: "stay@baidyanathguesthouse.com",
    rating: 4.1,
    images: ["/placeholder.jpg"],
    amenities: ["WiFi", "Restaurant", "Temple Proximity", "Spiritual Ambiance"],
    latitude: 24.4845,
    longitude: 86.6997
  },
  {
    name: "Deoghar Heritage Hotel",
    description: "Modern hotel with traditional architecture, ideal for pilgrims and tourists visiting Deoghar.",
    address: "Station Road, Deoghar",
    city: "Deoghar",
    pincode: "814112",
    phone: "+91-9876543215",
    email: "info@deogarheritage.com",
    rating: 4.4,
    images: ["/placeholder.jpg"],
    amenities: ["WiFi", "Restaurant", "AC Rooms", "Parking", "Room Service"],
    latitude: 24.4845,
    longitude: 86.6997
  },
  {
    name: "Dalma Hills Eco Resort",
    description: "Eco-friendly resort near Dalma Wildlife Sanctuary offering nature experiences and elephant sightings.",
    address: "Dalma Hills, Near Wildlife Sanctuary",
    city: "Jamshedpur",
    pincode: "831013",
    phone: "+91-9876543216",
    email: "bookings@dalmahillsresort.com",
    rating: 4.2,
    images: ["/placeholder.jpg"],
    amenities: ["WiFi", "Restaurant", "Wildlife Tours", "Nature Walks", "Bonfire"],
    latitude: 22.8046,
    longitude: 86.2029
  },
  {
    name: "Steel City Hotel Jamshedpur",
    description: "Premium business hotel in the industrial heart of Jharkhand with modern facilities.",
    address: "Bistupur Main Road, Jamshedpur",
    city: "Jamshedpur",
    pincode: "831001",
    phone: "+91-9876543217",
    email: "reservations@steelcityhotel.com",
    rating: 4.5,
    images: ["/placeholder.jpg"],
    amenities: ["WiFi", "Restaurant", "Business Center", "Gym", "Conference Hall"],
    latitude: 22.8046,
    longitude: 86.2029
  },
  {
    name: "Hazaribagh Lake Resort",
    description: "Serene lakeside resort offering peaceful retreat near Hazaribagh National Park.",
    address: "Lake Road, Hazaribagh",
    city: "Hazaribagh",
    pincode: "825301",
    phone: "+91-9876543218",
    email: "stay@hazaribaghresort.com",
    rating: 4.0,
    images: ["/placeholder.jpg"],
    amenities: ["WiFi", "Restaurant", "Lake View", "Boating", "Nature Walks"],
    latitude: 23.9929,
    longitude: 85.3547
  },
  {
    name: "Parasnath Hill Resort",
    description: "Mountain retreat at the highest peak of Jharkhand, perfect for trekkers and spiritual seekers.",
    address: "Parasnath Hill, Giridih",
    city: "Giridih",
    pincode: "815301",
    phone: "+91-9876543219",
    email: "bookings@parasnathhillresort.com",
    rating: 4.3,
    images: ["/placeholder.jpg"],
    amenities: ["WiFi", "Restaurant", "Mountain View", "Trekking Guide", "Temple Visit"],
    latitude: 23.9629,
    longitude: 86.1661
  },
  {
    name: "Hundru Falls View Hotel",
    description: "Scenic hotel offering stunning views of the famous Hundru Falls, perfect for nature lovers.",
    address: "Near Hundru Falls, Ranchi",
    city: "Ranchi",
    pincode: "834005",
    phone: "+91-9876543220",
    email: "info@hundrufallshotel.com",
    rating: 4.1,
    images: ["/placeholder.jpg"],
    amenities: ["WiFi", "Restaurant", "Waterfall View", "Photography Tours", "Nature Walks"],
    latitude: 23.4315,
    longitude: 85.6020
  },
  {
    name: "Dhanbad Business Inn",
    description: "Modern business hotel in the coal capital of India, ideal for corporate travelers.",
    address: "Bank More, Dhanbad",
    city: "Dhanbad",
    pincode: "826001",
    phone: "+91-9876543221",
    email: "reservations@dhanbadinn.com",
    rating: 4.0,
    images: ["/placeholder.jpg"],
    amenities: ["WiFi", "Restaurant", "Business Center", "Conference Room", "Airport Transfer"],
    latitude: 23.7957,
    longitude: 86.4304
  }
]

const sampleRooms = [
  {
    name: "Standard Room",
    type: "Standard",
    description: "Comfortable room with essential amenities for budget travelers",
    maxGuests: 2,
    basePrice: 1800,
    images: ["/placeholder.jpg"],
    amenities: ["AC", "TV", "WiFi", "Attached Bathroom"]
  },
  {
    name: "Deluxe Room",
    type: "Deluxe",
    description: "Spacious room with city view and modern amenities",
    maxGuests: 2,
    basePrice: 2500,
    images: ["/placeholder.jpg"],
    amenities: ["AC", "TV", "Mini Bar", "WiFi", "Room Service"]
  },
  {
    name: "Premium Room",
    type: "Premium",
    description: "Luxury room with premium amenities and beautiful views",
    maxGuests: 3,
    basePrice: 3200,
    images: ["/placeholder.jpg"],
    amenities: ["AC", "Smart TV", "Mini Bar", "WiFi", "Balcony", "Tea/Coffee Maker"]
  },
  {
    name: "Family Suite",
    type: "Suite",
    description: "Large family room with separate living area",
    maxGuests: 4,
    basePrice: 4000,
    images: ["/placeholder.jpg"],
    amenities: ["AC", "TV", "Kitchenette", "WiFi", "Balcony", "Sofa Bed"]
  },
  {
    name: "Executive Suite",
    type: "Executive",
    description: "Premium suite with work area and luxury amenities",
    maxGuests: 2,
    basePrice: 5500,
    images: ["/placeholder.jpg"],
    amenities: ["AC", "Smart TV", "Mini Bar", "WiFi", "Work Desk", "Premium Bathroom", "Complimentary Breakfast"]
  }
]

const sampleFlights = [
  // Flights to Ranchi
  {
    airline: "Air India",
    flightNumber: "AI-2341",
    departure: "Delhi",
    arrival: "Ranchi",
    departureTime: new Date('2025-09-20T06:00:00'),
    arrivalTime: new Date('2025-09-20T08:30:00'),
    duration: "2h 30m",
    price: 5500,
    availableSeats: 120,
    aircraft: "Boeing 737"
  },
  {
    airline: "Air India",
    flightNumber: "AI-2343",
    departure: "Delhi",
    arrival: "Ranchi",
    departureTime: new Date('2025-09-20T18:00:00'),
    arrivalTime: new Date('2025-09-20T20:30:00'),
    duration: "2h 30m",
    price: 5200,
    availableSeats: 120,
    aircraft: "Boeing 737"
  },
  {
    airline: "IndiGo",
    flightNumber: "6E-6543",
    departure: "Mumbai",
    arrival: "Ranchi",
    departureTime: new Date('2025-09-20T14:15:00'),
    arrivalTime: new Date('2025-09-20T16:45:00'),
    duration: "2h 30m",
    price: 4800,
    availableSeats: 180,
    aircraft: "Airbus A320"
  },
  {
    airline: "IndiGo",
    flightNumber: "6E-6545",
    departure: "Mumbai",
    arrival: "Ranchi",
    departureTime: new Date('2025-09-20T07:30:00'),
    arrivalTime: new Date('2025-09-20T10:00:00'),
    duration: "2h 30m",
    price: 4600,
    availableSeats: 180,
    aircraft: "Airbus A320"
  },
  {
    airline: "SpiceJet",
    flightNumber: "SG-8765",
    departure: "Kolkata",
    arrival: "Ranchi",
    departureTime: new Date('2025-09-20T09:30:00'),
    arrivalTime: new Date('2025-09-20T10:45:00'),
    duration: "1h 15m",
    price: 3200,
    availableSeats: 150,
    aircraft: "Boeing 737-800"
  },
  {
    airline: "SpiceJet",
    flightNumber: "SG-8767",
    departure: "Kolkata",
    arrival: "Ranchi",
    departureTime: new Date('2025-09-20T16:45:00'),
    arrivalTime: new Date('2025-09-20T18:00:00'),
    duration: "1h 15m",
    price: 3400,
    availableSeats: 150,
    aircraft: "Boeing 737-800"
  },
  {
    airline: "IndiGo",
    flightNumber: "6E-7651",
    departure: "Bangalore",
    arrival: "Ranchi",
    departureTime: new Date('2025-09-20T06:45:00'),
    arrivalTime: new Date('2025-09-20T09:30:00'),
    duration: "2h 45m",
    price: 5200,
    availableSeats: 180,
    aircraft: "Airbus A320"
  },
  {
    airline: "Air India",
    flightNumber: "AI-2345",
    departure: "Chennai",
    arrival: "Ranchi",
    departureTime: new Date('2025-09-20T11:30:00'),
    arrivalTime: new Date('2025-09-20T14:15:00'),
    duration: "2h 45m",
    price: 5400,
    availableSeats: 120,
    aircraft: "Boeing 737"
  },
  {
    airline: "SpiceJet",
    flightNumber: "SG-8769",
    departure: "Hyderabad",
    arrival: "Ranchi",
    departureTime: new Date('2025-09-20T13:20:00'),
    arrivalTime: new Date('2025-09-20T15:45:00'),
    duration: "2h 25m",
    price: 4900,
    availableSeats: 150,
    aircraft: "Boeing 737-800"
  },
  {
    airline: "IndiGo",
    flightNumber: "6E-7653",
    departure: "Pune",
    arrival: "Ranchi",
    departureTime: new Date('2025-09-20T08:15:00'),
    arrivalTime: new Date('2025-09-20T11:00:00'),
    duration: "2h 45m",
    price: 4700,
    availableSeats: 180,
    aircraft: "Airbus A320"
  },
  {
    airline: "Air India Express",
    flightNumber: "IX-1234",
    departure: "Ahmedabad",
    arrival: "Ranchi",
    departureTime: new Date('2025-09-20T15:30:00'),
    arrivalTime: new Date('2025-09-20T18:30:00'),
    duration: "3h 00m",
    price: 4500,
    availableSeats: 100,
    aircraft: "Boeing 737-800"
  },
  {
    airline: "Vistara",
    flightNumber: "UK-7891",
    departure: "Guwahati",
    arrival: "Ranchi",
    departureTime: new Date('2025-09-20T10:20:00'),
    arrivalTime: new Date('2025-09-20T12:45:00'),
    duration: "2h 25m",
    price: 4200,
    availableSeats: 140,
    aircraft: "Airbus A320"
  },
  {
    airline: "SpiceJet",
    flightNumber: "SG-8771",
    departure: "Patna",
    arrival: "Ranchi",
    departureTime: new Date('2025-09-20T14:45:00'),
    arrivalTime: new Date('2025-09-20T15:30:00'),
    duration: "45m",
    price: 2800,
    availableSeats: 150,
    aircraft: "Boeing 737-800"
  },
  
  // Flights to Deoghar
  {
    airline: "Air India",
    flightNumber: "AI-3451",
    departure: "Delhi",
    arrival: "Deoghar",
    departureTime: new Date('2025-09-20T07:00:00'),
    arrivalTime: new Date('2025-09-20T09:45:00'),
    duration: "2h 45m",
    price: 5800,
    availableSeats: 120,
    aircraft: "Boeing 737"
  },
  {
    airline: "IndiGo",
    flightNumber: "6E-8901",
    departure: "Mumbai",
    arrival: "Deoghar",
    departureTime: new Date('2025-09-20T12:30:00'),
    arrivalTime: new Date('2025-09-20T15:15:00'),
    duration: "2h 45m",
    price: 5200,
    availableSeats: 180,
    aircraft: "Airbus A320"
  },
  {
    airline: "SpiceJet",
    flightNumber: "SG-9123",
    departure: "Kolkata",
    arrival: "Deoghar",
    departureTime: new Date('2025-09-20T08:15:00'),
    arrivalTime: new Date('2025-09-20T09:45:00'),
    duration: "1h 30m",
    price: 3600,
    availableSeats: 150,
    aircraft: "Boeing 737-800"
  },
  {
    airline: "Air India Express",
    flightNumber: "IX-2456",
    departure: "Chennai",
    arrival: "Deoghar",
    departureTime: new Date('2025-09-20T16:20:00'),
    arrivalTime: new Date('2025-09-20T19:30:00'),
    duration: "3h 10m",
    price: 5600,
    availableSeats: 100,
    aircraft: "Boeing 737-800"
  },
  {
    airline: "Vistara",
    flightNumber: "UK-3678",
    departure: "Bangalore",
    arrival: "Deoghar",
    departureTime: new Date('2025-09-20T09:45:00'),
    arrivalTime: new Date('2025-09-20T13:00:00'),
    duration: "3h 15m",
    price: 5400,
    availableSeats: 140,
    aircraft: "Airbus A320"
  },
  
  // Return flights from Ranchi
  {
    airline: "Air India",
    flightNumber: "AI-2342",
    departure: "Ranchi",
    arrival: "Delhi",
    departureTime: new Date('2025-09-20T16:00:00'),
    arrivalTime: new Date('2025-09-20T18:30:00'),
    duration: "2h 30m",
    price: 5800,
    availableSeats: 120,
    aircraft: "Boeing 737"
  },
  {
    airline: "IndiGo",
    flightNumber: "6E-6544",
    departure: "Ranchi",
    arrival: "Mumbai",
    departureTime: new Date('2025-09-20T11:00:00'),
    arrivalTime: new Date('2025-09-20T13:30:00'),
    duration: "2h 30m",
    price: 5100,
    availableSeats: 180,
    aircraft: "Airbus A320"
  },
  {
    airline: "SpiceJet",
    flightNumber: "SG-8766",
    departure: "Ranchi",
    arrival: "Kolkata",
    departureTime: new Date('2025-09-20T12:15:00'),
    arrivalTime: new Date('2025-09-20T13:30:00'),
    duration: "1h 15m",
    price: 3400,
    availableSeats: 150,
    aircraft: "Boeing 737-800"
  },
  {
    airline: "IndiGo",
    flightNumber: "6E-7652",
    departure: "Ranchi",
    arrival: "Bangalore",
    departureTime: new Date('2025-09-20T17:30:00'),
    arrivalTime: new Date('2025-09-20T20:15:00'),
    duration: "2h 45m",
    price: 5400,
    availableSeats: 180,
    aircraft: "Airbus A320"
  },
  {
    airline: "Air India",
    flightNumber: "AI-2346",
    departure: "Ranchi",
    arrival: "Chennai",
    departureTime: new Date('2025-09-20T19:00:00'),
    arrivalTime: new Date('2025-09-20T21:45:00'),
    duration: "2h 45m",
    price: 5600,
    availableSeats: 120,
    aircraft: "Boeing 737"
  },
  
  // Return flights from Deoghar
  {
    airline: "Air India",
    flightNumber: "AI-3452",
    departure: "Deoghar",
    arrival: "Delhi",
    departureTime: new Date('2025-09-20T15:30:00'),
    arrivalTime: new Date('2025-09-20T18:15:00'),
    duration: "2h 45m",
    price: 6000,
    availableSeats: 120,
    aircraft: "Boeing 737"
  },
  {
    airline: "IndiGo",
    flightNumber: "6E-8902",
    departure: "Deoghar",
    arrival: "Mumbai",
    departureTime: new Date('2025-09-20T17:45:00'),
    arrivalTime: new Date('2025-09-20T20:30:00'),
    duration: "2h 45m",
    price: 5400,
    availableSeats: 180,
    aircraft: "Airbus A320"
  },
  {
    airline: "SpiceJet",
    flightNumber: "SG-9124",
    departure: "Deoghar",
    arrival: "Kolkata",
    departureTime: new Date('2025-09-20T13:00:00'),
    arrivalTime: new Date('2025-09-20T14:30:00'),
    duration: "1h 30m",
    price: 3800,
    availableSeats: 150,
    aircraft: "Boeing 737-800"
  }
]

const sampleUser = {
  email: "demo@jharkhnadtourism.com",
  name: "Demo User",
  phone: "+91-9876543200"
}

const sampleAdmin = {
  email: "admin@jharkhnadtourism.com",
  name: "Admin User",
  password: "$2b$10$K8QVc/uF9tXOZqGcQcGzCeKj8TVXL4OHlKNFoGGz5.N8zKzAzI2Zy", // password: admin123
  role: "admin"
}

export async function seedDatabase() {
  try {
    console.log('Seeding database...')

    // Clear existing data
    await db.hotelBooking.deleteMany()
    await db.flightBooking.deleteMany()
    await db.room.deleteMany()
    await db.hotel.deleteMany()
    await db.flight.deleteMany()
    await db.user.deleteMany()
    await db.admin.deleteMany()
    console.log('Cleared existing data')

    // Create sample user
    const user = await db.user.create({
      data: sampleUser
    })
    console.log('Created sample user')

    // Create sample admin
    await db.admin.create({
      data: sampleAdmin
    })
    console.log('Created sample admin')

    // Create hotels and rooms
    let hotelCount = 0
    let roomCount = 0
    for (const hotelData of sampleHotels) {
      const hotel = await db.hotel.create({
        data: {
          ...hotelData,
          images: JSON.stringify(hotelData.images),
          amenities: JSON.stringify(hotelData.amenities)
        }
      })
      hotelCount++

      // Add rooms for each hotel
      for (const roomData of sampleRooms) {
        await db.room.create({
          data: {
            ...roomData,
            hotelId: hotel.id,
            images: JSON.stringify(roomData.images),
            amenities: JSON.stringify(roomData.amenities)
          }
        })
        roomCount++
      }
    }
    console.log(`Created ${hotelCount} hotels with ${roomCount} rooms`)

    // Create sample flights
    let flightCount = 0
    for (const flightData of sampleFlights) {
      await db.flight.create({
        data: flightData
      })
      flightCount++
    }
    console.log(`Created ${flightCount} sample flights`)

    console.log('Database seeding completed successfully!')
    console.log(`Total: ${hotelCount} hotels, ${roomCount} rooms, ${flightCount} flights`)
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  } finally {
    await db.$disconnect()
  }
}
