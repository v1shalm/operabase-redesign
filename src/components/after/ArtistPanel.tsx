"use client";

import { useEffect } from "react";
import type { CastMember, Production } from "@/lib/types";
import styles from "./ArtistPanel.module.css";

type Props = {
  open: boolean;
  artist: CastMember | null;
  production: Production | null;
  onClose: () => void;
};

export function ArtistPanel({ open, artist, production, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        className={styles.scrim}
        data-open={open}
        onClick={onClose}
        aria-hidden
      />
      <aside
        className={styles.panel}
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-labelledby="artist-panel-name"
      >
        {artist && (
          <>
            <header className={styles.head}>
              <button
                type="button"
                className={styles.close}
                onClick={onClose}
                aria-label="Close artist preview"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 2l10 10M12 2L2 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <div className={styles.avatar} aria-hidden>
                {artist.name.charAt(0)}
              </div>
              <div className={styles.voice}>{artist.voice}</div>
              <h2 id="artist-panel-name" className={styles.name}>
                {artist.name}
              </h2>
              {production && (
                <div className={styles.context}>
                  Currently in <em>{production.work}</em> ·{" "}
                  {production.company}
                </div>
              )}
            </header>

            <div className={styles.body}>
              {artist.bio && (
                <section className={styles.section}>
                  <p className={styles.bio}>{artist.bio}</p>
                </section>
              )}

              {artist.role && (
                <section className={styles.section}>
                  <div className={styles.label}>Role in this production</div>
                  <div className={styles.role}>
                    {artist.role}
                    {artist.debut && (
                      <span className={styles.debutPill}>Role debut</span>
                    )}
                  </div>
                </section>
              )}

              {artist.topRoles && artist.topRoles.length > 0 && (
                <section className={styles.section}>
                  <div className={styles.label}>Best known for</div>
                  <ul className={styles.topRoles}>
                    {artist.topRoles.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </section>
              )}

              {artist.upcomingCount !== undefined && (
                <section className={styles.section}>
                  <div className={styles.label}>Upcoming performances</div>
                  <div className={styles.upcomingCount}>
                    <strong>{artist.upcomingCount}</strong>{" "}
                    <span>scheduled this season</span>
                  </div>
                </section>
              )}

              {artist.agency && (
                <section className={styles.section}>
                  <div className={styles.label}>Agency</div>
                  <div className={styles.agency}>{artist.agency}</div>
                </section>
              )}
            </div>

            <footer className={styles.foot}>
              <a className={styles.cta} href="#">
                View full artist profile
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M2 5h6m0 0L5 2m3 3L5 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
              <a className={styles.ctaSec} href="#">
                See all upcoming dates
              </a>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
