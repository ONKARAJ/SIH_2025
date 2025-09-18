# Folklore Audio Files Setup

## Directory Structure
Place your MP3 files in this directory with the following naming convention:

```
public/audio/folklore/
├── sal-trees-legend.mp3          # The Legend of Sal Trees
├── divine-gift-cattle.mp3        # The Divine Gift of Cattle  
├── sacred-grove-keeper.mp3       # The Sacred Grove Keeper
├── peacock-rain-dance.mp3        # The Peacock and the Rain Dance
├── origin-tribal-music.mp3       # The Origin of Tribal Music
├── wise-elephant-village-well.mp3 # The Wise Elephant and the Village Well
└── README.md                     # This file
```

## File Requirements
- **Format**: MP3
- **Quality**: Recommended 128-320 kbps for web optimization
- **Duration**: 2-5 minutes per story for optimal user experience
- **Naming**: Use kebab-case (lowercase with hyphens) as shown above

## Audio Content Suggestions
Each MP3 should ideally contain:
1. **Narrator voice**: Clear, engaging storytelling in English or local languages
2. **Background sounds**: Ambient nature sounds matching the story theme
   - Forest sounds for tree-related stories
   - Animal sounds for cattle/elephant stories  
   - Rain/thunder for weather-related stories
   - Traditional music for cultural stories

## Current Audio Mapping
The component will automatically load these files when they exist:
- Story ID 1 → `sal-trees-legend.mp3`
- Story ID 2 → `divine-gift-cattle.mp3`
- Story ID 3 → `sacred-grove-keeper.mp3`
- Story ID 4 → `peacock-rain-dance.mp3`
- Story ID 5 → `origin-tribal-music.mp3`
- Story ID 6 → `wise-elephant-village-well.mp3`

## Fallback Behavior
If MP3 files are not found, the component will:
1. Show an error message to the user
2. Disable the play button for that story
3. Continue to work for other stories that have audio files

## Testing Your Audio
1. Place your MP3 files in this directory
2. Restart your development server
3. Navigate to the Festivals page
4. Scroll to "Interactive Folklore & Legends" section
5. Click the play buttons to test each audio file