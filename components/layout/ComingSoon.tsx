"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowRight, Sparkles } from "lucide-react";
import { FadeInSection } from "@/components/animations/FadeInSection";

interface ComingSoonProps {
  moduleNum: number;
  topics: string[];
}

export function ComingSoon({ moduleNum, topics }: ComingSoonProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      {/* Coming Soon Banner */}
      <FadeInSection>
        <div style={{
          background: "linear-gradient(135deg, rgba(139,92,246,0.1), rgba(6,182,212,0.1))",
          border: "1px solid rgba(139,92,246,0.25)",
          borderRadius: 16,
          padding: "40px",
          textAlign: "center",
        }}>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontSize: "4rem", marginBottom: 16 }}
          >
            🚧
          </motion.div>
          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.8rem",
            fontWeight: 700,
            marginBottom: 12,
            background: "linear-gradient(135deg, var(--primary), var(--secondary))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Interactive Module Coming Soon
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", maxWidth: 500, margin: "0 auto 24px", lineHeight: 1.7 }}>
            This module is being built with full interactive animations and visualizers.
            The foundation, Modules 1, 2, and 10 are already available!
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/modules/10-async-event-loop">
              <motion.div whileHover={{ scale: 1.03 }} style={{ background: "linear-gradient(135deg, var(--primary), hsl(265,90%,50%))", color: "white", padding: "10px 20px", borderRadius: 9, fontWeight: 600, fontSize: "0.875rem", fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                <Sparkles size={14} /> Try Module 10: Event Loop
              </motion.div>
            </Link>
            <Link href="/">
              <motion.div whileHover={{ scale: 1.03 }} style={{ background: "var(--bg-surface-2)", color: "var(--text)", padding: "10px 20px", borderRadius: 9, fontWeight: 600, fontSize: "0.875rem", fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", border: "1px solid var(--border)" }}>
                <ArrowRight size={14} /> Browse All Modules
              </motion.div>
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* What's Planned */}
      <FadeInSection delay={0.15}>
        <div>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 600, color: "var(--text)", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
            <Clock size={18} style={{ color: "var(--accent)" }} /> What&apos;s planned for Module {moduleNum}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {topics.map((topic, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 300, damping: 24 }}
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  padding: "14px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <span style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, color: "var(--primary)", fontFamily: "var(--font-mono)", flexShrink: 0 }}>
                  {i + 1}
                </span>
                <span style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.5 }}>{topic}</span>
                <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--primary)", background: "rgba(139,92,246,0.1)", padding: "2px 8px", borderRadius: 50, whiteSpace: "nowrap", flexShrink: 0 }}>
                  Animated ✦
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* Preview Code */}
      <FadeInSection delay={0.2}>
        <div style={{ background: "var(--bg-surface)", border: "1px dashed var(--border)", borderRadius: 14, padding: "28px", textAlign: "center" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: 16 }}>
            📚 While you wait, explore the modules that ARE built:
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { num: 1, title: "How JS Works", href: "/modules/1-how-js-works" },
              { num: 2, title: "Variables & Types", href: "/modules/2-variables-and-types" },
              { num: 10, title: "Async & Event Loop", href: "/modules/10-async-event-loop" },
            ].map(m => (
              <Link key={m.num} href={m.href} style={{ textDecoration: "none" }}>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} style={{ background: "var(--bg-surface-2)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 16px", color: "var(--primary)", fontSize: "0.85rem", fontWeight: 600, fontFamily: "var(--font-body)", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", opacity: 0.7 }}>#{m.num}</span>
                  {m.title}
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}
