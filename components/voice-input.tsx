"use client";

import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Square, Languages, Volume2 } from 'lucide-react';
import useSpeechRecognition from '@/hooks/useSpeechRecognition';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  onRecordingChange?: (isRecording: boolean) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  initialLanguage?: 'en-US' | 'hi-IN';
}

const VoiceInput: React.FC<VoiceInputProps> = ({
  onTranscript,
  onRecordingChange,
  disabled = false,
  className = '',
  placeholder = 'Click the microphone to start voice input...',
  initialLanguage = 'en-US'
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<'en-US' | 'hi-IN'>(initialLanguage);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    transcript,
    finalTranscript,
    isListening,
    isSupported,
    error,
    startListening,
    stopListening,
    resetTranscript,
    setLanguage
  } = useSpeechRecognition({
    language: selectedLanguage,
    continuous: true,
    interimResults: true,
    onResult: (transcript: string, isFinal: boolean) => {
      onTranscript(transcript);
    },
    onError: (errorMessage: string) => {
      setVoiceError(errorMessage);
    }
  });

  // Update language when selection changes
  useEffect(() => {
    setLanguage(selectedLanguage);
  }, [selectedLanguage, setLanguage]);

  // Update selected language when initialLanguage prop changes
  useEffect(() => {
    setSelectedLanguage(initialLanguage);
  }, [initialLanguage]);

  // Notify parent component of recording state changes
  useEffect(() => {
    if (onRecordingChange) {
      onRecordingChange(isListening);
    }
  }, [isListening, onRecordingChange]);

  // Clear voice error after 8 seconds (longer for better UX)
  useEffect(() => {
    if (voiceError || error) {
      const timer = setTimeout(() => {
        setVoiceError(null);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [voiceError, error]);

  // Handle specific errors
  useEffect(() => {
    if (error) {
      if (error.includes('no-speech')) {
        console.log('No speech detected');
        // Don't show error for no-speech in continuous mode
        if (!isListening) {
          setVoiceError('No speech detected. Please try again.');
        }
      } else if (error.includes('aborted')) {
        console.log('Recognition was aborted, cleaning up');
        setVoiceError(null);
      } else if (error.includes('not-allowed')) {
        setVoiceError('Microphone access denied. Please allow microphone access and refresh the page.');
      } else if (error.includes('audio-capture')) {
        setVoiceError('No microphone detected. Please check your microphone connection.');
      } else {
        setVoiceError(error);
      }
    }
  }, [error, isListening]);

  const handleMicClick = () => {
    if (isProcessing) {
      console.log('Click ignored - already processing');
      return;
    }
    
    setIsProcessing(true);
    
    if (isListening) {
      console.log('Stopping speech recognition via button click');
      stopListening();
      setVoiceError(null);
      // Reset processing state after a short delay
      setTimeout(() => setIsProcessing(false), 500);
    } else {
      console.log('Starting speech recognition via button click');
      resetTranscript();
      setVoiceError(null);
      startListening();
      // Reset processing state after a longer delay to allow for initialization
      setTimeout(() => setIsProcessing(false), 1000);
    }
  };

  const handleLanguageChange = (language: 'en-US' | 'hi-IN') => {
    setSelectedLanguage(language);
    setShowLanguageSelector(false);
    setVoiceError(null);
  };

  const getLanguageLabel = (lang: 'en-US' | 'hi-IN') => {
    return lang === 'en-US' ? 'English' : 'हिंदी (Hindi)';
  };

  const getMicButtonContent = () => {
    if (isListening) {
      return (
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Square className="w-6 h-6 text-red-400 animate-pulse" />
            {/* Pulsing ring animation */}
            <div className="absolute inset-0 w-6 h-6 border-2 border-red-400 rounded-full animate-ping opacity-75"></div>
            <div className="absolute inset-0 w-6 h-6 border border-red-300 rounded-full animate-pulse"></div>
          </div>
          <span className="text-sm font-bold text-red-400 animate-pulse">🔴 RECORDING</span>
          <div className="flex space-x-1">
            <div className="w-1.5 h-6 bg-red-400 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-4 bg-red-400/80 rounded-full animate-bounce delay-75"></div>
            <div className="w-1.5 h-5 bg-red-400 rounded-full animate-bounce delay-150"></div>
            <div className="w-1.5 h-3 bg-red-400/80 rounded-full animate-bounce delay-225"></div>
          </div>
        </div>
      );
    }

    if (voiceError || error) {
      return (
        <div className="flex items-center space-x-2">
          <MicOff className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-400">
            Try Again
          </span>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-2">
        <Mic className="w-5 h-5 text-orange-400 group-hover:text-white transition-colors" />
        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
          Start Voice Input
        </span>
      </div>
    );
  };

  if (!isSupported) {
    return (
      <div className={`${className}`}>
        <div className="flex items-center justify-center p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
          <MicOff className="w-5 h-5 text-yellow-400 mr-2" />
          <p className="text-yellow-400 text-sm">
            Voice input is not supported in this browser. Please use Chrome, Safari, or Edge.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Recording Status Banner */}
      {isListening && (
        <div className="bg-red-500/20 border-2 border-red-500/40 rounded-xl p-4 animate-pulse">
          <div className="flex items-center justify-center space-x-3">
            <div className="relative">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
              <div className="absolute inset-0 w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
            </div>
            <span className="text-red-400 font-bold text-lg">
              🎙️ RECORDING IN PROGRESS
            </span>
            <div className="flex items-center space-x-1">
              <span className="text-xs text-red-300">Listening for</span>
              <span className="text-xs font-semibold text-red-400">{getLanguageLabel(selectedLanguage)}</span>
            </div>
          </div>
          <div className="mt-2 flex justify-center">
            <div className="flex space-x-1">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 bg-red-400 rounded-full animate-bounce`}
                  style={{
                    height: `${Math.random() * 20 + 10}px`,
                    animationDelay: `${i * 0.1}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Language Selector and Microphone Button */}
      <div className="flex items-center justify-between gap-4">
        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setShowLanguageSelector(!showLanguageSelector)}
            disabled={disabled || isListening}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-xl text-gray-300 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Languages className="w-4 h-4" />
            <span className="text-sm font-medium">{getLanguageLabel(selectedLanguage)}</span>
          </button>

          {/* Language Dropdown */}
          {showLanguageSelector && (
            <div className="absolute top-full mt-2 left-0 z-20 bg-slate-800/95 backdrop-blur-sm border border-slate-600 rounded-xl shadow-xl overflow-hidden min-w-[180px]">
              <button
                onClick={() => handleLanguageChange('en-US')}
                className="w-full px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-orange-500/20 transition-all duration-200 flex items-center space-x-2"
              >
                <span className="text-2xl">🇺🇸</span>
                <span>English</span>
              </button>
              <button
                onClick={() => handleLanguageChange('hi-IN')}
                className="w-full px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-orange-500/20 transition-all duration-200 flex items-center space-x-2"
              >
                <span className="text-2xl">🇮🇳</span>
                <span>हिंदी (Hindi)</span>
              </button>
            </div>
          )}
        </div>

        {/* Microphone Button */}
        <button
          onClick={handleMicClick}
          disabled={disabled || isProcessing}
          className={`flex-1 flex items-center justify-center px-6 py-4 rounded-xl font-semibold transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed ${
            isListening
              ? 'bg-red-500/30 hover:bg-red-500/40 border-2 border-red-500/60 shadow-2xl shadow-red-500/40 ring-4 ring-red-500/20 animate-pulse transform scale-105'
              : 'bg-gradient-to-r from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30 border-2 border-orange-500/30 hover:border-orange-500/50 shadow-lg hover:shadow-xl hover:transform hover:scale-105'
          }`}
        >
          {getMicButtonContent()}
        </button>
      </div>

      {/* Real-time Transcript Display */}
      {(transcript || isListening) && (
        <div className={`p-4 rounded-xl transition-all duration-300 ${
          isListening 
            ? 'bg-gradient-to-br from-red-500/20 to-orange-500/20 border-2 border-red-500/30 shadow-lg shadow-red-500/20' 
            : 'bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              {isListening && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-150"></div>
                </div>
              )}
              <span className={`text-xs font-bold uppercase tracking-wider ${
                isListening ? 'text-red-400 animate-pulse' : 'text-orange-400'
              }`}>
                {isListening ? '🎧 LISTENING...' : '✅ VOICE INPUT COMPLETE'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400">Language:</span>
              <span className={`text-xs font-semibold ${
                isListening ? 'text-red-400' : 'text-orange-400'
              }`}>
                {getLanguageLabel(selectedLanguage)}
              </span>
            </div>
          </div>
          <p className="text-white text-sm leading-relaxed min-h-[2rem]">
            {transcript || placeholder}
          </p>
          {transcript && (
            <button
              onClick={resetTranscript}
              className="mt-2 text-xs text-gray-400 hover:text-orange-400 transition-colors"
            >
              Clear transcript
            </button>
          )}
        </div>
      )}

      {/* Error Display */}
      {(voiceError || error) && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl animate-fadeIn">
          <div className="flex items-center space-x-2">
            <MicOff className="w-4 h-4 text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-sm">{voiceError || error}</p>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!isListening && !transcript && !voiceError && !error && (
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">
            Click the microphone button and start speaking in {getLanguageLabel(selectedLanguage)}
          </p>
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Volume2 className="w-3 h-3" />
              <span>Clear audio needed</span>
            </div>
            <div className="flex items-center space-x-1">
              <Languages className="w-3 h-3" />
              <span>Auto-detection</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            💡 Tip: Speak clearly and pause briefly between sentences for best results
          </p>
        </div>
      )}
      
      {/* Recovery Instructions */}
      {(voiceError || error) && (
        <div className="text-center mt-2">
          <p className="text-xs text-gray-500">
            💡 Try refreshing the page if problems persist, or check your microphone permissions
          </p>
        </div>
      )}

      {/* Click outside to close language selector */}
      {showLanguageSelector && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowLanguageSelector(false)}
        />
      )}
    </div>
  );
};

export default VoiceInput;