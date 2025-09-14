# Debugging Street View Blank Screen Issue

## 🔍 **Step-by-Step Debugging**

### **1. Check Browser Console**
Open Developer Tools (F12) and check for:
- API key loading messages
- Google Maps script loading
- Street View service responses
- Any error messages

Expected console messages:
```
API Key available: true
Google Maps script added to head
Google Maps script loaded
Google Maps API available
Initializing Street View for coordinates: 23.63, 85.46
Creating Street View panorama...
Searching for Street View imagery...
Street View service response: OK (or ZERO_RESULTS)
```

### **2. Test the New Implementation**
1. Navigate to: `http://localhost:3000/map`
2. Click any tourist location marker
3. Click "360° View" button
4. **Check browser console** for messages
5. If you see the fallback screen, try the "🗺️ Force Street View" button

### **3. Manual iframe Test**
When the fallback screen appears, click "🗺️ Force Street View" to test iframe mode directly.

### **4. Verify API Key Setup**
Check that your `.env.local` file contains:
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyCt673xUNzOyptAU4YW_NMIuM7ChbeQE0g
```

### **5. Check API Permissions**
In Google Cloud Console, ensure these APIs are enabled:
- ✅ Maps JavaScript API
- ✅ Maps Embed API
- ✅ Street View Static API

## 🚨 **Common Issues & Solutions**

### **Blank Screen with No Console Messages**
**Cause**: JavaScript error preventing execution
**Solution**: Check for any syntax errors or missing dependencies

### **"API Key not found" Error**
**Cause**: Environment variable not loaded
**Solution**: Restart development server after updating `.env.local`

### **"Failed to load Google Maps API" Error**
**Cause**: Network issues or API key restrictions
**Solution**: 
1. Check internet connection
2. Verify API key has correct permissions
3. Check for domain restrictions in Google Cloud Console

### **Street View Service Returns "ZERO_RESULTS"**
**Cause**: No Street View imagery available (expected for many locations)
**Solution**: This is normal - the iframe fallback should activate

### **Iframe Shows "This page can't load Google Maps correctly"**
**Cause**: API key doesn't have Maps Embed API enabled
**Solution**: Enable Maps Embed API in Google Cloud Console

## 🧪 **Testing Procedure**

### **Test 1: Console Logging**
1. Open browser DevTools (F12)
2. Go to Console tab
3. Try opening Street View
4. Look for the debugging messages listed above

### **Test 2: Known Working Location**
Try these coordinates that should have Street View:
- **Times Square, NYC**: `40.7580, -73.9855`
- **Eiffel Tower**: `48.8584, 2.2945`

### **Test 3: iframe Fallback**
1. Wait for fallback screen to appear
2. Click "🗺️ Force Street View"
3. This should show iframe-embedded Street View

### **Test 4: API Key Verification**
Test your API key directly:
```
https://maps.googleapis.com/maps/api/js?key=AIzaSyCt673xUNzOyptAU4YW_NMIuM7ChbeQE0g&libraries=geometry&callback=test
```

## 📋 **Debugging Checklist**

### **Environment Setup**
- [ ] `.env.local` file exists with correct API key
- [ ] Development server restarted after env changes
- [ ] No typos in API key

### **Google Cloud Console**
- [ ] Maps JavaScript API enabled
- [ ] Maps Embed API enabled  
- [ ] Street View Static API enabled
- [ ] No domain restrictions (or localhost allowed)
- [ ] API key has sufficient quota

### **Browser**
- [ ] JavaScript enabled
- [ ] No ad blockers interfering
- [ ] Network connection working
- [ ] Console shows no CORS errors

### **Application**
- [ ] Build successful without errors
- [ ] No TypeScript errors
- [ ] Console shows expected debug messages

## 🔧 **Quick Fixes to Try**

### **1. Restart Development Server**
```bash
# Stop the server (Ctrl+C)
npm run dev
```

### **2. Clear Browser Cache**
- Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
- Or open in incognito/private window

### **3. Test iframe Mode Directly**
Copy this URL and test in browser:
```
https://www.google.com/maps/embed/v1/streetview?key=AIzaSyCt673xUNzOyptAU4YW_NMIuM7ChbeQE0g&location=23.63,85.46&heading=0&pitch=0&fov=100
```

### **4. Simplify for Testing**
If all else fails, we can create a minimal test component to isolate the issue.

## 📞 **What to Report**

Please share:
1. **Console messages** when opening Street View
2. **Any error messages** in red
3. **Network tab** showing API requests
4. **Whether iframe test URL works** in browser
5. **Browser and version** you're using

This will help identify the exact cause of the blank screen! 🕵️‍♂️
