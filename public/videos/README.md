# Video Files for Jharkhand Tourism

## Documentary Video Setup

### Required Video File
Place your Sarhul documentary video in this directory with the following name:
- **File Name**: `sarhul-documentary.mp4`
- **Location**: `public/videos/sarhul-documentary.mp4`

### Video Requirements
- **Format**: MP4 (recommended for web compatibility)
- **Quality**: 720p or 1080p (balance between quality and file size)
- **Duration**: Any length (the modal will handle playback controls)
- **File Size**: Recommended under 100MB for web optimization

### How It Works
1. User clicks "Watch Documentary" button in the Festivals page
2. Video modal opens with your documentary
3. Video plays with full browser controls (play, pause, seek, volume, fullscreen)
4. User can close modal by:
   - Clicking the X button
   - Pressing ESC key
   - Clicking outside the video area

### Current Configuration
- The video modal is set to load: `/videos/sarhul-documentary.mp4`
- Autoplay is enabled when modal opens
- Video controls are enabled for user interaction
- Modal prevents download of the video file

### Adding Your Video
1. Copy your video file to this directory
2. Rename it to `sarhul-documentary.mp4`
3. The video will automatically work when users click "Watch Documentary"

### Fallback
If the video file is not found, the video player will show an error message but the modal will still function properly.