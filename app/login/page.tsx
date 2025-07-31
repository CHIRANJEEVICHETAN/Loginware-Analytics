"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { BarChart3, Loader2, LockKeyhole, Mail, ArrowLeft, Shield, Zap, TrendingUp } from "lucide-react"
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

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

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

      {/* Splash Cursor Effect - Less Intense */}
      <SplashCursor
        SIM_RESOLUTION={64}
        DYE_RESOLUTION={512}
        CAPTURE_RESOLUTION={256}
        DENSITY_DISSIPATION={5.0}
        VELOCITY_DISSIPATION={3.0}
        PRESSURE={0.05}
        PRESSURE_ITERATIONS={15}
        CURL={2}
        SPLAT_RADIUS={0.15}
        SPLAT_FORCE={3000}
        SHADING={true}
        COLOR_UPDATE_SPEED={5}
        BACK_COLOR={{ r: 0.3, g: 0, b: 0 }}
        TRANSPARENT={true}
      />

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
          <div className="max-w-lg relative z-20">
            {/* Logo and Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-2xl shadow-lg">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div>
                <BlurText
                  text="Eagle Analytics"
                  delay={100}
                  animateBy="words"
                  direction="top"
                  startImmediately={true}
                  className="text-3xl font-bold text-slate-900 dark:text-slate-300"
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



            {/* Feature Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 gap-3 mb-6"
            >
              <div className="group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-2 shadow-lg">
                    <BarChart3 className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1 text-sm">Real-time Monitoring</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Track machine status and performance in real-time</p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 p-2 shadow-lg">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1 text-sm">OEE Analysis</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Comprehensive OEE metrics at all levels</p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-2 shadow-lg">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1 text-sm">Predictive Maintenance</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">AI-powered alerts for potential failures</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex items-center gap-8 text-sm text-slate-600 dark:text-slate-400"
            >
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
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

