"use client";

import { FadeInSection } from "@/components/animations/FadeInSection";
import { CodeBlock, QuizCard, ConceptCard } from "@/components/interactive/components";
import { SpreadRestVisualizer, ClassSyntaxComparator } from "@/components/visualizers/Module11Visualizers";
import { Sparkles, Info } from "lucide-react";

export function Module11Content() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>

      <FadeInSection>
        <div style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.08), rgba(5,150,105,0.06))", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 14, padding: "24px 28px" }}>
          <p style={{ fontSize: "1.05rem", color: "var(--text)", lineHeight: 1.9 }}>
            ✨ <strong>ES6+ brought a wave of new syntax that makes JavaScript dramatically cleaner to read and write.</strong>
            These aren&apos;t new capabilities — JavaScript could always do these things. ES6+ just gave us much nicer ways to say the same things.
            These features are now completely standard and used in every modern codebase.
          </p>
        </div>
      </FadeInSection>

      {/* Template literals */}
      <FadeInSection>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(251,191,36,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sparkles size={18} style={{ color: "var(--accent)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              Template Literals — Smarter Strings
            </h2>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Use backticks (<code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>`</code>) instead of quotes to create template literals. They can span multiple lines and embed any JavaScript expression directly inside <code style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>{"`${...}`"}</code>:
          </p>
          <CodeBlock
            code={`const name = "Alice";\nconst score = 95;\n\n// Old way \u2014 string concatenation:\nconst msg1 = "Hello " + name + "! Your score is " + score + ".";\n\n// Template literal \u2014 SO much cleaner:\n` + "const msg2 = `Hello ${name}! Your score is ${score}.`;" + `\n\n// Any JavaScript expression works inside \${}:\n` + "const msg3 = `You ${score >= 90 ? \"passed\" : \"need a retry\"}!`;\n" + "const msg4 = `Total: ${items.reduce((sum, n) => sum + n, 0)}`;" + `\n\n// Multi-line strings \u2014 just press Enter:\n` + "const html = `\n  <div class=\"card\">\n    <h2>${title}</h2>\n    <p>${description}</p>\n  </div>\n`;" + `\n// No \\n needed \u2014 the actual newlines are preserved`}
            title="template-literals.js"
            highlightLines={[8, 11, 12]}
          />
        </div>
      </FadeInSection>

      {/* Destructuring (quick recap with imports) */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
            Default Parameters & Enhanced Object Literals
          </h2>
          <CodeBlock
            code={`// Default function parameters:\nfunction greet(name = "stranger", greeting = "Hello") {\n  return \`\${greeting}, \${name}!\`;\n}\ngreet();             // "Hello, stranger!"\ngreet("Alice");      // "Hello, Alice!"\ngreet("Bob", "Hi"); // "Hi, Bob!"\n\n// Shorthand property names when key = variable name:\nconst name = "Alice";\nconst age = 28;\n\n// Old:\nconst user1 = { name: name, age: age };\n\n// New shorthand (the name automatically becomes the key):\nconst user2 = { name, age }; // exactly the same!\n\n// Computed property names:\nconst field = "firstName";\nconst obj = { [field]: "Alice" };\n// { firstName: "Alice" }\n\n// Method shorthand:\nconst api = {\n  // Old:  fetchData: function() { ... }\n  fetchData() {  // much cleaner!\n    return fetch("/api/data");\n  }\n};`}
            title="enhanced-object-literals.js"
            highlightLines={[15, 16]}
          />
        </div>
      </FadeInSection>

      {/* Spread & Rest */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
            Spread, Rest & Destructuring in Depth
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            The three dots <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>...</code> do different things depending on context — they either spread out (expand) or collect (gather). Select each scenario below:
          </p>
          <SpreadRestVisualizer />
        </div>
      </FadeInSection>

      {/* Modules */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
            ES Modules — import & export
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Modules let you split code across multiple files and share specific pieces between them. They&apos;re the foundation of every Node.js project, React app, and modern web application:
          </p>
          <CodeBlock
            code={`// math.js — EXPORTING:\nexport const PI = 3.14159;\n\nexport function add(a, b) { return a + b; }\n\nexport default function multiply(a, b) {\n  return a * b;\n}\n\n// app.js — IMPORTING:\nimport multiply from "./math.js";         // default import (any name)\nimport { add, PI } from "./math.js";      // named imports (exact names)\nimport { add as sum } from "./math.js";   // rename on import\nimport * as Math from "./math.js";        // import everything as namespace\n\n// Named vs Default:\n// Each file can have only ONE default export\n// But unlimited named exports\n// Convention: default for the "main thing" a file exports,\n//             named for helpers and utilities`}
            title="modules.js"
            highlightLines={[1, 2, 10, 11, 12]}
          />
        </div>
      </FadeInSection>

      {/* Classes */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
            Classes — Blueprints for Objects
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            ES6 classes are syntactic sugar over JavaScript&apos;s existing prototype-based inheritance. They don&apos;t introduce a new OOP model — they just make the existing one much more readable. Compare:
          </p>
          <ClassSyntaxComparator />
          <ConceptCard icon={<Info size={16} />} title="Optional chaining and nullish coalescing are even newer (ES2020)" variant="info">
            Two more powerful additions: <code style={{ fontFamily: "var(--font-mono)" }}>?.</code> (optional chaining) and <code style={{ fontFamily: "var(--font-mono)" }}>??</code> (nullish coalescing) — both covered in Module 3.
            They&apos;re now supported by all modern browsers and Node.js, and you should use them freely.
          </ConceptCard>
        </div>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>🧠 Quick Check</h2>
          <QuizCard
            question="What's the difference between a default export and a named export?"
            options={[
              { label: "Default exports are faster to import", correct: false, explanation: "Performance is identical. The difference is purely structural — how you import and reference them." },
              { label: "A file can have one default export (imported with any name) and many named exports (imported with their exact names)", correct: true, explanation: "Correct! Default export: import anything from './file'. Named exports: import { specificName } from './file' — you must use the exact name (or rename with 'as'). This pattern is everywhere in React component files." },
              { label: "Named exports are only for functions, default exports are only for objects", correct: false, explanation: "Both can export anything — functions, objects, classes, constants, arrays. The distinction is just about how many and how they're referenced when imported." },
              { label: "default exports must be in a file named 'index.js'", correct: false, explanation: "No such requirement. You can use default exports in any file with any name. The 'index.js convention' is about folder imports — it's unrelated to export type." },
            ]}
            hint="How many defaults can one file have? And do named exports keep their name?"
          />
        </div>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <div style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.06), rgba(5,150,105,0.08))", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 14, padding: "24px 28px" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>📚 What You Just Learned</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "Template literals use backticks and ${'${expression}'}. Any JS expression works inside ${'${}'}. Multi-line strings work without escape characters. Used everywhere — React JSX, SQL queries, HTML templates.",
              "Default parameters: function greet(name = 'stranger') — applied when the argument is undefined or missing. Great for making function arguments optional without messy if-checks inside the body.",
              "Shorthand properties: { name, age } instead of { name: name, age: age }. Computed keys: { [key]: value }. Method shorthand: { fetch() {} } instead of { fetch: function() {} }.",
              "Spread (...) on arrays/objects: expands them. [...a, ...b] merges arrays. { ...obj1, ...obj2 } merges objects (later keys win). Creates shallow copies safely.",
              "Rest (...) in function params: function sum(...nums) — collects all extra arguments into an array. In destructuring: const [first, ...rest] = array — collects remaining items.",
              "ES Modules: export function/const for named exports. export default for the main export. import { name } for named, import anything for default. One default per file, unlimited named.",
              "Classes are syntactic sugar over prototypes — same runtime behaviour, much better DX. extends for inheritance, super() to call the parent constructor. Private fields with # prefix (modern JS).",
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--success)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{i + 1}</span>
                <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.7 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

    </div>
  );
}
