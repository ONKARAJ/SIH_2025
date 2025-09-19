import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher([
  '/profile(.*)',
  '/dashboard(.*)',
  '/admin(.*)',
  '/api/protected(.*)',
])

export default clerkMiddleware((auth, req) => {
  // Check if user is trying to access a protected route
  if (isProtectedRoute(req)) {
    // Get auth state
    const { userId } = auth()
    
    // If user is not authenticated, redirect to sign-in
    if (!userId) {
      const signInUrl = new URL('/sign-in', req.url)
      return NextResponse.redirect(signInUrl)
    }
  }
  
  // Allow the request to continue
  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};