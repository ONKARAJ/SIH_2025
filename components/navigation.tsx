"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import GlobalSearch from "@/components/search/global-search"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/places", label: "Places to Visit" },
    { href: "/festivals", label: "Festivals & Culture" },
    { href: "/reviews", label: "Reviews" },
    { href: "/map", label: "Map" },
    { href: "/contact", label: "Contact Us" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">JH</span>
              </div>
              <span className="font-bold text-xl text-primary">Jharkhand Tourism</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === link.href ? "text-primary bg-primary/10" : "text-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Search Bar & Booking */}
          <div className="hidden lg:flex items-center space-x-4">
            <GlobalSearch placeholder="Search destinations, festivals, culture..." className="w-64" />
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/book-tour">Book Cultural Tour</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card rounded-lg mt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    pathname === link.href ? "text-primary bg-primary/10" : "text-card-foreground hover:text-primary"
                  }`}
                >
                  <div onClick={() => setIsMenuOpen(false)}>
                    {link.label}
                  </div>
                </Link>
              ))}
              <div className="px-3 py-2 space-y-3">
                <GlobalSearch 
                  placeholder="Search destinations, festivals, culture..." 
                  className="w-full" 
                  showResults={false}
                />
                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  <Link href="/book-tour">Book Cultural Tour</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
