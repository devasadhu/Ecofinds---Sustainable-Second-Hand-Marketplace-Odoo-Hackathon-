"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Leaf, TreePine, Droplets, Zap, Recycle, Users, Calculator, Award, Globe, Car, Home, Plane } from "lucide-react"
import Link from "next/link"

// Mock data for impact tracking
const userImpact = {
  totalCO2Saved: 145,
  waterSaved: 15200,
  energySaved: 890,
  itemsDiverted: 23,
  treesEquivalent: 6,
  milesNotDriven: 360,
}

const communityImpact = {
  totalUsers: 15420,
  totalCO2Saved: 2450000,
  totalItems: 89500,
  totalWaterSaved: 45600000,
}

const challenges = [
  {
    id: 1,
    title: "Zero Waste Week",
    description: "Buy only second-hand items for one week",
    progress: 5,
    target: 7,
    reward: 100,
    participants: 1250,
    timeLeft: "3 days",
    active: true,
  },
  {
    id: 2,
    title: "Water Warrior",
    description: "Save 1000L of water through sustainable purchases",
    progress: 750,
    target: 1000,
    reward: 75,
    participants: 890,
    timeLeft: "2 weeks",
    active: true,
  },
  {
    id: 3,
    title: "Carbon Crusher",
    description: "Prevent 50kg of CO₂ emissions this month",
    progress: 32,
    target: 50,
    reward: 150,
    participants: 2100,
    timeLeft: "1 week",
    active: true,
  },
]

const leaderboard = [
  { rank: 1, name: "Sarah M.", co2Saved: 890, items: 45, badge: "Eco Champion" },
  { rank: 2, name: "Mike R.", co2Saved: 750, items: 38, badge: "Green Guru" },
  { rank: 3, name: "Emma L.", co2Saved: 680, items: 34, badge: "Sustainability Star" },
  { rank: 4, name: "You", co2Saved: 145, items: 23, badge: "Eco Enthusiast" },
  { rank: 5, name: "David K.", co2Saved: 120, items: 19, badge: "Green Beginner" },
]

export default function ImpactPage() {
  const [calculatorData, setCalculatorData] = useState({
    category: "",
    itemType: "",
    quantity: 1,
  })
  const [calculatorResult, setCalculatorResult] = useState<any>(null)

  const calculateImpact = () => {
    // Mock calculation based on item type
    const impactData: any = {
      "clothing-tshirt": { co2: 2.1, water: 2700, energy: 6 },
      "clothing-jeans": { co2: 33.4, water: 7600, energy: 54 },
      "electronics-phone": { co2: 70, water: 12900, energy: 85 },
      "electronics-laptop": { co2: 300, water: 25000, energy: 250 },
      "furniture-chair": { co2: 45, water: 8500, energy: 65 },
    }

    const key = `${calculatorData.category}-${calculatorData.itemType}`
    const impact = impactData[key]

    if (impact) {
      setCalculatorResult({
        co2: impact.co2 * calculatorData.quantity,
        water: impact.water * calculatorData.quantity,
        energy: impact.energy * calculatorData.quantity,
        trees: Math.round((impact.co2 * calculatorData.quantity) / 22),
        miles: Math.round(impact.co2 * calculatorData.quantity * 2.5),
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-800">EcoFinds</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-green-600 transition-colors">
              Home
            </Link>
            <Link href="/items" className="text-gray-600 hover:text-green-600 transition-colors">
              Browse Items
            </Link>
            <Link href="/quiz" className="text-gray-600 hover:text-green-600 transition-colors">
              Eco Quiz
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-green-600 transition-colors">
              Dashboard
            </Link>
            <Link href="/impact" className="text-green-600 font-medium">
              Impact
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/items">Browse Items</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Environmental Impact Hub</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track your positive impact, join community challenges, and discover how your sustainable choices are making
            a difference for our planet.
          </p>
        </div>

        {/* Impact Tabs */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">My Impact</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          {/* Personal Impact Tab */}
          <TabsContent value="personal" className="space-y-6">
            {/* Personal Impact Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-green-100 bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-6 text-center">
                  <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-green-600 mb-1">{userImpact.totalCO2Saved}kg</div>
                  <div className="text-sm text-gray-600 mb-2">CO₂ Emissions Prevented</div>
                  <div className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">
                    Equivalent to {userImpact.treesEquivalent} trees planted
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardContent className="p-6 text-center">
                  <Droplets className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-blue-600 mb-1">{userImpact.waterSaved.toLocaleString()}L</div>
                  <div className="text-sm text-gray-600 mb-2">Water Saved</div>
                  <div className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded">7 years of drinking water</div>
                </CardContent>
              </Card>

              <Card className="border-purple-100 bg-gradient-to-br from-purple-50 to-violet-50">
                <CardContent className="p-6 text-center">
                  <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-purple-600 mb-1">{userImpact.energySaved} kWh</div>
                  <div className="text-sm text-gray-600 mb-2">Energy Saved</div>
                  <div className="text-xs text-purple-700 bg-purple-100 px-2 py-1 rounded">30 days of home power</div>
                </CardContent>
              </Card>

              <Card className="border-orange-100 bg-gradient-to-br from-orange-50 to-red-50">
                <CardContent className="p-6 text-center">
                  <Recycle className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-orange-600 mb-1">{userImpact.itemsDiverted}</div>
                  <div className="text-sm text-gray-600 mb-2">Items Saved from Landfills</div>
                  <div className="text-xs text-orange-700 bg-orange-100 px-2 py-1 rounded">Circular economy hero</div>
                </CardContent>
              </Card>
            </div>

            {/* Impact Visualization */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-green-600" />
                    Transportation Equivalent
                  </CardTitle>
                  <CardDescription>Your CO₂ savings compared to driving</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">{userImpact.milesNotDriven}</div>
                    <div className="text-lg text-gray-700 mb-4">Miles Not Driven</div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-800">
                        That's like not driving from San Francisco to Los Angeles and back!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TreePine className="h-5 w-5 text-green-600" />
                    Forest Impact
                  </CardTitle>
                  <CardDescription>Your contribution to reforestation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">{userImpact.treesEquivalent}</div>
                    <div className="text-lg text-gray-700 mb-4">Trees Worth of CO₂ Absorption</div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-800">Your impact equals planting a small grove of trees!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Monthly Progress */}
            <Card>
              <CardHeader>
                <CardTitle>This Month's Progress</CardTitle>
                <CardDescription>Track your sustainability goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>CO₂ Saved Goal</span>
                      <span>32/50 kg</span>
                    </div>
                    <Progress value={64} className="h-3 mb-2" />
                    <p className="text-xs text-gray-600">18kg to go this month</p>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Items Purchased</span>
                      <span>3/5</span>
                    </div>
                    <Progress value={60} className="h-3 mb-2" />
                    <p className="text-xs text-gray-600">2 more sustainable purchases</p>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Water Saved Goal</span>
                      <span>2.1/3.0k L</span>
                    </div>
                    <Progress value={70} className="h-3 mb-2" />
                    <p className="text-xs text-gray-600">900L to reach goal</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Impact Tab */}
          <TabsContent value="community" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Impact</h2>
              <p className="text-gray-600">See how our entire EcoFinds community is making a difference together</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-green-100 text-center">
                <CardContent className="p-6">
                  <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {communityImpact.totalUsers.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Eco Warriors</div>
                </CardContent>
              </Card>

              <Card className="border-green-100 text-center">
                <CardContent className="p-6">
                  <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {(communityImpact.totalCO2Saved / 1000).toFixed(1)}t
                  </div>
                  <div className="text-sm text-gray-600">Total CO₂ Saved</div>
                </CardContent>
              </Card>

              <Card className="border-green-100 text-center">
                <CardContent className="p-6">
                  <Recycle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {communityImpact.totalItems.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Items Saved</div>
                </CardContent>
              </Card>

              <Card className="border-green-100 text-center">
                <CardContent className="p-6">
                  <Droplets className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {(communityImpact.totalWaterSaved / 1000000).toFixed(1)}M L
                  </div>
                  <div className="text-sm text-gray-600">Water Saved</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Global Impact Comparison</CardTitle>
                <CardDescription>See how our community stacks up globally</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-green-50 p-6 rounded-lg text-center">
                    <h3 className="text-2xl font-bold text-green-800 mb-2">Equivalent to removing</h3>
                    <div className="text-4xl font-bold text-green-600 mb-2">530 cars</div>
                    <p className="text-green-700">from the road for an entire year!</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <Plane className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-xl font-bold text-blue-600">2,450</div>
                      <div className="text-sm text-blue-700">Round-trip flights NYC-LA avoided</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <Home className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-xl font-bold text-purple-600">180</div>
                      <div className="text-sm text-purple-700">Homes powered for a year</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Eco Challenges</h2>
              <p className="text-gray-600">Join community challenges and earn rewards for sustainable actions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((challenge) => (
                <Card key={challenge.id} className="border-green-100">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                      <Badge className="bg-green-100 text-green-800">+{challenge.reward} points</Badge>
                    </div>
                    <CardDescription>{challenge.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>
                            {challenge.progress}/{challenge.target}
                          </span>
                        </div>
                        <Progress value={(challenge.progress / challenge.target) * 100} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{challenge.participants} participants</span>
                        </div>
                        <span>{challenge.timeLeft} left</span>
                      </div>

                      <Button className="w-full bg-green-600 hover:bg-green-700" disabled={!challenge.active}>
                        {challenge.active ? "Join Challenge" : "Completed"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Calculator Tab */}
          <TabsContent value="calculator" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Impact Calculator</h2>
              <p className="text-gray-600">Calculate the environmental impact of buying second-hand vs. new items</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-green-600" />
                    Calculate Your Impact
                  </CardTitle>
                  <CardDescription>Enter item details to see potential environmental savings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={calculatorData.category}
                      onValueChange={(value) => setCalculatorData({ ...calculatorData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="itemType">Item Type</Label>
                    <Select
                      value={calculatorData.itemType}
                      onValueChange={(value) => setCalculatorData({ ...calculatorData, itemType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select item type" />
                      </SelectTrigger>
                      <SelectContent>
                        {calculatorData.category === "clothing" && (
                          <>
                            <SelectItem value="tshirt">T-Shirt</SelectItem>
                            <SelectItem value="jeans">Jeans</SelectItem>
                          </>
                        )}
                        {calculatorData.category === "electronics" && (
                          <>
                            <SelectItem value="phone">Smartphone</SelectItem>
                            <SelectItem value="laptop">Laptop</SelectItem>
                          </>
                        )}
                        {calculatorData.category === "furniture" && (
                          <>
                            <SelectItem value="chair">Chair</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      type="number"
                      min="1"
                      value={calculatorData.quantity}
                      onChange={(e) =>
                        setCalculatorData({ ...calculatorData, quantity: Number.parseInt(e.target.value) || 1 })
                      }
                    />
                  </div>

                  <Button onClick={calculateImpact} className="w-full bg-green-600 hover:bg-green-700">
                    Calculate Impact
                  </Button>
                </CardContent>
              </Card>

              {calculatorResult && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600">Environmental Savings</CardTitle>
                    <CardDescription>By choosing second-hand, you would save:</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Leaf className="h-5 w-5 text-green-600" />
                          <span>CO₂ Emissions</span>
                        </div>
                        <span className="font-bold text-green-600">{calculatorResult.co2}kg</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Droplets className="h-5 w-5 text-blue-600" />
                          <span>Water Usage</span>
                        </div>
                        <span className="font-bold text-blue-600">{calculatorResult.water.toLocaleString()}L</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Zap className="h-5 w-5 text-purple-600" />
                          <span>Energy</span>
                        </div>
                        <span className="font-bold text-purple-600">{calculatorResult.energy}kWh</span>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Real-World Equivalents:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Equivalent to planting {calculatorResult.trees} trees</li>
                          <li>• Like not driving {calculatorResult.miles} miles</li>
                          <li>• Enough water for {Math.round(calculatorResult.water / 8)} days of drinking</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Sustainability Leaderboard</h2>
              <p className="text-gray-600">See how you rank among our eco-conscious community</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-green-600" />
                  Top Eco Warriors This Month
                </CardTitle>
                <CardDescription>Ranked by CO₂ emissions prevented</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((user) => (
                    <div
                      key={user.rank}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        user.name === "You"
                          ? "bg-green-50 border-green-200"
                          : user.rank <= 3
                            ? "bg-yellow-50 border-yellow-200"
                            : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            user.rank === 1
                              ? "bg-yellow-500 text-white"
                              : user.rank === 2
                                ? "bg-gray-400 text-white"
                                : user.rank === 3
                                  ? "bg-orange-500 text-white"
                                  : user.name === "You"
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-300 text-gray-700"
                          }`}
                        >
                          {user.rank}
                        </div>
                        <div>
                          <p className={`font-medium ${user.name === "You" ? "text-green-800" : "text-gray-900"}`}>
                            {user.name}
                          </p>
                          <Badge
                            variant="outline"
                            className={
                              user.name === "You" ? "border-green-600 text-green-600" : "border-gray-300 text-gray-600"
                            }
                          >
                            {user.badge}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{user.co2Saved}kg CO₂</p>
                        <p className="text-sm text-gray-600">{user.items} items</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
