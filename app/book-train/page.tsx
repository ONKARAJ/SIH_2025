'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/navigation'

export default function BookTrainPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the new train booking page
    router.replace('/book-trains')
  }, [router])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    </div>
  )
}
