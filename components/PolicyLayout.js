"use client";

import { motion } from "framer-motion";

export function PolicyHeader({ eyebrow, title, updated }) {
  return (
    <div style={{ background: "var(--black)", padding: "64px 6vw 56px" }}>
      <a
        href="/"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "13px",
          color: "var(--gray-300)",
          display: "inline-block",
          marginBottom: "20px",
          textDecoration: "none",
        }}
      >
        ← Back to DTC Entertainment
      </a>

      <span className="eyebrow" style={{ color: "var(--red)", display: "block", marginBottom: "8px" }}>
        {eyebrow}
      </span>

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(36px, 5vw, 56px)",
          color: "var(--white)",
          marginTop: "8px",
        }}
      >
        {title}
      </h1>

      <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--gray-300)", marginTop: "10px" }}>
        Last updated: {updated}
      </p>
    </div>
  );
}

export function PolicyCard({ title, index = 0, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{
        background: "var(--gray-100)",
        borderRadius: "18px",
        padding: "28px",
        marginBottom: "20px",
        borderLeft: "4px solid var(--red)",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "22px",
          color: "var(--black)",
          marginBottom: "14px",
        }}
      >
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

export function PolicyIntro({ children }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "15px",
        color: "var(--gray-600)",
        lineHeight: 1.7,
        marginBottom: "40px",
      }}
    >
      {children}
    </motion.p>
  );
}

export function PolicyList({ items }) {
  return (
    <ul style={{ display: "grid", gap: "10px", paddingLeft: "20px" }}>
      {items.map((point, i) => (
        <li
          key={i}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            color: "var(--gray-600)",
            lineHeight: 1.7,
          }}
        >
          {point}
        </li>
      ))}
    </ul>
  );
}

export function PolicyFooterNote({ children }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "13px",
        color: "var(--gray-600)",
        marginTop: "32px",
        textAlign: "center",
      }}
    >
      {children}
    </p>
  );
}