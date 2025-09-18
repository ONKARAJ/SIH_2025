# 🔍 Speech Recognition Troubleshooting Guide

## Common Issues & Solutions

### 1. "Speech Recognition Stopped" Message
**Symptoms:** Message shows "Speech recognition stopped"
**Cause:** Browser stops speech recognition after inactivity
**Solution:** ✅ Auto-restart mechanism implemented

### 2. Microphone Permission Issues
**Symptoms:** "Permission denied" or no audio input
**Solutions:**
- Click microphone icon in browser address bar
- Go to browser settings and allow microphone
- Refresh the page after allowing permission

### 3. No Speech Detected
**Symptoms:** Microphone works but no text appears
**Solutions:**
- Speak louder and clearer
- Check microphone is not muted
- Try refreshing the page

### 4. Browser Compatibility Issues
**Symptoms:** "Speech recognition not supported"
**Solution:** Use Chrome, Safari, or Edge (not Firefox)

## Quick Diagnostic Steps

### Step 1: Check Browser Support
```javascript
// Open browser console (F12) and type:
console.log(!!(window.SpeechRecognition || window.webkitSpeechRecognition));
// Should return: true
```

### Step 2: Check Microphone Permission
```javascript
// Open browser console (F12) and type:
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(() => console.log('✅ Microphone access granted'))
  .catch(err => console.error('❌ Microphone access denied:', err));
```

### Step 3: Test Pages Available
- **Main Demo:** `http://localhost:3001/voice-translator-demo`
- **Debug Test:** `http://localhost:3001/speech-test`

## What to Tell Me for Help

Please provide:
1. **Which browser** are you using?
2. **What exact error message** do you see?
3. **Which page** are you testing on?
4. **What happens when** you click the microphone button?
5. **Browser console output** (press F12, look at Console tab)

## Most Likely Issues

### Issue A: Microphone Permission Not Granted
**What you see:** Permission popup or no response when clicking microphone
**Fix:** Allow microphone access in browser

### Issue B: Wrong Browser
**What you see:** "Speech recognition not supported"
**Fix:** Use Chrome, Safari, or Edge

### Issue C: HTTPS Required (Production)
**What you see:** Permission denied on deployed site
**Fix:** Use HTTPS (not needed for localhost)

### Issue D: Multiple Tabs Using Microphone
**What you see:** "Audio capture error" 
**Fix:** Close other tabs using microphone

## Let Me Know:
Which of these issues matches what you're seeing?