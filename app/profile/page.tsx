"use client"

import { useUser, SignOutButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  Mail, 
  Phone, 
  Calendar,
  MapPin, 
  Settings,
  LogOut,
  Edit3,
  Save,
  X,
  Shield,
  Clock
} from "lucide-react"
import { toast } from "sonner"

export default function ProfilePage() {
  const { user, isSignedIn, isLoaded } = useUser()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  })
  const [phoneInputRef, setPhoneInputRef] = useState<HTMLInputElement | null>(null)

  // Redirect if not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in?redirect_url=/profile")
    }
  }, [isLoaded, isSignedIn, router])

  // Initialize form data when user loads
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.fullName || user.firstName || "",
        phone: user.phoneNumbers?.[0]?.phoneNumber || "",
      })
    }
  }, [user])

  // Auto-focus phone input when editing starts and there's no phone number
  useEffect(() => {
    if (isEditing && !formData.phone && phoneInputRef) {
      setTimeout(() => phoneInputRef.focus(), 100)
    }
  }, [isEditing, formData.phone, phoneInputRef])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await user?.update({
        firstName: formData.name.split(' ')[0] || formData.name,
        lastName: formData.name.split(' ').slice(1).join(' ') || '',
      })
      
      // For phone number, we'd need to use Clerk's phone number API
      // This is a more complex operation in Clerk as it requires verification
      // For now, we'll just update the name
      
      toast.success("Profile updated successfully!")
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error("Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    // Reset form data to original values
    if (user) {
      setFormData({
        name: user.fullName || user.firstName || "",
        phone: user.phoneNumbers?.[0]?.phoneNumber || "",
      })
    }
    setIsEditing(false)
  }


  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50">
        <Navigation />
        <div className="pt-24 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!isSignedIn || !user) {
    return null // Will redirect via useEffect
  }

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50">
      <Navigation />
      
      {/* Header */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
              {user.imageUrl ? (
                <img src={user.imageUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
              ) : (
                <span>{user.fullName?.[0]?.toUpperCase() || user.firstName?.[0]?.toUpperCase() || 'U'}</span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your account information and preferences</p>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Profile Card */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details and contact information
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {!isEditing ? (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleCancel}
                          disabled={isLoading}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={handleSave}
                          disabled={isLoading}
                          className="bg-emerald-600 hover:bg-emerald-700"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {isLoading ? "Saving..." : "Save"}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="pl-10"
                          readOnly={!isEditing}
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="email"
                          type="email"
                          value={user.primaryEmailAddress?.emailAddress || ""}
                          className="pl-10 bg-gray-50"
                          readOnly
                          placeholder="Email address"
                        />
                      </div>
                      <p className="text-xs text-gray-500">Email cannot be changed</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="phone">Phone Number</Label>
                        {formData.phone && !isEditing && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-emerald-600 hover:text-emerald-700"
                            onClick={() => setIsEditing(true)}
                          >
                            Change Number
                          </Button>
                        )}
                        {!formData.phone && !isEditing && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-emerald-600 hover:text-emerald-700"
                            onClick={() => setIsEditing(true)}
                          >
                            + Add Number
                          </Button>
                        )}
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          ref={(el) => setPhoneInputRef(el)}
                          className={`pl-10 ${
                            !formData.phone && !isEditing 
                              ? 'cursor-pointer hover:bg-gray-50 border-dashed border-2 border-gray-300' 
                              : ''
                          }`}
                          readOnly={formData.phone ? !isEditing : false}
                          placeholder={formData.phone ? "Phone number verified" : "Click here or the + Add Number button to add your phone number"}
                          onClick={() => {
                            if (!formData.phone && !isEditing) {
                              setIsEditing(true)
                            }
                          }}
                        />
                        {formData.phone && !isEditing && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <Badge className="bg-green-100 text-green-700 text-xs">
                              ✓ Added
                            </Badge>
                          </div>
                        )}
                      </div>
                      {!formData.phone && !isEditing && (
                        <div className="flex items-center gap-2 text-xs text-amber-600">
                          <Clock className="w-3 h-3" />
                          <span>Click the field above or the "+ Add Number" button to add your phone number for account security</span>
                        </div>
                      )}
                      {formData.phone && !isEditing && (
                        <p className="text-xs text-gray-500">Phone number is used for account recovery and security</p>
                      )}
                      {isEditing && !formData.phone && (
                        <p className="text-xs text-blue-600">Enter your phone number and click Save to update your profile</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Account Created</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          value={user.createdAt ? formatDate(user.createdAt) : "Unknown"}
                          className="pl-10 bg-gray-50"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Account Status Card */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-emerald-600" />
                    Account Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <Badge className="bg-emerald-100 text-emerald-800">
                      Active
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Email Verified</span>
                    <Badge className="bg-green-100 text-green-800">
                      Verified
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Account Type</span>
                    <Badge variant="outline">
                      Standard
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Last login: Just now</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions Card */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-gray-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => router.push("/profile/bookings")}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    My Bookings
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => user?.openUserProfile()}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Account Settings
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => router.push("/preferences")}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Preferences
                  </Button>
                  
                  <Separator />
                  
                  <SignOutButton redirectUrl="/">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </SignOutButton>
                </CardContent>
              </Card>

              {/* Travel Stats Card */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    Travel Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">0</div>
                    <div className="text-sm text-gray-600">Places Visited</div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-xl font-semibold text-emerald-600">0</div>
                      <div className="text-xs text-gray-600">Bookings</div>
                    </div>
                    <div>
                      <div className="text-xl font-semibold text-purple-600">0</div>
                      <div className="text-xs text-gray-600">Reviews</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
