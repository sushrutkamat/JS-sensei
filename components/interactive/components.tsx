"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ChevronDown, ChevronUp, Play, X, CheckCircle2, XCircle } from "lucide-react";

// ── CodeBlock ─────────────────────────────────────────────────────────────────

const KEYWORDS = new Set(["const","let","var","function","return","if","else","for","while","do","switch","case","break","continue","new","this","class","extends","import","export","default","typeof","instanceof","void","delete","in","of","async","await","try","catch","finally","throw","yield","null","undefined","true","false"]);

function escapeHtml(s: string) {
  return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

function syntaxHighlight(code: string): string {
  let out = "";
  let i = 0;

  while (i < code.length) {
    // Single-line comments
    if (code[i] === "/" && code[i + 1] === "/") {
      const end = code.indexOf("\n", i);
      const slice = end === -1 ? code.slice(i) : code.slice(i, end);
      out += `<span class="token-comment">${escapeHtml(slice)}</span>`;
      i += slice.length;
      continue;
    }

    // String literals: double-quote, single-quote, backtick
    if (code[i] === '"' || code[i] === "'" || code[i] === "`") {
      const q = code[i];
      let j = i + 1;
      while (j < code.length) {
        if (code[j] === "\\" && q !== "`") { j += 2; continue; }
        if (code[j] === q) { j++; break; }
        j++;
      }
      out += `<span class="token-string">${escapeHtml(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // Numbers
    if (code[i] >= "0" && code[i] <= "9") {
      let j = i;
      while (j < code.length && ((code[j] >= "0" && code[j] <= "9") || code[j] === ".")) j++;
      out += `<span class="token-number">${escapeHtml(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // Identifiers, keywords, function calls
    if ((code[i] >= "a" && code[i] <= "z") || (code[i] >= "A" && code[i] <= "Z") || code[i] === "_" || code[i] === "$") {
      let j = i;
      while (j < code.length && ((code[j] >= "a" && code[j] <= "z") || (code[j] >= "A" && code[j] <= "Z") || (code[j] >= "0" && code[j] <= "9") || code[j] === "_" || code[j] === "$")) j++;
      const word = code.slice(i, j);
      // Peek ahead for function call
      let k = j;
      while (k < code.length && (code[k] === " " || code[k] === "\t")) k++;
      if (code[k] === "(") {
        out += `<span class="token-function">${escapeHtml(word)}</span>`;
      } else if (KEYWORDS.has(word)) {
        out += `<span class="token-keyword">${escapeHtml(word)}</span>`;
      } else {
        out += escapeHtml(word);
      }
      i = j;
      continue;
    }

    // Default: output character as-is (escaped)
    out += escapeHtml(code[i]);
    i++;
  }

  return out;
}


interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  title?: string;
  runnable?: boolean;
  onRun?: () => void;
}

export function CodeBlock({ code, language = "javascript", showLineNumbers = true, highlightLines = [], title, runnable = false, onRun }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div style={{
      background: "var(--bg-surface)",
      border: "1px solid var(--border)",
      borderRadius: 12,
      overflow: "hidden",
      fontFamily: "var(--font-mono)",
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 16px",
        background: "var(--bg-surface-2)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Traffic lights */}
          <div style={{ display: "flex", gap: 6 }}>
            {["#ef4444", "#f59e0b", "#22c55e"].map((c, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />
            ))}
          </div>
          {title && <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginLeft: 4 }}>{title}</span>}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", opacity: 0.6 }}>{language}</span>
          {runnable && (
            <button
              onClick={onRun}
              style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 6, background: "rgba(52, 211, 153, 0.15)", border: "1px solid rgba(52, 211, 153, 0.3)", color: "var(--success)", cursor: "pointer", fontSize: "0.75rem", fontFamily: "var(--font-body)", fontWeight: 600 }}
            >
              <Play size={10} fill="currentColor" /> Run
            </button>
          )}
          <button
            onClick={handleCopy}
            style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 8px", borderRadius: 6, background: "transparent", border: "1px solid var(--border)", color: copied ? "var(--success)" : "var(--text-muted)", cursor: "pointer", fontSize: "0.75rem", fontFamily: "var(--font-body)", transition: "all 0.2s" }}
            aria-label="Copy code"
          >
            {copied ? <><Check size={11} /> Copied!</> : <><Copy size={11} /> Copy</>}
          </button>
        </div>
      </div>

      {/* Code */}
      <div style={{ overflowX: "auto", padding: "16px 0" }}>
        {lines.map((line, i) => (
          <div
            key={i}
            className="code-line"
            style={{
              background: highlightLines.includes(i + 1) ? "rgba(139, 92, 246, 0.15)" : "transparent",
              borderLeft: highlightLines.includes(i + 1) ? "2px solid var(--primary)" : "2px solid transparent",
              minHeight: "1.5em",
            }}
          >
            {showLineNumbers && (
              <span style={{ display: "inline-block", minWidth: 36, color: "var(--text-muted)", userSelect: "none", paddingRight: 16, textAlign: "right", opacity: 0.4, fontSize: "0.8rem" }}>
                {i + 1}
              </span>
            )}
            <span
              style={{ fontSize: "0.875rem", color: "var(--text)" }}
              dangerouslySetInnerHTML={{ __html: syntaxHighlight(line) || "&nbsp;" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── QuizCard ──────────────────────────────────────────────────────────────────

interface QuizOption {
  label: string;
  correct: boolean;
  explanation: string;
}

interface QuizCardProps {
  question: string;
  options: QuizOption[];
  hint?: string;
}

export function QuizCard({ question, options, hint }: QuizCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
  };

  const isCorrect = selected !== null && options[selected]?.correct;

  return (
    <div style={{
      background: "var(--bg-surface)",
      border: "1px solid var(--border)",
      borderRadius: 14,
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{ padding: "16px 20px", background: "var(--bg-surface-2)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--accent)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.06em", background: "rgba(251,191,36,0.12)", padding: "2px 8px", borderRadius: 4 }}>Quiz</span>
        <span style={{ fontSize: "0.875rem", color: "var(--text)", fontWeight: 500 }}>{question}</span>
      </div>

      {/* Options */}
      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
        {options.map((opt, i) => {
          let bg = "var(--bg-surface-2)";
          let border = "1px solid var(--border)";
          let color = "var(--text)";

          if (selected !== null) {
            if (opt.correct) { bg = "rgba(52, 211, 153, 0.1)"; border = "1px solid var(--success)"; color = "var(--success)"; }
            else if (i === selected && !opt.correct) { bg = "rgba(239, 68, 68, 0.1)"; border = "1px solid var(--error)"; color = "var(--error)"; }
          }

          return (
            <motion.button
              key={i}
              onClick={() => handleSelect(i)}
              whileHover={selected === null ? { scale: 1.01 } : {}}
              whileTap={selected === null ? { scale: 0.99 } : {}}
              style={{
                background: bg,
                border,
                borderRadius: 8,
                padding: "10px 14px",
                textAlign: "left",
                cursor: selected === null ? "pointer" : "default",
                color,
                fontSize: "0.875rem",
                fontFamily: "var(--font-body)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "all 0.2s",
              }}
            >
              <span><strong style={{ marginRight: 8, fontFamily: "var(--font-mono)", opacity: 0.6 }}>{String.fromCharCode(65 + i)}.</strong>{opt.label}</span>
              {selected !== null && opt.correct && <CheckCircle2 size={16} />}
              {selected !== null && i === selected && !opt.correct && <XCircle size={16} />}
            </motion.button>
          );
        })}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ borderTop: "1px solid var(--border)", padding: "14px 20px", background: isCorrect ? "rgba(52, 211, 153, 0.05)" : "rgba(239, 68, 68, 0.05)" }}
          >
            <p style={{ fontSize: "0.85rem", color: isCorrect ? "var(--success)" : "var(--error)", marginBottom: 4, fontWeight: 600 }}>
              {isCorrect ? "✓ Correct!" : "✗ Not quite."}
            </p>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{options[selected]?.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint */}
      {hint && (
        <div style={{ padding: "0 20px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
          <button
            onClick={() => setShowHint(!showHint)}
            style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--font-body)" }}
          >
            {showHint ? <ChevronUp size={12} /> : <ChevronDown size={12} />} {showHint ? "Hide hint" : "Show hint"}
          </button>
          <AnimatePresence>
            {showHint && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ fontSize: "0.82rem", color: "var(--accent)", background: "rgba(251,191,36,0.07)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 6, padding: "8px 12px" }}>
                💡 {hint}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

// ── ConceptCard ────────────────────────────────────────────────────────────────

interface ConceptCardProps {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
  variant?: "default" | "tip" | "warning" | "info";
}

export function ConceptCard({ icon, title, children, variant = "default" }: ConceptCardProps) {
  const colors = {
    default: { border: "var(--border)", accent: "var(--primary)", bg: "rgba(139, 92, 246, 0.05)" },
    tip: { border: "rgba(52, 211, 153, 0.4)", accent: "var(--success)", bg: "rgba(52, 211, 153, 0.05)" },
    warning: { border: "rgba(251, 191, 36, 0.4)", accent: "var(--accent)", bg: "rgba(251, 191, 36, 0.05)" },
    info: { border: "rgba(6, 182, 212, 0.4)", accent: "var(--secondary)", bg: "rgba(6, 182, 212, 0.05)" },
  }[variant];

  return (
    <div style={{
      background: colors.bg,
      border: `1px solid ${colors.border}`,
      borderLeft: `3px solid ${colors.accent}`,
      borderRadius: 10,
      padding: "16px 20px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        {icon && <span style={{ color: colors.accent }}>{icon}</span>}
        <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: colors.accent, fontSize: "0.9rem" }}>{title}</h4>
      </div>
      <div style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}
