"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Operator Playground ──────────────────────────────────────────────────────

export function OperatorPlayground() {
  const [left, setLeft] = useState("10");
  const [right, setRight] = useState("3");
  const [op, setOp] = useState("+");

  const ops = ["+", "-", "*", "/", "%", "**", "===", "!==", ">", "<", ">=", "<=", "&&", "||", "??"];

  let result: string;
  try {
    // eslint-disable-next-line no-eval
    const l = isNaN(Number(left)) ? `"${left}"` : left;
    const r = isNaN(Number(right)) ? `"${right}"` : right;
    const raw = eval(`(${l}) ${op} (${r})`);
    result = JSON.stringify(raw);
  } catch {
    result = "Error";
  }

  const resultColor = result === "true" ? "var(--success)" : result === "false" ? "var(--error)" : "var(--secondary)";

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>
        🧮 Operator Playground
      </p>
      <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: 20, lineHeight: 1.6 }}>
        Type any values in the boxes and pick an operator. Watch the result update live — try mixing types like a string and a number!
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <input
          value={left}
          onChange={e => setLeft(e.target.value)}
          style={{ width: 100, background: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", color: "var(--text)", fontFamily: "var(--font-mono)", fontSize: "1rem", outline: "none", textAlign: "center" }}
        />
        <select
          value={op}
          onChange={e => setOp(e.target.value)}
          style={{ background: "var(--bg-surface-2)", border: "1px solid var(--primary)", borderRadius: 8, padding: "10px 14px", color: "var(--primary)", fontFamily: "var(--font-mono)", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer", outline: "none" }}
        >
          {ops.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <input
          value={right}
          onChange={e => setRight(e.target.value)}
          style={{ width: 100, background: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", color: "var(--text)", fontFamily: "var(--font-mono)", fontSize: "1rem", outline: "none", textAlign: "center" }}
        />
        <span style={{ color: "var(--text-muted)", fontSize: "1.2rem" }}>=</span>
        <motion.div
          key={result}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ background: "var(--bg-primary)", border: `2px solid ${resultColor}`, borderRadius: 10, padding: "10px 20px", fontFamily: "var(--font-mono)", fontSize: "1.1rem", fontWeight: 700, color: resultColor, minWidth: 80, textAlign: "center" }}
        >
          {result}
        </motion.div>
      </div>

      <div style={{ background: "var(--bg-primary)", borderRadius: 10, padding: "10px 16px", fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-muted)" }}>
        <span style={{ color: "var(--text-muted)", opacity: 0.6 }}>// In your code: </span>
        <span style={{ color: "var(--secondary)" }}>{isNaN(Number(left)) ? `"${left}"` : left}</span>
        <span style={{ color: "var(--primary)", margin: "0 6px" }}>{op}</span>
        <span style={{ color: "var(--secondary)" }}>{isNaN(Number(right)) ? `"${right}"` : right}</span>
        <span style={{ color: "var(--text-muted)", margin: "0 6px" }}>{"// =>"}</span>
        <span style={{ color: resultColor }}>{result}</span>
      </div>
    </div>
  );
}

// ── Short-Circuit Visualizer ──────────────────────────────────────────────────

export function ShortCircuitVisualizer() {
  const [scenario, setScenario] = useState(0);

  const scenarios = [
    {
      label: "&& (AND)",
      expr: "isLoggedIn && showDashboard()",
      left: { label: "isLoggedIn", value: true },
      right: { label: "showDashboard()", value: "renders UI" },
      leftTrue: true,
      explanation: "Left is TRUE → AND keeps going → right side evaluates",
      result: "renders UI",
      resultColor: "var(--success)"
    },
    {
      label: "&& false first",
      expr: "isLoggedIn && showDashboard()",
      left: { label: "isLoggedIn", value: false },
      right: { label: "showDashboard()", value: "NEVER CALLED" },
      leftTrue: false,
      explanation: "Left is FALSE → AND short-circuits → right side is SKIPPED entirely",
      result: "false",
      resultColor: "var(--error)"
    },
    {
      label: "|| (OR)",
      expr: "username || 'Guest'",
      left: { label: "username", value: '""' },
      right: { label: "'Guest'", value: "Guest" },
      leftTrue: false,
      explanation: "Left is falsy (empty string) → OR keeps going → right side returns 'Guest' as fallback",
      result: '"Guest"',
      resultColor: "var(--accent)"
    },
    {
      label: "?? (nullish)",
      expr: "count ?? 0",
      left: { label: "count", value: 0 },
      right: { label: "0", value: "0 (default)" },
      leftTrue: true,
      explanation: "Left is 0 — which is falsy but NOT null/undefined → ?? keeps the 0 instead of using the fallback!",
      result: "0",
      resultColor: "var(--secondary)"
    },
  ];

  const s = scenarios[scenario];

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ padding: "14px 20px", background: "var(--bg-surface-2)", borderBottom: "1px solid var(--border)", display: "flex", gap: 8, flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)", marginRight: 8 }}>⚡ Short-Circuit Visualizer</span>
        {scenarios.map((sc, i) => (
          <button key={i} onClick={() => setScenario(i)} style={{ padding: "4px 12px", borderRadius: 6, background: scenario === i ? "rgba(139,92,246,0.2)" : "var(--bg-surface)", border: `1px solid ${scenario === i ? "var(--primary)" : "var(--border)"}`, color: scenario === i ? "var(--primary)" : "var(--text-muted)", fontSize: "0.72rem", cursor: "pointer", fontWeight: 600 }}>
            {sc.label}
          </button>
        ))}
      </div>

      <div style={{ padding: 24 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--text)", marginBottom: 24, background: "var(--bg-primary)", borderRadius: 10, padding: "12px 20px" }}>
          {s.expr}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          {/* Left side */}
          <motion.div key={`l-${scenario}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            style={{ background: s.leftTrue ? "rgba(5,150,105,0.1)" : "rgba(239,68,68,0.1)", border: `2px solid ${s.leftTrue ? "var(--success)" : "var(--error)"}`, borderRadius: 12, padding: "14px 20px", textAlign: "center", minWidth: 120 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 4 }}>{s.left.label}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: s.leftTrue ? "var(--success)" : "var(--error)", fontSize: "1rem" }}>{String(s.left.value)}</div>
          </motion.div>

          {/* Arrow */}
          <motion.div key={`arrow-${scenario}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ fontSize: "1.5rem", color: s.leftTrue ? "var(--success)" : "var(--error)" }}>
            {s.leftTrue ? "→" : "✕"}
          </motion.div>

          {/* Right side */}
          <motion.div key={`r-${scenario}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            style={{ background: s.leftTrue ? "rgba(6,182,212,0.1)" : "rgba(100,100,100,0.05)", border: `2px solid ${s.leftTrue ? "var(--secondary)" : "var(--border)"}`, borderRadius: 12, padding: "14px 20px", textAlign: "center", minWidth: 150, opacity: s.leftTrue ? 1 : 0.4 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 4 }}>{s.right.label}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: s.leftTrue ? "var(--secondary)" : "var(--text-muted)", fontSize: "0.9rem" }}>{s.right.value}</div>
          </motion.div>

          <span style={{ color: "var(--text-muted)" }}>→</span>

          <motion.div key={`res-${scenario}`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: "spring" }}
            style={{ background: "var(--bg-primary)", border: `2px solid ${s.resultColor}`, borderRadius: 12, padding: "14px 20px", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: 4 }}>result</div>
            <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: s.resultColor }}>{s.result}</div>
          </motion.div>
        </div>

        <div style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 10, padding: "12px 16px", fontSize: "0.875rem", color: "var(--text)", lineHeight: 1.6 }}>
          💡 {s.explanation}
        </div>
      </div>
    </div>
  );
}
