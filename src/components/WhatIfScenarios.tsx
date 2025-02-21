"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { LineChart } from "@/components/ui/chart"

const generateRandomData = (initial: number, length: number) => {
  let value = initial
  return Array.from({ length }, () => {
    // Generate a random change between -10 and +10
    const change = (Math.random() - 0.5) * 20
    value = value + change
    // Ensure value doesn't drop below 0 (optional)
    if (value < 0) value = 0
    return Number(value.toFixed(2))
  })
}

const WhatIfScenarios: React.FC = () => {
  const [marketGrowth, setMarketGrowth] = useState(50)
  const [operationalEfficiency, setOperationalEfficiency] = useState(50)

  const labels = ["January", "February", "March", "April", "May", "June", "July"]

  // Use the helper function to simulate data with realistic fluctuations.
  const chartData = {
    labels,
    datasets: [
      {
        label: "Market Growth",
        data: generateRandomData(marketGrowth, labels.length),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        fill: false,
      },
      {
        label: "Operational Efficiency",
        data: generateRandomData(operationalEfficiency, labels.length),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgba(53, 162, 235, 1)",
        fill: false,
      },
    ],
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="p-6 bg-[#00334B]/80 backdrop-blur-md">
        <h3 className="text-2xl font-semibold mb-4 text-white">Scenario Parameters</h3>
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-white">Market Growth</label>
            <Slider
              value={[marketGrowth]}
              onValueChange={(value) => setMarketGrowth(value[0])}
              max={100}
              step={1}
            />
            <span className="block mt-2 text-right text-white">{marketGrowth}%</span>
          </div>
          <div>
            <label className="block mb-2 text-white">Operational Efficiency</label>
            <Slider
              value={[operationalEfficiency]}
              onValueChange={(value) => setOperationalEfficiency(value[0])}
              max={100}
              step={1}
            />
            <span className="block mt-2 text-right text-white">{operationalEfficiency}%</span>
          </div>
        </div>
      </Card>
      <Card className="p-6 bg-[#00334B]/80 backdrop-blur-md">
        <h3 className="text-2xl font-semibold mb-4 text-white">Projected Outcome</h3>
        <div className="h-64">
          <LineChart data={chartData} />
        </div>
      </Card>
    </div>
  )
}

export default WhatIfScenarios