"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  BarChart3,
  Calendar,
  Clock,
  DollarSign,
  Download,
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
import type { Contract, UserSession } from "@/lib/types"

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<UserSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [contracts, setContracts] = useState<Contract[]>([])

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

  useEffect(() => {
    const loadContracts = async () => {
      try {
        // Get static contracts
        const staticContracts = [
          {
            id: "CONTRACT-001",
            title: "Organic Wheat Supply Agreement",
            description: "Supply of premium organic wheat",
            counterpartyName: "Green Valley Foods",
            counterpartyEmail: "contact@greenvalley.com",
            counterpartyPhone: "+91 98765 43210",
            counterpartyAddress: "123 Business Park, Mumbai",
            counterpartyType: "buyer",
            farmerId: "FARMER-001",
            buyerId: "BUYER-001",
            crop: "wheat",
            quantity: 5000,
            unit: "kg",
            pricePerUnit: 25,
            totalPrice: 125000,
            deliveryDate: new Date("2024-06-15"),
            startDate: new Date("2024-03-01"),
            endDate: new Date("2024-06-30"),
            paymentTerms: "advance-partial-final",
            qualityParameters: "Grade A wheat with 12% moisture content",
            additionalTerms: "Delivery at buyer's warehouse",
            status: "active" as const,
            progress: 45,
            createdAt: new Date("2024-03-01"),
            updatedAt: new Date("2024-03-15")
          }
        ]

        // Get user-created contracts from localStorage
        let userContracts = []
        try {
          const storedContracts = localStorage.getItem('contracts')
          if (storedContracts) {
            userContracts = JSON.parse(storedContracts)
          }
        } catch (error) {
          console.error("Error reading from localStorage:", error)
          userContracts = []
        }

        // Combine static and user contracts
        const allContracts = [...staticContracts, ...userContracts]
        setContracts(allContracts)
      } catch (error) {
        console.error("Error loading contracts:", error)
      }
    }

    loadContracts()
  }, [])

  // Calculate contract statistics
  const stats = {
    activeContracts: contracts.filter(c => c.status === "active").length,
    pendingContracts: contracts.filter(c => c.status === "draft" || c.status === "pending").length,
    totalValue: contracts.reduce((sum, contract) => sum + contract.totalPrice, 0),
    upcomingDeliveries: contracts.filter(c => {
      const deliveryDate = new Date(c.deliveryDate)
      const today = new Date()
      const thirtyDaysFromNow = new Date()
      thirtyDaysFromNow.setDate(today.getDate() + 30)
      return c.status === "active" && deliveryDate >= today && deliveryDate <= thirtyDaysFromNow
    }).length
  }

  // Get recent contracts (last 3 active or pending)
  const recentContracts = contracts
    .filter(c => c.status === "active" || c.status === "draft" || c.status === "pending")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <p className="text-sm text-muted-foreground">Loading...</p>
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
            <div className="text-2xl font-bold">{stats.activeContracts}</div>
            <p className="text-xs text-muted-foreground">{stats.pendingContracts} pending approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contract Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(stats.totalValue / 100000).toFixed(2)}L</div>
            <p className="text-xs text-muted-foreground">Total value of all contracts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deliveries</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingDeliveries}</div>
            <p className="text-xs text-muted-foreground">Due in next 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contracts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contracts.length}</div>
            <p className="text-xs text-muted-foreground">All time contracts</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-6">
        {/* Left Column - 4/6 width */}
        <div className="md:col-span-4 space-y-6">
          {/* Active Contracts */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Contracts</CardTitle>
                <CardDescription>Your recent contract farming agreements</CardDescription>
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
                {recentContracts.map((contract) => (
                  <div key={contract.id} className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{contract.counterpartyName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{contract.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {contract.crop} • {contract.quantity} {contract.unit}
                          </div>
                        </div>
                      </div>
                      <Badge variant="default">{contract.status}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-green-600"
                          style={{ width: `${contract.progress || 0}%` }}
                        />
                      </div>
                      <span className="text-muted-foreground">{contract.progress || 0}% Complete</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Delivery: {new Date(contract.deliveryDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="font-medium">₹{(contract.totalPrice / 100000).toFixed(2)}L</div>
                  </div>
                ))}
                {recentContracts.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No contracts found. Create your first contract to get started.</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                <Link href="/contract-list/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Contract
                </Link>
              </Button>
            </CardFooter>
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
        </div>
      </div>
    </div>
  )
}

