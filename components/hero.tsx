"use client"

import { ExternalLink, Github, Mail } from "lucide-react"
import { motion, useMotionValue, useTransform, useSpring, cubicBezier } from "framer-motion"
import { PHI_INVERSE, FIBONACCI_MS, EASING } from "@/lib/animation-constants"
import { useEffect, useState } from "react"

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
    { label: "Harmonia UI", href: "https://harmonia-ui.vercel.app/", sub: "capacity-adaptive framework" },
    { label: "Renge Design", href: "https://renge-ui.vercel.app/", sub: "\u03c6-proportional design system" },
    { label: "The Hondana", href: "https://the-hondana.vercel.app/", sub: "Renge-powered reading tracker" },
  ]

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20 relative overflow-hidden"
    >
      {/* Mouse-tracking orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, oklch(0.68 0.18 280 / 0.2) 0%, transparent 70%)",
          filter: "blur(80px)",
          x: prefersReducedMotion ? 0 : x,
          y: prefersReducedMotion ? 0 : y,
        }}
        animate={{
          scale: prefersReducedMotion ? 1 : [1, 1.3, 0.9, 1.2, 1],
          opacity: prefersReducedMotion ? 0.1 : [0.1, 0.25, 0.12, 0.2, 0.1],
          rotate: prefersReducedMotion ? 0 : [0, 90, 180, 270, 360],
        }}
        transition={{ duration: 12, repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      {/* Floating shapes */}
      <motion.div
        className="absolute top-40 right-20 w-24 h-24 border rounded-3xl opacity-20"
        style={{ borderColor: "oklch(0.68 0.18 280 / 0.3)", boxShadow: "0 0 30px oklch(0.68 0.18 280 / 0.1)" }}
        animate={{
          rotate: prefersReducedMotion ? 0 : [0, 360],
          y: prefersReducedMotion ? 0 : [0, -35, 10, -25, 0],
          scale: prefersReducedMotion ? 1 : [1, 1.2, 0.9, 1.15, 1],
          opacity: prefersReducedMotion ? 0.15 : [0.15, 0.3, 0.18, 0.25, 0.15],
        }}
        transition={{
          rotate: { duration: 15, repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY, ease: "linear" },
          y: { duration: 6, repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" },
          scale: { duration: 6, repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" },
          opacity: { duration: 6, repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-20 h-20 border rounded-full opacity-25"
        style={{ borderColor: "oklch(0.75 0.16 170 / 0.35)" }}
        animate={{
          scale: prefersReducedMotion ? 1 : [1, 1.4, 0.85, 1.3, 1],
          x: prefersReducedMotion ? 0 : [0, 35, -25, 20, 0],
          y: prefersReducedMotion ? 0 : [0, -25, 20, -15, 0],
          opacity: prefersReducedMotion ? 0.2 : [0.2, 0.35, 0.18, 0.28, 0.2],
        }}
        transition={{ duration: 10, repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 left-1/4 w-16 h-16 border-2 rounded-2xl opacity-18"
        style={{ borderColor: "oklch(0.72 0.18 60 / 0.3)" }}
        animate={{
          rotate: prefersReducedMotion ? 0 : [0, -360],
          scale: prefersReducedMotion ? 1 : [1, 1.3, 0.8, 1.2, 1],
        }}
        transition={{ duration: 13, repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <div className="max-w-6xl w-full relative z-10">
        <div className="space-y-10">
          {/* Name label */}
          <motion.p
            variants={lineIn(0)}
            initial="hidden"
            animate="visible"
            className="text-accent font-mono text-sm font-medium tracking-widest uppercase"
          >
            Vanessa Martin
          </motion.p>

          {/* Headline */}
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

          {/* System callout cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.09, delayChildren: 0.4 } },
            }}
          >
            {systems.map((s) => (
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
                className="border border-border/40 rounded-xl px-4 py-3 bg-card/30 backdrop-blur-sm hover:border-accent/40 hover:bg-card/60 hover:shadow-lg hover:shadow-accent/5 transition-colors duration-300 cursor-default"
              >
                <p className="text-foreground font-mono text-sm font-semibold">{s.title}</p>
                <p className="text-muted-foreground text-xs mt-1 font-mono">{s.desc}</p>
                <p className="text-muted-foreground/60 text-xs mt-1">{s.detail}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Demo links */}
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

          {/* Social links */}
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
