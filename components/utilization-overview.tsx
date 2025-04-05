"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const machineUtilizationData = [
  { id: "M001", name: "CNC Machine 1", utilization: 82.5, productive: 19.8, idle: 3.2, down: 1.0 },
  { id: "M002", name: "CNC Machine 2", utilization: 75.8, productive: 18.2, idle: 4.8, down: 1.0 },
  { id: "M003", name: "CNC Machine 3", utilization: 68.3, productive: 16.4, idle: 5.6, down: 2.0 },
  { id: "M004", name: "Lathe Machine 1", utilization: 79.2, productive: 19.0, idle: 3.5, down: 1.3 },
  { id: "M005", name: "Lathe Machine 2", utilization: 81.7, productive: 19.6, idle: 3.0, down: 1.4 },
  { id: "M006", name: "Grinding Machine 1", utilization: 72.5, productive: 17.4, idle: 5.1, down: 1.5 },
  { id: "M007", name: "Grinding Machine 2", utilization: 77.1, productive: 18.5, idle: 4.2, down: 1.3 },
  { id: "M008", name: "Drilling Machine 1", utilization: 70.8, productive: 17.0, idle: 5.5, down: 1.5 },
  { id: "M009", name: "Drilling Machine 2", utilization: 78.3, productive: 18.8, idle: 3.7, down: 1.5 },
  { id: "M010", name: "Assembly Station", utilization: 80.4, productive: 19.3, idle: 3.2, down: 1.5 },
]

const shiftUtilizationData = [
  { name: "Shift 1", utilization: 82.5, productive: 19.8, idle: 3.2, down: 1.0 },
  { name: "Shift 2", utilization: 75.8, productive: 18.2, idle: 4.8, down: 1.0 },
  { name: "Shift 3", utilization: 70.6, productive: 16.9, idle: 5.6, down: 1.5 },
]

const utilizationTrendData = [
  { name: "Jan", utilization: 72.5 },
  { name: "Feb", utilization: 74.8 },
  { name: "Mar", utilization: 73.3 },
  { name: "Apr", utilization: 76.3 },
  { name: "May", utilization: 75.9 },
  { name: "Jun", utilization: 78.1 },
]

const idleReasonData = [
  { name: "Setup/Changeover", value: 35, color: "#3b82f6" },
  { name: "Material Shortage", value: 25, color: "#10b981" },
  { name: "Operator Break", value: 20, color: "#f59e0b" },
  { name: "Waiting for QC", value: 10, color: "#8b5cf6" },
  { name: "Other", value: 10, color: "#6b7280" },
]

export function UtilizationOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Machine Utilization</CardTitle>
          <CardDescription>Utilization breakdown for each machine</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={machineUtilizationData}
                margin={{
                  top: 20,
                  right: 0,
                  left: 20,
                  bottom: 5,
                }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip formatter={(value) => [`${value}%`, "Utilization"]} />
                <Legend />
                <Bar dataKey="utilization" fill="#3b82f6" name="Utilization %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Idle Time Reasons</CardTitle>
          <CardDescription>Breakdown of idle time by reason</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={idleReasonData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {idleReasonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {idleReasonData.map((reason) => (
              <div key={reason.name} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: reason.color }} />
                <span className="text-sm">{reason.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Shift-wise Utilization</CardTitle>
          <CardDescription>Utilization comparison across shifts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={shiftUtilizationData}
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
                <Bar dataKey="productive" stackId="a" fill="#10b981" name="Productive Time (hrs)" />
                <Bar dataKey="idle" stackId="a" fill="#f59e0b" name="Idle Time (hrs)" />
                <Bar dataKey="down" stackId="a" fill="#ef4444" name="Down Time (hrs)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Utilization Trend</CardTitle>
          <CardDescription>Utilization percentage over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={utilizationTrendData}
                margin={{
                  top: 5,
                  right: 0,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[60, 90]} />
                <Tooltip formatter={(value) => [`${value}%`, "Utilization"]} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="utilization"
                  stroke="#3b82f6"
                  activeDot={{ r: 8 }}
                  name="Utilization %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Detailed Machine Utilization</CardTitle>
          <CardDescription>Breakdown of time for each machine</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Machine ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Utilization %</TableHead>
                <TableHead>Productive (hrs)</TableHead>
                <TableHead>Idle (hrs)</TableHead>
                <TableHead>Down (hrs)</TableHead>
                <TableHead>Total (hrs)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {machineUtilizationData.map((machine) => (
                <TableRow key={machine.id}>
                  <TableCell className="font-medium">{machine.id}</TableCell>
                  <TableCell>{machine.name}</TableCell>
                  <TableCell>{machine.utilization}%</TableCell>
                  <TableCell>{machine.productive}</TableCell>
                  <TableCell>{machine.idle}</TableCell>
                  <TableCell>{machine.down}</TableCell>
                  <TableCell>{(machine.productive + machine.idle + machine.down).toFixed(1)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

