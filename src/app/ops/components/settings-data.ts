// =============================================================================
// Settings mock data — Ops Admin account profile & team
// =============================================================================

export interface OpsAdminProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  avatarUrl: string;
}

export const CURRENT_OPS_ADMIN: OpsAdminProfile = {
  firstName: "Admin",
  lastName: "Hart",
  email: "admin@hartops.com",
  phone: "+1 (512) 555-0100",
  role: "Super Admin",
  avatarUrl: "/avatars/admin-hart.jpg",
};

export interface OpsTeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Pending";
  initials: string;
}

export const TEAM_MEMBERS: OpsTeamMember[] = [
  {
    id: 1,
    name: "Admin Hart",
    email: "admin@hartops.com",
    role: "Super Admin",
    status: "Active",
    initials: "AH",
  },
  {
    id: 2,
    name: "Sarah Chen",
    email: "sarah.chen@hartops.com",
    role: "Admin",
    status: "Active",
    initials: "SC",
  },
  {
    id: 3,
    name: "James Wright",
    email: "james.w@hartops.com",
    role: "Admin",
    status: "Active",
    initials: "JW",
  },
  {
    id: 4,
    name: "Maria Lopez",
    email: "maria.l@hartops.com",
    role: "Admin",
    status: "Pending",
    initials: "ML",
  },
];
