import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"
import { AnimatedBackground } from "@/components/animated-background"
import { Cursor } from "@/components/cursor"

// Section seam — thin crow-iridescent line between dark sections
function SectionSeam() {
  return (
    <div
      aria-hidden="true"
      style={{
        height: "1px",
        backgroundColor: "oklch(0.20 0.05 270)",
        opacity: 0.45,
      }}
    />
  )
}

export default function Home() {
  return (
    <div className="dark min-h-screen">
      <Cursor />
      <AnimatedBackground />
      <Navigation />
      <main>
        <Hero />
        <About />
        <SectionSeam />
        <Experience />
        <SectionSeam />
        <Projects />
        <SectionSeam />
        <Contact />
      </main>
    </div>
  )
}
