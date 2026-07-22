"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Slide 1 & 3 are video, slide 2 is a still image — swap src paths for your own assets.
const slides = [
  { type: "image", src: "/images/flyer.jpeg"},
  { type: "image", src: "/images/flyer2.jpeg" },
  { type: "video", src: "/videos/reel-2.mp4"},
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
  }, []);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section
      id="top"
      style={{
        display: "flex",
        flexWrap: "wrap",
        marginTop: "var(--nav-height)",
        minHeight: "calc(100vh - var(--nav-height))",
        background: "var(--black)",
      }}
    >
      {/* LEFT: copy, ~half the screen */}
      <div
        style={{
          flex: "1 1 480px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "10vh 5vw",
          color: "var(--white)",
        }}
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="eyebrow"
          style={{ color: "var(--red)" }}
        >
          DTC Entertainment presents
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(56px, 9vw, 128px)",
            lineHeight: 0.92,
            letterSpacing: "0.01em",
            margin: "18px 0 0",
            textTransform: "uppercase",
          }}
        >
          Capital
          <br />
          <span style={{ color: "var(--red)" }}>Clash</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            marginTop: "26px",
            maxWidth: "440px",
            color: "var(--gray-300)",
            fontSize: "17px",
            lineHeight: 1.6,
          }}
        >
          One night. One city. ABJ. Your favourite Influencers, Artists, Content Creators, DJ'S face off in Brutal Football Match
           Every corner of it about to feel it.
          The lineup, the lights, the noise  this is Capital Clash.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{ marginTop: "40px" }}
        >
          <motion.a
            href="#tickets"
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 0 3px var(--red), 0 18px 40px -12px rgba(226,0,26,0.6)",
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-block",
              background: "var(--red)",
              color: "var(--white)",
              fontFamily: "var(--font-display)",
              fontSize: "20px",
              letterSpacing: "0.06em",
              padding: "16px 40px",
              borderRadius: "999px",
            }}
          >
            GET TICKETS
          </motion.a>
        </motion.div>
      </div>

      {/* RIGHT: slider, ~half the screen */}
      <div
        style={{
          flex: "1 1 480px",
          position: "relative",
          minHeight: "50vh",
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "absolute", inset: 0 }}
          >
            {slides[index].type === "video" ? (
              <video
                src={slides[index].src}
                poster={slides[index].poster}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <img
                src={slides[index].src}
                alt="DTC Entertainment event highlight"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to left, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)",
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* slide indicators */}
        <div
          style={{
            position: "absolute",
            bottom: "28px",
            right: "28px",
            display: "flex",
            gap: "10px",
            zIndex: 5,
          }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              style={{
                width: i === index ? "28px" : "10px",
                height: "10px",
                borderRadius: "999px",
                background: i === index ? "var(--red)" : "rgba(255,255,255,0.5)",
                transition: "all 0.35s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
