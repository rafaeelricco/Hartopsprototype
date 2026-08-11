// =============================================================================
// Dashboard controls — date range + scope (IMP-1697 §5)
// =============================================================================
// Replaces the old hard-locked "this week, starting Monday" window with an
// inclusive from/to range plus shortcuts. The resolved dates always render
// beside the shortcut label so the active window is never ambiguous.
// =============================================================================

import { Printer, SlidersHorizontal } from "lucide-react";
import { Button } from "@/app/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/shared/components/ui/select";
import { DateRangeControl } from "@/app/shared/components/date-range-control";
import { TRIAGE_SHORTCUTS } from "@/app/shared/data/date-range";
import {
  MANAGER_REGIONS,
  PREMISE_TYPES,
  type DateRange,
  type PremiseType,
  type RangeShortcut,
  type Region,
} from "./dashboard-domain";

const ALL = "__all__";

export interface ControlsState {
  shortcut: RangeShortcut | null;
  range: DateRange;
  region: Region | null;
  premiseType: PremiseType | null;
  campaign: string | null;
}

interface Props {
  state: ControlsState;
  campaignOptions: string[];
  onChange: (next: ControlsState) => void;
  onPrint: () => void;
}

export function DashboardControls({
  state,
  campaignOptions,
  onChange,
  onPrint,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 print:hidden">
      {/* The shared date-range control — same component the Reports runner
          uses; only the offered shortcuts differ (triage looks forwards). */}
      <DateRangeControl
        value={{ shortcut: state.shortcut, range: state.range }}
        shortcuts={TRIAGE_SHORTCUTS}
        onChange={(v) =>
          onChange({ ...state, shortcut: v.shortcut, range: v.range })
        }
      />

      <div className="flex flex-wrap items-center gap-1.5 ml-1">
        <SlidersHorizontal className="size-3.5 text-muted-foreground" />

        {/* Managers are scoped automatically to their regions; this narrows within. */}
        <Select
          value={state.region ?? ALL}
          onValueChange={(v) =>
            onChange({ ...state, region: v === ALL ? null : (v as Region) })
          }
        >
          <SelectTrigger className="w-[150px]" aria-label="Region">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All my regions</SelectItem>
            {MANAGER_REGIONS.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={state.premiseType ?? ALL}
          onValueChange={(v) =>
            onChange({
              ...state,
              premiseType: v === ALL ? null : (v as PremiseType),
            })
          }
        >
          <SelectTrigger className="w-[178px]" aria-label="Premise type">
            <SelectValue placeholder="Premise" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All premise types</SelectItem>
            {PREMISE_TYPES.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* At volume, managers work one campaign at a time. */}
        <Select
          value={state.campaign ?? ALL}
          onValueChange={(v) =>
            onChange({ ...state, campaign: v === ALL ? null : v })
          }
        >
          <SelectTrigger className="w-[180px]" aria-label="Campaign">
            <SelectValue placeholder="Campaign" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All campaigns</SelectItem>
            {campaignOptions.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button variant="outline" onClick={onPrint} className="ml-auto gap-1.5">
        <Printer className="size-4" />
        Print
      </Button>
    </div>
  );
}
