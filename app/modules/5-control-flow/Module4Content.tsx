"use client";

import { FadeInSection } from "@/components/animations/FadeInSection";
import { CodeBlock, QuizCard, ConceptCard } from "@/components/interactive/components";
import { IfElseFlowchart, LoopVisualizer } from "@/components/visualizers/Module4Visualizers";
import { GitBranch, RefreshCcw, Info } from "lucide-react";

export function Module4Content() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>

      <FadeInSection>
        <div style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.10), rgba(6,182,212,0.06))", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 14, padding: "24px 28px" }}>
          <p style={{ fontSize: "1.05rem", color: "var(--text)", lineHeight: 1.9 }}>
            🚦 <strong>Code doesn&apos;t always run top to bottom.</strong> Sometimes it needs to take a different path based on a condition. Sometimes it needs to repeat the same action many times.
            Control flow is how you tell JavaScript <em>which way to go</em> and <em>how many times</em>. It&apos;s the brain of any program.
          </p>
        </div>
      </FadeInSection>

      {/* JS characteristic: Single-threaded */}
      <FadeInSection>
        <div style={{ background: "var(--bg-surface-2)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 12, padding: 18, display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{ fontSize: "1.8rem", flexShrink: 0 }}>🧵</div>
          <div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--primary)", fontSize: "1rem", marginBottom: 6 }}>JavaScript is Single-Threaded</div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.7 }}>
              This is a fundamental fact about JavaScript: it can only do <strong style={{ color: "var(--text)" }}>ONE thing at a time</strong>, running your statements <strong style={{ color: "var(--text)" }}>one after another, top to bottom</strong>.
              It never runs two lines simultaneously. That&apos;s why the order of your <code style={{ fontFamily: "var(--font-mono)" }}>if</code>/<code style={{ fontFamily: "var(--font-mono)" }}>else</code> branches matters — JS checks them in sequence and takes the first match.
              You&apos;ll see later (Module 10) how JavaScript handles tasks that take a long time (like loading data from a server) without freezing — but the key rule is always: <em>one thing at a time</em>.
            </p>
          </div>
        </div>
      </FadeInSection>

      {/* if/else */}
      <FadeInSection>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(139,92,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GitBranch size={18} style={{ color: "var(--primary)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              if / else if / else — Following a Decision Tree
            </h2>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            An <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>if</code> statement is a fork in the road. JavaScript evaluates your condition, and if it&apos;s truthy, it takes the left path. Otherwise, it checks <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>else if</code>, and so on.
            Only ONE branch ever runs — the first one whose condition is true.
          </p>
          <IfElseFlowchart />
          <CodeBlock
            code={`// Simple if/else:\nif (isRaining) {\n  console.log("Take an umbrella!");\n} else {\n  console.log("No umbrella needed!");\n}\n\n// Chain with else if — only the FIRST true branch runs:\nconst hour = new Date().getHours();\n\nif (hour < 12) {\n  greeting = "Good morning!";\n} else if (hour < 18) {\n  greeting = "Good afternoon!";\n} else {\n  greeting = "Good evening!";\n}\n\n// Note: without 'else', NO branch might run — all conditions could be false`}
            title="if-else.js"
          />
          <ConceptCard icon={<Info size={16} />} title='"Truthy" and "Falsy" — JavaScript is flexible about booleans' variant="info">
            An <code style={{ fontFamily: "var(--font-mono)" }}>if</code> statement doesn&apos;t strictly need a boolean — it accepts ANY value and treats it as true or false.
            <br /><br />
            <strong>Falsy values</strong> (treated as false): <code style={{ fontFamily: "var(--font-mono)" }}>false</code>, <code style={{ fontFamily: "var(--font-mono)" }}>0</code>, <code style={{ fontFamily: "var(--font-mono)" }}>""</code>, <code style={{ fontFamily: "var(--font-mono)" }}>null</code>, <code style={{ fontFamily: "var(--font-mono)" }}>undefined</code>, <code style={{ fontFamily: "var(--font-mono)" }}>NaN</code>
            <br />
            <strong>Truthy values</strong> (everything else): numbers (even negative!), non-empty strings, arrays (even empty <code style={{ fontFamily: "var(--font-mono)" }}>[]</code>!), objects (<code style={{ fontFamily: "var(--font-mono)" }}>{"{}"}  </code>), etc.
            <br /><br />
            So <code style={{ fontFamily: "var(--font-mono)" }}>if (myArray.length)</code> checks if the array has items — no explicit <code style={{ fontFamily: "var(--font-mono)" }}>=== 0</code> needed!
          </ConceptCard>
        </div>
      </FadeInSection>

      {/* switch */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
            switch — Cleaner Multi-Branch Logic
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            When you&apos;re checking the same variable against many specific values, a <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>switch</code> statement is often cleaner than a long chain of <code style={{ fontFamily: "var(--font-mono)" }}>else if</code>:
          </p>
          <CodeBlock
            code={`const day = "Monday";\n\nswitch (day) {\n  case "Monday":\n  case "Tuesday":\n  case "Wednesday":\n  case "Thursday":\n  case "Friday":\n    console.log("Weekday — work time!");\n    break; // IMPORTANT: without break, execution falls through!\n\n  case "Saturday":\n  case "Sunday":\n    console.log("Weekend! 🎉");\n    break;\n\n  default:\n    // Runs if nothing matches — like the 'else' at the end\n    console.log("Unknown day");\n}\n\n// ⚠️ Always include 'break'! Without it, execution continues\n// into the NEXT case (called 'fall-through') — usually a bug.`}
            title="switch.js"
            highlightLines={[10]}
          />
        </div>
      </FadeInSection>

      {/* Loops */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(6,182,212,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <RefreshCcw size={18} style={{ color: "var(--secondary)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              Loops — Do It Again (and Again)
            </h2>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Loops let you repeat a block of code without copy-pasting it. JavaScript has 3 main loop types — each with a different philosophy. Watch each one iterate through the same array:
          </p>
          <LoopVisualizer />
          <CodeBlock
            code={`const fruits = ["Apple", "Banana", "Grape"];\n\n// FOR loop — when you know how many times to repeat:\nfor (let i = 0; i < fruits.length; i++) {\n  console.log(i, fruits[i]);\n}\n\n// WHILE loop — when you repeat until a condition changes:\nlet count = 0;\nwhile (count < 3) {\n  count++;\n  console.log("Count:", count);\n}\n\n// for...of — the cleanest way to loop over arrays:\nfor (const fruit of fruits) {\n  console.log(fruit); // no index needed!\n}\n\n// for...in — loops over object KEYS (not values!):\nconst user = { name: "Alice", age: 25 };\nfor (const key in user) {\n  console.log(key, user[key]); // "name Alice", "age 25"\n}\n\n// break — stop the loop early\n// continue — skip the current iteration only`}
            title="loops.js"
            highlightLines={[15, 16, 17]}
          />
        </div>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>🧠 Quick Check</h2>
          <QuizCard
            question='Which is the best loop to use when iterating over all items in an array?'
            options={[
              { label: "for (let i = 0; ...)", correct: false, explanation: "A classic for loop works, but it's verbose. You have to manage the index manually, which opens the door to off-by-one bugs (like using <= instead of < and going out of bounds)." },
              { label: "for...of", correct: true, explanation: "for...of is the cleanest, safest way to loop over arrays. You get each value directly without managing any index. Use for...in for objects, for...of for arrays and iterables." },
              { label: "while", correct: false, explanation: "while works but is less idiomatic for arrays. It shines when you don't know ahead of time how many iterations you need — like 'keep looping until the user types quit'." },
              { label: "for...in", correct: false, explanation: "for...in loops over object KEYS, not array values. On an array it gives you '0', '1', '2'... the index strings — not the values. It also loops over any inherited properties, which can be surprising." },
            ]}
            hint="Which one gives you the value directly without an index?"
          />
        </div>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <div style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(6,182,212,0.08))", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 14, padding: "24px 28px" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>📚 What You Just Learned</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "if/else if/else creates branching logic — only the FIRST true branch runs. else is the catch-all if nothing matches. Without else, no branch might run at all.",
              "Truthy/falsy: JavaScript treats 6 values as false (false, 0, '', null, undefined, NaN) and everything else as true. Empty arrays [] and objects {} are TRUTHY — don't let that catch you out!",
              "switch is cleaner than long else-if chains when checking one variable against many values. Always include break — otherwise execution falls through into the next case (almost always a bug!).",
              "for loops are for when you know the count upfront. while loops continue until a condition becomes false. for...of cleanly iterates array values. for...in iterates object keys.",
              "break exits a loop immediately. continue skips to the next iteration. Both work in all loop types.",
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{i + 1}</span>
                <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.7 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

    </div>
  );
}
