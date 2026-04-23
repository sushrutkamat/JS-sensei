"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── String Method Explorer ─────────────────────────────────────────────────────

const stringMethods = [
  { name: ".length", category: "property", desc: "Number of characters", fn: (s: string) => String(s.length), args: false, argLabel: "" },
  { name: ".toUpperCase()", category: "case", desc: "Convert to ALL CAPS", fn: (s: string) => s.toUpperCase(), args: false, argLabel: "" },
  { name: ".toLowerCase()", category: "case", desc: "Convert to all lowercase", fn: (s: string) => s.toLowerCase(), args: false, argLabel: "" },
  { name: ".trim()", category: "whitespace", desc: "Remove leading & trailing spaces", fn: (s: string) => s.trim(), args: false, argLabel: "" },
  { name: ".includes(arg)", category: "search", desc: "Check if string contains arg", fn: (s: string, a: string) => String(s.includes(a)), args: true, argLabel: "Search for" },
  { name: ".startsWith(arg)", category: "search", desc: "Check if string starts with arg", fn: (s: string, a: string) => String(s.startsWith(a)), args: true, argLabel: "Starts with" },
  { name: ".endsWith(arg)", category: "search", desc: "Check if string ends with arg", fn: (s: string, a: string) => String(s.endsWith(a)), args: true, argLabel: "Ends with" },
  { name: ".indexOf(arg)", category: "search", desc: "Find position of arg (or -1)", fn: (s: string, a: string) => String(s.indexOf(a)), args: true, argLabel: "Find" },
  { name: ".slice(0, n)", category: "extract", desc: "Extract first n characters", fn: (s: string, a: string) => s.slice(0, parseInt(a) || 0), args: true, argLabel: "n (end index)" },
  { name: ".replace(arg, '★')", category: "transform", desc: "Replace first match of arg", fn: (s: string, a: string) => s.replace(a || "", "★"), args: true, argLabel: "Replace" },
  { name: ".split(arg)", category: "transform", desc: "Split string into array", fn: (s: string, a: string) => JSON.stringify(a !== "" ? s.split(a) : s.split("")), args: true, argLabel: "Delimiter" },
  { name: ".repeat(n)", category: "transform", desc: "Repeat string n times", fn: (s: string, a: string) => s.repeat(Math.min(parseInt(a) || 0, 6)), args: true, argLabel: "n (times)" },
  { name: ".padStart(n, '*')", category: "transform", desc: "Pad start to total length n", fn: (s: string, a: string) => s.padStart(parseInt(a) || s.length, "*"), args: true, argLabel: "Total length" },
];

const categoryColors: Record<string, string> = {
  property: "#7c3aed",
  case: "#0891b2",
  whitespace: "#d97706",
  search: "#059669",
  extract: "#db2777",
  transform: "#6366f1",
};

export function StringMethodExplorer() {
  const [input, setInput] = useState("Hello, World!");
  const [arg, setArg] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);

  const method = stringMethods[selectedIdx];
  let result = "";
  try {
    result = method.fn(input, arg);
  } catch {
    result = "Error";
  }

  const isBoolean = result === "true" || result === "false";
  const resultColor = isBoolean
    ? result === "true" ? "var(--success)" : "var(--error)"
    : "var(--secondary)";

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "14px 20px", background: "var(--bg-surface-2)", borderBottom: "1px solid var(--border)" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>
          📝 String Method Explorer
        </p>
        <p style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
          Type a string, pick a method, watch the result update live.
        </p>
      </div>

      {/* Method tabs */}
      <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", display: "flex", gap: 6, flexWrap: "wrap" }}>
        {stringMethods.map((m, i) => (
          <button
            key={m.name}
            onClick={() => { setSelectedIdx(i); setArg(""); }}
            style={{
              padding: "4px 10px",
              borderRadius: 6,
              background: selectedIdx === i ? categoryColors[m.category] + "22" : "var(--bg-surface-2)",
              border: `1px solid ${selectedIdx === i ? categoryColors[m.category] : "var(--border)"}`,
              color: selectedIdx === i ? categoryColors[m.category] : "var(--text-muted)",
              fontSize: "0.72rem",
              fontFamily: "var(--font-mono)",
              fontWeight: selectedIdx === i ? 700 : 400,
              cursor: "pointer",
              transition: "all 0.15s",
              whiteSpace: "nowrap",
            }}
          >
            {m.name}
          </button>
        ))}
      </div>

      {/* Inputs and result */}
      <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Method description */}
        <div style={{ background: categoryColors[method.category] + "12", border: `1px solid ${categoryColors[method.category]}40`, borderRadius: 10, padding: "10px 14px" }}>
          <code style={{ fontFamily: "var(--font-mono)", color: categoryColors[method.category], fontWeight: 700, fontSize: "0.9rem" }}>
            str{method.name}
          </code>
          <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginTop: 4 }}>{method.desc}</p>
        </div>

        {/* Inputs row */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
          <div style={{ flex: 2, minWidth: 180 }}>
            <label style={{ display: "block", fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Input string
            </label>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              style={{ width: "100%", background: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 12px", color: "var(--text)", fontFamily: "var(--font-mono)", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          {method.args && (
            <div style={{ flex: 1, minWidth: 120 }}>
              <label style={{ display: "block", fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {method.argLabel}
              </label>
              <input
                value={arg}
                onChange={e => setArg(e.target.value)}
                placeholder="type here..."
                style={{ width: "100%", background: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 12px", color: "var(--text)", fontFamily: "var(--font-mono)", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }}
              />
            </div>
          )}
        </div>

        {/* Result */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: "var(--text-muted)", background: "var(--bg-surface-2)", borderRadius: 8, padding: "8px 14px", flexShrink: 0 }}>
            <span style={{ color: "var(--primary)" }}>str</span>
            <span style={{ opacity: 0.6 }}>{method.name}</span>
          </div>
          <span style={{ color: "var(--text-muted)", fontSize: "1.2rem" }}>→</span>
          <AnimatePresence mode="wait">
            <motion.div
              key={result}
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              style={{ background: "var(--bg-primary)", border: `2px solid ${resultColor}`, borderRadius: 10, padding: "10px 18px", fontFamily: "var(--font-mono)", fontSize: "1rem", fontWeight: 700, color: resultColor, maxWidth: 320, wordBreak: "break-all" }}
            >
              {result}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Code preview */}
        <div style={{ background: "var(--bg-primary)", borderRadius: 10, padding: "10px 16px", fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
          <span style={{ color: "var(--text-muted)", opacity: 0.6 }}>{"// "}</span>
          <span style={{ color: "var(--secondary)" }}>&quot;{input}&quot;</span>
          <span style={{ color: "var(--primary)" }}>{method.name.replace("(arg)", method.args ? `("${arg}")` : "()")}</span>
          <span style={{ color: "var(--text-muted)" }}> → </span>
          <span style={{ color: resultColor }}>{result}</span>
        </div>
      </div>
    </div>
  );
}

// ── Number Lab ─────────────────────────────────────────────────────────────────

const numberOps = [
  { name: "Math.round(n)", desc: "Round to nearest integer", fn: (n: number) => String(Math.round(n)) },
  { name: "Math.floor(n)", desc: "Round DOWN always", fn: (n: number) => String(Math.floor(n)) },
  { name: "Math.ceil(n)", desc: "Round UP always", fn: (n: number) => String(Math.ceil(n)) },
  { name: "Math.trunc(n)", desc: "Remove decimal part (no rounding)", fn: (n: number) => String(Math.trunc(n)) },
  { name: "Math.abs(n)", desc: "Absolute value (remove negative)", fn: (n: number) => String(Math.abs(n)) },
  { name: "Math.sqrt(n)", desc: "Square root", fn: (n: number) => String(Math.sqrt(n)) },
  { name: "n.toFixed(2)", desc: "Format to 2 decimal places (returns string)", fn: (n: number) => n.toFixed(2) },
  { name: "Number.isInteger(n)", desc: "Is n a whole number?", fn: (n: number) => String(Number.isInteger(n)) },
  { name: "Number.isFinite(n)", desc: "Is n a finite number?", fn: (n: number) => String(Number.isFinite(n)) },
  { name: "Number.isNaN(n)", desc: "Is n exactly NaN?", fn: (n: number) => String(Number.isNaN(n)) },
  { name: "parseInt(n)", desc: "Parse as integer (floor toward 0)", fn: (n: number) => String(parseInt(String(n))) },
  { name: "parseFloat(n)", desc: "Parse as float", fn: (n: number) => String(parseFloat(String(n))) },
];

export function NumberLab() {
  const [input, setInput] = useState("4.75");
  const [selectedIdx, setSelectedIdx] = useState(0);

  const op = numberOps[selectedIdx];
  const num = parseFloat(input);
  let result = "";
  try {
    result = isNaN(num) ? "NaN (invalid input)" : op.fn(num);
  } catch {
    result = "Error";
  }

  const isBoolean = result === "true" || result === "false";
  const resultColor = isBoolean
    ? result === "true" ? "var(--success)" : "var(--error)"
    : "var(--secondary)";

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ padding: "14px 20px", background: "var(--bg-surface-2)", borderBottom: "1px solid var(--border)" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>🔢 Number Lab</p>
        <p style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>Type a number and pick a Math operation to see the transformation.</p>
      </div>

      {/* Operations grid */}
      <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", display: "flex", gap: 6, flexWrap: "wrap" }}>
        {numberOps.map((op, i) => (
          <button
            key={op.name}
            onClick={() => setSelectedIdx(i)}
            style={{
              padding: "4px 10px",
              borderRadius: 6,
              background: selectedIdx === i ? "rgba(8,145,178,0.15)" : "var(--bg-surface-2)",
              border: `1px solid ${selectedIdx === i ? "var(--secondary)" : "var(--border)"}`,
              color: selectedIdx === i ? "var(--secondary)" : "var(--text-muted)",
              fontSize: "0.72rem",
              fontFamily: "var(--font-mono)",
              fontWeight: selectedIdx === i ? 700 : 400,
              cursor: "pointer",
              transition: "all 0.15s",
              whiteSpace: "nowrap",
            }}
          >
            {op.name}
          </button>
        ))}
      </div>

      <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Description */}
        <div style={{ background: "rgba(8,145,178,0.08)", border: "1px solid rgba(8,145,178,0.25)", borderRadius: 10, padding: "10px 14px" }}>
          <code style={{ fontFamily: "var(--font-mono)", color: "var(--secondary)", fontWeight: 700, fontSize: "0.9rem" }}>{op.name}</code>
          <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginTop: 4 }}>{op.desc}</p>
        </div>

        {/* Number input */}
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Your number
            </label>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              style={{ width: 140, background: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 12px", color: "var(--text)", fontFamily: "var(--font-mono)", fontSize: "1.1rem", fontWeight: 700, outline: "none", textAlign: "center" }}
            />
          </div>

          <span style={{ color: "var(--text-muted)", fontSize: "1.4rem", marginTop: 20 }}>→</span>

          <div>
            <label style={{ display: "block", fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Result
            </label>
            <AnimatePresence mode="wait">
              <motion.div
                key={result + selectedIdx}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                style={{ background: "var(--bg-primary)", border: `2px solid ${resultColor}`, borderRadius: 10, padding: "10px 24px", fontFamily: "var(--font-mono)", fontSize: "1.1rem", fontWeight: 700, color: resultColor, minWidth: 100, textAlign: "center" }}
              >
                {result}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Special case callout for 0.1+0.2 */}
        <div style={{ background: "rgba(251,191,36,0.07)", border: "1px solid rgba(251,191,36,0.25)", borderRadius: 10, padding: "12px 14px", fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
          💡 <strong style={{ color: "var(--accent)" }}>Famous quirk:</strong> Try <code style={{ fontFamily: "var(--font-mono)" }}>0.1 + 0.2</code> in your browser console — you get <code style={{ fontFamily: "var(--font-mono)" }}>0.30000000000000004</code> due to IEEE 754 floating point. Use <code style={{ fontFamily: "var(--font-mono)" }}>.toFixed(2)</code> when displaying currency or precise decimals.
        </div>
      </div>
    </div>
  );
}

// ── Truthy/Falsy Tester ────────────────────────────────────────────────────────

const presetValues = [
  { label: "0", val: 0, note: "Zero is falsy" },
  { label: '""', val: "", note: "Empty string is falsy" },
  { label: "false", val: false, note: "false is falsy" },
  { label: "null", val: null, note: "null is falsy" },
  { label: "undefined", val: undefined, note: "undefined is falsy" },
  { label: "NaN", val: NaN, note: "NaN is falsy" },
  { label: "1", val: 1, note: "Non-zero number is truthy" },
  { label: '"0"', val: "0", note: '"0" is truthy! (non-empty string)' },
  { label: "[]", val: [], note: "Empty array is truthy! (surprise!)" },
  { label: "{}", val: {}, note: "Empty object is truthy! (surprise!)" },
  { label: '"-1"', val: "-1", note: "Any non-empty string is truthy" },
  { label: "Infinity", val: Infinity, note: "Infinity is truthy" },
];

export function TruthyFalsyTester() {
  const [selected, setSelected] = useState<number | null>(null);

  const preset = selected !== null ? presetValues[selected] : null;
  const isTruthy = preset !== null ? !!preset.val : null;

  const FALSY_VALUES = ["false", "0", '""', "null", "undefined", "NaN"];

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ padding: "14px 20px", background: "var(--bg-surface-2)", borderBottom: "1px solid var(--border)" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>✅ Truthy / Falsy Tester</p>
        <p style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>Click any value to discover whether JavaScript treats it as truthy or falsy.</p>
      </div>

      <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Value chips */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {presetValues.map((pv, i) => {
            const isFalsy = FALSY_VALUES.includes(pv.label);
            return (
              <motion.button
                key={pv.label}
                onClick={() => setSelected(i)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  padding: "8px 14px",
                  borderRadius: 8,
                  background: selected === i
                    ? isFalsy ? "rgba(239,68,68,0.15)" : "rgba(52,211,153,0.15)"
                    : "var(--bg-surface-2)",
                  border: `1px solid ${selected === i
                    ? isFalsy ? "var(--error)" : "var(--success)"
                    : "var(--border)"}`,
                  color: selected === i
                    ? isFalsy ? "var(--error)" : "var(--success)"
                    : "var(--text)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {pv.label}
              </motion.button>
            );
          })}
        </div>

        {/* Verdict */}
        <AnimatePresence mode="wait">
          {preset !== null && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              style={{
                background: isTruthy ? "rgba(52,211,153,0.08)" : "rgba(239,68,68,0.08)",
                border: `2px solid ${isTruthy ? "var(--success)" : "var(--error)"}`,
                borderRadius: 14,
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div style={{ fontSize: "3rem", lineHeight: 1 }}>
                {isTruthy ? "✅" : "❌"}
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", fontWeight: 800, color: isTruthy ? "var(--success)" : "var(--error)", marginBottom: 4 }}>
                  <code>{preset.label}</code> is <strong>{isTruthy ? "TRUTHY" : "FALSY"}</strong>
                </div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{preset.note}</div>
                <div style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)", fontSize: "0.82rem", marginTop: 8 }}>
                  <code style={{ color: "var(--primary)" }}>if</code> ({preset.label}) {"{"} <span style={{ color: isTruthy ? "var(--success)" : "var(--error)" }}>{isTruthy ? "// runs ✓" : "// skipped ✕"}</span> {"}"}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!preset && (
          <div style={{ textAlign: "center", color: "var(--text-muted)", padding: "24px 0", opacity: 0.5, fontSize: "0.9rem" }}>
            👆 Click a value above to test it
          </div>
        )}

        {/* Falsy values reminder */}
        <div style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 12, padding: "14px 18px" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--primary)", fontSize: "0.88rem", marginBottom: 10 }}>
            📋 The 6 Falsy Values — Memorize These
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {FALSY_VALUES.map(v => (
              <code key={v} style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", background: "rgba(239,68,68,0.1)", color: "var(--error)", border: "1px solid rgba(239,68,68,0.3)", padding: "3px 10px", borderRadius: 6 }}>
                {v}
              </code>
            ))}
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginTop: 10, lineHeight: 1.6 }}>
            Everything else is <strong style={{ color: "var(--success)" }}>truthy</strong> — including <code style={{ fontFamily: "var(--font-mono)" }}>[]</code>, <code style={{ fontFamily: "var(--font-mono)" }}>{"{}"}</code>, <code style={{ fontFamily: "var(--font-mono)" }}>&quot;0&quot;</code>, and <code style={{ fontFamily: "var(--font-mono)" }}>-1</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
