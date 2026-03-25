"use client"

// Contact — near darkness.
// One reason to reach out. One way to do it. Nothing else.

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ParticleField } from "@/components/particle-field"

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section
      id="contact"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-8 py-32 relative overflow-hidden"
      style={{ backgroundColor: "var(--itachi-base)" }}
    >
      <ParticleField count={14} />

      <motion.div
        className="relative"
        style={{ maxWidth: "52ch", zIndex: 1, textAlign: "center" }}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h2
          style={{
            color: "var(--itachi-text)",
            fontWeight: 300,
            letterSpacing: "0.2em",
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            marginBottom: "2rem",
            textShadow: "0 0 20px oklch(0.15 0.03 270)",
          }}
        >
          Contact
        </h2>

        <p
          style={{
            color: "var(--itachi-subtle)",
            fontSize: "0.9375rem",
            lineHeight: "1.85",
            fontWeight: 300,
            letterSpacing: "0.02em",
            marginBottom: "3rem",
          }}
        >
          Available for frontend architecture consulting, design system engagements,
          and fractional architect retainers. If your frontend is load-bearing and you
          need someone who can see the whole system — not just the symptoms — let's talk.
        </p>

        {/* Single CTA — sharingan crimson */}
        <a
          href="mailto:vanessa.s.martin96@gmail.com"
          style={{
            display: "inline-block",
            color: "var(--itachi-sharingan)",
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 300,
            textDecoration: "none",
            padding: "0.875rem 2.5rem",
            border: "1px solid var(--itachi-sharingan)",
            borderRadius: "var(--radius)",
            transition: "background-color 0.2s ease, color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.backgroundColor = "oklch(0.45 0.18 20 / 0.1)"
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.backgroundColor = "transparent"
          }}
        >
          Say Hello
        </a>

        {/* Footer — barely there */}
        <footer
          style={{
            marginTop: "6rem",
            color: "var(--itachi-ghost)",
            fontSize: "0.6875rem",
            letterSpacing: "0.12em",
            fontFamily: "var(--font-mono, monospace)",
          }}
        >
          <p>Designed &amp; Built by Vanessa Martin</p>
          <p style={{ marginTop: "0.5rem", opacity: 0.6 }}>© 2026</p>
        </footer>
      </motion.div>
    </section>
  )
}
