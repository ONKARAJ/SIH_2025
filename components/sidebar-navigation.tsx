"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const [activeSection, setActiveSection] = useState<string | null>('discover');
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
      <div className="fixed top-4 right-4 z-[60] transition-all duration-300">
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
        className={`fixed inset-0 z-[70] transition-all duration-500 ease-in-out sidebar-overlay ${
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
          } shadow-2xl flex flex-col`}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-8 right-8 p-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-200 z-10"
            aria-label="Close navigation menu"
          >
            <X className="h-8 w-8" />
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

          {/* Left Section: Image - 45% */}
          <div className="w-[45%] h-full relative">
            <img 
              src="/jharkhand-forest-landscape-with-tribal-culture-ele.jpg" 
              alt="Jharkhand Beauty" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/30 to-black/60"></div>
            
            {/* Header Text */}
            <div className="absolute bottom-8 left-6 right-6">
              <h1 className="text-5xl font-bold text-white mb-4 leading-tight">Discover<br />Jharkhand</h1>
            </div>
          </div>

          {/* Middle Section: Main Navigation - ~27.5% of remaining 55% */}
          <div 
            className="w-[27.5%] h-full flex flex-col justify-center px-8 space-y-6 relative overflow-hidden"
            style={{
              backgroundImage: `url('/jharkhand-forest-landscape-with-tribal-culture-ele.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center right'
            }}
          >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-900/70 via-green-900/60 to-slate-800/80 backdrop-blur-sm"></div>
            
            {/* Content with higher z-index */}
            <div className="relative z-10 flex flex-col space-y-8">
            {/* Main navigation links in logical order */}
            <button
              onClick={() => toggleSection('discover')}
              className={`text-left text-3xl font-medium transition-all duration-300 hover:text-yellow-400 block w-full py-2 ${
                activeSection === 'discover' ? 'text-yellow-400' : 'text-white'
              }`}
            >
              Discover
            </button>
            
            <button
              onClick={() => toggleSection('experience')}
              className={`text-left text-3xl font-medium transition-all duration-300 hover:text-yellow-400 block w-full py-2 ${
                activeSection === 'experience' ? 'text-yellow-400' : 'text-white'
              }`}
            >
              Experience
            </button>
            
            <button className="text-left text-3xl font-medium text-white hover:text-yellow-400 transition-all duration-300 block w-full py-2">
              Plan
            </button>
            
            <button
              onClick={() => toggleSection('help')}
              className={`text-left text-3xl font-medium transition-all duration-300 hover:text-yellow-400 block w-full py-2 ${
                activeSection === 'help' ? 'text-yellow-400' : 'text-white'
              }`}
            >
              Help
            </button>
            
            <button className="text-left text-3xl font-medium text-white hover:text-yellow-400 transition-all duration-300 block w-full py-2">
              Department of<br />Tourism
            </button>
            </div>
          </div>

          {/* Right Section: Sub Navigation - ~27.5% of remaining 55% */}
          <div 
            className="w-[27.5%] h-full flex items-start justify-start pt-24 px-8 relative overflow-hidden"
            style={{
              backgroundImage: `url('/jharkhand-forest-landscape-with-tribal-culture-ele.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center left'
            }}
          >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-800/70 via-amber-800/60 to-slate-700/80 backdrop-blur-sm"></div>
            
            {/* Content with higher z-index */}
            <div className="relative z-10 w-full">
            {activeSection && (
              <div className="grid grid-cols-1 gap-y-8 max-w-3xl w-full">
                {/* Column 1 */}
                <div>
                  <h3 className="text-orange-400 text-xl font-bold mb-6 uppercase tracking-wider">
                    {activeSection === 'discover' ? 'ABOUT JHARKHAND' : 
                     activeSection === 'experience' ? 'CULTURE' : 'SERVICES'}
                  </h3>
                  <div className="space-y-4">
                    {mainSections.find(s => s.id === activeSection)?.subLinks.slice(0, 3).map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        onClick={() => setIsSidebarOpen(false)}
                        className="block text-yellow-300 hover:text-yellow-200 transition-colors duration-200 text-lg"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Column 2 */}
                <div>
                  <h3 className="text-orange-400 text-xl font-bold mb-6 uppercase tracking-wider">
                    {activeSection === 'discover' ? 'ATTRACTIONS' : 
                     activeSection === 'experience' ? 'FESTIVALS' : 'BOOKING'}
                  </h3>
                  <div className="space-y-4">
                    {mainSections.find(s => s.id === activeSection)?.subLinks.slice(3).map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        onClick={() => setIsSidebarOpen(false)}
                        className="block text-yellow-300 hover:text-yellow-200 transition-colors duration-200 text-lg"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
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
