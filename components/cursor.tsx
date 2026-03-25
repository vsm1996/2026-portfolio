"use client"

// Custom cursor — small circle with spring lag.
// Itachi is always slightly ahead of where you think he's looking.
// Fills with sharingan crimson when hovering a target.

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

export function Cursor() {
  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)
  const [hovering, setHovering] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Spring lag — deliberate delay, like attention that's already moved on
  const x = useSpring(rawX, { stiffness: 420, damping: 38 })
  const y = useSpring(rawY, { stiffness: 420, damping: 38 })

  useEffect(() => {
    setMounted(true)

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX - 6)
      rawY.set(e.clientY - 6)
    }

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element
      setHovering(!!el.closest('a, button, article, [role="button"]'))
    }

    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseover", onOver)

    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onOver)
    }
  }, [rawX, rawY])

  if (!mounted) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        x,
        y,
        width: hovering ? 16 : 12,
        height: hovering ? 16 : 12,
        borderRadius: "50%",
        backgroundColor: hovering ? "var(--itachi-sharingan)" : "transparent",
        border: `1px solid ${hovering ? "var(--itachi-sharingan)" : "var(--itachi-crow)"}`,
        pointerEvents: "none",
        zIndex: 9999,
        // CSS transition for the fill/size — not FM, since we're using oklch vars
        transition: "width 0.15s ease, height 0.15s ease, background-color 0.15s ease, border-color 0.15s ease",
      }}
    />
  )
}
