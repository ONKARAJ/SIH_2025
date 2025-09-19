"use client";

import { useState, useEffect } from 'react';
import { Languages, ArrowRight, Loader2, Copy, CheckCircle2, Volume2, VolumeX, Mic, RefreshCw } from 'lucide-react';
import VoiceInput from '@/components/voice-input';

interface TranslationResponse {
  translatedText: string;
  detectedLanguage?: string;
  error?: string;
}

export default function LanguageGuidePage() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState<'en' | 'hi'>('en');
  const [targetLanguage, setTargetLanguage] = useState<'en' | 'hi'>('hi');
  const [isRecording, setIsRecording] = useState(false);

  // Check for speech synthesis support on component mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSupported(true);
    }
  }, []);

  // Text-to-speech functionality
  const handleSpeak = () => {
    if (!translatedText || !speechSupported) return;

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(translatedText);
    
    // Set language based on target language
    utterance.lang = getVoiceLanguageCode(targetLanguage);
    
    // Configure speech settings
    utterance.rate = 0.8; // Slightly slower for clarity
    utterance.pitch = 1;
    utterance.volume = 1;

    // Event listeners
    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      console.error('Speech synthesis error');
    };

    // Speak the text
    window.speechSynthesis.speak(utterance);
  };

  // Stop speech when component unmounts
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to translate');
      return;
    }

    setIsLoading(true);
    setError('');
    setTranslatedText('');

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          targetLanguage: targetLanguage,
          sourceLanguage: sourceLanguage,
        }),
      });

      const data: TranslationResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Translation failed');
      }

      setTranslatedText(data.translatedText);
      setDetectedLanguage(data.detectedLanguage || '');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to translate text');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleTranslate();
    }
  };

  const handleVoiceInput = (transcript: string) => {
    setInputText(transcript);
    setError('');
  };

  const swapLanguages = () => {
    const newSource = targetLanguage;
    const newTarget = sourceLanguage;
    setSourceLanguage(newSource);
    setTargetLanguage(newTarget);
    
    // Swap text content if both fields have content
    if (inputText && translatedText) {
      setInputText(translatedText);
      setTranslatedText(inputText);
    }
    
    setError('');
  };

  const getLanguageLabel = (lang: 'en' | 'hi') => {
    return lang === 'en' ? 'English' : 'हिंदी (Hindi)';
  };

  const getVoiceLanguageCode = (lang: 'en' | 'hi') => {
    return lang === 'en' ? 'en-US' : 'hi-IN';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        {/* Global Recording Indicator */}
        {isRecording && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-fadeIn">
            <div className="bg-red-500/90 backdrop-blur-sm border-2 border-red-400 rounded-full px-6 py-3 shadow-2xl">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-red-100 rounded-full animate-pulse"></div>
                </div>
                <span className="text-white font-bold text-sm tracking-wider">
                  🎙️ RECORDING VOICE INPUT
                </span>
                <div className="flex space-x-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-4 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
              isRecording 
                ? 'bg-gradient-to-br from-red-500 to-red-600 animate-pulse ring-4 ring-red-500/30' 
                : 'bg-gradient-to-br from-orange-500 to-red-500'
            }`}>
              <Languages className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text mb-4">
            Language Guide
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Break language barriers and communicate easily during your Jharkhand journey. 
            Translate between English and Hindi instantly with text or voice input.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Main Translation Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
            {/* Card Header - Bidirectional Language Selector */}
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-b border-white/10 p-6">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="text-2xl">{sourceLanguage === 'en' ? '🇺🇸' : '🇮🇳'}</div>
                  <span className="text-gray-300 font-medium text-lg">{getLanguageLabel(sourceLanguage)}</span>
                </div>
                
                <button 
                  onClick={swapLanguages}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 group"
                  title="Swap languages"
                >
                  <RefreshCw className="w-5 h-5 text-orange-400 group-hover:text-white group-hover:rotate-180 transition-all duration-300" />
                </button>
                
                <div className="flex items-center space-x-2">
                  <div className="text-2xl">{targetLanguage === 'en' ? '🇺🇸' : '🇮🇳'}</div>
                  <span className="text-orange-400 font-semibold text-lg">{getLanguageLabel(targetLanguage)}</span>
                </div>
              </div>
            </div>

            {/* Translation Interface */}
            <div className="p-6 md:p-8 space-y-8">
              {/* Input Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">  
                  <label htmlFor="input-text" className="block text-lg font-semibold text-gray-200">
                    Enter text in {getLanguageLabel(sourceLanguage)}:
                  </label>
                  <button 
                    onClick={() => setShowVoiceInput(!showVoiceInput)} 
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isRecording
                        ? 'bg-red-500/30 border-2 border-red-500/50 text-red-400 animate-pulse ring-2 ring-red-500/20'
                        : showVoiceInput
                          ? 'bg-gradient-to-r from-orange-500/30 to-red-500/30 border border-orange-500/50 text-white'
                          : 'bg-gradient-to-r from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30 border border-orange-500/30 text-gray-300 hover:text-white'
                    }`}>
                    <Mic className={`w-4 h-4 ${
                      isRecording ? 'text-red-400 animate-bounce' : 'text-orange-400'
                    }`} />
                    <span>
                      {isRecording 
                        ? '🔴 Recording...' 
                        : showVoiceInput 
                          ? 'Hide Voice Input' 
                          : 'Voice Input'
                      }
                    </span>
                    {isRecording && (
                      <div className="flex space-x-0.5">
                        <div className="w-1 h-3 bg-red-400 rounded-full animate-bounce"></div>
                        <div className="w-1 h-2 bg-red-400/80 rounded-full animate-bounce delay-75"></div>
                        <div className="w-1 h-4 bg-red-400 rounded-full animate-bounce delay-150"></div>
                      </div>
                    )}
                  </button>
                </div>
                
                {showVoiceInput && (
                  <div className="animate-fadeIn">
                    <VoiceInput 
                      onTranscript={handleVoiceInput} 
                      onRecordingChange={setIsRecording}
                      disabled={isLoading} 
                      className="mb-4"
                      initialLanguage={getVoiceLanguageCode(sourceLanguage)}
                      placeholder={`Speak in ${getLanguageLabel(sourceLanguage)} and we'll translate it to ${getLanguageLabel(targetLanguage)}`}
                    />
                  </div>
                )}
                
                <div className="relative">
                  <textarea
                    id="input-text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`Type here in ${getLanguageLabel(sourceLanguage)}…`}
                    className="w-full h-32 md:h-40 p-4 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-lg leading-relaxed"
                    disabled={isLoading}
                  />
                  <div className="absolute bottom-3 right-3 text-sm text-gray-500">
                    {inputText.length}/5000
                  </div>
                </div>
              </div>

              {/* Translate Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleTranslate}
                  disabled={isLoading || !inputText.trim()}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-3 text-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Translating...</span>
                    </>
                  ) : (
                    <>
                      <Languages className="w-5 h-5" />
                      <span>Translate to {getLanguageLabel(targetLanguage)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-red-400 text-center">{error}</p>
                </div>
              )}

              {/* Results Section */}
              {translatedText && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <label className="block text-lg font-semibold text-gray-200">
                      In {getLanguageLabel(targetLanguage)}:
                    </label>
                    {detectedLanguage && (
                      <span className="text-sm text-gray-400 bg-slate-700/50 px-3 py-1 rounded-full">
                        Detected: {detectedLanguage}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <div className="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl min-h-[120px] md:min-h-[140px]">
                      <p className="text-white text-lg md:text-xl leading-relaxed font-medium">
                        {translatedText}
                      </p>
                    </div>
                    <div className="absolute top-3 right-3 flex space-x-2">
                      {speechSupported && (
                        <button
                          onClick={handleSpeak}
                          className={`p-2 rounded-lg transition-all duration-200 group ${
                            isSpeaking 
                              ? 'bg-orange-500/20 hover:bg-orange-500/30' 
                              : 'bg-white/10 hover:bg-white/20'
                          }`}
                          title={isSpeaking ? "Stop speaking" : `Listen to ${getLanguageLabel(targetLanguage)} pronunciation`}
                        >
                          {isSpeaking ? (
                            <VolumeX className="w-5 h-5 text-orange-400" />
                          ) : (
                            <Volume2 className="w-5 h-5 text-gray-400 group-hover:text-white" />
                          )}
                        </button>
                      )}
                      <button
                        onClick={handleCopy}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 group"
                        title="Copy to clipboard"
                      >
                        {copied ? (
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        ) : (
                          <Copy className="w-5 h-5 text-gray-400 group-hover:text-white" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Usage Tips */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mic className="w-6 h-6 text-blue-400 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Voice Input</h3>
              <p className="text-gray-400 text-sm">
                Speak directly in English or Hindi - no typing needed. Perfect for quick translations on the go.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Volume2 className="w-6 h-6 text-orange-400 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Audio Pronunciation</h3>
              <p className="text-gray-400 text-sm">
                Listen to how Hindi translations are pronounced with built-in text-to-speech functionality.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Cultural Understanding</h3>
              <p className="text-gray-400 text-sm">
                Learn about local customs, traditions, and important phrases for your Jharkhand visit.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌏</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Universal Access</h3>
              <p className="text-gray-400 text-sm">
                Works with any language input - English, regional languages, or international languages.
              </p>
            </div>
          </div>

          {/* Common Phrases Section */}
          <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Common Travel Phrases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { english: "Hello", hindi: "नमस्ते (Namaste)" },
                { english: "Thank you", hindi: "धन्यवाद (Dhanyawad)" },
                { english: "How much does this cost?", hindi: "इसकी कीमत क्या है? (Iski keemat kya hai?)" },
                { english: "Where is the nearest hotel?", hindi: "सबसे नजदीकी होटल कहाँ है? (Sabse najdeeki hotel kahan hai?)" },
                { english: "Can you help me?", hindi: "क्या आप मेरी मदद कर सकते हैं? (Kya aap meri madad kar sakte hain?)" },
                { english: "I don't understand", hindi: "मुझे समझ नहीं आया (Mujhe samajh nahin aaya)" }
              ].map((phrase, index) => {
                const sourceText = sourceLanguage === 'en' ? phrase.english : phrase.hindi;
                const targetText = targetLanguage === 'en' ? phrase.english : phrase.hindi;
                const speechText = targetLanguage === 'en' ? phrase.english : phrase.hindi.split(' (')[0];
                
                return (
                  <div key={index} className="bg-slate-800/30 rounded-lg p-4 border border-slate-600/30 relative group">
                    <p className="text-gray-300 text-sm mb-2">{sourceText}</p>
                    <p className="text-orange-300 font-medium pr-10">{targetText}</p>
                    {speechSupported && (
                      <button
                        onClick={() => {
                          if (window.speechSynthesis) {
                            window.speechSynthesis.cancel();
                            const utterance = new SpeechSynthesisUtterance(speechText);
                            utterance.lang = getVoiceLanguageCode(targetLanguage);
                            utterance.rate = 0.8;
                            window.speechSynthesis.speak(utterance);
                          }
                        }}
                        className="absolute top-3 right-3 p-1.5 bg-orange-500/20 hover:bg-orange-500/30 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                        title="Listen to pronunciation"
                      >
                        <Volume2 className="w-4 h-4 text-orange-400" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}