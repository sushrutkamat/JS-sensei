"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, ChevronRight, ChevronLeft, Pause, Zap } from "lucide-react";

// ── Event Loop Simulator ──────────────────────────────────────────────────────

type QueueType = "microtask" | "macrotask";

interface StackFrame {
  id: string;
  name: string;
  color: string;
}

interface QueueItem {
  id: string;
  name: string;
  type: QueueType;
  color: string;
}

interface WebAPIItem {
  id: string;
  name: string;
  remaining: number;
  total: number;
  color: string;
}

interface EventLoopStep {
  description: string;
  stack: StackFrame[];
  webApis: WebAPIItem[];
  microtasks: QueueItem[];
  macrotasks: QueueItem[];
  console: string[];
  highlight: "stack" | "microtask" | "macrotask" | "webapi" | "loop" | null;
}

const examples: { label: string; code: string; steps: EventLoopStep[] }[] = [
  {
    label: "setTimeout 0",
    code: `console.log("Start");
setTimeout(() => {
  console.log("Timeout");
}, 0);
console.log("End");`,
    steps: [
      { description: "Execution begins. The global context is pushed onto the Call Stack.", stack: [{ id: "g", name: "global", color: "#7c3aed" }], webApis: [], microtasks: [], macrotasks: [], console: [], highlight: "stack" },
      { description: 'console.log("Start") is called and logs "Start" immediately.', stack: [{ id: "g", name: "global", color: "#7c3aed" }, { id: "cl1", name: 'console.log("Start")', color: "#0891b2" }], webApis: [], microtasks: [], macrotasks: [], console: ["Start"], highlight: "stack" },
      { description: 'console.log returns and is popped off the stack.', stack: [{ id: "g", name: "global", color: "#7c3aed" }], webApis: [], microtasks: [], macrotasks: [], console: ["Start"], highlight: "stack" },
      { description: "setTimeout is called. The timer is handed off to the Web APIs environment to run in the background. setTimeout itself returns immediately.", stack: [{ id: "g", name: "global", color: "#7c3aed" }, { id: "sto", name: "setTimeout(..., 0)", color: "#d97706" }], webApis: [{ id: "t1", name: "Timer: 0ms callback", remaining: 0, total: 0, color: "#d97706" }], microtasks: [], macrotasks: [], console: ["Start"], highlight: "webapi" },
      { description: "setTimeout pops off the stack. The Web API timer expires immediately (0ms). The callback enters the Macrotask Queue.", stack: [{ id: "g", name: "global", color: "#7c3aed" }], webApis: [], microtasks: [], macrotasks: [{ id: "m1", name: '() => console.log("Timeout")', type: "macrotask", color: "#d97706" }], console: ["Start"], highlight: "macrotask" },
      { description: 'console.log("End") runs next — synchronous code ALWAYS runs before queued callbacks!', stack: [{ id: "g", name: "global", color: "#7c3aed" }, { id: "cl2", name: 'console.log("End")', color: "#0891b2" }], webApis: [], microtasks: [], macrotasks: [{ id: "m1", name: '() => console.log("Timeout")', type: "macrotask", color: "#d97706" }], console: ["Start", "End"], highlight: "stack" },
      { description: 'The global context finishes and pops off. The Call Stack is empty. The Event Loop now checks: any microtasks? No. Take the next macrotask!', stack: [], webApis: [], microtasks: [], macrotasks: [{ id: "m1", name: '() => console.log("Timeout")', type: "macrotask", color: "#d97706" }], console: ["Start", "End"], highlight: "loop" },
      { description: "The macrotask's callback is moved from the queue to the Call Stack.", stack: [{ id: "cb", name: '() => console.log("Timeout")', color: "#d97706" }], webApis: [], microtasks: [], macrotasks: [], console: ["Start", "End"], highlight: "stack" },
      { description: '"Timeout" is logged. The callback finishes and is popped off. All done!', stack: [], webApis: [], microtasks: [], macrotasks: [], console: ["Start", "End", "Timeout"], highlight: null },
    ],
  },
  {
    label: "Promise vs setTimeout",
    code: `console.log("Start");
setTimeout(() => {
  console.log("Timeout");
}, 0);
Promise.resolve().then(() => {
  console.log("Promise");
});
console.log("End");`,
    steps: [
      { description: "Execution begins in the global context.", stack: [{ id: "g", name: "global", color: "#7c3aed" }], webApis: [], microtasks: [], macrotasks: [], console: [], highlight: "stack" },
      { description: '"Start" is logged synchronously.', stack: [{ id: "g", name: "global", color: "#7c3aed" }], webApis: [], microtasks: [], macrotasks: [], console: ["Start"], highlight: "stack" },
      { description: "setTimeout callback goes to Web APIs, then its callback to the Macrotask Queue.", stack: [{ id: "g", name: "global", color: "#7c3aed" }], webApis: [], microtasks: [], macrotasks: [{ id: "m1", name: 'console.log("Timeout")', type: "macrotask", color: "#d97706" }], console: ["Start"], highlight: "macrotask" },
      { description: "Promise.resolve() creates an already-resolved promise. Its .then() callback goes to the Microtask Queue (higher priority than macrotasks!).", stack: [{ id: "g", name: "global", color: "#7c3aed" }], webApis: [], microtasks: [{ id: "p1", name: 'console.log("Promise")', type: "microtask", color: "#7c3aed" }], macrotasks: [{ id: "m1", name: 'console.log("Timeout")', type: "macrotask", color: "#d97706" }], console: ["Start"], highlight: "microtask" },
      { description: '"End" is logged. The synchronous code finishes.', stack: [{ id: "g", name: "global", color: "#7c3aed" }], webApis: [], microtasks: [{ id: "p1", name: 'console.log("Promise")', type: "microtask", color: "#7c3aed" }], macrotasks: [{ id: "m1", name: 'console.log("Timeout")', type: "macrotask", color: "#d97706" }], console: ["Start", "End"], highlight: "stack" },
      { description: "Call Stack is empty. Event Loop runs: drain ALL microtasks first! The Promise callback runs.", stack: [{ id: "pc", name: 'console.log("Promise")', color: "#7c3aed" }], webApis: [], microtasks: [], macrotasks: [{ id: "m1", name: 'console.log("Timeout")', type: "macrotask", color: "#d97706" }], console: ["Start", "End", "Promise"], highlight: "microtask" },
      { description: "Microtask queue is empty. Now take ONE macrotask. 'Timeout' logs. Promises always run before setTimeout!", stack: [], webApis: [], microtasks: [], macrotasks: [], console: ["Start", "End", "Promise", "Timeout"], highlight: null },
    ],
  },
];

const STEP_DURATION = 5000; // ms each step is shown during auto-play

export function EventLoopSimulator() {
  const [exIdx, setExIdx] = useState(0);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);

  const ex = examples[exIdx];
  const current = ex.steps[step];
  const totalSteps = ex.steps.length;

  // Auto-advance timer
  useEffect(() => {
    if (!playing) { setCountdown(0); return; }
    if (step >= totalSteps - 1) { setPlaying(false); setCountdown(0); return; }
    setCountdown(0);
    timerRef.current = setTimeout(() => setStep(s => s + 1), STEP_DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [playing, step, totalSteps]);

  // Countdown bar via requestAnimationFrame
  useEffect(() => {
    if (!playing || step >= totalSteps - 1) return;
    const start = performance.now();
    const tick = () => {
      const elapsed = performance.now() - start;
      setCountdown(Math.min(100, (elapsed / STEP_DURATION) * 100));
      if (elapsed < STEP_DURATION) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [playing, step, totalSteps]);

  const reset = () => { setStep(0); setPlaying(false); setCountdown(0); };

  const switchExample = (i: number) => { setExIdx(i); setStep(0); setPlaying(false); setCountdown(0); };

  const highlightStyle = (area: EventLoopStep["highlight"]) =>
    current.highlight === area ? { boxShadow: "0 0 0 2px var(--secondary)", borderColor: "var(--secondary)" } : {};

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "14px 20px", background: "var(--bg-surface-2)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)", fontSize: "1rem" }}>Event Loop Simulator</span>
          <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>Step through to see exactly how async JavaScript executes</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {/* Example selector */}
          {examples.map((e, i) => (
            <button key={i} onClick={() => switchExample(i)} style={{ padding: "5px 12px", borderRadius: 6, background: exIdx === i ? "rgba(139,92,246,0.2)" : "var(--bg-surface)", border: `1px solid ${exIdx === i ? "var(--primary)" : "var(--border)"}`, color: exIdx === i ? "var(--primary)" : "var(--text-muted)", fontSize: "0.75rem", cursor: "pointer", fontFamily: "var(--font-body)", fontWeight: 600, transition: "all 0.2s" }}>
              {e.label}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div style={{ padding: "12px 20px", background: "var(--bg-primary)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 7, padding: "6px 12px", cursor: step === 0 ? "not-allowed" : "pointer", color: "var(--text-muted)", opacity: step === 0 ? 0.4 : 1, display: "flex", alignItems: "center", gap: 4, fontSize: "0.8rem" }}>
          <ChevronLeft size={13} /> Prev
        </button>
        <button onClick={() => playing ? setPlaying(false) : setPlaying(true)} disabled={step >= totalSteps - 1}
          style={{ background: "linear-gradient(135deg, var(--primary), hsl(265,90%,50%))", border: "none", borderRadius: 7, padding: "6px 16px", cursor: step >= totalSteps - 1 ? "not-allowed" : "pointer", color: "white", fontSize: "0.85rem", fontWeight: 600, fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 6, opacity: step >= totalSteps - 1 ? 0.5 : 1 }}>
          {playing ? <><Pause size={12} /> Pause</> : <><Play size={12} fill="currentColor" /> Play</>}
        </button>
        <button onClick={() => setStep(s => Math.min(totalSteps - 1, s + 1))} disabled={step >= totalSteps - 1} style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 7, padding: "6px 12px", cursor: step >= totalSteps - 1 ? "not-allowed" : "pointer", color: "var(--text-muted)", opacity: step >= totalSteps - 1 ? 0.4 : 1, display: "flex", alignItems: "center", gap: 4, fontSize: "0.8rem" }}>
          Next <ChevronRight size={13} />
        </button>
        <button onClick={reset} style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 7, padding: "6px 10px", cursor: "pointer", color: "var(--text-muted)", display: "flex", alignItems: "center" }}>
          <RotateCcw size={12} />
        </button>
        <div style={{ flex: 1, height: 3, background: "var(--bg-surface-2)", borderRadius: 50, overflow: "hidden" }}>
          <motion.div style={{ height: "100%", background: "linear-gradient(90deg, var(--primary), var(--secondary))", borderRadius: 50 }} animate={{ width: `${((step + 1) / totalSteps) * 100}%` }} />
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-muted)" }}>{step + 1}/{totalSteps}</span>
      </div>

      {/* Main Content */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 400 }}>
        {/* Left: Code + Web APIs */}
        <div style={{ borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column" }}>
          {/* Code */}
          <div style={{ padding: 16, borderBottom: "1px solid var(--border)", flex: 1 }}>
            <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Source Code</p>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", lineHeight: 1.7, color: "var(--text-muted)" }}>
              {ex.code.split("\n").map((line, i) => (
                <div key={i} style={{ padding: "1px 0" }}>{line || " "}</div>
              ))}
            </div>
          </div>

          {/* Web APIs */}
          <div style={{ padding: 16, ...highlightStyle("webapi"), transition: "all 0.3s" }}>
            <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              🌐 Web APIs
            </p>
            <div style={{ minHeight: 50, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-start" }}>
              <AnimatePresence>
                {current.webApis.map(api => (
                  <motion.div key={api.id} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                    style={{ background: api.color + "15", border: `1px solid ${api.color}40`, borderRadius: 8, padding: "8px 12px", fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: api.color, fontWeight: 600 }}>
                    ⏱️ {api.name}
                  </motion.div>
                ))}
              </AnimatePresence>
              {current.webApis.length === 0 && <span style={{ color: "var(--text-muted)", fontSize: "0.78rem", opacity: 0.5 }}>No pending Web API operations</span>}
            </div>
          </div>
        </div>

        {/* Right: Stack + Queues */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Call Stack */}
          <div style={{ padding: 16, borderBottom: "1px solid var(--border)", flex: 1, ...highlightStyle("stack"), transition: "all 0.3s" }}>
            <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              📋 Call Stack
            </p>
            <div style={{ display: "flex", flexDirection: "column-reverse", gap: 5, minHeight: 100 }}>
              <AnimatePresence>
                {current.stack.map((frame) => (
                  <motion.div key={frame.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    style={{ background: frame.color + "18", border: `1px solid ${frame.color}50`, borderRadius: 7, padding: "7px 12px", fontFamily: "var(--font-mono)", fontSize: "0.78rem", fontWeight: 600, color: frame.color }}>
                    {frame.name}
                  </motion.div>
                ))}
              </AnimatePresence>
              {current.stack.length === 0 && <div style={{ color: "var(--text-muted)", fontSize: "0.78rem", opacity: 0.4, padding: "12px 0", textAlign: "center" }}>Stack empty</div>}
            </div>
          </div>

          {/* Queues */}
          <div style={{ padding: 16 }}>
            {/* Microtask Queue */}
            <div style={{ marginBottom: 12, background: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 8, padding: "10px 12px", ...highlightStyle("microtask"), transition: "all 0.3s" }}>
              <p style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "var(--primary)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>
                ⚡ Microtask Queue (Priority!)
              </p>
              <div style={{ display: "flex", gap: 6, minHeight: 28, alignItems: "center", flexWrap: "wrap" }}>
                <AnimatePresence>
                  {current.microtasks.map(item => (
                    <motion.div key={item.id} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.4)", borderRadius: 5, padding: "3px 8px", fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--primary)" }}>
                      {item.name}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {current.microtasks.length === 0 && <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", opacity: 0.4 }}>empty</span>}
              </div>
            </div>

            {/* Macrotask Queue */}
            <div style={{ background: "rgba(217,119,6,0.05)", border: "1px solid rgba(217,119,6,0.2)", borderRadius: 8, padding: "10px 12px", ...highlightStyle("macrotask"), transition: "all 0.3s" }}>
              <p style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "var(--accent)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>
                📦 Macrotask Queue (setTimeout etc.)
              </p>
              <div style={{ display: "flex", gap: 6, minHeight: 28, alignItems: "center", flexWrap: "wrap" }}>
                <AnimatePresence>
                  {current.macrotasks.map(item => (
                    <motion.div key={item.id} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} style={{ background: "rgba(217,119,6,0.15)", border: "1px solid rgba(217,119,6,0.4)", borderRadius: 5, padding: "3px 8px", fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--accent)" }}>
                      {item.name}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {current.macrotasks.length === 0 && <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", opacity: 0.4 }}>empty</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description + Console */}
      <div style={{ borderTop: "1px solid var(--border)", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ padding: 16, borderRight: "1px solid var(--border)" }}>
          <motion.div key={step} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>📖 What&apos;s happening</p>
            <p style={{ fontSize: "0.85rem", color: "var(--text)", lineHeight: 1.6 }}>{current.description}</p>

            {/* Countdown bar */}
            {playing && step < totalSteps - 1 && (
              <div style={{ marginTop: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", opacity: 0.6 }}>Next step in...</span>
                  <span style={{ fontSize: "0.65rem", color: "var(--secondary)", fontFamily: "var(--font-mono)" }}>
                    {Math.ceil(((100 - countdown) / 100) * (STEP_DURATION / 1000))}s
                  </span>
                </div>
                <div style={{ height: 3, background: "var(--bg-surface-2)", borderRadius: 50, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${countdown}%`, background: "linear-gradient(90deg, var(--primary), var(--secondary))", borderRadius: 50, transition: "width 0.1s linear" }} />
                </div>
              </div>
            )}
          </motion.div>
        </div>
        <div style={{ padding: 16, background: "var(--bg-primary)" }}>
          <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>🖥️ Console Output</p>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", display: "flex", flexDirection: "column", gap: 3, minHeight: 60 }}>
            <AnimatePresence>
              {current.console.map((line, i) => (
                <motion.div key={i + line} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ color: "var(--success)", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ opacity: 0.5, fontSize: "0.7rem" }}>&gt;</span> {line}
                </motion.div>
              ))}
            </AnimatePresence>
            {current.console.length === 0 && <span style={{ opacity: 0.3, fontSize: "0.8rem", color: "var(--text-muted)" }}>// No output yet...</span>}
          </div>
        </div>
      </div>

      {/* Event Loop Arrow */}
      <AnimatePresence>
        {current.highlight === "loop" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ padding: "12px 20px", background: "rgba(6,182,212,0.08)", borderTop: "1px solid rgba(6,182,212,0.2)", display: "flex", alignItems: "center", gap: 8 }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} style={{ fontSize: "1.2rem" }}>🔄</motion.div>
            <span style={{ color: "var(--secondary)", fontSize: "0.875rem", fontWeight: 600 }}>Event Loop is checking: Is the Call Stack empty? Drain microtasks, then take one macrotask...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Promise State Machine ──────────────────────────────────────────────────────

type PromiseState = "pending" | "fulfilled" | "rejected";

export function PromiseStateMachine() {
  const [state, setState] = useState<PromiseState>("pending");
  const [value, setValue] = useState<string>("");
  const [chain, setChain] = useState<{ state: PromiseState; value: string }[]>([]);

  const resolve = () => {
    const val = value || "42";
    setState("fulfilled");
    setChain(c => [...c, { state: "fulfilled", value: val }]);
  };

  const reject = () => {
    const val = value || "Error: Something went wrong";
    setState("rejected");
    setChain(c => [...c, { state: "rejected", value: val }]);
  };

  const reset = () => { setState("pending"); setValue(""); setChain([]); };

  const stateColors: Record<PromiseState, { color: string; bg: string; icon: string; label: string }> = {
    pending: { color: "#d97706", bg: "rgba(217,119,6,0.15)", icon: "⏳", label: "pending" },
    fulfilled: { color: "#059669", bg: "rgba(5,150,105,0.15)", icon: "✅", label: "fulfilled" },
    rejected: { color: "#dc2626", bg: "rgba(220,38,38,0.15)", icon: "❌", label: "rejected" },
  };

  const c = stateColors[state];

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ padding: "14px 20px", background: "var(--bg-surface-2)", borderBottom: "1px solid var(--border)" }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--text)" }}>Promise State Machine</span>
        <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 4 }}>Create a Promise and control its fate</p>
      </div>

      <div style={{ padding: 24 }}>
        {/* Promise bubble */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 28 }}>
          <motion.div
            animate={{
              background: c.bg,
              borderColor: c.color,
              scale: state === "pending" ? [1, 1.02, 1] : 1,
            }}
            transition={{ scale: { duration: 2, repeat: Infinity } }}
            style={{ width: 160, height: 160, borderRadius: "50%", border: `3px solid ${c.color}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: `0 0 40px ${c.color}30` }}
          >
            <span style={{ fontSize: "3rem", lineHeight: 1 }}>{c.icon}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: c.color, fontSize: "0.9rem" }}>{c.label}</span>
          </motion.div>

          {/* Arrow down to value badge */}
          {state !== "pending" && chain.length > 0 && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 12, textAlign: "center" }}>
              <div style={{ color: "var(--text-muted)", fontSize: "1rem", marginBottom: 6 }}>↓</div>
              <div style={{ background: c.bg, border: `1px solid ${c.color}50`, borderRadius: 8, padding: "8px 16px", fontFamily: "var(--font-mono)", color: c.color, fontSize: "0.85rem" }}>
                {chain[chain.length - 1].value}
              </div>
            </motion.div>
          )}
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <input
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Resolution value (optional)"
            style={{ flex: 1, minWidth: 180, background: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 14px", color: "var(--text)", fontFamily: "var(--font-mono)", fontSize: "0.85rem", outline: "none" }}
          />
          <button onClick={resolve} disabled={state !== "pending"} style={{ padding: "8px 18px", borderRadius: 8, background: state === "pending" ? "rgba(5,150,105,0.15)" : "var(--bg-surface-2)", border: `1px solid ${state === "pending" ? "rgba(5,150,105,0.4)" : "var(--border)"}`, color: state === "pending" ? "var(--success)" : "var(--text-muted)", fontWeight: 600, cursor: state === "pending" ? "pointer" : "not-allowed", opacity: state === "pending" ? 1 : 0.5, fontSize: "0.85rem", fontFamily: "var(--font-body)" }}>
            ✅ resolve()
          </button>
          <button onClick={reject} disabled={state !== "pending"} style={{ padding: "8px 18px", borderRadius: 8, background: state === "pending" ? "rgba(220,38,38,0.15)" : "var(--bg-surface-2)", border: `1px solid ${state === "pending" ? "rgba(220,38,38,0.4)" : "var(--border)"}`, color: state === "pending" ? "var(--error)" : "var(--text-muted)", fontWeight: 600, cursor: state === "pending" ? "pointer" : "not-allowed", opacity: state === "pending" ? 1 : 0.5, fontSize: "0.85rem", fontFamily: "var(--font-body)" }}>
            ❌ reject()
          </button>
          <button onClick={reset} style={{ padding: "8px 14px", borderRadius: 8, background: "var(--bg-surface-2)", border: "1px solid var(--border)", color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
            <RotateCcw size={13} />
          </button>
        </div>

        {/* States explanation */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {[
            { state: "pending", icon: "⏳", desc: "Initial state. The async operation hasn't completed yet." },
            { state: "fulfilled", icon: "✅", desc: "Operation succeeded. .then() callbacks will run." },
            { state: "rejected", icon: "❌", desc: "Operation failed. .catch() callbacks will run." },
          ].map(s => (
            <div key={s.state} style={{ background: state === s.state ? stateColors[s.state as PromiseState].bg : "var(--bg-surface-2)", border: `1px solid ${state === s.state ? stateColors[s.state as PromiseState].color + "50" : "var(--border)"}`, borderRadius: 8, padding: "10px 12px", transition: "all 0.3s" }}>
              <div style={{ fontSize: "1.2rem", marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, color: state === s.state ? stateColors[s.state as PromiseState].color : "var(--text-muted)", marginBottom: 4 }}>{s.state}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", lineHeight: 1.4 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
