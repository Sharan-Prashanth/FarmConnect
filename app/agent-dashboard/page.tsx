"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { BarChart, Calendar, CheckCircle, Clock, Handshake, Loader2, Search, Users } from "lucide-react"
import { fetchAgentDashboardData } from "@/lib/agent-actions"

export default function AgentDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Fetch dashboard data on component mount
  useState(() => {
    const loadDashboardData = async () => {
      try {
        const data = await fetchAgentDashboardData()
        setDashboardData(data)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  // Mock data for demonstration
  const mockData = {
    stats: {
      totalFarmers: 124,
      totalBuyers: 45,
      activeContracts: 78,
      completedContracts: 156,
    },
    pendingVerifications: [
      {
        id: 1,
        name: "Rajesh Kumar",
        type: "Farmer",
        location: "Punjab",
        date: "2023-06-15",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 2,
        name: "Priya Sharma",
        type: "Buyer",
        location: "Delhi",
        date: "2023-06-14",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 3,
        name: "Amit Singh",
        type: "Farmer",
        location: "Haryana",
        date: "2023-06-13",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 4,
        name: "Neha Patel",
        type: "Farmer",
        location: "Gujarat",
        date: "2023-06-12",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 5,
        name: "Vikram Reddy",
        type: "Buyer",
        location: "Karnataka",
        date: "2023-06-11",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
    pendingContracts: [
      {
        id: "C-1001",
        farmer: "Rajesh Kumar",
        buyer: "FreshFoods Ltd",
        crop: "Wheat",
        value: 125000,
        status: "Negotiation",
        date: "2023-06-15",
      },
      {
        id: "C-1002",
        farmer: "Ananya Gupta",
        buyer: "Organic Eats",
        crop: "Rice",
        value: 98000,
        status: "Pending Approval",
        date: "2023-06-14",
      },
      {
        id: "C-1003",
        farmer: "Suresh Verma",
        buyer: "GreenHarvest",
        crop: "Potatoes",
        value: 75000,
        status: "Negotiation",
        date: "2023-06-13",
      },
      {
        id: "C-1004",
        farmer: "Meena Kumari",
        buyer: "FarmFresh",
        crop: "Tomatoes",
        value: 45000,
        status: "Pending Approval",
        date: "2023-06-12",
      },
      {
        id: "C-1005",
        farmer: "Prakash Joshi",
        buyer: "NatureFoods",
        crop: "Onions",
        value: 62000,
        status: "Negotiation",
        date: "2023-06-11",
      },
    ],
    recentActivity: [
      { id: 1, type: "Verification", user: "Rajesh Kumar", status: "Approved", date: "2023-06-15" },
      { id: 2, type: "Contract", contract: "C-1002", status: "Facilitated", date: "2023-06-14" },
      { id: 3, type: "Verification", user: "Priya Sharma", status: "Rejected", date: "2023-06-13" },
      { id: 4, type: "Contract", contract: "C-1003", status: "Approved", date: "2023-06-12" },
      { id: 5, type: "Verification", user: "Amit Singh", status: "Approved", date: "2023-06-11" },
    ],
  }

  // Filter verifications based on search query
  const filteredVerifications = mockData.pendingVerifications.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <span className="ml-2">Loading dashboard...</span>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Agent Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Visits
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Farmers Managed</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.stats.totalFarmers}</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Buyers Connected</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.stats.totalBuyers}</div>
            <p className="text-xs text-muted-foreground">+8 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
            <Handshake className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.stats.activeContracts}</div>
            <p className="text-xs text-muted-foreground">+15 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Contracts</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.stats.completedContracts}</div>
            <p className="text-xs text-muted-foreground">+24 from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="verifications">Verifications</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Recent Activity */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockData.recentActivity.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell>{activity.type}</TableCell>
                        <TableCell>{activity.user ? activity.user : `Contract ${activity.contract}`}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              activity.status === "Approved" || activity.status === "Facilitated"
                                ? "default"
                                : activity.status === "Pending"
                                  ? "outline"
                                  : "destructive"
                            }
                          >
                            {activity.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{activity.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Pending Tasks */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Pending Tasks</CardTitle>
                <CardDescription>Tasks requiring your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-amber-500" />
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Verify Rajesh Kumar's farm</p>
                      <p className="text-sm text-muted-foreground">Due in 2 days</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      Schedule
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-amber-500" />
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Review contract C-1002</p>
                      <p className="text-sm text-muted-foreground">Due in 1 day</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      Review
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-red-500" />
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Resolve dispute for contract C-1004</p>
                      <p className="text-sm text-muted-foreground">Overdue by 1 day</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      Resolve
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Contract Facilitation</CardTitle>
                <CardDescription>Monthly contract facilitation trends</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[200px] w-full">
                  {/* Chart would go here in a real implementation */}
                  <div className="flex h-full items-center justify-center">
                    <BarChart className="h-16 w-16 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Chart visualization would appear here</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Verification Progress</CardTitle>
                <CardDescription>User verification progress by region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Punjab</div>
                      <div className="text-sm text-muted-foreground">85%</div>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Haryana</div>
                      <div className="text-sm text-muted-foreground">72%</div>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Gujarat</div>
                      <div className="text-sm text-muted-foreground">64%</div>
                    </div>
                    <Progress value={64} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Verifications Tab */}
        <TabsContent value="verifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Verifications</CardTitle>
              <CardDescription>Users waiting for verification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search users..."
                    className="pl-8 w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button>Schedule Verification Visit</Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Date Applied</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVerifications.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                      </TableCell>
                      <TableCell>{user.type}</TableCell>
                      <TableCell>{user.location}</TableCell>
                      <TableCell>{user.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button size="sm">Verify</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contracts Tab */}
        <TabsContent value="contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Contracts</CardTitle>
              <CardDescription>Contracts requiring facilitation or approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search contracts..." className="pl-8 w-[250px]" />
                </div>
                <Button>Create New Contract</Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contract ID</TableHead>
                    <TableHead>Farmer</TableHead>
                    <TableHead>Buyer</TableHead>
                    <TableHead>Crop</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockData.pendingContracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">{contract.id}</TableCell>
                      <TableCell>{contract.farmer}</TableCell>
                      <TableCell>{contract.buyer}</TableCell>
                      <TableCell>{contract.crop}</TableCell>
                      <TableCell>₹{contract.value.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={contract.status === "Negotiation" ? "outline" : "default"}>
                          {contract.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button size="sm">Facilitate</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Reports</CardTitle>
              <CardDescription>View and generate reports on your performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Verification Success Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full">
                      {/* Chart would go here in a real implementation */}
                      <div className="flex h-full items-center justify-center">
                        <BarChart className="h-16 w-16 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Contract Facilitation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full">
                      {/* Chart would go here in a real implementation */}
                      <div className="flex h-full items-center justify-center">
                        <BarChart className="h-16 w-16 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Dispute Resolution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full">
                      {/* Chart would go here in a real implementation */}
                      <div className="flex h-full items-center justify-center">
                        <BarChart className="h-16 w-16 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

