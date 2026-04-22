"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Object Builder ────────────────────────────────────────────────────────────

export function ObjectBuilder() {
  const [fields, setFields] = useState([
    { key: "name", value: "Alice", type: "string" },
    { key: "age", value: "28", type: "number" },
    { key: "isAdmin", value: "false", type: "boolean" },
  ]);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const inferType = (v: string) => {
    if (v === "true" || v === "false") return "boolean";
    if (!isNaN(Number(v)) && v.trim() !== "") return "number";
    if (v.startsWith("[")) return "array";
    if (v.startsWith("{")) return "object";
    return "string";
  };

  const addField = () => {
    if (!newKey.trim()) return;
    setFields(f => [...f, { key: newKey.trim(), value: newValue, type: inferType(newValue) }]);
    setNewKey(""); setNewValue("");
  };

  const removeField = (i: number) => setFields(f => f.filter((_, idx) => idx !== i));

  const typeColor = (t: string) => ({ string: "#059669", number: "#0891b2", boolean: "#7c3aed", array: "#d97706", object: "#db2777" }[t] ?? "var(--text-muted)");

  const typeIcon = (t: string) => ({ string: "📝", number: "🔢", boolean: "⚡", array: "📋", object: "📦" }[t] ?? "•");

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>🏗️ Object Builder</p>
      <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: 20, lineHeight: 1.6 }}>
        Add or remove properties to build a JavaScript object. Notice how the type of each value is automatically detected — and how the object literal representation updates on the right.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Editor */}
        <div>
          <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Properties</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
            <AnimatePresence>
              {fields.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                  style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <div style={{ flex: 1, background: "var(--bg-primary)", borderRadius: 8, padding: "8px 12px", display: "flex", gap: 8, alignItems: "center", border: "1px solid var(--border)" }}>
                    <span style={{ fontSize: "0.85rem" }}>{typeIcon(f.type)}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: "var(--secondary)", flex: 1 }}>{f.key}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: typeColor(f.type) }}>{f.type}</span>
                  </div>
                  <button onClick={() => removeField(i)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 6, padding: "6px 9px", cursor: "pointer", color: "var(--error)", fontSize: "0.75rem" }}>✕</button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div style={{ display: "flex", gap: 6 }}>
            <input value={newKey} onChange={e => setNewKey(e.target.value)} placeholder="key" onKeyDown={e => e.key === "Enter" && addField()}
              style={{ flex: 1, background: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 12px", color: "var(--text)", fontFamily: "var(--font-mono)", fontSize: "0.82rem", outline: "none" }} />
            <input value={newValue} onChange={e => setNewValue(e.target.value)} placeholder="value" onKeyDown={e => e.key === "Enter" && addField()}
              style={{ flex: 1, background: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 12px", color: "var(--text)", fontFamily: "var(--font-mono)", fontSize: "0.82rem", outline: "none" }} />
            <button onClick={addField} style={{ background: "rgba(139,92,246,0.15)", border: "1px solid var(--primary)", borderRadius: 8, padding: "8px 14px", cursor: "pointer", color: "var(--primary)", fontWeight: 700, fontSize: "0.85rem" }}>+</button>
          </div>
        </div>

        {/* Output */}
        <div>
          <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Object literal</p>
          <div style={{ background: "var(--bg-primary)", borderRadius: 10, padding: "14px 16px", fontFamily: "var(--font-mono)", fontSize: "0.82rem", lineHeight: 1.9, minHeight: 150 }}>
            <span style={{ color: "var(--secondary)" }}>const</span> <span style={{ color: "var(--text)" }}> user = {"{"}</span>
            {fields.map((f, i) => (
              <div key={i} style={{ paddingLeft: 20 }}>
                <span style={{ color: "var(--accent)" }}>{f.key}</span>
                <span style={{ color: "var(--text-muted)" }}>: </span>
                <span style={{ color: typeColor(f.type) }}>
                  {f.type === "string" ? `"${f.value}"` : f.value}
                </span>
                {i < fields.length - 1 && <span style={{ color: "var(--text-muted)" }}>,</span>}
              </div>
            ))}
            <span style={{ color: "var(--text)" }}>{"}"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Prototype Chain ────────────────────────────────────────────────────────────

export function PrototypeChainVisualizer() {
  const [selected, setSelected] = useState<string | null>(null);

  const chain = [
    {
      id: "dog",
      label: "rover (the dog object)",
      color: "#d97706",
      ownProps: ["name: 'Rover'", "breed: 'Labrador'"],
      icon: "🐕",
      desc: "This is the actual object. It only owns the properties we explicitly set: name and breed.",
    },
    {
      id: "Dog",
      label: "Dog.prototype",
      color: "#0891b2",
      ownProps: ["bark() { ... }", "fetch() { ... }"],
      icon: "⚙️",
      desc: "This is the shared blueprint all Dog objects inherit from. rover doesn't copy these methods — it just looks them up here. Saves memory!",
    },
    {
      id: "Object",
      label: "Object.prototype",
      color: "#7c3aed",
      ownProps: ["toString()", "hasOwnProperty()", "valueOf()"],
      icon: "🌐",
      desc: "The root of the prototype chain. EVERY JavaScript object ultimately inherits from here. That's why you can call .toString() on literally anything.",
    },
    {
      id: "null",
      label: "null",
      color: "var(--text-muted)",
      ownProps: ["(end of chain)"],
      icon: "∅",
      desc: "The end of the chain. If JS reaches here without finding the property you asked for, you get undefined (or a ReferenceError if it was a variable).",
    },
  ];

  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>🔗 Prototype Chain</p>
      <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: 20, lineHeight: 1.6 }}>
        When you access <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)" }}>rover.bark()</code>, JavaScript searches the chain from top to bottom until it finds it.
        Click each link in the chain to learn what lives there.
      </p>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 0, marginBottom: 20 }}>
        {chain.map((node, i) => (
          <div key={node.id} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <motion.div
              onClick={() => setSelected(selected === node.id ? null : node.id)}
              animate={{ background: selected === node.id ? node.color + "15" : "var(--bg-primary)", borderColor: selected === node.id ? node.color : "var(--border)" }}
              style={{ border: "2px solid", borderRadius: 12, padding: "12px 18px", cursor: "pointer", minWidth: 280, transition: "all 0.3s" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: "1.2rem" }}>{node.icon}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: selected === node.id ? node.color : "var(--text)", fontSize: "0.85rem" }}>{node.label}</span>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {node.ownProps.map(p => (
                  <span key={p} style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: node.color, background: node.color + "12", borderRadius: 4, padding: "2px 8px" }}>{p}</span>
                ))}
              </div>
            </motion.div>

            {i < chain.length - 1 && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "4px 24px" }}>
                <div style={{ width: 2, height: 8, background: "var(--border)" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-muted)" }}>[[Prototype]]</span>
                <div style={{ width: 2, height: 8, background: "var(--border)" }} />
              </div>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div key={selected} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ background: (chain.find(n => n.id === selected)?.color ?? "var(--primary)") + "10", border: `1px solid ${(chain.find(n => n.id === selected)?.color ?? "var(--primary)") + "40"}`, borderRadius: 10, padding: "12px 16px" }}>
            <p style={{ color: "var(--text)", fontSize: "0.85rem", lineHeight: 1.7 }}>
              {chain.find(n => n.id === selected)?.desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
