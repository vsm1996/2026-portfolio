"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FIBONACCI_MS, EASING } from "@/lib/animation-constants"
import { cubicBezier } from "framer-motion"

export function Navigation() {
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      const sections = ["home", "about", "experience", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" })
    }
  }

  const navItems = [
    { id: "about",      label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects",   label: "Projects" },
    { id: "contact",    label: "Contact" },
  ]

  const colorTransition = prefersReducedMotion ? "none" : "color 200ms ease, opacity 200ms ease"

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: FIBONACCI_MS.f5 / 1000,
        ease: cubicBezier(EASING.golden[0], EASING.golden[1], EASING.golden[2], EASING.golden[3]),
      }}
    >
      {/* Blur seeps in only when scrolled — darkness by default */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          backgroundColor: scrolled ? "oklch(0.08 0.02 270 / 0.75)" : "transparent",
          borderBottom: scrolled ? "1px solid oklch(0.20 0.05 270 / 0.35)" : "1px solid transparent",
          transition: prefersReducedMotion
            ? "none"
            : "backdrop-filter 400ms ease, background-color 400ms ease, border-color 400ms ease",
          pointerEvents: "none",
        }}
      />

      <div className="relative w-full px-8 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">

          {/* Logo — VSM, floating in darkness */}
          <button
            onClick={() => scrollToSection("home")}
            style={{
              color: "oklch(0.90 0.02 270)",
              fontSize: "0.6875rem",
              fontWeight: 300,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              background: "none",
              border: "none",
              cursor: "none",
              padding: 0,
              transition: colorTransition,
            }}
          >
            VSM
          </button>

          {/* Nav items — flat text, no container */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  style={{
                    position: "relative",
                    color: isActive ? "oklch(0.45 0.18 20)" : "oklch(0.50 0.03 270)",
                    fontSize: "0.6875rem",
                    fontWeight: 300,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    background: "none",
                    border: "none",
                    cursor: "none",
                    padding: "0 0 4px",
                    transition: colorTransition,
                  }}
                >
                  {item.label}
                  {/* Thin crimson underline for active state */}
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "1px",
                      backgroundColor: "var(--itachi-sharingan)",
                      opacity: isActive ? 0.5 : 0,
                      transition: prefersReducedMotion ? "none" : "opacity 200ms ease",
                    }}
                  />
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
