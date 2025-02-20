import type React from "react"
import { Card } from "@/components/ui/card"
import { ArrowUp, BarChart2, PieChart, TrendingUp } from "lucide-react"

const TransformationSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="p-6 bg-[#00334B]/80 backdrop-blur-md">
        <h3 className="text-2xl font-semibold mb-4 text-[#c4d0ff]">Success Stories</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <ArrowUp className="text-green-500 mr-2 mt-1" />
            <p className="text-white">
            &quot;ProForecast helped us increase our forecasting accuracy by 30%, leading to better inventory management
            and cost savings.&quot;
            </p>
          </div>
          <div className="flex items-start">
            <TrendingUp className="text-blue-500 mr-2 mt-1" />
            <p className="text-white">
            &quot;We&apos;ve seen a 25% improvement in cash flow management since implementing ProForecast&apos;s predictive
            analytics.&quot;
            </p>
          </div>
        </div>
      </Card>
      <Card className="p-6 bg-[#00334B]/80 backdrop-blur-md">
        <h3 className="text-2xl font-semibold mb-4 text-[#c4d0ff]">Measurable Improvements</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white flex items-center">
              <BarChart2 className="text-yellow-500 mr-2" /> Forecasting Accuracy
            </span>
            <span className="text-[#9ecc3b] font-bold">+30%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white flex items-center">
              <PieChart className="text-purple-500 mr-2" /> Operational Efficiency
            </span>
            <span className="text-[#9ecc3b] font-bold">+25%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white flex items-center">
              <TrendingUp className="text-blue-500 mr-2" /> Decision-Making Speed
            </span>
            <span className="text-[#9ecc3b] font-bold">+40%</span>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default TransformationSection

