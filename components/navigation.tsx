"use client"

import { useState, useEffect } from "react"
import { cubicBezier, motion } from "framer-motion"
import { FIBONACCI_MS, EASING } from "@/lib/animation-constants"


export function Navigation() {
  const [activeSection, setActiveSection] = useState("home")
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
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

  // Tsukuyomi is now dark blood-orange — no inversion needed.
  // Navbar stays consistently dark across all sections.

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
      <div
        className="w-full px-8 py-5"
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          backgroundColor: "oklch(0.08 0.02 270 / 0.85)",
          borderBottom: "1px solid oklch(0.25 0.06 270 / 0.45)",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="text-xs font-light tracking-[0.25em] uppercase"
            style={{ color: "oklch(0.90 0.02 270)" }}
          >
            VSM
          </button>

          {/* Nav items */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-xs tracking-[0.12em] uppercase"
                  style={{
                    color: isActive
                      ? "oklch(0.90 0.02 270)"
                      : "oklch(0.55 0.03 270)",
                    transition: prefersReducedMotion ? "none" : "color 150ms ease",
                  }}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
