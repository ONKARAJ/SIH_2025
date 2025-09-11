"use client";

import { Navigation } from "@/components/navigation";
import { PlaceCard } from "@/components/place-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin } from "lucide-react";
import { useState } from "react";

export default function PlacesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const destinations = [
    {
      name: "Hundru Falls",
      description:
        "A spectacular 98-meter waterfall cascading down rocky cliffs, surrounded by dense forests. Perfect for nature photography and peaceful meditation amidst pristine wilderness.",
      bestTime: "Oct - Mar",
      image: "/hundru-falls-waterfall-jharkhand-rocky-cliffs-fore.jpg",
      category: "Waterfall",
    },
    {
      name: "Dassam Falls",
      description:
        "Known as the 'Niagara of Jharkhand', this 44-meter waterfall creates a mesmerizing curtain of water. Popular for picnics and adventure activities like rock climbing.",
      bestTime: "Jul - Feb",
      image: "/dassam-falls-jharkhand-niagara-waterfall-rocks.jpg",
      category: "Waterfall",
    },
    {
      name: "Jagannath Temple Ranchi",
      description:
        "A magnificent replica of the famous Puri Jagannath Temple, featuring intricate architecture and spiritual significance. Annual Rath Yatra attracts thousands of devotees.",
      bestTime: "Oct - Mar",
      image: "/jagannath-temple-ranchi-architecture-spiritual.jpg",
      category: "Temple",
    },
    {
      name: "Betla National Park",
      description:
        "Home to tigers, elephants, and diverse wildlife across 979 sq km. Offers jeep safaris, elephant rides, and bird watching in pristine sal forests.",
      bestTime: "Nov - Apr",
      image: "/betla-national-park-jharkhand-tigers-elephants-wil.jpg",
      category: "Wildlife",
    },
    {
      name: "Netarhat Hill Station",
      description:
        "The 'Queen of Chotanagpur', offering breathtaking sunrise and sunset views. Cool climate, pine forests, and colonial-era charm make it perfect for relaxation.",
      bestTime: "Oct - May",
      image: "/netarhat-hill-station-jharkhand-sunrise-sunset-pin.jpg",
      category: "Hill Station",
    },
    {
      name: "Deoghar Baidyanath Temple",
      description:
        "One of the 12 Jyotirlingas, this ancient Shiva temple is a major pilgrimage site. The town comes alive during Shravan month with millions of devotees.",
      bestTime: "Oct - Mar",
      image: "/baidyanath-temple-deoghar-jyotirlinga-shiva-pilgri.jpg",
      category: "Temple",
    },
    // Additional destinations
    {
      name: "Parasnath Hill",
      description:
        "The highest peak in Jharkhand at 1,365 meters, sacred to Jains as the place where 20 Tirthankaras attained moksha. Offers trekking and spiritual experiences.",
      bestTime: "Oct - Mar",
      image: "/parasnath-hill-jharkhand-highest-peak-jain-temple.jpg",
      category: "Hill Station",
    },
    {
      name: "Hazaribagh National Park",
      description:
        "A wildlife sanctuary known for its diverse flora and fauna, including tigers, leopards, and various bird species. Features beautiful landscapes and watchtowers.",
      bestTime: "Nov - Apr",
      image: "/hazaribagh-national-park-jharkhand-wildlife-tigers.jpg",
      category: "Wildlife",
    },
    {
      name: "Jonha Falls",
      description:
        "Also known as Gautamdhara, this 43-meter waterfall is associated with Lord Buddha. The scenic beauty and religious significance make it a popular destination.",
      bestTime: "Jul - Mar",
      image: "/jonha-falls-gautamdhara-jharkhand-buddha-waterfall.jpg",
      category: "Waterfall",
    },
    {
      name: "Rajrappa Temple",
      description:
        "A unique temple dedicated to Goddess Chhinnamasta, located at the confluence of rivers Bhera and Damodar. Known for its tantric significance and natural beauty.",
      bestTime: "Oct - Mar",
      image: "/rajrappa-temple-chhinnamasta-jharkhand-confluence-.jpg",
      category: "Temple",
    },
    {
      name: "Dalma Wildlife Sanctuary",
      description:
        "Famous for its elephant population and diverse wildlife. The sanctuary offers trekking trails, watchtowers, and opportunities to spot elephants in their natural habitat.",
      bestTime: "Nov - Apr",
      image: "/dalma-wildlife-sanctuary-jharkhand-elephants-trekk.jpg",
      category: "Wildlife",
    },
    {
      name: "Maithon Dam",
      description:
        "A beautiful dam on the Barakar River, offering boating, water sports, and scenic views. The surrounding hills and gardens make it perfect for family outings.",
      bestTime: "Oct - Mar",
      image: "/maithon-dam-jharkhand-barakar-river-boating-water-.jpg",
      category: "Dam",
    },
    {
      name: "Panchet Dam",
      description:
        "Located on the Damodar River, this dam offers beautiful lake views, boating facilities, and is surrounded by hills. Popular for picnics and photography.",
      bestTime: "Oct - Apr",
      image: "/panchet-dam-jharkhand-damodar-river-lake-hills-boa.jpg",
      category: "Dam",
    },
    {
      name: "Lodh Falls",
      description:
        "The highest waterfall in Jharkhand at 143 meters, located in Latehar district. The falls are surrounded by dense forests and offer spectacular views.",
      bestTime: "Jul - Feb",
      image: "/lodh-falls-jharkhand-highest-waterfall-latehar-den.jpg",
      category: "Waterfall",
    },
    {
      name: "Palamu Tiger Reserve",
      description:
        "One of the oldest tiger reserves in India, featuring diverse wildlife including tigers, elephants, and leopards. Offers excellent safari experiences.",
      bestTime: "Nov - Apr",
      image: "/palamu-tiger-reserve-jharkhand-oldest-tigers-safar.jpg",
      category: "Wildlife",
    },
  ];

  const categories = [
    "All",
    "Waterfall",
    "Temple",
    "Wildlife",
    "Hill Station",
    "Dam",
  ];

  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch =
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || destination.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-card-foreground mb-6">
              Places to Visit in Jharkhand
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover the hidden gems of Jharkhand - from thundering waterfalls
              and ancient temples to wildlife sanctuaries and serene hill
              stations. Each destination offers unique experiences that showcase
              the state's natural beauty and cultural heritage.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  className="cursor-pointer px-4 py-2"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground mb-8">
            <MapPin className="h-4 w-4" />
            <span>Showing {filteredDestinations.length} destinations</span>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination, index) => (
              <PlaceCard
                key={index}
                name={destination.name}
                description={destination.description}
                bestTime={destination.bestTime}
                image={destination.image}
                category={destination.category}
              />
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No destinations found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
