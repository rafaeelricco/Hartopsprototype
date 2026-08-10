// =============================================================================
// Dashboard controls — date range + scope (IMP-1697 §5)
// =============================================================================
// Replaces the old hard-locked "this week, starting Monday" window with an
// inclusive from/to range plus shortcuts. The resolved dates always render
// beside the shortcut label so the active window is never ambiguous.
// =============================================================================

import { CalendarRange, Printer, SlidersHorizontal } from "lucide-react";
import { Button } from "@/app/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/shared/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/shared/components/ui/select";
import {
  ALL_SHORTCUTS,
  MANAGER_REGIONS,
  PREMISE_TYPES,
  SHORTCUT_LABELS,
  formatRange,
  resolveShortcut,
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
  function pickShortcut(shortcut: RangeShortcut) {
    onChange({ ...state, shortcut, range: resolveShortcut(shortcut) });
  }

  // Editing either endpoint drops the shortcut label — the range is now custom.
  function setBound(which: "from" | "to", value: string) {
    if (!value) return;
    const next = { ...state.range, [which]: value };
    if (next.from > next.to) {
      if (which === "from") next.to = value;
      else next.from = value;
    }
    onChange({ ...state, shortcut: null, range: next });
  }

  const rangeLabel = state.shortcut
    ? SHORTCUT_LABELS[state.shortcut]
    : "Custom range";

  return (
    <div className="flex flex-wrap items-center gap-2 print:hidden">
      {/* Date range shortcut + resolved dates */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <CalendarRange className="size-4 text-primary" />
            <span style={{ fontWeight: 500 }}>{rangeLabel}</span>
            <span className="text-muted-foreground">
              · {formatRange(state.range)}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          {ALL_SHORTCUTS.map((s) => {
            const r = resolveShortcut(s);
            return (
              <DropdownMenuItem
                key={s}
                onClick={() => pickShortcut(s)}
                className="flex items-center justify-between gap-3"
              >
                <span
                  style={{
                    fontWeight: state.shortcut === s ? 600 : 400,
                    color: state.shortcut === s ? "#7d152d" : undefined,
                  }}
                >
                  {SHORTCUT_LABELS[s]}
                </span>
                <span
                  className="text-muted-foreground"
                  style={{ fontSize: "0.75rem" }}
                >
                  {formatRange(r)}
                </span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Explicit inclusive from/to */}
      <div
        className="flex items-center gap-1.5 rounded-md border px-2"
        style={{ borderColor: "var(--border)", height: 36 }}
      >
        <input
          type="date"
          aria-label="Range start"
          value={state.range.from}
          max={state.range.to}
          onChange={(e) => setBound("from", e.target.value)}
          className="bg-transparent outline-none"
          style={{ fontSize: "0.8125rem" }}
        />
        <span className="text-muted-foreground" style={{ fontSize: "0.8125rem" }}>
          →
        </span>
        <input
          type="date"
          aria-label="Range end"
          value={state.range.to}
          min={state.range.from}
          onChange={(e) => setBound("to", e.target.value)}
          className="bg-transparent outline-none"
          style={{ fontSize: "0.8125rem" }}
        />
      </div>

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
