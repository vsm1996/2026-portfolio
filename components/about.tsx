"use client"

import { ExternalLink, Github } from "lucide-react"
import { motion, cubicBezier } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { PHI_INVERSE, FIBONACCI_MS, EASING, GOLDEN_ANGLE } from "@/lib/animation-constants"

const layers = [
  {
    index: "01",
    name: "Inputs",
    type: "explicit",
    spec: "cognitive: 0\u2013100  /  temporal: 0\u2013100  /  emotional: 0\u2013100",
    note: "No inference. No profiling. The user declares their state directly.",
  },
  {
    index: "02",
    name: "FieldManager",
    type: "computation",
    spec: "energy = \u221b(cognitive \xd7 temporal \xd7 emotional)",
    note: "EMA smoothing prevents style thrashing on rapid input changes.",
  },
  {
    index: "03",
    name: "AmbientContext",
    type: "context",
    spec: "deriveMode() \u2192 density | motion | focus | tone tokens",
    note: "React context layer. Components read tokens. No prop drilling.",
  },
  {
    index: "04",
    name: "Components",
    type: "output",
    spec: "layout density  /  content length  /  motion level  /  color tone",
    note: "prefers-reduced-motion hard override at this layer. Always respected.",
  },
]

const stats = [
  { label: "npm", value: "@harmonia-ui/core", mono: true, href: null },
  { label: "production", value: "Grove", mono: false, href: "https://grove-intel.vercel.app/" },
  { label: "monorepo", value: "4 packages", mono: false, href: null },
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 32 },
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
    <section id="harmonia" className="min-h-screen flex items-center justify-center px-6 py-32 relative" ref={ref}>
      {/* Floating decorative shapes */}
      <motion.div
        className="absolute top-20 right-20 w-20 h-20 border border-accent/15 rounded-full"
        animate={{
          scale: [1, 1.4, 1],
          rotate: [0, 180, 360],
          x: [0, 25, 0],
          y: [0, -18, 0],
        }}
        transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 left-16 w-14 h-14 border-2 border-primary/20 rounded-2xl"
        animate={{
          rotate: [0, GOLDEN_ANGLE, GOLDEN_ANGLE * 2, 360],
          scale: [1, 1.2, 0.9, 1],
          y: [0, -20, 0],
        }}
        transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-8 w-10 h-10 border border-secondary/20"
        style={{ borderRadius: "40% 60% 60% 40% / 60% 40% 60% 40%" }}
        animate={{
          rotate: [360, 0],
          scale: [1, 1.3, 0.8, 1],
          y: [0, 30, -30, 0],
        }}
        transition={{ duration: 11, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <div className="max-w-5xl w-full">
        <div className="space-y-16">
          {/* Header */}
          <motion.div
            className="space-y-4"
            variants={fadeUp(0)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <p className="text-accent font-mono text-sm font-medium tracking-widest uppercase">Framework</p>
            <h2 className="text-5xl md:text-7xl font-light tracking-tight text-foreground leading-none">
              Harmonia UI
            </h2>
            <p className="text-2xl md:text-3xl text-muted-foreground font-light">
              Capacity as first-class input.
            </p>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Most adaptive interfaces infer state from behavior. Harmonia inverts this. The user declares cognitive load, available time, and emotional state explicitly. The framework derives everything else.
            </p>
          </motion.div>

          {/* Architecture layers */}
          <motion.div
            className="space-y-3"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <p className="text-muted-foreground/60 font-mono text-xs uppercase tracking-widest mb-6">
              4-layer architecture
            </p>
            {layers.map((layer) => (
              <motion.div
                key={layer.index}
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
                  rotateY: -1,
                  y: -2,
                  transition: {
                    duration: FIBONACCI_MS.f3 / 1000,
                    ease: cubicBezier(EASING.spring[0], EASING.spring[1], EASING.spring[2], EASING.spring[3]),
                  },
                }}
                style={{ transformStyle: "preserve-3d" }}
                className="group grid grid-cols-[2rem_1fr] gap-6 p-5 rounded-2xl border border-border/30 bg-card/20 hover:border-accent/30 hover:bg-card/50 hover:shadow-xl hover:shadow-accent/5 transition-colors duration-300"
              >
                <div className="font-mono text-accent/50 text-xs pt-1 group-hover:text-accent/80 transition-colors duration-200">
                  {layer.index}
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-foreground font-semibold">{layer.name}</span>
                    <motion.span
                      className="font-mono text-xs text-muted-foreground/50 border border-border/40 px-2 py-0.5 rounded-full"
                      whileHover={{ scale: 1.08 }}
                    >
                      {layer.type}
                    </motion.span>
                  </div>
                  <code className="block font-mono text-sm text-accent/80 bg-accent/5 px-3 py-2 rounded-lg group-hover:bg-accent/10 transition-colors duration-200">
                    {layer.spec}
                  </code>
                  <p className="text-muted-foreground text-sm">{layer.note}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid sm:grid-cols-3 gap-4"
            variants={fadeUp(0.4)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{
                  scale: 1.04,
                  y: -3,
                  transition: {
                    duration: FIBONACCI_MS.f3 / 1000,
                    ease: cubicBezier(EASING.spring[0], EASING.spring[1], EASING.spring[2], EASING.spring[3]),
                  },
                }}
                whileTap={{ scale: 0.97 }}
                className="border border-border/30 rounded-xl px-4 py-3 bg-card/20 hover:border-accent/30 hover:bg-card/40 hover:shadow-lg hover:shadow-accent/5 transition-colors duration-300"
              >
                <p className="text-muted-foreground/60 text-xs font-mono uppercase tracking-wide">{stat.label}</p>
                {stat.href ? (
                  <a
                    href={stat.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-foreground font-medium mt-1 hover:text-accent transition-colors duration-200"
                  >
                    {stat.value}
                    <ExternalLink className="h-3 w-3 opacity-40 group-hover:opacity-100 transition-opacity duration-200" />
                  </a>
                ) : (
                  <p className={`text-foreground mt-1 ${stat.mono ? "font-mono text-sm" : "font-medium"}`}>
                    {stat.value}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Links */}
          <motion.div
            className="flex items-center gap-4"
            variants={fadeUp(0.5)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.a
              href="https://harmonia-ui.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.05,
                y: -3,
                transition: {
                  duration: FIBONACCI_MS.f3 / 1000,
                  ease: cubicBezier(EASING.spring[0], EASING.spring[1], EASING.spring[2], EASING.spring[3]),
                },
              }}
              whileTap={{ scale: 0.96 }}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/50 bg-card/30 hover:border-accent/50 hover:bg-accent/5 hover:shadow-md hover:shadow-accent/10 transition-colors duration-300 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Live demo
              <ExternalLink className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100 transition-opacity duration-200" />
            </motion.a>
            <motion.a
              href="https://github.com/vsm1996/harmonia-ui"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.3,
                y: -4,
                rotate: [0, -10, 10, 0],
                transition: {
                  duration: FIBONACCI_MS.f4 / 1000,
                  ease: cubicBezier(EASING.spring[0], EASING.spring[1], EASING.spring[2], EASING.spring[3]),
                },
              }}
              whileTap={{ scale: 0.9 }}
              className="relative text-muted-foreground hover:text-accent transition-colors duration-200"
              aria-label="Harmonia GitHub"
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-accent/20 blur-xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: FIBONACCI_MS.f3 / 1000 }}
              />
              <Github className="h-5 w-5 relative z-10" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
