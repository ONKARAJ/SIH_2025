import React from 'react';
import SpeechTest from '@/components/speech-test';

export default function SpeechTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Speech Recognition Test
          </h1>
          <p className="text-gray-400 text-lg">
            Test the improved speech recognition system with better error handling and auto-restart
          </p>
        </div>
        
        <SpeechTest />
      </div>
    </div>
  );
}