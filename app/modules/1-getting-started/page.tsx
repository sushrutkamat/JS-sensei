import type { Metadata } from "next";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { Module1Content } from "./Module1Content";

export const metadata: Metadata = {
  title: "Module 1: Getting Started with JavaScript | JS Sensei",
  description: "What JavaScript is, setting up VS Code and Node.js, writing your first script tag, and running JS code.",
};

export default function Module1Page() {
  return (
    <ModuleLayout
      moduleNum={1}
      title="Getting Started with JavaScript"
      description="What JavaScript is, setting up VS Code and Node.js, writing your first script tag, and running JS code."
      time="20 min"
    >
      <Module1Content />
    </ModuleLayout>
  );
}
