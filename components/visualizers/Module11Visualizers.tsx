"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Spread & Rest Visualizer ──────────────────────────────────────────────────

export function SpreadRestVisualizer() {
  const [mode, setMode] = useState<"spread-array" | "spread-obj" | "rest">("spread-array");

  const examples = {
    "spread-array": {
      title: "Spread arrays (...)",
      desc: "The spread operator (...) expands an array into individual items. It's how you combine arrays, copy them, or pass them as individual arguments to a function — all without mutating the originals.",
      code: `const a = [1, 2, 3];\nconst b = [4, 5, 6];\n\n// Combine into new array:\nconst combined = [...a, ...b];\n// [1, 2, 3, 4, 5, 6]\n\n// Add items while spreading:\nconst withExtra = [0, ...a, 99];\n// [0, 1, 2, 3, 99]\n\n// Shallow copy (safe to modify without changing original):\nconst copy = [...a];\ncopy.push(99); // a is unchanged!`,
    },
    "spread-obj": {
      title: "Spread objects (...)",
      desc: "Spread also works on objects — it copies all key/value pairs. You can merge objects, override specific properties, and create modified copies without mutation. This pattern is everywhere in React's useState.",
      code: `const defaults = { theme: 'dark', lang: 'en', size: 14 };\nconst userPrefs = { theme: 'light', size: 16 };\n\n// Merge — later properties win on conflicts:\nconst config = { ...defaults, ...userPrefs };\n// { theme: 'light', lang: 'en', size: 16 }\n\n// Update one field without mutation:\nconst biggerFont = { ...config, size: 20 };\n// { theme: 'light', lang: 'en', size: 20 }\n// 'config' is still unchanged!`,
    },
    rest: {
      title: "Rest parameters (...)",
      desc: "The rest parameter also uses ... but in the OPPOSITE direction — instead of expanding, it gathers extra arguments or array items into a single array. Allows functions to accept any number of arguments.",
      code: `// Rest in function params — collect extras:\nfunction sum(...numbers) {\n  return numbers.reduce((a, b) => a + b, 0);\n}\nsum(1, 2, 3, 4, 5); // 15 — any number of args!\n\n// Rest in destructuring — grab the tail:\nconst [first, second, ...rest] = [1, 2, 3, 4, 5];\n// first = 1, second = 2, rest = [3, 4, 5]\n\nconst { name, ...otherProps } = user;\n// name pulled out, everything else in otherProps`,
    },
  };

  const m = examples[mode];

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ padding: "12px 16px", background: "var(--bg-surface-2)", borderBottom: "1px solid var(--border)", display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)", flex: 1 }}>🌊 Spread & Rest</span>
        {(Object.keys(examples) as (keyof typeof examples)[]).map(k => (
          <button key={k} onClick={() => setMode(k)}
            style={{ padding: "4px 12px", borderRadius: 6, background: mode === k ? "rgba(139,92,246,0.2)" : "var(--bg-surface)", border: `1px solid ${mode === k ? "var(--primary)" : "var(--border)"}`, color: mode === k ? "var(--primary)" : "var(--text-muted)", fontSize: "0.72rem", cursor: "pointer", fontWeight: 600, fontFamily: "var(--font-body)" }}>
            {k.replace("-", " ")}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={mode} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ padding: 20 }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>{m.title}</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: 16 }}>{m.desc}</p>
          <pre style={{ background: "var(--bg-primary)", borderRadius: 10, padding: "14px 18px", fontFamily: "var(--font-mono)", fontSize: "0.8rem", lineHeight: 1.8, color: "var(--text-muted)", overflowX: "auto", whiteSpace: "pre-wrap", margin: 0 }}>
            {m.code}
          </pre>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Class Syntax Comparator ────────────────────────────────────────────────────

export function ClassSyntaxComparator() {
  const [view, setView] = useState<"old" | "new">("old");

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ padding: "12px 16px", background: "var(--bg-surface-2)", borderBottom: "1px solid var(--border)", display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)", flex: 1 }}>🏛️ Class Syntax in ES6+</span>
        <button onClick={() => setView("old")} style={{ padding: "5px 14px", borderRadius: 7, background: view === "old" ? "rgba(239,68,68,0.15)" : "var(--bg-surface)", border: `1px solid ${view === "old" ? "var(--error)" : "var(--border)"}`, color: view === "old" ? "var(--error)" : "var(--text-muted)", fontSize: "0.78rem", cursor: "pointer", fontWeight: 600, fontFamily: "var(--font-body)" }}>
          Pre-ES6 (prototype-based)
        </button>
        <button onClick={() => setView("new")} style={{ padding: "5px 14px", borderRadius: 7, background: view === "new" ? "rgba(5,150,105,0.15)" : "var(--bg-surface)", border: `1px solid ${view === "new" ? "var(--success)" : "var(--border)"}`, color: view === "new" ? "var(--success)" : "var(--text-muted)", fontSize: "0.78rem", cursor: "pointer", fontWeight: 600, fontFamily: "var(--font-body)" }}>
          ES6+ class syntax
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={view} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ padding: 20 }}>
          {view === "old" ? (
            <>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: 12 }}>
                Before ES6, "classes" were just constructor functions + manual prototype assignment. It worked, but was confusing and verbose:
              </p>
              <pre style={{ background: "var(--bg-primary)", borderRadius: 10, padding: "14px 18px", fontFamily: "var(--font-mono)", fontSize: "0.8rem", lineHeight: 1.8, color: "var(--error)", overflowX: "auto", whiteSpace: "pre-wrap", margin: 0 }}>
                {`function Animal(name, sound) {\n  this.name = name;\n  this.sound = sound;\n}\n\n// Have to manually attach to prototype:\nAnimal.prototype.speak = function() {\n  return this.name + ' says ' + this.sound;\n};\n\n// Inheritance:\nfunction Dog(name) {\n  Animal.call(this, name, 'Woof'); // call parent\n}\nDog.prototype = Object.create(Animal.prototype);\nDog.prototype.constructor = Dog;`}
              </pre>
            </>
          ) : (
            <>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: 12 }}>
                ES6 class syntax does <strong>exactly the same thing</strong> under the hood — it&apos;s just much, much cleaner to read and write. Think of it as a nicer coat of paint over prototypes:
              </p>
              <pre style={{ background: "var(--bg-primary)", borderRadius: 10, padding: "14px 18px", fontFamily: "var(--font-mono)", fontSize: "0.8rem", lineHeight: 1.8, color: "var(--success)", overflowX: "auto", whiteSpace: "pre-wrap", margin: 0 }}>
                {`class Animal {\n  constructor(name, sound) {\n    this.name = name;\n    this.sound = sound;\n  }\n\n  // Methods go directly in the class body:\n  speak() {\n    return \`\${this.name} says \${this.sound}\`;\n  }\n}\n\n// Inheritance is just 'extends':\nclass Dog extends Animal {\n  constructor(name) {\n    super(name, 'Woof'); // calls Animal constructor\n  }\n}`}
              </pre>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
