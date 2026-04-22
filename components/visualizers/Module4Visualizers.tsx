"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, ChevronRight, ChevronLeft } from "lucide-react";

const STEP_DURATION = 5000;

// ── If/Else Flowchart ──────────────────────────────────────────────────────────

export function IfElseFlowchart() {
  const [score, setScore] = useState(72);

  const getGrade = (s: number) => {
    if (s >= 90) return { grade: "A", msg: "Excellent! 🏆", color: "var(--success)", branch: "A" };
    if (s >= 80) return { grade: "B", msg: "Great job! 🎉", color: "var(--secondary)", branch: "B" };
    if (s >= 70) return { grade: "C", msg: "Good work! 👍", color: "var(--accent)", branch: "C" };
    if (s >= 60) return { grade: "D", msg: "Keep trying! 💪", color: "#f97316", branch: "D" };
    return { grade: "F", msg: "Let's review together 📚", color: "var(--error)", branch: "F" };
  };

  const result = getGrade(score);

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>📊 if / else if / else — Live Flowchart</p>
      <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: 20, lineHeight: 1.6 }}>
        Drag the slider to change the exam score. Watch exactly which branch of the if/else chain lights up — this is exactly what JavaScript evaluates, step by step.
      </p>

      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 24 }}>
        <span style={{ color: "var(--text-muted)", fontSize: "0.85rem", minWidth: 70 }}>Score: <strong style={{ color: "var(--text)" }}>{score}</strong></span>
        <input type="range" min="0" max="100" value={score} onChange={e => setScore(Number(e.target.value))}
          style={{ flex: 1, accentColor: "var(--primary)", cursor: "pointer", height: 6 }} />
        <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>100</span>
      </div>

      {/* Flowchart */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
        {/* Start */}
        <div style={{ background: "var(--bg-surface-2)", border: "1px solid var(--border)", borderRadius: 50, padding: "8px 24px", fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-muted)" }}>
          score = {score}
        </div>
        <div style={{ width: 2, height: 16, background: "var(--border)" }} />

        {/* Condition chain */}
        {[
          { cond: `score >= 90`, grade: "A", color: "var(--success)" },
          { cond: `score >= 80`, grade: "B", color: "var(--secondary)" },
          { cond: `score >= 70`, grade: "C", color: "var(--accent)" },
          { cond: `score >= 60`, grade: "D", color: "#f97316" },
        ].map((branch, i) => {
          const active = result.branch === branch.grade;
          const alreadyPassed = ["A","B","C","D","F"].indexOf(result.branch) > i;
          const checked = active || alreadyPassed;
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
              <motion.div animate={{ background: active ? branch.color + "20" : "var(--bg-primary)", borderColor: active ? branch.color : "var(--border)" }}
                style={{ border: "2px solid", borderRadius: 10, padding: "10px 20px", width: "80%", textAlign: "center", transition: "all 0.3s" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: active ? branch.color : "var(--text-muted)", fontWeight: active ? 700 : 400 }}>
                  {branch.cond} ?
                </div>
              </motion.div>
              <div style={{ display: "flex", width: "80%", marginTop: 0 }}>
                {/* YES branch */}
                <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", paddingRight: 20 }}>
                  <AnimatePresence>
                    {active && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        style={{ background: branch.color + "20", border: `2px solid ${branch.color}`, borderRadius: 8, padding: "6px 16px", fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: branch.color, fontWeight: 700, marginTop: 8 }}>
                        ✓ Grade {branch.grade}!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {/* NO arrow */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", paddingLeft: 20 }}>
                  <div style={{ width: 2, height: 16, background: "var(--border)", marginTop: 4 }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-muted)" }}>↓ else</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Final else */}
        <motion.div animate={{ background: result.branch === "F" ? "rgba(239,68,68,0.12)" : "var(--bg-primary)", borderColor: result.branch === "F" ? "var(--error)" : "var(--border)" }}
          style={{ border: "2px solid", borderRadius: 10, padding: "10px 24px", fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: result.branch === "F" ? "var(--error)" : "var(--text-muted)", transition: "all 0.3s", fontWeight: result.branch === "F" ? 700 : 400 }}>
          else → Grade F
        </motion.div>

        <div style={{ width: 2, height: 16, background: "var(--border)" }} />

        {/* Result */}
        <motion.div key={result.grade} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          style={{ background: result.color + "15", border: `2px solid ${result.color}`, borderRadius: 12, padding: "14px 32px", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "2rem", fontWeight: 800, color: result.color }}>{result.grade}</div>
          <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: 4 }}>{result.msg}</div>
        </motion.div>
      </div>

      <div style={{ marginTop: 20, background: "var(--bg-primary)", borderRadius: 10, padding: "12px 16px", fontFamily: "var(--font-mono)", fontSize: "0.78rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
        {`if (score >= 90) grade = "A";\nelse if (score >= 80) grade = "B";\nelse if (score >= 70) grade = "C";\nelse if (score >= 60) grade = "D";\nelse grade = "F";`}
      </div>
    </div>
  );
}

// ── Loop Visualizer ───────────────────────────────────────────────────────────

export function LoopVisualizer() {
  const [loopType, setLoopType] = useState<"for" | "while" | "forEach">("for");
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);

  const items = ["🍎 Apple", "🍌 Banana", "🍇 Grape", "🍊 Orange", "🍓 Strawberry"];
  const totalSteps = items.length + 1; // +1 for "done" state

  useEffect(() => {
    if (!playing) { setCountdown(0); return; }
    if (step >= totalSteps - 1) { setPlaying(false); setCountdown(0); return; }
    setCountdown(0);
    timerRef.current = setTimeout(() => setStep(s => s + 1), STEP_DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [playing, step, totalSteps]);

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

  const codeMap = {
    for: `for (let i = 0; i < fruits.length; i++) {\n  console.log(fruits[i]);\n}`,
    while: `let i = 0;\nwhile (i < fruits.length) {\n  console.log(fruits[i]);\n  i++;\n}`,
    forEach: `fruits.forEach((fruit, i) => {\n  console.log(fruit);\n});`,
  };

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ padding: "14px 20px", background: "var(--bg-surface-2)", borderBottom: "1px solid var(--border)", display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)", marginRight: 8, flex: 1 }}>🔄 Loop Step-Through</span>
        {(["for", "while", "forEach"] as const).map(t => (
          <button key={t} onClick={() => { setLoopType(t); reset(); }}
            style={{ padding: "4px 14px", borderRadius: 6, background: loopType === t ? "rgba(139,92,246,0.2)" : "var(--bg-surface)", border: `1px solid ${loopType === t ? "var(--primary)" : "var(--border)"}`, color: loopType === t ? "var(--primary)" : "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.78rem", cursor: "pointer", fontWeight: 600 }}>
            {t}
          </button>
        ))}
        <button onClick={() => playing ? setPlaying(false) : (step >= totalSteps - 1 ? (reset(), setTimeout(() => setPlaying(true), 50)) : setPlaying(true))}
          style={{ background: "linear-gradient(135deg, var(--primary), hsl(265,90%,50%))", border: "none", borderRadius: 7, padding: "6px 14px", cursor: "pointer", color: "white", fontWeight: 600, fontFamily: "var(--font-body)", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 5 }}>
          <Play size={11} fill="currentColor" /> {playing ? "Pause" : step >= totalSteps - 1 ? "Replay" : "Play"}
        </button>
        <button onClick={() => setStep(s => Math.min(totalSteps - 1, s + 1))} disabled={step >= totalSteps - 1}
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 7, padding: "6px 10px", cursor: "pointer", color: "var(--text-muted)", opacity: step >= totalSteps - 1 ? 0.4 : 1 }}>
          <ChevronRight size={13} />
        </button>
        <button onClick={reset} style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 7, padding: "6px 10px", cursor: "pointer", color: "var(--text-muted)" }}>
          <RotateCcw size={12} />
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 260 }}>
        {/* Array visualized */}
        <div style={{ padding: 20, borderRight: "1px solid var(--border)" }}>
          <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>fruits array</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {items.map((item, i) => {
              const processed = step > i;
              const active = step === i;
              return (
                <motion.div key={i} animate={{ background: active ? "rgba(139,92,246,0.15)" : processed ? "rgba(5,150,105,0.08)" : "var(--bg-primary)", borderColor: active ? "var(--primary)" : processed ? "var(--success)" : "var(--border)", scale: active ? 1.02 : 1 }}
                  style={{ border: "1px solid", borderRadius: 8, padding: "8px 14px", display: "flex", alignItems: "center", gap: 10, transition: "all 0.3s" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", minWidth: 40 }}>i = {i}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: active ? "var(--primary)" : processed ? "var(--success)" : "var(--text)", flex: 1 }}>{item}</span>
                  {active && <span style={{ fontSize: "0.7rem", color: "var(--primary)", fontWeight: 700 }}>← current</span>}
                  {processed && <span style={{ fontSize: "0.9rem" }}>✓</span>}
                </motion.div>
              );
            })}
          </div>
          {step === totalSteps - 1 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: 12, textAlign: "center", color: "var(--success)", fontWeight: 700, fontSize: "0.9rem" }}>
              ✅ Loop complete! All 5 items processed.
            </motion.div>
          )}
        </div>

        {/* Console output + code */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ padding: 16, flex: 1, borderBottom: "1px solid var(--border)" }}>
            <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>console output</p>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", display: "flex", flexDirection: "column", gap: 3 }}>
              <AnimatePresence>
                {items.slice(0, step).map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    style={{ color: "var(--success)", display: "flex", gap: 8 }}>
                    <span style={{ opacity: 0.5 }}>{">"}</span> {item}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          <div style={{ padding: 16, background: "var(--bg-primary)" }}>
            <p style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase" }}>code</p>
            <pre style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.7, whiteSpace: "pre" }}>
              {codeMap[loopType]}
            </pre>
          </div>
        </div>
      </div>

      {/* Countdown */}
      {playing && step < totalSteps - 1 && (
        <div style={{ padding: "8px 20px", borderTop: "1px solid var(--border)", background: "var(--bg-surface-2)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
            <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", opacity: 0.6 }}>Next iteration in...</span>
            <span style={{ fontSize: "0.65rem", color: "var(--primary)", fontFamily: "var(--font-mono)" }}>{Math.ceil(((100 - countdown) / 100) * (STEP_DURATION / 1000))}s</span>
          </div>
          <div style={{ height: 3, background: "var(--bg-primary)", borderRadius: 50, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${countdown}%`, background: "linear-gradient(90deg, var(--primary), var(--secondary))", borderRadius: 50, transition: "width 0.1s linear" }} />
          </div>
        </div>
      )}
    </div>
  );
}
