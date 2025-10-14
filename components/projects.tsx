"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, TrendingUp, Users, Award, PlaneTakeoff } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { PHI_INVERSE, FIBONACCI_MS, EASING, STAGGER, GOLDEN_ANGLE } from "@/lib/animation-constants"

const projects = [
  {
    title: "PlayStation",
    description: "A website for a leading gaming company, specializing in branding, product, and community first.",
    context: "Developed for a leading gaming company focusing on branding and community engagement",
    role: "Frontend Developer",
    category: "Gaming",
    outcomes: [
      { label: "Gaming", value: "Leading", icon: Award },
      { label: "Community", value: "First", icon: Users },
    ],
    technologies: ["JavaScript", "React", "Next.js", "jQuery", "CSS", "Ruby", "TailwindCSS", "Storybook", "Netlify", "Git"],
    // github: "https://github.com",
    external: "https://www.playstation.com/",
    image: "/portfolio/playstation.png",
  },
  {
    title: "Hello Goodwin",
    description: "A breakthrough in private charter aviation allowing for aviation to quickly source operators for high-end travelers.",
    context: "Led engineering and stabilization of core frontend architecture for a key internal platform, resolving major rendering and state management issues impacting production.",
    role: "Front-end Engineer",
    category: "Corporate",
    outcomes: [
      { label: "Industry", value: "Private Charter", icon: PlaneTakeoff },
      { label: "Product", value: "Innovation", icon: Award },
    ],
    technologies: ["Next.js", "TypeScript", "MantineUI", "Vercel", "CSS", "React", "Figma"],
    // github: "https://github.com",
    external: "https://app.hellogoodwin.com/",
    image: "/portfolio/goodwin.png",
  },
  {
    title: "The Traveler",
    description: "Display latest travel and aviation news using the New York Times API in a sleek, beautiful design.",
    context: "Built to provide users with curated travel and aviation news in an elegant interface",
    role: "Front-end Engineer",
    category: "Web App",
    outcomes: [
      { label: "API Integration", value: "NYT API", icon: TrendingUp },
      { label: "Design", value: "Sleek UI", icon: Award },
    ],
    technologies: ["React.js", "Next.js", "TailwindCSS", "Vercel", "JavaScript",],
    github: "https://github.com/vsm1996/the-traveler",
    external: "https://thetraveler.vercel.app/",
    image: "/portfolio/thetraveler.png",
  },
  {
    title: "Sincerely Grateful - Internet Practitioners",
    description: "A social media site for a global Buddhist organization.",
    context: "Developed for a global Buddhist organization to connect practitioners worldwide",
    role: "Full-Stack Developer",
    category: "Community",
    outcomes: [
      { label: "Global Reach", value: "Worldwide", icon: Users },
      { label: "Community", value: "Social", icon: Award },
    ],
    technologies: ["Next.js", "TailwindCSS", "PrismaORM", "Vercel", "React.js", "JavaScript", "Postgres", "Node.js",],
    github: "https://github.com/vsm1996/SGIP",
    external: "https://sgip.vercel.app/",
    image: "/portfolio/sgip.png",
  },
  {
    title: "Siena Analytics",
    description: "A fast and feature-rich Headless WordPress site for global supply chain AI company.",
    context: "Created for a global supply chain AI company needing a modern, performant website",
    role: "Frontend Developer",
    category: "Corporate",
    outcomes: [
      { label: "Performance", value: "Fast", icon: TrendingUp },
      { label: "Headless CMS", value: "WordPress", icon: Award },
    ],
    technologies: ["Next.js", "React.js", "CSS", "Node.js", "Vercel"],
    // github: "https://github.com",
    external: "https://www.peaktech.com/portfolio/siena-analytics/?redirect=siena",
    image: "/portfolio/siena.png",
  },
  {
    title: "Nium",
    description: "A website redesign for a global fintech company.",
    context: "Redesigned website for a global fintech company to modernize their online presence",
    role: "Frontend Developer",
    category: "Corporate",
    outcomes: [
      { label: "Redesign", value: "Modern", icon: Award },
      { label: "Fintech", value: "Global", icon: Users },
    ],
    technologies: ["Next.js", "React.js", "SCSS", "Node.js", "Vercel"],
    // github: "https://github.com",
    external: "https://www.nium.com/",
    image: "/portfolio/nium.png",
  },
  {
    title: "Photosnap",
    description: "A home and pricing site for photographers and visual story tellers.",
    context: "Built for photographers and visual storytellers to showcase their work",
    role: "Frontend Developer",
    category: "Creative",
    outcomes: [
      { label: "Visual", value: "Stunning", icon: Award },
      { label: "Pricing", value: "Clear", icon: TrendingUp },
    ],
    technologies: ["Next.js", "React.js", "CSS", "Node.js", "Vercel"],
    github: "https://github.com/vsm1996/photosnap",
    external: "https://photosnap-roan.vercel.app/",
    image: "/portfolio/photosnap.png",
  },
]

const categories = ["All", "Web App", "Community", "Corporate", "Creative", "Gaming"]

export function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: STAGGER.items,
      },
    },
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: PHI_INVERSE,
      rotateX: 10,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        delay: i * (FIBONACCI_MS.f2 / 1000),
        duration: FIBONACCI_MS.f6 / 1000,
        ease: EASING.golden,
      },
    }),
  }

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory)

  const visibleProjects = filteredProjects.slice(0, 3)
  const hiddenProjects = filteredProjects.slice(3)

  const handleToggleProjects = () => {
    if (showAllProjects) {
      setShowAllProjects(false)
      setTimeout(() => {
        ref.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 400)
    } else {
      setShowAllProjects(true)
    }
  }

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-32" ref={ref}>
      <div className="max-w-7xl w-full">
        <div className="space-y-16">
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: FIBONACCI_MS.f5 / 1000, ease: EASING.golden }}
          >
            <h2 className="text-5xl md:text-6xl font-extrabold text-foreground text-balance">
              {"Featured Work".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{
                    delay: i * 0.03,
                    duration: 0.3,
                  }}
                  style={{ display: char === " " ? "inline" : "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h2>
            <div className="h-1 bg-gradient-to-r from-accent to-transparent max-w-xs rounded-full" />
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${selectedCategory === category
                  ? "bg-accent text-accent-foreground shadow-lg shadow-accent/30"
                  : "bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground border border-border/50"
                  }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.div
                custom={0}
                variants={cardVariants}
                className="md:col-span-2 lg:row-span-2"
                onHoverStart={() => setExpandedProject(0)}
                onHoverEnd={() => setExpandedProject(null)}
                whileHover={{
                  scale: 1.03,
                  rotateY: 3,
                  rotateX: 2,
                  transition: { duration: FIBONACCI_MS.f3 / 1000, ease: [0.34, 1.56, 0.64, 1] },
                }}
              >
                <Card className="h-full group overflow-hidden backdrop-blur-xl bg-card/50 border-border/50 rounded-3xl hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500">
                  <div className="h-full flex flex-col">
                    <div className="relative aspect-video lg:aspect-[16/10] overflow-hidden">
                      <motion.img
                        src={filteredProjects[0]?.image || "/placeholder.svg"}
                        alt={filteredProjects[0]?.title}
                        className="w-full h-full object-cover opacity-90"
                        whileHover={{ scale: 1.1, opacity: 1 }}
                        transition={{ duration: FIBONACCI_MS.f6 / 1000, ease: EASING.golden }}
                        style={{ willChange: "transform" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                      <AnimatePresence>
                        {expandedProject === 0 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-card/95 backdrop-blur-sm flex items-center justify-center p-8"
                          >
                            <div className="space-y-4 text-center">
                              <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="text-sm text-muted-foreground"
                              >
                                {filteredProjects[0]?.context}
                              </motion.p>
                              <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.15 }}
                                className="text-accent font-medium"
                              >
                                Role: {filteredProjects[0]?.role}
                              </motion.p>
                              <div className="flex gap-6 justify-center">
                                {filteredProjects[0]?.outcomes.map((outcome, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2 + i * 0.1, type: "spring" }}
                                    className="text-center"
                                  >
                                    <outcome.icon className="h-6 w-6 mx-auto mb-2 text-accent" />
                                    <p className="text-2xl font-bold text-foreground">{outcome.value}</p>
                                    <p className="text-xs text-muted-foreground">{outcome.label}</p>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex-1 p-8 space-y-4">
                      <div>
                        <p className="text-accent font-mono text-sm font-semibold mb-2">Featured Project</p>
                        <h3 className="text-3xl font-bold text-foreground">{filteredProjects[0]?.title}</h3>
                      </div>

                      <p className="text-muted-foreground leading-relaxed text-lg font-normal">
                        {filteredProjects[0]?.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {filteredProjects[0]?.technologies.map((tech, i) => (
                          <motion.span
                            key={tech}
                            className="px-3 py-1 text-sm font-mono text-accent bg-accent/10 rounded-full"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                            transition={{
                              delay: (FIBONACCI_MS.f5 + i * FIBONACCI_MS.f1) / 1000,
                              duration: FIBONACCI_MS.f3 / 1000,
                              ease: EASING.spring,
                            }}
                            whileHover={{ scale: 1.1, rotate: GOLDEN_ANGLE / 20 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 pt-2">
                        <motion.a
                          href={filteredProjects[0]?.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-accent transition-all"
                          whileHover={{ scale: 1.2, rotate: GOLDEN_ANGLE / 10 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Github className="h-6 w-6" />
                          <span className="sr-only">GitHub</span>
                        </motion.a>
                        <motion.a
                          href={filteredProjects[0]?.external}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-accent transition-all"
                          whileHover={{ scale: 1.2, rotate: -GOLDEN_ANGLE / 10 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ExternalLink className="h-6 w-6" />
                          <span className="sr-only">External Link</span>
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {visibleProjects.slice(1).map((project, index) => (
                <motion.div
                  key={index}
                  custom={index + 1}
                  variants={cardVariants}
                  onHoverStart={() => setExpandedProject(index + 1)}
                  onHoverEnd={() => setExpandedProject(null)}
                  whileHover={{
                    scale: 1.08,
                    rotateY: 4,
                    rotateZ: 2,
                    transition: { duration: FIBONACCI_MS.f3 / 1000, ease: [0.68, -0.6, 0.32, 1.6] },
                  }}
                >
                  <Card className="h-full group overflow-hidden backdrop-blur-xl bg-card/50 border-border/50 rounded-3xl hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500">
                    <div className="h-full flex flex-col">
                      <div className="relative aspect-video overflow-hidden">
                        <motion.img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover opacity-90"
                          whileHover={{ scale: 1.15, opacity: 1 }}
                          transition={{ duration: FIBONACCI_MS.f6 / 1000, ease: EASING.golden }}
                          style={{ willChange: "transform" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                        <AnimatePresence>
                          {expandedProject === index + 1 && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 bg-card/95 backdrop-blur-sm flex items-center justify-center p-4"
                            >
                              <div className="space-y-3 text-center">
                                <motion.p
                                  initial={{ y: 10, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  className="text-xs text-muted-foreground"
                                >
                                  {project.context}
                                </motion.p>
                                <div className="flex gap-4 justify-center">
                                  {project.outcomes.map((outcome, i) => (
                                    <motion.div
                                      key={i}
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ delay: 0.1 + i * 0.05, type: "spring" }}
                                      className="text-center"
                                    >
                                      <outcome.icon className="h-4 w-4 mx-auto mb-1 text-accent" />
                                      <p className="text-lg font-bold text-foreground">{outcome.value}</p>
                                      <p className="text-[10px] text-muted-foreground">{outcome.label}</p>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="flex-1 p-6 space-y-3">
                        <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm font-normal line-clamp-3">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <motion.span
                              key={tech}
                              className="px-2 py-1 text-xs font-mono text-accent bg-accent/10 rounded-full"
                              whileHover={{ scale: 1.1, rotate: 3 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-accent transition-all"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Github className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                          </motion.a>
                          <motion.a
                            href={project.external}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-accent transition-all"
                            whileHover={{ scale: 1.2, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ExternalLink className="h-5 w-5" />
                            <span className="sr-only">External Link</span>
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}

              <AnimatePresence mode="popLayout">
                {showAllProjects &&
                  hiddenProjects.map((project, index) => (
                    <motion.div
                      key={`hidden-${index}`}
                      initial={{ opacity: 0, y: 60, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          delay: index * 0.15,
                          duration: 0.6,
                          ease: [0.34, 1.56, 0.64, 1],
                        },
                      }}
                      exit={{
                        opacity: 0,
                        y: 40,
                        scale: 0.9,
                        transition: {
                          duration: 0.5,
                          ease: [0.4, 0, 0.2, 1],
                          delay: (hiddenProjects.length - index - 1) * 0.08, // Stagger in reverse
                        },
                      }}
                      onHoverStart={() => setExpandedProject(visibleProjects.length + index)}
                      onHoverEnd={() => setExpandedProject(null)}
                      whileHover={{
                        scale: 1.08,
                        rotateY: 4,
                        rotateZ: 2,
                        transition: { duration: FIBONACCI_MS.f3 / 1000, ease: [0.68, -0.6, 0.32, 1.6] },
                      }}
                    >
                      <Card className="h-full group overflow-hidden backdrop-blur-xl bg-card/50 border-border/50 rounded-3xl hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500">
                        <div className="h-full flex flex-col">
                          <div className="relative aspect-video overflow-hidden">
                            <motion.img
                              src={project.image || "/placeholder.svg"}
                              alt={project.title}
                              className="w-full h-full object-cover opacity-90"
                              whileHover={{ scale: 1.15, opacity: 1 }}
                              transition={{ duration: FIBONACCI_MS.f6 / 1000, ease: EASING.golden }}
                              style={{ willChange: "transform" }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                            <AnimatePresence>
                              {expandedProject === visibleProjects.length + index && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="absolute inset-0 bg-card/95 backdrop-blur-sm flex items-center justify-center p-4"
                                >
                                  <div className="space-y-3 text-center">
                                    <motion.p
                                      initial={{ y: 10, opacity: 0 }}
                                      animate={{ y: 0, opacity: 1 }}
                                      className="text-xs text-muted-foreground"
                                    >
                                      {project.context}
                                    </motion.p>
                                    <div className="flex gap-4 justify-center">
                                      {project.outcomes.map((outcome, i) => (
                                        <motion.div
                                          key={i}
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          transition={{ delay: 0.1 + i * 0.05, type: "spring" }}
                                          className="text-center"
                                        >
                                          <outcome.icon className="h-4 w-4 mx-auto mb-1 text-accent" />
                                          <p className="text-lg font-bold text-foreground">{outcome.value}</p>
                                          <p className="text-[10px] text-muted-foreground">{outcome.label}</p>
                                        </motion.div>
                                      ))}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          <div className="flex-1 p-6 space-y-3">
                            <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                            <p className="text-muted-foreground leading-relaxed text-sm font-normal line-clamp-3">
                              {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {project.technologies.slice(0, 4).map((tech) => (
                                <motion.span
                                  key={tech}
                                  className="px-2 py-1 text-xs font-mono text-accent bg-accent/10 rounded-full"
                                  whileHover={{ scale: 1.1, rotate: 3 }}
                                >
                                  {tech}
                                </motion.span>
                              ))}
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                              <motion.a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-accent transition-all"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                              </motion.a>
                              <motion.a
                                href={project.external}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-accent transition-all"
                                whileHover={{ scale: 1.2, rotate: -5 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <ExternalLink className="h-5 w-5" />
                                <span className="sr-only">External Link</span>
                              </motion.a>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="text-center pt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              delay: FIBONACCI_MS.f6 / 1000,
              duration: FIBONACCI_MS.f5 / 1000,
              ease: EASING.golden,
            }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                onClick={handleToggleProjects}
                className="rounded-full px-8 h-14 text-base backdrop-blur-xl bg-background/50 border-border/50 hover:bg-accent/10 hover:border-accent/50"
              >
                {showAllProjects ? "Show Less" : "View All Projects"}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
