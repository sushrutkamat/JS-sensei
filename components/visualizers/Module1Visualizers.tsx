"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, ChevronRight, ChevronLeft } from "lucide-react";

// ── CallStack Visualizer ──────────────────────────────────────────────────────

interface StackFrame {
  name: string;
  args?: string;
  line: number;
  color: string;
}

interface CallStackStep {
  frames: StackFrame[];
  activeLine: number;
  description: string;
  output?: string;
}

interface CallStackVisualizerProps {
  steps: CallStackStep[];
  code: string;
  title?: string;
}

const COLORS = ["#7c3aed", "#0891b2", "#d97706", "#059669", "#db2777", "#6366f1"];

const STEP_DURATION = 5000; // ms each step is shown during auto-play

export function CallStackVisualizer({ steps, code, title }: CallStackVisualizerProps) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [countdown, setCountdown] = useState(0); // 0–100 progress

  const current = steps[step];
  const lines = code.split("\n");

  // Auto-advance timer
  useEffect(() => {
    if (!playing) { setCountdown(0); return; }
    if (step >= steps.length - 1) { setPlaying(false); setCountdown(0); return; }
    setCountdown(0);
    const t = setTimeout(() => setStep(s => s + 1), STEP_DURATION);
    return () => clearTimeout(t);
  }, [playing, step, steps.length]);

  // Countdown bar animation: ticks up to 100 over STEP_DURATION
  useEffect(() => {
    if (!playing || step >= steps.length - 1) return;
    const start = performance.now();
    let raf: number;
    const tick = () => {
      const elapsed = performance.now() - start;
      setCountdown(Math.min(100, (elapsed / STEP_DURATION) * 100));
      if (elapsed < STEP_DURATION) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, step, steps.length]);

  const reset = () => { setStep(0); setPlaying(false); setCountdown(0); };

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "14px 20px", background: "var(--bg-surface-2)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.95rem", color: "var(--text)" }}>{title ?? "Call Stack Visualizer"}</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 7, padding: "5px 10px", cursor: step === 0 ? "not-allowed" : "pointer", color: step === 0 ? "var(--text-muted)" : "var(--text)", opacity: step === 0 ? 0.5 : 1 }}>
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => playing ? setPlaying(false) : (step >= steps.length - 1 ? (reset(), setPlaying(true)) : setPlaying(true))}
            style={{ background: "linear-gradient(135deg, var(--primary), hsl(265,90%,50%))", border: "none", borderRadius: 7, padding: "5px 14px", cursor: "pointer", color: "white", fontSize: "0.8rem", fontWeight: 600, fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 6 }}>
            <Play size={12} fill="currentColor" /> {playing ? "Pause" : step >= steps.length - 1 ? "Replay" : "Play"}
          </button>
          <button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} disabled={step >= steps.length - 1}
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 7, padding: "5px 10px", cursor: step >= steps.length - 1 ? "not-allowed" : "pointer", color: step >= steps.length - 1 ? "var(--text-muted)" : "var(--text)", opacity: step >= steps.length - 1 ? 0.5 : 1 }}>
            <ChevronRight size={14} />
          </button>
          <button onClick={reset} style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 7, padding: "5px 10px", cursor: "pointer", color: "var(--text-muted)" }}>
            <RotateCcw size={12} />
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
        {/* Code Panel */}
        <div style={{ borderRight: "1px solid var(--border)", padding: 16 }}>
          <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Code</p>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
            {lines.map((line, i) => (
              <div key={i} style={{
                padding: "3px 8px",
                borderRadius: 4,
                background: current.activeLine === i + 1 ? "rgba(139, 92, 246, 0.2)" : "transparent",
                borderLeft: current.activeLine === i + 1 ? "2px solid var(--primary)" : "2px solid transparent",
                color: current.activeLine === i + 1 ? "var(--text)" : "var(--text-muted)",
                minHeight: "1.5em",
                transition: "all 0.3s",
              }}>
                <span style={{ display: "inline-block", minWidth: 20, opacity: 0.4, marginRight: 8, color: "var(--text-muted)", fontSize: "0.7rem" }}>{i + 1}</span>
                {line || " "}
              </div>
            ))}
          </div>
        </div>

        {/* Stack Panel */}
        <div style={{ padding: 16 }}>
          <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Call Stack</p>
          <div style={{ display: "flex", flexDirection: "column-reverse", gap: 6, minHeight: 160 }}>
            <AnimatePresence>
              {current.frames.map((frame, i) => (
                <motion.div
                  key={frame.name + i}
                  initial={{ opacity: 0, x: 30, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -30, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  style={{
                    background: frame.color + "18",
                    border: `1px solid ${frame.color}50`,
                    borderRadius: 8,
                    padding: "8px 14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", fontWeight: 600, color: frame.color }}>
                    {frame.name}
                  </span>
                  {frame.args && (
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: frame.color, opacity: 0.7, background: frame.color + "15", padding: "2px 8px", borderRadius: 4 }}>
                      {frame.args}
                    </span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {current.frames.length === 0 && (
              <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: "0.8rem", opacity: 0.5, flexDirection: "column", gap: 4, padding: "20px 0" }}>
                <div style={{ width: 32, height: 32, border: "2px dashed var(--border)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>∅</div>
                Stack is empty
              </div>
            )}
          </div>

          {/* Description */}
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: 12,
              borderTop: "1px solid var(--border)",
              paddingTop: 12,
              fontSize: "0.82rem",
              color: "var(--text-muted)",
              lineHeight: 1.5,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--primary)", display: "inline-block" }} />
              <span style={{ fontSize: "0.7rem", color: "var(--primary)", fontWeight: 600, fontFamily: "var(--font-mono)" }}>STEP {step + 1}/{steps.length}</span>
            </span>
            {current.description}
            {current.output && (
              <div style={{ marginTop: 8, background: "var(--bg-primary)", borderRadius: 6, padding: "6px 10px", fontFamily: "var(--font-mono)", color: "var(--success)", fontSize: "0.78rem" }}>
                &gt; {current.output}
              </div>
            )}

            {/* Countdown bar — shown only while playing */}
            {playing && step < steps.length - 1 && (
              <div style={{ marginTop: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", opacity: 0.6 }}>Next step in...</span>
                  <span style={{ fontSize: "0.65rem", color: "var(--primary)", fontFamily: "var(--font-mono)" }}>
                    {Math.ceil(((100 - countdown) / 100) * (STEP_DURATION / 1000))}s
                  </span>
                </div>
                <div style={{ height: 3, background: "var(--bg-primary)", borderRadius: 50, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${countdown}%`, background: "linear-gradient(90deg, var(--primary), var(--secondary))", borderRadius: 50, transition: "width 0.1s linear" }} />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Overall step progress bar */}
      <div style={{ padding: "10px 20px", background: "var(--bg-surface-2)", borderTop: "1px solid var(--border)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", opacity: 0.7 }}>Overall progress</span>
          <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{step + 1} / {steps.length}</span>
        </div>
        <div style={{ height: 3, background: "var(--bg-primary)", borderRadius: 50, overflow: "hidden" }}>
          <motion.div style={{ height: "100%", background: "linear-gradient(90deg, var(--primary), var(--secondary))", borderRadius: 50 }} animate={{ width: `${((step + 1) / steps.length) * 100}%` }} transition={{ duration: 0.4 }} />
        </div>
      </div>
    </div>
  );
}

// ── Engine Pipeline ────────────────────────────────────────────────────────────

const stages = [
  { id: "code", label: "Your Code", icon: "📝", desc: "JavaScript source code", color: "#7c3aed" },
  { id: "parser", label: "Parser", icon: "🔍", desc: "Checks syntax, tokenizes", color: "#0891b2" },
  { id: "ast", label: "AST", icon: "🌳", desc: "Abstract Syntax Tree", color: "#d97706" },
  { id: "interpreter", label: "Interpreter", icon: "⚡", desc: "Ignition (V8) bytecode", color: "#059669" },
  { id: "jit", label: "JIT Compiler", icon: "🚀", desc: "TurboFan optimizes hot paths", color: "#db2777" },
  { id: "cpu", label: "CPU", icon: "💻", desc: "Machine instructions execute", color: "#6366f1" },
];

export function EnginePipelineVisualizer() {
  const [active, setActive] = useState<number | null>(null);
  const [running, setRunning] = useState(false);

  const runPipeline = async () => {
    setRunning(true);
    for (let i = 0; i < stages.length; i++) {
      setActive(i);
      await new Promise(r => setTimeout(r, 2000)); // hold each stage for 2s
    }
    setRunning(false);
    setActive(null);
  };

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--text)" }}>JavaScript Engine Pipeline</h3>
        <button
          onClick={runPipeline}
          disabled={running}
          style={{ background: running ? "var(--bg-surface-2)" : "linear-gradient(135deg, var(--primary), hsl(265,90%,50%))", border: "none", borderRadius: 8, padding: "8px 18px", cursor: running ? "not-allowed" : "pointer", color: "white", fontSize: "0.875rem", fontWeight: 600, fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 6, opacity: running ? 0.7 : 1 }}>
          <Play size={14} fill="currentColor" /> {running ? "Running..." : "Run Code"}
        </button>
      </div>

      {/* Pipeline stages */}
      <div style={{ display: "flex", alignItems: "center", gap: 0, overflowX: "auto", paddingBottom: 8 }}>
        {stages.map((stage, i) => (
          <div key={stage.id} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <motion.div
              animate={{
                boxShadow: active === i ? `0 0 30px ${stage.color}60, 0 0 60px ${stage.color}30` : "none",
                borderColor: active === i ? stage.color : "var(--border)",
                background: active === i ? stage.color + "20" : "var(--bg-surface-2)",
              }}
              transition={{ duration: 0.4 }}
              style={{ border: "2px solid var(--border)", borderRadius: 12, padding: "14px 16px", textAlign: "center", minWidth: 110, cursor: "pointer" }}
              onClick={() => setActive(active === i ? null : i)}
            >
              <div style={{ fontSize: "1.6rem", marginBottom: 6 }}>{stage.icon}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, color: active === i ? stage.color : "var(--text)", marginBottom: 4 }}>{stage.label}</div>
              <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", lineHeight: 1.3 }}>{stage.desc}</div>
            </motion.div>

            {i < stages.length - 1 && (
              <div style={{ display: "flex", alignItems: "center", padding: "0 6px" }}>
                <motion.div
                  animate={{
                    opacity: active !== null && active > i ? 1 : 0.2,
                    color: active !== null && active > i ? stages[i].color : "var(--text-muted)",
                  }}
                  style={{ fontSize: "1.2rem" }}
                >
                  →
                </motion.div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Active description */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ marginTop: 20, background: stages[active].color + "12", border: `1px solid ${stages[active].color}40`, borderRadius: 10, padding: "12px 16px" }}
          >
            <p style={{ color: stages[active].color, fontWeight: 600, fontSize: "0.9rem", marginBottom: 4 }}>
              {stages[active].icon} {stages[active].label}
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.6 }}>
              {[
                "Your JavaScript source code — the text you write in .js files. This is human-readable but computers can't execute it directly.",
                "The Parser reads your code character by character, checks it for syntax errors, and breaks it into 'tokens' (like words in a sentence).",
                "The Abstract Syntax Tree (AST) is a tree structure representing your code's meaning. Each node represents an operation or value.",
                "The Interpreter converts the AST to bytecode and executes it. In V8, this is called 'Ignition'. Fast to start but not maximally fast.",
                "The Just-In-Time (JIT) Compiler watches for 'hot' code (code that runs often) and compiles it to optimized machine code. In V8, this is 'TurboFan'.",
                "Your CPU finally executes the machine code directly. This is the fastest execution — pure hardware instructions.",
              ][active]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Memory Heap Visualizer ────────────────────────────────────────────────────

interface HeapBubble {
  id: string;
  label: string;
  value: string;
  type: "primitive" | "object";
  color: string;
  x: number;
  y: number;
}

const initialBubbles: HeapBubble[] = [
  { id: "1", label: "name", value: '"Alice"', type: "primitive", color: "#059669", x: 15, y: 20 },
  { id: "2", label: "age", value: "25", type: "primitive", color: "#0891b2", x: 55, y: 15 },
  { id: "3", label: "active", value: "true", type: "primitive", color: "#7c3aed", x: 80, y: 30 },
  { id: "4", label: "user {}", value: "object", type: "object", color: "#d97706", x: 30, y: 55 },
  { id: "5", label: "scores []", value: "array", type: "object", color: "#db2777", x: 65, y: 60 },
];

export function MemoryHeapVisualizer() {
  const [bubbles, setBubbles] = useState(initialBubbles);
  const [selected, setSelected] = useState<string | null>(null);

  const removeBubble = (id: string) => setBubbles(b => b.filter(x => x.id !== id));
  const reset = () => setBubbles(initialBubbles);

  const sel = bubbles.find(b => b.id === selected);

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ padding: "14px 20px", background: "var(--bg-surface-2)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--text)" }}>Memory Heap Visualizer</span>
        <button onClick={reset} style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 7, padding: "5px 12px", cursor: "pointer", color: "var(--text-muted)", fontSize: "0.8rem", fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 4 }}>
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      <div style={{ padding: 20 }}>
        <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: 16 }}>
          Click a bubble to select it. Click "Pop" to simulate garbage collection (variable goes out of scope).
        </p>

        {/* Heap container */}
        <div style={{ position: "relative", height: 200, background: "var(--bg-primary)", borderRadius: 12, border: "1px dashed var(--border)", overflow: "hidden", marginBottom: 16 }}>
          <span style={{ position: "absolute", top: 8, left: 12, fontSize: "0.68rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Memory Heap</span>
          <AnimatePresence>
            {bubbles.map(b => (
              <motion.div
                key={b.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: [0, -6, 0],
                  rotate: b.type === "object" ? [0, 1, -1, 0] : 0,
                  boxShadow: selected === b.id ? `0 0 20px ${b.color}80` : `0 4px 15px ${b.color}30`,
                }}
                exit={{ scale: 0, opacity: 0, transition: { duration: 0.4 } }}
                transition={{ y: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }, scale: { type: "spring", stiffness: 300 } }}
                onClick={() => setSelected(selected === b.id ? null : b.id)}
                style={{
                  position: "absolute",
                  left: `${b.x}%`,
                  top: `${b.y}%`,
                  transform: "translate(-50%, -50%)",
                  width: b.type === "object" ? 80 : 64,
                  height: b.type === "object" ? 80 : 64,
                  borderRadius: "50%",
                  background: b.color + "20",
                  border: `2px solid ${selected === b.id ? b.color : b.color + "60"}`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  padding: 4,
                }}
              >
                <span style={{ fontSize: "0.6rem", color: b.color, fontWeight: 700, fontFamily: "var(--font-mono)", textAlign: "center" }}>{b.label}</span>
                <span style={{ fontSize: "0.58rem", color: b.color, opacity: 0.7, fontFamily: "var(--font-mono)", textAlign: "center" }}>{b.value}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {bubbles.length === 0 && (
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: "0.85rem" }}>
              Heap is empty — all variables garbage collected 🗑️
            </div>
          )}
        </div>

        {/* Selected bubble actions */}
        {sel && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ background: sel.color + "12", border: `1px solid ${sel.color}40`, borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: sel.color, fontWeight: 600 }}>{sel.label}</span>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginLeft: 10 }}>
                {sel.type === "primitive" ? "Primitive — stored by value" : "Object — stored by reference"}
              </span>
            </div>
            <button
              onClick={() => { removeBubble(sel.id); setSelected(null); }}
              style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 7, padding: "6px 14px", cursor: "pointer", color: "var(--error)", fontSize: "0.8rem", fontWeight: 600, fontFamily: "var(--font-body)" }}
            >
              💥 Pop (GC)
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
