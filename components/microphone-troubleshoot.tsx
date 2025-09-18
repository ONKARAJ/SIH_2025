"use client";

import React, { useState, useEffect } from 'react';
import { AlertCircle, Mic, MicOff, RefreshCw, CheckCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MicrophoneUtils, { type MicrophoneStatus } from '@/lib/microphoneUtils';

interface MicrophoneTroubleshootProps {
  className?: string;
  onStatusChange?: (status: MicrophoneStatus) => void;
}

const MicrophoneTroubleshoot: React.FC<MicrophoneTroubleshootProps> = ({
  className = '',
  onStatusChange
}) => {
  const [micStatus, setMicStatus] = useState<MicrophoneStatus | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const checkMicrophone = async () => {
    setIsChecking(true);
    try {
      const status = await MicrophoneUtils.checkMicrophone();
      setMicStatus(status);
      if (onStatusChange) {
        onStatusChange(status);
      }
    } catch (error) {
      console.error('Error checking microphone:', error);
      setMicStatus({
        available: false,
        permission: 'unknown',
        error: 'Failed to check microphone status'
      });
    } finally {
      setIsChecking(false);
    }
  };

  const requestPermission = async () => {
    setIsChecking(true);
    try {
      const granted = await MicrophoneUtils.requestPermission();
      if (granted) {
        await checkMicrophone();
      } else {
        setMicStatus({
          available: false,
          permission: 'denied',
          error: 'Microphone permission was denied'
        });
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkMicrophone();
  }, []);

  const getStatusIcon = () => {
    if (isChecking) return <RefreshCw className="w-5 h-5 animate-spin text-blue-400" />;
    if (micStatus?.available) return <CheckCircle className="w-5 h-5 text-green-400" />;
    if (micStatus?.permission === 'denied') return <MicOff className="w-5 h-5 text-red-400" />;
    return <AlertCircle className="w-5 h-5 text-yellow-400" />;
  };

  const getStatusMessage = () => {
    if (isChecking) return 'Checking microphone...';
    if (!micStatus) return 'Unknown status';
    
    if (micStatus.available) {
      return 'Microphone is working correctly!';
    }
    
    if (micStatus.permission === 'denied') {
      return 'Microphone access is blocked';
    }
    
    if (micStatus.error) {
      return micStatus.error;
    }
    
    return 'Microphone is not available';
  };

  const getActionButton = () => {
    if (isChecking) return null;
    
    if (micStatus?.available) {
      return (
        <Button onClick={checkMicrophone} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Re-check
        </Button>
      );
    }
    
    if (micStatus?.permission === 'denied' || micStatus?.permission === 'prompt') {
      return (
        <Button onClick={requestPermission} size="sm">
          <Mic className="w-4 h-4 mr-2" />
          Allow Microphone
        </Button>
      );
    }
    
    return (
      <Button onClick={checkMicrophone} size="sm">
        <RefreshCw className="w-4 h-4 mr-2" />
        Check Again
      </Button>
    );
  };

  if (micStatus?.available && !showGuide) {
    return null; // Don't show troubleshoot when mic is working
  }

  return (
    <div className={`${className}`}>
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-600">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            {getStatusIcon()}
            <span>Microphone Status</span>
          </CardTitle>
          <CardDescription className="text-gray-400">
            {getStatusMessage()}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Status Details */}
          {micStatus && !micStatus.available && (
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <p className="text-yellow-300 text-sm font-medium">
                    Microphone Issues Detected
                  </p>
                  <p className="text-yellow-200 text-sm">
                    Permission: {micStatus.permission}
                  </p>
                  {micStatus.error && (
                    <p className="text-yellow-200 text-sm">
                      Error: {micStatus.error}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Action Button */}
          <div className="flex items-center justify-between">
            {getActionButton()}
            
            {!micStatus?.available && (
              <Button
                onClick={() => setShowGuide(!showGuide)}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                <Info className="w-4 h-4 mr-2" />
                {showGuide ? 'Hide Guide' : 'Show Help'}
              </Button>
            )}
          </div>
          
          {/* Troubleshooting Guide */}
          {showGuide && (
            <div className="mt-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
              <h4 className="text-white font-medium mb-3">Troubleshooting Steps:</h4>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start space-x-2">
                  <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs font-mono">1</span>
                  <p>Check if your microphone is connected and working</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs font-mono">2</span>
                  <p>Close other applications that might be using the microphone</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs font-mono">3</span>
                  <p>{MicrophoneUtils.getMicrophoneGuide()}</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs font-mono">4</span>
                  <p>Try refreshing the page after allowing microphone access</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs font-mono">5</span>
                  <p>Use Chrome, Safari, or Edge for best speech recognition support</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Browser Compatibility Note */}
          {!MicrophoneUtils.isSpeechRecognitionSupported() && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-start space-x-2">
                <MicOff className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-red-300 text-sm font-medium">
                    Speech Recognition Not Supported
                  </p>
                  <p className="text-red-200 text-sm mt-1">
                    Your browser doesn't support speech recognition. Please use Chrome, Safari, or Edge.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MicrophoneTroubleshoot;