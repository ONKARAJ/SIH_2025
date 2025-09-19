"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { Menu, X, Search, ChevronDown, HelpCircle, Phone, MessageSquare } from "lucide-react"
import { usePathname } from "next/navigation"
import EnhancedSearch from '@/components/search/enhanced-search'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHelpDropdownOpen, setIsHelpDropdownOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })
  const helpButtonRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      // Check if click is outside the help dropdown area
      const helpDropdown = target.closest('[data-dropdown="help"]')
      if (!helpDropdown && isHelpDropdownOpen) {
        setIsHelpDropdownOpen(false)
      }
    }
    
    // Always add the event listener when component mounts
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isHelpDropdownOpen])

  // Close dropdown when mobile menu opens
  useEffect(() => {
    if (isMenuOpen) {
      setIsHelpDropdownOpen(false)
    }
  }, [isMenuOpen])

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
    <>
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 w-full overflow-hidden ${
        isScrolled
          ? "bg-white/40 backdrop-blur-md shadow-lg"
          : "bg-white/20 backdrop-blur-md"
      }`}
    >
      <div className="flex items-center justify-between h-12 xs:h-14 sm:h-16 px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 w-full">
          {/* Left Section - Logo */}
          <div className="flex items-center flex-shrink-0 min-w-0 max-w-[60%] xs:max-w-[70%] sm:max-w-none">
            <Link href="/" className="flex items-center space-x-1 xs:space-x-2 hover:opacity-90 transition-opacity touch-manipulation">
              <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-green-600 to-orange-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-white font-bold text-xs xs:text-sm sm:text-base">JH</span>
              </div>
              <div className="hidden xs:block min-w-0">
                <div className="text-xs xs:text-sm sm:text-lg font-bold text-green-700 leading-tight truncate">Jharkhand Tourism</div>
                <div className="text-xs text-gray-500 leading-tight truncate hidden sm:block">Explore Nature's Paradise</div>
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
              
              {/* Help Accordion Dropdown */}
              <div className="relative">
                <button
                  ref={helpButtonRef}
                  className={`flex items-center px-3 py-2 font-medium transition-all duration-200 whitespace-nowrap rounded-full ${
                    isHelpDropdownOpen
                      ? "text-white bg-green-600 shadow-md"
                      : "text-gray-700 hover:text-green-700 hover:bg-green-50"
                  }`}
                  onClick={() => {
                    if (!isHelpDropdownOpen && helpButtonRef.current) {
                      const rect = helpButtonRef.current.getBoundingClientRect()
                      setDropdownPosition({
                        top: rect.bottom + 8,
                        right: window.innerWidth - rect.right
                      })
                    }
                    setIsHelpDropdownOpen(!isHelpDropdownOpen)
                  }}
                  aria-expanded={isHelpDropdownOpen}
                  aria-haspopup="true"
                >
                  Help
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    isHelpDropdownOpen ? "rotate-180" : "rotate-0"
                  }`} />
                </button>
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
          <div className="md:hidden flex items-center flex-shrink-0">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 xs:p-2 sm:p-3 text-gray-700 hover:text-green-700 active:text-green-800 transition-colors duration-200 touch-manipulation rounded-lg hover:bg-green-50 active:bg-green-100 min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 xs:h-6 xs:w-6 sm:h-7 sm:w-7" />
              ) : (
                <Menu className="h-5 w-5 xs:h-6 xs:w-6 sm:h-7 sm:w-7" />
              )}
            </button>
          </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/20 bg-white/95 backdrop-blur-md shadow-lg">
          {/* Mobile Navigation Links */}
          <div className="px-2 xs:px-3 sm:px-4 pt-2 xs:pt-3 sm:pt-4 pb-2 space-y-0.5 xs:space-y-1 sm:space-y-2 max-h-[calc(100vh-48px)] xs:max-h-[calc(100vh-56px)] sm:max-h-[calc(100vh-64px)] overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 xs:px-4 sm:px-5 py-2.5 xs:py-3 sm:py-4 rounded-lg text-sm xs:text-base sm:text-lg font-medium transition-all duration-200 touch-manipulation ${
                  pathname === link.href
                    ? "text-white bg-green-600 shadow-md"
                    : "text-gray-800 hover:text-green-700 active:text-green-800 hover:bg-white/60 active:bg-white/80"
                } border border-transparent hover:border-green-200`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Help Section */}
            <div className="pt-2 xs:pt-3 sm:pt-4 border-t border-white/20">
              <div className="px-3 xs:px-4 sm:px-5 py-1.5 xs:py-2 sm:py-3">
                <h3 className="text-xs xs:text-sm sm:text-base font-semibold text-gray-600 uppercase tracking-wide">Help & Support</h3>
              </div>
              {helpLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center px-3 xs:px-4 sm:px-5 py-2.5 xs:py-3 sm:py-4 rounded-lg text-sm xs:text-base sm:text-lg font-medium transition-all duration-200 touch-manipulation ${
                    pathname === link.href
                      ? "text-white bg-green-600 shadow-md"
                      : "text-gray-800 hover:text-green-700 active:text-green-800 hover:bg-white/60 active:bg-white/80"
                  } border border-transparent hover:border-green-200`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <link.icon className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 mr-2 xs:mr-3 sm:mr-4 flex-shrink-0" />
                  <span className="flex-1">{link.label}</span>
                  <span className="text-green-600 opacity-70 text-sm xs:text-base">→</span>
                </Link>
              ))}
            </div>
          </div>
          
            {/* Mobile Search Bar */}
            <div className="px-2 xs:px-3 sm:px-4 py-2 xs:py-3 sm:py-4 border-t border-white/20">
              <div className="w-full">
                <EnhancedSearch placeholder="Search..." showPopular={false} />
              </div>
            </div>
          
          {/* Mobile Auth Buttons */}
          <div className="px-2 xs:px-3 sm:px-4 py-2 xs:py-3 sm:py-4 border-t border-white/20 space-y-2">
            <Link
              href="/auth/signin"
              className="block w-full text-center px-4 py-3 text-green-700 font-medium hover:bg-white/60 active:bg-white/80 rounded-lg transition-all duration-200 touch-manipulation border border-green-200 hover:border-green-300 text-sm xs:text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="block w-full text-center px-4 py-3 bg-gradient-to-r from-green-600 to-orange-500 text-white font-medium rounded-lg hover:from-green-700 hover:to-orange-600 active:from-green-800 active:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg touch-manipulation text-sm xs:text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
    
    {/* Portal-based Help Dropdown - Renders at document body level */}
    {typeof window !== 'undefined' && isHelpDropdownOpen && createPortal(
      <div 
        className="fixed w-72 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden"
        style={{
          zIndex: 2147483647,
          top: `${dropdownPosition.top}px`,
          right: `${dropdownPosition.right}px`,
          transform: 'none'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="py-2">
          {helpLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors duration-150"
              onClick={() => setIsHelpDropdownOpen(false)}
            >
              <link.icon className="h-5 w-5 mr-3 text-gray-400" />
              <div>
                <div className="font-medium">{link.label}</div>
                <div className="text-xs text-gray-500">{link.description}</div>
              </div>
            </Link>
          ))}
          
          {/* Divider */}
          <hr className="my-2 border-gray-200" />
          
          {/* Contact info */}
          <div className="px-4 py-3 bg-gray-50">
            <div className="text-center">
              <div className="text-xs font-medium text-gray-600 mb-1">Tourist Helpline</div>
              <div className="text-sm font-bold text-green-600">1363 (Toll Free)</div>
            </div>
          </div>
        </div>
      </div>,
      document.body
    )}
  </>
  )
}
