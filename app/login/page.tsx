"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { BarChart3, Loader2, LockKeyhole, Mail, ArrowLeft, Shield, Zap, TrendingUp, ChevronLeft, ChevronRight, Activity, Gauge, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SplashCursor from "@/components/splash-cursor"
import ModernTechBackground from "@/components/modern-tech-background"
import BlurText from "@/components/blur-text"
import { motion } from "framer-motion"
import Image from "next/image"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Feature carousel data
  const features = [
    {
      icon: BarChart3,
      title: "Real-time Monitoring",
      description: "Track machine status and performance in real-time",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10"
    },
    {
      icon: TrendingUp,
      title: "OEE Analysis",
      description: "Comprehensive OEE metrics at all levels",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/10 to-emerald-500/10"
    },
    {
      icon: Shield,
      title: "Predictive Maintenance",
      description: "AI-powered alerts for potential failures",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10"
    },
    {
      icon: Activity,
      title: "Performance Analytics",
      description: "Deep insights into production efficiency",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/10 to-red-500/10"
    },
    {
      icon: Gauge,
      title: "Quality Control",
      description: "Automated quality monitoring and reporting",
      gradient: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-500/10 to-purple-500/10"
    },
    {
      icon: AlertTriangle,
      title: "Alert Management",
      description: "Smart notifications for critical events",
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-500/10 to-orange-500/10"
    }
  ]

  // Auto-scroll functionality
  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % features.length)
      }, 1500) // 1.5 seconds per slide
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isHovered, features.length])

  // Navigation functions
  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length)
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goToPrevious()
    } else if (e.key === 'ArrowRight') {
      goToNext()
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
      toast({
        title: "Login successful",
        description: "Welcome to Loginware Analytics Dashboard",
      })
    }, 1000)
  }

  return (
    <div className="flex h-screen flex-col w-full relative overflow-hidden bg-white dark:bg-slate-950">
      {/* Modern Tech Background */}
      <ModernTechBackground className="opacity-60 z-0" />

      {/* Splash Cursor Effect - Reduced Intensity */}
      {/* <SplashCursor
        // SIM_RESOLUTION={32}
        // DYE_RESOLUTION={256}
        // CAPTURE_RESOLUTION={128}
        // DENSITY_DISSIPATION={8.0}
        // VELOCITY_DISSIPATION={5.0}
        // PRESSURE={0.02}
        // PRESSURE_ITERATIONS={10}
        // CURL={1}
        // SPLAT_RADIUS={0.08}
        // SPLAT_FORCE={1500}
        // SHADING={true}
        // COLOR_UPDATE_SPEED={3}
        // BACK_COLOR={{ r: 0.1, g: 0, b: 0 }}
        // TRANSPARENT={true}
      /> */}

      {/* Navigation Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-0 left-0 right-0 z-50 p-4"
      >
        <div className="flex items-center gap-4 justify-center">
          <Link href="/" className="flex items-center gap-2 group">
            <Button variant="ghost" size="sm" className="gap-2 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors bg-white/10 dark:bg-slate-900/20 backdrop-blur-sm border border-white/20 dark:border-slate-700/30">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </motion.div>

      <div className="flex h-full relative z-10">
        {/* Left Side - Features Showcase */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:flex w-1/2 flex-col justify-center items-center p-8 relative"
        >
          <div className="max-w-2xl relative z-20">
            {/* Logo and Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-4 mb-12"
            >
              {/* <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-2xl shadow-lg">
                <BarChart3 className="h-10 w-10 text-white" />
                <Image src="/Eagle-Logo.png" alt="Eagle Logo" width="100" height="100" />
              </div> */}
              <div>
                <Image src="/Eagle-Logo.png" alt="Eagle Logo" width="75" height="75"  />
              </div>
              <div>
                <BlurText
                  text="Eagle Analytics"
                  delay={100}
                  animateBy="words"
                  direction="top"
                  startImmediately={true}
                  className="text-4xl font-bold text-slate-900 dark:text-slate-300"
                />
                <div className="flex items-center gap-2 mt-1">
                  <Zap className="h-3 w-3 text-cyan-500" />
                  <BlurText
                    text="Industry 4.0 Ready"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    startImmediately={true}
                    className="text-xs text-slate-600 dark:text-slate-400 font-medium"
                  />
                </div>
              </div>
            </motion.div>



            {/* Dynamic Feature Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative mb-8 px-16"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="region"
              aria-label="Feature showcase carousel"
            >
              {/* Navigation Arrows - Outside the card */}
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white hover:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                aria-label="Previous feature"
              >
                <ChevronLeft className="h-4 w-4 text-slate-600 dark:text-slate-400 transition-colors" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white hover:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                aria-label="Next feature"
              >
                <ChevronRight className="h-4 w-4 text-slate-600 dark:text-slate-400 transition-colors" />
              </button>

              {/* Overlapping Carousel Container */}
              <div className="relative h-64 w-full">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon
                  const isActive = index === currentSlide
                  const isPrevious = index === (currentSlide - 1 + features.length) % features.length
                  const isNext = index === (currentSlide + 1) % features.length
                  
                  // Calculate position and visibility
                  let translateX = 0
                  let zIndex = 1
                  let opacity = 0.3
                  let scale = 0.85
                  
                  if (isActive) {
                    translateX = 0
                    zIndex = 30
                    opacity = 1
                    scale = 1
                  } else if (isPrevious) {
                    translateX = -60
                    zIndex = 20
                    opacity = 0.3
                    scale = 0.85
                  } else if (isNext) {
                    translateX = 60
                    zIndex = 20
                    opacity = 0.3
                    scale = 0.85
                  } else {
                    // Hide other cards completely
                    opacity = 0
                    scale = 0.7
                  }

                  return (
                    <div
                      key={index}
                      className="absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                      style={{
                        transform: `translateX(${translateX}%) scale(${scale})`,
                        zIndex,
                        opacity,
                      }}
                      role="tabpanel"
                      aria-label={`Feature ${index + 1}: ${feature.title}`}
                      aria-hidden={!isActive}
                    >
                      <div className="group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm shadow-lg h-full cursor-pointer"
                           onClick={() => !isActive && goToSlide(index)}>
                        <div className={`absolute inset-0 bg-gradient-to-r ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-8">
                          <div className={`rounded-full bg-gradient-to-r ${feature.gradient} p-4 shadow-lg mb-4 transition-transform duration-300 ${isActive ? 'group-hover:scale-110' : ''}`}>
                            <IconComponent className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-lg">{feature.title}</h3>
                            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
                          </div>
                        </div>
                        
                        {/* Subtle indicator for inactive cards */}
                        {!isActive && (isPrevious || isNext) && (
                          <div className="absolute inset-0 bg-slate-900/10 dark:bg-slate-100/5 pointer-events-none" />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Progress Indicator */}
              <div className="flex justify-center mt-4 gap-2" role="tablist" aria-label="Feature navigation">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${index === currentSlide
                        ? 'w-8 bg-gradient-to-r from-cyan-500 to-blue-500'
                        : 'w-1.5 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                      }`}
                    role="tab"
                    aria-selected={index === currentSlide}
                    aria-label={`Go to feature ${index + 1}`}
                  />
                ))}
              </div>


            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex items-center gap-10 text-base text-slate-600 dark:text-slate-400"
            >
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                <span>99.9% Uptime</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-20"
        >
          <div className="mx-auto w-full max-w-md">
            {/* Mobile Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col space-y-2 text-center lg:hidden mb-6"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-3xl shadow-lg">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <BlurText
                  text="Eagle Analytics"
                  delay={100}
                  animateBy="words"
                  direction="top"
                  startImmediately={true}
                  className="text-2xl font-bold text-slate-900 dark:text-slate-300"
                />
              </div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-slate-900 to-slate-600 dark:from-slate-300 dark:to-slate-500 bg-clip-text text-transparent">
                Welcome back
              </h1>
              <p className="text-slate-600 dark:text-slate-400">Enter your credentials to access the dashboard</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-3xl">
                  <TabsTrigger value="login" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-3xl">
                    Login
                  </TabsTrigger>
                  <TabsTrigger value="demo" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-3xl">
                    Demo Access
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <Card className="border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/70 backdrop-blur-sm shadow-2xl rounded-3xl ring-2 ring-cyan-500/20 dark:ring-cyan-400/20">
                    <CardHeader className="space-y-1 text-center">
                      <CardTitle className="text-2xl bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-300 dark:to-slate-500 bg-clip-text text-transparent">
                        Sign In
                      </CardTitle>
                      <CardDescription className="text-slate-600 dark:text-slate-400">
                        Enter your credentials to access your account
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-medium">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500 dark:text-slate-400" />
                            <Input
                              id="email"
                              placeholder="name@example.com"
                              type="email"
                              autoCapitalize="none"
                              autoComplete="email"
                              autoCorrect="off"
                              className="pl-10 bg-white/50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-700 focus:border-cyan-500 dark:focus:border-cyan-400 transition-colors rounded-2xl"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-slate-700 dark:text-slate-300 font-medium">Password</Label>
                            <Link href="#" className="text-sm text-cyan-600 dark:text-cyan-400 underline-offset-4 hover:underline transition-colors">
                              Forgot password?
                            </Link>
                          </div>
                          <div className="relative">
                            <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-slate-500 dark:text-slate-400" />
                            <Input
                              id="password"
                              type="password"
                              className="pl-10 bg-white/50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-700 focus:border-cyan-500 dark:focus:border-cyan-400 transition-colors rounded-2xl"
                              autoCapitalize="none"
                              autoComplete="current-password"
                              required
                            />
                          </div>
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-2xl"
                          disabled={isLoading}
                        >
                          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                      </form>
                    </CardContent>
                    <CardFooter>
                      <p className="text-center text-sm text-slate-600 dark:text-slate-400 w-full">
                        Don't have an account?{" "}
                        <Link href="#" className="text-cyan-600 dark:text-cyan-400 underline-offset-4 hover:underline font-medium transition-colors">
                          Contact your administrator
                        </Link>
                      </p>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="demo">
                  <Card className="border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/70 backdrop-blur-sm shadow-2xl rounded-3xl ring-2 ring-green-500/20 dark:ring-green-400/20">
                    <CardHeader className="space-y-1 text-center">
                      <CardTitle className="text-2xl bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-300 dark:to-slate-500 bg-clip-text text-transparent">
                        Demo Access
                      </CardTitle>
                      <CardDescription className="text-slate-600 dark:text-slate-400">
                        Use these demo credentials to explore the platform
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="rounded-3xl bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 p-6 border border-slate-300 dark:border-slate-600">
                        <div className="mb-3">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">Email: </span>
                          <span className="font-mono text-cyan-600 dark:text-cyan-400 bg-white dark:bg-slate-800 px-2 py-1 rounded-2xl text-sm">
                            demo@loginware.com
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">Password: </span>
                          <span className="font-mono text-cyan-600 dark:text-cyan-400 bg-white dark:bg-slate-800 px-2 py-1 rounded-2xl text-sm">
                            demo123
                          </span>
                        </div>
                      </div>
                      <Button
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-2xl"
                        onClick={() => {
                          setIsLoading(true)
                          setTimeout(() => {
                            setIsLoading(false)
                            router.push("/dashboard")
                            toast({
                              title: "Demo login successful",
                              description: "Welcome to Loginware Analytics Dashboard",
                            })
                          }, 1000)
                        }}
                        disabled={isLoading}
                      >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isLoading ? "Accessing demo..." : "Access Demo"}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

