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

const productionTrendData = [
  { name: "Jan", actual: 1850, target: 2000 },
  { name: "Feb", actual: 1950, target: 2000 },
  { name: "Mar", actual: 2100, target: 2000 },
  { name: "Apr", actual: 2050, target: 2100 },
  { name: "May", actual: 2200, target: 2100 },
  { name: "Jun", actual: 2150, target: 2200 },
]

const partWiseData = [
  { id: "P001", name: "Gear Assembly", avgCycleTime: 2.5, target: 500, actual: 480, rejection: 15 },
  { id: "P002", name: "Shaft Component", avgCycleTime: 1.8, target: 700, actual: 685, rejection: 20 },
  { id: "P003", name: "Bearing Housing", avgCycleTime: 3.2, target: 400, actual: 390, rejection: 10 },
  { id: "P004", name: "Valve Body", avgCycleTime: 2.7, target: 450, actual: 440, rejection: 12 },
  { id: "P005", name: "Piston Ring", avgCycleTime: 1.5, target: 800, actual: 790, rejection: 25 },
]

const rejectionRateData = [
  { name: "P001", rate: 3.1 },
  { name: "P002", rate: 2.9 },
  { name: "P003", rate: 2.6 },
  { name: "P004", rate: 2.7 },
  { name: "P005", rate: 3.2 },
]

const cycleTimeData = [
  { name: "P001", actual: 2.5, standard: 2.3 },
  { name: "P002", actual: 1.8, standard: 1.7 },
  { name: "P003", actual: 3.2, standard: 3.0 },
  { name: "P004", actual: 2.7, standard: 2.5 },
  { name: "P005", actual: 1.5, standard: 1.4 },
]

export function ProductionOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Production Trend</CardTitle>
          <CardDescription>Actual vs Target Production</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={productionTrendData}
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
                <Line type="monotone" dataKey="actual" stroke="#3b82f6" activeDot={{ r: 8 }} name="Actual Production" />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#ef4444"
                  strokeDasharray="5 5"
                  name="Target Production"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rejection Rate</CardTitle>
          <CardDescription>Part-wise rejection percentage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={rejectionRateData}
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
                <Tooltip formatter={(value) => [`${value}%`, "Rejection Rate"]} />
                <Bar dataKey="rate" fill="#ef4444" name="Rejection Rate %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Part-wise Production Details</CardTitle>
          <CardDescription>Production metrics for each part</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Part ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Avg. Cycle Time (min)</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Actual</TableHead>
                <TableHead>Rejection</TableHead>
                <TableHead>Rejection Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partWiseData.map((part) => (
                <TableRow key={part.id}>
                  <TableCell className="font-medium">{part.id}</TableCell>
                  <TableCell>{part.name}</TableCell>
                  <TableCell>{part.avgCycleTime} min</TableCell>
                  <TableCell>{part.target}</TableCell>
                  <TableCell>{part.actual}</TableCell>
                  <TableCell>{part.rejection}</TableCell>
                  <TableCell>{((part.rejection / part.actual) * 100).toFixed(1)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Cycle Time Analysis</CardTitle>
          <CardDescription>Actual vs Standard cycle time for each part</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={cycleTimeData}
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
                <Bar dataKey="actual" fill="#3b82f6" name="Actual Cycle Time (min)" />
                <Bar dataKey="standard" fill="#10b981" name="Standard Cycle Time (min)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

