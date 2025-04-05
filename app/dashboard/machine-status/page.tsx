"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { MachineStatusOverview } from "@/components/machine-status-overview"
import { Button } from "@/components/ui/button"
import { Calendar, Filter, Download, RefreshCw } from "lucide-react"
import { toast } from "sonner"

export default function MachineStatusPage() {
  return (
    <PageWrapper>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Machine Status</h1>
            <p className="text-muted-foreground">
              Monitor and analyze the real-time status of all machines on the factory floor
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1" onClick={() => toast.info("Filter settings opened")}>
              <Filter className="h-3.5 w-3.5" />
              <span>Filter</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1" onClick={() => toast.info("Date range picker opened")}>
              <Calendar className="h-3.5 w-3.5" />
              <span>This Week</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1" onClick={() => toast.info("Report downloaded")}>
              <Download className="h-3.5 w-3.5" />
              <span>Export</span>
            </Button>
            <Button size="sm" className="gap-1" onClick={() => toast.success("Data refreshed")}>
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Refresh</span>
            </Button>
          </div>
        </div>

        <MachineStatusOverview />
      </div>
    </PageWrapper>
  )
}

