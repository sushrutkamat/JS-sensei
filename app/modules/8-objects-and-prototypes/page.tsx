import type { Metadata } from "next";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { Module7Content } from "./Module7Content";

export const metadata: Metadata = {
  title: "Module 8: Objects & Prototypes | JS Sensei",
  description: "The fundamentals of objects and the prototype chain in JavaScript.",
};

export default function Module8Page() {
  return (
    <ModuleLayout
      moduleNum={8}
      title="Objects & Prototypes"
      description="The fundamentals of objects and the prototype chain in JavaScript."
      time="25 min"
    >
      <Module7Content />
    </ModuleLayout>
  );
}

