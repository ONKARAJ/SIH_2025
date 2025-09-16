"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { StreetViewDebug } from '@/components/street-view-debug';

function DebugContent() {
  const searchParams = useSearchParams();
  
  const lat = parseFloat(searchParams.get('lat') || '23.6102');
  const lng = parseFloat(searchParams.get('lng') || '85.2799');
  const title = searchParams.get('title') || 'Debug Location';

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Street View Debug & Testing
        </h1>
        
        <StreetViewDebug
          lat={lat}
          lng={lng}
          title={title}
        />
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Use this page to diagnose Street View loading issues and test different coordinates.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DebugStreetViewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading debug panel...</p>
        </div>
      </div>
    }>
      <DebugContent />
    </Suspense>
  );
}