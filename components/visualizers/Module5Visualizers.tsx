"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Scope Chain Visualizer ────────────────────────────────────────────────────

export function ScopeChainVisualizer() {
  const [hoveredScope, setHoveredScope] = useState<string | null>(null);

  const scopes = [
    {
      id: "global",
      label: "🌍 Global Scope",
      color: "#7c3aed",
      vars: [{ name: "appName", value: '"MyApp"', desc: "Available everywhere" }, { name: "version", value: "1.0", desc: "Available everywhere" }],
      desc: "The outermost scope. Variables here are accessible from any function in the file.",
    },
    {
      id: "outer",
      label: "📦 outer() Scope",
      color: "#0891b2",
      vars: [{ name: "user", value: '"Alice"', desc: "Visible to outer + inner" }, { name: "role", value: '"admin"', desc: "Visible to outer + inner" }],
      desc: "Variables declared inside outer() are visible here AND inside inner() — because inner is nested inside outer.",
    },
    {
      id: "inner",
      label: "🎯 inner() Scope",
      color: "#d97706",
      vars: [{ name: "greeting", value: '"Hello!"', desc: "Only visible here" }],
      desc: "The most specific scope. inner() can see its own variables PLUS everything from outer() and global — like looking out through layers of curtains.",
    },
  ];

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>🔭 Scope Chain</p>
      <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: 20, lineHeight: 1.6 }}>
        Hover over each scope layer to see what variables are visible from there. Think of it like concentric circles — inner scopes can see outward, but outer scopes can never see inward.
      </p>

      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 0 }}>
        {scopes.map((scope, i) => (
          <div key={scope.id}
            onMouseEnter={() => setHoveredScope(scope.id)}
            onMouseLeave={() => setHoveredScope(null)}
            style={{ marginLeft: i * 24, marginRight: i * 0, cursor: "pointer" }}>
            <motion.div
              animate={{ background: hoveredScope === scope.id ? scope.color + "18" : "var(--bg-primary)", borderColor: hoveredScope === scope.id ? scope.color : "var(--border)" }}
              style={{ border: "2px solid", borderRadius: 12, padding: "14px 18px", marginBottom: i < scopes.length - 1 ? 0 : 0, borderBottomLeftRadius: i < scopes.length - 1 ? 0 : 12, borderBottomRightRadius: i < scopes.length - 1 ? 0 : 12, transition: "all 0.3s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: hoveredScope === scope.id ? scope.color : "var(--text)", fontSize: "0.9rem" }}>{scope.label}</span>
              </div>

              {/* Variables */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: hoveredScope === scope.id ? 10 : 0 }}>
                {scope.vars.map(v => (
                  <div key={v.name} style={{ background: scope.color + "12", border: `1px solid ${scope.color}40`, borderRadius: 6, padding: "4px 10px", fontFamily: "var(--font-mono)", fontSize: "0.78rem" }}>
                    <span style={{ color: scope.color, fontWeight: 700 }}>{v.name}</span>
                    <span style={{ color: "var(--text-muted)" }}> = {v.value}</span>
                  </div>
                ))}
              </div>

              <AnimatePresence>
                {hoveredScope === scope.id && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                    style={{ color: "var(--text-muted)", fontSize: "0.8rem", lineHeight: 1.6, marginTop: 8, overflow: "hidden" }}>
                    {scope.desc}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Lookup demo */}
      <div style={{ marginTop: 20, background: "var(--bg-primary)", borderRadius: 10, padding: "14px 18px" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 8 }}>
          Inside <span style={{ color: "#d97706" }}>inner()</span>, when you reference a variable, JS looks it up in this order:
        </p>
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
          {["inner() scope", "→", "outer() scope", "→", "global scope", "→", "ReferenceError!"].map((step, i) => (
            <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: i % 2 === 0 ? (i === 0 ? "#d97706" : i === 2 ? "#0891b2" : i === 4 ? "#7c3aed" : "var(--error)") : "var(--text-muted)", fontWeight: i % 2 === 0 ? 700 : 400 }}>
              {step}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Function Types Card ────────────────────────────────────────────────────────

export function FunctionTypesExplorer() {
  const [active, setActive] = useState(0);

  const types = [
    {
      label: "Function Declaration",
      color: "var(--primary)",
      icon: "🏗️",
      code: `// Hoisted — can call BEFORE defining it!\ngreet("Alice"); // Works fine!\n\nfunction greet(name) {\n  return "Hello, " + name + "!";\n}`,
      when: "Use for standalone utility functions that should work anywhere in a file.",
      superpower: "Hoisted to the top of its scope — you can call it before the line it appears on.",
    },
    {
      label: "Function Expression",
      color: "var(--secondary)",
      icon: "📌",
      code: `// NOT hoisted — must define before calling\n// sayBye("Bob"); // Error!\n\nconst sayBye = function(name) {\n  return "Goodbye, " + name + "!";\n};`,
      when: "Use when you want to store a function in a variable, pass it around, or keep it private to a block.",
      superpower: "Can be anonymous. Won't pollute outer scope if defined inside a block.",
    },
    {
      label: "Arrow Function",
      color: "var(--accent)",
      icon: "➡️",
      code: `// Short and modern — great for callbacks\nconst double = n => n * 2;  // one-liner!\n\nconst greet = (name, time) => {\n  return \`Good \${time}, \${name}!\`;\n};`,
      when: "Use for callbacks, array methods (.map, .filter), and short one-liner functions.",
      superpower: "No own 'this' binding — inherits 'this' from surrounding code. Shorter syntax.",
    },
    {
      label: "Immediately Invoked (IIFE)",
      color: "var(--success)",
      icon: "⚡",
      code: `// Runs immediately when the file loads\n// Creates a private scope — can't touch from outside\n\n(function() {\n  const secret = "hidden";\n  console.log("IIFE ran!");\n})(); // <- these () invoke it immediately`,
      when: "Rarely needed in modern JS (use modules instead), but you'll see it in older code.",
      superpower: "Creates a private scope. Variables inside are completely invisible outside.",
    },
  ];

  const t = types[active];

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ padding: "14px 20px", background: "var(--bg-surface-2)", borderBottom: "1px solid var(--border)", display: "flex", gap: 8, flexWrap: "wrap" }}>
        {types.map((type, i) => (
          <button key={i} onClick={() => setActive(i)} style={{ padding: "6px 14px", borderRadius: 8, background: active === i ? "rgba(139,92,246,0.15)" : "var(--bg-surface)", border: `1px solid ${active === i ? "var(--primary)" : "var(--border)"}`, color: active === i ? "var(--primary)" : "var(--text-muted)", fontSize: "0.78rem", cursor: "pointer", fontWeight: 600, fontFamily: "var(--font-body)" }}>
            {type.icon} {i + 1}. {type.label.split(" ")[0]}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ padding: 24 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontSize: "1.8rem" }}>{t.icon}</span>
            <div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: t.color, fontSize: "1.05rem" }}>{t.label}</h3>
            </div>
          </div>

          <pre style={{ background: "var(--bg-primary)", borderRadius: 10, padding: "14px 18px", fontFamily: "var(--font-mono)", fontSize: "0.82rem", lineHeight: 1.7, color: "var(--text-muted)", marginBottom: 16, overflowX: "auto", whiteSpace: "pre-wrap" }}>
            {t.code}
          </pre>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 10, padding: "12px 14px" }}>
              <p style={{ fontSize: "0.72rem", color: "var(--primary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>When to use</p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", lineHeight: 1.6 }}>{t.when}</p>
            </div>
            <div style={{ background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.2)", borderRadius: 10, padding: "12px 14px" }}>
              <p style={{ fontSize: "0.72rem", color: "var(--secondary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Superpower</p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", lineHeight: 1.6 }}>{t.superpower}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
