"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

const operatorPerformanceData = [
  { id: 1, name: "John", efficiency: 92.5, avgCycleTime: 2.3, production: 520, idle: 12.5, idlePercent: 8.7 },
  { id: 2, name: "Alice", efficiency: 87.8, avgCycleTime: 2.5, production: 480, idle: 15.2, idlePercent: 10.6 },
  { id: 3, name: "Mike", efficiency: 85.3, avgCycleTime: 2.6, production: 460, idle: 14.9, idlePercent: 10.3 },
]

const operatorIdleData = [
  { name: "John", teaBreak: 4.5, meeting: 3.0, other: 5.0 },
  { name: "Alice", teaBreak: 5.2, meeting: 4.0, other: 6.0 },
  { name: "Mike", teaBreak: 4.8, meeting: 3.5, other: 6.6 },
]

const cycleTimeData = [
  { name: "John", actual: 2.3, standard: 2.5 },
  { name: "Alice", actual: 2.5, standard: 2.5 },
  { name: "Mike", actual: 2.6, standard: 2.5 },
]

const efficiencyTrendData = [
  { name: "Week 1", john: 91.2, alice: 86.5, mike: 84.8 },
  { name: "Week 2", john: 92.0, alice: 87.2, mike: 85.0 },
  { name: "Week 3", john: 91.5, alice: 86.8, mike: 84.5 },
  { name: "Week 4", john: 92.5, alice: 87.8, mike: 85.3 },
]

export function OperatorPerformanceOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Operator Efficiency</CardTitle>
          <CardDescription>Production efficiency per operator</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={operatorPerformanceData}
                margin={{
                  top: 20,
                  right: 10,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[80, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, "Efficiency"]} />
                <Legend />
                <Bar dataKey="efficiency" fill="#3b82f6" name="Efficiency %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cycle Time Comparison</CardTitle>
          <CardDescription>Actual vs Standard cycle time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={cycleTimeData}
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
                <Bar dataKey="actual" fill="#3b82f6" name="Actual Cycle Time (min)" />
                <Bar dataKey="standard" fill="#10b981" name="Standard Cycle Time (min)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Idle Time Analysis</CardTitle>
          <CardDescription>Breakdown of idle time by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={operatorIdleData}
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
                <Bar dataKey="teaBreak" stackId="a" fill="#3b82f6" name="Tea Break (hrs)" />
                <Bar dataKey="meeting" stackId="a" fill="#10b981" name="Meeting (hrs)" />
                <Bar dataKey="other" stackId="a" fill="#f59e0b" name="Other (hrs)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Efficiency Trend</CardTitle>
          <CardDescription>Operator efficiency over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={efficiencyTrendData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[80, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, "Efficiency"]} />
                <Legend />
                <Line type="monotone" dataKey="john" stroke="#3b82f6" activeDot={{ r: 8 }} name="John" />
                <Line type="monotone" dataKey="alice" stroke="#10b981" activeDot={{ r: 8 }} name="Alice" />
                <Line type="monotone" dataKey="mike" stroke="#f59e0b" activeDot={{ r: 8 }} name="Mike" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Detailed Operator Performance</CardTitle>
          <CardDescription>Comprehensive performance metrics for each operator</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Operator</TableHead>
                <TableHead>Efficiency %</TableHead>
                <TableHead>Avg. Cycle Time (min)</TableHead>
                <TableHead>Production Count</TableHead>
                <TableHead>Idle Time (hrs)</TableHead>
                <TableHead>Idle %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {operatorPerformanceData.map((operator) => (
                <TableRow key={operator.id}>
                  <TableCell className="font-medium">{operator.name}</TableCell>
                  <TableCell>{operator.efficiency}%</TableCell>
                  <TableCell>{operator.avgCycleTime}</TableCell>
                  <TableCell>{operator.production}</TableCell>
                  <TableCell>{operator.idle}</TableCell>
                  <TableCell>{operator.idlePercent}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

