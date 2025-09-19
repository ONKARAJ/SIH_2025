"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Camera, Navigation, X } from 'lucide-react';

interface CulturalSpot {
  id: string;
  name: string;
  type: 'Festival Location' | 'Cultural Site' | 'Tribal Village' | 'Art Center' | 'Museum' | 'Temple';
  category: 'Festival' | 'Culture' | 'Art' | 'Heritage';
  description: string;
  festivals?: string[];
  bestTime: string;
  lat: number;
  lng: number;
  district: string;
  highlights: string[];
  images?: string[];
}

const culturalSpots: CulturalSpot[] = [
  // Festival Locations
  {
    id: 'sarhul-ranchi',
    name: 'Sarhul Festival Ground',
    type: 'Festival Location',
    category: 'Festival',
    description: 'The main celebration ground for Sarhul, the most important festival of the Munda tribe, marking the beginning of the new year with traditional dances and rituals.',
    festivals: ['Sarhul Festival', 'Baha Festival'],
    bestTime: 'March-April (Spring)',
    lat: 23.3441,
    lng: 85.3096,
    district: 'Ranchi',
    highlights: ['Traditional Munda Dance', 'Sacred Sal Trees', 'Tribal Rituals', 'Folk Music']
  },
  {
    id: 'sohrai-hazaribagh',
    name: 'Sohrai Art Village',
    type: 'Cultural Site',
    category: 'Art',
    description: 'Famous for Sohrai wall paintings during harvest festival, this village showcases the beautiful mud wall art traditions of Jharkhand tribes.',
    festivals: ['Sohrai Festival', 'Khovar Art Festival'],
    bestTime: 'November-December (Post Harvest)',
    lat: 23.9929,
    lng: 85.3647,
    district: 'Hazaribagh',
    highlights: ['Sohrai Wall Paintings', 'Khovar Art', 'Mud Art Techniques', 'Traditional Motifs']
  },
  {
    id: 'tusu-jamshedpur',
    name: 'Tusu Festival Center',
    type: 'Festival Location',
    category: 'Festival',
    description: 'The cultural epicenter for Tusu festival celebrations, where young girls perform traditional dances and carry beautifully decorated idols.',
    festivals: ['Tusu Festival', 'Paush Parva'],
    bestTime: 'December-January (Winter)',
    lat: 22.8046,
    lng: 86.2029,
    district: 'East Singhbhum',
    highlights: ['Tusu Idol Processions', 'Folk Songs', 'Traditional Dance', 'Winter Celebrations']
  },
  {
    id: 'karma-gumla',
    name: 'Karma Dance Ground',
    type: 'Festival Location',
    category: 'Festival',
    description: 'Traditional ground where Karma festival is celebrated with men and women dancing around the sacred Karma tree, seeking prosperity.',
    festivals: ['Karma Festival', 'Jitiya'],
    bestTime: 'August-September (Monsoon End)',
    lat: 23.0415,
    lng: 84.5394,
    district: 'Gumla',
    highlights: ['Karma Tree Worship', 'Circle Dance', 'Tribal Attire', 'Folk Music']
  },
  
  // Cultural Sites & Museums
  {
    id: 'tribal-museum-ranchi',
    name: 'Jharkhand Tribal Museum',
    type: 'Museum',
    category: 'Heritage',
    description: 'Comprehensive museum showcasing the rich tribal heritage, artifacts, costumes, and cultural practices of 32 different tribes of Jharkhand.',
    festivals: ['All Tribal Festivals Documentation'],
    bestTime: 'Year Round',
    lat: 23.3569,
    lng: 85.3350,
    district: 'Ranchi',
    highlights: ['Tribal Artifacts', 'Traditional Costumes', 'Historical Documentation', 'Cultural Exhibits']
  },
  {
    id: 'deoghar-temple',
    name: 'Baidyanath Dham',
    type: 'Temple',
    category: 'Heritage',
    description: 'One of the twelve Jyotirlingas, this sacred temple is the center of Shravani Mela, attracting millions of devotees during monsoon.',
    festivals: ['Shravani Mela', 'Mahashivratri'],
    bestTime: 'July-August (Shravan Month)',
    lat: 24.4842,
    lng: 86.6906,
    district: 'Deoghar',
    highlights: ['Jyotirlinga Temple', 'Religious Processions', 'Devotional Music', 'Sacred Rituals']
  },
  {
    id: 'santhal-village',
    name: 'Santhal Cultural Village',
    type: 'Tribal Village',
    category: 'Culture',
    description: 'Authentic Santhal tribal village where traditional lifestyle, crafts, dance, and music are preserved and practiced.',
    festivals: ['Sohrae', 'Baha Parab', 'Karam'],
    bestTime: 'October-March (Winter)',
    lat: 24.5204,
    lng: 87.3119,
    district: 'Dumka',
    highlights: ['Santhal Dance', 'Traditional Crafts', 'Tribal Lifestyle', 'Folk Instruments']
  },
  {
    id: 'dokra-art-center',
    name: 'Dokra Art Center',
    type: 'Art Center',
    category: 'Art',
    description: 'Traditional brass and metal craft center where ancient Dokra art technique is practiced using lost-wax casting method.',
    festivals: ['Vishwakarma Puja', 'Craft Festivals'],
    bestTime: 'Year Round',
    lat: 23.4041,
    lng: 85.4378,
    district: 'Ranchi',
    highlights: ['Dokra Metal Art', 'Lost-Wax Technique', 'Brass Crafts', 'Artisan Workshops']
  },
  {
    id: 'jhumar-dance-center',
    name: 'Jhumar Dance Academy',
    type: 'Cultural Site',
    category: 'Culture',
    description: 'Center for traditional Jhumar dance, performed during harvest seasons and cultural celebrations with rhythmic movements.',
    festivals: ['Harvest Festivals', 'Cultural Programs'],
    bestTime: 'Post Harvest Season',
    lat: 23.6593,
    lng: 85.9573,
    district: 'Giridih',
    highlights: ['Jhumar Dance', 'Harvest Celebrations', 'Traditional Music', 'Community Gatherings']
  },
  {
    id: 'bamboo-craft-village',
    name: 'Bamboo Craft Village',
    type: 'Tribal Village',
    category: 'Art',
    description: 'Village specializing in bamboo and cane crafts, producing baskets, furniture, and decorative items using traditional techniques.',
    festivals: ['Craft Exhibitions', 'Bamboo Festival'],
    bestTime: 'Year Round',
    lat: 22.9734,
    lng: 86.1847,
    district: 'West Singhbhum',
    highlights: ['Bamboo Crafts', 'Cane Work', 'Traditional Techniques', 'Eco-friendly Art']
  },

  // Additional Festival Locations
  {
    id: 'bandna-festival-purulia',
    name: 'Bandna Festival Center',
    type: 'Festival Location',
    category: 'Festival',
    description: 'Traditional cattle worship festival celebrated by tribal communities, especially focusing on the bond between farmers and their livestock.',
    festivals: ['Bandna Festival', 'Cattle Worship'],
    bestTime: 'October-November (Post Harvest)',
    lat: 23.3324,
    lng: 86.3644,
    district: 'Purulia Border',
    highlights: ['Cattle Decoration', 'Folk Songs', 'Agricultural Rituals', 'Community Feasts']
  },
  {
    id: 'jitiya-festival-palamu',
    name: 'Jitiya Festival Ground',
    type: 'Festival Location',
    category: 'Festival',
    description: 'Sacred fasting festival where mothers observe nirjala fast for the well-being and long life of their children.',
    festivals: ['Jitiya Festival', 'Jiutia Vrat'],
    bestTime: 'September-October (Ashwin Month)',
    lat: 24.0317,
    lng: 84.1364,
    district: 'Palamu',
    highlights: ['Maternal Devotion', 'Fasting Rituals', 'Community Prayers', 'Traditional Stories']
  },
  {
    id: 'karam-festival-khunti',
    name: 'Karam Festival Celebration',
    type: 'Festival Location',
    category: 'Festival',
    description: 'Worship of Karam deity for prosperity and fertility, celebrated with traditional dances around sacred trees.',
    festivals: ['Karam Festival', 'Tree Worship'],
    bestTime: 'August (Bhado Month)',
    lat: 23.0715,
    lng: 85.2772,
    district: 'Khunti',
    highlights: ['Sacred Grove', 'Circle Dancing', 'Nature Worship', 'Tribal Unity']
  },

  // Additional Cultural Sites
  {
    id: 'ho-tribal-village',
    name: 'Ho Tribal Cultural Center',
    type: 'Tribal Village',
    category: 'Culture',
    description: 'Authentic Ho tribal settlement showcasing traditional lifestyle, customs, and the famous Ho rebellion history.',
    festivals: ['Maghe Festival', 'Baha Parab'],
    bestTime: 'November-March (Winter)',
    lat: 22.5629,
    lng: 85.8491,
    district: 'East Singhbhum',
    highlights: ['Ho Culture', 'Rebellion History', 'Traditional Huts', 'Tribal Councils']
  },
  {
    id: 'oraon-village',
    name: 'Oraon Cultural Village',
    type: 'Tribal Village',
    category: 'Culture',
    description: 'Traditional Oraon (Kurukh) tribal village preserving ancient customs, language, and agricultural practices.',
    festivals: ['Sarhul', 'Karam', 'Rohini'],
    bestTime: 'October-March',
    lat: 23.4559,
    lng: 84.8572,
    district: 'Gumla',
    highlights: ['Kurukh Language', 'Traditional Agriculture', 'Ancestral Worship', 'Folk Music']
  },
  {
    id: 'munda-heritage-center',
    name: 'Munda Heritage Museum',
    type: 'Museum',
    category: 'Heritage',
    description: 'Dedicated museum showcasing Munda tribal heritage, including Birsa Munda freedom movement artifacts and traditional lifestyle.',
    festivals: ['Birsa Jayanti', 'Sarhul Festival'],
    bestTime: 'Year Round',
    lat: 23.3568,
    lng: 85.3350,
    district: 'Ranchi',
    highlights: ['Birsa Munda Artifacts', 'Freedom Movement History', 'Munda Traditions', 'Historical Documents']
  },

  // Art and Craft Centers
  {
    id: 'paitkar-painting-village',
    name: 'Paitkar Painting Center',
    type: 'Art Center',
    category: 'Art',
    description: 'Village famous for Paitkar scroll paintings, traditional narrative art form of Jharkhand depicting mythological stories.',
    festivals: ['Art Festivals', 'Scroll Painting Exhibitions'],
    bestTime: 'Year Round',
    lat: 23.7951,
    lng: 86.4484,
    district: 'Dumka',
    highlights: ['Scroll Paintings', 'Mythological Art', 'Natural Colors', 'Storytelling Tradition']
  },
  {
    id: 'jadopatia-art-center',
    name: 'Jadopatia Art Village',
    type: 'Art Center',
    category: 'Art',
    description: 'Traditional art village known for Jadopatia paintings, ritualistic art depicting life cycles and spiritual beliefs.',
    festivals: ['Ritual Art Festivals', 'Traditional Exhibitions'],
    bestTime: 'Year Round',
    lat: 24.6208,
    lng: 87.9492,
    district: 'Sahebganj',
    highlights: ['Ritualistic Art', 'Life Cycle Paintings', 'Spiritual Motifs', 'Traditional Pigments']
  },
  {
    id: 'stone-carving-rajmahal',
    name: 'Rajmahal Stone Carving Center',
    type: 'Art Center',
    category: 'Art',
    description: 'Ancient stone carving traditions continued by local artisans, creating sculptures and architectural elements.',
    festivals: ['Stone Carving Festivals', 'Artisan Exhibitions'],
    bestTime: 'October-March',
    lat: 25.0484,
    lng: 87.8331,
    district: 'Sahebganj',
    highlights: ['Stone Sculptures', 'Architectural Carvings', 'Traditional Tools', 'Ancient Techniques']
  },

  // Additional Heritage Sites
  {
    id: 'jagannath-temple-ranchi',
    name: 'Jagannath Temple Ranchi',
    type: 'Temple',
    category: 'Heritage',
    description: 'Replica of Puri Jagannath Temple, hosting grand Rath Yatra celebrations attracting thousands of devotees.',
    festivals: ['Rath Yatra', 'Jagannath Puja'],
    bestTime: 'June-July (Rath Yatra)',
    lat: 23.3441,
    lng: 85.3096,
    district: 'Ranchi',
    highlights: ['Rath Yatra Procession', 'Temple Architecture', 'Devotional Music', 'Cultural Programs']
  },
  {
    id: 'chinnamasta-temple',
    name: 'Chinnamasta Temple',
    type: 'Temple',
    category: 'Heritage',
    description: 'One of the 51 Shakti Peethas, this unique temple is dedicated to goddess Chinnamasta with distinctive tantric traditions.',
    festivals: ['Chinnamasta Puja', 'Tantric Festivals'],
    bestTime: 'March-April, October-November',
    lat: 24.9045,
    lng: 86.6769,
    district: 'Deoghar',
    highlights: ['Shakti Peeth', 'Tantric Traditions', 'Unique Deity', 'Spiritual Energy']
  },
  {
    id: 'pahari-mandir-ranchi',
    name: 'Pahari Mandir',
    type: 'Temple',
    category: 'Heritage',
    description: 'Hilltop temple complex offering panoramic views of Ranchi, combining spiritual significance with natural beauty.',
    festivals: ['Shravan Festivals', 'Hanuman Jayanti'],
    bestTime: 'October-March',
    lat: 23.3691,
    lng: 85.3261,
    district: 'Ranchi',
    highlights: ['Hilltop Location', 'Panoramic Views', 'Multiple Temples', 'Spiritual Atmosphere']
  },

  // Music and Dance Centers
  {
    id: 'nagpuri-music-center',
    name: 'Nagpuri Music Academy',
    type: 'Cultural Site',
    category: 'Culture',
    description: 'Center for preserving and promoting Nagpuri folk music, songs, and traditional musical instruments.',
    festivals: ['Nagpuri Music Festivals', 'Folk Song Competitions'],
    bestTime: 'Year Round',
    lat: 23.3441,
    lng: 85.3096,
    district: 'Ranchi',
    highlights: ['Nagpuri Songs', 'Folk Instruments', 'Music Training', 'Cultural Preservation']
  },
  {
    id: 'chhau-dance-center',
    name: 'Chhau Dance Training Center',
    type: 'Cultural Site',
    category: 'Culture',
    description: 'Traditional dance form training center where artists learn the martial art-influenced Chhau dance.',
    festivals: ['Chhau Dance Festivals', 'Chaitra Parv'],
    bestTime: 'October-April',
    lat: 22.8046,
    lng: 86.2029,
    district: 'East Singhbhum',
    highlights: ['Chhau Dance', 'Martial Arts Elements', 'Masked Performances', 'Mythological Stories']
  }
];

declare global {
  interface Window {
    google: any;
    initGoogleMaps: () => void;
  }
}

export function InteractiveCulturalMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const infoWindowRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [selectedSpot, setSelectedSpot] = useState<CulturalSpot | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);

  const categories = ['All', 'Festival', 'Culture', 'Art', 'Heritage'];
  
  // Constants - Precise Jharkhand boundaries
  const JHARKHAND_BOUNDS = {
    north: 25.35,   // Northern boundary (close to Nepal border)
    south: 21.95,   // Southern boundary (close to Odisha border)
    east: 87.57,    // Eastern boundary (close to West Bengal border)
    west: 83.32     // Western boundary (close to Chhattisgarh border)
  };
  const JHARKHAND_CENTER = { lat: 23.6102, lng: 85.2799 }; // Geographical center of Jharkhand
  
  const filteredSpots = filterCategory === 'All' 
    ? culturalSpots 
    : culturalSpots.filter(spot => spot.category === filterCategory);

  // Get spot icon based on type
  const getSpotIcon = (type: string): string => {
    const iconMap: { [key: string]: string } = {
      'Festival Location': '🎪',
      'Cultural Site': '🎭',
      'Tribal Village': '🏘️',
      'Art Center': '🎨',
      'Museum': '🏛️',
      'Temple': '🛕'
    };
    return iconMap[type] || '📍';
  };

  // Get spot color based on category
  const getSpotColor = (category: string): string => {
    const colorMap: { [key: string]: string } = {
      'Festival': '#ff6b35',
      'Culture': '#7b68ee',
      'Art': '#ff1493',
      'Heritage': '#228b22'
    };
    return colorMap[category] || '#6b7280';
  };

  // Load Google Maps API
  const loadGoogleMapsAPI = () => {
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    script.onerror = () => {
      console.error('Failed to load Google Maps API');
      setIsLoading(false);
    };
    document.head.appendChild(script);
  };

  // Initialize the map
  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    // Define precise Jharkhand bounds
    const jharkhandBounds = new window.google.maps.LatLngBounds(
      new window.google.maps.LatLng(21.95, 83.32), // Southwest corner
      new window.google.maps.LatLng(25.35, 87.57)  // Northeast corner
    );

    const map = new window.google.maps.Map(mapRef.current, {
      center: JHARKHAND_CENTER, // Geographical center of Jharkhand
      zoom: 7,
      minZoom: 6, // Prevent zooming out too much
      maxZoom: 18, // Allow detailed zoom
      mapTypeId: mapType,
      restriction: {
        latLngBounds: jharkhandBounds,
        strictBounds: true // Prevent panning outside bounds
      },
      styles: [
        {
          featureType: "administrative.country",
          elementType: "geometry.stroke",
          stylers: [{ color: "#ff6b35" }, { weight: 2 }]
        },
        {
          featureType: "administrative.province",
          elementType: "geometry.stroke", 
          stylers: [{ color: "#ff6b35" }, { weight: 2 }]
        },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#444444" }]
        },
        {
          featureType: "landscape",
          elementType: "geometry.fill",
          stylers: [{ color: "#f8f8f8" }]
        },
        {
          featureType: "poi",
          elementType: "geometry.fill",
          stylers: [{ color: "#e6f3e6" }]
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#d4d4d4" }]
        },
        {
          featureType: "water",
          elementType: "geometry.fill",
          stylers: [{ color: "#c8e6f5" }]
        }
      ],
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: true,
      gestureHandling: 'cooperative' // Better mobile experience
    });

    mapInstanceRef.current = map;
    
    // Fit map to Jharkhand bounds initially
    map.fitBounds(jharkhandBounds);
    
    addMarkers(map);
    setIsMapLoaded(true);
    setIsLoading(false);
  };

  // Function to fit map to Jharkhand bounds
  const fitToJharkhand = () => {
    if (mapInstanceRef.current) {
      const jharkhandBounds = new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(21.95, 83.32), // Southwest corner
        new window.google.maps.LatLng(25.35, 87.57)  // Northeast corner
      );
      mapInstanceRef.current.fitBounds(jharkhandBounds);
    }
  };

  // Add markers to the map
  const addMarkers = (map: any) => {
    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    filteredSpots.forEach((spot) => {
      const marker = new window.google.maps.Marker({
        position: { lat: spot.lat, lng: spot.lng },
        map: map,
        title: spot.name,
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 0C8.95 0 0 8.95 0 20C0 35 20 50 20 50S40 35 40 20C40 8.95 31.05 0 20 0Z" fill="${getSpotColor(spot.category)}"/>
              <circle cx="20" cy="20" r="12" fill="white"/>
              <text x="20" y="27" text-anchor="middle" font-size="16" fill="${getSpotColor(spot.category)}">${getSpotIcon(spot.type)}</text>
            </svg>
          `)}`,
          scaledSize: new window.google.maps.Size(32, 40),
          anchor: new window.google.maps.Point(16, 40)
        },
        animation: window.google.maps.Animation.DROP
      });

      // Create info window content
      const infoContent = `
        <div style="max-width: 350px; font-family: system-ui, -apple-system, sans-serif;">
          <div style="background: linear-gradient(135deg, ${getSpotColor(spot.category)}, ${getSpotColor(spot.category)}dd); color: white; padding: 16px; margin: -8px -8px 12px -8px; border-radius: 8px 8px 0 0;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 24px;">${getSpotIcon(spot.type)}</span>
              <div>
                <h3 style="margin: 0; font-size: 18px; font-weight: 700;">${spot.name}</h3>
                <div style="font-size: 13px; opacity: 0.9; margin-top: 4px;">
                  ${spot.type} • ${spot.district}, Jharkhand
                </div>
              </div>
            </div>
          </div>
          
          <div style="padding: 0 8px;">
            <p style="margin: 0 0 12px 0; color: #374151; font-size: 14px; line-height: 1.5;">
              ${spot.description}
            </p>
            
            <div style="margin-bottom: 12px;">
              <div style="font-size: 12px; color: #6b7280; font-weight: 600; margin-bottom: 4px;">BEST TIME TO VISIT</div>
              <div style="font-size: 14px; color: #1f2937; font-weight: 600;">${spot.bestTime}</div>
            </div>
            
            ${spot.festivals ? `
              <div style="margin-bottom: 12px;">
                <div style="font-size: 12px; color: #6b7280; font-weight: 600; margin-bottom: 6px;">MAJOR FESTIVALS</div>
                <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                  ${spot.festivals.map(festival => `
                    <span style="background: ${getSpotColor(spot.category)}20; color: ${getSpotColor(spot.category)}; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 500;">
                      ${festival}
                    </span>
                  `).join('')}
                </div>
              </div>
            ` : ''}
            
            <div style="display: flex; gap: 6px; margin-bottom: 8px;">
              <button 
                onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}', '_blank')"
                style="flex: 1; padding: 8px 12px; background: #2563eb; color: white; border: none; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;"
              >
                🧭 Directions
              </button>
            </div>
            
            <div style="text-align: center; padding-top: 8px; border-top: 1px solid #e5e7eb;">
              <small style="color: #9ca3af; font-size: 11px;">
                Click marker for details • Double-click to zoom
              </small>
            </div>
          </div>
        </div>
      `;

      const infoWindow = new window.google.maps.InfoWindow({
        content: infoContent
      });

      marker.addListener('click', () => {
        if (infoWindowRef.current) {
          infoWindowRef.current.close();
        }
        infoWindow.open(map, marker);
        infoWindowRef.current = infoWindow;
        setSelectedSpot(spot);
      });

      marker.addListener('dblclick', () => {
        map.setZoom(15);
        map.setCenter({ lat: spot.lat, lng: spot.lng });
      });

      markersRef.current.push(marker);
    });
  };

  // Update map when filters change
  useEffect(() => {
    if (mapInstanceRef.current) {
      addMarkers(mapInstanceRef.current);
    }
  }, [filterCategory]);

  // Initialize map on component mount
  useEffect(() => {
    loadGoogleMapsAPI();
  }, []);

  // Update map type
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setMapTypeId(mapType);
    }
  }, [mapType]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilterCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filterCategory === category
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
            }`}
          >
            {category === 'All' ? 'All Locations' : `${category} Sites`}
          </button>
        ))}
      </div>

      {/* Map Info */}
      <div className="text-center mb-4">
        <p className="text-sm text-muted-foreground">
          🗺️ <strong>Jharkhand Cultural Map</strong> - Explore festival locations and cultural hotspots within Jharkhand state boundaries
        </p>
      </div>


      {/* Map Container */}
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-muted rounded-2xl flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading Cultural Map...</p>
            </div>
          </div>
        )}
        
        <div
          ref={mapRef}
          className="h-[600px] w-full rounded-2xl shadow-lg overflow-hidden"
          style={{ minHeight: '600px' }}
        />
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 bg-muted/30 rounded-lg">
        {Object.entries({
          'Festival Location': '🎪',
          'Cultural Site': '🎭',  
          'Tribal Village': '🏘️',
          'Art Center': '🎨',
          'Museum': '🏛️',
          'Temple': '🛕'
        }).map(([type, icon]) => (
          <div key={type} className="flex items-center gap-2 text-sm">
            <span className="text-lg">{icon}</span>
            <span className="text-muted-foreground">{type}</span>
          </div>
        ))}
      </div>

      {/* Selected Spot Details */}
      {selectedSpot && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getSpotIcon(selectedSpot.type)}</span>
                <div>
                  <CardTitle className="text-xl">{selectedSpot.name}</CardTitle>
                  <p className="text-muted-foreground">{selectedSpot.district}, Jharkhand</p>
                </div>
              </div>
              <Badge 
                style={{ backgroundColor: `${getSpotColor(selectedSpot.category)}20`, color: getSpotColor(selectedSpot.category) }}
              >
                {selectedSpot.category}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{selectedSpot.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Best Time to Visit
                </h4>
                <p className="text-sm text-muted-foreground">{selectedSpot.bestTime}</p>
              </div>
              
              {selectedSpot.festivals && (
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Major Festivals
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedSpot.festivals.map((festival, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {festival}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <h4 className="font-semibold mb-2">Highlights</h4>
              <div className="grid grid-cols-2 gap-2">
                {selectedSpot.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Camera className="w-3 h-3 text-muted-foreground" />
                    {highlight}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedSpot.lat},${selectedSpot.lng}`, '_blank')}
                className="flex items-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {categories.slice(1).map((category) => {
          const count = culturalSpots.filter(spot => spot.category === category).length;
          return (
            <div key={category} className="p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">{count}</div>
              <div className="text-sm text-muted-foreground">{category} Sites</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
