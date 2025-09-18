export interface BusData {
  id: string;
  busNumber: string;
  busName: string;
  operator: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  distance: number;
  frequency: number[]; // Days of week (1=Mon, 7=Sun)
  busType: 'Volvo AC' | 'Semi-Sleeper AC' | 'Sleeper AC' | 'Non-AC Seater' | 'AC Seater' | 'Luxury';
  totalSeats: number;
  availableSeats: number;
  basePrice: number;
  route: string[];
  amenities: string[];
  isActive: boolean;
  isFeatured: boolean;
  boardingPoints: { location: string; time: string }[];
  droppingPoints: { location: string; time: string }[];
}

export const busesData: BusData[] = [
  // ===== BIHAR TO JHARKHAND BUSES =====
  {
    id: '1',
    busNumber: 'BR-01-2024',
    busName: 'Patna Ranchi Express',
    operator: 'Bihar State Road Transport',
    departure: 'Patna',
    arrival: 'Ranchi',
    departureTime: '06:00',
    arrivalTime: '12:30',
    duration: '6h 30m',
    distance: 345,
    frequency: [1, 2, 3, 4, 5, 6, 7], // Daily
    busType: 'Volvo AC',
    totalSeats: 45,
    availableSeats: 32,
    basePrice: 650,
    route: ['Patna', 'Arrah', 'Dehri-on-Sone', 'Aurangabad', 'Daltonganj', 'Ranchi'],
    amenities: ['AC', 'WiFi', 'Charging Point', 'Water Bottle', 'Blanket', 'Entertainment'],
    isActive: true,
    isFeatured: true,
    boardingPoints: [
      { location: 'Patna Bus Stand', time: '06:00' },
      { location: 'Gandhi Maidan', time: '06:15' },
      { location: 'PMCH', time: '06:30' }
    ],
    droppingPoints: [
      { location: 'Ranchi Bus Terminal', time: '12:30' },
      { location: 'Albert Ekka Chowk', time: '12:45' },
      { location: 'Birsa Chowk', time: '13:00' }
    ]
  },
  {
    id: '2',
    busNumber: 'BR-02-2024',
    busName: 'Gaya Jamshedpur Super',
    operator: 'Royal Travels',
    departure: 'Gaya',
    arrival: 'Jamshedpur',
    departureTime: '07:30',
    arrivalTime: '12:45',
    duration: '5h 15m',
    distance: 285,
    frequency: [1, 2, 3, 4, 5, 6, 7], // Daily
    busType: 'Semi-Sleeper AC',
    totalSeats: 40,
    availableSeats: 28,
    basePrice: 550,
    route: ['Gaya', 'Koderma', 'Hazaribagh', 'Dhanbad', 'Jamshedpur'],
    amenities: ['AC', 'Reclining Seats', 'Charging Point', 'Water Bottle'],
    isActive: true,
    isFeatured: true,
    boardingPoints: [
      { location: 'Gaya Junction Bus Stand', time: '07:30' },
      { location: 'Tekari Road', time: '07:45' }
    ],
    droppingPoints: [
      { location: 'Jamshedpur Bus Stand', time: '12:45' },
      { location: 'Sakchi', time: '13:00' }
    ]
  },
  {
    id: '3',
    busNumber: 'BR-03-2024',
    busName: 'Muzaffarpur Dhanbad',
    operator: 'Golden Travels',
    departure: 'Muzaffarpur',
    arrival: 'Dhanbad',
    departureTime: '05:00',
    arrivalTime: '13:30',
    duration: '8h 30m',
    distance: 485,
    frequency: [1, 3, 5, 7], // Mon, Wed, Fri, Sun
    busType: 'AC Seater',
    totalSeats: 52,
    availableSeats: 38,
    basePrice: 750,
    route: ['Muzaffarpur', 'Patna', 'Arrah', 'Dehri-on-Sone', 'Gaya', 'Koderma', 'Dhanbad'],
    amenities: ['AC', 'Charging Point', 'Water Bottle', 'Snacks'],
    isActive: true,
    isFeatured: false,
    boardingPoints: [
      { location: 'Muzaffarpur Bus Terminal', time: '05:00' },
      { location: 'Railway Station', time: '05:15' }
    ],
    droppingPoints: [
      { location: 'Dhanbad Bus Stand', time: '13:30' },
      { location: 'IIT ISM Campus', time: '13:45' }
    ]
  },
  {
    id: '4',
    busNumber: 'BR-04-2024',
    busName: 'Bhagalpur Deoghar Express',
    operator: 'East Bihar Transport',
    departure: 'Bhagalpur',
    arrival: 'Deoghar',
    departureTime: '08:15',
    arrivalTime: '11:30',
    duration: '3h 15m',
    distance: 155,
    frequency: [1, 2, 3, 4, 5, 6, 7], // Daily
    busType: 'Non-AC Seater',
    totalSeats: 48,
    availableSeats: 35,
    basePrice: 280,
    route: ['Bhagalpur', 'Banka', 'Dumka', 'Deoghar'],
    amenities: ['Reclining Seats', 'Charging Point', 'Water Bottle'],
    isActive: true,
    isFeatured: false,
    boardingPoints: [
      { location: 'Bhagalpur Bus Stand', time: '08:15' },
      { location: 'Tilka Manjhi University', time: '08:30' }
    ],
    droppingPoints: [
      { location: 'Deoghar Bus Terminal', time: '11:30' },
      { location: 'Baidyanath Temple', time: '11:45' }
    ]
  },

  // ===== ODISHA TO JHARKHAND BUSES =====
  {
    id: '5',
    busNumber: 'OD-01-2024',
    busName: 'Bhubaneswar Ranchi Luxury',
    operator: 'Kalinga Travels',
    departure: 'Bhubaneswar',
    arrival: 'Ranchi',
    departureTime: '20:30',
    arrivalTime: '07:45',
    duration: '11h 15m',
    distance: 485,
    frequency: [1, 2, 3, 4, 5, 6, 7], // Daily
    busType: 'Sleeper AC',
    totalSeats: 36,
    availableSeats: 24,
    basePrice: 950,
    route: ['Bhubaneswar', 'Cuttack', 'Angul', 'Rourkela', 'Chaibasa', 'Ranchi'],
    amenities: ['AC', 'Sleeper Berths', 'WiFi', 'Charging Point', 'Blanket', 'Pillow', 'Water Bottle', 'Snacks'],
    isActive: true,
    isFeatured: true,
    boardingPoints: [
      { location: 'Bhubaneswar Bus Terminal', time: '20:30' },
      { location: 'Master Canteen Square', time: '20:45' },
      { location: 'Patia', time: '21:00' }
    ],
    droppingPoints: [
      { location: 'Ranchi Bus Terminal', time: '07:45' },
      { location: 'Harmu Road', time: '08:00' },
      { location: 'Circular Road', time: '08:15' }
    ]
  },
  {
    id: '6',
    busNumber: 'OD-02-2024',
    busName: 'Puri Jamshedpur Express',
    operator: 'Jagannath Travels',
    departure: 'Puri',
    arrival: 'Jamshedpur',
    departureTime: '18:00',
    arrivalTime: '04:30',
    duration: '10h 30m',
    distance: 425,
    frequency: [1, 2, 3, 4, 5, 6, 7], // Daily
    busType: 'Volvo AC',
    totalSeats: 45,
    availableSeats: 31,
    basePrice: 850,
    route: ['Puri', 'Bhubaneswar', 'Cuttack', 'Jajpur', 'Balasore', 'Jamshedpur'],
    amenities: ['AC', 'WiFi', 'Charging Point', 'Entertainment', 'Water Bottle', 'Blanket'],
    isActive: true,
    isFeatured: true,
    boardingPoints: [
      { location: 'Puri Bus Stand', time: '18:00' },
      { location: 'Jagannath Temple', time: '18:15' }
    ],
    droppingPoints: [
      { location: 'Jamshedpur Bus Stand', time: '04:30' },
      { location: 'Bistupur', time: '04:45' },
      { location: 'Sakchi', time: '05:00' }
    ]
  },
  {
    id: '7',
    busNumber: 'OD-03-2024',
    busName: 'Cuttack Dhanbad Super',
    operator: 'Silver Line Travels',
    departure: 'Cuttack',
    arrival: 'Dhanbad',
    departureTime: '07:00',
    arrivalTime: '15:15',
    duration: '8h 15m',
    distance: 385,
    frequency: [1, 3, 5, 7], // Mon, Wed, Fri, Sun
    busType: 'Semi-Sleeper AC',
    totalSeats: 40,
    availableSeats: 29,
    basePrice: 720,
    route: ['Cuttack', 'Jajpur', 'Keonjhar', 'Rourkela', 'Asansol', 'Dhanbad'],
    amenities: ['AC', 'Reclining Seats', 'Charging Point', 'Water Bottle'],
    isActive: true,
    isFeatured: false,
    boardingPoints: [
      { location: 'Cuttack Bus Stand', time: '07:00' },
      { location: 'Millennium City Centre', time: '07:15' }
    ],
    droppingPoints: [
      { location: 'Dhanbad Bus Terminal', time: '15:15' },
      { location: 'Coal India Office', time: '15:30' }
    ]
  },
  {
    id: '8',
    busNumber: 'OD-04-2024',
    busName: 'Berhampur Bokaro Express',
    operator: 'Ganjam Travels',
    departure: 'Berhampur',
    arrival: 'Bokaro Steel City',
    departureTime: '19:30',
    arrivalTime: '08:45',
    duration: '13h 15m',
    distance: 625,
    frequency: [2, 4, 6], // Tue, Thu, Sat
    busType: 'Sleeper AC',
    totalSeats: 36,
    availableSeats: 22,
    basePrice: 1050,
    route: ['Berhampur', 'Bhubaneswar', 'Cuttack', 'Rourkela', 'Ranchi', 'Bokaro Steel City'],
    amenities: ['AC', 'Sleeper Berths', 'WiFi', 'Charging Point', 'Blanket', 'Pillow', 'Meals'],
    isActive: true,
    isFeatured: true,
    boardingPoints: [
      { location: 'Berhampur Bus Terminal', time: '19:30' },
      { location: 'Railway Station', time: '19:45' }
    ],
    droppingPoints: [
      { location: 'Bokaro Bus Stand', time: '08:45' },
      { location: 'Steel Plant Gate', time: '09:00' }
    ]
  },
  {
    id: '9',
    busNumber: 'OD-05-2024',
    busName: 'Rourkela Chaibasa Direct',
    operator: 'Steel City Transport',
    departure: 'Rourkela',
    arrival: 'Chaibasa',
    departureTime: '14:00',
    arrivalTime: '18:30',
    duration: '4h 30m',
    distance: 195,
    frequency: [1, 2, 3, 4, 5, 6], // Mon-Sat
    busType: 'AC Seater',
    totalSeats: 50,
    availableSeats: 37,
    basePrice: 420,
    route: ['Rourkela', 'Bonai', 'Keonjhar', 'Chaibasa'],
    amenities: ['AC', 'Charging Point', 'Water Bottle'],
    isActive: true,
    isFeatured: false,
    boardingPoints: [
      { location: 'Rourkela Bus Stand', time: '14:00' },
      { location: 'Steel Plant', time: '14:15' }
    ],
    droppingPoints: [
      { location: 'Chaibasa Bus Stand', time: '18:30' },
      { location: 'Collectorate', time: '18:45' }
    ]
  },

  // ===== WEST BENGAL TO JHARKHAND BUSES =====
  {
    id: '10',
    busNumber: 'WB-01-2024',
    busName: 'Kolkata Ranchi Premium',
    operator: 'Royal Bengal Travels',
    departure: 'Kolkata',
    arrival: 'Ranchi',
    departureTime: '21:00',
    arrivalTime: '06:30',
    duration: '9h 30m',
    distance: 425,
    frequency: [1, 2, 3, 4, 5, 6, 7], // Daily
    busType: 'Luxury',
    totalSeats: 32,
    availableSeats: 18,
    basePrice: 1200,
    route: ['Kolkata', 'Howrah', 'Burdwan', 'Asansol', 'Dhanbad', 'Bokaro Steel City', 'Ranchi'],
    amenities: ['Luxury AC', 'Sleeper Berths', 'WiFi', 'Entertainment', 'Meals', 'Blanket', 'Pillow', 'Charging Point'],
    isActive: true,
    isFeatured: true,
    boardingPoints: [
      { location: 'Esplanade Bus Terminal', time: '21:00' },
      { location: 'Howrah Station', time: '21:30' },
      { location: 'Sealdah', time: '21:15' }
    ],
    droppingPoints: [
      { location: 'Ranchi Bus Terminal', time: '06:30' },
      { location: 'Main Road', time: '06:45' },
      { location: 'Upper Bazar', time: '07:00' }
    ]
  },
  {
    id: '11',
    busNumber: 'WB-02-2024',
    busName: 'Asansol Jamshedpur Express',
    operator: 'East Bengal Transport',
    departure: 'Asansol',
    arrival: 'Jamshedpur',
    departureTime: '06:30',
    arrivalTime: '10:45',
    duration: '4h 15m',
    distance: 185,
    frequency: [1, 2, 3, 4, 5, 6, 7], // Daily
    busType: 'Volvo AC',
    totalSeats: 45,
    availableSeats: 33,
    basePrice: 480,
    route: ['Asansol', 'Durgapur', 'Dhanbad', 'Jamshedpur'],
    amenities: ['AC', 'WiFi', 'Charging Point', 'Water Bottle'],
    isActive: true,
    isFeatured: true,
    boardingPoints: [
      { location: 'Asansol Bus Terminal', time: '06:30' },
      { location: 'Burnpur', time: '06:45' }
    ],
    droppingPoints: [
      { location: 'Jamshedpur Bus Stand', time: '10:45' },
      { location: 'Kadma', time: '11:00' }
    ]
  },
  {
    id: '12',
    busNumber: 'WB-03-2024',
    busName: 'Durgapur Dhanbad Super',
    operator: 'Steel Express',
    departure: 'Durgapur',
    arrival: 'Dhanbad',
    departureTime: '15:30',
    arrivalTime: '18:15',
    duration: '2h 45m',
    distance: 125,
    frequency: [1, 2, 3, 4, 5, 6, 7], // Daily
    busType: 'AC Seater',
    totalSeats: 48,
    availableSeats: 35,
    basePrice: 320,
    route: ['Durgapur', 'Andal', 'Asansol', 'Dhanbad'],
    amenities: ['AC', 'Charging Point', 'Water Bottle'],
    isActive: true,
    isFeatured: false,
    boardingPoints: [
      { location: 'Durgapur Bus Stand', time: '15:30' },
      { location: 'City Centre', time: '15:45' }
    ],
    droppingPoints: [
      { location: 'Dhanbad Bus Terminal', time: '18:15' },
      { location: 'Bank More', time: '18:30' }
    ]
  },
  {
    id: '13',
    busNumber: 'WB-04-2024',
    busName: 'Siliguri Ranchi Overnight',
    operator: 'North Bengal Travels',
    departure: 'Siliguri',
    arrival: 'Ranchi',
    departureTime: '19:00',
    arrivalTime: '09:30',
    duration: '14h 30m',
    distance: 625,
    frequency: [1, 3, 5], // Mon, Wed, Fri
    busType: 'Sleeper AC',
    totalSeats: 36,
    availableSeats: 21,
    basePrice: 1150,
    route: ['Siliguri', 'Malda', 'Farakka', 'Bhagalpur', 'Dumka', 'Ranchi'],
    amenities: ['AC', 'Sleeper Berths', 'WiFi', 'Charging Point', 'Blanket', 'Pillow', 'Meals'],
    isActive: true,
    isFeatured: true,
    boardingPoints: [
      { location: 'Siliguri Bus Terminal', time: '19:00' },
      { location: 'Tenzing Norgay Central Bus Terminus', time: '19:15' }
    ],
    droppingPoints: [
      { location: 'Ranchi Bus Terminal', time: '09:30' },
      { location: 'Firayalal Chowk', time: '09:45' }
    ]
  },

  // ===== INTRA-JHARKHAND BUSES =====
  {
    id: '14',
    busNumber: 'JH-01-2024',
    busName: 'Ranchi Jamshedpur Shuttle',
    operator: 'Jharkhand State Transport',
    departure: 'Ranchi',
    arrival: 'Jamshedpur',
    departureTime: '07:00',
    arrivalTime: '11:30',
    duration: '4h 30m',
    distance: 135,
    frequency: [1, 2, 3, 4, 5, 6, 7], // Daily
    busType: 'AC Seater',
    totalSeats: 50,
    availableSeats: 38,
    basePrice: 350,
    route: ['Ranchi', 'Ramgarh', 'Bokaro Steel City', 'Dhanbad', 'Jamshedpur'],
    amenities: ['AC', 'Charging Point', 'Water Bottle'],
    isActive: true,
    isFeatured: true,
    boardingPoints: [
      { location: 'Ranchi Bus Terminal', time: '07:00' },
      { location: 'Albert Ekka Chowk', time: '07:15' },
      { location: 'Harmu Road', time: '07:30' }
    ],
    droppingPoints: [
      { location: 'Jamshedpur Bus Stand', time: '11:30' },
      { location: 'Bistupur', time: '11:45' },
      { location: 'Sonari', time: '12:00' }
    ]
  },
  {
    id: '15',
    busNumber: 'JH-02-2024',
    busName: 'Dhanbad Deoghar Express',
    operator: 'Coal City Transport',
    departure: 'Dhanbad',
    arrival: 'Deoghar',
    departureTime: '08:30',
    arrivalTime: '11:15',
    duration: '2h 45m',
    distance: 85,
    frequency: [1, 2, 3, 4, 5, 6, 7], // Daily
    busType: 'Non-AC Seater',
    totalSeats: 48,
    availableSeats: 36,
    basePrice: 180,
    route: ['Dhanbad', 'Madhupur', 'Deoghar'],
    amenities: ['Reclining Seats', 'Charging Point', 'Water Bottle'],
    isActive: true,
    isFeatured: false,
    boardingPoints: [
      { location: 'Dhanbad Bus Terminal', time: '08:30' },
      { location: 'IIT ISM Campus', time: '08:45' }
    ],
    droppingPoints: [
      { location: 'Deoghar Bus Terminal', time: '11:15' },
      { location: 'Baidyanath Temple', time: '11:30' }
    ]
  },
  {
    id: '16',
    busNumber: 'JH-03-2024',
    busName: 'Bokaro Giridih Local',
    operator: 'Steel City Transport',
    departure: 'Bokaro Steel City',
    arrival: 'Giridih',
    departureTime: '14:15',
    arrivalTime: '17:00',
    duration: '2h 45m',
    distance: 95,
    frequency: [1, 2, 3, 4, 5, 6], // Mon-Sat
    busType: 'Non-AC Seater',
    totalSeats: 44,
    availableSeats: 32,
    basePrice: 150,
    route: ['Bokaro Steel City', 'Koderma', 'Hazaribagh', 'Giridih'],
    amenities: ['Reclining Seats', 'Charging Point'],
    isActive: true,
    isFeatured: false,
    boardingPoints: [
      { location: 'Bokaro Bus Stand', time: '14:15' },
      { location: 'Steel Plant Gate', time: '14:30' }
    ],
    droppingPoints: [
      { location: 'Giridih Bus Terminal', time: '17:00' },
      { location: 'Collectorate', time: '17:15' }
    ]
  },
  {
    id: '17',
    busNumber: 'JH-04-2024',
    busName: 'Ranchi Hazaribagh Express',
    operator: 'Capital Transport',
    departure: 'Ranchi',
    arrival: 'Hazaribagh',
    departureTime: '09:00',
    arrivalTime: '11:45',
    duration: '2h 45m',
    distance: 85,
    frequency: [1, 2, 3, 4, 5, 6, 7], // Daily
    busType: 'AC Seater',
    totalSeats: 45,
    availableSeats: 34,
    basePrice: 220,
    route: ['Ranchi', 'Ramgarh', 'Hazaribagh'],
    amenities: ['AC', 'Charging Point', 'Water Bottle'],
    isActive: true,
    isFeatured: false,
    boardingPoints: [
      { location: 'Ranchi Bus Terminal', time: '09:00' },
      { location: 'Circular Road', time: '09:15' }
    ],
    droppingPoints: [
      { location: 'Hazaribagh Bus Stand', time: '11:45' },
      { location: 'District Court', time: '12:00' }
    ]
  },
  {
    id: '18',
    busNumber: 'JH-05-2024',
    busName: 'Jamshedpur Chaibasa Direct',
    operator: 'Singhbhum Transport',
    departure: 'Jamshedpur',
    arrival: 'Chaibasa',
    departureTime: '16:30',
    arrivalTime: '18:45',
    duration: '2h 15m',
    distance: 85,
    frequency: [1, 2, 3, 4, 5, 6, 7], // Daily
    busType: 'AC Seater',
    totalSeats: 42,
    availableSeats: 28,
    basePrice: 200,
    route: ['Jamshedpur', 'Ghatsila', 'Chaibasa'],
    amenities: ['AC', 'Charging Point', 'Water Bottle'],
    isActive: true,
    isFeatured: false,
    boardingPoints: [
      { location: 'Jamshedpur Bus Stand', time: '16:30' },
      { location: 'Sakchi', time: '16:45' }
    ],
    droppingPoints: [
      { location: 'Chaibasa Bus Stand', time: '18:45' },
      { location: 'Main Market', time: '19:00' }
    ]
  },
  {
    id: '19',
    busNumber: 'JH-06-2024',
    busName: 'Dumka Pakur Express',
    operator: 'Santhal Transport',
    departure: 'Dumka',
    arrival: 'Pakur',
    departureTime: '12:00',
    arrivalTime: '14:30',
    duration: '2h 30m',
    distance: 85,
    frequency: [1, 3, 5, 7], // Mon, Wed, Fri, Sun
    busType: 'Non-AC Seater',
    totalSeats: 40,
    availableSeats: 30,
    basePrice: 140,
    route: ['Dumka', 'Rampurhat', 'Pakur'],
    amenities: ['Reclining Seats', 'Charging Point'],
    isActive: true,
    isFeatured: false,
    boardingPoints: [
      { location: 'Dumka Bus Terminal', time: '12:00' },
      { location: 'College More', time: '12:15' }
    ],
    droppingPoints: [
      { location: 'Pakur Bus Stand', time: '14:30' },
      { location: 'Railway Station', time: '14:45' }
    ]
  },
  {
    id: '20',
    busNumber: 'JH-07-2024',
    busName: 'Lohardaga Gumla Connect',
    operator: 'Tribal Transport',
    departure: 'Lohardaga',
    arrival: 'Gumla',
    departureTime: '10:30',
    arrivalTime: '12:15',
    duration: '1h 45m',
    distance: 55,
    frequency: [1, 2, 3, 4, 5, 6], // Mon-Sat
    busType: 'Non-AC Seater',
    totalSeats: 35,
    availableSeats: 26,
    basePrice: 95,
    route: ['Lohardaga', 'Kuru', 'Gumla'],
    amenities: ['Basic Seating', 'Charging Point'],
    isActive: true,
    isFeatured: false,
    boardingPoints: [
      { location: 'Lohardaga Bus Stand', time: '10:30' },
      { location: 'Court Road', time: '10:45' }
    ],
    droppingPoints: [
      { location: 'Gumla Bus Terminal', time: '12:15' },
      { location: 'District Hospital', time: '12:30' }
    ]
  }
];

// Helper functions
export const getBusesByRoute = (departure: string, arrival: string) => {
  return busesData.filter(bus => 
    bus.departure.toLowerCase().includes(departure.toLowerCase()) &&
    bus.arrival.toLowerCase().includes(arrival.toLowerCase())
  );
};

export const searchBuses = (searchTerm: string) => {
  const term = searchTerm.toLowerCase();
  return busesData.filter(bus => 
    bus.busName.toLowerCase().includes(term) ||
    bus.busNumber.toLowerCase().includes(term) ||
    bus.departure.toLowerCase().includes(term) ||
    bus.arrival.toLowerCase().includes(term) ||
    bus.operator.toLowerCase().includes(term) ||
    bus.route.some(station => station.toLowerCase().includes(term))
  );
};

export const getFeaturedBuses = () => {
  return busesData.filter(bus => bus.isFeatured);
};

export const getBusesBySource = (source: string) => {
  return busesData.filter(bus => 
    bus.departure.toLowerCase().includes(source.toLowerCase()) ||
    bus.route.some(station => station.toLowerCase().includes(source.toLowerCase()))
  );
};

export const getBusesByDestination = (destination: string) => {
  return busesData.filter(bus => 
    bus.arrival.toLowerCase().includes(destination.toLowerCase()) ||
    bus.route.some(station => station.toLowerCase().includes(destination.toLowerCase()))
  );
};
