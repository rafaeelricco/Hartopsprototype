// Educator Roster mock data — scoped to authenticated manager's assigned educators
// Quick Stats: avg rating, sales per event, punctuality

export interface Educator {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
  avgRating: number;
  salesPerEvent: number;
  punctuality: number; // percentage
  totalEvents: number;
  joinedDate: string;
}

export const mockEducators: Educator[] = [
  {
    id: "edu-1",
    name: "Ana Martinez",
    email: "ana.martinez@gmail.com",
    phone: "+1 (212) 555-0101",
    status: "Active",
    avgRating: 4.8,
    salesPerEvent: 14.2,
    punctuality: 98,
    totalEvents: 47,
    joinedDate: "2025-06-15",
  },
  {
    id: "edu-2",
    name: "Sarah Chen",
    email: "sarah.chen@gmail.com",
    phone: "+1 (201) 555-0202",
    status: "Active",
    avgRating: 4.6,
    salesPerEvent: 11.8,
    punctuality: 95,
    totalEvents: 32,
    joinedDate: "2025-08-20",
  },
  {
    id: "edu-3",
    name: "James Rodriguez",
    email: "james.rodriguez@gmail.com",
    phone: "+1 (718) 555-0303",
    status: "Active",
    avgRating: 4.3,
    salesPerEvent: 9.5,
    punctuality: 88,
    totalEvents: 28,
    joinedDate: "2025-09-10",
  },
  {
    id: "edu-4",
    name: "David Kim",
    email: "david.kim@gmail.com",
    phone: "+1 (917) 555-0404",
    status: "Active",
    avgRating: 4.9,
    salesPerEvent: 16.1,
    punctuality: 100,
    totalEvents: 53,
    joinedDate: "2025-04-01",
  },
  {
    id: "edu-5",
    name: "Maria Santos",
    email: "maria.santos@gmail.com",
    phone: "+1 (551) 555-0505",
    status: "Active",
    avgRating: 4.5,
    salesPerEvent: 12.4,
    punctuality: 92,
    totalEvents: 19,
    joinedDate: "2025-11-05",
  },
  {
    id: "edu-6",
    name: "Emily Park",
    email: "emily.park@gmail.com",
    phone: "+1 (347) 555-0606",
    status: "Active",
    avgRating: 4.7,
    salesPerEvent: 13.0,
    punctuality: 97,
    totalEvents: 41,
    joinedDate: "2025-05-22",
  },
  {
    id: "edu-7",
    name: "Carlos Mendez",
    email: "carlos.mendez@gmail.com",
    phone: "+1 (862) 555-0707",
    status: "Inactive",
    avgRating: 4.1,
    salesPerEvent: 8.2,
    punctuality: 82,
    totalEvents: 15,
    joinedDate: "2025-10-18",
  },
  {
    id: "edu-8",
    name: "Lisa Thompson",
    email: "lisa.thompson@gmail.com",
    phone: "+1 (973) 555-0808",
    status: "Active",
    avgRating: 4.4,
    salesPerEvent: 10.7,
    punctuality: 94,
    totalEvents: 22,
    joinedDate: "2025-12-02",
  },
];

export function getEducatorById(id: string): Educator | undefined {
  return mockEducators.find((e) => e.id === id);
}
