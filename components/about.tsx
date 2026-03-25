"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

// ─── Tsukuyomi feathers ───────────────────────────────────────────────────────
// What remains of crows inside the genjutsu. Suspended. Floating wrong.
// viewBox "0 0 12 36" — feather tip at top, quill at bottom.

// Feather body — closed path, widest ~1/3 from tip, tapers to quill base
const FEATHER_BODY =
  "M 6 1.5 C 9.5 5 11.5 13 11 21 C 10.5 28 8.5 33 6 35.5 C 3.5 33 1.5 28 1 21 C 0.5 13 2.5 5 6 1.5 Z"

// Rachis — central spine, tip to quill
const FEATHER_RACHIS = "M 6 1.5 L 6 35.5"

// Barbs — soft curves from rachis outward, right side
const FEATHER_BARBS_R =
  "M 6 7 C 7.5 7.5 9 8.5 10 9.5 M 6 12 C 7.5 12.5 9.5 13.5 10.5 15 M 6 17 C 7.5 17.5 9.5 18.5 10.5 20 M 6 22 C 7.5 22.5 9 23.5 9.5 25 M 6 27 C 7 27.5 8 28.5 8.2 30"

// Barbs — left side mirror
const FEATHER_BARBS_L =
  "M 6 7 C 4.5 7.5 3 8.5 2 9.5 M 6 12 C 4.5 12.5 2.5 13.5 1.5 15 M 6 17 C 4.5 17.5 2.5 18.5 1.5 20 M 6 22 C 4.5 22.5 3 23.5 2.5 25 M 6 27 C 5 27.5 4 28.5 3.8 30"

interface FeatherConfig {
  id: number
  /** Rendered height in px; width derived from viewBox (12/36 × height) */
  size: number
  opacity: number
  top?: string
  bottom?: string
  left?: string
  right?: string
  /** Initial static tilt */
  tilt: number
  /** Rotation animation duration in seconds */
  rotDuration: number
  /** Animation start delay */
  rotDelay: number
}

// Scattered asymmetrically — edges and corners, away from center text.
// Text container occupies roughly the center 55% of the viewport width.
const TSUKUYOMI_FEATHERS: FeatherConfig[] = [
  { id: 0, size: 42, opacity: 0.30, top:    "7%",  left:   "5%",   tilt:  18,  rotDuration: 14, rotDelay: 0    },
  { id: 1, size: 26, opacity: 0.28, top:   "13%",  right:  "8%",   tilt: -24,  rotDuration: 18, rotDelay: 2.8  },
  { id: 2, size: 38, opacity: 0.25, top:   "40%",  left:   "2%",   tilt:  42,  rotDuration: 16, rotDelay: 1.2  },
  { id: 3, size: 22, opacity: 0.33, top:   "28%",  right:  "5%",   tilt: -38,  rotDuration: 12, rotDelay: 4.5  },
  { id: 4, size: 45, opacity: 0.26, bottom:"14%",  right:  "6%",   tilt:  26,  rotDuration: 17, rotDelay: 1.8  },
  { id: 5, size: 30, opacity: 0.31, bottom:"22%",  left:   "9%",   tilt: -12,  rotDuration: 15, rotDelay: 3.2  },
  { id: 6, size: 20, opacity: 0.29, top:   "68%",  right: "12%",   tilt:  55,  rotDuration: 13, rotDelay: 0.7  },
]

function TsukuyomiFeather({ cfg, reduced }: { cfg: FeatherConfig; reduced: boolean }) {
  const { size, opacity, top, bottom, left, right, tilt, rotDuration, rotDelay } = cfg
  const w = size * (12 / 36)

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "absolute",
        top, bottom, left, right,
        width: w,
        height: size,
        opacity,
        pointerEvents: "none",
      }}
      initial={{ rotate: tilt }}
      animate={reduced ? { rotate: tilt } : { rotate: tilt + 360 }}
      transition={{
        duration: rotDuration,
        repeat: Infinity,
        ease: "linear",
        delay: rotDelay,
      }}
    >
      <svg
        viewBox="0 0 12 36"
        width={w}
        height={size}
        style={{ overflow: "visible" }}
      >
        {/* Feather body — near-white fill, dark crimson-black outline */}
        <path
          d={FEATHER_BODY}
          fill="oklch(0.95 0.02 35)"
          stroke="oklch(0.08 0.10 20)"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Rachis — dark spine */}
        <path
          d={FEATHER_RACHIS}
          fill="none"
          stroke="oklch(0.08 0.10 20)"
          strokeWidth="0.55"
          strokeLinecap="round"
        />
        {/* Barbs — delicate, dark, suggesting structure */}
        <path
          d={FEATHER_BARBS_R}
          fill="none"
          stroke="oklch(0.08 0.10 20)"
          strokeWidth="0.4"
          strokeLinecap="round"
        />
        <path
          d={FEATHER_BARBS_L}
          fill="none"
          stroke="oklch(0.08 0.10 20)"
          strokeWidth="0.4"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  )
}

// Tsukuyomi — deep saturated crimson, not orange.
// Reference: dense geometric towers, lavender-mauve against a blood-red sky.
// A reddish moon, barely desaturated against the overwhelming red.

// Deep crimson sky — hue 5–12°, heavily saturated. Not orange.
const CRIMSON_GRADIENT =
  "radial-gradient(ellipse at 50% 35%, oklch(0.40 0.22 10) 0%, oklch(0.25 0.20 7) 45%, oklch(0.12 0.12 5) 100%)"

// Text: near-white with the faintest cool undertone — reads as pale in red light
const TEXT_COLOR = "oklch(0.95 0.02 350)"
const TEXT_SHADOW = "0 0 14px oklch(0.14 0.18 10)"

// 7 lines. No two share an angle. Some fade before the edge.
// strokeWidth in viewBox units (viewBox 0 0 100 100).
// ~0.12 ≈ 1px on a 1200px section. Dark crimson — reads as a wound in the sky.
const SCORED_LINES = [
  // angle ~50° — long, fades at end
  { x1: 0,   y1: 25,  x2: 75,  y2: 100, width: 0.14, fade: "end"   },
  // angle ~68° — steep, solid
  { x1: 28,  y1: 0,   x2: 88,  y2: 92,  width: 0.10, fade: null    },
  // angle ~128° counter — long, fades at start
  { x1: 100, y1: 30,  x2: 14,  y2: 90,  width: 0.16, fade: "start" },
  // angle ~83° — near-vertical, slight tilt, full
  { x1: 55,  y1: 0,   x2: 59,  y2: 100, width: 0.11, fade: null    },
  // angle ~22° — very shallow, short fragment, fades
  { x1: 0,   y1: 72,  x2: 48,  y2: 100, width: 0.18, fade: "end"   },
  // angle ~108° — goes partway, fades
  { x1: 88,  y1: 0,   x2: 52,  y2: 58,  width: 0.12, fade: "end"   },
  // angle ~158° — short counter, bottom right
  { x1: 100, y1: 78,  x2: 68,  y2: 100, width: 0.17, fade: null    },
]

function lineGradientId(i: number, dir: string) {
  return `tsuk-line-${i}-${dir}`
}

export function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [flashActive, setFlashActive] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Single flash on entry — WCAG 2.3.1 safe (one occurrence, <3/sec).
  useEffect(() => {
    if (isInView && !prefersReducedMotion) {
      setFlashActive(true)
      const off = setTimeout(() => setFlashActive(false), 260)
      return () => clearTimeout(off)
    }
  }, [isInView, prefersReducedMotion])

  const snapTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.25, ease: [0.9, 0, 1, 0.1] as [number, number, number, number] }

  const contentTransition = prefersReducedMotion
    ? { duration: 0 }
    : {
        delay: 0.2,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }

  // Staggered so each paragraph breathes on its own clock
  const breatheDelays = ["0s", "2.1s", "4.4s", "6.7s"]

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-8 py-48 relative overflow-hidden"
      style={{ background: CRIMSON_GRADIENT }}
    >
      {/* ── Layer 1: Vignette — aggressive edge darkness ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 35%, transparent 0%, oklch(0.10 0.10 8 / 0.60) 50%, oklch(0.05 0.07 5 / 0.94) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Layer 2: Scored lines — felt, not seen ── */}
      {/* Rumble applied here only — environment shifts, text stays still */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 2,
          // Opacity: 15% — visible against the blood-orange center,
          // naturally hidden by the vignette at dark edges.
          opacity: 0.15,
          animation: prefersReducedMotion
            ? "none"
            : "tsukuyomi-rumble 18s ease-in-out infinite",
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          {SCORED_LINES.map((line, i) => {
            if (!line.fade) return null
            const isEnd = line.fade === "end"
            return (
              <linearGradient
                key={i}
                id={lineGradientId(i, line.fade)}
                gradientUnits="userSpaceOnUse"
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
              >
                <stop offset="0%"   stopColor="#180203" stopOpacity={isEnd ? 1 : 0} />
                <stop offset="60%"  stopColor="#180203" stopOpacity={isEnd ? 1 : 1} />
                <stop offset="100%" stopColor="#180203" stopOpacity={isEnd ? 0 : 1} />
              </linearGradient>
            )
          })}
        </defs>

        {SCORED_LINES.map((line, i) => (
          <line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={
              line.fade
                ? `url(#${lineGradientId(i, line.fade)})`
                : "#180203"
            }
            strokeWidth={line.width}
            strokeLinecap="round"
          />
        ))}
      </svg>

      {/* ── Layer 3: Architecture silhouettes — geometric towers, cool lavender-mauve ── */}
      {/* Echoes the dense urban structures in the reference image.                    */}
      {/* Still. They do not rumble — the world holds them fixed.                      */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "55%",
          pointerEvents: "none",
          zIndex: 2,
          opacity: 0.28,
        }}
        viewBox="0 0 100 55"
        preserveAspectRatio="none"
      >
        {/* Dense cityscape silhouette — angular towers, lavender-mauve fill, no outlines */}
        <path
          d="M0 55 L0 32 L4 32 L4 26 L7 26 L7 30 L11 30 L11 20 L14 20 L14 25 L17 25 L17 16 L20 16 L20 22 L24 22 L24 12 L27 12 L27 18 L30 18 L30 10 L33 10 L33 15 L36 15 L36 8 L39 8 L39 14 L43 14 L43 6 L46 6 L46 11 L49 11 L49 4 L52 4 L52 9 L55 9 L55 13 L58 13 L58 7 L61 7 L61 12 L64 12 L64 5 L67 5 L67 10 L70 10 L70 16 L73 16 L73 9 L76 9 L76 14 L79 14 L79 20 L82 20 L82 13 L85 13 L85 18 L88 18 L88 24 L91 24 L91 17 L94 17 L94 22 L97 22 L97 28 L100 28 L100 55 Z"
          fill="oklch(0.22 0.06 280)"
        />
        {/* Second layer — slightly lighter, overlapping towers for depth */}
        <path
          d="M0 55 L0 40 L5 40 L5 34 L9 34 L9 38 L13 38 L13 28 L16 28 L16 32 L20 32 L20 26 L23 26 L23 30 L27 30 L27 22 L31 22 L31 18 L34 18 L34 22 L38 22 L38 15 L41 15 L41 20 L45 20 L45 24 L49 24 L49 17 L53 17 L53 21 L57 21 L57 14 L60 14 L60 18 L64 18 L64 22 L68 22 L68 16 L71 16 L71 20 L75 20 L75 26 L79 26 L79 20 L83 20 L83 24 L87 24 L87 30 L91 30 L91 24 L95 24 L95 28 L100 28 L100 55 Z"
          fill="oklch(0.18 0.05 280)"
        />
      </svg>

      {/* ── Layer 3b: Tsukuyomi feathers — suspended in wrong gravity ── */}
      {/* What remains of crows inside the genjutsu. Caught. Floating. */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 3, overflow: "hidden" }}
      >
        {TSUKUYOMI_FEATHERS.map((cfg) => (
          <TsukuyomiFeather key={cfg.id} cfg={cfg} reduced={prefersReducedMotion} />
        ))}
      </div>

      {/* ── Layer 4: Moon — reddish-pink, desaturated against the crimson sky ── */}
      {/* Still. Watches. Never moves.                                            */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "min(38vw, 380px)",
          height: "min(38vw, 380px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, oklch(0.72 0.06 350) 50%, oklch(0.55 0.08 350 / 0) 100%)",
          opacity: 0.22,
          top: "-5%",
          right: "8%",
          pointerEvents: "none",
          zIndex: 4,
        }}
      />

      {/* ── Layer 5: Dark entry/exit overlay ── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "oklch(0.08 0.02 270)",
          zIndex: 5,
          pointerEvents: "none",
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: isInView ? 0 : 1 }}
        transition={snapTransition}
      />

      {/* ── Layer 6: Sharingan activation flash — true crimson ── */}
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "oklch(0.55 0.26 10)",
            zIndex: 6,
            pointerEvents: "none",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: flashActive ? 0.38 : 0 }}
          transition={{ duration: 0.1 }}
        />
      )}

      {/* ── Layer 7: Text — no movement. Unease comes from letter-spacing alone. ── */}
      <motion.div
        className="relative w-full"
        style={{ maxWidth: "65ch", zIndex: 7 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={contentTransition}
      >
        {/* Title — marginLeft offset: nothing in Tsukuyomi is centered */}
        <h2
          className="mb-16"
          style={{
            color: TEXT_COLOR,
            textShadow: TEXT_SHADOW,
            letterSpacing: "0.2em",
            fontWeight: 300,
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            marginLeft: "-0.1em",
          }}
        >
          About
        </h2>

        <div className="space-y-8">
          {[
            "I'm a frontend architect specializing in systems design, component architecture, and the kind of engineering that makes other engineers stop and ask how it works.",
            "My practice sits at the intersection of mathematics and interface design. I build things grounded in first principles, not convention. If there's a more structurally sound way to do something, I'll find it.",
            "I'm the creator of Harmonia UI, a capacity-adaptive interface framework, and Renge, a design system built on natural mathematics. Both are part of the Soka Labs ecosystem, a Human-Computer Interaction research and developer training institution I'm building to change how the industry produces architects.",
            "I've diagnosed codebases others couldn't fix, shipped core products under hostile conditions, and built systems that outlasted the companies that commissioned them.",
          ].map((text, i) => (
            <p
              key={i}
              style={{
                fontSize: "1.0625rem",
                lineHeight: "1.9",
                color: TEXT_COLOR,
                textShadow: TEXT_SHADOW,
                // Each paragraph breathes on a different clock
                animation: prefersReducedMotion
                  ? "none"
                  : `tsukuyomi-breathe 8s ease-in-out ${breatheDelays[i]} infinite`,
              }}
            >
              {text}
            </p>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
