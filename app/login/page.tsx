"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { BarChart3, Loader2, LockKeyhole, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    <div className="flex min-h-screen flex-col w-full">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="flex min-h-screen">
        <div className="hidden md:flex w-1/2 bg-primary/10 flex-col justify-center items-center p-10">
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-orange-500 p-2 rounded">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Loginware Analytics</span>
            </div>
            <h1 className="text-3xl font-bold mb-6">Industry 4.0 Analytics Platform</h1>
            <p className="text-lg mb-8">
              Monitor machine performance, analyze production metrics, and receive predictive maintenance alerts in
              real-time.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-background p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Real-time Monitoring</h3>
                <p className="text-sm text-muted-foreground">Track machine status and performance in real-time</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">OEE Analysis</h3>
                <p className="text-sm text-muted-foreground">Comprehensive OEE metrics at all levels</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Predictive Maintenance</h3>
                <p className="text-sm text-muted-foreground">AI-powered alerts for potential failures</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Production Insights</h3>
                <p className="text-sm text-muted-foreground">Detailed production and quality metrics</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="mx-auto w-full max-w-md">
            <div className="flex flex-col space-y-2 text-center md:hidden mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="bg-orange-500 p-1.5 rounded">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Loginware Analytics</span>
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
              <p className="text-sm text-muted-foreground">Enter your credentials to access the dashboard</p>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="demo">Demo Access</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <Card>
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <Link href="#" className="text-sm text-primary underline-offset-4 hover:underline">
                            Forgot password?
                          </Link>
                        </div>
                        <div className="relative">
                          <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type="password"
                            className="pl-10"
                            autoCapitalize="none"
                            autoComplete="current-password"
                            required
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isLoading ? "Logging in..." : "Login"}
                      </Button>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <p className="text-center text-sm text-muted-foreground w-full">
                      Don't have an account?{" "}
                      <Link href="#" className="text-primary underline-offset-4 hover:underline">
                        Contact your administrator
                      </Link>
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="demo">
                <Card>
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Demo Access</CardTitle>
                    <CardDescription>Use these demo credentials to explore the platform</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-md bg-muted p-4">
                      <div className="mb-2">
                        <span className="font-semibold">Email: </span>
                        <span className="font-mono">demo@loginware.com</span>
                      </div>
                      <div>
                        <span className="font-semibold">Password: </span>
                        <span className="font-mono">demo123</span>
                      </div>
                    </div>
                    <Button
                      className="w-full"
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
          </div>
        </div>
      </div>
    </div>
  )
}

