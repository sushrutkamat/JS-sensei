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

export function Module1Content() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>

      {/* Welcome */}
      <FadeInSection>
        <div style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.10), rgba(6,182,212,0.06))", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 14, padding: "24px 28px" }}>
          <p style={{ fontSize: "1.05rem", color: "var(--text)", lineHeight: 1.9 }}>
            👋 <strong>Welcome!</strong> Before you write a single line of code, it helps to understand <em>what JavaScript actually is</em> and <em>how the computer understands it</em>.
            Don&apos;t worry — we&apos;re starting from absolute zero. No experience needed. By the end of this module you&apos;ll know things that even some experienced developers don&apos;t!
          </p>
        </div>
      </FadeInSection>

      {/* Section 1: What is JavaScript? */}
      <FadeInSection>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(139,92,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={18} style={{ color: "var(--primary)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              What exactly IS JavaScript?
            </h2>
          </div>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            You&apos;ve probably seen websites that do amazing things — buttons that change colour when you click them, forms that validate your email as you type, infinite scroll feeds.
            All of that is <strong style={{ color: "var(--text)" }}>JavaScript</strong> — a programming language that runs <em>inside your browser</em> and makes web pages come to life.
          </p>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            HTML builds the skeleton of a page (headings, paragraphs, buttons). CSS makes it look nice (colours, fonts, layout).
            JavaScript is the <strong style={{ color: "var(--text)" }}>brain</strong> — it makes things <em>do</em> stuff. If a website is a person, HTML is the bones, CSS is the clothes, and JavaScript is the personality.
          </p>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            JavaScript has four key characteristics. Don&apos;t worry about memorising these — just read them and let them sink in. You&apos;ll understand them deeply by the end of this course.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
            {[
              {
                label: "Single-threaded",
                icon: "🧵",
                desc: "JavaScript can only do ONE thing at a time. Imagine a chef who has one pair of hands — they can only chop one thing, stir one pot, or plate one dish at a moment. But they're very fast and clever about juggling tasks!",
                color: "var(--primary)"
              },
              {
                label: "Interpreted",
                icon: "⚡",
                desc: "Some languages (like C++) need to be fully converted to machine code before they can run. JavaScript gets read and run line-by-line, immediately. That's why you can open a browser console and type JS right now!",
                color: "var(--secondary)"
              },
              {
                label: "Dynamic",
                icon: "🔄",
                desc: "In some languages, a variable that holds a number can ONLY hold a number forever. In JavaScript, a variable can hold a number, then a string, then an object — it's very flexible. We'll explore this in Module 2.",
                color: "var(--accent)"
              },
              {
                label: "Event-driven",
                icon: "🖱️",
                desc: "JavaScript spends most of its time waiting. Waiting for you to click, type, scroll, or for data to arrive from a server. When something happens (an 'event'), JavaScript springs into action and responds.",
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

          <ConceptCard icon={<Info size={16} />} title="A helpful real-world picture 🍳" variant="info">
            Think of JavaScript like a <strong>chef cooking on their own</strong>. They can only actively cook one dish at a time with their hands — they&apos;re single-threaded.
            <br /><br />
            But they&apos;re smart! They put pasta water on to boil (an async task — the stove does the work), then start chopping vegetables while the water heats up.
            When the water boils, they&apos;re notified (an event!) and pour in the pasta.
            <br /><br />
            They&apos;re not doing two things at once — but they&apos;re incredibly efficient about <em>not wasting time waiting</em>. That&apos;s exactly how JavaScript works!
          </ConceptCard>
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
              How Does the Browser Actually Run Your Code?
            </h2>
          </div>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Here&apos;s something that might surprise you: <strong style={{ color: "var(--text)" }}>computers don&apos;t understand JavaScript</strong>. CPUs (the brains of computers) only understand very low-level instructions — basically just 1s and 0s representing add, move, jump, etc.
          </p>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            So how does your browser run JavaScript? It uses a program called a <strong style={{ color: "var(--text)" }}>JavaScript Engine</strong> that acts as a translator.
            Google Chrome (and Node.js) use an engine called <strong style={{ color: "var(--primary)" }}>V8</strong>. Firefox uses one called SpiderMonkey. Safari uses JavaScriptCore.
            They all do the same job — translate your human-readable code into something the CPU can execute.
          </p>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            This translation happens in several stages. Each stage does a specific job.
            Click any stage in the visualiser below to see what it does, or press <strong style={{ color: "var(--secondary)" }}>&quot;Run Code&quot;</strong> to watch your code travel through the whole pipeline!
          </p>

          <EnginePipelineVisualizer />

          <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.8 }}>
            💡 <strong style={{ color: "var(--text)" }}>You don&apos;t need to memorise these stages.</strong> Just appreciate that a lot of clever work happens automatically every time you write JavaScript. Here&apos;s a simple example of what the engine processes:
          </p>

          <CodeBlock
            code={`// You write this human-friendly code:
function greet(name) {
  return "Hello, " + name + "!";
}

// The engine translates and runs it.
// You can call it like this:
console.log(greet("World")); // Output: Hello, World!`}
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
            Imagine JavaScript is reading your code and encounters a function call. How does it remember to <em>come back</em> to where it was after that function finishes?
            It uses something called the <strong style={{ color: "var(--text)" }}>Call Stack</strong> — a list of &quot;where I am right now&quot; bookmarks.
          </p>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Every time you call a function, JavaScript writes it on top of the stack (like stacking a new plate). When the function finishes, it erases that top entry and goes back to whatever was below it.
            This is why it&apos;s called a <strong style={{ color: "var(--text)" }}>&quot;stack&quot;</strong> — it works just like a stack of plates:
          </p>

          <ConceptCard icon={<Layers size={16} />} title="🍽️ The Stack of Plates" variant="tip">
            <strong>Imagine stacking plates in a canteen.</strong>
            <br /><br />
            You can only add to the <em>top</em> and only take from the <em>top</em>. You can&apos;t pull a plate from the middle — the pile would fall over!
            <br /><br />
            The Call Stack works the same way. Functions pile up on top of each other.
            The one on top is always &quot;running right now&quot;. When it finishes, it&apos;s removed and the one below continues.
            Computer scientists call this style <strong>Last In, First Out</strong> — the last plate you put on is the first one you take off.
          </ConceptCard>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            In the example below, <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>printSquare(5)</code> calls <code style={{ fontFamily: "var(--font-mono)", color: "var(--secondary)" }}>square(5)</code>, which calls <code style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>multiply(5, 5)</code>.
            Watch how the stack builds up and then collapses as each function finishes. Press <strong style={{ color: "var(--secondary)" }}>Play</strong> or step through using the arrow buttons!
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
            <br /><br />
            <strong>Good news:</strong> this almost always means you just forgot a stopping condition in your code — it&apos;s a very fixable mistake!
          </ConceptCard>

          <CodeBlock
            code={`// BAD: This causes a Stack Overflow!
// (The function calls itself with no way to stop)
function infinite() {
  infinite(); // Calls itself... forever
}
infinite(); // Error: Maximum call stack size exceeded

// GOOD: This is fine — it has a "base case" that stops it
function countdown(n) {
  if (n <= 0) return "Done!"; // This stops the function
  return countdown(n - 1);   // Otherwise, count down by 1
}
countdown(3); // "Done!" — it ran 4 times then stopped`}
            title="stack-overflow-example.js"
            highlightLines={[3, 4, 10, 11]}
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
            The <strong style={{ color: "var(--text)" }}>Call Stack</strong> tells JavaScript <em>where it is in your code</em> (which function it&apos;s currently running).
            But where does it actually <em>store your data</em> — your variables, arrays, objects?
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            That&apos;s the job of the <strong style={{ color: "var(--text)" }}>Memory Heap</strong> — think of it like a giant <em>warehouse</em> where all the boxes (variables) are stored.
            When you create a variable (<code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>let score = 0</code>), JavaScript finds a free spot in the warehouse and puts your data there.
          </p>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            One of the nicest things about JavaScript is that you <strong style={{ color: "var(--text)" }}>never have to clean up after yourself</strong>.
            When a function finishes and its variables are no longer needed, JavaScript automatically frees up that warehouse space.
            This magical cleanup process is called <strong style={{ color: "var(--text)" }}>Garbage Collection</strong>.
            (In older languages like C, programmers had to do this manually — which caused many tricky bugs!)
          </p>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            In the visualiser below, each floating bubble is a variable living in the heap. Click a bubble to select it, then click &quot;Pop (GC)&quot; to simulate garbage collection removing it from memory. Try clearing them all!
          </p>

          <MemoryHeapVisualizer />

          <ConceptCard icon={<Info size={16} />} title="Two types of data: small and large" variant="info">
            JavaScript handles two categories of data differently:
            <br /><br />
            <strong>Simple values</strong> (numbers, strings, booleans, null, undefined) are small and simple — they&apos;re stored <em>directly in the Call Stack</em> because they&apos;re quick to copy around.
            <br /><br />
            <strong>Complex values</strong> (objects, arrays, functions) can be very large — so they&apos;re stored in the <em>Memory Heap</em>, and the variable just holds a &quot;pointer&quot; (like an address) saying where to find the data.
            <br /><br />
            This difference causes a very important behaviour: when you copy a simple value, you get a <em>real copy</em>. When you copy an object, you get a copy of the <em>address</em> — both variables now point to the <em>same thing</em>!
          </ConceptCard>

          <CodeBlock
            code={`// Simple values are copied by VALUE
// (You get a completely independent copy)
let score = 10;
let backup = score;  // backup gets its OWN copy of 10
backup = 99;
console.log(score);  // 10 — score is completely untouched!

// Objects are copied by REFERENCE
// (Both variables point to the same data)
let alice = { name: "Alice", age: 25 };
let alsoAlice = alice; // alsoAlice gets the same ADDRESS, not a copy!

alsoAlice.name = "Bob"; // We're changing the data at that address
console.log(alice.name); // "Bob"! alice and alsoAlice share the same object!
// This surprises many beginners — keep it in mind!`}
            title="value-vs-reference.js"
            highlightLines={[4, 11, 13, 14]}
          />
        </div>
      </FadeInSection>

      {/* Quiz */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>
            🧠 Quick Check — Let&apos;s Make Sure It&apos;s Sticking!
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.7 }}>
            Take a guess — even if you&apos;re not sure! Making mistakes here is part of the learning. Read the explanation after each answer.
          </p>

          <QuizCard
            question="You call a function inside another function. What does JavaScript add to the Call Stack?"
            options={[
              { label: "A new CPU thread so both functions run at the same time", correct: false, explanation: "JavaScript only ever has ONE thread — it can't run two things simultaneously. Multiple threads would require Web Workers, which is an advanced topic for later." },
              { label: "A new 'frame' (like a card) for the inner function, placed on top", correct: true, explanation: "Exactly right! Each function call adds a new frame to the top of the Call Stack. That frame holds the function's local variables and a note of where to return to when it finishes. The function on top is always the one currently running." },
              { label: "A copy of the entire script, which then runs separately", correct: false, explanation: "JavaScript doesn't copy your whole script! It just tracks which function is active using the Call Stack. Very efficient — just a small card added on top." },
              { label: "The function is stored in the Memory Heap until it can run", correct: false, explanation: "Function definitions (the code itself) live in the Memory Heap, yes — but when you CALL a function, a frame is added to the Call Stack immediately and it starts running right away." },
            ]}
            hint="Remember the stack of plates — each new function call = a new plate on top..."
          />

          <QuizCard
            question="What is Garbage Collection, and why is it helpful?"
            options={[
              { label: "A tool that deletes old files from your hard drive", correct: false, explanation: "Garbage Collection is nothing to do with files on your computer! It's a memory management feature built into JavaScript itself." },
              { label: "JavaScript automatically freeing up memory for variables that are no longer needed", correct: true, explanation: "Exactly! When a variable goes out of reach — for example, when a function finishes running — JS's Garbage Collector automatically releases that memory. You never have to worry about it. Languages like C make programmers do this manually, which leads to 'memory leaks' — a common source of bugs." },
              { label: "An error message that appears when your computer runs out of RAM", correct: false, explanation: "Running out of RAM would give an 'out of memory' error. Garbage Collection is the thing that PREVENTS that from happening — it frees up memory before it fills up!" },
              { label: "When you use the delete keyword to remove a variable", correct: false, explanation: "The delete keyword removes a property from an object, which is different. Garbage Collection is a fully automatic background process — you don't trigger it yourself, JavaScript handles it for you." },
            ]}
            hint="Think about what happens to your variables when a function finishes..."
          />
        </div>
      </FadeInSection>

      {/* Summary */}
      <FadeInSection delay={0.1}>
        <div style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(6,182,212,0.08))", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 14, padding: "24px 28px" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>
            📚 What You Just Learned
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: 16, lineHeight: 1.6 }}>
            You now understand the foundations that almost everything else in JavaScript is built on. These concepts will keep coming up throughout this entire course!
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { point: "JavaScript is a programming language that lives in the browser and makes web pages interactive. It's single-threaded (one thing at a time), interpreted (runs line by line), dynamic (flexible with types), and event-driven (waits and responds).", emoji: "🌐" },
              { point: "Your browser has a JavaScript Engine (like V8 in Chrome) that translates your human-readable code into machine instructions the CPU can execute. This happens automatically every time your page loads.", emoji: "⚙️" },
              { point: "The Call Stack is JavaScript's 'I am here' tracker. Every function call adds a frame on top; when it finishes, that frame is removed. Functions are always executed from top to bottom of the stack.", emoji: "📋" },
              { point: "The Memory Heap is the warehouse where all your data lives — variables, objects, arrays. JavaScript automatically cleans up unused data via Garbage Collection so you never have to manage memory yourself.", emoji: "🏭" },
              { point: "Important difference: simple values (numbers, strings) are copied by value (independent copies). Objects and arrays are copied by reference (both variables share the SAME data). This will catch you off guard at some point — now you're prepared!", emoji: "💡" },
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
