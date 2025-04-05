"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { MotionWrapper, MotionHighlight } from "@/components/ui/motion"
import { AlertCircle, Activity, ListFilter, RefreshCw, Settings, Download, LayoutGrid, List } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts"
import { useState } from "react"
import { toast } from "sonner"

const machineData = [
  {
    id: "M001",
    name: "CNC Machine 1",
    status: "Running",
    operator: "John",
    shift: "Shift 1",
    cycleCount: 120,
    idleReason: null,
  },
  {
    id: "M002",
    name: "CNC Machine 2",
    status: "Idle",
    operator: "Alice",
    shift: "Shift 2",
    cycleCount: 85,
    idleReason: "Tea Break",
  },
  {
    id: "M003",
    name: "CNC Machine 3",
    status: "Down",
    operator: "Mike",
    shift: "Shift 3",
    cycleCount: 60,
    idleReason: "Maintenance",
  },
  {
    id: "M004",
    name: "Lathe Machine 1",
    status: "Running",
    operator: "John",
    shift: "Shift 1",
    cycleCount: 110,
    idleReason: null,
  },
  {
    id: "M005",
    name: "Lathe Machine 2",
    status: "Running",
    operator: "Alice",
    shift: "Shift 2",
    cycleCount: 95,
    idleReason: null,
  },
  {
    id: "M006",
    name: "Grinding Machine 1",
    status: "Idle",
    operator: "Mike",
    shift: "Shift 3",
    cycleCount: 75,
    idleReason: "Material Shortage",
  },
  {
    id: "M007",
    name: "Grinding Machine 2",
    status: "Running",
    operator: "John",
    shift: "Shift 1",
    cycleCount: 105,
    idleReason: null,
  },
  {
    id: "M008",
    name: "Drilling Machine 1",
    status: "Down",
    operator: "Alice",
    shift: "Shift 2",
    cycleCount: 50,
    idleReason: "Breakdown",
  },
  {
    id: "M009",
    name: "Drilling Machine 2",
    status: "Running",
    operator: "Mike",
    shift: "Shift 3",
    cycleCount: 90,
    idleReason: null,
  },
  {
    id: "M010",
    name: "Assembly Station",
    status: "Running",
    operator: "John",
    shift: "Shift 1",
    cycleCount: 115,
    idleReason: null,
  },
]

const statusDistribution = [
  { name: "Running", value: 6, color: "#10b981" },
  { name: "Idle", value: 2, color: "#f59e0b" },
  { name: "Down", value: 2, color: "#ef4444" },
]

const shiftDistribution = [
  { name: "Shift 1", running: 4, idle: 0, down: 0 },
  { name: "Shift 2", running: 1, idle: 1, down: 1 },
  { name: "Shift 3", running: 1, idle: 1, down: 1 },
]

const COLORS = ["#10b981", "#f59e0b", "#ef4444"]

// Helper function for class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

export function MachineStatusOverview() {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "running" | "idle" | "down">("all")
  const [refreshing, setRefreshing] = useState(false)
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")
  
  // Filter machines based on selected status
  const filteredData = selectedFilter === "all" 
    ? machineData 
    : machineData.filter(machine => 
        machine.status.toLowerCase() === selectedFilter
      )
      
  const handleRefresh = () => {
    setRefreshing(true)
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false)
      toast.success("Machine status data refreshed")
    }, 1000)
  }
  
  // Calculate metrics
  const totalMachines = machineData.length
  const runningMachines = machineData.filter(m => m.status === "Running").length
  const availability = (runningMachines / totalMachines) * 100
  
  const toggleViewMode = () => {
    setViewMode(viewMode === "table" ? "grid" : "table")
    toast.info(`Switched to ${viewMode === "table" ? "grid" : "table"} view`)
  }
  
  // Function to get status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case "Running": return "bg-green-500 text-green-700 border-green-500 dark:text-green-400 dark:border-green-400"
      case "Idle": return "bg-amber-500 text-amber-700 border-amber-500 dark:text-amber-400 dark:border-amber-400"
      case "Down": return "bg-red-500 text-red-700 border-red-500 dark:text-red-400 dark:border-red-400"
      default: return ""
    }
  }
  
  return (
    <MotionWrapper className="space-y-6">
      <div className="flex items-center gap-4 justify-between">
        <Tabs 
          value={selectedFilter} 
          onValueChange={(value) => setSelectedFilter(value as "all" | "running" | "idle" | "down")}
          className="w-full md:w-auto"
        >
          <TabsList className="grid grid-cols-4 w-full md:w-[400px]">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="running">Running</TabsTrigger>
            <TabsTrigger value="idle">Idle</TabsTrigger>
            <TabsTrigger value="down">Down</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleViewMode}
            title={`Switch to ${viewMode === "table" ? "grid" : "table"} view`}
          >
            {viewMode === "table" ? (
              <LayoutGrid className="h-4 w-4" />
            ) : (
              <List className="h-4 w-4" />
            )}
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Machines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{machineData.length}</div>
            <p className="text-xs text-muted-foreground">Across all production lines</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Machines Running</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{runningMachines}</div>
            <p className="text-xs text-muted-foreground">{Math.round(availability)}% availability</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Machines Idle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{machineData.filter(m => m.status === "Idle").length}</div>
            <p className="text-xs text-muted-foreground">Awaiting tasks or operators</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Machines Down</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{machineData.filter(m => m.status === "Down").length}</div>
            <p className="text-xs text-muted-foreground">Maintenance or failures</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Machine Status</CardTitle>
              <CardDescription>Real-time status of all machines on the floor</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {viewMode === "table" ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Machine ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Operator</TableHead>
                    <TableHead>Shift</TableHead>
                    <TableHead>Cycle Count</TableHead>
                    <TableHead>Idle Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((machine) => (
                    <TableRow key={machine.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium">{machine.id}</TableCell>
                      <TableCell>{machine.name}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            "bg-opacity-10 border-opacity-30",
                            machine.status === "Running" &&
                              "bg-green-500 text-green-700 border-green-500 dark:text-green-400 dark:border-green-400",
                            machine.status === "Idle" &&
                              "bg-amber-500 text-amber-700 border-amber-500 dark:text-amber-400 dark:border-amber-400",
                            machine.status === "Down" &&
                              "bg-red-500 text-red-700 border-red-500 dark:text-red-400 dark:border-red-400"
                          )}
                        >
                          {machine.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{machine.operator}</TableCell>
                      <TableCell>{machine.shift}</TableCell>
                      <TableCell>{machine.cycleCount}</TableCell>
                      <TableCell>{machine.idleReason || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredData.map((machine) => (
                  <Card key={machine.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="p-4 pb-2 space-y-0">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold">{machine.name}</CardTitle>
                        <Badge
                          variant="outline"
                          className={cn(
                            "bg-opacity-10 border-opacity-30",
                            getStatusColor(machine.status)
                          )}
                        >
                          {machine.status}
                        </Badge>
                      </div>
                      <CardDescription className="text-xs">ID: {machine.id}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Operator:</span>
                          <span className="font-medium">{machine.operator}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Shift:</span>
                          <span className="font-medium">{machine.shift}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Cycle Count:</span>
                          <span className="font-medium">{machine.cycleCount}</span>
                        </div>
                        {machine.idleReason && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Idle Reason:</span>
                            <span className="font-medium">{machine.idleReason}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    {machine.status !== "Running" && (
                      <div className={cn(
                        "h-1.5 w-full",
                        machine.status === "Idle" ? "bg-amber-500" : "bg-red-500"
                      )} />
                    )}
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="justify-end">
            <Button variant="outline" size="sm" className="gap-1" onClick={() => toast.info("View all machines")}>
              <ListFilter className="h-3.5 w-3.5" />
              <span>View all</span>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
            <CardDescription>Current machine status breakdown</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-center gap-4">
              {statusDistribution.map((status) => (
                <div 
                  key={status.name} 
                  className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity"
                  onClick={() => setSelectedFilter(status.name.toLowerCase() as "running" | "idle" | "down")}
                >
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: status.color }} />
                  <span className="text-sm">{status.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Shift-wise Machine Status</CardTitle>
            <CardDescription>Machine status distribution by shift</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={shiftDistribution}
                  margin={{
                    top: 20,
                    right: 10,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="running" stackId="a" fill="#10b981" name="Running" />
                  <Bar dataKey="idle" stackId="a" fill="#f59e0b" name="Idle" />
                  <Bar dataKey="down" stackId="a" fill="#ef4444" name="Down" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Efficiency Metrics</CardTitle>
              <CardDescription>Current efficiency metrics</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Availability</span>
                  {availability >= 85 ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Good</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Warning</Badge>
                  )}
                </div>
                <span className="text-sm font-medium">{availability.toFixed(1)}%</span>
              </div>
              <Progress value={availability} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Performance</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Good</Badge>
                </div>
                <span className="text-sm font-medium">83.3%</span>
              </div>
              <Progress value={83.3} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Quality</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Excellent</Badge>
                </div>
                <span className="text-sm font-medium">97.1%</span>
              </div>
              <Progress value={97.1} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">OEE</span>
                  {(availability * 0.833 * 0.971) / 100 >= 0.75 ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Good</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Warning</Badge>
                  )}
                </div>
                <span className="text-sm font-medium">70.7%</span>
              </div>
              <Progress value={70.7} className="h-2" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full gap-1" onClick={() => toast.info("View detailed efficiency metrics")}>
              <Activity className="h-3.5 w-3.5" />
              <span>View details</span>
            </Button>
          </CardFooter>
        </Card>
        
        {/* Add productivity trend chart */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Productivity Trend</CardTitle>
            <CardDescription>7-day machine productivity overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={[
                    { day: "Mon", running: 8, idle: 1, down: 1 },
                    { day: "Tue", running: 7, idle: 2, down: 1 },
                    { day: "Wed", running: 6, idle: 2, down: 2 },
                    { day: "Thu", running: 8, idle: 1, down: 1 },
                    { day: "Fri", running: 9, idle: 0, down: 1 },
                    { day: "Sat", running: 7, idle: 1, down: 2 },
                    { day: "Sun", running: 5, idle: 3, down: 2 },
                  ]}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="running" stackId="1" stroke="#10b981" fill="#10b981" />
                  <Area type="monotone" dataKey="idle" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
                  <Area type="monotone" dataKey="down" stackId="1" stroke="#ef4444" fill="#ef4444" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </MotionWrapper>
  )
}

