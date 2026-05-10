"use client";

import { useMemo, useState } from "react";
import {
  PRODUCTIONS,
  EMPTY_FILTERS,
  applyFilters,
  flattenToRows,
  uniqueValues,
} from "@/lib/data";
import type { FilterState } from "@/lib/data";
import styles from "./BeforeView.module.css";

/**
 * Faithful clone of the current Operabase /productions page.
 *
 * Layout: top header → secondary nav → two-column grid
 *   (left: filter sidebar, right: row-per-date listing).
 * Visual cues: same fonts, same colors, same density.
 *
 * Intentional: this view ships every UX problem documented in the
 * research doc — that's the point of the Before. The After view fixes them.
 */
export function BeforeView() {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);

  const cities = useMemo(() => uniqueValues(PRODUCTIONS, (p) => p.city), []);
  const countries = useMemo(
    () => uniqueValues(PRODUCTIONS, (p) => p.country),
    [],
  );
  const composers = useMemo(
    () => uniqueValues(PRODUCTIONS, (p) => p.composer),
    [],
  );

  const filtered = useMemo(
    () => applyFilters(PRODUCTIONS, filters),
    [filters],
  );
  const rows = useMemo(() => flattenToRows(filtered), [filtered]);

  const update = (k: keyof FilterState, v: string) =>
    setFilters((s) => ({ ...s, [k]: v }));

  return (
    <div className={styles.root}>
      {/* ─── Top header bar ─── */}
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <a href="#" className={styles.logo}>
            <span className={styles.logoSerif}>Operabase</span>
          </a>
          <nav className={styles.topnav}>
            <a href="#">Performances</a>
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

      {/* ─── Secondary nav (sub-tabs) ─── */}
      <div className={styles.subnav}>
        <div className={styles.subnavInner}>
          <a href="#" className={styles.subnavActive}>
            Future
          </a>
          <a href="#">Past</a>
          <a href="#">All productions</a>
          <span className={styles.subnavSep}>·</span>
          <a href="#">Premieres</a>
          <a href="#">Festivals</a>
        </div>
      </div>

      {/* ─── Page title ─── */}
      <div className={styles.titleBlock}>
        <div className={styles.titleInner}>
          <h1 className={styles.h1}>Future productions</h1>
          <p className={styles.lede}>
            Showing {rows.length} performances across {filtered.length}{" "}
            productions worldwide.
          </p>
        </div>
      </div>

      {/* ─── Two-column layout ─── */}
      <div className={styles.shell}>
        {/* ── Filter sidebar ── */}
        <aside className={styles.sidebar}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>City</label>
            <select
              className={styles.select}
              value={filters.city}
              onChange={(e) => update("city", e.target.value)}
            >
              <option value="">Any city</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Country</label>
            <select
              className={styles.select}
              value={filters.country}
              onChange={(e) => update("country", e.target.value)}
            >
              <option value="">Any country</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Composer</label>
            <select
              className={styles.select}
              value={filters.composer}
              onChange={(e) => update("composer", e.target.value)}
            >
              <option value="">Any composer</option>
              {composers.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Work</label>
            <input
              className={styles.input}
              placeholder="e.g. La Traviata"
              value={filters.query}
              onChange={(e) => update("query", e.target.value)}
            />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Voice type</label>
            <select
              className={styles.select}
              value={filters.voice}
              onChange={(e) => update("voice", e.target.value)}
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
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>From</label>
            <input
              type="date"
              className={styles.input}
              value={filters.fromDate}
              onChange={(e) => update("fromDate", e.target.value)}
            />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>To</label>
            <input
              type="date"
              className={styles.input}
              value={filters.toDate}
              onChange={(e) => update("toDate", e.target.value)}
            />
          </div>

          <button
            type="button"
            className={styles.resetBtn}
            onClick={() => setFilters(EMPTY_FILTERS)}
          >
            Reset all filters
          </button>
        </aside>

        {/* ── Listing (row per date) ── */}
        <main className={styles.results}>
          <div className={styles.resultsHead}>
            <span className={styles.count}>
              {rows.length.toLocaleString()} performances
            </span>
            <div className={styles.sortGroup}>
              <span className={styles.sortLabel}>Sort by</span>
              <select className={styles.sortSelect}>
                <option>Date (earliest first)</option>
                <option>Date (latest first)</option>
                <option>Composer</option>
                <option>City</option>
              </select>
            </div>
          </div>

          {rows.length === 0 ? (
            <div className={styles.empty}>No performances match your filters.</div>
          ) : (
            <ol className={styles.list}>
              {rows.map(({ production: p, date }, i) => (
                <li key={`${p.id}-${date.iso}-${i}`} className={styles.row}>
                  <div className={styles.rowDate}>
                    <span className={styles.rowDay}>
                      {new Date(date.iso).toLocaleDateString("en-GB", {
                        day: "2-digit",
                      })}
                    </span>
                    <span className={styles.rowMonth}>
                      {new Date(date.iso).toLocaleDateString("en-GB", {
                        month: "short",
                      })}
                    </span>
                    <span className={styles.rowYear}>
                      {new Date(date.iso).getFullYear()}
                    </span>
                  </div>

                  <div className={styles.rowMain}>
                    <h3 className={styles.rowTitle}>
                      <a href="#">{p.work}</a>
                    </h3>
                    <div className={styles.rowMeta}>
                      <span>{p.composer}</span>
                      <span className={styles.metaSep}>·</span>
                      <span>{p.workType}</span>
                    </div>
                    <div className={styles.rowVenue}>
                      <a href="#">{p.company}</a>
                      <span className={styles.metaSep}>·</span>
                      <span>{p.venue}</span>
                      <span className={styles.metaSep}>·</span>
                      <span>{p.city}</span>
                    </div>
                    <div className={styles.rowCast}>
                      {p.cast.slice(0, 4).map((c, idx) => (
                        <span key={c.id}>
                          {idx > 0 && ", "}
                          <a href="#">{c.name}</a>{" "}
                          <span className={styles.castVoice}>({c.voice})</span>
                        </span>
                      ))}
                      {p.cast.length > 4 && (
                        <span className={styles.castMore}>
                          {" "}
                          +{p.cast.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles.rowAction}>
                    <a className={styles.ticketLink} href="#">
                      Tickets
                    </a>
                    {date.status === "sold-out" && (
                      <span className={styles.soldOut}>Sold out</span>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          )}

          <div className={styles.pagination}>
            <a href="#" className={styles.pageLink}>
              ‹ Prev
            </a>
            <span className={styles.pageActive}>1</span>
            <a href="#" className={styles.pageLink}>
              2
            </a>
            <a href="#" className={styles.pageLink}>
              3
            </a>
            <span>…</span>
            <a href="#" className={styles.pageLink}>
              Next ›
            </a>
          </div>
        </main>
      </div>

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
    </div>
  );
}
