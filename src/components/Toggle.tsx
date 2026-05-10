"use client";

import { useToggle } from "@/lib/toggle-context";
import styles from "./Toggle.module.css";

/**
 * Floating Before/After toggle.
 * - Fixed bottom-right, doesn't fight either layout
 * - Keyboard: Tab to focus, Space/Enter to flip, ←/→ to switch
 * - Persists choice in sessionStorage (handled by ToggleProvider)
 */
export function Toggle() {
  const { view, setView } = useToggle();

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setView("before");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setView("after");
    }
  };

  return (
    <div
      className={styles.wrap}
      role="group"
      aria-label="Compare original Operabase with redesign"
      onKeyDown={handleKey}
    >
      <div className={styles.label}>
        <span className={styles.dot} aria-hidden /> Design exercise
      </div>
      <div className={styles.switch} data-view={view}>
        <span className={styles.knob} aria-hidden />
        <button
          type="button"
          className={styles.btn}
          aria-pressed={view === "before"}
          onClick={() => setView("before")}
        >
          Before
        </button>
        <button
          type="button"
          className={styles.btn}
          aria-pressed={view === "after"}
          onClick={() => setView("after")}
        >
          After
        </button>
      </div>
      <div className={styles.caption}>
        {view === "before"
          ? "Today's listing page"
          : "Redesign by Vishal Maurya"}
      </div>
    </div>
  );
}
