"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapWrapper } from "@/components/map-wrapper";

import { MapPin, NavigationIcon, Camera, Eye } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { StreetViewModal } from "@/components/street-view-modal";

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [showStreetView, setShowStreetView] = useState(false);
  const [selectedStreetViewSpot, setSelectedStreetViewSpot] = useState<TouristSpot | null>(null);

  interface TouristSpot {
    id: string;
    name: string;
    type: string;
    color: string;
    description: string;
    bestTime: string;
    lat: number;
    lng: number;
    googleMaps: string;
    streetViewUrl?: string;
  }

  const touristSpots: TouristSpot[] = [
    // Waterfalls
    {
      id: "dassam-falls",
      name: "Dassam Falls",
      type: "Waterfall",
      color: "#3b82f6",
      description:
        "Known as the 'Niagara of Jharkhand', Dassam Falls is a spectacular 44-meter waterfall created by the Kanchi River. The waterfall cascades down in multiple tiers, creating a mesmerizing curtain of water surrounded by dense forests and rocky terrain. The name 'Dassam' is derived from the Mundari word 'Das-am' meaning 'water coming down'. The site offers excellent opportunities for photography, nature walks, and picnicking. During monsoon season, the waterfall is at its most spectacular with thunderous roar and misty spray creating rainbow effects. The area around the falls has been developed with viewing platforms, pathways, and basic facilities for tourists. Local legends speak of the falls having divine powers, and many visitors come here for spiritual solace as well as natural beauty.",
      bestTime: "Jul - Feb",
      lat: 23.143358,
      lng: 85.466441,
      googleMaps: "https://maps.google.com/?cid=18293337366965801389&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ",
      streetViewUrl: "https://maps.app.goo.gl/rgkojZ9RTdGr4L6j9",
    },
    {
      id: "jonha-falls",
      name: "Jonha Falls",
      type: "Waterfall",
      color: "#3b82f6",
      description:
        "Jonha Falls, also reverently known as Gautamdhara, is a magnificent 43-meter waterfall located about 40 km from Ranchi. The name 'Gautamdhara' is derived from its association with Lord Buddha (Gautama Buddha), and local legends suggest that Buddha once meditated near this sacred waterfall. The falls cascade down in a single magnificent drop, creating a natural pool at the bottom surrounded by rocky terrain and lush vegetation. The site has immense spiritual significance for both Hindus and Buddhists, with several small temples and meditation spots around the area. The thunderous sound of water hitting the rocks below creates a mystical atmosphere that attracts both pilgrims and nature enthusiasts. During monsoon season, the volume of water increases dramatically, making the falls even more spectacular. The area is well-developed with proper pathways, railings, and viewing platforms for tourist safety. Rock climbing enthusiasts also visit the area for the challenging rocky terrain surrounding the falls.",
      bestTime: "Jul - Mar",
      lat: 23.341667, // 23°20′30″ N
      lng: 85.608333, // 85°36′30″ E
      googleMaps: "https://maps.google.com/?cid=3228979914999518837&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ",
      streetViewUrl: "https://maps.app.goo.gl/5h8obRq3AzFSrmtY8",
    },
    {
      id: "hirni-falls",
      name: "Hirni Falls",
      type: "Waterfall",
      color: "#3b82f6",
      description:
        "A picturesque waterfall amidst dense forests, perfect for picnics.",
      bestTime: "Jul - Feb",
      lat: 22.866667, // 22°52′00″ N
      lng: 85.333333, // 85°20′00″ E
      googleMaps: "https://en.wikipedia.org/wiki/Hirni_Falls",
      streetViewUrl: "https://maps.app.goo.gl/R688M7CUtPHsUrxDA",
    },
    {
      id: "lodh-falls",
      name: "Lodh Falls",
      type: "Waterfall",
      color: "#3b82f6",
      description: "The highest waterfall in Jharkhand at 143 meters.",
      bestTime: "Jul - Feb",
      lat: 23.480556, // 23°28′50″ N
      lng: 84.019444, // 84°01′10″ E
      googleMaps: "https://en.wikipedia.org/wiki/Lodh_Falls",
      streetViewUrl: "https://maps.app.goo.gl/taC1YKGwG7aJNykD7",
    },
    {
      id: "nakti-falls",
      name: "Nakti Falls",
      type: "Waterfall",
      color: "#3b82f6",
      description:
        "A hidden gem waterfall near Latehar, surrounded by serene forests. Coordinates shown are for nearby Uddhwa village as exact falls location is not publicly available.",
      bestTime: "Jul - Feb",
      lat: 24.969278,
      lng: 87.856278,
      googleMaps: "https://maps.google.com/?cid=10773346826082184222&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ",
      streetViewUrl: "https://maps.app.goo.gl/JRomfCXsfZspQea77",
    },

    // Hill Stations - Using accessible roads and towns with Street View
    {
      id: "netarhat",
      name: "Netarhat Hill Station",
      type: "Hill Station",
      color: "#10b981",
      description:
        "Known as the 'Queen of Chotanagpur', Netarhat Hill Station sits at an elevation of 1,128 meters above sea level. This picturesque hill station is famous for its breathtaking sunrise and sunset views from Magnolia Point. The region is blessed with dense forests of Sal, Pine, and other indigenous trees, making it a paradise for nature lovers and wildlife enthusiasts. The area houses the prestigious Netarhat Residential School, often called the 'Eton of the East'. Key attractions include the Netarhat Dam, Lodh Falls (accessible from here), Pine Forest areas perfect for trekking, and the famous Sunrise Point. The cool climate throughout the year makes it an ideal retreat from the plains. During winter months, the temperature can drop significantly, sometimes experiencing frost. The region has rich tribal culture with several indigenous communities living in harmony with nature. Adventure activities include trekking, camping, and wildlife spotting in the nearby forests.",
      bestTime: "Oct - May",
      lat: 23.485434,
      lng: 84.264752,
      googleMaps: "https://maps.google.com/?cid=18293337366965801389&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ",
      streetViewUrl: "https://maps.app.goo.gl/3NoXDhhiNQUdW5RR6",
    },
    {
      id: "parasnath-hill",
      name: "Parasnath Hill",
      type: "Hill Station",
      color: "#10b981",
      description:
        "Parasnath Hill, standing majestically at 1,365 meters above sea level, is the highest peak in Jharkhand and holds immense religious significance for the Jain community. Known as 'Sammed Shikharji', this sacred mountain is believed to be the place where 20 out of 24 Jain Tirthankaras attained moksha (liberation). The hill is dotted with numerous Jain temples, each marking the spot where a Tirthankara achieved nirvana. The main temple complex houses beautiful marble structures with intricate carvings and sculptures depicting Jain mythology. Pilgrims undertake a challenging trek of about 27 kilometers, visiting all the temples on foot as per Jain tradition. The hill offers breathtaking panoramic views of the surrounding landscape, dense forests, and distant plains. The area is rich in biodiversity with rare species of flora and fauna. The trek route is well-maintained with resting spots, water facilities, and basic amenities for pilgrims. The serene atmosphere, combined with spiritual significance and natural beauty, makes it a unique destination for both religious and adventure tourism.",
      bestTime: "Oct - Mar",
      lat: 23.963591,
      lng: 86.128387,
      googleMaps: "https://maps.google.com/?cid=8500982435767710197&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ",
      streetViewUrl: "https://maps.app.goo.gl/Houuh82jVbUesDBJ7",
    },
    {
      id: "patratu-valley",
      name: "Patratu Valley",
      type: "Hill Station",
      color: "#10b981",
      description:
        "Scenic valley with winding roads, lush greenery, and the Patratu Dam.",
      bestTime: "Oct - Apr",
      lat: 23.67,
      lng: 85.28,
      googleMaps: "https://maps.google.com/?cid=3228979914999518837&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ",
      streetViewUrl: "https://maps.app.goo.gl/vY2xQsj1Mduc2GpU9",
    },

    // Wildlife Parks - Using nearby towns and access roads with Street View
    {
      id: "betla-national-park",
      name: "Betla National Park",
      type: "Wildlife",
      color: "#f59e0b",
      description:
        "Betla National Park, established in 1986, spans across 979 square kilometers of pristine wilderness in the Chota Nagpur plateau. This magnificent park is part of the Palamau Tiger Reserve and serves as a crucial habitat for the endangered Royal Bengal Tiger. The park is home to over 174 species of birds, including the Indian Hornbill, Red Junglefowl, and various species of eagles and owls. Wildlife includes tigers, leopards, elephants, sloth bears, wild boars, spotted deer, sambars, and the unique four-horned antelope. The landscape varies from dense forests to grasslands, with the Betla river flowing through it. Historical significance includes ancient fort ruins of Chero kings dating back to the 16th century. The park offers jungle safaris, elephant rides, watchtowers for wildlife viewing, and nature trails. Accommodation is available in forest rest houses. The park also has the Kamaldah Lake, perfect for bird watching, especially during migratory seasons.",
      bestTime: "Nov - Apr",
      lat: 23.87,
      lng: 84.19,
      googleMaps: "https://maps.google.com/?cid=12801775369233998389&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ",
      streetViewUrl: "https://maps.app.goo.gl/mWWbeBh1UVwWHjnj7",
    },
    {
      id: "hazaribagh",
      name: "Hazaribagh National Park",
      type: "Wildlife",
      color: "#f59e0b",
      description:
        "A wildlife sanctuary known for its diverse flora and fauna.",
      bestTime: "Nov - Apr",
      lat: 24.016544,
      lng: 85.413133,
      googleMaps: "https://maps.google.com/?cid=3257619293647164656&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ",
      streetViewUrl: "https://maps.app.goo.gl/TJh91Nw1kAd95WJE6",
    },
    {
      id: "dalma-wildlife",
      name: "Dalma Wildlife Sanctuary",
      type: "Wildlife",
      color: "#f59e0b",
      description: "Famous for its elephant population and diverse wildlife.",
      bestTime: "Nov - Apr",
      lat: 22.7875,
      lng: 86.158125,
      googleMaps: "https://maps.google.com/?cid=3313098005014698558&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ",
      streetViewUrl: "https://maps.app.goo.gl/7GFYrq7RBX8RMsXg9",
    },
    {
      id: "udhuwa-lake",
      name: "Udhuwa Lake",
      type: "Wildlife",
      color: "#f59e0b",
      description:
        "A bird sanctuary near Sahibganj, home to migratory and resident birds.",
      bestTime: "Nov - Mar",
      lat: 24.969278,
      lng: 87.856278,
      googleMaps: "https://maps.google.com/?cid=10773346826082184222&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ",
      streetViewUrl: "https://maps.app.goo.gl/aWNU4BLybmP9kZZu7",
    },

    // Temples - Using main town locations with Street View access
    {
      id: "deoghar",
      name: "Deoghar Baidyanath Temple",
      type: "Temple",
      color: "#ef4444",
      description:
        "The sacred Baidyanath Temple in Deoghar is one of the twelve revered Jyotirlingas dedicated to Lord Shiva and holds immense religious significance for millions of devotees. Known as 'Baidyanath Dham' or 'Vaidyanath Dham', meaning 'Lord of Physicians', the temple is believed to fulfill the wishes of devotees and provide healing from ailments. The main temple complex houses the sacred Shivalinga and is surrounded by 21 other temples, creating a spiritual atmosphere. The annual Shravan month (July-August) witnesses the famous Kanwar Yatra, where millions of devotees carry holy water from the Ganges River and walk hundreds of kilometers to offer it to the Shivalinga. The temple architecture reflects ancient Indian style with intricate carvings and sculptures. According to Hindu mythology, this is where Ravana worshipped Lord Shiva to gain immortality. The temple offers facilities for pilgrims including accommodation, prasadam, and various religious ceremonies. The town of Deoghar itself has become a significant pilgrimage destination with numerous ashrams, dharamshalas, and religious institutions.",
      bestTime: "Oct - Mar",
      lat: 24.48,
      lng: 86.7,
      googleMaps: "https://maps.google.com/?cid=15820276597784760374&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ",
      streetViewUrl: "https://maps.app.goo.gl/JsHY2o8CCpm7g7VdA",
    },
    {
      id: "rajrappa",
      name: "Rajrappa Temple",
      type: "Temple",
      color: "#ef4444",
      description:
        "A unique temple dedicated to Goddess Chhinnamasta at river confluence.",
      bestTime: "Oct - Mar",
      lat: 23.631944,
      lng: 85.711111,
      googleMaps: "https://maps.google.com/?cid=7585814200331355966&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ",
      streetViewUrl: "https://maps.app.goo.gl/rjRJDa64AE1mXDBU9",
    },

    // Cities - Using main urban areas with comprehensive Street View
    {
      id: "ranchi",
      name: "Ranchi (Capital)",
      type: "City",
      color: "#8b5cf6",
      description:
        "Ranchi, the capital city of Jharkhand, is a vibrant urban center known as the 'City of Waterfalls' due to numerous cascades in its vicinity. Established as the summer capital during British era, the city sits at an average elevation of 2,140 feet above sea level, providing a pleasant climate. Major attractions include the sacred Jagannath Temple, inspired by the famous temple in Puri, which attracts thousands of devotees during Rath Yatra. The city is famous for Birsa Munda's legacy and houses several museums and monuments dedicated to tribal freedom fighters. Ranchi is also known as India's 'Manchester' due to its heavy industries and is the birthplace of legendary cricketer MS Dhoni. Key attractions include Rock Garden, Kanke Dam, Tagore Hill, Birsa Zoological Park, and the State Museum. The city offers excellent connectivity and serves as the gateway to explore other tourist destinations in Jharkhand. Modern amenities, shopping complexes, educational institutions, and cultural centers make it a perfect blend of tradition and modernity.",
      bestTime: "Oct - Mar",
      lat: 23.3441,
      lng: 85.3096,
      googleMaps: "https://maps.google.com/?cid=15855437735664415806&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ",
      streetViewUrl: "https://maps.app.goo.gl/5yAB7vZswC1UE6Ub9",
    },
    {
      id: "rock-garden",
      name: "Ranchi Rock Garden",
      type: "City",
      color: "#8b5cf6",
      description:
        "Popular tourist spot with sculptures, gardens, and a lake view.",
      bestTime: "Oct - Mar",
      lat: 23.40339,
      lng: 85.31290,
      googleMaps: "https://maps.google.com/?cid=5173189703587136238&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ",
      streetViewUrl: "https://maps.app.goo.gl/cc4RcuT1enUD81Rs5",
    },
    {
      id: "tagore-hill",
      name: "Tagore Hill",
      type: "City",
      color: "#8b5cf6",
      description:
        "Historic site in Ranchi associated with Rabindranath Tagore, offering panoramic views.",
      bestTime: "Oct - Mar",
      lat: 23.401313,
      lng: 85.337823,
      googleMaps: "https://maps.google.com/?cid=12977793023263926650&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ",
      streetViewUrl: "https://maps.app.goo.gl/EDxhg1PVeDKCC18d8",
    },

    // Dams - Using nearby accessible towns with Street View
    {
      id: "maithon-dam",
      name: "Maithon Dam",
      type: "Dam",
      color: "#06b6d4",
      description:
        "A huge dam on the Barakar River, offering boating and scenic views.",
      bestTime: "Oct - Mar",
      lat: 23.850278,
      lng: 86.777778,
      googleMaps: "https://maps.google.com/?cid=7449231140702085856&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ",
      streetViewUrl: "https://maps.app.goo.gl/qPCWk7gRekC6JCj97",
    },
  ];

  const selectedSpot = selectedLocation
    ? touristSpots.find((spot) => spot.id === selectedLocation)
    : null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="py-16 bg-card">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-card-foreground mb-4">
            Interactive Map of Jharkhand
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore Jharkhand’s waterfalls, hill stations, temples, and wildlife
            sanctuaries. Click on any marker to learn more and get directions.
          </p>
        </div>
      </section>

      {/* Map & Sidebar */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Map */}
          <div className="lg:col-span-3">
            <MapWrapper 
              touristSpots={touristSpots} 
              onLocationSelect={setSelectedLocation}
              selectedLocationId={selectedLocation}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 flex flex-col space-y-6">
            {/* Popular Destinations */}
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                  Popular Destinations
                </h3>
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                  {touristSpots.map((spot) => (
                    <button
                      key={spot.id}
                      onClick={() => setSelectedLocation(spot.id)}
                      className="w-full text-left p-2 rounded-md hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: spot.color || "#6b7280" }}
                        />
                        <div>
                          <p className="text-sm font-medium text-card-foreground">
                            {spot.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {spot.type}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Selected Spot Details */}
            {selectedSpot ? (
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold">{selectedSpot.name}</h3>
                  <Badge className="mt-1">{selectedSpot.type}</Badge>
                  <p className="text-muted-foreground my-4">
                    {selectedSpot.description}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-medium">Best Time:</span>{" "}
                    {selectedSpot.bestTime}
                  </p>
                  <div className="flex flex-col space-y-2">
                    <Link href={selectedSpot.googleMaps} target="_blank">
                      <Button size="sm" className="w-full">
                        <NavigationIcon className="h-4 w-4 mr-2" />
                        Get Directions
                      </Button>
                    </Link>
                    <Link
                      href={`${selectedSpot.googleMaps}&t=k`}
                      target="_blank"
                    >
                      <Button size="sm" variant="outline" className="w-full">
                        <Camera className="h-4 w-4 mr-2" />
                        Satellite View
                      </Button>
                    </Link>
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                      onClick={() => {
                        setSelectedStreetViewSpot(selectedSpot);
                        setShowStreetView(true);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      360° View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-border bg-card">
                <CardContent className="p-6 text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Select a Location
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Click on any marker or destination to view details and
                    directions.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
      
      {/* 360° Street View Modal */}
      {selectedStreetViewSpot && (
        <StreetViewModal
          isOpen={showStreetView}
          onClose={() => {
            setShowStreetView(false);
            setSelectedStreetViewSpot(null);
          }}
          title={selectedStreetViewSpot.name}
          description={selectedStreetViewSpot.description}
          location={`${selectedStreetViewSpot.type} • Jharkhand, India`}
          lat={selectedStreetViewSpot.lat}
          lng={selectedStreetViewSpot.lng}
        />
      )}
    </div>
  );
}
