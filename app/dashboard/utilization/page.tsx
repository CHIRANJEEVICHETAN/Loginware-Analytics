import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UtilizationOverview } from "@/components/utilization-overview"

export default function UtilizationPage() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Machine Utilization</h1>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="today" className="w-[300px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76.3%</div>
            <p className="text-xs text-muted-foreground">+2.5% from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productive Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">183.4 hrs</div>
            <p className="text-xs text-muted-foreground">Out of 240 hrs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Idle Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42.6 hrs</div>
            <p className="text-xs text-muted-foreground">17.8% of total time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downtime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14.0 hrs</div>
            <p className="text-xs text-muted-foreground">5.9% of total time</p>
          </CardContent>
        </Card>
      </div>

      <UtilizationOverview />
    </div>
  )
}

