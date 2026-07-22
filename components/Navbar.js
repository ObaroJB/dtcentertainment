"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaTwitter, FaTiktok, FaYoutube } from "react-icons/fa";

// npm install react-icons

const socials = [
  { Icon: FaInstagram, href: "#", label: "Instagram" },
  { Icon: FaTwitter, href: "https://x.com/OfficialDTC_?s=20", label: "Twitter / X" },
  { Icon: FaTiktok, href: "#", label: "TikTok" },
  { Icon: FaYoutube, href: "#", label: "YouTube" },
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -88, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "var(--nav-height)",
        background: "var(--white)",
        borderBottom: "3px solid var(--black)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 5vw",
        /* deliberately square — no border-radius. this is the rigid brand mark */
      }}
    >
      {/* Brand mark, left */}
      <a href="#top" style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(30px, 4vw, 42px)",
            letterSpacing: "0.04em",
            color: "var(--black)",
          }}
        >
          DTC
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "9px",
            letterSpacing: "0.45em",
            color: "var(--red)",
            marginTop: "2px",
          }}
        >
          E N T E R T A I N M E N T
        </span>
      </a>

      {/* Socials, right */}
      <nav aria-label="Social media" style={{ display: "flex", gap: "22px" }}>
        {socials.map(({ Icon, href, label }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={{ y: -3, color: "#e2001a" }}
            style={{ color: "var(--black)", fontSize: "18px", display: "flex" }}
          >
            <Icon />
          </motion.a>
        ))}
      </nav>
    </motion.header>
  );
}
