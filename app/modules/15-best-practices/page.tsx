import type { Metadata } from "next";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { Module15BestPracticesContent } from "./Module15BestPracticesContent";

export const metadata: Metadata = {
  title: "Module 15: JavaScript Best Practices | JS Sensei",
  description: "26 essential JavaScript best practices — each standalone, with Avoid/Prefer examples, interactive code smell detection, and a downloadable AI coding agent plugin.",
};

export default function Module15Page() {
  return (
    <ModuleLayout
      moduleNum={15}
      title="Best Coding Practices"
      description="26 essential practices — each standalone, with Avoid/Prefer examples and interactive tools."
      time="40 min"
    >
      <Module15BestPracticesContent />
    </ModuleLayout>
  );
}
