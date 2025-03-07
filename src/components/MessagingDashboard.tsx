// src/components/MessagingDashboard.tsx
"use client"

import { useState } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { AlertTriangle, CheckCircle, X, Plus, Send } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

// Mock data - in a real implementation, this would come from Supabase
const campaignData = [
  { id: 1, name: "ProForecast", leads: 35, target: 40, status: "needs_leads" },
  { id: 2, name: "Cygnostic", leads: 42, target: 40, status: "ready" },
  { id: 3, name: "Dokka", leads: 28, target: 40, status: "needs_leads" },
  { id: 4, name: "Zipboard", leads: 40, target: 40, status: "messages_sent" },
  { id: 5, name: "Freightroll", leads: 15, target: 40, status: "needs_leads" },
]

// Mock historical data
const weeklyProgress = [
  { week: "Feb 26 - Mar 4", achieved: true },
  { week: "Feb 19 - Feb 25", achieved: true },
  { week: "Feb 12 - Feb 18", achieved: false },
  { week: "Feb 5 - Feb 11", achieved: true },
]

export default function MessagingDashboard() {
  const [isAddLeadsModalOpen, setIsAddLeadsModalOpen] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<{ id: number; name: string } | null>(null)
  const [salesNavUrl, setSalesNavUrl] = useState("")
  const [lastPage, setLastPage] = useState(10)

  // Calculate total leads and progress
  const totalLeads = campaignData.reduce((sum, campaign) => sum + campaign.leads, 0)
  const totalTarget = campaignData.reduce((sum, campaign) => sum + campaign.target, 0)
  const totalProgress = Math.min(100, (totalLeads / totalTarget) * 100)

  const handleAddLeads = (campaignId: number, campaignName: string) => {
    setSelectedCampaign({ id: campaignId, name: campaignName })
    setIsAddLeadsModalOpen(true)
  }

  const handleSubmitLeads = () => {
    // In a real implementation, this would call Supabase to insert into overnight_scrape table
    console.log("Adding leads for campaign:", selectedCampaign?.name)
    console.log("Sales Navigator URL:", salesNavUrl)
    console.log("Last page to scrape:", lastPage)

    // Reset form and close modal
    setSalesNavUrl("")
    setLastPage(10)
    setIsAddLeadsModalOpen(false)
  }

  const handleStartMessaging = (campaignId: number) => {
    // In a real implementation, this would trigger the messaging sequence
    console.log("Starting message sequence for campaign ID:", campaignId)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "#22C55E" // green-500
      case "needs_leads":
        return "#EF4444" // red-500
      case "messages_sent":
        return "#6366F1" // indigo-500
      default:
        return "#94A3B8" // slate-400
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "ready":
        return "Ready to Message"
      case "needs_leads":
        return "Needs Leads"
      case "messages_sent":
        return "Messages Sent"
      default:
        return "Unknown Status"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return <CheckCircle className="text-emerald-500" size={16} />
      case "needs_leads":
        return <AlertTriangle className="text-red-500" size={16} />
      case "messages_sent":
        return <Send className="text-indigo-500" size={16} />
      default:
        return null
    }
  }

  return (
    <div className="w-full p-8 bg-gray-100 dark:bg-gray-900">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Messaging Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Monitor and manage your messaging campaigns</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-6">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Leads</span>
            <span className="text-2xl font-semibold text-gray-900 dark:text-white">{totalLeads}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">across all campaigns</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Daily Target</span>
            <span className="text-2xl font-semibold text-gray-900 dark:text-white">{totalTarget}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">40 leads per campaign</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Ready Campaigns</span>
            <span className="text-2xl font-semibold text-gray-900 dark:text-white">
              {campaignData.filter((c) => c.status === "ready").length}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">of {campaignData.length} total</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Weekly Streak</span>
            <span className="text-2xl font-semibold text-gray-900 dark:text-white">
              {weeklyProgress.filter((w) => w.achieved).length}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">weeks hitting target</span>
          </div>
        </Card>
      </div>

      {/* Progress History */}
      <Card className="mb-8 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Progress</h2>
        <div className="flex gap-4">
          {weeklyProgress.map((week, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  week.achieved ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
                }`}
              >
                {week.achieved ? <CheckCircle size={16} /> : <X size={16} />}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 whitespace-nowrap">{week.week}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaignData.map((campaign, index) => {
          const progress = (campaign.leads / campaign.target) * 100
          const isReady = campaign.status === "ready"

          return (
            <Card key={campaign.id} className="p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{campaign.name}</h3>
                <div
                  className="flex items-center gap-2 px-2 py-1 rounded-full text-xs"
                  style={{
                    backgroundColor: `${getStatusColor(campaign.status)}15`,
                    color: getStatusColor(campaign.status),
                  }}
                >
                  {getStatusIcon(campaign.status)}
                  <span>{getStatusText(campaign.status)}</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-6 mb-6">
                <div className="w-32 h-32">
                  <CircularProgressbar
                    value={progress}
                    text={`${campaign.leads}/${campaign.target}`}
                    styles={buildStyles({
                      pathColor: getStatusColor(campaign.status),
                      textColor: "#1F2937",
                      trailColor: "#E5E7EB",
                      pathTransition: "stroke-dashoffset 0.5s ease 0s",
                    })}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  variant="default"
                  className={`${campaign.status !== "ready" ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={campaign.status !== "ready"}
                  onClick={() => handleStartMessaging(campaign.id)}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Start Messaging
                </Button>
                <Button variant="outline" onClick={() => handleAddLeads(campaign.id, campaign.name)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Leads
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Add Leads Modal */}
      <Dialog open={isAddLeadsModalOpen} onOpenChange={setIsAddLeadsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Leads for {selectedCampaign?.name}</DialogTitle>
            <DialogDescription>Enter a Sales Navigator URL to scrape for new leads.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="salesNavUrl">Sales Navigator URL</Label>
              <Input
                id="salesNavUrl"
                placeholder="https://www.linkedin.com/sales/..."
                value={salesNavUrl}
                onChange={(e) => setSalesNavUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastPage">Last Page to Scrape</Label>
              <Input
                id="lastPage"
                type="number"
                min={1}
                max={100}
                value={lastPage}
                onChange={(e) => setLastPage(Number.parseInt(e.target.value))}
              />
            </div>
            <Button onClick={handleSubmitLeads} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Leads
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}