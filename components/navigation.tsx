"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Search } from "lucide-react"
import { usePathname } from "next/navigation"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

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
    { href: "/contact", label: "Contact" },
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
            </div>
          </div>

          {/* Right Section - Search & Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4 justify-end mr-12">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search destinations..."
                className="pl-10 pr-4 py-2 w-56 bg-white/80 backdrop-blur-sm border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all duration-200 text-sm"
              />
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
          </div>
          
          {/* Mobile Search Bar */}
          <div className="px-4 py-3 border-t border-white/20">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search destinations, festivals..."
                className="pl-10 pr-4 py-3 w-full bg-white/40 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white/80 transition-all duration-200 placeholder-gray-600"
              />
            </div>
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
