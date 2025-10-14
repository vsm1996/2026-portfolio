"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { PHI_INVERSE, FIBONACCI_MS, EASING, PHI, GOLDEN_ANGLE } from "@/lib/animation-constants"

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: FIBONACCI_MS.f3 / 1000,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: PHI_INVERSE,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: FIBONACCI_MS.f5 / 1000,
        ease: EASING.golden,
      },
    },
  }

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20 relative" ref={ref}>
      <motion.div
        className="absolute top-20 left-1/4 w-24 h-24 border-2 border-accent/20 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, 360],
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 16,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-primary/10 rounded-2xl"
        animate={{
          rotate: [0, GOLDEN_ANGLE, GOLDEN_ANGLE * 2, 360],
          scale: [1, PHI, 0.8, 1],
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 14,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/3 right-20 w-20 h-20 border border-accent/30"
        style={{ borderRadius: "50% 50% 30% 70% / 30% 70% 50% 50%" }}
        animate={{
          rotate: [360, 0],
          scale: [1, 1.3, 1],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      {/* End of added floating animated decorative elements */}

      <div className="max-w-2xl w-full">
        <motion.div
          className="space-y-8 text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="space-y-4" variants={itemVariants}>
            <p className="text-accent font-mono text-sm font-semibold">04. What's Next?</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground text-balance">Get In Touch</h2>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="p-8 backdrop-blur-xl bg-card/50 border-border/50 rounded-3xl relative overflow-hidden">
              <motion.div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(90deg, transparent, oklch(0.68 0.32 290 / 0.08), transparent)",
                }}
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
              {/* End of added animated shimmer effect */}
              <div className="space-y-6 relative z-10">
                <p className="text-lg text-muted-foreground font-normal leading-relaxed">
                  I'm always excited to collaborate on new projects or discuss opportunities. Feel free to reach out!
                </p>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    y: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                  }}
                >
                  <Button size="lg" className="group rounded-full relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                    <Mail className="mr-2 h-4 w-4 relative z-10" />
                    <span className="relative z-10">Say Hello</span>
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>

          <motion.footer className="pt-12 space-y-4" variants={itemVariants}>
            <motion.p
              className="text-sm text-muted-foreground"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: FIBONACCI_MS.f7 / 1000,
                repeat: Number.POSITIVE_INFINITY,
                ease: EASING.gentle,
              }}
            >
              Designed & Built by Vanessa Martin
            </motion.p>
            <p className="text-xs text-muted-foreground font-mono">© 2025 All rights reserved</p>
          </motion.footer>
        </motion.div>
      </div>
    </section>
  )
}
