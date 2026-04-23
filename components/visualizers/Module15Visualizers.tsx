"use client";

import { useState, useCallback } from "react";

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface SmellResult {
  line: number;
  ruleId: string;
  label: string;
  practice: string;
  severity: "error" | "warning" | "info";
  snippet: string;
}

interface Challenge {
  id: number;
  category: string;
  title: string;
  smellCode: string;
  options: { code: string; correct: boolean; explanation: string }[];
}

// ─── SMELL RULES ─────────────────────────────────────────────────────────────

const SMELL_RULES = [
  {
    id: "no-var",
    regex: /\bvar\s+/,
    label: "Avoid var — use const or let",
    practice: "Practice #6: Use const by default, let when needed",
    severity: "error" as const,
  },
  {
    id: "loose-eq",
    regex: /[^=!<>]==[^=]|[^=!]!=[^=]/,
    label: "Loose equality — use === or !==",
    practice: "Practice #23: Use strict equality (===)",
    severity: "error" as const,
  },
  {
    id: "console-log",
    regex: /console\.log\(/,
    label: "console.log — remove before shipping to production",
    practice: "Practice #26: Use a linter and formatter",
    severity: "warning" as const,
  },
  {
    id: "anon-func",
    regex: /function\s*\(/,
    label: "Anonymous function — consider giving it a descriptive name",
    practice: "Practice #1: Use descriptive names",
    severity: "info" as const,
  },
  {
    id: "throw-string",
    regex: /throw\s+['"]/,
    label: "Throwing a string — use throw new Error('message') instead",
    practice: "Practice #15: Throw descriptive Error instances",
    severity: "error" as const,
  },
  {
    id: "then-chain",
    regex: /\.then\(/,
    label: ".then() detected — consider async/await for readability",
    practice: "Practice #17: Prefer async/await over .then() chains",
    severity: "info" as const,
  },
  {
    id: "magic-number",
    regex: /[^.\w]([2-9]\d{3,}|\d{2,}\.?\d*)[^.\w]/,
    label: "Possible magic number — extract into a named constant",
    practice: "Practice #3: Avoid magic numbers",
    severity: "warning" as const,
  },
  {
    id: "for-push",
    regex: /for\s*\(|for\s+of/,
    label: "Manual loop — consider .map(), .filter(), or .reduce()",
    practice: "Practice #20: Use array methods over for loops",
    severity: "info" as const,
  },
];

const SEV_STYLE: Record<string, { border: string; bg: string; dot: string; label: string }> = {
  error:   { border: "rgba(239,68,68,0.35)",   bg: "rgba(239,68,68,0.06)",   dot: "#ef4444", label: "Error" },
  warning: { border: "rgba(251,191,36,0.35)",  bg: "rgba(251,191,36,0.06)",  dot: "#fbbf24", label: "Warning" },
  info:    { border: "rgba(99,102,241,0.35)",  bg: "rgba(99,102,241,0.06)",  dot: "#6366f1", label: "Info" },
};

// ─── CODE SMELL DETECTOR ─────────────────────────────────────────────────────

export function CodeSmellDetector() {
  const [code, setCode] = useState(
`// Paste your JavaScript code here to detect issues
var count = 0;

function getData(url) {
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      return data;
    });
}

function processItems(items) {
  const result = [];
  for (let i = 0; i < items.length; i++) {
    if (items[i].price >= 100) {
      result.push(items[i]);
    }
  }
  if (count == 0) throw "no items processed";
  return result;
}`
  );

  const analyze = useCallback((): SmellResult[] => {
    const lines = code.split("\n");
    const results: SmellResult[] = [];
    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("//") || trimmed === "") return;
      SMELL_RULES.forEach(rule => {
        if (rule.regex.test(line)) {
          results.push({
            line: idx + 1,
            ruleId: rule.id,
            label: rule.label,
            practice: rule.practice,
            severity: rule.severity,
            snippet: line.trim().slice(0, 60) + (line.trim().length > 60 ? "…" : ""),
          });
        }
      });
    });
    return results;
  }, [code]);

  const smells = analyze();
  const errorCount = smells.filter(s => s.severity === "error").length;
  const warnCount = smells.filter(s => s.severity === "warning").length;
  const infoCount = smells.filter(s => s.severity === "info").length;
  const score = Math.max(0, 100 - errorCount * 15 - warnCount * 7 - infoCount * 3);

  const scoreColor = score >= 90 ? "#059669" : score >= 70 ? "#f59e0b" : "#ef4444";
  const scoreLabel = score >= 90 ? "Clean ✓" : score >= 70 ? "Needs Review" : "Has Issues";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 14, padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--text)" }}>
          🔍 Code Smell Detector
        </h3>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 8 }}>
            {errorCount > 0 && <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#ef4444", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 20, padding: "2px 10px" }}>{errorCount} error{errorCount !== 1 ? "s" : ""}</span>}
            {warnCount > 0 && <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#f59e0b", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.3)", borderRadius: 20, padding: "2px 10px" }}>{warnCount} warning{warnCount !== 1 ? "s" : ""}</span>}
            {infoCount > 0 && <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 20, padding: "2px 10px" }}>{infoCount} suggestion{infoCount !== 1 ? "s" : ""}</span>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: scoreColor + "18", border: `1px solid ${scoreColor}40`, borderRadius: 8, padding: "4px 12px" }}>
            <span style={{ color: scoreColor, fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: "1rem" }}>{score}</span>
            <span style={{ color: scoreColor, fontSize: "0.72rem", fontWeight: 700 }}>{scoreLabel}</span>
          </div>
        </div>
      </div>

      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        spellCheck={false}
        style={{
          fontFamily: "var(--font-mono)", fontSize: "0.78rem", lineHeight: 1.7,
          background: "var(--bg-primary)", color: "var(--text)",
          border: "1px solid var(--border)", borderRadius: 10, padding: "14px 16px",
          resize: "vertical", minHeight: 200, outline: "none",
          width: "100%", boxSizing: "border-box",
        }}
      />

      {smells.length === 0 ? (
        <div style={{ textAlign: "center", padding: "20px 0", color: "#059669", fontSize: "0.9rem", fontWeight: 600 }}>
          ✅ No issues found — looking clean!
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {smells.map((smell, i) => {
            const s = SEV_STYLE[smell.severity];
            return (
              <div key={i} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 8, padding: "10px 14px", display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.dot, flexShrink: 0, marginTop: 4 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 2 }}>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, color: s.dot, background: s.dot + "20", padding: "1px 7px", borderRadius: 4 }}>{s.label}</span>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Line {smell.line}</span>
                  </div>
                  <p style={{ color: "var(--text)", fontSize: "0.83rem", fontWeight: 600, margin: "0 0 2px" }}>{smell.label}</p>
                  <code style={{ fontSize: "0.74rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", background: "var(--bg-primary)", padding: "1px 6px", borderRadius: 4, display: "block", marginBottom: 4, overflowX: "auto" }}>{smell.snippet}</code>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.74rem", margin: 0 }}>→ {smell.practice}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── REFACTOR CHALLENGE ───────────────────────────────────────────────────────

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    category: "Magic Numbers",
    title: "Extract the magic number",
    smellCode: `setTimeout(syncToDB, 86400000);\n\nif (retries > 5) {\n  throw new Error("Max retries reached");\n}`,
    options: [
      {
        code: `const RETRY_LIMIT = 5;\nconst ONE_DAY_MS = 86_400_000;\n\nsetTimeout(syncToDB, ONE_DAY_MS);\n\nif (retries > RETRY_LIMIT) {\n  throw new Error("Max retries reached");\n}`,
        correct: true,
        explanation: "Named constants make intent crystal clear. The numeric separator _ in 86_400_000 also improves readability without affecting the value.",
      },
      {
        code: `// Wait 1 day\nsetTimeout(syncToDB, 86400000);\n\n// Max 5 retries\nif (retries > 5) {\n  throw new Error("Max retries reached");\n}`,
        correct: false,
        explanation: "Comments describe what the numbers are, but named constants are still better — they're reusable, type-checkable, and can't get out of sync with comments.",
      },
      {
        code: `setInterval(syncToDB, 86400000);\n\nif (retries > 5) {\n  throw new Error("Too many");\n}`,
        correct: false,
        explanation: "Changed setTimeout to setInterval (different behavior!) and the error message became less descriptive. This makes things worse.",
      },
    ],
  },
  {
    id: 2,
    category: "var → const/let",
    title: "Replace var with the right declaration",
    smellCode: `var apiUrl = "https://api.example.com";\nvar retries = 0;\n\nretries = retries + 1;\nconsole.log(apiUrl + "/users");`,
    options: [
      {
        code: `let apiUrl = "https://api.example.com";\nlet retries = 0;\n\nretries = retries + 1;\nconsole.log(apiUrl + "/users");`,
        correct: false,
        explanation: "Using let for both is better than var, but apiUrl is never reassigned — it should be const to signal that intent clearly.",
      },
      {
        code: `const apiUrl = "https://api.example.com";\nlet retries = 0;\n\nretries = retries + 1;\nconsole.log(\`\${apiUrl}/users\`);`,
        correct: true,
        explanation: "const for values that never change — it signals intent. let for retries which is incremented. Template literal is also cleaner than concatenation.",
      },
      {
        code: `const apiUrl = "https://api.example.com";\nconst retries = 0;\n\nretries = retries + 1;\nconsole.log(apiUrl + "/users");`,
        correct: false,
        explanation: "const retries = 0 then retries = retries + 1 would throw a TypeError at runtime — you can't reassign a const.",
      },
    ],
  },
  {
    id: 3,
    category: "Early Return",
    title: "Flatten the nested conditionals",
    smellCode: `function processOrder(order) {\n  if (order) {\n    if (order.items.length > 0) {\n      if (order.user.isVerified) {\n        return charge(order);\n      }\n    }\n  }\n}`,
    options: [
      {
        code: `function processOrder(order) {\n  if (!order || order.items.length === 0\n      || !order.user.isVerified) {\n    return;\n  }\n  return charge(order);\n}`,
        correct: false,
        explanation: "Combining all conditions into one long if is slightly better, but a single huge condition is hard to read and debug.",
      },
      {
        code: `function processOrder(order) {\n  if (!order) return;\n  if (order.items.length === 0) return;\n  if (!order.user.isVerified) return;\n  return charge(order);\n}`,
        correct: true,
        explanation: "Guard clauses — one early return per failing condition. Each line is one clear check. The happy path (charge) is unindented and obvious at the bottom.",
      },
      {
        code: `const processOrder = order =>\n  order && order.items.length > 0 &&\n  order.user.isVerified && charge(order);`,
        correct: false,
        explanation: "The short-circuit chain is too clever — hard to read and the intent of each condition is unclear. Readability wins over brevity here.",
      },
    ],
  },
  {
    id: 4,
    category: "Array Methods",
    title: "Replace the loop with array methods",
    smellCode: `const expensiveItems = [];\nfor (let i = 0; i < cart.length; i++) {\n  if (cart[i].price > 100) {\n    expensiveItems.push({\n      name: cart[i].name,\n      price: cart[i].price * 1.1\n    });\n  }\n}`,
    options: [
      {
        code: `const expensiveItems = cart\n  .filter(item => item.price > 100)\n  .map(item => ({\n    name: item.name,\n    price: item.price * 1.1\n  }));`,
        correct: true,
        explanation: "filter then map — each method has one clear purpose. The transformation pipeline reads like English: 'filter items over 100, then map to the new shape'.",
      },
      {
        code: `const expensiveItems = cart.reduce((acc, item) => {\n  if (item.price > 100) {\n    acc.push({ name: item.name, price: item.price * 1.1 });\n  }\n  return acc;\n}, []);`,
        correct: false,
        explanation: "reduce can do this but it's overkill here — it combines filtering and mapping into one harder-to-read block. filter+map is clearer for this case.",
      },
      {
        code: `const expensiveItems = cart.forEach(item => {\n  if (item.price > 100) {\n    return { name: item.name, price: item.price * 1.1 };\n  }\n});`,
        correct: false,
        explanation: "forEach always returns undefined — it can't build a new array. The return inside forEach is also silently ignored. This would give expensiveItems = undefined.",
      },
    ],
  },
  {
    id: 5,
    category: "Async/Await",
    title: "Convert the .then() chain to async/await",
    smellCode: `function loadUserPosts(id) {\n  return getUser(id)\n    .then(user => {\n      return getPosts(user.id)\n        .then(posts => {\n          return { user, posts };\n        });\n    })\n    .catch(err => console.error(err));\n}`,
    options: [
      {
        code: `function loadUserPosts(id) {\n  return getUser(id).then(user =>\n    getPosts(user.id).then(posts => ({ user, posts }))\n  ).catch(err => console.error(err));\n}`,
        correct: false,
        explanation: "Condensing the .then() chain makes it shorter but still hard to follow — nested .then() is the core problem, not the line count.",
      },
      {
        code: `async function loadUserPosts(id) {\n  try {\n    const user = await getUser(id);\n    const posts = await getPosts(user.id);\n    return { user, posts };\n  } catch (err) {\n    console.error(err);\n  }\n}`,
        correct: true,
        explanation: "async/await reads like synchronous code: get user, then get posts, return both. The try/catch is clear about what's guarded. Stack traces are also much better.",
      },
      {
        code: `async function loadUserPosts(id) {\n  const [user, posts] = await Promise.all([\n    getUser(id),\n    getPosts(id)\n  ]);\n  return { user, posts };\n}`,
        correct: false,
        explanation: "Promise.all is great — but here posts depend on user.id from the user result, so they can't run in parallel. This would pass the wrong id to getPosts.",
      },
    ],
  },
];

export function RefactorChallenge() {
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [history, setHistory] = useState<boolean[]>([]);

  const challenge = CHALLENGES[challengeIdx];
  const answered = selected !== null;
  const isCorrect = answered && challenge.options[selected].correct;

  function handleSelect(i: number) {
    if (answered) return;
    setSelected(i);
  }

  function handleNext() {
    if (selected !== null) {
      setHistory(h => [...h, challenge.options[selected].correct]);
    }
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(i => i + 1);
      setSelected(null);
    }
  }

  function handleRestart() {
    setChallengeIdx(0);
    setSelected(null);
    setHistory([]);
  }

  const allDone = challengeIdx === CHALLENGES.length - 1 && answered;
  const correctCount = history.filter(Boolean).length + (allDone && isCorrect ? 1 : 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 14, padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--text)" }}>
          ⚡ Refactor Challenge
        </h3>
        <div style={{ display: "flex", gap: 6 }}>
          {CHALLENGES.map((_, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: i < history.length ? (history[i] ? "#059669" : "#ef4444") : i === challengeIdx ? "var(--primary)" : "var(--border)" }} />
          ))}
        </div>
      </div>

      <div style={{ background: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 16px" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--primary)", background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.25)", borderRadius: 4, padding: "2px 8px" }}>{challenge.category}</span>
          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Challenge {challengeIdx + 1} of {CHALLENGES.length}</span>
        </div>
        <p style={{ color: "var(--text)", fontSize: "0.9rem", fontWeight: 600, marginBottom: 10 }}>{challenge.title}</p>
        <pre style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: "0.76rem", color: "var(--text-muted)", lineHeight: 1.7, overflowX: "auto" }}>{challenge.smellCode}</pre>
      </div>

      <p style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>👆 Pick the best refactored version:</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {challenge.options.map((opt, i) => {
          let border = "var(--border)";
          let bg = "var(--bg-primary)";
          if (answered) {
            if (opt.correct) { border = "#059669"; bg = "rgba(5,150,105,0.08)"; }
            else if (i === selected && !opt.correct) { border = "#ef4444"; bg = "rgba(239,68,68,0.07)"; }
          } else if (selected === i) { border = "var(--primary)"; }

          return (
            <div
              key={i}
              onClick={() => handleSelect(i)}
              style={{ border: `1.5px solid ${border}`, borderRadius: 10, padding: "12px 14px", cursor: answered ? "default" : "pointer", background: bg, transition: "all 0.15s" }}
            >
              <pre style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text)", lineHeight: 1.7, overflowX: "auto" }}>{opt.code}</pre>
              {answered && (
                <p style={{ marginTop: 8, fontSize: "0.78rem", color: opt.correct ? "#059669" : i === selected ? "#ef4444" : "var(--text-muted)", lineHeight: 1.6 }}>
                  {opt.correct ? "✅" : i === selected ? "❌" : "ℹ️"} {opt.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {allDone ? (
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "var(--text)", fontWeight: 700, fontSize: "1rem", marginBottom: 4 }}>
            {correctCount >= 4 ? "🏆" : correctCount >= 3 ? "🎯" : "📚"} {correctCount}/{CHALLENGES.length} correct!
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", marginBottom: 12 }}>
            {correctCount === 5 ? "Perfect score — you're writing production-quality code!" : "Keep practicing — review the explanations for the ones you missed."}
          </p>
          <button onClick={handleRestart} style={{ background: "var(--primary)", color: "white", border: "none", borderRadius: 8, padding: "8px 20px", fontWeight: 600, cursor: "pointer", fontSize: "0.85rem" }}>
            Try Again
          </button>
        </div>
      ) : (
        <button
          onClick={handleNext}
          disabled={!answered}
          style={{ alignSelf: "flex-end", background: answered ? "var(--primary)" : "var(--border)", color: answered ? "white" : "var(--text-muted)", border: "none", borderRadius: 8, padding: "8px 20px", fontWeight: 600, cursor: answered ? "pointer" : "default", fontSize: "0.85rem", transition: "all 0.2s" }}
        >
          {challengeIdx < CHALLENGES.length - 1 ? "Next Challenge →" : "See Results"}
        </button>
      )}
    </div>
  );
}

// ─── PRACTICE CHECKLIST ───────────────────────────────────────────────────────

const CHECKLIST_CATEGORIES = [
  {
    name: "Naming & Readability",
    color: "#f59e0b",
    practices: [
      { id: "p1",  label: "Use descriptive variable names" },
      { id: "p2",  label: "Follow camelCase / PascalCase / SCREAMING_SNAKE conventions" },
      { id: "p3",  label: "Extract magic numbers into named constants" },
      { id: "p4",  label: "Keep functions small and single-purpose" },
      { id: "p5",  label: "Write self-documenting code (comments explain why)" },
    ],
  },
  {
    name: "Variables & Declarations",
    color: "#0891b2",
    practices: [
      { id: "p6",  label: "Use const by default, let when reassigning, never var" },
      { id: "p7",  label: "Declare variables close to where they're used" },
      { id: "p8",  label: "Avoid polluting global scope" },
      { id: "p9",  label: "Use destructuring for multi-property access" },
    ],
  },
  {
    name: "Functions",
    color: "#8b5cf6",
    practices: [
      { id: "p10", label: "Use default parameters instead of || fallbacks" },
      { id: "p11", label: "Use early returns (guard clauses) to reduce nesting" },
      { id: "p12", label: "Prefer pure functions without hidden side effects" },
      { id: "p13", label: "Use arrow functions for inline callbacks" },
    ],
  },
  {
    name: "Error Handling",
    color: "#ef4444",
    practices: [
      { id: "p14", label: "Always handle promise rejections (.catch or try/catch)" },
      { id: "p15", label: "Throw Error instances, not strings or plain objects" },
      { id: "p16", label: "Wrap only the risky call in try/catch, not whole functions" },
    ],
  },
  {
    name: "Async & Promises",
    color: "#3b82f6",
    practices: [
      { id: "p17", label: "Prefer async/await over .then() chains" },
      { id: "p18", label: "Use Promise.all for independent parallel async calls" },
      { id: "p19", label: "Never mix async patterns (callbacks + promises + await)" },
    ],
  },
  {
    name: "Arrays & Objects",
    color: "#10b981",
    practices: [
      { id: "p20", label: "Use .map(), .filter(), .find() instead of manual loops" },
      { id: "p21", label: "Never mutate function arguments — return new values" },
      { id: "p22", label: "Use optional chaining (?.) for deep property access" },
    ],
  },
  {
    name: "Code Quality",
    color: "#ec4899",
    practices: [
      { id: "p23", label: "Always use strict equality (===) and never ==" },
      { id: "p24", label: "Use template literals for string construction" },
      { id: "p25", label: "Keep files focused — one concern per file" },
      { id: "p26", label: "Use a linter (ESLint) and formatter (Prettier) from day 1" },
    ],
  },
];

const STORAGE_KEY = "module-15-checklist";

function loadChecked(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch { return new Set(); }
}

export function PracticeChecklist() {
  const [checked, setChecked] = useState<Set<string>>(() => loadChecked());

  const total = CHECKLIST_CATEGORIES.reduce((s, c) => s + c.practices.length, 0);
  const done = checked.size;
  const pct = Math.round((done / total) * 100);

  function toggle(id: string) {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...next])); } catch { /* noop */ }
      return next;
    });
  }

  const scoreColor = pct >= 90 ? "#059669" : pct >= 60 ? "#f59e0b" : "var(--primary)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 14, padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--text)" }}>
          ✅ My Practice Checklist
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{done}/{total} adopted</span>
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: "1.1rem", color: scoreColor }}>{pct}%</span>
        </div>
      </div>

      <div style={{ background: "var(--bg-primary)", borderRadius: 8, height: 8, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, var(--primary), ${scoreColor})`, borderRadius: 8, transition: "width 0.4s ease" }} />
      </div>

      <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginTop: -4 }}>
        Check off practices you&apos;ve adopted in your projects. Progress saves automatically.
      </p>

      {CHECKLIST_CATEGORIES.map(cat => {
        const catDone = cat.practices.filter(p => checked.has(p.id)).length;
        return (
          <div key={cat.name} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: cat.color }}>{cat.name}</span>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{catDone}/{cat.practices.length}</span>
            </div>
            <div style={{ height: 3, background: "var(--bg-primary)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(catDone / cat.practices.length) * 100}%`, background: cat.color, borderRadius: 4, transition: "width 0.3s" }} />
            </div>
            {cat.practices.map(p => (
              <label key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none" }}>
                <div
                  onClick={() => toggle(p.id)}
                  style={{
                    width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                    border: `2px solid ${checked.has(p.id) ? cat.color : "var(--border)"}`,
                    background: checked.has(p.id) ? cat.color : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.15s",
                  }}
                >
                  {checked.has(p.id) && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span
                  onClick={() => toggle(p.id)}
                  style={{ fontSize: "0.83rem", color: checked.has(p.id) ? "var(--text-muted)" : "var(--text)", textDecoration: checked.has(p.id) ? "line-through" : "none", transition: "all 0.15s" }}
                >
                  {p.label}
                </span>
              </label>
            ))}
          </div>
        );
      })}
    </div>
  );
}
