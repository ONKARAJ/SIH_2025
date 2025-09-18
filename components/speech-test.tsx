"use client";

import React, { useState } from 'react';
import { Mic, MicOff, Square, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useSpeechRecognition from '@/hooks/useSpeechRecognition';

const SpeechTest: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 19)]);
  };

  const {
    transcript,
    finalTranscript,
    isListening,
    isSupported,
    error,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition({
    language: 'en-US',
    continuous: true,
    interimResults: true,
    onResult: (transcript: string, isFinal: boolean) => {
      addLog(`Result: "${transcript}" (Final: ${isFinal})`);
    },
    onError: (errorMessage: string) => {
      addLog(`Error: ${errorMessage}`);
    }
  });

  const handleStart = () => {
    addLog('User clicked start');
    resetTranscript();
    startListening();
  };

  const handleStop = () => {
    addLog('User clicked stop');
    stopListening();
  };

  const clearLogs = () => {
    setLogs([]);
  };

  if (!isSupported) {
    return (
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-600 max-w-2xl">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center space-x-2">
            <MicOff className="w-5 h-5" />
            <span>Speech Recognition Not Supported</span>
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Mic className="w-5 h-5 text-orange-400" />
            <span>Speech Recognition Test</span>
          </CardTitle>
          <CardDescription className="text-gray-400">
            Test the improved speech recognition with better error handling and auto-restart
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Controls */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleStart}
              disabled={isListening}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Listening
            </Button>
            
            <Button
              onClick={handleStop}
              disabled={!isListening}
              variant="destructive"
            >
              <Square className="w-4 h-4 mr-2" />
              Stop Listening
            </Button>
            
            <Button
              onClick={resetTranscript}
              variant="outline"
              className="text-gray-300"
            >
              Clear Transcript
            </Button>
            
            <Button
              onClick={clearLogs}
              variant="outline"
              className="text-gray-300"
            >
              Clear Logs
            </Button>
          </div>
          
          {/* Status */}
          <div className="flex items-center space-x-4 p-3 bg-slate-700/30 rounded-lg">
            <div className="flex items-center space-x-2">
              {isListening ? (
                <Mic className="w-5 h-5 text-green-400 animate-pulse" />
              ) : (
                <MicOff className="w-5 h-5 text-gray-400" />
              )}
              <span className="text-white font-medium">
                Status: {isListening ? 'Listening' : 'Stopped'}
              </span>
            </div>
          </div>
          
          {/* Transcript */}
          <div className="space-y-3">
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <h4 className="text-blue-400 font-medium mb-2">Current Transcript:</h4>
              <p className="text-white text-sm min-h-[2rem]">
                {transcript || 'No speech detected yet...'}
              </p>
            </div>
            
            {finalTranscript && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h4 className="text-green-400 font-medium mb-2">Final Transcript:</h4>
                <p className="text-white text-sm">
                  {finalTranscript}
                </p>
              </div>
            )}
          </div>
          
          {/* Error */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <h4 className="text-red-400 font-medium mb-2">Error:</h4>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Debug Logs */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-600">
        <CardHeader>
          <CardTitle className="text-white text-lg">Debug Logs</CardTitle>
          <CardDescription className="text-gray-400">
            Real-time logging of speech recognition events
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="bg-black/30 rounded-lg p-4 max-h-64 overflow-y-auto">
            <div className="font-mono text-sm space-y-1">
              {logs.length === 0 ? (
                <p className="text-gray-500">No logs yet. Start listening to see events...</p>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="text-green-400">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpeechTest;