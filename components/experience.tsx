"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { motion, AnimatePresence, cubicBezier } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { PHI_INVERSE, FIBONACCI_MS, EASING } from "@/lib/animation-constants"

const BREATH = [0.37, 0, 0.63, 1] as const

const experiences = [
  {
    company: "Hello Goodwin",
    position: "Senior Front-end Engineer",
    period: "2025",
    description: [
      "Inherited a non-functional multi-tenant aviation platform mid-development. Shipped production-ready in 3 months against undocumented, schema-inconsistent APIs.",
      "Diagnosed and resolved critical data persistence failure in React Query causing client profile mutations not to sync. Corrected company-level branding isolation breaking cross-tenant context boundaries.",
      "Built entire frontend-to-backend integration from scratch. Reverse-engineered data contracts in the absence of reliable backend communication.",
      "Operated through significant org instability: team lead departure, principal backend engineer terminated. Delivery uninterrupted.",
      "Produced handoff documentation for Persona KYC/KYB integration, giving the incoming engineer a clear implementation pathway for the B2B/B2C fintech authorization layer.",
    ],
    technologies: ["React", "TypeScript", "Next.js", "React Query", "MantineUI", "Vercel"],
  },
  {
    company: "PlayStation",
    position: "Front-end Engineer",
    period: "2022 \u2014 2024",
    description: [
      "Built Year in Review experience: global activation that broke platform traffic records with millions of simultaneous users. Surfaced scaling infrastructure issues at launch.",
      "Part of the proof-of-concept initiative driving PlayStation's migration from jQuery/ERB to React/Next.js. Year in Review and email builder were the primary validation surfaces. Migration is now platform-wide.",
      "Refactored legacy jQuery/ERB component library under collision-prone CSS architecture. Restructured selector patterns to prevent cascade failures.",
      "Built Next.js email campaign builder enabling marketing authors to generate email-valid HTML without engineering support.",
      "Architected genre pages for PlayStation.com from scratch. Advocated for React adoption in design reviews before it became the platform standard.",
    ],
    technologies: ["JavaScript", "React", "Next.js", "jQuery", "CSS", "ERB Ruby", "TailwindCSS", "Storybook", "Netlify"],
  },
  {
    company: "Aleph Inc",
    position: "Front-end Engineer",
    period: "2021 \u2014 2022",
    description: [
      "Introduced TypeScript across the entire firm, establishing type safety as standard practice before it became industry norm. Set architectural patterns that all subsequent projects inherited.",
      "Built and standardized a project templating system that became mandatory for all new client work, eliminating repetitive configuration and setup overhead.",
      "Sole frontend engineer across multiple client engagements: cancer research organizations, UC Berkeley Extensions, Peak Analytics. Shipped production frontends on WordPress and Next.js.",
      "Created company front-end boilerplate. Set up CI/CD pipelines for multiple staging environments.",
    ],
    technologies: ["Next.js", "React", "TypeScript", "SCSS", "Mapbox", "WordPress", "Google Cloud Run", "Docker", "AWS"],
  },
]

export function Experience() {
  const [activeIndex, setActiveIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const contentVariants = {
    hidden: { opacity: 0, x: 20, scale: PHI_INVERSE },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: FIBONACCI_MS.f5 / 1000,
        ease: cubicBezier(EASING.golden[0], EASING.golden[1], EASING.golden[2], EASING.golden[3]),
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      scale: PHI_INVERSE,
      transition: { duration: FIBONACCI_MS.f3 / 1000 },
    },
  }

  const listItemVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * (FIBONACCI_MS.f1 / 1000),
        duration: FIBONACCI_MS.f3 / 1000,
        ease: cubicBezier(EASING.gentle[0], EASING.gentle[1], EASING.gentle[2], EASING.gentle[3]),
      },
    }),
  }

  return (
    <section id="production" className="min-h-screen flex items-center justify-center px-6 py-20 relative" ref={ref}>
      <motion.div
        className="absolute top-10 right-20 w-16 h-16 border border-accent/50 rounded-full"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.07, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          rotate: { duration: 21, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: 5, times: [0, 0.5, 1] },
          opacity: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: 5, times: [0, 0.5, 1] },
        }}
      />

      <div className="max-w-4xl w-full">
        <div className="space-y-8">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{
              duration: FIBONACCI_MS.f5 / 1000,
              ease: cubicBezier(EASING.golden[0], EASING.golden[1], EASING.golden[2], EASING.golden[3]),
              delay: FIBONACCI_MS.f3 / 1000,
            }}
          >
            <p className="text-accent font-mono text-sm font-medium tracking-widest uppercase">Experience</p>
            <h2 className="text-5xl md:text-7xl font-light tracking-tight text-foreground leading-none">
              Production Systems
            </h2>
            <motion.div
              className="h-px bg-border mt-4"
              initial={{ width: 0 }}
              animate={isInView ? { width: "16rem" } : { width: 0 }}
              transition={{
                duration: FIBONACCI_MS.f6 / 1000,
                ease: cubicBezier(EASING.golden[0], EASING.golden[1], EASING.golden[2], EASING.golden[3]),
                delay: FIBONACCI_MS.f3 / 1000,
              }}
            />
          </motion.div>

          <motion.div
            className="flex flex-col md:flex-row gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: FIBONACCI_MS.f5 / 1000,
              ease: cubicBezier(EASING.golden[0], EASING.golden[1], EASING.golden[2], EASING.golden[3]),
              delay: FIBONACCI_MS.f4 / 1000,
            }}
          >
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
              {experiences.map((exp, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`
                    relative px-6 py-3 rounded-3xl text-left whitespace-nowrap md:whitespace-normal
                    transition-all duration-300 font-medium
                    ${activeIndex === index
                      ? "text-foreground font-semibold shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className={`
                      absolute inset-0 rounded-3xl backdrop-blur-sm
                      ${activeIndex === index
                        ? "bg-linear-to-r from-primary/20 via-accent/20 to-secondary/20"
                        : "bg-muted/30 hover:bg-muted/50"
                      }
                    `}
                    style={{ backgroundSize: "200% 200%" }}
                    animate={activeIndex === index ? { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] } : {}}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />

                  {activeIndex === index && (
                    <motion.div
                      className="absolute inset-0 rounded-3xl"
                      style={{
                        background: "linear-gradient(135deg, oklch(0.68 0.32 290), oklch(0.75 0.25 45), oklch(0.68 0.32 290))",
                        backgroundSize: "200% 200%",
                        padding: "2px",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                  )}

                  <span className="relative z-10">{exp.company}</span>
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex-1"
              >
                <Card className="rounded-3xl p-6 relative overflow-hidden">
                  {/* Card ambient breath — uses Fibonacci breathing easing */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: "radial-gradient(circle at 50% 50%, oklch(0.68 0.32 290 / 0.06), transparent)",
                    }}
                    animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.08, 1] }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: BREATH, times: [0, 0.5, 1] }}
                  />
                  <div className="space-y-4 relative z-10">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{experiences[activeIndex].position}</h3>
                      <p className="text-accent font-mono text-sm">@ {experiences[activeIndex].company}</p>
                      <p className="text-sm text-muted-foreground mt-1">{experiences[activeIndex].period}</p>
                    </div>

                    <ul className="space-y-3">
                      {experiences[activeIndex].description.map((item, i) => (
                        <motion.li
                          key={i}
                          className="flex gap-3"
                          custom={i}
                          variants={listItemVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <span className="text-accent mt-1 shrink-0">&#9657;</span>
                          <span className="text-muted-foreground leading-relaxed">{item}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {experiences[activeIndex].technologies.map((tech, i) => (
                        <motion.span
                          key={tech}
                          className="relative px-3 py-1 text-xs font-mono bg-accent/10 text-accent rounded-full"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [null, 1],
                            scale: [null, 1],
                          }}
                          transition={{
                            delay: (FIBONACCI_MS.f4 + i * FIBONACCI_MS.f1) / 1000,
                            duration: FIBONACCI_MS.f3 / 1000,
                            ease: cubicBezier(EASING.spring[0], EASING.spring[1], EASING.spring[2], EASING.spring[3]),
                          }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {/* Subtle glow pulse on each tag, staggered */}
                          <motion.span
                            className="absolute inset-0 rounded-full pointer-events-none"
                            animate={{
                              boxShadow: [
                                "0 0 0px oklch(0.72 0.18 60 / 0)",
                                "0 0 8px oklch(0.72 0.18 60 / 0.20)",
                                "0 0 0px oklch(0.72 0.18 60 / 0)",
                              ],
                            }}
                            transition={{
                              duration: 5,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: BREATH,
                              delay: i * 0.5,
                              times: [0, 0.5, 1],
                            }}
                          />
                          <span className="relative">{tech}</span>
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* <motion.p
            className="text-muted-foreground/50 font-mono text-xs border-t border-border/20 pt-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6 }}
          >
            Self-taught. Coding Dojo 2018. CSUEB health interruption year 2.
          </motion.p> */}
        </div>
      </div>
    </section>
  )
}
