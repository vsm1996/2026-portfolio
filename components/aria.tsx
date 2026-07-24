"use client"

import { ExternalLink, Github } from "lucide-react"
import { motion, cubicBezier } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { PHI_INVERSE, FIBONACCI_MS, EASING } from "@/lib/animation-constants"

// Shared breathing easing (EASING.breathing = [0.37, 0, 0.63, 1])
const BREATH = [0.37, 0, 0.63, 1] as const

// The one rule the whole tool is organized around: where a fact's semantics
// came from decides whether a fix may run automatically.
const gateRows = [
  { basis: "native", source: "real HTML, per aria-query", tier: "format", fix: "auto-fix", auto: true },
  { basis: "declared", source: "author ARIA / design-system config", tier: "format", fix: "auto-fix", auto: true },
  { basis: "inferred", source: "guessed from signals (onClick, class names)", tier: "lint", fix: "suggestion", auto: false },
]

// 3 meaning-preserving rules + 5 located-diagnostic rules = the shipped MVP set.
const formatRules = [
  { id: "no-redundant-role", note: "drops a role equal to the implicit one" },
  { id: "no-unsupported-aria", note: "removes aria-* the role can't carry" },
  { id: "aria-syntax-normalize", note: "canonical lowercase names + values" },
]

const lintRules = [
  { id: "interactive-role-required", note: "handler on a div, no role" },
  { id: "control-needs-name", note: "icon-only control, no accessible name" },
  { id: "img-needs-alt", note: "image exposed with no alt path" },
  { id: "idref-resolves", note: "aria-labelledby → missing id" },
  { id: "aria-hidden-not-focusable", note: "focusable ghost under aria-hidden" },
]

const stats = [
  { label: "npm", value: "2 packages · v0.2.0", mono: true, href: null },
  { label: "hosts", value: "ESLint ↔ oxlint · zero drift", mono: false, href: null },
  { label: "the gate", value: "CI-failing on violation", mono: false, href: null },
]

export function Aria() {
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

  const ruleColumn = (
    title: string,
    caption: string,
    rules: { id: string; note: string }[],
    accentInactive: boolean,
  ) => (
    <motion.div
      className="space-y-3"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <p className="text-muted-foreground/60 font-mono text-xs uppercase tracking-widest">
        {title} <span className="text-muted-foreground/40 normal-case tracking-normal">· {caption}</span>
      </p>
      {rules.map((rule) => (
        <motion.div
          key={rule.id}
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
            y: -2,
            transition: {
              duration: FIBONACCI_MS.f3 / 1000,
              ease: cubicBezier(EASING.spring[0], EASING.spring[1], EASING.spring[2], EASING.spring[3]),
            },
          }}
          className="group border border-border/30 rounded-xl px-4 py-3 bg-card/20 hover:border-accent/30 hover:bg-card/50 hover:shadow-lg hover:shadow-accent/5 transition-colors duration-300"
        >
          <div className="flex items-center gap-2">
            <span
              className={`h-1.5 w-1.5 rounded-full shrink-0 ${accentInactive ? "bg-muted-foreground/40" : "bg-accent"}`}
            />
            <code className="font-mono text-sm text-foreground/90">{rule.id}</code>
          </div>
          <p className="text-muted-foreground text-xs mt-1.5 pl-3.5">{rule.note}</p>
        </motion.div>
      ))}
    </motion.div>
  )

  return (
    <section id="aria" className="min-h-screen flex items-center justify-center px-6 py-32 relative" ref={ref}>
      {/* Floating shapes — breathing */}
      <motion.div
        className="absolute top-24 left-16 w-16 h-16 border border-primary/50 rounded-full"
        animate={{ rotate: [0, 360], scale: [1, 1.07, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{
          rotate: { duration: 21, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: 2, times: [0, 0.5, 1] },
          opacity: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: 2, times: [0, 0.5, 1] },
        }}
      />
      <motion.div
        className="absolute bottom-28 right-14 w-12 h-12 border-2 border-accent/50 rounded-2xl"
        animate={{ rotate: [0, 360], y: [0, -12, 0], opacity: [0.4, 0.65, 0.4] }}
        transition={{
          rotate: { duration: 21, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          y: { duration: 13, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: 4, times: [0, 0.5, 1] },
          opacity: { duration: 13, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: 4, times: [0, 0.5, 1] },
        }}
      />
      <motion.div
        className="absolute top-1/2 left-8 w-9 h-9 bg-secondary/30"
        style={{ borderRadius: "40% 60% 60% 40% / 60% 40% 60% 40%" }}
        animate={{ rotate: [360, 0], scale: [1, 1.06, 1], opacity: [0.4, 0.65, 0.4] }}
        transition={{
          rotate: { duration: 13, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: 1, times: [0, 0.5, 1] },
          opacity: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: 1, times: [0, 0.5, 1] },
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
            <p className="text-accent font-mono text-sm font-medium tracking-widest uppercase">Accessibility Tooling</p>
            <h2 className="text-5xl md:text-7xl font-light tracking-tight text-foreground leading-none">Aria</h2>
            <p className="text-2xl md:text-3xl text-muted-foreground font-light">
              It never changes what the code means.
            </p>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Prettier ended brace-style debates by turning them into a failing build. Aria does the same for the
              mechanical slice of accessibility: the redundant, conflicting, and broken ARIA in most codebases. It runs
              on save. It gates CI. Every guess stays out of the automatic path by construction.
            </p>
          </motion.div>

          {/* The gate */}
          <motion.div
            className="space-y-4"
            variants={fadeUp(0.15)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <p className="text-muted-foreground/60 font-mono text-xs uppercase tracking-widest">
              The gate. One rule governs everything.
            </p>
            <motion.code
              whileHover={{ scale: 1.01, transition: { duration: FIBONACCI_MS.f3 / 1000 } }}
              animate={{
                boxShadow: [
                  "0 0 0px oklch(0.72 0.18 60 / 0)",
                  "0 0 18px oklch(0.72 0.18 60 / 0.14)",
                  "0 0 0px oklch(0.72 0.18 60 / 0)",
                ],
              }}
              transition={{ boxShadow: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: BREATH, times: [0, 0.5, 1] } }}
              className="block font-mono text-sm text-accent/80 bg-card/40 border border-border/30 hover:border-accent/30 hover:bg-card/60 px-5 py-4 rounded-xl transition-colors duration-300 cursor-default"
            >
              a fix auto-applies only when its basis is <span className="text-foreground">native</span> or{" "}
              <span className="text-foreground">declared</span>. never on a guess.
            </motion.code>

            <motion.div
              whileHover={{ scale: 1.01, transition: { duration: FIBONACCI_MS.f3 / 1000 } }}
              className="border border-border/30 rounded-2xl overflow-hidden bg-card/20"
            >
              <table className="w-full text-sm font-mono">
                <thead>
                  <tr className="border-b border-border/20">
                    <th className="text-left px-4 py-2 text-muted-foreground/50 font-normal text-xs">basis</th>
                    <th className="text-left px-4 py-2 text-muted-foreground/50 font-normal text-xs hidden sm:table-cell">
                      where it came from
                    </th>
                    <th className="text-left px-4 py-2 text-muted-foreground/50 font-normal text-xs">tier</th>
                    <th className="text-right px-4 py-2 text-muted-foreground/50 font-normal text-xs">result</th>
                  </tr>
                </thead>
                <tbody>
                  {gateRows.map((row) => (
                    <tr
                      key={row.basis}
                      className={`border-b border-border/10 last:border-0 hover:bg-accent/5 transition-colors duration-150 ${
                        row.auto ? "" : "bg-muted/10"
                      }`}
                    >
                      <td className={`px-4 py-2.5 ${row.auto ? "text-accent" : "text-muted-foreground/80"}`}>
                        {row.basis}
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground/50 text-xs hidden sm:table-cell">{row.source}</td>
                      <td className="px-4 py-2.5 text-foreground/80">{row.tier}</td>
                      <td
                        className={`px-4 py-2.5 text-right ${row.auto ? "text-foreground/80" : "text-muted-foreground/60"}`}
                      >
                        {row.fix}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
            <p className="text-muted-foreground/70 text-sm max-w-2xl">
              The formatter acts only on semantics it <span className="text-foreground/80">knows</span>. Format fixes
              are subtractive. They delete redundant or forbidden ARIA and normalize syntax. They never author a label
              or assert a fact, because a wrong label is worse than none. Declare a component&apos;s semantics in config
              and the guess becomes known. The safe tier grows as the design system matures.
            </p>
          </motion.div>

          {/* Two tiers, eight rules */}
          <motion.div
            className="space-y-4"
            variants={fadeUp(0.3)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <p className="text-muted-foreground/60 font-mono text-xs uppercase tracking-widest">
              Two tiers. Eight rules, shipped &amp; CI-gated.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {ruleColumn("Format", "auto-fixed on save", formatRules, false)}
              {ruleColumn("Lint", "located, human-reviewed", lintRules, true)}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid sm:grid-cols-3 gap-4"
            variants={fadeUp(0.4)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {stats.map((stat, i) => (
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
                className="relative border border-border/30 rounded-xl px-4 py-3 bg-card/20 hover:border-accent/30 hover:bg-card/40 hover:shadow-lg hover:shadow-accent/5 transition-colors duration-300"
              >
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 50%, oklch(0.72 0.18 60 / 0.04) 0%, transparent 70%)" }}
                  animate={{ opacity: [0.2, 0.7, 0.2] }}
                  transition={{ duration: 13, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: i * 2, times: [0, 0.5, 1] }}
                />
                <p className="text-muted-foreground/60 text-xs font-mono uppercase tracking-wide relative">{stat.label}</p>
                <p className={`text-foreground mt-1 relative ${stat.mono ? "font-mono text-sm" : "font-medium text-sm"}`}>
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Links */}
          <motion.div
            className="flex items-center gap-4 flex-wrap"
            variants={fadeUp(0.5)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.a
              href="https://aria-formatter.vercel.app/"
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
              Docs &amp; demo
              <ExternalLink className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100 transition-opacity duration-200" />
            </motion.a>
            <motion.a
              href="https://github.com/vsm1996/aria"
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
              aria-label="Aria GitHub"
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
              whileHover={{ scale: 1.04, transition: { duration: FIBONACCI_MS.f3 / 1000 } }}
              animate={{
                boxShadow: [
                  "0 0 0px oklch(0.72 0.18 60 / 0)",
                  "0 0 10px oklch(0.72 0.18 60 / 0.10)",
                  "0 0 0px oklch(0.72 0.18 60 / 0)",
                ],
              }}
              transition={{ boxShadow: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: 1, times: [0, 0.5, 1] } }}
              className="font-mono text-xs text-muted-foreground/60 border border-border/30 hover:border-accent/30 hover:text-muted-foreground/80 px-3 py-1 rounded-full transition-colors duration-300 cursor-default"
            >
              npm: eslint-plugin-aria-a11y
            </motion.span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
