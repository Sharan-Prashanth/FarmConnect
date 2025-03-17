"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowUpDown, Download, Filter, Loader2, Plus, Search } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { requireAuth } from "@/lib/auth"
import type { UserSession } from "@/lib/types"

export default function ContractList() {
  const router = useRouter()
  const [user, setUser] = useState<UserSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [sortField, setSortField] = useState<"date" | "value">("date")

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

  // Mock data for contracts
  const mockContracts = {
    active: [
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
        pricePerUnit: 22.5,
        totalValue: 1125000,
        startDate: "2023-07-01",
        endDate: "2023-12-31",
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
        pricePerUnit: 35.0,
        totalValue: 1050000,
        startDate: "2023-06-15",
        endDate: "2024-06-14",
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
        pricePerUnit: 18.0,
        totalValue: 720000,
        startDate: "2023-08-01",
        endDate: "2023-10-31",
        status: "Active",
        progress: 25,
        nextDelivery: "2023-09-10",
      },
    ],
    pending: [
      {
        id: "C-1101",
        title: "Maize Supply Contract",
        counterparty: {
          name: "FeedCo Industries",
          type: "Buyer",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        crop: "Maize",
        quantity: "45 tons",
        pricePerUnit: 19.0,
        totalValue: 855000,
        proposedStartDate: "2023-10-01",
        proposedEndDate: "2024-03-31",
        status: "Pending Approval",
        submittedDate: "2023-08-25",
      },
      {
        id: "C-1102",
        title: "Soybean Purchase Agreement",
        counterparty: {
          name: "OilPress Ltd.",
          type: "Buyer",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        crop: "Soybeans",
        quantity: "25 tons",
        pricePerUnit: 42.0,
        totalValue: 1050000,
        proposedStartDate: "2023-11-01",
        proposedEndDate: "2024-04-30",
        status: "In Negotiation",
        submittedDate: "2023-08-20",
      },
    ],
    completed: [
      {
        id: "C-0901",
        title: "Tomato Supply Contract",
        counterparty: {
          name: "Fresh Sauce Co.",
          type: "Buyer",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        crop: "Tomatoes",
        quantity: "20 tons",
        pricePerUnit: 25.0,
        totalValue: 500000,
        startDate: "2023-01-01",
        endDate: "2023-05-31",
        status: "Completed",
        finalPayment: "₹5,00,000",
        completionDate: "2023-05-31",
      },
      {
        id: "C-0902",
        title: "Onion Supply Agreement",
        counterparty: {
          name: "Global Exports Ltd.",
          type: "Buyer",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        crop: "Onions",
        quantity: "35 tons",
        pricePerUnit: 20.0,
        totalValue: 700000,
        startDate: "2023-02-15",
        endDate: "2023-06-15",
        status: "Completed",
        finalPayment: "₹7,00,000",
        completionDate: "2023-06-15",
      },
    ],
    disputed: [
      {
        id: "C-0801",
        title: "Sugarcane Supply Contract",
        counterparty: {
          name: "SweetSugar Mills",
          type: "Buyer",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        crop: "Sugarcane",
        quantity: "100 tons",
        pricePerUnit: 31.0,
        totalValue: 3100000,
        startDate: "2023-03-01",
        endDate: "2023-09-30",
        status: "Disputed",
        disputeReason: "Quality issues with last delivery",
        disputeDate: "2023-08-15",
      },
    ],
  }

  // Combine all contracts for filtering
  const allContracts = [
    ...mockContracts.active,
    ...mockContracts.pending,
    ...mockContracts.completed,
    ...mockContracts.disputed,
  ]

  // Filter contracts based on search term and status
  const filteredContracts = allContracts
    .filter((contract) => {
      const matchesSearch =
        contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.counterparty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || contract.status.toLowerCase().includes(statusFilter.toLowerCase())

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortField === "date") {
        const dateA = new Date(a.startDate || a.proposedStartDate || a.submittedDate || a.completionDate)
        const dateB = new Date(b.startDate || b.proposedStartDate || b.submittedDate || b.completionDate)
        return sortOrder === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
      } else {
        return sortOrder === "asc" ? a.totalValue - b.totalValue : b.totalValue - a.totalValue
      }
    })

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <p className="text-sm text-muted-foreground">Loading contracts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contract Management</h1>
          <p className="text-muted-foreground">View and manage all your contract farming agreements</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button size="sm" className="bg-green-600 hover:bg-green-700" asChild>
            <Link href="/contract-list/create">
              <Plus className="mr-2 h-4 w-4" />
              New Contract
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Contract Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockContracts.active.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockContracts.active.length > 0
                ? "Next delivery on " + mockContracts.active[0].nextDelivery
                : "No active contracts"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Contracts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockContracts.pending.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockContracts.pending.length > 0 ? "Awaiting approval" : "No pending contracts"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed Contracts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockContracts.completed.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockContracts.completed.length > 0
                ? "Last completed on " + mockContracts.completed[0].completionDate
                : "No completed contracts"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Disputed Contracts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockContracts.disputed.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockContracts.disputed.length > 0 ? "Requires attention" : "No disputed contracts"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search contracts by title, ID, crop, or counterparty..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="negotiation">In Negotiation</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="disputed">Disputed</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setSortOrder(sortOrder === "asc" ? "desc" : "asc")
            }}
            className="w-10"
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Contract Tabs */}
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Contracts</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="disputed">Disputed</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Contracts</CardTitle>
              <CardDescription>View and manage all your contracts</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredContracts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-3">
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
                      className="h-6 w-6 text-muted-foreground"
                    >
                      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                      <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z" />
                      <line x1="9" y1="9" x2="10" y2="9" />
                      <line x1="9" y1="13" x2="15" y2="13" />
                      <line x1="9" y1="17" x2="15" y2="17" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">No contracts found</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                    No contracts match your current filters. Try adjusting your search or filters.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm("")
                      setStatusFilter("all")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Contract ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Counterparty</TableHead>
                        <TableHead>Crop</TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="-ml-3 h-8 data-[state=open]:bg-accent"
                            onClick={() => {
                              setSortField("value")
                              setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                            }}
                          >
                            Value
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="-ml-3 h-8 data-[state=open]:bg-accent"
                            onClick={() => {
                              setSortField("date")
                              setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                            }}
                          >
                            Date
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredContracts.map((contract) => (
                        <TableRow key={contract.id}>
                          <TableCell className="font-medium">{contract.id}</TableCell>
                          <TableCell>{contract.title}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={contract.counterparty.avatar} alt={contract.counterparty.name} />
                                <AvatarFallback>{contract.counterparty.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span>{contract.counterparty.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{contract.crop}</TableCell>
                          <TableCell>₹{(contract.totalValue / 1000).toFixed(0)}K</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                contract.status === "Active"
                                  ? "default"
                                  : contract.status === "Completed"
                                    ? "success"
                                    : contract.status === "Disputed"
                                      ? "destructive"
                                      : "outline"
                              }
                            >
                              {contract.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {contract.startDate || contract.proposedStartDate || contract.submittedDate}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/contract-details/${contract.id}`}>View</Link>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Contracts</CardTitle>
              <CardDescription>Currently active contract farming agreements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contract ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Counterparty</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Next Delivery</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockContracts.active.map((contract) => (
                      <TableRow key={contract.id}>
                        <TableCell className="font-medium">{contract.id}</TableCell>
                        <TableCell>{contract.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={contract.counterparty.avatar} alt={contract.counterparty.name} />
                              <AvatarFallback>{contract.counterparty.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{contract.counterparty.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-24 rounded-full bg-muted">
                              <div
                                className="h-full rounded-full bg-green-600"
                                style={{ width: `${contract.progress}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">{contract.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{contract.nextDelivery}</TableCell>
                        <TableCell>{contract.endDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/contract-details/${contract.id}`}>View</Link>
                            </Button>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Update
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Contracts</CardTitle>
              <CardDescription>Contracts awaiting approval or in negotiation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contract ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Counterparty</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted Date</TableHead>
                      <TableHead>Proposed Start</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockContracts.pending.map((contract) => (
                      <TableRow key={contract.id}>
                        <TableCell className="font-medium">{contract.id}</TableCell>
                        <TableCell>{contract.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={contract.counterparty.avatar} alt={contract.counterparty.name} />
                              <AvatarFallback>{contract.counterparty.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{contract.counterparty.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{contract.status}</Badge>
                        </TableCell>
                        <TableCell>{contract.submittedDate}</TableCell>
                        <TableCell>{contract.proposedStartDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/contract-details/${contract.id}`}>View</Link>
                            </Button>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              {contract.status === "In Negotiation" ? "Negotiate" : "Review"}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Contracts</CardTitle>
              <CardDescription>Successfully completed contract farming agreements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contract ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Counterparty</TableHead>
                      <TableHead>Final Payment</TableHead>
                      <TableHead>Completion Date</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockContracts.completed.map((contract) => (
                      <TableRow key={contract.id}>
                        <TableCell className="font-medium">{contract.id}</TableCell>
                        <TableCell>{contract.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={contract.counterparty.avatar} alt={contract.counterparty.name} />
                              <AvatarFallback>{contract.counterparty.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{contract.counterparty.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{contract.finalPayment}</TableCell>
                        <TableCell>{contract.completionDate}</TableCell>
                        <TableCell>
                          {new Date(contract.startDate).toLocaleDateString()} -{" "}
                          {new Date(contract.endDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/contract-details/${contract.id}`}>View</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disputed">
          <Card>
            <CardHeader>
              <CardTitle>Disputed Contracts</CardTitle>
              <CardDescription>Contracts with ongoing disputes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contract ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Counterparty</TableHead>
                      <TableHead>Dispute Reason</TableHead>
                      <TableHead>Dispute Date</TableHead>
                      <TableHead>Contract Period</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockContracts.disputed.map((contract) => (
                      <TableRow key={contract.id}>
                        <TableCell className="font-medium">{contract.id}</TableCell>
                        <TableCell>{contract.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={contract.counterparty.avatar} alt={contract.counterparty.name} />
                              <AvatarFallback>{contract.counterparty.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{contract.counterparty.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{contract.disputeReason}</TableCell>
                        <TableCell>{contract.disputeDate}</TableCell>
                        <TableCell>
                          {new Date(contract.startDate).toLocaleDateString()} -{" "}
                          {new Date(contract.endDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/contract-details/${contract.id}`}>View</Link>
                            </Button>
                            <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                              Resolve
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

