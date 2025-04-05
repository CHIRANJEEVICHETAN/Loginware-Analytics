"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { cn } from "@/lib/utils"

const maintenancePredictionData = [
  {
    id: "M002",
    name: "CNC Machine 2",
    component: "Spindle Bearing",
    health: 68,
    daysRemaining: 5,
    lastMaintenance: "2023-12-15",
  },
  {
    id: "M008",
    name: "Drilling Machine 1",
    component: "Motor",
    health: 72,
    daysRemaining: 7,
    lastMaintenance: "2023-11-20",
  },
  {
    id: "M003",
    name: "CNC Machine 3",
    component: "Hydraulic System",
    health: 75,
    daysRemaining: 10,
    lastMaintenance: "2023-12-05",
  },
  {
    id: "M006",
    name: "Grinding Machine 1",
    component: "Coolant Pump",
    health: 81,
    daysRemaining: 14,
    lastMaintenance: "2023-12-10",
  },
  {
    id: "M001",
    name: "CNC Machine 1",
    component: "Tool Changer",
    health: 85,
    daysRemaining: 18,
    lastMaintenance: "2024-01-05",
  },
]

const componentHealthData = [
  { name: "Spindle Bearings", health: 78 },
  { name: "Motors", health: 85 },
  { name: "Hydraulic Systems", health: 82 },
  { name: "Coolant Pumps", health: 90 },
  { name: "Tool Changers", health: 88 },
  { name: "Control Systems", health: 92 },
]

const energyConsumptionData = [
  { name: "M001", normal: 12.5, actual: 12.8 },
  { name: "M002", normal: 15.2, actual: 16.8 },
  { name: "M003", normal: 14.8, actual: 15.0 },
  { name: "M004", normal: 13.5, actual: 13.7 },
  { name: "M005", normal: 16.2, actual: 16.5 },
  { name: "M006", normal: 14.5, actual: 14.3 },
  { name: "M007", normal: 13.8, actual: 13.9 },
  { name: "M008", normal: 15.5, actual: 15.4 },
  { name: "M009", normal: 14.2, actual: 14.0 },
  { name: "M010", normal: 13.2, actual: 13.1 },
]

const failurePredictionData = [
  { name: "Jan", predicted: 3, actual: 2 },
  { name: "Feb", predicted: 2, actual: 3 },
  { name: "Mar", predicted: 4, actual: 3 },
  { name: "Apr", predicted: 3, actual: 2 },
  { name: "May", predicted: 2, actual: 2 },
  { name: "Jun", predicted: 3, actual: 3 },
]

export function MaintenanceOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Maintenance Predictions</CardTitle>
          <CardDescription>Components requiring maintenance soon</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Machine</TableHead>
                <TableHead>Component</TableHead>
                <TableHead>Health Score</TableHead>
                <TableHead>Days Remaining</TableHead>
                <TableHead>Last Maintenance</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maintenancePredictionData.map((item) => (
                <TableRow key={`${item.id}-${item.component}`}>
                  <TableCell className="font-medium">
                    {item.id} - {item.name}
                  </TableCell>
                  <TableCell>{item.component}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={item.health} className="h-2 w-20" />
                      <span>{item.health}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.daysRemaining}</TableCell>
                  <TableCell>{item.lastMaintenance}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "bg-opacity-10 border-opacity-30",
                        item.daysRemaining <= 7 &&
                          "bg-red-500 text-red-700 border-red-500 dark:text-red-400 dark:border-red-400",
                        item.daysRemaining > 7 &&
                          item.daysRemaining <= 14 &&
                          "bg-amber-500 text-amber-700 border-amber-500 dark:text-amber-400 dark:border-amber-400",
                        item.daysRemaining > 14 &&
                          "bg-green-500 text-green-700 border-green-500 dark:text-green-400 dark:border-green-400",
                      )}
                    >
                      {item.daysRemaining <= 7 ? "Urgent" : item.daysRemaining <= 14 ? "Soon" : "Scheduled"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Component Health</CardTitle>
          <CardDescription>Average health score by component type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={componentHealthData}
                layout="vertical"
                margin={{
                  top: 20,
                  right: 0,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip formatter={(value) => [`${value}%`, "Health Score"]} />
                <Bar dataKey="health" fill="#3b82f6" name="Health Score %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Energy Consumption Analysis</CardTitle>
          <CardDescription>Normal vs Actual energy consumption (kWh)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={energyConsumptionData}
                margin={{
                  top: 20,
                  right: 0,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="normal" fill="#10b981" name="Normal Consumption (kWh)" />
                <Bar dataKey="actual" fill="#3b82f6" name="Actual Consumption (kWh)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Failure Prediction Accuracy</CardTitle>
          <CardDescription>Predicted vs Actual failures</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={failurePredictionData}
                margin={{
                  top: 5,
                  right: 0,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#3b82f6"
                  activeDot={{ r: 8 }}
                  name="Predicted Failures"
                />
                <Line type="monotone" dataKey="actual" stroke="#ef4444" activeDot={{ r: 8 }} name="Actual Failures" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

