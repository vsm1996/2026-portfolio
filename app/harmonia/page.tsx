import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Harmonia UI - Vanessa Martin",
  description: "Capacity-adaptive interface framework. Cognitive, temporal, and emotional inputs drive interface mode tokens through a 4-layer architecture.",
}

const layers = [
  {
    index: "01",
    name: "Input Layer",
    type: "explicit",
    spec: "cognitive: 0\u2013100 / temporal: 0\u2013100 / emotional: 0\u2013100",
    detail: [
      "Three explicit sliders. No passive tracking, no behavioral inference.",
      "The user declares their state. The system trusts the declaration.",
      "Each dimension is independent. Cognitive load does not correlate to emotional state.",
    ],
  },
  {
    index: "02",
    name: "FieldManager",
    type: "computation",
    spec: "energy = \u221b(cognitive \xd7 temporal \xd7 emotional)",
    detail: [
      "Geometric mean via cube root: all three dimensions contribute equally.",
      "EMA (Exponential Moving Average) smoothing prevents style thrashing on rapid slider changes.",
      "Debouncing at this layer keeps downstream context stable.",
    ],
  },
  {
    index: "03",
    name: "AmbientContext",
    type: "context",
    spec: "deriveMode(energy) \u2192 { density, motion, focus, tone }",
    detail: [
      "React context. Components read from context. No prop drilling.",
      "deriveMode() maps energy values to named modes: high / medium / low / minimal.",
      "Mode tokens are CSS custom properties. Components read them at the leaf level.",
    ],
  },
  {
    index: "04",
    name: "Component Layer",
    type: "output",
    spec: "layout density / content length / motion level / color tone",
    detail: [
      "Each component queries the context. Renders according to current mode tokens.",
      "prefers-reduced-motion is a hard override at this layer. Always respected, no exceptions.",
      "Components do not know they are adaptive. They only read their token values.",
    ],
  },
]

const decisions = [
  {
    decision: "Cube root for energy calculation",
    rationale:
      "Arithmetic mean would allow one high dimension to mask two low ones. Geometric mean (cube root) requires all three to be elevated for energy to be high. A person with high cognitive load but low emotional state gets an accurate medium energy, not a false positive.",
  },
  {
    decision: "EMA over simple averaging",
    rationale:
      "Simple window averaging causes jarring transitions when the window rolls over a significant input change. EMA weights recent values more heavily while retaining historical context, producing smooth signal without lag.",
  },
  {
    decision: "4 layers, not 2",
    rationale:
      "Collapsing computation into context, or context into components, creates coupling that is hard to test and impossible to replace. Each layer has one job. FieldManager can be swapped. AmbientContext can be tested without components. Components can be tested without real inputs.",
  },
  {
    decision: "Explicit inputs, not passive inference",
    rationale:
      "Behavioral inference requires user data collection, is often wrong, and cannot be corrected by the user. Explicit inputs give users agency, produce accurate state immediately, and require no data storage.",
  },
]

export default function HarmoniaPage() {
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
            <p className="text-accent font-mono text-sm font-medium tracking-widest uppercase">Framework</p>
            <h1 className="text-6xl md:text-8xl font-light tracking-tight text-foreground leading-none">
              Harmonia UI
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-light">
              Capacity as first-class input.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://harmonia-ui.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:border-accent/50 transition-all"
              >
                Live demo
                <ExternalLink className="h-3.5 w-3.5 opacity-50" />
              </a>
              <span className="inline-flex items-center px-4 py-2 rounded-full border border-border/30 font-mono text-xs text-muted-foreground/60">
                @harmonia-ui/core
              </span>
              <a
                href="https://grove-intel.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border/30 text-xs text-muted-foreground/60 hover:text-accent hover:border-accent/30 transition-all"
              >
                Production: Grove
                <ExternalLink className="h-3 w-3 opacity-50" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-light text-foreground">The problem</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Adaptive interfaces exist. Most of them infer state from behavior: scroll velocity, click patterns, session duration, past preferences. This approach has three failure modes.
              </p>
              <p>
                First, behavioral data is collected without consent. Second, inference is often wrong, and the user has no mechanism to correct it. Third, past behavior predicts present state poorly. A user who chose dense layouts last Tuesday may have a migraine today.
              </p>
              <p>
                Harmonia inverts the model. The user declares state explicitly. The framework derives everything else. No data collected. No inference made. State is always accurate because it comes directly from the source.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-light text-foreground">Architecture</h2>
            <div className="space-y-3">
              {layers.map((layer) => (
                <div
                  key={layer.index}
                  className="grid grid-cols-[2rem_1fr] gap-6 p-5 rounded-2xl border border-border/30 bg-card/20"
                >
                  <div className="font-mono text-accent/50 text-xs pt-1">{layer.index}</div>
                  <div className="space-y-3">
                    <div className="flex items-baseline gap-3">
                      <span className="text-foreground font-semibold">{layer.name}</span>
                      <span className="font-mono text-xs text-muted-foreground/50 border border-border/40 px-2 py-0.5 rounded-full">
                        {layer.type}
                      </span>
                    </div>
                    <code className="block font-mono text-sm text-accent/80 bg-accent/5 px-3 py-2 rounded-lg">
                      {layer.spec}
                    </code>
                    <ul className="space-y-1.5">
                      {layer.detail.map((d, i) => (
                        <li key={i} className="text-muted-foreground text-sm flex gap-2">
                          <span className="text-accent/40 shrink-0 mt-0.5">&#9657;</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
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

          <div className="space-y-4 border-t border-border/20 pt-10">
            <p className="text-muted-foreground/60 font-mono text-xs uppercase tracking-widest">Stack</p>
            <div className="flex flex-wrap gap-2">
              {["React", "TypeScript", "Framer Motion", "CSS Custom Properties", "EMA Signal Processing", "Monorepo"].map(
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
