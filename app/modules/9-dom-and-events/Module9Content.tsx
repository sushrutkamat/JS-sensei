"use client";

import { FadeInSection } from "@/components/animations/FadeInSection";
import { CodeBlock, QuizCard, ConceptCard } from "@/components/interactive/components";
import { DOMTreeVisualizer, EventBubblingDemo } from "@/components/visualizers/Module9Visualizers";
import { MousePointer, Zap, Info } from "lucide-react";

export function Module9Content() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>

      <FadeInSection>
        <div style={{ background: "linear-gradient(135deg, rgba(5,150,105,0.08), rgba(6,182,212,0.06))", border: "1px solid rgba(5,150,105,0.2)", borderRadius: 14, padding: "24px 28px" }}>
          <p style={{ fontSize: "1.05rem", color: "var(--text)", lineHeight: 1.9 }}>
            🌳 <strong>The DOM is the bridge between JavaScript and your webpage.</strong>
            Everything you see in a browser tab is a DOM element. JavaScript can find any element, read or change its content, add or remove elements dynamically, and respond to user actions like clicks and keypresses.
            This is how every interactive website you&apos;ve ever used was built.
          </p>
        </div>
      </FadeInSection>

      {/* DOM Intro */}
      <FadeInSection>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(5,150,105,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={18} style={{ color: "var(--success)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              What Is the DOM?
            </h2>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            When your browser loads an HTML file, it reads all the tags and builds a <strong style={{ color: "var(--text)" }}>tree of JavaScript objects</strong> — one object for each element.
            This tree is called the <strong style={{ color: "var(--text)" }}>Document Object Model (DOM)</strong>.
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            JavaScript can access this tree through the global <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>document</code> object — and when JS modifies the DOM, the browser immediately updates what you see on screen. No page reload needed!
          </p>
          <DOMTreeVisualizer />
        </div>
      </FadeInSection>

      {/* Selecting elements */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
            Finding Elements — querySelector
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Before you can do anything with an element, you need to find it first. The modern way uses <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>querySelector</code> with CSS selector syntax — anything you can write in CSS, you can use here:
          </p>
          <CodeBlock
            code={`// querySelector — returns the FIRST matching element (or null)\ndocument.querySelector("h1")         // by tag name\ndocument.querySelector("#app")       // by ID\ndocument.querySelector(".btn")       // by class name\ndocument.querySelector("nav > a")    // CSS selector!\n\n// querySelectorAll — returns ALL matching elements as a NodeList\nconst allButtons = document.querySelectorAll(".btn");\n// Loop through them:\nallButtons.forEach(btn => {\n  btn.style.background = "blue";\n});\n\n// Older (but still common) methods:\ndocument.getElementById("app")         // by ID\ndocument.getElementsByClassName("btn") // by class (live HTMLCollection)\n\n// IMPORTANT: Always check if the element exists:\nconst el = document.querySelector(".sidebar");\nif (el) {           // null if not found — accessing null.style would crash!\n  el.style.display = "none";\n}`}
            title="selecting-elements.js"
            highlightLines={[1, 2, 3, 4, 5]}
          />
        </div>
      </FadeInSection>

      {/* Manipulating */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
            Manipulating Elements
          </h2>
          <CodeBlock
            code={`const el = document.querySelector("#app");\n\n// Reading and changing text:\nel.textContent = "Hello World!";  // safe — treats as plain text\nel.innerHTML = "<strong>Bold!</strong>"; // renders HTML — ⚠️ risky with user input!\n\n// Changing styles:\nel.style.color = "red";\nel.style.fontSize = "24px";\nel.style.display = "none"; // hide\nel.style.display = "block"; // show\n\n// Classes — the recommended approach:\nel.classList.add("active");       // add a class\nel.classList.remove("hidden");    // remove\nel.classList.toggle("open");      // add if not there, remove if it is\nel.classList.contains("active"); // returns true/false\n\n// Attributes:\nel.getAttribute("href");\nel.setAttribute("aria-label", "Close menu");\nel.removeAttribute("disabled");\n\n// Creating and adding new elements:\nconst newBtn = document.createElement("button");\nnewBtn.textContent = "Click me";\nnewBtn.classList.add("primary-btn");\ndocument.body.appendChild(newBtn);  // add at end\nel.insertAdjacentElement("afterbegin", newBtn); // add at position`}
            title="manipulating-dom.js"
            highlightLines={[3, 4, 11, 12, 13]}
          />
          <ConceptCard icon={<Info size={16} />} title="Use classList, not style directly" variant="tip">
            It&apos;s tempting to set <code style={{ fontFamily: "var(--font-mono)" }}>el.style.color = &quot;red&quot;</code> for everything. But it&apos;s better practice to pre-define your styles in CSS and then add/remove class names with JS.
            <br /><br />
            This separates concerns: CSS handles <em>what things look like</em>, JavaScript handles <em>when to apply which look</em>. Your code becomes easier to maintain, and CSS transitions/animations work automatically when you toggle classes.
          </ConceptCard>
        </div>
      </FadeInSection>

      {/* JS characteristic: Event-driven */}
      <FadeInSection delay={0.1}>
        <div style={{ background: "var(--bg-surface-2)", border: "1px solid rgba(5,150,105,0.2)", borderRadius: 12, padding: 18, display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{ fontSize: "1.8rem", flexShrink: 0 }}>🖱️</div>
          <div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--success)", fontSize: "1rem", marginBottom: 6 }}>JavaScript is Event-Driven</div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.7 }}>
              JavaScript spends most of its time <strong style={{ color: "var(--text)" }}>waiting</strong>. Waiting for you to click, type, scroll, or for data to arrive from a server. When something happens (an <strong style={{ color: "var(--text)" }}>&quot;event&quot;</strong>), JavaScript springs into action and runs the function you assigned to that event.
              This &quot;sit idle, then react&quot; pattern is the entire foundation of interactive web development — and you&apos;re about to learn exactly how it works.
            </p>
          </div>
        </div>
      </FadeInSection>

      {/* Events */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(139,92,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MousePointer size={18} style={{ color: "var(--primary)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              Events — Listening for User Actions
            </h2>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Events are how your code responds to things happening — clicks, key presses, form submissions, mouse movements.
            <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>addEventListener</code> registers a function to call whenever a specific event occurs on an element:
          </p>
          <CodeBlock
            code={`const btn = document.querySelector("#submit");\n\n// addEventListener(eventName, callbackFunction)\nbtn.addEventListener("click", function(event) {\n  // 'event' contains info about what happened:\n  console.log(event.target);   // the element that was clicked\n  console.log(event.type);     // "click"\n  console.log(event.clientX);  // mouse position X\n});\n\n// Common events:\n// "click"     — mouse click\n// "input"     — input field value changed\n// "submit"    — form submitted\n// "keydown"   — key pressed\n// "mouseover" — mouse entered an element\n// "resize"    — window resized\n// "load"      — page finished loading\n\n// Preventing defaults (e.g., stop link navigation, stop form submission):\nform.addEventListener("submit", (e) => {\n  e.preventDefault(); // stops the page from refreshing!\n  validateAndSubmit();\n});\n\n// ALWAYS remove listeners when done to prevent memory leaks:\nbtn.removeEventListener("click", myHandler);`}
            title="events.js"
            highlightLines={[3, 4, 20, 21]}
          />
          <EventBubblingDemo />
        </div>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>🧠 Quick Check</h2>
          <QuizCard
            question="What is event bubbling?"
            options={[
              { label: "An animation technique for smooth transitions", correct: false, explanation: "Not related to animation. Bubbling is about how events propagate through the DOM tree." },
              { label: "When a click event on a child element triggers listeners on its parent elements too", correct: true, explanation: "Correct! After a click fires on the target element, it 'bubbles up' through all ancestor elements (parent, grandparent, ... body, document, window). Each one gets the chance to handle the event. This is why you can put ONE listener on a parent to catch clicks from ALL children — called event delegation." },
              { label: "Creating multiple event listeners on the same element", correct: false, explanation: "Multiple listeners on one element is just 'multiple listeners' — not bubbling. Bubbling specifically describes how events travel UP the DOM tree after firing." },
              { label: "Events that fire before the page has loaded", correct: false, explanation: "Pre-load events would be something like the DOMContentLoaded event. Bubbling is a propagation behaviour, not a timing concept." },
            ]}
            hint="Think about what happens after a button is clicked — does the event stay on the button, or travel upward?"
          />
        </div>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <div style={{ background: "linear-gradient(135deg, rgba(5,150,105,0.06), rgba(6,182,212,0.08))", border: "1px solid rgba(5,150,105,0.2)", borderRadius: 14, padding: "24px 28px" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>📚 What You Just Learned</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "The DOM is a tree of JavaScript objects representing your HTML. The browser builds it when loading the page. document is the entry point — everything else is accessed through it.",
              "querySelector(selector) finds the first match using CSS selector syntax. querySelectorAll() finds all matches (returns a NodeList). Always check if the result is not null before using it!",
              "Manipulate elements: textContent (safe) or innerHTML (renders HTML — careful with user input/XSS). Use classList.add/remove/toggle/contains to control CSS classes. Prefer classes over inline styles.",
              "addEventListener(event, callback) — registers a function to run when the event fires. The callback receives an event object with info about what happened (target, type, coordinates, keys, etc.).",
              "Event bubbling: after firing on the target, events bubble up through all ancestors. Use e.stopPropagation() to prevent further bubbling. Use e.preventDefault() to stop default behaviour (form submit, link navigation).",
              "Event delegation: attach ONE listener to a parent element, catch events from ALL descendants. Efficient and avoids having to re-attach listeners when new children are added dynamically.",
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
