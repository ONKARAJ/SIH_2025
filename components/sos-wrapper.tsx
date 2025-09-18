"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useGeolocation } from "@/hooks/useGeolocation";
import {
  AlertTriangle,
  Ambulance,
  ShieldAlert,
  X,
  MapPin,
  Navigation as NavigationIcon,
  Phone,
  ExternalLink,
  Car,
  RefreshCw
} from "lucide-react";

// Common Jharkhand cities for quick selection
const COMMON_CITIES = [
  "Ranchi",
  "Jamshedpur",
  "Dhanbad",
  "Bokaro",
  "Deoghar",
  "Hazaribagh",
  "Giridih",
  "Dumka",
  "Chaibasa",
  "Khunti",
];

// Utility: load Google Maps JS API with places + geometry
function loadGoogleMaps(apiKey?: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("No window"));
    if ((window as any).google && (window as any).google.maps) return resolve();

    if (!apiKey) {
      reject(new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is missing"));
      return;
    }

    const existing = document.querySelector(
      'script[src^="https://maps.googleapis.com/maps/api/js"]'
    ) as HTMLScriptElement | null;

    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", (e) => reject(e));
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = (e) => reject(e);
    document.head.appendChild(script);
  });
}

// Types
type LatLng = { lat: number; lng: number };

type EmergencyType = "fuel" | "medical" | "police" | null;

interface PlaceItem {
  place_id: string;
  name: string;
  address?: string;
  lat: number;
  lng: number;
  distanceMeters?: number;
  phone?: string;
  icon?: string;
  types?: string[];
}

// Strict Jharkhand bounds (from project config)
const JHARKHAND_BOUNDS = {
  north: 25.4333,
  south: 21.9667,
  east: 87.9167,
  west: 83.3167,
};
const isWithinJharkhand = (lat: number, lng: number) =>
  lat >= JHARKHAND_BOUNDS.south &&
  lat <= JHARKHAND_BOUNDS.north &&
  lng >= JHARKHAND_BOUNDS.west &&
  lng <= JHARKHAND_BOUNDS.east;

// Toggle: limit all SOS results to Jharkhand (default OFF so it works everywhere)
// You can toggle this via the header button in the SOS panel
type RestrictState = boolean;

export function SOSWrapper() {
  const [open, setOpen] = useState(false);
  const [selectedEmergency, setSelectedEmergency] = useState<EmergencyType>(null);

  // Inputs
  const [toText, setToText] = useState("");
  const [destLatLng, setDestLatLng] = useState<LatLng | null>(null);
  // Current location textbox
  const [currentLatLng, setCurrentLatLng] = useState<LatLng | null>(null);
  const [currentText, setCurrentText] = useState("");

  // Results
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<PlaceItem[]>([]);

  // Google Maps readiness
  const [mapsReady, setMapsReady] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_ALL_SOS_TRANSLATOR_KEY;

  // Restriction toggle (Jharkhand-only)
  const [restrictToJharkhand, setRestrictToJharkhand] = useState<RestrictState>(false);

  // Autocomplete refs
  const toInputRef = useRef<HTMLInputElement>(null);

  // Geolocation
  const {
    position,
    loading: geoLoading,
    error: geoError,
    requestLocation,
    getCurrentLocationName,
  } = useGeolocation();

  // Open/close helpers
  const closePanel = () => {
    setOpen(false);
    setTimeout(() => {
      // Reset state when fully closed
      setSelectedEmergency(null);
      setResults([]);
      setError(null);
      setLoading(false);
    }, 250);
  };

  const overlayRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!open) return;
      const panel = document.getElementById("sos-panel");
      if (!panel) return;
      if (panel.contains(e.target as Node)) return;
      // click outside panel closes
      closePanel();
    };
    if (open) {
      setTimeout(() => document.addEventListener("mousedown", handler), 0);
    }
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) closePanel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Load Google Maps when opening
  useEffect(() => {
    if (!open) return;
    setError(null);
    loadGoogleMaps(apiKey)
      .then(() => setMapsReady(true))
      .catch((e) => {
        console.error("Maps load failed", e);
        setMapsReady(false);
        setError("Google Maps failed to load. Check API key and internet connection.");
      });
  }, [open, apiKey]);

  // Setup Autocomplete after maps ready
  useEffect(() => {
    if (!mapsReady) return;

    const gmaps = (window as any).google?.maps;
    let opts: any = {};
    if (restrictToJharkhand) {
      const bounds = new gmaps.LatLngBounds(
        new gmaps.LatLng(JHARKHAND_BOUNDS.south, JHARKHAND_BOUNDS.west),
        new gmaps.LatLng(JHARKHAND_BOUNDS.north, JHARKHAND_BOUNDS.east)
      );
      // Bias to Jharkhand + India
      opts = { componentRestrictions: { country: "in" }, bounds, strictBounds: false };
    }

    let toAuto: any;

    if (toInputRef.current && (window as any).google?.maps?.places) {
      toAuto = new (window as any).google.maps.places.Autocomplete(
        toInputRef.current,
        opts
      );
      toAuto.addListener("place_changed", () => {
        const place = toAuto.getPlace();
        if (place?.geometry?.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          setDestLatLng({ lat, lng });
          setToText(place.formatted_address || place.name || toText);
        }
      });
    }

    return () => {
      // No explicit cleanup API for Autocomplete
    };
  }, [mapsReady, restrictToJharkhand]);


  // Update the dedicated Current Location textbox using device GPS
  const updateCurrentLocation = async () => {
    try {
      const ok = position ? true : await requestLocation();
      if (!ok && !position) return;
      const p = position || null;
      if (p) {
        const coords = { lat: p.latitude, lng: p.longitude };
        setCurrentLatLng(coords);
        try {
          const name = await getCurrentLocationName({ latitude: p.latitude, longitude: p.longitude, accuracy: p.accuracy });
          setCurrentText(name || `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`);
        } catch {
          setCurrentText(`${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Keep the Current Location textbox in sync if permission already granted
  useEffect(() => {
    const sync = async () => {
      if (position) {
        const coords = { lat: position.latitude, lng: position.longitude };
        setCurrentLatLng(coords);
        if (!currentText) {
          try {
            const name = await getCurrentLocationName({ latitude: position.latitude, longitude: position.longitude, accuracy: position.accuracy });
            setCurrentText(name || `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`);
          } catch {
            setCurrentText(`${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`);
          }
        }
      }
    };
    // no need to await; best-effort
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    sync();
  }, [position]);

  // Quick action: set Traveling From to the current location textbox (or GPS)


  // Helpers
  const createPlacesService = (): any => {
    const div = document.createElement("div");
    return new (window as any).google.maps.places.PlacesService(div);
  };

  const computeDistanceMeters = (a: LatLng, b: LatLng): number => {
    if ((window as any).google?.maps?.geometry?.spherical) {
      const p1 = new (window as any).google.maps.LatLng(a.lat, a.lng);
      const p2 = new (window as any).google.maps.LatLng(b.lat, b.lng);
      return (window as any).google.maps.geometry.spherical.computeDistanceBetween(p1, p2);
    }
    // fallback haversine
    const R = 6371000;
    const toRad = (x: number) => (x * Math.PI) / 180;
    const dLat = toRad(b.lat - a.lat);
    const dLng = toRad(b.lng - a.lng);
    const s1 =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(a.lat)) *
        Math.cos(toRad(b.lat)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(s1), Math.sqrt(1 - s1));
    return R * c;
  };

  // Core search functions
  const findFuelAlongRoute = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      if (!mapsReady) throw new Error("Maps not ready");

      const gmaps = (window as any).google.maps;
      const directionsService = new gmaps.DirectionsService();

      const origin: any = currentLatLng
        ? currentLatLng
        : position
        ? { lat: position.latitude, lng: position.longitude }
        : null;
      const destination: any = destLatLng ? destLatLng : toText || null;

      if (!origin || !destination) {
        setError("Please enable location (Current Location) and provide a destination.");
        setLoading(false);
        return;
      }

      const directionsReq: any = {
        origin,
        destination,
        travelMode: gmaps.TravelMode.DRIVING,
        provideRouteAlternatives: false,
      };

      const dirRes = await new Promise<any>((resolve, reject) => {
        directionsService.route(directionsReq, (res: any, status: any) => {
          if (status === gmaps.DirectionsStatus.OK) resolve(res);
          else reject(new Error(`Directions error: ${status}`));
        });
      });

      const route = dirRes.routes?.[0];
      if (!route) throw new Error("No route found");

      const path: any[] = route.overview_path || [];
      if (!path.length) throw new Error("No route path available");

      // Sample up to ~25 points along the route
      const samples: LatLng[] = [];
      const step = Math.max(1, Math.floor(path.length / 25));
      for (let i = 0; i < path.length; i += step) {
        const p = path[i];
        samples.push({ lat: p.lat(), lng: p.lng() });
      }

      const service = createPlacesService();
      const dedupe = new Map<string, PlaceItem>();

      // Helper to query around a point
      const queryAround = (center: LatLng) =>
        new Promise<void>((resolve) => {
          service.nearbySearch(
            {
              location: center,
              radius: 3000, // 3km around sampled point
              type: "gas_station",
              keyword: "petrol pump|fuel|gas station",
              openNow: false,
            },
            (places: any[], status: any) => {
              if (status === (window as any).google.maps.places.PlacesServiceStatus.OK && places) {
                places.forEach((pl: any) => {
                  if (!pl.place_id || dedupe.has(pl.place_id)) return;
                  const loc = pl.geometry?.location;
                  if (!loc) return;
                  const lat = loc.lat();
                  const lng = loc.lng();
                  if (restrictToJharkhand && !isWithinJharkhand(lat, lng)) {
                    return; // skip places outside Jharkhand when restricted
                  }
                  const item: PlaceItem = {
                    place_id: pl.place_id,
                    name: pl.name,
                    address: pl.vicinity || pl.formatted_address,
                    lat,
                    lng,
                    types: pl.types,
                  };
                  dedupe.set(pl.place_id, item);
                });
              }
              resolve();
            }
          );
        });

      // Limit to first 20 samples to avoid rate limiting
      const limited = samples.slice(0, 20);
      for (const s of limited) {
        // eslint-disable-next-line no-await-in-loop
        await queryAround(s);
      }

      let list = Array.from(dedupe.values());
      if (origin) {
        list = list.map((it) => ({
          ...it,
          distanceMeters: computeDistanceMeters(origin, { lat: it.lat, lng: it.lng }),
        }));
        list.sort((a, b) => (a.distanceMeters || 0) - (b.distanceMeters || 0));
      }

      setResults(list);
    } catch (e: any) {
      console.error(e);
      setError(e?.message || "Failed to fetch fuel stations.");
    } finally {
      setLoading(false);
    }
  }, [mapsReady, currentLatLng, destLatLng, position]);

  const findNearby = useCallback(
    async (types: string[], radius = 5000, enrichPhone = false) => {
      setLoading(true);
      setError(null);
      setResults([]);

      try {
        if (!mapsReady) throw new Error("Maps not ready");
        const gmaps = (window as any).google.maps;
        const service = createPlacesService();

        const center: LatLng | null = currentLatLng || (position ? { lat: position.latitude, lng: position.longitude } : null);
        if (!center) {
          setError("Please enable location to fetch nearby places.");
          setLoading(false);
          return;
        }

        // Query each type separately and merge
        const dedupe = new Map<string, PlaceItem>();

        const queryType = (type: string) =>
          new Promise<void>((resolve) => {
            service.nearbySearch(
              { location: center, radius, type },
              (places: any[], status: any) => {
                if (status === gmaps.places.PlacesServiceStatus.OK && places) {
                  places.forEach((pl: any) => {
                    if (!pl.place_id || dedupe.has(pl.place_id)) return;
                    const loc = pl.geometry?.location;
                    if (!loc) return;
                    dedupe.set(pl.place_id, {
                      place_id: pl.place_id,
                      name: pl.name,
                      address: pl.vicinity || pl.formatted_address,
                      lat: loc.lat(),
                      lng: loc.lng(),
                      types: pl.types,
                    });
                  });
                }
                resolve();
              }
            );
          });

        for (const t of types) {
          // eslint-disable-next-line no-await-in-loop
          await queryType(t);
        }

        let list = Array.from(dedupe.values());

        // Optionally restrict to Jharkhand
        if (restrictToJharkhand) {
          list = list.filter((it) => isWithinJharkhand(it.lat, it.lng));
        }

        // Optionally enrich with phone numbers via getDetails (limited to first 12)
        if (enrichPhone && list.length) {
          const detailed: PlaceItem[] = [];
          const limiter = list.slice(0, 12);
          await Promise.all(
            limiter.map(
              (item) =>
                new Promise<void>((resolve) => {
                  service.getDetails(
                    { placeId: item.place_id, fields: ["formatted_phone_number", "international_phone_number", "name", "formatted_address", "geometry"] },
                    (details: any, status: any) => {
                      if (status === gmaps.places.PlacesServiceStatus.OK && details) {
                        const loc = details.geometry?.location;
                        detailed.push({
                          ...item,
                          name: details.name || item.name,
                          address: details.formatted_address || item.address,
                          lat: loc ? loc.lat() : item.lat,
                          lng: loc ? loc.lng() : item.lng,
                          phone: details.formatted_phone_number || details.international_phone_number,
                        });
                      } else {
                        detailed.push(item);
                      }
                      resolve();
                    }
                  );
                })
            )
          );
          // Replace only the enriched subset at the top
          list = [...detailed, ...list.slice(12)];
        }

        // Sort by distance (from center)
        if (center) {
          list = list
            .map((it) => ({
              ...it,
              distanceMeters: computeDistanceMeters(center, { lat: it.lat, lng: it.lng }),
            }))
            .sort((a, b) => (a.distanceMeters || 0) - (b.distanceMeters || 0));
        }

        // If we ended up with nothing due to Jharkhand restriction but user center outside, show hint
        if (restrictToJharkhand && list.length === 0 && center && !isWithinJharkhand(center.lat, center.lng)) {
          setError(
            "Your current location is outside Jharkhand. Results are restricted to Jharkhand. Disable restriction or move within state bounds."
          );
        }

        setResults(list);
      } catch (e: any) {
        console.error(e);
        setError(e?.message || "Failed to fetch nearby places.");
      } finally {
        setLoading(false);
      }
    },
    [mapsReady, currentLatLng, position]
  );

  // Emergency handlers
  const onFuel = async () => {
    setSelectedEmergency("fuel");
    await findFuelAlongRoute();
  };

  const onMedical = async () => {
    setSelectedEmergency("medical");
    await findNearby(["hospital", "pharmacy"], 8000, false);
  };

  const onPolice = async () => {
    setSelectedEmergency("police");
    await findNearby(["police"], 10000, true);
  };

  // Build directions URL
  const directionsUrl = useMemo(() => {
    const originParam = currentLatLng
      ? `${currentLatLng.lat},${currentLatLng.lng}`
      : position
      ? `${position.latitude},${position.longitude}`
      : "";
    const destParam = destLatLng
      ? `${destLatLng.lat},${destLatLng.lng}`
      : encodeURIComponent(toText || "");
    if (!originParam || !destParam) return null;
    return `https://www.google.com/maps/dir/?api=1&origin=${originParam}&destination=${destParam}`;
  }, [currentLatLng, destLatLng, toText, position]);

  const formatDistance = (m?: number) => {
    if (!m && m !== 0) return "";
    if (m < 1000) return `${Math.round(m)} m`;
    return `${(m / 1000).toFixed(1)} km`;
  };

  const Helplines = () => (
    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
      <a href="tel:112" className="flex items-center gap-2 p-2 rounded-md bg-red-50 hover:bg-red-100 text-red-700 transition">
        <Phone className="w-4 h-4" /> 112 • All Emergencies (India)
      </a>
      <a href="tel:108" className="flex items-center gap-2 p-2 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition">
        <Phone className="w-4 h-4" /> 108 • Ambulance
      </a>
      <a href="tel:100" className="flex items-center gap-2 p-2 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 transition">
        <Phone className="w-4 h-4" /> 100 • Police (Legacy)
      </a>
      <a href="tel:181" className="flex items-center gap-2 p-2 rounded-md bg-purple-50 hover:bg-purple-100 text-purple-700 transition">
        <Phone className="w-4 h-4" /> 181 • Women Helpline
      </a>
      <a href="tel:104" className="flex items-center gap-2 p-2 rounded-md bg-orange-50 hover:bg-orange-100 text-orange-700 transition">
        <Phone className="w-4 h-4" /> 104 • Health Helpline
      </a>
    </div>
  );

  return (
    <>
      {/* Floating SOS Button */}
      {!open && (
        <Button
          onClick={() => setOpen(true)}
          className="fixed bottom-24 right-4 h-14 w-14 rounded-full shadow-lg hover:shadow-xl z-50 bg-red-600 hover:bg-red-700"
          size="lg"
        >
          <AlertTriangle className="h-6 w-6 text-white" />
          <span className="sr-only">Open SOS</span>
        </Button>
      )}

      {/* Overlay */}
      {open && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 pointer-events-auto"
          onClick={closePanel}
        />
      )}

      {/* Sliding Panel */}
      <div
        id="sos-panel"
className={`fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-[min(640px,100vw-1rem)] transition-transform duration-300 ${
          open ? "translate-y-0 pointer-events-auto" : "translate-y-full pointer-events-none"
        }`}
      >
        <Card className="mx-2 mb-2 rounded-t-2xl shadow-2xl border border-border bg-background overflow-hidden bg-white dark:bg-background border-gray-200 dark:border-border">
          <CardHeader className="px-4 py-3 border-b border-border bg-white/90 dark:bg-background/90 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <CardTitle className="text-base">Emergency SOS</CardTitle>
                  <div className="text-xs text-muted-foreground">Quick access to nearby help and services</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={restrictToJharkhand ? "secondary" : "outline"}
                  onClick={() => setRestrictToJharkhand(!restrictToJharkhand)}
                  title="Toggle Jharkhand-only results"
                >
                  {restrictToJharkhand ? "Jharkhand-only: ON" : "Jharkhand-only: OFF"}
                </Button>
                {directionsUrl && (
                  <Button asChild size="sm" variant="outline" className="hidden sm:flex">
                    <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                      <NavigationIcon className="w-4 h-4 mr-1" /> Directions
                    </a>
                  </Button>
                )}
                <Button size="sm" variant="ghost" onClick={closePanel} title="Close">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-4 py-3 bg-white/80 dark:bg-background/80">
            {/* API Key status */}
            {!apiKey && (
              <div className="mb-3 rounded-md border border-amber-300 bg-amber-50 text-amber-900 p-3 text-sm">
                Google Maps API key is not configured. Some SOS features will be limited.
              </div>
            )}

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Traveling Destination */}
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-muted-foreground">Traveling Destination</label>
                <div className="flex gap-2 mt-1.5 items-center">
                  <Input
                    ref={toInputRef}
                    value={toText}
                    onChange={(e) => setToText(e.target.value)}
                    placeholder="Enter destination or pick city"
                    className="flex-1"
                  />
                </div>
                <select
                  className="mt-2 w-full border border-input rounded-md px-2 py-1 text-sm bg-background"
                  value=""
                  onChange={(e) => {
                    const city = e.target.value;
                    setToText(city);
                    setDestLatLng(null);
                  }}
                >
                  <option value="" disabled>
                    Select city (optional)
                  </option>
                  {COMMON_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}, Jharkhand
                    </option>
                  ))}
                </select>
            </div>
            {/* Current Location Textbox */}
            <div className="sm:col-span-2">
                <label className="text-xs font-medium text-muted-foreground">Current Location</label>
                <div className="flex gap-2 mt-1.5">
                  <Input
                    value={currentText || (currentLatLng ? `${currentLatLng.lat.toFixed(4)}, ${currentLatLng.lng.toFixed(4)}` : "")}
                    onChange={(e) => setCurrentText(e.target.value)}
                    placeholder="Tap the pin to fetch your current location"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={updateCurrentLocation}
                    title="Fetch current location"
                  >
                    <MapPin className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={updateCurrentLocation}
                    title="Refresh location"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Location status */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {position ? (
                <Badge className="bg-green-600 text-white">GPS Active</Badge>
              ) : (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => requestLocation()}
                  disabled={geoLoading}
                >
                  <MapPin className={`w-4 h-4 mr-1 ${geoLoading ? "animate-pulse" : ""}`} />
                  Enable Location
                </Button>
              )}
              {geoError && (
                <span className="text-xs text-destructive">{geoError}</span>
              )}
            </div>

            {/* Emergency options */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3" role="group" aria-label="Emergency options">
              <button
                onClick={onFuel}
                className={`rounded-xl p-4 text-left border transition shadow-sm hover:shadow-md ${
                  selectedEmergency === "fuel" ? "border-red-500 bg-red-50" : "border-border bg-card"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center shadow">
                    <Car className="w-5 h-5" />
                  </div>
                  <div className="font-semibold">Fuel Emergency</div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Find fuel stations along your route
                </div>
              </button>

              <button
                onClick={onMedical}
                className={`rounded-xl p-4 text-left border transition shadow-sm hover:shadow-md ${
                  selectedEmergency === "medical" ? "border-emerald-600 bg-emerald-50" : "border-border bg-card"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow">
                    <Ambulance className="w-5 h-5" />
                  </div>
                  <div className="font-semibold">Medical Emergency</div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Helplines and nearby hospitals/dispensaries
                </div>
              </button>

              <button
                onClick={onPolice}
                className={`rounded-xl p-4 text-left border transition shadow-sm hover:shadow-md ${
                  selectedEmergency === "police" ? "border-blue-600 bg-blue-50" : "border-border bg-card"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div className="font-semibold">Police Help</div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Nearby police stations with contacts
                </div>
              </button>
            </div>

            {/* Results / Messages */}
            <div className="mt-4">
              {selectedEmergency === "medical" && <Helplines />}

              {loading && (
                <div className="mt-4 text-sm text-muted-foreground">Loading nearby services...</div>
              )}

              {error && (
                <div className="mt-4 text-sm text-destructive">{error}</div>
              )}

              {!loading && !error && results.length > 0 && (
                <div className="mt-3 max-h-[40vh] overflow-auto pr-1">
                  <ul className="space-y-2">
                    {results.map((r) => {
                      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${r.lat},${r.lng}`
                      )}&query_place_id=${r.place_id}`;
                      return (
                        <li key={r.place_id} className="border rounded-lg p-3 bg-card">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="font-medium leading-tight">{r.name}</div>
                              {r.address && (
                                <div className="text-xs text-muted-foreground mt-0.5">{r.address}</div>
                              )}
                              {typeof r.distanceMeters === "number" && (
                                <div className="text-[11px] text-muted-foreground mt-1">
                                  {formatDistance(r.distanceMeters)} away
                                </div>
                              )}
                              {r.phone && (
                                <div className="text-sm mt-1">
                                  <a className="text-blue-600 hover:underline" href={`tel:${r.phone.replace(/\s/g, "")}`}>
                                    <Phone className="w-3.5 h-3.5 inline mr-1" /> {r.phone}
                                  </a>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col gap-2 flex-shrink-0">
                              <Button asChild variant="outline" size="sm">
                                <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-4 h-4 mr-1" /> Map
                                </a>
                              </Button>
                              <Button asChild variant="secondary" size="sm">
                                <a href={`https://www.google.com/maps/dir/?api=1&destination=${r.lat},${r.lng}`}
                                  target="_blank" rel="noopener noreferrer">
                                  <NavigationIcon className="w-4 h-4 mr-1" /> Go
                                </a>
                              </Button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {!loading && !error && selectedEmergency && results.length === 0 && (
                <div className="mt-4 text-sm text-muted-foreground">
                  No results found yet. Try adjusting your current location/destination or enabling GPS.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}