"use client"

import { motion, useReducedMotion } from "framer-motion"
import { GithubIcon, LinkedinIcon, Mail } from "lucide-react"

// ─── SVG paths ────────────────────────────────────────────────────────────────
// viewBox: -21 -7 44 13  (44 × 13 units — horizontal, 3.4:1 ratio, bird faces right)
// Origin (0,0) = wing attachment point at body centre.
//
// Wing anatomy:
//   Each wing is a CLOSED shape: leading edge out → around pointed tip → trailing
//   edge back. Five C-curves each; identical command structure so Framer Motion
//   can interpolate the d attribute between UP and DOWN positions.
//
//   The M-shape comes from the outer panel dropping relative to the wrist:
//   inner panel rises to wrist at y≈-5, outer panel drops to tip at y≈-3.5.
//   This kink is the anatomical crow hallmark — a bat wing has no such inflection.
//
//   Chord is narrow: ~1 unit at root, ~2 at wrist, ~1.5 at tip.
//   Span is long: 20 units per side.  Aspect ratio ≈ 13:1 (very crow-like).

// Wing UP  →  wings arching above body (top of downstroke)
// Wing DOWN →  wings sweeping below body (bottom of downstroke)
const WING_L_UP   = "M 0 -0.5 C -4 -2 -9 -5.5 -11 -5 C -15 -4.5 -19 -4 -20 -3.5 C -20 -2 -17 -1.5 -14 -2 C -11 -2.5 -8 -2 -6 -1.5 C -3 -1 -1 0 0 0.5 Z"
const WING_L_DOWN = "M 0 -0.5 C -4  2 -9  4.5 -11  4 C -15  3.5 -19  3 -20  2.5 C -20  1 -17  0.5 -14  1 C -11  1.5 -8  1 -6  0 C -3 -0.5 -1 0 0 0.5 Z"
const WING_R_UP   = "M 0 -0.5 C  4 -2  9 -5.5  11 -5 C  15 -4.5  19 -4  20 -3.5 C  20 -2  17 -1.5  14 -2 C  11 -2.5  8 -2  6 -1.5 C  3 -1  1 0 0 0.5 Z"
const WING_R_DOWN = "M 0 -0.5 C  4  2  9  4.5  11  4 C  15  3.5  19  3  20  2.5 C  20  1  17  0.5  14  1 C  11  1.5  8  1  6  0 C  3 -0.5  1 0 0 0.5 Z"

// Body: elongated, front-heavy oval. x=-5 (rear) to x=7 (chest).
const BODY = "M 7 0 C 6 -2 3 -2 0 -1.5 C -2 -1 -4 -0.5 -5 0 C -5 0.5 -4 1 -2 1 C 0 1 3 1.5 6 1.5 C 7 1.5 8 1 7 0 Z"
// Head + short forward beak. Beak tip at x=12, roughly horizontal.
const HEAD = "M 7 0 C 7.5 -2 9.5 -2 10 -1 C 11 -0.5 12 0.5 11 1 C 10 1.5 9 1.5 8 1.5 C 7.5 1.5 7 1 7 0 Z"
// Tail: short squared fan. x=-5 to x=-10.
const TAIL = "M -5 0 C -6 -0.5 -7 -1 -8 -1 C -9 -1 -10 -0.5 -10 0 C -10 0.5 -9 1 -8 1 C -7 1 -6 0.5 -5 0 Z"

// ─── Types ────────────────────────────────────────────────────────────────────

interface CrowConfig {
  id: number
  /** Rendered width in px. Height derived from viewBox aspect ratio (44 × 13 → ~0.3×). */
  size: number
  /** Mirror the bird so it faces left (for crows entering from the right). */
  facingLeft: boolean
  /** Starting position, relative to hero center (off-screen). */
  startX: number
  startY: number
  /** Assembly position, relative to hero center (near the text). */
  assembleX: number
  assembleY: number
  /** Disperse destination, relative to hero center (off-screen, different from start). */
  disperseX: number
  disperseY: number
  /** Seconds from page load before this crow begins flying. */
  delay: number
  flyInDur: number
  holdDur: number
  disperseDur: number
  /** Full wing-beat cycle in seconds. */
  wingPeriod: number
  /** Z-axis rotation at each phase (degrees). */
  startRot: number
  assembleRot: number
  disperseRot: number
}

// ─── Crow configurations ──────────────────────────────────────────────────────
// Assembly positions cluster around (±350 x, ±180 y) relative to hero center,
// leaving the center clear for the name and tagline.
// Start/disperse positions are at ±900-950 x / ±550 y (reliably off-screen).

const CROWS: CrowConfig[] = [
  // ── From left edge ──────────────────────────────────────────────────────────
  {
    id: 0,   size: 72, facingLeft: false,
    startX: -950, startY:  -60,   assembleX: -330, assembleY:  -70,   disperseX: -800, disperseY: -380,
    delay: 1.8,  flyInDur: 1.7, holdDur: 2.4, disperseDur: 2.0,
    wingPeriod: 0.48, startRot: -8,  assembleRot: -3,  disperseRot: -18,
  },
  {
    id: 1,   size: 56, facingLeft: false,
    startX: -820, startY: -280,   assembleX: -230, assembleY: -125,   disperseX: -700, disperseY: -520,
    delay: 2.0,  flyInDur: 1.5, holdDur: 2.2, disperseDur: 1.9,
    wingPeriod: 0.44, startRot: -15, assembleRot: -6,  disperseRot: -24,
  },
  // ── From top ────────────────────────────────────────────────────────────────
  {
    id: 2,   size: 48, facingLeft: false,
    startX: -240, startY: -580,   assembleX:  -95, assembleY: -160,   disperseX: -350, disperseY: -580,
    delay: 2.15, flyInDur: 1.4, holdDur: 2.1, disperseDur: 2.0,
    wingPeriod: 0.52, startRot: -22, assembleRot: -9,  disperseRot: -30,
  },
  {
    id: 3,   size: 52, facingLeft: false,
    startX:  120, startY: -580,   assembleX:   50, assembleY: -165,   disperseX:  220, disperseY: -580,
    delay: 2.3,  flyInDur: 1.4, holdDur: 2.0, disperseDur: 1.8,
    wingPeriod: 0.56, startRot:  20, assembleRot:  8,  disperseRot:  28,
  },
  // ── From right edge ─────────────────────────────────────────────────────────
  {
    id: 4,   size: 64, facingLeft: true,
    startX:  920, startY: -195,   assembleX:  260, assembleY:  -88,   disperseX:  860, disperseY: -400,
    delay: 2.45, flyInDur: 1.5, holdDur: 1.9, disperseDur: 2.0,
    wingPeriod: 0.46, startRot:  12, assembleRot:  4,  disperseRot:  18,
  },
  {
    id: 5,   size: 80, facingLeft: true,
    startX:  950, startY:   55,   assembleX:  335, assembleY:   18,   disperseX:  920, disperseY:  260,
    delay: 2.6,  flyInDur: 1.6, holdDur: 1.8, disperseDur: 2.1,
    wingPeriod: 0.50, startRot:   8, assembleRot:  2,  disperseRot:  15,
  },
  // ── From bottom-right ───────────────────────────────────────────────────────
  {
    id: 6,   size: 60, facingLeft: true,
    startX:  760, startY:  380,   assembleX:  200, assembleY:   98,   disperseX:  720, disperseY:  480,
    delay: 2.75, flyInDur: 1.5, holdDur: 1.7, disperseDur: 1.9,
    wingPeriod: 0.43, startRot:  22, assembleRot:  7,  disperseRot:  28,
  },
  // ── From bottom ─────────────────────────────────────────────────────────────
  {
    id: 7,   size: 48, facingLeft: false,
    startX:  210, startY:  560,   assembleX:   65, assembleY:  138,   disperseX:  420, disperseY:  560,
    delay: 2.9,  flyInDur: 1.4, holdDur: 1.6, disperseDur: 2.0,
    wingPeriod: 0.58, startRot:  28, assembleRot: 11,  disperseRot:  35,
  },
  // ── From bottom-left ────────────────────────────────────────────────────────
  {
    id: 8,   size: 56, facingLeft: false,
    startX: -420, startY:  560,   assembleX: -150, assembleY:  118,   disperseX: -620, disperseY:  510,
    delay: 3.05, flyInDur: 1.4, holdDur: 1.5, disperseDur: 1.9,
    wingPeriod: 0.49, startRot: -26, assembleRot: -8,  disperseRot: -32,
  },
  // ── From left edge, lower ───────────────────────────────────────────────────
  {
    id: 9,   size: 68, facingLeft: false,
    startX: -960, startY:  240,   assembleX: -295, assembleY:   38,   disperseX: -860, disperseY:  370,
    delay: 3.2,  flyInDur: 1.6, holdDur: 1.4, disperseDur: 2.2,
    wingPeriod: 0.47, startRot: -10, assembleRot: -3,  disperseRot: -18,
  },
]

// ─── Crow SVG ─────────────────────────────────────────────────────────────────

// viewBox width=44, height=13 → aspect ratio for rendered height
const CROW_H = (size: number) => Math.round(size * 13 / 44)

function CrowSVG({ size, wingPeriod }: { size: number; wingPeriod: number }) {
  const halfPeriod = wingPeriod / 2

  return (
    <svg
      viewBox="-21 -7 44 13"
      width={size}
      height={CROW_H(size)}
      style={{ color: "var(--itachi-crow)", overflow: "visible" }}
      aria-hidden="true"
    >
      <g fill="currentColor">
        <path d={TAIL} />
        <path d={BODY} />
        <path d={HEAD} />
        {/* Left wing — up-stroke to down-stroke, reversed */}
        <motion.path
          d={WING_L_UP}
          animate={{ d: WING_L_DOWN }}
          transition={{
            duration: halfPeriod,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        {/* Right wing — in phase with left */}
        <motion.path
          d={WING_R_UP}
          animate={{ d: WING_R_DOWN }}
          transition={{
            duration: halfPeriod,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </g>
    </svg>
  )
}

// ─── Single crow: position + opacity orchestration ────────────────────────────

function Crow({ c }: { c: CrowConfig }) {
  const totalDur  = c.flyInDur + c.holdDur + c.disperseDur
  const flyInFrac = c.flyInDur / totalDur
  const holdFrac  = (c.flyInDur + c.holdDur) / totalDur

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "absolute",
        top:  "50%",
        left: "50%",
        pointerEvents: "none",
        scaleX: c.facingLeft ? -1 : 1,
      }}
      initial={{
        x:       c.startX,
        y:       c.startY,
        opacity: 0,
        rotate:  c.startRot,
      }}
      animate={{
        x:       [c.startX,    c.assembleX, c.assembleX, c.disperseX],
        y:       [c.startY,    c.assembleY, c.assembleY, c.disperseY],
        opacity: [0,            1,           1,           0          ],
        rotate:  [c.startRot,  c.assembleRot, c.assembleRot, c.disperseRot],
      }}
      transition={{
        duration: totalDur,
        times:    [0, flyInFrac, holdFrac, 1],
        ease:     "easeInOut",
        delay:    c.delay,
      }}
    >
      <CrowSVG size={c.size} wingPeriod={c.wingPeriod} />
    </motion.div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Crow layer — conditionally rendered */}
      {!reducedMotion && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {CROWS.map((c) => (
            <Crow key={c.id} c={c} />
          ))}
        </div>
      )}

      {/* Text — appears first, before the crows arrive */}
      <div className="relative z-10 text-center px-6 select-none">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.1, delay: 0.2, ease: "easeOut" }}
          style={{
            fontSize:      "clamp(3.2rem, 9vw, 8rem)",
            fontWeight:    200,
            letterSpacing: "0.1em",
            lineHeight:    1.05,
            color:         "var(--itachi-text)",
          }}
        >
          Vanessa Martin
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.9, ease: "easeOut" }}
          style={{
            fontSize:      "clamp(0.75rem, 1.8vw, 1.1rem)",
            fontWeight:    300,
            letterSpacing: "0.25em",
            color:         "var(--itachi-subtle)",
            marginTop:     "var(--renge-space-4, 20px)",
            textTransform: "uppercase",
          }}
        >
          I build frontend systems that think.
        </motion.p>

        {/* Social links — minimal, low-key, below tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.6, ease: "easeOut" }}
          style={{
            display:       "flex",
            justifyContent:"center",
            gap:           "var(--renge-space-5, 32px)",
            marginTop:     "var(--renge-space-6, 52px)",
          }}
        >
          {[
            { icon: GithubIcon,   href: "https://github.com/vsm1996",          label: "GitHub"   },
            { icon: LinkedinIcon, href: "https://linkedin.com/in/vsm1996",       label: "LinkedIn" },
            { icon: Mail,     href: "mailto:vanessa.s.martin96@gmail.com",       label: "Email"    },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target={label !== "Email" ? "_blank" : undefined}
              rel={label !== "Email" ? "noopener noreferrer" : undefined}
              aria-label={label}
              style={{ color: "var(--itachi-ghost)" }}
              whileHover={{ color: "var(--itachi-text)" }}
              transition={{ duration: 0.2 }}
            >
              <Icon size={18} strokeWidth={1.5} />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
