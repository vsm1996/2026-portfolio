"use client"

import { Card } from "@/components/ui/card"
import { cubicBezier, motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { PHI_INVERSE, FIBONACCI_MS, EASING, STAGGER, PHI, GOLDEN_ANGLE } from "@/lib/animation-constants"
import { Code2, FileType, Component, Layers, Server, Palette, Database, GitBranch } from "lucide-react"

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const skills = [
    { name: "Next.js", icon: Layers },
    { name: "React", icon: Component },
    { name: "TypeScript", icon: FileType },
    { name: "Tailwind CSS", icon: Palette },
    { name: "JavaScript (ES6+)", icon: Code2 },
    { name: "Node.js", icon: Server },
    { name: "Prisma ORM", icon: Database },
    { name: "Git", icon: GitBranch },
  ]

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
      y: 50,
      scale: PHI_INVERSE,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: FIBONACCI_MS.f6 / 1000,
        ease: EASING.golden,
      },
    },
  }

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * (FIBONACCI_MS.f1 / 1000),
        duration: FIBONACCI_MS.f3 / 1000,
        ease: EASING.gentle,
      },
    }),
  }

  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 py-32 relative" ref={ref}>
      <motion.div
        className="absolute top-20 right-10 w-24 h-24 border-2 border-primary/20 rounded-3xl"
        animate={
          prefersReducedMotion
            ? {}
            : {
              rotate: [0, 360],
              scale: [1, PHI, 1],
              x: [0, 20, 0],
              y: [0, -15, 0],
            }
        }
        transition={{
          rotate: { duration: 21, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          x: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          y: { duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
        style={{ willChange: prefersReducedMotion ? "auto" : "transform" }}
      />

      <motion.div
        className="absolute bottom-20 left-10 w-16 h-16 border-2 border-accent/30"
        style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
        animate={
          prefersReducedMotion
            ? {}
            : {
              rotate: [360, 0],
              scale: [1, 1.3, 1],
              y: [0, -30, 0],
              x: [0, 15, 0],
            }
        }
        transition={{
          rotate: { duration: 13, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          y: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          x: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
      />

      <motion.div
        className="absolute top-1/3 left-1/4 w-20 h-20 border border-accent/20 rounded-full"
        animate={
          prefersReducedMotion
            ? {}
            : {
              scale: [1, 1.5, 1],
              rotate: [0, GOLDEN_ANGLE, GOLDEN_ANGLE * 2, 360],
              opacity: [0.2, 0.4, 0.2],
            }
        }
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-primary/10 rounded-lg"
        animate={
          prefersReducedMotion
            ? {}
            : {
              rotate: [0, 90, 180, 270, 360],
              scale: [1, 1.2, 0.8, 1.2, 1],
              x: [0, 20, -20, 0],
              y: [0, -20, 20, 0],
            }
        }
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-6xl w-full">
        <div className="space-y-12">
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: FIBONACCI_MS.f5 / 1000, ease: cubicBezier(EASING.golden[0], EASING.golden[1], EASING.golden[2], EASING.golden[3]) }}
          >
            <h2 className="text-5xl md:text-6xl font-extrabold text-foreground text-balance group cursor-default">
              <span
                className="transition-all duration-500 bg-linear-to-r from-foreground to-foreground bg-clip-text group-hover:from-primary group-hover:via-accent group-hover:to-secondary group-hover:text-transparent"
                style={{ backgroundSize: "300% 300%" }}
              >
                {"About Me".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{
                      delay: i * 0.05,
                      duration: 0.3,
                    }}
                    style={{ display: char === " " ? "inline" : "inline-block" }}
                    whileHover={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      transition: { duration: 2, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY },
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
            </h2>
            <motion.div
              className="h-1 bg-linear-to-r from-accent to-transparent rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: "20rem" } : { width: 0 }}
              transition={{ duration: FIBONACCI_MS.f6 / 1000, ease: cubicBezier(EASING.golden[0], EASING.golden[1], EASING.golden[2], EASING.golden[3]), delay: FIBONACCI_MS.f3 / 1000 }}
            />
          </motion.div>

          <motion.div
            className="grid lg:grid-cols-5 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="lg:col-span-3 space-y-6">
              <motion.div
                variants={cardVariants}
                whileHover={{
                  scale: 1.02,
                  rotateX: 2,
                  rotateY: -2,
                  transition: { duration: FIBONACCI_MS.f3 / 1000 },
                }}
              >
                <Card className="p-8 backdrop-blur-xl bg-card/50 border-border/50 rounded-3xl hover:shadow-xl hover:shadow-primary/5 transition-shadow relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: "linear-gradient(90deg, transparent, oklch(0.68 0.32 290 / 0.1), transparent)",
                    }}
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                  <p
                    className="text-lg text-muted-foreground font-normal leading-relaxed relative z-10 transition-all duration-500 bg-linear-to-r from-muted-foreground to-muted-foreground bg-clip-text group-hover:from-primary group-hover:via-accent group-hover:to-secondary group-hover:text-transparent"
                    style={{ backgroundSize: "200% 200%", backgroundPosition: "0% 50%" }}
                  >
                    <motion.span
                      className="inline-block"
                      whileHover={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        transition: { duration: 2, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY },
                      }}
                    >
                      Hello! I'm a passionate developer who loves creating things that live on the internet. My interest
                      in web development started back in 2018 when I decided to take a coding bootcamp for the summer — turns out
                      I love creating web experiences!
                    </motion.span>
                  </p>
                </Card>
              </motion.div>

              <motion.div
                variants={cardVariants}
                whileHover={{
                  scale: 1.02,
                  rotateX: -2,
                  rotateY: 2,
                  transition: { duration: FIBONACCI_MS.f3 / 1000 },
                }}
              >
                <Card className="p-8 backdrop-blur-xl bg-card/50 border-border/50 rounded-3xl hover:shadow-xl hover:shadow-primary/5 transition-shadow group">
                  <p
                    className="text-lg text-muted-foreground font-normal leading-relaxed transition-all duration-500 bg-linear-to-r from-muted-foreground to-muted-foreground bg-clip-text group-hover:from-primary group-hover:via-accent group-hover:to-secondary group-hover:text-transparent"
                    style={{ backgroundSize: "200% 200%", backgroundPosition: "0% 50%" }}
                  >
                    <motion.span
                      className="inline-block"
                      whileHover={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        transition: { duration: 2, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY },
                      }}
                    >
                      Fast-forward to today, and I've had the privilege of working at various companies, from startups
                      to large corporations. My main focus these days is building interactive, dynamic products and
                      digital experiences for a variety of clients.
                    </motion.span>
                  </p>
                </Card>
              </motion.div>

              <motion.div
                variants={cardVariants}
                whileHover={{
                  scale: 1.02,
                  rotateX: 2,
                  rotateY: 2,
                  transition: { duration: FIBONACCI_MS.f3 / 1000 },
                }}
              >
                <Card className="p-8 backdrop-blur-xl bg-card/50 border-border/50 rounded-3xl hover:shadow-xl hover:shadow-primary/5 transition-shadow">
                  <p className="text-lg text-foreground font-semibold mb-4">Technologies I work with:</p>
                  <div className="grid grid-cols-2 gap-3">
                    {skills.map((skill, i) => {
                      const Icon = skill.icon
                      return (
                        <motion.div
                          key={skill.name}
                          className="flex items-center gap-3 group"
                          custom={i}
                          variants={skillVariants}
                          initial="hidden"
                          animate={isInView ? "visible" : "hidden"}
                          whileHover={{ x: 10, scale: 1.05 }}
                        >
                          <motion.div
                            className="text-accent"
                            animate={{
                              scale: [1, 1.2, 1],
                              rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: i * 0.2,
                            }}
                          >
                            <Icon className="w-5 h-5" />
                          </motion.div>
                          <span className="text-base text-muted-foreground font-mono group-hover:text-foreground transition-colors">
                            {skill.name}
                          </span>
                        </motion.div>
                      )
                    })}
                  </div>
                </Card>
              </motion.div>
            </div>

            <motion.div
              variants={cardVariants}
              className="lg:col-span-2"
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                transition: { duration: FIBONACCI_MS.f4 / 1000 },
              }}
            >
              <Card className="relative group pb-0 overflow-hidden backdrop-blur-xl bg-card/50 border-border/50 rounded-3xl">
                <div className="aspect-square lg:aspect-auto lg:h-full bg-linear-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                  <div className="text-center space-y-4 md:pb-6 md:pt-8 md:px-4">
                    <motion.div
                      className="w-48 h-48 rounded-full bg-accent/30 mx-auto backdrop-blur-sm relative overflow-hidden"
                      animate={
                        prefersReducedMotion
                          ? {}
                          : {
                            rotate: [0, 7, -7, 0],
                            y: [0, -7, 0],
                          }
                      }
                      transition={{
                        rotate: {
                          duration: FIBONACCI_MS.f7 / 1000,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: cubicBezier(EASING.gentle[0], EASING.gentle[1], EASING.gentle[2], EASING.gentle[3]),
                        },
                        y: { duration: FIBONACCI_MS.f5 / 500, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      />
                      <motion.img
                        src={"/self.jpeg"}
                        alt="picture of Vanessa"
                        className="w-full h-full object-cover opacity-90"
                        whileHover={{ scale: 1.1, opacity: 1 }}
                        transition={{ duration: FIBONACCI_MS.f6 / 1000, ease: cubicBezier(EASING.golden[0], EASING.golden[1], EASING.golden[2], EASING.golden[3]) }}
                        style={{ willChange: "transform" }}
                      />
                    </motion.div>
                  </div>
                </div>
                <motion.div
                  className="absolute inset-0 bg-linear-to-br from-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
