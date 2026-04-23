"use client";

import { FadeInSection } from "@/components/animations/FadeInSection";
import { CodeBlock, QuizCard, ConceptCard } from "@/components/interactive/components";
import { ClosureDemo, HoistingVisualizer } from "@/components/visualizers/Module6Visualizers";
import { Lock, ArrowUp, AlertTriangle } from "lucide-react";

export function Module6Content() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>

      <FadeInSection>
        <div style={{ background: "linear-gradient(135deg, rgba(219,39,119,0.08), rgba(139,92,246,0.06))", border: "1px solid rgba(219,39,119,0.2)", borderRadius: 14, padding: "24px 28px" }}>
          <p style={{ fontSize: "1.05rem", color: "var(--text)", lineHeight: 1.9 }}>
            🔮 <strong>Closures and hoisting are two of JavaScript&apos;s deepest &quot;behind the scenes&quot; behaviours.</strong>
            Closures power patterns you&apos;ll use every day — like React hooks, event listeners, and factory functions.
            Hoisting explains the surprising way JavaScript can use functions before they&apos;re defined. Understanding both will set you apart.
          </p>
        </div>
      </FadeInSection>

      {/* Closures */}
      <FadeInSection>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(219,39,119,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Lock size={18} style={{ color: "#db2777" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              Closures — Functions That Remember
            </h2>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            A <strong style={{ color: "var(--text)" }}>closure</strong> happens when a function &quot;remembers&quot; the variables from the scope where it was created — even after that outer scope has finished running.
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Think of it like this: when a function is created inside another function, it carries a <strong style={{ color: "var(--text)" }}>backpack</strong> of all the variables from its parent scope. Even after the parent function finishes and disappears, the inner function still has its backpack — and can still use those variables.
          </p>
          <CodeBlock
            code={`function makeCounter() {\n  let count = 0; // This variable lives in the 'backpack'\n\n  return function() {\n    count++;     // The inner function uses 'count' from its backpack\n    return count;\n  };\n}\n\n// makeCounter() runs and FINISHES — normally 'count' would disappear.\n// But the returned function still has a reference to it!\nconst counter = makeCounter();\n\ncounter(); // 1 — count is still accessible via the closure\ncounter(); // 2\ncounter(); // 3\n\n// Create a SECOND counter — it gets its OWN private count:\nconst counter2 = makeCounter();\ncounter2(); // 1  (completely independent from counter!)"`}
            title="closures.js"
            highlightLines={[2, 5, 14, 15, 16]}
          />
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Each call to <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>makeCounter()</code> creates a brand new <code style={{ fontFamily: "var(--font-mono)" }}>count</code> variable — completely independent from any other counter. This is the magic of closures: <strong style={{ color: "var(--text)" }}>private state</strong>!
          </p>
          <ClosureDemo />
          <ConceptCard icon={<Lock size={16} />} title="Closures in the real world — you use them every day" variant="info">
            <strong>Event handlers:</strong> <code style={{ fontFamily: "var(--font-mono)" }}>button.addEventListener("click", () ={">"} console.log(username))</code> — the callback closes over <code style={{ fontFamily: "var(--font-mono)" }}>username</code>.
            <br /><br />
            <strong>React&apos;s useState:</strong> The setter function <code style={{ fontFamily: "var(--font-mono)" }}>setCount</code> is a closure — it remembers which state slot to update even after the component renders again.
            <br /><br />
            <strong>setTimeout with data:</strong> <code style={{ fontFamily: "var(--font-mono)" }}>setTimeout(() ={">"} sendEmail(user.email), 5000)</code> — the callback closes over <code style={{ fontFamily: "var(--font-mono)" }}>user</code> and will still have it 5 seconds later.
            <br /><br />
            <strong>Module pattern:</strong> Exposing only specific functions from a module, while keeping internal variables private — impossible without closures.
          </ConceptCard>
        </div>
      </FadeInSection>

      {/* Hoisting */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(251,191,36,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ArrowUp size={18} style={{ color: "var(--accent)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              Hoisting — JavaScript&apos;s Invisible Rearrangement
            </h2>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Before executing any code, JavaScript does a quick first pass through the file.
            During this pass, it &quot;hoists&quot; (moves) <strong style={{ color: "var(--text)" }}>function declarations</strong> and <strong style={{ color: "var(--text)" }}>var declarations</strong> to the top of their scope.
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            This is why you can call a function <em>before the line it appears on</em>. Toggle through the three phases to see exactly what JavaScript does with your code:
          </p>
          <HoistingVisualizer />
          <ConceptCard icon={<AlertTriangle size={16} />} title="let and const are NOT hoisted the same way (Temporal Dead Zone)" variant="warning">
            <code style={{ fontFamily: "var(--font-mono)" }}>var</code> gets hoisted and initialised to <code style={{ fontFamily: "var(--font-mono)" }}>undefined</code> — which is why <code style={{ fontFamily: "var(--font-mono)" }}>console.log(x)</code> before <code style={{ fontFamily: "var(--font-mono)" }}>var x = 5</code> prints <code style={{ fontFamily: "var(--font-mono)" }}>undefined</code> instead of crashing.
            <br /><br />
            <code style={{ fontFamily: "var(--font-mono)" }}>let</code> and <code style={{ fontFamily: "var(--font-mono)" }}>const</code> are also technically hoisted — but they&apos;re placed in the <strong>Temporal Dead Zone (TDZ)</strong>. Trying to access them before their declaration line throws a <code style={{ fontFamily: "var(--font-mono)" }}>ReferenceError</code> — a much better error than silently getting <code style={{ fontFamily: "var(--font-mono)" }}>undefined</code>!
            <br /><br />
            This is another reason to always use <code style={{ fontFamily: "var(--font-mono)" }}>const</code>/<code style={{ fontFamily: "var(--font-mono)" }}>let</code> — their error messages tell you exactly what went wrong.
          </ConceptCard>
        </div>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>🧠 Quick Check</h2>
          <QuizCard
            question="What is a closure?"
            options={[
              { label: "A way to close (terminate) a function early", correct: false, explanation: "That would be the 'return' statement. Closures are about remembering — not terminating." },
              { label: "A function that has access to variables from its outer scope, even after that outer function has returned", correct: true, explanation: "Exactly! When a function is created inside another, it forms a 'closure' — it captures a reference to the outer variables. Even after the outer function finishes, those variables stay alive as long as the inner function exists." },
              { label: "A private class method", correct: false, explanation: "Close conceptually — closures can create private state — but a closure isn't tied to classes. Any nested function creates a closure, even in plain functions." },
              { label: "When a function calls itself recursively", correct: false, explanation: "That's recursion, not a closure. Closures and recursion are completely separate concepts." },
            ]}
            hint="Think about the 'backpack' analogy — what does the inner function carry with it?"
          />
        </div>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <div style={{ background: "linear-gradient(135deg, rgba(219,39,119,0.06), rgba(139,92,246,0.08))", border: "1px solid rgba(219,39,119,0.2)", borderRadius: 14, padding: "24px 28px" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>📚 What You Just Learned</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "A closure is a function that remembers its outer scope's variables even after the outer function has finished. The inner function carries a 'backpack' of references to the variables it needs.",
              "Closures create private state — each call to the outer function creates a fresh, independent set of variables. This is how React's useState, event handlers, and module patterns all work.",
              "Hoisting is JavaScript's internal 'first pass' before execution. Function declarations are hoisted in full (you can call them before they appear in the code). var declarations are hoisted as undefined (the value isn't assigned until execution reaches that line).",
              "let and const are in the Temporal Dead Zone (TDZ) — technically hoisted but inaccessible. Accessing them early gives a ReferenceError — a much more helpful error than var's silent undefined.",
              "Practical takeaway: use function declarations for top-level helpers (enjoy the hoisting). Use const/let everywhere else. Never rely on var hoisting — it exists to confuse you.",
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#db2777", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{i + 1}</span>
                <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.7 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

    </div>
  );
}
