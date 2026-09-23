export type Plumber = {
  id: string;
  name: string;
  /** E.164 format, e.g. "+19182186868" */
  phoneE164: string;
};

export const plumbers: Plumber[] = [
  { id: "andpro-plumbing", name: "Andpro Plumbing", phoneE164: "+19182186868" },
  { id: "sargents-plumbing", name: "Sargent's Plumbing", phoneE164: "+19183805637" },
  { id: "sokt-plumbing", name: "Sokt Plumbing", phoneE164: "+19188296217" },
  { id: "sweet-and-sons-plumbing", name: "Sweet & Son's Plumbing", phoneE164: "+19189246110" },
  { id: "lowe-plumbing", name: "Lowe Plumbing", phoneE164: "+19185491998" },
  { id: "solanos-plumbing", name: "Solanos Plumbing", phoneE164: "+19183403044" },
  { id: "akin-plumbing", name: "Akin Plumbing", phoneE164: "+19183412335" },
  { id: "abc-plumbing", name: "ABC Plumbing", phoneE164: "+19183415508" },
  { id: "torch-plumbing", name: "Torch Plumbing", phoneE164: "+19183586724" },
];
