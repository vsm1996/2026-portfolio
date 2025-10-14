"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { PHI_INVERSE, FIBONACCI_MS, EASING, PHI, GOLDEN_ANGLE } from "@/lib/animation-constants"

const experiences = [
  {
    company: "Hello Goodwin",
    position: "Senior Front-end Engineer",
    period: "2025",
    description: [
      "Engineered and stabilized core frontend architecture for a key internal platform, resolving major rendering and state management issues impacting production.",
      "Diagnosed and corrected API and schema-level inconsistencies, improving system reliability and ensuring accurate data synchronization across services.",
      "Enhanced frontend performance and DX by optimizing dependency structure, enforcing type safety, and integrating scalable configuration patterns.",
      "Built comprehensive Postman API documentation from scratch, mapping undocumented response objects to streamline developer debugging and integration.",
    ],
    technologies: ["React", "TypeScript", "Next.js", "CSS", "MantineUI", "Figma", "Vercel"],
  },
  {
    company: "PlayStation",
    position: "Front-end Engineer",
    period: "2022 — 2024",
    description: [
      "Led the successful migration of older PlayStation.com frontend from jQuery and AEM infrastructure to modern React/Next.js and Storybook infrastructure, resulting in improved site performance and maintainability. ",
      "Worked closely with designers to implement pixel-perfect UIs",
      "Maintained and enhanced various omni-channel/marketing websites and tools, contributing to increased user engagement and retention. ",
      "Coordinated the creation of the annual PlayStation year-end wrap-up, receiving positive feedback from millions of users.",
    ],
    technologies: ["JavaScript", "React", "Next.js", "jQuery", "CSS", "Ruby", "TailwindCSS", "Storybook", "Netlify", "Git"],
  },
  {
    company: "Aleph Inc",
    position: "Front-end Engineer",
    period: "2021 — 2022",
    description: [
      "Developed pixel-perfect front-end web applications connected to a headless WordPress content management system, ensuring seamless and consistent delivery of client UI designs.",
      "Implemented metrics standards (Lighthouse) in-house to improve SEO and page loading performance, resulting in a 20% increase in organic traffic. ",
      "Introduced TypeScript to the team, reducing bugs and improving code quality across projects. ",
      " Streamlined the development process by creating a company front-end boilerplate and setting up CI/CD pipelines for multiple staging environments. ",
    ],
    technologies: ["Next.js", "React", "JavaScript", "TypeScript", "SCSS/CSS", "Mapbox", "WordPress CMS", "Postman", "Google Cloud Run", "Vercel", "Docker", "AWS", "Git"],
  },
  {
    company: "Altair Engineering",
    position: "Software Test Engineer",
    period: "2019 — 2020",
    description: [
      "Spearheaded the complete redesign of testing automation from manual to fully automated API, UI end-to-end, and unit testing, achieving 100% code coverage and faster release cycles.",
      "Integrated API tests into the CI/CD process on an automated Jenkins server, ensuring consistent testing during cloud releases.",
      "Revamped automation procedures, making them more robust and user-friendly, resulting in reduced onboarding time for new team members.",
    ],
    technologies: ["Postman", "Enzyme", "Jest", "JavaScript", "Python", "Mocha/Chai", "Runscope", "Jenkins"],
  },
  {
    company: "VIDA & Co",
    position: "Web Developer",
    period: "2018 — 2019",
    description: [
      "Developed pixel-perfect UIs from mockups, managing the Shopify web application and contributing to the hiring process.",
      "Enhanced the database system, leading to faster product rebuilds and improved customer experience.",
      "Led the SEO optimization efforts, resulting in a 15% increase in organic search traffic.",
      "Created a new user-facing e-commerce dashboard with a modern UI design.",
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
        ease: EASING.golden,
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
        ease: EASING.gentle,
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
            transition={{ duration: FIBONACCI_MS.f5 / 1000, ease: EASING.golden }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              <span className="text-accent font-mono text-xl mr-2">02.</span>
              Where I've Worked
            </h2>
            <motion.div
              className="h-px bg-border"
              initial={{ width: 0 }}
              animate={isInView ? { width: "20rem" } : { width: 0 }}
              transition={{ duration: FIBONACCI_MS.f6 / 1000, ease: EASING.golden, delay: FIBONACCI_MS.f3 / 1000 }}
            />
          </motion.div>

          <motion.div
            className="flex flex-col md:flex-row gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: FIBONACCI_MS.f5 / 1000, ease: EASING.golden, delay: FIBONACCI_MS.f4 / 1000 }}
          >
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
              {experiences.map((exp, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`
                    relative px-6 py-3 rounded-xl text-left whitespace-nowrap md:whitespace-normal
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
                      absolute inset-0 rounded-xl backdrop-blur-sm
                      ${activeIndex === index
                        ? "bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20"
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
                      className="absolute inset-0 rounded-xl"
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
                <Card className="p-6 relative overflow-hidden">
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
                            ease: EASING.spring,
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
