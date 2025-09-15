"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./sidebar-animations.css";
import { 
  Menu, 
  X,
  MapPin,
  Mountain,
  Users,
  Calendar,
  Leaf,
  Camera,
  TreePine,
  Phone,
  HelpCircle,
  Info,
  Building,
  Plane,
  Hotel,
  Train,
  Star,
  BookOpen
} from "lucide-react";

export function SidebarNavigation() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  
  // Check if we're on the homepage
  const isHomePage = pathname === '/';
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Lock/unlock body scroll when sidebar opens/closes
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);
  
  // Keyboard support (ESC to close sidebar)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    
    if (isSidebarOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSidebarOpen]);
  
  // Dynamic button styling with bold, visible colors
  const getButtonStyles = () => {
    if (isHomePage && !isScrolled) {
      // Hero section - bright orange with white icon for maximum visibility
      return "bg-orange-500 hover:bg-orange-600 text-white border border-orange-300 shadow-lg hover:shadow-orange-500/30";
    } else {
      // Other pages - solid dark background with white icon
      return "bg-slate-900 hover:bg-slate-800 text-white border border-slate-600 shadow-lg hover:shadow-slate-900/30";
    }
  };

  const mainSections = [
    {
      id: "discover",
      title: "Discover",
      icon: <MapPin className="w-5 h-5" />,
      color: "text-orange-400",
      subLinks: [
        { label: "About Jharkhand", href: "/about", icon: <Info className="w-4 h-4" /> },
        { label: "Tourist Destinations", href: "/places", icon: <Mountain className="w-4 h-4" /> },
        { label: "Major Cities", href: "/places", icon: <Building className="w-4 h-4" /> },
        { label: "Wildlife Sanctuaries", href: "/places", icon: <TreePine className="w-4 h-4" /> },
        { label: "Hill Stations", href: "/places", icon: <Mountain className="w-4 h-4" /> },
        { label: "Temples & Shrines", href: "/places", icon: <Building className="w-4 h-4" /> },
      ]
    },
    {
      id: "experience",
      title: "Experience",
      icon: <Users className="w-5 h-5" />,
      color: "text-green-400",
      subLinks: [
        { label: "Tribal Heritage", href: "/festivals", icon: <Users className="w-4 h-4" /> },
        { label: "Festivals", href: "/festivals", icon: <Calendar className="w-4 h-4" /> },
        { label: "Art & Crafts", href: "/festivals", icon: <Camera className="w-4 h-4" /> },
        { label: "Folk Music & Dance", href: "/festivals", icon: <Users className="w-4 h-4" /> },
        { label: "Local Cuisine", href: "/places", icon: <Camera className="w-4 h-4" /> },
        { label: "Adventure Sports", href: "/places", icon: <Mountain className="w-4 h-4" /> },
      ]
    },
    {
      id: "help",
      title: "Help",
      icon: <HelpCircle className="w-5 h-5" />,
      color: "text-blue-400",
      subLinks: [
        { label: "Plan Your Trip", href: "/book-tour", icon: <BookOpen className="w-4 h-4" /> },
        { label: "Book Hotels", href: "/book-hotels", icon: <Hotel className="w-4 h-4" /> },
        { label: "Book Flights", href: "/book-flights", icon: <Plane className="w-4 h-4" /> },
        { label: "Book Trains", href: "/book-trains", icon: <Train className="w-4 h-4" /> },
        { label: "Reviews", href: "/reviews", icon: <Star className="w-4 h-4" /> },
        { label: "Contact Us", href: "/contact", icon: <Phone className="w-4 h-4" /> },
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <div className="fixed top-4 right-4 z-[999] transition-all duration-300">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className={`p-2.5 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 hamburger-visible hamburger-pulse ${getButtonStyles()}`}
          aria-label="Open navigation menu"
          aria-expanded={isSidebarOpen}
          type="button"
        >
          <Menu className="h-5 w-5 stroke-2" />
        </button>
      </div>

      {/* Sidebar Overlay */}
      <div 
        className={`fixed inset-0 z-[1000] transition-all duration-500 ease-in-out sidebar-overlay ${
          isSidebarOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
        }`}
        aria-hidden={!isSidebarOpen}
        onTouchMove={(e) => e.preventDefault()}
      >
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
        
        {/* Sidebar Container */}
        <div 
          className={`sidebar-fullscreen bg-black/90 backdrop-blur-sm transform transition-transform duration-500 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          } shadow-2xl flex flex-col relative z-30`}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="sidebar-close-btn p-3 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full text-white hover:text-orange-400 transition-all duration-200 border border-white/20 hover:border-orange-400/50"
            aria-label="Close navigation menu"
          >
            <X className="h-6 w-6 stroke-2" />
          </button>

          {/* Main JHARKHAND Heading - Top Center */}
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-center z-20">
            <h1 className="text-5xl font-black text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text tracking-wide drop-shadow-xl">
              JHARKHAND
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mx-auto mt-3 rounded-full shadow-md"></div>
          </div>

          {/* Content Container */}
          <div className="h-full flex">

          {/* Left Section: Image - 35% */}
          <div className="w-[35%] h-full relative">
            <img 
              src="/jharkhand-forest-landscape-with-tribal-culture-ele.jpg" 
              alt="Jharkhand Beauty" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/50"></div>
            
            {/* Header Text */}
            <div className="absolute bottom-12 left-8 right-8">
              <h1 className="text-6xl font-bold text-white mb-4 leading-tight tracking-wide">JHARKHAND</h1>
              <p className="text-white/80 text-lg">Explore the Heart of India</p>
            </div>
          </div>

          {/* Middle Section: Main Navigation - 30% */}
          <div className="w-[30%] h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden border-r border-slate-700">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }}></div>
            </div>
            
            {/* Main Navigation */}
            <div className="relative z-10 h-full flex flex-col justify-center px-8">
              <div className="space-y-8">
                
                {/* Discover */}
                <button
                  onClick={() => toggleSection('discover')}
                  className={`text-left text-3xl font-bold transition-all duration-300 hover:text-orange-400 block w-full py-4 tracking-wide border-l-4 pl-4 ${
                    activeSection === 'discover' ? 'text-orange-400 border-orange-400' : 'text-white border-transparent hover:border-orange-400/50'
                  }`}
                >
                  DISCOVER
                </button>
                
                {/* Experience */}
                <button
                  onClick={() => toggleSection('experience')}
                  className={`text-left text-3xl font-bold transition-all duration-300 hover:text-orange-400 block w-full py-4 tracking-wide border-l-4 pl-4 ${
                    activeSection === 'experience' ? 'text-orange-400 border-orange-400' : 'text-white border-transparent hover:border-orange-400/50'
                  }`}
                >
                  EXPERIENCE
                </button>
                
                {/* Plan */}
                <button
                  onClick={() => toggleSection('plan')}
                  className={`text-left text-3xl font-bold transition-all duration-300 hover:text-orange-400 block w-full py-4 tracking-wide border-l-4 pl-4 ${
                    activeSection === 'plan' ? 'text-orange-400 border-orange-400' : 'text-white border-transparent hover:border-orange-400/50'
                  }`}
                >
                  PLAN
                </button>
                
                {/* Help */}
                <button
                  onClick={() => toggleSection('help')}
                  className={`text-left text-3xl font-bold transition-all duration-300 hover:text-orange-400 block w-full py-4 tracking-wide border-l-4 pl-4 ${
                    activeSection === 'help' ? 'text-orange-400 border-orange-400' : 'text-white border-transparent hover:border-orange-400/50'
                  }`}
                >
                  HELP
                </button>
                
              </div>
            </div>
          </div>

          {/* Right Section: Sub Navigation - 35% */}
          <div className="w-[35%] h-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 75% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }}></div>
            </div>
            
            {/* Sub Navigation Content */}
            <div className="relative z-10 h-full overflow-y-auto">
              {activeSection ? (
                <div className="p-8 animate-fadeIn">
                  {/* Section Header */}
                  <div className="mb-8 text-center border-b border-slate-600 pb-6">
                    <h2 className="text-4xl font-bold text-orange-400 tracking-wide">
                      {activeSection.toUpperCase()}
                    </h2>
                    <div className="w-16 h-1 bg-orange-400 mx-auto mt-3 rounded"></div>
                  </div>
                  
                  {/* Discover Sub-links */}
                  {activeSection === 'discover' && (
                    <div className="space-y-8">
                      {/* Top 3 Main Categories */}
                      <div className="grid grid-cols-1 gap-6 mb-8">
                        <div className="bg-slate-600/30 rounded-lg p-4 border border-slate-500/30">
                          <h3 className="text-orange-400 text-lg font-bold mb-4 text-center uppercase tracking-wider">
                            About Jharkhand
                          </h3>
                          <div className="grid grid-cols-2 gap-3">
                            <Link href="/about" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:scale-105 transition-all duration-200 text-sm py-2 px-3 bg-slate-700/50 rounded text-center">
                              Glimpses of Jharkhand
                            </Link>
                            <Link href="/festivals" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:scale-105 transition-all duration-200 text-sm py-2 px-3 bg-slate-700/50 rounded text-center">
                              Events of Jharkhand
                            </Link>
                            <Link href="/reviews" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:scale-105 transition-all duration-200 text-sm py-2 px-3 bg-slate-700/50 rounded text-center">
                              Social Wall
                            </Link>
                            <Link href="/contact" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:scale-105 transition-all duration-200 text-sm py-2 px-3 bg-slate-700/50 rounded text-center">
                              FAQs
                            </Link>
                          </div>
                        </div>
                        
                        <div className="bg-slate-600/30 rounded-lg p-4 border border-slate-500/30">
                          <h3 className="text-orange-400 text-lg font-bold mb-4 text-center uppercase tracking-wider">
                            Attractions
                          </h3>
                          <div className="grid grid-cols-2 gap-2">
                            <Link href="/waterfall" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:scale-105 transition-all duration-200 text-xs py-2 px-2 bg-slate-700/50 rounded text-center">
                              🌊 Waterfalls
                            </Link>
                            <Link href="/hill-station" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:scale-105 transition-all duration-200 text-xs py-2 px-2 bg-slate-700/50 rounded text-center">
                              ⛰️ Hill Stations
                            </Link>
                            <Link href="/national-park" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:scale-105 transition-all duration-200 text-xs py-2 px-2 bg-slate-700/50 rounded text-center">
                              🌲 National Parks
                            </Link>
                            <Link href="/adventure-sports" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:scale-105 transition-all duration-200 text-xs py-2 px-2 bg-slate-700/50 rounded text-center">
                              🏕️ Adventure Sports
                            </Link>
                            <Link href="/lake" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:scale-105 transition-all duration-200 text-xs py-2 px-2 bg-slate-700/50 rounded text-center">
                              🏞️ Lakes
                            </Link>
                            <Link href="/dam" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:scale-105 transition-all duration-200 text-xs py-2 px-2 bg-slate-700/50 rounded text-center">
                              🏗️ Dams
                            </Link>
                            <Link href="/historic-site" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:scale-105 transition-all duration-200 text-xs py-2 px-2 bg-slate-700/50 rounded text-center">
                              🏛️ Historic Sites
                            </Link>
                            <Link href="/park" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:scale-105 transition-all duration-200 text-xs py-2 px-2 bg-slate-700/50 rounded text-center">
                              🌳 Parks
                            </Link>
                            <Link href="/religious-site" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:scale-105 transition-all duration-200 text-xs py-2 px-2 bg-slate-700/50 rounded text-center">
                              🕉️ Religious Sites
                            </Link>
                            <Link href="/valley" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:scale-105 transition-all duration-200 text-xs py-2 px-2 bg-slate-700/50 rounded text-center">
                              ⛰️ Valleys
                            </Link>
                            <Link href="/wildlife-sanctuary" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:scale-105 transition-all duration-200 text-xs py-2 px-2 bg-slate-700/50 rounded text-center">
                              🦌 Wildlife Sanctuaries
                            </Link>
                            <Link href="/temples-monuments" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:scale-105 transition-all duration-200 text-xs py-2 px-2 bg-slate-700/50 rounded text-center">
                              🕉️ Temples & Monuments
                            </Link>
                          </div>
                        </div>
                        
                        <div className="bg-slate-600/30 rounded-lg p-4 border border-slate-500/30">
                          <h3 className="text-orange-400 text-lg font-bold mb-4 text-center uppercase tracking-wider">
                            Major Cities
                          </h3>
                          <div className="grid grid-cols-2 gap-3">
                            <Link href="/about" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:scale-105 transition-all duration-200 text-sm py-2 px-3 bg-slate-700/50 rounded text-center">
                              Ranchi
                            </Link>
                            <Link href="/about" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:scale-105 transition-all duration-200 text-sm py-2 px-3 bg-slate-700/50 rounded text-center">
                              Jamshedpur
                            </Link>
                            <Link href="/about" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:scale-105 transition-all duration-200 text-sm py-2 px-3 bg-slate-700/50 rounded text-center">
                              Dhanbad
                            </Link>
                            <Link href="/about" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:scale-105 transition-all duration-200 text-sm py-2 px-3 bg-slate-700/50 rounded text-center">
                              Bokaro
                            </Link>
                            <Link href="/about" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:scale-105 transition-all duration-200 text-sm py-2 px-3 bg-slate-700/50 rounded text-center">
                              Deoghar
                            </Link>
                            <Link href="/about" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:scale-105 transition-all duration-200 text-sm py-2 px-3 bg-slate-700/50 rounded text-center">
                              All Cities
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Experience Sub-links */}
                  {activeSection === 'experience' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-orange-300 text-xl font-semibold mb-6 uppercase tracking-wider flex items-center">
                          <span className="w-2 h-2 bg-orange-300 rounded-full mr-3"></span>
                          Cultural Heritage
                        </h3>
                        <div className="space-y-4 pl-5">
                          <Link href="/festivals" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 text-lg py-2">
                            → Tribal Heritage
                          </Link>
                          <Link href="/festivals" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 text-lg py-2">
                            → Art & Crafts
                          </Link>
                          <Link href="/festivals" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 text-lg py-2">
                            → Folk Music
                          </Link>
                          <Link href="/festivals" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 text-lg py-2">
                            → Traditional Dance
                          </Link>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-orange-300 text-xl font-semibold mb-6 uppercase tracking-wider flex items-center">
                          <span className="w-2 h-2 bg-orange-300 rounded-full mr-3"></span>
                          Festivals & Events
                        </h3>
                        <div className="space-y-4 pl-5">
                          <Link href="/festivals" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 text-lg py-2">
                            → All Festivals
                          </Link>
                          <Link href="/festivals" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 text-lg py-2">
                            → Sarhul Festival
                          </Link>
                          <Link href="/festivals" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 text-lg py-2">
                            → Sohrai Festival
                          </Link>
                          <Link href="/festivals" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 text-lg py-2">
                            → Karma Festival
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Plan Sub-links */}
                  {activeSection === 'plan' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-orange-300 text-xl font-semibold mb-6 uppercase tracking-wider flex items-center">
                          <span className="w-2 h-2 bg-orange-300 rounded-full mr-3"></span>
                          Trip Planning
                        </h3>
                        <div className="space-y-4 pl-5">
                          <Link href="/book-tour" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 text-lg py-2">
                            → Tour Packages
                          </Link>
                          <Link href="/map" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 text-lg py-2">
                            → Interactive Map
                          </Link>
                          <Link href="/contact" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 text-lg py-2">
                            → Travel Guide
                          </Link>
                          <Link href="/reviews" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 text-lg py-2">
                            → Itineraries
                          </Link>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-orange-300 text-xl font-semibold mb-6 uppercase tracking-wider flex items-center">
                          <span className="w-2 h-2 bg-orange-300 rounded-full mr-3"></span>
                          Bookings & Reservations
                        </h3>
                        <div className="space-y-4 pl-5">
                          <Link href="/book-hotels" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 text-lg py-2">
                            → Hotels & Accommodation
                          </Link>
                          <Link href="/book-flights" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 text-lg py-2">
                            → Flights
                          </Link>
                          <Link href="/book-trains" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 text-lg py-2">
                            → Train Tickets
                          </Link>
                          <Link href="/book-tour" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 text-lg py-2">
                            → Car Rentals
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Help Sub-links */}
                  {activeSection === 'help' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-orange-300 text-xl font-semibold mb-6 uppercase tracking-wider flex items-center">
                          <span className="w-2 h-2 bg-orange-300 rounded-full mr-3"></span>
                          Customer Support
                        </h3>
                        <div className="space-y-4 pl-5">
                          <Link href="/contact" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 text-lg py-2">
                            → Contact Us
                          </Link>
                          <Link href="/contact" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 text-lg py-2">
                            → FAQ
                          </Link>
                          <Link href="/contact" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 text-lg py-2">
                            → Travel Tips
                          </Link>
                          <Link href="/reviews" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 text-lg py-2">
                            → Emergency Contacts
                          </Link>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-orange-300 text-xl font-semibold mb-6 uppercase tracking-wider flex items-center">
                          <span className="w-2 h-2 bg-orange-300 rounded-full mr-3"></span>
                          Resources & Info
                        </h3>
                        <div className="space-y-4 pl-5">
                          <Link href="/reviews" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 text-lg py-2">
                            → Reviews & Ratings
                          </Link>
                          <Link href="/contact" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 text-lg py-2">
                            → Download Brochures
                          </Link>
                          <Link href="/map" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 text-lg py-2">
                            → Weather Updates
                          </Link>
                          <Link href="/contact" onClick={() => setIsSidebarOpen(false)} className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 text-lg py-2">
                            → Language Guide
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Footer */}
                  <div className="mt-12 pt-8 border-t border-slate-600">
                    <p className="text-gray-400 text-sm text-center">
                      Government of Jharkhand
                    </p>
                    <p className="text-gray-500 text-xs text-center mt-1">
                      Department of Tourism
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-center p-8">
                  <div>
                    <div className="w-24 h-24 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-4xl">🌟</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Welcome to Jharkhand</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Select a section from the left to explore our beautiful state and discover all that Jharkhand has to offer.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
