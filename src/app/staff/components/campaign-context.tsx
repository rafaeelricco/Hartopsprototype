// =============================================================================
// Shared React context for campaigns + templates + events state.
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
import { INITIAL_ACTIVITIES, generateActivityId, type Activity } from "./activity-data";
import {
  INITIAL_TEMPLATES,
  generateTemplateId,
  type Template,
} from "./template-data";

interface CampaignContextValue {
  campaigns: Campaign[];
  events: Activity[];
  templates: Template[];
  getCampaign: (id: string) => Campaign | undefined;
  getActivity: (id: string) => Activity | undefined;
  getActivitiesForCampaign: (campaignId: string) => Activity[];
  getTemplate: (id: string) => Template | undefined;
  getTemplatesForCampaign: (campaignId: string) => Template[];
  getActivitiesForTemplate: (templateId: string) => Activity[];
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
  createTemplate: (data: Omit<Template, "id" | "createdAt">) => Template;
  createActivity: (
    event: Omit<Activity, "id" | "createdAt" | "status">,
  ) => Activity;
  updateActivityStatus: (activityId: string, status: Activity["status"]) => void;
  updateActivityFields: (
    activityId: string,
    fields: Partial<
      Pick<
        Activity,
        | "name"
        | "location"
        | "state"
        | "city"
        | "date"
        | "duration"
        | "venueType"
        | "assignmentStatus"
        | "sampleConfigs"
        | "kitReadiness"
      >
    >,
  ) => void;
  existingCampaignNames: string[];
}

// Default context value so components never throw during HMR / React Refresh
const DEFAULT_VALUE: CampaignContextValue = {
  campaigns: INITIAL_CAMPAIGNS,
  events: INITIAL_ACTIVITIES,
  templates: INITIAL_TEMPLATES,
  getCampaign: (id) => INITIAL_CAMPAIGNS.find((c) => c.id === id),
  getActivity: (id) => INITIAL_ACTIVITIES.find((e) => e.id === id),
  getActivitiesForCampaign: (cid) =>
    INITIAL_ACTIVITIES.filter((e) => e.campaignId === cid),
  getTemplate: (id) => INITIAL_TEMPLATES.find((t) => t.id === id),
  getTemplatesForCampaign: (cid) =>
    INITIAL_TEMPLATES.filter((t) => t.campaignId === cid),
  getActivitiesForTemplate: (tid) =>
    INITIAL_ACTIVITIES.filter((e) => e.templateId === tid),
  createCampaign: () => null,
  createTemplate: (p) =>
    ({
      ...p,
      id: "tmp",
      createdAt: new Date().toISOString().slice(0, 10),
    }) as Template,
  createActivity: (p) =>
    ({
      ...p,
      id: "tmp",
      status: "draft",
      createdAt: new Date().toISOString().slice(0, 10),
    }) as Activity,
  updateActivityStatus: () => {},
  updateActivityFields: () => {},
  existingCampaignNames: INITIAL_CAMPAIGNS.map((c) => c.name.toLowerCase()),
};

const CampaignContext = createContext<CampaignContextValue>(DEFAULT_VALUE);

export function useCampaignContext() {
  return useContext(CampaignContext);
}

export function CampaignProvider({ children }: { children: ReactNode }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [events, setEvents] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [templates, setTemplates] = useState<Template[]>(INITIAL_TEMPLATES);

  const existingCampaignNames = useMemo(
    () => campaigns.map((c) => c.name.toLowerCase()),
    [campaigns],
  );

  function getCampaign(id: string) {
    return campaigns.find((c) => c.id === id);
  }

  function getActivity(id: string) {
    return events.find((e) => e.id === id);
  }

  function getActivitiesForCampaign(campaignId: string) {
    return events.filter((e) => e.campaignId === campaignId);
  }

  function getTemplate(id: string) {
    return templates.find((t) => t.id === id);
  }

  function getTemplatesForCampaign(campaignId: string) {
    return templates.filter((t) => t.campaignId === campaignId);
  }

  function getActivitiesForTemplate(templateId: string) {
    return events.filter((e) => e.templateId === templateId);
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
      activityCount: 0,
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

  function createTemplate(data: Omit<Template, "id" | "createdAt">): Template {
    const newTemplate: Template = {
      ...data,
      id: generateTemplateId(),
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setTemplates((prev) => [newTemplate, ...prev]);
    return newTemplate;
  }

  function createActivity(
    partial: Omit<Activity, "id" | "createdAt" | "status">,
  ): Activity {
    const newEvent: Activity = {
      ...partial,
      id: generateActivityId(),
      status: "draft",
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setEvents((prev) => [newEvent, ...prev]);
    // Increment campaign activityCount
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === partial.campaignId
          ? { ...c, activityCount: c.activityCount + 1 }
          : c,
      ),
    );
    return newEvent;
  }

  function updateActivityStatus(activityId: string, status: Activity["status"]) {
    setEvents((prev) =>
      prev.map((e) => (e.id === activityId ? { ...e, status } : e)),
    );
  }

  function updateActivityFields(
    activityId: string,
    fields: Partial<
      Pick<
        Activity,
        | "name"
        | "location"
        | "state"
        | "city"
        | "date"
        | "duration"
        | "venueType"
        | "assignmentStatus"
        | "sampleConfigs"
        | "kitReadiness"
      >
    >,
  ) {
    setEvents((prev) =>
      prev.map((e) => (e.id === activityId ? { ...e, ...fields } : e)),
    );
  }

  const value: CampaignContextValue = {
    campaigns,
    events,
    templates,
    getCampaign,
    getActivity,
    getActivitiesForCampaign,
    getTemplate,
    getTemplatesForCampaign,
    getActivitiesForTemplate,
    createCampaign,
    createTemplate,
    createActivity,
    updateActivityStatus,
    updateActivityFields,
    existingCampaignNames,
  };

  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  );
}
