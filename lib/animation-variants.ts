/**
 * Animation variants for consistent animations across the application
 * These can be used with Framer Motion components
 */
import { Variants } from "framer-motion"

// Page transition animations
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] 
    }
  },
  exit: { 
    opacity: 0,
    y: -10,
    transition: { 
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] 
    }
  }
}

// Staggered children container animation
export const staggerContainer: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.07,
      delayChildren: 0.1
    }
  }
}

// Staggered item animation - fade up
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

// Staggered item animation - fade in
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.4 
    }
  }
}

// Card hover animation
export const cardHover: Variants = {
  initial: { scale: 1 },
  animate: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: { 
      duration: 0.3, 
      ease: "easeOut" 
    }
  }
}

// Slide in from left
export const slideInLeft: Variants = {
  initial: { x: -50, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: { 
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] 
    }
  }
}

// Slide in from right
export const slideInRight: Variants = {
  initial: { x: 50, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: { 
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] 
    }
  }
}

// Expand animation
export const expand: Variants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      duration: 0.4,
      ease: "easeOut" 
    }
  }
}

// Staggered list animation
export const list: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  }
}

// List item animation
export const listItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

// Chart animation
export const chartAnimation: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

// Table row animation
export const tableRowAnimation = (index: number): Variants => ({
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.2, 
      delay: index * 0.05,
      ease: "easeOut" 
    } 
  }
})

// Pulse animation
export const pulse: Variants = {
  initial: { scale: 1 },
  animate: { 
    scale: [1, 1.02, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
}

// Tada animation for important elements
export const tada: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.1, 1, 1.1, 1],
    rotate: [0, -3, 0, 3, 0],
    transition: {
      duration: 0.8,
      ease: "easeInOut"
    }
  }
}

// Shimmer effect animation
export const shimmer: Variants = {
  initial: {
    backgroundPosition: "-500px 0",
  },
  animate: {
    backgroundPosition: ["500px 0", "-500px 0"],
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "linear",
    },
  },
}

// Notification bell animation
export const bellRing: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: [0, 15, -15, 10, -10, 5, -5, 0],
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
} 