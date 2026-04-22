import type { Metadata } from "next";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { Module8Content } from "./Module8Content";

export const metadata: Metadata = {
  title: "Module 8: Arrays & Methods | JS Sensei",
  description: "Master JavaScript arrays and their built-in methods with live demos.",
};

export default function Module8Page() {
  return (
    <ModuleLayout
      moduleNum={8}
      title="Arrays & Methods"
      description="Master JavaScript arrays and their built-in methods with live demos."
      time="20 min"
    >
      <Module8Content />
    </ModuleLayout>
  );
}
