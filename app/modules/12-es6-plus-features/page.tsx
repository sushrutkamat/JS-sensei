import type { Metadata } from "next";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { Module11Content } from "./Module11Content";

export const metadata: Metadata = {
  title: "Module 12: ES6+ Features | JS Sensei",
  description: "Destructuring, spread, template literals, modules, and more modern JS.",
};

export default function Module12Page() {
  return (
    <ModuleLayout
      moduleNum={12}
      title="ES6+ Features"
      description="Destructuring, spread, template literals, modules, and more modern JS."
      time="20 min"
    >
      <Module11Content />
    </ModuleLayout>
  );
}

