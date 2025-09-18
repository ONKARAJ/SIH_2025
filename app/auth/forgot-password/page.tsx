"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Phone, Lock, ArrowLeft, CheckCircle, AlertCircle, MapPin } from "lucide-react"
import { Icons } from "@/components/ui/icons"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1) // 1: Email input, 2: Phone input, 3: Success
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [userFound, setUserFound] = useState(false)
  
  const router = useRouter()

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, step: 'verify-email' })
      })

      const data = await response.json()

      if (response.ok && data.userExists) {
        setUserFound(true)
        setStep(2)
        toast.success("Email found! Please provide your phone number.")
      } else {
        toast.error("Email not found in our records. Please check your email or sign up for a new account.")
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone, step: 'send-password' })
      })

      const data = await response.json()

      if (response.ok) {
        setStep(3)
        toast.success("Password has been sent to your phone number!")
      } else {
        toast.error(data.message || "Phone number doesn't match our records. Please check and try again.")
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-600 p-12 text-white flex-col justify-between overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold">Jharkhand Tourism</span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-md">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Account
            <span className="text-blue-200 block">Recovery</span>
          </h1>
          <p className="text-xl text-white/80 leading-relaxed">
            Don't worry! We'll help you recover access to your account. 
            Enter your email and phone number to get your password back.
          </p>
        </div>

        {/* Features */}
        <div className="relative z-10 grid grid-cols-1 gap-4 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Icons.check className="w-4 h-4" />
            </div>
            <span>Secure password recovery process</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Icons.check className="w-4 h-4" />
            </div>
            <span>SMS verification for enhanced security</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Icons.check className="w-4 h-4" />
            </div>
            <span>Quick and easy account access</span>
          </div>
        </div>
      </div>

      {/* Right side - Recovery Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="lg:hidden mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-800">Jharkhand Tourism</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
            <p className="text-gray-600">
              {step === 1 && "Enter your email to begin recovery"}
              {step === 2 && "Verify your phone number"}
              {step === 3 && "Recovery successful!"}
            </p>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-semibold text-center">
                {step === 1 && "Step 1: Email Verification"}
                {step === 2 && "Step 2: Phone Verification"}
                {step === 3 && "Password Sent!"}
              </CardTitle>
              <CardDescription className="text-center">
                {step === 1 && "We'll check if your email exists in our system"}
                {step === 2 && "Enter your phone number to receive your password"}
                {step === 3 && "Check your phone for the password"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {step === 1 && (
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your registered email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  >
                    {isLoading ? (
                      <>
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      "Verify Email"
                    )}
                  </Button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handlePhoneSubmit} className="space-y-4">
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-700">
                      Email verified! Please provide your phone number.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your registered phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      Enter the phone number associated with your account
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1 h-12"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                    >
                      {isLoading ? (
                        <>
                          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Password"
                      )}
                    </Button>
                  </div>
                </form>
              )}

              {step === 3 && (
                <div className="space-y-4 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-700">
                      Your password has been sent to your phone number via SMS!
                    </AlertDescription>
                  </Alert>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>What's next?</strong>
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1 text-left">
                      <li>• Check your phone for an SMS with your password</li>
                      <li>• Use the password to sign into your account</li>
                      <li>• Consider changing your password after signing in</li>
                    </ul>
                  </div>

                  <Button
                    onClick={() => router.push('/auth/signin')}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Back to Sign In
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              {step < 3 && (
                <>
                  <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">or</span>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-600">
                    Remember your password?{" "}
                    <Link
                      href="/auth/signin"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Sign in here
                    </Link>
                  </p>
                  <p className="text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      href="/auth/signup"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Sign up for free
                    </Link>
                  </p>
                </>
              )}
            </CardFooter>
          </Card>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500">
            Having trouble? Contact our{" "}
            <Link href="/contact" className="text-blue-600 hover:text-blue-700">
              support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}