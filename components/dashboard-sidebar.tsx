"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="shadow-lg border-r border-border">
      <SidebarHeader className="border-b">
        <div className="flex h-[60px] items-center px-4 md:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <div className="bg-orange-500 p-1.5 rounded">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl">Analytics</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8 md:hidden">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
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
      <SidebarFooter className="border-t p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Admin User</span>
              <span className="text-xs text-muted-foreground">admin@loginware.com</span>
            </div>
          </div>
          <TourButton />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

