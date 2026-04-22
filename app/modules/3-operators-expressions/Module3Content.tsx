"use client";

import { FadeInSection } from "@/components/animations/FadeInSection";
import { CodeBlock, QuizCard, ConceptCard } from "@/components/interactive/components";
import { OperatorPlayground, ShortCircuitVisualizer } from "@/components/visualizers/Module3Visualizers";
import { Hash, Zap, GitBranch, Info, AlertTriangle } from "lucide-react";

export function Module3Content() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>

      <FadeInSection>
        <div style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.08), rgba(139,92,246,0.06))", border: "1px solid rgba(6,182,212,0.2)", borderRadius: 14, padding: "24px 28px" }}>
          <p style={{ fontSize: "1.05rem", color: "var(--text)", lineHeight: 1.9 }}>
            ➗ <strong>Operators are the verbs of JavaScript.</strong> They tell the computer what to <em>do</em> with values — add them, compare them, combine them, check them.
            By the end of this module you&apos;ll understand every operator you&apos;ll encounter in real code, and some famous quirks that trip up even experienced developers.
          </p>
        </div>
      </FadeInSection>

      {/* Arithmetic */}
      <FadeInSection>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(6,182,212,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Hash size={18} style={{ color: "var(--secondary)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              Arithmetic Operators — The Basics
            </h2>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            These do exactly what you learned in school — with a few extra JavaScript-specific ones:
          </p>
          <CodeBlock
            code={`// The standard ones:\n10 + 3   // 13  — addition\n10 - 3   // 7   — subtraction\n10 * 3   // 30  — multiplication\n10 / 3   // 3.333... — division (always returns a decimal if needed)\n10 % 3   // 1   — modulo (the REMAINDER after division)\n10 ** 3  // 1000 — exponentiation (10 to the power of 3)\n\n// Modulo is incredibly useful:\n// Is a number even? remainder when divided by 2 is 0:\nconst isEven = n => n % 2 === 0;\nisEven(4)  // true\nisEven(7)  // false\n\n// Wrap around (like clock arithmetic):\nconst hour = (currentHour + 5) % 24; // always 0-23`}
            title="arithmetic.js"
          />
          <ConceptCard icon={<Info size={16} />} title="The modulo operator % — more useful than you think!" variant="tip">
            <code style={{ fontFamily: "var(--font-mono)" }}>%</code> returns the <strong>remainder</strong> after integer division. So <code style={{ fontFamily: "var(--font-mono)" }}>10 % 3</code> = 1 (because 10 ÷ 3 = 3 remainder 1).
            <br /><br />
            You&apos;ll use it constantly for: checking if numbers are even/odd, cycling through items in a list (wrapping around), and creating repeating patterns. It&apos;s found in every real codebase!
          </ConceptCard>
        </div>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
            🎮 Try Every Operator Live
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Type any values, pick any operator, and the result updates instantly. Try mixing strings and numbers to see type coercion in action!
          </p>
          <OperatorPlayground />
        </div>
      </FadeInSection>

      {/* Comparison */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(139,92,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GitBranch size={18} style={{ color: "var(--primary)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              Comparison Operators — Asking Questions
            </h2>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Comparison operators compare two values and always return a <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>boolean</code> — either <code style={{ fontFamily: "var(--font-mono)", color: "var(--success)" }}>true</code> or <code style={{ fontFamily: "var(--font-mono)", color: "var(--error)" }}>false</code>.
            They&apos;re the backbone of every <code style={{ fontFamily: "var(--font-mono)" }}>if</code> statement and condition you&apos;ll ever write.
          </p>
          <CodeBlock
            code={`// === (strict equality) — ALWAYS use this one!\n5 === 5      // true  — same value, same type\n5 === "5"    // false — different types (number vs string)\n\n// !== (strict inequality)\n5 !== 6      // true\n5 !== "5"    // true — different type counts!\n\n// > < >= <=\n10 > 5       // true\n10 >= 10     // true (includes equal)\n"apple" > "banana" // false (alphabetical!) — strings too!\n\n// Avoid these — they coerce types and cause surprises:\n5 == "5"     // true  (== converts "5" to 5 first... ew)\n0 == false   // true  (== converts false to 0... yikes)\n// LESSON: always === never ==`}
            title="comparison.js"
            highlightLines={[1, 2, 3]}
          />
        </div>
      </FadeInSection>

      {/* Logical */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(251,191,36,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={18} style={{ color: "var(--accent)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              Logical Operators — Making Decisions
            </h2>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Logical operators combine or invert conditions. But in JavaScript, they also have a superpower: <strong style={{ color: "var(--text)" }}>short-circuit evaluation</strong> — they stop evaluating as soon as the result is determined.
            This makes them incredibly useful for writing concise, efficient code.
          </p>
          <ShortCircuitVisualizer />
          <CodeBlock
            code={`// && (AND) — returns first falsy value, or the last value\ntrue  && "hello"   // "hello"  — both truthy, returns last\nfalse && "hello"   // false    — short-circuits at false\n\n// || (OR) — returns first truthy value, or the last\nfalse || "default" // "default" — first truthy\n""    || "anon"    // "anon"   — "" is falsy, uses fallback\n0     || 42        // 42       — 0 is falsy, uses fallback\n\n// ?? (nullish coalescing) — ONLY null/undefined triggers fallback\nnull      ?? "default" // "default" — null triggers ??\nundefined ?? "default" // "default" — undefined triggers ??\n0         ?? "default" // 0         — 0 is NOT null/undefined!\n""        ?? "default" // ""        — empty string stays!\n\n// ! (NOT) — inverts a boolean\n!true     // false\n!false    // true\n!!0       // false — double-bang converts to boolean\n!!""      // false\n!!"hello" // true`}
            title="logical-operators.js"
            highlightLines={[13, 14]}
          />
          <ConceptCard icon={<AlertTriangle size={16} />} title="?? vs || — choose the right fallback operator" variant="warning">
            Both <code style={{ fontFamily: "var(--font-mono)" }}>??</code> and <code style={{ fontFamily: "var(--font-mono)" }}>||</code> provide fallback values — but they disagree on what counts as &quot;missing&quot;:
            <br /><br />
            <code style={{ fontFamily: "var(--font-mono)" }}>||</code> treats ALL falsy values as missing: <code style={{ fontFamily: "var(--font-mono)" }}>0</code>, <code style={{ fontFamily: "var(--font-mono)" }}>""</code>, <code style={{ fontFamily: "var(--font-mono)" }}>false</code>, <code style={{ fontFamily: "var(--font-mono)" }}>null</code>, <code style={{ fontFamily: "var(--font-mono)" }}>undefined</code>, <code style={{ fontFamily: "var(--font-mono)" }}>NaN</code>.
            <br /><br />
            <code style={{ fontFamily: "var(--font-mono)" }}>??</code> only cares about <code style={{ fontFamily: "var(--font-mono)" }}>null</code> and <code style={{ fontFamily: "var(--font-mono)" }}>undefined</code> — it leaves <code style={{ fontFamily: "var(--font-mono)" }}>0</code>, <code style={{ fontFamily: "var(--font-mono)" }}>""</code>, and <code style={{ fontFamily: "var(--font-mono)" }}>false</code> alone.
            <br /><br />
            <strong>Rule:</strong> Use <code style={{ fontFamily: "var(--font-mono)" }}>??</code> when 0 or empty string are <em>valid values</em> and shouldn&apos;t trigger the fallback (e.g., a score of 0 is real data, not missing!).
          </ConceptCard>
        </div>
      </FadeInSection>

      {/* Ternary + Optional Chaining */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
            The Ternary Operator & Optional Chaining
          </h2>
          <CodeBlock
            code={`// Ternary — a one-line if/else:\n// condition ? valueIfTrue : valueIfFalse\n\nconst age = 20;\nconst status = age >= 18 ? "adult" : "minor";\n// "adult"\n\n// Great for JSX and inline decisions:\nconst message = isLoggedIn ? "Welcome back!" : "Please log in";\n\n// Optional chaining (?.) — safely access nested properties:\n// Without it, this crashes if 'user' is null:\nconst city = user.address.city;  // 💥 TypeError if user is null!\n\n// With ?. — returns undefined if anything is null/undefined:\nconst city2 = user?.address?.city; // undefined — no crash!\n\n// Works on methods too:\nconst upper = str?.toUpperCase(); // only calls if str exists\n\n// Combine with ?? for a default:\nconst label = user?.profile?.displayName ?? "Anonymous";`}
            title="ternary-optional-chaining.js"
            highlightLines={[5, 15]}
          />
        </div>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>🧠 Quick Check</h2>
          <QuizCard
            question='What does "5" + 3 evaluate to in JavaScript?'
            options={[
              { label: "8 (adds them as numbers)", correct: false, explanation: "If both were numbers, yes! But + also does string concatenation. When one side is a string, JS converts the other side to a string too, joining them together." },
              { label: '"53" (string concatenation)', correct: true, explanation: 'Correct! + is "overloaded" — it does addition for numbers AND concatenation for strings. When either side is a string, + always concatenates. The number 3 gets converted to the string "3", and "5" + "3" = "53".' },
              { label: '"5" + "3" (no evaluation)', correct: false, explanation: "JS does evaluate this — it just evaluates it as string concatenation because the left side is a string." },
              { label: "NaN", correct: false, explanation: "NaN (Not a Number) appears when you try invalid numeric operations like 0/0 or undefined*5. The + operator with a string never produces NaN — it always concatenates." },
            ]}
            hint="Remember: + is both 'add' and 'join strings'. Which one wins when types are mixed?"
          />
          <QuizCard
            question="When should you use ?? instead of ||?"
            options={[
              { label: "They're identical — use either one", correct: false, explanation: "They differ in an important way! || treats 0, false, and '' as 'missing'. ?? only treats null and undefined as missing. In many real cases, this makes a big difference." },
              { label: "When you want the fallback to trigger for 0 and empty strings too", correct: false, explanation: "That describes ||, not ??. The || operator does trigger for 0 and empty forms. Use ?? when you want 0 and '' to be kept as-is." },
              { label: "When 0, false, or empty string are valid values you want to keep", correct: true, explanation: "Exactly! If you're writing: const count = data.count ?? 0, and data.count is 0, ?? correctly keeps the 0. If you used || instead, it would replace the 0 with your fallback — a bug!" },
              { label: "Only when working with TypeScript", correct: false, explanation: "?? is standard JavaScript (ES2020+), available in plain JS too. TypeScript didn't introduce it — it just also works in TypeScript." },
            ]}
            hint="Think about a form input showing an empty string, or a score of exactly 0. Should those trigger the fallback?"
          />
        </div>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <div style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.08), rgba(139,92,246,0.08))", border: "1px solid rgba(6,182,212,0.2)", borderRadius: 14, padding: "24px 28px" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>📚 What You Just Learned</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "Arithmetic operators: + - * / % **. The modulo % gives the remainder — incredibly useful for even/odd checks and wrap-around behaviour.",
              "Always use === (strict equality) instead of ==. The == operator silently converts types before comparing, leading to bugs like 0 == false being true.",
              "Logical operators: && returns the first falsy value (or the last value), || returns the first truthy value. These short-circuit — the right side only evaluates if it has to.",
              "?? (nullish coalescing) is a safer fallback than || — only triggers for null/undefined, not for 0 or empty string.",
              "?. (optional chaining) safely navigates nested properties without crashing when something is null. user?.address?.city returns undefined instead of throwing.",
              "Ternary operator: condition ? thenValue : elseValue. A one-line if/else, perfect for computed values and JSX rendering.",
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--secondary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{i + 1}</span>
                <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.7 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

    </div>
  );
}
