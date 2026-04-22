"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Play } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const modules = [
  { num: 1, title: "Getting Started", href: "/modules/1-getting-started" },
  { num: 2, title: "Variables & Types", href: "/modules/2-variables-and-types" },
  { num: 3, title: "Operators", href: "/modules/3-operators-expressions" },
  { num: 4, title: "Control Flow", href: "/modules/4-control-flow" },
  { num: 5, title: "Functions & Scope", href: "/modules/5-functions-and-scope" },
  { num: 6, title: "Closures & Hoisting", href: "/modules/6-closures-and-hoisting" },
  { num: 7, title: "Objects & Prototypes", href: "/modules/7-objects-and-prototypes" },
  { num: 8, title: "Arrays & Methods", href: "/modules/8-arrays-and-methods" },
  { num: 9, title: "DOM & Events", href: "/modules/9-dom-and-events" },
  { num: 10, title: "Async & Event Loop", href: "/modules/10-async-event-loop" },
  { num: 11, title: "ES6+ Features", href: "/modules/11-es6-plus-features" },
  { num: 12, title: "Error Handling", href: "/modules/12-error-handling" },
  { num: 13, title: "JS Under the Hood", href: "/modules/13-js-under-the-hood" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 20px",
          height: 64,
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          background: "rgba(10, 12, 22, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Left — Hamburger + Playground */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Hamburger menu button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle module menu"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-muted)",
              transition: "all 0.2s",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mobileOpen ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Playground link */}
          <Link
            href="/playground"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "7px 14px",
              borderRadius: 8,
              textDecoration: "none",
              color: "var(--text-muted)",
              fontSize: "0.875rem",
              fontFamily: "var(--font-body)",
              border: "1px solid transparent",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "var(--secondary)";
              el.style.background = "rgba(6, 182, 212, 0.08)";
              el.style.borderColor = "rgba(6, 182, 212, 0.2)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "var(--text-muted)";
              el.style.background = "transparent";
              el.style.borderColor = "transparent";
            }}
          >
            <Play size={14} />
            <span className="hidden md:flex">Playground</span>
          </Link>
        </div>

        {/* Center — Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
          {/* JS logo image */}
          <img
            src="/js-logo.png"
            alt="JS Sensei logo"
            width={34}
            height={34}
            style={{ flexShrink: 0, display: "block" }}
          />
          <span style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 800, fontSize: "1.45rem", color: "#ffffff", whiteSpace: "nowrap", letterSpacing: "-0.3px" }}>
            JS Sensei
          </span>
        </Link>

        {/* Right — Theme toggle */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <ThemeToggle />
        </div>
      </motion.nav>

      {/* Slide-in Module Menu (from left) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                zIndex: 98,
                backdropFilter: "blur(2px)",
              }}
            />

            {/* Side panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                width: 300,
                background: "var(--bg-surface)",
                borderRight: "1px solid var(--border)",
                zIndex: 99,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Panel header */}
              <div style={{
                height: 64,
                padding: "0 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid var(--border)",
                flexShrink: 0,
              }}>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)", fontSize: "1rem" }}>
                  📚 Modules
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMobileOpen(false)}
                  style={{ background: "var(--bg-surface-2)", border: "1px solid var(--border)", borderRadius: 8, padding: 7, cursor: "pointer", color: "var(--text-muted)", display: "flex" }}
                >
                  <X size={16} />
                </motion.button>
              </div>

              {/* Module list */}
              <div style={{ padding: "12px 12px", display: "flex", flexDirection: "column", gap: 3, flex: 1 }}>
                {modules.map((mod, i) => {
                  const active = pathname === mod.href;
                  return (
                    <motion.div
                      key={mod.num}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <Link
                        href={mod.href}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "10px 12px",
                          borderRadius: 9,
                          textDecoration: "none",
                          color: active ? "var(--primary)" : "var(--text-muted)",
                          background: active ? "rgba(139, 92, 246, 0.1)" : "transparent",
                          border: `1px solid ${active ? "rgba(139, 92, 246, 0.25)" : "transparent"}`,
                          fontSize: "0.88rem",
                          fontFamily: "var(--font-body)",
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={e => {
                          if (!active) {
                            const el = e.currentTarget as HTMLElement;
                            el.style.background = "var(--bg-surface-2)";
                            el.style.color = "var(--text)";
                          }
                        }}
                        onMouseLeave={e => {
                          if (!active) {
                            const el = e.currentTarget as HTMLElement;
                            el.style.background = "transparent";
                            el.style.color = "var(--text-muted)";
                          }
                        }}
                      >
                        <span style={{
                          minWidth: 26,
                          height: 26,
                          background: active ? "rgba(139,92,246,0.15)" : "var(--bg-primary)",
                          borderRadius: 7,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: active ? "var(--primary)" : "var(--text-muted)",
                          fontFamily: "var(--font-mono)",
                          flexShrink: 0,
                        }}>
                          {mod.num}
                        </span>
                        {mod.title}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer */}
              <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border)", flexShrink: 0 }}>
                <Link
                  href="/playground"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 14px",
                    borderRadius: 9,
                    textDecoration: "none",
                    color: "var(--secondary)",
                    background: "rgba(6,182,212,0.06)",
                    border: "1px solid rgba(6,182,212,0.15)",
                    fontSize: "0.88rem",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <Play size={14} />
                  Open Playground
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
