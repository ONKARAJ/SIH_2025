# Deployment Guide for Jharkhand Tourism

## Quick Fix for Current Deployment Error

### Environment Variables Required

Set these environment variables in your Vercel project settings:

#### Essential Variables:
```bash
# Database (choose one)
# For SQLite (development/testing)
DATABASE_URL="file:./prisma/dev.db"

# For Production PostgreSQL (recommended)
DATABASE_URL="postgresql://username:password@host:5432/database_name"

# NextAuth
NEXTAUTH_SECRET="your-secret-here-min-32-chars-long"
NEXTAUTH_URL="https://your-vercel-app-url.vercel.app"

# Basic functionality
JWT_SECRET="your-jwt-secret-here"
```

#### Optional (for full functionality):
```bash
# Google Maps (for map features)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-google-maps-api-key"

# OAuth Providers (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Payment Gateway (for bookings)
RAZORPAY_KEY_ID="rzp_test_your_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_secret"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_your_key_id"

# Admin Access
ADMIN_EMAIL="admin@jharkhandtourism.com"
ADMIN_PASSWORD="admin123"
```

## Step-by-Step Deployment Fix

### 1. Set Environment Variables in Vercel

Go to your Vercel project → Settings → Environment Variables

Add at minimum:
- `DATABASE_URL` = `file:./prisma/dev.db`
- `NEXTAUTH_SECRET` = Generate a random 32+ character string
- `NEXTAUTH_URL` = Your vercel app URL (e.g., `https://jharkhand-tourism.vercel.app`)

### 2. Redeploy

After setting the environment variables, trigger a new deployment:
- Either push a new commit to your repository
- Or use "Redeploy" button in Vercel dashboard

## Database Options

### Option 1: SQLite (Easiest for Demo)
```bash
DATABASE_URL="file:./prisma/dev.db"
```
✅ No setup required
❌ Data not persistent across deployments

### Option 2: PostgreSQL (Recommended for Production)

Free options:
- **Neon** (recommended): `postgresql://user:pass@host.neon.tech/dbname`
- **Supabase**: `postgresql://user:pass@host.supabase.co:5432/postgres`
- **Railway**: `postgresql://user:pass@host.railway.app:5432/railway`
- **PlanetScale** (MySQL): `mysql://user:pass@host.planetscale.com:3306/dbname`

### 3. Generate Required Secrets

```bash
# Generate NEXTAUTH_SECRET (run in terminal)
openssl rand -base64 32

# Or use online generator
# Visit: https://generate-secret.vercel.app/32
```

## Verifying Deployment

After deployment, check:

1. **Homepage loads**: `https://your-app.vercel.app`
2. **Authentication works**: Try to sign up/sign in
3. **Reviews work**: Go to any city page and try to add a review
4. **No console errors**: Check browser dev tools

## Common Issues & Solutions

### Issue: "Invalid DATABASE_URL"
**Solution**: Ensure your DATABASE_URL starts with a valid protocol:
- `file:./prisma/dev.db` (SQLite)
- `postgresql://...` (PostgreSQL)
- `mysql://...` (MySQL)

### Issue: "useSearchParams Suspense boundary"
**Solution**: Already fixed in the code with Suspense wrapper

### Issue: "NEXTAUTH_URL not set"
**Solution**: Set NEXTAUTH_URL to your full Vercel app URL

### Issue: Reviews not working
**Solution**: Ensure user is signed in and profile is complete (name + phone)

## Features That Work Without Additional Setup

✅ City pages with reviews
✅ User authentication (email/password)
✅ Profile management
✅ Review system with image upload
✅ Hotel/flight browsing (mock data)
✅ Maps (with Google Maps API key)
✅ Admin dashboard (with database)
✅ Booking system (with Razorpay)

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify all environment variables are set
3. Check browser console for client-side errors
4. Review the error messages in deployment logs