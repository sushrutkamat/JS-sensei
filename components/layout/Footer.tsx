"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      background: "var(--bg-surface)",
      padding: "40px 24px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img
              src="/js-logo.png"
              alt="JS Sensei logo"
              width={30}
              height={30}
              style={{ display: "block" }}
            />
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)" }}>
              JS Sensei
            </span>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", maxWidth: 400 }}>
            Built for JS beginners. Learn JavaScript through interactive animations — zero experience needed.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-muted)", fontSize: "0.8rem" }}>
            <span>Made with</span>
            <Heart size={12} style={{ color: "var(--error)" }} fill="currentColor" />
            <span>for the JavaScript community</span>
          </div>
          <div style={{ display: "flex", gap: 24, marginTop: 8 }}>
            {["How JS Works", "Variables", "Async & Event Loop"].map(title => (
              <span key={title} style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{title}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
