"use client";

import { FadeInSection } from "@/components/animations/FadeInSection";
import { CodeBlock, QuizCard, ConceptCard } from "@/components/interactive/components";
import { ScopeChainVisualizer, FunctionTypesExplorer } from "@/components/visualizers/Module5Visualizers";
import { Code, Layers, Info } from "lucide-react";

export function Module5Content() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>

      <FadeInSection>
        <div style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.08), rgba(139,92,246,0.06))", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 14, padding: "24px 28px" }}>
          <p style={{ fontSize: "1.05rem", color: "var(--text)", lineHeight: 1.9 }}>
            🧩 <strong>Functions are the building blocks of every JavaScript program.</strong> They let you wrap up a chunk of code, give it a name, and run it whenever you need — with different inputs each time.
            Once you understand functions AND scope (where variables are visible), you can read and write almost any JavaScript out there.
          </p>
        </div>
      </FadeInSection>

      {/* What is a function */}
      <FadeInSection>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(139,92,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Code size={18} style={{ color: "var(--primary)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              What Exactly Is a Function?
            </h2>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Think of a function like a <strong style={{ color: "var(--text)" }}>recipe</strong>. The recipe has a name (&quot;Make Pizza&quot;), it accepts ingredients (parameters), follows steps (the function body), and produces a result (the return value).
            You can follow the same recipe multiple times with different ingredients.
          </p>
          <CodeBlock
            code={`// Anatomy of a function:\nfunction greet(name) {    // <- 'name' is a PARAMETER (placeholder)\n  const message = "Hello, " + name + "!";\n  return message;          // <- return sends the result back\n}\n\n// Calling (invoking) the function with an ARGUMENT:\nconst result = greet("Alice"); // "Alice" is the argument\nconsole.log(result); // "Hello, Alice!"\n\n// Call multiple times with different inputs:\ngreet("Bob");    // "Hello, Bob!"\ngreet("Carlos"); // "Hello, Carlos!"\n\n// Parameters vs Arguments:\n// PARAMETER: the variable name in the function definition (name above)\n// ARGUMENT:  the actual value you pass when calling it ("Alice")\n// One common way to remember: P for Placeholder, A for Actual value`}
            title="functions-basics.js"
            highlightLines={[2, 8]}
          />
        </div>
      </FadeInSection>

      {/* Function types */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
            4 Ways to Write a Function
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            JavaScript has four different syntaxes for functions. They can all do the same core job — but they differ in small but important ways. Click each one to understand when to use it:
          </p>
          <FunctionTypesExplorer />
          <ConceptCard icon={<Info size={16} />} title="The quick practical rule for choosing function syntax" variant="tip">
            <strong>Arrow functions</strong> for array methods, callbacks, and one-liners: <code style={{ fontFamily: "var(--font-mono)" }}>const double = n ={">"} n * 2</code>
            <br /><br />
            <strong>Function declarations</strong> for top-level named functions you want to call from anywhere in the file.
            <br /><br />
            <strong>Function expressions</strong> when you want to conditionally assign a function or keep it private.
            <br /><br />
            <strong>IIFE</strong>: only when you see them in old code — new code uses modules instead.
          </ConceptCard>
        </div>
      </FadeInSection>

      {/* Scope */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(6,182,212,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Layers size={18} style={{ color: "var(--secondary)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              Scope — Who Can See What?
            </h2>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            <strong style={{ color: "var(--text)" }}>Scope</strong> determines where a variable is visible. JavaScript uses <strong style={{ color: "var(--text)" }}>lexical scope</strong> — a function can see variables from the place where it was <em>written</em>, not where it&apos;s <em>called from</em>.
            Think of it like concentric circles: inner circles can look outward, but outer circles never see inside the inner ones.
          </p>
          <ScopeChainVisualizer />
          <CodeBlock
            code={`// Global scope — accessible everywhere:\nconst PI = 3.14159;\n\nfunction circle(radius) {\n  // Function scope — 'area' only exists inside this function:\n  const area = PI * radius * radius; // can see PI from global scope!\n  return area;\n}\n\n// console.log(area); // ReferenceError! 'area' doesn't exist here.\n\n// Block scope (let and const only):\nif (true) {\n  const blockVar = "I'm block-scoped!";\n  let alsoBlock = "me too!";\n  var oldWay = "I escape the block!"; // var is NOT block-scoped!\n}\n\n// console.log(blockVar); // ReferenceError!\nconsole.log(oldWay); // "I escape the block!" — var ignores blocks!`}
            title="scope.js"
            highlightLines={[5, 6, 15]}
          />
        </div>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>🧠 Quick Check</h2>
          <QuizCard
            question="What is the key difference between an arrow function and a regular function declaration?"
            options={[
              { label: "Arrow functions are faster", correct: false, explanation: "Performance is essentially identical — this is a myth. The differences are about syntax and behaviour, not speed." },
              { label: "Arrow functions have no 'this' binding and can't be used as constructors", correct: true, explanation: "Arrow functions don't create their own 'this' — they inherit it from the surrounding code ('lexical this'). This makes them great for callbacks but means you can't use 'new ArrowFn()'. Regular functions always create their own 'this'." },
              { label: "Arrow functions can't accept parameters", correct: false, explanation: "Arrow functions accept parameters normally! Single-param arrows can omit parentheses: n => n*2. Multi-param still needs them: (a, b) => a + b." },
              { label: "Arrow functions can only be one line long", correct: false, explanation: "One-liners are optional! Arrow functions can have a full block body: const fn = (x) => { const y = x * 2; return y; }. The one-liner form just auto-returns the expression." },
            ]}
            hint="Think about what 'this' refers to inside each type..."
          />
        </div>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <div style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.08), rgba(139,92,246,0.08))", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 14, padding: "24px 28px" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>📚 What You Just Learned</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "Functions are reusable chunks of code. They accept parameters (placeholders defined in the function) and are called with arguments (the actual values). return sends a value back to the caller.",
              "4 function syntaxes: declarations (hoisted, great for top-level helpers), expressions (stored in variables), arrow functions (concise, no 'this', ideal for callbacks), and IIFEs (self-invoking, used in old code).",
              "Arrow function shorthand: single params don't need parens, single-expression bodies auto-return without needing the return keyword. const double = n => n * 2.",
              "Scope controls variable visibility. Global scope: accessible everywhere. Function scope: only inside that function. Block scope: only inside {} — but only for let and const, not var!",
              "Lexical scope: functions look up variables where they were WRITTEN, not where they're called. This is why inner functions can access outer variables, but not the reverse.",
              "var ignores block scope — it escapes if/for blocks. let and const are properly block-scoped. This is the main reason to never use var in modern code.",
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--accent)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{i + 1}</span>
                <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.7 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

    </div>
  );
}
