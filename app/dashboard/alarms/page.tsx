"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlarmsOverview } from "@/components/alarms-overview"
import { AlertTriangle, Bell, Clock, WrenchIcon } from "lucide-react"
import { GridPage } from "@/components/page-wrapper"
import { AnimatedCard, MotionHighlight, MotionWrapper } from "@/components/ui/motion"

export default function AlarmsPage() {
  return (
    <GridPage
      title="Alarms Analysis"
      description="Monitor and analyze alarm patterns across your machines"
      action={
        <Tabs defaultValue="today" className="w-[300px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
          </TabsList>
        </Tabs>
      }
    >
      <div className="grid gap-4 md:grid-cols-4">
        <AnimatedCard delay={0.1}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alarms</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <MotionHighlight animation="pulse">
              <div className="text-2xl font-bold">78</div>
            </MotionHighlight>
            <p className="text-xs text-muted-foreground">-5.2% from last period</p>
          </CardContent>
        </AnimatedCard>
        
        <AnimatedCard delay={0.2}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alarms</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <MotionHighlight animation="tada">
              <div className="text-2xl font-bold text-rose-500">14</div>
            </MotionHighlight>
            <p className="text-xs text-muted-foreground">+2 from last period</p>
          </CardContent>
        </AnimatedCard>
        
        <AnimatedCard delay={0.3}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. MTBF</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <MotionHighlight animation="pulse">
              <div className="text-2xl font-bold">143.6 hrs</div>
            </MotionHighlight>
            <p className="text-xs text-muted-foreground">+5.8% from last period</p>
          </CardContent>
        </AnimatedCard>
        
        <AnimatedCard delay={0.4}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. MTTR</CardTitle>
            <WrenchIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <MotionHighlight animation="pulse">
              <div className="text-2xl font-bold">10.3 min</div>
            </MotionHighlight>
            <p className="text-xs text-muted-foreground">-2.1% from last period</p>
          </CardContent>
        </AnimatedCard>
      </div>

      <MotionWrapper delay={0.5}>
        <AlarmsOverview />
      </MotionWrapper>
    </GridPage>
  )
} 