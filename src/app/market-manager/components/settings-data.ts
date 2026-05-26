// =============================================================================
// Settings mock data — Market Manager account profile
// =============================================================================

export interface MarketManagerProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  avatarUrl: string;
}

export const CURRENT_MARKET_MANAGER: MarketManagerProfile = {
  firstName: "Maria",
  lastName: "Lopez",
  email: "maria@hartagency.com",
  phone: "+1 (512) 555-0329",
  role: "Market Manager",
  avatarUrl: "/avatars/maria-lopez.jpg",
};
