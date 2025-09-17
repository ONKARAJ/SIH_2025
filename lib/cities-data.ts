export interface CityData {
  id: string
  name: string
  description: string
  longDescription: string
  population: string
  district: string
  area: string
  altitude: string
  coordinates: {
    lat: number
    lng: number
  }
  images: {
    hero: string
    gallery: string[]
  }
  highlights: string[]
  attractions: {
    name: string
    description: string
    image: string
    category: string
    distance: string
    rating: number
  }[]
  hotels: {
    name: string
    description: string
    image: string
    rating: number
    price: string
    amenities: string[]
    category: 'luxury' | 'business' | 'budget'
  }[]
  foodPlaces: {
    name: string
    description: string
    cuisine: string
    priceRange: string
    rating: number
    image: string
    specialties: string[]
  }[]
  transport: {
    airport?: string
    railway: string[]
    busStand: string
    nearestAirport?: {
      name: string
      distance: string
    }
  }
  specialties: string[]
  bestTimeToVisit: string
  climate: string
  reviews: {
    id: string
    name: string
    rating: number
    comment: string
    date: string
    images?: string[]
  }[]
}

export const citiesData: CityData[] = [
  {
    id: 'ranchi',
    name: 'Ranchi',
    description: 'The capital city known for its hills and waterfalls',
    longDescription: `Ranchi, the capital city of Jharkhand, is often called the "City of Waterfalls" due to its numerous cascading falls. Situated at an altitude of 2,140 feet above sea level, it enjoys a pleasant climate throughout the year. The city is a perfect blend of natural beauty and modern development, serving as the political and educational hub of the state. With its lush green hills, serene lakes, and rich tribal culture, Ranchi offers a unique experience to visitors seeking both adventure and tranquility.`,
    population: '1.2 Million',
    district: 'Ranchi',
    area: '652 sq km',
    altitude: '652 m',
    coordinates: {
      lat: 23.3441,
      lng: 85.3096
    },
    images: {
      hero: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf5a?w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
        'https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=800&q=80',
        'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80'
      ]
    },
    highlights: ['State Capital', 'Educational Hub', 'Hill Station', 'Waterfalls', 'Tribal Culture'],
    attractions: [
      {
        name: 'Hundru Falls',
        description: '98-meter high spectacular waterfall surrounded by dense forest, perfect for adventure seekers',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        category: 'Waterfall',
        distance: '45 km',
        rating: 4.5
      },
      {
        name: 'Dassam Falls',
        description: 'A scenic waterfall set in verdant surroundings, offering natural beauty and tranquility',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        category: 'Waterfall',
        distance: '40 km',
        rating: 4.4
      },
      {
        name: 'Tagore Hill',
        description: 'Historic hill where Nobel laureate Rabindranath Tagore stayed, now a cultural center with panoramic views',
        image: 'https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=800&q=80',
        category: 'Historical',
        distance: '5 km',
        rating: 4.0
      },
      {
        name: 'Surya Temple (Bundu)',
        description: 'Unique temple built like a chariot with wheels and horses, dedicated to the Sun god',
        image: 'https://images.unsplash.com/photo-1582632443527-6747dfed4a37?w=800&q=80',
        category: 'Religious',
        distance: '20 km',
        rating: 4.2
      },
      {
        name: 'Pahari Mandir',
        description: 'Hilltop temple with many steps offering panoramic views of the city',
        image: 'https://images.unsplash.com/photo-1582632443527-6747dfed4a37?w=800&q=80',
        category: 'Religious',
        distance: '8 km',
        rating: 4.3
      },
      {
        name: 'Ranchi Lake',
        description: 'Historic lake offering a peaceful spot for walks by the water and evening relaxation',
        image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80',
        category: 'Lake',
        distance: '3 km',
        rating: 4.1
      },
      {
        name: 'State Museum, Hotwar',
        description: 'Museum showcasing local culture, art, and history of Jharkhand',
        image: 'https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=800&q=80',
        category: 'Museum',
        distance: '6 km',
        rating: 4.0
      },
      {
        name: 'Bhagwan Birsa Biological Park',
        description: 'Zoo and botanical sections perfect for families and nature lovers',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
        category: 'Zoo',
        distance: '15 km',
        rating: 4.2
      }
    ],
    hotels: [
      {
        name: 'Radisson Blu Hotel Ranchi',
        description: 'Luxury 5-star hotel with world-class amenities and impeccable service',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        rating: 4.5,
        price: '₹8,500 per night',
        amenities: ['WiFi', 'Swimming Pool', 'Spa', 'Restaurant'],
        category: 'luxury'
      },
      {
        name: 'The Chanakya BNR Hotel',
        description: 'Premium business hotel in the heart of Ranchi with modern facilities',
        image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
        rating: 4.2,
        price: '₹5,500 per night',
        amenities: ['WiFi', 'Restaurant', 'Business Center', 'Room Service'],
        category: 'business'
      },
      {
        name: 'Hotel Green Acres',
        description: 'Comfortable mid-range hotel with garden views and excellent hospitality',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
        rating: 4.0,
        price: '₹3,500 per night',
        amenities: ['WiFi', 'Restaurant', 'Garden', 'Parking'],
        category: 'business'
      },
      {
        name: 'Coral Grand',
        description: 'Elegant hotel offering luxury amenities and personalized service',
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
        rating: 4.3,
        price: '₹4,800 per night',
        amenities: ['WiFi', 'Swimming Pool', 'Restaurant', 'Gym'],
        category: 'luxury'
      },
      {
        name: 'Jade Square',
        description: 'Modern business hotel with contemporary design and amenities',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
        rating: 4.1,
        price: '₹4,200 per night',
        amenities: ['WiFi', 'Restaurant', 'Conference Room', 'Parking'],
        category: 'business'
      },
      {
        name: 'Hotel Yuvraj Palace',
        description: 'Traditional palace-style hotel with royal ambiance and comfort',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        rating: 4.2,
        price: '₹3,800 per night',
        amenities: ['WiFi', 'Restaurant', 'Palace Architecture', 'Room Service'],
        category: 'business'
      },
      {
        name: 'Hotel Kwality Inns',
        description: 'Budget-friendly hotel with quality service and essential amenities',
        image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
        rating: 3.8,
        price: '₹2,200 per night',
        amenities: ['WiFi', 'Restaurant', 'AC', 'Parking'],
        category: 'budget'
      }
    ],
    foodPlaces: [
      {
        name: 'Kaveri Restaurant',
        description: 'Iconic multi-cuisine restaurant serving authentic dishes since 1982',
        cuisine: 'North Indian, Continental, Chinese',
        priceRange: '₹800-1200 for two',
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
        specialties: ['Butter Chicken', 'Biryani', 'Continental Breakfast']
      }
    ],
    transport: {
      airport: 'Birsa Munda Airport (IXR)',
      railway: ['Ranchi Junction', 'Hatia Railway Station'],
      busStand: 'Khadgarha Bus Stand'
    },
    specialties: ['Tribal Culture', 'Handloom', 'Natural Beauty', 'Educational Excellence'],
    bestTimeToVisit: 'October to March',
    climate: 'Moderate subtropical climate with pleasant summers and mild winters',
    reviews: [
      {
        id: '1',
        name: 'Priya Sharma',
        rating: 5,
        comment: 'Amazing city with beautiful waterfalls and hills. The weather is perfect!',
        date: '2024-01-15'
      },
      {
        id: '2',
        name: 'Rajesh Kumar',
        rating: 4,
        comment: 'Great capital city with good connectivity. Loved the Hundru Falls and Tagore Hill. The tribal culture is fascinating.',
        date: '2024-02-28'
      },
      {
        id: '3',
        name: 'Meera Singh',
        rating: 5,
        comment: 'Perfect blend of nature and urban development. The lakes and waterfalls are breathtaking. Must visit for nature lovers!',
        date: '2024-03-10'
      }
    ]
  },
  {
    id: 'jamshedpur',
    name: 'Jamshedpur',
    description: 'Steel city and industrial hub of eastern India',
    longDescription: `Jamshedpur, fondly known as the "Steel City" and "Pittsburgh of India," is a testament to India's industrial prowess. Founded by the visionary industrialist Jamsetji Tata, this planned city is home to Tata Steel, one of India's largest steel manufacturing companies. Despite being an industrial hub, Jamshedpur is remarkably clean and green, earning it the title of India's first planned industrial city.`,
    population: '1.3 Million',
    district: 'East Singhbhum',
    area: '224 sq km',
    altitude: '135 m',
    coordinates: {
      lat: 22.8046,
      lng: 86.2029
    },
    images: {
      hero: 'https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1570194065650-d99fb4bedf5a?w=800&q=80',
        'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
        'https://images.unsplash.com/photo-1582632443527-6747dfed4a37?w=800&q=80'
      ]
    },
    highlights: ['Steel Production', 'Planned City', 'Industrial Hub', 'Clean & Green', 'Modern Infrastructure'],
    attractions: [
      {
        name: 'Jubilee Park',
        description: 'Sprawling 225-acre urban park with gardens, lake, and fountains - perfect for families',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
        category: 'Park',
        distance: 'City Center',
        rating: 4.4
      },
      {
        name: 'Tata Steel Zoological Park',
        description: 'Well-maintained zoo with diverse animals, nature walks, and zoo rides for visitors',
        image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80',
        category: 'Zoo',
        distance: '5 km',
        rating: 4.2
      },
      {
        name: 'Dimna Lake',
        description: 'Scenic lake just outside the city offering boating, beautiful views, and peaceful surroundings',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        category: 'Lake',
        distance: '13 km',
        rating: 4.3
      },
      {
        name: 'Dalma Wildlife Sanctuary',
        description: 'Forested hills perfect for trekking and animal sightings in natural habitat',
        image: 'https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=800&q=80',
        category: 'Wildlife',
        distance: '25 km',
        rating: 4.1
      },
      {
        name: 'Jayanti Sarovar',
        description: 'Beautiful water body inside the park area, ideal for peaceful walks and photography',
        image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80',
        category: 'Lake',
        distance: '3 km',
        rating: 4.0
      },
      {
        name: 'Bhuvaneshwari Temple',
        description: 'Hilltop temple offering panoramic views and spiritual atmosphere',
        image: 'https://images.unsplash.com/photo-1582632443527-6747dfed4a37?w=800&q=80',
        category: 'Religious',
        distance: '12 km',
        rating: 4.2
      }
    ],
    hotels: [
      {
        name: 'Vivanta Jamshedpur, Golmuri',
        description: 'Luxury 5-star hotel by Tata Group with world-class amenities and service',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        rating: 4.6,
        price: '₹9,500 per night',
        amenities: ['WiFi', 'Swimming Pool', 'Spa', 'Multiple Restaurants', 'Gym'],
        category: 'luxury'
      },
      {
        name: 'Ramada by Wyndham Jamshedpur',
        description: 'International standard hotel with modern facilities and comfort',
        image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
        rating: 4.4,
        price: '₹7,200 per night',
        amenities: ['WiFi', 'Restaurant', 'Gym', 'Business Center', 'Pool'],
        category: 'luxury'
      },
      {
        name: 'Lemon Tree Hotel, Centre Point',
        description: 'Contemporary business hotel with vibrant design and excellent service',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
        rating: 4.3,
        price: '₹5,800 per night',
        amenities: ['WiFi', 'Restaurant', 'Business Center', 'Gym', 'Room Service'],
        category: 'business'
      },
      {
        name: 'Hotel Alcor',
        description: 'Premium business hotel in the heart of steel city with modern amenities',
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
        rating: 4.2,
        price: '₹4,500 per night',
        amenities: ['WiFi', 'Restaurant', 'Business Center', 'Conference Room'],
        category: 'business'
      },
      {
        name: 'The Sonnet',
        description: 'Boutique hotel offering personalized service and elegant accommodations',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
        rating: 4.1,
        price: '₹3,800 per night',
        amenities: ['WiFi', 'Restaurant', 'Room Service', 'Parking'],
        category: 'business'
      }
    ],
    foodPlaces: [
      {
        name: 'Mainland China',
        description: 'Upscale Chinese restaurant known for authentic flavors',
        cuisine: 'Chinese, Asian',
        priceRange: '₹1000-1400 for two',
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1552566149-aa3fe5d4a65e?w=800&q=80',
        specialties: ['Dim Sum', 'Peking Duck', 'Szechuan Chicken']
      }
    ],
    transport: {
      railway: ['Tatanagar Junction', 'Adityapur'],
      busStand: 'Tatanagar Bus Stand',
      nearestAirport: {
        name: 'Birsa Munda Airport, Ranchi',
        distance: '140 km'
      }
    },
    specialties: ['Steel Industry', 'Planned Urban Development', 'Industrial Tourism', 'Modern Infrastructure'],
    bestTimeToVisit: 'October to March',
    climate: 'Tropical climate with hot summers and pleasant winters',
    reviews: [
      {
        id: '1',
        name: 'Amit Patel',
        rating: 4,
        comment: 'Very clean and well-organized city. Great for business and leisure.',
        date: '2024-01-20'
      },
      {
        id: '2',
        name: 'Sunita Rani',
        rating: 5,
        comment: 'Impressed by the city planning and cleanliness. Jubilee Park is beautiful and Tata Steel plant tour was educational.',
        date: '2024-02-14'
      },
      {
        id: '3',
        name: 'Vikram Gupta',
        rating: 4,
        comment: 'Great industrial city with modern infrastructure. Dalma Wildlife Sanctuary nearby is a bonus for nature enthusiasts.',
        date: '2024-03-05'
      }
    ]
  }
,
  {
    id: 'bokaro',
    name: 'Bokaro',
    description: 'Planned steel city with lakes and green spaces',
    longDescription: 'Bokaro Steel City is one of India\'s first planned cities, known for its steel plant, serene lakes, and organized urban layout. It offers a balanced mix of industry and nature.',
    population: '563,000',
    district: 'Bokaro',
    area: '183 sq km',
    altitude: '210 m',
    coordinates: { lat: 23.6693, lng: 86.1511 },
    images: {
      hero: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80'
      ]
    },
    highlights: ['Planned City', 'Steel Plant', 'Lakes', 'Green Spaces'],
    attractions: [
      { name: 'Jawaharlal Nehru Biological Park', description: 'City zoo with diverse species and green environment', image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80', category: 'Zoo', distance: '5 km', rating: 4.1 },
      { name: 'Garga Dam', description: 'Scenic reservoir with nature surroundings', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', category: 'Dam', distance: '12 km', rating: 4.2 },
      { name: 'Jagannath Temple', description: 'Religious site with hill views', image: 'https://images.unsplash.com/photo-1582632443527-6747dfed4a37?w=800&q=80', category: 'Religious', distance: '7 km', rating: 4.3 },
      { name: 'Ayyappa Temple', description: 'Peaceful temple noted for architecture', image: 'https://images.unsplash.com/photo-1582632443527-6747dfed4a37?w=800&q=80', category: 'Religious', distance: '10 km', rating: 4.1 },
      { name: 'Parasnath Hills', description: 'Major pilgrimage/trekking destination nearby', image: 'https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=800&q=80', category: 'Hill', distance: '50 km', rating: 4.5 },
      { name: 'Tenughat Dam', description: 'Large dam with beautiful vistas', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', category: 'Dam', distance: '55 km', rating: 4.2 }
    ],
    hotels: [
      {
        name: 'Hotel Neelkamal',
        description: 'Premier hotel in Bokaro with excellent hospitality and modern amenities',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        rating: 4.2,
        price: '₹3,800 per night',
        amenities: ['WiFi', 'Restaurant', 'Business Center', 'Parking'],
        category: 'business'
      },
      {
        name: 'Limcas Hotel',
        description: 'Comfortable business hotel with quality service and modern facilities',
        image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
        rating: 4.0,
        price: '₹3,200 per night',
        amenities: ['WiFi', 'Restaurant', 'AC', 'Room Service'],
        category: 'business'
      },
      {
        name: 'Reliance Hotel',
        description: 'Reliable accommodation with essential amenities and friendly service',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
        rating: 3.9,
        price: '₹2,800 per night',
        amenities: ['WiFi', 'Restaurant', 'Parking', 'AC'],
        category: 'business'
      },
      {
        name: 'Hotel Ananda',
        description: 'Peaceful hotel offering comfortable stay with personalized attention',
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
        rating: 4.1,
        price: '₹3,500 per night',
        amenities: ['WiFi', 'Restaurant', 'Garden', 'Room Service'],
        category: 'business'
      },
      {
        name: 'Yuvraj Regency',
        description: 'Elegant hotel with royal touch and modern comforts for discerning guests',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
        rating: 4.2,
        price: '₹4,000 per night',
        amenities: ['WiFi', 'Restaurant', 'Business Center', 'Conference Room'],
        category: 'business'
      }
    ],
    foodPlaces: [
      { name: 'City Diner', description: 'Popular family restaurant', cuisine: 'North Indian, Chinese', priceRange: '₹500-800 for two', rating: 4.0, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', specialties: ['Thali', 'Snacks'] }
    ],
    transport: { railway: ['Bokaro Steel City'], busStand: 'Sector 12 Bus Stand' },
    specialties: ['Steel Plant', 'Planned City', 'Lakes'],
    bestTimeToVisit: 'October to February',
    climate: 'Tropical with hot summers, mild winters',
    reviews: [
      {
        id: '1',
        name: 'Anita Devi',
        rating: 4,
        comment: 'Clean and well-organized steel city. The planned layout is impressive and Garga Dam is beautiful.',
        date: '2024-03-10'
      },
      {
        id: '2',
        name: 'Rohit Sharma',
        rating: 4,
        comment: 'Great planned city with good facilities. Parasnath Hills nearby make it perfect for weekend trips.',
        date: '2024-03-20'
      }
    ]
  },
  {
    id: 'dhanbad',
    name: 'Dhanbad',
    description: 'Coal capital with lakes and dams nearby',
    longDescription: 'Dhanbad is known as the Coal Capital of India. Beyond its industrial significance, it features natural escapes like lakes, waterfalls, and dams.',
    population: '1.2 Million',
    district: 'Dhanbad',
    area: '204 sq km',
    altitude: '227 m',
    coordinates: { lat: 23.7957, lng: 86.4304 },
    images: {
      hero: 'https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1570194065650-d99fb4bedf5a?w=800&q=80',
        'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80'
      ]
    },
    highlights: ['Coal Mining', 'Educational Centers', 'Lakes'],
    attractions: [
      { name: 'Bhatinda Falls', description: 'Waterfall set among rocks; a nature break from the city', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', category: 'Waterfall', distance: '14 km', rating: 4.2 },
      { name: 'Maithon Dam', description: 'Large dam popular with picnickers and boating', image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80', category: 'Dam', distance: '48 km', rating: 4.3 },
      { name: 'Topchanchi Lake', description: 'Scenic lake surrounded by hills; relaxing spot', image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80', category: 'Lake', distance: '37 km', rating: 4.2 },
      { name: 'Shakti Mandir', description: 'Local temple & pilgrimage site', image: 'https://images.unsplash.com/photo-1582632443527-6747dfed4a37?w=800&q=80', category: 'Religious', distance: '3 km', rating: 4.1 },
      { name: 'Panchet Dam', description: 'Dam with surroundings good for nature/photography', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', category: 'Dam', distance: '55 km', rating: 4.0 }
    ],
    hotels: [
      {
        name: 'Cocoon Luxury Business Hotel',
        description: 'Premium luxury hotel with world-class amenities and business facilities',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        rating: 4.4,
        price: '₹5,500 per night',
        amenities: ['WiFi', 'Swimming Pool', 'Restaurant', 'Business Center', 'Spa'],
        category: 'luxury'
      },
      {
        name: 'Hotel Sumandeep International',
        description: 'International standard hotel with modern amenities and excellent service',
        image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
        rating: 4.2,
        price: '₹4,200 per night',
        amenities: ['WiFi', 'Restaurant', 'Business Center', 'Gym'],
        category: 'business'
      },
      {
        name: 'Hotel Marina Inn',
        description: 'Comfortable accommodation with quality service and modern facilities',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
        rating: 4.0,
        price: '₹3,500 per night',
        amenities: ['WiFi', 'Restaurant', 'AC', 'Room Service'],
        category: 'business'
      },
      {
        name: 'Hotel Skylark',
        description: 'Well-appointed hotel offering comfortable stay with friendly service',
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
        rating: 3.9,
        price: '₹3,000 per night',
        amenities: ['WiFi', 'Restaurant', 'Parking', 'AC'],
        category: 'business'
      },
      {
        name: 'Mastiff Hotel',
        description: 'Reliable business hotel with essential amenities and good location',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
        rating: 3.8,
        price: '₹2,800 per night',
        amenities: ['WiFi', 'Restaurant', 'Business Center', 'Parking'],
        category: 'business'
      }
    ],
    foodPlaces: [
      { name: 'City Spice', description: 'Tasty local dishes', cuisine: 'North Indian', priceRange: '₹400-700 for two', rating: 4.0, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', specialties: ['Thali', 'Snacks'] }
    ],
    transport: { railway: ['Dhanbad Junction'], busStand: 'Bartand Bus Stand' },
    specialties: ['Coal Mining', 'Education'],
    bestTimeToVisit: 'October to February',
    climate: 'Tropical with hot summers, mild winters',
    reviews: [
      {
        id: '1',
        name: 'Manoj Kumar',
        rating: 4,
        comment: 'Good base to explore lakes and dams. Maithon Dam is spectacular and the educational institutions are impressive.',
        date: '2024-03-05'
      },
      {
        id: '2',
        name: 'Kavita Singh',
        rating: 4,
        comment: 'The coal capital has more to offer than expected. Bhatinda Falls and Topchanchi Lake are hidden gems.',
        date: '2024-03-18'
      }
    ]
  },
  {
    id: 'deoghar',
    name: 'Deoghar',
    description: 'Holy city famed for Baidyanath Jyotirlinga',
    longDescription: 'Deoghar is a major pilgrimage destination housing the revered Baidyanath Temple, one of the twelve Jyotirlingas. The town also offers hills, parks, and spiritual centers.',
    population: '203,000',
    district: 'Deoghar',
    area: '119 sq km',
    altitude: '254 m',
    coordinates: { lat: 24.4870, lng: 86.7100 },
    images: {
      hero: 'https://images.unsplash.com/photo-1582632443527-6747dfed4a37?w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1570194065650-d99fb4bedf5a?w=800&q=80',
        'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80'
      ]
    },
    highlights: ['Pilgrimage', 'Spiritual Heritage', 'Hills'],
    attractions: [
      { name: 'Baidyanath Temple (Baba Baidyanath Dham)', description: 'One of the 12 Jyotirlingas; major pilgrimage site', image: 'https://images.unsplash.com/photo-1582632443527-6747dfed4a37?w=800&q=80', category: 'Religious', distance: 'City Center', rating: 4.7 },
      { name: 'Basukinath', description: 'Important temple and religious site', image: 'https://images.unsplash.com/photo-1582632443527-6747dfed4a37?w=800&q=80', category: 'Religious', distance: '45 km', rating: 4.4 },
      { name: 'Trikuta Hills', description: 'Scenic hill area with viewpoints', image: 'https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=800&q=80', category: 'Hill', distance: '12 km', rating: 4.3 },
      { name: 'Satsanga Ashram', description: 'Spiritual/meditation centre', image: 'https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=800&q=80', category: 'Spiritual', distance: '3 km', rating: 4.2 },
      { name: 'Nandan Pahar', description: 'Hill viewpoint and park area', image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80', category: 'Park', distance: '4 km', rating: 4.1 }
    ],
    hotels: [
      {
        name: 'Hotel Mahamaya Palace',
        description: 'Premium pilgrimage hotel with traditional architecture and modern amenities',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        rating: 4.3,
        price: '₹4,500 per night',
        amenities: ['WiFi', 'Restaurant', 'Temple Shuttle', 'AC', 'Parking'],
        category: 'business'
      },
      {
        name: 'Shanti International',
        description: 'Peaceful hotel offering spiritual ambiance with modern comforts',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
        rating: 4.1,
        price: '₹3,200 per night',
        amenities: ['WiFi', 'Restaurant', 'Temple View', 'Room Service'],
        category: 'business'
      },
      {
        name: 'Hotel Shobhani',
        description: 'Comfortable accommodation with easy access to Baidyanath Temple',
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
        rating: 4.0,
        price: '₹2,800 per night',
        amenities: ['WiFi', 'Restaurant', 'Temple Pickup', 'AC'],
        category: 'business'
      },
      {
        name: 'Imperial Heights',
        description: 'Elevated hotel offering panoramic views and quality service',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
        rating: 4.2,
        price: '₹3,800 per night',
        amenities: ['WiFi', 'Restaurant', 'City View', 'Business Center'],
        category: 'business'
      },
      {
        name: 'Hotel Marine Blu',
        description: 'Modern hotel with contemporary design and pilgrim-friendly services',
        image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
        rating: 4.1,
        price: '₹3,500 per night',
        amenities: ['WiFi', 'Restaurant', 'Temple Shuttle', 'Parking'],
        category: 'business'
      }
    ],
    foodPlaces: [
      { name: 'Prasad Bhojanalaya', description: 'Simple satvik meals', cuisine: 'Indian Vegetarian', priceRange: '₹300-500 for two', rating: 4.2, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', specialties: ['Thali', 'Sweets'] }
    ],
    transport: { railway: ['Deoghar Junction'], busStand: 'Deoghar Bus Stand', nearestAirport: { name: 'Deoghar Airport', distance: '8 km' } },
    specialties: ['Pilgrimage', 'Spirituality'],
    bestTimeToVisit: 'October to March',
    climate: 'Tropical with pleasant winters',
    reviews: [
      {
        id: '1',
        name: 'Ramesh Gupta',
        rating: 5,
        comment: 'Peaceful and divine experience at Baidyanath Dham. The spiritual energy is incredible.',
        date: '2024-02-25'
      },
      {
        id: '2',
        name: 'Sita Sharma',
        rating: 5,
        comment: 'One of the most sacred Jyotirlingas. The temple complex is well-maintained and the atmosphere is very spiritual.',
        date: '2024-03-15'
      },
      {
        id: '3',
        name: 'Deepak Verma',
        rating: 4,
        comment: 'Great pilgrimage destination. Trikuta Hills and Nandan Pahar offer nice views beyond the main temple.',
        date: '2024-03-22'
      }
    ]
  }
]

export function getCityBySlug(slug: string): CityData | undefined {
  return citiesData.find(city => city.id === slug)
}

export function getAllCityIds(): string[] {
  return citiesData.map(city => city.id)
}
