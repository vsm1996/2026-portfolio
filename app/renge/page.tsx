import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Renge Design System - Vanessa Martin",
  description: "Mathematical design token system. Golden ratio typography, Fibonacci spacing, OKLCH colors, phi-derived motion. 6 profiles, runtime injection.",
}

const PHI = 1.618

const typeScale = [
  { step: "4xl", exponent: 5, px: Math.round(16 * Math.pow(PHI, 5)), token: "--renge-text-4xl" },
  { step: "3xl", exponent: 4, px: Math.round(16 * Math.pow(PHI, 4)), token: "--renge-text-3xl" },
  { step: "2xl", exponent: 3, px: Math.round(16 * Math.pow(PHI, 3)), token: "--renge-text-2xl" },
  { step: "xl", exponent: 2, px: Math.round(16 * Math.pow(PHI, 2)), token: "--renge-text-xl" },
  { step: "lg", exponent: 1, px: Math.round(16 * PHI), token: "--renge-text-lg" },
  { step: "base", exponent: 0, px: 16, token: "--renge-text-base", base: true },
  { step: "sm", exponent: -1, px: Math.round(16 / PHI), token: "--renge-text-sm" },
]

const fibSequence = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
const spacingScale = fibSequence.slice(2).map((f, i) => ({
  step: `space-${i + 3}`,
  fib: f,
  px: f * 4,
}))

const profiles = [
  { name: "default", desc: "Purple-forward. Lavender primary, amber accent." },
  { name: "ocean", desc: "Cyan and teal. Cool temperature throughout." },
  { name: "ember", desc: "Warm reds and oranges. High contrast." },
  { name: "forest", desc: "Green spectrum. Earthy and grounded." },
  { name: "midnight", desc: "Deep navy. Low saturation, high readability." },
  { name: "sakura", desc: "Pinks and soft whites. Light mode compatible." },
]

const decisions = [
  {
    decision: "OKLCH over HSL or hex",
    rationale:
      "HSL is perceptually non-uniform: an HSL blue at 50% lightness appears darker than an HSL yellow at the same value. OKLCH uses a perceptually uniform model, which means tokens at the same lightness value actually look the same lightness to the human eye. This makes theming predictable and eliminates the need to manually adjust perceived brightness across hues.",
  },
  {
    decision: "Fibonacci for spacing, not a linear or modular scale",
    rationale:
      "Linear scales (4px, 8px, 12px...) produce ambiguous mid-range values. Modular scales (like 4px × 1.5ⁿ) create non-integer values at small sizes. Fibonacci produces integers, non-linear growth, and a ratio that converges on phi — the same underlying principle as the typography scale. The system is internally consistent.",
  },
  {
    decision: "Runtime injection via createRengeTheme()",
    rationale:
      "Build-time token generation requires a rebuild to switch themes. Runtime injection writes CSS custom properties to :root on demand, enabling instant profile switching without any re-render or network request. The entire design language is a single function call.",
  },
  {
    decision: "Golden ratio for motion easing, not cubic-bezier guessing",
    rationale:
      "Most easing values are chosen by feel and never revisited. Renge derives easing curves from phi: control points at phi-inverse positions. This produces curves that feel natural because they follow the same proportion as the spacing and typography. Nothing in the system is arbitrary.",
  },
]

export default function RengePage() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors text-sm mb-16"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="space-y-20">
          <div className="space-y-6">
            <p className="text-accent font-mono text-sm font-medium tracking-widest uppercase">Design System</p>
            <h1 className="text-6xl md:text-8xl font-light tracking-tight text-foreground leading-none">
              Renge Design System
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-light">
              Proportion as first principle.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://renge-ui.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:border-accent/50 transition-all"
              >
                Live demo
                <ExternalLink className="h-3.5 w-3.5 opacity-50" />
              </a>
              <span className="inline-flex items-center px-4 py-2 rounded-full border border-border/30 font-mono text-xs text-muted-foreground/60">
                @renge-ui/tokens
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full border border-border/30 text-xs text-muted-foreground/60">
                6 profiles / 100+ CSS vars
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-light text-foreground">The premise</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Most design systems are collections of decisions made by designers over time. Values are chosen, adjusted, and locked in. The system records what was decided, not why.
              </p>
              <p>
                Renge starts from mathematics. Every value in the system is derived from a small set of constants: phi (1.618), the Fibonacci sequence, and the OKLCH color model. If you know the constants and the formulas, you can regenerate the entire system from scratch.
              </p>
              <p>
                This is not an aesthetic choice. It is an engineering choice. Derived systems are auditable, consistent, and extensible in ways that chosen systems are not.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-muted-foreground/60 font-mono text-xs uppercase tracking-widest">
                Typography — \u03c6 scale from 16px base
              </h3>
              <div className="border border-border/30 rounded-2xl overflow-hidden bg-card/20">
                <table className="w-full text-sm font-mono">
                  <thead>
                    <tr className="border-b border-border/20">
                      <th className="text-left px-4 py-2.5 text-muted-foreground/40 font-normal text-xs">step</th>
                      <th className="text-left px-4 py-2.5 text-muted-foreground/40 font-normal text-xs">formula</th>
                      <th className="text-right px-4 py-2.5 text-muted-foreground/40 font-normal text-xs">px</th>
                    </tr>
                  </thead>
                  <tbody>
                    {typeScale.map((row) => (
                      <tr
                        key={row.step}
                        className={`border-b border-border/10 last:border-0 ${row.base ? "bg-accent/5" : ""}`}
                      >
                        <td className={`px-4 py-2 ${row.base ? "text-accent" : "text-muted-foreground/70"}`}>
                          {row.step}
                        </td>
                        <td className="px-4 py-2 text-muted-foreground/40 text-xs">
                          16 \xd7 \u03c6
                          {row.exponent > 0 ? String.fromCodePoint(0x2070 + row.exponent) : row.exponent < 0 ? "\u207b\xb9" : "\u2070"}
                        </td>
                        <td className="px-4 py-2 text-right text-foreground/80">{row.px}px</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-muted-foreground/60 font-mono text-xs uppercase tracking-widest">
                Spacing — Fibonacci \xd7 4px base unit
              </h3>
              <div className="border border-border/30 rounded-2xl overflow-hidden bg-card/20">
                <table className="w-full text-sm font-mono">
                  <thead>
                    <tr className="border-b border-border/20">
                      <th className="text-left px-4 py-2.5 text-muted-foreground/40 font-normal text-xs">token</th>
                      <th className="text-left px-4 py-2.5 text-muted-foreground/40 font-normal text-xs">fib</th>
                      <th className="text-right px-4 py-2.5 text-muted-foreground/40 font-normal text-xs">px</th>
                    </tr>
                  </thead>
                  <tbody>
                    {spacingScale.map((row) => (
                      <tr key={row.step} className="border-b border-border/10 last:border-0">
                        <td className="px-4 py-2 text-muted-foreground/70">{row.step}</td>
                        <td className="px-4 py-2 text-muted-foreground/40 text-xs">{row.fib}</td>
                        <td className="px-4 py-2 text-right text-foreground/80">{row.px}px</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-light text-foreground">Color profiles</h2>
            <code className="block font-mono text-sm text-accent/80 bg-card/40 border border-border/30 px-5 py-4 rounded-xl">
              createRengeTheme(&apos;ocean&apos;) &rarr; injects 100+ CSS custom properties into :root
            </code>
            <div className="grid sm:grid-cols-2 gap-3">
              {profiles.map((p) => (
                <div
                  key={p.name}
                  className="p-4 rounded-xl border border-border/30 bg-card/20"
                >
                  <code className="text-accent font-mono text-sm">{p.name}</code>
                  <p className="text-muted-foreground text-sm mt-1">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-light text-foreground">Design decisions</h2>
            <div className="space-y-4">
              {decisions.map((d) => (
                <div key={d.decision} className="p-5 rounded-2xl border border-border/30 bg-card/20 space-y-2">
                  <p className="text-foreground font-semibold text-sm">{d.decision}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{d.rationale}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-light text-foreground">Production proof</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  name: "The Hondana",
                  desc: "Reading tracker. Full Renge token system in production. Profile switching live.",
                  href: "https://the-hondana.vercel.app/",
                },
                {
                  name: "This portfolio",
                  desc: "Built on Renge tokens. The typography, spacing, and colors you are reading now are system-derived.",
                  href: null,
                },
              ].map((proof) => (
                <div key={proof.name} className="p-5 rounded-2xl border border-border/30 bg-card/20 space-y-2">
                  <p className="text-foreground font-semibold">{proof.name}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{proof.desc}</p>
                  {proof.href && (
                    <a
                      href={proof.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-accent text-sm hover:text-accent/80 transition-colors"
                    >
                      {proof.href.replace("https://", "")}
                      <ExternalLink className="h-3 w-3 opacity-60" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 border-t border-border/20 pt-10">
            <p className="text-muted-foreground/60 font-mono text-xs uppercase tracking-widest">Stack</p>
            <div className="flex flex-wrap gap-2">
              {["TypeScript", "CSS Custom Properties", "OKLCH", "Golden Ratio", "Fibonacci", "React", "Monorepo", "npm"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-mono bg-accent/10 text-accent rounded-full"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
