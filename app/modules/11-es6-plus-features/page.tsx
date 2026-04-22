import type { Metadata } from "next";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { Module11Content } from "./Module11Content";

export const metadata: Metadata = {
  title: "Module 11: ES6+ Features | JS Sensei",
  description: "Destructuring, spread, template literals, modules, and more modern JS.",
};

export default function Module11Page() {
  return (
    <ModuleLayout
      moduleNum={11}
      title="ES6+ Features"
      description="Destructuring, spread, template literals, modules, and more modern JS."
      time="20 min"
    >
      <Module11Content />
    </ModuleLayout>
  );
}
