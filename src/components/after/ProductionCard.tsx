"use client";

import { useState } from "react";
import type { CastMember, Production } from "@/lib/types";
import { Badge } from "./Badge";
import styles from "./ProductionCard.module.css";

type Props = {
  production: Production;
  onArtistClick: (artist: CastMember, production: Production) => void;
};

const monthFmt = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
});

function formatDateRange(p: Production) {
  if (p.dates.length === 0) return "";
  if (p.dates.length === 1) return monthFmt.format(new Date(p.dates[0].iso));
  const sorted = [...p.dates].sort((a, b) => a.iso.localeCompare(b.iso));
  const first = monthFmt.format(new Date(sorted[0].iso));
  const last = monthFmt.format(new Date(sorted[sorted.length - 1].iso));
  return `${first} → ${last}`;
}

function CoverFallback({ work }: { work: string }) {
  // Editorial fallback when no image. Uses the work's initial letter
  // set in serif, on a warm pale wash. No glassmorphism, no AI gradient.
  const initial = work.replace(/^The\s+/i, "").charAt(0);
  return (
    <div className={styles.coverFallback} aria-hidden>
      <span>{initial}</span>
    </div>
  );
}

export function ProductionCard({ production: p, onArtistClick }: Props) {
  const [expanded, setExpanded] = useState(false);

  const principals = p.cast.filter((c) => c.voice !== "Director");
  const conductor = p.cast.find((c) => c.voice === "Conductor");
  const director = p.cast.find((c) => c.voice === "Director");
  const sortedDates = [...p.dates].sort((a, b) => a.iso.localeCompare(b.iso));
  const nextDate = sortedDates[0];
  const totalDates = sortedDates.length;

  return (
    <article
      className={styles.card}
      data-expanded={expanded}
      aria-expanded={expanded}
    >
      <div className={styles.head}>
        <div className={styles.cover}>
          {p.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.image} alt={p.imageAlt || `${p.work} production`} />
          ) : (
            <CoverFallback work={p.work} />
          )}
          {p.badges && p.badges.length > 0 && (
            <div className={styles.badgesOnImg}>
              {p.badges.slice(0, 2).map((b) => (
                <Badge key={b} kind={b} />
              ))}
            </div>
          )}
        </div>

        <div className={styles.body}>
          <div className={styles.composer}>{p.composer}</div>
          <h3 className={styles.title}>
            <a href="#">{p.work}</a>
          </h3>
          {p.workType && <div className={styles.workType}>{p.workType}</div>}

          <div className={styles.venue}>
            <a href="#" className={styles.company}>
              {p.company}
            </a>
            <span className={styles.venuesep}>·</span>
            <span>{p.city}</span>
          </div>

          <div className={styles.dateRow}>
            <div className={styles.dateChip}>
              <span className={styles.dateLabel}>Next</span>
              <span className={styles.dateValue}>
                {monthFmt.format(new Date(nextDate.iso))}
              </span>
            </div>
            <div className={styles.dateMeta}>
              <strong>
                {totalDates} {totalDates === 1 ? "performance" : "performances"}
              </strong>
              <span>{formatDateRange(p)}</span>
            </div>
          </div>

          <div className={styles.principals}>
            {principals.slice(0, 3).map((artist, i) => (
              <button
                key={artist.id}
                type="button"
                className={styles.principal}
                onClick={() => onArtistClick(artist, p)}
              >
                <span className={styles.principalInitial} aria-hidden>
                  {artist.name.charAt(0)}
                </span>
                <span className={styles.principalText}>
                  <span className={styles.principalName}>{artist.name}</span>
                  <span className={styles.principalRole}>
                    {artist.role}{" "}
                    <em className={styles.principalVoice}>({artist.voice})</em>
                  </span>
                </span>
                {i === 0 && artist.debut && (
                  <span className={styles.debutTag}>Role debut</span>
                )}
              </button>
            ))}
          </div>

          <div className={styles.actions}>
            <a className={styles.ticketBtn} href="#">
              Get tickets
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 5h6m0 0L5 2m3 3L5 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </a>
            <button
              type="button"
              className={styles.quickLookBtn}
              onClick={() => setExpanded((v) => !v)}
              aria-controls={`ql-${p.id}`}
            >
              {expanded ? "Hide details" : "See full cast & dates"}
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                style={{
                  transform: expanded ? "rotate(180deg)" : "rotate(0)",
                  transition: "transform 220ms",
                }}
              >
                <path
                  d="M1 1l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Quick-look reveal — uses grid-template-rows so the layout
          property doesn't get animated. */}
      <div
        id={`ql-${p.id}`}
        className={styles.quickLookWrap}
        data-open={expanded}
      >
        <div className={styles.quickLook}>
          <div className={styles.qlSection}>
            <div className={styles.qlLabel}>Full cast</div>
            <ul className={styles.qlCast}>
              {p.cast.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    className={styles.qlCastBtn}
                    onClick={() => onArtistClick(c, p)}
                  >
                    <span className={styles.qlRole}>{c.role}</span>
                    <span className={styles.qlName}>{c.name}</span>
                    <span className={styles.qlVoice}>{c.voice}</span>
                    {c.debut && <span className={styles.qlDebut}>Debut</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {(conductor || director) && (
            <div className={styles.qlSection}>
              <div className={styles.qlLabel}>Creative team</div>
              <div className={styles.qlCreative}>
                {conductor && (
                  <button
                    type="button"
                    className={styles.qlCreativeBtn}
                    onClick={() => onArtistClick(conductor, p)}
                  >
                    <span>Conductor</span>
                    <strong>{conductor.name}</strong>
                  </button>
                )}
                {director && (
                  <button
                    type="button"
                    className={styles.qlCreativeBtn}
                    onClick={() => onArtistClick(director, p)}
                  >
                    <span>Director</span>
                    <strong>{director.name}</strong>
                  </button>
                )}
              </div>
            </div>
          )}

          <div className={styles.qlSection}>
            <div className={styles.qlLabel}>All dates · book a specific show</div>
            <ol className={styles.qlDates}>
              {sortedDates.map((d) => {
                const date = new Date(d.iso);
                return (
                  <li key={d.iso} className={styles.qlDate}>
                    <div className={styles.qlDateBlock}>
                      <span className={styles.qlDay}>
                        {date.toLocaleDateString("en-GB", { day: "2-digit" })}
                      </span>
                      <span className={styles.qlMonth}>
                        {date.toLocaleDateString("en-GB", { month: "short" })}
                      </span>
                    </div>
                    <span className={styles.qlWeekday}>
                      {date.toLocaleDateString("en-GB", { weekday: "long" })}
                    </span>
                    <span
                      className={styles.qlStatus}
                      data-status={d.status || "available"}
                    >
                      {d.status === "sold-out"
                        ? "Sold out"
                        : d.status === "low"
                          ? "Few seats left"
                          : "On sale"}
                    </span>
                    {d.status !== "sold-out" ? (
                      <a className={styles.qlBookBtn} href="#">
                        Book
                      </a>
                    ) : (
                      <span className={styles.qlBookDisabled}>—</span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          {p.productionNote && (
            <p className={styles.productionNote}>{p.productionNote}</p>
          )}
        </div>
      </div>
    </article>
  );
}
