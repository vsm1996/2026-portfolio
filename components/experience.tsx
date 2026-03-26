"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { motion, AnimatePresence, cubicBezier } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { PHI_INVERSE, FIBONACCI_MS, EASING, PHI, GOLDEN_ANGLE } from "@/lib/animation-constants"

const experiences = [
  {
    company: "Hello Goodwin",
    position: "Senior Front-end Engineer",
    period: "2025",
    description: [
      "Inherited a non-functional multi-tenant client dashboard mid-development and delivered a production-ready system in three months, stable enough for immediate stakeholder presentation.",
      "Diagnosed and resolved a critical data persistence failure in React Query causing client profile mutations to not sync, and corrected company-level branding isolation breaking cross-tenant context boundaries.",
      "Built the entire frontend-to-backend integration from scratch against an undocumented, schema-inconsistent API, reverse-engineering data contracts in the absence of reliable backend communication.",
      "Produced handoff documentation for Persona KYC/KYB integration, providing the incoming engineer a clear implementation pathway for the platform's B2B/B2C fintech authorization layer.",
      "Operated through significant organizational instability, including the departure of the team lead and termination of the principal backend engineer, without interruption to delivery.",
    ],
    technologies: ["React", "TypeScript", "Next.js", "CSS", "MantineUI", "Figma", "Vercel"],
  },
  {
    company: "PlayStation",
    position: "Front-end Engineer",
    period: "2022 — 2024",
    description: [
      "Built frontend pages and integrated real-time data pipelines for PlayStation's annual Year in Review experience — a global activation that broke platform traffic records with millions of simultaneous users and surfaced scaling infrastructure issues at launch.",
      "Served as part of the proof-of-concept initiative driving PlayStation's migration from jQuery and ERB templating to React and Next.js, with the Year in Review and email builder as the primary validation surfaces.",
      "Refactored and extended legacy jQuery/ERB component library under a collision-prone CSS architecture — restructured selector patterns to prevent cascade failures and expanded components with new layout, gradient, grid, and toggle options.",
      "Built a Next.js email campaign builder enabling marketing authors to generate email-valid HTML without engineering support, reducing content team dependency on developers for campaign production.",
      "Expanded design system documentation for AEM component handoff, clarifying implementation options for content teams and establishing more comprehensive authoring patterns.",
      "Architected and built genre pages for PlayStation.com from scratch — sections that previously did not exist on the platform.",
      "Advocated for architectural decisions in cross-functional design reviews; recommendations that were initially overruled were later validated through platform outcomes, including the full adoption of React across PlayStation.com.",
    ],
    technologies: ["JavaScript", "React", "Next.js", "jQuery", "CSS", "ERB Ruby", "TailwindCSS", "Storybook", "Netlify", "Git"],
  },
  {
    company: "Aleph Inc",
    position: "Front-end Engineer",
    period: "2021 — 2022",
    description: [
      "Introduced TypeScript across the entire firm, establishing type safety as standard practice before it became industry norm. Set architectural patterns that all subsequent projects inherited.",
      "Built and standardized a project templating system that became mandatory for all new client work, eliminating repetitive configuration and setup overhead across the team.",
      "Served as sole frontend engineer for multiple client engagements including cancer research organizations, UC Berkeley Extensions, and Peak Analytics (formerly Sienna Analytics), architecting and shipping production frontends across WordPress and Next.js.",
      "Streamlined the development process by creating a company front-end boilerplate and setting up CI/CD pipelines for multiple staging environments. ",
    ],
    technologies: ["Next.js", "React", "JavaScript", "TypeScript", "SCSS/CSS", "Mapbox", "WordPress CMS", "Postman", "Google Cloud Run", "Vercel", "Docker", "AWS", "Git"],
  },
  {
    company: "Altair Engineering",

    position: "Software Test Engineer",
    period: "2019 — 2020",
    description: [
      "Spearheaded complete redesign of testing automation infrastructure, migrating from manual hardware and software testing to fully automated API, UI, end-to-end, and unit testing across approximately 50 hardware fixtures and endpoints.",
      "Designed and integrated Postman collections into Jenkins CI/CD pipeline, ensuring consistent automated validation during cloud releases and eliminating manual physical testing workflows.",
      "Achieved 100 percent code coverage and accelerated release cycles through comprehensive test suite implementation.",
      "Created foundational testing documentation from scratch, reducing onboarding time for new team members and establishing testing standards across the organization.",
    ],
    technologies: ["Postman", "Enzyme", "Jest", "JavaScript", "Python", "Mocha/Chai", "Runscope", "Jenkins"],
  },
  {
    company: "VIDA & Co",
    position: "Web Developer",
    period: "2018 — 2019",
    description: [
      "Inherited a Shopify ecommerce platform with millions of duplicate product records in the database, costing significant monthly fees in data storage. Executed deduplication project using proper SKU management, eliminating redundant entries and reducing platform overhead.",
      "Optimized site for search engine crawling by generating XML sitemaps and implementing structural improvements, enabling proper Google indexing.",
      "Designed and built a new user-facing ecommerce dashboard with modern UI, replacing legacy interface and improving artist and customer experience.",
      "Enhanced site navigation with breadcrumb implementation, improving UX clarity and reducing user friction across product hierarchies.",
    ],
    technologies: ["Next.js", "React", "JavaScript", "CSS", "Shopify", "Git"],
  },
]

export function Experience() {
  const [activeIndex, setActiveIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const contentVariants = {
    hidden: {
      opacity: 0,
      x: 20,
      scale: PHI_INVERSE,
    },
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
      transition: {
        duration: FIBONACCI_MS.f3 / 1000,
      },
    },
  }

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
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
    <section id="experience" className="min-h-screen flex items-center justify-center px-6 py-20 relative" ref={ref}>
      <motion.div
        className="absolute top-10 right-20 w-16 h-16 border-2 border-accent/20 rounded-full"
        animate={{
          scale: [1, 1.4, 1],
          rotate: [0, 180, 360],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 left-20 w-20 h-20 bg-primary/5 rounded-2xl"
        animate={{
          rotate: [0, GOLDEN_ANGLE, GOLDEN_ANGLE * 2, 360],
          scale: [1, PHI, 1],
          x: [0, -25, 0],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/2 right-10 w-12 h-12 border border-primary/30"
        style={{ borderRadius: "40% 60% 60% 40% / 60% 40% 60% 40%" }}
        animate={{
          rotate: [360, 0],
          scale: [1, 1.3, 0.8, 1],
          y: [0, 30, -30, 0],
        }}
        transition={{
          duration: 14,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-4xl w-full">
        <div className="space-y-8">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: FIBONACCI_MS.f5 / 1000, ease: cubicBezier(EASING.golden[0], EASING.golden[1], EASING.golden[2], EASING.golden[3]), delay: FIBONACCI_MS.f3 / 1000 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              <span className="text-accent font-mono text-xl mr-2">02.</span>
              Where I've Worked
            </h2>
            <motion.div
              className="h-px bg-border"
              initial={{ width: 0 }}
              animate={isInView ? { width: "20rem" } : { width: 0 }}
              transition={{ duration: FIBONACCI_MS.f6 / 1000, ease: cubicBezier(EASING.golden[0], EASING.golden[1], EASING.golden[2], EASING.golden[3]), delay: FIBONACCI_MS.f3 / 1000 }}
            />
          </motion.div>

          <motion.div
            className="flex flex-col md:flex-row gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: FIBONACCI_MS.f5 / 1000, ease: cubicBezier(EASING.golden[0], EASING.golden[1], EASING.golden[2], EASING.golden[3]), delay: FIBONACCI_MS.f4 / 1000 }}
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
                    animate={
                      activeIndex === index
                        ? {
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }
                        : {}
                    }
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    style={{
                      backgroundSize: "200% 200%",
                    }}
                  />

                  {activeIndex === index && (
                    <motion.div
                      className="absolute inset-0 rounded-3xl"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.68 0.32 290), oklch(0.75 0.25 45), oklch(0.68 0.32 290))",
                        backgroundSize: "200% 200%",
                        padding: "2px",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                  )}

                  {activeIndex === index && (
                    <motion.div
                      className="absolute inset-0 rounded-xl blur-xl opacity-30"
                      style={{
                        background: "linear-gradient(135deg, oklch(0.68 0.32 290), oklch(0.75 0.25 45))",
                      }}
                      animate={{
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
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
                  <motion.div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: "radial-gradient(circle at 50% 50%, oklch(0.68 0.32 290 / 0.05), transparent)",
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
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
                          <motion.span
                            className="text-accent mt-1"
                            animate={{
                              x: [0, 5, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: i * 0.3,
                            }}
                          >
                            ▹
                          </motion.span>
                          <span className="text-muted-foreground leading-relaxed">{item}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {experiences[activeIndex].technologies.map((tech, i) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1 text-xs font-mono bg-accent/10 text-accent rounded-full"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: (FIBONACCI_MS.f4 + i * FIBONACCI_MS.f1) / 1000,
                            duration: FIBONACCI_MS.f3 / 1000,
                            ease: cubicBezier(EASING.spring[0], EASING.spring[1], EASING.spring[2], EASING.spring[3]),
                          }}
                          whileHover={{ scale: 1.1, rotate: 3 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
