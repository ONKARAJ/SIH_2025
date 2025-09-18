"use client";

import { useState, useEffect, useCallback, useRef } from 'react';

// Define interfaces for Speech Recognition API
interface SpeechRecognitionResult {
  [key: number]: {
    transcript: string;
    confidence: number;
  };
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionResultList {
  [key: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message?: string;
}

interface SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives?: number;
  start(): void;
  stop(): void;
  abort(): void;
  addEventListener(type: string, listener: (event: any) => void): void;
  removeEventListener(type: string, listener: (event: any) => void): void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor;
    webkitSpeechRecognition: SpeechRecognitionConstructor;
  }
}

export interface UseSpeechRecognitionProps {
  onResult?: (transcript: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
  language?: 'en-US' | 'hi-IN';
  continuous?: boolean;
  interimResults?: boolean;
}

export interface UseSpeechRecognitionReturn {
  transcript: string;
  finalTranscript: string;
  isListening: boolean;
  isSupported: boolean;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  setLanguage: (language: 'en-US' | 'hi-IN') => void;
}

export const useSpeechRecognition = ({
  onResult,
  onError,
  language = 'en-US',
  continuous = true,
  interimResults = true,
}: UseSpeechRecognitionProps = {}): UseSpeechRecognitionReturn => {
  const [transcript, setTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<'en-US' | 'hi-IN'>(language);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const finalTranscriptRef = useRef('');
  const interimTranscriptRef = useRef('');
  const lastUpdateTime = useRef<number>(0);
  const updateThrottle = 100; // Throttle updates to every 100ms for smoother performance
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isManualStop = useRef(false);
  const hasStarted = useRef(false);
  const restartAttempts = useRef(0);
  const maxRestartAttempts = 5;
  const isRestarting = useRef(false);
  const heartbeatInterval = useRef<NodeJS.Timeout | null>(null);

  // Check for Speech Recognition support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      setIsSupported(!!SpeechRecognition);
    }
  }, []);

  // Initialize Speech Recognition
  const initializeSpeechRecognition = useCallback(() => {
    if (typeof window === 'undefined') return null;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    recognition.lang = currentLanguage;
    
    // Enhanced audio configuration for smoother recording
    recognition.maxAlternatives = 1;
    
    // Additional settings for better stability
    // Note: grammars property is deprecated and causes errors in modern browsers
    // if ('grammars' in recognition) {
    //   recognition.grammars = speechGrammarList;
    // }
    
    // Modern speech recognition doesn't need service hints
    // The browser automatically optimizes performance

    recognition.addEventListener('result', (event: SpeechRecognitionEvent) => {
      const now = Date.now();
      
      // Throttle updates for smoother performance
      if (now - lastUpdateTime.current < updateThrottle) {
        return;
      }
      lastUpdateTime.current = now;

      let interimTranscript = '';
      let finalText = finalTranscriptRef.current;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const resultText = result[0].transcript.trim();

        if (result.isFinal && resultText) {
          // Add space only if we already have final text
          finalText += (finalText ? ' ' : '') + resultText;
        } else if (resultText) {
          interimTranscript += (interimTranscript ? ' ' : '') + resultText;
        }
      }

      // Store interim transcript for reference
      interimTranscriptRef.current = interimTranscript;
      
      // Update refs and state
      finalTranscriptRef.current = finalText;
      const fullTranscript = finalText + (interimTranscript ? (finalText ? ' ' : '') + interimTranscript : '');
      
      // Batch state updates
      requestAnimationFrame(() => {
        setFinalTranscript(finalText);
        setTranscript(fullTranscript);

        if (onResult) {
          onResult(fullTranscript, interimTranscript.length === 0);
        }
      });
    });

    recognition.addEventListener('start', () => {
      console.log('Speech recognition started successfully');
      hasStarted.current = true;
      isRestarting.current = false;
      restartAttempts.current = 0; // Reset restart attempts on successful start
      setIsListening(true);
      setError(null);
      
      // Start heartbeat to keep recognition active
      if (continuous && heartbeatInterval.current === null) {
        heartbeatInterval.current = setInterval(() => {
          if (recognitionRef.current && isListening && hasStarted.current && !isManualStop.current) {
            console.log('Heartbeat: Speech recognition still active');
            // The heartbeat just logs - the Web Speech API doesn't need manual keepalive
            // but this helps us monitor if it's still running
          }
        }, 10000); // Check every 10 seconds
      }
    });

    recognition.addEventListener('end', () => {
      console.log('Speech recognition ended. Manual stop:', isManualStop.current, 'Restart attempts:', restartAttempts.current);
      
      // Don't set isListening to false immediately if we're going to restart
      const shouldRestart = !isManualStop.current && continuous && hasStarted.current && 
                            restartAttempts.current < maxRestartAttempts && !isRestarting.current;
      
      if (!shouldRestart) {
        setIsListening(false);
        // Clear heartbeat when stopping
        if (heartbeatInterval.current) {
          clearInterval(heartbeatInterval.current);
          heartbeatInterval.current = null;
        }
      }
      
      // Auto-restart if conditions are met
      if (shouldRestart) {
        console.log('Auto-restarting speech recognition... Attempt:', restartAttempts.current + 1);
        isRestarting.current = true;
        
        restartTimeoutRef.current = setTimeout(() => {
          if (recognitionRef.current && !isManualStop.current && hasStarted.current) {
            try {
              restartAttempts.current++;
              recognitionRef.current.start();
              console.log('Successfully restarted speech recognition');
            } catch (error) {
              console.warn('Failed to auto-restart recognition:', error);
              isRestarting.current = false;
              setIsListening(false);
              
              if (restartAttempts.current >= maxRestartAttempts) {
                setError('Speech recognition stopped after multiple attempts. Please click the microphone to restart.');
                restartAttempts.current = 0;
              } else {
                // Try again with longer delay
                setTimeout(() => {
                  if (!isManualStop.current && recognitionRef.current) {
                    try {
                      recognitionRef.current.start();
                    } catch (retryError) {
                      console.warn('Retry failed:', retryError);
                      setError('Speech recognition stopped. Click the microphone to restart.');
                    }
                  }
                }, 500);
              }
            }
          } else {
            isRestarting.current = false;
            setIsListening(false);
          }
        }, 250); // Increased delay for more reliable restart
      } else if (restartAttempts.current >= maxRestartAttempts) {
        console.log('Max restart attempts reached, stopping auto-restart');
        restartAttempts.current = 0;
        setError('Speech recognition stopped after multiple attempts. Please click the microphone to restart.');
      }
    });

    recognition.addEventListener('audiostart', () => {
      console.log('Audio capture started');
    });

    recognition.addEventListener('audioend', () => {
      console.log('Audio capture ended');
    });

    recognition.addEventListener('soundstart', () => {
      console.log('Sound detected');
    });

    recognition.addEventListener('soundend', () => {
      console.log('Sound ended');
    });

    recognition.addEventListener('error', (event: SpeechRecognitionErrorEvent) => {
      console.log('Speech recognition error:', event.error);
      
      // Handle different error types
      switch (event.error) {
        case 'aborted':
          // Don't show error for aborted - it's usually intentional
          console.log('Speech recognition was aborted');
          setIsListening(false);
          break;
        case 'no-speech':
          // Auto-restart for no-speech errors in continuous mode
          console.log('No speech detected, will auto-restart');
          if (continuous && !isManualStop.current) {
            // Don't set error for no-speech in continuous mode
            return;
          }
          setError('No speech detected. Please try speaking again.');
          setIsListening(false);
          break;
        case 'audio-capture':
          setError('No microphone found or permission denied. Please check your microphone.');
          setIsListening(false);
          isManualStop.current = true; // Stop auto-restart
          break;
        case 'not-allowed':
          setError('Microphone permission denied. Please allow microphone access and refresh the page.');
          setIsListening(false);
          isManualStop.current = true; // Stop auto-restart
          break;
        case 'network':
          setError('Network error. Please check your internet connection.');
          setIsListening(false);
          break;
        case 'language-not-supported':
          setError('Selected language is not supported by your browser.');
          setIsListening(false);
          isManualStop.current = true; // Stop auto-restart
          break;
        default:
          console.warn('Unhandled speech recognition error:', event.error);
          setError(`Speech recognition error: ${event.error}`);
          setIsListening(false);
      }
      
      if (onError && event.error !== 'aborted' && event.error !== 'no-speech') {
        let errorMessage = 'Speech recognition error occurred';
        
        switch (event.error) {
          case 'audio-capture':
            errorMessage = 'No microphone found or permission denied. Please check your microphone.';
            break;
          case 'not-allowed':
            errorMessage = 'Microphone permission denied. Please allow microphone access.';
            break;
          case 'network':
            errorMessage = 'Network error. Please check your internet connection.';
            break;
          case 'language-not-supported':
            errorMessage = 'Selected language is not supported.';
            break;
          default:
            errorMessage = event.message || errorMessage;
        }
        
        onError(errorMessage);
      }
    });

    return recognition;
  }, [continuous, interimResults, currentLanguage, onResult, onError]);

  const startListening = useCallback(() => {
    if (!isSupported) {
      setError('Speech recognition is not supported in this browser');
      return;
    }

    if (isListening || isRestarting.current) {
      console.warn('Speech recognition already running or restarting');
      return;
    }

    // Clear any existing restart timeout
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }

    // Reset all flags
    isManualStop.current = false;
    hasStarted.current = false;
    isRestarting.current = false;
    restartAttempts.current = 0;

    // Stop any existing recognition first and wait for it to fully stop
    if (recognitionRef.current) {
      try {
        isManualStop.current = true; // Mark as manual to prevent auto-restart
        recognitionRef.current.stop();
        recognitionRef.current.abort();
        recognitionRef.current = null; // Clear the reference
      } catch (e) {
        console.warn('Error stopping previous recognition:', e);
      }
    }

    // Longer delay to ensure previous recognition is fully stopped
    setTimeout(() => {
      // Double-check that we should still start (user might have cancelled)
      if (isManualStop.current) {
        console.log('Start cancelled - manual stop detected');
        return;
      }
      
      try {
        const recognition = initializeSpeechRecognition();
        if (!recognition) {
          setError('Failed to initialize speech recognition');
          return;
        }

        recognitionRef.current = recognition;
        setError(null);
        
        // Add additional error handling for start
        try {
          recognition.start();
          console.log('Starting speech recognition...');
        } catch (startError) {
          console.error('Error starting recognition:', startError);
          if (startError.name === 'InvalidStateError') {
            console.log('InvalidStateError - recognition may already be running');
            // Don't try to restart immediately, just set error
            setError('Speech recognition is already running. Please wait and try again.');
          } else if (startError.name === 'NotAllowedError') {
            setError('Microphone permission denied. Please allow microphone access.');
          } else {
            setError('Failed to start speech recognition. Please check microphone permissions.');
          }
        }
      } catch (err) {
        setError('Failed to start speech recognition');
        console.error('Speech recognition error:', err);
        setIsListening(false);
        isRestarting.current = false;
      }
    }, 200); // Increased delay for more reliable cleanup
  }, [isSupported, isListening, initializeSpeechRecognition]);

  const stopListening = useCallback(() => {
    console.log('Manually stopping speech recognition');
    
    // Set all stop flags immediately
    isManualStop.current = true;
    hasStarted.current = false;
    isRestarting.current = false;
    restartAttempts.current = 0;
    
    // Clear any restart timeout
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }
    
    // Clear heartbeat
    if (heartbeatInterval.current) {
      clearInterval(heartbeatInterval.current);
      heartbeatInterval.current = null;
    }
    
    // Update UI state immediately
    setIsListening(false);
    setError(null);
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        // Don't call abort() as it can cause issues
        // recognitionRef.current.abort();
      } catch (error) {
        console.warn('Error stopping speech recognition:', error);
      }
    }
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setFinalTranscript('');
    finalTranscriptRef.current = '';
    interimTranscriptRef.current = '';
    setError(null);
  }, []);

  const setLanguage = useCallback((newLanguage: 'en-US' | 'hi-IN') => {
    setCurrentLanguage(newLanguage);
    
    // If currently listening, restart with new language
    if (isListening) {
      stopListening();
      setTimeout(() => {
        startListening();
      }, 100);
    }
  }, [isListening, stopListening, startListening]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log('Cleaning up speech recognition');
      isManualStop.current = true;
      hasStarted.current = false;
      isRestarting.current = false;
      restartAttempts.current = 0;
      
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = null;
      }
      
      if (heartbeatInterval.current) {
        clearInterval(heartbeatInterval.current);
        heartbeatInterval.current = null;
      }
      
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          console.warn('Error during cleanup:', error);
        }
      }
    };
  }, []);

  return {
    transcript,
    finalTranscript,
    isListening,
    isSupported,
    error,
    startListening,
    stopListening,
    resetTranscript,
    setLanguage,
  };
};

export default useSpeechRecognition;