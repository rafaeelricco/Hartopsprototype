// =============================================================================
// Full-Page Event Creation Wizard — 5-step flow
// Step 1: Select Campaign → Step 2: Event Basics →
// Step 3: Objectives + Projected Impact → Step 4: Products & Samples →
// Step 5: Customization
// Accessible from /staff/events/create
// =============================================================================

import { useState, useMemo, useCallback } from "react";
import { useNavigate, useSearchParams, Link } from "react-router";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  MapPin,
  Calendar,
  Clock,
  Building2,
  Target,
  FileText,
  Settings2,
  Smartphone,
  Save,
  BarChart3,
  Star,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Search,
  ArrowLeft,
  Package,
} from "lucide-react";
import { Button } from "@/app/shared/components/ui/button";
import { Input } from "@/app/shared/components/ui/input";
import {
  VENUE_TYPES,
  DURATION_OPTIONS,
  OBJECTIVES,
  ADVANCED_MODULES,
  OBJECTIVE_MODULE_MAP,
  getDataModulesForObjectives,
  type DataModule,
  type EventItem,
  type SampleConfig,
} from "./event-data";
import { useCampaignContext } from "./campaign-context";
import { type Campaign } from "./campaign-data";
import { LocationCombobox } from "./location-combobox";
import { INITIAL_REGIONS } from "./settings-data";
import { getDocumentsForSku } from "./brand-assets-data";
import { StepProductsSamples } from "./step-products-samples";

// ── Types ────────────────────────────────────────────────────────────────────

type WizardData = {
  campaignId: string;
  name: string;
  location: string;
  accountId: string;
  regionId: string;
  date: string;
  duration: string;
  venueType: "" | "off-premises" | "on-premises" | "special" | "cannabis";
  objectives: string[];
  advancedModules: string[];
  sampleConfigs: SampleConfig[];
};

const INITIAL_DATA: WizardData = {
  campaignId: "",
  name: "",
  location: "",
  accountId: "",
  regionId: "",
  date: "",
  duration: "",
  venueType: "",
  objectives: [],
  advancedModules: [],
  sampleConfigs: [],
};

const STEPS = [
  { num: 1, label: "Campaign", icon: Target },
  { num: 2, label: "Event Basics", icon: FileText },
  { num: 3, label: "Objectives", icon: Target },
  { num: 4, label: "Products & Samples", icon: Package },
  { num: 5, label: "Customization", icon: Settings2 },
];

// ── Main Component ───────────────────────────────────────────────────────────

export function CreateEventPage() {
  const navigate = useNavigate();
  const {
    campaigns,
    createEvent,
    getCampaign,
    getEventsForCampaign,
    getActivity,
  } = useCampaignContext();

  const [searchParams] = useSearchParams();
  const campaignIdParam = searchParams.get("campaign");
  const activityIdParam = searchParams.get("activity");
  const preselectedCampaign = campaignIdParam
    ? getCampaign(campaignIdParam)
    : undefined;
  const preselectedActivity = activityIdParam
    ? getActivity(activityIdParam)
    : undefined;

  const backUrl = campaignIdParam
    ? `/staff/campaigns/${campaignIdParam}`
    : "/staff/events";
  const backLabel = campaignIdParam ? "Back to Campaign" : "Back to Events";

  const [step, setStep] = useState(preselectedActivity ? 2 : 1);
  const [data, setData] = useState<WizardData>(() => {
    if (preselectedCampaign) {
      const inheritedConfigs: SampleConfig[] = (
        preselectedCampaign.linkedProductIds ?? []
      ).map((skuId) => {
        const docs = getDocumentsForSku(skuId);
        return {
          skuId,
          brandEducationDocIds: docs.map((d) => d.id),
        };
      });
      return {
        ...INITIAL_DATA,
        campaignId: preselectedCampaign.id,
        objectives: [...(preselectedCampaign.objectives ?? [])],
        sampleConfigs: inheritedConfigs,
        ...(preselectedActivity?.venueType
          ? { venueType: preselectedActivity.venueType }
          : {}),
      };
    }
    return INITIAL_DATA;
  });
  const [inheritedObjectiveCount, setInheritedObjectiveCount] = useState(
    () => preselectedCampaign?.objectives?.length ?? 0,
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof WizardData | "objectives", string>>
  >({});
  const [showEducator, setShowEducator] = useState(false);
  const [campaignSearch, setCampaignSearch] = useState("");

  // Derived data modules from selected objectives
  const mappedModules = useMemo(
    () => getDataModulesForObjectives(data.objectives),
    [data.objectives],
  );

  // Get modules grouped by objective for report preview
  const modulesByObjective = useMemo(() => {
    const groups: {
      objectiveId: string;
      label: string;
      modules: DataModule[];
    }[] = [];
    for (const objId of data.objectives) {
      const obj = OBJECTIVES.find((o) => o.id === objId);
      const mods = OBJECTIVE_MODULE_MAP[objId] ?? [];
      if (obj && mods.length > 0) {
        groups.push({ objectiveId: objId, label: obj.label, modules: mods });
      }
    }
    return groups;
  }, [data.objectives]);

  // ── Validation ──────────────────────────────────────────────────────────────

  function validateStep1(): boolean {
    if (!data.campaignId) {
      setErrors({ campaignId: "Please select a campaign." });
      return false;
    }
    setErrors({});
    return true;
  }

  function validateStep2(): boolean {
    const errs: Partial<Record<keyof WizardData | "objectives", string>> = {};
    if (!data.name.trim()) errs.name = "Event name is required.";
    if (!data.location.trim()) errs.location = "Location is required.";
    if (!data.date) errs.date = "Date is required.";
    if (!data.duration) errs.duration = "Duration is required.";
    if (!data.venueType) errs.venueType = "Venue type is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validateStep3(): boolean {
    if (data.objectives.length === 0) {
      setErrors({ objectives: "Select at least one objective." });
      return false;
    }
    setErrors({});
    return true;
  }

  function handleNext() {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    // Step 4 (Products & Samples) — no hard validation, allow skip
    setErrors({});
    setStep((s) => Math.min(s + 1, 5));
  }

  function handleBack() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  }

  function handleSubmit() {
    // Derive linkedProductIds from sampleConfigs (backward compat)
    const productIds =
      data.sampleConfigs.length > 0
        ? data.sampleConfigs.map((c) => c.skuId)
        : undefined;
    const event = createEvent({
      campaignId: data.campaignId,
      ...(preselectedActivity ? { activityId: preselectedActivity.id } : {}),
      name: data.name.trim(),
      location: data.location.trim(),
      state: "",
      city: "",
      assignmentStatus: "unassigned" as const,
      ...(data.accountId ? { accountId: data.accountId } : {}),
      ...(data.regionId ? { regionId: data.regionId } : {}),
      date: data.date,
      duration: data.duration,
      venueType: data.venueType as EventItem["venueType"],
      objectives: data.objectives,
      dataModules: mappedModules.map((m) => m.id),
      advancedModules: data.advancedModules,
      ...(productIds ? { linkedProductIds: productIds } : {}),
      ...(data.sampleConfigs.length > 0
        ? { sampleConfigs: data.sampleConfigs }
        : {}),
    });
    navigate(
      campaignIdParam
        ? `/staff/campaigns/${data.campaignId}`
        : `/staff/events/${event.id}`,
    );
  }

  // ── Field updaters ──────────────────────────────────────────────────────────

  const updateField = useCallback((field: keyof WizardData, value: string) => {
    setData((d) => ({ ...d, [field]: value }));
    setErrors((e) => {
      if (!e[field]) return e;
      const next = { ...e };
      delete next[field];
      return next;
    });
  }, []);

  const onLocationSelect = useCallback(
    (location: string, accountId: string) => {
      setData((d) => ({ ...d, location, accountId }));
      setErrors((e) => {
        if (!e.location) return e;
        const next = { ...e };
        delete next.location;
        return next;
      });
    },
    [],
  );

  function toggleObjective(id: string) {
    setData((d) => ({
      ...d,
      objectives: d.objectives.includes(id)
        ? d.objectives.filter((o) => o !== id)
        : [...d.objectives, id],
    }));
    if (errors.objectives)
      setErrors((e) => {
        const next = { ...e };
        delete next.objectives;
        return next;
      });
  }

  function toggleAdvanced(id: string) {
    setData((d) => ({
      ...d,
      advancedModules: d.advancedModules.includes(id)
        ? d.advancedModules.filter((m) => m !== id)
        : [...d.advancedModules, id],
    }));
  }

  return (
    <div className="min-h-full flex flex-col font-[Inter]">
      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <div className="px-6 pt-5 pb-0">
        <Link
          to={backUrl}
          className="inline-flex items-center gap-1.5 text-[#64748B] hover:text-[#0F172A] transition-colors no-underline mb-4"
          style={{ fontSize: "0.8125rem" }}
        >
          <ArrowLeft size={15} />
          {backLabel}
        </Link>
        <h1 style={{ fontSize: "1.5rem", color: "#0F172A" }} className="mb-1">
          Create Event
        </h1>
        <p style={{ fontSize: "0.875rem", color: "#94A3B8" }} className="mb-5">
          Walk through each step to set up your event.
        </p>
      </div>

      {/* Activity context banner */}
      {preselectedActivity && (
        <div
          className="mx-6 mb-3 px-4 py-2.5 rounded-lg flex items-center gap-2"
          style={{
            background: "#EFF6FF",
            fontSize: "0.8125rem",
            color: "#1D4ED8",
          }}
        >
          <Target size={14} />
          Creating event under activity:{" "}
          <strong>{preselectedActivity.name}</strong>
        </div>
      )}

      {/* ── Step indicator bar ────────────────────────────────────────────── */}
      <div className="px-6 pb-5">
        <div className="flex items-center gap-0 bg-[#FAFBFC] border border-[#E2E8F0] rounded-xl px-5 py-3">
          {STEPS.map((s, i) => {
            const isActive = step === s.num;
            const isDone = step > s.num;
            return (
              <div key={s.num} className="flex items-center flex-1">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{
                      background: isDone
                        ? "#0F766E"
                        : isActive
                          ? "#7D152D"
                          : "#E2E8F0",
                      color: isDone || isActive ? "#FFF" : "#94A3B8",
                      fontSize: "0.8125rem",
                    }}
                  >
                    {isDone ? <Check size={15} /> : s.num}
                  </div>
                  <span
                    style={{
                      fontSize: "0.8125rem",
                      color: isActive
                        ? "#0F172A"
                        : isDone
                          ? "#0F766E"
                          : "#94A3B8",
                      fontWeight: isActive ? 500 : 400,
                    }}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className="flex-1 h-px mx-4"
                    style={{ background: isDone ? "#0F766E" : "#E2E8F0" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Step content ─────────────────────────────────────────────────── */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        {step === 1 && (
          <StepCampaign
            campaigns={campaigns}
            selectedId={data.campaignId}
            onSelect={(id) => {
              const selected = getCampaign(id);
              const objectives = selected?.objectives ?? [];
              // Auto-inherit products from campaign as sampleConfigs
              const inheritedConfigs: SampleConfig[] = (
                selected?.linkedProductIds ?? []
              ).map((skuId) => {
                const docs = getDocumentsForSku(skuId);
                return {
                  skuId,
                  brandEducationDocIds: docs.map((d) => d.id),
                };
              });
              setData((d) => ({
                ...d,
                campaignId: id,
                objectives: [...objectives],
                sampleConfigs: inheritedConfigs,
              }));
              setInheritedObjectiveCount(objectives.length);
              setErrors((e) => {
                if (!e.campaignId) return e;
                const next = { ...e };
                delete next.campaignId;
                return next;
              });
            }}
            search={campaignSearch}
            onSearchChange={setCampaignSearch}
            error={errors.campaignId}
            getEventsForCampaign={getEventsForCampaign}
          />
        )}
        {step === 2 && (
          <StepBasics
            data={data}
            errors={errors}
            updateField={updateField}
            onLocationSelect={onLocationSelect}
          />
        )}
        {step === 3 && (
          <div className="flex flex-col">
            <StepObjectives
              selected={data.objectives}
              toggle={toggleObjective}
              error={errors.objectives}
              inheritedCount={inheritedObjectiveCount}
            />

            {data.objectives.length > 0 && (
              <>
                <div
                  className="my-5"
                  style={{ borderTop: "1px solid #E2E8F0" }}
                />
                <ProjectedImpactSection
                  data={data}
                  modules={mappedModules}
                  modulesByObjective={modulesByObjective}
                  showEducator={showEducator}
                  onToggleEducator={() => setShowEducator((p) => !p)}
                />
              </>
            )}
          </div>
        )}
        {step === 4 && (
          <StepProductsSamples
            sampleConfigs={data.sampleConfigs}
            onChange={(configs) =>
              setData((d) => ({ ...d, sampleConfigs: configs }))
            }
            inheritedProductIds={
              getCampaign(data.campaignId)?.linkedProductIds ?? []
            }
            campaignName={
              getCampaign(data.campaignId)?.name ?? "Selected Campaign"
            }
          />
        )}
        {step === 5 && (
          <StepAdvanced
            selected={data.advancedModules}
            toggle={toggleAdvanced}
            autoMappedModules={mappedModules}
          />
        )}
      </div>

      {/* ── Sticky footer ────────────────────────────────────────────────── */}
      <div className="sticky bottom-0 bg-white border-t border-[#E2E8F0] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={step === 1 ? () => navigate(backUrl) : handleBack}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-colors h-auto cursor-pointer"
            style={{ fontSize: "0.875rem" }}
          >
            <ChevronLeft size={15} />
            {step === 1 ? "Cancel" : "Back"}
          </Button>

          {step > 1 && (
            <Button
              variant="ghost"
              onClick={() => navigate(backUrl)}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-colors h-auto cursor-pointer"
              style={{ fontSize: "0.8125rem" }}
              title="Save as draft and close"
            >
              <Save size={14} />
              Save Draft
            </Button>
          )}
        </div>

        {step < 5 ? (
          <Button
            onClick={handleNext}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-white transition-opacity hover:opacity-90 h-auto cursor-pointer"
            style={{ background: "#7D152D", fontSize: "0.875rem" }}
          >
            Continue
            <ChevronRight size={15} />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-white transition-opacity hover:opacity-90 h-auto cursor-pointer"
            style={{ background: "#0F766E", fontSize: "0.875rem" }}
          >
            <Check size={15} />
            Create Event
          </Button>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes generateBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}

// =============================================================================
// Step 1 — Select Campaign
// =============================================================================

const STATUS_BADGE: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  active: { bg: "#ECFDF5", text: "#0F766E", label: "Active" },
  draft: { bg: "#F1F5F9", text: "#64748B", label: "Draft" },
  completed: { bg: "#FEF2F2", text: "#B91C1C", label: "Completed" },
};

function StepCampaign({
  campaigns,
  selectedId,
  onSelect,
  search,
  onSearchChange,
  error,
  getEventsForCampaign,
}: {
  campaigns: Campaign[];
  selectedId: string;
  onSelect: (id: string) => void;
  search: string;
  onSearchChange: (v: string) => void;
  error?: string | undefined;
  getEventsForCampaign: (id: string) => EventItem[];
}) {
  const filtered = useMemo(() => {
    if (!search.trim()) return campaigns;
    const q = search.toLowerCase();
    return campaigns.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q),
    );
  }, [campaigns, search]);

  return (
    <div>
      <h3 style={{ fontSize: "1.125rem", color: "#0F172A" }} className="mb-1">
        Select Campaign
      </h3>
      <p style={{ fontSize: "0.8125rem", color: "#94A3B8" }} className="mb-5">
        Choose which campaign this event belongs to.
      </p>

      {error && (
        <div
          className="mb-4 px-3 py-2 rounded-lg"
          style={{
            background: "#FEF2F2",
            fontSize: "0.8125rem",
            color: "#EF4444",
          }}
        >
          {error}
        </div>
      )}

      {/* Search */}
      <div className="relative max-w-sm mb-5">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"
        />
        <Input
          type="text"
          placeholder="Search campaigns..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-[#E2E8F0] bg-white focus:outline-none focus:ring-2 focus:ring-[#7D152D]/30 transition-colors"
          style={{ fontSize: "0.875rem" }}
        />
      </div>

      {/* Campaign card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((campaign) => {
          const isSelected = selectedId === campaign.id;
          const badge = STATUS_BADGE[campaign.status] ?? STATUS_BADGE["draft"];
          const eventCount = getEventsForCampaign(campaign.id).length;
          return (
            <Button
              key={campaign.id}
              variant="ghost"
              type="button"
              onClick={() => onSelect(campaign.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all h-auto cursor-pointer block w-full whitespace-normal hover:bg-[#F8FAFC] ${
                isSelected
                  ? "border-[#7D152D] bg-[#7D152D]/5 hover:bg-[#7D152D]/5"
                  : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p
                      className="truncate"
                      style={{
                        fontSize: "0.9375rem",
                        color: isSelected ? "#7D152D" : "#0F172A",
                      }}
                    >
                      {campaign.name}
                    </p>
                    <span
                      className="px-2 py-0.5 rounded-md flex-shrink-0"
                      style={{
                        fontSize: "0.6875rem",
                        background: badge!.bg,
                        color: badge!.text,
                      }}
                    >
                      {badge!.label}
                    </span>
                  </div>
                  <p
                    className="line-clamp-2"
                    style={{
                      fontSize: "0.8125rem",
                      color: "#94A3B8",
                      lineHeight: 1.5,
                    }}
                  >
                    {campaign.description}
                  </p>
                  <p
                    style={{ fontSize: "0.75rem", color: "#94A3B8" }}
                    className="mt-1.5"
                  >
                    {eventCount} event{eventCount !== 1 ? "s" : ""}
                  </p>
                </div>
                {isSelected && (
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "#7D152D" }}
                  >
                    <Check size={14} style={{ color: "#FFF" }} />
                  </div>
                )}
              </div>
            </Button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-10">
          <p style={{ fontSize: "0.875rem", color: "#94A3B8" }}>
            No campaigns match your search.
          </p>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// Step 2 — Event Basics
// =============================================================================

function StepBasics({
  data,
  errors,
  updateField,
  onLocationSelect,
}: {
  data: WizardData;
  errors: Partial<Record<keyof WizardData | "objectives", string>>;
  updateField: (field: keyof WizardData, value: string) => void;
  onLocationSelect: (location: string, accountId: string) => void;
}) {
  return (
    <div>
      <h3 style={{ fontSize: "1.125rem", color: "#0F172A" }} className="mb-1">
        Event Basics
      </h3>
      <p style={{ fontSize: "0.8125rem", color: "#94A3B8" }} className="mb-5">
        Define the foundational details for this event.
      </p>

      {/* Name */}
      <FieldWrapper
        label="Event Name"
        required
        error={errors.name}
        icon={<FileText size={15} style={{ color: "#94A3B8" }} />}
      >
        <Input
          type="text"
          value={data.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="e.g. Downtown Chicago Sampling"
          className={inputClass(errors.name)}
          style={inputStyle}
          maxLength={120}
        />
      </FieldWrapper>

      {/* Location + Date + Duration row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FieldWrapper
          label="Location"
          required
          error={errors.location}
          icon={<MapPin size={15} style={{ color: "#94A3B8" }} />}
        >
          <LocationCombobox
            value={data.location}
            accountId={data.accountId}
            onSelect={onLocationSelect}
            className={inputClass(errors.location)}
            style={inputStyle}
          />
        </FieldWrapper>

        <FieldWrapper
          label="Date"
          required
          error={errors.date}
          icon={<Calendar size={15} style={{ color: "#94A3B8" }} />}
        >
          <Input
            type="date"
            value={data.date}
            onChange={(e) => updateField("date", e.target.value)}
            className={inputClass(errors.date)}
            style={inputStyle}
          />
        </FieldWrapper>

        <FieldWrapper
          label="Duration"
          required
          error={errors.duration}
          icon={<Clock size={15} style={{ color: "#94A3B8" }} />}
        >
          <select
            value={data.duration}
            onChange={(e) => updateField("duration", e.target.value)}
            className={inputClass(errors.duration)}
            style={inputStyle}
          >
            <option value="">Select duration...</option>
            {DURATION_OPTIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </FieldWrapper>
      </div>

      {/* Region */}
      <FieldWrapper
        label="Region"
        icon={<MapPin size={15} style={{ color: "#94A3B8" }} />}
      >
        <select
          value={data.regionId}
          onChange={(e) => updateField("regionId", e.target.value)}
          className={inputClass(undefined)}
          style={inputStyle}
        >
          <option value="">No region assigned</option>
          {INITIAL_REGIONS.filter((r) => r.isActive).map((r) => (
            <option key={r.id} value={r.id}>
              {r.parentGroup ? `${r.parentGroup} — ${r.name}` : r.name}
            </option>
          ))}
        </select>
      </FieldWrapper>

      {/* Venue Type */}
      <div className="mb-1">
        <label
          className="flex items-center gap-1.5 mb-2"
          style={{ fontSize: "0.875rem", color: "#0F172A" }}
        >
          <Building2 size={15} style={{ color: "#94A3B8" }} />
          Venue Type <span style={{ color: "#EF4444" }}>*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {VENUE_TYPES.map((v) => {
            const selected = data.venueType === v.value;
            return (
              <Button
                key={v.value}
                variant="ghost"
                type="button"
                onClick={() => updateField("venueType", v.value)}
                className={`p-3.5 rounded-xl border-2 text-left transition-all h-auto cursor-pointer block w-full whitespace-normal hover:bg-[#F8FAFC] ${
                  selected
                    ? "border-[#7D152D] bg-[#7D152D]/5 hover:bg-[#7D152D]/5"
                    : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
                }`}
              >
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: selected ? "#7D152D" : "#0F172A",
                  }}
                >
                  {v.label}
                </p>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#94A3B8",
                    lineHeight: 1.4,
                  }}
                  className="mt-0.5"
                >
                  {v.description}
                </p>
              </Button>
            );
          })}
        </div>
        {errors.venueType && (
          <p
            className="mt-1.5"
            style={{ fontSize: "0.8125rem", color: "#EF4444" }}
          >
            {errors.venueType}
          </p>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// Step 3 — Objectives
// =============================================================================

function StepObjectives({
  selected,
  toggle,
  error,
  inheritedCount = 0,
}: {
  selected: string[];
  toggle: (id: string) => void;
  error?: string | undefined;
  inheritedCount?: number;
}) {
  return (
    <div
      className="sticky top-0 z-10 pb-1"
      style={{
        boxShadow: selected.length > 0 ? "0 1px 3px rgba(0,0,0,0.04)" : "none",
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 style={{ fontSize: "1.125rem", color: "#0F172A" }}>
          Select Objectives
        </h3>
        <span
          className="px-2.5 py-1 rounded-lg"
          style={{
            fontSize: "0.75rem",
            background: selected.length > 0 ? "#7D152D0F" : "#F1F5F9",
            color: selected.length > 0 ? "#7D152D" : "#94A3B8",
          }}
        >
          {selected.length} of {OBJECTIVES.length} selected
        </span>
      </div>

      {inheritedCount > 0 && (
        <div
          className="flex items-center gap-2 px-3 py-2 mb-3 rounded-lg"
          style={{
            background: "#F0FDF4",
            fontSize: "0.8125rem",
            color: "#15803D",
          }}
        >
          <Check size={14} style={{ color: "#15803D" }} />
          {inheritedCount} objective{inheritedCount !== 1 ? "s" : ""} inherited
          from campaign — you can still adjust below
        </div>
      )}

      {error && (
        <div
          className="mb-3 px-3 py-2 rounded-lg"
          style={{
            background: "#FEF2F2",
            fontSize: "0.8125rem",
            color: "#EF4444",
          }}
        >
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {OBJECTIVES.map((obj) => {
          const isSelected = selected.includes(obj.id);
          const moduleCount = (OBJECTIVE_MODULE_MAP[obj.id] ?? []).length;
          return (
            <Button
              key={obj.id}
              variant="ghost"
              type="button"
              onClick={() => toggle(obj.id)}
              title={obj.description}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all h-auto cursor-pointer whitespace-nowrap hover:bg-[#F8FAFC] ${
                isSelected
                  ? "border-[#7D152D] bg-[#7D152D]/5 hover:bg-[#7D152D]/5"
                  : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
              }`}
            >
              <div
                className="w-4.5 h-4.5 rounded-md flex-shrink-0 flex items-center justify-center transition-colors"
                style={{
                  width: 18,
                  height: 18,
                  background: isSelected ? "#7D152D" : "transparent",
                  border: isSelected ? "none" : "2px solid #CBD5E1",
                }}
              >
                {isSelected && <Check size={12} style={{ color: "#FFF" }} />}
              </div>
              <span
                style={{
                  fontSize: "0.875rem",
                  color: isSelected ? "#7D152D" : "#0F172A",
                  fontWeight: isSelected ? 500 : 400,
                }}
              >
                {obj.label}
              </span>
              <span
                className="px-1.5 py-0.5 rounded-md"
                style={{
                  fontSize: "0.625rem",
                  background: isSelected ? "#7D152D1A" : "#F1F5F9",
                  color: isSelected ? "#7D152D" : "#94A3B8",
                }}
              >
                {moduleCount}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

// =============================================================================
// Projected Impact Section (full-width report preview below Objectives)
// =============================================================================

const SECTION_COLORS = [
  "#7D152D",
  "#0F766E",
  "#1D4ED8",
  "#D97706",
  "#7C3AED",
  "#059669",
];

function ProjectedImpactSection({
  data,
  modules,
  modulesByObjective,
  showEducator,
  onToggleEducator,
}: {
  data: WizardData;
  modules: DataModule[];
  modulesByObjective: {
    objectiveId: string;
    label: string;
    modules: DataModule[];
  }[];
  showEducator: boolean;
  onToggleEducator: () => void;
}) {
  const selectedObjectives = OBJECTIVES.filter((o) =>
    data.objectives.includes(o.id),
  );

  return (
    <div style={{ animation: "fadeInUp 0.3s ease-out" }}>
      <div className="flex items-center justify-between mb-1">
        <h3 style={{ fontSize: "1.125rem", color: "#0F172A" }}>
          Projected Impact
        </h3>
        <Button
          variant="ghost"
          type="button"
          onClick={onToggleEducator}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors h-auto cursor-pointer ${
            showEducator
              ? "text-white"
              : "text-[#64748B] bg-[#F1F5F9] hover:bg-[#E2E8F0]"
          }`}
          style={
            showEducator
              ? { background: "#0F766E", fontSize: "0.75rem" }
              : { fontSize: "0.75rem" }
          }
        >
          <Smartphone size={13} />
          Educator View
        </Button>
      </div>
      <p style={{ fontSize: "0.8125rem", color: "#94A3B8" }} className="mb-4">
        {showEducator
          ? "Preview of what the educator will see on their mobile device."
          : "Live preview of your report based on selected objectives."}
      </p>

      {!showEducator ? (
        /* Report mock-up — full-width layout */
        <div className="border border-[#E2E8F0] rounded-xl overflow-hidden bg-white">
          {/* Report title bar */}
          <div
            className="px-5 py-4 border-b border-[#E2E8F0]"
            style={{
              background: "linear-gradient(135deg, #7D152D 0%, #5C0F21 100%)",
            }}
          >
            <p
              style={{ fontSize: "0.6875rem", color: "rgba(255,255,255,0.6)" }}
              className="mb-0.5 uppercase tracking-wider"
            >
              Event Report
            </p>
            <p style={{ fontSize: "1rem", color: "#FFF", fontWeight: 500 }}>
              {data.name || "Untitled Event"}
            </p>
            <div className="flex items-center gap-4 mt-2 flex-wrap">
              {data.location && (
                <span
                  className="flex items-center gap-1"
                  style={{
                    fontSize: "0.8125rem",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  <MapPin size={13} /> {data.location}
                </span>
              )}
              {data.date && (
                <span
                  className="flex items-center gap-1"
                  style={{
                    fontSize: "0.8125rem",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  <Calendar size={13} />{" "}
                  {new Date(data.date + "T12:00:00").toLocaleDateString(
                    "en-US",
                    { month: "short", day: "numeric", year: "numeric" },
                  )}
                </span>
              )}
              {data.duration && (
                <span
                  className="flex items-center gap-1"
                  style={{
                    fontSize: "0.8125rem",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  <Clock size={13} /> {data.duration}
                </span>
              )}
            </div>
          </div>

          {/* Objectives summary strip */}
          <div className="px-5 py-3 border-b border-[#F1F5F9] bg-[#FAFBFC]">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
                className="uppercase tracking-wider"
              >
                Objectives
              </span>
              {selectedObjectives.map((o) => (
                <span
                  key={o.id}
                  className="px-2 py-0.5 rounded-md"
                  style={{
                    fontSize: "0.6875rem",
                    background: "#7D152D0F",
                    color: "#7D152D",
                  }}
                >
                  {o.label}
                </span>
              ))}
              <span
                className="ml-auto"
                style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
              >
                {modules.length} data modules
              </span>
            </div>
          </div>

          {/* Per-objective report sections — 2-column grid */}
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {modulesByObjective.map((group, gi) => (
              <div
                key={group.objectiveId}
                className="border border-[#F1F5F9] rounded-xl overflow-hidden bg-white"
              >
                <div className="px-4 py-2.5 flex items-center gap-2 bg-[#FAFBFC] border-b border-[#F1F5F9]">
                  <div
                    className="w-1.5 h-5 rounded-full"
                    style={{
                      background: SECTION_COLORS[gi % SECTION_COLORS.length],
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color: "#0F172A",
                      fontWeight: 500,
                    }}
                  >
                    {group.label}
                  </span>
                  <span style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
                    ({group.modules.length} modules)
                  </span>
                </div>

                <div className="p-3 grid grid-cols-1 gap-2">
                  {group.modules.map((mod) => (
                    <SampleModuleCard key={mod.id} mod={mod} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Report footer */}
          <div className="px-5 py-3 border-t border-[#E2E8F0] bg-[#FAFBFC] flex items-center justify-between">
            <span style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
              Sample data shown &middot; Actual values collected during event
            </span>
            <span style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>
              Hart Agency
            </span>
          </div>
        </div>
      ) : (
        /* Educator mobile preview — centered in full width */
        <div className="flex justify-center py-4">
          <div
            className="w-[280px] rounded-[2rem] border-[6px] border-[#1E293B] bg-white overflow-hidden shadow-xl flex flex-col"
            style={{ minHeight: 480 }}
          >
            {/* Phone status bar */}
            <div
              className="flex items-center justify-between px-5 py-2"
              style={{ background: "#7D152D" }}
            >
              <span style={{ fontSize: "0.6875rem", color: "#FFF" }}>9:41</span>
              <span style={{ fontSize: "0.6875rem", color: "#FFF" }}>
                Hart Agency
              </span>
              <span style={{ fontSize: "0.6875rem", color: "#FFF" }}>100%</span>
            </div>

            {/* Event header with progress ring */}
            <div
              className="px-4 py-3 border-b border-[#F1F5F9]"
              style={{ background: "#FAFBFC" }}
            >
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <svg width="40" height="40" viewBox="0 0 40 40">
                    <circle
                      cx="20"
                      cy="20"
                      r="16"
                      fill="none"
                      stroke="#E2E8F0"
                      strokeWidth="3"
                    />
                    <circle
                      cx="20"
                      cy="20"
                      r="16"
                      fill="none"
                      stroke="#0F766E"
                      strokeWidth="3"
                      strokeDasharray={`${(1 / modules.length) * 100.5} 100.5`}
                      strokeLinecap="round"
                      transform="rotate(-90 20 20)"
                    />
                  </svg>
                  <span
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ fontSize: "0.5625rem", color: "#0F172A" }}
                  >
                    1/{modules.length}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="truncate"
                    style={{ fontSize: "0.875rem", color: "#0F172A" }}
                  >
                    {data.name || "Untitled Event"}
                  </p>
                  <p
                    className="truncate"
                    style={{ fontSize: "0.625rem", color: "#94A3B8" }}
                  >
                    {data.location || "Location TBD"} &middot;{" "}
                    {data.duration || "TBD"}
                  </p>
                </div>
              </div>
            </div>

            {/* Module sections */}
            <div className="flex-1 overflow-y-auto">
              {modulesByObjective.map((group, gi) => (
                <div key={group.objectiveId}>
                  <div
                    className="px-4 pt-3 pb-1 sticky top-0 bg-white"
                    style={{ borderBottom: "1px solid #F8FAFC" }}
                  >
                    <p
                      style={{ fontSize: "0.5625rem", color: "#94A3B8" }}
                      className="uppercase tracking-wider"
                    >
                      {group.label}
                    </p>
                  </div>
                  {group.modules.map((mod, mi) => {
                    const isFirst = gi === 0 && mi === 0;
                    return (
                      <div
                        key={mod.id}
                        className="flex items-center gap-2.5 px-4 py-2.5 border-b border-[#F8FAFC]"
                      >
                        <div
                          className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                          style={{
                            background: isFirst ? "#0F766E" : "transparent",
                            border: isFirst ? "none" : "2px solid #CBD5E1",
                          }}
                        >
                          {isFirst && (
                            <Check size={11} style={{ color: "#FFF" }} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className="truncate"
                            style={{
                              fontSize: "0.8125rem",
                              color: isFirst ? "#94A3B8" : "#0F172A",
                              textDecoration: isFirst ? "line-through" : "none",
                            }}
                          >
                            {mod.label}
                          </p>
                          {gi === 0 && mi === 1 && (
                            <div className="mt-1 flex items-center gap-1.5">
                              <div className="h-1.5 w-16 rounded-full bg-[#E2E8F0]" />
                              <div className="h-1.5 w-10 rounded-full bg-[#E2E8F0]" />
                            </div>
                          )}
                        </div>
                        <ChevronRight size={13} style={{ color: "#CBD5E1" }} />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Educator form preview */}
            {modules.length > 1 && modules[1] && (
              <div className="px-4 py-2.5 border-t border-[#E2E8F0] bg-[#FAFBFC]">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-4 h-4 rounded-sm bg-[#0F766E]/10 flex items-center justify-center">
                    {modules[1].sampleType === "score" ? (
                      <Star size={9} style={{ color: "#0F766E" }} />
                    ) : modules[1].sampleType === "percent" ? (
                      <TrendingUp size={9} style={{ color: "#0F766E" }} />
                    ) : modules[1].sampleType === "number" ? (
                      <BarChart3 size={9} style={{ color: "#0F766E" }} />
                    ) : (
                      <FileText size={9} style={{ color: "#0F766E" }} />
                    )}
                  </div>
                  <span style={{ fontSize: "0.6875rem", color: "#0F172A" }}>
                    {modules[1].label}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <div className="flex-1 h-7 rounded-md bg-white border border-[#E2E8F0]" />
                  <div className="h-7 w-7 rounded-md bg-[#0F766E] flex items-center justify-center">
                    <Check size={12} style={{ color: "#FFF" }} />
                  </div>
                </div>
              </div>
            )}

            {/* Bottom nav */}
            <div className="px-4 py-2.5 flex items-center justify-center">
              <div className="w-28 h-1 rounded-full bg-[#E2E8F0]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Sample module card ───────────────────────────────────────────────────────

function SampleModuleCard({ mod }: { mod: DataModule }) {
  const { sampleType, sampleValue, label } = mod;

  return (
    <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#F1F5F9]">
      <p
        style={{ fontSize: "0.6875rem", color: "#94A3B8" }}
        className="mb-1.5 truncate"
      >
        {label}
      </p>

      {sampleType === "score" && (
        <div className="flex items-end gap-2">
          <span style={{ fontSize: "1.25rem", color: "#0F172A" }}>
            {sampleValue}
          </span>
          <span style={{ fontSize: "0.625rem", color: "#94A3B8" }}>/10</span>
          <div className="flex-1 flex items-end gap-px ml-1">
            {[0.3, 0.5, 0.7, 0.85, 0.65].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${h * 24}px`,
                  background: "#7D152D",
                  opacity: 0.15 + i * 0.15,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {sampleType === "number" && (
        <div className="flex items-end gap-1">
          <span style={{ fontSize: "1.25rem", color: "#0F172A" }}>
            {sampleValue}
          </span>
          <TrendingUp size={14} style={{ color: "#0F766E", marginBottom: 2 }} />
        </div>
      )}

      {sampleType === "percent" && (
        <div>
          <span style={{ fontSize: "1.25rem", color: "#0F172A" }}>
            {sampleValue}
          </span>
          <div className="mt-1.5 h-1.5 rounded-full bg-[#E2E8F0] overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: sampleValue, background: "#0F766E" }}
            />
          </div>
        </div>
      )}

      {sampleType === "currency" && (
        <div className="flex items-end gap-1">
          <span style={{ fontSize: "1.25rem", color: "#0F172A" }}>
            {sampleValue}
          </span>
          <BarChart3 size={14} style={{ color: "#1D4ED8", marginBottom: 2 }} />
        </div>
      )}

      {sampleType === "text" && (
        <div className="flex items-center gap-1.5">
          <span style={{ fontSize: "1rem", color: "#0F172A" }}>
            {sampleValue}
          </span>
        </div>
      )}

      {!sampleType && <div className="h-5 w-16 rounded bg-[#E2E8F0]" />}
    </div>
  );
}

// =============================================================================
// Step 5 — Advanced Customization
// =============================================================================

function StepAdvanced({
  selected,
  toggle,
  autoMappedModules,
}: {
  selected: string[];
  toggle: (id: string) => void;
  autoMappedModules: DataModule[];
}) {
  const [showAutoMapped, setShowAutoMapped] = useState(false);

  return (
    <div>
      <h3 style={{ fontSize: "1.125rem", color: "#0F172A" }} className="mb-1">
        Advanced Customization
      </h3>
      <p style={{ fontSize: "0.8125rem", color: "#94A3B8" }} className="mb-5">
        Add specialized data collection modules beyond the auto-mapped ones.
        These are optional and additive.
      </p>

      {/* Auto-mapped modules context */}
      <div className="mb-5 border border-[#E2E8F0] rounded-xl overflow-hidden">
        <Button
          variant="ghost"
          type="button"
          onClick={() => setShowAutoMapped((p) => !p)}
          className="w-full flex items-center justify-between px-4 py-3 bg-[#FAFBFC] hover:bg-[#F1F5F9] transition-colors text-left h-auto cursor-pointer rounded-none border-0"
        >
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-md flex items-center justify-center"
              style={{ background: "#0F766E1A" }}
            >
              <Check size={12} style={{ color: "#0F766E" }} />
            </div>
            <span style={{ fontSize: "0.8125rem", color: "#0F172A" }}>
              Auto-mapped from your objectives
            </span>
            <span
              className="px-2 py-0.5 rounded-md"
              style={{
                fontSize: "0.6875rem",
                background: "#0F766E1A",
                color: "#0F766E",
              }}
            >
              {autoMappedModules.length} modules
            </span>
          </div>
          {showAutoMapped ? (
            <ChevronUp size={15} style={{ color: "#94A3B8" }} />
          ) : (
            <ChevronDown size={15} style={{ color: "#94A3B8" }} />
          )}
        </Button>
        {showAutoMapped && (
          <div className="px-4 py-3 border-t border-[#F1F5F9]">
            <div className="flex flex-wrap gap-1.5">
              {autoMappedModules.map((mod) => (
                <span
                  key={mod.id}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md"
                  style={{
                    fontSize: "0.6875rem",
                    background: "#0F766E0A",
                    color: "#0F766E",
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#0F766E" }}
                  />
                  {mod.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Additional modules */}
      <p
        style={{ fontSize: "0.75rem", color: "#94A3B8" }}
        className="uppercase tracking-wider mb-3"
      >
        Additional modules
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {ADVANCED_MODULES.map((mod) => {
          const isSelected = selected.includes(mod.id);
          return (
            <Button
              key={mod.id}
              variant="ghost"
              type="button"
              onClick={() => toggle(mod.id)}
              className={`flex items-start gap-3.5 p-4 rounded-xl border-2 text-left transition-all h-auto cursor-pointer block w-full whitespace-normal hover:bg-[#F8FAFC] ${
                isSelected
                  ? "border-[#0F766E] bg-[#0F766E]/5 hover:bg-[#0F766E]/5"
                  : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center mt-0.5 transition-colors"
                  style={{
                    background: isSelected ? "#0F766E" : "transparent",
                    border: isSelected ? "none" : "2px solid #CBD5E1",
                  }}
                >
                  {isSelected && <Check size={13} style={{ color: "#FFF" }} />}
                </div>
                <div className="flex-1">
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      color: isSelected ? "#0F766E" : "#0F172A",
                    }}
                  >
                    {mod.label}
                  </p>
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "#94A3B8",
                      lineHeight: 1.5,
                    }}
                    className="mt-0.5"
                  >
                    {mod.description}
                  </p>
                </div>
              </div>
            </Button>
          );
        })}
      </div>

      {/* Summary count */}
      {selected.length > 0 && (
        <div
          className="mt-4 px-3.5 py-2.5 rounded-lg flex items-center gap-2"
          style={{ background: "#0F766E0A", border: "1px solid #0F766E1A" }}
        >
          <Settings2 size={14} style={{ color: "#0F766E" }} />
          <span style={{ fontSize: "0.8125rem", color: "#0F766E" }}>
            {autoMappedModules.length + selected.length} total modules
          </span>
          <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
            ({autoMappedModules.length} auto-mapped + {selected.length} custom)
          </span>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// Shared helpers
// =============================================================================

function FieldWrapper({
  label,
  required,
  error,
  icon,
  children,
}: {
  label: string;
  required?: boolean | undefined;
  error?: string | undefined;
  icon?: React.ReactNode | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <label
        className="flex items-center gap-1.5 mb-1.5"
        style={{ fontSize: "0.875rem", color: "#0F172A" }}
      >
        {icon}
        {label}
        {required && <span style={{ color: "#EF4444" }}>*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1" style={{ fontSize: "0.8125rem", color: "#EF4444" }}>
          {error}
        </p>
      )}
    </div>
  );
}

const inputStyle = { fontSize: "0.9375rem", background: "#F8FAFC" };

function inputClass(error?: string) {
  return `w-full px-3.5 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
    error
      ? "border-[#EF4444] focus:ring-[#EF4444]/30"
      : "border-[#E2E8F0] focus:ring-[#7D152D]/30"
  }`;
}
