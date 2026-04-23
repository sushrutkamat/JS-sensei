"use client";

import { FadeInSection } from "@/components/animations/FadeInSection";
import { CodeBlock, QuizCard, ConceptCard } from "@/components/interactive/components";
import { EventLoopSimulator, PromiseStateMachine } from "@/components/visualizers/Module10Visualizers";
import { RefreshCcw, Zap, Info, AlertTriangle, GitBranch } from "lucide-react";

export function Module10Content() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>

      {/* Welcome */}
      <FadeInSection>
        <div style={{ background: "linear-gradient(135deg, rgba(219,39,119,0.10), rgba(139,92,246,0.06))", border: "1px solid rgba(219,39,119,0.25)", borderRadius: 14, padding: "24px 28px" }}>
          <p style={{ fontSize: "1.05rem", color: "var(--text)", lineHeight: 1.9 }}>
            🔥 <strong>This is the module most beginners find hardest — and most satisfying once they get it.</strong>
            <br /><br />
            Async JavaScript is genuinely confusing at first. Code seems to run out of order. Things happen &quot;later&quot;. Errors vanish into thin air. Even experienced developers get caught out by this stuff.
            <br /><br />
            But once you see <em>why</em> it works the way it does — through the visualisers on this page — it&apos;ll click. Take your time, interact with every demo, and don&apos;t skip sections. You&apos;ve got this!
          </p>
        </div>
      </FadeInSection>

      {/* Section 1: Why Async? */}
      <FadeInSection>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(139,92,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={18} style={{ color: "var(--primary)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              The Problem: JavaScript Can Only Do One Thing at a Time
            </h2>
          </div>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Remember from Module 1: JavaScript is <strong style={{ color: "var(--text)" }}>single-threaded</strong>, meaning it can only execute one piece of code at a time.
            That&apos;s totally fine for simple things — adding two numbers, showing a message, updating a button.
          </p>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            But what happens when JavaScript needs to do something <strong style={{ color: "var(--text)" }}>slow</strong>? Like:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { emoji: "🌐", example: "Fetching data from a server (could take 500ms–2000ms or more!)" },
              { emoji: "⏱️", example: "Waiting for a timer (\"show this popup after 3 seconds\")" },
              { emoji: "📁", example: "Reading a file from the user's computer" },
              { emoji: "🎮", example: "Waiting for a user to click something" },
            ].map(item => (
              <div key={item.emoji} style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--bg-surface-2)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 16px" }}>
                <span style={{ fontSize: "1.3rem" }}>{item.emoji}</span>
                <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{item.example}</span>
              </div>
            ))}
          </div>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            If JavaScript simply <em>stopped and waited</em> for these slow operations to finish, your entire webpage would <strong style={{ color: "var(--error)" }}>freeze</strong>.
            No animations. No button clicks. The user would think the page crashed. This is called <strong style={{ color: "var(--text)" }}>blocking</strong>.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 12, padding: "18px 20px" }}>
              <h4 style={{ fontFamily: "var(--font-heading)", color: "var(--error)", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                ❌ Blocking (What we want to avoid)
              </h4>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.7 }}>
                JavaScript stops everything and waits for the slow operation to complete. During that time — which could be seconds — absolutely nothing else can happen on the page.
                Buttons don&apos;t respond. Animations stop. The user sees a frozen page.
              </p>
              <div style={{ marginTop: 12, fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--error)", background: "rgba(239,68,68,0.1)", borderRadius: 6, padding: "8px 12px", lineHeight: 1.5 }}>
                🔒 Page frozen... waiting for data...
                <br />Users are clicking frantically but nothing works!
              </div>
            </div>

            <div style={{ background: "rgba(5,150,105,0.08)", border: "1px solid rgba(5,150,105,0.25)", borderRadius: 12, padding: "18px 20px" }}>
              <h4 style={{ fontFamily: "var(--font-heading)", color: "var(--success)", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                ✅ Non-blocking (What async gives us)
              </h4>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.7 }}>
                JavaScript <em>starts</em> the slow operation and immediately moves on to other tasks. When the operation finishes (the data arrives, the timer fires), a callback function runs to handle the result.
                The page stays fully responsive throughout!
              </p>
              <div style={{ marginTop: 12, fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--success)", background: "rgba(5,150,105,0.1)", borderRadius: 6, padding: "8px 12px", lineHeight: 1.5 }}>
                🔓 Fetching data in background...
                <br />Page works normally! Data arrives → we handle it ✓
              </div>
            </div>
          </div>

          <ConceptCard icon={<Info size={16} />} title="🍽️ The Waiter Analogy — this one really helps!" variant="info">
            Imagine two types of waiters in a restaurant:
            <br /><br />
            <strong>Bad waiter (synchronous / blocking):</strong> Takes your order, then stands at your table staring at the kitchen window, waiting for your food. Every other table goes unserved until your meal arrives. The whole restaurant grinds to a halt.
            <br /><br />
            <strong>Good waiter (asynchronous / non-blocking):</strong> Takes your order, hands it to the kitchen, then immediately goes to serve other tables. When the kitchen calls &quot;order up!&quot;, the waiter brings your food over. Other customers were served the whole time — no one waited needlessly.
            <br /><br />
            JavaScript is the good waiter. The kitchen is the browser&apos;s built-in Web APIs handling the slow work. The &quot;order up!&quot; call is the <strong>Event Loop</strong> — which is what we&apos;re about to explore!
          </ConceptCard>
        </div>
      </FadeInSection>

      {/* Section 2: The Event Loop */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(6,182,212,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <RefreshCcw size={18} style={{ color: "var(--secondary)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              The Event Loop — JavaScript&apos;s Traffic Controller
            </h2>
          </div>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            The <strong style={{ color: "var(--text)" }}>Event Loop</strong> is the mechanism that allows JavaScript to manage async code without needing multiple threads.
            It constantly monitors a few key areas and decides what code to run next, like a traffic controller directing cars.
          </p>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            There are 5 pieces that work together. Don&apos;t worry about memorising them yet — the interactive simulation below will make them feel natural:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
            {[
              {
                label: "Call Stack",
                desc: "Where synchronous code runs right now. Like the waiter actively serving — they can only be at one table at a time. When a function is called, it goes here.",
                icon: "📋",
                color: "var(--primary)"
              },
              {
                label: "Web APIs",
                desc: "The browser's built-in tools for doing slow work: fetch(), setTimeout(), DOM events. JavaScript hands off the work here and moves on — the browser handles it in the background.",
                icon: "🌐",
                color: "var(--secondary)"
              },
              {
                label: "Microtask Queue",
                desc: "A waiting line for Promise callbacks. These get highest priority — JavaScript empties this entire queue before touching the Macrotask Queue.",
                icon: "⚡",
                color: "var(--primary)"
              },
              {
                label: "Macrotask Queue",
                desc: "A waiting line for setTimeout and setInterval callbacks. These only run after ALL microtasks are done. This queue processes one task at a time.",
                icon: "📦",
                color: "var(--accent)"
              },
              {
                label: "Event Loop",
                desc: "The traffic controller. It constantly checks: 'Is the Call Stack empty? If yes, drain all microtasks, then take ONE macrotask.' Then it loops and checks again.",
                icon: "🔄",
                color: "var(--success)"
              },
            ].map(item => (
              <div key={item.label} style={{ background: "var(--bg-surface-2)", border: "1px solid var(--border)", borderRadius: 10, padding: "16px" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: item.color, fontSize: "0.85rem", marginBottom: 8 }}>{item.label}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Now let&apos;s see all 5 parts working together! Use the <strong style={{ color: "var(--secondary)" }}>step buttons</strong> to go through slowly (recommended for first time) or press <strong style={{ color: "var(--secondary)" }}>Play</strong> to let it run automatically. Watch which panel each item appears in and read the &quot;What&apos;s Happening&quot; explanation at each step:
          </p>

          <EventLoopSimulator />

          <ConceptCard icon={<AlertTriangle size={16} />} title="The Golden Rule: Microtasks ALWAYS run before Macrotasks 🏆" variant="warning">
            After the Call Stack empties, the Event Loop <strong>always drains the entire Microtask Queue first</strong> before it touches even one item from the Macrotask Queue.
            <br /><br />
            This means <strong>Promise callbacks always run before setTimeout callbacks</strong> — even if the setTimeout has a 0ms delay!
            <br /><br />
            This surprises almost everyone at first. Press the <strong>&quot;Promise vs setTimeout&quot;</strong> scenario button in the simulator above and step through it to see exactly why.
          </ConceptCard>
        </div>
      </FadeInSection>

      {/* Section 3: Callbacks → Promises → Async/Await */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(251,191,36,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GitBranch size={18} style={{ color: "var(--accent)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              The Three Eras of Async Code
            </h2>
          </div>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Writing async code has evolved dramatically over JavaScript&apos;s history. Each generation was created to fix the problems of the previous one.
            You&apos;ll encounter all three styles in real projects, so you need to recognise them all — even if you mostly write the newest style.
          </p>

          {/* Era 1: Callbacks */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, color: "var(--error)", background: "rgba(239,68,68,0.12)", padding: "3px 10px", borderRadius: 20 }}>ERA 1 (Before ~2015)</span>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--error)", fontSize: "1.1rem" }}>
                Callbacks — The Original (But Painful) Way
              </h3>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: 14 }}>
              A <strong style={{ color: "var(--text)" }}>callback</strong> is simply a function that you pass to another function, saying: &quot;Hey, when you&apos;re done, call this function with the result.&quot;
              <br /><br />
              This works fine for simple cases. But when operations depend on each other (get the user, then get their posts, then get comments on those posts...), you end up with callbacks inside callbacks inside callbacks — the dreaded <strong style={{ color: "var(--error)" }}>Pyramid of Doom</strong>:
            </p>
            <CodeBlock
              code={`// Step 1: Get a user by ID
// Step 2: With that user, get their posts
// Step 3: With those posts, get comments on the first post
// Step 4: With those comments, get info on the first commenter

// This is what it looks like with callbacks...
getUserById(1, function(user) {
  getPostsByUser(user.id, function(posts) {
    getComments(posts[0].id, function(comments) {
      getAuthor(comments[0].authorId, function(author) {
        console.log(author.name); // Finally got the data!
        // Four levels deep. Imagine 7 or 8 levels...
      });
    });
  });
});

// This is called "Callback Hell" or the "Pyramid of Doom".
// It's hard to read, hard to debug, and handling errors is a nightmare.`}
              title="callback-hell.js"
              highlightLines={[7, 8, 9, 10]}
            />
          </div>

          {/* Era 2: Promises */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, color: "var(--secondary)", background: "rgba(6,182,212,0.12)", padding: "3px 10px", borderRadius: 20 }}>ERA 2 (ES2015 — 2015+)</span>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--secondary)", fontSize: "1.1rem" }}>
                Promises — A Much Better Contract
              </h3>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: 14 }}>
              A <strong style={{ color: "var(--text)" }}>Promise</strong> is exactly what it sounds like — a promise that a value will be available <em>in the future</em>.
              When you ask for data from a server, you get a Promise immediately. That Promise is like a ticket that says &quot;I promise to give you the data (or an error) when it&apos;s ready.&quot;
              <br /><br />
              A Promise can be in one of three states — explore them interactively below:
            </p>

            <PromiseStateMachine />

            <div style={{ marginTop: 16 }}>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: 14 }}>
                Promises let us write async operations in a chain (<code style={{ fontFamily: "var(--font-mono)", color: "var(--secondary)" }}>.then().then().then()</code>) instead of nesting — this flattens the pyramid dramatically:
              </p>
              <CodeBlock
                code={`// Same 4-step logic as before — but now with Promises!
// Notice how it reads almost like a recipe: do this, then do this, then...
getUserById(1)
  .then(user => getPostsByUser(user.id))
  .then(posts => getComments(posts[0].id))
  .then(comments => getAuthor(comments[0].authorId))
  .then(author => {
    console.log(author.name); // Got the data! Much cleaner.
  })
  .catch(error => {
    // ONE place to handle errors from any of the steps above
    console.error("Something went wrong:", error.message);
  })
  .finally(() => {
    // This always runs, whether it succeeded or failed
    console.log("Request finished!");
  });

// You can also run multiple things at the same time:
Promise.all([
  fetch("/api/users"),
  fetch("/api/posts"),       // These three start simultaneously!
  fetch("/api/settings"),
]).then(([users, posts, settings]) => {
  // All three results arrive here together
  console.log("Got everything at once!");
});`}
                title="promises.js"
                highlightLines={[4, 5, 6, 7, 11, 12, 20, 21, 22]}
              />
            </div>
          </div>

          {/* Era 3: Async/Await */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, color: "var(--success)", background: "rgba(5,150,105,0.12)", padding: "3px 10px", borderRadius: 20 }}>ERA 3 (ES2017 — 2017+, current standard)</span>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--success)", fontSize: "1.1rem" }}>
                async/await — Looks Like Regular Code!
              </h3>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: 14 }}>
              <code style={{ fontFamily: "var(--font-mono)", color: "var(--success)", fontSize: "0.95rem" }}>async/await</code> is the newest and most popular way to write async code.
              The magic is that it makes async code <em>look</em> like perfectly normal synchronous code — no nesting, no <code style={{ fontFamily: "var(--font-mono)" }}>.then()</code> chains, just clean top-to-bottom reading.
              <br /><br />
              <strong>Two new keywords to learn:</strong>
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              <div style={{ background: "rgba(5,150,105,0.08)", border: "1px solid rgba(5,150,105,0.25)", borderRadius: 10, padding: "14px 16px" }}>
                <code style={{ fontFamily: "var(--font-mono)", color: "var(--success)", fontWeight: 700, fontSize: "1rem" }}>async</code>
                <p style={{ color: "var(--text-muted)", fontSize: "0.83rem", lineHeight: 1.6, marginTop: 8 }}>
                  Put this before a function declaration. It does two things: (1) allows you to use <code style={{ fontFamily: "var(--font-mono)" }}>await</code> inside it, and (2) makes the function automatically return a Promise. Any value you return becomes a Promise that resolves to that value.
                </p>
              </div>
              <div style={{ background: "rgba(5,150,105,0.08)", border: "1px solid rgba(5,150,105,0.25)", borderRadius: 10, padding: "14px 16px" }}>
                <code style={{ fontFamily: "var(--font-mono)", color: "var(--success)", fontWeight: 700, fontSize: "1rem" }}>await</code>
                <p style={{ color: "var(--text-muted)", fontSize: "0.83rem", lineHeight: 1.6, marginTop: 8 }}>
                  Put this before a Promise. It pauses the <em>current async function</em> (not the whole page!) until the Promise resolves, then gives you the resolved value directly. The Event Loop keeps running other code while it waits.
                </p>
              </div>
            </div>

            <CodeBlock
              code={`// Same 4-step logic one more time — now with async/await!
// Reads almost like English: "get the user, wait for it, then get posts, wait..."

async function getAuthorOfFirstComment() {
  try {
    const user     = await getUserById(1);           // Wait for user
    const posts    = await getPostsByUser(user.id);  // Wait for posts
    const comments = await getComments(posts[0].id); // Wait for comments
    const author   = await getAuthor(comments[0].authorId); // Wait for author

    console.log(author.name); // So readable!
    return author;

  } catch (error) {
    // If ANY of the awaited steps fail, this catch block handles it
    console.error("Something failed:", error.message);
  }
}

// Call an async function like any other function:
getAuthorOfFirstComment();

// IMPORTANT: await only works inside async functions.
// You can't use await at the top level (unless using ES Modules with top-level await).`}
              title="async-await.js"
              highlightLines={[4, 6, 7, 8, 9, 14, 15]}
            />

            <ConceptCard icon={<Info size={16} />} title="async/await is built ON TOP of Promises — not replacing them" variant="info">
              Here&apos;s an important mental model: <code style={{ fontFamily: "var(--font-mono)" }}>async/await</code> doesn&apos;t change how JavaScript actually works under the hood. It just gives you nicer <em>syntax</em> for writing Promise-based code.
              <br /><br />
              When you write <code style={{ fontFamily: "var(--font-mono)" }}>await somePromise</code>, what actually happens is: the async function pauses, the Event Loop runs other code, and when the Promise resolves, the function is resumed from exactly where it left off — with the resolved value.
              <br /><br />
              So everything you learned about the Event Loop still applies! <code style={{ fontFamily: "var(--font-mono)" }}>await</code> still uses the Microtask Queue. The Call Stack is still in charge. The browser&apos;s Web APIs still do the slow work. <code style={{ fontFamily: "var(--font-mono)" }}>async/await</code> just makes all of this look much nicer.
            </ConceptCard>
          </div>
        </div>
      </FadeInSection>

      {/* Section 4: Fetch API */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
            The Fetch API — Talking to Servers
          </h2>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            In real apps, you&apos;ll constantly need to get data from servers — loading a user&apos;s profile, fetching tweets, saving a form.
            This is done via HTTP requests, and the modern way to make them in JavaScript is with the built-in <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>fetch()</code> function.
          </p>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>fetch()</code> is a Web API (handled by the browser in the background) that returns a Promise.
            Here&apos;s how to use it step by step — this pattern appears in almost every JavaScript app you&apos;ll ever build:
          </p>

          <CodeBlock
            code={`// The standard fetch pattern — memorise this!
async function getWeather(city) {
  try {
    // Step 1: Tell the browser to make an HTTP request
    //         fetch() returns a Promise immediately and starts the request
    const response = await fetch(\`https://api.weather.com/v1/\${city}\`);

    // Step 2: Check if the server sent a success response
    //         (fetch only rejects on network failure, NOT on 404/500 errors!)
    if (!response.ok) {
      throw new Error(\`Server said: \${response.status} \${response.statusText}\`);
    }

    // Step 3: Parse the response body as JSON
    //         This is also async! (The body could be large)
    const weatherData = await response.json();

    // Step 4: Now you have your data — use it!
    console.log(\`Temperature: \${weatherData.temp}°C\`);
    return weatherData;

  } catch (error) {
    // This catches both network failures AND our thrown errors above
    console.error("Could not fetch weather:", error.message);
    return null;
  }
}

// Usage — just call it like a normal function:
getWeather("New York");`}
            title="fetch-example.js"
            highlightLines={[6, 10, 11, 16, 19]}
          />

          <ConceptCard icon={<AlertTriangle size={16} />} title="Common mistake: fetch doesn't reject on HTTP errors!" variant="warning">
            This trips up nearly every beginner. If a server returns a 404 (Not Found) or 500 (Server Error), <strong>fetch() does NOT throw an error</strong>. The Promise still resolves!
            <br /><br />
            fetch() only rejects (throws) if there&apos;s a <em>network failure</em> — like being offline, or the server is completely unreachable.
            <br /><br />
            That&apos;s why the pattern above checks <code style={{ fontFamily: "var(--font-mono)" }}>response.ok</code> and throws manually if the status isn&apos;t in the 200–299 range. Always include this check!
          </ConceptCard>
        </div>
      </FadeInSection>

      {/* Quizzes */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>
            🧠 Test What You Learned
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.7 }}>
            These two questions test the concepts that most people get wrong on their first day with async. Don&apos;t worry if you guess wrong — read the explanations carefully!
          </p>

          <QuizCard
            question={`What order will these 4 lines print? console.log("A"); setTimeout(() => console.log("B"), 0); Promise.resolve().then(() => console.log("C")); console.log("D");`}
            options={[
              { label: "A, B, C, D — they run in the order they appear", correct: false, explanation: "Even though B and C appear before D in the code, they're async operations — they get scheduled and run AFTER all synchronous code. 'A' and 'D' are synchronous, so they run first." },
              { label: "A, D, B, C — sync code runs first, then async", correct: false, explanation: "Close! A and D first is correct (synchronous runs first). But the order of B and C is wrong. Promise callbacks (C) are microtasks and run BEFORE setTimeout callbacks (B), which are macrotasks." },
              { label: "A, D, C, B — sync first, then microtasks (Promises), then macrotasks (setTimeout)", correct: true, explanation: "Exactly right! Here's the full explanation: A runs (synchronous). setTimeout schedules B as a macrotask. Promise.resolve() immediately schedules C as a microtask. D runs (synchronous). Now the call stack is empty. The Event Loop: drains ALL microtasks first → C runs. Then takes ONE macrotask → B runs. Order: A, D, C, B." },
              { label: "A, C, D, B — the Promise runs immediately after it appears", correct: false, explanation: "Promises don't run their .then() callbacks immediately — even if the Promise is already resolved. The callback is scheduled as a microtask and runs after the current synchronous code finishes." },
            ]}
            hint="Step 1: which code is synchronous (runs immediately)? Step 2: microtasks or macrotasks first?"
          />

          <QuizCard
            question="Inside an async function, what does the await keyword actually do?"
            options={[
              { label: "It freezes the entire browser until the Promise resolves, then continues", correct: false, explanation: "If await blocked the entire browser, there'd be no point in async code at all! await does NOT freeze the page. You can still scroll, click, and run other JS while an await is 'waiting'. Only the current async FUNCTION is paused — not the whole thread." },
              { label: "It pauses just the current async function and lets other code run meanwhile, then resumes the function with the resolved value", correct: true, explanation: "Perfect explanation! await is a cooperative pause. The current function suspends at that point, the Event Loop runs other code (as if the function isn't there), and when the Promise resolves, the function picks up exactly where it left off with the result value dropped in. This is why async code can look synchronous without blocking the page." },
              { label: "It creates a new thread so the async function runs in parallel", correct: false, explanation: "JavaScript is single-threaded! There's no second thread created. await is an entirely single-threaded mechanism — the Event Loop just cleverly schedules continuation of the function after the Promise resolves." },
              { label: "It converts an async function into a synchronous one", correct: false, explanation: "async functions always remain asynchronous. await is syntactic sugar that makes WRITING async code look synchronous, but the function still runs asynchronously under the hood. It always returns a Promise." },
            ]}
            hint="Think about what the Event Loop can do while the await is 'waiting'..."
          />
        </div>
      </FadeInSection>

      {/* Summary */}
      <FadeInSection delay={0.1}>
        <div style={{ background: "linear-gradient(135deg, rgba(219,39,119,0.08), rgba(139,92,246,0.08))", border: "1px solid rgba(219,39,119,0.2)", borderRadius: 14, padding: "24px 28px" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>
            📚 What You Just Learned
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: 16, lineHeight: 1.6 }}>
            Async JavaScript is genuinely one of the hardest concepts to grasp at first. If it still feels fuzzy, that&apos;s completely normal — revisit the Event Loop simulator again and interact with every step. It will click! Here&apos;s what the module covered:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { point: "JavaScript is single-threaded — it can only run one thing at a time. Async code exists to prevent slow operations (network requests, timers) from blocking the page and making it unresponsive to the user." },
              { point: "The Event Loop has 5 parts: Call Stack (current code), Web APIs (browser handles slow work), Microtask Queue (Promise callbacks), Macrotask Queue (setTimeout callbacks), and the Event Loop itself (the traffic controller)." },
              { point: "The golden rule: when the Call Stack empties, the Event Loop drains ALL microtasks (Promises) before taking even ONE macrotask (setTimeout). This is why Promise callbacks always run before setTimeout callbacks — even with setTimeout(fn, 0)." },
              { point: "Callbacks were the original async pattern but lead to deeply nested 'Callback Hell'. Promises (2015) fixed nesting with .then() chains and introduced single-place error handling via .catch(). async/await (2017) makes Promise-based code look like normal synchronous code." },
              { point: "fetch() is the standard way to make HTTP requests. Always check response.ok — fetch only rejects on network failure, NOT on 404/500 errors. Always await response.json() to parse the body as a separate step." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#db2777", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>{item.point}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

    </div>
  );
}
