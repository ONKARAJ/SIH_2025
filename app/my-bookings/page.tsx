"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MyBookingsRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new comprehensive bookings page
    router.replace("/profile/bookings");
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
        <p>Redirecting to your bookings...</p>
      </div>
    </div>
  );
}
