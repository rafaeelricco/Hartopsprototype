// =============================================================================
// Mock data for MM-UI-006 Brand Assets — Product Library + Help Resources.
// =============================================================================

// ── SKU / Product types ─────────────────────────────────────────────────────

export interface SKU {
  id: string;
  skuCode: string;
  productName: string;
  description: string;
  category: string;
  imageUrl: string;
  unitSize: string;
  abv: string;
  status: "active" | "discontinued" | "draft";
  brandId?: string;
  unitPrice?: number;
  createdAt: string;
  updatedAt: string;
}

export const SKU_CATEGORIES = [
  "Hard Seltzer",
  "Craft Beer",
  "Wine",
  "Spirits",
  "Mixers",
  "Non-Alcoholic",
  "Energy Drinks",
  "Juice",
] as const;

export type SKUCategory = (typeof SKU_CATEGORIES)[number];

export const INITIAL_SKUS: SKU[] = [
  {
    id: "sku-1",
    skuCode: "SEL-MNG-12",
    productName: "Mango Sunrise Seltzer",
    description:
      "Tropical mango-flavored hard seltzer with natural fruit essence. 100 calories per can.",
    category: "Hard Seltzer",
    imageUrl:
      "https://images.unsplash.com/photo-1659459007112-f509eac3e1f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdCUyMHNlbHR6ZXIlMjBjYW4lMjBiZXZlcmFnZXxlbnwxfHx8fDE3NzI2NTAxODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    unitSize: "12 oz can",
    abv: "5.0%",
    status: "active",
    brandId: "brand-mango-sunrise",
    unitPrice: 3.5,
    createdAt: "2025-08-15",
    updatedAt: "2026-01-20",
  },
  {
    id: "sku-2",
    skuCode: "MIX-GNG-750",
    productName: "Artisan Ginger Mixer",
    description:
      "Premium craft ginger beer mixer for cocktails. Small-batch brewed with real ginger root.",
    category: "Mixers",
    imageUrl:
      "https://images.unsplash.com/photo-1662783273183-d51239488c9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrdGFpbCUyMG1peGVyJTIwYm90dGxlJTIwcHJvZHVjdHxlbnwxfHx8fDE3NzI2NTAxODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    unitSize: "750 mL bottle",
    abv: "0.0%",
    status: "active",
    brandId: "brand-crystal-creek",
    unitPrice: 8.99,
    createdAt: "2025-09-01",
    updatedAt: "2026-02-10",
  },
  {
    id: "sku-3",
    skuCode: "WN-RSV-750",
    productName: "Reserve Cabernet Sauvignon",
    description:
      "Full-bodied Napa Valley cabernet with notes of dark cherry and oak. 2022 vintage.",
    category: "Wine",
    imageUrl:
      "https://images.unsplash.com/photo-1760920193193-91dd96af7862?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwYm90dGxlJTIwcHJvZHVjdCUyMGRhcmslMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3MjY1MDE5MXww&ixlib=rb-4.1.0&q=80&w=1080",
    unitSize: "750 mL bottle",
    abv: "14.2%",
    status: "active",
    unitPrice: 18.99,
    createdAt: "2025-06-12",
    updatedAt: "2025-12-05",
  },
  {
    id: "sku-4",
    skuCode: "BER-IPA-VP6",
    productName: "Haze Chaser IPA Variety Pack",
    description:
      "Six-pack featuring three rotating hazy IPA varieties. Limited seasonal release.",
    category: "Craft Beer",
    imageUrl:
      "https://images.unsplash.com/photo-1761281225058-e45fb33ffe47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVyJTIwdmFyaWV0eSUyMHBhY2slMjBjYW5zfGVufDF8fHx8MTc3MjY1MDE5NHww&ixlib=rb-4.1.0&q=80&w=1080",
    unitSize: "6×12 oz cans",
    abv: "6.8%",
    status: "active",
    unitPrice: 12.99,
    createdAt: "2025-11-01",
    updatedAt: "2026-02-28",
  },
  {
    id: "sku-5",
    skuCode: "SPI-VOD-750",
    productName: "Crystal Creek Vodka",
    description:
      "Triple-distilled premium vodka crafted from winter wheat. Clean, smooth finish.",
    category: "Spirits",
    imageUrl:
      "https://images.unsplash.com/photo-1759042953418-2d39e3de54dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwc3Bpcml0cyUyMGJvdHRsZSUyMHByb2R1Y3R8ZW58MXx8fHwxNzcyNjUwMTk4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    unitSize: "750 mL bottle",
    abv: "40.0%",
    status: "active",
    brandId: "brand-crystal-creek",
    unitPrice: 22.99,
    createdAt: "2025-07-20",
    updatedAt: "2026-01-15",
  },
  {
    id: "sku-6",
    skuCode: "SEL-LIM-12",
    productName: "Lime Fizz Sparkling Water",
    description:
      "Zero-calorie lime-infused sparkling water. No artificial sweeteners.",
    category: "Non-Alcoholic",
    imageUrl:
      "https://images.unsplash.com/photo-1730139334101-415188c70f17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFya2xpbmclMjB3YXRlciUyMGNhbiUyMGNvbG9yZnVsfGVufDF8fHx8MTc3MjY1MDIwMXww&ixlib=rb-4.1.0&q=80&w=1080",
    unitSize: "12 oz can",
    abv: "0.0%",
    status: "active",
    unitPrice: 2.49,
    createdAt: "2025-10-05",
    updatedAt: "2026-03-01",
  },
  {
    id: "sku-7",
    skuCode: "NRG-CIT-16",
    productName: "Volt Citrus Energy",
    description:
      "Natural citrus energy drink with B-vitamins and green tea extract. 160mg caffeine.",
    category: "Energy Drinks",
    imageUrl:
      "https://images.unsplash.com/photo-1690988109041-458628590a9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmVyZ3klMjBkcmluayUyMGNhbiUyMHByb2R1Y3QlMjBwaG90b3xlbnwxfHx8fDE3NzI2NTAyMDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    unitSize: "16 oz can",
    abv: "0.0%",
    status: "draft",
    unitPrice: 3.99,
    createdAt: "2026-02-20",
    updatedAt: "2026-03-02",
  },
  {
    id: "sku-8",
    skuCode: "JCE-BRY-16",
    productName: "Cold-Pressed Berry Blend",
    description:
      "Organic cold-pressed juice blend of blueberry, acai, and pomegranate. No added sugar.",
    category: "Juice",
    imageUrl:
      "https://images.unsplash.com/photo-1759006249055-8c4030a2d56a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdWljZSUyMGJvdHRsZSUyMG9yZ2FuaWMlMjBwcm9kdWN0fGVufDF8fHx8MTc3MjY1MDIwOHww&ixlib=rb-4.1.0&q=80&w=1080",
    unitSize: "16 oz bottle",
    abv: "0.0%",
    status: "discontinued",
    unitPrice: 6.99,
    createdAt: "2025-05-10",
    updatedAt: "2025-11-30",
  },
  // ── Campaign-level products (unified from MOCK_PRODUCTS) ─────────────────
  {
    id: "sku-001",
    skuCode: "ABS-VOD-750",
    productName: "Absolut Vodka 750ml",
    description:
      "Swedish premium vodka. Clean, rich, and smooth with a distinct character.",
    category: "Spirits",
    imageUrl:
      "https://images.unsplash.com/photo-1608885898957-a559228e4bee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    unitSize: "750 mL bottle",
    abv: "40.0%",
    status: "active",
    brandId: "brand-absolut",
    unitPrice: 24.99,
    createdAt: "2025-06-01",
    updatedAt: "2026-01-10",
  },
  {
    id: "sku-002",
    skuCode: "ABS-LIM-750",
    productName: "Absolut Lime 750ml",
    description: "Lime-flavored premium vodka with natural citrus essence.",
    category: "Spirits",
    imageUrl:
      "https://images.unsplash.com/photo-1614313511387-1436a4480ebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    unitSize: "750 mL bottle",
    abv: "40.0%",
    status: "active",
    brandId: "brand-absolut",
    unitPrice: 25.99,
    createdAt: "2025-06-01",
    updatedAt: "2026-01-10",
  },
  {
    id: "sku-003",
    skuCode: "KAH-CLS-700",
    productName: "Kahlúa 700ml",
    description:
      "Coffee-flavored liqueur made with 100% Arabica coffee and rum.",
    category: "Spirits",
    imageUrl:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    unitSize: "700 mL bottle",
    abv: "20.0%",
    status: "active",
    brandId: "brand-kahlua",
    unitPrice: 26.99,
    createdAt: "2025-06-01",
    updatedAt: "2026-01-10",
  },
  {
    id: "sku-004",
    skuCode: "MAL-COC-750",
    productName: "Malibu Coconut Rum 750ml",
    description:
      "Caribbean rum with natural coconut flavor. Smooth and refreshing.",
    category: "Spirits",
    imageUrl:
      "https://images.unsplash.com/photo-1598018553943-29ace5dc4bc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    unitSize: "750 mL bottle",
    abv: "21.0%",
    status: "active",
    brandId: "brand-malibu",
    unitPrice: 19.99,
    createdAt: "2025-06-01",
    updatedAt: "2026-01-10",
  },
  {
    id: "sku-005",
    skuCode: "BEF-GIN-750",
    productName: "Beefeater Gin 750ml",
    description:
      "Classic London dry gin with bold juniper character since 1863.",
    category: "Spirits",
    imageUrl:
      "https://images.unsplash.com/photo-1609951651556-5334e2706168?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    unitSize: "750 mL bottle",
    abv: "40.0%",
    status: "active",
    brandId: "brand-beefeater",
    unitPrice: 23.99,
    createdAt: "2025-06-01",
    updatedAt: "2026-01-10",
  },
  {
    id: "sku-006",
    skuCode: "JAM-IW-750",
    productName: "Jameson Irish Whiskey 750ml",
    description:
      "Triple-distilled blended Irish whiskey. Smooth, mellow, and perfectly balanced.",
    category: "Spirits",
    imageUrl:
      "https://images.unsplash.com/photo-1527281400683-1aae777175f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    unitSize: "750 mL bottle",
    abv: "40.0%",
    status: "active",
    brandId: "brand-jameson",
    unitPrice: 29.99,
    createdAt: "2025-06-01",
    updatedAt: "2026-01-10",
  },
  {
    id: "sku-007",
    skuCode: "MKR-BRB-750",
    productName: "Maker's Mark Bourbon 750ml",
    description:
      "Handmade Kentucky straight bourbon whisky. Bold, yet approachable.",
    category: "Spirits",
    imageUrl:
      "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    unitSize: "750 mL bottle",
    abv: "45.0%",
    status: "active",
    brandId: "brand-makers-mark",
    unitPrice: 34.99,
    createdAt: "2025-06-01",
    updatedAt: "2026-01-10",
  },
  {
    id: "sku-008",
    skuCode: "HND-GIN-700",
    productName: "Hendrick's Gin 700ml",
    description:
      "Scottish gin infused with rose petal and cucumber. Wonderfully peculiar.",
    category: "Spirits",
    imageUrl:
      "https://images.unsplash.com/photo-1585975754989-4f5a8e201e78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    unitSize: "700 mL bottle",
    abv: "41.4%",
    status: "active",
    brandId: "brand-hendricks",
    unitPrice: 36.99,
    createdAt: "2025-06-01",
    updatedAt: "2026-01-10",
  },
];

// ── Brand education linking utility ─────────────────────────────────────────

import { INITIAL_DOCUMENTS, type BrandDocument } from "./brand-education-data";

export function getDocumentsForSku(skuId: string): BrandDocument[] {
  const sku = INITIAL_SKUS.find((s) => s.id === skuId);
  if (!sku?.brandId) return [];
  return INITIAL_DOCUMENTS.filter(
    (d) => d.brandId === sku.brandId && d.status === "active",
  );
}

// ── Help Resources / FAQ types ──────────────────────────────────────────────

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  updatedAt: string;
  pushedAt: string | null; // null = not yet pushed to field teams
  version: number;
}

export const FAQ_CATEGORIES = [
  "Product Knowledge",
  "Event Setup",
  "Sampling Guidelines",
  "Compliance",
  "Troubleshooting",
] as const;

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "What is the legal drinking age verification process?",
    answer:
      "All consumers must present a valid government-issued photo ID before receiving any alcoholic sample. Check expiration date. Under-21 consumers may receive non-alcoholic product samples only. If in doubt, politely decline and offer a non-alcoholic alternative.",
    category: "Compliance",
    updatedAt: "2026-02-28T14:30:00Z",
    pushedAt: "2026-03-01T09:00:00Z",
    version: 3,
  },
  {
    id: "faq-2",
    question: "How do I set up the sampling station?",
    answer:
      "1) Unpack branded tablecloth and display materials first. 2) Position the table at least 6 feet from the store entrance. 3) Arrange product bottles/cans in a triangle formation with labels facing customers. 4) Place sample cups in stacks of 20 with napkins beside them. 5) Set up the iPad with the check-in app. 6) Ensure ice is filled to the top of the cooler.",
    category: "Event Setup",
    updatedAt: "2026-03-01T10:15:00Z",
    pushedAt: "2026-03-01T10:30:00Z",
    version: 5,
  },
  {
    id: "faq-3",
    question: "What are the key talking points for Mango Sunrise Seltzer?",
    answer:
      "• Only 100 calories per can, zero sugar\n• Made with natural mango fruit essence — no artificial flavors\n• 5.0% ABV — sessionable and refreshing\n• Gluten-free and vegan-friendly\n• Best served chilled at 38–42°F\n• Pair with: grilled seafood, tropical fruit salads, light appetizers",
    category: "Product Knowledge",
    updatedAt: "2026-02-25T16:00:00Z",
    pushedAt: "2026-02-26T08:00:00Z",
    version: 2,
  },
  {
    id: "faq-4",
    question: "What if a consumer has an allergic reaction?",
    answer:
      "1) Stay calm and call 911 immediately if the reaction is severe. 2) Do not administer any medication. 3) Note the consumer's name, time, and product consumed. 4) Contact your event manager immediately. 5) File an incident report within 1 hour using the app's Incident tab. All products contain allergen labeling — always point consumers to the label before sampling.",
    category: "Troubleshooting",
    updatedAt: "2026-01-15T09:00:00Z",
    pushedAt: "2026-01-15T10:00:00Z",
    version: 4,
  },
  {
    id: "faq-5",
    question: "How many samples should each consumer receive?",
    answer:
      "Standard policy: one 1-oz pour of each product per consumer (max 3 products). For non-alcoholic items, consumers may sample up to 2 oz of each product. Track every sample via the iPad check-in. If a consumer requests more, politely explain the one-sample policy and offer to direct them to the retail shelf for purchase.",
    category: "Sampling Guidelines",
    updatedAt: "2026-02-10T11:30:00Z",
    pushedAt: "2026-02-10T12:00:00Z",
    version: 2,
  },
  {
    id: "faq-6",
    question: "How do I handle leftover product at the end of an event?",
    answer:
      "Opened product must be disposed of — do not offer to store staff or take home. Sealed product goes back into the cooler for transport. Log all remaining sealed units in the post-event inventory section of the app. Take a photo of the final inventory count for proof-of-performance.",
    category: "Event Setup",
    updatedAt: "2026-02-18T13:45:00Z",
    pushedAt: null,
    version: 1,
  },
  {
    id: "faq-7",
    question: "What talking points should I use for Crystal Creek Vodka?",
    answer:
      "• Triple-distilled from premium winter wheat\n• Exceptionally smooth, clean finish — no burn\n• 40% ABV — classic vodka strength\n• Versatile base for cocktails or served neat/on the rocks\n• Produced in small batches for quality control\n• Suggest pairing with the Artisan Ginger Mixer for a Moscow Mule",
    category: "Product Knowledge",
    updatedAt: "2026-03-02T08:20:00Z",
    pushedAt: null,
    version: 1,
  },
];

// ── Auto Upload AI mock results ─────────────────────────────────────────────

export interface AIPrefilledSKU {
  productName: string;
  skuCode: string;
  description: string;
  category: string;
  unitSize: string;
  abv: string;
  confidence: number; // 0-1
  /** Per-field confidence flags — fields below threshold are highlighted for review */
  lowConfidenceFields?: string[];
}

/** Simulates the AI extracting SKU data from an uploaded file */
export function mockAIExtractSKUs(): AIPrefilledSKU[] {
  return [
    {
      productName: "Peach Bellini Seltzer",
      skuCode: "SEL-PCH-12",
      description:
        "Refreshing peach bellini flavored hard seltzer with natural peach essence.",
      category: "Hard Seltzer",
      unitSize: "12 oz can",
      abv: "4.5%",
      confidence: 0.94,
      lowConfidenceFields: [],
    },
    {
      productName: "Cucumber Mint Spritzer",
      skuCode: "NA-CMN-12",
      description: "Non-alcoholic cucumber and mint sparkling spritzer.",
      category: "Non-Alcoholic",
      unitSize: "12 oz can",
      abv: "0.0%",
      confidence: 0.87,
      lowConfidenceFields: ["description"],
    },
    {
      productName: "Barrel-Aged Stout",
      skuCode: "BER-STO-16",
      description: "Rich imperial stout aged in bourbon barrels for 6 months.",
      category: "Craft Beer",
      unitSize: "16 oz can",
      abv: "10.5%",
      confidence: 0.72,
      lowConfidenceFields: ["abv", "category"],
    },
  ];
}
