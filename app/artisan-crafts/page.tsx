'use client'

import { useState } from 'react'
import Head from 'next/head'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import {
  Palette,
  Scissors,
  Hammer,
  Heart,
  Star,
  MapPin,
  Users,
  Clock,
  ArrowRight,
  ShoppingBag,
  Award,
  Globe,
  X,
  Eye,
  Phone,
  User
} from 'lucide-react'

const craftsData = [
  {
    id: 'dokra-art',
    name: 'Dokra Art',
    description: 'Ancient metal casting technique using lost-wax process',
    longDescription: 'Dokra is a traditional metal casting art practiced by tribal communities in Jharkhand for over 4000 years. Using the lost-wax casting technique, artisans create beautiful figurines, jewelry, and decorative items from brass and bronze.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    region: 'Dhanbad, Bokaro, Ranchi',
    artisans: '500+ families',
    materials: ['Brass', 'Bronze', 'Beeswax', 'Clay'],
    products: ['Figurines', 'Jewelry', 'Decorative Items', 'Religious Idols'],
    timeToMake: '7-15 days',
    priceRange: '₹200 - ₹5,000',
    significance: 'UNESCO recognized traditional craft',
    category: 'Metal Work',
    agent: {
      name: 'Ravi Kumar Singh',
      phone: '+91 99887-76655',
      rating: 5,
      speciality: 'Dokra Metal Art Specialist'
    }
  },
  {
    id: 'bamboo-crafts',
    name: 'Bamboo Crafts',
    description: 'Eco-friendly bamboo products crafted by tribal artisans',
    longDescription: 'Jharkhand\'s tribal communities have mastered the art of bamboo crafting, creating everything from household items to decorative pieces. This sustainable craft utilizes locally grown bamboo and traditional techniques passed down through generations.',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
    region: 'Ranchi, Khunti, Gumla',
    artisans: '800+ families',
    materials: ['Bamboo', 'Cane', 'Natural Dyes', 'Threads'],
    products: ['Baskets', 'Furniture', 'Wall Hangings', 'Kitchen Items'],
    timeToMake: '2-10 days',
    priceRange: '₹100 - ₹3,000',
    significance: 'Eco-friendly sustainable craft',
    category: 'Natural Fiber',
    agent: {
      name: 'Sunita Devi',
      phone: '+91 88776-65544',
      rating: 4,
      speciality: 'Bamboo Craft Expert'
    }
  },
  {
    id: 'paitkar-paintings',
    name: 'Paitkar Paintings',
    description: 'Traditional scroll paintings depicting mythological stories',
    longDescription: 'Paitkar paintings are traditional scroll paintings created by the Chitrakar community of Jharkhand. These narrative paintings depict stories from Hindu epics, tribal folklore, and social themes using natural colors on handmade paper or cloth.',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80',
    region: 'Dumka, Jamtara, Godda',
    artisans: '200+ artists',
    materials: ['Natural Colors', 'Handmade Paper', 'Cloth', 'Brushes'],
    products: ['Scroll Paintings', 'Wall Art', 'Story Books', 'Decorative Items'],
    timeToMake: '5-20 days',
    priceRange: '₹500 - ₹8,000',
    significance: 'Storytelling through art',
    category: 'Painting',
    agent: {
      name: 'Manoj Chitrakar',
      phone: '+91 77665-54433',
      rating: 5,
      speciality: 'Traditional Painting Master'
    }
  },
  {
    id: 'jadur-patua',
    name: 'Jadur Patua',
    description: 'Magical scroll paintings with singing narratives',
    longDescription: 'Jadur Patua is a unique art form where painted scrolls are unrolled while narrating stories through songs. This traditional performance art combines visual storytelling with music, often depicting moral tales and historical events.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    region: 'Purulia (border region)',
    artisans: '100+ performers',
    materials: ['Canvas', 'Natural Pigments', 'Brushes', 'Musical Instruments'],
    products: ['Performance Scrolls', 'Art Pieces', 'Cultural Shows'],
    timeToMake: '15-30 days',
    priceRange: '₹1,000 - ₹15,000',
    significance: 'Performing art tradition',
    category: 'Performance Art',
    agent: {
      name: 'Amit Patua',
      phone: '+91 66554-43322',
      rating: 3,
      speciality: 'Performance Art Coordinator'
    }
  },
  {
    id: 'sohrai-khovar',
    name: 'Sohrai & Khovar Art',
    description: 'Wall paintings celebrating harvest and fertility',
    longDescription: 'Sohrai and Khovar are traditional wall painting arts practiced by tribal women in Jharkhand. Sohrai celebrates the harvest festival, while Khovar is associated with marriage ceremonies. These arts use natural materials and geometric patterns.',
    image: 'https://images.unsplash.com/photo-1578764625513-24c4f737cf25?w=800&q=80',
    region: 'Hazaribagh, Ramgarh, Chatra',
    artisans: '1000+ women artists',
    materials: ['Natural Clay', 'Cow Dung', 'Charcoal', 'Natural Colors'],
    products: ['Wall Murals', 'Canvas Art', 'Decorative Panels'],
    timeToMake: '3-7 days',
    priceRange: '₹300 - ₹4,000',
    significance: 'Women empowerment through art',
    category: 'Wall Art',
    agent: {
      name: 'Kavita Kumari',
      phone: '+91 55443-32211',
      rating: 4,
      speciality: 'Wall Art Specialist'
    }
  },
  {
    id: 'lac-bangles',
    name: 'Lac Bangles',
    description: 'Colorful traditional bangles made from natural lac',
    longDescription: 'Lac bangles are traditional jewelry items made from natural lac resin collected from trees. Artisans heat and shape the lac into beautiful, colorful bangles that are an integral part of traditional Indian attire.',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80',
    region: 'Ranchi, Jamshedpur, Dhanbad',
    artisans: '300+ families',
    materials: ['Natural Lac', 'Colors', 'Glitter', 'Decorative Elements'],
    products: ['Bangles', 'Bracelets', 'Anklets', 'Decorative Items'],
    timeToMake: '1-3 days',
    priceRange: '₹50 - ₹800',
    significance: 'Traditional jewelry craft',
    category: 'Jewelry',
    agent: {
      name: 'Rajesh Lac Artist',
      phone: '+91 44332-21100',
      rating: 2,
      speciality: 'Lac Jewelry Craftsman'
    }
  }
]

// Agent Modal Component
function AgentModal({ agent, isOpen, onClose }: { agent: any, isOpen: boolean, onClose: () => void }) {
  if (!isOpen || !agent) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Contact Agent</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          {/* Agent Info */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">{agent.name}</h4>
            <p className="text-sm text-gray-600 mb-3">{agent.speciality}</p>
            
            {/* Rating */}
            <div className="flex justify-center items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= agent.rating
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600 ml-2">({agent.rating}/5)</span>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Phone className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone Number</p>
                <p className="text-lg font-semibold text-gray-900">{agent.phone}</p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              onClick={() => window.open(`tel:${agent.phone}`, '_self')}
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => window.open(`sms:${agent.phone}?body=Hi, I'm interested in buying your crafts. Please let me know about available products.`, '_self')}
            >
              Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Modal Component for Craft Details
function CraftModal({ craft, isOpen, onClose, onOpenAgent }: { craft: any, isOpen: boolean, onClose: () => void, onOpenAgent: (agent: any) => void }) {
  if (!isOpen || !craft) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {/* Header Image */}
          <div className="relative h-64 md:h-80">
            <Image
              src={craft.image}
              alt={craft.name}
              fill
              className="object-cover rounded-t-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-2xl" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-purple-100 text-purple-700 border-0">
                  {craft.category}
                </Badge>
                <Badge className="bg-yellow-100 text-yellow-700 border-0">
                  {craft.significance}
                </Badge>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">{craft.name}</h2>
              <p className="text-purple-200 flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {craft.region}
              </p>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Description */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">About this Craft</h3>
              <p className="text-gray-600 leading-relaxed">
                {craft.longDescription}
              </p>
            </div>
            
            {/* Key Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-3 text-purple-500" />
                  <div>
                    <span className="font-medium text-gray-900">Artisan Families</span>
                    <p className="text-gray-600 text-sm">{craft.artisans}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3 text-blue-500" />
                  <div>
                    <span className="font-medium text-gray-900">Time to Create</span>
                    <p className="text-gray-600 text-sm">{craft.timeToMake}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <ShoppingBag className="h-5 w-5 mr-3 text-green-500" />
                  <div>
                    <span className="font-medium text-gray-900">Price Range</span>
                    <p className="text-gray-600 text-sm">{craft.priceRange}</p>
                  </div>
                </div>
              </div>
              
              <div>
                {/* Materials */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Materials Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {craft.materials.map((material: string, index: number) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="bg-purple-50 text-purple-600 border-purple-200"
                      >
                        {material}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Products */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Products Made</h4>
                  <div className="flex flex-wrap gap-2">
                    {craft.products.map((product: string, index: number) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="bg-blue-50 text-blue-600 border-blue-200"
                      >
                        {product}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Button */}
            <div className="pt-4 border-t">
              <Button 
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 text-lg font-semibold"
                onClick={() => onOpenAgent(craft.agent)}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ArtisanCraftsPage() {
  const [selectedCraft, setSelectedCraft] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  
  const openCraftModal = (craft: any) => {
    setSelectedCraft(craft);
    setIsModalOpen(true);
  };
  
  const closeCraftModal = () => {
    setIsModalOpen(false);
    setSelectedCraft(null);
  };
  
  const openAgentModal = (agent: any) => {
    setSelectedAgent(agent);
    setIsAgentModalOpen(true);
  };
  
  const closeAgentModal = () => {
    setIsAgentModalOpen(false);
    setSelectedAgent(null);
  };
  
  const scrollToCrafts = () => {
    const craftsSection = document.getElementById('traditional-crafts');
    if (craftsSection) {
      craftsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        <title>Traditional Artisan Crafts of Jharkhand | Jharkhand Tourism</title>
        <meta 
          name="description" 
          content="Explore the rich heritage of Jharkhand's traditional crafts including Dokra art, bamboo crafts, Paitkar paintings, Sohrai & Khovar art, and more. Discover the skilled artisans preserving ancient techniques." 
        />
        <meta 
          name="keywords" 
          content="Jharkhand crafts, Dokra art, bamboo crafts, Paitkar paintings, Sohrai art, Khovar art, tribal crafts, traditional art, artisan crafts, Jharkhand heritage" 
        />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Traditional <span className="text-yellow-400">Artisan Crafts</span> of Jharkhand
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Discover the rich heritage of Jharkhand's traditional crafts, where ancient techniques 
              meet artistic excellence. Each craft tells a story of cultural preservation and 
              skilled craftsmanship passed down through generations.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-8 text-purple-200">
                <div className="flex items-center">
                  <Palette className="h-5 w-5 mr-2" />
                  <span>{craftsData.length} Traditional Crafts</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  <span>3000+ Artisan Families</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  <span>UNESCO Recognition</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crafts Grid */}
      <section id="traditional-crafts" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Traditional Craft Forms</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore the diverse range of traditional crafts that showcase the artistic 
              heritage and cultural richness of Jharkhand's tribal and rural communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {craftsData.map((craft) => (
              <Card 
                key={craft.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white border-0 shadow-lg group cursor-pointer"
                onClick={() => openCraftModal(craft)}
              >
                <div className="relative h-64">
                  <Image
                    src={craft.image}
                    alt={craft.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-0">
                      {craft.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{craft.name}</h3>
                    <p className="text-purple-200 text-sm mt-1">{craft.region}</p>
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {craft.description}
                  </p>

                  {/* Key Details Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-500">
                        <Users className="h-3 w-3 mr-2 text-purple-500" />
                        <span>{craft.artisans}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Clock className="h-3 w-3 mr-2 text-blue-500" />
                        <span>{craft.timeToMake}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-500">
                        <ShoppingBag className="h-3 w-3 mr-2 text-green-500" />
                        <span>{craft.priceRange}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Star className="h-3 w-3 mr-2 text-yellow-500" />
                        <span className="text-xs">{craft.significance}</span>
                      </div>
                    </div>
                  </div>

                  {/* Materials Used */}
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-700 mb-2">Materials:</p>
                    <div className="flex flex-wrap gap-1">
                      {craft.materials.slice(0, 3).map((material, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="text-xs bg-purple-50 text-purple-600 border-purple-200"
                        >
                          {material}
                        </Badge>
                      ))}
                      {craft.materials.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{craft.materials.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        openCraftModal(craft);
                      }}
                    >
                      <Eye className="h-3 w-3 mr-2" />
                      View Details
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-purple-200 text-purple-600 hover:bg-purple-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MapPin className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Artisan Support Section */}
      <section className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Support Traditional Artisans</h2>
          <p className="text-purple-100 text-lg mb-8">
            Help preserve these ancient art forms by supporting local artisans and 
            their communities. Every purchase helps sustain traditional craftsmanship.
          </p>
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-8"
              onClick={scrollToCrafts}
            >
              Buy Authentic Crafts
            </Button>
          </div>
          
          {/* Statistics */}
          <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-purple-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">3000+</div>
              <div className="text-sm text-purple-200">Artisan Families</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">4000</div>
              <div className="text-sm text-purple-200">Years of Heritage</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">15+</div>
              <div className="text-sm text-purple-200">Districts Involved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Significance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cultural Heritage & Significance</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              These traditional crafts are not just art forms but living traditions that connect 
              communities to their ancestral heritage, providing sustainable livelihoods while 
              preserving cultural identity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Recognition</h3>
              <p className="text-gray-600">
                Many of Jharkhand's crafts have received international recognition and are 
                exported worldwide, showcasing Indian artistry.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Empowerment</h3>
              <p className="text-gray-600">
                These crafts provide sustainable livelihoods to thousands of families, 
                especially women and marginalized communities.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Cultural Preservation</h3>
              <p className="text-gray-600">
                Each craft form preserves ancient techniques, stories, and cultural values, 
                passing them to future generations.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Craft Details Modal */}
      <CraftModal 
        craft={selectedCraft} 
        isOpen={isModalOpen} 
        onClose={closeCraftModal}
        onOpenAgent={openAgentModal}
      />
      
      {/* Agent Contact Modal */}
      <AgentModal 
        agent={selectedAgent}
        isOpen={isAgentModalOpen}
        onClose={closeAgentModal}
      />
      </div>
    </>
  )
}
