'use client'

import { useState, useEffect } from 'react'
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
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CheckCircle, Clock, Linkedin, MoreHorizontal, Search, Trophy, X } from 'lucide-react'
import { format, isToday, isBefore, addDays, differenceInDays } from 'date-fns'

// Mock data for leads (tasks)
const leads = [
  { id: 1, name: 'John Doe', linkedIn: 'https://linkedin.com/in/johndoe', company: 'Acme Corp', client: 'TechGrow', lastContacted: '2023-05-15', clicks: 7, status: 'Not Replied', followUpProgress: 3, specialInstructions: 'Follow up in 2 weeks' },
  { id: 2, name: 'Jane Smith', linkedIn: 'https://linkedin.com/in/janesmith', company: 'TechStart', client: 'MarketPro', lastContacted: '2023-05-10', clicks: 12, status: 'Interested', followUpProgress: 4 },
  { id: 3, name: 'Bob Johnson', linkedIn: 'https://linkedin.com/in/bobjohnson', company: 'Global Solutions', client: 'SalesMaster', lastContacted: '2023-05-08', clicks: 5, status: 'Demo Booked', followUpProgress: 6 },
  { id: 4, name: 'Alice Brown', linkedIn: 'https://linkedin.com/in/alicebrown', company: 'Innovate Inc', client: 'GrowthHack', lastContacted: '2023-05-05', clicks: 3, status: 'Not Interested', followUpProgress: 2 },
  { id: 5, name: 'Charlie Wilson', linkedIn: 'https://linkedin.com/in/charliewilson', company: 'Future Systems', client: 'TechGrow', lastContacted: '2023-05-12', clicks: 9, status: 'Not Replied', followUpProgress: 1 },
]

const clients = ['All Clients', 'TechGrow', 'MarketPro', 'SalesMaster', 'GrowthHack']
const statuses = ['All Statuses', 'Not Replied', 'Not Interested', 'Interested', 'Demo Booked']

function FollowUpProgress({ progress }: { progress: number }) {
  const steps = [
    { day: 1, description: "Initial message sent" },
    { day: 3, description: "First followup" },
    { day: 7, description: "Second followup" },
    { day: 14, description: "Third followup" },
    { day: 28, description: "Fourth followup" },
    { day: 58, description: "Final followup" },
  ]

  return (
    <div className="flex items-center space-x-1">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`w-4 h-4 rounded-full ${
            index < progress ? 'bg-green-500' : 'bg-gray-300'
          }`}
          title={`Day ${step.day}: ${step.description}`}
        />
      ))}
    </div>
  )
}

export function TasksDashboardComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [clientFilter, setClientFilter] = useState('All Clients')
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [completionStreak, setCompletionStreak] = useState(3)
  const [showNotification, setShowNotification] = useState(false)
  const [xp, setXp] = useState(0) // Current XP
  const [level, setLevel] = useState(1) // Current level

  const today = new Date()
  const levelXpThreshold = 100 // XP required per level
  const levelProgress = (xp % levelXpThreshold) / levelXpThreshold * 100 // XP progress within current level

  const filteredLeads = leads.filter(lead =>
    (lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     lead.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (clientFilter === 'All Clients' || lead.client === clientFilter) &&
    (statusFilter === 'All Statuses' || lead.status === statusFilter)
  )

  const tasksDueToday = filteredLeads.filter(lead => isToday(new Date(lead.lastContacted)))
  const tasksOverdue = filteredLeads.filter(lead => isBefore(new Date(lead.lastContacted), today) && lead.status !== 'Demo Booked')
  const upcomingTasks = filteredLeads.filter(lead => 
    !isToday(new Date(lead.lastContacted)) && 
    !isBefore(new Date(lead.lastContacted), today) && 
    isBefore(new Date(lead.lastContacted), addDays(today, 7))
  )

  const completedTasksToday = tasksDueToday.filter(lead => lead.status === 'Demo Booked')
  const completionPercentage = (completedTasksToday.length / tasksDueToday.length) * 100 || 0

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Demo Booked': return 'bg-green-500'
      case 'Interested': return 'bg-yellow-500'
      case 'Not Replied': return 'bg-blue-500'
      case 'Not Interested': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const completeTask = (leadId) => {
    const newXp = xp + 50
    setXp(newXp)
    if (newXp >= level * levelXpThreshold) {
      setLevel(level + 1)
      alert(`Congratulations! You've reached level ${level + 1}!`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Task Dashboard</h1>

      {/* Gamification Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold">Level {level}</div>
          <div className="w-64">
            <Progress value={levelProgress} max={100} className="h-2 bg-gray-200 text-green-500" />
          </div>
          <div className="text-sm text-muted-foreground">{xp} XP</div>
        </div>
        <div className="flex items-center space-x-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          <span className="text-lg font-bold">{completionStreak} day streak</span>
        </div>
      </div>

      {/* Daily Summary Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Due Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasksDueToday.length}</div>
            <Progress value={completionPercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {completedTasksToday.length} of {tasksDueToday.length} completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
            <X className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{tasksOverdue.length}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Tasks</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingTasks.length}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Due in the next 7 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Task List */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lead & Company</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Last Contacted</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Follow-up Progress</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <a href={lead.linkedIn} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <span className="font-medium">{lead.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{lead.company}</span>
                </TableCell>
                <TableCell>{lead.client}</TableCell>
                <TableCell>
                  {format(new Date(lead.lastContacted), 'MMM d, yyyy')}
                  <br />
                  <span className={`text-sm ${isBefore(new Date(lead.lastContacted), today) ? 'text-red-500' : 'text-muted-foreground'}`}>
                    {isBefore(new Date(lead.lastContacted), today)
                      ? `${differenceInDays(today, new Date(lead.lastContacted))} days ago`
                      : `in ${differenceInDays(new Date(lead.lastContacted), today)} days`
                    }
                  </span>
                </TableCell>
                <TableCell>{lead.clicks}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(lead.status)}>
                    {lead.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <FollowUpProgress progress={lead.followUpProgress} />
                </TableCell>
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
                      <DropdownMenuItem onClick={() => completeTask(lead.id)}>
                        <CheckCircle className="mr-2 h-4 w-4" /> Complete Task
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Clock className="mr-2 h-4 w-4" /> Postpone Task
                      </DropdownMenuItem>
                      <DropdownMenuItem>View Lead Details</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Remove Lead</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Notification */}
      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-md shadow-lg">
          <p className="font-semibold">Reminder</p>
          <p>You have {tasksDueToday.length - completedTasksToday.length} tasks left to complete today!</p>
          <Button variant="secondary" className="mt-2" onClick={() => setShowNotification(false)}>
            Dismiss
          </Button>
        </div>
      )}
    </div>
  )
}