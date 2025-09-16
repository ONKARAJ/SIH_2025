"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StreetViewDebugProps {
  lat: number;
  lng: number;
  title: string;
}

export function StreetViewDebug({ lat, lng, title }: StreetViewDebugProps) {
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [testResults, setTestResults] = useState<any>({});

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    const info = {
      apiKey: {
        exists: !!apiKey,
        length: apiKey?.length || 0,
        preview: apiKey ? `${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 4)}` : 'Not found'
      },
      coordinates: {
        lat,
        lng,
        formatted: `${lat.toFixed(6)}, ${lng.toFixed(6)}`
      },
      urls: {
        streetView: `https://www.google.com/maps/embed/v1/streetview?key=${apiKey}&location=${lat},${lng}`,
        mapView: `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${lat},${lng}&zoom=18`,
        directLink: `https://maps.google.com/?q=${lat},${lng}&layer=c`
      },
      timestamp: new Date().toISOString()
    };
    
    setDebugInfo(info);
  }, [lat, lng]);

  const testStreetViewUrl = () => {
    const { apiKey } = debugInfo;
    if (!apiKey.exists) {
      setTestResults(prev => ({
        ...prev,
        urlTest: { success: false, error: 'No API key found' }
      }));
      return;
    }

    // Test the Street View URL
    const testUrl = `https://www.google.com/maps/embed/v1/streetview?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&location=${lat},${lng}`;
    
    setTestResults(prev => ({
      ...prev,
      urlTest: { success: true, url: testUrl, testing: true }
    }));

    // Create a test iframe
    const testFrame = document.createElement('iframe');
    testFrame.src = testUrl;
    testFrame.style.width = '1px';
    testFrame.style.height = '1px';
    testFrame.style.position = 'absolute';
    testFrame.style.left = '-9999px';
    
    testFrame.onload = () => {
      setTestResults(prev => ({
        ...prev,
        urlTest: { 
          ...prev.urlTest, 
          testing: false, 
          loaded: true,
          loadTime: Date.now()
        }
      }));
      document.body.removeChild(testFrame);
    };

    testFrame.onerror = () => {
      setTestResults(prev => ({
        ...prev,
        urlTest: { 
          ...prev.urlTest, 
          testing: false, 
          loaded: false, 
          error: 'Failed to load iframe'
        }
      }));
      document.body.removeChild(testFrame);
    };

    document.body.appendChild(testFrame);

    // Remove after timeout
    setTimeout(() => {
      if (document.body.contains(testFrame)) {
        document.body.removeChild(testFrame);
        setTestResults(prev => ({
          ...prev,
          urlTest: { 
            ...prev.urlTest, 
            testing: false, 
            timeout: true 
          }
        }));
      }
    }, 10000);
  };

  const openInNewTab = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🔧 Street View Debug Panel
          <Badge variant="outline">{title}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* API Key Status */}
        <div>
          <h3 className="font-semibold mb-2">API Key Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Badge variant={debugInfo?.apiKey?.exists ? "default" : "destructive"}>
                {debugInfo?.apiKey?.exists ? "✅ Found" : "❌ Missing"}
              </Badge>
              <p className="text-sm text-gray-600">
                Length: {debugInfo?.apiKey?.length || 0} chars
              </p>
              <p className="text-xs font-mono text-gray-500">
                {debugInfo?.apiKey?.preview || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Coordinates */}
        <div>
          <h3 className="font-semibold mb-2">Coordinates</h3>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-mono text-sm">
              Latitude: {lat.toFixed(8)}
            </p>
            <p className="font-mono text-sm">
              Longitude: {lng.toFixed(8)}
            </p>
            <p className="font-mono text-xs text-gray-600 mt-1">
              Formatted: {debugInfo?.coordinates?.formatted}
            </p>
          </div>
        </div>

        {/* URL Testing */}
        <div>
          <h3 className="font-semibold mb-2">URL Testing</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Button onClick={testStreetViewUrl} size="sm" disabled={!debugInfo?.apiKey?.exists}>
                Test Street View URL
              </Button>
              {testResults?.urlTest?.testing && (
                <Badge variant="secondary">🔄 Testing...</Badge>
              )}
              {testResults?.urlTest?.loaded && (
                <Badge variant="default">✅ Loaded</Badge>
              )}
              {testResults?.urlTest?.error && (
                <Badge variant="destructive">❌ Failed</Badge>
              )}
            </div>

            {testResults?.urlTest?.error && (
              <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                Error: {testResults.urlTest.error}
              </div>
            )}
          </div>
        </div>

        {/* Direct Links */}
        <div>
          <h3 className="font-semibold mb-2">Direct Links (External)</h3>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => openInNewTab(`https://maps.google.com/?q=${lat},${lng}&layer=c&cbll=${lat},${lng}`)}
              className="w-full justify-start"
            >
              🌍 Google Maps Street View
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => openInNewTab(`https://maps.google.com/?q=${lat},${lng}`)}
              className="w-full justify-start"
            >
              🗺️ Google Maps Regular
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => openInNewTab(`https://earth.google.com/web/@${lat},${lng},0a,1000d,35y,0h,0t,0r`)}
              className="w-full justify-start"
            >
              🌎 Google Earth
            </Button>
          </div>
        </div>

        {/* Embed Preview */}
        {debugInfo?.apiKey?.exists && (
          <div>
            <h3 className="font-semibold mb-2">Embed Preview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Street View Embed</h4>
                <div className="border rounded-lg overflow-hidden" style={{ height: '200px' }}>
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/streetview?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&location=${lat},${lng}&heading=0&pitch=0&fov=90`}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Satellite Map Embed</h4>
                <div className="border rounded-lg overflow-hidden" style={{ height: '200px' }}>
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&center=${lat},${lng}&zoom=18&maptype=satellite`}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Raw URLs */}
        <div>
          <h3 className="font-semibold mb-2">Raw URLs</h3>
          <div className="space-y-2 text-xs font-mono bg-gray-50 p-3 rounded-lg">
            <div>
              <strong>Street View:</strong>
              <br />
              <span className="break-all text-blue-600">
                {debugInfo?.urls?.streetView}
              </span>
            </div>
            <div>
              <strong>Map View:</strong>
              <br />
              <span className="break-all text-green-600">
                {debugInfo?.urls?.mapView}
              </span>
            </div>
            <div>
              <strong>Direct Link:</strong>
              <br />
              <span className="break-all text-purple-600">
                {debugInfo?.urls?.directLink}
              </span>
            </div>
          </div>
        </div>

        {/* Troubleshooting Tips */}
        <div>
          <h3 className="font-semibold mb-2">Troubleshooting Tips</h3>
          <div className="text-sm space-y-2 bg-blue-50 p-3 rounded-lg">
            <p>• <strong>Black Screen:</strong> Usually indicates Street View is not available for this location</p>
            <p>• <strong>API Error:</strong> Check if Maps JavaScript API and Maps Embed API are enabled</p>
            <p>• <strong>Permission Error:</strong> Verify domain restrictions in Google Cloud Console</p>
            <p>• <strong>Quota Exceeded:</strong> Check API usage in Google Cloud Console</p>
          </div>
        </div>

        {/* System Info */}
        <div className="text-xs text-gray-500 border-t pt-2">
          Generated at: {debugInfo?.timestamp}
        </div>
      </CardContent>
    </Card>
  );
}