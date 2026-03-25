// ─── Crow SVG path library ────────────────────────────────────────────────────
// viewBox: "-23 -12 46 24"  (46 wide × 24 tall)
// Origin (0,0) = wing-attachment / body centre. Bird faces +x (right).
//
// Wing anatomy — how the M-shape is formed:
//   Each wing has TWO panels separated at the wrist/elbow:
//     Inner panel (secondaries): sweeps from body root up steeply to the wrist.
//     Outer panel (primaries):   continues from wrist, dropping slightly to the tip.
//   The wrist is the HIGHEST point — higher than both the tip and the body.
//   When both wings are visible:
//     tip(L) → WRIST(L peak) → body(valley) → WRIST(R peak) → tip(R) = M shape.
//   This is the anatomical crow hallmark: kink at wrist, not a smooth parabola.
//
// Command structure: M + 4×C + Z  (identical across all four wing variants
// so Framer Motion can interpolate d between UP and DOWN).

export const CROW_VIEWBOX = "-23 -12 46 24"

/** height = size × CROW_H_RATIO  (derived from viewBox 46 × 24) */
export const CROW_H_RATIO = 24 / 46

// ── Wings ─────────────────────────────────────────────────────────────────────

// UP: wrist peaks at y ≈ -10 (well above body), tip at y ≈ -7 (below wrist)
export const WING_L_UP =
  "M 0 -0.5 C -3 -4, -7 -8.5, -11 -10 C -14 -10.5, -18 -9, -21 -7 C -21 -5, -18 -3, -13 -2 C -9 -1, -4 -0.5, 0 0.5 Z"

// DOWN: wrist dips to y ≈ +9, tip at y ≈ +6.5
export const WING_L_DOWN =
  "M 0 -0.5 C -3 3, -7 7, -11 9 C -14 9.5, -18 8.5, -21 6.5 C -21 4.5, -18 2.5, -13 1.5 C -9 0.5, -4 0, 0 0.5 Z"

export const WING_R_UP =
  "M 0 -0.5 C 3 -4, 7 -8.5, 11 -10 C 14 -10.5, 18 -9, 21 -7 C 21 -5, 18 -3, 13 -2 C 9 -1, 4 -0.5, 0 0.5 Z"

export const WING_R_DOWN =
  "M 0 -0.5 C 3 3, 7 7, 11 9 C 14 9.5, 18 8.5, 21 6.5 C 21 4.5, 18 2.5, 13 1.5 C 9 0.5, 4 0, 0 0.5 Z"

// ── Body ──────────────────────────────────────────────────────────────────────
// Compact oval, slightly front-heavy. x: -5.5 (tail root) to +8 (chest).
export const BODY =
  "M 7.5 0 C 6 -2.5, 2.5 -2, 0 -1.5 C -2 -1, -4 -0.5, -5.5 0 C -5.5 1, -3 1.5, 0 1.5 C 3 1.5, 6.5 2, 8 1.5 C 9 0.5, 9 -0.5, 7.5 0 Z"

// ── Head + beak ───────────────────────────────────────────────────────────────
// Head rounds upward from chest. Beak is pointed, angled slightly upward.
// Tip reaches x ≈ +15.5 — well forward of the body.
export const HEAD =
  "M 7.5 0 C 7.5 -3, 10 -4.5, 13 -3 C 15 -2, 15.5 -0.5, 14.5 1 C 13.5 2, 11 2, 9.5 1.5 C 8.5 1, 8 0.5, 7.5 0 Z"

// ── Tail — forked, two separate prongs ────────────────────────────────────────
// Body terminates at (-5.5, 0). Two diverging leaf-shapes create the fork.
// Upper prong angles up-backward; lower prong angles down-backward.

export const TAIL_UPPER =
  "M -5.5 -0.3 C -7 -1.5, -9.5 -4, -11.5 -6 C -12 -7, -12 -8, -11 -7.5 C -10.5 -7, -9 -5.5, -7.5 -3.5 C -6.5 -2.5, -5.5 -1.2, -5.5 -0.3 Z"

export const TAIL_LOWER =
  "M -5.5 0.3 C -7 1.5, -9 4, -10.5 6.5 C -11 7.5, -11 8.5, -10 8 C -9.5 7.5, -8 6, -6.5 4 C -6 3, -5.5 1.5, -5.5 0.3 Z"
