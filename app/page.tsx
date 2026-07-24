import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Aria } from "@/components/aria"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"
import { AnimatedBackground } from "@/components/animated-background"

export default function Home() {
  return (
    <div className="dark min-h-screen">
      <AnimatedBackground />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Aria />
        <Experience />
        <Contact />
      </main>
    </div>
  )
}
