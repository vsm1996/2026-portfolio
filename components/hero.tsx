"use client"

import { ExternalLink, Github, Mail } from "lucide-react"
import { motion, useMotionValue, useTransform, useSpring, cubicBezier } from "framer-motion"
import { PHI_INVERSE, FIBONACCI_MS, EASING } from "@/lib/animation-constants"
import { useEffect, useState } from "react"

// Shared breathing easing — matches EASING.breathing
const BREATH = [0.37, 0, 0.63, 1] as const

export function Hero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const xTransform = useTransform(mouseX, [0, 1], [-20, 20])
  const yTransform = useTransform(mouseY, [0, 1], [-20, 20])
  const x = useSpring(xTransform, { damping: 25, stiffness: 150 })
  const y = useSpring(yTransform, { damping: 25, stiffness: 150 })

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handleMotionChange)
    const handleMouseMove = (e: MouseEvent) => {
      if (!prefersReducedMotion) {
        mouseX.set(e.clientX / window.innerWidth)
        mouseY.set(e.clientY / window.innerHeight)
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      mediaQuery.removeEventListener("change", handleMotionChange)
    }
  }, [mouseX, mouseY, prefersReducedMotion])

  const lineIn = (delay: number) => ({
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

  const systems = [
    {
      title: "Harmonia",
      desc: "capacity \u2192 tokens \u2192 components",
      detail: "cognitive \xd7 temporal \xd7 emotional \u2192 4-layer framework",
    },
    {
      title: "Renge",
      desc: "\u03c6 / Fibonacci / OKLCH \u2192 production",
      detail: "100+ CSS vars, 6 profiles, runtime switching",
    },
    {
      title: "8 years",
      desc: "PlayStation \u2192 aviation \u2192 npm",
      detail: "traffic records, 3-month rescues, open-source",
    },
  ]

  const demos = [
    { label: "Harmonia UI", href: "https://harmonia-ui.dev/", sub: "capacity-adaptive framework" },
    { label: "Renge Design", href: "https://renge-ui.vercel.app/", sub: "\u03c6-proportional design system" },
    { label: "Grove", href: "https://grove-intel.vercel.app/", sub: "Harmonia-powered career system" },
    { label: "The Hondana", href: "https://the-hondana.vercel.app/", sub: "Renge-powered reading tracker" },
  ]

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20 relative overflow-hidden"
    >
      {/* Mouse-tracking orb — breathes while tracking */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.68 0.18 280 / 0.45) 0%, transparent 70%)",
          filter: "blur(80px)",
          x: prefersReducedMotion ? 0 : x,
          y: prefersReducedMotion ? 0 : y,
        }}
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.12, 1],
          opacity: [0.3, 0.55, 0.3],
          rotate: [0, 360],
        }}
        transition={{
          scale: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: BREATH, times: [0, 0.5, 1] },
          opacity: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: BREATH, times: [0, 0.5, 1] },
          rotate: { duration: 34, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
        }}
      />

      {/* Floating shapes — each breathes at a different Fibonacci period */}
      {/* Top-right: slow spin + 8s breath */}
      <motion.div
        className="absolute top-40 right-20 w-24 h-24 border rounded-3xl"
        style={{ borderColor: "oklch(0.68 0.18 280 / 0.6)", boxShadow: "0 0 30px oklch(0.68 0.18 280 / 0.15)" }}
        animate={prefersReducedMotion ? {} : {
          rotate: [0, 360],
          scale: [1, 1.06, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          rotate: { duration: 21, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: BREATH, times: [0, 0.5, 1] },
          opacity: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: BREATH, times: [0, 0.5, 1] },
        }}
      />
      {/* Bottom-left: float + 13s breath, delay 3 */}
      <motion.div
        className="absolute bottom-40 left-20 w-20 h-20 border rounded-full"
        style={{ borderColor: "oklch(0.75 0.16 170 / 0.6)" }}
        animate={prefersReducedMotion ? {} : {
          y: [0, -14, 0],
          scale: [1, 1.08, 1],
          opacity: [0.4, 0.65, 0.4],
        }}
        transition={{ duration: 13, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: 3, times: [0, 0.5, 1] }}
      />
      {/* Mid-left: slow counter-spin + 5s breath, delay 1 */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-16 h-16 border-2 rounded-2xl"
        style={{ borderColor: "oklch(0.72 0.18 60 / 0.55)" }}
        animate={prefersReducedMotion ? {} : {
          rotate: [0, -360],
          scale: [1, 1.05, 1],
          opacity: [0.4, 0.65, 0.4],
        }}
        transition={{
          rotate: { duration: 21, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: 1, times: [0, 0.5, 1] },
          opacity: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: 1, times: [0, 0.5, 1] },
        }}
      />

      <div className="max-w-6xl w-full relative z-10">
        <div className="space-y-10">
          <motion.p
            variants={lineIn(0)}
            initial="hidden"
            animate="visible"
            className="text-accent font-mono text-sm font-medium tracking-widest uppercase"
          >
            Vanessa Martin
          </motion.p>

          <div className="space-y-2">
            <motion.h1
              variants={lineIn(0.1)}
              initial="hidden"
              animate="visible"
              className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight text-foreground leading-[0.95]"
            >
              Frontend Architect.
            </motion.h1>
            <motion.h2
              variants={lineIn(0.25)}
              initial="hidden"
              animate="visible"
              className="text-3xl md:text-5xl lg:text-6xl font-light text-muted-foreground leading-tight"
            >
              Systems from first principles.
            </motion.h2>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.09, delayChildren: 0.4 } },
            }}
          >
            {systems.map((s, i) => (
              <motion.div
                key={s.title}
                variants={{
                  hidden: { opacity: 0, y: 16, scale: PHI_INVERSE },
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
                  scale: 1.04,
                  y: -4,
                  transition: {
                    duration: FIBONACCI_MS.f3 / 1000,
                    ease: cubicBezier(EASING.spring[0], EASING.spring[1], EASING.spring[2], EASING.spring[3]),
                  },
                }}
                whileTap={{ scale: 0.97 }}
                className="relative border border-border/40 rounded-xl px-4 py-3 bg-card/30 backdrop-blur-sm hover:border-accent/40 hover:bg-card/60 hover:shadow-lg hover:shadow-accent/5 transition-colors duration-300 cursor-default"
              >
                {/* Ambient card pulse — each card breathes at a different Fibonacci delay */}
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 50%, oklch(0.75 0.22 285 / 0.04) 0%, transparent 70%)" }}
                  animate={prefersReducedMotion ? {} : { opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: i * 2, times: [0, 0.5, 1] }}
                />
                <p className="text-foreground font-mono text-sm font-semibold relative">{s.title}</p>
                <p className="text-muted-foreground text-xs mt-1 font-mono relative">{s.desc}</p>
                <p className="text-muted-foreground/60 text-xs mt-1 relative">{s.detail}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3 items-center"
            variants={lineIn(0.65)}
            initial="hidden"
            animate="visible"
          >
            <p className="text-muted-foreground/40 text-xs font-mono self-center mr-1">live</p>
            {demos.map((demo) => (
              <motion.a
                key={demo.label}
                href={demo.href}
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
                className="group flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/30 hover:border-accent/50 hover:bg-accent/5 hover:shadow-md hover:shadow-accent/10 transition-colors duration-300 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {demo.label}
                <ExternalLink className="h-3 w-3 opacity-40 group-hover:opacity-100 transition-opacity duration-200" />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="flex items-center gap-5"
            variants={lineIn(0.75)}
            initial="hidden"
            animate="visible"
          >
            {[
              { href: "https://github.com/vsm1996", Icon: Github, label: "GitHub", external: true },
              { href: "mailto:vanessa.s.martin96@gmail.com", Icon: Mail, label: "Email", external: false },
            ].map(({ href, Icon, label, external }) => (
              <motion.a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={label}
                whileHover={{
                  scale: 1.3,
                  y: -5,
                  rotate: [0, -10, 10, 0],
                  transition: {
                    duration: FIBONACCI_MS.f4 / 1000,
                    ease: cubicBezier(EASING.spring[0], EASING.spring[1], EASING.spring[2], EASING.spring[3]),
                  },
                }}
                whileTap={{ scale: 0.9 }}
                className="relative text-muted-foreground hover:text-accent transition-colors duration-200"
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-accent/20 blur-xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: FIBONACCI_MS.f3 / 1000 }}
                />
                <Icon className="h-5 w-5 relative z-10" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
