# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

The **SIH Chatbot** is a web-based tourist assistant built with Next.js, integrating AI-driven responses, maps, and tourism data. It helps users explore tourist destinations, view maps, access Street View, and get AI-guided assistance for Jharkhand tourism.

**Key Contributors**: Rohit Kumar, Team CodeStorm

## Commands

### Development
```powershell
# Install dependencies (preferred: pnpm)
pnpm install
# OR
npm install

# Run development server
pnpm dev
# OR
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Linting
npm run lint
```

### Database Operations
```powershell
# Generate Prisma client
npx prisma generate

# Push database schema
npm run db:push

# Open Prisma Studio (database GUI)
npm run db:studio

# Run database migrations
npm run migrate

# Seed database with initial data
npm run seed
```

### Testing & Debugging
```powershell
# Test single component (example)
npm test -- --testPathPattern=components/chatbot

# Test specific functionality
npm run test:e2e
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM (full booking system)
- **UI**: Tailwind CSS + shadcn/ui components (New York style)
- **Maps**: Google Maps API with Street View integration
- **360° Views**: Pannellum for panoramic experiences
- **AI**: DeepSeek API (upgraded from HuggingFace/OpenAI in docs)
- **Analytics**: Vercel Analytics
- **Package Manager**: pnpm (preferred) or npm

### Project Structure

**Core Application** (as per official docs):
- `/app` - Next.js App Router pages and API routes
  - `page.tsx` - Homepage
  - `layout.tsx` - Root layout
  - `globals.css` - Global styles
- `/components` - React components (UI components in `/ui` subfolder)
  - `Chatbot.tsx` - Chatbox UI
  - `MapComponent.tsx` - Map rendering
  - `StreetViewComponent.tsx` - Google Street View integration
  - `Navbar.tsx` - Top navigation bar
  - `Footer.tsx` - Footer section
- `/data` - Tourism data (JSON format)
  - `locations.json` - List of key locations
  - `places.json` - Details of tourist places
  - `pointsOfInterest.json` - Attractions, hotels, POIs
- `/hooks` - Custom React hooks
  - `useChat.ts` - Chatbot state management
  - `useMap.ts` - Map state management
  - `useStreetView.ts` - Street View state management
- `/lib` - Library integrations
  - `openaiClient.ts` - HuggingFace/OpenAI model integration
  - `googleMapsClient.ts` - Google Maps API integration
- `/types` - TypeScript definitions
  - `chatbot.d.ts` - TypeScript definitions for chatbot
- `/prisma` - Database schema and migrations
- `/public` - Static assets
  - `images/` - Logos, icons, banners
  - `icons/` - SVG icons for maps and chatbot

### Database Schema
The Prisma schema includes models for:
- **Users & Authentication**: User sessions, payment methods
- **Tourism Booking**: Hotels, rooms, flights, trains with full booking flow
- **Reviews & Ratings**: Hotel reviews with verification
- **Payments**: Multi-gateway support (Razorpay, Stripe)

### API Architecture

**AI & External APIs** (as documented):
- `/app/api/chat/route.ts` - Chatbot API endpoint (DeepSeek integration)
- `/api/distance` - Google Maps Distance Matrix API
- `/api/culture` - Cultural content endpoints
- `/api/festivals` - Festival information

**Booking System APIs**:
- `/api/hotels` - Hotel search and booking
- `/api/flights` - Flight booking system
- `/api/trains` - Train booking system

### Key Features

**Interactive Tourism Experience**:
- AI chatbot with Jharkhand tourism knowledge and distance calculations
- Google Maps integration with 50+ tourist spots
- Street View and 360° panoramic views
- Cultural festival information and booking system
- Real-time distance calculations between any locations

**Booking Platform**:
- Multi-modal booking (hotels, flights, trains)
- Payment gateway integration
- Review and rating system
- User account management

## Environment Setup

Required environment variables (store in `.env.local`):
```
# Database
DATABASE_URL="postgresql://..."

# AI Integration (Current: DeepSeek, Original docs: HuggingFace/OpenAI)
DEEPSEEK_API_KEY="sk-..."
DEEPSEEK_BASE_URL="https://api.deepseek.com"
# Alternative (as per original docs):
# HF_API_KEY="your-huggingface-key"

# Google Services (Required)
GOOGLE_MAPS_API_KEY="your-google-key"

# Weather (Optional)
OPENWEATHER_KEY="your-weather-key"

# Payment Gateways (optional)
RAZORPAY_KEY_ID="rzp_..."
RAZORPAY_KEY_SECRET="..."
STRIPE_PUBLISHABLE_KEY="pk_..."
STRIPE_SECRET_KEY="sk_..."

# Authentication (optional)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="..."
```

## Development Guidelines

### Component Architecture
- UI components use shadcn/ui with New York variant
- Custom components follow atomic design principles
- All components are TypeScript with proper interface definitions
- Mobile-first responsive design approach

### API Development
- All API routes in `/app/api` follow Next.js 14 App Router conventions
- Error handling with proper HTTP status codes and fallback responses
- External API integration with retry logic and fallbacks

### Database Development
- Use Prisma for all database operations
- Always run `prisma generate` after schema changes
- Use database transactions for complex operations
- Include proper foreign key relationships and constraints

### Maps & Location Features
- Google Maps API used for all location services
- Street View availability checked before showing 360° options
- Location data stored in `/data/places-data.ts`
- All coordinates use decimal degrees format

### AI Integration
- DeepSeek API integrated with comprehensive Jharkhand tourism system prompt
- Fallback responses implemented for API failures
- Distance calculation queries automatically detected and routed to Google Maps
- Context-aware responses for tourism, culture, and general queries

## Important Files

**Configuration**:
- `package.json` - Dependencies and scripts
- `next.config.mjs` - Next.js configuration with webpack optimizations
- `vercel.json` - Vercel deployment configuration
- `components.json` - shadcn/ui configuration
- `.env.local` - API keys (ignored in git)

**Database & Data**:
- `prisma/schema.prisma` - Complete database schema
- `prisma/seed.ts` - Seed data for tourism places
- `data/locations.json` - List of key locations
- `data/places.json` - Details of tourist places
- `data/pointsOfInterest.json` - Attractions, hotels, POIs

**Documentation** (as per official docs):
- `README.md` - General project info
- `README_CHATBOT.md` - Chatbot-specific documentation
- `IMPLEMENTATION_SUMMARY.md` - Summary of features implemented
- `FEATURES_IMPLEMENTED.md` - Detailed feature list
- `DEPLOYMENT.md` - Deployment instructions

## Deployment Notes

**Vercel Deployment** (Official):
1. Push changes to GitHub repository: `https://github.com/Rohitvishwakarma5133/SIH_chatbot.git`
2. Connect repository to Vercel
3. Add environment variables (`.env.local` content) in Vercel dashboard
4. Deploy — site goes live at: `https://your-project.vercel.app`

**Technical Notes**:
- Build configured to ignore ESLint and TypeScript errors for faster deployment
- Webpack optimized for pannellum and Google Maps bundles
- Vercel Analytics integrated
- Database migrations must be run before deployment
- Environment variables must be configured in production environment
- Responsive UI (desktop & mobile friendly)
- Ready for deployment on Vercel

## Troubleshooting

**Common Issues**:
- If Street View doesn't load: Check Google Maps API key and billing
- If chatbot fails: Verify DeepSeek API key and fallback responses will activate
- If database connection fails: Ensure DATABASE_URL is properly formatted
- If maps don't display: Confirm Google Maps API key has proper restrictions

**Performance**:
- Large bundle sizes are optimized with webpack code splitting
- Images should be optimized and use Next.js Image component
- API routes include proper caching headers where appropriate

## Future Enhancements (Roadmap)

- Add weather forecast for tourist locations
- Add events & festival data integration
- Integrate hotel & transport booking APIs
- Add multi-language support (Hindi, Bengali, Bhojpuri)
- Enhance tourist itinerary planning

## Repository Information

**GitHub Repository**: `https://github.com/Rohitvishwakarma5133/SIH_chatbot.git`
**Local Setup**: `http://localhost:3000`
**Contributors**: Rohit Kumar, Team CodeStorm
