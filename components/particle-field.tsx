"use client"

// Scanning particle field — dust in undisturbed air.
// Not stars. Not sparkles. Irregular dots drifting slowly right and up.
// Opacity 5-8%. Present in dark sections only.

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  opacity: number
  vx: number
  vy: number
}

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    // Irregular: mostly small, occasionally slightly larger
    size: Math.random() < 0.8 ? Math.random() * 1.2 + 0.4 : Math.random() * 2 + 1,
    opacity: Math.random() * 0.03 + 0.03, // 3–6%
    // Drift rightward and upward, very slowly
    vx: Math.random() * 0.08 + 0.02,
    vy: -(Math.random() * 0.06 + 0.01),
  }
}

interface ParticleFieldProps {
  count?: number
  className?: string
}

export function ParticleField({ count = 22, className }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Respect reduced motion — no animation, no canvas
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
      // Reinitialize particles on resize
      particlesRef.current = Array.from({ length: count }, () =>
        createParticle(canvas.width, canvas.height)
      )
    }

    resize()

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    // oklch(0.35 0.06 270) ≈ rgba(78, 70, 118) — crow iridescent dust
    const draw = () => {
      if (!canvas.width || !canvas.height) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particlesRef.current) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(78, 70, 118, ${p.opacity})`
        ctx.fill()

        // Drift
        p.x += p.vx
        p.y += p.vy

        // Wrap: exit right → re-enter left, exit top → re-enter bottom
        if (p.x > canvas.width + 2) p.x = -2
        if (p.y < -2) p.y = canvas.height + 2
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  )
}
