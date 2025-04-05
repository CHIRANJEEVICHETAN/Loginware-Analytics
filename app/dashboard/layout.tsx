"use client"

import type React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { Notifications } from "@/components/notifications"
import { Separator } from "@/components/ui/separator"
import { TourGuide } from "@/components/tour-guide"
import { AnimatePresence } from "@/components/ui/motion"
import { motion } from "framer-motion"
import { Bell } from "lucide-react"
import { useEffect, useState } from "react"

// ClientOnly wrapper component
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  return <>{children}</>
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ClientOnly>
        <TourGuide />
      </ClientOnly>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <SidebarInset className="flex flex-col flex-1 w-full">
          <motion.div 
            className="flex h-16 items-center justify-between gap-4 border-b bg-background px-3 md:px-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2">
              <SidebarTrigger className="sidebar-trigger" />
              <motion.h1 
                className="text-lg font-semibold md:text-xl hidden sm:inline-block"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                Eagle Analytics
              </motion.h1>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <Notifications className="notifications-button" />
              <ThemeToggle className="theme-toggle" />
              <Separator orientation="vertical" className="h-8 hidden sm:block" />
              <UserNav className="user-nav" />
            </div>
          </motion.div>
          <main className="flex-1 w-full p-3 md:p-6 overflow-hidden">
            <AnimatePresence mode="wait">
              {children}
            </AnimatePresence>
          </main>
        </SidebarInset>
      </div>
    </>
  )
}

