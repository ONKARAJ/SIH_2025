export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col items-center justify-center">
      {/* Animated Spinner */}
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-green-600 font-bold text-xl">🌍</span>
        </div>
      </div>

      {/* Loading text */}
      <p className="mt-6 text-gray-700 text-lg font-medium animate-pulse">
        Loading Jharkhand Interactive Map...
      </p>
      <p className="text-gray-500 text-sm mt-2">
        Please wait while we fetch destinations and routes.
      </p>
    </div>
  );
}
