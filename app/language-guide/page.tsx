"use client";

import { useState, useEffect } from 'react';
import { Languages, ArrowRight, Loader2, Copy, CheckCircle2, Volume2, VolumeX } from 'lucide-react';

interface TranslationResponse {
  translatedText: string;
  detectedLanguage?: string;
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
    
    // Set language to Hindi
    utterance.lang = 'hi-IN';
    
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
          targetLanguage: 'hi', // Hindi language code
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
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
              <Languages className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text mb-4">
            Language Guide
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Break language barriers and communicate easily during your Jharkhand journey. 
            Translate any text to Hindi instantly.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Main Translation Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-b border-white/10 p-6">
              <div className="flex items-center justify-center space-x-3">
                <span className="text-gray-300 font-medium">Any Language</span>
                <ArrowRight className="w-5 h-5 text-orange-400" />
                <span className="text-orange-400 font-semibold">हिंदी (Hindi)</span>
              </div>
            </div>

            {/* Translation Interface */}
            <div className="p-6 md:p-8 space-y-8">
              {/* Input Section */}
              <div className="space-y-4">
                <label htmlFor="input-text" className="block text-lg font-semibold text-gray-200">
                  Enter text to translate:
                </label>
                <div className="relative">
                  <textarea
                    id="input-text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type here in any language…"
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
                      <span>Translate to Hindi</span>
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
                      In Hindi:
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
                          title={isSpeaking ? "Stop speaking" : "Listen to Hindi pronunciation"}
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
                <span className="text-2xl">🗣️</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Instant Communication</h3>
              <p className="text-gray-400 text-sm">
                Translate phrases for asking directions, ordering food, or basic conversations with locals.
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
              ].map((phrase, index) => (
                <div key={index} className="bg-slate-800/30 rounded-lg p-4 border border-slate-600/30 relative group">
                  <p className="text-gray-300 text-sm mb-2">{phrase.english}</p>
                  <p className="text-orange-300 font-medium pr-10">{phrase.hindi}</p>
                  {speechSupported && (
                    <button
                      onClick={() => {
                        if (window.speechSynthesis) {
                          window.speechSynthesis.cancel();
                          const utterance = new SpeechSynthesisUtterance(phrase.hindi.split(' (')[0]); // Remove transliteration
                          utterance.lang = 'hi-IN';
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}