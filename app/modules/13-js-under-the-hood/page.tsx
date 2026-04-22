import type { Metadata } from "next";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { Module13Content } from "./Module13Content";

export const metadata: Metadata = {
  title: "Module 13: JS Under the Hood | JS Sensei",
  description: "The V8 engine, call stack, memory heap, and garbage collection explained.",
};

export default function Module13Page() {
  return (
    <ModuleLayout
      moduleNum={13}
      title="JS Under the Hood"
      description="The V8 engine, call stack, memory heap, and garbage collection explained."
      time="25 min"
    >
      <Module13Content />
    </ModuleLayout>
  );
}
