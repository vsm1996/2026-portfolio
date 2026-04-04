"use client"

import { ExternalLink, Github } from "lucide-react"
import { motion, cubicBezier } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { PHI_INVERSE, FIBONACCI_MS, EASING, GOLDEN_ANGLE } from "@/lib/animation-constants"

const BREATH = [0.37, 0, 0.63, 1] as const

const scaleRows = [
  { step: "4xl", formula: "16 \xd7 \u03c6\u2075", px: "177px", token: "--renge-text-4xl" },
  { step: "3xl", formula: "16 \xd7 \u03c6\u2074", px: "110px", token: "--renge-text-3xl" },
  { step: "2xl", formula: "16 \xd7 \u03c6\u00b3", px: "68px", token: "--renge-text-2xl" },
  { step: "xl", formula: "16 \xd7 \u03c6\u00b2", px: "42px", token: "--renge-text-xl" },
  { step: "lg", formula: "16 \xd7 \u03c6\u00b9", px: "26px", token: "--renge-text-lg" },
  { step: "base", formula: "16px", px: "16px", token: "--renge-text-base", base: true },
  { step: "sm", formula: "16 \xd7 \u03c6\u207b\u00b9", px: "10px", token: "--renge-text-sm" },
]

const spacingRows = [
  { step: "fib-11", fib: "89", px: "356px" },
  { step: "fib-10", fib: "55", px: "220px" },
  { step: "fib-9", fib: "34", px: "136px" },
  { step: "fib-8", fib: "21", px: "84px" },
  { step: "fib-7", fib: "13", px: "52px" },
  { step: "fib-6", fib: "8", px: "32px" },
  { step: "fib-5", fib: "5", px: "20px" },
  { step: "fib-4", fib: "3", px: "12px" },
  { step: "fib-3", fib: "2", px: "8px" },
]

const runtimeStats = [
  { label: "color profiles", value: "6 named themes" },
  { label: "colors", value: "OKLCH perceptual uniformity" },
  { label: "motion", value: "\u03c6-derived easing curves" },
]

const productionProofs = [
  {
    name: "The Hondana",
    desc: "Reading tracker built on Renge tokens. Full profile switching in production. All spacing, typography, and color from the system.",
    href: "https://the-hondana.vercel.app/",
    linkLabel: "the-hondana.vercel.app",
  },
  {
    name: "This portfolio",
    desc: "Built on Renge tokens. The color system, type scale, and spacing you are reading right now are Renge-derived.",
    href: null,
    linkLabel: null,
  },
]

export function Projects() {
  const ref = useRef<HTMLDivElement>(null)
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

  const cardHover = {
    scale: 1.03,
    y: -3,
    transition: {
      duration: FIBONACCI_MS.f3 / 1000,
      ease: cubicBezier(EASING.spring[0], EASING.spring[1], EASING.spring[2], EASING.spring[3]),
    },
  }

  return (
    <section id="renge" className="min-h-screen flex items-center justify-center px-6 py-32 relative" ref={ref}>
      {/* Floating shapes — breathing */}
      <motion.div
        className="absolute bottom-20 left-10 w-16 h-16 border border-primary/50 rounded-2xl"
        animate={{
          rotate: [0, 360],
          y: [0, -12, 0],
          opacity: [0.4, 0.65, 0.4],
        }}
        transition={{
          rotate: { duration: 21, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          y: { duration: 13, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: 3, times: [0, 0.5, 1] },
          opacity: { duration: 13, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: 3, times: [0, 0.5, 1] },
        }}
      />
      <motion.div
        className="absolute top-24 right-16 w-12 h-12 border border-accent/50 rounded-full"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.08, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          rotate: { duration: 21, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: 1, times: [0, 0.5, 1] },
          opacity: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: 1, times: [0, 0.5, 1] },
        }}
      />
      <motion.div
        className="absolute top-1/3 right-24 w-8 h-8 bg-secondary/30 rounded-lg"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.06, 1],
          opacity: [0.4, 0.65, 0.4],
        }}
        transition={{
          rotate: { duration: 13, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: 2, times: [0, 0.5, 1] },
          opacity: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: 2, times: [0, 0.5, 1] },
        }}
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
            <p className="text-accent font-mono text-sm font-medium tracking-widest uppercase">Design System</p>
            <h2 className="text-5xl md:text-7xl font-light tracking-tight text-foreground leading-none">
              Renge Design System
            </h2>
            <p className="text-2xl md:text-3xl text-muted-foreground font-light">
              Proportion as first principle.
            </p>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Every token in Renge is derived, not chosen. Typography from the golden ratio. Spacing from the Fibonacci sequence. Colors in OKLCH for perceptual uniformity. Motion curves from phi-derived easing. Nothing arbitrary.
            </p>
          </motion.div>

          {/* Scale tables */}
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              className="space-y-3"
              variants={fadeUp(0.15)}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <p className="text-muted-foreground/60 font-mono text-xs uppercase tracking-widest">
                Typography &mdash; \u03c6 scale from 16px
              </p>
              <motion.div
                whileHover={{
                  scale: 1.01,
                  transition: { duration: FIBONACCI_MS.f3 / 1000 },
                }}
                className="border border-border/30 rounded-2xl overflow-hidden bg-card/20 hover:border-accent/20 hover:shadow-xl hover:shadow-accent/5 transition-colors duration-300"
              >
                <table className="w-full text-sm font-mono">
                  <thead>
                    <tr className="border-b border-border/20">
                      <th className="text-left px-4 py-2 text-muted-foreground/50 font-normal text-xs">step</th>
                      <th className="text-left px-4 py-2 text-muted-foreground/50 font-normal text-xs">formula</th>
                      <th className="text-right px-4 py-2 text-muted-foreground/50 font-normal text-xs">value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scaleRows.map((row) => (
                      <tr
                        key={row.step}
                        className={`border-b border-border/10 last:border-0 hover:bg-accent/5 transition-colors duration-150 ${row.base ? "bg-accent/5" : ""}`}
                      >
                        <td className={`px-4 py-2 ${row.base ? "text-accent" : "text-muted-foreground/70"}`}>
                          {row.step}
                        </td>
                        <td className="px-4 py-2 text-muted-foreground/50 text-xs">{row.formula}</td>
                        <td className="px-4 py-2 text-right text-foreground/80">{row.px}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </motion.div>

            <motion.div
              className="space-y-3"
              variants={fadeUp(0.25)}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <p className="text-muted-foreground/60 font-mono text-xs uppercase tracking-widest">
                Spacing &mdash; Fibonacci \xd7 4px base unit
              </p>
              <motion.div
                whileHover={{
                  scale: 1.01,
                  transition: { duration: FIBONACCI_MS.f3 / 1000 },
                }}
                className="border border-border/30 rounded-2xl overflow-hidden bg-card/20 hover:border-accent/20 hover:shadow-xl hover:shadow-accent/5 transition-colors duration-300"
              >
                <table className="w-full text-sm font-mono">
                  <thead>
                    <tr className="border-b border-border/20">
                      <th className="text-left px-4 py-2 text-muted-foreground/50 font-normal text-xs">token</th>
                      <th className="text-left px-4 py-2 text-muted-foreground/50 font-normal text-xs">fib</th>
                      <th className="text-right px-4 py-2 text-muted-foreground/50 font-normal text-xs">value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {spacingRows.map((row) => (
                      <tr
                        key={row.step}
                        className="border-b border-border/10 last:border-0 hover:bg-accent/5 transition-colors duration-150"
                      >
                        <td className="px-4 py-2 text-muted-foreground/70">{row.step}</td>
                        <td className="px-4 py-2 text-muted-foreground/50 text-xs">{row.fib}</td>
                        <td className="px-4 py-2 text-right text-foreground/80">{row.px}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </motion.div>
          </div>

          {/* Runtime injection */}
          <motion.div
            className="space-y-4"
            variants={fadeUp(0.35)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <p className="text-muted-foreground/60 font-mono text-xs uppercase tracking-widest">Runtime injection</p>
            <motion.code
              whileHover={{
                scale: 1.01,
                transition: { duration: FIBONACCI_MS.f3 / 1000 },
              }}
              animate={{
                boxShadow: [
                  "0 0 0px oklch(0.72 0.18 60 / 0)",
                  "0 0 18px oklch(0.72 0.18 60 / 0.14)",
                  "0 0 0px oklch(0.72 0.18 60 / 0)",
                ],
              }}
              transition={{
                boxShadow: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: BREATH, times: [0, 0.5, 1] },
              }}
              className="block font-mono text-sm text-accent/80 bg-card/40 border border-border/30 hover:border-accent/30 hover:bg-card/60 hover:shadow-lg hover:shadow-accent/5 px-5 py-4 rounded-xl transition-colors duration-300 cursor-default"
            >
              createRengeTheme(&apos;ocean&apos;) &rarr; 100+ CSS custom properties &rarr; production
            </motion.code>
            <div className="grid sm:grid-cols-3 gap-4">
              {runtimeStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16, scale: PHI_INVERSE }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: PHI_INVERSE }}
                  transition={{
                    delay: 0.35 + i * (FIBONACCI_MS.f2 / 1000),
                    duration: FIBONACCI_MS.f5 / 1000,
                    ease: cubicBezier(EASING.golden[0], EASING.golden[1], EASING.golden[2], EASING.golden[3]),
                  }}
                  whileHover={cardHover}
                  whileTap={{ scale: 0.97 }}
                  className="relative border border-border/30 rounded-xl px-4 py-3 bg-card/20 hover:border-accent/30 hover:bg-card/40 hover:shadow-lg hover:shadow-accent/5 transition-colors duration-300 cursor-default"
                >
                  {/* Stat card ambient glow — each staggered by Fibonacci delay */}
                  <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at 50% 50%, oklch(0.72 0.18 60 / 0.05) 0%, transparent 65%)" }}
                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: i * 1.5, times: [0, 0.5, 1] }}
                  />
                  <p className="text-muted-foreground/60 text-xs font-mono uppercase tracking-wide relative">{stat.label}</p>
                  <p className="text-foreground font-medium mt-1 text-sm relative">{stat.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Production proof */}
          <motion.div
            className="relative border border-border/30 rounded-2xl p-5 bg-card/20 space-y-3 hover:border-accent/20 hover:bg-card/30 hover:shadow-xl hover:shadow-accent/5 transition-colors duration-300"
            variants={fadeUp(0.45)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{
              scale: 1.01,
              transition: { duration: FIBONACCI_MS.f3 / 1000 },
            }}
          >
            {/* Production proof card ambient pulse */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 40% 50%, oklch(0.75 0.22 285 / 0.04) 0%, transparent 65%)" }}
              animate={{ opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 13, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: 3, times: [0, 0.5, 1] }}
            />
            <p className="text-muted-foreground/60 font-mono text-xs uppercase tracking-widest">Production proof</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {productionProofs.map((proof) => (
                <div key={proof.name}>
                  <p className="text-foreground font-medium">{proof.name}</p>
                  <p className="text-muted-foreground text-sm mt-1">{proof.desc}</p>
                  {proof.href && (
                    <motion.a
                      href={proof.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        x: 4,
                        transition: { duration: FIBONACCI_MS.f3 / 1000 },
                      }}
                      className="group inline-flex items-center gap-1.5 mt-2 text-accent text-sm hover:text-accent/80 transition-colors duration-200"
                    >
                      {proof.linkLabel}
                      <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity duration-200" />
                    </motion.a>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Footer links */}
          <motion.div
            className="flex items-center gap-4 flex-wrap"
            variants={fadeUp(0.55)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.a
              href="https://renge-ui.vercel.app/"
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
              href="https://github.com/vsm1996/renge"
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
              aria-label="Renge GitHub"
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-accent/20 blur-xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: FIBONACCI_MS.f3 / 1000 }}
              />
              <Github className="h-5 w-5 relative z-10" />
            </motion.a>
            <motion.span
              whileHover={{
                scale: 1.04,
                transition: { duration: FIBONACCI_MS.f3 / 1000 },
              }}
              animate={{
                boxShadow: [
                  "0 0 0px oklch(0.72 0.18 60 / 0)",
                  "0 0 10px oklch(0.72 0.18 60 / 0.10)",
                  "0 0 0px oklch(0.72 0.18 60 / 0)",
                ],
              }}
              transition={{
                boxShadow: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: 1, times: [0, 0.5, 1] },
              }}
              className="font-mono text-xs text-muted-foreground/60 border border-border/30 hover:border-accent/30 hover:text-muted-foreground/80 px-3 py-1 rounded-full transition-colors duration-300 cursor-default"
            >
              npm: @renge-ui/tokens
            </motion.span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
