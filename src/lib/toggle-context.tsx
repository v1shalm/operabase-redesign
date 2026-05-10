"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type View = "before" | "after";

type ToggleCtx = {
  view: View;
  setView: (v: View) => void;
};

const Ctx = createContext<ToggleCtx | null>(null);

const STORAGE_KEY = "ob-redesign-view";

export function ToggleProvider({ children }: { children: ReactNode }) {
  // Default to "after" — the work is the redesign; the toggle exists to
  // prove fidelity to the original on demand.
  const [view, setViewState] = useState<View>("after");

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY) as View | null;
      if (saved === "before" || saved === "after") setViewState(saved);
    } catch {
      // sessionStorage may be unavailable; fall back to default.
    }
  }, []);

  const setView = (v: View) => {
    setViewState(v);
    try {
      sessionStorage.setItem(STORAGE_KEY, v);
    } catch {
      // ignore
    }
  };

  return <Ctx.Provider value={{ view, setView }}>{children}</Ctx.Provider>;
}

export function useToggle() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useToggle must be used inside ToggleProvider");
  return ctx;
}
