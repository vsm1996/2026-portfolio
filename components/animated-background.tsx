"use client"

import type React from "react"
import { motion } from "framer-motion"
import { GOLDEN_ANGLE } from "@/lib/animation-constants"

/*
 * BREATHING EASING
 * [0.37, 0, 0.63, 1] = EASING.breathing from animation-constants
 * Organic inhale/exhale — slow start, slow end, fluid mid.
 */
const BREATH = [0.37, 0, 0.63, 1] as const

/*
 * FIBONACCI BREATHING PERIODS (seconds)
 * Every element breathes at one of these intervals.
 * Stagger delays are also Fibonacci — so phases never perfectly align,
 * creating the "one organism, different rhythms" feel.
 */
const F = { s5: 5, s8: 8, s13: 13, s21: 21 }

/*
 * breathe() — shared animation factory
 * scaleAmp: how much scale expands at peak (0.05 = 5% larger)
 * opMin/opMax: opacity range
 * duration: Fibonacci second
 * delay: Fibonacci second offset
 */
function breathe(
  opMin: number,
  opMax: number,
  duration: number,
  delay = 0,
  scaleAmp = 0.05
) {
  return {
    animate: {
      opacity: [opMin, opMax, opMin],
      scale: [1, 1 + scaleAmp, 1],
    },
    transition: {
      duration,
      repeat: Number.POSITIVE_INFINITY,
      ease: BREATH,
      delay,
      times: [0, 0.5, 1],
    },
  }
}

function LotusFlower({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={style}>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <ellipse
          key={i}
          cx="100" cy="100" rx="35" ry="60"
          fill="none" stroke="currentColor" strokeWidth="1.5" opacity={0.6}
          transform={`rotate(${(i * 360) / 7} 100 100)`}
        />
      ))}
      <circle cx="100" cy="100" r="15" fill="none" stroke="currentColor" strokeWidth="1.5" opacity={0.8} />
    </svg>
  )
}

function Triangle({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style}>
      <polygon points="50,10 90,80 10,80" fill="none" stroke="currentColor" strokeWidth="2" opacity={0.6} />
    </svg>
  )
}

function FlowerOfLife({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={style}>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i * 60 * Math.PI) / 180
        return (
          <circle
            key={i}
            cx={100 + 30 * Math.cos(angle)}
            cy={100 + 30 * Math.sin(angle)}
            r="30" fill="none" stroke="currentColor" strokeWidth="1" opacity={0.5}
          />
        )
      })}
      <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="1" opacity={0.6} />
    </svg>
  )
}

function Mandala({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={style}>
      <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" opacity={0.4} />
      <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" opacity={0.5} />
      <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1" opacity={0.6} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i * 45 * Math.PI) / 180
        return (
          <line
            key={i}
            x1={100 + 40 * Math.cos(angle)} y1={100 + 40 * Math.sin(angle)}
            x2={100 + 80 * Math.cos(angle)} y2={100 + 80 * Math.sin(angle)}
            stroke="currentColor" strokeWidth="1" opacity={0.5}
          />
        )
      })}
    </svg>
  )
}

function Leaf({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style}>
      <path
        d="M 50 10 Q 70 30, 75 50 Q 70 70, 50 90 Q 30 70, 25 50 Q 30 30, 50 10 M 50 10 L 50 90"
        fill="none" stroke="currentColor" strokeWidth="1.5" opacity={0.6}
      />
    </svg>
  )
}

export function AnimatedBackground() {
  return (
    <div className="hidden lg:block fixed inset-0 pointer-events-none overflow-hidden z-0">

      {/*
       * TIDE — the deep ocean floor
       * Slowest breath (21s). Large, very low opacity.
       * The whole page sits on this.
       */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[70vh]"
        style={{
          background: "linear-gradient(to top, oklch(0.75 0.22 285 / 0.05) 0%, transparent 100%)",
          filter: "blur(60px)",
        }}
        {...breathe(0.5, 0.9, F.s21, 0, 0.02)}
      />

      {/*
       * CONIC GRADIENT ORB — the solar plexus
       * Slow spin (linear, 34s) + breathing scale/opacity (13s, delay 0)
       * This is the largest single element — the center of gravity.
       */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px]"
        style={{
          background: `conic-gradient(
            from 0deg,
            oklch(0.75 0.22 285 / 0.18) 0deg,
            oklch(0.68 0.18 295 / 0.18) 60deg,
            oklch(0.72 0.18 60 / 0.18) 120deg,
            oklch(0.7 0.18 270 / 0.18) 180deg,
            oklch(0.72 0.16 290 / 0.18) 240deg,
            oklch(0.75 0.2 280 / 0.18) 300deg,
            oklch(0.75 0.22 285 / 0.18) 360deg
          )`,
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.08, 1],
          opacity: [0.12, 0.20, 0.12],
        }}
        transition={{
          rotate: { duration: 34, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: F.s13, repeat: Number.POSITIVE_INFINITY, ease: BREATH, times: [0, 0.5, 1] },
          opacity: { duration: F.s13, repeat: Number.POSITIVE_INFINITY, ease: BREATH, times: [0, 0.5, 1] },
        }}
      />

      {/*
       * LARGE RADIAL ORB — secondary lung
       * Breathes at 21s, delay 5s (Fibonacci offset from conic orb)
       * Drifts gently — small amplitude, long period. Like a jellyfish.
       */}
      <motion.div
        className="absolute bottom-1/3 left-1/2 w-64 h-64 rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.75 0.22 285 / 0.14) 0%, oklch(0.72 0.18 60 / 0.08) 50%, transparent 70%)",
          boxShadow: "0 0 80px oklch(0.75 0.22 285 / 0.12)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, -18, 0],
          y: [0, 12, 0],
          scale: [1, 1.10, 1],
          opacity: [0.28, 0.45, 0.28],
        }}
        transition={{
          duration: F.s21,
          repeat: Number.POSITIVE_INFINITY,
          ease: BREATH,
          delay: 5,
          times: [0, 0.5, 1],
        }}
      />

      {/*
       * FLOWER OF LIFE — heartbeat
       * 13s breathing (delay 2s). Barely rotates — just breathes.
       */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-48 h-48"
        style={{
          color: "oklch(0.68 0.18 295 / 0.3)",
          filter: "drop-shadow(0 0 20px oklch(0.68 0.18 295 / 0.12))",
        }}
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.22, 0.36, 0.22],
          rotate: [0, GOLDEN_ANGLE / 8, 0],
        }}
        transition={{
          duration: F.s13,
          repeat: Number.POSITIVE_INFINITY,
          ease: BREATH,
          delay: 2,
          times: [0, 0.5, 1],
        }}
      >
        <FlowerOfLife className="w-full h-full" />
      </motion.div>

      {/*
       * LOTUS FLOWER — surface wave
       * 8s floating + breathing (delay 3s).
       * Smaller period = more frequent — like ripples on the surface.
       */}
      <motion.div
        className="absolute bottom-1/3 right-1/3 w-32 h-32"
        style={{
          color: "oklch(0.7 0.18 270 / 0.32)",
          filter: "drop-shadow(0 0 14px oklch(0.7 0.18 270 / 0.15))",
        }}
        animate={{
          y: [0, -12, 0],
          scale: [1, 1.07, 1],
          opacity: [0.26, 0.40, 0.26],
        }}
        transition={{
          duration: F.s8,
          repeat: Number.POSITIVE_INFINITY,
          ease: BREATH,
          delay: 3,
          times: [0, 0.5, 1],
        }}
      >
        <LotusFlower className="w-full h-full" />
      </motion.div>

      {/*
       * MANDALA — deep rotation + 13s breath (delay 8s)
       * Counter-clockwise slow spin. Breathes on the long cycle.
       * Delay 8 (Fibonacci) means it peaks just as the conic orb is exhaling.
       */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-36 h-36"
        style={{
          color: "oklch(0.68 0.18 295 / 0.28)",
          filter: "drop-shadow(0 0 16px oklch(0.68 0.18 295 / 0.10))",
        }}
        animate={{
          rotate: [360, 0],
          scale: [1, 1.06, 1],
          opacity: [0.22, 0.34, 0.22],
        }}
        transition={{
          rotate: { duration: 34, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: F.s13, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: 8, times: [0, 0.5, 1] },
          opacity: { duration: F.s13, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: 8, times: [0, 0.5, 1] },
        }}
      >
        <Mandala className="w-full h-full" />
      </motion.div>

      {/*
       * LEAF — water surface, floating
       * Gentle vertical drift (8s) + slow rotation.
       * Smallest amplitude — like a leaf resting on still water.
       */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-24 h-24"
        style={{ color: "oklch(0.72 0.18 60 / 0.28)" }}
        animate={{
          y: [0, -18, 0],
          rotate: [0, 6, -4, 0],
          opacity: [0.20, 0.32, 0.20],
        }}
        transition={{
          duration: F.s8,
          repeat: Number.POSITIVE_INFINITY,
          ease: BREATH,
          delay: 1,
          times: [0, 0.5, 1],
        }}
      >
        <Leaf className="w-full h-full" />
      </motion.div>

      {/*
       * TRIANGLE 1 — slow clockwise spin + 8s breath (delay 5s)
       */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32"
        style={{ color: "oklch(0.72 0.18 60 / 0.22)" }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.05, 1],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          rotate: { duration: 21, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: F.s8, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: 5, times: [0, 0.5, 1] },
          opacity: { duration: F.s8, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: 5, times: [0, 0.5, 1] },
        }}
      >
        <Triangle className="w-full h-full" />
      </motion.div>

      {/*
       * TRIANGLE 2 — counter-clockwise + 5s breath (delay 2s)
       * Fastest breathing element — closest to the surface.
       */}
      <motion.div
        className="absolute top-2/3 right-1/3 w-24 h-24"
        style={{ color: "oklch(0.72 0.18 60 / 0.22)" }}
        animate={{
          rotate: [0, -360],
          scale: [1, 1.06, 1],
          opacity: [0.18, 0.30, 0.18],
        }}
        transition={{
          rotate: { duration: 21, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: F.s5, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: 2, times: [0, 0.5, 1] },
          opacity: { duration: F.s5, repeat: Number.POSITIVE_INFINITY, ease: BREATH, delay: 2, times: [0, 0.5, 1] },
        }}
      >
        <Triangle className="w-full h-full" />
      </motion.div>

    </div>
  )
}
