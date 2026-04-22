"use client";

import { FadeInSection } from "@/components/animations/FadeInSection";
import { CodeBlock, QuizCard, ConceptCard } from "@/components/interactive/components";
import { ArrayMethodPlayground, DestructuringExplorer } from "@/components/visualizers/Module8Visualizers";
import { List, Info, AlertTriangle } from "lucide-react";

export function Module8Content() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>

      <FadeInSection>
        <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(6,182,212,0.06))", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 14, padding: "24px 28px" }}>
          <p style={{ fontSize: "1.05rem", color: "var(--text)", lineHeight: 1.9 }}>
            🧰 <strong>Arrays are the most common data structure in JavaScript.</strong> Lists of products, users, messages, search results — all arrays.
            This module covers the powerful built-in array methods that let you transform, filter, search, and combine arrays — all without writing loops manually.
            These methods are everywhere in modern JavaScript and are essential for working with React.
          </p>
        </div>
      </FadeInSection>

      {/* Array Basics */}
      <FadeInSection>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <List size={18} style={{ color: "#6366f1" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              Arrays — Ordered Lists of Anything
            </h2>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            An array is an ordered list. Items are numbered starting from <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>0</code> (not 1 — this trips up beginners constantly).
            Arrays can hold any mix of types, including objects and other arrays.
          </p>
          <CodeBlock
            code={`const fruits = ["Apple", "Banana", "Grape"];\n\n// Accessing — zero-indexed!\nfruits[0]  // "Apple"  (FIRST item is index 0)\nfruits[1]  // "Banana"\nfruits[fruits.length - 1] // "Grape" (last item)\n\n// Adding items:\nfruits.push("Orange");      // add to END\nfruits.unshift("Mango");    // add to BEGINNING\n\n// Removing items:\nfruits.pop();    // remove from END   — returns removed item\nfruits.shift();  // remove from START — returns removed item\n\n// Finding things:\nfruits.indexOf("Banana")     // 1 — position of "Banana"\nfruits.includes("Grape")     // true — does it exist?\n\n// Slicing (creates a new array, no mutation):\nfruits.slice(1, 3)   // items at index 1 and 2 (3 is excluded)\nfruits.slice(-2)     // last 2 items\n\n// Checking if something is an array:\nArray.isArray(fruits) // true  (typeof gives "object" — not helpful!)`}
            title="arrays-basics.js"
            highlightLines={[4, 5]}
          />
          <ConceptCard icon={<AlertTriangle size={16} />} title="Arrays mutate vs. return new — know the difference!" variant="warning">
            Some array methods <strong>mutate</strong> (change) the original array: <code style={{ fontFamily: "var(--font-mono)" }}>push</code>, <code style={{ fontFamily: "var(--font-mono)" }}>pop</code>, <code style={{ fontFamily: "var(--font-mono)" }}>shift</code>, <code style={{ fontFamily: "var(--font-mono)" }}>unshift</code>, <code style={{ fontFamily: "var(--font-mono)" }}>sort</code>, <code style={{ fontFamily: "var(--font-mono)" }}>splice</code>.
            <br /><br />
            Other methods return a <strong>new array</strong> and leave the original untouched: <code style={{ fontFamily: "var(--font-mono)" }}>map</code>, <code style={{ fontFamily: "var(--font-mono)" }}>filter</code>, <code style={{ fontFamily: "var(--font-mono)" }}>slice</code>, <code style={{ fontFamily: "var(--font-mono)" }}>concat</code>, <code style={{ fontFamily: "var(--font-mono)" }}>flat</code>.
            <br /><br />
            In React, you should <strong>never mutate arrays directly</strong> — always create a new array. Use spread: <code style={{ fontFamily: "var(--font-mono)" }}>{"[...items, newItem]"}</code> to add, <code style={{ fontFamily: "var(--font-mono)" }}>.filter()</code> to remove.
          </ConceptCard>
        </div>
      </FadeInSection>

      {/* Method Playground */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
            The 7 Essential Array Methods
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            These 7 methods cover 95% of everything you&apos;ll do with arrays in real code. Select each one below to see exactly what it does with a live example:
          </p>
          <ArrayMethodPlayground />
          <CodeBlock
            code={`const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\n// FILTER — keep only evens:\nconst evens = numbers.filter(n => n % 2 === 0);\n// [2, 4, 6, 8, 10]\n\n// MAP — square each number:\nconst squares = numbers.map(n => n * n);\n// [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]\n\n// REDUCE — sum everything:\nconst total = numbers.reduce((sum, n) => sum + n, 0);\n// 55\n\n// Chaining them together — very common pattern!\nconst sumOfEvenSquares = numbers\n  .filter(n => n % 2 === 0) // [2, 4, 6, 8, 10]\n  .map(n => n * n)          // [4, 16, 36, 64, 100]\n  .reduce((sum, n) => sum + n, 0); // 220`}
            title="essential-array-methods.js"
            highlightLines={[14, 15, 16, 17]}
          />
        </div>
      </FadeInSection>

      {/* Destructuring */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
            Destructuring — Unpacking Data Elegantly
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Destructuring is a concise way to extract values from arrays or properties from objects into individual variables.
            It&apos;s one of the most-used ES6 features — you&apos;ll see it constantly in React, API responses, and function parameters:
          </p>
          <DestructuringExplorer />
        </div>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>🧠 Quick Check</h2>
          <QuizCard
            question="What does the .map() method return?"
            options={[
              { label: "The first matching item in the array", correct: false, explanation: "That's .find(). map() transforms EVERY item in the array, not just one." },
              { label: "A new array of the same length, with each item transformed by the function", correct: true, explanation: "Correct! map() always returns a new array of the same length — one output item for every input item. The function you pass transforms each item. The original array is never modified." },
              { label: "true or false depending on whether any items match", correct: false, explanation: "That's .some() (any match returns true) or .every() (all must match). map() transforms items, it doesn't filter them." },
              { label: "A single accumulated value", correct: false, explanation: "That's .reduce(). reduce() collapses the array into one value by running an accumulator. map() produces a new array of the same length." },
            ]}
            hint="map() changes each item but keeps all of them. What shape is the result?"
          />
        </div>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(6,182,212,0.08))", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 14, padding: "24px 28px" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>📚 What You Just Learned</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "Arrays are zero-indexed — the first item is at index 0. Access the last item with array[array.length - 1] or with the newer at(-1) method.",
              "Mutating methods (push, pop, sort, splice) change the array in place. Non-mutating methods (map, filter, slice, concat) return a NEW array. In React, always prefer non-mutating methods.",
              "filter() keeps items matching a condition (returns new array). map() transforms every item (same length). reduce() collapses to a single value. find() returns the first match. some()/every() return booleans.",
              "Chaining: array.filter().map().reduce() — extremely common pattern! Each method returns an array/value that the next method works on.",
              "Destructuring unpacks arrays/objects into variables in one line. Array destructuring: const [a, b] = arr. Object destructuring: const { name, age } = user. Supports defaults and renaming.",
              "Spread (...) expands an array: [...arr1, ...arr2] combines them. Rest (...rest) in parameters collects extras: function sum(...nums) { }. Same syntax, opposite meanings depending on context.",
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#6366f1", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{i + 1}</span>
                <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.7 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

    </div>
  );
}
