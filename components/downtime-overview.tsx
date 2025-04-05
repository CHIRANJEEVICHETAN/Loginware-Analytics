"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Area,
  AreaChart,
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
} from "recharts"

const topAlarmsData = [
  { id: 1, alarm: "Emergency Stop", count: 15, avgDuration: 12.5 },
  { id: 2, alarm: "Motor Overload", count: 12, avgDuration: 18.2 },
  { id: 3, alarm: "Low Oil Pressure", count: 10, avgDuration: 8.7 },
  { id: 4, alarm: "Tool Change Required", count: 8, avgDuration: 5.3 },
  { id: 5, alarm: "Material Feed Error", count: 7, avgDuration: 9.1 },
]

const downtimeReasonsData = [
  { name: "Maintenance", value: 35, color: "#3b82f6" },
  { name: "Setup/Changeover", value: 25, color: "#10b981" },
  { name: "Material Shortage", value: 15, color: "#f59e0b" },
  { name: "Operator Break", value: 10, color: "#8b5cf6" },
  { name: "Equipment Failure", value: 15, color: "#ef4444" },
]

const mttrMtbfData = [
  { name: "M001", mttr: 1.2, mtbf: 168 },
  { name: "M002", mttr: 1.5, mtbf: 120 },
  { name: "M003", mttr: 2.1, mtbf: 96 },
  { name: "M004", mttr: 1.3, mtbf: 144 },
  { name: "M005", mttr: 1.8, mtbf: 108 },
]

const downtimeTrendData = [
  { name: "Jan", planned: 24, unplanned: 12 },
  { name: "Feb", planned: 20, unplanned: 14 },
  { name: "Mar", planned: 28, unplanned: 10 },
  { name: "Apr", planned: 22, unplanned: 8 },
  { name: "May", planned: 26, unplanned: 11 },
  { name: "Jun", planned: 24, unplanned: 9 },
]

export function DowntimeOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Top 5 Alarms</CardTitle>
          <CardDescription>Most frequent alarms and their average duration</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Alarm</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Avg. Duration (min)</TableHead>
                <TableHead>Total Time (min)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topAlarmsData.map((alarm) => (
                <TableRow key={alarm.id}>
                  <TableCell className="font-medium">{alarm.id}</TableCell>
                  <TableCell>{alarm.alarm}</TableCell>
                  <TableCell>{alarm.count}</TableCell>
                  <TableCell>{alarm.avgDuration}</TableCell>
                  <TableCell>{(alarm.count * alarm.avgDuration).toFixed(1)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Downtime Reasons</CardTitle>
          <CardDescription>Breakdown of downtime by reason</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={downtimeReasonsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {downtimeReasonsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {downtimeReasonsData.map((reason) => (
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
          <CardTitle>Downtime Trend</CardTitle>
          <CardDescription>Planned vs Unplanned downtime over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={downtimeTrendData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="planned"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  name="Planned Downtime (hrs)"
                />
                <Area
                  type="monotone"
                  dataKey="unplanned"
                  stackId="1"
                  stroke="#ef4444"
                  fill="#ef4444"
                  name="Unplanned Downtime (hrs)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>MTTR & MTBF Analysis</CardTitle>
          <CardDescription>Mean Time To Repair & Mean Time Between Failures</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mttrMtbfData}
                margin={{
                  top: 20,
                  right: 10,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                <YAxis yAxisId="right" orientation="right" stroke="#ef4444" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="mttr" fill="#3b82f6" name="MTTR (hrs)" />
                <Bar yAxisId="right" dataKey="mtbf" fill="#ef4444" name="MTBF (hrs)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

