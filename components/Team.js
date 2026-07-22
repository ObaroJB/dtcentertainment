"use client";

import { motion } from "framer-motion";

const TEAM = [
 {
  name: "Chizi Onohua",
  role: "Founder & Lead Organizer",
  bio: "Sets the vision and direction for every DTC event,from the concept to an unforgettable event.",
  photo: "/images/chiziimage.jpeg",
},

{
  name: "Emma Akanbi",
  role: "Co-Founder & Brand Ambassador",
  bio: "Ensures every DTC event runs smoothly, on time, and within budget.",
  photo: "/images/emmapicture.jpeg",
},

{
  name: "Obaro Omadhebor",
  role: " Technical Director & Organizer",
  bio: "Handles all technical development, website management, digital operations, and event organization.",
  photo: "/images/obaroimage2.jpeg",
},

{
  name: "Egwono Uwejeyan",
  role: "Creative Director & Organizer",
  bio: "Curates the lineup and creative direction that defines the DTC experience.",
  photo: "/images/team-3.jpg",
},
  
];

export default function Team() {
  return (
    <section className="section" style={{ background: "var(--gray-100)" }}>
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="eyebrow"
      >
        Who Runs It
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(36px, 5vw, 64px)",
          margin: "10px 0 56px",
        }}
      >
        The Team
      </motion.h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "36px",
        }}
      >
        {TEAM.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            animate={{ y: [0, -8, 0] }}
            /* the floating idle animation runs continuously alongside the reveal */
            style={{ textAlign: "center" }}
          >
            <motion.div
              whileHover={{ scale: 1.06, boxShadow: "0 0 0 6px var(--red)" }}
              transition={{ duration: 0.3 }}
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                overflow: "hidden",
                margin: "0 auto 20px",
                boxShadow: "0 0 0 4px var(--white), 0 16px 30px -14px rgba(0,0,0,0.3)",
              }}
            >
              <img
                src={member.photo}
               
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </motion.div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "24px",
                letterSpacing: "0.02em",
              }}
            >
              {member.name}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "13px",
                letterSpacing: "0.03em",
                color: "var(--red)",
                marginTop: "4px",
              }}
            >
              {member.role}
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "13px",
                color: "var(--gray-600)",
                marginTop: "10px",
                lineHeight: 1.5,
                maxWidth: "240px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {member.bio}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
