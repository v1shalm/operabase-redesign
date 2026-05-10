"use client";

import { useToggle } from "@/lib/toggle-context";
import { Toggle } from "@/components/Toggle";
import { BeforeView } from "@/components/before/BeforeView";
import { AfterView } from "@/components/after/AfterView";

export default function ProductionsPage() {
  const { view } = useToggle();

  return (
    <>
      {view === "before" ? <BeforeView /> : <AfterView />}
      <Toggle />
    </>
  );
}
