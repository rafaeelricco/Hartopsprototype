// =============================================================================
// Shared definitions for Account Profile data models
// Imported by both ops and staff platforms to ensure schema consistency
// =============================================================================

export interface AccountProfile {
  venueSubType?: string; // e.g., "bar", "restaurant", "club", "liquor-store", "grocery"
  displayCount?: number; // Number of physical display units acting as secondary placement
  coldBoxCount?: number; // Number of coolers/refrigeration units
  hasWindows?: boolean; // Whether the venue has street-facing windows (visibility)
  shelfFacings?: number; // Number of shelf slots allocated to brand products
  backbarPresence?: boolean; // Whether products are visibly stocked behind the bar (on-premise)
  menuPlacement?: boolean; // Whether products are listed on the cocktail/drinks menu
  footTrafficEstimate?: "low" | "medium" | "high";
  notes?: string; // Free-text observations from surveys
  lastSurveyDate?: string;
}

export interface Account {
  id: string;
  name: string;
  chain?: string; // E.g., "Total Wine", null implies independent
  type: "on-premise" | "off-premise";
  status: "active" | "inactive" | "prospect";

  // Location / Geography (critical for matching/routing)
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;

  // Contact info
  contactName: string;
  contactPhone: string;
  contactEmail?: string;

  // Distributor cross-references (Industry standard identifiers)
  // Mapping of distributorName -> local ID in distributor's system
  distributorAccountIds?: Record<string, string>;

  // Venue Characteristics / AI Profile Inputs
  profile: AccountProfile;

  // Activity Stats
  eventsHosted: number;
  lastEventDate?: string;

  createdAt: string;
  updatedAt: string;
}
