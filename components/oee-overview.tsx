"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

const plantOeeData = [
  { name: "Jan", oee: 65.2 },
  { name: "Feb", oee: 67.8 },
  { name: "Mar", oee: 69.3 },
  { name: "Apr", oee: 70.7 },
  { name: "May", oee: 68.9 },
  { name: "Jun", oee: 72.1 },
]

const machineOeeData = [
  { name: "M001", oee: 74.5 },
  { name: "M002", oee: 69.8 },
  { name: "M003", oee: 71.2 },
  { name: "M004", oee: 68.7 },
  { name: "M005", oee: 72.3 },
  { name: "M006", oee: 65.9 },
  { name: "M007", oee: 73.1 },
  { name: "M008", oee: 67.4 },
  { name: "M009", oee: 70.2 },
  { name: "M010", oee: 71.8 },
]

const shiftOeeData = [
  { name: "Shift 1", oee: 72.3, availability: 88.5, performance: 84.2, quality: 97.0 },
  { name: "Shift 2", oee: 68.5, availability: 85.7, performance: 82.1, quality: 97.5 },
  { name: "Shift 3", oee: 65.2, availability: 83.2, performance: 80.5, quality: 97.3 },
]

const operatorOeeData = [
  { name: "John", oee: 74.5, availability: 89.2, performance: 85.7, quality: 97.8 },
  { name: "Alice", oee: 69.8, availability: 86.3, performance: 82.9, quality: 97.5 },
  { name: "Mike", oee: 71.2, availability: 87.1, performance: 83.8, quality: 97.3 },
]

const oeeComponentsData = [
  { name: "Availability", value: 87.5 },
  { name: "Performance", value: 83.3 },
  { name: "Quality", value: 97.1 },
]

export function OeeOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Plant OEE Trend</CardTitle>
          <CardDescription>Overall Equipment Effectiveness over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={plantOeeData}
                margin={{
                  top: 5,
                  right: 0,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[60, 80]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="oee" stroke="#3b82f6" activeDot={{ r: 8 }} name="OEE %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>OEE Components</CardTitle>
          <CardDescription>Breakdown of OEE factors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={oeeComponentsData}
                margin={{
                  top: 20,
                  right: 0,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" />
                <Tooltip formatter={(value) => [`${value}%`, "Value"]} />
                <Bar dataKey="value" fill="#3b82f6" name="Percentage" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Machine-wise OEE</CardTitle>
          <CardDescription>OEE comparison across all machines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={machineOeeData}
                margin={{
                  top: 5,
                  right: 0,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[60, 80]} />
                <Tooltip formatter={(value) => [`${value}%`, "OEE"]} />
                <Legend />
                <Bar dataKey="oee" fill="#3b82f6" name="OEE %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="shift" className="col-span-3">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="shift">Shift-based OEE</TabsTrigger>
          <TabsTrigger value="operator">Operator-based OEE</TabsTrigger>
        </TabsList>
        <TabsContent value="shift">
          <Card>
            <CardHeader>
              <CardTitle>Shift-based OEE Analysis</CardTitle>
              <CardDescription>OEE comparison across different shifts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={shiftOeeData}
                    margin={{
                      top: 20,
                      right: 0,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, "Value"]} />
                    <Legend />
                    <Bar dataKey="availability" fill="#10b981" name="Availability %" />
                    <Bar dataKey="performance" fill="#f59e0b" name="Performance %" />
                    <Bar dataKey="quality" fill="#3b82f6" name="Quality %" />
                    <Bar dataKey="oee" fill="#8b5cf6" name="OEE %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="operator">
          <Card>
            <CardHeader>
              <CardTitle>Operator-based OEE Analysis</CardTitle>
              <CardDescription>OEE comparison across different operators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={operatorOeeData}
                    margin={{
                      top: 20,
                      right: 0,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, "Value"]} />
                    <Legend />
                    <Bar dataKey="availability" fill="#10b981" name="Availability %" />
                    <Bar dataKey="performance" fill="#f59e0b" name="Performance %" />
                    <Bar dataKey="quality" fill="#3b82f6" name="Quality %" />
                    <Bar dataKey="oee" fill="#8b5cf6" name="OEE %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

