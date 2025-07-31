"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  BarChart3,
  Clock,
  Cpu,
  Gauge,
  Home,
  LineChart,
  AlertTriangle,
  Settings,
  User,
  Users,
  Wrench,
  Search,
  Calculator,
} from "lucide-react"

interface CommandPaletteProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function CommandPalette({ open, setOpen }: CommandPaletteProps) {
  const router = useRouter()
  const pathname = usePathname()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, setOpen])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [setOpen])

  const navigationItems = [
    {
      group: "Navigation",
      items: [
        {
          title: "Dashboard Overview",
          icon: Home,
          href: "/dashboard",
          keywords: ["home", "overview", "main", "dashboard"]
        },
        {
          title: "Machine Status",
          icon: Cpu,
          href: "/dashboard/machine-status",
          keywords: ["machine", "status", "equipment", "devices"]
        },
        {
          title: "Utilization Analysis",
          icon: Gauge,
          href: "/dashboard/utilization",
          keywords: ["utilization", "efficiency", "usage", "performance"]
        },
        {
          title: "OEE Analysis",
          icon: LineChart,
          href: "/dashboard/oee",
          keywords: ["oee", "effectiveness", "equipment", "overall"]
        },
        {
          title: "Operator Performance",
          icon: Users,
          href: "/dashboard/operator-performance",
          keywords: ["operator", "performance", "workers", "staff"]
        },
        {
          title: "Production Trends",
          icon: BarChart3,
          href: "/dashboard/production",
          keywords: ["production", "trends", "manufacturing", "output"]
        },
        {
          title: "Alarms Analysis",
          icon: AlertTriangle,
          href: "/dashboard/alarms",
          keywords: ["alarms", "alerts", "warnings", "notifications"]
        },
        {
          title: "Downtime Analysis",
          icon: Clock,
          href: "/dashboard/downtime",
          keywords: ["downtime", "maintenance", "stops", "interruptions"]
        },
        {
          title: "Predictive Maintenance",
          icon: Wrench,
          href: "/dashboard/maintenance",
          keywords: ["maintenance", "predictive", "repair", "service"]
        }
      ]
    },
    {
      group: "Company",
      items: [
        {
          title: "Company Master",
          icon: Home,
          href: "/dashboard/company",
          keywords: ["company", "master", "organization", "business"]
        },
        {
          title: "Shift Management",
          icon: Clock,
          href: "/dashboard/shift",
          keywords: ["shift", "schedule", "timing", "work hours"]
        }
      ]
    },
    {
      group: "Settings",
      items: [
        {
          title: "Profile Settings",
          icon: User,
          href: "/dashboard/profile",
          keywords: ["profile", "account", "user", "personal"]
        },
        {
          title: "System Settings",
          icon: Settings,
          href: "/dashboard/settings",
          keywords: ["settings", "configuration", "preferences", "system"]
        }
      ]
    }
  ]

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <div className="border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200/50 dark:ring-slate-800/50">
        <CommandInput
          placeholder="Search pages, features, and actions..."
          className="border-none focus:ring-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 h-14 text-base px-6"
        />
        <CommandList className="max-h-[400px] overflow-y-auto px-2">
          <CommandEmpty className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
            <div className="flex flex-col items-center gap-2">
              <Search className="h-8 w-8 text-slate-400 dark:text-slate-500" />
              <p>No results found.</p>
            </div>
          </CommandEmpty>

          {navigationItems.map((group, groupIndex) => (
            <React.Fragment key={group.group}>
              <CommandGroup
                heading={group.group}
                className={`text-slate-700 dark:text-slate-300 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-slate-500 dark:[&_[cmdk-group-heading]]:text-slate-400 ${groupIndex > 0 ? 'mt-6' : ''}`}
              >
                {group.items.map((item) => (
                  <CommandItem
                    key={item.href}
                    value={`${item.title} ${item.keywords.join(" ")}`}
                    onSelect={() => {
                      runCommand(() => router.push(item.href))
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-sm rounded-2xl mx-1 my-1 hover:bg-white/80 dark:hover:bg-slate-800/80 data-[selected]:bg-gradient-to-r data-[selected]:from-cyan-500/20 data-[selected]:to-blue-500/20 data-[selected]:text-cyan-700 dark:data-[selected]:text-cyan-300 data-[selected]:shadow-lg cursor-pointer transition-all duration-200 backdrop-blur-sm border border-transparent data-[selected]:border-cyan-200 dark:data-[selected]:border-cyan-800"
                  >
                    <div className="p-1.5 rounded-xl bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
                      <item.icon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                    </div>
                    <span className="text-slate-900 dark:text-slate-100 font-medium">{item.title}</span>
                    {pathname === item.href && (
                      <div className="ml-auto flex items-center gap-2">
                        <span className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">Current</span>
                        <div className="h-2 w-2 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50" />
                      </div>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
              {groupIndex < navigationItems.length - 1 && (
                <div className="my-3">
                  <CommandSeparator className="bg-slate-200 dark:bg-slate-800 mx-2" />
                </div>
              )}
            </React.Fragment>
          ))}

          <CommandGroup
            heading="Quick Actions"
            className="text-slate-700 dark:text-slate-300 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-slate-500 dark:[&_[cmdk-group-heading]]:text-slate-400 mt-4"
          >
            <CommandItem
              onSelect={() => runCommand(() => window.location.reload())}
              className="flex items-center gap-3 px-4 py-3 text-sm rounded-2xl mx-1 my-1 hover:bg-white/80 dark:hover:bg-slate-800/80 data-[selected]:bg-gradient-to-r data-[selected]:from-green-500/20 data-[selected]:to-emerald-500/20 data-[selected]:text-green-700 dark:data-[selected]:text-green-300 data-[selected]:shadow-lg cursor-pointer transition-all duration-200 backdrop-blur-sm border border-transparent data-[selected]:border-green-200 dark:data-[selected]:border-green-800"
            >
              <div className="p-1.5 rounded-xl bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900 dark:to-green-800">
                <Calculator className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-slate-900 dark:text-slate-100 font-medium">Refresh Page</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/"))}
              className="flex items-center gap-3 px-4 py-3 text-sm rounded-2xl mx-1 my-1 hover:bg-white/80 dark:hover:bg-slate-800/80 data-[selected]:bg-gradient-to-r data-[selected]:from-blue-500/20 data-[selected]:to-indigo-500/20 data-[selected]:text-blue-700 dark:data-[selected]:text-blue-300 data-[selected]:shadow-lg cursor-pointer transition-all duration-200 backdrop-blur-sm border border-transparent data-[selected]:border-blue-200 dark:data-[selected]:border-blue-800"
            >
              <div className="p-1.5 rounded-xl bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800">
                <Home className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-slate-900 dark:text-slate-100 font-medium">Go to Landing Page</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>

        <div className="border-t border-slate-200 dark:border-slate-800 p-4 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 font-mono text-[10px] font-medium text-slate-600 dark:text-slate-400 shadow-sm">
                <span className="text-xs">⌘</span>K
              </kbd>
              <span>to search</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 font-mono text-[10px] font-medium text-slate-600 dark:text-slate-400 shadow-sm">
                  ↑↓
                </kbd>
                <span>navigate</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 font-mono text-[10px] font-medium text-slate-600 dark:text-slate-400 shadow-sm">
                  ↵
                </kbd>
                <span>select</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommandDialog>
  )
}

export function SearchTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm px-4 py-3 text-sm text-slate-500 dark:text-slate-400 shadow-lg transition-all hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 group"
    >
      <div className="p-1 rounded-lg bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 group-hover:from-cyan-100 group-hover:to-blue-100 dark:group-hover:from-cyan-900 dark:group-hover:to-blue-900 transition-all duration-200">
        <Search className="h-4 w-4 text-slate-600 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors" />
      </div>
      <span className="flex-1 text-left font-medium">Search...</span>
      <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-2 font-mono text-[10px] font-medium text-slate-600 dark:text-slate-400 shadow-sm group-hover:border-cyan-200 dark:group-hover:border-cyan-800 transition-colors">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  )
}