"use client"

import type React from "react"

import { motion } from "framer-motion"
import { PHI, GOLDEN_ANGLE } from "@/lib/animation-constants"

function LotusFlower({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={style}>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const angle = (i * 360) / 7
        return (
          <ellipse
            key={i}
            cx="100"
            cy="100"
            rx="35"
            ry="60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity={0.6}
            transform={`rotate(${angle} 100 100)`}
          />
        )
      })}
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
        const x = 100 + 30 * Math.cos(angle)
        const y = 100 + 30 * Math.sin(angle)
        return <circle key={i} cx={x} cy={y} r="30" fill="none" stroke="currentColor" strokeWidth="1" opacity={0.5} />
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
        const x1 = 100 + 40 * Math.cos(angle)
        const y1 = 100 + 40 * Math.sin(angle)
        const x2 = 100 + 80 * Math.cos(angle)
        const y2 = 100 + 80 * Math.sin(angle)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" opacity={0.5} />
      })}
    </svg>
  )
}

function Leaf({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style}>
      <path
        d="M 50 10 Q 70 30, 75 50 Q 70 70, 50 90 Q 30 70, 25 50 Q 30 30, 50 10 M 50 10 L 50 90"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity={0.6}
      />
    </svg>
  )
}

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] opacity-12"
        style={{
          background: `conic-gradient(
            from 0deg,
            oklch(0.75 0.22 285 / 0.2) 0deg,
            oklch(0.68 0.18 295 / 0.2) 60deg,
            oklch(0.72 0.18 60 / 0.2) 120deg,
            oklch(0.7 0.18 270 / 0.2) 180deg,
            oklch(0.72 0.16 290 / 0.2) 240deg,
            oklch(0.75 0.2 280 / 0.2) 300deg,
            oklch(0.75 0.22 285 / 0.2) 360deg
          )`,
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.4, 0.8, 1.3, 1],
          x: [0, 40, -35, 30, 0],
          y: [0, -30, 35, -25, 0],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/4 left-1/3 w-24 h-24 opacity-25"
        style={{
          color: "oklch(0.72 0.18 60 / 0.35)",
        }}
        animate={{
          rotate: [0, 360],
          x: [0, 50, -40, 20, 0],
          y: [0, -60, -120, -180, -240],
          opacity: [0.25, 0.4, 0.3, 0.2, 0],
        }}
        transition={{
          duration: 16,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Leaf className="w-full h-full" />
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/4 w-48 h-48 opacity-22"
        style={{
          color: "oklch(0.68 0.18 295 / 0.3)",
          filter: "drop-shadow(0 0 20px oklch(0.68 0.18 295 / 0.15))",
        }}
        animate={{
          scale: [1, 1.25, 0.9, 1.15, 1],
          rotate: [0, GOLDEN_ANGLE / 2, -GOLDEN_ANGLE / 3, GOLDEN_ANGLE / 4, 0],
          opacity: [0.22, 0.38, 0.18, 0.32, 0.22],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <FlowerOfLife className="w-full h-full" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-1/3 w-32 h-32 opacity-28"
        style={{
          color: "oklch(0.7 0.18 270 / 0.35)",
          filter: "drop-shadow(0 0 15px oklch(0.7 0.18 270 / 0.18))",
        }}
        animate={{
          scale: [1, 1.2, 0.88, 1.12, 1],
          rotate: [0, 10, -10, 6, 0],
          opacity: [0.28, 0.42, 0.24, 0.36, 0.28],
          y: [0, -15, 10, -8, 0],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <LotusFlower className="w-full h-full" />
      </motion.div>

      <motion.div
        className="absolute top-20 left-10 w-32 h-32 opacity-3"
        style={{
          color: "oklch(0.72 0.18 60 / 0.35)",
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, PHI, 0.8, 1.2, 1],
          x: [0, 18, -15, 10, 0],
          y: [0, -12, 15, -8, 0],
        }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Triangle className="w-full h-full" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-1/2 w-64 h-64 rounded-full opacity-35"
        style={{
          background:
            "radial-gradient(circle, oklch(0.75 0.22 285 / 0.15) 0%, oklch(0.72 0.18 60 / 0.1) 50%, transparent 70%)",
          boxShadow: "0 0 100px oklch(0.75 0.22 285 / 0.18)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, -100, 80, -70, 0],
          y: [0, 90, -70, 60, 0],
          scale: [1, 0.6, 1.6, 0.8, 1],
          opacity: [0.3, 0.5, 0.25, 0.42, 0.3],
        }}
        transition={{
          duration: 16,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      <motion.div
        className="absolute top-1/3 right-1/4 w-36 h-36 opacity-25"
        style={{
          color: "oklch(0.68 0.18 295 / 0.3)",
          filter: "drop-shadow(0 0 18px oklch(0.68 0.18 295 / 0.12))",
        }}
        animate={{
          rotate: [0, -360],
          scale: [1, 1.3, 0.9, 1.15, 1],
          x: [0, 25, -20, 15, 0],
          y: [0, -20, 15, -10, 0],
        }}
        transition={{
          duration: 14,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Mandala className="w-full h-full" />
      </motion.div>

      <motion.div
        className="absolute top-2/3 right-1/3 w-24 h-24 opacity-28"
        style={{
          color: "oklch(0.72 0.18 60 / 0.32)",
        }}
        animate={{
          rotate: [0, -360],
          scale: [1, 1.4, 0.75, 1.25, 1],
          x: [0, -22, 18, -12, 0],
          y: [0, 18, -15, 10, 0],
        }}
        transition={{
          duration: 11,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Triangle className="w-full h-full" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-1/4 w-20 h-20 opacity-3"
        style={{
          color: "oklch(0.72 0.18 60 / 0.35)",
        }}
        animate={{
          rotate: [0, 180, 360],
          x: [0, 30, -25, 20, 0],
          y: [0, 25, -20, 15, 0],
          scale: [1, 1.2, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 13,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Leaf className="w-full h-full" />
      </motion.div>
    </div>
  )
}
