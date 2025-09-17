import { Suspense } from "react"

// Force dynamic rendering at the server component level
export const dynamic = 'force-dynamic'

import SignInClient from "./SignInClient"

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
      </div>
    }>
      <SignInClient />
    </Suspense>
  )
}
