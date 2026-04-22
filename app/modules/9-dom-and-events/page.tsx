import type { Metadata } from "next";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { Module9Content } from "./Module9Content";

export const metadata: Metadata = {
  title: "Module 9: DOM & Events | JS Sensei",
  description: "How JavaScript interacts with web pages and responds to user events.",
};

export default function Module9Page() {
  return (
    <ModuleLayout
      moduleNum={9}
      title="DOM & Events"
      description="How JavaScript interacts with web pages and responds to user events."
      time="25 min"
    >
      <Module9Content />
    </ModuleLayout>
  );
}
