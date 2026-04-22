import type { Metadata } from "next";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { Module2Content } from "./Module2Content";

export const metadata: Metadata = {
  title: "Module 2: Variables & Data Types | JS Sensei",
  description: "Learn var, let, const and all 8 JavaScript data types through interactive visualizers.",
};

export default function Module2Page() {
  return (
    <ModuleLayout
      moduleNum={2}
      title="Variables & Data Types"
      description="Learn var, let, const and all 8 JavaScript data types through interactive visualizers."
      time="20 min"
    >
      <Module2Content />
    </ModuleLayout>
  );
}
