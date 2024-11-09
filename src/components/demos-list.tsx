'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, MoreHorizontal, Plus, Search } from 'lucide-react'
import { DateRangePicker } from "@/components/date-range-picker"

// Mock data for demos
const demos = [
  { id: 1, date: '2023-05-20', leadName: 'John Doe', clientName: 'Acme Corp', status: 'Scheduled', duration: '60 min' },
  { id: 2, date: '2023-05-22', leadName: 'Jane Smith', clientName: 'TechStart', status: 'Completed', duration: '45 min' },
  { id: 3, date: '2023-05-25', leadName: 'Bob Johnson', clientName: 'Global Solutions', status: 'Canceled', duration: 'N/A' },
  { id: 4, date: '2023-05-18', leadName: 'Alice Brown', clientName: 'Innovate Inc', status: 'Completed', duration: '30 min' },
  { id: 5, date: '2023-05-21', leadName: 'Charlie Wilson', clientName: 'Future Systems', status: 'Scheduled', duration: '60 min' },
]

export default function DemosList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({ from: null, to: null })

  const filteredDemos = demos.filter(demo =>
    (demo.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     demo.clientName.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'All' || demo.status === statusFilter) &&
    (!dateRange.from || new Date(demo.date) >= dateRange.from) &&
    (!dateRange.to || new Date(demo.date) <= dateRange.to)
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Demos</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Demo
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="text"
              placeholder="Search demos..."
              className="pl-8 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={(newRange) => setDateRange(newRange || { from: null, to: null })}
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Scheduled">Scheduled</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Demo Date</TableHead>
              <TableHead>Lead Name</TableHead>
              <TableHead>Client Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDemos.map((demo) => (
              <TableRow key={demo.id}>
                <TableCell>{demo.date}</TableCell>
                <TableCell>{demo.leadName}</TableCell>
                <TableCell>{demo.clientName}</TableCell>
                <TableCell>
                  <Select defaultValue={demo.status}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Canceled">Canceled</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{demo.duration}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Demo</DropdownMenuItem>
                      <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete Demo</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}