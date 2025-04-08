"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GridPage } from "@/components/page-wrapper"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Clock,
  Cog,
  Cpu,
  DollarSign,
  Gauge,
  History,
  LineChart,
  ShieldAlert,
  Wrench,
} from "lucide-react"
import { OeeOverview } from "@/components/oee-overview"
import { UtilizationOverview } from "@/components/utilization-overview"
import { ProductionOverview } from "@/components/production-overview"
import { MaintenanceOverview } from "@/components/maintenance-overview"
import { 
  AnimatedCard, 
  MotionHighlight, 
  MotionChart,
  MotionWrapper 
} from "@/components/ui/motion"
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <GridPage
      title="Dashboard"
      description="Overview of your factory performance and key metrics"
    >
      <div className="grid gap-4 mb-4 md:grid-cols-2 lg:grid-cols-4">
        <AnimatedCard delay={0.1}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">OEE</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <MotionHighlight animation="pulse">
              <div className="text-2xl font-bold">72.5%</div>
            </MotionHighlight>
            <p className="text-xs text-muted-foreground">
              +1.2% from last month
            </p>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard delay={0.2}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Machine Utilization
            </CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <MotionHighlight animation="pulse">
              <div className="text-2xl font-bold">78.2%</div>
            </MotionHighlight>
            <p className="text-xs text-muted-foreground">
              +2.5% from last month
            </p>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard delay={0.3}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Parts Produced
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <MotionHighlight animation="pulse">
              <div className="text-2xl font-bold">12,458</div>
            </MotionHighlight>
            <p className="text-xs text-muted-foreground">
              +485 from last month
            </p>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard delay={0.4}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alarms</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <MotionHighlight animation="tada">
              <div className="text-2xl font-bold text-rose-500">7</div>
            </MotionHighlight>
            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
          </CardContent>
        </AnimatedCard>
      </div>

      <Tabs defaultValue="oee">
        <MotionWrapper direction="up" delay={0.5}>
          <TabsList className="mb-4 grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="oee">OEE</TabsTrigger>
            <TabsTrigger value="utilization">Utilization</TabsTrigger>
            <TabsTrigger value="production">Production</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="alarms">Alarms</TabsTrigger>
          </TabsList>
        </MotionWrapper>

        <MotionChart>
          <TabsContent value="oee" className="space-y-4">
            <OeeOverview />
          </TabsContent>
        </MotionChart>

        <MotionChart>
          <TabsContent value="utilization" className="space-y-4">
            <UtilizationOverview />
          </TabsContent>
        </MotionChart>

        <MotionChart>
          <TabsContent value="production" className="space-y-4">
            <ProductionOverview />
          </TabsContent>
        </MotionChart>

        <MotionChart>
          <TabsContent value="maintenance" className="space-y-4">
            <MaintenanceOverview />
          </TabsContent>
        </MotionChart>

        <MotionChart>
          <TabsContent value="alarms" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Alarms</CardTitle>
                <CardDescription>List of recent alarm events</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Navigate to the Alarms page for a complete alarms analytics
                  view.
                </p>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto flex items-center gap-2"
                    onClick={() => router.push("/dashboard/alarms")}
                  >
                    <Activity className="h-4 w-4" />
                    <span>View Alarms Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </MotionChart>
      </Tabs>
    </GridPage>
  );
}

