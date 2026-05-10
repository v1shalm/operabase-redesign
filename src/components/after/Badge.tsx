import type { EditorialBadge } from "@/lib/types";
import styles from "./Badge.module.css";

const LABELS: Record<EditorialBadge, { label: string; tone: string }> = {
  "world-premiere": { label: "World premiere", tone: "amber" },
  "new-production": { label: "New production", tone: "accent" },
  "artist-debut": { label: "Role debut", tone: "blue" },
  festival: { label: "Festival", tone: "neutral" },
  "booking-fast": { label: "Booking fast", tone: "danger" },
  "critically-acclaimed": { label: "Acclaimed", tone: "blue" },
  "final-run": { label: "Final run", tone: "amber" },
};

export function Badge({ kind }: { kind: EditorialBadge }) {
  const meta = LABELS[kind];
  return (
    <span className={styles.badge} data-tone={meta.tone}>
      {meta.label}
    </span>
  );
}
