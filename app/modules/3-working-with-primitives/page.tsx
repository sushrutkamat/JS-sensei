import type { Metadata } from "next";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { Module3PrimitivesContent } from "./Module3PrimitivesContent";

export const metadata: Metadata = {
  title: "Module 3: Working with Primitives | JS Sensei",
  description: "Deep-dive into string methods, number operations, Math utilities, and boolean truthy/falsy with interactive visualizers.",
};

export default function Module3Page() {
  return (
    <ModuleLayout
      moduleNum={3}
      title="Working with Primitives"
      description="Deep-dive into string methods, number operations, Math utilities, and boolean truthy/falsy with interactive visualizers."
      time="30 min"
    >
      <Module3PrimitivesContent />
    </ModuleLayout>
  );
}
