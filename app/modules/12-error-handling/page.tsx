import type { Metadata } from "next";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { Module12Content } from "./Module12Content";

export const metadata: Metadata = {
  title: "Module 12: Error Handling | JS Sensei",
  description: "Try, catch, finally, and custom errors to write resilient JavaScript.",
};

export default function Module12Page() {
  return (
    <ModuleLayout
      moduleNum={12}
      title="Error Handling"
      description="Try, catch, finally, and custom errors to write resilient JavaScript."
      time="20 min"
    >
      <Module12Content />
    </ModuleLayout>
  );
}
