"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── DOM Tree Visualizer ────────────────────────────────────────────────────────

export function DOMTreeVisualizer() {
  const [selected, setSelected] = useState<string | null>(null);

  const nodes = [
    { id: "html", label: "<html>", depth: 0, color: "#7c3aed", desc: "The root element — every browser page has exactly one. Everything else is a child of this." },
    { id: "body", label: "<body>", depth: 1, color: "#0891b2", desc: "Contains all visible page content. When JS does document.querySelector() it searches inside body for matching elements." },
    { id: "div", label: "<div id='app'>", depth: 2, color: "#d97706", desc: "A container element. React and Vue apps usually target a <div id='root'> or <div id='app'> to mount the entire application inside." },
    { id: "h1", label: "<h1>", depth: 3, color: "#059669", desc: "A heading element. Access it with document.querySelector('h1') and change its text with element.textContent = 'New!'." },
    { id: "p", label: "<p class='intro'>", depth: 3, color: "#059669", desc: "A paragraph. All elements with class='intro' are accessible via document.querySelectorAll('.intro') which returns a list." },
    { id: "btn", label: "<button id='go'>", depth: 3, color: "#db2777", desc: "A button. Attach click behaviour with: document.getElementById('go').addEventListener('click', () => { ... })." },
  ];

  const sel = nodes.find(n => n.id === selected);

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>🌳 DOM Tree</p>
      <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: 20, lineHeight: 1.6 }}>
        The DOM (Document Object Model) is JavaScript's representation of your HTML as a tree.
        Every tag becomes a <strong style={{ color: "var(--text)" }}>node</strong> in the tree. Click any node to see how to access it with JavaScript.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Tree */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {nodes.map(node => (
            <motion.div key={node.id} onClick={() => setSelected(selected === node.id ? null : node.id)}
              animate={{ background: selected === node.id ? node.color + "15" : "var(--bg-primary)", borderColor: selected === node.id ? node.color : "var(--border)" }}
              style={{ border: "1px solid", borderRadius: 8, padding: "8px 12px", marginLeft: node.depth * 16, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s" }}>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", opacity: 0.5, minWidth: 16 }}>{"│".repeat(Math.max(0, node.depth - 1))}{node.depth > 0 ? "└" : ""}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: selected === node.id ? node.color : "var(--text)", fontWeight: selected === node.id ? 700 : 400 }}>
                {node.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Description */}
        <div>
          <AnimatePresence mode="wait">
            {sel ? (
              <motion.div key={sel.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                style={{ background: sel.color + "10", border: `1px solid ${sel.color}40`, borderRadius: 12, padding: "16px 18px", height: "100%" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: sel.color, marginBottom: 10 }}>{sel.label}</p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", lineHeight: 1.7 }}>{sel.desc}</p>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ color: "var(--text-muted)", fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center", padding: 20 }}>
                👆 Click any node to see how to access it with JavaScript
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ── Event Bubbling Demo ────────────────────────────────────────────────────────

export function EventBubblingDemo() {
  const [fired, setFired] = useState<string[]>([]);
  const [stopped, setStopped] = useState(false);
  const [useStop, setUseStop] = useState(false);

  const handleClick = (source: string) => {
    if (stopped) return;
    setFired(prev => {
      if (prev.includes(source)) return prev;
      const order = ["button", "div", "section", "body", "document", "window"];
      const startIdx = order.indexOf(source);
      const bubble = useStop ? [source] : order.slice(startIdx);
      const newFired = [...new Set([...prev, ...bubble])];
      if (useStop && source === "button") {
        setStopped(true);
        setTimeout(() => setStopped(false), 2000);
      }
      return newFired;
    });
  };

  const reset = () => { setFired([]); setStopped(false); };

  const layers = [
    { id: "window", label: "window", color: "#7c3aed", pad: 0 },
    { id: "document", label: "document", color: "#0891b2", pad: 1 },
    { id: "body", label: "<body>", color: "#d97706", pad: 2 },
    { id: "section", label: "<section>", color: "#059669", pad: 3 },
    { id: "div", label: "<div>", color: "#6366f1", pad: 4 },
    { id: "button", label: "🖱️ <button> ← CLICK ME", color: "#db2777", pad: 5 },
  ];

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>🫧 Event Bubbling</p>
      <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: 16, lineHeight: 1.6 }}>
        When you click the button, the click event fires on the button first, then <strong style={{ color: "var(--text)" }}>bubbles up</strong> through every ancestor element to the top.
        That&apos;s why you can listen for <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>click</code> on a parent element and catch events from all its children!
      </p>

      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
        <label style={{ display: "flex", gap: 8, alignItems: "center", cursor: "pointer", color: "var(--text-muted)", fontSize: "0.85rem" }}>
          <input type="checkbox" checked={useStop} onChange={e => { setUseStop(e.target.checked); reset(); }}
            style={{ accentColor: "var(--primary)", width: 16, height: 16 }} />
          Use <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)", marginLeft: 4 }}>e.stopPropagation()</code> on button
        </label>
        <button onClick={reset} style={{ background: "var(--bg-surface-2)", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 14px", cursor: "pointer", color: "var(--text-muted)", fontWeight: 600, fontFamily: "var(--font-body)", fontSize: "0.82rem" }}>
          Reset
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Bubble layers */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {[...layers].reverse().map(layer => (
            <motion.div key={layer.id}
              animate={{ background: fired.includes(layer.id) ? layer.color + "20" : "var(--bg-primary)", borderColor: fired.includes(layer.id) ? layer.color : "var(--border)", scale: fired.includes(layer.id) ? 1.01 : 1 }}
              onClick={() => layer.id === "button" && handleClick("button")}
              style={{ border: "2px solid", borderRadius: 8, padding: "8px 14px", marginLeft: layer.pad * 8, cursor: layer.id === "button" ? "pointer" : "default", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.3s" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: fired.includes(layer.id) ? layer.color : "var(--text-muted)", fontWeight: fired.includes(layer.id) ? 700 : 400 }}>
                {layer.label}
              </span>
              {fired.includes(layer.id) && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ fontSize: "0.7rem", color: layer.color, fontWeight: 700 }}>
                  🔥 fired!
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Log */}
        <div>
          <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase" }}>Event log (order of firing)</p>
          <div style={{ background: "var(--bg-primary)", borderRadius: 10, padding: "12px 14px", minHeight: 100, fontFamily: "var(--font-mono)", fontSize: "0.78rem", display: "flex", flexDirection: "column", gap: 4 }}>
            <AnimatePresence>
              {fired.length === 0 && <span style={{ color: "var(--text-muted)", opacity: 0.5 }}>// Click the button above...</span>}
              {fired.map((id, i) => {
                const l = layers.find(l => l.id === id);
                return (
                  <motion.div key={id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    style={{ color: l?.color ?? "var(--text-muted)", display: "flex", gap: 8 }}>
                    <span style={{ opacity: 0.5 }}>{i + 1}.</span>
                    <span>{id} clicked</span>
                    {useStop && id === "button" && <span style={{ color: "var(--error)", fontWeight: 700 }}> — ✋ stopped!</span>}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
