"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  BarChart3,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Handshake,
  Loader2,
  Plus,
  ShoppingBag,
  TrendingUp,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { requireAuth } from "@/lib/auth"
import type { UserSession } from "@/lib/types"

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<UserSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await requireAuth()
        setUser(session)
        setIsLoading(false)
      } catch (error) {
        router.push("/login")
      }
    }

    checkAuth()
  }, [router])

  // Mock data for dashboard
  const dashboardData = {
    stats: {
      activeContracts: 3,
      pendingContracts: 2,
      totalValue: 2895000,
      upcomingDeliveries: 2,
    },
    recentContracts: [
      {
        id: "C-1001",
        title: "Premium Wheat Supply Contract",
        counterparty: {
          name: "Global Foods Inc.",
          type: "Buyer",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        crop: "Wheat",
        quantity: "50 tons",
        value: 1125000,
        status: "Active",
        progress: 40,
        nextDelivery: "2023-09-15",
      },
      {
        id: "C-1002",
        title: "Organic Rice Supply Agreement",
        counterparty: {
          name: "Healthy Foods Co.",
          type: "Buyer",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        crop: "Rice",
        quantity: "30 tons",
        value: 1050000,
        status: "Active",
        progress: 15,
        nextDelivery: "2023-09-20",
      },
      {
        id: "C-1003",
        title: "Premium Potato Supply Contract",
        counterparty: {
          name: "Crisp Chips Ltd.",
          type: "Buyer",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        crop: "Potatoes",
        quantity: "40 tons",
        value: 720000,
        status: "Active",
        progress: 25,
        nextDelivery: "2023-09-10",
      },
    ],
    recentTransactions: [
      {
        id: "T-1001",
        contractId: "C-1001",
        amount: 770000,
        type: "advance",
        status: "completed",
        date: "2023-07-01",
        from: {
          name: "Global Foods Inc.",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      },
      {
        id: "T-1002",
        contractId: "C-1001",
        amount: 330000,
        type: "partial",
        status: "pending",
        date: "2023-09-15",
        from: {
          name: "Global Foods Inc.",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      },
      {
        id: "T-1003",
        contractId: "C-1002",
        amount: 735000,
        type: "advance",
        status: "completed",
        date: "2023-06-15",
        from: {
          name: "Healthy Foods Co.",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      },
    ],
    marketplaceActivity: [
      {
        id: "M-1001",
        title: "Premium Organic Wheat",
        crop: "Wheat",
        quantity: 5000,
        unit: "kg",
        pricePerUnit: 0.75,
        image: "/placeholder.svg?height=40&width=40&text=Wheat",
        date: "2023-08-25",
        status: "active",
      },
      {
        id: "M-1002",
        title: "Fresh Corn Harvest",
        crop: "Corn",
        quantity: 10000,
        unit: "kg",
        pricePerUnit: 0.45,
        image: "/placeholder.svg?height=40&width=40&text=Corn",
        date: "2023-08-20",
        status: "active",
      },
    ],
    pricePredictions: [
      {
        crop: "Wheat",
        currentPrice: 22.5,
        predictedPrice: 24.8,
        change: 10.2,
        trend: "up",
      },
      {
        crop: "Rice",
        currentPrice: 35.0,
        predictedPrice: 37.5,
        change: 7.1,
        trend: "up",
      },
      {
        crop: "Potatoes",
        currentPrice: 18.0,
        predictedPrice: 16.5,
        change: -8.3,
        trend: "down",
      },
    ],
    upcomingTasks: [
      {
        id: "T-1",
        title: "Wheat delivery to Global Foods Inc.",
        dueDate: "2023-09-15",
        priority: "high",
      },
      {
        id: "T-2",
        title: "Rice quality inspection",
        dueDate: "2023-09-10",
        priority: "medium",
      },
      {
        id: "T-3",
        title: "Review new contract proposal",
        dueDate: "2023-09-05",
        priority: "medium",
      },
    ],
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name.split(" ")[0]}</h1>
        <p className="text-muted-foreground">Here's what's happening with your farming contracts today.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
            <Handshake className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.stats.activeContracts}</div>
            <p className="text-xs text-muted-foreground">{dashboardData.stats.pendingContracts} pending approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contract Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(dashboardData.stats.totalValue / 100000).toFixed(2)}L</div>
            <p className="text-xs text-muted-foreground">+18.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deliveries</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.stats.upcomingDeliveries}</div>
            <p className="text-xs text-muted-foreground">Next delivery on Sep 10</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Price Trends</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+8.5%</div>
            <p className="text-xs text-muted-foreground">Average crop price increase</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-6">
        {/* Left Column - 4/6 width */}
        <div className="md:col-span-4 space-y-6">
          {/* Active Contracts */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Contracts</CardTitle>
                <CardDescription>Your ongoing contract farming agreements</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/contract-list">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {dashboardData.recentContracts.map((contract) => (
                  <div key={contract.id} className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={contract.counterparty.avatar} alt={contract.counterparty.name} />
                          <AvatarFallback>{contract.counterparty.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{contract.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {contract.crop} • {contract.quantity}
                          </div>
                        </div>
                      </div>
                      <Badge variant="default">{contract.status}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-green-600"
                            style={{ width: `${contract.progress}%` }}
                          />
                        </div>
                        <span className="text-muted-foreground">{contract.progress}% Complete</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">Next: {contract.nextDelivery}</span>
                      </div>
                      <div className="font-medium">₹{(contract.value / 100000).toFixed(2)}L</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                <Link href="/contract-list?action=new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Contract
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest financial activities</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/transaction-list">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={transaction.from.avatar} alt={transaction.from.name} />
                        <AvatarFallback>{transaction.from.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)} Payment
                        </div>
                        <div className="text-sm text-muted-foreground">
                          From {transaction.from.name} • {transaction.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                        variant={transaction.status === "completed" ? "success" : "outline"}
                        className={
                          transaction.status === "completed"
                            ? "bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : ""
                        }
                      >
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </Badge>
                      <div className="font-medium text-right">₹{(transaction.amount / 1000).toFixed(0)}K</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - 2/6 width */}
        <div className="md:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" asChild>
                <Link href="/marketplace">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Browse Marketplace
                </Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link href="/price-predictor">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Check Price Predictions
                </Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link href="/contract-list">
                  <FileText className="mr-2 h-4 w-4" />
                  Manage Contracts
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>Tasks requiring your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-center">
                    <div
                      className={`mr-2 h-2 w-2 rounded-full ${
                        task.priority === "high"
                          ? "bg-red-500"
                          : task.priority === "medium"
                            ? "bg-amber-500"
                            : "bg-green-500"
                      }`}
                    />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{task.title}</p>
                      <p className="text-xs text-muted-foreground">Due on {task.dueDate}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Price Predictions */}
          <Card>
            <CardHeader>
              <CardTitle>Price Predictions</CardTitle>
              <CardDescription>Forecasted crop prices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.pricePredictions.map((prediction, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-xs font-medium">{prediction.crop.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{prediction.crop}</p>
                        <p className="text-xs text-muted-foreground">Current: ₹{prediction.currentPrice.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">₹{prediction.predictedPrice.toFixed(2)}</p>
                      <div
                        className={`flex items-center text-xs ${
                          prediction.trend === "up" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {prediction.trend === "up" ? (
                          <TrendingUp className="mr-1 h-3 w-3" />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-1 h-3 w-3"
                          >
                            <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                            <polyline points="16 17 22 17 22 11" />
                          </svg>
                        )}
                        <span>{prediction.change}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/price-predictor">View Detailed Analysis</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Marketplace Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Marketplace Activity</CardTitle>
              <CardDescription>Recent listings and opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.marketplaceActivity.map((listing) => (
                  <div key={listing.id} className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-md overflow-hidden">
                      <img
                        src={listing.image || "/placeholder.svg"}
                        alt={listing.crop}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{listing.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {listing.quantity} {listing.unit} • ₹{listing.pricePerUnit.toFixed(2)}/{listing.unit}
                      </p>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {listing.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/marketplace">Browse Marketplace</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

