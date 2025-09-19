"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Search, ChevronDown, HelpCircle, Phone, MessageSquare } from "lucide-react"
import { usePathname } from "next/navigation"
import EnhancedSearch from '@/components/search/enhanced-search'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHelpDropdownOpen, setIsHelpDropdownOpen] = useState(false)
  const pathname = usePathname()
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Don't close if clicking on the help button or dropdown content
      const target = event.target as Element
      if (!target.closest('[data-dropdown="help"]')) {
        setIsHelpDropdownOpen(false)
      }
    }
    
    if (isHelpDropdownOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isHelpDropdownOpen])

  // Handle scroll effect for background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/places", label: "Places" },
    { href: "/cities", label: "Cities" },
    { href: "/festivals", label: "Festivals" },
    { href: "/itinerary", label: "Plan Trip" },
    { href: "/about", label: "About" },
    { href: "/reviews", label: "Reviews" },
    { href: "/map", label: "Map" },
  ]

  const helpLinks = [
    { href: "/faq", label: "FAQ", icon: HelpCircle, description: "Frequently asked questions" },
    { href: "/contact", label: "Contact Support", icon: Phone, description: "Get in touch with us" },
  ]

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/40 backdrop-blur-md shadow-lg"
          : "bg-white/20 backdrop-blur-md"
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 w-full">
          {/* Left Section - Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-orange-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-white font-bold text-base">JH</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-lg font-bold text-green-700 leading-tight">Jharkhand Tourism</div>
                <div className="text-xs text-gray-500 leading-tight">Explore Nature's Paradise</div>
              </div>
            </Link>
          </div>

          {/* Center Section - Navigation Links */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 font-medium transition-all duration-200 whitespace-nowrap ${
                    pathname === link.href
                      ? "text-white bg-green-600 rounded-full shadow-md"
                      : "text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-full"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Help Dropdown */}
              <div className="relative" data-dropdown="help">
                <button
                  className={`flex items-center px-3 py-2 font-medium transition-all duration-200 whitespace-nowrap rounded-full border border-transparent ${
                    pathname === "/faq" || pathname === "/contact" || isHelpDropdownOpen
                      ? "text-white bg-green-600 shadow-md border-green-700"
                      : "text-gray-700 hover:text-green-700 hover:bg-green-50 hover:border-green-200"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsHelpDropdownOpen(!isHelpDropdownOpen)
                  }}
                  title="Click to show help options"
                >
                  Help
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                    isHelpDropdownOpen ? "rotate-180" : ""
                  }`} />
                </button>
                
                {isHelpDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50 transform transition-all duration-200 animate-in fade-in slide-in-from-top-2">
                    <div className="p-2">
                      {helpLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-start p-3 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-orange-50 transition-all duration-200 group border border-transparent hover:border-green-200"
                          onClick={() => setIsHelpDropdownOpen(false)}
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-orange-100 rounded-full flex items-center justify-center mr-3 group-hover:from-green-200 group-hover:to-orange-200 transition-all duration-200 shadow-sm group-hover:shadow-md">
                            <link.icon className="h-4 w-4 text-green-600 group-hover:text-green-700" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-green-700 flex items-center">
                              {link.label}
                              <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-green-600">→</span>
                            </h3>
                            <p className="text-xs text-gray-500 group-hover:text-gray-600 mt-1">{link.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    {/* Footer with contact info */}
                    <div className="border-t border-gray-100 p-3 bg-gray-50 rounded-b-xl">
                      <div className="text-center">
                        <p className="text-xs text-gray-600 mb-1">Tourist Helpline</p>
                        <p className="text-sm font-semibold text-green-600">1363 (Toll Free)</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Section - Search & Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4 justify-end mr-12">
            {/* Enhanced Search Bar */}
            <div className="w-64">
              <EnhancedSearch placeholder="Search destinations..." />
            </div>
            
            {/* Auth Buttons */}
            <Link
              href="/auth/signin"
              className="text-green-700 font-medium hover:text-green-600 transition-colors duration-200 whitespace-nowrap"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-orange-500 text-white font-medium rounded-lg hover:from-green-700 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
            >
              Sign Up
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-green-700 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/20 bg-white/40 backdrop-blur-md">
          {/* Mobile Navigation Links */}
          <div className="px-4 pt-4 pb-2 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "text-white bg-green-600/90 shadow-md backdrop-blur-sm"
                    : "text-gray-800 hover:text-green-700 hover:bg-white/30 backdrop-blur-sm"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Help Section */}
            <div className="pt-2 border-t border-white/20">
              <div className="px-4 py-2">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Help & Support</h3>
              </div>
              {helpLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? "text-white bg-green-600/90 shadow-md backdrop-blur-sm"
                      : "text-gray-800 hover:text-green-700 hover:bg-white/30 backdrop-blur-sm"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <link.icon className="h-5 w-5 mr-3" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
            {/* Mobile Search Bar */}
            <div className="px-4 py-3 border-t border-white/20">
              <EnhancedSearch placeholder="Search destinations, festivals..." showPopular={false} />
            </div>
          
          {/* Mobile Auth Buttons */}
          <div className="px-4 py-4 border-t border-white/20 space-y-3">
            <Link
              href="/auth/signin"
              className="block w-full text-center px-4 py-3 text-green-700 font-medium hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="block w-full text-center px-4 py-3 bg-gradient-to-r from-green-600/90 to-orange-500/90 backdrop-blur-sm text-white font-medium rounded-lg hover:from-green-700/90 hover:to-orange-600/90 transition-all duration-200 shadow-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
