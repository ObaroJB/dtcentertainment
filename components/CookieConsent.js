"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CONSENT_KEY = "dtc_consent_accepted";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only runs in the browser, after mount — safe to touch localStorage here.
    const alreadyAccepted = localStorage.getItem(CONSENT_KEY);
    if (!alreadyAccepted) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "true");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10,10,10,0.85)",
            backdropFilter: "blur(4px)",
            zIndex: 300,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "var(--white)",
              borderRadius: "20px",
              width: "100%",
              maxWidth: "560px",
              padding: "32px",
              boxShadow: "0 30px 60px -20px rgba(0,0,0,0.5)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "11px",
                letterSpacing: "0.25em",
                color: "var(--red)",
                textTransform: "uppercase",
              }}
            >
              Before you continue
            </span>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "28px",
                color: "var(--black)",
                marginTop: "8px",
              }}
            >
              We use cookies
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                color: "var(--gray-600)",
                lineHeight: 1.6,
                marginTop: "12px",
              }}
            >
              We use cookies to run this site properly and remember your
              preferences. By continuing, you agree to our{" "}
              <a href="/terms" style={{ color: "var(--red)", textDecoration: "underline" }}>
                Terms &amp; Conditions
              </a>
              ,{" "}
              <a href="/privacy" style={{ color: "var(--red)", textDecoration: "underline" }}>
                Privacy Policy
              </a>
              , and{" "}
              <a href="/cookies" style={{ color: "var(--red)", textDecoration: "underline" }}>
                Cookie Policy
              </a>
              .
            </p>

            <motion.button
              onClick={accept}
              whileHover={{ scale: 1.02, boxShadow: "0 0 0 3px var(--red)" }}
              whileTap={{ scale: 0.98 }}
              style={{
                marginTop: "24px",
                width: "100%",
                background: "var(--red)",
                color: "var(--white)",
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                letterSpacing: "0.04em",
                padding: "16px 0",
                borderRadius: "999px",
              }}
            >
              ACCEPT & CONTINUE
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}