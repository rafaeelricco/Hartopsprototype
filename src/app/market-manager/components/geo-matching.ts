// Geography-based brandAmbassador-event matching utility
// Uses Haversine formula with mock lat/lng for prototype distance calculations

import type { BrandAmbassador } from "./brand-ambassador-roster-data";
import type { Activity } from "./activities-data";

/* ─── Haversine distance (miles) ─── */

const EARTH_RADIUS_MI = 3958.8;

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return EARTH_RADIUS_MI * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* ─── BrandAmbassador-to-venue distance ─── */

export function getDistanceToVenue(
  brandAmbassador: BrandAmbassador,
  event: Activity,
): number {
  const eduCoords =
    brandAmbassador.homeAddress?.lat != null && brandAmbassador.homeAddress?.lng != null
      ? { lat: brandAmbassador.homeAddress.lat, lng: brandAmbassador.homeAddress.lng }
      : null;
  const venueCoords =
    event.venueLat != null && event.venueLng != null
      ? { lat: event.venueLat, lng: event.venueLng }
      : null;

  if (eduCoords && venueCoords) {
    return (
      Math.round(
        haversineDistance(
          eduCoords.lat,
          eduCoords.lng,
          venueCoords.lat,
          venueCoords.lng,
        ) * 10,
      ) / 10
    );
  }
  // Fallback to static distanceMiles
  return brandAmbassador.distanceMiles ?? 50;
}

/* ─── Distance label helpers ─── */

export type DistanceTier = "nearby" | "moderate" | "far";

export function getDistanceTier(miles: number): DistanceTier {
  if (miles < 10) return "nearby";
  if (miles <= 25) return "moderate";
  return "far";
}

export const distanceTierConfig: Record<
  DistanceTier,
  { label: string; className: string }
> = {
  nearby: {
    label: "Nearby",
    className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  moderate: {
    label: "Moderate",
    className: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
  far: {
    label: "Far",
    className: "bg-red-500/10 text-red-500 border-red-500/20",
  },
};

/* ─── Availability check ─── */

export function isAvailableOnDate(
  brandAmbassador: BrandAmbassador,
  dateStr: string,
): boolean {
  return brandAmbassador.availability.some(
    (a) => a.date === dateStr && a.slots.length > 0,
  );
}

/* ─── Ranked result type ─── */

export interface RankedBrandAmbassador {
  brandAmbassador: BrandAmbassador;
  distanceToVenue: number;
  distanceTier: DistanceTier;
  availableOnDate: boolean;
  brandMatch: boolean;
}

export function rankByGeography(
  brandAmbassadors: BrandAmbassador[],
  event: Activity,
): RankedBrandAmbassador[] {
  return brandAmbassadors
    .map((brandAmbassador) => {
      const distanceToVenue = getDistanceToVenue(brandAmbassador, event);
      return {
        brandAmbassador,
        distanceToVenue,
        distanceTier: getDistanceTier(distanceToVenue),
        availableOnDate: isAvailableOnDate(brandAmbassador, event.date),
        brandMatch: brandAmbassador.brandCertifications.includes(event.brandName),
      };
    })
    .sort((a, b) => a.distanceToVenue - b.distanceToVenue);
}
