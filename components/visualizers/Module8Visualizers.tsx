"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Array Method Playground ────────────────────────────────────────────────────

const ORIGINAL = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export function ArrayMethodPlayground() {
  const [method, setMethod] = useState<"filter" | "map" | "reduce" | "find" | "some" | "every" | "flat">("filter");

  type MethodKey = "filter" | "map" | "reduce" | "find" | "some" | "every" | "flat";

  const methods: Record<MethodKey, { code: string; result: unknown; desc: string; highlight: number[]; returns: string }> = {
    filter: {
      code: `[1..10].filter(n => n % 2 === 0)`,
      result: ORIGINAL.filter(n => n % 2 === 0),
      desc: "filter() keeps only items that pass the test (return true). Items that return false are removed. Always returns a NEW array — never mutates the original.",
      highlight: ORIGINAL.map((n, i) => n % 2 === 0 ? i : -1).filter(i => i !== -1),
      returns: "new array",
    },
    map: {
      code: `[1..10].map(n => n * n)`,
      result: ORIGINAL.map(n => n * n),
      desc: "map() transforms EVERY item through a function and returns a new array of the same length. Great for converting data from one shape to another — like turning names into greetings, or numbers into strings.",
      highlight: ORIGINAL.map((_, i) => i),
      returns: "new array (same length)",
    },
    reduce: {
      code: `[1..10].reduce((sum, n) => sum + n, 0)`,
      result: ORIGINAL.reduce((sum, n) => sum + n, 0),
      desc: "reduce() collapses an entire array into a single value by running an accumulator function. The second argument (0) is the starting value. It's the most powerful array method — map and filter can both be written using reduce.",
      highlight: ORIGINAL.map((_, i) => i),
      returns: "single value",
    },
    find: {
      code: `[1..10].find(n => n > 6)`,
      result: ORIGINAL.find(n => n > 6),
      desc: "find() returns the FIRST item that passes the test, then stops searching immediately. Much faster than filter if you only need one item. Returns undefined if nothing matches.",
      highlight: [6],
      returns: "first match or undefined",
    },
    some: {
      code: `[1..10].some(n => n > 8)`,
      result: String(ORIGINAL.some(n => n > 8)),
      desc: "some() returns true as soon as ONE item passes the test — then stops. Think of it as 'does ANY item satisfy this condition?'. Works like an OR across all items. Returns false only if NONE match.",
      highlight: [8],
      returns: "boolean",
    },
    every: {
      code: `[1..10].every(n => n > 0)`,
      result: String(ORIGINAL.every(n => n > 0)),
      desc: "every() returns true only if ALL items pass the test. If even one fails, it returns false immediately and stops. Think of it as an AND across all items — everyone must agree.",
      highlight: ORIGINAL.map((_, i) => i),
      returns: "boolean",
    },
    flat: {
      code: `[[1,2],[3,4],[5]].flat()`,
      result: [[1,2],[3,4],[5]].flat(),
      desc: "flat() flattens a nested array one level deep by default. You can pass a depth number to flatten multiple levels deep. flat(Infinity) flattens completely no matter how deeply nested.",
      highlight: [0, 1, 2, 3, 4],
      returns: "new flattened array",
    },
  };

  const m = methods[method];
  const resultArray = Array.isArray(m.result) ? m.result : null;
  const singleResult = !Array.isArray(m.result) ? m.result : null;

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
      {/* Method selector */}
      <div style={{ padding: "12px 16px", background: "var(--bg-surface-2)", borderBottom: "1px solid var(--border)", display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)", marginRight: 4, fontSize: "0.9rem" }}>🧰 Array Method Playground</span>
        {(Object.keys(methods) as MethodKey[]).map(k => (
          <button key={k} onClick={() => setMethod(k)}
            style={{ padding: "4px 12px", borderRadius: 6, background: method === k ? "rgba(139,92,246,0.2)" : "var(--bg-surface)", border: `1px solid ${method === k ? "var(--primary)" : "var(--border)"}`, color: method === k ? "var(--primary)" : "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.72rem", cursor: "pointer", fontWeight: 700 }}>
            .{k}()
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={method} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ padding: 20 }}>
          {/* Code */}
          <div style={{ background: "var(--bg-primary)", borderRadius: 10, padding: "10px 16px", fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--secondary)", marginBottom: 16 }}>
            {m.code}
          </div>

          {/* Input array */}
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase" }}>Input array</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {ORIGINAL.map((n, i) => (
                <motion.div key={n}
                  animate={{ background: m.highlight.includes(i) ? "rgba(139,92,246,0.2)" : "var(--bg-primary)", borderColor: m.highlight.includes(i) ? "var(--primary)" : "var(--border)", scale: m.highlight.includes(i) ? 1.1 : 1 }}
                  style={{ border: "2px solid", borderRadius: 8, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.9rem", color: m.highlight.includes(i) ? "var(--primary)" : "var(--text-muted)", transition: "all 0.3s" }}>
                  {n}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "1.2rem", margin: "8px 0" }}>↓ .{method}()</div>

          {/* Output */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase" }}>Result</p>
              <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "var(--accent)", background: "rgba(251,191,36,0.12)", borderRadius: 4, padding: "2px 8px" }}>returns: {m.returns}</span>
            </div>
            {resultArray ? (
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {resultArray.map((n, i) => (
                  <motion.div key={`${n}-${i}`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05 }}
                    style={{ background: "rgba(5,150,105,0.15)", border: "2px solid var(--success)", borderRadius: 8, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--success)", fontSize: "0.85rem" }}>
                    {String(n)}
                  </motion.div>
                ))}
                {resultArray.length === 0 && <span style={{ color: "var(--error)", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>[] (empty — no items matched)</span>}
              </div>
            ) : (
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                style={{ display: "inline-block", background: "rgba(5,150,105,0.15)", border: "2px solid var(--success)", borderRadius: 10, padding: "10px 24px", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "1.2rem", color: "var(--success)" }}>
                {String(singleResult)}
              </motion.div>
            )}
          </div>

          {/* Description */}
          <div style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.15)", borderRadius: 10, padding: "12px 14px", fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
            💡 {m.desc}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Destructuring Explorer ─────────────────────────────────────────────────────

export function DestructuringExplorer() {
  const [mode, setMode] = useState<"array" | "object">("array");

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ padding: "12px 20px", background: "var(--bg-surface-2)", borderBottom: "1px solid var(--border)", display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)", flex: 1 }}>📦 Destructuring Explorer</span>
        {(["array", "object"] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            style={{ padding: "5px 14px", borderRadius: 7, background: mode === m ? "rgba(6,182,212,0.2)" : "var(--bg-surface)", border: `1px solid ${mode === m ? "var(--secondary)" : "var(--border)"}`, color: mode === m ? "var(--secondary)" : "var(--text-muted)", fontSize: "0.78rem", cursor: "pointer", fontWeight: 600, textTransform: "capitalize", fontFamily: "var(--font-body)" }}>
            {m}
          </button>
        ))}
      </div>

      <div style={{ padding: 20 }}>
        {mode === "array" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase" }}>Old way (index access)</p>
                <pre style={{ background: "var(--bg-primary)", borderRadius: 8, padding: "12px 14px", fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--error)", lineHeight: 1.8, margin: 0 }}>
                  {`const coords = [10, 20, 30];\nconst x = coords[0]; // 10\nconst y = coords[1]; // 20\nconst z = coords[2]; // 30`}
                </pre>
              </div>
              <div>
                <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase" }}>Modern way (destructuring)</p>
                <pre style={{ background: "var(--bg-primary)", borderRadius: 8, padding: "12px 14px", fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--success)", lineHeight: 1.8, margin: 0 }}>
                  {`const coords = [10, 20, 30];\nconst [x, y, z] = coords;\n// x = 10, y = 20, z = 30\n// One line! So much cleaner.`}
                </pre>
              </div>
            </div>
            <pre style={{ background: "var(--bg-primary)", borderRadius: 8, padding: "12px 14px", fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.8, margin: 0 }}>
              {`// Skip items with empty slots:\nconst [first, , third] = [1, 2, 3]; // first=1, third=3\n\n// Grab the rest with ...rest:\nconst [head, ...tail] = [1, 2, 3, 4]; // head=1, tail=[2,3,4]\n\n// Default values if undefined:\nconst [a = 10, b = 20] = [5]; // a=5, b=20 (used default)`}
            </pre>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase" }}>Old way</p>
                <pre style={{ background: "var(--bg-primary)", borderRadius: 8, padding: "12px 14px", fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--error)", lineHeight: 1.8, margin: 0 }}>
                  {`const user = { name: 'Alice', age: 28 };\nconst name = user.name;\nconst age  = user.age;`}
                </pre>
              </div>
              <div>
                <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase" }}>With destructuring</p>
                <pre style={{ background: "var(--bg-primary)", borderRadius: 8, padding: "12px 14px", fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--success)", lineHeight: 1.8, margin: 0 }}>
                  {`const user = { name: 'Alice', age: 28 };\nconst { name, age } = user;\n// name = 'Alice', age = 28`}
                </pre>
              </div>
            </div>
            <pre style={{ background: "var(--bg-primary)", borderRadius: 8, padding: "12px 14px", fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.8, margin: 0 }}>
              {`// Rename while destructuring:\nconst { name: userName } = user; // userName = 'Alice'\n\n// Default values:\nconst { role = 'viewer' } = user; // role = 'viewer' (not in user)\n\n// Nested destructuring:\nconst { address: { city } } = { address: { city: 'NYC' } };\n\n// In function parameters (VERY common in React!):\nfunction greet({ name, age }) {\n  return \`Hello \${name}, you are \${age}\`;\n}`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
