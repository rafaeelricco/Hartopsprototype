// =============================================================================
// DateRangeControl — the shared date-range control (reporting brief §2, §4.1)
// =============================================================================
// Inclusive from/to plus a shortcut menu. The resolved dates always render
// beside the shortcut label, so the active window is never ambiguous.
//
// Used by the Market Manager dashboard (forward/triage shortcuts) and the
// Reports runner (backward/reporting shortcuts). The control is identical in
// both; only the offered `shortcuts` differ.
// =============================================================================

import { CalendarRange } from "lucide-react";
import { Button } from "@/app/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/shared/components/ui/dropdown-menu";
import {
  SHORTCUT_LABELS,
  formatRange,
  resolveShortcut,
  type DateRange,
  type RangeShortcut,
} from "@/app/shared/data/date-range";

export interface DateRangeValue {
  /** null once either endpoint is edited by hand — the range is then custom. */
  shortcut: RangeShortcut | null;
  range: DateRange;
}

interface Props {
  value: DateRangeValue;
  /** The subset of shortcuts this surface offers. */
  shortcuts: RangeShortcut[];
  onChange: (next: DateRangeValue) => void;
  /** Stacks the shortcut menu above the inputs — for narrow parameter columns. */
  stacked?: boolean;
  idPrefix?: string;
}

export function DateRangeControl({
  value,
  shortcuts,
  onChange,
  stacked = false,
  idPrefix = "range",
}: Props) {
  function pickShortcut(shortcut: RangeShortcut) {
    onChange({ shortcut, range: resolveShortcut(shortcut) });
  }

  // Editing either endpoint drops the shortcut label — the range is now custom.
  function setBound(which: "from" | "to", next: string) {
    if (!next) return;
    const range = { ...value.range, [which]: next };
    if (range.from > range.to) {
      if (which === "from") range.to = next;
      else range.from = next;
    }
    onChange({ shortcut: null, range });
  }

  const label = value.shortcut ? SHORTCUT_LABELS[value.shortcut] : "Custom range";

  return (
    <div
      className={
        stacked
          ? "flex flex-col gap-1.5"
          : "flex flex-wrap items-center gap-2"
      }
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={stacked ? "gap-2 justify-start w-full" : "gap-2"}
          >
            <CalendarRange className="size-4 text-primary shrink-0" />
            <span style={{ fontWeight: 500 }}>{label}</span>
            {!stacked && (
              <span className="text-muted-foreground">
                · {formatRange(value.range)}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          {shortcuts.map((s) => {
            const r = resolveShortcut(s);
            const active = value.shortcut === s;
            return (
              <DropdownMenuItem
                key={s}
                onClick={() => pickShortcut(s)}
                className="flex items-center justify-between gap-3"
              >
                <span
                  style={{
                    fontWeight: active ? 600 : 400,
                    color: active ? "#7d152d" : undefined,
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
        className={`flex items-center gap-1.5 rounded-md border px-2 ${
          stacked ? "w-full justify-between" : ""
        }`}
        style={{ borderColor: "var(--border)", height: 36 }}
      >
        <input
          id={`${idPrefix}-from`}
          type="date"
          aria-label="Range start"
          value={value.range.from}
          max={value.range.to}
          onChange={(e) => setBound("from", e.target.value)}
          className="bg-transparent outline-none"
          style={{ fontSize: "0.8125rem" }}
        />
        <span
          className="text-muted-foreground"
          style={{ fontSize: "0.8125rem" }}
        >
          →
        </span>
        <input
          id={`${idPrefix}-to`}
          type="date"
          aria-label="Range end"
          value={value.range.to}
          min={value.range.from}
          onChange={(e) => setBound("to", e.target.value)}
          className="bg-transparent outline-none"
          style={{ fontSize: "0.8125rem" }}
        />
      </div>

      {stacked && (
        <span
          className="text-muted-foreground"
          style={{ fontSize: "0.75rem" }}
        >
          {formatRange(value.range)}
        </span>
      )}
    </div>
  );
}
