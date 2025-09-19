"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { Menu, X, Search, ChevronDown, HelpCircle, Phone, MessageSquare } from "lucide-react"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { User, LogOut, UserCircle, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import EnhancedSearch from '@/components/search/enhanced-search'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHelpDropdownOpen, setIsHelpDropdownOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })
  const helpButtonRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const { data: session, status } = useSession()
  
  
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
      <div className="flex items-center h-12 xs:h-14 sm:h-16 px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 w-full gap-4">
          
          {/* Left Section - Logo & Brand */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity touch-manipulation">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-orange-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-white font-bold text-sm">JH</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-lg font-bold text-green-700 leading-tight whitespace-nowrap">Jharkhand Tourism</div>
                <div className="text-xs text-gray-500 leading-tight whitespace-nowrap">Explore Nature's Paradise</div>
              </div>
            </Link>
          </div>

          {/* Center Section - Navigation Links */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-4xl mx-4">
            <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                    pathname === link.href
                      ? "text-white bg-green-600 rounded-full shadow-md"
                      : "text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-full"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Help Accordion Dropdown */}
              <div className="relative flex-shrink-0">
                <button
                  ref={helpButtonRef}
                  className={`flex items-center px-3 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap rounded-full ${
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

          {/* Right Section - Search & User Profile */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* Enhanced Search Bar */}
            <div className="hidden md:block w-48 lg:w-64">
              <EnhancedSearch placeholder="Search destinations..." />
            </div>
            
            {/* User Profile / Auth Buttons */}
            {status === "loading" ? (
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse flex-shrink-0"></div>
            ) : status === "authenticated" && session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-lg px-3 py-2 flex-shrink-0"
                  >
                    {session.user.avatar ? (
                      <img
                        src={session.user.avatar}
                        alt={session.user.name || "User"}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="hidden lg:block text-left min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate max-w-[100px]">
                        {session.user.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate max-w-[100px]">
                        {session.user.email}
                      </p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session.user.name || "User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user.email}
                      </p>
                      <p className="text-xs text-emerald-600 mt-1">
                        Welcome to Jharkhand Tourism! 🌿
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center cursor-pointer">
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem asChild>
                    <Link href="/profile/bookings" className="flex items-center cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>My Bookings</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem
                    className="flex items-center cursor-pointer text-red-600 focus:text-red-600"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-2 flex-shrink-0">
                <Link href="/auth/signin">
                  <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm border-2 whitespace-nowrap">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 whitespace-nowrap">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center flex-shrink-0">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-green-700 active:text-green-800 transition-colors duration-200 touch-manipulation rounded-lg hover:bg-green-50 active:bg-green-100 flex items-center justify-center"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
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
          
          {/* Mobile Auth Buttons - Only show when not logged in */}
          {status === "unauthenticated" && (
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
          )}
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
