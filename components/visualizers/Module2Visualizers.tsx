"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, AlertTriangle, Check, X } from "lucide-react";

// ── Variable Shelf Visualizer ──────────────────────────────────────────────────

interface VarBox {
  name: string;
  value: string;
  type: "const" | "let" | "var";
  scope: "block" | "outer";
}

const initialVars: VarBox[] = [
  { name: "PI", value: "3.14159", type: "const", scope: "outer" },
  { name: "name", value: '"Alice"', type: "let", scope: "outer" },
  { name: "score", value: "0", type: "let", scope: "outer" },
  { name: "leaked", value: '"I escaped!"', type: "var", scope: "outer" },
];

export function VariableShelfVisualizer() {
  const [vars, setVars] = useState(initialVars);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [newVal, setNewVal] = useState("");

  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 2500);
  };

  const tryReassign = (v: VarBox, val: string) => {
    if (v.type === "const") {
      showMessage(`TypeError: Assignment to constant variable! 'const' variables cannot be reassigned.`, "error");
      return;
    }
    setVars(vs => vs.map(x => x.name === v.name ? { ...x, value: val } : x));
    showMessage(`✓ '${v.name}' updated to ${val}`, "success");
    setEditing(null);
  };

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16 }}>
      <div style={{ padding: "14px 20px", background: "var(--bg-surface-2)", borderBottom: "1px solid var(--border)" }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--text)" }}>Variable Declaration Visualizer</span>
        <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 4 }}>Click a box to try reassigning it. Can you change a const?</p>
      </div>

      <div style={{ padding: 24 }}>
        {/* Shelves */}
        {(["const", "let", "var"] as const).map(type => {
          const typeVars = vars.filter(v => v.type === type);
          const colors = { const: { label: "var(--error)", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.25)" }, let: { label: "var(--secondary)", bg: "rgba(6,182,212,0.08)", border: "rgba(6,182,212,0.25)" }, var: { label: "var(--accent)", bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.25)" } }[type];
          const label = { const: "const — Immutable binding (can't reassign)", let: "let — Block-scoped, mutable", var: "var — Function-scoped, hoisted" }[type];
          return (
            <div key={type} style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ height: 2, flex: 1, background: colors.border.replace("0.25", "0.4") }} />
                <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", fontWeight: 700, color: colors.label, padding: "2px 10px", background: colors.bg, border: `1px solid ${colors.border}`, borderRadius: 50 }}>
                  {label}
                </span>
                <div style={{ height: 2, flex: 1, background: colors.border.replace("0.25", "0.4") }} />
              </div>

              <div style={{ background: colors.bg, border: `1px dashed ${colors.border}`, borderRadius: 10, padding: 16, display: "flex", gap: 12, flexWrap: "wrap", minHeight: 80, alignItems: "center", position: "relative" }}>
                {typeVars.length === 0 && <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", opacity: 0.5 }}>No {type} variables</span>}
                {typeVars.map(v => (
                  <motion.div
                    key={v.name}
                    layout
                    whileHover={{ scale: 1.03 }}
                    onClick={() => { setEditing(v.name); setNewVal(v.value); }}
                    style={{ cursor: "pointer", position: "relative" }}
                  >
                    <div style={{
                      background: "var(--bg-surface)",
                      border: `2px solid ${editing === v.name ? colors.label : colors.border.replace("0.25", "0.5")}`,
                      borderRadius: 10,
                      padding: "10px 14px",
                      minWidth: 110,
                      textAlign: "center",
                    }}>
                      {type === "const" && (
                        <Lock size={10} style={{ color: colors.label, position: "absolute", top: -5, right: -5, background: "var(--bg-surface)", borderRadius: "50%", padding: 1 }} />
                      )}
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: 4 }}>{type}</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: colors.label, fontSize: "0.9rem", marginBottom: 4 }}>{v.name}</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text)", fontFamily: "var(--font-mono)" }}>{v.value}</div>
                    </div>

                    {/* Edit popup */}
                    <AnimatePresence>
                      {editing === v.name && (
                        <motion.div
                          initial={{ opacity: 0, x: -8, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          onClick={e => e.stopPropagation()}
                          style={{ position: "absolute", top: "50%", left: "calc(100% + 12px)", transform: "translateY(-50%)", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 10, padding: 12, zIndex: 50, boxShadow: "0 8px 30px rgba(0,0,0,0.5)", minWidth: 220 }}
                        >
                          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 8 }}>Change value of <code style={{ color: colors.label }}>{v.name}</code>:</p>
                          <input
                            autoFocus
                            value={newVal}
                            onChange={e => setNewVal(e.target.value)}
                            onKeyDown={e => { if (e.key === "Enter") tryReassign(v, newVal); if (e.key === "Escape") setEditing(null); }}
                            style={{ width: "100%", background: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: 6, padding: "6px 10px", color: "var(--text)", fontFamily: "var(--font-mono)", fontSize: "0.85rem", marginBottom: 8, outline: "none" }}
                          />
                          <div style={{ display: "flex", gap: 6 }}>
                            <button onClick={() => tryReassign(v, newVal)} style={{ flex: 1, background: colors.bg, border: `1px solid ${colors.border}`, color: colors.label, borderRadius: 6, padding: "5px 0", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-body)" }}>
                              <Check size={11} style={{ display: "inline", marginRight: 3 }} /> Assign
                            </button>
                            <button onClick={() => setEditing(null)} style={{ background: "var(--bg-surface-2)", border: "1px solid var(--border)", color: "var(--text-muted)", borderRadius: 6, padding: "5px 10px", fontSize: "0.75rem", cursor: "pointer" }}>
                              <X size={11} />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Message */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              style={{
                padding: "12px 16px",
                borderRadius: 10,
                background: message.type === "error" ? "rgba(239,68,68,0.12)" : "rgba(52,211,153,0.12)",
                border: `1px solid ${message.type === "error" ? "rgba(239,68,68,0.3)" : "rgba(52,211,153,0.3)"}`,
                color: message.type === "error" ? "var(--error)" : "var(--success)",
                fontSize: "0.85rem",
                fontFamily: "var(--font-mono)",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {message.type === "error" ? <AlertTriangle size={14} /> : <Check size={14} />}
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Type Museum ────────────────────────────────────────────────────────────────

const types = [
  {
    name: "string",
    example: '"Hello"',
    icon: "📝",
    color: "#059669",
    desc: "Text data. Always wrapped in quotes (single, double, or backticks).",
    examples: ['"Hello"', "'World'", "`JS ${1 + 1}`"],
    notes: "Use template literals (backticks) for embedding variables.",
  },
  {
    name: "number",
    example: "42",
    icon: "🔢",
    color: "#0891b2",
    desc: "Any number — integers, decimals, even Infinity and NaN.",
    examples: ["42", "3.14", "-100", "Infinity", "NaN"],
    notes: "JS has only ONE number type (unlike Java/C which have int, float, etc.).",
  },
  {
    name: "boolean",
    example: "true",
    icon: "⚡",
    color: "#7c3aed",
    desc: "Only two values: true or false. The yes/no of JavaScript.",
    examples: ["true", "false", "2 > 1 // true", "1 === '1' // false"],
    notes: "Functions like isLoggedIn() or isValid() should return booleans.",
  },
  {
    name: "null",
    example: "null",
    icon: "🕳️",
    color: "#6366f1",
    desc: "Intentional absence of a value. A deliberate 'nothing here'.",
    examples: ["let user = null;", "// user will be set later"],
    notes: "Use null to explicitly say 'this has no value yet'.",
  },
  {
    name: "undefined",
    example: "undefined",
    icon: "👻",
    color: "#64748b",
    desc: "A variable declared but not assigned. JS's 'I don't know yet'.",
    examples: ["let x;", "console.log(x); // undefined"],
    notes: "Usually you don't set something to undefined — JS does it automatically.",
  },
  {
    name: "symbol",
    example: "Symbol('id')",
    icon: "🔑",
    color: "#d97706",
    desc: "A unique identifier. No two Symbols are ever equal.",
    examples: ["Symbol('id')", "Symbol('id') === Symbol('id') // false!"],
    notes: "Useful for unique object property keys. Advanced topic.",
  },
  {
    name: "bigint",
    example: "9007199254740993n",
    icon: "♾️",
    color: "#db2777",
    desc: "For numbers too large for the regular number type.",
    examples: ["9007199254740993n", "BigInt(12345)"],
    notes: "Use when you need very precise large integers (e.g., financial calculations).",
  },
  {
    name: "object",
    example: "{ name: 'Alice' }",
    icon: "📦",
    color: "#7c3aed",
    desc: "A collection of key-value pairs. Nearly everything in JS is an object.",
    examples: ['{ name: "Alice", age: 25 }', "[1, 2, 3]  // arrays are objects!", "function(){}  // functions too!"],
    notes: "The most important data type in JS. We'll dedicate entire modules to it!",
  },
];

export function TypeMuseum() {
  const [selected, setSelected] = useState<string | null>(null);
  const sel = types.find(t => t.name === selected);

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ padding: "14px 20px", background: "var(--bg-surface-2)", borderBottom: "1px solid var(--border)" }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--text)" }}>JavaScript Type Museum</span>
        <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 4 }}>Click any type to inspect it</p>
      </div>

      <div style={{ padding: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 10, marginBottom: 16 }}>
          {types.map(t => (
            <motion.div
              key={t.name}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(selected === t.name ? null : t.name)}
              style={{
                background: selected === t.name ? t.color + "20" : "var(--bg-surface-2)",
                border: `2px solid ${selected === t.name ? t.color : "var(--border)"}`,
                borderRadius: 10,
                padding: "14px 12px",
                textAlign: "center",
                cursor: "pointer",
                transition: "border-color 0.2s, background 0.2s",
              }}
            >
              <div style={{ fontSize: "1.6rem", marginBottom: 6 }}>{t.icon}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: selected === t.name ? t.color : "var(--text)", fontSize: "0.82rem", marginBottom: 3 }}>{t.name}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-muted)" }}>{t.example}</div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {sel && (
            <motion.div
              key={sel.name}
              initial={{ opacity: 0, y: 12, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: "hidden" }}
            >
              <div style={{ background: sel.color + "10", border: `1px solid ${sel.color}40`, borderRadius: 12, padding: "18px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: "1.5rem" }}>{sel.icon}</span>
                  <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: sel.color, fontSize: "1.1rem" }}>{sel.name}</h4>
                  <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", background: "rgba(0,0,0,0.2)", padding: "2px 8px", borderRadius: 4, color: "var(--text-muted)" }}>typeof x === "{sel.name === "null" ? "object" : sel.name === "object" ? "object" : sel.name}"</code>
                  {sel.name === "null" && <span style={{ fontSize: "0.7rem", background: "rgba(239,68,68,0.15)", color: "var(--error)", border: "1px solid rgba(239,68,68,0.3)", padding: "2px 8px", borderRadius: 50 }}>⚠️ Known Bug Since 1995!</span>}
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: 12 }}>{sel.desc}</p>
                <div style={{ marginBottom: 10 }}>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Examples</span>
                  <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {sel.examples.map(ex => (
                      <code key={ex} style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", background: "rgba(0,0,0,0.2)", color: sel.color, padding: "3px 10px", borderRadius: 5 }}>{ex}</code>
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: "0.82rem", color: sel.color, background: sel.color + "12", border: `1px solid ${sel.color}30`, borderRadius: 6, padding: "8px 12px" }}>
                  💡 {sel.notes}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── typeof Detector ────────────────────────────────────────────────────────────

const typeofExamples = [
  { input: '"Hello"', result: "string", color: "#059669" },
  { input: "42", result: "number", color: "#0891b2" },
  { input: "true", result: "boolean", color: "#7c3aed" },
  { input: "null", result: "object", color: "#6366f1", bug: true },
  { input: "undefined", result: "undefined", color: "#64748b" },
  { input: "Symbol('x')", result: "symbol", color: "#d97706" },
  { input: "9007n", result: "bigint", color: "#db2777" },
  { input: "{ a: 1 }", result: "object", color: "#7c3aed" },
  { input: "function(){}", result: "function", color: "#059669" },
  { input: "[1, 2, 3]", result: "object", color: "#7c3aed", bug: false },
];

export function TypeofDetector() {
  const [selected, setSelected] = useState<typeof typeofExamples[0] | null>(null);
  const [scanning, setScanning] = useState(false);

  const scan = (ex: typeof typeofExamples[0]) => {
    setScanning(true);
    setTimeout(() => { setSelected(ex); setScanning(false); }, 700);
  };

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ padding: "14px 20px", background: "var(--bg-surface-2)", borderBottom: "1px solid var(--border)" }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--text)" }}>typeof Detector</span>
        <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 4 }}>Click a value to scan its type with <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>typeof</code></p>
      </div>

      <div style={{ padding: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Values to scan */}
        <div>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Click a value:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {typeofExamples.map(ex => (
              <motion.button
                key={ex.input}
                whileHover={{ x: 4 }}
                onClick={() => scan(ex)}
                style={{
                  background: selected?.input === ex.input ? ex.color + "15" : "var(--bg-surface-2)",
                  border: `1px solid ${selected?.input === ex.input ? ex.color + "60" : "var(--border)"}`,
                  borderRadius: 8,
                  padding: "8px 14px",
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  color: selected?.input === ex.input ? ex.color : "var(--text)",
                  fontSize: "0.82rem",
                  transition: "all 0.2s",
                }}
              >
                {ex.input}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Scanner result */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", width: "100%" }}>
            {/* Machine */}
            <div style={{ position: "relative", marginBottom: 16 }}>
              <div style={{ background: "var(--bg-primary)", border: "2px solid var(--border)", borderRadius: 50, width: 120, height: 120, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "0 auto", position: "relative", overflow: "hidden" }}>
                <motion.div
                  animate={{ opacity: scanning ? [0.4, 1, 0.4] : 1 }}
                  transition={{ duration: 0.5, repeat: scanning ? Infinity : 0 }}
                >
                  <span style={{ fontSize: "2rem" }}>🔬</span>
                </motion.div>
                {scanning && (
                  <motion.div
                    animate={{ top: [0, "100%"] }}
                    transition={{ duration: 0.7 }}
                    style={{ position: "absolute", left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--secondary), transparent)", top: 0 }}
                  />
                )}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginTop: 8 }}>typeof scanner</div>
            </div>

            {/* Result */}
            <AnimatePresence>
              {selected && !scanning && (
                <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 300 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: 6 }}>
                    typeof {selected.input} ===
                  </div>
                  <div style={{
                    background: selected.color + "20",
                    border: `2px solid ${selected.color}`,
                    borderRadius: 10,
                    padding: "12px 16px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: selected.color,
                  }}>
                    "{selected.result}"
                  </div>
                  {selected.bug && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ marginTop: 10, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "8px 12px", fontSize: "0.78rem", color: "var(--error)" }}
                    >
                      ⚠️ Famous JS quirk! <code>typeof null === "object"</code> is a bug from 1995 that can&apos;t be fixed without breaking the web.
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            {!selected && !scanning && (
              <p style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>← Select a value to scan</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
