import type { Metadata } from "next";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { Module6Content } from "./Module6Content";

export const metadata: Metadata = {
  title: "Module 7: Closures & Hoisting | JS Sensei",
  description: "Closures and hoisting explained with interactive memory visualizers.",
};

export default function Module7Page() {
  return (
    <ModuleLayout
      moduleNum={7}
      title="Closures & Hoisting"
      description="Closures and hoisting explained with interactive memory visualizers."
      time="25 min"
    >
      <Module6Content />
    </ModuleLayout>
  );
}

