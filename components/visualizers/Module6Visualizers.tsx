"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Closure Demo ──────────────────────────────────────────────────────────────

export function ClosureDemo() {
  const [counters, setCounters] = useState<{ id: number; count: number; label: string }[]>([]);
  const [nextId, setNextId] = useState(1);

  const createCounter = () => {
    if (counters.length >= 4) return;
    setCounters(c => [...c, { id: nextId, count: 0, label: `counter${nextId}` }]);
    setNextId(n => n + 1);
  };

  const increment = (id: number) => {
    setCounters(c => c.map(cnt => cnt.id === id ? { ...cnt, count: cnt.count + 1 } : cnt));
  };

  const remove = (id: number) => {
    setCounters(c => c.filter(cnt => cnt.id !== id));
  };

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>🔒 Closure — Private State Factory</p>
      <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: 8, lineHeight: 1.6 }}>
        Each counter below was created by calling the same <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>makeCounter()</code> function.
        Even though they call the same code, each counter has its <strong>own completely private count</strong> that lives inside its closure.
        Clicking one <strong>never</strong> affects the others — they can&apos;t even see each other&apos;s values!
      </p>

      <div style={{ background: "var(--bg-primary)", borderRadius: 10, padding: "12px 16px", fontFamily: "var(--font-mono)", fontSize: "0.78rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: 20 }}>
        {`function makeCounter() {\n  let count = 0;  // private — each call gets its OWN copy\n  return function() {\n    count++;        // closes over 'count' from outer scope\n    return count;\n  };\n}\n\nconst counter1 = makeCounter(); // counter1's count starts at 0\nconst counter2 = makeCounter(); // counter2's count ALSO starts at 0 — independent!`}
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16, minHeight: 80 }}>
        <AnimatePresence>
          {counters.map(cnt => (
            <motion.div key={cnt.id} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
              style={{ background: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px", minWidth: 130, textAlign: "center", position: "relative" }}>
              <button onClick={() => remove(cnt.id)} style={{ position: "absolute", top: 6, right: 8, background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "0.8rem", opacity: 0.6 }}>✕</button>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: 4 }}>{cnt.label}()</div>
              <motion.div key={cnt.count} initial={{ scale: 1.3 }} animate={{ scale: 1 }}
                style={{ fontFamily: "var(--font-mono)", fontSize: "2.2rem", fontWeight: 800, color: "var(--primary)", marginBottom: 8 }}>
                {cnt.count}
              </motion.div>
              <button onClick={() => increment(cnt.id)}
                style={{ background: "linear-gradient(135deg, var(--primary), hsl(265,90%,50%))", border: "none", borderRadius: 8, padding: "6px 16px", color: "white", fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
                +1
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        {counters.length === 0 && (
          <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", display: "flex", alignItems: "center", opacity: 0.5 }}>
            Click "Create Counter" to spawn one!
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button onClick={createCounter} disabled={counters.length >= 4}
          style={{ background: counters.length >= 4 ? "var(--bg-surface-2)" : "rgba(139,92,246,0.15)", border: `1px solid ${counters.length >= 4 ? "var(--border)" : "var(--primary)"}`, borderRadius: 8, padding: "8px 18px", color: counters.length >= 4 ? "var(--text-muted)" : "var(--primary)", fontWeight: 600, cursor: counters.length >= 4 ? "not-allowed" : "pointer", fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
          + Create Counter
        </button>
        <span style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>
          {counters.length === 0 ? "No counters yet — each one will have its own private count" : `${counters.length} independent closure${counters.length > 1 ? "s" : ""} active`}
        </span>
      </div>
    </div>
  );
}

// ── Hoisting Visualizer ────────────────────────────────────────────────────────

export function HoistingVisualizer() {
  const [phase, setPhase] = useState<"written" | "hoisted" | "executed">("written");

  const phases = {
    written: {
      label: "As you write it",
      desc: "This is the code exactly as you typed it. Lines 1–3 come before the function declaration on line 6.",
      lines: [
        { code: "console.log(greeting);", color: "var(--text-muted)", tag: null },
        { code: "console.log(sayHi());", color: "var(--text-muted)", tag: null },
        { code: "var greeting = 'Hello!';", color: "var(--accent)", tag: "var" },
        { code: "", color: "transparent", tag: null },
        { code: "function sayHi() {", color: "var(--primary)", tag: "fn" },
        { code: "  return 'Hi there!';", color: "var(--text-muted)", tag: null },
        { code: "}", color: "var(--primary)", tag: null },
      ]
    },
    hoisted: {
      label: "After hoisting (JS rearranges internally)",
      desc: "Before running a single line, JS 'hoists' — moves function declarations to the very top in full, and var declarations to the top but leaves the value assignment where it was.",
      lines: [
        { code: "function sayHi() {", color: "var(--primary)", tag: "🚀 hoisted!" },
        { code: "  return 'Hi there!';", color: "var(--text-muted)", tag: null },
        { code: "}", color: "var(--primary)", tag: null },
        { code: "var greeting; // = undefined (not 'Hello!' yet!)", color: "var(--accent)", tag: "⬆️ hoisted (undefined)" },
        { code: "", color: "transparent", tag: null },
        { code: "console.log(greeting);", color: "var(--text-muted)", tag: null },
        { code: "console.log(sayHi());", color: "var(--text-muted)", tag: null },
        { code: "greeting = 'Hello!'; // value assigned here", color: "var(--text-muted)", tag: null },
      ]
    },
    executed: {
      label: "What actually runs",
      desc: "Now JS executes line by line. sayHi() works fine (fully hoisted). But greeting is undefined at first — the string 'Hello!' hasn't been assigned yet when we log it!",
      lines: [
        { code: "// sayHi() is fully available ✓", color: "var(--success)", tag: null },
        { code: "// greeting is: undefined  ← surprise!", color: "var(--error)", tag: "⚠️" },
        { code: "", color: "transparent", tag: null },
        { code: "console.log(greeting);", color: "var(--error)", tag: null },
        { code: "> undefined    // Not 'Hello!' — why?", color: "var(--error)", tag: null },
        { code: "console.log(sayHi());", color: "var(--success)", tag: null },
        { code: "> 'Hi there!'  // Works! Function was hoisted.", color: "var(--success)", tag: null },
      ]
    }
  };

  const p = phases[phase];

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ padding: "14px 20px", background: "var(--bg-surface-2)", borderBottom: "1px solid var(--border)", display: "flex", gap: 8, flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)", flex: 1 }}>⬆️ Hoisting Visualizer</span>
        {(["written", "hoisted", "executed"] as const).map(ph => (
          <button key={ph} onClick={() => setPhase(ph)}
            style={{ padding: "5px 14px", borderRadius: 7, background: phase === ph ? "rgba(139,92,246,0.2)" : "var(--bg-surface)", border: `1px solid ${phase === ph ? "var(--primary)" : "var(--border)"}`, color: phase === ph ? "var(--primary)" : "var(--text-muted)", fontSize: "0.78rem", cursor: "pointer", fontWeight: 600, textTransform: "capitalize", fontFamily: "var(--font-body)" }}>
            {ph}
          </button>
        ))}
      </div>

      <div style={{ padding: 20 }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>{p.label}</p>
        <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", lineHeight: 1.6, marginBottom: 16 }}>{p.desc}</p>

        <AnimatePresence mode="wait">
          <motion.div key={phase} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ background: "var(--bg-primary)", borderRadius: 10, padding: "14px 18px", fontFamily: "var(--font-mono)", fontSize: "0.82rem", lineHeight: 1.9 }}>
            {p.lines.map((line, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: line.color, flex: 1 }}>{line.code || " "}</span>
                {line.tag && (
                  <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", background: "var(--bg-surface-2)", borderRadius: 4, padding: "2px 8px", flexShrink: 0 }}>
                    {line.tag}
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
