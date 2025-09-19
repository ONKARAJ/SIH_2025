# 🏞️ Jharkhand Tourism Platform

A comprehensive tourism platform for Jharkhand featuring city guides, reviews, bookings, and interactive features.

## 🚀 Quick Deployment Fix

**If you're getting deployment errors, follow these steps:**

### 1. Set Environment Variables in Vercel

Go to your Vercel project → Settings → Environment Variables and add:

```bash
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="your-32-character-secret-here"
NEXTAUTH_URL="https://your-vercel-app.vercel.app"
```

### 2. Generate NEXTAUTH_SECRET

```bash
# Run this in your terminal to generate a secure secret
openssl rand -base64 32
```

Or visit: https://generate-secret.vercel.app/32

### 3. Redeploy

Push a new commit or use the "Redeploy" button in Vercel.

## 🌟 Features Implemented

### Core Features
- **City Pages** - Detailed pages for 5+ cities with attractions, hotels, transport info
- **Review System** - Protected reviews requiring authentication and complete profile
- **User Authentication** - Sign up/sign in with email, OAuth providers
- **Profile Management** - Complete profile with name, phone, password change
- **Interactive Maps** - Google Maps integration with city locations
- **Image Uploads** - Photo support in reviews and profiles

### Additional Features  
- **Hotel/Flight Booking** - Mock booking system with payment integration
- **Admin Dashboard** - Analytics and booking management
- **360° Views** - Immersive location previews
- **Chatbot** - AI-powered travel assistant
- **Responsive Design** - Works on all device sizes

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: SQLite (dev), PostgreSQL (prod)
- **Authentication**: NextAuth.js
- **Maps**: Google Maps API
- **Payments**: Razorpay integration
- **Deployment**: Vercel

## 📦 Installation & Development

```bash
# Clone the repository
git clone https://github.com/ONKARAJ/SIH_2025.git
cd SIH_2025

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your variables

# Set up database
npm run migrate
npm run seed

# Start development server
npm run dev
```

Visit `http://localhost:3000`

## 🔧 Environment Variables

### Required:
```bash
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="your-secret-here-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"
```

### Optional:
```bash
# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-maps-key"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Payments
RAZORPAY_KEY_ID="rzp_test_your_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_secret"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_your_key_id"

# Admin
ADMIN_EMAIL="admin@jharkhandtourism.com"
ADMIN_PASSWORD="admin123"
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Fork/Clone** the repository to your GitHub account

2. **Connect to Vercel**:
   - Import your repository in Vercel
   - Select Next.js framework (auto-detected)

3. **Set Environment Variables** in Vercel project settings:
   ```bash
   DATABASE_URL="file:./prisma/dev.db"
   NEXTAUTH_SECRET="your-32-character-secret"
   NEXTAUTH_URL="https://your-app.vercel.app"
   ```

4. **Deploy**: Vercel will automatically deploy on every push

### Other Platforms

The app works on any platform that supports Next.js:
- **Netlify**: Use `npm run build` and deploy `.next` folder
- **Railway**: Connect GitHub repo and set environment variables
- **DigitalOcean App Platform**: Use the Node.js buildpack

## 🎯 Key Functionalities

### Authentication Flow
1. User signs up/signs in
2. Profile completion required (name + phone)
3. Access to protected features (reviews, bookings)

### Review System
1. Visit any city page
2. Scroll to reviews section
3. Sign in if not authenticated
4. Complete profile if incomplete
5. Submit review with optional photos

### Booking System
1. Browse hotels/flights
2. Select and customize booking
3. Enter guest details
4. Payment via Razorpay (test mode)
5. Confirmation and management

## 📱 API Endpoints

### Public APIs:
- `GET /api/places/search` - Search places
- `GET /api/flights` - Flight data
- `GET /api/hotels` - Hotel listings

### Protected APIs:
- `PUT /api/user/update` - Profile updates
- `POST /api/bookings/hotels` - Hotel bookings
- `GET /api/admin/dashboard` - Admin analytics

## 🎨 UI Components

Built with **Radix UI** and **Tailwind CSS**:
- Responsive navigation
- Interactive maps
- Modal dialogs
- Form validations
- Toast notifications
- Loading states

## 🧪 Testing

```bash
# Run environment check
npm run check-env

# Manual testing scenarios:
# 1. Sign up new user
# 2. Complete profile
# 3. Add city review
# 4. Book hotel
# 5. Admin dashboard
```

## 📚 Documentation

- **Full Setup Guide**: `DEPLOYMENT_GUIDE.md`
- **API Documentation**: Available in `/api` route handlers
- **Component Library**: Shadcn/ui components used throughout

## 🤝 Contributing

This project was developed for **Smart India Hackathon 2025**. 

### Development Workflow:
1. Create feature branch
2. Implement changes
3. Test locally
4. Submit PR

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support & Troubleshooting

### Common Issues:

**Build Errors**:
- Ensure all environment variables are set
- Check `DEPLOYMENT_GUIDE.md`

**Authentication Issues**:
- Verify `NEXTAUTH_SECRET` is 32+ characters
- Check `NEXTAUTH_URL` matches your domain

**Database Issues**:
- For SQLite: Use `file:./prisma/dev.db`
- For production: Use PostgreSQL connection string

**Map Issues**:
- Get Google Maps API key
- Enable required APIs (Maps, Places, Street View)

### Getting Help:
1. Check deployment logs in Vercel
2. Review browser console errors
3. Run `npm run check-env` locally
4. Refer to `DEPLOYMENT_GUIDE.md`

---

**Made with ❤️ for Smart India Hackathon 2025** 

🏆 **Showcasing Jharkhand's Natural Beauty & Cultural Heritage** 🏆