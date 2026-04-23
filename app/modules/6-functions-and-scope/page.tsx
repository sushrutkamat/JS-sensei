import type { Metadata } from "next";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { Module5Content } from "./Module5Content";

export const metadata: Metadata = {
  title: "Module 6: Functions & Scope | JS Sensei",
  description: "How JavaScript executes functions and manages variable scope.",
};

export default function Module6Page() {
  return (
    <ModuleLayout
      moduleNum={6}
      title="Functions & Scope"
      description="How JavaScript executes functions and manages variable scope."
      time="25 min"
    >
      <Module5Content />
    </ModuleLayout>
  );
}

