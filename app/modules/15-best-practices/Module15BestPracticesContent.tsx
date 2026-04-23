"use client";

import { FadeInSection } from "@/components/animations/FadeInSection";
import { ConceptCard } from "@/components/interactive/components";
import { CodeSmellDetector, RefactorChallenge, PracticeChecklist } from "@/components/visualizers/Module15Visualizers";
import { Lightbulb, Download } from "lucide-react";
import type { ReactNode } from "react";

// ─── LOCAL COMPONENTS ─────────────────────────────────────────────────────────

function PracticeCard({ num, name, desc, bad, good, accent }: {
  num: number; name: string; desc: ReactNode;
  bad: string; good: string; accent: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{
          width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
          background: accent + "1e", border: `1.5px solid ${accent}44`,
          color: accent, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.72rem", fontWeight: 800,
        }}>{num}</span>
        <code style={{
          fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.84rem",
          color: accent, background: accent + "16",
          border: `1px solid ${accent}38`, padding: "3px 12px", borderRadius: 6,
        }}>{name}</code>
      </div>
      <p style={{ color: "var(--text-muted)", fontSize: "0.87rem", lineHeight: 1.78 }}>{desc}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 10 }}>
        <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid rgba(239,68,68,0.28)" }}>
          <div style={{ background: "rgba(239,68,68,0.09)", padding: "5px 14px", fontSize: "0.7rem", fontWeight: 700, color: "#ef4444", letterSpacing: "0.06em" }}>❌ AVOID</div>
          <pre style={{ margin: 0, padding: "13px 15px", fontFamily: "var(--font-mono)", fontSize: "0.76rem", color: "var(--text-muted)", background: "var(--bg-secondary)", overflowX: "auto", lineHeight: 1.75 }}>{bad}</pre>
        </div>
        <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid rgba(5,150,105,0.28)" }}>
          <div style={{ background: "rgba(5,150,105,0.09)", padding: "5px 14px", fontSize: "0.7rem", fontWeight: 700, color: "#059669", letterSpacing: "0.06em" }}>✅ PREFER</div>
          <pre style={{ margin: 0, padding: "13px 15px", fontFamily: "var(--font-mono)", fontSize: "0.76rem", color: "var(--text)", background: "var(--bg-secondary)", overflowX: "auto", lineHeight: 1.75 }}>{good}</pre>
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "var(--border)", opacity: 0.4 }} />;
}

function CategoryHeader({ emoji, title, color, desc }: { emoji: string; title: string; color: string; desc: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingBottom: 4 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>{emoji}</div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>{title}</h2>
      </div>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.8 }}>{desc}</p>
    </div>
  );
}

// ─── DOWNLOAD BANNER ──────────────────────────────────────────────────────────

function DownloadBanner() {
  return (
    <div style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(8,145,178,0.08))", border: "1px solid rgba(139,92,246,0.28)", borderRadius: 14, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <Download size={18} style={{ color: "var(--primary)" }} />
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--text)" }}>
            Vibe-Coding Plugin — CLAUDE.md / .cursorrules
          </h3>
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.7, maxWidth: 520 }}>
          Download a ready-made rules file containing all 26 practices. Drop it into your project and AI coding agents (Claude, Cursor, GitHub Copilot) will follow these standards automatically.
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
          {["CLAUDE.md", ".cursor/rules/", ".github/copilot-instructions.md"].map(label => (
            <code key={label} style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--primary)", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)", borderRadius: 4, padding: "2px 8px" }}>{label}</code>
          ))}
        </div>
      </div>
      <a
        href="/downloads/js-best-practices.md"
        download="js-best-practices.md"
        style={{
          display: "flex", alignItems: "center", gap: 8, flexShrink: 0,
          background: "var(--primary)", color: "white",
          padding: "10px 20px", borderRadius: 9, textDecoration: "none",
          fontWeight: 700, fontSize: "0.88rem", transition: "opacity 0.15s",
        }}
      >
        <Download size={15} />
        Download Plugin
      </a>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MODULE CONTENT
// ═══════════════════════════════════════════════════════════════════════════

export function Module15BestPracticesContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>

      {/* Intro */}
      <FadeInSection>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.10), rgba(8,145,178,0.06))", border: "1px solid rgba(139,92,246,0.22)", borderRadius: 14, padding: "22px 26px" }}>
            <p style={{ fontSize: "1.05rem", color: "var(--text)", lineHeight: 1.9 }}>
              🏆 <strong>This is the capstone module.</strong> You&apos;ve learned how JavaScript works — now let&apos;s learn how to write it <em>well</em>. Every practice is standalone, with a focused explanation and a side-by-side <strong>Avoid / Prefer</strong> comparison. These are the standards senior engineers hold in code review.
            </p>
          </div>
          <DownloadBanner />
        </div>
      </FadeInSection>

      {/* ═══════════════════════════════════════════════════
          CATEGORY 1: NAMING
          ═══════════════════════════════════════════════════ */}
      <FadeInSection>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <CategoryHeader emoji="🏷️" title="Naming & Readability" color="#f59e0b"
            desc="Code is read far more than it is written. Clear names eliminate the need for mental translation — a reader should understand what something does without digging into its implementation." />

          <PracticeCard num={1} accent="#f59e0b"
            name="Use descriptive variable names"
            desc="Every name should tell you what the thing IS, not just that it exists. Avoid single letters (except loop indices i, j, k), vague words like data or result, or abbreviations that aren't universally understood."
            bad={`const d = new Date();
const x = users.filter(u => u.a > 18);

function calc(a, b) {
  return a * b;
}`}
            good={`const currentDate = new Date();
const adultUsers = users.filter(user => user.age > 18);

function calculateTotalPrice(quantity, unitPrice) {
  return quantity * unitPrice;
}`}
          />

          <Divider />

          <PracticeCard num={2} accent="#f59e0b"
            name="Follow naming conventions consistently"
            desc="JavaScript has established conventions that signal the nature of a value at a glance. Breaking them forces readers to re-learn your personal system. Booleans should read like yes/no questions: isLoading, hasError, canSubmit."
            bad={`const user_name = "Alice";
const UserAge = 30;
function Get_data() {}
class userProfile {}
const maxcount = 100;`}
            good={`const userName = "Alice";         // variable: camelCase
const userAge = 30;
function getData() {}             // function: camelCase
class UserProfile {}              // class: PascalCase
const MAX_USER_COUNT = 100;       // constant: SCREAMING_SNAKE

let isLoading = false;            // boolean: is/has/can prefix`}
          />

          <Divider />

          <PracticeCard num={3} accent="#f59e0b"
            name="Avoid magic numbers and magic strings"
            desc="A bare number like 86400000 or a string like 'PENDING_REVIEW' is meaningless without context. Extract them into named constants at the top of the module. Numeric separators (_) make large numbers readable without affecting their value."
            bad={`setTimeout(syncDatabase, 86400000);

if (order.status === "P_R") {
  // ???
}

if (retries > 5) {
  throw new Error("Too many retries");
}`}
            good={`const ONE_DAY_MS = 86_400_000;
const STATUS_PENDING_REVIEW = "P_R";
const MAX_RETRIES = 5;

setTimeout(syncDatabase, ONE_DAY_MS);

if (order.status === STATUS_PENDING_REVIEW) {
  // intent is obvious
}

if (retries > MAX_RETRIES) {
  throw new Error("Too many retries");
}`}
          />

          <Divider />

          <PracticeCard num={4} accent="#f59e0b"
            name="Keep functions small and single-purpose"
            desc="A function should do one thing. If you find yourself using the word 'and' to describe what a function does, split it. If a function needs a comment explaining what it does (not why), it is too large. Target: one screen height, one clear job."
            bad={`// Does: validate, format, save, AND send email
function processUser(user) {
  if (!user.name) throw new Error("No name");
  if (!user.email) throw new Error("No email");
  user.name = user.name.trim();
  user.email = user.email.toLowerCase();
  db.save(user);
  emailService.send(user.email, "Welcome!");
}`}
            good={`function validateUser(user) {
  if (!user.name) throw new Error("No name");
  if (!user.email) throw new Error("No email");
}

function formatUser(user) {
  return { ...user,
    name: user.name.trim(),
    email: user.email.toLowerCase() };
}

async function registerUser(user) {
  validateUser(user);
  const formatted = formatUser(user);
  await db.save(formatted);
  await emailService.sendWelcome(formatted.email);
}`}
          />

          <Divider />

          <PracticeCard num={5} accent="#f59e0b"
            name="Write self-documenting code — comments explain WHY"
            desc="If you need a comment to explain what the code does, rename your variables until you don't. Comments are for explaining why a non-obvious decision was made. Code that explains itself is always better than code plus a comment."
            bad={`// Loop through array and check condition
for (let i = 0; i < arr.length; i++) {
  // check if active
  if (arr[i].s === 1) {
    // add to result
    r.push(arr[i]);
  }
}`}
            good={`// Only include active users in the weekly digest.
// Inactive users opted out and must not receive emails
// even if they have unread notifications.
const digestRecipients = users.filter(
  user => user.status === STATUS_ACTIVE
);`}
          />
        </div>
      </FadeInSection>

      {/* ═══════════════════════════════════════════════════
          CATEGORY 2: VARIABLES
          ═══════════════════════════════════════════════════ */}
      <FadeInSection delay={0.05}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <CategoryHeader emoji="📦" title="Variables & Declarations" color="#0891b2"
            desc="How and where you declare variables communicates intent. const tells the reader 'this value is fixed', let says 'this will change'. These contracts make code easier to reason about." />

          <PracticeCard num={6} accent="#0891b2"
            name="const by default · let when reassigning · never var"
            desc="var is function-scoped and hoisted — both behaviors regularly cause bugs. const is the default: it documents that a binding won't change. Only escalate to let when you know you'll reassign. Immutability narrows what could go wrong."
            bad={`var userId = 123;
var counter = 0;
var isLoggedIn = false;

counter = counter + 1;
// userId and isLoggedIn never change — but var hides that`}
            good={`const userId = 123;       // never reassigned → const
const isLoggedIn = false; // never reassigned → const
let counter = 0;          // will be incremented → let

counter += 1;
// var is never needed in modern JavaScript`}
          />

          <Divider />

          <PracticeCard num={7} accent="#0891b2"
            name="Declare variables close to where they are used"
            desc="Hoisting all variables to the top of a function (a habit from C/var days) forces readers to scroll up to understand values. Declare at the point of first use — the reader has the right context right there, and the scope is as narrow as possible."
            bad={`function processOrder(items) {
  let subtotal;
  let tax;
  let total;

  // 20+ lines of other logic...

  subtotal = items.reduce((s, i) => s + i.price, 0);
  tax = subtotal * 0.1;
  total = subtotal + tax;
  return total;
}`}
            good={`function processOrder(items) {
  // 20+ lines of other logic...

  const subtotal = items.reduce((s, i) => s + i.price, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  return total;
}`}
          />

          <Divider />

          <PracticeCard num={8} accent="#0891b2"
            name="Avoid polluting the global scope"
            desc="Global variables are shared across your entire app. Any code anywhere can read or overwrite them, creating invisible coupling. Use ES modules (import/export) to keep variables module-scoped, or block scope with const/let in a block."
            bad={`// In a script tag or legacy file:
var currentUser = null;
var API_URL = "https://api.example.com";
var sessionTimeout = 3600;
// Any other script can overwrite these`}
            good={`// config.js — module-scoped, not global
export const API_URL = "https://api.example.com";
export const SESSION_TIMEOUT = 3600;

// store.js — encapsulated state
let currentUser = null;
export function getUser() { return currentUser; }
export function setUser(u) { currentUser = u; }`}
          />

          <Divider />

          <PracticeCard num={9} accent="#0891b2"
            name="Use destructuring for multi-property access"
            desc="When you need two or more properties from an object, destructure it. This eliminates repeated references to the parent object, is shorter, and makes the set of used properties immediately visible at the top of the function."
            bad={`function displayUser(user) {
  console.log(user.firstName);
  console.log(user.lastName);
  console.log(user.email);
  const full = user.firstName + " " + user.lastName;
  return user.email.toLowerCase();
}`}
            good={`function displayUser({ firstName, lastName, email }) {
  console.log(firstName, lastName, email);
  const full = \`\${firstName} \${lastName}\`;
  return email.toLowerCase();
}

// Array destructuring:
const [first, second, ...rest] = items;

// With rename and default:
const { name: userName = "Guest", role = "viewer" } = user;`}
          />
        </div>
      </FadeInSection>

      {/* ═══════════════════════════════════════════════════
          CATEGORY 3: FUNCTIONS
          ═══════════════════════════════════════════════════ */}
      <FadeInSection delay={0.05}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <CategoryHeader emoji="⚙️" title="Functions" color="#8b5cf6"
            desc="Functions are the primary unit of abstraction in JavaScript. Writing them well — small, pure, with good defaults — is the single highest-leverage improvement you can make to your code." />

          <PracticeCard num={10} accent="#8b5cf6"
            name="Use default parameters instead of || fallbacks"
            desc="The || pattern for defaults has a critical flaw: it replaces any falsy value, including 0, false, and empty string. Default parameters only activate when the argument is undefined — which is exactly when a caller didn't pass it."
            bad={`function greet(name) {
  name = name || "World"; // replaces "", 0, false too!
  return \`Hello, \${name}!\`;
}

function createUser(name, role) {
  const userRole = role !== undefined ? role : "viewer";
}`}
            good={`function greet(name = "World") {
  // Only defaults when name is undefined
  return \`Hello, \${name}!\`;
}

greet("");       // "Hello, !"    — empty string preserved
greet();         // "Hello, World!" — only undefined defaults

function createUser(name, role = "viewer") {
  // role = "viewer" only when no argument is passed
}`}
          />

          <Divider />

          <PracticeCard num={11} accent="#8b5cf6"
            name="Return early to reduce nesting (guard clauses)"
            desc="Deep nesting is one of the most common readability problems. Validate your preconditions up front with early returns — each failure exits immediately. The happy path then sits at the top indentation level, easy to read."
            bad={`function processPayment(order) {
  if (order) {
    if (order.items.length > 0) {
      if (order.user.isVerified) {
        if (order.user.hasBillingInfo) {
          // actual logic buried 4 levels deep
          return charge(order);
        }
      }
    }
  }
}`}
            good={`function processPayment(order) {
  if (!order) return null;
  if (order.items.length === 0) return null;
  if (!order.user.isVerified) return null;
  if (!order.user.hasBillingInfo) return null;

  // Happy path at the top level — easy to read
  return charge(order);
}`}
          />

          <Divider />

          <PracticeCard num={12} accent="#8b5cf6"
            name="Prefer pure functions — same input, same output, no side effects"
            desc="A pure function returns the same output for the same inputs and does not modify anything outside itself. Pure functions are trivially testable, composable, and cache-able. Isolate side effects (network calls, DOM updates, random numbers) into clearly named functions."
            bad={`let total = 0;

function addToRunningTotal(amount) {
  total += amount; // modifies external state
  console.log("Total:", total); // side effect
}

addToRunningTotal(10); // total = 10
addToRunningTotal(20); // total = 30`}
            good={`// Pure — no side effects, no external state
function sum(amounts) {
  return amounts.reduce((acc, n) => acc + n, 0);
}

sum([10, 20]); // always 30 — easy to test
sum([10, 20]); // always 30 — no surprises

// Side effects isolated to the boundary:
function displayTotal(amounts) {
  console.log("Total:", sum(amounts)); // side effect here only
}`}
          />

          <Divider />

          <PracticeCard num={13} accent="#8b5cf6"
            name="Use arrow functions for inline callbacks"
            desc="Arrow functions are shorter and don't bind their own this — they inherit it from the surrounding scope. This makes them the correct choice for array callbacks, event listeners inside class methods, and any inline function that doesn't need its own this."
            bad={`const doubled = numbers.map(function(n) {
  return n * 2;
});

class Timer {
  start() {
    setTimeout(function() {
      this.tick(); // 'this' is undefined here!
    }, 1000);
  }
}`}
            good={`const doubled = numbers.map(n => n * 2);  // concise

class Timer {
  start() {
    setTimeout(() => {
      this.tick(); // arrow captures 'this' from start()
    }, 1000);
  }
}`}
          />
        </div>
      </FadeInSection>

      {/* ═══════════════════════════════════════════════════
          CATEGORY 4: ERROR HANDLING
          ═══════════════════════════════════════════════════ */}
      <FadeInSection delay={0.05}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <CategoryHeader emoji="🛡️" title="Error Handling" color="#ef4444"
            desc="Unhandled errors in production are invisible bugs. Handling them well means failing loudly, with enough information to diagnose and fix the problem, instead of silently producing wrong results." />

          <PracticeCard num={14} accent="#ef4444"
            name="Always handle promise rejections — never leave them unhandled"
            desc="An unhandled promise rejection crashes Node.js and silently fails in browsers. Every async call chain must end in a .catch() or be inside a try/catch. After catching, either recover gracefully or re-throw so the caller knows the operation failed."
            bad={`// Unhandled — error silently disappears
fetch("/api/users")
  .then(res => res.json())
  .then(data => setUsers(data));

async function loadUser(id) {
  const user = await getUser(id); // if this throws, nobody knows
  return user;
}`}
            good={`fetch("/api/users")
  .then(res => res.json())
  .then(data => setUsers(data))
  .catch(err => {
    console.error("Failed to load users:", err);
    setError("Could not load users. Please retry.");
  });

async function loadUser(id) {
  try {
    return await getUser(id);
  } catch (err) {
    logger.error("loadUser failed:", { id, err });
    throw err; // re-throw: caller must know it failed
  }
}`}
          />

          <Divider />

          <PracticeCard num={15} accent="#ef4444"
            name="Throw Error instances with descriptive messages, never strings"
            desc="Throwing a string (throw 'error') produces no stack trace — impossible to debug. Always throw an Error object. Use specific error types (TypeError, RangeError) when applicable. Include the relevant context in the message."
            bad={`throw "error";
throw "something went wrong";
throw { code: 404 };        // plain objects don't have stack traces

function getUser(id) {
  if (!id) throw "invalid";
}`}
            good={`function getUser(id) {
  if (!id) throw new Error("getUser: id is required");

  if (typeof id !== "number") {
    throw new TypeError(
      \`getUser: expected number, got \${typeof id}\`
    );
  }

  if (id < 1) {
    throw new RangeError(\`getUser: id must be >= 1, got \${id}\`);
  }
}
// Error instances include: message, name, stack trace`}
          />

          <Divider />

          <PracticeCard num={16} accent="#ef4444"
            name="Wrap only the risky operation in try/catch"
            desc="A try/catch that wraps an entire function obscures which operation actually failed. Keep the try block as narrow as possible — just the call that can fail. This makes error messages accurate and prevents swallowing unrelated exceptions."
            bad={`async function handleSubmit(formData) {
  try {
    const validated = validateForm(formData);
    const res = await fetch("/api/submit", {
      body: JSON.stringify(validated)
    });
    const result = await res.json();
    updateUI(result);
    showSuccess();
  } catch (e) {
    showError(e); // which step failed? impossible to know
  }
}`}
            good={`async function handleSubmit(formData) {
  // Validation errors propagate normally — not caught here
  const validated = validateForm(formData);

  let result;
  try {
    // Only the network call is risky
    const res = await fetch("/api/submit", {
      body: JSON.stringify(validated)
    });
    result = await res.json();
  } catch (err) {
    showError("Network request failed: " + err.message);
    return; // stop here
  }

  updateUI(result);
  showSuccess();
}`}
          />
        </div>
      </FadeInSection>

      {/* ═══════════════════════════════════════════════════
          CATEGORY 5: ASYNC
          ═══════════════════════════════════════════════════ */}
      <FadeInSection delay={0.05}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <CategoryHeader emoji="⏳" title="Async & Promises" color="#3b82f6"
            desc="Async JavaScript is where most subtle bugs live. Using the right patterns makes async code as readable as synchronous code and eliminates entire classes of mistakes." />

          <PracticeCard num={17} accent="#3b82f6"
            name="Prefer async/await over .then() chains"
            desc="async/await reads like synchronous code — top to bottom, step by step. .then() chains create callback-style nesting at scale. async/await also produces better stack traces, making errors much easier to diagnose in production."
            bad={`function loadDashboard(userId) {
  return getUser(userId)
    .then(user => {
      return getPosts(user.id)
        .then(posts => {
          return getComments(posts[0].id)
            .then(comments => {
              renderDashboard(user, posts, comments);
            });
        });
    })
    .catch(err => console.error(err));
}`}
            good={`async function loadDashboard(userId) {
  try {
    const user = await getUser(userId);
    const posts = await getPosts(user.id);
    const comments = await getComments(posts[0].id);
    renderDashboard(user, posts, comments);
  } catch (err) {
    console.error("Dashboard load failed:", err);
  }
}`}
          />

          <Divider />

          <PracticeCard num={18} accent="#3b82f6"
            name="Use Promise.all for independent parallel async calls"
            desc="Sequential await in a loop is a performance bug when the calls don't depend on each other. If you can start them all at once, do it with Promise.all — the total time becomes the duration of the slowest call, not the sum of all."
            bad={`async function loadProfile(userId) {
  // Sequential — waits for each before starting the next
  const user    = await getUser(userId);    // 200ms
  const posts   = await getPosts(userId);   // 200ms
  const friends = await getFriends(userId); // 200ms
  // Total: ~600ms — but these 3 are completely independent!
}`}
            good={`async function loadProfile(userId) {
  // Parallel — all fire at once
  const [user, posts, friends] = await Promise.all([
    getUser(userId),
    getPosts(userId),
    getFriends(userId),
  ]);
  // Total: ~200ms (the slowest of the three)
}`}
          />

          <Divider />

          <PracticeCard num={19} accent="#3b82f6"
            name="Never mix async patterns — pick one and stick to it"
            desc="Callbacks, promises, and async/await each have different error propagation and flow-control semantics. Mixing them creates code that is nearly impossible to reason about. Prefer async/await. Wrap legacy callback APIs in util.promisify or a one-liner Promise wrapper."
            bad={`function fetchData(url, callback) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      processData(data, function(result) { // callback mixed in!
        callback(null, result);
      });
    })
    .catch(err => callback(err));
}`}
            good={`// Wrap legacy callback API once at the boundary
function processDataAsync(data) {
  return new Promise((resolve, reject) =>
    processData(data, (err, result) =>
      err ? reject(err) : resolve(result)
    )
  );
}

// Then use async/await throughout the rest of the codebase
async function fetchData(url) {
  const res = await fetch(url);
  const data = await res.json();
  return processDataAsync(data);
}`}
          />
        </div>
      </FadeInSection>

      {/* Interactive: Refactor Challenge */}
      <FadeInSection delay={0.05}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>
            ⚡ Refactor Challenge
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            See smelly code — pick the best refactored version. 5 rounds covering different practices.
          </p>
          <RefactorChallenge />
        </div>
      </FadeInSection>

      {/* ═══════════════════════════════════════════════════
          CATEGORY 6: ARRAYS & OBJECTS
          ═══════════════════════════════════════════════════ */}
      <FadeInSection delay={0.05}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <CategoryHeader emoji="🗂️" title="Arrays & Objects" color="#10b981"
            desc="Arrays and objects are the workhorses of JavaScript data handling. Using them correctly — immutably, expressively, with safe access — eliminates an entire category of runtime bugs." />

          <PracticeCard num={20} accent="#10b981"
            name="Use array methods instead of manual for loops"
            desc=".map(), .filter(), .find(), .reduce(), .some(), and .every() express intent in their name and compose naturally into pipelines. A for loop just says 'do something repeatedly' — the reader must read the body to understand what. Use for...of only when you need break/continue."
            bad={`const prices = [];
for (let i = 0; i < products.length; i++) {
  prices.push(products[i].price);
}

const activeUsers = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].isActive) activeUsers.push(users[i]);
}`}
            good={`const prices = products.map(product => product.price);
const activeUsers = users.filter(user => user.isActive);

// Compose them into a readable pipeline:
const totalRevenue = products
  .filter(p => p.isAvailable)
  .map(p => p.price * p.stock)
  .reduce((sum, val) => sum + val, 0);`}
          />

          <Divider />

          <PracticeCard num={21} accent="#10b981"
            name="Never mutate function arguments or external state"
            desc="When you modify an object or array that was passed into a function, the caller's data silently changes. This is one of the hardest categories of bugs to find. Always return new values using spread, slice, or structuredClone(). This is the foundation of predictable code."
            bad={`// Caller's array is mutated — surprise!
function addId(users) {
  for (let i = 0; i < users.length; i++) {
    users[i].id = i; // modifies the original!
  }
  return users;
}

function normalize(user) {
  user.name = user.name.trim(); // mutates caller's object
  user.email = user.email.toLowerCase();
}`}
            good={`// Returns a new array — caller's data is safe
function addId(users) {
  return users.map((user, i) => ({ ...user, id: i }));
}

function normalize(user) {
  return {
    ...user,
    name: user.name.trim(),
    email: user.email.toLowerCase(),
  };
}`}
          />

          <Divider />

          <PracticeCard num={22} accent="#10b981"
            name="Use optional chaining (?.) for deep property access"
            desc="Accessing a property on null or undefined throws a TypeError. Optional chaining returns undefined safely if any part of the chain is null/undefined. It also works for method calls (?.) and array access (?.[index])."
            bad={`// Verbose and still fragile
const city = user && user.address && user.address.city;

const name = obj !== null && obj !== undefined
  ? obj.getName !== undefined
    ? obj.getName()
    : undefined
  : undefined;`}
            good={`const city = user?.address?.city;    // undefined if any part is null
const name = obj?.getName?.();       // only calls if getName exists
const tag  = article?.tags?.[0];     // safe array access

// Use with nullish coalescing for a default:
const displayCity = user?.address?.city ?? "Unknown";`}
          />
        </div>
      </FadeInSection>

      {/* Interactive: Code Smell Detector */}
      <FadeInSection delay={0.05}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>
            🔍 Code Smell Detector
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Paste any JavaScript code and get an instant practices audit. Edit the code in real-time and watch the score update.
          </p>
          <CodeSmellDetector />
        </div>
      </FadeInSection>

      {/* ═══════════════════════════════════════════════════
          CATEGORY 7: CODE QUALITY
          ═══════════════════════════════════════════════════ */}
      <FadeInSection delay={0.05}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <CategoryHeader emoji="🎯" title="Code Quality & Patterns" color="#ec4899"
            desc="These practices govern the overall shape and hygiene of your code. They are the ones that separate a codebase you're proud to open from one you dread touching." />

          <PracticeCard num={23} accent="#ec4899"
            name="Always use strict equality (=== and !==)"
            desc="The == operator silently coerces types before comparing, producing results that surprise even experienced developers. The only legitimate use of != (loose) is checking for both null and undefined simultaneously — which is explicit and intentional."
            bad={`if (userId == "123") { }    // true — coerces number to string
if (0 == false) { }         // true — unexpected coercion
if ("" == false) { }        // true — more coercion madness
if (null == 0) { }          // false — but null == undefined is true!`}
            good={`if (userId === "123") { }   // explicit: must be string "123"
if (userId === 123) { }     // explicit: must be number 123

// The ONE valid use of != — intentional null/undefined check:
if (value != null) {
  // value is neither null nor undefined
}`}
          />

          <Divider />

          <PracticeCard num={24} accent="#ec4899"
            name="Use template literals for string construction"
            desc="Template literals are clearer, support multi-line strings without escape sequences, and allow arbitrary expressions inside ${}. String concatenation with + requires careful quoting and is prone to off-by-one spacing errors."
            bad={`const greeting = "Hello, " + user.name +
  "! You have " + count + " messages.";

const multiline = "Line 1\n" +
  "Line 2\n" + "Line 3";

const query = "SELECT * FROM users WHERE id = " +
  userId + " AND role = '" + role + "'";`}
            good={`const greeting = \`Hello, \${user.name}! You have \${count} messages.\`;

const multiline = \`
  Line 1
  Line 2
  Line 3
\`.trim();

const query = \`SELECT * FROM users WHERE id = \${userId} AND role = '\${role}'\`;`}
          />

          <Divider />

          <PracticeCard num={25} accent="#ec4899"
            name="Keep files and modules focused — one concern per file"
            desc="A file called utils.js that grows to 500 lines and exports unrelated functions gives you no guidance on what to import from where. Split by concern. Name files after their primary purpose. The single responsibility principle applies to files just as much as to functions."
            bad={`// utils.js — 500 lines, no cohesion
export function formatDate(date) { ... }
export function validateEmail(email) { ... }
export function hashPassword(pwd) { ... }
export function sendEmail(to, body) { ... }
export class Database { ... }
export class Logger { ... }`}
            good={`// formatters.js — only formatting
export function formatDate(date) { ... }

// validators.js — only validation
export function validateEmail(email) { ... }

// auth.js — only authentication
export function hashPassword(pwd) { ... }

// One file = one clear responsibility`}
          />

          <Divider />

          <PracticeCard num={26} accent="#ec4899"
            name="Use ESLint + Prettier from day 1"
            desc="A linter catches bugs before runtime (unused variables, == instead of ===, var). A formatter enforces consistent style automatically so it never becomes a discussion. Set them up on the first commit — retrofitting them to an existing codebase is painful."
            bad={`// No tooling — inconsistent style catches bugs at runtime
var x=1
const  y=   x+2
function add(a,b ){return a+b}
if(x ==1){console.log(x)}`}
            good={`// .eslintrc.json
{
  "extends": ["eslint:recommended"],
  "rules": {
    "no-var": "error",
    "prefer-const": "error",
    "eqeqeq": "error",
    "no-unused-vars": "warn"
  }
}

// .prettierrc
{
  "semi": true, "singleQuote": true,
  "tabWidth": 2, "trailingComma": "es5"
}`}
          />

          <ConceptCard icon={<Lightbulb size={16} />} title="Enable eslint in your editor too" variant="tip">
            Install the ESLint and Prettier extensions in VS Code or your editor of choice. Real-time underlines as you type — never wait for CI to catch a mistake you could fix in 2 seconds at the cursor.
          </ConceptCard>
        </div>
      </FadeInSection>

      {/* Practice Checklist */}
      <FadeInSection delay={0.05}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>
            ✅ My Practice Checklist
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Check off the practices you&apos;ve adopted. Your progress saves between visits.
          </p>
          <PracticeChecklist />
        </div>
      </FadeInSection>

      {/* Download CTA (bottom) */}
      <FadeInSection delay={0.05}>
        <DownloadBanner />
      </FadeInSection>

      {/* Capstone Summary */}
      <FadeInSection delay={0.05}>
        <div style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(8,145,178,0.08))", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 14, padding: "24px 28px" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>🎓 You&apos;ve Completed JS Sensei</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.9, marginBottom: 16 }}>
            15 modules. From how the engine works to writing code that other engineers respect. The practices in this module are what separate a codebase you&apos;re proud to open from one you dread. Apply them consistently, run the Code Smell Detector on your existing projects, and download the plugin to keep your AI coding assistant aligned.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "Name things clearly — code is read 10× more than it's written.",
              "const by default, guard clauses over nesting, pure functions over side effects.",
              "Handle every rejection, throw Error instances, wrap only what's risky.",
              "Promise.all for parallel work, async/await for readability, never mix patterns.",
              "Spread to clone, optional chaining to access, array methods to transform.",
              "=== always, template literals always, ESLint + Prettier on day one.",
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.68rem", fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{i + 1}</span>
                <p style={{ color: "var(--text-muted)", fontSize: "0.87rem", lineHeight: 1.7 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

    </div>
  );
}
