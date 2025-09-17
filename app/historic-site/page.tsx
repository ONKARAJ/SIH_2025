"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
  Calendar,
  Clock,
  Camera,
  Navigation as NavigationIcon,
  Phone,
  Globe,
  Heart,
  Share2
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

const historicPlaces = [
  {
    id: 1,
    name: "Maluti Temples",
    location: "Dumka, Jharkhand",
    type: "Archaeological Heritage Site",
    rating: 4.3,
    coordinates: { lat: 24.2600, lng: 87.2500 },
    images: [
      "https://images.unsplash.com/photo-1539650116574-75c0c6d0e9c3?w=800&q=80",
      "https://images.unsplash.com/photo-1532093925549-e53ad4e3ec9f?w=800&q=80",
      "https://images.unsplash.com/photo-1569702090097-c5dd0ad91f3b?w=800&q=80",
      "https://images.unsplash.com/photo-1596349136726-bee8c4144b52?w=800&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80"
    ],
    description: "The Maluti Temples are a spectacular cluster of 108 terracotta temples dating from the 17th to 19th centuries, representing one of the largest temple complexes in eastern India. These architectural marvels showcase exquisite terracotta work with intricate carvings depicting scenes from Hindu epics like Ramayana and Mahabharata. Each temple is dedicated to various Hindu deities including Lord Shiva, Vishnu, and Durga, making it a significant pilgrimage destination. The temples are built in the traditional Bengali architectural style with curved roofs (chala) and ornate facades.",
    history: "The temples were built between 1622 and 1758 CE during the reign of the Nand Kings of Birbhum by the wealthy Baj family, particularly by Baj Basanta Roy and his descendants. The family was known for their patronage of arts and religious architecture. The construction spanned over 136 years, with different generations contributing to this magnificent complex. The temples were built using locally available laterite stone and decorated with intricate terracotta panels created by skilled artisans from Bengal.",
    significance: "Recognized as a protected monument by the Archaeological Survey of India, the Maluti temples represent one of the finest examples of terracotta temple architecture in eastern India. They showcase the synthesis of local tribal art with classical Hindu temple architecture. The site is considered crucial for understanding the socio-religious practices of medieval Bengal and the artistic traditions of the region. Many scholars compare its architectural significance to that of Bishnupur temples in West Bengal.",
    timings: "6:00 AM - 6:00 PM",
    bestTimeToVisit: "October to March (Pleasant weather for exploration)",
    nearbyAttractions: ["Massanjore Dam", "Dumka Town", "Santhal Museum", "Mayurbhanj Palace Ruins", "Shikharji Hills"],
    facilities: ["ASI Guided Tours", "Photography Permitted", "Archaeological Research Center", "Heritage Documentation", "Visitor Information Center", "Parking", "Basic Amenities"]
  },
  {
    id: 2,
    name: "Palamau Fort",
    location: "Palamau, Jharkhand",
    type: "Medieval Fort Complex",
    rating: 4.0,
    coordinates: { lat: 24.0500, lng: 84.0700 },
    images: [
      "https://images.unsplash.com/photo-1562618048-d4b41f6a779e?w=800&q=80",
      "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=800&q=80",
      "https://images.unsplash.com/photo-1580500659379-ad0f53e8f54f?w=800&q=80",
      "https://images.unsplash.com/photo-1596349136726-bee8c4144b52?w=800&q=80"
    ],
    description: "Palamau Fort is a magnificent medieval fort complex consisting of two distinct fortifications - the older fort (Purana Qila) built in the 12th century and the newer fort (Naya Qila) constructed in the 16th century. The complex showcases remarkable Indo-Islamic architecture with massive stone walls, intricate gateways, and strategic defensive structures. The fort served as the capital and stronghold of the powerful Chero dynasty, which ruled the region for several centuries. The ruins include palaces, mosques, temples, and residential quarters spread over a vast area.",
    history: "The older fort was built by Raja Pratap Rai in the 12th century, establishing it as the seat of Chero power. The newer fort was constructed by Raja Medini Rai in 1565 CE during the Mughal period, incorporating more advanced military architecture. The Chero dynasty ruled from this fort for over 600 years until the British period. The fort witnessed numerous battles, including conflicts with Mughal forces and later with the British East India Company. The last significant ruler, Maharaja Chhatra Pal Singh, fought against the British from this stronghold.",
    significance: "This fort complex represents one of the finest examples of medieval military architecture in central India. It demonstrates the strategic acumen of the Chero rulers and their architectural innovations in fortress design. The site is important for understanding the political history of Jharkhand and the resistance movements against foreign invasions. Archaeological excavations have revealed artifacts dating back to the 10th century, making it a treasure trove for historians and archaeologists.",
    timings: "9:00 AM - 5:00 PM (Closed on Fridays)",
    bestTimeToVisit: "November to February (Ideal weather for fort exploration)",
    nearbyAttractions: ["Betla National Park", "Kechki Village", "Netarhat Hill Station", "Lodh Falls", "McCluskieganj"],
    facilities: ["Historical Guided Tours", "Photography Allowed", "Heritage Documentation", "Archaeological Research", "Museum", "Parking", "Rest Areas"]
  },
  {
    id: 3,
    name: "Navratangarh Fort",
    location: "Gumla, Jharkhand",
    type: "Ancient Fort Complex",
    rating: 4.1,
    coordinates: { lat: 23.0400, lng: 84.5400 },
    images: [
      "https://images.unsplash.com/photo-1580500659379-ad0f53e8f54f?w=800&q=80",
      "https://images.unsplash.com/photo-1562618048-d4b41f6a779e?w=800&q=80",
      "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=800&q=80",
      "https://images.unsplash.com/photo-1596349136726-bee8c4144b52?w=800&q=80"
    ],
    description: "Navratangarh Fort, meaning 'Fort of Nine Gems', is an ancient hilltop fortress that stands as a testament to the rich history of the Nagvanshi dynasty. Built strategically on a hilltop, the fort offers panoramic views of the surrounding landscape and the Koel River valley. The fort complex includes remnants of palaces, temples, water tanks, and defensive walls built using massive stone blocks. Legend has it that the fort was named after nine precious gems that were once embedded in its main structure, though these have long since disappeared.",
    history: "The fort was built by King Durjan Sal of the Nagvanshi dynasty in the 16th century, serving as their summer capital. The Nagvanshis claimed descent from the mythical Phani Mukut Rai and ruled the region for centuries. The fort played a crucial role during various conflicts, including battles with the Chero kings and later resistance against British colonial forces. During the 1857 rebellion, the fort served as a center of resistance activities led by local chieftains.",
    significance: "Navratangarh represents the architectural and strategic brilliance of the Nagvanshi rulers. The fort's design incorporates both Hindu and Islamic architectural elements, reflecting the syncretic culture of medieval Jharkhand. It's significant for understanding the political dynamics of the region and the evolution of fortress architecture in central India. The site has yielded important archaeological findings, including ancient coins, weapons, and pottery.",
    timings: "8:00 AM - 6:00 PM",
    bestTimeToVisit: "October to March (Pleasant weather and clear views)",
    nearbyAttractions: ["Gumla Town", "Koel River", "Tribal Villages", "Birsa Munda Memorial", "Ratu Palace Ruins"],
    facilities: ["Trekking Path", "Photography", "Historical Information Boards", "Scenic Viewpoints", "Basic Amenities"]
  },
  {
    id: 4,
    name: "Jagannath Temple Complex",
    location: "Ranchi, Jharkhand",
    type: "Historic Temple Architecture",
    rating: 4.4,
    coordinates: { lat: 23.3441, lng: 85.3096 },
    images: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
      "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80"
    ],
    description: "The Jagannath Temple Complex in Ranchi is a magnificent replica of the famous Jagannath Temple of Puri, Odisha. Built in 1691 CE, this temple showcases exceptional Kalinga architecture with its towering spire (deul), intricate stone carvings, and elaborate sculptural work. The temple is dedicated to Lord Jagannath, along with his siblings Balabhadra and Subhadra. The complex includes several smaller temples, a large courtyard, and traditional structures that replicate the grandeur of the original Puri temple. The temple is famous for its annual Rath Yatra festival, which attracts thousands of devotees.",
    history: "The temple was commissioned by Ani Nath Shahdeo, a local king, in 1691 CE, inspired by his devotion to Lord Jagannath after a pilgrimage to Puri. The construction took several years and involved skilled artisans from Odisha who brought the authentic Kalinga architectural style to Jharkhand. The temple has been renovated multiple times, with major restoration work undertaken in the 19th and 20th centuries. During the British period, the temple served as an important center for cultural and religious activities, helping preserve Hindu traditions in the region.",
    significance: "This temple is architecturally and religiously significant as one of the finest examples of Kalinga temple architecture outside Odisha. It represents the cultural exchange between different regions of India and the spread of Jagannath worship beyond its traditional boundaries. The temple has been instrumental in preserving and promoting Odishan cultural traditions in Jharkhand, particularly through its annual Rath Yatra celebration, which is considered the second most important after Puri's.",
    timings: "5:00 AM - 12:00 PM, 4:00 PM - 9:00 PM",
    bestTimeToVisit: "June-July (Rath Yatra season) and October to March",
    nearbyAttractions: ["Ranchi Lake", "Tagore Hill", "Rock Garden", "State Museum", "Birsa Zoological Park"],
    facilities: ["Religious Services", "Prasad Counter", "Accommodation for Pilgrims", "Photography (Exterior only)", "Parking", "Cultural Programs", "Festival Celebrations"]
  },
  {
    id: 5,
    name: "Captain Rohlfs Memorial",
    location: "Hazaribagh, Jharkhand",
    type: "Colonial Era Monument",
    rating: 3.8,
    coordinates: { lat: 24.0042, lng: 85.3644 },
    images: [
      "https://images.unsplash.com/photo-1580500659379-ad0f53e8f54f?w=800&q=80",
      "https://images.unsplash.com/photo-1562618048-d4b41f6a779e?w=800&q=80",
      "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=800&q=80"
    ],
    description: "The Captain Rohlfs Memorial is a colonial-era monument built to commemorate Captain Rohlfs, a British officer who played a significant role in the establishment of Hazaribagh as an administrative center during the British Raj. The memorial features Victorian Gothic architecture with pointed arches, ornate stonework, and a central tower. Built using local sandstone, the structure stands as a testament to British colonial architecture in Jharkhand. The memorial is surrounded by well-maintained gardens and serves as an important historical landmark in the city.",
    history: "Captain Rohlfs served as the first Deputy Commissioner of Hazaribagh after its establishment as a district headquarters in 1834. He was instrumental in setting up the administrative infrastructure and maintaining law and order in the region during the early colonial period. The memorial was erected shortly after his death in the 1840s by his colleagues and the local British administration. The structure has witnessed various historical events, including the Indian independence movement and later served as a cultural center.",
    significance: "This memorial represents an important chapter in the colonial history of Jharkhand and showcases Victorian architectural influence in the region. While it represents colonial rule, it also serves as a historical document of the administrative development of modern Hazaribagh. The site is important for understanding the urban planning and architectural preferences of the British colonial administration in central India.",
    timings: "9:00 AM - 5:00 PM",
    bestTimeToVisit: "October to March (Pleasant weather for visiting)",
    nearbyAttractions: ["Hazaribagh National Park", "Canary Hill", "Hazaribagh Lake", "Konar Dam", "Sun Temple"],
    facilities: ["Historical Information", "Photography", "Garden Walk", "Parking", "Basic Amenities"]
  }
];

const GoogleMap = ({ place }: { place: any }) => {
  const [showMarkerPopup, setShowMarkerPopup] = useState(false);
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.coordinates.lat},${place.coordinates.lng}`;
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${place.coordinates.lng}!3d${place.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${encodeURIComponent(place.name)}!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin`;
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg relative">
      <div className="h-80 relative">
        <iframe src={embedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`Map of ${place.name}`} className="rounded-xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative cursor-pointer group" onClick={() => setShowMarkerPopup(!showMarkerPopup)}>
            <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center transform -translate-y-4 hover:scale-110 transition-transform duration-200 animate-bounce">
              <MapPin className="h-4 w-4 text-white" />
            </div>
            <div className="w-3 h-3 bg-red-500/30 rounded-full transform -translate-x-1/2 left-1/2 absolute top-4 blur-sm"></div>
            <div className="absolute inset-0 w-8 h-8 bg-red-500/20 rounded-full animate-ping transform -translate-y-4"></div>
          </div>
          {showMarkerPopup && (
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-4 min-w-[250px] border border-gray-200 animate-fade-in">
              <div className="text-center">
                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">{place.name}</h4>
                <p className="text-gray-600 text-xs mb-3">{place.location}</p>
                <div className="space-y-2">
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); window.open(directionsUrl, '_blank'); }} className="bg-amber-600 hover:bg-amber-700 text-white w-full text-xs h-8">
                    <NavigationIcon className="h-3 w-3 mr-2" />Get Directions
                  </Button>
                  <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); setShowMarkerPopup(false); }} className="w-full text-xs h-7">Close</Button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-700 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">🏛️</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 text-xs leading-tight mb-1">{place.name}</h4>
              <p className="text-gray-600 text-xs mb-2 leading-relaxed">{place.type} • {place.rating}⭐</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 bg-gradient-to-r from-gray-50 to-amber-50 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-red-500" />
              <span className="font-mono">{place.coordinates.lat.toFixed(4)}, {place.coordinates.lng.toFixed(4)}</span>
            </div>
          </div>
          <Button size="sm" onClick={() => window.open(directionsUrl, '_blank')} className="bg-amber-600 hover:bg-amber-700 text-white text-xs h-8 px-3">
            <NavigationIcon className="h-3 w-3 mr-1" />Navigate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function HistoricSitePage() {
  const [selectedPlace, setSelectedPlace] = useState(historicPlaces[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isContactGuidePopupOpen, setIsContactGuidePopupOpen] = useState(false);
  
  // Agent data for Contact Guide popup
  const agentData = {
    name: "Dr. Vikash Kumar",
    phone: "+91 9123456789",
    description: "Certified heritage guide with PhD in Archaeological Studies, specializing in Jharkhand's historic sites and cultural monuments."
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedPlace.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedPlace.images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedPlace.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedPlace.images.length) % selectedPlace.images.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <Navigation />
      
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            🏛️ Historic Sites of Jharkhand
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Historic <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Sites</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Journey through time at Jharkhand's magnificent historic sites. Discover ancient temples, medieval forts, and archaeological wonders that tell the stories of bygone eras.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {historicPlaces.map((place) => (
              <Card 
                key={place.id} 
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${selectedPlace.id === place.id ? 'ring-2 ring-amber-500 shadow-xl scale-105' : 'hover:scale-105'}`}
                onClick={() => {setSelectedPlace(place); setCurrentImageIndex(0);}}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image src={place.images[0]} alt={place.name} fill className="object-cover transition-transform duration-300 hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg font-bold mb-2 line-clamp-1">{place.name}</h3>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="line-clamp-1">{place.location}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-600 px-2 py-1 rounded-full">
                        <Star className="h-3 w-3 fill-white text-white" />
                        <span className="font-medium">{place.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-amber-600 hover:bg-amber-700 text-white text-xs border-0">
                      {place.type.split(' ')[0]}
                    </Badge>
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <span className="text-lg">🏛️</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 line-clamp-2">{place.description.substring(0, 120)}...</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Card className="overflow-hidden shadow-xl">
                <div className="relative h-96">
                  <Image src={selectedPlace.images[currentImageIndex]} alt={selectedPlace.name} fill className="object-cover" />
                  <Button variant="ghost" size="icon" onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white h-10 w-10">
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white h-10 w-10">
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex justify-center gap-2 mb-4">
                      {selectedPlace.images.map((_, index) => (
                        <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`} />
                      ))}
                    </div>
                    <div className="text-white text-center">
                      <h3 className="text-2xl font-bold mb-2">{selectedPlace.name}</h3>
                      <div className="flex items-center justify-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{selectedPlace.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{selectedPlace.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-3 gap-2">
                {selectedPlace.images.map((image, index) => (
                  <div key={index} className={`relative h-20 cursor-pointer overflow-hidden rounded-lg ${index === currentImageIndex ? 'ring-2 ring-amber-500' : ''}`} onClick={() => setCurrentImageIndex(index)}>
                    <Image src={image} alt={`${selectedPlace.name} ${index + 1}`} fill className="object-cover transition-all duration-200 hover:scale-110" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedPlace.name}</h2>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{selectedPlace.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{selectedPlace.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-9 w-9 p-0">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-9 w-9 p-0">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-6">{selectedPlace.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Timings
                      </h3>
                      <p className="text-gray-700">{selectedPlace.timings}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Best Time to Visit
                      </h3>
                      <p className="text-gray-700">{selectedPlace.bestTimeToVisit}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Facilities</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPlace.facilities.map((facility, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">{facility}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button className="flex-1 bg-amber-600 hover:bg-amber-700">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Camera className="h-4 w-4 mr-2" />
                      Gallery
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-xl">📜</span>
                    Historical Background
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Origins & Construction</h4>
                      <p className="text-gray-700 leading-relaxed text-sm">{selectedPlace.history}</p>
                    </div>
                    <div className="border-t border-gray-100 pt-4">
                      <h4 className="font-medium text-gray-800 mb-2">Cultural Significance</h4>
                      <p className="text-gray-700 leading-relaxed text-sm">{selectedPlace.significance}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-xl">🏗️</span>
                    Architectural Details
                  </h3>
                  <div className="space-y-3">
                    {selectedPlace.id === 1 && (
                      <>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">Terracotta Artistry</p>
                            <p className="text-gray-600 text-xs">Intricate terracotta panels depicting scenes from Ramayana, Mahabharata, and local folklore</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">Bengali Chala Style</p>
                            <p className="text-gray-600 text-xs">Traditional curved bamboo roof design translated into stone architecture</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">Material Heritage</p>
                            <p className="text-gray-600 text-xs">Locally sourced laterite stone with decorative terracotta work by Bengali artisans</p>
                          </div>
                        </div>
                      </>
                    )}
                    {selectedPlace.id === 2 && (
                      <>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">Indo-Islamic Design</p>
                            <p className="text-gray-600 text-xs">Fusion of Hindu and Islamic architectural elements in fort construction</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">Strategic Defense</p>
                            <p className="text-gray-600 text-xs">Multi-layered fortification with bastions, gateways, and defensive walls</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">Dual Fort System</p>
                            <p className="text-gray-600 text-xs">Unique combination of 12th century and 16th century fortification techniques</p>
                          </div>
                        </div>
                      </>
                    )}
                    {selectedPlace.id === 3 && (
                      <>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">Hilltop Strategy</p>
                            <p className="text-gray-600 text-xs">Strategic location providing panoramic surveillance of trade routes</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">Water Management</p>
                            <p className="text-gray-600 text-xs">Sophisticated rainwater harvesting and storage systems within fort complex</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">Stone Masonry</p>
                            <p className="text-gray-600 text-xs">Massive stone blocks fitted without mortar, showcasing advanced engineering skills</p>
                          </div>
                        </div>
                      </>
                    )}
                    {selectedPlace.id === 4 && (
                      <>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">Kalinga Architecture</p>
                            <p className="text-gray-600 text-xs">Authentic Odishan temple design with characteristic deul (spire) and jagamohana</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">Sculptural Art</p>
                            <p className="text-gray-600 text-xs">Intricate stone carvings depicting Jagannath, Balabhadra, and Subhadra</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">Sacred Geometry</p>
                            <p className="text-gray-600 text-xs">Temple layout following traditional Vastu Shastra principles</p>
                          </div>
                        </div>
                      </>
                    )}
                    {selectedPlace.id === 5 && (
                      <>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">Victorian Gothic</p>
                            <p className="text-gray-600 text-xs">Pointed arches, ribbed vaults, and ornate stonework typical of colonial monuments</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">Local Materials</p>
                            <p className="text-gray-600 text-xs">Built using indigenous sandstone with European architectural techniques</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">Memorial Design</p>
                            <p className="text-gray-600 text-xs">Central tower with commemorative inscription and landscaped gardens</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-xl">🌍</span>
                    Nearby Attractions
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {selectedPlace.nearbyAttractions.map((attraction, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors">
                        <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-800">{attraction}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-xl">🎫</span>
                    Visitor Information
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-1 text-sm">Entry Fee</h4>
                        <p className="text-gray-600 text-xs">
                          {selectedPlace.id === 1 && "₹10 for Indians, ₹100 for foreigners"}
                          {selectedPlace.id === 2 && "₹5 per person"}
                          {selectedPlace.id === 3 && "Free entry"}
                          {selectedPlace.id === 4 && "Free for darshan"}
                          {selectedPlace.id === 5 && "Free entry"}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-1 text-sm">Guided Tours</h4>
                        <p className="text-gray-600 text-xs">
                          {selectedPlace.id === 1 && "Available in Hindi & Bengali"}
                          {selectedPlace.id === 2 && "Historical tours available"}
                          {selectedPlace.id === 3 && "Local guides available"}
                          {selectedPlace.id === 4 && "Temple tour available"}
                          {selectedPlace.id === 5 && "Self-guided tour"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4">
                      <h4 className="font-medium text-gray-800 mb-3 text-sm flex items-center gap-2">
                        <span>📝</span> 
                        Tips for Visitors
                      </h4>
                      <ul className="space-y-2 text-xs text-gray-600">
                        {selectedPlace.id === 1 && (
                          <>
                            <li className="flex items-start gap-2">
                              <span className="text-amber-500 mt-1">•</span>
                              <span>Best visited during early morning or late afternoon for photography</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-amber-500 mt-1">•</span>
                              <span>Carry water and wear comfortable walking shoes</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-amber-500 mt-1">•</span>
                              <span>Local terracotta souvenirs available at nearby shops</span>
                            </li>
                          </>
                        )}
                        {selectedPlace.id === 2 && (
                          <>
                            <li className="flex items-start gap-2">
                              <span className="text-amber-500 mt-1">•</span>
                              <span>Wear sturdy shoes for exploring the fort ruins</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-amber-500 mt-1">•</span>
                              <span>Visit early morning to avoid heat and get better lighting</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-amber-500 mt-1">•</span>
                              <span>Combine visit with Betla National Park nearby</span>
                            </li>
                          </>
                        )}
                        {selectedPlace.id === 3 && (
                          <>
                            <li className="flex items-start gap-2">
                              <span className="text-amber-500 mt-1">•</span>
                              <span>Moderate trek required to reach the fort</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-amber-500 mt-1">•</span>
                              <span>Spectacular sunrise and sunset views from the top</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-amber-500 mt-1">•</span>
                              <span>Carry water and snacks for the trek</span>
                            </li>
                          </>
                        )}
                        {selectedPlace.id === 4 && (
                          <>
                            <li className="flex items-start gap-2">
                              <span className="text-amber-500 mt-1">•</span>
                              <span>Dress modestly for temple visit</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-amber-500 mt-1">•</span>
                              <span>Visit during Rath Yatra for special celebrations</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-amber-500 mt-1">•</span>
                              <span>Photography allowed only in exterior areas</span>
                            </li>
                          </>
                        )}
                        {selectedPlace.id === 5 && (
                          <>
                            <li className="flex items-start gap-2">
                              <span className="text-amber-500 mt-1">•</span>
                              <span>Good for understanding colonial history of the region</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-amber-500 mt-1">•</span>
                              <span>Beautiful gardens surrounding the monument</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-amber-500 mt-1">•</span>
                              <span>Combine with visit to Hazaribagh National Park</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">📍 Location & Directions</h3>
            <GoogleMap place={selectedPlace} />
          </div>
        </div>
      </section>
    </div>
  );
}
