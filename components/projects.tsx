"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ParticleField } from "@/components/particle-field"
import { AmbientCrows } from "@/components/ambient-crows"

const projects = [
  {
    title: "Harmonia UI",
    description:
      "A framework for building interfaces that adapt to a user's current cognitive, temporal, and emotional capacity. Instead of inferring or profiling users, Harmonia uses explicit inputs to derive coherent interface modes that affect layout density, content length, motion, and tone.",
    technologies: ["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion"],
    github: "https://github.com/vsm1996/harmonia-ui",
    live: "https://harmonia-ui.vercel.app/",
  },
  {
    title: "Renge UI",
    description:
      "A design system built on natural mathematics. PHI, Fibonacci, and phyllotaxis — the ratios that appear in every living thing — expressed as a complete token system. Six color profiles, a live proportional scale, and 18 React components. Every token derived. Nothing arbitrary.",
    technologies: ["Next.js", "TypeScript", "React", "TailwindCSS"],
    github: "https://github.com/vsm1996/renge",
    live: "https://renge-ui.vercel.app/",
  },
  {
    title: "Grove",
    description:
      "A career intelligence system that scores job opportunities on alignment, energy cost, signal strength, and positioning gaps instead of just tracking application status.",
    technologies: ["React", "Next.js", "TypeScript", "TailwindCSS", "Supabase"],
    github: "https://github.com/vsm1996/grove",
    live: "https://grove-intel.vercel.app",
  },
  {
    title: "PlayStation",
    description:
      "Frontend engineering for a leading gaming platform — branding, product surfaces, and community-first design at scale.",
    technologies: ["JavaScript", "React", "Next.js", "TailwindCSS", "Ruby", "Storybook"],
    live: "https://www.playstation.com/",
  },
  {
    title: "Hello Goodwin",
    description:
      "Stabilized and owned the core frontend architecture for a private charter aviation platform. Resolved major rendering and state management issues impacting production.",
    technologies: ["Next.js", "TypeScript", "MantineUI", "React", "Figma"],
    live: "https://app.hellogoodwin.com/",
  },
  {
    title: "Nium",
    description:
      "Website redesign for a global fintech company, modernizing their online presence and design language.",
    technologies: ["Next.js", "React", "SCSS", "Node.js"],
    live: "https://www.nium.com/",
  },
  {
    title: "The Traveler",
    description:
      "Curated travel and aviation news via the New York Times API, presented in a clean editorial interface.",
    technologies: ["React", "Next.js", "TailwindCSS", "JavaScript"],
    github: "https://github.com/vsm1996/the-traveler",
    live: "https://thetraveler.vercel.app/",
  },
  {
    title: "Anime Sync Circle",
    description:
      "A group watchlist planner for anime. Real-time coordination for friend circles planning watch parties together.",
    technologies: ["React", "Next.js", "TailwindCSS", "PartyKit"],
    live: "https://anime-sync-circle.vercel.app/",
  },
]

interface ProjectCardProps {
  project: typeof projects[number]
  index: number
  isContainerInView: boolean
}

function ProjectCard({ project, index, isContainerInView }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={isContainerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "var(--itachi-surface)",
        border: `1px solid ${hovered ? "var(--itachi-sharingan)" : "var(--itachi-crow)"}`,
        borderRadius: "var(--radius)",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        // Floating-in-darkness shadow
        boxShadow: hovered
          ? "0 0 0 1px var(--itachi-sharingan), 0 8px 40px oklch(0.04 0.02 270 / 0.8)"
          : "0 4px 24px oklch(0.04 0.02 270 / 0.6)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Title */}
      <h3
        style={{
          color: "var(--itachi-text)",
          fontWeight: 300,
          fontSize: "1.125rem",
          letterSpacing: "0.12em",
        }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        style={{
          color: "var(--itachi-subtle)",
          fontSize: "0.9rem",
          lineHeight: "1.75",
          letterSpacing: "0.01em",
          fontWeight: 300,
        }}
      >
        {project.description}
      </p>

      {/* Tech stack */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {project.technologies.map((tech) => (
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
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "1.5rem", marginTop: "auto", paddingTop: "0.25rem" }}>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="itachi-link"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 300,
            }}
          >
            GitHub
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="itachi-link"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 300,
            }}
          >
            Live
          </a>
        )}
      </div>
    </motion.article>
  )
}

export function Projects() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section
      id="projects"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-8 py-32 relative overflow-hidden"
      style={{ backgroundColor: "var(--itachi-base)" }}
    >
      <ParticleField count={20} />
      <AmbientCrows />
      <div className="max-w-5xl w-full relative" style={{ zIndex: 1 }}>

        {/* Section title — same treatment as About */}
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
          Projects
        </motion.h2>

        {/* 2-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 420px), 1fr))",
            gap: "1.75rem",
          }}
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              isContainerInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
