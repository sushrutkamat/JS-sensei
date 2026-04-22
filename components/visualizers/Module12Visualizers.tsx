"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Try/Catch Flow Visualizer ─────────────────────────────────────────────────

export function TryCatchVisualizer() {
  const [scenario, setScenario] = useState<"success" | "error" | "rethrow">("success");
  const [step, setStep] = useState(0);

  const scenarios = {
    success: {
      label: "✅ Success path",
      color: "var(--success)",
      steps: [
        { block: "try", text: "Code inside try block starts running.", highlight: "try" },
        { block: "try", text: "JSON.parse() succeeds — the string is valid JSON.", highlight: "try" },
        { block: "try", text: "We print the result. Everything worked perfectly!", highlight: "try" },
        { block: "finally", text: "finally runs even on success. Perfect for cleanup (close connections, hide loaders).", highlight: "finally" },
      ],
      code: `try {\n  const data = JSON.parse('{"name":"Alice"}');\n  console.log(data.name); // "Alice"\n} catch (err) {\n  // NOT reached — no error!\n} finally {\n  console.log("Done!"); // Always runs\n}`,
    },
    error: {
      label: "❌ Error path",
      color: "var(--error)",
      steps: [
        { block: "try", text: "try block starts running normally.", highlight: "try" },
        { block: "try", text: "JSON.parse() throws a SyntaxError — the string is not valid JSON!", highlight: "try" },
        { block: "catch", text: "Execution jumps to catch immediately. The rest of try is skipped.", highlight: "catch" },
        { block: "catch", text: "err.message tells us what went wrong. We handle it gracefully — no crash!", highlight: "catch" },
        { block: "finally", text: "finally still runs — whether it succeeded or failed.", highlight: "finally" },
      ],
      code: `try {\n  const data = JSON.parse('invalid json!!!');\n  // ↑ This throws SyntaxError\n} catch (err) {\n  // We land here with err.message explaining what happened\n  console.log("Error:", err.message);\n} finally {\n  console.log("Done!"); // Runs either way\n}`,
    },
    rethrow: {
      label: "🔄 Re-throw pattern",
      color: "var(--accent)",
      steps: [
        { block: "try", text: "async function tries to fetch user data from an API.", highlight: "try" },
        { block: "try", text: "If the network is down, fetch() throws a network error. We jump to catch.", highlight: "catch" },
        { block: "catch", text: "We check: is this a network error? Yes → show a friendly UI message.", highlight: "catch" },
        { block: "catch", text: "Is it something unexpected? Then re-throw it — don't silently swallow it!", highlight: "catch" },
        { block: "finally", text: "Always hide the loading spinner, whatever happened.", highlight: "finally" },
      ],
      code: `async function loadUser(id) {\n  try {\n    const res = await fetch(\`/api/user/\${id}\`);\n    if (!res.ok) throw new Error(\`Status: \${res.status}\`);\n    return await res.json();\n  } catch (err) {\n    if (err.message.includes('Failed to fetch')) {\n      showToast("No internet connection");\n    } else {\n      throw err; // Re-throw unexpected errors!\n    }\n  } finally {\n    hideSpinner(); // Always clean up\n  }\n}`,
    },
  };

  const s = scenarios[scenario];
  const currentStep = s.steps[step];
  const totalSteps = s.steps.length;

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ padding: "12px 16px", background: "var(--bg-surface-2)", borderBottom: "1px solid var(--border)", display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)", flex: 1 }}>🛡️ try/catch/finally Flow</span>
        {(Object.keys(scenarios) as (keyof typeof scenarios)[]).map(k => (
          <button key={k} onClick={() => { setScenario(k); setStep(0); }}
            style={{ padding: "4px 12px", borderRadius: 6, background: scenario === k ? "rgba(139,92,246,0.2)" : "var(--bg-surface)", border: `1px solid ${scenario === k ? "var(--primary)" : "var(--border)"}`, color: scenario === k ? "var(--primary)" : "var(--text-muted)", fontSize: "0.72rem", cursor: "pointer", fontWeight: 600 }}>
            {scenarios[k].label}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 300 }}>
        {/* Code */}
        <div style={{ padding: 16, borderRight: "1px solid var(--border)" }}>
          <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase" }}>code</p>
          <pre style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", lineHeight: 1.8, color: "var(--text-muted)", margin: 0, whiteSpace: "pre-wrap" }}>
            {s.code.split("\n").map((line, i) => {
              const blockMap: Record<string, string[]> = {
                try: s.code.split("\n").filter(l => !l.includes("} catch") && !l.includes("} finally") && !l.includes("catch") && !l.includes("finally")),
              };
              const inTry = line.startsWith("  ") && !line.includes("catch") && !line.includes("finally");
              const inCatch = line.includes("catch") || (line.startsWith("  ") && s.code.split("\n").indexOf(line) > s.code.split("\n").findIndex(l => l.includes("catch")) && s.code.split("\n").indexOf(line) < (s.code.split("\n").findIndex(l => l.includes("finally")) > -1 ? s.code.split("\n").findIndex(l => l.includes("finally")) : 999));
              const inFinally = line.includes("finally") || (i > s.code.split("\n").findIndex(l => l.includes("finally")));
              void blockMap; void inTry;

              const blockKey = line.includes("try") && !line.includes("catch") ? "try" : line.includes("catch") ? "catch" : line.includes("finally") ? "finally" : null;
              const highlighted = (currentStep?.highlight === "try" && !inCatch && !inFinally) ||
                (currentStep?.highlight === "catch" && inCatch) ||
                (currentStep?.highlight === "finally" && inFinally);

              return (
                <div key={i} style={{ background: highlighted ? s.color + "15" : "transparent", borderLeft: blockKey ? `3px solid ${s.color}60` : "3px solid transparent", paddingLeft: 6, color: highlighted ? s.color : "var(--text-muted)", transition: "all 0.3s" }}>
                  {line || " "}
                </div>
              );
            })}
          </pre>
        </div>

        {/* Step walkthrough */}
        <div style={{ padding: 16, display: "flex", flexDirection: "column" }}>
          <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase" }}>what&apos;s happening</p>

          {/* Block badge */}
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", fontWeight: 700, color: s.color, background: s.color + "15", border: `1px solid ${s.color}40`, borderRadius: 6, padding: "4px 12px" }}>
              {currentStep?.block} block
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.p key={step} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              style={{ color: "var(--text)", fontSize: "0.9rem", lineHeight: 1.7, flex: 1 }}>
              {currentStep?.text}
            </motion.p>
          </AnimatePresence>

          {/* Navigation */}
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 16 }}>
            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
              style={{ background: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: 7, padding: "6px 12px", cursor: step === 0 ? "not-allowed" : "pointer", color: "var(--text-muted)", opacity: step === 0 ? 0.4 : 1, fontSize: "0.8rem" }}>
              ← Prev
            </button>
            <div style={{ flex: 1, height: 3, background: "var(--bg-primary)", borderRadius: 50, overflow: "hidden" }}>
              <motion.div animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                style={{ height: "100%", background: s.color, borderRadius: 50 }} transition={{ duration: 0.3 }} />
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)" }}>{step + 1}/{totalSteps}</span>
            <button onClick={() => setStep(s => Math.min(totalSteps - 1, s + 1))} disabled={step >= totalSteps - 1}
              style={{ background: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: 7, padding: "6px 12px", cursor: step >= totalSteps - 1 ? "not-allowed" : "pointer", color: "var(--text-muted)", opacity: step >= totalSteps - 1 ? 0.4 : 1, fontSize: "0.8rem" }}>
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Error Types Explorer ──────────────────────────────────────────────────────

export function ErrorTypesExplorer() {
  const [active, setActive] = useState(0);

  const errors = [
    {
      name: "SyntaxError",
      icon: "📝",
      color: "#dc2626",
      when: "You wrote code that JavaScript can't parse — like a missing bracket or a typo in a keyword.",
      example: `// JavaScript can't even run your file:\nconst x = {    // ← missing closing }\nconsole.log(x); // never reached`,
      tip: "These show up before your code even runs. Check the line number in the browser console — it's usually exactly where the problem is.",
    },
    {
      name: "ReferenceError",
      icon: "🔍",
      color: "#d97706",
      when: "You tried to use a variable that doesn't exist in the current scope.",
      example: `console.log(myVar); // ReferenceError!\n// myVar was never declared\n\n// Also happens with typos:\nconst message = "hello";\nconsole.log(mesage); // 'mesage' doesn't exist!`,
      tip: "Check for typos first. Then check scope — did you declare the variable in a different function or block?",
    },
    {
      name: "TypeError",
      icon: "🔧",
      color: "#7c3aed",
      when: "You used a value in a way incompatible with its type — like calling a non-function, or accessing a property on null/undefined.",
      example: `null.toString(); // Cannot read properties of null\n\nconst user = null;\nuser.name; // TypeError!\n\n// Or calling something that isn't a function:\nconst x = 42;\nx(); // TypeError: x is not a function`,
      tip: "The most common cause is undefined from a failed API call or missing data. Always check if data exists before accessing nested properties.",
    },
    {
      name: "RangeError",
      icon: "📏",
      color: "#0891b2",
      when: "A value is outside the allowed range — like creating an array with a negative length, or causing infinite recursion.",
      example: `new Array(-1); // Invalid array length\n\nnew Array(1e10); // Too large — RangeError\n\n// Infinite recursion:\nfunction boom() { return boom(); }\nboom(); // Maximum call stack size exceeded`,
      tip: "For 'Maximum call stack size exceeded', you have a function recursing infinitely — find where it's calling itself without a base case.",
    },
    {
      name: "Custom Error",
      icon: "🎯",
      color: "#059669",
      when: "You deliberately threw your own error to signal a specific problem in your application logic.",
      example: `class ValidationError extends Error {\n  constructor(field, message) {\n    super(message);         // standard Error message\n    this.name = 'ValidationError';\n    this.field = field;     // your custom property!\n  }\n}\n\nthrow new ValidationError('email', 'Invalid email format');\n\n// Later:\ncatch (err) {\n  if (err instanceof ValidationError) {\n    highlightField(err.field);\n  }\n}`,
      tip: "Custom errors let you distinguish between 'something went wrong' (generic Error) and 'this specific domain problem occurred' (your custom Error). Much easier to handle correctly.",
    },
  ];

  const e = errors[active];

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ padding: "12px 16px", background: "var(--bg-surface-2)", borderBottom: "1px solid var(--border)", display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)", flex: 1 }}>🚨 JavaScript Error Types</span>
        {errors.map((err, i) => (
          <button key={err.name} onClick={() => setActive(i)}
            style={{ padding: "4px 10px", borderRadius: 6, background: active === i ? err.color + "20" : "var(--bg-surface)", border: `1px solid ${active === i ? err.color : "var(--border)"}`, color: active === i ? err.color : "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.68rem", cursor: "pointer", fontWeight: 700 }}>
            {err.icon} {err.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ padding: 20 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: "1.8rem" }}>{e.icon}</span>
            <h3 style={{ fontFamily: "var(--font-mono)", fontWeight: 800, color: e.color, fontSize: "1.2rem" }}>{e.name}</h3>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: 14 }}><strong style={{ color: "var(--text)" }}>When it happens:</strong> {e.when}</p>
          <pre style={{ background: "var(--bg-primary)", borderRadius: 10, padding: "14px 18px", fontFamily: "var(--font-mono)", fontSize: "0.78rem", lineHeight: 1.8, color: "var(--text-muted)", overflowX: "auto", whiteSpace: "pre-wrap", margin: "0 0 14px" }}>
            {e.example}
          </pre>
          <div style={{ background: e.color + "10", border: `1px solid ${e.color}40`, borderRadius: 10, padding: "12px 14px", fontSize: "0.82rem", color: "var(--text)", lineHeight: 1.7 }}>
            💡 <strong>Fix it:</strong> {e.tip}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
