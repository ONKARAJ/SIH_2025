"use client"

import React, { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Plus,
  Minus,
  HelpCircle,
  MessageSquare,
  Send,
  CheckCircle,
  Filter,
  Clock,
  TrendingUp,
  BookOpen,
  MapPin,
  Calendar,
  Shield,
  Car,
  Phone,
  Mail,
} from "lucide-react"
import Link from "next/link"

// FAQ Data Structure
const faqData = [
  {
    category: "General Travel",
    icon: MapPin,
    faqs: [
      {
        id: 1,
        question: "What is the best time to visit Jharkhand?",
        answer: "The best time to visit Jharkhand is from October to March when the weather is pleasant and cool. This period is ideal for sightseeing, trekking, and outdoor activities. During monsoon (June-September), waterfalls are at their most spectacular, but travel can be challenging due to heavy rains. Summer months (April-May) can be quite hot, making outdoor activities less comfortable.",
        isPopular: true,
        tags: ["weather", "planning", "seasons"]
      },
      {
        id: 2,
        question: "How many days are needed to explore Jharkhand properly?",
        answer: "A comprehensive tour of Jharkhand requires 7-10 days to cover major destinations like Ranchi, Deoghar, Netarhat, Betla National Park, and key waterfalls. For a quick trip focusing on highlights like Hundru Falls, Jagannath Temple, and Baidyanath Dham, 4-5 days would be sufficient. Nature enthusiasts and trekkers might want to extend their stay to 12-15 days to fully explore the wilderness areas and tribal villages.",
        isPopular: true,
        tags: ["itinerary", "planning", "duration"]
      },
      {
        id: 3,
        question: "Is Jharkhand safe for solo travelers and women?",
        answer: "Yes, Jharkhand is generally safe for solo travelers and women, especially in tourist areas and cities like Ranchi and Deoghar. However, like any destination, it's important to take standard precautions: stay in reputable accommodations, avoid isolated areas after dark, keep your belongings secure, and inform someone about your travel plans. Local people are generally helpful and hospitable. For remote tribal areas, consider hiring local guides.",
        isPopular: false,
        tags: ["safety", "solo travel", "women safety"]
      },
      {
        id: 4,
        question: "What languages are spoken in Jharkhand?",
        answer: "Hindi is the official language and widely spoken throughout Jharkhand. English is understood in tourist areas, hotels, and by educated locals. Major tribal languages include Santali, Ho, Mundari, and Oraon. Bengali is also spoken in some eastern districts. Most tour guides speak Hindi and basic English. Learning a few basic Hindi phrases can enhance your travel experience and help you connect with locals.",
        isPopular: false,
        tags: ["language", "communication", "culture"]
      }
    ]
  },
  {
    category: "Destinations & Attractions",
    icon: MapPin,
    faqs: [
      {
        id: 5,
        question: "What are the must-visit waterfalls in Jharkhand?",
        answer: "The top waterfalls in Jharkhand include: 1) Hundru Falls (320 ft) - Most famous waterfall near Ranchi, 2) Dassam Falls (144 ft) - Known as 'Niagara of Jharkhand', 3) Jonha Falls (141 ft) - Beautiful cascading waterfall, 4) Hirni Falls - Scenic waterfall in Seraikela, 5) Panchghagh Falls - Five streams falling together, 6) Lodh Falls - Highest waterfall in Jharkhand at 469 ft. Each offers unique beauty and is best visited during monsoon and post-monsoon seasons.",
        isPopular: true,
        tags: ["waterfalls", "nature", "attractions"]
      },
      {
        id: 6,
        question: "Which are the most important temples and religious sites?",
        answer: "Major religious sites include: 1) Baidyanath Dham, Deoghar - One of 12 Jyotirlingas, most sacred site, 2) Jagannath Temple, Ranchi - Replica of Puri temple with beautiful architecture, 3) Parasnath Hill, Giridih - Highest peak with Jain temples, 4) Rajrappa Temple - Shakti Peeth dedicated to Goddess Chinnamasta, 5) Maluti Temples - 108 terracotta temples showcasing unique architecture. These sites attract millions of pilgrims and offer spiritual experiences along with architectural marvels.",
        isPopular: true,
        tags: ["temples", "religious", "pilgrimage"]
      },
      {
        id: 7,
        question: "What wildlife can I see in Jharkhand's national parks?",
        answer: "Jharkhand's forests are home to diverse wildlife. In Betla National Park, you can spot tigers, leopards, elephants, sloth bears, wild boars, sambars, and various deer species. The park also has over 174 bird species. Dalma Wildlife Sanctuary is famous for elephants and offers great trekking opportunities. Palamau Tiger Reserve houses tigers, leopards, and elephants. Hazaribagh Wildlife Sanctuary is known for sambars, nilgais, and peacocks. Best wildlife viewing is during early morning and late afternoon safaris.",
        isPopular: false,
        tags: ["wildlife", "safari", "national parks"]
      }
    ]
  },
  {
    category: "Cultural Experiences",
    icon: Calendar,
    faqs: [
      {
        id: 8,
        question: "What are the major festivals celebrated in Jharkhand?",
        answer: "Major tribal festivals include: 1) Sarhul - Spring festival celebrating nature (March-April), 2) Sohrai - Harvest festival with beautiful wall art (October-November), 3) Karma - Dance festival celebrating nature (August-September), 4) Tusu - Winter harvest festival (December-January), 5) Baha - Spring flower festival (February-March). Religious festivals include Shravan Mela at Deoghar, Durga Puja, and Diwali. These festivals offer authentic cultural experiences with traditional music, dance, art, and cuisine.",
        isPopular: true,
        tags: ["festivals", "culture", "traditions"]
      },
      {
        id: 9,
        question: "Can I visit tribal villages and experience local culture?",
        answer: "Yes, cultural tourism is actively promoted in Jharkhand. You can visit authentic tribal villages in districts like Khunti, West Singhbhum, and Gumla. Many villages offer homestay experiences where you can participate in daily activities, learn traditional crafts like Sohrai art, enjoy tribal cuisine, and witness folk performances. It's recommended to book through recognized tour operators or the Tourism Department to ensure respectful and authentic interactions while supporting local communities.",
        isPopular: false,
        tags: ["tribal culture", "homestay", "authentic experience"]
      },
      {
        id: 10,
        question: "What traditional crafts and art forms can I see in Jharkhand?",
        answer: "Jharkhand is rich in traditional arts: 1) Sohrai Art - Mud wall paintings by tribal women, 2) Dokra Art - Ancient lost-wax bronze casting, 3) Basket Weaving - Intricate bamboo and cane work, 4) Tussar Silk Weaving - Traditional silk production, 5) Tribal Jewelry - Silver ornaments with unique designs, 6) Wood Carving - Decorative and functional items. You can visit artisan villages, watch craftsmen at work, and purchase authentic handmade items directly from creators, supporting local livelihoods.",
        isPopular: false,
        tags: ["handicrafts", "art", "shopping", "traditional"]
      }
    ]
  },
  {
    category: "Accommodation & Booking",
    icon: BookOpen,
    faqs: [
      {
        id: 11,
        question: "What types of accommodation are available in Jharkhand?",
        answer: "Jharkhand offers diverse accommodation options: 1) Government guest houses and tourist lodges in major destinations, 2) Private hotels ranging from budget to luxury, 3) Eco-resorts near wildlife sanctuaries, 4) Tribal homestays for cultural immersion, 5) Forest rest houses for nature lovers, 6) Dharamshalas near religious sites. Major cities like Ranchi and Deoghar have international hotel chains. For unique experiences, consider staying in forest camps or heritage properties converted from old buildings.",
        isPopular: true,
        tags: ["hotels", "accommodation", "lodging"]
      },
      {
        id: 12,
        question: "How can I book accommodations and tours in advance?",
        answer: "Bookings can be made through: 1) Jharkhand Tourism Development Corporation website and offices, 2) Online travel platforms like MakeMyTrip, Booking.com, OYO, 3) Direct contact with hotels and resorts, 4) Authorized travel agents in major cities, 5) Tourist information centers at railway stations and airports. For government accommodations and forest lodges, advance booking is essential, especially during peak season and festivals. Some tribal homestays require bookings through community-based tourism initiatives.",
        isPopular: true,
        tags: ["booking", "reservations", "planning"]
      },
      {
        id: 13,
        question: "Are there budget-friendly accommodation options?",
        answer: "Yes, Jharkhand offers many budget-friendly options: 1) Government guest houses (₹500-1500 per night), 2) Budget hotels and lodges (₹800-2000), 3) Dharamshalas near temples (₹200-500), 4) Youth hostels in major cities, 5) Tribal homestays (₹600-1200 with meals), 6) Forest rest houses (₹400-1000). Many budget accommodations provide clean rooms with basic amenities. Booking in advance and traveling during off-season can help secure better rates.",
        isPopular: false,
        tags: ["budget", "cheap accommodation", "backpacker"]
      }
    ]
  },
  {
    category: "Transportation",
    icon: Car,
    faqs: [
      {
        id: 14,
        question: "How do I reach Jharkhand from major Indian cities?",
        answer: "Jharkhand is well-connected: BY AIR: Ranchi Airport (IXR) connects to Delhi, Mumbai, Kolkata, Bangalore, and Hyderabad. BY TRAIN: Major stations include Ranchi, Dhanbad, Bokaro, and Deoghar. Popular trains include Rajdhani Express, Shatabdi Express, and Jan Shatabdi. BY ROAD: National highways connect to neighboring states. Regular bus services from Kolkata, Patna, and other cities. Ranchi is about 6 hours from Kolkata, 8 hours from Patna by road.",
        isPopular: true,
        tags: ["transportation", "travel", "connectivity"]
      },
      {
        id: 15,
        question: "What is the best way to travel within Jharkhand?",
        answer: "For touring within Jharkhand: 1) Hired cars with drivers - Most convenient and flexible option, 2) Self-drive rental cars - Available in major cities, 3) State transport buses - Budget-friendly but less flexible, 4) Auto-rickshaws and taxis for city travel, 5) Trains for longer distances between major towns. For visiting waterfalls and remote areas, hired cars are recommended. Many tour operators offer customized packages with transportation included.",
        isPopular: true,
        tags: ["local transport", "car rental", "travel tips"]
      },
      {
        id: 16,
        question: "Is it safe to drive in Jharkhand? What about road conditions?",
        answer: "Driving in Jharkhand is generally safe with some precautions: Major highways and city roads are in good condition. Hill roads can be narrow and winding, especially near waterfalls and in forest areas. Avoid night driving in remote areas. During monsoon, some roads may have landslides or flooding. Keep vehicle documents ready as there are checkpoints. GPS navigation works well in most areas. If you're not comfortable with hill driving, hiring a local driver is recommended.",
        isPopular: false,
        tags: ["driving", "road safety", "self-drive"]
      }
    ]
  },
  {
    category: "Safety & Health",
    icon: Shield,
    faqs: [
      {
        id: 17,
        question: "What health precautions should I take while visiting Jharkhand?",
        answer: "Health precautions for Jharkhand: 1) Get vaccinated for Hepatitis A/B, Typhoid, and Japanese Encephalitis, 2) Carry mosquito repellent to prevent malaria and dengue, 3) Drink bottled or boiled water, avoid street food initially, 4) Pack first-aid kit with basic medicines, 5) Wear proper footwear for trekking and forest areas, 6) Sun protection - hat, sunscreen, sunglasses. Medical facilities are available in cities; carry adequate medications for remote area visits.",
        isPopular: false,
        tags: ["health", "medical", "precautions"]
      },
      {
        id: 18,
        question: "Are there any areas or situations to avoid for safety?",
        answer: "Safety guidelines: 1) Avoid isolated forest areas after sunset, 2) Don't trek alone in wilderness areas - always use local guides, 3) Be cautious near waterfalls during monsoon due to strong currents, 4) Avoid political rallies or large gatherings, 5) Don't photograph military installations or tribal ceremonies without permission, 6) Stay in groups while visiting remote tribal villages, 7) Keep valuables secure and avoid displaying expensive items. Follow local authority advice and stay updated with current situations.",
        isPopular: false,
        tags: ["safety", "precautions", "avoid"]
      },
      {
        id: 19,
        question: "What emergency numbers should I know?",
        answer: "Important emergency contacts: 1) Police: 100, 2) Fire Brigade: 101, 3) Medical Emergency: 108, 4) Tourist Helpline: 1363 (toll-free), 5) Railway Enquiry: 139, 6) Jharkhand Tourism: +91-651-2446716. Save local police station numbers for areas you're visiting. Many hotels and tour operators provide 24/7 emergency support. Keep important documents photocopied and stored separately. Inform family/friends about your travel itinerary.",
        isPopular: true,
        tags: ["emergency", "contacts", "helpline"]
      }
    ]
  }
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [expandedFAQs, setExpandedFAQs] = useState<Set<number>>(new Set())
  const [showSubmitForm, setShowSubmitForm] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [newQuestion, setNewQuestion] = useState({
    name: "",
    email: "",
    question: "",
    category: "general"
  })

  // Filter FAQs based on search and category
  const filteredFAQs = faqData.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => {
      const matchesSearch = searchQuery === "" || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = selectedCategory === "all" || category.category.toLowerCase().includes(selectedCategory.toLowerCase())
      
      return matchesSearch && matchesCategory
    })
  })).filter(category => category.faqs.length > 0)

  // Get popular FAQs
  const popularFAQs = faqData.flatMap(category => 
    category.faqs.filter(faq => faq.isPopular)
  ).slice(0, 6)

  // Toggle FAQ expansion
  const toggleFAQ = (id: number) => {
    const newExpanded = new Set(expandedFAQs)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedFAQs(newExpanded)
  }

  // Handle form submission
  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Store in localStorage (in real app, send to backend)
    const questions = JSON.parse(localStorage.getItem("jharkhand-faq-questions") || "[]")
    const newQuestionData = {
      ...newQuestion,
      id: Date.now(),
      date: new Date().toISOString(),
      status: "pending"
    }
    questions.push(newQuestionData)
    localStorage.setItem("jharkhand-faq-questions", JSON.stringify(questions))
    
    setFormSubmitted(true)
    setNewQuestion({ name: "", email: "", question: "", category: "general" })
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false)
      setShowSubmitForm(false)
    }, 3000)
  }

  const categories = [
    { id: "all", label: "All Categories", icon: BookOpen },
    { id: "general", label: "General Travel", icon: MapPin },
    { id: "destinations", label: "Destinations", icon: MapPin },
    { id: "cultural", label: "Cultural", icon: Calendar },
    { id: "accommodation", label: "Accommodation", icon: BookOpen },
    { id: "transportation", label: "Transportation", icon: Car },
    { id: "safety", label: "Safety & Health", icon: Shield }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about visiting Jharkhand, planning your trip, 
              and experiencing the best of our natural and cultural heritage.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search FAQs by keyword, topic, or question..."
                className="pl-12 pr-4 py-6 text-lg border-2 focus:border-primary rounded-full shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full px-6 py-2"
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular FAQs Section */}
      {searchQuery === "" && selectedCategory === "all" && (
        <section className="py-12 bg-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center mb-8">
              <TrendingUp className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-2xl font-bold text-card-foreground">Most Popular Questions</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularFAQs.map((faq) => (
                <Card key={faq.id} className="border-border hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => toggleFAQ(faq.id)}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant="secondary" className="text-xs">Popular</Badge>
                      {expandedFAQs.has(faq.id) ? 
                        <Minus className="h-5 w-5 text-muted-foreground" /> : 
                        <Plus className="h-5 w-5 text-muted-foreground" />
                      }
                    </div>
                    <h3 className="font-semibold text-card-foreground mb-3 line-clamp-2">
                      {faq.question}
                    </h3>
                    {expandedFAQs.has(faq.id) && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {faq.tags.map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Categories Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No FAQs found</h3>
              <p className="text-muted-foreground mb-6">
                No questions match your search criteria. Try different keywords or browse all categories.
              </p>
              <Button onClick={() => { setSearchQuery(""); setSelectedCategory("all") }}>
                View All FAQs
              </Button>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredFAQs.map((categoryData, categoryIndex) => (
                <div key={categoryIndex}>
                  <div className="flex items-center mb-6">
                    <categoryData.icon className="h-6 w-6 text-primary mr-3" />
                    <h2 className="text-2xl font-bold text-foreground">{categoryData.category}</h2>
                    <Badge variant="secondary" className="ml-3">{categoryData.faqs.length} questions</Badge>
                  </div>

                  <div className="space-y-4">
                    {categoryData.faqs.map((faq) => (
                      <Card key={faq.id} className="border-border hover:shadow-md transition-all duration-300">
                        <CardContent className="p-0">
                          <div
                            className="p-6 cursor-pointer flex items-start justify-between"
                            onClick={() => toggleFAQ(faq.id)}
                          >
                            <div className="flex-1 mr-4">
                              <div className="flex items-center mb-2">
                                <h3 className="font-semibold text-card-foreground">
                                  {faq.question}
                                </h3>
                                {faq.isPopular && (
                                  <Badge variant="secondary" className="ml-3 text-xs">Popular</Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex-shrink-0">
                              {expandedFAQs.has(faq.id) ? 
                                <Minus className="h-5 w-5 text-primary" /> : 
                                <Plus className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                              }
                            </div>
                          </div>

                          {expandedFAQs.has(faq.id) && (
                            <div className="px-6 pb-6 border-t border-border bg-muted/20">
                              <div className="pt-6">
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                  {faq.answer}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {faq.tags.map((tag, tagIndex) => (
                                    <Badge key={tagIndex} variant="outline" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setSearchQuery(tag)
                                      }}
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Submit Question Section */}
      <section className="py-12 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-border shadow-lg">
            <CardContent className="p-8">
              {!showSubmitForm ? (
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-card-foreground mb-2">
                    Can't find what you're looking for?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Submit your question and our travel experts will get back to you within 24 hours.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={() => setShowSubmitForm(true)} className="px-8 py-3">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Ask a Question
                    </Button>
                    <Link href="/contact">
                      <Button variant="outline" className="px-8 py-3">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact Support
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : formSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">
                    Question Submitted Successfully!
                  </h3>
                  <p className="text-muted-foreground">
                    Thank you for your question. Our travel experts will review it and get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-card-foreground mb-2">Submit Your Question</h3>
                    <p className="text-muted-foreground">
                      Ask anything about traveling to Jharkhand and we'll help you plan the perfect trip.
                    </p>
                  </div>

                  <form onSubmit={handleSubmitQuestion} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Your Name *
                        </label>
                        <Input
                          type="text"
                          required
                          value={newQuestion.name}
                          onChange={(e) => setNewQuestion({...newQuestion, name: e.target.value})}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          required
                          value={newQuestion.email}
                          onChange={(e) => setNewQuestion({...newQuestion, email: e.target.value})}
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Question Category
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        value={newQuestion.category}
                        onChange={(e) => setNewQuestion({...newQuestion, category: e.target.value})}
                      >
                        <option value="general">General Travel</option>
                        <option value="destinations">Destinations & Attractions</option>
                        <option value="cultural">Cultural Experiences</option>
                        <option value="accommodation">Accommodation & Booking</option>
                        <option value="transportation">Transportation</option>
                        <option value="safety">Safety & Health</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Your Question *
                      </label>
                      <Textarea
                        required
                        value={newQuestion.question}
                        onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                        placeholder="Please describe your question in detail..."
                        rows={4}
                        className="resize-none"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button type="submit" className="flex-1">
                        <Send className="h-4 w-4 mr-2" />
                        Submit Question
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowSubmitForm(false)} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Help Resources Section */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Additional Help Resources</h2>
            <p className="text-muted-foreground">Explore more ways to get assistance for your Jharkhand trip</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-lg transition-shadow text-center">
              <CardContent className="p-8">
                <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-card-foreground mb-2">Tourist Helpline</h3>
                <p className="text-muted-foreground mb-4">24/7 assistance for all your travel needs</p>
                <p className="text-primary font-semibold">1363 (Toll Free)</p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow text-center">
              <CardContent className="p-8">
                <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-card-foreground mb-2">Email Support</h3>
                <p className="text-muted-foreground mb-4">Get detailed answers to your questions</p>
                <Link href="/contact" className="text-primary font-semibold hover:underline">
                  Contact Us
                </Link>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow text-center">
              <CardContent className="p-8">
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-card-foreground mb-2">Travel Guide</h3>
                <p className="text-muted-foreground mb-4">Comprehensive guide to plan your perfect trip</p>
                <Link href="/itinerary" className="text-primary font-semibold hover:underline">
                  Plan Trip
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}