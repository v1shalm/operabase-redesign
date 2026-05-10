export type VoiceType =
  | "Soprano"
  | "Mezzo-soprano"
  | "Tenor"
  | "Baritone"
  | "Bass-baritone"
  | "Bass"
  | "Counter-tenor"
  | "Conductor"
  | "Director";

export type CastMember = {
  id: string;
  name: string;
  voice: VoiceType;
  role: string;
  /** Whether this performer is a debut for this role. */
  debut?: boolean;
  /** Used for the artist preview side panel. */
  bio?: string;
  topRoles?: string[];
  agency?: string;
  upcomingCount?: number;
};

export type EditorialBadge =
  | "world-premiere"
  | "new-production"
  | "artist-debut"
  | "festival"
  | "booking-fast"
  | "critically-acclaimed"
  | "final-run";

export type PerformanceDate = {
  iso: string; // "2026-06-12"
  status?: "available" | "low" | "sold-out";
  ticketUrl?: string;
};

export type Production = {
  id: string;
  work: string;
  composer: string;
  /** A short label below the title, e.g., "Opera in 3 acts". */
  workType?: string;
  company: string;
  venue: string;
  city: string;
  country: string;
  /** Editorial production photo. Use a URL string; fallback handled in UI. */
  image?: string;
  imageAlt?: string;
  dates: PerformanceDate[];
  cast: CastMember[];
  badges?: EditorialBadge[];
  productionNote?: string;
  language?: string;
};
