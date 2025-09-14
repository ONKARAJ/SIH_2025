# Deployment Setup Guide

## Google Maps API Configuration

### 1. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - **Maps JavaScript API** (Required for map display)
   - **Places API** (Required for search functionality)
   - **Street View Static API** (Required for Street View)
   - **Geocoding API** (Optional, for address lookup)

### 2. Create API Key

1. Go to **Credentials** section in Google Cloud Console
2. Click **Create Credentials** > **API Key**
3. Copy the generated API key

### 3. Configure API Key Restrictions

**IMPORTANT**: Configure restrictions to prevent unauthorized usage:

1. Select your API key in the credentials list
2. Under **Application restrictions**, choose **HTTP referrers (web sites)**
3. Add the following website restrictions:
   - `localhost:3000/*` (for development)
   - `your-domain.com/*` (replace with your actual domain)
   - `*.vercel.app/*` (if using Vercel)
   - `*.netlify.app/*` (if using Netlify)

### 4. Deployment Platform Setup

#### Vercel
1. Go to your project dashboard on Vercel
2. Go to **Settings** > **Environment Variables**
3. Add: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` = `your_api_key_here`
4. Redeploy your application

#### Netlify
1. Go to your site dashboard on Netlify
2. Go to **Site settings** > **Environment variables**
3. Add: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` = `your_api_key_here`
4. Redeploy your application

#### Other Platforms
Set the environment variable `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` with your API key value.

## Troubleshooting

### Map Not Loading

1. **Check API Key**: Verify the environment variable is set correctly
2. **Check Console**: Look for error messages in browser developer console
3. **API Restrictions**: Ensure your domain is added to the API key restrictions
4. **API Limits**: Check if you've exceeded your API quota in Google Cloud Console
5. **Network**: Ensure there are no network blocks preventing access to Google APIs

### Common Error Messages

- **"Sorry! Something went wrong"**: Usually an API key or restriction issue
- **"This page can't load Google Maps correctly"**: API key missing or invalid
- **"Google Maps JavaScript API error"**: API not enabled or quota exceeded

### Testing

1. Open browser developer console
2. Look for messages starting with "Google Maps API"
3. Check the network tab for failed requests to Google Maps API

## Environment Variables Checklist

- [ ] `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set in deployment environment
- [ ] API key has correct restrictions configured
- [ ] All required APIs are enabled in Google Cloud Console
- [ ] Domain is whitelisted in API key restrictions
