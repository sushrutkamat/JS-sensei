import type { Metadata } from "next";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { Module4Content } from "./Module4Content";

export const metadata: Metadata = {
  title: "Module 4: Control Flow | JS Sensei",
  description: "Master if/else, switch, and loops with animated flow diagrams.",
};

export default function Module4Page() {
  return (
    <ModuleLayout
      moduleNum={4}
      title="Control Flow"
      description="Master if/else, switch, and loops with animated flow diagrams."
      time="20 min"
    >
      <Module4Content />
    </ModuleLayout>
  );
}
