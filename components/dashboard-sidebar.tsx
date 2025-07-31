"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { BarChart3, Bell, Clock, Cpu, Gauge, Home, LineChart, AlertTriangle, Settings, User, Users, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { TourButton } from "./tour-guide"
import { CommandPalette, SearchTrigger } from "./command-palette"

export function DashboardSidebar() {
  const pathname = usePathname()
  const [commandOpen, setCommandOpen] = useState(false)

  return (
    <>
      <Sidebar className="shadow-lg border-r border-border bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm">
        <SidebarHeader className="border-b border-slate-200 dark:border-slate-800">
          <div className="flex h-[60px] items-center px-4 md:px-6">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-1.5 rounded-xl shadow-lg">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-300 dark:to-slate-500 bg-clip-text text-transparent">
                Analytics
              </span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8 md:hidden rounded-xl border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
          </div>
        </SidebarHeader>
        <SidebarContent className="bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">

        {/* Search Bar */}
        <div className="px-4 pb-2 pt-4">
            <SearchTrigger onClick={() => setCommandOpen(true)} />
          </div>
        {/* Company Section */}
        <SidebarGroup className="sidebar-company-group">
          <SidebarGroupLabel>Company</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/company"}>
                  <Link href="/dashboard/company">
                    <Home className="h-4 w-4" />
                    <span>Company Master</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/shift"}>
                  <Link href="/dashboard/shift">
                    <Clock className="h-4 w-4" />
                    <span>Shift</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup className="sidebar-dashboard-group">
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                  <Link href="/dashboard">
                    <Home className="h-4 w-4" />
                    <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/machine-status"}>
                  <Link href="/dashboard/machine-status">
                    <Cpu className="h-4 w-4" />
                    <span>Machine Status</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuBadge className="bg-red-500 text-white">3</SidebarMenuBadge>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/utilization"}>
                  <Link href="/dashboard/utilization">
                    <Gauge className="h-4 w-4" />
                    <span>Utilization</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/oee"}>
                  <Link href="/dashboard/oee">
                    <LineChart className="h-4 w-4" />
                    <span>OEE Analysis</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup className="sidebar-analysis-group">
          <SidebarGroupLabel>Analysis</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/operator-performance"}>
                  <Link href="/dashboard/operator-performance">
                    <Users className="h-4 w-4" />
                    <span>Operator Performance</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/production"}>
                  <Link href="/dashboard/production">
                    <BarChart3 className="h-4 w-4" />
                    <span>Production Trends</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/alarms"}>
                  <Link href="/dashboard/alarms">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Alarms Analysis</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuBadge className="bg-red-500 text-white">5</SidebarMenuBadge>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/downtime"}>
                  <Link href="/dashboard/downtime">
                    <Clock className="h-4 w-4" />
                    <span>Downtime Analysis</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuBadge className="bg-amber-500 text-white">2</SidebarMenuBadge>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/maintenance"}>
                  <Link href="/dashboard/maintenance">
                    <Wrench className="h-4 w-4" />
                    <span>Predictive Maintenance</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/profile"}>
                  <Link href="/dashboard/profile">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/settings"}>
                  <Link href="/dashboard/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t border-slate-200 dark:border-slate-800 p-4 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Admin User</span>
                <span className="text-xs text-slate-600 dark:text-slate-400">admin@loginware.com</span>
              </div>
            </div>
            <TourButton />
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      
      {/* Command Palette */}
      <CommandPalette open={commandOpen} setOpen={setCommandOpen} />
    </>
  )
}

