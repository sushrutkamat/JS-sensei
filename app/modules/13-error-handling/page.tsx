import type { Metadata } from "next";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { Module12Content } from "./Module12Content";

export const metadata: Metadata = {
  title: "Module 13: Error Handling | JS Sensei",
  description: "Try, catch, finally, and custom errors to write resilient JavaScript.",
};

export default function Module13Page() {
  return (
    <ModuleLayout
      moduleNum={13}
      title="Error Handling"
      description="Try, catch, finally, and custom errors to write resilient JavaScript."
      time="20 min"
    >
      <Module12Content />
    </ModuleLayout>
  );
}

