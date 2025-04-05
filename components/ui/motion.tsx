"use client"

import * as React from "react"
import { motion, HTMLMotionProps, Variants, AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion"
import { cn } from "@/lib/utils"
import * as animationVariants from "@/lib/animation-variants"

// Advanced AnimatedCard with hover effects and entrance animations
type AnimatedCardProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode
  hoverEffect?: boolean
  delay?: number
}

export function AnimatedCard({ 
  children, 
  className, 
  hoverEffect = true, 
  delay = 0,
  ...props 
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, delay }}
      whileHover={hoverEffect ? { scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" } : undefined}
      className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Enhanced AnimatedButton with improved tactile feedback
type AnimatedButtonProps = HTMLMotionProps<"button"> & {
  children: React.ReactNode
}

export function AnimatedButton({ children, className, ...props }: AnimatedButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  )
}

// Enhanced MotionWrapper with more animation options
type MotionWrapperProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  variant?: keyof typeof animationVariants
  staggerChildren?: boolean
}

export function MotionWrapper({ 
  children, 
  className, 
  direction = "up", 
  delay = 0, 
  duration = 0.3,
  variant,
  staggerChildren = false,
  ...props 
}: MotionWrapperProps) {
  const directions = {
    up: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
    down: { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } },
  }

  let selectedVariant: any;

  // Use the specified animation variant if provided
  if (variant && typeof animationVariants[variant] !== 'undefined') {
    selectedVariant = animationVariants[variant];
  } else {
    selectedVariant = directions[direction];
  }

  // Custom transition if staggering children
  const customTransition = staggerChildren ? {
    duration,
    delay,
    staggerChildren: 0.07,
    delayChildren: delay,
  } : { duration, delay };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={selectedVariant}
      transition={customTransition}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Simple fade animation
type MotionFadeProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode
  delay?: number
  duration?: number
}

export function MotionFade({ children, className, delay = 0, duration = 0.3, ...props }: MotionFadeProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// New component for charts with scaling animations
type MotionChartProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode
  delay?: number
}

export function MotionChart({ children, className, delay = 0, ...props }: MotionChartProps) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={animationVariants.chartAnimation}
      transition={{ delay }}
      className={cn("overflow-hidden", className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// New component for list items with staggered animations
type MotionListProps = HTMLMotionProps<"ul"> & {
  children: React.ReactNode
}

export function MotionList({ children, className, ...props }: MotionListProps) {
  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      variants={animationVariants.list}
      className={className}
      {...props}
    >
      {children}
    </motion.ul>
  )
}

// New component for list items
type MotionListItemProps = HTMLMotionProps<"li"> & {
  children: React.ReactNode
  index?: number
}

export function MotionListItem({ children, className, index = 0, ...props }: MotionListItemProps) {
  return (
    <motion.li
      variants={animationVariants.listItem}
      custom={index}
      className={className}
      {...props}
    >
      {children}
    </motion.li>
  )
}

// New component for highlighted elements with attention-grabbing animations
type MotionHighlightProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode
  animation?: "pulse" | "tada" | "bounce"
  delay?: number
}

export function MotionHighlight({ 
  children, 
  className, 
  animation = "pulse", 
  delay = 0,
  ...props 
}: MotionHighlightProps) {
  const bounceAnimation: Variants = {
    initial: { y: 0 },
    animate: { 
      y: [0, -10, 0],
      transition: {
        delay,
        duration: 0.5,
        repeat: 1,
        ease: "easeInOut"
      }
    }
  };
  
  let selectedAnimation: Variants;
  
  switch (animation) {
    case "tada":
      selectedAnimation = animationVariants.tada;
      break;
    case "bounce":
      selectedAnimation = bounceAnimation;
      break;
    case "pulse":
    default:
      selectedAnimation = animationVariants.pulse;
  }
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={selectedAnimation}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Page transition component
type PageTransitionProps = {
  children: React.ReactNode
  className?: string
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={animationVariants.pageVariants}
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  )
}

// Shimmer effect component for skeleton loading states
type ShimmerProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode
  width?: string | number
  height?: string | number
}

export function Shimmer({ children, className, width, height, ...props }: ShimmerProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={animationVariants.shimmer}
      style={{ 
        width, 
        height,
        backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)",
        backgroundSize: "500px 100%",
        backgroundRepeat: "no-repeat"
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Provide LazyMotion for use when needed
export { LazyMotion, domAnimation, m, AnimatePresence } 