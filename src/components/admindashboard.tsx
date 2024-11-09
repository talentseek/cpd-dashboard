'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDown, ArrowUp, BarChart2, LineChart } from 'lucide-react'

export function DashboardComponent() {
  const [selectedChart, setSelectedChart] = useState<'line' | 'bar'>('line')

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Select defaultValue="last7days">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last7days">Last 7 Days</SelectItem>
            <SelectItem value="last30days">Last 30 Days</SelectItem>
            <SelectItem value="custom">Custom Date Range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[
          { title: "Total Clients", value: 50, change: 5 },
          { title: "Total Leads", value: 150, change: -3 },
          { title: "Total Clicks", value: 1200, change: 10 },
          { title: "Demos Booked", value: 25, change: 2 },
          { title: "Replies", value: 75, change: 8 },
        ].map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              {metric.change > 0 ? (
                <ArrowUp className="h-4 w-4 text-green-600" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change > 0 ? '+' : ''}{metric.change}% from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trends Visualization */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">Trends Visualization</CardTitle>
          <div className="flex space-x-2">
            <Button
              variant={selectedChart === 'line' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedChart('line')}
            >
              <LineChart className="h-4 w-4 mr-2" />
              Line
            </Button>
            <Button
              variant={selectedChart === 'bar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedChart('bar')}
            >
              <BarChart2 className="h-4 w-4 mr-2" />
              Bar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center text-muted-foreground">
            {selectedChart === 'line' ? (
              <LineChart className="h-16 w-16" />
            ) : (
              <BarChart2 className="h-16 w-16" />
            )}
            <span className="ml-2">Chart placeholder</span>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { date: "2024-03-01", activity: "Demo booked for Client A", type: "Demo" },
                { date: "2024-03-02", activity: "Reply received from Lead X", type: "Reply" },
                { date: "2024-03-03", activity: "New lead generated", type: "Lead" },
                { date: "2024-03-04", activity: "Follow-up email sent to Client B", type: "Task" },
                { date: "2024-03-05", activity: "Demo completed with Client C", type: "Demo" },
              ].map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.activity}</TableCell>
                  <TableCell>{item.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}