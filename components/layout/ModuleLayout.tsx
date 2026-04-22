"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, BookOpen, ArrowLeft } from "lucide-react";
import { ProgressBar } from "@/components/ui/components";
import { useEffect, useState } from "react";

const allModules = [
  { num: 1, title: "Getting Started", href: "/modules/1-getting-started", time: "20 min" },
  { num: 2, title: "Variables & Types", href: "/modules/2-variables-and-types", time: "20 min" },
  { num: 3, title: "Operators", href: "/modules/3-operators-expressions", time: "18 min" },
  { num: 4, title: "Control Flow", href: "/modules/4-control-flow", time: "22 min" },
  { num: 5, title: "Functions & Scope", href: "/modules/5-functions-and-scope", time: "28 min" },
  { num: 6, title: "Closures & Hoisting", href: "/modules/6-closures-and-hoisting", time: "25 min" },
  { num: 7, title: "Objects & Prototypes", href: "/modules/7-objects-and-prototypes", time: "30 min" },
  { num: 8, title: "Arrays & Methods", href: "/modules/8-arrays-and-methods", time: "25 min" },
  { num: 9, title: "DOM & Events", href: "/modules/9-dom-and-events", time: "30 min" },
  { num: 10, title: "Async & Event Loop", href: "/modules/10-async-event-loop", time: "35 min" },
  { num: 11, title: "ES6+ Features", href: "/modules/11-es6-plus-features", time: "28 min" },
  { num: 12, title: "Error Handling", href: "/modules/12-error-handling", time: "20 min" },
  { num: 13, title: "JS Under the Hood", href: "/modules/13-js-under-the-hood", time: "25 min" },
];

interface ModuleLayoutProps {
  moduleNum: number;
  title: string;
  description: string;
  time: string;
  children: React.ReactNode;
}

export function ModuleLayout({ moduleNum, title, description, time, children }: ModuleLayoutProps) {
  const [progress, setProgress] = useState(0);
  const curIdx = moduleNum - 1;
  const prev = allModules[curIdx - 1];
  const next = allModules[curIdx + 1];

  useEffect(() => {
    const saved = localStorage.getItem(`module-${moduleNum}-progress`);
    if (saved) setProgress(parseInt(saved));
  }, [moduleNum]);

  const markComplete = () => {
    localStorage.setItem(`module-${moduleNum}-progress`, "100");
    setProgress(100);
  };

  return (
    <div style={{ paddingTop: 80, minHeight: "100vh" }}>
      {/* Hero Header */}
      <div style={{
        background: "linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-primary) 100%)",
        borderBottom: "1px solid var(--border)",
        padding: "40px 0 32px",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--text-muted)", textDecoration: "none", fontSize: "0.85rem", marginBottom: 16, transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--text)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"}
            >
              <ArrowLeft size={14} /> Back to all modules
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "var(--primary)",
                background: "rgba(139, 92, 246, 0.12)",
                border: "1px solid rgba(139, 92, 246, 0.25)",
                padding: "3px 10px",
                borderRadius: 50,
              }}>
                MODULE {moduleNum}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--text-muted)", fontSize: "0.8rem" }}>
                <Clock size={13} /> {time}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--text-muted)", fontSize: "0.8rem" }}>
                <BookOpen size={13} /> Interactive
              </div>
            </div>

            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: 10, lineHeight: 1.2 }}>
              {title}
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem", maxWidth: 600 }}>{description}</p>

            <div style={{ marginTop: 20 }}>
              <ProgressBar value={progress} showPercent label="Your progress" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
        {children}

        {/* Mark Complete */}
        {progress < 100 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginTop: 48 }}
          >
            <button
              onClick={markComplete}
              style={{
                background: "linear-gradient(135deg, var(--success), hsl(150, 80%, 40%))",
                color: "white",
                border: "none",
                padding: "12px 32px",
                borderRadius: 10,
                fontWeight: 600,
                fontSize: "0.95rem",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                boxShadow: "0 4px 15px rgba(52, 211, 153, 0.3)",
              }}
            >
              ✓ Mark Module Complete
            </button>
          </motion.div>
        )}

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
          {prev ? (
            <Link href={prev.href} style={{ textDecoration: "none" }}>
              <motion.div whileHover={{ x: -4 }} style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-muted)", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--primary)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"}
              >
                <ChevronLeft size={20} />
                <div>
                  <p style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2, opacity: 0.7 }}>Previous</p>
                  <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>Module {prev.num}: {prev.title}</p>
                </div>
              </motion.div>
            </Link>
          ) : <div />}

          {next ? (
            <Link href={next.href} style={{ textDecoration: "none" }}>
              <motion.div whileHover={{ x: 4 }} style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-muted)", textAlign: "right", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--primary)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"}
              >
                <div>
                  <p style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2, opacity: 0.7 }}>Next</p>
                  <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>Module {next.num}: {next.title}</p>
                </div>
                <ChevronRight size={20} />
              </motion.div>
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
