import type { Metadata } from "next";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { Module8Content } from "./Module8Content";

export const metadata: Metadata = {
  title: "Module 9: Arrays & Methods | JS Sensei",
  description: "Master JavaScript arrays and their built-in methods with live demos.",
};

export default function Module9Page() {
  return (
    <ModuleLayout
      moduleNum={9}
      title="Arrays & Methods"
      description="Master JavaScript arrays and their built-in methods with live demos."
      time="20 min"
    >
      <Module8Content />
    </ModuleLayout>
  );
}

