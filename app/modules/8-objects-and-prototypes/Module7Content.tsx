"use client";

import { FadeInSection } from "@/components/animations/FadeInSection";
import { CodeBlock, QuizCard, ConceptCard } from "@/components/interactive/components";
import { ObjectBuilder, PrototypeChainVisualizer } from "@/components/visualizers/Module7Visualizers";
import { Box, Link, AlertTriangle } from "lucide-react";

export function Module7Content() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>

      <FadeInSection>
        <div style={{ background: "linear-gradient(135deg, rgba(217,119,6,0.08), rgba(139,92,246,0.06))", border: "1px solid rgba(217,119,6,0.2)", borderRadius: 14, padding: "24px 28px" }}>
          <p style={{ fontSize: "1.05rem", color: "var(--text)", lineHeight: 1.9 }}>
            🏗️ <strong>Objects are how JavaScript models real-world things.</strong> A user, a product, a todo item — all objects.
            Understanding how objects work (especially <em>by reference</em> storage and the prototype chain) is essential to understanding React components, APIs, and virtually all real JavaScript code.
          </p>
        </div>
      </FadeInSection>

      {/* Object Basics */}
      <FadeInSection>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(217,119,6,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Box size={18} style={{ color: "var(--accent)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              Objects — Containers of Related Data
            </h2>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            An object is a collection of <strong style={{ color: "var(--text)" }}>key-value pairs</strong>. Each key (also called a property) maps to a value — which can be any type, including another object or a function.
            When an object property holds a function, that function is called a <strong style={{ color: "var(--text)" }}>method</strong>.
          </p>
          <ObjectBuilder />
          <CodeBlock
            code={`// Creating an object literal:\nconst user = {\n  name: "Alice",\n  age: 28,\n  isAdmin: false,\n  address: {            // nested object!\n    city: "New York",\n    zip: "10001"\n  },\n  greet() {             // method! (function as a property)\n    return "Hi, I'm " + this.name; // 'this' refers to the object\n  }\n};\n\n// Accessing properties:\nuser.name          // "Alice"  — dot notation\nuser["name"]       // "Alice"  — bracket notation (useful for dynamic keys)\nuser.address.city  // "New York" — chaining\nuser.greet()       // "Hi, I'm Alice"\n\n// Adding and modifying:\nuser.email = "alice@example.com"; // add a new property\nuser.age = 29;                    // update existing\ndelete user.isAdmin;              // remove a property\n\n// Checking if a property exists:\n"name" in user        // true\nuser.hasOwnProperty("email") // true`}
            title="objects.js"
            highlightLines={[10, 11, 16, 17]}
          />
        </div>
      </FadeInSection>

      {/* Reference vs Value */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(239,68,68,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Link size={18} style={{ color: "var(--error)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              By Reference — The Crucial Difference
            </h2>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Primitive values (numbers, strings, booleans) are stored <em>by value</em> — copying one makes a completely independent copy.
            Objects (and arrays!) are stored <em>by reference</em> — copying just creates another pointer to the <strong style={{ color: "var(--text)" }}>same object in memory</strong>. This is responsible for a huge number of bugs!
          </p>
          <CodeBlock
            code={`// Primitives — copy is independent:\nlet a = 5;\nlet b = a;  // b gets its own independent copy of the value 5\nb = 10;\nconsole.log(a); // Still 5 — a is unaffected!\n\n// Objects — copy shares the same data:\nconst original = { name: "Alice" };\nconst copy = original; // copy is just another pointer to the SAME object!\n\ncopy.name = "Bob";\nconsole.log(original.name); // "Bob" — original was changed too! 😱\n\n// To make a true independent copy (shallow):\nconst trueCopy = { ...original };    // spread operator\nconst alsoACopy = Object.assign({}, original);\n\n// Deep clone (for nested objects):\nconst deepCopy = JSON.parse(JSON.stringify(original)); // simple but limited\nconst deepCopy2 = structuredClone(original);           // modern, preferred\n\n// This is also why === on objects checks IDENTITY not equality:\n{} === {} // false — two separate objects in memory, even if they look the same\noriginal === copy // true — same object in memory`}
            title="reference-vs-value.js"
            highlightLines={[9, 12, 15]}
          />
          <ConceptCard icon={<AlertTriangle size={16} />} title="const doesn't protect object contents!" variant="warning">
            <code style={{ fontFamily: "var(--font-mono)" }}>const user = {"{ name: 'Alice' }"}</code> — you CAN change <code style={{ fontFamily: "var(--font-mono)" }}>user.name</code> even though it&apos;s <code style={{ fontFamily: "var(--font-mono)" }}>const</code>!
            <br /><br />
            <code style={{ fontFamily: "var(--font-mono)" }}>const</code> only prevents you from reassigning the <em>variable</em> (<code style={{ fontFamily: "var(--font-mono)" }}>user = {"{}  "}</code> would fail). The <em>object itself</em> remains mutable.
            <br /><br />
            To truly lock an object: <code style={{ fontFamily: "var(--font-mono)" }}>Object.freeze(user)</code> — makes all properties read-only (shallow freeze only).
          </ConceptCard>
        </div>
      </FadeInSection>

      {/* Prototypes */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
            The Prototype Chain — Inheritance in JavaScript
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Every JavaScript object has a hidden link to another object — its <strong style={{ color: "var(--text)" }}>prototype</strong>. When you access a property, JS first looks on the object itself. If not found, it looks on the prototype. Then the prototype&apos;s prototype — all the way up to <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>null</code>.
            This chain is how <code style={{ fontFamily: "var(--font-mono)" }}>.toString()</code> works on every object without you defining it!
          </p>
          <PrototypeChainVisualizer />
        </div>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>🧠 Quick Check</h2>
          <QuizCard
            question={`const a = { x: 1 }; const b = a; b.x = 99; What is a.x?`}
            options={[
              { label: "1 — a is unaffected because b is a copy", correct: false, explanation: "b isn't a copy! Objects are stored by reference. const b = a means both a and b point to the same object in memory. Changing it through b changes it for a too." },
              { label: "99 — both a and b point to the same object in memory", correct: true, explanation: "Exactly right! When you assign an object to another variable, you're copying the reference (the address in memory), not the actual data. a and b are like two different signposts pointing to the same house." },
              { label: "undefined — b overwrites a's value", correct: false, explanation: "b doesn't overwrite a. Both variables coexist, both pointing to the same underlying object. There's no overwriting here." },
              { label: "This throws a TypeError", correct: false, explanation: "No error occurs — this is valid JavaScript. The issue is a subtle bug (both variables mutate the same object), not a syntax or type error." },
            ]}
            hint="Objects are stored by reference. Is b a copy of a, or a second pointer to the same data?"
          />
        </div>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <div style={{ background: "linear-gradient(135deg, rgba(217,119,6,0.06), rgba(139,92,246,0.08))", border: "1px solid rgba(217,119,6,0.2)", borderRadius: 14, padding: "24px 28px" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>📚 What You Just Learned</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "Objects are key-value pairs — keys (strings) map to values of any type. Object methods are functions stored as properties. 'this' inside a method refers to the object the method is called on.",
              "Access properties with dot notation (user.name) or bracket notation (user['name']). Bracket notation is needed for dynamic/computed keys or keys with special characters.",
              "Objects are stored by reference. Assigning an object to another variable copies the reference, not the data. Both variables point to the same memory — mutating through one changes the other!",
              "Shallow copy: const copy = { ...original }. Deep clone: const deep = structuredClone(original). const only prevents variable reassignment — it doesn't make the object immutable.",
              "The prototype chain: every object has a [[Prototype]] link. When a property isn't found, JS looks up the chain. All objects ultimately inherit from Object.prototype, which provides toString(), hasOwnProperty(), etc.",
              "Comparing objects with === checks identity (same memory address), not equality. Two empty objects {} === {} is false — they're two separate objects, even if they look identical.",
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
