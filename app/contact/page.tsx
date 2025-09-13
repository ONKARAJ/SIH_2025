"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Users,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  CheckCircle,
} from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store in localStorage for demo purposes
    const contacts = JSON.parse(localStorage.getItem("jharkhand-contacts") || "[]")
    const newContact = {
      ...formData,
      id: Date.now(),
      date: new Date().toISOString(),
      status: "pending",
    }
    contacts.push(newContact)
    localStorage.setItem("jharkhand-contacts", JSON.stringify(contacts))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        inquiryType: "general",
      })
      setIsSubmitted(false)
    }, 3000)
  }

  const tourismOffices = [
    {
      name: "Jharkhand Tourism Development Corporation",
      type: "Head Office",
      address: "Tourism Bhawan, Sector-1, Dhurwa, Ranchi - 834004",
      phone: "+91-651-2446716",
      email: "info@jharkhnadtourism.gov.in",
      hours: "Mon-Fri: 10:00 AM - 6:00 PM",
    },
    {
      name: "Regional Tourism Office",
      type: "Deoghar Office",
      address: "Near Baidyanath Temple, Deoghar - 814112",
      phone: "+91-6432-232456",
      email: "deoghar@jharkhnadtourism.gov.in",
      hours: "Mon-Sat: 9:00 AM - 5:00 PM",
    },
    {
      name: "District Tourism Office",
      type: "Netarhat Office",
      address: "Hill Station Road, Netarhat, Latehar - 829203",
      phone: "+91-6565-234567",
      email: "netarhat@jharkhnadtourism.gov.in",
      hours: "Daily: 8:00 AM - 6:00 PM",
    },
  ]

  const inquiryTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "booking", label: "Tour Booking" },
    { value: "accommodation", label: "Accommodation" },
    { value: "transport", label: "Transportation" },
    { value: "festival", label: "Festival Information" },
    { value: "complaint", label: "Complaint/Feedback" },
  ]

  const quickContacts = [
    {
      title: "Tourist Helpline",
      value: "1363 (Toll Free)",
      icon: Phone,
      description: "24/7 assistance for tourists",
    },
    {
      title: "Emergency Services",
      value: "108 / 112",
      icon: Phone,
      description: "Medical & police emergency",
    },
    {
      title: "Tourism Email",
      value: "help@jharkhnadtourism.gov.in",
      icon: Mail,
      description: "General inquiries & support",
    },
    {
      title: "Official Website",
      value: "www.jharkhnadtourism.gov.in",
      icon: Globe,
      description: "Latest updates & information",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-card-foreground mb-6">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Have questions about visiting Jharkhand? Need help planning your trip or want to share feedback? We're
              here to help make your journey memorable and hassle-free.
            </p>
          </div>

          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickContacts.map((contact, index) => (
              <Card key={index} className="border-border bg-background text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <contact.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{contact.title}</h3>
                  <p className="text-primary font-medium mb-1">{contact.value}</p>
                  <p className="text-xs text-muted-foreground">{contact.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-2xl text-card-foreground flex items-center">
                    <MessageSquare className="h-6 w-6 mr-2" />
                    Send us a Message
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-card-foreground mb-2">Message Sent Successfully!</h3>
                      <p className="text-muted-foreground">
                        Thank you for contacting us. We'll respond to your inquiry within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-2">
                            Full Name *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">
                            Email Address *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-card-foreground mb-2">
                            Phone Number
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                          />
                        </div>
                        <div>
                          <label htmlFor="inquiryType" className="block text-sm font-medium text-card-foreground mb-2">
                            Inquiry Type
                          </label>
                          <select
                            id="inquiryType"
                            name="inquiryType"
                            value={formData.inquiryType}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            {inquiryTypes.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-card-foreground mb-2">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Brief subject of your inquiry"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-card-foreground mb-2">
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Please provide details about your inquiry..."
                          rows={6}
                          required
                          className="resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={
                          !formData.name.trim() || !formData.email.trim() || !formData.message.trim() || isSubmitting
                        }
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:bg-muted disabled:text-muted-foreground"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Tourism Office Information */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-xl text-card-foreground flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Tourism Offices
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {tourismOffices.map((office, index) => (
                      <div key={index} className="border-b border-border last:border-b-0 pb-4 last:pb-0">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-card-foreground text-sm">{office.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {office.type}
                          </Badge>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{office.address}</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-muted-foreground">{office.phone}</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-muted-foreground">{office.email}</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-muted-foreground">{office.hours}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-xl text-card-foreground">Follow Us</CardTitle>
                    <p className="text-sm text-muted-foreground">Stay updated with the latest news and travel tips</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Facebook className="h-4 w-4 mr-2" />
                        Facebook
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Twitter className="h-4 w-4 mr-2" />
                        Twitter
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Instagram className="h-4 w-4 mr-2" />
                        Instagram
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Youtube className="h-4 w-4 mr-2" />
                        YouTube
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ Quick Links */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-xl text-card-foreground">Quick Help</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2">
                        How to plan a trip to Jharkhand?
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2">
                        Best time to visit waterfalls?
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2">
                        Festival calendar and dates
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2">
                        Accommodation booking help
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
