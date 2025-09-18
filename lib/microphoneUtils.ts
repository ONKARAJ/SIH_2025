/**
 * Microphone utilities for speech recognition
 */

export interface MicrophoneStatus {
  available: boolean;
  permission: 'granted' | 'denied' | 'prompt' | 'unknown';
  error?: string;
}

export class MicrophoneUtils {
  /**
   * Check microphone availability and permissions
   */
  static async checkMicrophone(): Promise<MicrophoneStatus> {
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return {
          available: false,
          permission: 'unknown',
          error: 'Not running in browser environment'
        };
      }

      // Check if navigator.mediaDevices is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return {
          available: false,
          permission: 'unknown',
          error: 'MediaDevices API not supported in this browser'
        };
      }

      // Check permission status if available
      let permission: 'granted' | 'denied' | 'prompt' | 'unknown' = 'unknown';
      
      if ('permissions' in navigator) {
        try {
          const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });
          permission = result.state as 'granted' | 'denied' | 'prompt';
        } catch (permError) {
          console.warn('Could not query microphone permission:', permError);
        }
      }

      // Try to access microphone
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: true,
          video: false 
        });
        
        // Stop the stream immediately as we just wanted to test access
        stream.getTracks().forEach(track => track.stop());
        
        return {
          available: true,
          permission: 'granted'
        };
      } catch (mediaError) {
        console.error('Microphone access error:', mediaError);
        
        if (mediaError.name === 'NotAllowedError') {
          return {
            available: false,
            permission: 'denied',
            error: 'Microphone access denied by user'
          };
        } else if (mediaError.name === 'NotFoundError') {
          return {
            available: false,
            permission: permission,
            error: 'No microphone device found'
          };
        } else if (mediaError.name === 'NotReadableError') {
          return {
            available: false,
            permission: permission,
            error: 'Microphone is already in use by another application'
          };
        } else {
          return {
            available: false,
            permission: permission,
            error: `Microphone error: ${mediaError.message || mediaError.name}`
          };
        }
      }
    } catch (error) {
      return {
        available: false,
        permission: 'unknown',
        error: `Failed to check microphone: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Request microphone permission
   */
  static async requestPermission(): Promise<boolean> {
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return false;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (error) {
      console.error('Failed to request microphone permission:', error);
      return false;
    }
  }

  /**
   * Check if speech recognition is supported
   */
  static isSpeechRecognitionSupported(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  /**
   * Get browser-specific guidance for enabling microphone
   */
  static getMicrophoneGuide(): string {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return 'Please check your browser settings to allow microphone access for this website';
    }
    
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (userAgent.includes('chrome')) {
      return 'In Chrome: Click the microphone icon in the address bar, or go to Settings > Privacy & Security > Site Settings > Microphone';
    } else if (userAgent.includes('firefox')) {
      return 'In Firefox: Click the microphone icon in the address bar, or go to Preferences > Privacy & Security > Permissions';
    } else if (userAgent.includes('safari')) {
      return 'In Safari: Go to Safari > Preferences > Websites > Microphone, or check the address bar for microphone permissions';
    } else if (userAgent.includes('edge')) {
      return 'In Edge: Click the microphone icon in the address bar, or go to Settings > Site permissions > Microphone';
    } else {
      return 'Please check your browser settings to allow microphone access for this website';
    }
  }
}

export default MicrophoneUtils;