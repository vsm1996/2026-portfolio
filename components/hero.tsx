"use client"

import { ArrowRight, Github, Linkedin, Mail, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, useMotionValue, useTransform, useSpring, cubicBezier } from "framer-motion"
import { PHI_INVERSE, FIBONACCI_MS, EASING, STAGGER, GOLDEN_ANGLE } from "@/lib/animation-constants"
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: STAGGER.children,
        delayChildren: FIBONACCI_MS.f2 / 1000,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: PHI_INVERSE,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: FIBONACCI_MS.f5 / 1000,
        ease: cubicBezier(EASING.golden[0], EASING.golden[1], EASING.golden[2], EASING.golden[3])
      },
    },
  }

  const socialVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -GOLDEN_ANGLE },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: (FIBONACCI_MS.f4 + i * FIBONACCI_MS.f2) / 1000,
        duration: FIBONACCI_MS.f4 / 1000,
        ease: cubicBezier(EASING.spring[0], EASING.spring[1], EASING.spring[2], EASING.spring[3]),
      },
    }),
  }

  const gradientFlow = {
    keyframes: [{ backgroundPosition: "0% 50%" }, { backgroundPosition: "100% 50%" }],
    duration: 3000,
    ease: "linear",
    iterations: Number.POSITIVE_INFINITY,
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20 relative overflow-hidden"
    >
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
        transition={{
          duration: 12,
          repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-40 right-20 w-24 h-24 border rounded-3xl opacity-20"
        style={{
          borderColor: "oklch(0.68 0.18 280 / 0.3)",
          boxShadow: "0 0 30px oklch(0.68 0.18 280 / 0.1)",
          x: prefersReducedMotion ? 0 : xTransform.get() * 0.5,
          y: prefersReducedMotion ? 0 : yTransform.get() * -0.5,
        }}
        animate={{
          rotate: prefersReducedMotion ? 0 : [0, 360],
          y: prefersReducedMotion ? 0 : [0, -35, 10, -25, 0],
          scale: prefersReducedMotion ? 1 : [1, 1.2, 0.9, 1.15, 1],
          opacity: prefersReducedMotion ? 0.15 : [0.15, 0.3, 0.18, 0.25, 0.15],
        }}
        transition={{
          rotate: {
            duration: 15,
            repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
          y: {
            duration: 6,
            repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
          scale: {
            duration: 6,
            repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
          opacity: { duration: 6, repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
      />

      <motion.div
        className="absolute bottom-40 left-20 w-20 h-20 border rounded-full opacity-25"
        style={{
          borderColor: "oklch(0.75 0.16 170 / 0.35)",
          boxShadow: "0 0 25px oklch(0.75 0.16 170 / 0.12)",
        }}
        animate={{
          scale: prefersReducedMotion ? 1 : [1, 1.4, 0.85, 1.3, 1],
          x: prefersReducedMotion ? 0 : [0, 35, -25, 20, 0],
          y: prefersReducedMotion ? 0 : [0, -25, 20, -15, 0],
          opacity: prefersReducedMotion ? 0.2 : [0.2, 0.35, 0.18, 0.28, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/3 left-1/4 w-16 h-16 border-2 rounded-2xl opacity-18"
        style={{
          borderColor: "oklch(0.72 0.18 60 / 0.3)",
          boxShadow: "0 0 20px oklch(0.72 0.18 60 / 0.1)",
        }}
        animate={{
          rotate: prefersReducedMotion ? 0 : [0, -360],
          scale: prefersReducedMotion ? 1 : [1, 1.3, 0.8, 1.2, 1],
          x: prefersReducedMotion ? 0 : [0, 20, -15, 12, 0],
          y: prefersReducedMotion ? 0 : [0, -15, 12, -8, 0],
        }}
        transition={{
          duration: 13,
          repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-6xl w-full relative z-10">
        <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
          <div className="space-y-4">
            <motion.p variants={itemVariants} className="text-accent text-base font-mono font-medium tracking-wide">
              Hi, my name is
            </motion.p>
            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-foreground text-balance leading-[0.9]"
              style={{
                textShadow: "0 0 40px oklch(0.72 0.22 280 / 0.2)",
                willChange: "transform",
              }}
              whileHover={{ scale: 1.02, x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {"Vanessa.".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.5 + i * 0.035,
                    duration: 0.25,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: prefersReducedMotion ? 0 : -10,
                    color: "oklch(0.72 0.22 280)",
                    transition: { duration: 0.2 },
                  }}
                  style={{ display: "inline-block", willChange: "transform" }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-semibold text-balance leading-tight relative inline-block cursor-default group"
              whileHover={{ scale: 1.02, x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span
                className="bg-linear-to-r from-muted-foreground via-orange-300 via-55% to-muted-foreground bg-clip-text text-transparent"
                style={{
                  backgroundSize: "200% 100%",
                  backgroundPosition: "-100% 0",
                  willChange: "background-position",
                }}
                whileHover={{
                  backgroundPosition: ["200% 0", "-100% 0"],
                  transition: {
                    duration: 1.5,
                    ease: [0.65, 0, 0.35, 1],
                  },
                }}
              >
                I build things for the web.
              </motion.span>
            </motion.h2>
          </div>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed font-normal group cursor-default"
          >
            <motion.span
              className="text-balance inline-block transition-all duration-500 bg-linear-to-r from-muted-foreground to-muted-foreground bg-clip-text group-hover:from-primary group-hover:via-accent group-hover:to-secondary group-hover:text-transparent"
              style={{ backgroundSize: "200% 200%", backgroundPosition: "0% 50%" }}
              whileHover={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                transition: { duration: 2, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY },
              }}
            >
              I'm a Front-end Engineer based in the Bay Area. I'm passionate about creating delightful web experiences
              and building high-performance front-end systems. My mission is to explore the intersection of art and
              technology, blending creativity with functionality.
            </motion.span>
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95, rotate: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Button
                size="lg"
                className="group rounded-full px-8 h-14 text-base relative overflow-hidden shadow-lg shadow-primary/20"
              >
                <motion.span
                  className="absolute inset-0 bg-linear-to-r from-primary/0 via-accent/30 to-primary/0"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <span className="relative z-10 flex items-center">
                  View My Work
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </motion.div>
            <div className="flex items-center gap-4">
              {[
                { icon: Github, href: "https://github.com/vsm1996", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/vsm1996", label: "LinkedIn" },
                { icon: Mail, href: "mailto:vanessa.s.martin96@gmail.com", label: "Email" },
              ].map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.label !== 'Email' ? "_blank" : "initial"}
                  rel={social.label !== 'Email' ? "noopener noreferrer" : "initial"}
                  className="text-muted-foreground hover:text-accent transition-colors relative"
                  custom={i}
                  variants={socialVariants}
                  whileHover={{
                    scale: 1.3,
                    rotate: [0, -10, 10, 0],
                    y: -5,
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ stiffness: 400 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-accent/20 blur-xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  <social.icon className="h-6 w-6 relative z-10" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
