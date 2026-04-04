"use client"

import { motion, cubicBezier } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { PHI_INVERSE, FIBONACCI_MS, EASING, GOLDEN_ANGLE } from "@/lib/animation-constants"
import { ExternalLink, Github, Mail } from "lucide-react"

const principles = [
  {
    index: "01",
    title: "Inputs over inference",
    body: "Behavior should not be guessed from past patterns. If the system needs information, ask for it. Explicit state is safer, more respectful, and more accurate than prediction.",
  },
  {
    index: "02",
    title: "Capacity, not preference",
    body: "A user who chose dense layouts last Tuesday may not have the bandwidth for them today. Adapt to what the user can handle now, not what they usually prefer.",
  },
  {
    index: "03",
    title: "Proportion as first principle",
    body: "Every dimension in the system should be derived, not chosen. When the math is right, the aesthetics follow. Arbitrary numbers are technical debt.",
  },
  {
    index: "04",
    title: "Form without behavior",
    body: "A component that only renders is not an interface. Interfaces respond. Every visual element should have a defined behavioral contract.",
  },
]

const footerLinks = [
  { href: "mailto:vanessa.s.martin96@gmail.com", label: "vanessa.s.martin96@gmail.com", Icon: Mail, external: false },
  { href: "https://rengenoikigai.substack.com", label: "Substack", Icon: ExternalLink, external: true },
  { href: "https://github.com/vsm1996", label: "vsm1996", Icon: Github, external: true },
]

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: FIBONACCI_MS.f5 / 1000,
        delay,
        ease: cubicBezier(EASING.golden[0], EASING.golden[1], EASING.golden[2], EASING.golden[3]),
      },
    },
  })

  return (
    <section id="principles" className="min-h-screen flex items-center justify-center px-6 py-20 relative" ref={ref}>
      {/* Floating decorative shapes */}
      <motion.div
        className="absolute top-20 left-1/4 w-20 h-20 border border-accent/15 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, 360],
          x: [0, 35, 0],
          y: [0, -25, 0],
        }}
        transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-14 h-14 bg-primary/8 rounded-2xl"
        animate={{
          rotate: [0, GOLDEN_ANGLE, GOLDEN_ANGLE * 2, 360],
          scale: [1, 1.2, 0.85, 1],
          x: [0, -25, 0],
          y: [0, 18, 0],
        }}
        transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-20 w-16 h-16 border border-secondary/20"
        style={{ borderRadius: "50% 50% 30% 70% / 30% 70% 50% 50%" }}
        animate={{
          rotate: [360, 0],
          scale: [1, 1.3, 1],
          y: [0, -35, 0],
        }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <div className="max-w-3xl w-full">
        <div className="space-y-16">
          {/* Header */}
          <motion.div
            className="space-y-4"
            variants={fadeUp(0)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <p className="text-accent font-mono text-sm font-medium tracking-widest uppercase">Philosophy</p>
            <h2 className="text-5xl md:text-7xl font-light tracking-tight text-foreground leading-none">
              Principles
            </h2>
          </motion.div>

          {/* Principle cards */}
          <motion.div
            className="space-y-4"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {principles.map((p) => (
              <motion.div
                key={p.index}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: PHI_INVERSE },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: FIBONACCI_MS.f5 / 1000,
                      ease: cubicBezier(EASING.golden[0], EASING.golden[1], EASING.golden[2], EASING.golden[3]),
                    },
                  },
                }}
                whileHover={{
                  scale: 1.02,
                  rotateX: 1,
                  y: -3,
                  transition: {
                    duration: FIBONACCI_MS.f3 / 1000,
                    ease: cubicBezier(EASING.spring[0], EASING.spring[1], EASING.spring[2], EASING.spring[3]),
                  },
                }}
                whileTap={{ scale: 0.99 }}
                style={{ transformStyle: "preserve-3d" }}
                className="group grid grid-cols-[2rem_1fr] gap-6 p-5 rounded-2xl border border-border/30 bg-card/20 hover:border-accent/30 hover:bg-card/50 hover:shadow-xl hover:shadow-accent/5 transition-colors duration-300 cursor-default"
              >
                <div className="font-mono text-accent/50 text-xs pt-1 group-hover:text-accent/80 transition-colors duration-200">
                  {p.index}
                </div>
                <div className="space-y-2">
                  <p className="text-foreground font-semibold">{p.title}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer */}
          <motion.footer
            className="pt-8 border-t border-border/20 space-y-6"
            variants={fadeUp(0.5)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="flex flex-wrap gap-6 items-center">
              {footerLinks.map(({ href, label, Icon, external }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  whileHover={{
                    y: -2,
                    scale: 1.04,
                    transition: {
                      duration: FIBONACCI_MS.f3 / 1000,
                      ease: cubicBezier(EASING.spring[0], EASING.spring[1], EASING.spring[2], EASING.spring[3]),
                    },
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors duration-200 text-sm"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </motion.a>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <motion.p
                className="text-xs text-muted-foreground/50 font-mono"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{
                  duration: FIBONACCI_MS.f7 / 1000,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: cubicBezier(EASING.gentle[0], EASING.gentle[1], EASING.gentle[2], EASING.gentle[3]),
                }}
              >
                Soka Labs &mdash; founder
              </motion.p>
              <p className="text-xs text-muted-foreground/40 font-mono">&copy; 2026 Vanessa Martin</p>
            </div>
          </motion.footer>
        </div>
      </div>
    </section>
  )
}
