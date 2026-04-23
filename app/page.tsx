"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Zap, Eye, Code, Target, Clock, ArrowRight, Play,
  Layers, GitBranch, Box, RefreshCcw, Globe, Cpu,
  Terminal, Sparkles, Shield
} from "lucide-react";
import { StaggerList } from "@/components/animations/FadeInSection";
import { ProgressBar } from "@/components/ui/components";

// ── Mini Call Stack Demo ──────────────────────────────────────────────────────

const demoFrames = [
  { name: "main()", color: "#7c3aed" },
  { name: "square(5)", color: "#0891b2" },
  { name: "multiply(5, 5)", color: "#d97706" },
];

function MiniCallStack() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(s => {
        if (s < demoFrames.length * 2 - 1) return s + 1;
        return 0;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const visibleFrames = step < demoFrames.length
    ? demoFrames.slice(0, step + 1)
    : demoFrames.slice(0, demoFrames.length * 2 - 1 - step);

  return (
    <div style={{ display: "flex", flexDirection: "column-reverse", gap: 6, minHeight: 120, justifyContent: "flex-start" }}>
      <AnimatePresence>
        {visibleFrames.map((f, i) => (
          <motion.div
            key={f.name}
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            style={{
              background: f.color + "20",
              border: `1px solid ${f.color}50`,
              borderRadius: 6,
              padding: "6px 12px",
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              color: f.color,
              fontWeight: 600,
            }}
          >
            {f.name}
          </motion.div>
        ))}
      </AnimatePresence>
      {visibleFrames.length === 0 && (
        <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textAlign: "center", padding: "8px 0" }}>Stack Empty</div>
      )}
    </div>
  );
}

// ── Module Data ───────────────────────────────────────────────────────────────

const modules = [
  { num: 1, title: "Getting Started", icon: Play, desc: "Setup, script tags, first code", time: "20 min", href: "/modules/1-getting-started", color: "#7c3aed", built: true },
  { num: 2, title: "Variables & Types", icon: Box, desc: "var, let, const, all 8 data types", time: "20 min", href: "/modules/2-variables-and-types", color: "#0891b2", built: true },
  { num: 3, title: "Working with Primitives", icon: Zap, desc: "String, number & boolean operations in depth", time: "30 min", href: "/modules/3-working-with-primitives", color: "#059669", built: true },
  { num: 4, title: "Operators", icon: Code, desc: "Arithmetic, logical, comparison", time: "18 min", href: "/modules/4-operators-expressions", color: "#d97706", built: true },
  { num: 5, title: "Control Flow", icon: GitBranch, desc: "if/else, loops, switch", time: "22 min", href: "/modules/5-control-flow", color: "#db2777", built: true },
  { num: 6, title: "Functions & Scope", icon: Layers, desc: "Declarations, arrows, closures", time: "28 min", href: "/modules/6-functions-and-scope", color: "#7c3aed", built: true },
  { num: 7, title: "Closures & Hoisting", icon: Globe, desc: "Lexical scope, backpack metaphor", time: "25 min", href: "/modules/7-closures-and-hoisting", color: "#0891b2", built: true },
  { num: 8, title: "Objects & Prototypes", icon: Globe, desc: "this, prototype chain, classes", time: "30 min", href: "/modules/8-objects-and-prototypes", color: "#d97706", built: true },
  { num: 9, title: "Arrays & Methods", icon: Shield, desc: "map, filter, reduce pipeline", time: "25 min", href: "/modules/9-arrays-and-methods", color: "#059669", built: true },
  { num: 10, title: "DOM & Events", icon: Globe, desc: "Document tree, bubbling, delegation", time: "30 min", href: "/modules/10-dom-and-events", color: "#db2777", built: true },
  { num: 11, title: "Async & Event Loop", icon: RefreshCcw, desc: "Promises, async/await, event loop", time: "35 min", href: "/modules/11-async-event-loop", color: "#7c3aed", built: true },
  { num: 12, title: "ES6+ Features", icon: Sparkles, desc: "Destructuring, spread, generators", time: "28 min", href: "/modules/12-es6-plus-features", color: "#0891b2", built: true },
  { num: 13, title: "Error Handling", icon: Terminal, desc: "try/catch, error types, debugging", time: "20 min", href: "/modules/13-error-handling", color: "#d97706", built: true },
  { num: 14, title: "JS Under the Hood", icon: Cpu, desc: "Engine, Call Stack, Memory Heap", time: "25 min", href: "/modules/14-js-under-the-hood", color: "#059669", built: true },
  { num: 15, title: "Best Coding Practices", icon: Shield, desc: "26 practices every JS dev must know", time: "40 min", href: "/modules/15-best-practices", color: "#ec4899", built: true },
];

// ── Landing Page ──────────────────────────────────────────────────────────────

export default function HomePage() {
  const [moduleProgress, setModuleProgress] = useState<Record<number, number>>({});

  useEffect(() => {
    const prog: Record<number, number> = {};
    modules.forEach(m => {
      const v = localStorage.getItem(`module-${m.num}-progress`);
      if (v) prog[m.num] = parseInt(v);
    });
    setModuleProgress(prog);
  }, []);

  const totalProgress = modules.reduce((acc, m) => acc + (moduleProgress[m.num] ?? 0), 0) / (modules.length * 100) * 100;

  return (
    <div style={{ overflowX: "hidden" }}>
      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "100px 24px 60px",
        background: "radial-gradient(ellipse at 50% -20%, var(--hero-glow) 0%, var(--bg-primary) 60%)",
      }}>
        {/* Floating symbols removed */}

        {/* Grid dots background */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle at 1px 1px, var(--hero-dots) 1px, transparent 0)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }} />

        {/* Content */}
        <div style={{ textAlign: "center", maxWidth: 800, position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24, background: "var(--hero-badge-bg)", border: "1px solid var(--hero-badge-border)", borderRadius: 50, padding: "6px 16px" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--success)", display: "block", animation: "pulse-ring 2s infinite" }} />
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 500 }}>
                Interactive • Animated • For absolute beginners
              </span>
            </div>

            <h1 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: 24,
              letterSpacing: "-0.02em",
            }}>
              Learn JavaScript
              <br />
              <span className="gradient-text">Build Interactions</span>
            </h1>

            <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", color: "var(--text-muted)", maxWidth: 580, margin: "0 auto 36px", lineHeight: 1.7 }}>
              Every concept explained with stunning animations and interactive visualizers.
              Zero experience needed. 15 modules. 2 days to master JavaScript.
            </p>

            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/modules/1-getting-started">
                <motion.div
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: "linear-gradient(135deg, var(--primary), hsl(265, 90%, 50%))",
                    color: "white",
                    padding: "14px 32px",
                    borderRadius: 12,
                    fontSize: "1rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-body)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    boxShadow: "0 8px 30px rgba(139, 92, 246, 0.4)",
                    cursor: "pointer",
                  }}
                >
                  Say Hello World <ArrowRight size={18} />
                </motion.div>
              </Link>
              <Link href="/playground">
                <motion.div
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: "var(--glass-bg)",
                    color: "var(--secondary)",
                    padding: "14px 32px",
                    borderRadius: 12,
                    fontSize: "1rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-body)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    border: "1px solid var(--glass-border-strong)",
                    backdropFilter: "blur(12px)",
                    cursor: "pointer",
                  }}
                >
                  <Play size={16} fill="currentColor" /> Open Playground
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {/* Mini demo card */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{
              marginTop: 60,
              background: "var(--glass-bg)",
              backdropFilter: "blur(20px)",
              border: "1px solid var(--glass-border)",
              borderRadius: 16,
              padding: 24,
              maxWidth: 400,
              margin: "60px auto 0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ display: "flex", gap: 5 }}>
                {["#ef4444", "#f59e0b", "#22c55e"].map((c, i) => (
                  <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
                ))}
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)" }}>call-stack.js</span>
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: 16, textAlign: "left" }}>
              <span style={{ color: "var(--primary)" }}>function</span> <span style={{ color: "var(--accent)" }}>square</span>(n) {"{"}
              <br />
              &nbsp;&nbsp;<span style={{ color: "var(--primary)" }}>return</span> multiply(n, n);
              <br />
              {"}"}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.08em", minWidth: 80 }}>Call Stack</span>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            </div>
            <MiniCallStack />
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontFamily: "var(--font-heading)", fontSize: "2.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}
          >
            Why learn here?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ color: "var(--text-muted)" }}
          >
            Not another boring tutorial. Every concept gets a visual, interactive explanation.
          </motion.p>
        </div>

        <StaggerList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Eye, title: "Visual First", desc: "Every concept animated and interactive. See JavaScript running in real time.", color: "var(--primary)" },
            { icon: Code, title: "Hands-On Practice", desc: "Live code editors and exercises in every module. Write real JavaScript.", color: "var(--secondary)" },
            { icon: Clock, title: "Learn in 2 Days", desc: "Structured, progressive 12-module curriculum. Start to expert in 48 hours.", color: "var(--accent)" },
            { icon: Target, title: "Zero to Hero", desc: "No assumptions. Everything explained from scratch using simple analogies.", color: "var(--success)" },
          ].map(({ icon: Icon, title, desc, color }) => (
            <div
              key={title}
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: 24,
                transition: "all 0.3s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = color;
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow = `0 12px 40px ${color}20`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 10, background: color + "15", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <Icon size={22} style={{ color }} />
              </div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.05rem", fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </StaggerList>
      </section>

      {/* ── PROGRESS ── */}
      {totalProgress > 0 && (
        <section style={{ padding: "0 24px 40px", maxWidth: 1200, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              background: "var(--bg-surface)",
              border: "1px solid rgba(139,92,246,0.3)",
              borderRadius: 14,
              padding: "20px 28px",
              display: "flex",
              alignItems: "center",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div>
              <p style={{ fontWeight: 700, color: "var(--text)", marginBottom: 4, fontFamily: "var(--font-heading)" }}>Continue your progress</p>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>You&apos;ve completed {Math.round(totalProgress)}% of the course</p>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <ProgressBar value={totalProgress} />
            </div>
            <Link href={modules.find(m => !moduleProgress[m.num])?.href ?? modules[0].href}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                style={{ background: "var(--primary)", color: "white", padding: "10px 20px", borderRadius: 8, fontWeight: 600, fontSize: "0.875rem", fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}
              >
                Continue <ArrowRight size={14} />
              </motion.div>
            </Link>
          </motion.div>
        </section>
      )}

      {/* ── MODULE GRID ── */}
      <section style={{ padding: "20px 24px 100px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 36, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>All Modules</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>14 interactive modules • Start from the beginning or jump to any topic</p>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 16,
        }}>
          {modules.map((mod, i) => {
            const Icon = mod.icon;
            const prog = moduleProgress[mod.num] ?? 0;
            return (
              <motion.div
                key={mod.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, type: "spring", stiffness: 300, damping: 24 }}
              >
                <Link href={mod.href} style={{ textDecoration: "none", display: "block" }}>
                  <motion.div
                    whileHover={{ y: -4, boxShadow: `0 12px 40px ${mod.color}25` }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border)",
                      borderRadius: 14,
                      padding: "22px 22px 18px",
                      position: "relative",
                      overflow: "hidden",
                      transition: "border-color 0.3s",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = mod.color + "80"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
                  >
                    {/* Background number */}
                    <span style={{
                      position: "absolute",
                      top: -4,
                      right: 14,
                      fontFamily: "var(--font-heading)",
                      fontSize: "4.5rem",
                      fontWeight: 800,
                      opacity: "var(--card-num-opacity)",
                      color: mod.color,
                      lineHeight: 1,
                      userSelect: "none",
                    }}>{mod.num}</span>

                    <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: mod.color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={20} style={{ color: mod.color }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                          <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: mod.color, fontWeight: 700, opacity: 0.8 }}>#{mod.num.toString().padStart(2, "0")}</span>
                          {mod.built && (
                            <span style={{ fontSize: "0.62rem", background: "rgba(52,211,153,0.15)", color: "var(--success)", border: "1px solid rgba(52,211,153,0.3)", padding: "1px 6px", borderRadius: 50, fontWeight: 700, fontFamily: "var(--font-mono)" }}>
                              INTERACTIVE
                            </span>
                          )}
                        </div>
                        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--text)", fontSize: "1rem", marginBottom: 4 }}>{mod.title}</h3>
                        <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{mod.desc}</p>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: prog > 0 ? 10 : 0 }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                        <Clock size={11} /> {mod.time}
                      </span>
                      {prog > 0 && (
                        <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: prog === 100 ? "var(--success)" : "var(--primary)", fontWeight: 700 }}>
                          {prog === 100 ? "✓ Done" : `${prog}%`}
                        </span>
                      )}
                    </div>

                    {prog > 0 && (
                      <div style={{ height: 3, background: "var(--bg-surface-2)", borderRadius: 50, overflow: "hidden" }}>
                        <motion.div style={{ height: "100%", width: `${prog}%`, background: prog === 100 ? "var(--success)" : mod.color, borderRadius: 50 }} />
                      </div>
                    )}
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
