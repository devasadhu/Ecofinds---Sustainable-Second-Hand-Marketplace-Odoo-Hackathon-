"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Leaf } from "lucide-react"

interface EcoImpactWidgetProps {
  co2Saved: number
  waterSaved: number
  className?: string
}

export function EcoImpactWidget({ co2Saved, waterSaved, className }: EcoImpactWidgetProps) {
  const treesEquivalent = Math.round(co2Saved / 22)

  return (
    <Card className={`border-green-100 bg-green-50 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Leaf className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">Environmental Impact</span>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-lg font-bold text-green-600">{co2Saved}kg</div>
            <div className="text-xs text-green-700">CO₂ Saved</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">{waterSaved}L</div>
            <div className="text-xs text-blue-700">Water Saved</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">{treesEquivalent}</div>
            <div className="text-xs text-green-700">Trees Equiv.</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
