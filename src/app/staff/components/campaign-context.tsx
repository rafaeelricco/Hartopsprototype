// =============================================================================
// Shared React context for campaigns + activities + events state.
// Wraps the layout so both CampaignLibrary and CampaignDetail can read/write.
// =============================================================================

import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import { INITIAL_CAMPAIGNS, generateId, type Campaign } from "./campaign-data";
import { INITIAL_EVENTS, generateEventId, type EventItem } from "./event-data";
import {
  INITIAL_ACTIVITIES,
  generateActivityId,
  type Activity,
} from "./activity-data";

interface CampaignContextValue {
  campaigns: Campaign[];
  events: EventItem[];
  activities: Activity[];
  getCampaign: (id: string) => Campaign | undefined;
  getEvent: (id: string) => EventItem | undefined;
  getEventsForCampaign: (campaignId: string) => EventItem[];
  getActivity: (id: string) => Activity | undefined;
  getActivitiesForCampaign: (campaignId: string) => Activity[];
  getEventsForActivity: (activityId: string) => EventItem[];
  createCampaign: (data: {
    name: string;
    description: string;
    supplier?: string | undefined;
    distributors?: string[] | undefined;
    targetMarkets?: string[] | undefined;
    channels?: string[] | undefined;
    anticipatedEventCount?: number | undefined;
    linkedProductIds?: string[] | undefined;
    objectives?: string[] | undefined;
  }) => string | null;
  createActivity: (data: Omit<Activity, "id" | "createdAt">) => Activity;
  createEvent: (
    event: Omit<EventItem, "id" | "createdAt" | "status">,
  ) => EventItem;
  updateEventStatus: (eventId: string, status: EventItem["status"]) => void;
  updateEventFields: (
    eventId: string,
    fields: Partial<
      Pick<
        EventItem,
        | "name"
        | "location"
        | "state"
        | "city"
        | "date"
        | "duration"
        | "venueType"
        | "assignmentStatus"
      >
    >,
  ) => void;
  existingCampaignNames: string[];
}

// Default context value so components never throw during HMR / React Refresh
const DEFAULT_VALUE: CampaignContextValue = {
  campaigns: INITIAL_CAMPAIGNS,
  events: INITIAL_EVENTS,
  activities: INITIAL_ACTIVITIES,
  getCampaign: (id) => INITIAL_CAMPAIGNS.find((c) => c.id === id),
  getEvent: (id) => INITIAL_EVENTS.find((e) => e.id === id),
  getEventsForCampaign: (cid) =>
    INITIAL_EVENTS.filter((e) => e.campaignId === cid),
  getActivity: (id) => INITIAL_ACTIVITIES.find((a) => a.id === id),
  getActivitiesForCampaign: (cid) =>
    INITIAL_ACTIVITIES.filter((a) => a.campaignId === cid),
  getEventsForActivity: (aid) =>
    INITIAL_EVENTS.filter((e) => e.activityId === aid),
  createCampaign: () => null,
  createActivity: (p) =>
    ({
      ...p,
      id: "tmp",
      createdAt: new Date().toISOString().slice(0, 10),
    }) as Activity,
  createEvent: (p) =>
    ({
      ...p,
      id: "tmp",
      status: "draft",
      createdAt: new Date().toISOString().slice(0, 10),
    }) as EventItem,
  updateEventStatus: () => {},
  updateEventFields: () => {},
  existingCampaignNames: INITIAL_CAMPAIGNS.map((c) => c.name.toLowerCase()),
};

const CampaignContext = createContext<CampaignContextValue>(DEFAULT_VALUE);

export function useCampaignContext() {
  return useContext(CampaignContext);
}

export function CampaignProvider({ children }: { children: ReactNode }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);

  const existingCampaignNames = useMemo(
    () => campaigns.map((c) => c.name.toLowerCase()),
    [campaigns],
  );

  function getCampaign(id: string) {
    return campaigns.find((c) => c.id === id);
  }

  function getEvent(id: string) {
    return events.find((e) => e.id === id);
  }

  function getEventsForCampaign(campaignId: string) {
    return events.filter((e) => e.campaignId === campaignId);
  }

  function getActivity(id: string) {
    return activities.find((a) => a.id === id);
  }

  function getActivitiesForCampaign(campaignId: string) {
    return activities.filter((a) => a.campaignId === campaignId);
  }

  function getEventsForActivity(activityId: string) {
    return events.filter((e) => e.activityId === activityId);
  }

  function createCampaign(data: {
    name: string;
    description: string;
    supplier?: string | undefined;
    distributors?: string[] | undefined;
    targetMarkets?: string[] | undefined;
    channels?: string[] | undefined;
    anticipatedEventCount?: number | undefined;
    linkedProductIds?: string[] | undefined;
    objectives?: string[] | undefined;
  }): string | null {
    if (existingCampaignNames.includes(data.name.toLowerCase())) {
      return "Name already in use.";
    }
    const newCampaign: Campaign = {
      id: generateId(),
      name: data.name,
      description: data.description,
      eventCount: 0,
      status: "draft",
      createdAt: new Date().toISOString().slice(0, 10),
      ...(data.supplier ? { supplier: data.supplier } : {}),
      ...(data.distributors?.length ? { distributors: data.distributors } : {}),
      ...(data.targetMarkets?.length
        ? { targetMarkets: data.targetMarkets }
        : {}),
      ...(data.channels?.length ? { channels: data.channels } : {}),
      ...(data.anticipatedEventCount != null
        ? { anticipatedEventCount: data.anticipatedEventCount }
        : {}),
      ...(data.linkedProductIds?.length
        ? { linkedProductIds: data.linkedProductIds }
        : {}),
      ...(data.objectives?.length ? { objectives: data.objectives } : {}),
    };
    setCampaigns((prev) => [newCampaign, ...prev]);
    return null;
  }

  function createActivity(data: Omit<Activity, "id" | "createdAt">): Activity {
    const newActivity: Activity = {
      ...data,
      id: generateActivityId(),
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setActivities((prev) => [newActivity, ...prev]);
    return newActivity;
  }

  function createEvent(
    partial: Omit<EventItem, "id" | "createdAt" | "status">,
  ): EventItem {
    const newEvent: EventItem = {
      ...partial,
      id: generateEventId(),
      status: "draft",
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setEvents((prev) => [newEvent, ...prev]);
    // Increment campaign eventCount
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === partial.campaignId
          ? { ...c, eventCount: c.eventCount + 1 }
          : c,
      ),
    );
    return newEvent;
  }

  function updateEventStatus(eventId: string, status: EventItem["status"]) {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, status } : e)),
    );
  }

  function updateEventFields(
    eventId: string,
    fields: Partial<
      Pick<
        EventItem,
        | "name"
        | "location"
        | "state"
        | "city"
        | "date"
        | "duration"
        | "venueType"
        | "assignmentStatus"
      >
    >,
  ) {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, ...fields } : e)),
    );
  }

  const value: CampaignContextValue = {
    campaigns,
    events,
    activities,
    getCampaign,
    getEvent,
    getEventsForCampaign,
    getActivity,
    getActivitiesForCampaign,
    getEventsForActivity,
    createCampaign,
    createActivity,
    createEvent,
    updateEventStatus,
    updateEventFields,
    existingCampaignNames,
  };

  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  );
}
