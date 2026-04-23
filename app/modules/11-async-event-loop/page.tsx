import type { Metadata } from "next";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { Module10Content } from "./Module10Content";

export const metadata: Metadata = {
  title: "Module 11: Async JavaScript & The Event Loop | JS Sensei",
  description: "Promises, async/await, and the event loop visualized step by step.",
};

export default function Module11Page() {
  return (
    <ModuleLayout
      moduleNum={11}
      title="Async JavaScript & The Event Loop"
      description="Promises, async/await, and the event loop visualized step by step."
      time="30 min"
    >
      <Module10Content />
    </ModuleLayout>
  );
}

