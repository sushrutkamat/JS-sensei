"use client";

import { FadeInSection } from "@/components/animations/FadeInSection";
import { CodeBlock, QuizCard, ConceptCard } from "@/components/interactive/components";
import { VariableShelfVisualizer, TypeofDetector } from "@/components/visualizers/Module2Visualizers";
import { Box, Layers, Info, AlertTriangle, Lightbulb } from "lucide-react";

export function Module2Content() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>

      {/* Welcome */}
      <FadeInSection>
        <div style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.10), rgba(139,92,246,0.06))", border: "1px solid rgba(6,182,212,0.2)", borderRadius: 14, padding: "24px 28px" }}>
          <p style={{ fontSize: "1.05rem", color: "var(--text)", lineHeight: 1.9 }}>
            📦 <strong>Every program is about data — storing it, changing it, and using it.</strong> This module teaches you how JavaScript holds data (variables), what kinds of data exist (types), and the important difference between simple values and complex ones. These are things you will use in literally every line of JavaScript you ever write.
          </p>
        </div>
      </FadeInSection>

      {/* ── SECTION 1: What is a Variable? ── */}
      <FadeInSection>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(6,182,212,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Box size={18} style={{ color: "var(--secondary)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              What Is a Variable?
            </h2>
          </div>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            A variable is a <strong style={{ color: "var(--text)" }}>named box that holds a value</strong>. Instead of writing the number <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>3.14159</code> everywhere in your code, you store it once in a variable called <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>PI</code> and use that name. If the value ever needs to change, you change it in one place.
          </p>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            A variable has two steps:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.25)", borderRadius: 12, padding: "16px 18px" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--primary)", marginBottom: 6 }}>1. Declaration</div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.7 }}>
                Tell JavaScript the variable exists and give it a name. This is done once, using <code style={{ fontFamily: "var(--font-mono)" }}>const</code>, <code style={{ fontFamily: "var(--font-mono)" }}>let</code>, or <code style={{ fontFamily: "var(--font-mono)" }}>var</code>.
              </p>
              <pre style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--primary)", marginTop: 8 }}>{"let score;"}</pre>
            </div>
            <div style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.25)", borderRadius: 12, padding: "16px 18px" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--secondary)", marginBottom: 6 }}>2. Assignment</div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.7 }}>
                Put a value into the box using the <code style={{ fontFamily: "var(--font-mono)" }}>=</code> sign. This can happen at declaration time or later.
              </p>
              <pre style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--secondary)", marginTop: 8 }}>{"score = 100;"}</pre>
            </div>
          </div>

          <CodeBlock
            code={`// Declaration and assignment separately:
let score;       // Declaration — the box exists, but it's empty (undefined)
score = 100;     // Assignment  — put 100 into the box

// Declaration and assignment together (most common):
let lives = 3;   // Declare AND assign in one line

// You can then UPDATE a let variable later:
lives = lives - 1;   // lives is now 2
console.log(lives);  // 2`}
            title="declaration-vs-assignment.js"
            highlightLines={[2, 3, 6]}
          />
        </div>
      </FadeInSection>

      {/* ── SECTION 2: const ── */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 800, color: "var(--error)", fontSize: "1.3rem", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", padding: "2px 12px", borderRadius: 8 }}>const</span>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.6rem", fontWeight: 700, color: "var(--text)" }}>— The Locked Box</h2>
          </div>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            <code style={{ fontFamily: "var(--font-mono)", color: "var(--error)" }}>const</code> stands for <strong style={{ color: "var(--text)" }}>constant</strong>. It creates a variable whose <em>binding cannot be changed</em> — once you say <code style={{ fontFamily: "var(--font-mono)" }}>const x = 5</code>, you can never point <code style={{ fontFamily: "var(--font-mono)" }}>x</code> at something else. It&apos;s a locked box.
          </p>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            <strong style={{ color: "var(--text)" }}>Why does it exist?</strong> Most values in programs don&apos;t change — the number of lives in a game, a user&apos;s ID, an API URL. Using <code style={{ fontFamily: "var(--font-mono)", color: "var(--error)" }}>const</code> makes your intentions clear: <em>"this value is not supposed to change."</em> It also catches bugs — if you accidentally try to overwrite it, JavaScript throws an error immediately instead of silently doing something wrong.
          </p>

          <CodeBlock
            code={`// const must be initialized at declaration — you can't declare then assign later:
const PI = 3.14159;
const MAX_PLAYERS = 4;
const API_URL = "https://api.example.com";

// Trying to reassign throws a TypeError immediately:
PI = 3;          // ❌ TypeError: Assignment to constant variable.
MAX_PLAYERS++;   // ❌ TypeError: Assignment to constant variable.

// ⚠️ IMPORTANT NUANCE: const doesn't make values "frozen completely"
// It only prevents RE-ASSIGNING the variable itself.
// If the value is an object or array, you CAN still change its contents:
const user = { name: "Alice", age: 25 };
user.name = "Bob";   // ✅ This works! We didn't reassign 'user', we changed what's inside it.
user.age = 26;       // ✅ Also fine.
// user = {};        // ❌ This would fail — we're trying to replace 'user' itself.

// Think of const like a name tag on a box. You can't stick the name tag on a different
// box, but you can change what's inside the original box.`}
            title="const.js"
            highlightLines={[7, 8, 14, 15]}
          />

          <ConceptCard icon={<Lightbulb size={16} />} title="Use const by default — switch to let only when needed" variant="tip">
            The professional habit used by experienced developers everywhere:
            <br /><br />
            <strong>Start with <code style={{ fontFamily: "var(--font-mono)" }}>const</code>.</strong> If you later find you need to reassign the variable, switch it to <code style={{ fontFamily: "var(--font-mono)" }}>let</code>. Never use <code style={{ fontFamily: "var(--font-mono)" }}>var</code>.
            <br /><br />
            Why? It signals intent. When a reader sees <code style={{ fontFamily: "var(--font-mono)" }}>const</code>, they immediately know: this value won&apos;t be reassigned. This makes code much easier to read and understand.
          </ConceptCard>
        </div>
      </FadeInSection>

      {/* ── SECTION 3: let ── */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 800, color: "var(--secondary)", fontSize: "1.3rem", background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.3)", padding: "2px 12px", borderRadius: 8 }}>let</span>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.6rem", fontWeight: 700, color: "var(--text)" }}>— The Reassignable Box</h2>
          </div>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            <code style={{ fontFamily: "var(--font-mono)", color: "var(--secondary)" }}>let</code> creates a variable that <strong style={{ color: "var(--text)" }}>can be reassigned later</strong>. It&apos;s for values that need to change: a counter, a current score, a user&apos;s status, or data that gets updated over time.
          </p>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            <strong style={{ color: "var(--text)" }}>Block-scoped</strong> — this is the key technical property of <code style={{ fontFamily: "var(--font-mono)", color: "var(--secondary)" }}>let</code>. It only exists <em>within the curly braces</em> <code style={{ fontFamily: "var(--font-mono)" }}>{"{ }"}</code> where it was declared. Step outside those braces, and it&apos;s gone. This predictable, contained behaviour is exactly what you want.
          </p>

          <CodeBlock
            code={`// let CAN be declared without a value:
let score;           // score is undefined until assigned
score = 0;           // now it's 0

// Or initialized immediately:
let lives = 3;

// Reassigning is fine — that's the whole point of let:
lives = lives - 1;   // lives = 2
score += 10;         // score = 10

// Block scope — the variable only exists inside { }
if (true) {
  let message = "Hello!";   // only exists inside this if-block
  console.log(message);     // ✅ "Hello!"
}
// console.log(message);    // ❌ ReferenceError: message is not defined
// 'message' ceased to exist when we left the { } above

// Practical example: loop counter
for (let i = 0; i < 3; i++) {
  console.log(i);   // 0, 1, 2
}
// console.log(i);  // ❌ ReferenceError: i is not defined outside the loop`}
            title="let.js"
            highlightLines={[8, 9, 14, 16, 22, 23]}
          />
        </div>
      </FadeInSection>

      {/* ── SECTION 4: var ── */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 800, color: "var(--accent)", fontSize: "1.3rem", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.3)", padding: "2px 12px", borderRadius: 8 }}>var</span>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.6rem", fontWeight: 700, color: "var(--text)" }}>— The Old, Problematic Way</h2>
          </div>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            <code style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>var</code> is the <em>original</em> way to declare variables from JavaScript&apos;s early days (1995). <strong style={{ color: "var(--text)" }}>You won&apos;t use var in modern code</strong>, but you&apos;ll encounter it in old tutorials, legacy codebases, and Stack Overflow answers — so you need to understand what it does and why it&apos;s confusing.
          </p>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            <strong style={{ color: "var(--text)" }}>The two problems with var:</strong>
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 12, padding: "16px 18px" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--error)", marginBottom: 8, fontSize: "0.95rem" }}>Problem 1: Function-scoped, not block-scoped</div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: 10 }}>
                <code style={{ fontFamily: "var(--font-mono)" }}>var</code> leaks out of <code style={{ fontFamily: "var(--font-mono)" }}>if</code> blocks and loops — it only stays inside functions. This causes variables to "escape" in unexpected ways.
              </p>
              <CodeBlock
                code={`if (true) {
  var leaked = "I escaped!";   // var ignores the block {}
  let contained = "I stay here";
}
console.log(leaked);    // ✅ "I escaped!" — var leaked out of the if-block!
console.log(contained); // ❌ ReferenceError — let stayed in the block`}
                title="var-scope.js"
                highlightLines={[2, 5]}
              />
            </div>

            <div style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 12, padding: "16px 18px" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--error)", marginBottom: 8, fontSize: "0.95rem" }}>Problem 2: Hoisting — var gets moved to the top of its scope</div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: 10 }}>
                JavaScript secretly moves all <code style={{ fontFamily: "var(--font-mono)" }}>var</code> declarations to the top of their function before running. The variable exists but is <code style={{ fontFamily: "var(--font-mono)" }}>undefined</code> until the assignment line runs. This means you can use a var before you declare it — and get no error, which hides bugs.
              </p>
              <CodeBlock
                code={`console.log(x); // undefined — no error! x exists but has no value yet
var x = 5;
console.log(x); // 5

// What JavaScript ACTUALLY does behind the scenes:
var x;           // 1. Declaration silently hoisted to top
console.log(x);  // 2. undefined — exists but not yet assigned
x = 5;           // 3. Assignment happens here
console.log(x);  // 4. 5

// With let, you get a proper error:
console.log(y);  // ❌ ReferenceError: Cannot access 'y' before initialization
let y = 5;       // This is the safe behavior — at least you're told about the problem`}
                title="var-hoisting.js"
                highlightLines={[1, 2, 12]}
              />
            </div>
          </div>

          <ConceptCard icon={<AlertTriangle size={16} />} title="Never use var — always use const or let" variant="warning">
            <code style={{ fontFamily: "var(--font-mono)" }}>var</code> doesn&apos;t cause errors often, but when it does cause bugs they&apos;re extremely hard to find because variables exist in unexpected places with unexpected values.
            <br /><br />
            Modern JavaScript (ES6, released 2015+) gave us <code style={{ fontFamily: "var(--font-mono)" }}>let</code> and <code style={{ fontFamily: "var(--font-mono)" }}>const</code> specifically to fix var&apos;s problems. All modern code, all tutorials, and all professional projects use <code style={{ fontFamily: "var(--font-mono)" }}>const</code> and <code style={{ fontFamily: "var(--font-mono)" }}>let</code> exclusively.
          </ConceptCard>
        </div>
      </FadeInSection>

      {/* Interactive visualizer */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>
            👉 Try It — What Happens When You Reassign?
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Click any variable box below and try giving it a new value. Notice how <code style={{ fontFamily: "var(--font-mono)", color: "var(--error)" }}>const</code> refuses and shows a real TypeError, while <code style={{ fontFamily: "var(--font-mono)", color: "var(--secondary)" }}>let</code> happily updates.
          </p>
          <VariableShelfVisualizer />
        </div>
      </FadeInSection>

      {/* JS characteristics: Interpreted + Dynamic */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>
            💡 Two Key Things About How JavaScript Works
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Now that you&apos;ve seen variables in action, here are two important facts about JavaScript that explain <em>why</em> it behaves the way it does:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ background: "var(--bg-surface-2)", border: "1px solid rgba(6,182,212,0.25)", borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>⚡</div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--secondary)", fontSize: "1rem", marginBottom: 6 }}>Interpreted (runs line-by-line)</div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.7 }}>
                Some languages (like C++) need to be fully converted to machine code before they run. JavaScript gets read and run <strong style={{ color: "var(--text)" }}>line-by-line, immediately</strong> — that&apos;s why you can open a browser console and type JS right now. There&apos;s no &quot;compile&quot; step. You write it, it runs.
              </p>
            </div>
            <div style={{ background: "var(--bg-surface-2)", border: "1px solid rgba(251,191,36,0.25)", borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>🔄</div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--accent)", fontSize: "1rem", marginBottom: 6 }}>Dynamically Typed</div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.7 }}>
                In languages like Java, a variable that holds a number can <em>only</em> hold a number forever. In JavaScript, <strong style={{ color: "var(--text)" }}>a variable can hold any type and change freely</strong>: <code style={{ fontFamily: "var(--font-mono)" }}>let x = 5; x = &quot;hello&quot;;</code> works fine. Powerful, but means you must be more careful.
              </p>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ── SECTION 5: Data Types Overview ── */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(139,92,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Layers size={18} style={{ color: "var(--primary)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              Data Types — What Kind of Value Is It?
            </h2>
          </div>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Every value in JavaScript has a <strong style={{ color: "var(--text)" }}>type</strong> — a category that describes what kind of data it is. Types determine what you can do with a value: you can do maths with numbers, join strings together, and check truth with booleans. Understanding types prevents bugs and makes your code more predictable.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.25)", borderRadius: 12, padding: "14px 18px", flex: 1, minWidth: 240 }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--primary)", marginBottom: 8 }}>🧱 Primitive types (7)</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["string", "number", "boolean", "null", "undefined", "symbol", "bigint"].map(t => (
                  <code key={t} style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", background: "rgba(139,92,246,0.1)", color: "var(--primary)", padding: "2px 8px", borderRadius: 5 }}>{t}</code>
                ))}
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", lineHeight: 1.6, marginTop: 10 }}>
                Simple, single values. Stored directly. When you copy them, you get a completely independent copy.
              </p>
            </div>
            <div style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.25)", borderRadius: 12, padding: "14px 18px", flex: 1, minWidth: 240 }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--secondary)", marginBottom: 8 }}>🏗️ Reference types (3)</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["object", "array", "function"].map(t => (
                  <code key={t} style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", background: "rgba(6,182,212,0.1)", color: "var(--secondary)", padding: "2px 8px", borderRadius: 5 }}>{t}</code>
                ))}
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", lineHeight: 1.6, marginTop: 10 }}>
                Complex collections. Stored by reference — when you &quot;copy&quot; one, both variables point to the <em>same</em> data in memory.
              </p>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ── Primitives one by one ── */}

      {/* string */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "1.6rem" }}>📝</span>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 700, color: "var(--text)" }}>
              string — Text
            </h3>
            <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", background: "rgba(5,150,105,0.12)", color: "#059669", padding: "3px 10px", borderRadius: 6, border: "1px solid rgba(5,150,105,0.3)" }}>typeof x === &quot;string&quot;</code>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            A string is a sequence of characters — basically any text. Strings are one of the most used types in all of programming. You use them for names, messages, URLs, HTML, JSON data, and much more.
          </p>
          <CodeBlock
            code={`// Three ways to create a string — all valid:
const a = "Hello";          // double quotes
const b = 'World';          // single quotes
const c = \`Hello World!\`;  // backticks (template literal) — most powerful

// Template literals can embed any JS expression using \${...}:
const name = "Alice";
const age = 25;
const greeting = \`Hi, I'm \${name} and I'm \${age} years old!\`;
// → "Hi, I'm Alice and I'm 25 years old!"

// Useful string operations:
const str = "Hello, World!";
str.length;            // 13  — number of characters
str.toUpperCase();     // "HELLO, WORLD!"
str.toLowerCase();     // "hello, world!"
str.includes("World"); // true
str.startsWith("He");  // true
str.slice(0, 5);       // "Hello"  (start index, end index)
str.replace("World", "JS");  // "Hello, JS!"
str.split(", ");       // ["Hello", "World!"]  (splits into array)
str.trim();            // removes whitespace from both ends

// Strings are immutable — you can't change a character in place.
// String methods always return a NEW string:
let msg = "hello";
msg.toUpperCase();      // returns "HELLO", but msg is still "hello"
msg = msg.toUpperCase(); // you must reassign if you want the change`}
            title="string.js"
            highlightLines={[4, 8, 9]}
          />
        </div>
      </FadeInSection>

      {/* number */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "1.6rem" }}>🔢</span>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 700, color: "var(--text)" }}>
              number — All Numeric Values
            </h3>
            <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", background: "rgba(8,145,178,0.12)", color: "#0891b2", padding: "3px 10px", borderRadius: 6, border: "1px solid rgba(8,145,178,0.3)" }}>typeof x === &quot;number&quot;</code>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            JavaScript has just <strong style={{ color: "var(--text)" }}>one number type</strong> for everything — integers, decimals, negatives, very large numbers. This is different from languages like Java or C which have separate types (<code style={{ fontFamily: "var(--font-mono)" }}>int</code>, <code style={{ fontFamily: "var(--font-mono)" }}>float</code>, <code style={{ fontFamily: "var(--font-mono)" }}>double</code>). Convenient, but it comes with one important quirk to be aware of.
          </p>
          <CodeBlock
            code={`const a = 42;          // integer
const b = 3.14;        // decimal
const c = -100;        // negative
const d = 1_000_000;   // underscores for readability (same as 1000000)

// Special number values:
Infinity;   // a number too large to represent
-Infinity;  // less than any number
NaN;        // "Not a Number" — result of invalid math operations

// NaN examples:
"hello" * 5;  // NaN — can't multiply text by a number
0 / 0;        // NaN
Math.sqrt(-1);// NaN

// ⚠️ The famous floating point quirk:
0.1 + 0.2;    // 0.30000000000000004 (not exactly 0.3!)
// This happens in ALL languages that use IEEE 754 floating point — it's not a JS bug.
// Fix: round to a certain number of decimal places when displaying
(0.1 + 0.2).toFixed(2);  // "0.30" (returns a string)

// Useful Math operations:
Math.round(4.7);  // 5
Math.floor(4.9);  // 4  (always rounds down)
Math.ceil(4.1);   // 5  (always rounds up)
Math.abs(-5);     // 5  (absolute value, removes negative sign)
Math.max(2, 7, 1);  // 7
Math.min(2, 7, 1);  // 1
Math.random();    // random number between 0 and 1`}
            title="number.js"
            highlightLines={[16, 17, 19]}
          />
        </div>
      </FadeInSection>

      {/* boolean */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "1.6rem" }}>✅</span>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 700, color: "var(--text)" }}>
              boolean — True or False
            </h3>
            <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", background: "rgba(124,58,237,0.12)", color: "#7c3aed", padding: "3px 10px", borderRadius: 6, border: "1px solid rgba(124,58,237,0.3)" }}>typeof x === &quot;boolean&quot;</code>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            A boolean has exactly two possible values: <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>true</code> or <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>false</code>. They&apos;re the result of comparisons and conditions. Every <code style={{ fontFamily: "var(--font-mono)" }}>if</code> statement, every <code style={{ fontFamily: "var(--font-mono)" }}>while</code> loop, every <code style={{ fontFamily: "var(--font-mono)" }}>&&</code> and <code style={{ fontFamily: "var(--font-mono)" }}>||</code> operator works with booleans.
          </p>
          <CodeBlock
            code={`// Direct boolean values:
const isLoggedIn = true;
const isPremium = false;

// Comparisons return booleans:
5 > 3;          // true
5 === 5;        // true  (strict equality — same type AND same value)
5 !== 3;        // true  (strict inequality)
"a" === "a";    // true

// Logical operators combine booleans:
isLoggedIn && isPremium;   // false  (AND — both must be true)
isLoggedIn || isPremium;   // true   (OR  — at least one must be true)
!isLoggedIn;               // false  (NOT — flips the boolean)

// Truthy and Falsy — any value can be used where a boolean is expected:
// FALSY values (treated as false):  false, 0, "", null, undefined, NaN
// TRUTHY values: everything else — including "0", [], {}

if (0) console.log("won't run");   // 0 is falsy
if ("") console.log("won't run");  // empty string is falsy
if ([]) console.log("will run!");  // [] is TRUTHY — surprising!
if ({}) console.log("will run!");  // {} is also TRUTHY

// Boolean() converts any value to a real boolean:
Boolean(0);          // false
Boolean("");         // false
Boolean("hello");    // true
Boolean([]);         // true`}
            title="boolean.js"
            highlightLines={[5, 6, 7, 10, 11, 12, 20, 21, 22]}
          />
          <ConceptCard icon={<Info size={16} />} title="Truthy and falsy — one of the most important things to memorize" variant="info">
            Memorize these <strong>6 falsy values</strong>: <code style={{ fontFamily: "var(--font-mono)" }}>false</code>, <code style={{ fontFamily: "var(--font-mono)" }}>0</code>, <code style={{ fontFamily: "var(--font-mono)" }}>&quot;&quot;</code> (empty string), <code style={{ fontFamily: "var(--font-mono)" }}>null</code>, <code style={{ fontFamily: "var(--font-mono)" }}>undefined</code>, <code style={{ fontFamily: "var(--font-mono)" }}>NaN</code>.
            <br /><br />
            Everything else is truthy — including <code style={{ fontFamily: "var(--font-mono)" }}>[]</code>, <code style={{ fontFamily: "var(--font-mono)" }}>{"{}"}</code>, <code style={{ fontFamily: "var(--font-mono)" }}>&quot;0&quot;</code>, and <code style={{ fontFamily: "var(--font-mono)" }}>-1</code>. Empty arrays and empty objects being truthy surprises a lot of beginners — but they are!
          </ConceptCard>
        </div>
      </FadeInSection>

      {/* null + undefined */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "1.6rem" }}>👻</span>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 700, color: "var(--text)" }}>
              null & undefined — The Two &quot;Nothings&quot;
            </h3>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Both represent "no value" — but for different reasons. This confused even experienced developers for years, so let&apos;s be very clear about the difference:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 12, padding: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: "1.3rem" }}>🕳️</span>
                <code style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "#6366f1", fontSize: "1rem" }}>null</code>
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.7 }}>
                <strong style={{ color: "var(--text)" }}>Intentional absence.</strong> You set something to null <em>on purpose</em> to say &quot;this has no value right now&quot;. It&apos;s a deliberate choice made by the programmer.
              </p>
              <pre style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "#6366f1", marginTop: 12, background: "rgba(99,102,241,0.06)", padding: "8px 10px", borderRadius: 6, lineHeight: 1.6 }}>
                {`let user = null;\n// user will be set\n// after login`}
              </pre>
            </div>
            <div style={{ background: "rgba(100,116,139,0.08)", border: "1px solid rgba(100,116,139,0.25)", borderRadius: 12, padding: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: "1.3rem" }}>❓</span>
                <code style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "#64748b", fontSize: "1rem" }}>undefined</code>
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.7 }}>
                <strong style={{ color: "var(--text)" }}>Unintentional absence.</strong> JavaScript sets things to undefined automatically when there&apos;s no value yet — declared but not assigned, missing function arguments, missing object properties.
              </p>
              <pre style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "#64748b", marginTop: 12, background: "rgba(100,116,139,0.06)", padding: "8px 10px", borderRadius: 6, lineHeight: 1.6 }}>
                {`let x;  // undefined\nfunction f(a) {\n  console.log(a); // undefined\n}\nf(); // called with no arg`}
              </pre>
            </div>
          </div>
          <CodeBlock
            code={`// The rule of thumb:
// null    = YOU set it to nothing intentionally
// undefined = JS set it to nothing because there's no value yet

// Common places you'll see undefined:
let x;                         // declared but not assigned → undefined
function greet(name) {
  console.log(name);           // undefined if called without argument
}
greet();                       // prints: undefined

const obj = { a: 1 };
console.log(obj.missing);      // undefined — property doesn't exist

// typeof quirk — null says "object" (a 25-year-old JS bug):
typeof null;       // "object"  ← NOT correct, this is a known bug
typeof undefined;  // "undefined" ← correct

// Safe way to check for null:
value === null;          // ✅ correct way
typeof value === "null"; // ❌ typeof null is "object", not "null"!`}
            title="null-vs-undefined.js"
            highlightLines={[15, 16]}
          />
        </div>
      </FadeInSection>

      {/* typeof detector */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 700, color: "var(--text)" }}>
            🔬 The <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>typeof</code> Operator
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>typeof</code> is an operator that returns a string describing the type of a value. Use it whenever you&apos;re debugging and need to know what type something is. Click any value below to see it in action:
          </p>
          <TypeofDetector />
        </div>
      </FadeInSection>

      {/* ── SECTION 6: Reference Types ── */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(6,182,212,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Layers size={18} style={{ color: "var(--secondary)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              Reference Types — Objects, Arrays & Functions
            </h2>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Unlike primitives which hold their value directly, reference types store a <strong style={{ color: "var(--text)" }}>reference (pointer) to a location in memory</strong>. Technically, arrays and functions are both objects under the hood — but they&apos;re so important and have such distinct syntax that we&apos;ll treat each one separately.
          </p>
        </div>
      </FadeInSection>

      {/* Objects */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "1.6rem" }}>📦</span>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 700, color: "var(--text)" }}>
              Objects — Collections of Key-Value Pairs
            </h3>
            <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", background: "rgba(124,58,237,0.12)", color: "#7c3aed", padding: "3px 10px", borderRadius: 6, border: "1px solid rgba(124,58,237,0.3)" }}>typeof x === &quot;object&quot;</code>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            An object is a collection of related data grouped together. Instead of having 10 separate variables for a user (name, age, email...), you put them all in one object. Each piece of data is a <strong style={{ color: "var(--text)" }}>key-value pair</strong> — a label (key) and the data it holds (value).
          </p>
          <CodeBlock
            code={`// Creating an object with curly braces {}:
const user = {
  name: "Alice",         // key: "name", value: "Alice"
  age: 25,              // key: "age",  value: 25
  isLoggedIn: true,     // key: "isLoggedIn", value: true
  address: {            // values can be other objects!
    city: "London",
    country: "UK"
  }
};

// Reading properties — two ways:
user.name;              // "Alice"        — dot notation (preferred)
user["name"];           // "Alice"        — bracket notation (use for dynamic keys)

const key = "age";
user[key];              // 25  — bracket notation with a variable

// Modifying properties:
user.age = 26;          // update an existing property
user.email = "alice@example.com";  // add a new property
delete user.isLoggedIn;  // remove a property

// Checking if a property exists:
"name" in user;         // true
"phone" in user;        // false

// Looping over an object's keys:
for (const key in user) {
  console.log(key, user[key]);
}

// Getting arrays of keys, values, or both:
Object.keys(user);     // ["name", "age", "email", "address"]
Object.values(user);   // ["Alice", 26, "alice@example.com", {...}]
Object.entries(user);  // [["name", "Alice"], ["age", 26], ...]`}
            title="objects.js"
            highlightLines={[2, 12, 13, 18, 19, 20]}
          />
          <ConceptCard icon={<AlertTriangle size={16} />} title="Objects are reference types — copying shares the same data!" variant="warning">
            This is one of the most important things to understand about objects. When you do <code style={{ fontFamily: "var(--font-mono)" }}>const copy = original</code>, you don&apos;t get a copy — you get <em>another pointer to the same object</em>:
            <br /><br />
            <code style={{ fontFamily: "var(--font-mono)" }}>const a = {"{ name: \"Alice\" }"};</code>
            <br />
            <code style={{ fontFamily: "var(--font-mono)" }}>const b = a;  // b and a point to the SAME object</code>
            <br />
            <code style={{ fontFamily: "var(--font-mono)" }}>b.name = &quot;Bob&quot;;</code>
            <br />
            <code style={{ fontFamily: "var(--font-mono)" }}>console.log(a.name); // &quot;Bob&quot; — a changed too!</code>
            <br /><br />
            To make a real copy: <code style={{ fontFamily: "var(--font-mono)" }}>const copy = {"{ ...original }"};</code> (spread syntax — we&apos;ll cover this in Module 11)
          </ConceptCard>
        </div>
      </FadeInSection>

      {/* Arrays */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "1.6rem" }}>📋</span>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 700, color: "var(--text)" }}>
              Arrays — Ordered Lists
            </h3>
            <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", background: "rgba(217,119,6,0.12)", color: "#d97706", padding: "3px 10px", borderRadius: 6, border: "1px solid rgba(217,119,6,0.3)" }}>typeof x === &quot;object&quot; &nbsp;(Array.isArray)</code>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            An array is an ordered list of values. Use arrays when you have <em>multiple items of the same kind</em> — a list of users, a set of scores, a shopping cart. Each item has a numbered position called an <strong style={{ color: "var(--text)" }}>index</strong>, starting at 0 (not 1!).
          </p>
          <CodeBlock
            code={`// Creating an array with square brackets []:
const fruits = ["Apple", "Banana", "Cherry"];
const scores = [95, 80, 72, 65];
const mixed  = [1, "hello", true, null];  // arrays can hold any types

// Accessing items by index (starts at 0):
fruits[0];   // "Apple"   ← first item  (index 0)
fruits[1];   // "Banana"  ← second item (index 1)
fruits[2];   // "Cherry"  ← last item   (index 2)
fruits[3];   // undefined ← doesn't exist

// Useful properties and methods:
fruits.length;         // 3  — number of items

// Adding items:
fruits.push("Mango");  // adds to the END  → ["Apple", "Banana", "Cherry", "Mango"]
fruits.unshift("Kiwi");// adds to the START → ["Kiwi", "Apple", ...]

// Removing items:
fruits.pop();          // removes and returns last item
fruits.shift();        // removes and returns first item

// Finding items:
fruits.indexOf("Banana");    // 1  — returns index, or -1 if not found
fruits.includes("Cherry");   // true

// Arrays are REFERENCE types too — same copying behavior as objects:
const a = [1, 2, 3];
const b = a;      // b and a point to SAME array
b.push(4);
console.log(a);   // [1, 2, 3, 4]  — a was modified through b!

// Check if something is an array:
Array.isArray(fruits);  // true  ← use this, not typeof!
typeof fruits;          // "object"  ← typeof arrays returns "object", not "array"`}
            title="arrays.js"
            highlightLines={[6, 7, 8, 14, 15, 26, 27, 28]}
          />
        </div>
      </FadeInSection>

      {/* Functions */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "1.6rem" }}>⚙️</span>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 700, color: "var(--text)" }}>
              Functions — Reusable Blocks of Code
            </h3>
            <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", background: "rgba(5,150,105,0.12)", color: "#059669", padding: "3px 10px", borderRadius: 6, border: "1px solid rgba(5,150,105,0.3)" }}>typeof x === &quot;function&quot;</code>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            A function is a reusable block of code with a name. You define it once and call it as many times as you need. Functions are themselves values in JavaScript — you can store them in variables, pass them to other functions, and return them. This is why JavaScript is called a language with <strong style={{ color: "var(--text)" }}>first-class functions</strong>. We cover functions in full depth in Module 5 — but here&apos;s the key idea:
          </p>
          <CodeBlock
            code={`// Defining a function:
function greet(name) {
  return "Hello, " + name + "!";
}

// Calling (invoking) it:
greet("Alice");  // "Hello, Alice!"
greet("Bob");    // "Hello, Bob!"
// Same code, different inputs, different results — that's the power!

// Functions are VALUES — you can store them in variables:
const add = function(a, b) {
  return a + b;
};

// Arrow function — a shorter way to write the same thing:
const multiply = (a, b) => a * b;

// Functions can be passed to other functions:
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);  // passes a function to .map()
// doubled = [2, 4, 6, 8, 10]

// typeof a function:
typeof greet;   // "function" — one of the few times typeof is helpful!`}
            title="functions.js"
            highlightLines={[2, 11, 15, 18, 19]}
          />
          <ConceptCard icon={<Info size={16} />} title="Functions are objects under the hood" variant="info">
            In JavaScript, functions are a special kind of object. That&apos;s why <code style={{ fontFamily: "var(--font-mono)" }}>typeof function(){"{}"}</code> returns <code style={{ fontFamily: "var(--font-mono)" }}>&quot;function&quot;</code> — JavaScript makes an exception for functions in typeof, even though internally they&apos;re objects.
            <br /><br />
            This means functions can have properties, can be stored in arrays, and can be passed around just like any other value. We&apos;ll dive much deeper into functions in Module 5.
          </ConceptCard>
        </div>
      </FadeInSection>

      {/* ── SECTION 7: Type Coercion ── */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
            ⚡ Type Coercion — JavaScript's Automatic Conversions
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Here&apos;s where JavaScript being &quot;dynamically typed&quot; causes some genuinely confusing behaviour. When you try to combine values of different types (like adding a string to a number), JavaScript doesn&apos;t throw an error — it quietly <strong style={{ color: "var(--text)" }}>converts one of them</strong> to make it work. This is called <strong style={{ color: "var(--text)" }}>type coercion</strong>.
          </p>
          <CodeBlock
            code={`// The + operator does BOTH addition AND string joining:
"5" + 3;       // "53"   — the number 3 became a string (joining wins)
5 + "3";       // "53"   — same, string wins with +
true + 1;      // 2      — true becomes 1
false + 1;     // 1      — false becomes 0

// Any other operator forces numbers:
"5" - 3;       // 2     — "5" is coerced to number 5
"10" * "3";    // 30    — both become numbers
"5" - "hi";   // NaN   — "hi" can't become a number → NaN

// == vs === — the most important coercion rule to know:
// == (loose equality): allows coercion — AVOID THIS
"5" == 5;      // true  — "5" converted to 5 before comparing
0 == false;    // true  — false becomes 0
"" == false;   // true  — both become 0
null == undefined; // true  — special case

// === (strict equality): NO coercion — ALWAYS USE THIS
"5" === 5;     // false — different types, comparison stops
0 === false;   // false — number vs boolean
null === undefined; // false

// Explicit conversion is safer and clearer:
Number("5");     // 5      — string to number
Number("hello"); // NaN    — fails gracefully
String(5);       // "5"    — number to string
Boolean(0);      // false  — to boolean
parseInt("42px");// 42     — parses the number at the start
parseFloat("3.14abc"); // 3.14`}
            title="type-coercion.js"
            highlightLines={[11, 12, 17, 18, 19, 20, 22]}
          />
          <ConceptCard icon={<AlertTriangle size={16} />} title="Always use === not ==" variant="warning">
            <code style={{ fontFamily: "var(--font-mono)" }}>=</code> assigns. <code style={{ fontFamily: "var(--font-mono)" }}>==</code> compares with coercion (unreliable). <code style={{ fontFamily: "var(--font-mono)" }}>===</code> compares strictly (what you want).
            <br /><br />
            Using <code style={{ fontFamily: "var(--font-mono)" }}>==</code> can produce results that seem completely illogical: <code style={{ fontFamily: "var(--font-mono)" }}>&quot;&quot; == false</code> is <code style={{ fontFamily: "var(--font-mono)" }}>true</code>, <code style={{ fontFamily: "var(--font-mono)" }}>null == undefined</code> is <code style={{ fontFamily: "var(--font-mono)" }}>true</code>, and <code style={{ fontFamily: "var(--font-mono)" }}>[] == false</code> is also <code style={{ fontFamily: "var(--font-mono)" }}>true</code>.
            Just use <code style={{ fontFamily: "var(--font-mono)" }}>===</code> everywhere and you sidestep all of this.
          </ConceptCard>
        </div>
      </FadeInSection>

      {/* ── Quiz ── */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>🧠 Quick Check</h2>

          <QuizCard
            question='What is the difference between null and undefined?'
            options={[
              { label: "They are exactly the same thing — just different names", correct: false, explanation: "They're similar but not the same! null === undefined is false. Both represent 'no value', but null is set intentionally by the programmer, while undefined is set automatically by JavaScript when there's no value yet." },
              { label: "null means intentionally no value (set by you); undefined means automatically no value (set by JS)", correct: true, explanation: "Exactly right! You use null to explicitly say 'this holds nothing right now'. JavaScript uses undefined when a variable is declared but not assigned, when a function argument is missing, or when an object property doesn't exist. Knowing this distinction helps you debug much faster." },
              { label: "null is for numbers, undefined is for strings", correct: false, explanation: "Not at all — both null and undefined can be assigned to any variable regardless of what type it previously held. They're about the absence of value, not about any particular type." },
              { label: "undefined causes errors, null does not", correct: false, explanation: "Both can cause errors if you try to do things with them (like calling .length on null). The key difference is intentionality: null is deliberate, undefined is JavaScript saying 'I don't have a value for this'." },
            ]}
            hint="One is set by you; the other is set by JavaScript..."
          />

          <QuizCard
            question='const user = { name: "Alice" }; user.name = "Bob"; — does this cause a TypeError?'
            options={[
              { label: "Yes — user is const, so nothing about it can change", correct: false, explanation: "This is the most common misconception about const! const does NOT freeze the value. It only prevents re-assigning the variable itself (user = something_else). It does NOT prevent modifying what's inside the object." },
              { label: "No — const only prevents reassigning the variable, not changing the object's properties", correct: true, explanation: "Correct! const means 'this variable cannot be reassigned to point at a different object'. But you can absolutely change the contents of the object it points to. Think of it as: the name tag (const) is locked onto this box, but the box's contents can change freely. To prevent property changes too, you'd need Object.freeze(user)." },
              { label: "It depends on whether 'Alice' and 'Bob' have the same length", correct: false, explanation: "The length of the strings is completely irrelevant here. The question is purely about const and whether it prevents property changes — and it does not." },
              { label: "It causes a TypeError only in strict mode", correct: false, explanation: "Even in strict mode, reassigning a const variable's property is allowed. Strict mode would cause an error if you tried to re-assign the variable itself: user = { name: 'Bob' } — that would throw in both strict and non-strict mode." },
            ]}
            hint="Think about what const actually locks — the variable binding, or the object's contents?"
          />
        </div>
      </FadeInSection>

      {/* ── Summary ── */}
      <FadeInSection delay={0.1}>
        <div style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.08), rgba(139,92,246,0.08))", border: "1px solid rgba(6,182,212,0.2)", borderRadius: 14, padding: "24px 28px" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>
            📚 What You Just Learned
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              "const — declares a variable that cannot be reassigned. Use it by default. It does NOT freeze objects/arrays — only prevents pointing the variable at something new. Always initialize at declaration.",
              "let — declares a reassignable, block-scoped variable. Use it when a value needs to change. Block-scoped means it only exists inside the { } where it was declared.",
              "var — the old way. Function-scoped instead of block-scoped (leaks from if/for blocks), and gets hoisted (moved to top of function). Never use var in modern code.",
              "7 primitive types: string (text), number (all numbers — integers and decimals), boolean (true/false), null (intentionally empty), undefined (automatically empty), symbol (unique key), bigint (very large integers).",
              "3 reference types: objects (key-value pairs), arrays (ordered lists), functions (reusable code blocks). All three are objects under the hood but have distinct syntax and purpose.",
              "Primitives are copied by VALUE (independent copy). Reference types are copied by REFERENCE (shared pointer — changing one changes both). This is critical to understand.",
              "Type coercion: JS automatically converts types in some situations. The + operator prefers strings. Use === (strict equals) not == (loose equals) to avoid coercion surprises.",
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--secondary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

    </div>
  );
}
