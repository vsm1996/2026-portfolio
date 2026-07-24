import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Aria - Vanessa Martin",
  description:
    "The accessibility formatter. A meaning-preserving format tier that gates CI, and a lint tier for every guess. One gate splits them: a fix auto-applies only when its basis is native or declared.",
}

const gateRows = [
  { basis: "native", source: "real HTML, per aria-query", tier: "format", fix: "auto-fix", auto: true },
  { basis: "declared", source: "author ARIA / design-system config", tier: "format", fix: "auto-fix", auto: true },
  { basis: "inferred", source: "guessed from onClick, class names, context", tier: "lint", fix: "suggestion", auto: false },
]

const formatRules = [
  { id: "no-redundant-role", note: "removes a role equal to the element's implicit role" },
  { id: "no-unsupported-aria", note: "removes aria-* the resolved role can't carry" },
  { id: "aria-syntax-normalize", note: "canonical lowercase attribute names and token values" },
]

const lintRules = [
  { id: "interactive-role-required", note: "generic element with a click handler and no role" },
  { id: "control-needs-name", note: "icon-only control with no accessible name" },
  { id: "img-needs-alt", note: "image exposed with no accessible name and no decorative signal" },
  { id: "idref-resolves", note: "aria-labelledby / describedby / controls pointing at a missing id" },
  { id: "aria-hidden-not-focusable", note: "aria-hidden over a subtree that still contains a focusable node" },
]

const decisions = [
  {
    decision: "Basis decides the tier",
    rationale:
      "Every accessibility fact carries a basis. Native means real HTML. Declared means author ARIA or config. Inferred means a guess. A fix auto-applies only when its basis is native or declared. Everything inferred is a suggestion a human approves. That one sentence is what makes the tool safe to run on save.",
  },
  {
    decision: "Subtraction, not authorship",
    rationale:
      "The contract is meaning-preservation. After a fix the accessibility tree is identical, or strictly more conformant, with no change to name, role, or state. So format fixes only delete redundant or forbidden ARIA and normalize syntax. The moment a fix would write a label or an alt, it stops. A wrong label is worse than none, and the tool refuses to put words in your mouth.",
  },
  {
    decision: "Detection is certain. Repair is not.",
    rationale:
      "aria-hidden on a focusable node has several valid repairs. An unresolved idref might legitimately point across files. The problem is a fact. The fix is a judgment. So these stay advisory and never fail CI. A false positive on correct code is the one thing the format tier may never produce.",
  },
  {
    decision: "Write once, gate twice",
    rationale:
      "Rules are written once against the ESLint API. They run unchanged in ESLint, in oxlint through jsPlugins, and in a zero-config CLI. The hosts already separate an applied fix from a surfaced suggestion. So the gate is enforced twice. Once by Aria's own tests, once by the host itself.",
  },
  {
    decision: "Config moves the line",
    rationale:
      "The line between guess and known is not fixed. Declare that IconButton is a button and its basis moves from inferred to declared. Its diagnostics graduate from suggestion to a CI-failing gate. The slice that runs automatically grows as the design system matures. It reads like the weakest claim on paper. It is the strongest mechanism in practice.",
  },
]

const verification = [
  {
    label: "Meaning-preservation, tested as a property",
    detail:
      "An accessibility-tree oracle asserts aatree(x) equals aatree(fmt(x)) on every fixture. Idempotence holds too: fmt(fmt(x)) equals fmt(x). A format rule that fails either check is demoted to lint by the test.",
  },
  {
    label: "ESLint and oxlint parity, zero drift",
    detail:
      "A required CI check re-runs every fixture on both hosts and asserts byte-identical output. A second gate packs, installs, and imports the real tarballs, so publish-only breakage cannot slip through.",
  },
  {
    label: "Validated on real code, then published",
    detail:
      "Run against five open-source React repos with hand-reviewed findings. That pass surfaced two rule bugs, both now regression-fixtured. Shipped to npm as eslint-plugin-aria-a11y and @aria-a11y/cli, both at 0.2.0.",
  },
]

export default function AriaPage() {
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
          {/* Header */}
          <div className="space-y-6">
            <p className="text-accent font-mono text-sm font-medium tracking-widest uppercase">Accessibility Tooling</p>
            <h1 className="text-6xl md:text-8xl font-light tracking-tight text-foreground leading-none">Aria</h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-light">
              It never changes what the code means.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://aria-formatter.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:border-accent/50 transition-all"
              >
                Docs &amp; demo
                <ExternalLink className="h-3.5 w-3.5 opacity-50" />
              </a>
              <a
                href="https://github.com/vsm1996/aria"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:border-accent/50 transition-all"
              >
                GitHub
                <ExternalLink className="h-3.5 w-3.5 opacity-50" />
              </a>
              <span className="inline-flex items-center px-4 py-2 rounded-full border border-border/30 font-mono text-xs text-muted-foreground/60">
                eslint-plugin-aria-a11y
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full border border-border/30 text-xs text-muted-foreground/60">
                2 packages / v0.2.0
              </span>
            </div>
          </div>

          {/* The premise */}
          <div className="space-y-4">
            <h2 className="text-2xl font-light text-foreground">The premise</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Code formatters won because they made an argument extinct. Nobody debates brace style anymore.{" "}
                <code className="font-mono text-accent/80">prettier --check</code> turns the debate into a failing
                build. Behind that is one contract: a formatter never changes what the code means.
              </p>
              <p>
                Accessibility has no such tool, and the absence is the excuse. &ldquo;I&apos;ll add a11y later&rdquo;
                survives because a11y looks like judgment work. Not all of it is. A real, defensible slice is mechanical,
                and mechanical work can be held to the formatter contract. Run it on save. Gate it in CI.
              </p>
              <p>
                The catch is that accessibility breaks the contract the instant you guess. Put{" "}
                <code className="font-mono text-accent/80">role=&quot;button&quot;</code> on a div and you changed
                behavior. So Aria is built around one hard line. Finding that line is the whole design.
              </p>
            </div>
          </div>

          {/* The gate */}
          <div className="space-y-4">
            <h2 className="text-2xl font-light text-foreground">The gate</h2>
            <code className="block font-mono text-sm text-accent/80 bg-card/40 border border-border/30 px-5 py-4 rounded-xl">
              a fix auto-applies only when its basis is <span className="text-foreground">native</span> or{" "}
              <span className="text-foreground">declared</span>. never on a guess.
            </code>
            <div className="border border-border/30 rounded-2xl overflow-hidden bg-card/20">
              <table className="w-full text-sm font-mono">
                <thead>
                  <tr className="border-b border-border/20">
                    <th className="text-left px-4 py-2.5 text-muted-foreground/40 font-normal text-xs">basis</th>
                    <th className="text-left px-4 py-2.5 text-muted-foreground/40 font-normal text-xs hidden sm:table-cell">
                      where it came from
                    </th>
                    <th className="text-left px-4 py-2.5 text-muted-foreground/40 font-normal text-xs">tier</th>
                    <th className="text-right px-4 py-2.5 text-muted-foreground/40 font-normal text-xs">result</th>
                  </tr>
                </thead>
                <tbody>
                  {gateRows.map((row) => (
                    <tr
                      key={row.basis}
                      className={`border-b border-border/10 last:border-0 ${row.auto ? "" : "bg-muted/10"}`}
                    >
                      <td className={`px-4 py-2.5 ${row.auto ? "text-accent" : "text-muted-foreground/80"}`}>
                        {row.basis}
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground/40 text-xs hidden sm:table-cell">{row.source}</td>
                      <td className="px-4 py-2.5 text-foreground/80">{row.tier}</td>
                      <td
                        className={`px-4 py-2.5 text-right ${row.auto ? "text-foreground/80" : "text-muted-foreground/60"}`}
                      >
                        {row.fix}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Two tiers, eight rules */}
          <div className="space-y-6">
            <h2 className="text-2xl font-light text-foreground">Two tiers, eight rules</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h3 className="text-muted-foreground/60 font-mono text-xs uppercase tracking-widest">
                  Format · auto-fixed on save
                </h3>
                {formatRules.map((rule) => (
                  <div key={rule.id} className="p-4 rounded-xl border border-border/30 bg-card/20">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      <code className="text-foreground/90 font-mono text-sm">{rule.id}</code>
                    </div>
                    <p className="text-muted-foreground text-sm mt-1.5 pl-3.5">{rule.note}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <h3 className="text-muted-foreground/60 font-mono text-xs uppercase tracking-widest">
                  Lint · located, human-reviewed
                </h3>
                {lintRules.map((rule) => (
                  <div key={rule.id} className="p-4 rounded-xl border border-border/30 bg-card/20">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 shrink-0" />
                      <code className="text-foreground/90 font-mono text-sm">{rule.id}</code>
                    </div>
                    <p className="text-muted-foreground text-sm mt-1.5 pl-3.5">{rule.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Design decisions */}
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

          {/* How it's proven */}
          <div className="space-y-6">
            <h2 className="text-2xl font-light text-foreground">How it&apos;s proven</h2>
            <div className="space-y-4">
              {verification.map((v) => (
                <div key={v.label} className="p-5 rounded-2xl border border-border/30 bg-card/20 space-y-2">
                  <p className="text-foreground font-semibold">{v.label}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div className="space-y-4 border-t border-border/20 pt-10">
            <p className="text-muted-foreground/60 font-mono text-xs uppercase tracking-widest">Stack</p>
            <div className="flex flex-wrap gap-2">
              {[
                "TypeScript",
                "ESLint API",
                "oxlint",
                "aria-query",
                "AST / ESTree",
                "Property testing",
                "Monorepo",
                "npm",
              ].map((tech) => (
                <span key={tech} className="px-3 py-1 text-xs font-mono bg-accent/10 text-accent rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
