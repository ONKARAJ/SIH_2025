"use client";

import { Navigation } from "@/components/navigation";
import { FestivalCard } from "@/components/festival-card";
import { CultureGallery } from "@/components/culture-gallery";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Palette,
  Hammer,
  Heart,
  Music,
  TreePine,
  Sparkles,
} from "lucide-react";

export default function CulturePage() {
  const festivals = [
    {
      name: "Sarhul",
      description:
        "The most significant festival celebrating the worship of nature and trees. Communities gather to honor Sal trees and pray for prosperity and good harvest. The festival marks the beginning of the new year for many tribal communities and involves elaborate rituals, traditional dances, and community feasts.",
      season: "Spring (March-April)",
      significance:
        "Worship of nature, new beginnings, community bonding, and agricultural prosperity",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3",
      tribes: ["Oraon", "Munda", "Ho", "Santhal"],
    },
    {
      name: "Sohrai",
      description:
        "A harvest festival celebrating cattle and livestock, featuring beautiful wall paintings and traditional songs. Houses are decorated with intricate mud art depicting animals, birds, and geometric patterns. The festival showcases the artistic talents of tribal women and their deep connection with nature.",
      season: "Post-Harvest (November)",
      significance:
        "Gratitude for harvest, cattle worship, artistic expression, and women's creativity",
      image:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3",
      tribes: ["Santhal", "Kurukh", "Kharia", "Bhumij"],
    },
    {
      name: "Tusu",
      description:
        "A winter festival dedicated to the goddess Tusu, featuring folk songs, dances, and the floating of decorated Tusu idols in rivers. Young girls create beautiful Tusu dolls and sing traditional songs throughout the festival period, celebrating fertility and prosperity.",
      season: "Winter (December-January)",
      significance:
        "Goddess worship, cultural preservation, community celebration, and youth participation",
      image:
        "https://images.unsplash.com/photo-1583211957403-5ba978d5d1d7?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3",
      tribes: ["Kurmali", "Bhumij", "Mahli", "Lohra"],
    },
    {
      name: "Karma",
      description:
        "A festival celebrating the Karma tree and seeking blessings for unmarried youth. Features traditional dances around the sacred Karma branch, with elaborate rituals performed to ensure good marriages and prosperity for the younger generation.",
      season: "Monsoon (August-September)",
      significance:
        "Youth blessing, marriage prayers, tree worship, and community harmony",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3",
      tribes: ["Oraon", "Munda", "Kharia", "Ho"],
    },
    {
      name: "Karam",
      description:
        "A festival dedicated to the worship of Karam tree, celebrated with great enthusiasm by tribal communities. The festival involves bringing Karam branches to homes, decorating them, and performing traditional dances and songs throughout the night.",
      season: "Monsoon (August)",
      significance:
        "Tree worship, agricultural prosperity, and community bonding",
      image:
        "https://images.unsplash.com/photo-1589307876431-d7e7b5fa5c5d?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3",
      tribes: ["Santhal", "Oraon", "Munda"],
    },
    {
      name: "Jani Shikar",
      description:
        "A hunting festival that celebrates the traditional hunting practices of tribal communities. Though actual hunting is now restricted, the festival continues as a cultural celebration with mock hunts, traditional weapons display, and community feasts.",
      season: "Summer (May-June)",
      significance:
        "Traditional hunting culture, community cooperation, and ancestral practices",
      image:
        "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3",
      tribes: ["Ho", "Munda", "Santhal"],
    },
  ];

  const cultureImages = [
    {
      src: "https://images.unsplash.com/photo-1541411569141-80c38c2c739e?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3",
      title: "Traditional Handicrafts",
      description:
        "Exquisite bamboo work, pottery, and textile art by skilled tribal artisans showcasing centuries-old techniques",
    },
    {
      src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3",
      title: "Folk Dances",
      description:
        "Vibrant traditional dances with colorful costumes and rhythmic drums celebrating life and nature",
    },
    {
      src: "https://images.unsplash.com/photo-1588756604327-4ad87b9c7dad?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3",
      title: "Tribal Villages",
      description:
        "Authentic tribal settlements showcasing traditional architecture and sustainable lifestyle practices",
    },
    {
      src: "https://images.unsplash.com/photo-1578575436955-ef29da568437?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3",
      title: "Wall Art Traditions",
      description:
        "Beautiful Sohrai and Kohvar wall paintings depicting nature, mythology, and tribal beliefs",
    },
    {
      src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3",
      title: "Traditional Music",
      description:
        "Ancient musical instruments and folk songs passed down through generations",
    },
    {
      src: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3",
      title: "Metal Crafts",
      description:
        "Intricate metalwork including jewelry, tools, and decorative items by tribal smiths",
    },
  ];

  const tribalCommunities = [
    {
      name: "Santhal",
      population: "35%",
      speciality: "Agriculture, Music, Dance",
    },
    { name: "Oraon", population: "18%", speciality: "Handicrafts, Festivals" },
    { name: "Munda", population: "15%", speciality: "Metal Work, Hunting" },
    { name: "Ho", population: "12%", speciality: "Pottery, Weaving" },
    { name: "Kharia", population: "8%", speciality: "Bamboo Craft, Art" },
    {
      name: "Kurukh",
      population: "6%",
      speciality: "Wall Paintings, Textiles",
    },
  ];

  const artForms = [
    {
      name: "Sohrai Paintings",
      description:
        "Mud wall paintings created during harvest festivals, featuring animals and geometric patterns",
      icon: Palette,
    },
    {
      name: "Kohvar Art",
      description:
        "Wedding wall art depicting fertility symbols, nature motifs, and tribal mythology",
      icon: Heart,
    },
    {
      name: "Paitkar Scrolls",
      description:
        "Traditional scroll paintings narrating mythological stories and tribal legends",
      icon: Sparkles,
    },
    {
      name: "Jadopatia Art",
      description:
        "Narrative paintings on cloth depicting stories of gods, demons, and tribal heroes",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-card-foreground mb-6">
              Festivals & Cultural Heritage
            </h1>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Immerse yourself in the rich cultural tapestry of Jharkhand's 32
              tribal communities. Experience ancient festivals that celebrate
              the harmony between humans and nature, witness traditional art
              forms, and discover the vibrant heritage that has been preserved
              for centuries through oral traditions and community practices.
            </p>
          </div>
        </div>
      </section>

      {/* Major Festivals Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Major Tribal Festivals
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Each festival in Jharkhand tells a story of the deep spiritual
              connection between tribal communities and nature, celebrating
              seasons, harvests, and life's important milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {festivals.map((festival, index) => (
              <FestivalCard
                key={index}
                name={festival.name}
                description={festival.description}
                season={festival.season}
                significance={festival.significance}
                image={festival.image}
                tribes={festival.tribes}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Heritage Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-6">
              Rich Cultural Diversity
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover the artistic traditions, spiritual beliefs, and cultural
              practices that make Jharkhand's tribal heritage unique and
              vibrant.
            </p>
          </div>

          <div className=" space-y-12">
            {/* Culture Gallery */}
            <div>
              <h3 className="text-2xl font-bold text-card-foreground mb-6">
                Cultural Gallery
              </h3>
              <CultureGallery images={cultureImages} />
            </div>

            {/* Cultural Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-card-foreground mb-6">
                Heritage Highlights
              </h3>

              <Card className="border-border bg-background">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        32 Tribal Communities
                      </h4>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        Jharkhand is home to diverse tribal groups, each with
                        unique languages, customs, and traditions preserved for
                        generations.
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {tribalCommunities.map((tribe, index) => (
                          <div key={index} className="text-sm">
                            <span className="font-medium text-foreground">
                              {tribe.name}
                            </span>
                            <span className="text-muted-foreground">
                              {" "}
                              ({tribe.population})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-background">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <TreePine className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        Sarna Religion
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        The indigenous Sarna religion emphasizes worship of
                        nature, sacred groves, and ancestral spirits. This
                        belief system forms the foundation of environmental
                        conservation and sustainable living practices.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-background">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <Music className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        Oral Traditions
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Rich oral literature including folk tales, songs, and
                        legends passed down through generations. These stories
                        preserve historical events, moral values, and cultural
                        wisdom.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Traditional Art Forms Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Traditional Art Forms
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore the diverse artistic expressions that showcase the
              creativity and spiritual beliefs of Jharkhand's tribal
              communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {artForms.map((art, index) => (
              <Card
                key={index}
                className="border-border bg-card hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <art.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">
                    {art.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {art.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Handicrafts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Hammer className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-card-foreground mb-2">
                      Bamboo & Cane Work
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Intricate baskets, furniture, and decorative items crafted
                      from locally sourced bamboo and cane, showcasing
                      sustainable craftsmanship techniques.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <Palette className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-card-foreground mb-2">
                      Pottery & Ceramics
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Traditional pottery using local clay, creating functional
                      and decorative items with unique tribal motifs and natural
                      glazing techniques.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-card-foreground mb-2">
                      Textiles & Weaving
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Handwoven fabrics using traditional looms, featuring
                      geometric patterns and natural dyes that reflect tribal
                      identity and cultural significance.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-6">
            Experience Authentic Tribal Culture
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Join us for immersive cultural tours, festival celebrations, and
            hands-on workshops with local artisans. Discover the living heritage
            of Jharkhand's tribal communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-3">
              Book Cultural Tour
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 bg-transparent"
            >
              Festival Calendar
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
