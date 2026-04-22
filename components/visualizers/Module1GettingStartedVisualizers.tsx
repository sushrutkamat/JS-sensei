"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Environment Setup Checklist ───────────────────────────────────────────────

const setupSteps = [
  {
    id: "editor",
    label: "Code Editor",
    icon: "📝",
    color: "#7c3aed",
    desc: "You need a code editor — a special text editor made for writing code. It gives you colours, auto-complete, and error highlighting.",
    detail: "We recommend VS Code (Visual Studio Code) — it's free, fast, and used by millions of developers. Download it from code.visualstudio.com. Other options include WebStorm, Sublime Text, or even just Notepad — but VS Code is by far the most popular.",
  },
  {
    id: "browser",
    label: "Browser with DevTools",
    icon: "🌐",
    color: "#0891b2",
    desc: "You already have this! Any modern browser (Chrome, Firefox, Edge, Safari) can run JavaScript and has built-in developer tools.",
    detail: "To open DevTools: Press F12 or right-click anywhere on a page → 'Inspect'. The Console tab is where you can type JavaScript and see it run immediately. Chrome is recommended because it uses the V8 engine — the same engine Node.js uses.",
  },
  {
    id: "nodejs",
    label: "Node.js (optional at first)",
    icon: "🟢",
    color: "#059669",
    desc: "Node.js lets you run JavaScript outside of a browser — directly on your computer, like Python or Java.",
    detail: "Download the LTS (Long Term Support) version from nodejs.org. After installing, open your terminal and type: node --version. If you see a version number like v20.x.x, you're good! LTS means it's the stable, recommended version — avoid 'Current' which may have untested features.",
  },
  {
    id: "terminal",
    label: "Terminal / Command Line",
    icon: "⬛",
    color: "#6366f1",
    desc: "The terminal is where you type commands to run your code. It looks scary at first, but you only need a few commands.",
    detail: "VS Code has a built-in terminal (View → Terminal, or press Ctrl+`). On Windows, you can also use PowerShell or Command Prompt. On Mac/Linux, use Terminal. The only commands you need right now are: cd foldername (to navigate), node filename.js (to run JS), and that's it!",
  },
];

export function EnvironmentChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allDone = checked.size === setupSteps.length;

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ padding: "14px 20px", background: "var(--bg-surface-2)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)" }}>🛠️ Setup Checklist</span>
        {allDone && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ background: "rgba(5,150,105,0.15)", color: "var(--success)", border: "1px solid rgba(5,150,105,0.3)", padding: "3px 12px", borderRadius: 50, fontSize: "0.75rem", fontWeight: 700 }}>
            ✓ All set!
          </motion.span>
        )}
      </div>
      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        {setupSteps.map(step => {
          const isDone = checked.has(step.id);
          const isOpen = expanded === step.id;
          return (
            <div key={step.id} style={{ border: `1px solid ${isDone ? step.color + "40" : "var(--border)"}`, borderRadius: 12, overflow: "hidden", background: isDone ? step.color + "08" : "var(--bg-primary)", transition: "all 0.3s" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", cursor: "pointer" }}
                onClick={() => setExpanded(isOpen ? null : step.id)}
              >
                <motion.button
                  onClick={(e) => { e.stopPropagation(); toggle(step.id); }}
                  animate={{ background: isDone ? step.color : "transparent", borderColor: isDone ? step.color : "var(--border)" }}
                  style={{ width: 24, height: 24, borderRadius: 6, border: "2px solid", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, color: "white", fontSize: "0.8rem", fontWeight: 700 }}
                >
                  {isDone && "✓"}
                </motion.button>
                <span style={{ fontSize: "1.2rem" }}>{step.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: isDone ? step.color : "var(--text)", fontSize: "0.92rem", textDecoration: isDone ? "line-through" : "none", opacity: isDone ? 0.8 : 1 }}>{step.label}</p>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", lineHeight: 1.5, marginTop: 2 }}>{step.desc}</p>
                </div>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>▼</motion.span>
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden" }}>
                    <div style={{ padding: "0 14px 14px 50px", color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.7 }}>
                      {step.detail}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Script Tag Demo ───────────────────────────────────────────────────────────

export function ScriptTagDemo() {
  const [mode, setMode] = useState<"inline" | "external">("inline");

  const inlineHTML = `<!DOCTYPE html>
<html>
<head>
  <title>My First Page</title>
</head>
<body>
  <h1>Hello World!</h1>

  <!-- JavaScript goes here, at the bottom of body -->
  <script>
    console.log("Hello from JavaScript!");
    document.querySelector("h1").style.color = "blue";
  </script>
</body>
</html>`;

  const externalHTML = `<!DOCTYPE html>
<html>
<head>
  <title>My First Page</title>
</head>
<body>
  <h1>Hello World!</h1>

  <!-- Link to a separate .js file -->
  <script src="script.js"></script>
</body>
</html>`;

  const externalJS = `// script.js — your JavaScript lives in its own file!
console.log("Hello from script.js!");

// Change the heading colour:
document.querySelector("h1").style.color = "purple";

// This is much cleaner — your HTML stays tidy,
// and your JS is easy to find and edit.`;

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ padding: "12px 16px", background: "var(--bg-surface-2)", borderBottom: "1px solid var(--border)", display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)", flex: 1 }}>📄 Where to Put Your JavaScript</span>
        {(["inline", "external"] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            style={{ padding: "5px 14px", borderRadius: 7, background: mode === m ? "rgba(139,92,246,0.2)" : "var(--bg-surface)", border: `1px solid ${mode === m ? "var(--primary)" : "var(--border)"}`, color: mode === m ? "var(--primary)" : "var(--text-muted)", fontSize: "0.78rem", cursor: "pointer", fontWeight: 600, fontFamily: "var(--font-body)", textTransform: "capitalize" }}>
            {m === "inline" ? "Inline <script>" : "External .js file"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={mode} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ padding: 16 }}>
          {mode === "inline" ? (
            <div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: 12 }}>
                The simplest way — write JavaScript directly between <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>&lt;script&gt;</code> tags inside your HTML file. Place it at the <strong style={{ color: "var(--text)" }}>bottom of the body</strong> so the HTML loads first.
              </p>
              <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
                <span style={{ background: "rgba(217,119,6,0.15)", color: "#d97706", padding: "2px 10px", borderRadius: "8px 8px 0 0", fontSize: "0.72rem", fontWeight: 700, fontFamily: "var(--font-mono)" }}>index.html</span>
              </div>
              <pre style={{ background: "var(--bg-primary)", borderRadius: "0 10px 10px 10px", padding: "14px 18px", fontFamily: "var(--font-mono)", fontSize: "0.78rem", lineHeight: 1.8, color: "var(--text-muted)", overflow: "auto", whiteSpace: "pre-wrap", margin: 0 }}>
                {inlineHTML}
              </pre>
            </div>
          ) : (
            <div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: 12 }}>
                The <strong style={{ color: "var(--text)" }}>recommended way</strong> — keep your JavaScript in a separate <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>.js</code> file and link it with <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>src</code>. Your project stays organized — HTML is HTML, JS is JS.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                    <span style={{ background: "rgba(217,119,6,0.15)", color: "#d97706", padding: "2px 10px", borderRadius: "8px 8px 0 0", fontSize: "0.72rem", fontWeight: 700, fontFamily: "var(--font-mono)" }}>index.html</span>
                  </div>
                  <pre style={{ background: "var(--bg-primary)", borderRadius: "0 10px 10px 10px", padding: "12px 14px", fontFamily: "var(--font-mono)", fontSize: "0.72rem", lineHeight: 1.8, color: "var(--text-muted)", overflow: "auto", whiteSpace: "pre-wrap", margin: 0, height: "100%" }}>
                    {externalHTML}
                  </pre>
                </div>
                <div>
                  <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                    <span style={{ background: "rgba(251,191,36,0.15)", color: "var(--accent)", padding: "2px 10px", borderRadius: "8px 8px 0 0", fontSize: "0.72rem", fontWeight: 700, fontFamily: "var(--font-mono)" }}>script.js</span>
                  </div>
                  <pre style={{ background: "var(--bg-primary)", borderRadius: "0 10px 10px 10px", padding: "12px 14px", fontFamily: "var(--font-mono)", fontSize: "0.72rem", lineHeight: 1.8, color: "var(--text-muted)", overflow: "auto", whiteSpace: "pre-wrap", margin: 0, height: "100%" }}>
                    {externalJS}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Where JS Runs Diagram ─────────────────────────────────────────────────────

export function WhereJSRunsDiagram() {
  const [hovered, setHovered] = useState<"browser" | "node" | null>(null);

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>🗺️ Two Places JavaScript Can Run</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 16, alignItems: "stretch" }}>
        {/* Browser */}
        <motion.div
          onMouseEnter={() => setHovered("browser")}
          onMouseLeave={() => setHovered(null)}
          animate={{ borderColor: hovered === "browser" ? "#0891b2" : "var(--border)", scale: hovered === "browser" ? 1.02 : 1 }}
          style={{ border: "2px solid", borderRadius: 14, padding: 20, cursor: "default", display: "flex", flexDirection: "column", gap: 12, transition: "all 0.2s" }}
        >
          <div style={{ fontSize: "2rem", textAlign: "center" }}>🌐</div>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--secondary)", textAlign: "center", fontSize: "1.1rem" }}>In the Browser</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", lineHeight: 1.7, textAlign: "center" }}>
            Chrome, Firefox, Safari, Edge — all have a JS engine built in. Your code runs when a webpage loads.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: "auto" }}>
            {["HTML + CSS + JS together", "Access to DOM (the page)", "Access to browser APIs", "User sees results visually"].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ color: "var(--secondary)", fontSize: "0.8rem" }}>✓</span>
                <span style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Center connector */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, padding: "0 8px" }}>
          <div style={{ width: 2, flex: 1, background: "var(--border)" }} />
          <div style={{ background: "linear-gradient(135deg, var(--primary), var(--secondary))", borderRadius: 50, padding: "8px 14px", fontSize: "0.72rem", fontFamily: "var(--font-mono)", fontWeight: 700, color: "white", textAlign: "center", whiteSpace: "nowrap" }}>
            V8 Engine
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.7rem", textAlign: "center", lineHeight: 1.4 }}>Same engine<br />powers both!</p>
          <div style={{ width: 2, flex: 1, background: "var(--border)" }} />
        </div>

        {/* Node.js */}
        <motion.div
          onMouseEnter={() => setHovered("node")}
          onMouseLeave={() => setHovered(null)}
          animate={{ borderColor: hovered === "node" ? "#059669" : "var(--border)", scale: hovered === "node" ? 1.02 : 1 }}
          style={{ border: "2px solid", borderRadius: 14, padding: 20, cursor: "default", display: "flex", flexDirection: "column", gap: 12, transition: "all 0.2s" }}
        >
          <div style={{ fontSize: "2rem", textAlign: "center" }}>🟢</div>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--success)", textAlign: "center", fontSize: "1.1rem" }}>In Node.js</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", lineHeight: 1.7, textAlign: "center" }}>
            Run JS on your computer directly — no browser needed. Used for servers, scripts, and tools.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: "auto" }}>
            {["JS only (no HTML/CSS)", "Access to file system", "Access to network/servers", "Run from the terminal"].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ color: "var(--success)", fontSize: "0.8rem" }}>✓</span>
                <span style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div style={{ marginTop: 16, background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.15)", borderRadius: 10, padding: "12px 14px", fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
        💡 <strong style={{ color: "var(--text)" }}>Both use the same JavaScript language.</strong> Whether your code runs in Chrome or in Node.js, the syntax is identical. The only difference is what extra tools are available — browsers give you the DOM and window; Node gives you the file system and server tools.
      </div>
    </div>
  );
}
