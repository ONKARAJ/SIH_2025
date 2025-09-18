"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Mic, 
  MicOff, 
  Square, 
  Languages, 
  Volume2, 
  ArrowRight, 
  Copy, 
  RotateCcw,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import useSpeechRecognition from '@/hooks/useSpeechRecognition';
import TranslationService, { type TranslationResponse } from '@/lib/translationService';

interface VoiceTranslatorProps {
  onTranscript?: (text: string) => void;
  onTranslation?: (translation: TranslationResponse) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  initialSpeechLanguage?: 'en-US' | 'hi-IN';
  initialTargetLanguage?: string;
  autoTranslate?: boolean;
}

const VoiceTranslator: React.FC<VoiceTranslatorProps> = ({
  onTranscript,
  onTranslation,
  disabled = false,
  className = '',
  placeholder = 'Click the microphone to start voice input and translation...',
  initialSpeechLanguage = 'en-US',
  initialTargetLanguage = 'hi',
  autoTranslate = true
}) => {
  // Speech Recognition States
  const [selectedSpeechLanguage, setSelectedSpeechLanguage] = useState<'en-US' | 'hi-IN'>(initialSpeechLanguage);
  const [showSpeechLanguageSelector, setShowSpeechLanguageSelector] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);

  // Translation States
  const [selectedTargetLanguage, setSelectedTargetLanguage] = useState(initialTargetLanguage);
  const [showTargetLanguageSelector, setShowTargetLanguageSelector] = useState(false);
  const [translation, setTranslation] = useState<TranslationResponse | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState<string | null>(null);
  const [copied, setCopied] = useState<'original' | 'translated' | null>(null);

  // Speech Recognition Hook
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
    language: selectedSpeechLanguage,
    continuous: true,
    interimResults: true,
    onResult: (transcript: string, isFinal: boolean) => {
      if (onTranscript) {
        onTranscript(transcript);
      }
    },
    onError: (errorMessage: string) => {
      setVoiceError(errorMessage);
    }
  });

  // Auto-translate when final transcript changes
  useEffect(() => {
    if (finalTranscript && autoTranslate && !isTranslating) {
      handleTranslate();
    }
  }, [finalTranscript, autoTranslate]);

  // Update speech recognition language
  useEffect(() => {
    setLanguage(selectedSpeechLanguage);
  }, [selectedSpeechLanguage, setLanguage]);

  // Clear errors after timeout
  useEffect(() => {
    if (voiceError || translationError) {
      const timer = setTimeout(() => {
        setVoiceError(null);
        setTranslationError(null);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [voiceError, translationError]);

  // Clear copied state after timeout
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleTranslate = useCallback(async () => {
    const textToTranslate = finalTranscript || transcript;
    if (!textToTranslate?.trim()) return;

    setIsTranslating(true);
    setTranslationError(null);

    try {
      const result = await TranslationService.translateText({
        text: textToTranslate,
        targetLanguage: selectedTargetLanguage,
        sourceLanguage: selectedSpeechLanguage === 'en-US' ? 'en' : 'hi'
      });

      setTranslation(result);
      if (onTranslation) {
        onTranslation(result);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Translation failed';
      setTranslationError(errorMessage);
    } finally {
      setIsTranslating(false);
    }
  }, [finalTranscript, transcript, selectedTargetLanguage, selectedSpeechLanguage, onTranslation]);

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
      setVoiceError(null);
    } else {
      resetTranscript();
      setTranslation(null);
      setVoiceError(null);
      setTranslationError(null);
      startListening();
    }
  };

  const handleReset = () => {
    resetTranscript();
    setTranslation(null);
    setVoiceError(null);
    setTranslationError(null);
  };

  const handleCopy = async (text: string, type: 'original' | 'translated') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const getSpeechLanguageLabel = (lang: 'en-US' | 'hi-IN') => {
    return lang === 'en-US' ? 'English' : 'हिंदी (Hindi)';
  };

  const getMicButtonContent = () => {
    if (isListening) {
      return (
        <div className="flex items-center space-x-2">
          <Square className="w-5 h-5 text-red-400" />
          <span className="text-sm font-medium text-red-400">Stop Recording</span>
          <div className="flex space-x-1">
            <div className="w-1 h-4 bg-red-400 rounded-full animate-pulse"></div>
            <div className="w-1 h-3 bg-red-400/70 rounded-full animate-pulse delay-100"></div>
            <div className="w-1 h-5 bg-red-400 rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
      );
    }

    if (voiceError || error) {
      return (
        <div className="flex items-center space-x-2">
          <MicOff className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-400">Try Again</span>
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
    <div className={`space-y-6 ${className}`}>
      {/* Control Panel */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Speech Language Selector */}
        <div className="relative">
          <button
            onClick={() => setShowSpeechLanguageSelector(!showSpeechLanguageSelector)}
            disabled={disabled || isListening}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-xl text-gray-300 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Mic className="w-4 h-4" />
            <span className="text-sm font-medium">{getSpeechLanguageLabel(selectedSpeechLanguage)}</span>
          </button>

          {showSpeechLanguageSelector && (
            <div className="absolute top-full mt-2 left-0 z-20 bg-slate-800/95 backdrop-blur-sm border border-slate-600 rounded-xl shadow-xl overflow-hidden min-w-[180px]">
              <button
                onClick={() => {
                  setSelectedSpeechLanguage('en-US');
                  setShowSpeechLanguageSelector(false);
                }}
                className="w-full px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-orange-500/20 transition-all duration-200 flex items-center space-x-2"
              >
                <span className="text-2xl">🇺🇸</span>
                <span>English</span>
              </button>
              <button
                onClick={() => {
                  setSelectedSpeechLanguage('hi-IN');
                  setShowSpeechLanguageSelector(false);
                }}
                className="w-full px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-orange-500/20 transition-all duration-200 flex items-center space-x-2"
              >
                <span className="text-2xl">🇮🇳</span>
                <span>हिंदी (Hindi)</span>
              </button>
            </div>
          )}
        </div>

        <ArrowRight className="w-5 h-5 text-gray-400" />

        {/* Target Language Selector */}
        <div className="relative">
          <button
            onClick={() => setShowTargetLanguageSelector(!showTargetLanguageSelector)}
            disabled={disabled}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-xl text-gray-300 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Languages className="w-4 h-4" />
            <span className="text-sm font-medium">
              {TranslationService.formatLanguageName(selectedTargetLanguage)}
            </span>
          </button>

          {showTargetLanguageSelector && (
            <div className="absolute top-full mt-2 left-0 z-20 bg-slate-800/95 backdrop-blur-sm border border-slate-600 rounded-xl shadow-xl overflow-hidden min-w-[200px] max-h-60 overflow-y-auto">
              {['en', 'hi', 'bn', 'te', 'ta', 'ur', 'gu', 'kn', 'ml', 'pa', 'or', 'as', 'mr'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedTargetLanguage(lang);
                    setShowTargetLanguageSelector(false);
                  }}
                  className="w-full px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-orange-500/20 transition-all duration-200"
                >
                  {TranslationService.formatLanguageName(lang)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Manual Translate Button */}
        {!autoTranslate && (
          <button
            onClick={handleTranslate}
            disabled={!transcript?.trim() || isTranslating}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-xl text-blue-400 hover:text-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isTranslating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Languages className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">Translate</span>
          </button>
        )}

        {/* Reset Button */}
        {(transcript || translation) && (
          <button
            onClick={handleReset}
            disabled={isListening || isTranslating}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600/20 hover:bg-gray-600/30 border border-gray-500/30 rounded-xl text-gray-400 hover:text-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm font-medium">Reset</span>
          </button>
        )}
      </div>

      {/* Microphone Button */}
      <button
        onClick={handleMicClick}
        disabled={disabled}
        className={`w-full flex items-center justify-center px-6 py-4 rounded-xl font-semibold transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed ${
          isListening
            ? 'bg-red-500/20 hover:bg-red-500/30 border-2 border-red-500/40 shadow-lg shadow-red-500/20'
            : 'bg-gradient-to-r from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30 border-2 border-orange-500/30 hover:border-orange-500/50 shadow-lg hover:shadow-xl'
        }`}
      >
        {getMicButtonContent()}
      </button>

      {/* Speech Transcript */}
      {(transcript || isListening) && (
        <div className="p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-orange-400 uppercase tracking-wider">
            {isListening ? (
              <span className="flex items-center space-x-2">
                <span>Listening</span>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-orange-400 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-orange-400 rounded-full animate-pulse delay-75"></div>
                  <div className="w-1 h-1 bg-orange-400 rounded-full animate-pulse delay-150"></div>
                </div>
              </span>
            ) : 'Speech Recognition Complete'}
          </span>
              {transcript && (
                <button
                  onClick={() => handleCopy(transcript, 'original')}
                  className="p-1 hover:bg-orange-500/20 rounded transition-colors"
                  title="Copy original text"
                >
                  {copied === 'original' ? (
                    <CheckCircle className="w-3 h-3 text-green-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-gray-400 hover:text-orange-400" />
                  )}
                </button>
              )}
            </div>
            <span className="text-xs text-gray-400">
              Input: {getSpeechLanguageLabel(selectedSpeechLanguage)}
            </span>
          </div>
          <p className="text-white text-sm leading-relaxed min-h-[2rem]">
            {transcript || placeholder}
          </p>
        </div>
      )}

      {/* Translation Result */}
      {(isTranslating || translation) && (
        <div className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">
                {isTranslating ? 'Translating...' : 'Translation'}
              </span>
              {translation && (
                <button
                  onClick={() => handleCopy(translation.translatedText, 'translated')}
                  className="p-1 hover:bg-blue-500/20 rounded transition-colors"
                  title="Copy translated text"
                >
                  {copied === 'translated' ? (
                    <CheckCircle className="w-3 h-3 text-green-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-gray-400 hover:text-blue-400" />
                  )}
                </button>
              )}
            </div>
            <span className="text-xs text-gray-400">
              Output: {TranslationService.formatLanguageName(selectedTargetLanguage)}
            </span>
          </div>
          
          {isTranslating ? (
            <div className="flex items-center space-x-2 min-h-[2rem]">
              <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
              <span className="text-gray-300 text-sm">Processing translation...</span>
            </div>
          ) : translation ? (
            <div className="space-y-2">
              <p className="text-white text-sm leading-relaxed">
                {translation.translatedText}
              </p>
              {translation.detectedLanguage && (
                <p className="text-xs text-gray-400">
                  Detected: {translation.detectedLanguage}
                </p>
              )}
            </div>
          ) : null}
        </div>
      )}

      {/* Error Messages */}
      {(voiceError || error || translationError) && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl animate-fadeIn">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-sm">
              {voiceError || error || translationError}
            </p>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!isListening && !transcript && !voiceError && !error && !translationError && (
        <div className="text-center space-y-3">
          <p className="text-gray-400 text-sm">
            Click the microphone and speak in {getSpeechLanguageLabel(selectedSpeechLanguage)}
          </p>
          <p className="text-gray-400 text-sm">
            Your speech will be {autoTranslate ? 'automatically' : 'manually'} translated to {TranslationService.formatLanguageName(selectedTargetLanguage)}
          </p>
          <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Volume2 className="w-3 h-3" />
              <span>Clear audio</span>
            </div>
            <div className="flex items-center space-x-1">
              <Languages className="w-3 h-3" />
              <span>Auto-translate</span>
            </div>
          </div>
        </div>
      )}

      {/* Click outside handlers */}
      {showSpeechLanguageSelector && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowSpeechLanguageSelector(false)}
        />
      )}
      {showTargetLanguageSelector && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowTargetLanguageSelector(false)}
        />
      )}
    </div>
  );
};

export default VoiceTranslator;