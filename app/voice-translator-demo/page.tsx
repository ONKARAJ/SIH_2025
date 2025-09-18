"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import VoiceTranslator from '@/components/voice-translator';
import VoiceInput from '@/components/voice-input';
import MicrophoneTroubleshoot from '@/components/microphone-troubleshoot';
import { type TranslationResponse } from '@/lib/translationService';
import { type MicrophoneStatus } from '@/lib/microphoneUtils';
import { 
  Mic, 
  Languages, 
  Zap, 
  Globe, 
  Volume2, 
  MessageSquare,
  ArrowRight,
  Play,
  Pause
} from 'lucide-react';

export default function VoiceTranslatorDemo() {
  const [demoMode, setDemoMode] = useState<'translator' | 'voice-only'>('translator');
  const [transcript, setTranscript] = useState<string>('');
  const [translation, setTranslation] = useState<TranslationResponse | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [micStatus, setMicStatus] = useState<MicrophoneStatus | null>(null);

  const handleTranscript = (text: string) => {
    setTranscript(text);
  };

  const handleTranslation = (translationResult: TranslationResponse) => {
    setTranslation(translationResult);
  };

  const handleMicrophoneStatus = (status: MicrophoneStatus) => {
    setMicStatus(status);
  };

  const demoExamples = [
    {
      english: "Welcome to Jharkhand Tourism",
      hindi: "झारखंड पर्यटन में आपका स्वागत है",
      category: "Tourism"
    },
    {
      english: "Where can I find good restaurants?",
      hindi: "मुझे अच्छे रेस्तराँ कहाँ मिल सकते हैं?",
      category: "Travel"
    },
    {
      english: "How much does this tour cost?",
      hindi: "इस टूर की कितनी लागत है?",
      category: "Booking"
    },
    {
      english: "The weather is beautiful today",
      hindi: "आज मौसम बहुत सुंदर है",
      category: "General"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500/20 to-red-500/20 border-b border-orange-500/20">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-6">
            <div className="flex justify-center items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                <Mic className="w-8 h-8 text-white" />
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400" />
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                <Languages className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Voice
              </span>{' '}
              to{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Translation
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Speak naturally in English or Hindi and get instant, accurate translations. 
              Perfect for tourists, locals, and businesses in Jharkhand.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Badge variant="outline" className="px-4 py-2 bg-orange-500/10 border-orange-500/30 text-orange-400">
                <Volume2 className="w-4 h-4 mr-2" />
                Real-time Speech Recognition
              </Badge>
              <Badge variant="outline" className="px-4 py-2 bg-blue-500/10 border-blue-500/30 text-blue-400">
                <Globe className="w-4 h-4 mr-2" />
                13+ Indian Languages
              </Badge>
              <Badge variant="outline" className="px-4 py-2 bg-green-500/10 border-green-500/30 text-green-400">
                <Zap className="w-4 h-4 mr-2" />
                Instant Translation
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Mode Selector */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-xl p-1">
            <Button
              onClick={() => setDemoMode('translator')}
              variant={demoMode === 'translator' ? 'default' : 'ghost'}
              className={`px-6 py-2 ${
                demoMode === 'translator'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Languages className="w-4 h-4 mr-2" />
              Voice + Translation
            </Button>
            <Button
              onClick={() => setDemoMode('voice-only')}
              variant={demoMode === 'voice-only' ? 'default' : 'ghost'}
              className={`px-6 py-2 ${
                demoMode === 'voice-only'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Mic className="w-4 h-4 mr-2" />
              Voice Only
            </Button>
          </div>
        </div>

        {/* Main Demo Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Demo Component */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-600">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  {demoMode === 'translator' ? (
                    <>
                      <MessageSquare className="w-5 h-5 text-orange-400" />
                      <span>Live Demo: Speech-to-Text + Translation</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-5 h-5 text-orange-400" />
                      <span>Live Demo: Speech-to-Text Only</span>
                    </>
                  )}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {demoMode === 'translator'
                    ? 'Speak in English or Hindi and see both transcription and translation in real-time.'
                    : 'Test the speech recognition capabilities without translation.'}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {demoMode === 'translator' ? (
                  <VoiceTranslator
                    onTranscript={handleTranscript}
                    onTranslation={handleTranslation}
                    initialSpeechLanguage="en-US"
                    initialTargetLanguage="hi"
                    autoTranslate={true}
                    className="w-full"
                  />
                ) : (
                  <VoiceInput
                    onTranscript={handleTranscript}
                    initialLanguage="en-US"
                    className="w-full"
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* Microphone Status */}
            {(!micStatus?.available || micStatus?.error) && (
              <MicrophoneTroubleshoot 
                onStatusChange={handleMicrophoneStatus}
                className="w-full"
              />
            )}
            {/* Current Session Info */}
            {(transcript || translation) && (
              <Card className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm border-slate-600">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center space-x-2">
                    <Play className="w-4 h-4 text-green-400" />
                    <span>Current Session</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {transcript && (
                    <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                      <p className="text-xs font-medium text-orange-400 mb-1">Speech Input</p>
                      <p className="text-gray-300 text-sm">{transcript}</p>
                    </div>
                  )}
                  
                  {translation && (
                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <p className="text-xs font-medium text-blue-400 mb-1">Translation</p>
                      <p className="text-gray-300 text-sm">{translation.translatedText}</p>
                      {translation.detectedLanguage && (
                        <p className="text-xs text-gray-400 mt-1">
                          Detected: {translation.detectedLanguage}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Features */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-600">
              <CardHeader>
                <CardTitle className="text-white text-lg">Key Features</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <Volume2 className="w-5 h-5 text-orange-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">Real-time Recognition</h4>
                    <p className="text-gray-400 text-sm">Instant speech-to-text conversion</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Languages className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">Multi-language Support</h4>
                    <p className="text-gray-400 text-sm">13+ Indian languages supported</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">Instant Translation</h4>
                    <p className="text-gray-400 text-sm">Powered by Google Translate API</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Globe className="w-5 h-5 text-purple-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">Tourism Focused</h4>
                    <p className="text-gray-400 text-sm">Optimized for travel conversations</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Example Phrases */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-600">
              <CardHeader>
                <CardTitle className="text-white text-lg">Try These Phrases</CardTitle>
                <CardDescription className="text-gray-400">
                  Click to see example translations
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                {demoExamples.map((example, index) => (
                  <div key={index} className="p-3 bg-slate-700/50 border border-slate-600/50 rounded-lg hover:bg-slate-700/70 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-xs px-2 py-1 bg-slate-600/50 border-slate-500 text-gray-300">
                        {example.category}
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm mb-2 group-hover:text-white transition-colors">
                      {example.english}
                    </p>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                      {example.hindi}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border-slate-600">
            <CardHeader>
              <CardTitle className="text-white text-2xl text-center">How to Use</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <Mic className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white text-xl font-semibold">1. Click & Speak</h3>
                  <p className="text-gray-400">
                    Click the microphone button and start speaking clearly in English or Hindi.
                  </p>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Languages className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white text-xl font-semibold">2. Choose Language</h3>
                  <p className="text-gray-400">
                    Select your target language from the dropdown menu for translation.
                  </p>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white text-xl font-semibold">3. Get Results</h3>
                  <p className="text-gray-400">
                    See your speech transcribed and translated instantly with copy options.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}