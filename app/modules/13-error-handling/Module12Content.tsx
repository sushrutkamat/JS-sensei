"use client";

import { FadeInSection } from "@/components/animations/FadeInSection";
import { CodeBlock, QuizCard, ConceptCard } from "@/components/interactive/components";
import { TryCatchVisualizer, ErrorTypesExplorer } from "@/components/visualizers/Module12Visualizers";
import { Shield, AlertTriangle, Info } from "lucide-react";

export function Module12Content() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>

      <FadeInSection>
        <div style={{ background: "linear-gradient(135deg, rgba(239,68,68,0.08), rgba(139,92,246,0.06))", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 14, padding: "24px 28px" }}>
          <p style={{ fontSize: "1.05rem", color: "var(--text)", lineHeight: 1.9 }}>
            🛡️ <strong>Programs will encounter unexpected situations — network drops, bad data, missing files.</strong>
            Error handling is how you make your code resilient: instead of crashing and showing a broken page, it gracefully recovers, shows a friendly message, and continues running.
            Good error handling is the mark of professional-grade code.
          </p>
        </div>
      </FadeInSection>

      {/* Why errors happen */}
      <FadeInSection>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(239,68,68,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <AlertTriangle size={18} style={{ color: "var(--error)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              The 5 Types of JavaScript Errors
            </h2>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Before you can handle errors, you need to know what you&apos;re dealing with. JavaScript has 5 built-in error types, each telling a different story. Click each type to understand when it happens and how to fix it:
          </p>
          <ErrorTypesExplorer />
        </div>
      </FadeInSection>

      {/* Try/Catch */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(139,92,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Shield size={18} style={{ color: "var(--primary)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
              try / catch / finally — Your Safety Net
            </h2>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Wrap risky code in a <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>try</code> block. If anything throws an error inside, execution immediately jumps to <code style={{ fontFamily: "var(--font-mono)", color: "var(--error)" }}>catch</code> — the rest of try is skipped.
            <code style={{ fontFamily: "var(--font-mono)", color: "var(--secondary)" }}>finally</code> always runs no matter what. Step through each scenario:
          </p>
          <TryCatchVisualizer />
          <CodeBlock
            code={`// Basic structure:\ntry {\n  // Code that might throw\n  const data = JSON.parse(userInput); // could throw SyntaxError\n  processData(data);\n\n} catch (err) {\n  // Handle the error — don't crash!\n  console.error("Failed:", err.message);\n  showErrorMessage("Invalid data format");\n\n} finally {\n  // ALWAYS runs — perfect for cleanup:\n  hideLoadingSpinner();\n  closeFileHandle();\n  releaseResource();\n}\n\n// The 'err' object has:\n// err.message — human-readable description\n// err.name    — the error class name ("SyntaxError", "TypeError", etc.)\n// err.stack   — stack trace (where it happened)`}
            title="try-catch-finally.js"
            highlightLines={[2, 7, 12]}
          />
        </div>
      </FadeInSection>

      {/* Throwing */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
            Throwing Your Own Errors
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            You don&apos;t have to wait for JavaScript to throw errors — you can throw them yourself using the <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>throw</code> keyword.
            This is how you signal that something is wrong with the data or logic in your own code:
          </p>
          <CodeBlock
            code={`// Throwing a basic Error:\nfunction divide(a, b) {\n  if (b === 0) {\n    throw new Error("Cannot divide by zero!");\n  }\n  return a / b;\n}\n\ntry {\n  divide(10, 0);\n} catch (err) {\n  console.log(err.message); // "Cannot divide by zero!"\n}\n\n// Custom Error class — highly recommended for domain-specific errors:\nclass ApiError extends Error {\n  constructor(statusCode, message) {\n    super(message);          // sets err.message\n    this.name = "ApiError"; // overrides err.name\n    this.statusCode = statusCode; // your custom data!\n  }\n}\n\nasync function fetchUser(id) {\n  const res = await fetch(\`/api/user/\${id}\`);\n  if (!res.ok) {\n    throw new ApiError(res.status, "User not found");\n  }\n  return res.json();\n}\n\ntry {\n  await fetchUser(999);\n} catch (err) {\n  if (err instanceof ApiError) {\n    showToast(\`Server error \${err.statusCode}: \${err.message}\`);\n  } else {\n    throw err; // re-throw unexpected errors — don't bury them!\n  }\n}`}
            title="throwing-errors.js"
            highlightLines={[3, 4, 16, 29, 31, 32]}
          />
          <ConceptCard icon={<Info size={16} />} title="Always re-throw errors you don't understand" variant="tip">
            A common anti-pattern is a catch block that silently swallows every error:
            <br />
            <code style={{ fontFamily: "var(--font-mono)" }}>catch (err) {"{ }"}  // empty catch — where did my error go?!</code>
            <br /><br />
            Always ask: <em>do I know how to handle this specific error?</em> If yes, handle it. If not, re-throw it with <code style={{ fontFamily: "var(--font-mono)" }}>throw err</code> so it bubbles up to something that can.
            Silent failures are extremely hard to debug — a well-thrown error with a stack trace is a gift!
          </ConceptCard>
        </div>
      </FadeInSection>

      {/* Async errors */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
            Error Handling in Async/Await Code
          </h2>
          <CodeBlock
            code={`// With async/await — try/catch works exactly the same way:\nasync function loadData() {\n  try {\n    const response = await fetch("https://api.example.com/data");\n\n    // fetch() doesn't throw on 4xx/5xx — you must check ok:\n    if (!response.ok) {\n      throw new Error(\`HTTP error! Status: \${response.status}\`);\n    }\n\n    const data = await response.json();\n    displayData(data);\n\n  } catch (err) {\n    // Catches: network errors, JSON parse errors, your own throws\n    console.error("Failed to load:", err.message);\n    showErrorState();\n\n  } finally {\n    hideLoadingSpinner(); // always clean up\n  }\n}\n\n// ⚠️ fetch() does NOT throw on 404 or 500 — only on network failure!\n// Always check response.ok or response.status yourself.`}
            title="async-error-handling.js"
            highlightLines={[2, 6, 7, 8, 14, 20]}
          />
          <ConceptCard icon={<AlertTriangle size={16} />} title="fetch() doesn't throw on HTTP errors!" variant="warning">
            This catches many beginners out. <code style={{ fontFamily: "var(--font-mono)" }}>fetch()</code> only throws if there&apos;s a <strong>network-level failure</strong> (no internet, DNS failure, CORS block).
            <br /><br />
            If the server responds with 404, 500, or any other HTTP error code, <code style={{ fontFamily: "var(--font-mono)" }}>fetch()</code> considers this a <em>successful fetch</em> and resolves the promise — you must manually check <code style={{ fontFamily: "var(--font-mono)" }}>response.ok</code> or <code style={{ fontFamily: "var(--font-mono)" }}>response.status</code> and throw if needed.
          </ConceptCard>
        </div>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>🧠 Quick Check</h2>
          <QuizCard
            question="Does the 'finally' block run if an error is thrown in the 'catch' block?"
            options={[
              { label: "No — if catch throws, finally is skipped", correct: false, explanation: "finally always runs, period. Even if the catch block throws another error. Even if try contains a 'return'. It's the unconditional cleanup block — guaranteed execution regardless of what happens." },
              { label: "Yes — finally always runs no matter what", correct: true, explanation: "Exactly! finally is the guaranteed cleanup zone. It runs after try completes (success), after catch runs (even if catch itself throws), and even when there's a return statement in try or catch. Use it for closingconnections, hiding spinners, releasing resources — anything that MUST happen regardless of success or failure." },
              { label: "Only if the catch block handles the error successfully", correct: false, explanation: "No conditions on finally — it always runs. The 'success' of the catch block is irrelevant to whether finally executes." },
              { label: "Only if there's no return statement in try", correct: false, explanation: "Even if try has a return statement, finally still runs before the function actually returns. finally can even override the return value (though doing so intentionally is considered bad practice)." },
            ]}
            hint="The whole point of 'finally' is that it runs unconditionally..."
          />
        </div>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <div style={{ background: "linear-gradient(135deg, rgba(239,68,68,0.06), rgba(139,92,246,0.08))", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 14, padding: "24px 28px" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>📚 What You Just Learned</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "5 error types: SyntaxError (bad code, pre-run), ReferenceError (variable doesn't exist), TypeError (wrong type, most common), RangeError (value out of bounds), and custom Error subclasses.",
              "try/catch/finally: try wraps risky code. On error, execution jumps to catch (rest of try skipped). finally always runs — perfect for cleanup (hiding spinners, closing connections). err.message, err.name, err.stack are your debugging tools.",
              "throw new Error() lets you signal problems explicitly. throw can be used at any point to stop execution and jump to the nearest catch. Throw from validation functions to signal bad input.",
              "Custom Error classes: extend Error to create domain-specific error types (ApiError, ValidationError). Your catch blocks can use instanceof to handle different error types differently.",
              "Re-throw pattern: only handle errors you understand. If you catch something unexpected, throw err — don't silently swallow it! Silent failures lead to mysterious bugs.",
              "Async errors: use try/catch with await — it works identically. IMPORTANT: fetch() does NOT throw on 4xx/5xx responses — only on network failure. Always check response.ok manually and throw if the status indicates an error.",
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--error)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{i + 1}</span>
                <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.7 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

    </div>
  );
}
