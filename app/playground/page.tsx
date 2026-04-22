import type { Metadata } from "next";
import { PlaygroundContent } from "./PlaygroundContent";

export const metadata: Metadata = {
  title: "JS Playground | JS Sensei",
  description: "Write and run JavaScript code in your browser. No setup needed — perfect for experimenting.",
};

export default function PlaygroundPage() {
  return <PlaygroundContent />;
}
