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
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
} from "recharts"
import { cn } from "@/lib/utils"

// Mock data for top alarms
const topAlarmsData = [
  { id: "A001", description: "Emergency Stop Triggered", count: 24, mttr: 15.2, machine: "M003", severity: "high" },
  { id: "A008", description: "Pressure Limit Exceeded", count: 18, mttr: 8.5, machine: "M005", severity: "medium" },
  { id: "A015", description: "Motor Overload", count: 14, mttr: 22.3, machine: "M002", severity: "high" },
  { id: "A023", description: "Coolant Level Low", count: 12, mttr: 5.8, machine: "M008", severity: "low" },
  { id: "A007", description: "Feed Rate Error", count: 10, mttr: 12.1, machine: "M001", severity: "medium" },
];

// Mock data for MTBF by machine
const mtbfData = [
  { name: "M001", mtbf: 168.5 },
  { name: "M002", mtbf: 120.2 },
  { name: "M003", mtbf: 96.7 },
  { name: "M004", mtbf: 145.3 },
  { name: "M005", mtbf: 172.8 },
  { name: "M006", mtbf: 134.5 },
  { name: "M007", mtbf: 157.2 },
  { name: "M008", mtbf: 128.9 },
  { name: "M009", mtbf: 162.3 },
  { name: "M010", mtbf: 149.7 },
];

// Mock data for MTTR by machine
const mttrData = [
  { name: "M001", mttr: 8.2 },
  { name: "M002", mttr: 15.5 },
  { name: "M003", mttr: 18.3 },
  { name: "M004", mttr: 7.9 },
  { name: "M005", mttr: 6.5 },
  { name: "M006", mttr: 9.8 },
  { name: "M007", mttr: 7.2 },
  { name: "M008", mttr: 11.3 },
  { name: "M009", mttr: 8.7 },
  { name: "M010", mttr: 9.5 },
];

// Mock data for alarm trends over time
const alarmTrendData = [
  { name: "Jan", count: 45, avgMttr: 10.2 },
  { name: "Feb", count: 52, avgMttr: 11.5 },
  { name: "Mar", count: 48, avgMttr: 9.8 },
  { name: "Apr", count: 58, avgMttr: 12.3 },
  { name: "May", count: 42, avgMttr: 8.7 },
  { name: "Jun", count: 38, avgMttr: 7.9 },
];

// Root cause categories
const rootCauseData = [
  { name: "Operator Error", value: 35, color: "#3b82f6" },
  { name: "Mechanical Failure", value: 25, color: "#ef4444" },
  { name: "Electrical Issues", value: 20, color: "#f59e0b" },
  { name: "Maintenance Related", value: 15, color: "#10b981" },
  { name: "External Factors", value: 5, color: "#8b5cf6" },
];

// Correlation data for MTBF vs MTTR
const correlationData = mtbfData.map((item, index) => ({
  name: item.name,
  mtbf: item.mtbf,
  mttr: mttrData[index].mttr,
}));

export function AlarmsOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Top 5 Most Frequent Alarms</CardTitle>
          <CardDescription>Alarm frequency, MTTR, and machine details</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alarm ID</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Machine</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Avg. MTTR (min)</TableHead>
                <TableHead>Severity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topAlarmsData.map((alarm) => (
                <TableRow key={alarm.id}>
                  <TableCell className="font-medium">{alarm.id}</TableCell>
                  <TableCell>{alarm.description}</TableCell>
                  <TableCell>{alarm.machine}</TableCell>
                  <TableCell>{alarm.count}</TableCell>
                  <TableCell>{alarm.mttr} min</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "bg-opacity-10 border-opacity-30",
                        alarm.severity === "high" &&
                          "bg-red-500 text-red-700 border-red-500 dark:text-red-400 dark:border-red-400",
                        alarm.severity === "medium" &&
                          "bg-amber-500 text-amber-700 border-amber-500 dark:text-amber-400 dark:border-amber-400",
                        alarm.severity === "low" &&
                          "bg-green-500 text-green-700 border-green-500 dark:text-green-400 dark:border-green-400"
                      )}
                    >
                      {alarm.severity.charAt(0).toUpperCase() + alarm.severity.slice(1)}
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
          <CardTitle>Root Cause Analysis</CardTitle>
          <CardDescription>Breakdown of alarm root causes</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={rootCauseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {rootCauseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {rootCauseData.map((cause) => (
              <div key={cause.name} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cause.color }} />
                <span className="text-sm">{cause.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Machine Mean Time Between Failures (MTBF)</CardTitle>
          <CardDescription>Average time between failures for each machine (hours)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mtbfData}
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
                <Tooltip formatter={(value) => [`${value} hours`, "MTBF"]} />
                <Legend />
                <Bar dataKey="mtbf" fill="#3b82f6" name="MTBF (hours)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Machine Mean Time To Repair (MTTR)</CardTitle>
          <CardDescription>Average repair time for each machine (minutes)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mttrData}
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
                <Tooltip formatter={(value) => [`${value} min`, "MTTR"]} />
                <Legend />
                <Bar dataKey="mttr" fill="#ef4444" name="MTTR (minutes)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Alarm Trends</CardTitle>
          <CardDescription>Number of alarms and average MTTR over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={alarmTrendData}
                margin={{
                  top: 5,
                  right: 0,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="count"
                  stroke="#3b82f6"
                  activeDot={{ r: 8 }}
                  name="Number of Alarms"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="avgMttr"
                  stroke="#ef4444"
                  name="Avg. MTTR (min)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>MTBF vs MTTR Correlation</CardTitle>
          <CardDescription>Relationship between failure frequency and repair time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{
                  top: 20,
                  right: 0,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  dataKey="mtbf"
                  name="MTBF"
                  unit=" hrs"
                  label={{ value: 'MTBF (hours)', position: 'insideBottom', offset: -5 }}
                />
                <YAxis
                  type="number"
                  dataKey="mttr"
                  name="MTTR"
                  unit=" min"
                  label={{ value: 'MTTR (minutes)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value, name) => [
                  `${value} ${name === 'mtbf' ? 'hours' : 'minutes'}`,
                  name === 'mtbf' ? 'MTBF' : 'MTTR'
                ]} />
                <Scatter name="Machines" data={correlationData} fill="#8884d8">
                  {correlationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#3b82f6" />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 