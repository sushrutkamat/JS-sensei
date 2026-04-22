"use client";

import { FadeInSection } from "@/components/animations/FadeInSection";
import { CodeBlock, QuizCard, ConceptCard } from "@/components/interactive/components";
import { EnvironmentChecklist, ScriptTagDemo, WhereJSRunsDiagram } from "@/components/visualizers/Module1GettingStartedVisualizers";
import { Zap, Monitor, Terminal, Info, Lightbulb } from "lucide-react";

export function Module1Content() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>

      {/* Welcome */}
      <FadeInSection>
        <div style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.10), rgba(6,182,212,0.06))", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 14, padding: "24px 28px" }}>
          <p style={{ fontSize: "1.05rem", color: "var(--text)", lineHeight: 1.9 }}>
            👋 <strong>Welcome to your JavaScript journey!</strong> This very first module will get you set up and writing real code in under 20 minutes.
            No downloads, no installation headaches — we&apos;ll walk through every step together. By the end, you&apos;ll have written JavaScript that actually runs.
          </p>
        </div>
      </FadeInSection>

      {/* What is JavaScript? */}
      <FadeInSection>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(139,92,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={18} style={{ color: "var(--primary)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              What Exactly IS JavaScript?
            </h2>
          </div>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            You&apos;ve probably seen websites that do amazing things — buttons that change colour when you click them, forms that validate your email as you type, infinite scroll feeds.
            All of that is <strong style={{ color: "var(--text)" }}>JavaScript</strong> — a programming language that runs <em>inside your browser</em> and makes web pages come to life.
          </p>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Every website is built with three languages working together:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {[
              { label: "HTML", emoji: "🦴", role: "The skeleton", desc: "Headings, paragraphs, buttons, images — the raw content and structure of the page.", color: "#d97706" },
              { label: "CSS", emoji: "👗", role: "The clothes", desc: "Colours, fonts, spacing, layout — everything that makes the page look nice.", color: "#db2777" },
              { label: "JavaScript", emoji: "🧠", role: "The brain", desc: "Makes things happen — clicking, typing, loading data, animations. The interactive behaviour.", color: "#7c3aed" },
            ].map(item => (
              <div key={item.label} style={{ background: "var(--bg-surface-2)", border: `1px solid ${item.color}30`, borderRadius: 12, padding: 18, textAlign: "center" }}>
                <div style={{ fontSize: "2rem", marginBottom: 8 }}>{item.emoji}</div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: item.color, fontSize: "1rem", marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--text)", fontSize: "0.85rem", marginBottom: 6 }}>{item.role}</div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            If a website is a person: HTML is the bones, CSS is the clothes, and <strong style={{ color: "var(--text)" }}>JavaScript is the personality</strong> — it&apos;s what makes the person <em>do things</em> and <em>react</em> to the world around them.
          </p>
        </div>
      </FadeInSection>

      {/* Where does JS run? */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(6,182,212,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Monitor size={18} style={{ color: "var(--secondary)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              Where Does JavaScript Run?
            </h2>
          </div>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            JavaScript is unusual — it can run in <strong style={{ color: "var(--text)" }}>two completely different places</strong>.
            Most programming languages need a special setup. But JavaScript can run right inside your web browser (you have one open right now!), or on your computer using a tool called <strong style={{ color: "var(--text)" }}>Node.js</strong>.
          </p>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Both use the same engine under the hood — Google&apos;s <strong style={{ color: "var(--primary)" }}>V8 engine</strong>. Think of V8 as a translator that converts your human-readable JavaScript into instructions the computer&apos;s CPU can understand. Chrome and Node.js both have V8 built in — that&apos;s why the same code works in both places.
          </p>

          <WhereJSRunsDiagram />
        </div>
      </FadeInSection>

      {/* Setting up your environment */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(5,150,105,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Terminal size={18} style={{ color: "var(--success)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              Setting Up Your Environment
            </h2>
          </div>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Before writing code, you need a place to write it. Don&apos;t worry — this takes about 5 minutes and you only need to do it once.
            Go through this checklist and check off each item as you set it up:
          </p>

          <EnvironmentChecklist />

          <ConceptCard icon={<Info size={16} />} title="Don't have Node.js yet? That's fine!" variant="info">
            For the first several modules, all you need is a <strong>browser</strong> and a <strong>text editor</strong>. Node.js becomes important later when we build server-side code.
            You can even skip installing anything and use an online editor like <strong>CodePen.io</strong> or the Playground on this site!
          </ConceptCard>
        </div>
      </FadeInSection>

      {/* Your first JavaScript */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
            ✍️ Your First JavaScript — The Script Tag
          </h2>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            There are two ways to add JavaScript to a webpage. You can write it directly inside the HTML file (good for quick tests) or keep it in a separate <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>.js</code> file and link it (better for real projects). Try both approaches in the interactive demo below:
          </p>

          <ScriptTagDemo />

          <ConceptCard icon={<Lightbulb size={16} />} title="Where to place your <script> tag" variant="tip">
            <strong>1. Bottom of &lt;body&gt; — the beginner-friendly default ✅</strong>
            <br /><br />
            The browser reads HTML from top to bottom. If your <code style={{ fontFamily: "var(--font-mono)" }}>&lt;script&gt;</code> tag is in the <code style={{ fontFamily: "var(--font-mono)" }}>&lt;head&gt;</code>, it runs <em>before</em> the page content exists — so trying to change an element will fail because it doesn&apos;t exist yet! Placing scripts at the bottom of <code style={{ fontFamily: "var(--font-mono)" }}>&lt;body&gt;</code> means all HTML elements are already created when your JS runs. This is where you should put your scripts for now.
            <br /><br />
            <strong>2. Inside &lt;head&gt; with <code style={{ fontFamily: "var(--font-mono)" }}>defer</code> or <code style={{ fontFamily: "var(--font-mono)" }}>async</code> — the modern approach (don&apos;t worry about this yet)</strong>
            <br /><br />
            You'll sometimes see scripts placed in <code style={{ fontFamily: "var(--font-mono)" }}>&lt;head&gt;</code> with extra attributes — like <code style={{ fontFamily: "var(--font-mono)" }}>&lt;script src="app.js" defer&gt;&lt;/script&gt;</code>. The <code style={{ fontFamily: "var(--font-mono)" }}>defer</code> attribute tells the browser &quot;download this file in the background, but don&apos;t run it until the HTML is fully loaded&quot; — giving you the same safety as placing it at the bottom, but with a performance benefit. You&apos;ll see this pattern a lot in real projects and frameworks. <em>Don&apos;t stress about it right now</em> — just know it exists, and come back to it when you&apos;re more comfortable with the basics.
          </ConceptCard>
        </div>
      </FadeInSection>

      {/* console.log - your first tool */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
            🔍 console.log() — Your First Debugging Tool
          </h2>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>console.log()</code> is the very first command every JavaScript developer learns.
            It prints a message to the <strong style={{ color: "var(--text)" }}>browser console</strong> (the developer tools panel). It doesn&apos;t change anything on the page — it&apos;s just for <em>you</em> to see what&apos;s happening inside your code.
          </p>

          <CodeBlock
            code={`// Your very first JavaScript!\nconsole.log("Hello, world!");\n\n// You can print numbers:\nconsole.log(42);\nconsole.log(10 + 5); // prints 15 — it does the math!\n\n// You can print multiple things:\nconsole.log("My name is", "Alice"); // My name is Alice\n\n// You'll use this CONSTANTLY while learning.\n// Whenever you're confused about what a value is, just:\nconsole.log(mysteryVariable);\n// and check the browser console to see the answer!`}
            title="console-log.js"
            highlightLines={[2]}
          />

          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>🖥️ Try it right now!</p>
            <ol style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 2.2, paddingLeft: 20 }}>
              <li>Press <strong style={{ color: "var(--text)" }}>F12</strong> on your keyboard (or right-click → Inspect)</li>
              <li>Click the <strong style={{ color: "var(--text)" }}>Console</strong> tab at the top</li>
              <li>Type <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)", background: "var(--bg-primary)", padding: "2px 8px", borderRadius: 4 }}>console.log(&quot;I did it!&quot;)</code> and press Enter</li>
              <li>You should see <strong style={{ color: "var(--success)" }}>I did it!</strong> appear in the console 🎉</li>
            </ol>
          </div>
        </div>
      </FadeInSection>

      {/* Running JS with Node.js */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
            🟢 Running JavaScript with Node.js
          </h2>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            If you&apos;ve installed Node.js, you can also run JavaScript from the terminal — no browser needed. This is how server-side JavaScript, build tools, and scripts work.
          </p>

          <CodeBlock
            code={`// 1. Create a file called "hello.js" in VS Code\n// 2. Type this inside it:\n\nconsole.log("Hello from Node.js!");\nconsole.log("2 + 2 =", 2 + 2);\nconsole.log("This is running on my computer, not in a browser!");\n\n// 3. Open a terminal (in VS Code: View → Terminal)\n// 4. Type this command and press Enter:\n//    node hello.js\n//\n// You should see:\n//    Hello from Node.js!\n//    2 + 2 = 4\n//    This is running on my computer, not in a browser!`}
            title="hello.js"
          />

          <ConceptCard icon={<Info size={16} />} title="Node.js uses the same V8 engine as Chrome" variant="info">
            When you type <code style={{ fontFamily: "var(--font-mono)" }}>node hello.js</code> in the terminal, Node takes your JS file, feeds it to the <strong>V8 engine</strong> (the same translator Chrome uses), and runs it.
            <br /><br />
            The only difference between browser JS and Node JS is the <em>environment</em>:
            <br />• In the browser, you have <code style={{ fontFamily: "var(--font-mono)" }}>document</code>, <code style={{ fontFamily: "var(--font-mono)" }}>window</code>, and the DOM (the page).
            <br />• In Node, you have <code style={{ fontFamily: "var(--font-mono)" }}>fs</code> (file system), <code style={{ fontFamily: "var(--font-mono)" }}>http</code> (servers), and access to your computer&apos;s resources.
            <br /><br />
            The JavaScript <em>language</em> itself is identical in both. What you learn here applies everywhere.
          </ConceptCard>
        </div>
      </FadeInSection>

      {/* Quiz */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>🧠 Quick Check</h2>
          <QuizCard
            question="Where should you place the <script> tag in your HTML?"
            options={[
              { label: "In the <head> section, before everything else", correct: false, explanation: "This will run your JS before any HTML elements exist on the page. If your JS tries to find or modify elements, it will fail because they haven't been created yet!" },
              { label: "At the bottom of the <body>, right before </body>", correct: true, explanation: "Correct! Placing scripts at the bottom means all your HTML elements are already loaded by the time JavaScript runs. This ensures your JS can find and interact with any element on the page." },
              { label: "It doesn't matter — JavaScript finds everything automatically", correct: false, explanation: "It definitely matters! JavaScript runs in order from top to bottom. If you reference an element that the browser hasn't read yet, your code will break with an error." },
              { label: "JavaScript doesn't use HTML at all", correct: false, explanation: "In the browser, JS and HTML are deeply connected. JavaScript accesses and modifies the HTML elements users see. The <script> tag is how the browser knows to load and run your JavaScript." },
            ]}
            hint="Think about the order: the browser reads HTML from top to bottom..."
          />

          <QuizCard
            question="What does console.log() do?"
            options={[
              { label: "Displays text on the webpage for users to see", correct: false, explanation: "console.log() does NOT change the page — users never see its output. It prints to the developer console, which is a hidden tool only developers open with F12. To show text on the page, you'd modify the DOM (we'll learn that later)." },
              { label: "Prints a message to the browser's developer console (for debugging)", correct: true, explanation: "Exactly! console.log() is your #1 debugging tool. You'll use it thousands of times to check what values your variables hold, whether a function ran, or what data came back from an API. It shows in DevTools (F12), not on the page." },
              { label: "Saves data to a log file on your computer", correct: false, explanation: "In the browser, console.log() doesn't save to any file — it only shows in the developer console tab. In Node.js it prints to the terminal, but still doesn't create a log file unless you specifically redirect the output." },
              { label: "Creates a pop-up alert box", correct: false, explanation: "Pop-up boxes are created with alert(), not console.log(). The alert() function is much more intrusive (it blocks the page). console.log() is subtle — you only see it if you open DevTools." },
            ]}
            hint="Open DevTools (F12) and try typing console.log('test') in the Console tab..."
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
            You&apos;re all set up and ready to start writing real JavaScript! Here&apos;s the summary:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { point: "JavaScript is the programming language of the web. HTML provides structure (the skeleton), CSS provides style (the clothes), and JS provides behaviour (the brain — making things interactive).", emoji: "🌐" },
              { point: "JavaScript can run in two places: in the browser (for interactive websites) and in Node.js (for servers, scripts, and tools). Both use Google's V8 engine — the same language, different environments.", emoji: "🗺️" },
              { point: "To get started, you need a code editor (VS Code recommended), a modern browser (Chrome recommended), and optionally Node.js. That's it — no complex setup required.", emoji: "🛠️" },
              { point: "Add JS to HTML with <script> tags — either inline (code directly in HTML) or external (link to a .js file with src). Always place scripts at the bottom of <body> so elements exist when JS runs.", emoji: "📄" },
              { point: "console.log() is your first and most important tool. It prints messages to the developer console (F12) for debugging. It doesn't show anything to users — it's just for you to inspect your code.", emoji: "🔍" },
              { point: "Run JS in Node.js by typing 'node filename.js' in the terminal. Same language, no browser needed. Great for scripts, servers, and learning without HTML.", emoji: "🟢" },
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
