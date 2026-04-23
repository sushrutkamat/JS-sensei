import type { Metadata } from "next";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { Module3Content } from "./Module3Content";

export const metadata: Metadata = {
  title: "Module 4: Operators & Expressions | JS Sensei",
  description: "Arithmetic, comparison, logical, and assignment operators with interactive expression builder.",
};

export default function Module4Page() {
  return (
    <ModuleLayout
      moduleNum={4}
      title="Operators & Expressions"
      description="Arithmetic, comparison, logical, and assignment operators with interactive expression builder."
      time="15 min"
    >
      <Module3Content />
    </ModuleLayout>
  );
}

