// =============================================================================
// Report archive (reporting brief §5)
// =============================================================================
// Every generated report, newest first, labelled with its RESOLVED PARAMETERS
// rather than just its name — someone opening the list three weeks later must
// be able to tell what a file covers without opening it (§4).
//
// In-memory for the prototype, with a tiny subscribe/notify so the catalogue
// page and the runner stay in step.
// =============================================================================

import { formatRangeLong } from "./date-range";
import {
  ENTITY_LABELS,
  GRAIN_LABELS,
  GROUPING_LABELS,
  type EntityType,
  type ReportParameters,
} from "./report-parameters";
import type { ReportDefinition } from "./report-registry";

export interface ArchiveEntry {
  id: string;
  reportId: string;
  reportName: string;
  /** `10 Aug` — when it was generated. */
  generatedLabel: string;
  generatedAt: string;
  /** Human summary of the resolved parameters. */
  parameterSummary: string;
  format: string;
  /** Serialised parameter set — saving a configuration later is then trivial (§9). */
  parameters: ReportParameters;
  columns: string[];
  sampleRows: string[][];
  rowCount: number;
}

/**
 * Human-readable summary of what a report covers. This is the string that makes
 * an archive row self-describing.
 */
export function summariseParameters(
  def: ReportDefinition,
  params: ReportParameters,
): string {
  const parts: string[] = [formatRangeLong(params.range)];

  const scopeBits = Object.entries(params.scope)
    .filter(([, v]) => v && v.length > 0)
    .map(([k, v]) => {
      const label = ENTITY_LABELS[k as EntityType];
      return v!.length === 1 ? `${label}: ${v![0]}` : `${label}: ${v!.length} selected`;
    });
  parts.push(scopeBits.length > 0 ? scopeBits.join(" · ") : "all scopes");

  if (params.grouping) parts.push(`by ${GROUPING_LABELS[params.grouping].toLowerCase()}`);
  if (params.grain) parts.push(GRAIN_LABELS[params.grain].toLowerCase());
  if (params.splitBy) parts.push(`split by ${ENTITY_LABELS[params.splitBy].toLowerCase()}`);

  const activeToggles = (def.toggles ?? [])
    .filter((t) => params.toggles[t.id])
    .map((t) => t.label.toLowerCase());
  if (activeToggles.length > 0) parts.push(activeToggles.join(" · "));

  return parts.join(" · ");
}

// -----------------------------------------------------------------------------
// Store
// -----------------------------------------------------------------------------

type Listener = () => void;
const listeners = new Set<Listener>();

export const REPORT_ARCHIVE: { entries: ArchiveEntry[] } = {
  entries: [],
};

export function subscribeArchive(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  // Replace the array so useSyncExternalStore sees a new reference.
  REPORT_ARCHIVE.entries = [...REPORT_ARCHIVE.entries];
  listeners.forEach((l) => l());
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function addArchiveEntry(
  entry: Omit<ArchiveEntry, "id" | "generatedAt" | "generatedLabel">,
): ArchiveEntry {
  const now = new Date();
  const full: ArchiveEntry = {
    ...entry,
    id: `arch-${now.getTime()}-${Math.round(Math.random() * 1e6)}`,
    generatedAt: now.toISOString(),
    generatedLabel: `${now.getDate()} ${MONTHS[now.getMonth()]}`,
  };
  REPORT_ARCHIVE.entries = [full, ...REPORT_ARCHIVE.entries];
  notify();
  return full;
}
