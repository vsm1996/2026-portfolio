"use client"

// Experience — minimal timeline.
// Almost invisible structure. Information present but not performing.
// The work speaks. The design stays out of the way.

import { useState } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef } from "react"
import { ParticleField } from "@/components/particle-field"

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
      "Led the successful migration of PlayStation.com from jQuery and AEM to React/Next.js and Storybook, improving performance and maintainability at scale.",
      "Worked closely with designers to implement pixel-perfect UIs across omni-channel marketing surfaces.",
      "Maintained and enhanced various marketing websites and tools, contributing to increased user engagement and retention.",
      "Coordinated the creation of the annual PlayStation year-end wrap-up, received positively by millions of users.",
    ],
    technologies: ["JavaScript", "React", "Next.js", "jQuery", "CSS", "Ruby", "TailwindCSS", "Storybook", "Netlify"],
  },
  {
    company: "Aleph Inc",
    position: "Front-end Engineer",
    period: "2021 — 2022",
    description: [
      "Developed pixel-perfect frontend applications connected to a headless WordPress CMS, ensuring seamless delivery of client UI designs.",
      "Implemented Lighthouse metrics standards in-house to improve SEO and page loading performance — 20% increase in organic traffic.",
      "Introduced TypeScript to the team, reducing bugs and improving code quality across projects.",
      "Streamlined development by creating a company frontend boilerplate and setting up CI/CD pipelines for multiple staging environments.",
    ],
    technologies: ["Next.js", "React", "TypeScript", "SCSS", "Mapbox", "WordPress CMS", "Google Cloud Run", "Docker", "AWS"],
  },
  {
    company: "Altair Engineering",
    position: "Software Test Engineer",
    period: "2019 — 2020",
    description: [
      "Spearheaded the complete redesign of testing from manual to fully automated API, UI end-to-end, and unit testing — 100% code coverage.",
      "Integrated API tests into the CI/CD process on Jenkins, ensuring consistent testing during cloud releases.",
      "Revamped automation procedures for robustness and usability, reducing onboarding time for new team members.",
    ],
    technologies: ["Postman", "Enzyme", "Jest", "JavaScript", "Python", "Mocha/Chai", "Jenkins"],
  },
  {
    company: "VIDA & Co",
    position: "Web Developer",
    period: "2018 — 2019",
    description: [
      "Developed pixel-perfect UIs from mockups, managing the Shopify web application and contributing to the hiring process.",
      "Enhanced the database system, leading to faster product rebuilds and improved customer experience.",
      "Led SEO optimization efforts — 15% increase in organic search traffic.",
    ],
    technologies: ["Next.js", "React", "JavaScript", "CSS", "Shopify"],
  },
]

export function Experience() {
  const [activeIndex, setActiveIndex] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const active = experiences[activeIndex]

  return (
    <section
      id="experience"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-8 py-32 relative overflow-hidden"
      style={{ backgroundColor: "var(--itachi-base)" }}
    >
      <ParticleField count={16} />

      <div className="max-w-5xl w-full relative" style={{ zIndex: 1 }}>

        {/* Section title */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            color: "var(--itachi-text)",
            fontWeight: 300,
            letterSpacing: "0.2em",
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            marginBottom: "4rem",
            textShadow: "0 0 20px oklch(0.15 0.03 270)",
          }}
        >
          Experience
        </motion.h2>

        <motion.div
          className="flex flex-col md:flex-row gap-12"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Company list — minimal vertical tabs */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              minWidth: "160px",
              borderLeft: "1px solid var(--itachi-border)",
            }}
          >
            {experiences.map((exp, i) => {
              const isActive = activeIndex === i
              return (
                <button
                  key={exp.company}
                  onClick={() => setActiveIndex(i)}
                  style={{
                    position: "relative",
                    padding: "0.75rem 1.25rem",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    cursor: "none",
                    color: isActive ? "var(--itachi-text)" : "var(--itachi-ghost)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    fontWeight: 300,
                    transition: "color 150ms ease",
                  }}
                >
                  {/* Active indicator — thin crimson left bar */}
                  <span
                    style={{
                      position: "absolute",
                      left: "-1px",
                      top: 0,
                      bottom: 0,
                      width: "1px",
                      backgroundColor: "var(--itachi-sharingan)",
                      opacity: isActive ? 0.7 : 0,
                      transition: "opacity 150ms ease",
                    }}
                  />
                  {exp.company}
                </button>
              )
            })}
          </div>

          {/* Content panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ flex: 1 }}
            >
              {/* Role + period */}
              <div style={{ marginBottom: "1.5rem" }}>
                <p
                  style={{
                    color: "var(--itachi-text)",
                    fontWeight: 300,
                    fontSize: "1.0625rem",
                    letterSpacing: "0.06em",
                    marginBottom: "0.35rem",
                  }}
                >
                  {active.position}
                  <span style={{ color: "var(--itachi-sharingan)", marginLeft: "0.5em" }}>
                    @ {active.company}
                  </span>
                </p>
                <p
                  style={{
                    color: "var(--itachi-ghost)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.12em",
                    fontFamily: "var(--font-mono, monospace)",
                  }}
                >
                  {active.period}
                </p>
              </div>

              {/* Description */}
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {active.description.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      color: "var(--itachi-subtle)",
                      fontSize: "0.9rem",
                      lineHeight: "1.75",
                      fontWeight: 300,
                    }}
                  >
                    <span
                      style={{
                        color: "var(--itachi-sharingan)",
                        opacity: 0.6,
                        flexShrink: 0,
                        marginTop: "0.1em",
                        fontSize: "0.6rem",
                        letterSpacing: "0.05em",
                      }}
                    >
                      ▸
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Tech tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {active.technologies.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontSize: "0.6875rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      fontFamily: "var(--font-mono, monospace)",
                      color: "var(--itachi-ghost)",
                      border: "1px solid var(--itachi-border)",
                      borderRadius: "2px",
                      padding: "0.2rem 0.5rem",
                      fontWeight: 300,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
