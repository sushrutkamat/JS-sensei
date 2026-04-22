"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Copy, Check, Trash2, Zap, BookOpen } from "lucide-react";
import Link from "next/link";

// ── Sandboxed Eval Runner ─────────────────────────────────────────────────────

interface ConsoleEntry {
  type: "log" | "error" | "warn" | "info" | "result";
  values: string[];
  timestamp: number;
}

function safeStringify(val: unknown, depth = 0): string {
  if (depth > 3) return "[...]";
  if (val === null) return "null";
  if (val === undefined) return "undefined";
  if (typeof val === "function") return `[Function: ${val.name || "anonymous"}]`;
  if (typeof val === "symbol") return val.toString();
  if (typeof val === "bigint") return val.toString() + "n";
  if (typeof val === "string") return JSON.stringify(val);
  if (typeof val === "number" || typeof val === "boolean") return String(val);
  if (Array.isArray(val)) {
    if (val.length === 0) return "[]";
    const items = val.map(v => safeStringify(v, depth + 1)).join(", ");
    return `[${items}]`;
  }
  if (typeof val === "object") {
    try {
      const keys = Object.keys(val as object).slice(0, 8);
      if (keys.length === 0) return "{}";
      const entries = keys.map(k => `${k}: ${safeStringify((val as Record<string, unknown>)[k], depth + 1)}`);
      return `{ ${entries.join(", ")} }`;
    } catch {
      return "[Object]";
    }
  }
  return String(val);
}

function runCode(code: string): ConsoleEntry[] {
  const entries: ConsoleEntry[] = [];

  const makeLogger = (type: ConsoleEntry["type"]) => (...args: unknown[]) => {
    entries.push({ type, values: args.map(a => safeStringify(a)), timestamp: Date.now() });
  };

  const fakeConsole = {
    log: makeLogger("log"),
    error: makeLogger("error"),
    warn: makeLogger("warn"),
    info: makeLogger("info"),
    table: (data: unknown) => {
      try {
        entries.push({ type: "log", values: [`[Table] ${safeStringify(data)}`], timestamp: Date.now() });
      } catch { entries.push({ type: "log", values: ["[Table]"], timestamp: Date.now() }); }
    },
    clear: () => {},
    count: makeLogger("log"),
    assert: (condition: boolean, ...args: unknown[]) => {
      if (!condition) entries.push({ type: "error", values: ["Assertion failed:", ...args.map(a => safeStringify(a))], timestamp: Date.now() });
    },
    dir: makeLogger("log"),
    trace: makeLogger("log"),
    time: () => {},
    timeEnd: () => {},
    group: makeLogger("log"),
    groupEnd: () => {},
  };

  try {
    // Sandboxed eval — disable dangerous globals
    const sandbox = new Function(
      "console",
      "setTimeout", "setInterval", "clearTimeout", "clearInterval",
      "fetch", "XMLHttpRequest", "WebSocket",
      "document", "window", "navigator", "location",
      `"use strict";
      ${code}
      `
    );
    const result = sandbox(
      fakeConsole,
      undefined, undefined, undefined, undefined, // disable timers
      undefined, undefined, undefined,             // disable network
      undefined, undefined, undefined, undefined   // disable DOM
    );
    if (result !== undefined) {
      entries.push({ type: "result", values: [safeStringify(result)], timestamp: Date.now() });
    }
  } catch (e) {
    entries.push({ type: "error", values: [(e as Error).message], timestamp: Date.now() });
  }

  return entries;
}

// ── Snippet Library ────────────────────────────────────────────────────────────

const snippets = [
  {
    label: "Hello World",
    code: `// Welcome to the JS Playground!
// Click Run or press Ctrl+Enter to execute

console.log("Hello, World!");
console.log("JavaScript is awesome! 🚀");

// Try editing this code and running it again`,
  },
  {
    label: "Variables",
    code: `// Exploring variables and types
const name = "Alice";
const age = 25;
const isLearning = true;

console.log(\`Name: \${name}\`);
console.log(\`Age: \${age}\`);
console.log(\`Is learning: \${isLearning}\`);
console.log(\`Type of name: \${typeof name}\`);
console.log(\`Type of age: \${typeof age}\`);`,
  },
  {
    label: "Array Methods",
    code: `// map, filter, reduce in action
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map: transform each element
const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);

// filter: keep only matching elements
const evens = numbers.filter(n => n % 2 === 0);
console.log("Evens:", evens);

// reduce: accumulate into a single value
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("Sum:", sum);

// chain them together!
const result = numbers
  .filter(n => n % 2 === 0)
  .map(n => n ** 2)
  .reduce((acc, n) => acc + n, 0);
console.log("Sum of squares of evens:", result);`,
  },
  {
    label: "Closures",
    code: `// Closures — functions that remember their outer scope

function makeCounter(start = 0) {
  let count = start;  // This lives in the closure!
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    reset: () => { count = start; return count; },
    value: () => count,
  };
}

const counter = makeCounter(10);
console.log(counter.increment()); // 11
console.log(counter.increment()); // 12
console.log(counter.decrement()); // 11
console.log(counter.value());     // 11

// Each counter has its OWN closure!
const counter2 = makeCounter(100);
console.log(counter2.value());    // 100 — independent!`,
  },
  {
    label: "Promises",
    code: `// Simulating async operations with Promises
function delay(ms) {
  return new Promise(resolve => {
    // Note: setTimeout is disabled in sandbox
    // In a real browser this would be async
    resolve(\`Resolved after \${ms}ms\`);
  });
}

// Promise chain
delay(1000)
  .then(result => {
    console.log("Step 1:", result);
    return "Step 2 result";
  })
  .then(result => {
    console.log("Step 2:", result);
    return Promise.resolve("Step 3 result");
  })
  .then(result => {
    console.log("Step 3:", result);
  })
  .catch(err => console.error("Error:", err));

console.log("This runs first (sync code)!");`,
  },
  {
    label: "Recursion",
    code: `// Recursion — functions calling themselves
function factorial(n) {
  if (n <= 1) return 1;           // Base case
  return n * factorial(n - 1);   // Recursive case
}

console.log("5! =", factorial(5));   // 120
console.log("10! =", factorial(10)); // 3628800

// Fibonacci with memoization (closure)
function makeFib() {
  const cache = {};
  return function fib(n) {
    if (n in cache) return cache[n];
    if (n <= 1) return n;
    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
  };
}

const fib = makeFib();
console.log("Fib 10:", fib(10));  // 55
console.log("Fib 20:", fib(20));  // 6765`,
  },
];

// ── Simple Code Editor ────────────────────────────────────────────────────────

function SimpleEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newVal = value.substring(0, start) + "  " + value.substring(end);
      onChange(newVal);
      setTimeout(() => {
        textareaRef.current!.selectionStart = start + 2;
        textareaRef.current!.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div style={{ position: "relative", height: "100%", fontFamily: "var(--font-mono)" }}>
      {/* Line numbers */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 44,
          background: "rgba(0,0,0,0.15)",
          padding: "16px 0",
          overflowY: "hidden",
          userSelect: "none",
          borderRight: "1px solid var(--border)",
          pointerEvents: "none",
        }}
      >
        {value.split("\n").map((_, i) => (
          <div key={i} style={{ height: "1.6em", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", color: "var(--text-muted)", opacity: 0.4, paddingRight: 4 }}>
            {i + 1}
          </div>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
          border: "none",
          outline: "none",
          resize: "none",
          color: "var(--text)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.875rem",
          lineHeight: "1.6em",
          padding: "16px 16px 16px 56px",
          caretColor: "var(--primary)",
        }}
      />
    </div>
  );
}

// ── Playground Main ───────────────────────────────────────────────────────────

export function PlaygroundContent() {
  const [code, setCode] = useState(snippets[0].code);
  const [output, setOutput] = useState<ConsoleEntry[]>([]);
  const [hasRun, setHasRun] = useState(false);
  const [copied, setCopied] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const run = useCallback(() => {
    const entries = runCode(code);
    setOutput(entries);
    setHasRun(true);
    setTimeout(() => outputRef.current?.scrollTo({ top: 999999, behavior: "smooth" }), 100);
  }, [code]);

  // Ctrl+Enter to run
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") run();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [run]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const typeColors: Record<ConsoleEntry["type"], { color: string; prefix: string }> = {
    log: { color: "var(--text)", prefix: "" },
    error: { color: "var(--error)", prefix: "✖ " },
    warn: { color: "var(--accent)", prefix: "⚠ " },
    info: { color: "var(--secondary)", prefix: "ℹ " },
    result: { color: "var(--primary)", prefix: "← " },
  };

  return (
    <div style={{ paddingTop: 64, height: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-primary)" }}>
      {/* Header */}
      <div style={{ padding: "12px 20px", borderBottom: "1px solid var(--border)", background: "var(--bg-surface)", display: "flex", alignItems: "center", gap: 12, flexShrink: 0, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, var(--primary), var(--secondary))", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={16} color="white" />
          </div>
          <div>
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "var(--text)" }}>JS Playground</h1>
            <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Sandboxed execution · Ctrl+Enter to run</p>
          </div>
        </div>

        {/* Snippets */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {snippets.map(s => (
            <button
              key={s.label}
              onClick={() => { setCode(s.code); setOutput([]); setHasRun(false); }}
              style={{
                padding: "4px 10px",
                borderRadius: 6,
                background: code === s.code ? "rgba(139,92,246,0.15)" : "var(--bg-surface-2)",
                border: `1px solid ${code === s.code ? "rgba(139,92,246,0.4)" : "var(--border)"}`,
                color: code === s.code ? "var(--primary)" : "var(--text-muted)",
                fontSize: "0.75rem",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontWeight: code === s.code ? 600 : 400,
                transition: "all 0.15s",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 7, background: "var(--bg-surface-2)", border: "1px solid var(--border)", color: "var(--text-muted)", textDecoration: "none", fontSize: "0.8rem", transition: "all 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
          >
            <BookOpen size={13} /> Back to Modules
          </Link>
          <button onClick={handleCopy} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 7, background: "var(--bg-surface-2)", border: "1px solid var(--border)", color: copied ? "var(--success)" : "var(--text-muted)", cursor: "pointer", fontSize: "0.8rem", fontFamily: "var(--font-body)", transition: "color 0.2s" }}>
            {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
          </button>
          <button onClick={() => { setCode("// Write your JavaScript here...\n\n"); setOutput([]); setHasRun(false); }} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 10px", borderRadius: 7, background: "var(--bg-surface-2)", border: "1px solid var(--border)", color: "var(--text-muted)", cursor: "pointer", fontSize: "0.8rem" }}>
            <Trash2 size={12} />
          </button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={run}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 20px", borderRadius: 8, background: "linear-gradient(135deg, var(--primary), hsl(265,90%,50%))", border: "none", color: "white", cursor: "pointer", fontSize: "0.875rem", fontWeight: 700, fontFamily: "var(--font-body)", boxShadow: "0 4px 15px rgba(139,92,246,0.3)" }}
          >
            <Play size={14} fill="currentColor" /> Run
          </motion.button>
        </div>
      </div>

      {/* Editor + Output */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
        {/* Editor */}
        <div style={{ borderRight: "1px solid var(--border)", overflow: "hidden", background: "hsl(230, 22%, 9%)" }}>
          <div style={{ padding: "8px 16px", background: "var(--bg-surface-2)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", gap: 5 }}>
              {["#ef4444", "#f59e0b", "#22c55e"].map((c, i) => (
                <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
              ))}
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)" }}>playground.js</span>
          </div>
          <div style={{ height: "calc(100% - 36px)", overflow: "auto" }}>
            <SimpleEditor value={code} onChange={setCode} />
          </div>
        </div>

        {/* Output */}
        <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "8px 16px", background: "var(--bg-surface-2)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)" }}>Console Output</span>
              {output.length > 0 && (
                <span style={{ background: "rgba(139,92,246,0.15)", color: "var(--primary)", fontSize: "0.65rem", fontFamily: "var(--font-mono)", padding: "1px 7px", borderRadius: 50, fontWeight: 700 }}>
                  {output.length}
                </span>
              )}
            </div>
            {output.length > 0 && (
              <button onClick={() => setOutput([])} style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "0.72rem", fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 4 }}>
                <RotateCcw size={10} /> Clear
              </button>
            )}
          </div>

          <div
            ref={outputRef}
            style={{ flex: 1, overflowY: "auto", padding: 16, fontFamily: "var(--font-mono)", fontSize: "0.85rem", lineHeight: 1.7 }}
          >
            <AnimatePresence>
              {!hasRun && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 12, color: "var(--text-muted)", opacity: 0.4 }}>
                  <span style={{ fontSize: "2.5rem" }}>▶</span>
                  <span style={{ fontSize: "0.875rem" }}>Press Run or Ctrl+Enter</span>
                </motion.div>
              )}
            </AnimatePresence>

            {output.map((entry, i) => {
              const { color, prefix } = typeColors[entry.type];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  style={{ color, marginBottom: 4, display: "flex", alignItems: "flex-start", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.03)", paddingBottom: 4 }}
                >
                  <span style={{ opacity: 0.4, minWidth: 16, fontSize: "0.75rem", marginTop: 2 }}>{prefix || "›"}</span>
                  <span style={{ wordBreak: "break-all" }}>{entry.values.join(" ")}</span>
                </motion.div>
              );
            })}

            {hasRun && output.length === 0 && (
              <div style={{ color: "var(--text-muted)", opacity: 0.5, fontSize: "0.8rem" }}>
                // No output (code ran successfully, but no console.log calls)
              </div>
            )}
          </div>

          {/* Security notice */}
          <div style={{ padding: "8px 16px", background: "var(--bg-surface)", borderTop: "1px solid var(--border)", fontSize: "0.7rem", color: "var(--text-muted)", opacity: 0.5 }}>
            🔒 Sandboxed — setTimeout, fetch, DOM, window are disabled for security
          </div>
        </div>
      </div>
    </div>
  );
}
