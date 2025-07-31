"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
  glowRadius: number
  pulseSpeed: number
  pulseOffset: number
}

interface AnimatedBackgroundProps {
  variant?: "landing" | "app"
  className?: string
}

export function AnimatedBackground({ variant = "app", className = "" }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const isDark = theme === "dark"

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()

    const particles: Particle[] = []
    const particleCount = variant === "landing" ? 200 : 150
    const connectionDistance = variant === "landing" ? 150 : 120

    // Initialize particles with enhanced properties
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (variant === "landing" ? 3 : 2) + 1,
        speedX: (Math.random() - 0.5) * (variant === "landing" ? 1.2 : 0.8),
        speedY: (Math.random() - 0.5) * (variant === "landing" ? 1.2 : 0.8),
        opacity: Math.random() * 0.6 + 0.3,
        glowRadius: Math.random() * 20 + 10,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
        color: isDark
          ? `rgba(${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 100) + 150}, ${Math.floor(Math.random() * 55) + 200}, ${Math.random() * 0.4 + 0.2})`
          : `rgba(${Math.floor(Math.random() * 50) + 50}, ${Math.floor(Math.random() * 50) + 100}, ${Math.floor(Math.random() * 100) + 150}, ${Math.random() * 0.3 + 0.1})`,
      })
    }

    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.016 // Approximate 60fps
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient background for landing page
      if (variant === "landing") {
        const gradient = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          Math.max(canvas.width, canvas.height) / 2
        )
        
        if (isDark) {
          gradient.addColorStop(0, 'rgba(15, 23, 42, 0.8)')
          gradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.6)')
          gradient.addColorStop(1, 'rgba(51, 65, 85, 0.4)')
        } else {
          gradient.addColorStop(0, 'rgba(248, 250, 252, 0.8)')
          gradient.addColorStop(0.5, 'rgba(241, 245, 249, 0.6)')
          gradient.addColorStop(1, 'rgba(226, 232, 240, 0.4)')
        }
        
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges with smooth transitions
        if (particle.x <= 0 || particle.x >= canvas.width) particle.speedX *= -1
        if (particle.y <= 0 || particle.y >= canvas.height) particle.speedY *= -1

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        // Calculate pulse effect
        const pulse = Math.sin(time * particle.pulseSpeed + particle.pulseOffset) * 0.3 + 0.7
        const currentSize = particle.size * pulse
        const currentOpacity = particle.opacity * pulse

        // Draw glow effect for landing page
        if (variant === "landing") {
          const glowGradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.glowRadius * pulse
          )
          
          const glowColor = isDark 
            ? `rgba(100, 200, 255, ${currentOpacity * 0.3})`
            : `rgba(50, 100, 200, ${currentOpacity * 0.2})`
          
          glowGradient.addColorStop(0, glowColor)
          glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
          
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.glowRadius * pulse, 0, Math.PI * 2)
          ctx.fillStyle = glowGradient
          ctx.fill()
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentOpacity})`)
        ctx.fill()

        // Draw connections with enhanced effects
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.4 * pulse
            const lineWidth = variant === "landing" ? 1 : 0.5
            
            // Create gradient for connection lines
            const lineGradient = ctx.createLinearGradient(
              particle.x, particle.y, otherParticle.x, otherParticle.y
            )
            
            const connectionColor = isDark 
              ? `rgba(100, 200, 255, ${opacity})`
              : `rgba(50, 100, 200, ${opacity * 0.7})`
            
            lineGradient.addColorStop(0, connectionColor)
            lineGradient.addColorStop(0.5, connectionColor.replace(/[\d.]+\)$/, `${opacity * 1.5})`))
            lineGradient.addColorStop(1, connectionColor)
            
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = lineGradient
            ctx.lineWidth = lineWidth
            ctx.stroke()
          }
        })
      })

      // Add floating data points for Industry 4.0 theme
      if (variant === "landing") {
        for (let i = 0; i < 5; i++) {
          const x = (Math.sin(time * 0.001 + i) * 0.3 + 0.5) * canvas.width
          const y = (Math.cos(time * 0.0015 + i) * 0.3 + 0.5) * canvas.height
          const size = Math.sin(time * 0.002 + i) * 2 + 3
          
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fillStyle = isDark 
            ? `rgba(255, 255, 255, ${0.1 + Math.sin(time * 0.003 + i) * 0.05})`
            : `rgba(0, 0, 0, ${0.05 + Math.sin(time * 0.003 + i) * 0.03})`
          ctx.fill()
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isDark, variant, mounted])

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 ${className}`}
      style={{ 
        opacity: variant === "landing" ? (isDark ? 0.6 : 0.4) : (isDark ? 0.4 : 0.2),
        filter: variant === "landing" ? "blur(0.5px)" : "none"
      }}
    />
  )
} 