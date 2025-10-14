// Golden Ratio (φ) = 1.618
export const PHI = 1.618
export const PHI_INVERSE = 0.618

// Fibonacci sequence for timing (in milliseconds)
export const FIBONACCI_MS = {
  f1: 100,
  f2: 100,
  f3: 200,
  f4: 300,
  f5: 500,
  f6: 800,
  f7: 1300,
  f8: 2100,
}

// Golden angle for rotations (137.5°)
export const GOLDEN_ANGLE = 137.5

// Animation durations based on golden ratio
export const DURATION = {
  fast: FIBONACCI_MS.f3, // 200ms
  normal: FIBONACCI_MS.f4, // 300ms
  slow: FIBONACCI_MS.f5, // 500ms
  slower: FIBONACCI_MS.f6, // 800ms
}

// Easing functions inspired by natural motion
export const EASING = {
  // Smooth ease inspired by golden ratio
  golden: [0.618, 0, 0.382, 1],
  // Natural spring motion
  spring: [0.34, 1.56, 0.64, 1],
  // Gentle ease
  gentle: [0.25, 0.46, 0.45, 0.94],
  // Leaf swaying in breeze - gentle sinusoidal oscillation
  leafSway: [0.45, 0.05, 0.55, 0.95],
  // Snow falling - slow drift with gentle deceleration
  snowFall: [0.25, 0.1, 0.25, 1],
  // Wind movement - gradual acceleration and deceleration
  wind: [0.42, 0, 0.58, 1],
  // Breathing - smooth, organic in-out
  breathing: [0.37, 0, 0.63, 1],
  // Floating - very gentle drift
  floating: [0.33, 0, 0.67, 1],
  // Bouncy spring - playful and energetic
  bouncySpring: [0.68, -0.55, 0.265, 1.55],
  // Playful bounce - fun and lively
  playfulBounce: [0.34, 1.56, 0.64, 1],
  // Quick snap - snappy and responsive
  quickSnap: [0.87, 0, 0.13, 1],
  // Elastic - stretchy and fun
  elastic: [0.68, -0.6, 0.32, 1.6],
}

// Stagger delays using Fibonacci sequence
export const STAGGER = {
  children: FIBONACCI_MS.f2 / 1000, // 0.1s
  items: FIBONACCI_MS.f3 / 1000, // 0.2s
  sections: FIBONACCI_MS.f4 / 1000, // 0.3s
}
