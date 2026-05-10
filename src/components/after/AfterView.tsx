"use client";

import { useMemo, useState } from "react";
import {
  PRODUCTIONS,
  EMPTY_FILTERS,
  applyFilters,
  uniqueValues,
} from "@/lib/data";
import type { FilterState } from "@/lib/data";
import type { CastMember, Production } from "@/lib/types";
import { ProductionCard } from "./ProductionCard";
import { ArtistPanel } from "./ArtistPanel";
import styles from "./AfterView.module.css";

/**
 * Redesigned /productions.
 *
 * Same brand DNA (fonts/colors/scale), better IA:
 *  - Production-grouped cards (not row-per-date)
 *  - Smart filter bar surfaced on top, sticky
 *  - Editorial badges at the listing level
 *  - Quick-look opens in place
 *  - Artist clicks open a side panel — no nav away
 *  - Empty state suggests recovery, doesn't dead-end
 */
export function AfterView() {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [view, setViewMode] = useState<"grid" | "compact">("grid");
  const [panelArtist, setPanelArtist] = useState<CastMember | null>(null);
  const [panelProduction, setPanelProduction] = useState<Production | null>(
    null,
  );

  const cities = useMemo(() => uniqueValues(PRODUCTIONS, (p) => p.city), []);
  const composers = useMemo(
    () => uniqueValues(PRODUCTIONS, (p) => p.composer),
    [],
  );
  const filtered = useMemo(
    () => applyFilters(PRODUCTIONS, filters),
    [filters],
  );

  const update = (k: keyof FilterState, v: string) =>
    setFilters((s) => ({ ...s, [k]: v }));

  const activeFilters = Object.entries(filters).filter(([, v]) => v !== "");
  const totalDates = filtered.reduce((sum, p) => sum + p.dates.length, 0);

  const onArtistClick = (a: CastMember, p: Production) => {
    setPanelArtist(a);
    setPanelProduction(p);
  };
  const closePanel = () => {
    setPanelArtist(null);
    setPanelProduction(null);
  };

  return (
    <div className={styles.root}>
      {/* ─── Header (matches Operabase visually) ─── */}
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <a href="#" className={styles.logo}>
            <span className={styles.logoSerif}>Operabase</span>
          </a>
          <nav className={styles.topnav}>
            <a href="#" className={styles.topnavActive}>
              Performances
            </a>
            <a href="#">Artists</a>
            <a href="#">Companies</a>
            <a href="#">Productions for rent</a>
            <a href="#">Streaming</a>
          </nav>
          <div className={styles.topRight}>
            <a href="#" className={styles.proLink}>
              Operabase PRO
            </a>
            <a href="#" className={styles.signin}>
              Sign in
            </a>
          </div>
        </div>
      </header>

      {/* ─── Title block ─── */}
      <div className={styles.titleBlock}>
        <div className={styles.titleInner}>
          <div className={styles.crumb}>
            Performances · <strong>Future productions</strong>
          </div>
          <h1 className={styles.h1}>What's on this season</h1>
          <p className={styles.lede}>
            <strong>{filtered.length}</strong> productions ·{" "}
            <strong>{totalDates}</strong> performances across{" "}
            {uniqueValues(filtered, (p) => p.city).length} cities.
            <br />
            Tap an artist's name to preview their schedule. Open any card to
            see the full cast and book a specific date.
          </p>
        </div>
      </div>

      {/* ─── Sticky smart filter bar ─── */}
      <div className={styles.filterBar}>
        <div className={styles.filterBarInner}>
          <div className={styles.filterRow}>
            <div className={styles.search}>
              <svg
                className={styles.searchIcon}
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden
              >
                <circle
                  cx="6"
                  cy="6"
                  r="4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M9.5 9.5L13 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <input
                className={styles.searchInput}
                placeholder="Search work, composer, artist, or company"
                value={filters.query}
                onChange={(e) => update("query", e.target.value)}
              />
            </div>

            <select
              className={styles.filterSelect}
              value={filters.city}
              onChange={(e) => update("city", e.target.value)}
              aria-label="City"
            >
              <option value="">Any city</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              className={styles.filterSelect}
              value={filters.composer}
              onChange={(e) => update("composer", e.target.value)}
              aria-label="Composer"
            >
              <option value="">Any composer</option>
              {composers.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              className={styles.filterSelect}
              value={filters.voice}
              onChange={(e) => update("voice", e.target.value)}
              aria-label="Voice type"
            >
              <option value="">Any voice</option>
              <option>Soprano</option>
              <option>Mezzo-soprano</option>
              <option>Tenor</option>
              <option>Baritone</option>
              <option>Bass-baritone</option>
              <option>Bass</option>
              <option>Conductor</option>
            </select>

            <input
              type="date"
              className={styles.filterDate}
              value={filters.fromDate}
              onChange={(e) => update("fromDate", e.target.value)}
              aria-label="From date"
            />
            <span className={styles.dateDash}>→</span>
            <input
              type="date"
              className={styles.filterDate}
              value={filters.toDate}
              onChange={(e) => update("toDate", e.target.value)}
              aria-label="To date"
            />

            <div className={styles.viewSwitch} role="group" aria-label="View">
              <button
                type="button"
                className={styles.viewBtn}
                aria-pressed={view === "grid"}
                onClick={() => setViewMode("grid")}
                title="Grid view"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect
                    x="1"
                    y="1"
                    width="5"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <rect
                    x="8"
                    y="1"
                    width="5"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <rect
                    x="1"
                    y="8"
                    width="5"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <rect
                    x="8"
                    y="8"
                    width="5"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>
              </button>
              <button
                type="button"
                className={styles.viewBtn}
                aria-pressed={view === "compact"}
                onClick={() => setViewMode("compact")}
                title="Compact list"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <line
                    x1="1"
                    y1="3"
                    x2="13"
                    y2="3"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <line
                    x1="1"
                    y1="7"
                    x2="13"
                    y2="7"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <line
                    x1="1"
                    y1="11"
                    x2="13"
                    y2="11"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>
              </button>
            </div>
          </div>

          {activeFilters.length > 0 && (
            <div className={styles.chipsRow}>
              <span className={styles.chipsLabel}>Active:</span>
              {activeFilters.map(([k, v]) => (
                <button
                  key={k}
                  type="button"
                  className={styles.chip}
                  onClick={() => update(k as keyof FilterState, "")}
                >
                  <span className={styles.chipKey}>
                    {k === "query" ? "Search" : k}
                  </span>
                  <span className={styles.chipVal}>{v}</span>
                  <span className={styles.chipX} aria-hidden>
                    ×
                  </span>
                </button>
              ))}
              <button
                type="button"
                className={styles.clearAll}
                onClick={() => setFilters(EMPTY_FILTERS)}
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ─── Results ─── */}
      <main className={styles.main}>
        <div className={styles.mainInner}>
          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon} aria-hidden>
                ◌
              </div>
              <h2 className={styles.emptyTitle}>
                No productions match these filters
              </h2>
              <p className={styles.emptyBody}>
                Loosening one filter usually finds something close. The date
                range and city are the most common culprits.
              </p>
              <div className={styles.emptyChips}>
                {filters.city && (
                  <button
                    type="button"
                    className={styles.emptyChip}
                    onClick={() => update("city", "")}
                  >
                    Show all cities
                  </button>
                )}
                {filters.composer && (
                  <button
                    type="button"
                    className={styles.emptyChip}
                    onClick={() => update("composer", "")}
                  >
                    Any composer
                  </button>
                )}
                {(filters.fromDate || filters.toDate) && (
                  <button
                    type="button"
                    className={styles.emptyChip}
                    onClick={() => {
                      update("fromDate", "");
                      update("toDate", "");
                    }}
                  >
                    Open date range
                  </button>
                )}
                <button
                  type="button"
                  className={styles.emptyChipPrimary}
                  onClick={() => setFilters(EMPTY_FILTERS)}
                >
                  Reset all filters
                </button>
              </div>
            </div>
          ) : (
            <div
              className={
                view === "grid" ? styles.grid : styles.compact
              }
            >
              {filtered.map((p) => (
                <ProductionCard
                  key={p.id}
                  production={p}
                  onArtistClick={onArtistClick}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ─── Footer stub ─── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span>© 2026 Operabase · Arts Consolidated ApS</span>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </footer>

      <ArtistPanel
        open={panelArtist !== null}
        artist={panelArtist}
        production={panelProduction}
        onClose={closePanel}
      />
    </div>
  );
}
