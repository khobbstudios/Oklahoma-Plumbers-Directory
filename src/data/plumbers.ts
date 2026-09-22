import type { BusinessHours } from "@/lib/hours";

export type Plumber = {
  id: string;
  name: string;
  /** E.164 format, e.g. "+19182186868" */
  phoneE164: string;
  hours: BusinessHours;
  address: string;
  /** Overrides the Google Maps search query when `address` isn't a mappable street address. */
  mapsQuery?: string;
};

const ALWAYS_OPEN: BusinessHours = { type: "24-7" };
const WEEKDAYS_8_TO_5: BusinessHours = {
  type: "scheduled",
  days: [1, 2, 3, 4, 5],
  start: "08:00",
  end: "17:00",
};

export const plumbers: Plumber[] = [
  {
    id: "andpro-plumbing",
    name: "Andpro Plumbing",
    phoneE164: "+19182186868",
    hours: ALWAYS_OPEN,
    address: "505 E Patti Page Blvd, Claremore, OK 74017",
  },
  {
    id: "sargents-plumbing",
    name: "Sargent's Plumbing",
    phoneE164: "+19183805637",
    hours: ALWAYS_OPEN,
    address: "Serving Claremore, OK",
    mapsQuery: "Sargent's Plumbing & Drain, Broken Arrow, OK",
  },
  {
    id: "sokt-plumbing",
    name: "Sokt Plumbing",
    phoneE164: "+19188296217",
    hours: ALWAYS_OPEN,
    address: "3404 Harbour Town Pl, Claremore, OK 74019",
  },
  {
    id: "sweet-and-sons-plumbing",
    name: "Sweet & Son's Plumbing",
    phoneE164: "+19189246110",
    hours: ALWAYS_OPEN,
    address: "1914 N Chambers Terrace, Claremore, OK 74017",
  },
  {
    id: "lowe-plumbing",
    name: "Lowe Plumbing",
    phoneE164: "+19185491998",
    hours: WEEKDAYS_8_TO_5,
    address: "Highway 66, Claremore, OK 74017",
  },
  {
    id: "solanos-plumbing",
    name: "Solanos Plumbing",
    phoneE164: "+19183403044",
    hours: ALWAYS_OPEN,
    address: "13651 S OK-66, Claremore, OK 74017",
  },
  {
    id: "akin-plumbing",
    name: "Akin Plumbing",
    phoneE164: "+19183412335",
    hours: WEEKDAYS_8_TO_5,
    address: "511 N Lynn Riggs Blvd, Claremore, OK 74017",
  },
  {
    id: "abc-plumbing",
    name: "ABC Plumbing",
    phoneE164: "+19183415508",
    hours: ALWAYS_OPEN,
    address: "15213 S 4195 Rd, Claremore, OK 74017",
  },
  {
    id: "torch-plumbing",
    name: "Torch Plumbing",
    phoneE164: "+19183586724",
    hours: ALWAYS_OPEN,
    address: "Serving Claremore, OK",
    mapsQuery: "Torch Plumbing, Heating, & Cooling, Owasso, OK",
  },
];
