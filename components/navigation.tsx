"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { cubicBezier, motion } from "framer-motion"
import { FIBONACCI_MS, EASING, PHI_INVERSE } from "@/lib/animation-constants"

export function Navigation() {
  const [activeSection, setActiveSection] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

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

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: FIBONACCI_MS.f5 / 1000,
        ease: cubicBezier(EASING.golden[0], EASING.golden[1], EASING.golden[2], EASING.golden[3]),
        staggerChildren: FIBONACCI_MS.f1 / 1000,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -20, scale: PHI_INVERSE },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: FIBONACCI_MS.f3 / 1000,
        ease: cubicBezier(EASING.gentle[0], EASING.gentle[1], EASING.gentle[2], EASING.gentle[3]),
      },
    },
  }

  return (
    <motion.nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${isScrolled ? "w-auto" : "w-auto"
        }`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className={`px-6 py-3 rounded-full backdrop-blur-xl border transition-all duration-300 relative overflow-hidden ${isScrolled ? "bg-background/60 border-border/50 shadow-lg" : "bg-background/40 border-border/30"
          }`}
        animate={{
          scale: isScrolled ? 1 : 1.02,
        }}
        transition={{ duration: FIBONACCI_MS.f3 / 1000 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent, oklch(0.68 0.32 290 / 0.1), transparent)",
          }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <div className="flex items-center gap-1 relative z-10">
          <motion.button
            onClick={() => scrollToSection("home")}
            className="text-lg font-semibold text-foreground hover:text-accent transition-colors px-3"
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              y: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
          >
            VSM
          </motion.button>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, i) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                custom={i}
                whileHover={{ y: -2 }}
                animate={{
                  y: activeSection === item.id ? [0, -3, 0] : 0,
                }}
                transition={{
                  y: {
                    duration: 2,
                    repeat: activeSection === item.id ? Number.POSITIVE_INFINITY : 0,
                    ease: "easeInOut",
                  },
                }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm transition-colors rounded-full ${activeSection === item.id
                      ? "text-accent bg-accent/10"
                      : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {item.label}
                </Button>
              </motion.div>
            ))}
            {/* <motion.div className="ml-2" variants={itemVariants} whileHover={{ rotate: 180, scale: 1.1 }}>
              <ThemeToggle />
            </motion.div> */}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  )
}
