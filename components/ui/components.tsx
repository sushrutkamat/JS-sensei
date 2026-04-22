"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

// ── Button ──────────────────────────────────────────────────────────────────

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
}

const buttonStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: "linear-gradient(135deg, var(--primary), hsl(265, 90%, 50%))",
    color: "white",
    border: "none",
    boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)",
  },
  secondary: {
    background: "linear-gradient(135deg, var(--secondary), hsl(190, 90%, 40%))",
    color: "white",
    border: "none",
    boxShadow: "0 4px 15px rgba(6, 182, 212, 0.3)",
  },
  outline: {
    background: "transparent",
    color: "var(--primary)",
    border: "1px solid var(--primary)",
  },
  ghost: {
    background: "transparent",
    color: "var(--text-muted)",
    border: "1px solid var(--border)",
  },
  danger: {
    background: "linear-gradient(135deg, var(--error), hsl(0, 80%, 50%))",
    color: "white",
    border: "none",
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: "6px 14px", fontSize: "0.8rem", borderRadius: 7 },
  md: { padding: "10px 20px", fontSize: "0.875rem", borderRadius: 9 },
  lg: { padding: "14px 28px", fontSize: "1rem", borderRadius: 11 },
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, translateY: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      style={{
        ...buttonStyles[variant],
        ...sizeStyles[size],
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontWeight: 600,
        fontFamily: "var(--font-body)",
        cursor: props.disabled || loading ? "not-allowed" : "pointer",
        opacity: props.disabled || loading ? 0.6 : 1,
        transition: "box-shadow 0.2s",
      }}
      {...(props as any)}
      onClick={!props.disabled && !loading ? props.onClick : undefined}
    >
      {loading ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{ width: 14, height: 14, border: "2px solid currentColor", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block" }}
        />
      ) : (
        iconPosition === "left" && icon
      )}
      {children}
      {!loading && iconPosition === "right" && icon}
    </motion.button>
  );
}

// ── Badge ────────────────────────────────────────────────────────────────────

type BadgeVariant = "primary" | "secondary" | "accent" | "success" | "error" | "ghost";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md";
}

const badgeColors: Record<BadgeVariant, React.CSSProperties> = {
  primary: { background: "rgba(139, 92, 246, 0.15)", color: "var(--primary)", border: "1px solid rgba(139, 92, 246, 0.3)" },
  secondary: { background: "rgba(6, 182, 212, 0.15)", color: "var(--secondary)", border: "1px solid rgba(6, 182, 212, 0.3)" },
  accent: { background: "rgba(251, 191, 36, 0.15)", color: "var(--accent)", border: "1px solid rgba(251, 191, 36, 0.3)" },
  success: { background: "rgba(52, 211, 153, 0.15)", color: "var(--success)", border: "1px solid rgba(52, 211, 153, 0.3)" },
  error: { background: "rgba(239, 68, 68, 0.15)", color: "var(--error)", border: "1px solid rgba(239, 68, 68, 0.3)" },
  ghost: { background: "var(--bg-surface-2)", color: "var(--text-muted)", border: "1px solid var(--border)" },
};

export function Badge({ children, variant = "ghost", size = "md" }: BadgeProps) {
  return (
    <span style={{
      ...badgeColors[variant],
      padding: size === "sm" ? "2px 8px" : "4px 12px",
      borderRadius: 50,
      fontSize: size === "sm" ? "0.7rem" : "0.78rem",
      fontWeight: 600,
      fontFamily: "var(--font-mono)",
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
    }}>
      {children}
    </span>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────────

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  hover?: boolean;
  onClick?: () => void;
  glow?: "primary" | "secondary" | "accent" | "none";
}

export function Card({ children, className, style, hover = false, onClick, glow = "none" }: CardProps) {
  const glowStyle = glow === "primary"
    ? "0 0 20px rgba(139, 92, 246, 0.15)"
    : glow === "secondary"
    ? "0 0 20px rgba(6, 182, 212, 0.15)"
    : glow === "accent"
    ? "0 0 20px rgba(251, 191, 36, 0.15)"
    : "none";

  return (
    <motion.div
      className={className}
      whileHover={hover ? { translateY: -4, boxShadow: "0 12px 40px rgba(139, 92, 246, 0.2)" } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      onClick={onClick}
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        boxShadow: glowStyle,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

// ── ProgressBar ───────────────────────────────────────────────────────────────

interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  color?: string;
  height?: number;
  showPercent?: boolean;
}

export function ProgressBar({ value, label, color = "var(--primary)", height = 6, showPercent = false }: ProgressBarProps) {
  return (
    <div>
      {(label || showPercent) && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          {label && <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{label}</span>}
          {showPercent && <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{Math.round(value)}%</span>}
        </div>
      )}
      <div style={{ background: "var(--bg-surface-2)", borderRadius: 50, height, overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          style={{ height: "100%", background: `linear-gradient(90deg, ${color}, var(--secondary))`, borderRadius: 50 }}
        />
      </div>
    </div>
  );
}

// ── Tooltip ────────────────────────────────────────────────────────────────────

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: "top" | "bottom";
}

export function Tooltip({ children, content, position = "top" }: TooltipProps) {
  const [visible, setVisible] = React.useState(false);

  return (
    <div style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <AnimatePresenceWrapper visible={visible}>
        <motion.div
          initial={{ opacity: 0, y: position === "top" ? 4 : -4, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          style={{
            position: "absolute",
            [position === "top" ? "bottom" : "top"]: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--bg-primary)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            padding: "6px 12px",
            fontSize: "0.78rem",
            color: "var(--text)",
            whiteSpace: "nowrap",
            zIndex: 50,
            pointerEvents: "none",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          }}
        >
          {content}
        </motion.div>
      </AnimatePresenceWrapper>
    </div>
  );
}

import { AnimatePresence } from "framer-motion";

function AnimatePresenceWrapper({ children, visible }: { children: React.ReactNode; visible: boolean }) {
  return <AnimatePresence>{visible && children}</AnimatePresence>;
}
