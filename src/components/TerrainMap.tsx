import type React from "react"
import { TrendingUp, TrendingDown, Zap, Shield } from "lucide-react"

const TerrainMap: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-[#00334B]/80 backdrop-blur-md p-6 rounded-lg">
        <h3 className="text-2xl font-semibold mb-4 text-[#c4d0ff]">Challenges</h3>
        <ul className="space-y-4">
          <li className="flex items-center">
            <TrendingDown className="mr-2 text-red-500" />
            <span className="text-white">Market volatility</span>
          </li>
          <li className="flex items-center">
            <Shield className="mr-2 text-yellow-500" />
            <span className="text-white">Regulatory compliance</span>
          </li>
          <li className="flex items-center">
            <Zap className="mr-2 text-blue-500" />
            <span className="text-white">Digital transformation</span>
          </li>
        </ul>
      </div>
      <div className="bg-[#00334B]/80 backdrop-blur-md p-6 rounded-lg">
        <h3 className="text-2xl font-semibold mb-4 text-[#c4d0ff]">Opportunities</h3>
        <ul className="space-y-4">
          <li className="flex items-center">
            <TrendingUp className="mr-2 text-green-500" />
            <span className="text-white">Data-driven decision making</span>
          </li>
          <li className="flex items-center">
            <Zap className="mr-2 text-purple-500" />
            <span className="text-white">AI and machine learning integration</span>
          </li>
          <li className="flex items-center">
            <Shield className="mr-2 text-blue-500" />
            <span className="text-white">Sustainable finance initiatives</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default TerrainMap

