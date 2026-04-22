import type { Metadata } from "next";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { Module5Content } from "./Module5Content";

export const metadata: Metadata = {
  title: "Module 5: Functions & Scope | JS Sensei",
  description: "How JavaScript executes functions and manages variable scope.",
};

export default function Module5Page() {
  return (
    <ModuleLayout
      moduleNum={5}
      title="Functions & Scope"
      description="How JavaScript executes functions and manages variable scope."
      time="25 min"
    >
      <Module5Content />
    </ModuleLayout>
  );
}
