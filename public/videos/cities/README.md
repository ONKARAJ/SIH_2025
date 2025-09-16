# City Hero Background Videos

This directory contains hero background videos for major cities in Jharkhand.

## ✅ Currently Available Video Files:
- `ranchi.mp4` - Hero video for Ranchi city page (Capital city with waterfalls and hills)
- `jamshedpur.mp4` - Hero video for Jamshedpur city page (Steel city with industrial heritage)
- `dhanbad.mp4` - Hero video for Dhanbad city page (Coal capital with educational institutions)
- `bokaro.mp4` - Hero video for Bokaro city page (Planned steel city with lakes)
- `deoghar.mp4` - Hero video for Deoghar city page (Holy city with Jyotirlinga temple)
- `default-city.mp4` - Fallback video for all cities

## Video Specifications:
- **Format**: MP4 (H.264 codec preferred)
- **Resolution**: 1920x1080 (Full HD) minimum, 4K preferred
- **Frame Rate**: 30fps
- **Duration**: 15-30 seconds (seamlessly looped)
- **File Size**: Under 8MB for optimal web performance
- **Audio**: Optional ambient sounds (nature, cultural, industrial)
- **Content**: High-quality scenic views, landmarks, or cityscapes

## Video Content Guidelines:

### Ranchi Videos Should Include:
- Aerial shots of hills and waterfalls (Hundru, Dassam Falls)
- Rock Garden and Tagore Hill
- Modern infrastructure and educational institutions
- Tribal cultural elements
- Sunset/sunrise over hills

### Jamshedpur Videos Should Include:
- Tata Steel plant (tastefully captured)
- Jubilee Park fountains and gardens
- Dimna Lake and Dalma Wildlife Sanctuary
- Clean, planned city streets
- Evening city lights

### Dhanbad Videos Should Include:
- IIT Dhanbad campus
- Maithon Dam and Topchanchi Lake
- Bhatinda Falls
- Coal heritage (respectfully portrayed)
- Educational excellence theme

### Bokaro Videos Should Include:
- Planned city layout and sectors
- Garga Dam and city lake
- Steel plant infrastructure
- Green spaces and parks
- Modern urban planning

### Deoghar Videos Should Include:
- Baidyanath Temple architecture
- Spiritual ambiance and pilgrims
- Trikuta Hills and Nandan Pahar
- Traditional religious heritage
- Morning aarti and temple bells

## Enhanced Fallback System:
The system now supports multiple fallback levels:
1. City-specific MP4 video
2. City-specific WebM video (for better browser compatibility)
3. Default fallback video (`default-city.mp4`)
4. Static hero image (final fallback)

## Technical Implementation:
- Videos are loaded with multiple `<source>` elements for browser compatibility
- Automatic fallback to static images if all video sources fail
- Videos are set to autoplay, muted, and looped
- Optimized loading with `preload="metadata"`
- Responsive design with `object-cover` for all screen sizes

## Usage:
Videos are automatically loaded by the CityPageTemplate component based on the city slug.
The system intelligently handles missing videos and provides seamless fallbacks.

## Performance Notes:
- Videos are lazy-loaded and optimized for web delivery
- Gradient overlays ensure text readability over videos
- Mobile-friendly with `playsInline` attribute
- Error handling prevents broken video displays

## Replacement Instructions:
To replace placeholder videos with actual footage:
1. Record/source high-quality video content following the guidelines
2. Edit to 15-30 seconds with seamless loop points
3. Encode as MP4 (H.264) with web optimization
4. Keep file size under 8MB
5. Replace the corresponding placeholder file
6. Test across different browsers and devices
