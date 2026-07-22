"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaTwitter, FaTiktok, FaYoutube } from "react-icons/fa";

const socials = [
  { Icon: FaInstagram, href: "https://instagram.com/dtcentertainment", label: "Instagram" },
  { Icon: FaTwitter, href: "https://twitter.com/dtcentertainment", label: "Twitter / X" },
  { Icon: FaTiktok, href: "https://tiktok.com/@dtcentertainment", label: "TikTok" },
  { Icon: FaYoutube, href: "https://youtube.com/@dtcentertainment", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--black)",
        color: "var(--white)",
        padding: "64px 6vw 32px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "40px",
          paddingBottom: "40px",
          borderBottom: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "40px",
              display: "block",
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
            }}
          >
            E N T E R T A I N M E N T
          </span>
          <p style={{ marginTop: "18px", color: "var(--gray-300)", maxWidth: "320px", fontSize: "14px", lineHeight: 1.6 }}>
            Nights built for the whole city. Follow along for the next one.
          </p>
        </div>

        <div style={{ display: "flex", gap: "60px", flexWrap: "wrap" }}>
          <div>
            <h4 style={{ fontSize: "12px", letterSpacing: "0.1em", color: "var(--gray-300)", marginBottom: "14px" }}>
              EXPLORE
            </h4>
            <ul style={{ display: "grid", gap: "10px", fontSize: "14px", listStyle: "none" }}>
              <li><a href="#top">Home</a></li>
              <li><a href="#tickets">Tickets</a></li>
              <li><a href="#team">Team</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: "12px", letterSpacing: "0.1em", color: "var(--gray-300)", marginBottom: "14px" }}>
              CONTACT
            </h4>
            <ul style={{ display: "grid", gap: "10px", fontSize: "14px", listStyle: "none" }}>
              <li><a href="mailto:chizirimuzonduonuoha@gmail.com">chizirimuzonduonuoha@gmail.com</a></li>
              <li><a href="tel:+2347077176328">+234 707 717 6328</a></li>
            </ul>
          </div>
        </div>

        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
          {socials.map(({ Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ y: -3, color: "#e2001a" }}
              style={{ fontSize: "18px" }}
            >
              <Icon />
            </motion.a>
          ))}
        </div>
      </div>

      <p style={{ marginTop: "24px", fontSize: "12px", color: "var(--gray-600)", textAlign: "center" }}>
        © {new Date().getFullYear()} DTC Entertainment. All rights reserved.
      </p>

      {/* Legal Links - Added here */}
      <div style={{ marginTop: "16px", textAlign: "center", fontSize: "13px", color: "var(--gray-500)" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
          <a href="/terms" className="hover:text-white transition-colors">Terms & Conditions</a>
          <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="/cookies" className="hover:text-white transition-colors">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}