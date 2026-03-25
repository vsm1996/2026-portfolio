"use client"

// Sharingan cursor — the eye that sees everything.
// Outer ring + pupil stay fixed. Tomoe revolve continuously.
// In Tsukuyomi: tomoe invert to near-white (the genjutsu looking back).
// On hover: rotation doubles — focus sharpening on a target.
// Trail: 3 ghost cursors, progressively transparent afterimages.

import { motion, useMotionValue, useSpring, MotionValue } from "framer-motion"
import { useEffect, useState, useRef } from "react"

// Three tomoe arranged 120° apart around the pupil.
// Each tomoe is a teardrop/comma shape in a local coordinate system,
// then rotated into position. Drawn at r=6 from center (in 24px space).
// A tomoe: small circle (head) + tapering tail curving inward.
function Tomoe({ angle, color }: { angle: number; color: string }) {
  // Head center at r=6, tail curves toward center
  const RAD = (angle * Math.PI) / 180
  const r = 6
  const hx = r * Math.cos(RAD)
  const hy = r * Math.sin(RAD)

  // Tail curves from head back toward center, then arcs away
  // Creates the classic comma/magatama shape
  const tx = (r * 0.3) * Math.cos(RAD + Math.PI * 0.55)
  const ty = (r * 0.3) * Math.sin(RAD + Math.PI * 0.55)
  const cx1 = hx * 0.4
  const cy1 = hy * 0.4
  const cx2 = tx * 1.6
  const cy2 = ty * 1.6

  return (
    <g>
      {/* Head — filled circle */}
      <circle cx={hx} cy={hy} r={1.6} fill={color} />
      {/* Tail — curved stroke from head toward center and around */}
      <path
        d={`M ${hx} ${hy} C ${cx1} ${cy1} ${cx2} ${cy2} ${tx} ${ty}`}
        fill="none"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </g>
  )
}

interface SharinganSVGProps {
  size: number
  tomoeColor: string
  opacity?: number
}

function SharinganSVG({ size, tomoeColor, opacity = 1 }: SharinganSVGProps) {
  const half = size / 2
  return (
    <svg
      width={size}
      height={size}
      viewBox={`${-half} ${-half} ${size} ${size}`}
      style={{ display: "block", opacity }}
    >
      {/* Outer ring */}
      <circle
        cx={0} cy={0} r={half - 1}
        fill="none"
        stroke="var(--itachi-sharingan)"
        strokeWidth="1"
      />
      {/* Inner iris ring — subtle */}
      <circle
        cx={0} cy={0} r={half * 0.55}
        fill="none"
        stroke="var(--itachi-sharingan)"
        strokeWidth="0.5"
        opacity={0.4}
      />
      {/* Pupil */}
      <circle cx={0} cy={0} r={half * 0.22} fill="oklch(0.06 0.02 270)" />
      {/* Tomoe — rendered at fixed angles; parent group rotates */}
      <Tomoe angle={-90}  color={tomoeColor} />
      <Tomoe angle={30}   color={tomoeColor} />
      <Tomoe angle={150}  color={tomoeColor} />
    </svg>
  )
}

// ─── Trail ghost ──────────────────────────────────────────────────────────────

interface TrailGhostProps {
  x: ReturnType<typeof useSpring>
  y: ReturnType<typeof useSpring>
  size: number
  opacity: number
  tomoeColor: string
  rotateValue: MotionValue<number>
}

function TrailGhost({ x, y, size, opacity, tomoeColor, rotateValue }: TrailGhostProps) {
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        x,
        y,
        width: size,
        height: size,
        pointerEvents: "none",
        zIndex: 9997,
        rotate: rotateValue,
      }}
    >
      <SharinganSVG size={size} tomoeColor={tomoeColor} opacity={opacity} />
    </motion.div>
  )
}

// ─── Main cursor ─────────────────────────────────────────────────────────────

export function Cursor() {
  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)

  const [hovering, setHovering] = useState(false)
  const [inTsukuyomi, setInTsukuyomi] = useState(false)
  const [mounted, setMounted] = useState(false)

  const size = hovering ? 32 : 24
  const half = size / 2

  // Main cursor — tight spring
  const x = useSpring(rawX, { stiffness: 500, damping: 40 })
  const y = useSpring(rawY, { stiffness: 500, damping: 40 })

  // Trail springs — progressively looser = more lag = more "afterimage"
  const x1 = useSpring(rawX, { stiffness: 260, damping: 34 })
  const y1 = useSpring(rawY, { stiffness: 260, damping: 34 })
  const x2 = useSpring(rawX, { stiffness: 160, damping: 30 })
  const y2 = useSpring(rawY, { stiffness: 160, damping: 30 })
  const x3 = useSpring(rawX, { stiffness: 90,  damping: 26 })
  const y3 = useSpring(rawY, { stiffness: 90,  damping: 26 })

  // Rotation — driven by RAF so it increments continuously
  const rotDeg = useMotionValue(0)
  const rot1   = useMotionValue(0)
  const rot2   = useMotionValue(0)
  const rot3   = useMotionValue(0)
  const rafRef = useRef<number>(0)
  const lastRef = useRef<number | null>(null)

  // Normal: 3s/rev = 120°/s. Hover: 1.5s/rev = 240°/s.
  const SPEED_NORMAL = 120  // deg/sec
  const SPEED_HOVER  = 240  // deg/sec
  const hoveringRef = useRef(false)

  useEffect(() => {
    hoveringRef.current = hovering
  }, [hovering])

  useEffect(() => {
    setMounted(true)

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX - half)
      rawY.set(e.clientY - half)
    }

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element
      const isInteractive = !!el.closest('a, button, [role="button"]')
      setHovering(isInteractive)

      // Detect Tsukuyomi section
      const tsukSection = el.closest("#about")
      setInTsukuyomi(!!tsukSection)
    }

    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseover", onOver)

    // RAF rotation loop
    const tick = (ts: number) => {
      if (lastRef.current !== null) {
        const dt = (ts - lastRef.current) / 1000
        const speed = hoveringRef.current ? SPEED_HOVER : SPEED_NORMAL
        const delta = speed * dt
        rotDeg.set(rotDeg.get() + delta)
        rot1.set(rot1.get() + delta)
        rot2.set(rot2.get() + delta)
        rot3.set(rot3.get() + delta)
      }
      lastRef.current = ts
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onOver)
      cancelAnimationFrame(rafRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update offset when size changes
  useEffect(() => {
    // Re-center on size change — snap offset
    rawX.set(rawX.get() - (hovering ? 4 : -4))
    rawY.set(rawY.get() - (hovering ? 4 : -4))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size])

  if (!mounted) return null

  const tomoeColor = inTsukuyomi
    ? "oklch(0.95 0.02 350)"   // near-white — genjutsu inversion
    : "var(--itachi-sharingan)" // default crimson

  const trailSize = size * 0.85

  return (
    <>
      {/* Trail ghost 1 — 15% opacity */}
      <TrailGhost x={x1} y={y1} size={trailSize} opacity={0.15} tomoeColor={tomoeColor} rotateValue={rot1} />
      {/* Trail ghost 2 — 8% opacity */}
      <TrailGhost x={x2} y={y2} size={trailSize * 0.9} opacity={0.08} tomoeColor={tomoeColor} rotateValue={rot2} />
      {/* Trail ghost 3 — 3% opacity */}
      <TrailGhost x={x3} y={y3} size={trailSize * 0.8} opacity={0.03} tomoeColor={tomoeColor} rotateValue={rot3} />

      {/* Main cursor */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x,
          y,
          width: size,
          height: size,
          pointerEvents: "none",
          zIndex: 9999,
          rotate: rotDeg,
          transition: "width 0.15s ease, height 0.15s ease",
        }}
      >
        <SharinganSVG size={size} tomoeColor={tomoeColor} />
      </motion.div>
    </>
  )
}
