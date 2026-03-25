"use client"

// Ambient crow watchers — stationary sentinels at section edges.
// 8–12% opacity. Slow wing beat every 3–4s.
// Itachi's crows don't perform. They watch.

import { motion, useReducedMotion } from "framer-motion"
import {
  CROW_VIEWBOX, CROW_H_RATIO,
  WING_L_UP, WING_L_DOWN,
  WING_R_UP, WING_R_DOWN,
  BODY, HEAD, TAIL_UPPER, TAIL_LOWER,
} from "@/lib/crow-paths"

interface AmbientCrow {
  id: number
  size: number
  opacity: number
  facingLeft: boolean
  top?: string
  bottom?: string
  left?: string
  right?: string
  rotate?: number
  wingPeriod: number  // seconds per beat
  beatOffset: number  // delay before first beat
}

// Positioned at edges — watching without performing.
// Dark blue-purple iridescence: oklch(0.18 0.04 270)
const AMBIENT_CROWS: AmbientCrow[] = [
  // Top-left, facing right, slight tilt
  {
    id: 0, size: 52, opacity: 0.09, facingLeft: false,
    top: "8%", left: "3%", rotate: -8,
    wingPeriod: 3.6, beatOffset: 0,
  },
  // Bottom-right, facing left
  {
    id: 1, size: 44, opacity: 0.08, facingLeft: true,
    bottom: "12%", right: "4%", rotate: 5,
    wingPeriod: 4.1, beatOffset: 1.3,
  },
  // Top-right, smaller, facing left
  {
    id: 2, size: 34, opacity: 0.07, facingLeft: true,
    top: "18%", right: "8%", rotate: -12,
    wingPeriod: 3.2, beatOffset: 2.1,
  },
]

function AmbientCrowSVG({ crow, reduced }: { crow: AmbientCrow; reduced: boolean }) {
  const { size, opacity, facingLeft, top, bottom, left, right, rotate = 0, wingPeriod, beatOffset } = crow

  // Slow single beat: rest → up → down → rest
  // Wings spend most time at rest (neutral), brief beat every wingPeriod seconds
  const beatDuration = 0.55  // total beat duration
  const restDuration = wingPeriod - beatDuration

  const wingTransition = reduced
    ? { duration: 0 }
    : {
        duration: beatDuration / 2,
        ease: "easeInOut" as const,
        repeat: Infinity,
        repeatType: "reverse" as const,
        repeatDelay: restDuration / 2,
        delay: beatOffset,
      }

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top,
        bottom,
        left,
        right,
        width: size,
        height: size * CROW_H_RATIO,
        pointerEvents: "none",
        opacity,
        transform: `rotate(${rotate}deg) scaleX(${facingLeft ? -1 : 1})`,
      }}
    >
      <svg
        viewBox={CROW_VIEWBOX}
        width={size}
        height={size * CROW_H_RATIO}
        style={{ overflow: "visible" }}
      >
        {/* Left wing */}
        {reduced ? (
          <path d={WING_L_UP} fill="oklch(0.18 0.04 270)" />
        ) : (
          <motion.path
            d={WING_L_UP}
            fill="oklch(0.18 0.04 270)"
            animate={{ d: [WING_L_UP, WING_L_DOWN] }}
            transition={wingTransition}
          />
        )}

        {/* Right wing */}
        {reduced ? (
          <path d={WING_R_UP} fill="oklch(0.18 0.04 270)" />
        ) : (
          <motion.path
            d={WING_R_UP}
            fill="oklch(0.18 0.04 270)"
            animate={{ d: [WING_R_UP, WING_R_DOWN] }}
            transition={wingTransition}
          />
        )}

        <path d={BODY}       fill="oklch(0.15 0.03 270)" />
        <path d={HEAD}       fill="oklch(0.15 0.03 270)" />
        <path d={TAIL_UPPER} fill="oklch(0.15 0.03 270)" />
        <path d={TAIL_LOWER} fill="oklch(0.15 0.03 270)" />
      </svg>
    </div>
  )
}

interface AmbientCrowsProps {
  className?: string
}

export function AmbientCrows({ className }: AmbientCrowsProps) {
  const reduced = !!useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {AMBIENT_CROWS.map((crow) => (
        <AmbientCrowSVG key={crow.id} crow={crow} reduced={reduced} />
      ))}
    </div>
  )
}
