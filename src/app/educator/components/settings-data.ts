// =============================================================================
// Settings mock data — Educator Manager account profile
// =============================================================================

export interface EducatorManagerProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  avatarUrl: string;
}

export const CURRENT_EDUCATOR_MANAGER: EducatorManagerProfile = {
  firstName: "Maria",
  lastName: "Lopez",
  email: "maria@hartagency.com",
  phone: "+1 (512) 555-0329",
  role: "Educator Manager",
  avatarUrl: "/avatars/maria-lopez.jpg",
};
