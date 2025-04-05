import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Cpu,
  Database,
  Gauge,
  LineChart,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col w-full">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 items-center">
            <div className="bg-orange-500 p-1.5 rounded">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">Loginware Analytics</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <ThemeToggle />
            <nav className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/login">
                <Button>Get Started</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Real-time Machine Analytics for Industry 4.0
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Monitor machine performance, analyze production metrics, and
                    receive predictive maintenance alerts in real-time.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg" className="gap-1">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[400px] overflow-hidden rounded-xl">
                  <Image
                    src="/Machine.jpg"
                    alt="Dashboard Preview"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900"
        >
          <div className="container">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Comprehensive Analytics Suite
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our integrated platform connects all your Industry 4.0 systems
                  for seamless data collection, processing, and visualization.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Gauge className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Real-time Monitoring</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Track machine status, cycle counts, and operator details in
                  real-time.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Performance Analytics</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Visualize utilization, efficiency, and downtime with advanced
                  charts.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Cpu className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Predictive Maintenance</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Receive AI-powered alerts for potential failures before they
                  occur.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Centralized Database</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  All systems connected via a unified database for seamless
                  integration.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">OEE Analysis</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Track Overall Equipment Effectiveness at plant, machine,
                  shift, and operator levels.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Secure Access</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Role-based access control for operators, supervisors,
                  maintenance teams, and managers.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t items-center justify-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Loginware Softtec PVT LTD. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
