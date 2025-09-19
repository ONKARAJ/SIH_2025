'use client'

import { SignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

export default function SignInPage() {
  const router = useRouter()
  const { isSignedIn } = useUser()
  const [countdown, setCountdown] = useState(3)
  const [showCountdown, setShowCountdown] = useState(false)

  // Handle the countdown logic
  useEffect(() => {
    if (isSignedIn) {
      setShowCountdown(true)
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isSignedIn])

  // Handle navigation when countdown reaches 0
  useEffect(() => {
    if (showCountdown && countdown <= 0) {
      router.push('/')
    }
  }, [countdown, showCountdown, router])

  if (showCountdown) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back!
            </h2>
            <p className="text-gray-600 mb-4">
              You have successfully signed in to Jharkhand Tourism.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to homepage in <span className="font-bold text-emerald-600">{countdown}</span> seconds...
            </p>
            <div className="mt-4">
              <button 
                onClick={() => router.push('/')}
                className="text-sm text-emerald-600 hover:text-emerald-700 underline"
              >
                Go to homepage now
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back to Jharkhand Tourism
          </p>
        </div>
        <div className="flex justify-center">
          <SignIn 
            signUpUrl="/sign-up"
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-emerald-600 hover:bg-emerald-700 text-white",
                card: "shadow-xl border-0",
                headerTitle: "text-2xl font-bold text-gray-900",
                headerSubtitle: "text-gray-600",
                socialButtonsIconButton: "border-gray-200 hover:bg-gray-50",
                formFieldInput: "border-gray-300 focus:border-emerald-500 focus:ring-emerald-500",
                footerActionLink: "text-emerald-600 hover:text-emerald-700",
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}