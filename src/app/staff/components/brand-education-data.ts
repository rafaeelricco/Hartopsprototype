// =============================================================================
// Mock data for Brand Education — Documents, serving instructions, brand scripts,
// setup info, evaluation sheets. Linkable to brands, campaigns, and events.
// =============================================================================

import type { LucideIcon } from "lucide-react";
import {
  Wine,
  ScrollText,
  Wrench,
  ClipboardCheck,
  FileText,
} from "lucide-react";

// ── Document types ──────────────────────────────────────────────────────────

export const DOCUMENT_TYPES = [
  "Serving Instructions",
  "Brand Script",
  "Setup Info",
  "Evaluation Sheet",
  "General",
] as const;

export type DocumentType = (typeof DOCUMENT_TYPES)[number];

export const DOCUMENT_TYPE_STYLES: Record<
  DocumentType,
  { bg: string; text: string; icon: LucideIcon }
> = {
  "Serving Instructions": { bg: "#ECFDF5", text: "#0F766E", icon: Wine },
  "Brand Script": { bg: "#EFF6FF", text: "#1D4ED8", icon: ScrollText },
  "Setup Info": { bg: "#FFF7ED", text: "#C2410C", icon: Wrench },
  "Evaluation Sheet": { bg: "#F5F3FF", text: "#7C3AED", icon: ClipboardCheck },
  General: { bg: "#F1F5F9", text: "#64748B", icon: FileText },
};

// ── File types ──────────────────────────────────────────────────────────────

export type FileType = "pdf" | "doc" | "image" | "spreadsheet";

export const FILE_TYPE_LABELS: Record<FileType, string> = {
  pdf: "PDF",
  doc: "Document",
  image: "Image",
  spreadsheet: "Spreadsheet",
};

// ── Brand entity ────────────────────────────────────────────────────────────
// Brands are the organizing layer for the product library. Each brand carries
// canonical "product info" content (story, talking points, compliance notes)
// that gets surfaced to educators in the mobile app alongside any SKUs linked
// to it. See IMP-649 for the broader rationale.

export interface Brand {
  id: string;
  name: string;
  supplier?: string;
  logoUrl?: string;
  /** Short brand story — supports the lightweight markdown used across the app (**bold**, *italic*, ## headings). */
  story?: string;
  /** Key talking points educators should know when sampling. */
  keyTalkingPoints?: string[];
  /** Compliance or legal notes that must not be forgotten at the venue. */
  complianceNotes?: string;
  tags?: string[];
  updatedAt?: string;
}

export const BRAND_LIST: Brand[] = [
  {
    id: "brand-absolut",
    name: "Absolut",
    supplier: "Pernod Ricard",
    logoUrl:
      "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=256&q=80",
    story:
      "## Swedish vodka, one source\nCrafted in Åhus, Sweden, from winter wheat and pure deep-well water. **One source**, one community, one superior taste since 1879. Absolut champions bold creativity and inclusivity — every bottle tells the story of the same village that has made it for more than 140 years.",
    keyTalkingPoints: [
      "Single-source wheat and water from Åhus, Sweden",
      "Continuous distillation — no batches, no shortcuts",
      "Flavored range uses natural ingredients, no added sugar",
      "Pairs exceptionally well in cocktails and mixers",
    ],
    complianceNotes:
      "21+ only. Verify ID before serving any sample. Do not pour more than a 0.25 oz taste.",
    tags: ["vodka", "flagship", "cocktail"],
    updatedAt: "2026-03-21",
  },
  {
    id: "brand-kahlua",
    name: "Kahlúa",
    supplier: "Pernod Ricard",
    story:
      "## The original coffee liqueur\nKahlúa has been blending rum, sugar, vanilla, and 100% arabica beans from Veracruz since 1936. The *signature ingredient* in an Espresso Martini and the comforting base of countless after-dinner drinks worldwide.",
    keyTalkingPoints: [
      "100% arabica coffee beans from Veracruz, Mexico",
      "Hero cocktails: Espresso Martini, White Russian, Mudslide",
      "Works chilled, over ice, or as a dessert pour",
    ],
    complianceNotes:
      "Contains caffeine. Flag to consumers who ask about late-evening sampling.",
    tags: ["coffee-liqueur", "dessert", "espresso-martini"],
    updatedAt: "2026-02-14",
  },
  {
    id: "brand-malibu",
    name: "Malibu",
    supplier: "Pernod Ricard",
    story:
      "## Taste the island life\nCoconut-flavored Caribbean rum liqueur, first crafted in Barbados in 1980. **Light, sweet, summer-ready.** The easy gateway to tropical cocktails.",
    keyTalkingPoints: [
      "21% ABV — lighter than a standard rum",
      "Best served with pineapple, orange, or cranberry juice",
      "Excellent for beach, poolside, and festival activations",
    ],
    tags: ["rum", "coconut", "tropical"],
    updatedAt: "2026-01-30",
  },
  {
    id: "brand-beefeater",
    name: "Beefeater",
    supplier: "Pernod Ricard",
    tags: ["gin", "london-dry"],
    updatedAt: "2025-12-01",
  },
  {
    id: "brand-jameson",
    name: "Jameson",
    supplier: "Pernod Ricard",
    story:
      "## Triple-distilled Irish whiskey\nFrom Midleton, County Cork since 1780. Triple-distilled for a notably smooth finish — the **most approachable Irish whiskey** for new sippers.",
    keyTalkingPoints: [
      "Triple-distilled — smoother than most Scotch or Bourbon",
      "Great neat, on the rocks, or in a Ginger & Lime",
      "Perfect bridge for consumers new to whiskey",
    ],
    tags: ["whiskey", "irish", "smooth"],
    updatedAt: "2026-03-05",
  },
  {
    id: "brand-makers-mark",
    name: "Maker's Mark",
    supplier: "Beam Suntory",
    tags: ["bourbon", "wheated"],
    updatedAt: "2026-02-10",
  },
  {
    id: "brand-hendricks",
    name: "Hendrick's",
    supplier: "William Grant",
    tags: ["gin", "craft"],
    updatedAt: "2026-02-18",
  },
  {
    id: "brand-crystal-creek",
    name: "Crystal Creek",
    supplier: "Hart Private Label",
    tags: ["mixer", "private-label"],
    updatedAt: "2026-01-15",
  },
  {
    id: "brand-mango-sunrise",
    name: "Mango Sunrise",
    supplier: "Hart Private Label",
    story:
      "## Tropical hard seltzer\nA Hart private-label release: real mango essence, only 100 calories, and 5% ABV. Bright, clean, and positioned for the **summer festival circuit**.",
    keyTalkingPoints: [
      "100 calories per 12 oz can",
      "Real fruit essence — no artificial flavoring",
      "Serves best chilled, straight from the can",
      "Target demo: 21–34 festival-goers, beach events",
    ],
    tags: ["seltzer", "private-label", "summer-2026"],
    updatedAt: "2026-03-18",
  },
];

// ── BrandDocument interface ─────────────────────────────────────────────────

export interface BrandDocument {
  id: string;
  title: string;
  description: string;
  type: DocumentType;
  fileUrl: string;
  fileName: string;
  fileType: FileType;
  fileSizeKB: number;
  brandName: string;
  brandId: string;
  linkedCampaignIds: string[];
  linkedEventIds: string[];
  tags: string[];
  status: "active" | "archived" | "draft";
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// ── Mock documents ──────────────────────────────────────────────────────────

export const INITIAL_DOCUMENTS: BrandDocument[] = [
  {
    id: "doc-1",
    title: "Absolut Vodka — Serving Guide",
    description:
      "Complete serving instructions for Absolut Vodka sampling events. Includes pour sizes, recommended cocktails, garnish specifications, and temperature guidelines.",
    type: "Serving Instructions",
    fileUrl: "/documents/absolut-serving-guide.pdf",
    fileName: "absolut-serving-guide.pdf",
    fileType: "pdf",
    fileSizeKB: 2340,
    brandName: "Absolut",
    brandId: "brand-absolut",
    linkedCampaignIds: ["camp-2"],
    linkedEventIds: [],
    tags: ["vodka", "cocktails", "pour-guide"],
    status: "active",
    createdAt: "2026-01-10",
    updatedAt: "2026-03-01",
    createdBy: "Jane Smith",
  },
  {
    id: "doc-2",
    title: "Summer Seltzer Launch — Brand Script",
    description:
      "Talking points, key messaging, and educator script for the Summer Seltzer Launch campaign. Covers product benefits, target demographics, and competitive positioning.",
    type: "Brand Script",
    fileUrl: "/documents/seltzer-brand-script.pdf",
    fileName: "seltzer-brand-script.pdf",
    fileType: "pdf",
    fileSizeKB: 1850,
    brandName: "Mango Sunrise",
    brandId: "brand-mango-sunrise",
    linkedCampaignIds: ["camp-1"],
    linkedEventIds: [],
    tags: ["seltzer", "talking-points", "summer-2026"],
    status: "active",
    createdAt: "2026-01-12",
    updatedAt: "2026-02-28",
    createdBy: "Jane Smith",
  },
  {
    id: "doc-3",
    title: "Malibu — Event Setup Guide",
    description:
      "Step-by-step setup instructions for Malibu sampling events. Includes table layout, signage placement, cooler setup, and branded materials checklist.",
    type: "Setup Info",
    fileUrl: "/documents/malibu-setup-guide.pdf",
    fileName: "malibu-setup-guide.pdf",
    fileType: "pdf",
    fileSizeKB: 3100,
    brandName: "Malibu",
    brandId: "brand-malibu",
    linkedCampaignIds: ["camp-2"],
    linkedEventIds: [],
    tags: ["setup", "checklist", "materials"],
    status: "active",
    createdAt: "2025-12-20",
    updatedAt: "2026-02-15",
    createdBy: "Chris Azrak",
  },
  {
    id: "doc-4",
    title: "Q1 Retail Activation — Evaluation Sheet",
    description:
      "Post-event evaluation form for Q1 retail activation events. Tracks educator performance, consumer engagement, sales impact, and venue feedback.",
    type: "Evaluation Sheet",
    fileUrl: "/documents/q1-retail-eval-sheet.pdf",
    fileName: "q1-retail-eval-sheet.pdf",
    fileType: "pdf",
    fileSizeKB: 890,
    brandName: "Absolut",
    brandId: "brand-absolut",
    linkedCampaignIds: ["camp-2"],
    linkedEventIds: [],
    tags: ["evaluation", "performance", "retail"],
    status: "active",
    createdAt: "2026-01-03",
    updatedAt: "2026-03-05",
    createdBy: "Jane Smith",
  },
  {
    id: "doc-5",
    title: "Jameson — Brand Education Overview",
    description:
      "Comprehensive brand education document for Jameson Irish Whiskey. Heritage story, production process, tasting notes, and suggested pairings for educator training.",
    type: "Brand Script",
    fileUrl: "/documents/jameson-brand-education.pdf",
    fileName: "jameson-brand-education.pdf",
    fileType: "pdf",
    fileSizeKB: 4200,
    brandName: "Jameson",
    brandId: "brand-jameson",
    linkedCampaignIds: [],
    linkedEventIds: [],
    tags: ["whiskey", "education", "heritage"],
    status: "active",
    createdAt: "2025-11-15",
    updatedAt: "2026-01-20",
    createdBy: "Chris Azrak",
  },
  {
    id: "doc-6",
    title: "Hendrick's Gin — Cocktail Recipes",
    description:
      "Signature cocktail recipes featuring Hendrick's Gin for on-premise sampling events. Includes ingredients, methods, garnish, and presentation guidelines.",
    type: "Serving Instructions",
    fileUrl: "/documents/hendricks-cocktails.pdf",
    fileName: "hendricks-cocktails.pdf",
    fileType: "pdf",
    fileSizeKB: 1650,
    brandName: "Hendrick's",
    brandId: "brand-hendricks",
    linkedCampaignIds: ["camp-8"],
    linkedEventIds: [],
    tags: ["gin", "cocktails", "recipes"],
    status: "active",
    createdAt: "2026-02-01",
    updatedAt: "2026-03-10",
    createdBy: "Jane Smith",
  },
  {
    id: "doc-7",
    title: "Maker's Mark — Tasting Event Setup",
    description:
      "Detailed setup guide for Maker's Mark bourbon tasting events. Covers glassware, ice protocol, tasting mats, and branded display arrangement.",
    type: "Setup Info",
    fileUrl: "/documents/makers-mark-tasting-setup.pdf",
    fileName: "makers-mark-tasting-setup.pdf",
    fileType: "pdf",
    fileSizeKB: 2780,
    brandName: "Maker's Mark",
    brandId: "brand-makers-mark",
    linkedCampaignIds: ["camp-8"],
    linkedEventIds: [],
    tags: ["bourbon", "tasting", "setup"],
    status: "active",
    createdAt: "2026-02-05",
    updatedAt: "2026-03-08",
    createdBy: "Chris Azrak",
  },
  {
    id: "doc-8",
    title: "Music Festival — Event Evaluation",
    description:
      "Evaluation template for music festival brand activation events. Includes crowd engagement metrics, product movement, staff performance, and brand visibility scoring.",
    type: "Evaluation Sheet",
    fileUrl: "/documents/festival-eval-template.xlsx",
    fileName: "festival-eval-template.xlsx",
    fileType: "spreadsheet",
    fileSizeKB: 560,
    brandName: "Absolut",
    brandId: "brand-absolut",
    linkedCampaignIds: ["camp-3"],
    linkedEventIds: [],
    tags: ["festival", "evaluation", "template"],
    status: "active",
    createdAt: "2025-12-10",
    updatedAt: "2026-02-20",
    createdBy: "Jane Smith",
  },
  {
    id: "doc-9",
    title: "Kahlúa — Brand Story & Talking Points",
    description:
      "Brand story, heritage, and key talking points for Kahlúa. Includes origin story, production process, flavor profile, and suggested food pairings.",
    type: "Brand Script",
    fileUrl: "/documents/kahlua-brand-story.pdf",
    fileName: "kahlua-brand-story.pdf",
    fileType: "pdf",
    fileSizeKB: 1920,
    brandName: "Kahlúa",
    brandId: "brand-kahlua",
    linkedCampaignIds: ["camp-2"],
    linkedEventIds: [],
    tags: ["kahlua", "coffee-liqueur", "brand-story"],
    status: "draft",
    createdAt: "2026-03-10",
    updatedAt: "2026-03-12",
    createdBy: "Jane Smith",
  },
  {
    id: "doc-10",
    title: "General — Compliance Guide for Sampling",
    description:
      "Universal compliance and legal guidelines for beverage alcohol sampling events across all brands. Required for all new educator onboarding.",
    type: "General",
    fileUrl: "/documents/compliance-sampling-guide.pdf",
    fileName: "compliance-sampling-guide.pdf",
    fileType: "pdf",
    fileSizeKB: 3400,
    brandName: "Absolut",
    brandId: "brand-absolut",
    linkedCampaignIds: [],
    linkedEventIds: [],
    tags: ["compliance", "legal", "onboarding"],
    status: "active",
    createdAt: "2025-10-01",
    updatedAt: "2026-03-01",
    createdBy: "Chris Azrak",
  },
];
