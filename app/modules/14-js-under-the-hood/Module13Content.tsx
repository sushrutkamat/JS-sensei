"use client";

import { FadeInSection } from "@/components/animations/FadeInSection";
import { CodeBlock, QuizCard, ConceptCard } from "@/components/interactive/components";
import { EnginePipelineVisualizer, CallStackVisualizer, MemoryHeapVisualizer } from "@/components/visualizers/Module1Visualizers";
import { Cpu, Layers, Database, Zap, Info } from "lucide-react";

// ── Call Stack Steps Data ──────────────────────────────────────────────────────

const callStackCode = `function multiply(a, b) {
  return a * b;
}

function square(n) {
  return multiply(n, n);
}

function printSquare(n) {
  let result = square(n);
  console.log(result);
}

printSquare(5);`;

const callStackSteps = [
  { frames: [], activeLine: 14, description: "JavaScript starts reading your file from the very top. It sees printSquare(5) on line 14 and prepares to run it." },
  { frames: [{ name: "printSquare", args: "n=5", line: 9, color: "#7c3aed" }], activeLine: 10, description: "JS calls printSquare(5) — so it places a card labelled 'printSquare' on the stack. Now JS is running code inside printSquare. The highlighted line shows exactly where it is." },
  { frames: [{ name: "printSquare", args: "n=5", line: 9, color: "#7c3aed" }, { name: "square", args: "n=5", line: 5, color: "#0891b2" }], activeLine: 6, description: "Inside printSquare, it calls square(5). A new card is added ON TOP. Notice printSquare is still there, waiting patiently underneath. JS can only run what's on top!" },
  { frames: [{ name: "printSquare", args: "n=5", line: 9, color: "#7c3aed" }, { name: "square", args: "n=5", line: 5, color: "#0891b2" }, { name: "multiply", args: "a=5, b=5", line: 1, color: "#d97706" }], activeLine: 2, description: "square calls multiply(5, 5) — another card on top! Now there are 3 functions waiting. JavaScript can only work on the TOP one, which is multiply. It will calculate 5 × 5 = 25." },
  { frames: [{ name: "printSquare", args: "n=5", line: 9, color: "#7c3aed" }, { name: "square", args: "n=5", line: 5, color: "#0891b2" }], activeLine: 6, description: "multiply finished its job and returned the answer 25. Its card is removed from the stack. Now square is on top again, and it gets the value 25 back from multiply." },
  { frames: [{ name: "printSquare", args: "n=5", line: 9, color: "#7c3aed" }], activeLine: 10, description: "square also finishes — it passes 25 up to printSquare. Its card is removed. Now printSquare is on top with result = 25, and it's about to call console.log." },
  { frames: [], activeLine: 11, description: "console.log(25) runs and prints the answer! printSquare finishes and its card is removed. The stack is now completely empty — our program is done!", output: "25" },
];

// ── Module Content ─────────────────────────────────────────────────────────────

export function Module13Content() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>

      {/* Welcome */}
      <FadeInSection>
        <div style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.10), rgba(6,182,212,0.06))", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 14, padding: "24px 28px" }}>
          <p style={{ fontSize: "1.05rem", color: "var(--text)", lineHeight: 1.9 }}>
            🔬 <strong>Now that you know functions, closures, objects, and async patterns</strong> — let&apos;s peek behind the curtain.
            This module reveals what JavaScript is actually <em>doing</em> when it runs your code: how the engine translates it, how the call stack tracks function calls, and how the memory heap stores your data.
            Understanding these internals will make you a stronger debugger and a more confident developer.
          </p>
        </div>
      </FadeInSection>

      {/* JS Key Characteristics */}
      <FadeInSection>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(139,92,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={18} style={{ color: "var(--primary)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              JavaScript&apos;s Core Architecture
            </h2>
          </div>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Now that you&apos;ve been writing JS for a while, you&apos;ve experienced its behaviours firsthand. Let&apos;s put a name and deeper understanding to the patterns you&apos;ve already seen:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
            {[
              {
                label: "Single-threaded",
                icon: "🧵",
                desc: "You saw this in the call stack — JS can only execute one function at a time. That's why the event loop was needed for async tasks. One thread, but incredibly efficient at juggling work.",
                color: "var(--primary)"
              },
              {
                label: "JIT Compiled",
                icon: "⚡",
                desc: "V8 doesn't just interpret your code — it compiles hot paths to machine code at runtime (Just-In-Time). That's why JS is much faster than a 'scripting language' label suggests.",
                color: "var(--secondary)"
              },
              {
                label: "Garbage Collected",
                icon: "🗑️",
                desc: "You never had to free memory in any previous module. JS automatically tracks which objects are reachable and frees the rest. This happens in the Memory Heap, which we'll visualise below.",
                color: "var(--accent)"
              },
              {
                label: "Event-driven",
                icon: "🖱️",
                desc: "You saw events in the DOM module and the event loop in async. JS spends most of its time idle, waiting for events — clicks, timers, network responses — then springs into action.",
                color: "var(--success)"
              },
            ].map(item => (
              <div key={item.label} style={{ background: "var(--bg-surface-2)", border: "1px solid var(--border)", borderRadius: 10, padding: "16px" }}>
                <div style={{ fontSize: "1.6rem", marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: item.color, fontSize: "0.9rem", marginBottom: 8 }}>{item.label}</div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* Section 2: Engine Pipeline */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(6,182,212,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Cpu size={18} style={{ color: "var(--secondary)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              The V8 Engine Pipeline — From Source Code to Machine Code
            </h2>
          </div>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            <strong style={{ color: "var(--text)" }}>Computers don&apos;t understand JavaScript.</strong> CPUs only understand very low-level instructions — basically just 1s and 0s. So how does your browser run JavaScript?
            It uses V8 (or SpiderMonkey in Firefox, JavaScriptCore in Safari) as a translator that converts your code through several stages.
          </p>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Click any stage in the visualiser below to see what it does, or press <strong style={{ color: "var(--secondary)" }}>&quot;Run Code&quot;</strong> to watch your code travel through the whole pipeline:
          </p>

          <EnginePipelineVisualizer />

          <CodeBlock
            code={`// You write this human-friendly code:\nfunction greet(name) {\n  return "Hello, " + name + "!";\n}\n\n// The engine translates and runs it.\nconsole.log(greet("World")); // Output: Hello, World!`}
            title="example.js"
          />
        </div>
      </FadeInSection>

      {/* Section 3: Call Stack */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(217,119,6,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Layers size={18} style={{ color: "var(--accent)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              The Call Stack — JavaScript&apos;s To-Do Notepad
            </h2>
          </div>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            You learned functions in Module 5 and closures in Module 6 — now you can see the <em>mechanism</em> behind them.
            When JavaScript encounters a function call, how does it remember to <em>come back</em> to where it was after that function finishes?
            It uses something called the <strong style={{ color: "var(--text)" }}>Call Stack</strong>.
          </p>

          <ConceptCard icon={<Layers size={16} />} title="🍽️ The Stack of Plates" variant="tip">
            <strong>Imagine stacking plates in a canteen.</strong>
            <br /><br />
            You can only add to the <em>top</em> and only take from the <em>top</em>. You can&apos;t pull a plate from the middle — the pile would fall over!
            <br /><br />
            The Call Stack works the same way. Functions pile up on top of each other.
            The one on top is always &quot;running right now&quot;. When it finishes, it&apos;s removed and the one below continues.
            Computer scientists call this style <strong>Last In, First Out (LIFO)</strong>.
          </ConceptCard>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            In the example below, <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>printSquare(5)</code> calls <code style={{ fontFamily: "var(--font-mono)", color: "var(--secondary)" }}>square(5)</code>, which calls <code style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>multiply(5, 5)</code>.
            Watch how the stack builds up and then collapses as each function finishes:
          </p>

          <CallStackVisualizer
            steps={callStackSteps}
            code={callStackCode}
            title="Call Stack — Step Through"
          />

          <ConceptCard icon={<Info size={16} />} title="That famous website — Stack Overflow" variant="warning">
            You may have heard of <strong>Stack Overflow</strong> — the programming Q&A website that developers use every day.
            The name comes from a real error that happens in code!
            <br /><br />
            If a function calls itself over and over forever (called &quot;infinite recursion&quot;), the Call Stack keeps getting bigger and bigger... until it literally <em>overflows</em> its limit.
            Your browser will show &quot;<code>Maximum call stack size exceeded</code>&quot; and stop running.
          </ConceptCard>

          <CodeBlock
            code={`// BAD: This causes a Stack Overflow!\nfunction infinite() {\n  infinite(); // Calls itself... forever\n}\ninfinite(); // Error: Maximum call stack size exceeded\n\n// GOOD: This is fine — it has a "base case" that stops it\nfunction countdown(n) {\n  if (n <= 0) return "Done!";\n  return countdown(n - 1);\n}\ncountdown(3); // "Done!" — it ran 4 times then stopped`}
            title="stack-overflow-example.js"
            highlightLines={[3, 4, 9, 10]}
          />
        </div>
      </FadeInSection>

      {/* Section 4: Memory Heap */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(5,150,105,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Database size={18} style={{ color: "var(--success)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              The Memory Heap — Where Your Data Lives
            </h2>
          </div>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            The <strong style={{ color: "var(--text)" }}>Call Stack</strong> tells JavaScript <em>where it is in your code</em>.
            But where does it actually <em>store your data</em> — your variables, arrays, objects?
            That&apos;s the job of the <strong style={{ color: "var(--text)" }}>Memory Heap</strong> — think of it like a giant <em>warehouse</em> where all the boxes (variables) are stored.
          </p>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Remember from Module 7 (Objects) how we discussed that objects are stored <em>by reference</em>? Now you can see exactly where they live — in the heap!
            And remember how closures (Module 6) keep variables alive? Those closed-over variables persist in the heap as long as the closure references them.
          </p>

          <MemoryHeapVisualizer />

          <ConceptCard icon={<Info size={16} />} title="Two types of data: Stack vs Heap" variant="info">
            JavaScript handles two categories of data differently:
            <br /><br />
            <strong>Primitives</strong> (numbers, strings, booleans, null, undefined) are small and simple — they&apos;re stored <em>directly in the Call Stack</em> because they&apos;re quick to copy around.
            <br /><br />
            <strong>Objects, arrays, and functions</strong> can be very large — so they&apos;re stored in the <em>Memory Heap</em>, and the variable just holds a &quot;pointer&quot; (an address) saying where to find the data.
            <br /><br />
            This is exactly why <code style={{ fontFamily: "var(--font-mono)" }}>const obj1 = obj2</code> shares the same data (Module 7) — both variables hold the same heap address!
          </ConceptCard>

          <CodeBlock
            code={`// Simple values are copied by VALUE\nlet score = 10;\nlet backup = score;  // backup gets its OWN independent copy\nbackup = 99;\nconsole.log(score);  // 10 — untouched!\n\n// Objects are copied by REFERENCE\nlet alice = { name: "Alice", age: 25 };\nlet alsoAlice = alice; // same ADDRESS, not a copy!\nalsoAlice.name = "Bob";\nconsole.log(alice.name); // "Bob"! They share the same heap object!`}
            title="value-vs-reference.js"
            highlightLines={[3, 9, 11]}
          />
        </div>
      </FadeInSection>

      {/* Quiz */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>🧠 Quick Check</h2>

          <QuizCard
            question="You call a function inside another function. What does JavaScript add to the Call Stack?"
            options={[
              { label: "A new CPU thread so both functions run at the same time", correct: false, explanation: "JavaScript only ever has ONE thread — it can't run two things simultaneously. You saw this with the event loop in Module 10." },
              { label: "A new 'frame' (like a card) for the inner function, placed on top", correct: true, explanation: "Exactly right! Each function call adds a new frame to the top of the Call Stack. That frame holds the function's local variables and a note of where to return to when it finishes." },
              { label: "A copy of the entire script, which then runs separately", correct: false, explanation: "JavaScript doesn't copy your whole script! It just tracks which function is active using the Call Stack." },
              { label: "The function is stored in the Memory Heap until it can run", correct: false, explanation: "Function definitions live in the Memory Heap, yes — but when you CALL a function, a frame is added to the Call Stack immediately." },
            ]}
            hint="Remember the stack of plates — each new function call = a new plate on top..."
          />

          <QuizCard
            question="What is Garbage Collection?"
            options={[
              { label: "A tool that deletes old files from your hard drive", correct: false, explanation: "Garbage Collection has nothing to do with files! It's a memory management feature inside the JavaScript engine." },
              { label: "JavaScript automatically freeing up memory for variables that are no longer reachable", correct: true, explanation: "Exactly! When a variable goes out of reach — for example, when a function finishes and no closure references its variables — JS's Garbage Collector automatically releases that memory from the heap." },
              { label: "An error message that appears when your computer runs out of RAM", correct: false, explanation: "Running out of RAM would give an 'out of memory' error. Garbage Collection is the thing that PREVENTS that from happening." },
              { label: "When you use the delete keyword to remove a variable", correct: false, explanation: "The delete keyword removes an object property. Garbage Collection is a fully automatic background process — you don't trigger it yourself." },
            ]}
            hint="Think about what happens to variables when the function that created them finishes..."
          />
        </div>
      </FadeInSection>

      {/* Summary */}
      <FadeInSection delay={0.1}>
        <div style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(6,182,212,0.08))", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 14, padding: "24px 28px" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>
            📚 What You Just Learned
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { point: "The V8 engine translates your JavaScript through a pipeline: parsing → AST → bytecode → optimised machine code. This JIT compilation is why JavaScript is fast despite being a 'dynamic' language.", emoji: "⚙️" },
              { point: "The Call Stack is JavaScript's 'I am here' tracker. Every function call adds a frame on top; when it finishes, that frame is removed. This is the mechanism behind scope, closures, and why stack overflow errors happen.", emoji: "📋" },
              { point: "The Memory Heap is the warehouse where all your objects, arrays, and functions live. Primitives live on the stack. Variables pointing to heap objects hold addresses (references), not the data itself.", emoji: "🏭" },
              { point: "Garbage Collection automatically frees heap memory when objects become unreachable. Closures keep their closed-over variables alive in the heap — that's why they can remember values after the outer function returns.", emoji: "🗑️" },
              { point: "These internals connect everything: functions (Module 5), closures (Module 6), reference semantics (Module 7), and the event loop (Module 10) all operate through the call stack and memory heap working together.", emoji: "🔗" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>{item.point}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

    </div>
  );
}
