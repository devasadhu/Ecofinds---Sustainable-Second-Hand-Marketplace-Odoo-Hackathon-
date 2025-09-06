"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Leaf,
  ShoppingBag,
  Award,
  TrendingUp,
  Target,
  Users,
  DollarSign,
  Recycle,
  TreePine,
  Droplets,
  Zap,
  Settings,
  Edit,
} from "lucide-react"
import Link from "next/link"

// Mock user data
const userData = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  avatar: "/user-avatar.jpg",
  joinDate: "March 2024",
  location: "San Francisco, CA",
  ecoLevel: "Eco Enthusiast",
  ecoPoints: 1250,
  nextLevelPoints: 1500,
}

// Mock achievements
const achievements = [
  {
    id: 1,
    name: "First Purchase",
    description: "Made your first sustainable purchase",
    earned: true,
    points: 50,
    icon: ShoppingBag,
  },
  {
    id: 2,
    name: "Quiz Master",
    description: "Completed the sustainability quiz",
    earned: true,
    points: 75,
    icon: Award,
  },
  { id: 3, name: "Eco Warrior", description: "Saved 100kg of CO₂", earned: true, points: 100, icon: Leaf },
  { id: 4, name: "Community Helper", description: "Referred 5 friends", earned: false, points: 150, icon: Users },
  { id: 5, name: "Seller Pro", description: "Sold 10 items", earned: false, points: 200, icon: TrendingUp },
  { id: 6, name: "Water Saver", description: "Saved 10,000L of water", earned: true, points: 125, icon: Droplets },
]

// Mock transaction history
const transactions = [
  {
    id: 1,
    type: "purchase",
    item: "Vintage Leather Jacket",
    amount: 89,
    date: "2024-01-15",
    seller: "Sarah M.",
    co2Saved: 12,
    status: "completed",
  },
  {
    id: 2,
    type: "sale",
    item: "Designer Handbag",
    amount: 320,
    date: "2024-01-10",
    buyer: "Emma L.",
    co2Saved: 8,
    status: "completed",
  },
  {
    id: 3,
    type: "purchase",
    item: "Gaming Laptop",
    amount: 650,
    date: "2024-01-05",
    seller: "Alex P.",
    co2Saved: 55,
    status: "completed",
  },
]

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [activeTab, setActiveTab] = useState("overview")

  const earnedAchievements = achievements.filter((a) => a.earned)
  const progressToNextLevel = (userData.ecoPoints / userData.nextLevelPoints) * 100

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
            <Link href="/dashboard" className="text-green-600 font-medium">
              Dashboard
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" asChild>
              <Link href="/sell">Sell Items</Link>
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/logout">Logout</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* User Profile Header */}
        <div className="mb-8">
          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                    <AvatarFallback className="bg-green-100 text-green-600 text-xl">
                      {userData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
                    <p className="text-gray-600">{userData.email}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>Joined {userData.joinDate}</span>
                      <span>•</span>
                      <span>{userData.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 md:ml-8">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <Badge className="bg-green-100 text-green-800 mb-1">{userData.ecoLevel}</Badge>
                      <p className="text-sm text-gray-600">
                        {userData.ecoPoints} / {userData.nextLevelPoints} points to next level
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                  <Progress value={progressToNextLevel} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-green-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Items Purchased</p>
                      <p className="text-2xl font-bold text-green-600">23</p>
                      <p className="text-xs text-gray-500">+3 this month</p>
                    </div>
                    <ShoppingBag className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Items Sold</p>
                      <p className="text-2xl font-bold text-green-600">8</p>
                      <p className="text-xs text-gray-500">+2 this month</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Earnings</p>
                      <p className="text-2xl font-bold text-green-600">$1,240</p>
                      <p className="text-xs text-gray-500">+$320 this month</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Eco Points</p>
                      <p className="text-2xl font-bold text-green-600">{userData.ecoPoints}</p>
                      <p className="text-xs text-gray-500">+75 this month</p>
                    </div>
                    <Award className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Your latest sustainable shopping actions</CardDescription>
                    </div>
                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="year">This Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {transactions.slice(0, 3).map((transaction) => (
                        <div key={transaction.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              transaction.type === "purchase" ? "bg-green-100" : "bg-blue-100"
                            }`}
                          >
                            {transaction.type === "purchase" ? (
                              <ShoppingBag
                                className={`h-6 w-6 ${
                                  transaction.type === "purchase" ? "text-green-600" : "text-blue-600"
                                }`}
                              />
                            ) : (
                              <TrendingUp className="h-6 w-6 text-blue-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">
                              {transaction.type === "purchase" ? "Purchased" : "Sold"} {transaction.item}
                            </p>
                            <p className="text-sm text-gray-600">
                              {transaction.type === "purchase"
                                ? `From ${transaction.seller}`
                                : `To ${transaction.buyer}`}{" "}
                              • Saved {transaction.co2Saved}kg CO₂
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-600">${transaction.amount}</p>
                            <Badge
                              className={`text-xs ${
                                transaction.type === "purchase"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {new Date(transaction.date).toLocaleDateString()}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>What would you like to do today?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                      <Link href="/items">Browse Items</Link>
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href="/sell">Sell an Item</Link>
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href="/quiz">Take Eco Quiz</Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Goals */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-green-600" />
                      Monthly Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Purchase 5 items</span>
                        <span>3/5</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Save 50kg CO₂</span>
                        <span>32/50</span>
                      </div>
                      <Progress value={64} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Earn 200 eco-points</span>
                        <span>150/200</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Complete history of your purchases and sales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === "purchase" ? "bg-green-100" : "bg-blue-100"
                          }`}
                        >
                          {transaction.type === "purchase" ? (
                            <ShoppingBag className="h-5 w-5 text-green-600" />
                          ) : (
                            <TrendingUp className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.item}</p>
                          <p className="text-sm text-gray-600">
                            {transaction.type === "purchase" ? `From ${transaction.seller}` : `To ${transaction.buyer}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${transaction.amount}</p>
                        <p className="text-sm text-gray-600">{transaction.co2Saved}kg CO₂ saved</p>
                        <p className="text-xs text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Impact Tab */}
          <TabsContent value="impact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-green-100">
                <CardContent className="p-6 text-center">
                  <TreePine className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-green-600 mb-1">6</div>
                  <div className="text-sm text-gray-600">Trees Equivalent</div>
                  <div className="text-xs text-gray-500 mt-1">CO₂ absorption</div>
                </CardContent>
              </Card>

              <Card className="border-blue-100">
                <CardContent className="p-6 text-center">
                  <Droplets className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-blue-600 mb-1">15,200L</div>
                  <div className="text-sm text-gray-600">Water Saved</div>
                  <div className="text-xs text-gray-500 mt-1">Manufacturing water</div>
                </CardContent>
              </Card>

              <Card className="border-purple-100">
                <CardContent className="p-6 text-center">
                  <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-purple-600 mb-1">890 kWh</div>
                  <div className="text-sm text-gray-600">Energy Saved</div>
                  <div className="text-xs text-gray-500 mt-1">Production energy</div>
                </CardContent>
              </Card>

              <Card className="border-orange-100">
                <CardContent className="p-6 text-center">
                  <Recycle className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-orange-600 mb-1">23</div>
                  <div className="text-sm text-gray-600">Items Diverted</div>
                  <div className="text-xs text-gray-500 mt-1">From landfills</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact Over Time</CardTitle>
                <CardDescription>Track your positive impact on the environment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 p-6 rounded-lg text-center">
                  <Leaf className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Outstanding Impact!</h3>
                  <p className="text-green-700 mb-4">
                    Your sustainable shopping choices have prevented <strong>145kg of CO₂</strong> from entering the
                    atmosphere.
                  </p>
                  <p className="text-sm text-green-600">
                    That's equivalent to driving 360 miles less in an average car!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Earned Achievements</CardTitle>
                  <CardDescription>Badges you've unlocked on your sustainability journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {earnedAchievements.map((achievement) => {
                      const IconComponent = achievement.icon
                      return (
                        <div
                          key={achievement.id}
                          className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border border-green-200"
                        >
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <IconComponent className="h-6 w-6 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-green-800">{achievement.name}</h4>
                            <p className="text-sm text-green-600">{achievement.description}</p>
                          </div>
                          <Badge className="bg-green-600 text-white">+{achievement.points}</Badge>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Available Achievements</CardTitle>
                  <CardDescription>Unlock these badges by continuing your eco-journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {achievements
                      .filter((a) => !a.earned)
                      .map((achievement) => {
                        const IconComponent = achievement.icon
                        return (
                          <div
                            key={achievement.id}
                            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                          >
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                              <IconComponent className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-700">{achievement.name}</h4>
                              <p className="text-sm text-gray-500">{achievement.description}</p>
                            </div>
                            <Badge variant="outline">+{achievement.points}</Badge>
                          </div>
                        )
                      })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
