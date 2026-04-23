"use client";

import { FadeInSection } from "@/components/animations/FadeInSection";
import { CodeBlock, QuizCard, ConceptCard } from "@/components/interactive/components";
import { StringMethodExplorer, NumberLab, TruthyFalsyTester } from "@/components/visualizers/Module3PrimitivesVisualizers";
import { Hash, Activity, ToggleLeft, Info, AlertTriangle, Lightbulb } from "lucide-react";
import type { ReactNode } from "react";

// ── Shared Components ─────────────────────────────────────────────────────────

function MethodCard({ name, desc, accent = "#8b5cf6", children }: {
  name: string; desc: ReactNode; accent?: string; children: ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <code style={{
        fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.85rem",
        color: accent, background: accent + "1a",
        border: `1px solid ${accent}40`, padding: "4px 12px", borderRadius: 6,
        display: "inline-block", width: "fit-content",
      }}>
        {name}
      </code>
      <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.75 }}>{desc}</p>
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "var(--border)", opacity: 0.4 }} />;
}

function SectionHeader({ icon, emoji, title, color, desc }: {
  icon: ReactNode; emoji: string; title: string; color: string; desc: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 9, background: color + "26", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {icon}
        </div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", fontWeight: 700, color: "var(--text)" }}>
          {emoji} {title}
        </h2>
      </div>
      <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>{desc}</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MODULE CONTENT
// ═══════════════════════════════════════════════════════════════════════════

export function Module3PrimitivesContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>

      {/* Intro */}
      <FadeInSection>
        <div style={{ background: "linear-gradient(135deg, rgba(5,150,105,0.10), rgba(139,92,246,0.06))", border: "1px solid rgba(5,150,105,0.25)", borderRadius: 14, padding: "24px 28px" }}>
          <p style={{ fontSize: "1.05rem", color: "var(--text)", lineHeight: 1.9 }}>
            🧱 <strong>You know what primitive types are — now let&apos;s put them to work.</strong> Every method and operation gets its own focused section with an explanation and example. Work through these at your own pace — bookmark the ones you want to revisit.
          </p>
        </div>
      </FadeInSection>

      {/* ══════════════════════════════════════════════════════
          STRING OPERATIONS
          ══════════════════════════════════════════════════════ */}
      <FadeInSection>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <SectionHeader
            icon={<Hash size={18} style={{ color: "#059669" }} />}
            emoji="📝" title="String Operations" color="#059669"
            desc="Strings are immutable — every method returns a new string, never changing the original. Remember to reassign if you want to keep the result: str = str.toUpperCase()."
          />

          {/* .length */}
          <MethodCard accent="#059669" name=".length"
            desc="A property (not a method — no parentheses!) that returns the total number of characters in a string, including spaces and punctuation. Whitespace counts.">
            <CodeBlock code={`const str = "Hello!";
str.length;        // 6

"".length;         // 0  — empty string
"  hi  ".length;   // 7  — spaces count too
"Hello World".length; // 11`} title=".length" />
          </MethodCard>

          <Divider />

          {/* .charAt() */}
          <MethodCard accent="#059669" name=".charAt(index)"
            desc="Returns the character at a given zero-based index. If the index is out of range, it returns an empty string rather than undefined — that's its main difference from bracket notation str[i].">
            <CodeBlock code={`const str = "Hello";

str.charAt(0);   // "H"  — first character
str.charAt(1);   // "e"
str.charAt(4);   // "o"  — last character

str.charAt(10);  // ""   — out of range → empty string
str[10];         // undefined — bracket notation returns undefined`} title=".charAt()" />
          </MethodCard>

          <Divider />

          {/* .at() */}
          <MethodCard accent="#059669" name=".at(index)"
            desc="The modern way to access characters. Works exactly like charAt() for positive indexes, but adds support for negative indexes that count from the end. Use .at(-1) instead of str[str.length - 1] for cleaner code.">
            <CodeBlock code={`const str = "Hello";

str.at(0);    // "H"  — same as str[0]
str.at(1);    // "e"
str.at(-1);   // "o"  — last character (clean!)
str.at(-2);   // "l"  — second from end
str.at(-5);   // "H"  — same as str.at(0)`} title=".at()" highlightLines={[5, 6]} />
          </MethodCard>

          <Divider />

          {/* .toUpperCase() */}
          <MethodCard accent="#059669" name=".toUpperCase()"
            desc="Returns a new string with every character converted to uppercase. Does not affect numbers, symbols, or spaces — only letters are changed. Commonly used for case-insensitive comparisons.">
            <CodeBlock code={`"hello".toUpperCase();        // "HELLO"
"Hello World!".toUpperCase(); // "HELLO WORLD!"
"abc123".toUpperCase();       // "ABC123" — numbers unchanged

// Case-insensitive comparison:
const input = "Admin";
input.toUpperCase() === "ADMIN"; // true ✓`} title=".toUpperCase()" />
          </MethodCard>

          <Divider />

          {/* .toLowerCase() */}
          <MethodCard accent="#059669" name=".toLowerCase()"
            desc="Returns a new string with every character converted to lowercase. The mirror of toUpperCase(). Normalizing to lowercase before comparison is the most common pattern when you want to ignore case.">
            <CodeBlock code={`"WORLD".toLowerCase();        // "world"
"Hello World".toLowerCase();  // "hello world"

// Normalize user input before storing or comparing:
const email = "User@Email.COM";
email.toLowerCase();  // "user@email.com"

const tag = "  JavaScript  ";
tag.trim().toLowerCase(); // "javascript" — chain methods!`} title=".toLowerCase()" highlightLines={[8, 9]} />
          </MethodCard>

          <Divider />

          {/* .includes() */}
          <MethodCard accent="#059669" name=".includes(search, startPos?)"
            desc="Returns true if the string contains the search value anywhere inside it, false otherwise. Case-sensitive. You can optionally pass a starting position to begin the search from. Use this when you only need a yes/no answer and don't care about where the match is.">
            <CodeBlock code={`const str = "JavaScript is awesome";

str.includes("Java");    // true  — found inside
str.includes("Python");  // false — not found
str.includes("java");    // false — case-sensitive!

// Start search from a specific position:
str.includes("is", 15);  // false — "is" only appears at index 11`} title=".includes()" highlightLines={[5]} />
          </MethodCard>

          <Divider />

          {/* .startsWith() */}
          <MethodCard accent="#059669" name=".startsWith(search, startPos?)"
            desc="Returns true if the string begins with the given value. Useful for checking URL prefixes, file extensions from the front, or validating user input format. The optional second argument lets you shift where 'the start' is.">
            <CodeBlock code={`const url = "https://example.com";

url.startsWith("https");     // true
url.startsWith("http://");   // false
url.startsWith("example", 8); // true — start from index 8

"Hello World".startsWith("World"); // false — doesn't begin there`} title=".startsWith()" highlightLines={[4]} />
          </MethodCard>

          <Divider />

          {/* .endsWith() */}
          <MethodCard accent="#059669" name=".endsWith(search, length?)"
            desc="Returns true if the string ends with the given value. Great for checking file extensions or URL endings. The optional length argument lets you treat only the first n characters as the string — useful for stripping query params before checking.">
            <CodeBlock code={`"photo.jpg".endsWith(".jpg");  // true
"script.js".endsWith(".js");   // true
"script.js".endsWith(".ts");   // false

// Check only first 9 characters (ignores rest):
"Hello!!! ".endsWith("Hello", 5); // true`} title=".endsWith()" />
          </MethodCard>

          <Divider />

          {/* .indexOf() */}
          <MethodCard accent="#059669" name=".indexOf(search, fromIndex?)"
            desc="Returns the index (position) of the first occurrence of the search value, or -1 if it's not found. Checking for -1 is the classic way to test existence. You can start the search from a specific index using the second argument.">
            <CodeBlock code={`const str = "banana";

str.indexOf("a");     // 1  — first "a" is at index 1
str.indexOf("nan");   // 2  — substring found at index 2
str.indexOf("z");     // -1 — not found

// Search starting from index 2:
str.indexOf("a", 2);  // 3  — finds the next "a" after index 2

// Existence check:
if (str.indexOf("nan") !== -1) { /* found */ }`} title=".indexOf()" highlightLines={[5, 10]} />
          </MethodCard>

          <Divider />

          {/* .lastIndexOf() */}
          <MethodCard accent="#059669" name=".lastIndexOf(search, fromIndex?)"
            desc="Like indexOf() but searches from right to left, returning the position of the last occurrence. Useful when you care about the most recent match — like finding the last slash in a file path.">
            <CodeBlock code={`const str = "banana";

str.lastIndexOf("a");    // 5  — last "a" is at index 5
str.lastIndexOf("a", 4); // 3  — search backward from index 4

// Get filename from a path:
const path = "/users/alice/photo.jpg";
path.lastIndexOf("/");   // 13 — position of last slash
path.slice(14);          // "photo.jpg"`} title=".lastIndexOf()" highlightLines={[8, 9]} />
          </MethodCard>

          <Divider />

          {/* .slice() */}
          <MethodCard accent="#059669" name=".slice(start, end?)"
            desc="Extracts a portion of a string and returns it as a new string. The start index is included, the end index is excluded. Supports negative indexes (counting from the end). This is the preferred extraction method — use slice() over substring().">
            <CodeBlock code={`const str = "Hello, World!";

str.slice(7, 12);   // "World"  — index 7 up to (not including) 12
str.slice(7);       // "World!" — from index 7 to the end
str.slice(0, 5);    // "Hello"  — first 5 characters

// Negative indexes count from the end:
str.slice(-6);      // "orld!"  — last 6 characters
str.slice(-6, -1);  // "orld"   — negative start and end`} title=".slice()" highlightLines={[8, 9]} />
          </MethodCard>

          <Divider />

          {/* .substring() */}
          <MethodCard accent="#059669" name=".substring(start, end?)"
            desc="Similar to slice() but does not support negative indexes — negatives are treated as 0. Its unusual behavior: if start is greater than end, it swaps them automatically. Prefer .slice() for new code; you'll encounter substring() in older codebases.">
            <CodeBlock code={`const str = "Hello, World!";

str.substring(7, 12);  // "World"  — same as slice(7, 12)
str.substring(7);      // "World!" — from index 7 to end

// Quirk: args are swapped if start > end
str.substring(12, 7);  // "World" — args auto-swapped!
str.slice(12, 7);      // ""      — slice does NOT swap, returns empty`} title=".substring()" highlightLines={[6, 7, 8]} />
          </MethodCard>

          <Divider />

          {/* .replace() */}
          <MethodCard accent="#059669" name=".replace(search, replacement)"
            desc="Replaces the FIRST match of the search value and returns a new string. Does not modify the original. The search can be a string or a regular expression. For replacing all occurrences, use replaceAll() or a regex with the global flag /g.">
            <CodeBlock code={`const str = "I love dogs and dogs";

str.replace("dogs", "cats");    // "I love cats and dogs"  — first only!
str.replace(/dogs/, "cats");    // "I love cats and dogs"  — same result

// With regex for case-insensitive:
"Hello World".replace(/hello/i, "Hi");  // "Hi World"`} title=".replace()" highlightLines={[3]} />
          </MethodCard>

          <Divider />

          {/* .replaceAll() */}
          <MethodCard accent="#059669" name=".replaceAll(search, replacement)"
            desc="Replaces ALL occurrences of the search value. The cleaner alternative to using .replace() with a global regex (/g flag). If you pass a regex to replaceAll(), it must include the global flag — otherwise it throws an error.">
            <CodeBlock code={`const str = "I love dogs and dogs";

str.replaceAll("dogs", "cats");  // "I love cats and cats" ✓

// Equivalent regex approach:
str.replace(/dogs/g, "cats");    // "I love cats and cats"

// Replace all vowels:
"Hello World".replaceAll(/[aeiou]/gi, "*"); // ERROR: regex needs /g`} title=".replaceAll()" highlightLines={[3]} />
          </MethodCard>

          <Divider />

          {/* .split() */}
          <MethodCard accent="#059669" name=".split(separator, limit?)"
            desc="Splits a string into an array of substrings at each occurrence of the separator. Passing an empty string splits every single character. The optional limit argument caps how many elements are in the result. The reverse operation is array.join().">
            <CodeBlock code={`"a,b,c".split(",");       // ["a", "b", "c"]
"hello".split("");        // ["h","e","l","l","o"]
"one two three".split(" "); // ["one", "two", "three"]

// With a limit:
"a,b,c,d".split(",", 2);  // ["a", "b"] — only first 2

// Reverse: array back to string
["one","two","three"].join(" | "); // "one | two | three"`} title=".split()" highlightLines={[8, 9]} />
          </MethodCard>

          <Divider />

          {/* .trim() */}
          <MethodCard accent="#059669" name=".trim()"
            desc="Removes whitespace (spaces, tabs, newlines) from both the start and end of a string. Essential for cleaning user input — users often accidentally add spaces when typing into forms. Does not affect whitespace in the middle of the string.">
            <CodeBlock code={`"  hello  ".trim();     // "hello"
"  hello  ".length;    // 9
"  hello  ".trim().length; // 5

// Clean a form name:
const rawName = "  Alice  ";
rawName.trim(); // "Alice"  ← always trim user input!`} title=".trim()" highlightLines={[6, 7]} />
          </MethodCard>

          <Divider />

          {/* .trimStart() */}
          <MethodCard accent="#059669" name=".trimStart()"
            desc="Removes whitespace from the beginning (left side) of the string only. Useful when the trailing whitespace is intentional but leading whitespace is not — for example, indented content blocks.">
            <CodeBlock code={`"  hello  ".trimStart(); // "hello  "  — trailing space kept
"  hello  ".trimEnd();  // "  hello"  — leading space kept
"  hello  ".trim();     // "hello"    — both removed`} title=".trimStart()" />
          </MethodCard>

          <Divider />

          {/* .trimEnd() */}
          <MethodCard accent="#059669" name=".trimEnd()"
            desc="Removes whitespace from the end (right side) of the string only. Also aliased as .trimRight() in older code, though trimEnd() is the standard name. Used when you want to clean up trailing spaces but preserve leading indentation.">
            <CodeBlock code={`const line = "   const x = 1;   ";

line.trimEnd();    // "   const x = 1;"  — keeps leading indent
line.trimStart();  // "const x = 1;   "  — keeps trailing
line.trim();       // "const x = 1;"     — removes both`} title=".trimEnd()" />
          </MethodCard>

          <Divider />

          {/* .padStart() */}
          <MethodCard accent="#059669" name=".padStart(targetLength, fillString?)"
            desc="Pads the beginning of a string with a fill character until it reaches the target length. Defaults to a space if no fill is given. Classic use case: formatting numbers with leading zeros for IDs, times, or file names.">
            <CodeBlock code={`"5".padStart(3, "0");     // "005"  — leading zeros
"42".padStart(5, "0");    // "00042"
"hi".padStart(6);         // "    hi"  — spaces by default

// Formatting time:
const h = "9", m = "5";
h.padStart(2, "0") + ":" + m.padStart(2, "0"); // "09:05"`} title=".padStart()" highlightLines={[6, 7]} />
          </MethodCard>

          <Divider />

          {/* .padEnd() */}
          <MethodCard accent="#059669" name=".padEnd(targetLength, fillString?)"
            desc="Pads the end of a string with a fill character until it reaches the target length. Useful for right-padding text to create fixed-width columns in tables or formatted output.">
            <CodeBlock code={`"hi".padEnd(6, ".");      // "hi...."
"hello".padEnd(8, "-");  // "hello---"
"42".padEnd(5, "0");     // "42000"

// Fixed-width table columns:
"Name".padEnd(20);    // "Name                "
"Score".padEnd(20);   // "Score               "`} title=".padEnd()" />
          </MethodCard>

          <Divider />

          {/* .repeat() */}
          <MethodCard accent="#059669" name=".repeat(count)"
            desc="Returns the string repeated count times. Count must be a non-negative integer. Great for generating separators, placeholder patterns, or visual structures without writing a loop.">
            <CodeBlock code={`"ha".repeat(3);     // "hahaha"
"=".repeat(20);    // "===================="
"⭐".repeat(5);    // "⭐⭐⭐⭐⭐"
"-".repeat(0);     // ""  — zero repeats = empty string

// Practical: build a progress bar string
const pct = 7;
"█".repeat(pct) + "░".repeat(10 - pct); // "███████░░░"`} title=".repeat()" highlightLines={[6, 7]} />
          </MethodCard>

          <Divider />

          {/* .concat() */}
          <MethodCard accent="#059669" name=".concat(...strings)"
            desc="Joins one or more strings together and returns the result. Functionally identical to the + operator or template literals. In practice, + and template literals are cleaner and more readable — you'll rarely need .concat() in modern code.">
            <CodeBlock code={`"Hello".concat(", ", "World", "!"); // "Hello, World!"

// These three are identical — prefer the bottom two:
"Hello".concat(", World!");  // "Hello, World!"
"Hello" + ", World!";        // "Hello, World!"
\`Hello, World!\`;             // "Hello, World!"`} title=".concat()" highlightLines={[4, 5, 6]} />
          </MethodCard>

          <ConceptCard icon={<Lightbulb size={16} />} title="Chaining string methods" variant="tip">
            Every string method returns a new string, so you can chain them freely. The chain runs left to right, each step gets the result of the previous: <code style={{ fontFamily: "var(--font-mono)" }}>str.trim().toLowerCase().replace(&quot; &quot;, &quot;-&quot;)</code>. Just remember — if any step returns something unexpected, the whole chain may fail silently.
          </ConceptCard>
        </div>
      </FadeInSection>

      {/* String Visualizer */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>
            🎮 String Method Explorer
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.9 }}>
            Type any string, pick a method, watch the result update live.
          </p>
          <StringMethodExplorer />
        </div>
      </FadeInSection>

      {/* ══════════════════════════════════════════════════════
          NUMBER & MATH OPERATIONS
          ══════════════════════════════════════════════════════ */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <SectionHeader
            icon={<Activity size={18} style={{ color: "#0891b2" }} />}
            emoji="🔢" title="Number & Math Operations" color="#0891b2"
            desc="JavaScript has one number type for both integers and decimals. The global Math object provides all mathematical utilities."
          />

          {/* Number() */}
          <MethodCard accent="#0891b2" name="Number(value)"
            desc="Strictly converts any value to a number. The entire value must be numeric — if any part is invalid, the result is NaN. Note that an empty string ('') converts to 0, not NaN, which surprises most beginners.">
            <CodeBlock code={`Number("42");       // 42
Number("3.14");    // 3.14
Number("");        // 0    ← empty string → 0 (surprising!)
Number("42px");    // NaN  ← not purely numeric
Number(true);      // 1
Number(false);     // 0
Number(null);      // 0    ← null → 0
Number(undefined); // NaN  ← undefined → NaN`} title="Number()" highlightLines={[3, 4, 7, 8]} />
          </MethodCard>

          <Divider />

          {/* parseInt() */}
          <MethodCard accent="#0891b2" name="parseInt(string, radix?)"
            desc="Reads the integer part from the beginning of a string. Stops at the first non-numeric character instead of returning NaN. You can pass a radix (base) as the second argument — always pass 10 for base-10 to avoid unexpected behavior in old browsers.">
            <CodeBlock code={`parseInt("42");       // 42
parseInt("42px");    // 42   — stops at "p", reads the number
parseInt("3.9");     // 3    — integer only, truncates decimal
parseInt("px42");    // NaN  — must START with a digit
parseInt("ff", 16);  // 255  — parse hex (base 16)
parseInt("1010", 2); // 10   — parse binary (base 2)`} title="parseInt()" highlightLines={[2, 3]} />
          </MethodCard>

          <Divider />

          {/* parseFloat() */}
          <MethodCard accent="#0891b2" name="parseFloat(string)"
            desc="Like parseInt() but reads decimal numbers too. Stops at the first character that is not part of a valid float. Use this when you need to extract a decimal number from a string like '3.14em' or '99.9%'.">
            <CodeBlock code={`parseFloat("3.14");     // 3.14
parseFloat("3.14abc"); // 3.14  — stops at "a"
parseFloat("3.99px");  // 3.99  — stops at "p"
parseFloat(".5");      // 0.5   — leading dot is valid
parseFloat("abc");     // NaN   — no number at start`} title="parseFloat()" highlightLines={[2, 3]} />
          </MethodCard>

          <Divider />

          {/* Unary + */}
          <MethodCard accent="#0891b2" name="+ (unary plus)"
            desc="Placing a + before any value is a one-character shorthand for Number(). Exact same behavior — strict conversion, NaN for invalid values. You'll see this frequently in real codebases. Choose whichever you find more readable, but know how to recognize +.">
            <CodeBlock code={`+"42";        // 42   — same as Number("42")
+"3.14";      // 3.14
+"";          // 0    — same as Number("")
+"42px";      // NaN  — same as Number("42px")
+true;        // 1
+null;        // 0
+undefined;   // NaN`} title="unary +" />
          </MethodCard>

          <Divider />

          {/* .toFixed() */}
          <MethodCard accent="#0891b2" name=".toFixed(digits)"
            desc="Formats a number with a fixed number of decimal places and returns it as a STRING. Rounds the last digit. Critical for displaying currencies, measurements, or any value where you need precise decimal control. Remember: the result is a string, not a number.">
            <CodeBlock code={`(3.14159).toFixed(2);    // "3.14"   — rounds to 2 places
(3.14159).toFixed(0);    // "3"      — round to integer
(10).toFixed(2);         // "10.00"  — pads with zeros

// Fix the floating point display bug:
(0.1 + 0.2);             // 0.30000000000000004 ← ugly
(0.1 + 0.2).toFixed(2);  // "0.30" ← clean!`} title=".toFixed()" highlightLines={[5, 6, 7]} />
          </MethodCard>

          <Divider />

          {/* .toString() */}
          <MethodCard accent="#0891b2" name=".toString(base?)"
            desc="Converts a number to a string. The optional base argument converts to a different number system — 2 for binary, 8 for octal, 16 for hexadecimal. This is the only built-in way to convert a decimal number to binary or hex without a library.">
            <CodeBlock code={`(42).toString();      // "42"    — base 10 (default)
(42).toString(2);    // "101010" — binary
(42).toString(8);    // "52"     — octal
(255).toString(16);  // "ff"     — hexadecimal (useful for #ff colors!)
(10).toString(2);    // "1010"   — binary`} title=".toString()" highlightLines={[2, 3, 4]} />
          </MethodCard>

          <Divider />

          {/* .toPrecision() */}
          <MethodCard accent="#0891b2" name=".toPrecision(digits)"
            desc="Formats a number to a specified total number of significant digits (not decimal places). Returns a string. Useful in scientific contexts where absolute digit count matters more than decimal alignment.">
            <CodeBlock code={`(1234.5).toPrecision(4);  // "1235"  — 4 total significant digits
(1234.5).toPrecision(6);  // "1234.50"
(0.00123).toPrecision(2); // "0.0012" — 2 significant digits
(0.00123).toFixed(4);     // "0.0012" — compare: 4 decimal places`} title=".toPrecision()" highlightLines={[4]} />
          </MethodCard>

          <Divider />

          {/* Number.isInteger() */}
          <MethodCard accent="#0891b2" name="Number.isInteger(value)"
            desc="Returns true if the value is a finite number with no fractional part. Note that 5.0 is an integer (the .0 is just notation), but 5.5 is not. Does not coerce the argument — passing '5' (a string) returns false.">
            <CodeBlock code={`Number.isInteger(5);      // true
Number.isInteger(5.0);   // true  — 5.0 is still an integer
Number.isInteger(5.5);   // false
Number.isInteger("5");   // false — no coercion, string ≠ number
Number.isInteger(Infinity); // false`} title="Number.isInteger()" highlightLines={[2, 4]} />
          </MethodCard>

          <Divider />

          {/* Number.isFinite() */}
          <MethodCard accent="#0891b2" name="Number.isFinite(value)"
            desc="Returns true if the value is a finite number (not Infinity, -Infinity, or NaN). Unlike the global isFinite(), the Number.isFinite() version does not coerce its argument — much safer.">
            <CodeBlock code={`Number.isFinite(42);        // true
Number.isFinite(0);         // true
Number.isFinite(Infinity);  // false
Number.isFinite(-Infinity); // false
Number.isFinite(NaN);       // false
Number.isFinite("42");      // false — no coercion!
isFinite("42");             // true  — global version coerces ← risky`} title="Number.isFinite()" highlightLines={[6, 7]} />
          </MethodCard>

          <Divider />

          {/* Number.isNaN() */}
          <MethodCard accent="#0891b2" name="Number.isNaN(value)"
            desc="Returns true only if the value is exactly the NaN value. This is safer than the global isNaN() which first converts its argument to a number — so isNaN('hello') returns true even though 'hello' is not NaN, it's a string. Always use Number.isNaN().">
            <CodeBlock code={`Number.isNaN(NaN);       // true
Number.isNaN(0 / 0);    // true   — 0/0 produces NaN
Number.isNaN("hello");  // false  — it's a string, not NaN
Number.isNaN(42);       // false

// Why the global isNaN() is misleading:
isNaN("hello");         // true   ← coerces "hello" to NaN first!
Number.isNaN("hello");  // false  ← no coercion, safer`} title="Number.isNaN()" highlightLines={[3, 7, 8]} />
          </MethodCard>

          <Divider />

          {/* Math.round() */}
          <MethodCard accent="#0891b2" name="Math.round(x)"
            desc="Standard rounding: rounds to the nearest integer. If the decimal part is exactly .5, it rounds UP (toward positive infinity). This means Math.round(-4.5) = -4, not -5 — a common gotcha.">
            <CodeBlock code={`Math.round(4.4);   // 4
Math.round(4.5);   // 5   — .5 rounds up
Math.round(4.9);   // 5

// The .5 gotcha for negatives:
Math.round(-4.4);  // -4
Math.round(-4.5);  // -4  ← rounds UP (toward +∞), not -5!`} title="Math.round()" highlightLines={[7]} />
          </MethodCard>

          <Divider />

          {/* Math.floor() */}
          <MethodCard accent="#0891b2" name="Math.floor(x)"
            desc="Always rounds DOWN toward negative infinity — no matter what the decimal is. For positive numbers this means removing the decimal. For negative numbers it means going to the more negative integer. Used in every random integer formula.">
            <CodeBlock code={`Math.floor(4.1);   // 4 — removes decimal
Math.floor(4.9);   // 4 — still 4, always down
Math.floor(-4.1);  // -5 ← goes more negative, not -4!
Math.floor(-4.9);  // -5

// Classic random integer formula:
Math.floor(Math.random() * 10); // 0–9`} title="Math.floor()" highlightLines={[3, 4]} />
          </MethodCard>

          <Divider />

          {/* Math.ceil() */}
          <MethodCard accent="#0891b2" name="Math.ceil(x)"
            desc="Always rounds UP toward positive infinity. The opposite of floor(). For positive numbers it goes to the next integer above. For negative numbers 'up' means toward zero — so -4.1 becomes -4, not -5.">
            <CodeBlock code={`Math.ceil(4.1);    // 5  — up to next integer
Math.ceil(4.9);    // 5
Math.ceil(4.0);    // 4  — already an integer, no change

// For negatives, "up" means toward 0:
Math.ceil(-4.9);   // -4  ← toward zero, not -5
Math.ceil(-4.1);   // -4`} title="Math.ceil()" highlightLines={[5, 6, 7]} />
          </MethodCard>

          <Divider />

          {/* Math.trunc() */}
          <MethodCard accent="#0891b2" name="Math.trunc(x)"
            desc="Removes the decimal part and returns the integer portion, always moving toward zero. Unlike floor() and ceil(), trunc() behaves symmetrically for positive and negative numbers — it just chops off the decimal.">
            <CodeBlock code={`Math.trunc(4.9);   // 4   — removes decimal
Math.trunc(4.1);   // 4

// The difference from floor() for negatives:
Math.trunc(-4.9);  // -4  ← toward 0
Math.floor(-4.9);  // -5  ← toward -∞  (different!)`} title="Math.trunc()" highlightLines={[5, 6]} />
          </MethodCard>

          <Divider />

          {/* Math.abs() */}
          <MethodCard accent="#0891b2" name="Math.abs(x)"
            desc="Returns the absolute value — the non-negative version of the number. Removes the sign if negative, returns the value unchanged if already positive or zero. Useful for calculating distances or differences where direction doesn't matter.">
            <CodeBlock code={`Math.abs(-7);    // 7
Math.abs(7);     // 7   — positive stays positive
Math.abs(0);     // 0
Math.abs(-3.14); // 3.14

// Useful for distance (always positive):
const diff = 100 - 150;  // -50
Math.abs(diff);           // 50 — magnitude of difference`} title="Math.abs()" highlightLines={[7, 8]} />
          </MethodCard>

          <Divider />

          {/* Math.pow() */}
          <MethodCard accent="#0891b2" name="Math.pow(base, exp)"
            desc="Raises base to the power of exp. Identical to the ** exponentiation operator introduced in ES2016. Prefer ** for its readability, but know Math.pow() since you'll see it in older code.">
            <CodeBlock code={`Math.pow(2, 10);  // 1024 — 2 to the power 10
Math.pow(3, 3);   // 27   — 3 cubed
Math.pow(9, 0.5); // 3    — 0.5 power = square root!

// Modern equivalent — prefer this:
2 ** 10;          // 1024
3 ** 3;           // 27`} title="Math.pow()" highlightLines={[5, 6, 7]} />
          </MethodCard>

          <Divider />

          {/* Math.sqrt() */}
          <MethodCard accent="#0891b2" name="Math.sqrt(x)"
            desc="Returns the square root of x. Passing a negative number returns NaN — JavaScript has no built-in imaginary number support. Equivalent to raising to the power of 0.5.">
            <CodeBlock code={`Math.sqrt(16);   // 4
Math.sqrt(2);    // 1.4142135...
Math.sqrt(9);    // 3
Math.sqrt(0);    // 0
Math.sqrt(-1);   // NaN  — no imaginary numbers!

// Equivalent to:
16 ** 0.5;       // 4  — same result`} title="Math.sqrt()" highlightLines={[5]} />
          </MethodCard>

          <Divider />

          {/* Math.max() */}
          <MethodCard accent="#0891b2" name="Math.max(...values)"
            desc="Returns the largest of the given values. Can take any number of arguments. To use it with an array, spread the array using ... — otherwise it returns NaN when passed an array directly.">
            <CodeBlock code={`Math.max(3, 1, 4, 9, 2);  // 9
Math.max(1, 2);           // 2

// With an array — use spread operator:
const scores = [72, 95, 88, 61, 99];
Math.max(...scores);      // 99  ✓
Math.max(scores);         // NaN ← must spread!`} title="Math.max()" highlightLines={[6, 7]} />
          </MethodCard>

          <Divider />

          {/* Math.min() */}
          <MethodCard accent="#0891b2" name="Math.min(...values)"
            desc="Returns the smallest of the given values. Exact mirror of Math.max(). Same rule applies: use spread (...) to pass an array. A common pattern is combining max and min to clamp a value within a range.">
            <CodeBlock code={`Math.min(3, 1, 4, 9, 2);  // 1
Math.min(1, 2);           // 1

const scores = [72, 95, 61, 88];
Math.min(...scores);      // 61

// Clamp: keep value between 0 and 100
const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
clamp(150, 0, 100); // 100`} title="Math.min()" highlightLines={[7, 8, 9]} />
          </MethodCard>

          <Divider />

          {/* Math.random() */}
          <MethodCard accent="#0891b2" name="Math.random()"
            desc="Returns a pseudo-random float between 0 (inclusive) and 1 (exclusive — never exactly 1). Combined with Math.floor() and multiplication, it's the building block for all random number generation in JavaScript.">
            <CodeBlock code={`Math.random();                        // e.g. 0.7346...

// Random float 0 to 10:
Math.random() * 10;                   // e.g. 7.346...

// Random INTEGER 0 to 9:
Math.floor(Math.random() * 10);       // 0, 1, 2 ... 9

// Random INTEGER 1 to 6 (dice roll):
Math.floor(Math.random() * 6) + 1;   // 1, 2, 3, 4, 5, or 6

// Reusable helper:
const randInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;`} title="Math.random()" highlightLines={[6, 7, 9, 10]} />
          </MethodCard>

          <ConceptCard icon={<Info size={16} />} title="0.1 + 0.2 ≠ 0.3 — The floating point quirk" variant="info">
            This is not a JavaScript bug — it&apos;s how IEEE 754 binary floating point works in <em>every</em> programming language. Use <code style={{ fontFamily: "var(--font-mono)" }}>.toFixed(2)</code> when displaying decimals, or multiply by 100 and do integer math when precision matters (e.g. money in cents).
          </ConceptCard>
        </div>
      </FadeInSection>

      {/* Number Lab */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>
            🧪 Number Lab
          </h2>
          <NumberLab />
        </div>
      </FadeInSection>

      {/* ══════════════════════════════════════════════════════
          BOOLEAN OPERATIONS
          ══════════════════════════════════════════════════════ */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <SectionHeader
            icon={<ToggleLeft size={18} style={{ color: "#8b5cf6" }} />}
            emoji="✅" title="Boolean Operations" color="#8b5cf6"
            desc="Booleans are either true or false. But in JavaScript, every value behaves like a boolean in conditions — understanding which values are 'truthy' and which are 'falsy' is one of the most important things to learn."
          />

          {/* && */}
          <MethodCard accent="#8b5cf6" name="&& (AND operator)"
            desc="Returns the first falsy value it encounters, or the last value if all are truthy. This is called short-circuit evaluation — as soon as a falsy value is found, the rest is skipped and never evaluated. Use && to guard operations that require a truthy condition.">
            <CodeBlock code={`true && true;     // true
true && false;    // false
false && true;    // false

// Returns the actual value, not just true/false:
"hello" && 42;   // 42     — both truthy, returns last
null && 42;      // null   — stops at first falsy

// Practical: call a function only if object exists
user && user.save(); // save() only runs if user is truthy`} title="&&" highlightLines={[6, 7, 9, 10]} />
          </MethodCard>

          <Divider />

          {/* || */}
          <MethodCard accent="#8b5cf6" name="|| (OR operator)"
            desc="Returns the first truthy value it encounters, or the last value if all are falsy. Also short-circuits — stops as soon as a truthy value is found. The classic use case is providing a default value when the primary value might be falsy.">
            <CodeBlock code={`true || false;     // true
false || true;     // true
false || false;    // false

// Returns the actual value:
"hello" || "default";  // "hello"  — first is truthy, stops
null || "default";     // "default" — null is falsy, returns second
0 || "default";        // "default" — 0 is falsy ← can be a bug if 0 is valid!`} title="||" highlightLines={[8]} />
          </MethodCard>

          <Divider />

          {/* ! */}
          <MethodCard accent="#8b5cf6" name="! (NOT operator)"
            desc="Flips a boolean: turns true into false and false into true. When used on a non-boolean value, it first converts the value to boolean (using truthiness rules), then flips it. The double-bang !! uses two NOTs to convert to boolean without flipping.">
            <CodeBlock code={`!true;      // false
!false;     // true
!0;         // true   — 0 is falsy, so !0 = true
!"hello";   // false  — "hello" is truthy, so !"hello" = false
!null;      // true   — null is falsy
![];        // false  — [] is truthy, so ![] = false`} title="!" highlightLines={[3, 4, 6]} />
          </MethodCard>

          <Divider />

          {/* ?? */}
          <MethodCard accent="#8b5cf6" name="?? (nullish coalescing)"
            desc="Like || but ONLY triggers for null and undefined — not for 0, empty string, or false. This makes it safer when 0 or '' are valid values you want to preserve. A score of 0 is a real score; you don't want || to replace it with a default.">
            <CodeBlock code={`// || treats ALL falsy as "missing":
0 || "default";     // "default"  ← 0 is replaced — often a bug!
"" || "default";    // "default"  ← empty string replaced

// ?? only triggers for null and undefined:
0 ?? "default";     // 0          ← 0 is preserved ✓
"" ?? "default";    // ""         ← empty string preserved ✓
null ?? "default";  // "default"  ← null triggers fallback
undefined ?? "N/A"; // "N/A"      ← undefined triggers fallback`} title="??" highlightLines={[5, 6, 7, 8, 9]} />
          </MethodCard>

          <Divider />

          {/* !! */}
          <MethodCard accent="#8b5cf6" name="!! (double NOT)"
            desc="Two NOT operators applied one after the other. The first ! converts any value to its opposite boolean. The second ! flips it back. The net result is the boolean equivalent of the original value. Identical to Boolean() but shorter — you'll see !! constantly in real code.">
            <CodeBlock code={`!!true;        // true
!!false;       // false
!!0;           // false   — 0 is falsy
!!"";          // false   — empty string is falsy
!!null;        // false
!!NaN;         // false
!!undefined;   // false

!!1;           // true
!!"hello";     // true
!![];          // true    — empty array is truthy!
!!{};          // true    — empty object is truthy!`} title="!!" highlightLines={[11, 12]} />
          </MethodCard>

          <Divider />

          {/* Boolean() */}
          <MethodCard accent="#8b5cf6" name="Boolean(value)"
            desc="Explicitly converts any value to true or false using JavaScript's truthiness rules. Identical result to !! but reads more clearly. Use Boolean() when you need to be explicit or communicate intent clearly in code. Use !! when brevity matters.">
            <CodeBlock code={`// The 6 FALSY values → false:
Boolean(false);      // false
Boolean(0);          // false
Boolean("");         // false
Boolean(null);       // false
Boolean(undefined);  // false
Boolean(NaN);        // false

// Everything else → true:
Boolean(1);          // true
Boolean("0");        // true  ← non-empty string!
Boolean([]);         // true  ← empty array is truthy!
Boolean({});         // true  ← empty object is truthy!`} title="Boolean()" highlightLines={[10, 11, 12, 13]} />
          </MethodCard>

          <Divider />

          {/* Truthy/Falsy in conditions */}
          <MethodCard accent="#8b5cf6" name="Truthy & Falsy in if conditions"
            desc="When JavaScript evaluates an if condition, it implicitly converts the value to boolean. This is useful for short checks, but dangerous when 0 or empty string are valid values. Always be explicit about what 'missing' means — use !== null, !== undefined, or ?? instead of relying on truthiness.">
            <CodeBlock code={`// Implicit truthiness — looks fine, but has traps:
const name = "";
if (name) console.log(name);  // skipped — "" is falsy

// Bug: score of 0 is valid but treated as "no score":
const score = 0;
if (score) console.log(score); // skipped! 0 is falsy

// Fix: be explicit
if (score !== null && score !== undefined) {
  console.log(score); // 0 ✓ runs correctly
}
// Or using ?? shorthand:
const display = score ?? "No score yet"; // "0", not "No score yet"`} title="truthy-falsy-conditions.js" highlightLines={[9, 10, 11, 13, 14]} />
          </MethodCard>

          <ConceptCard icon={<AlertTriangle size={16} />} title="The 6 falsy values — memorize these" variant="warning">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
              {["false", "0", '""', "null", "undefined", "NaN"].map(v => (
                <code key={v} style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", background: "rgba(239,68,68,0.1)", color: "var(--error)", border: "1px solid rgba(239,68,68,0.3)", padding: "3px 10px", borderRadius: 6 }}>
                  {v}
                </code>
              ))}
            </div>
            <br />
            Everything else is truthy — including <code style={{ fontFamily: "var(--font-mono)" }}>[]</code>, <code style={{ fontFamily: "var(--font-mono)"}}>{"{}"}</code>, <code style={{ fontFamily: "var(--font-mono)" }}>&quot;0&quot;</code>, <code style={{ fontFamily: "var(--font-mono)" }}>-1</code>, and <code style={{ fontFamily: "var(--font-mono)" }}>Infinity</code>.
          </ConceptCard>
        </div>
      </FadeInSection>

      {/* Truthy/Falsy Tester */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>
            🔍 Truthy / Falsy Tester
          </h2>
          <TruthyFalsyTester />
        </div>
      </FadeInSection>

      {/* Quiz */}
      <FadeInSection delay={0.1}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text)" }}>🧠 Quick Check</h2>

          <QuizCard
            question='"hello".slice(1, 3) returns?'
            options={[
              { label: '"hello"', correct: false, explanation: "slice() returns a portion, not the full string. slice(1, 3) starts at index 1 and goes up to (not including) index 3." },
              { label: '"el"', correct: true, explanation: 'Correct! Characters at index 1 ("e") and index 2 ("l"). Index 3 is excluded — the end is always non-inclusive.' },
              { label: '"ell"', correct: false, explanation: "slice(1, 3) gives 2 characters: index 1 and 2. Index 3 is not included. You'd need slice(1, 4) for \"ell\"." },
              { label: '"hel"', correct: false, explanation: 'slice(1, 3) starts at index 1, so "h" (index 0) is skipped.' },
            ]}
            hint="slice(start, end) — start included, end excluded. Indexes start at 0."
          />

          <QuizCard
            question="Math.floor(-4.3) returns?"
            options={[
              { label: "-4", correct: false, explanation: "That's Math.trunc(-4.3). Math.floor() rounds toward negative infinity, not toward zero." },
              { label: "-5", correct: true, explanation: "Correct! Math.floor() always rounds DOWN — toward negative infinity. -4.3 is between -5 and -4, and 'down' on the number line is -5." },
              { label: "4", correct: false, explanation: "Math.abs() gives the absolute value. Math.floor() rounds downward and preserves the sign." },
              { label: "NaN", correct: false, explanation: "Math.floor(-4.3) is perfectly valid. NaN comes from invalid math like undefined * 1." },
            ]}
            hint="'Floor' means toward the floor of the number line — negative infinity, not zero."
          />

          <QuizCard
            question="Which of these is TRUTHY?"
            options={[
              { label: "0", correct: false, explanation: "0 is one of the 6 falsy values." },
              { label: '""', correct: false, explanation: "Empty string is falsy. Any string with at least one character is truthy." },
              { label: "[]", correct: true, explanation: "Correct! An empty array is TRUTHY — arrays are objects, and objects are always truthy even when empty." },
              { label: "null", correct: false, explanation: "null is one of the 6 falsy values." },
            ]}
            hint="Memorize the 6 falsy values: false, 0, '', null, undefined, NaN. Everything else — including [] and {} — is truthy."
          />
        </div>
      </FadeInSection>

      {/* Summary */}
      <FadeInSection delay={0.1}>
        <div style={{ background: "linear-gradient(135deg, rgba(5,150,105,0.08), rgba(139,92,246,0.08))", border: "1px solid rgba(5,150,105,0.2)", borderRadius: 14, padding: "24px 28px" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>📚 Key Takeaways</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "String methods never modify the original — always reassign: str = str.toUpperCase(). Chain freely.",
              ".at(-1) gets the last character cleanly. .slice(start, end) for extraction — end is excluded, negatives count from the back.",
              ".includes() for yes/no existence. .indexOf() when you need the position. -1 means not found.",
              "Number() is strict, parseInt()/parseFloat() are lenient. ?? is safer than || when 0 or '' are valid values.",
              "Math.floor() rounds toward -∞, Math.ceil() toward +∞, Math.trunc() toward 0. They differ for negatives.",
              "The 6 falsy values: false, 0, '', null, undefined, NaN. Empty arrays and objects are truthy.",
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
