# 🚀 Deployment Guide - Jharkhand Tourism

This guide covers deploying your fully functional booking system with PostgreSQL database and Razorpay payment integration to Vercel.

## 📋 Prerequisites

- Vercel account
- PostgreSQL database (Vercel Postgres, Neon, Supabase, or similar)
- Razorpay account with API keys
- Google Maps API key

## 🗄️ Database Setup

### Option 1: Vercel Postgres (Recommended)

1. **Create Vercel Postgres Database**
   ```bash
   # In your Vercel dashboard
   # Go to Storage → Create Database → Postgres
   # Copy the connection string
   ```

2. **Set Database URL**
   ```bash
   # Add to Vercel environment variables
   DATABASE_URL="postgresql://username:password@host:port/database"
   ```

### Option 2: External PostgreSQL

Popular PostgreSQL providers:
- **Neon** (neon.tech) - Free tier available
- **Supabase** (supabase.com) - Free tier available  
- **Railway** (railway.app) - Simple deployment
- **ElephantSQL** (elephantsql.com) - Managed PostgreSQL

## 🔧 Environment Variables

Set these environment variables in Vercel:

### Google Maps
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Database
```bash
DATABASE_URL=postgresql://username:password@host:port/database
```

### Payment Gateway (Razorpay)
```bash
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_SECRET=your_secret_key
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

### Optional
```bash
NODE_ENV=production
```

## 🚀 Deployment Steps

### 1. Prepare Your Repository

```bash
# Ensure all files are committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Set environment variables
5. Deploy

#### Option B: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel login
vercel --prod
```

### 3. Database Migration

After deployment, run the migration script:

```bash
# Method 1: Using Vercel CLI
vercel env pull .env.local
npm run migrate

# Method 2: Manual commands
npx prisma generate
npx prisma db push
node scripts/seed-data.js
```

### 4. Verify Deployment

Check these URLs on your deployed site:
- `/bookings` - Booking system
- `/admin` - Admin dashboard  
- `/test-payment` - Payment testing
- `/api/bookings/hotels/search` - API health

## 🔐 Security Configuration

### 1. Google Maps API Security

Restrict your Google Maps API key:
```
HTTP referrers:
https://yourdomain.vercel.app/*
https://*.vercel.app/* (for preview deployments)
```

### 2. Razorpay Webhook Setup

1. Go to Razorpay Dashboard → Webhooks
2. Add webhook URL: `https://yourdomain.vercel.app/api/payments/webhook`
3. Select events: `payment.captured`, `payment.failed`
4. Copy webhook secret to environment variables

### 3. Database Security

- Use connection pooling
- Enable SSL connections
- Restrict IP access if possible
- Regular backups

## 📊 Performance Optimization

### 1. Database Optimizations

```sql
-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_hotel_location ON "Hotel" ("location");
CREATE INDEX IF NOT EXISTS idx_hotel_bookings_status ON "HotelBooking" ("status");
CREATE INDEX IF NOT EXISTS idx_flight_departure ON "Flight" ("departure");
CREATE INDEX IF NOT EXISTS idx_payments_status ON "Payment" ("status");
```

### 2. Vercel Configuration

The `vercel.json` file includes:
- Function timeout settings
- Regional deployment (Mumbai region for India)
- Header configurations for webhooks

### 3. Next.js Optimizations

Build script includes:
```bash
"build": "prisma generate && next build"
```

This ensures Prisma client is generated during build.

## 🔍 Monitoring & Maintenance

### 1. Logging

Monitor these logs in Vercel:
- Function logs for API routes
- Build logs for deployment issues
- Edge logs for performance

### 2. Database Monitoring

Monitor:
- Connection pool usage
- Query performance
- Database size growth
- Backup status

### 3. Payment Monitoring

Track:
- Payment success rates
- Failed transactions
- Webhook delivery status
- Refund processing

## 🚨 Troubleshooting

### Common Issues

#### 1. Database Connection Errors
```bash
# Check DATABASE_URL format
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

# Test connection
npx prisma db pull
```

#### 2. Prisma Generation Issues
```bash
# Clear Prisma cache
npx prisma generate --schema=./prisma/schema.prisma
rm -rf node_modules/.prisma
npm install
```

#### 3. Payment Webhook Issues
```bash
# Check webhook URL is accessible
curl -X POST https://yourdomain.vercel.app/api/payments/webhook

# Verify webhook secret in Razorpay dashboard
```

#### 4. Google Maps Not Loading
```bash
# Check API key restrictions
# Verify domain is allowed
# Check browser console for errors
```

### 4. Build Failures
```bash
# Check build logs in Vercel dashboard
# Common fixes:
npm run build  # Test locally first
npm run lint   # Fix linting errors
```

## 📱 Testing Your Deployment

### 1. Functionality Tests
- [ ] Hotel search and booking flow
- [ ] Flight search and booking flow
- [ ] Payment processing (use test cards)
- [ ] Admin dashboard access
- [ ] Webhook handling

### 2. Test Payment Flow
1. Go to `/test-payment`
2. Create test booking
3. Use Razorpay test cards:
   - **Success**: 4111 1111 1111 1111
   - **Failure**: 4000 0000 0000 0002

### 3. Performance Tests
- [ ] Page load speeds
- [ ] API response times
- [ ] Database query performance
- [ ] Mobile responsiveness

## 🎯 Production Checklist

- [ ] All environment variables set
- [ ] Database migrated and seeded
- [ ] Google Maps API configured with restrictions
- [ ] Razorpay webhooks configured
- [ ] SSL certificates active
- [ ] Domain configured (if using custom domain)
- [ ] Analytics tracking implemented
- [ ] Error monitoring set up
- [ ] Backup strategy in place
- [ ] Performance monitoring active

## 🔄 Updates & Maintenance

### Regular Updates
```bash
# Update dependencies
npm audit fix
npm update

# Database migrations
npx prisma db push

# Redeploy
git push origin main
```

### Backup Strategy
- Database: Use provider's backup features
- Code: GitHub repository backups
- Environment variables: Document securely

## 🆘 Support

For deployment issues:
1. Check Vercel deployment logs
2. Verify all environment variables
3. Test API endpoints individually
4. Check database connectivity
5. Review webhook configurations

## 🎉 You're Live!

Your fully functional booking system is now deployed with:
- ✅ Complete hotel and flight booking system
- ✅ Integrated Razorpay payment processing
- ✅ Admin dashboard for management
- ✅ PostgreSQL database with sample data
- ✅ Secure API endpoints
- ✅ Production-ready configuration

Your users can now book hotels and flights directly through your platform! 🚀
