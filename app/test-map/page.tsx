"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function TestMapPage() {
  const [apiKeyStatus, setApiKeyStatus] = useState<'checking' | 'valid' | 'invalid' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    console.log('API Key:', apiKey);
    console.log('API Key length:', apiKey?.length);
    console.log('API Key starts with AIza:', apiKey?.startsWith('AIza'));
    
    if (!apiKey) {
      setApiKeyStatus('invalid');
      setErrorMessage('No API key found');
      return;
    }

    if (apiKey.includes('your-') || apiKey === 'AIzaSyCt673xUNzOyptAU4YW_NMIuM7ChbeQE0g') {
      setApiKeyStatus('invalid');
      setErrorMessage('API key appears to be a placeholder or example key');
      return;
    }

    if (!apiKey.startsWith('AIza')) {
      setApiKeyStatus('invalid');
      setErrorMessage('API key format is incorrect');
      return;
    }

    // Try to load Google Maps to test the API key
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setApiKeyStatus('valid');
      setMapLoaded(true);
      
      // Try to create a simple map
      if (window.google && window.google.maps) {
        const mapDiv = document.getElementById('test-map');
        if (mapDiv) {
          new window.google.maps.Map(mapDiv, {
            center: { lat: 23.6102, lng: 85.2799 },
            zoom: 8,
          });
        }
      }
    };

    script.onerror = () => {
      setApiKeyStatus('error');
      setErrorMessage('Failed to load Google Maps script - API key might be invalid or billing not enabled');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
      if (existingScript && existingScript === script) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Google Maps API Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* API Key Status */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">API Key Status</h2>
              
              <div className="flex items-center space-x-2 mb-4">
                {apiKeyStatus === 'checking' && (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    <span>Checking API key...</span>
                  </>
                )}
                
                {apiKeyStatus === 'valid' && (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-green-600">API key is valid and working</span>
                  </>
                )}
                
                {(apiKeyStatus === 'invalid' || apiKeyStatus === 'error') && (
                  <>
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <span className="text-red-600">API key issue: {errorMessage}</span>
                  </>
                )}
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p><strong>API Key:</strong> {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? 'Present' : 'Missing'}</p>
                <p><strong>Length:</strong> {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.length || 0} characters</p>
                <p><strong>Starts with AIza:</strong> {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.startsWith('AIza') ? 'Yes' : 'No'}</p>
              </div>
            </CardContent>
          </Card>

          {/* Map Test */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Map Test</h2>
              
              <div id="test-map" className="w-full h-64 bg-gray-100 rounded-lg border">
                {!mapLoaded && (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-500">
                      {apiKeyStatus === 'checking' ? 'Loading...' : 
                       apiKeyStatus === 'valid' ? 'Map should load here' : 
                       'Map cannot load - check API key'}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <div className="prose max-w-none">
              <p>If the API key is not working, you need to:</p>
              <ol>
                <li>Get a valid Google Maps API key from Google Cloud Console</li>
                <li>Enable the Maps JavaScript API</li>
                <li>Enable billing for your Google Cloud project</li>
                <li>Update the NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env.local file</li>
              </ol>
              
              <p className="mt-4">
                <strong>Current API key in .env.local:</strong><br />
                <code className="bg-gray-100 px-2 py-1 rounded">
                  {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'Not set'}
                </code>
              </p>
              
              <p className="mt-4">
                If you don't have a valid API key, the map page will automatically fall back 
                to a static interactive map that works without Google Maps.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}