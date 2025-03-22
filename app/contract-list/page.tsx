"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
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
import type { UserSession, Contract, ContractStatus } from "@/lib/types"
import { fetchContracts } from "@/lib/contract-actions"
import { toast } from "sonner"

export default function ContractList() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [user, setUser] = useState<UserSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [sortField, setSortField] = useState<"date" | "value">("date")
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

  // Move loadContracts outside useEffect so it can be reused
  const loadContracts = async () => {
    try {
      // Define static contracts with proper date handling
      const staticContracts: Contract[] = [
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
          status: "active" as ContractStatus,
          progress: 45,
          createdAt: new Date("2024-03-01T00:00:00Z"),
          updatedAt: new Date("2024-03-15T00:00:00Z")
        },
        {
          id: "CONTRACT-002",
          title: "Rice Procurement Contract",
          description: "Long-term rice supply agreement",
          counterpartyName: "Agro Traders Ltd",
          counterpartyEmail: "procurement@agrotraders.com",
          counterpartyPhone: "+91 98765 43211",
          counterpartyAddress: "456 Industrial Area, Delhi",
          counterpartyType: "buyer",
          farmerId: "FARMER-001",
          buyerId: "BUYER-002",
          crop: "rice",
          quantity: 10000,
          unit: "kg",
          pricePerUnit: 35,
          totalPrice: 350000,
          deliveryDate: new Date("2024-08-20"),
          startDate: new Date("2024-04-01"),
          endDate: new Date("2024-08-31"),
          paymentTerms: "advance-final",
          qualityParameters: "Premium basmati rice with 14% moisture content",
          additionalTerms: "Transportation cost borne by buyer",
          status: "pending" as ContractStatus,
          progress: 0,
          createdAt: new Date("2024-03-10T00:00:00Z"),
          updatedAt: new Date("2024-03-10T00:00:00Z")
        },
        {
          id: "CONTRACT-003",
          title: "Tomato Supply Agreement",
          description: "Seasonal tomato supply contract",
          counterpartyName: "Fresh Market Co",
          counterpartyEmail: "orders@freshmarket.com",
          counterpartyPhone: "+91 98765 43212",
          counterpartyAddress: "789 Market Street, Bangalore",
          counterpartyType: "buyer",
          farmerId: "FARMER-001",
          buyerId: "BUYER-003",
          crop: "tomatoes",
          quantity: 2000,
          unit: "kg",
          pricePerUnit: 40,
          totalPrice: 80000,
          deliveryDate: new Date("2024-05-10"),
          startDate: new Date("2024-03-15"),
          endDate: new Date("2024-05-15"),
          paymentTerms: "delivery-payment",
          qualityParameters: "Fresh, ripe tomatoes without blemishes",
          additionalTerms: "Daily delivery schedule to be maintained",
          status: "completed" as ContractStatus,
          progress: 100,
          createdAt: new Date("2024-02-15T00:00:00Z"),
          updatedAt: new Date("2024-05-15T00:00:00Z")
        },
        {
          id: "CONTRACT-004",
          title: "Cotton Farming Contract",
          description: "Premium cotton supply agreement",
          counterpartyName: "Textile Industries Ltd",
          counterpartyEmail: "procurement@textileindustries.com",
          counterpartyPhone: "+91 98765 43213",
          counterpartyAddress: "321 Industrial Estate, Chennai",
          counterpartyType: "buyer",
          farmerId: "FARMER-001",
          buyerId: "BUYER-004",
          crop: "cotton",
          quantity: 3000,
          unit: "kg",
          pricePerUnit: 60,
          totalPrice: 180000,
          deliveryDate: new Date("2024-09-15"),
          startDate: new Date("2024-05-01"),
          endDate: new Date("2024-09-30"),
          paymentTerms: "partial-payments",
          qualityParameters: "Grade A cotton with 8% moisture content",
          additionalTerms: "Quality check at delivery point",
          status: "negotiating" as ContractStatus,
          progress: 20,
          createdAt: new Date("2024-04-01T00:00:00Z"),
          updatedAt: new Date("2024-04-15T00:00:00Z")
        },
        {
          id: "CONTRACT-005",
          title: "Sugarcane Supply Contract",
          description: "Long-term sugarcane supply agreement",
          counterpartyName: "Sugar Mills Co",
          counterpartyEmail: "procurement@sugarmills.com",
          counterpartyPhone: "+91 98765 43214",
          counterpartyAddress: "654 Sugar Estate, Uttar Pradesh",
          counterpartyType: "buyer",
          farmerId: "FARMER-001",
          buyerId: "BUYER-005",
          crop: "sugarcane",
          quantity: 50000,
          unit: "kg",
          pricePerUnit: 3.5,
          totalPrice: 175000,
          deliveryDate: new Date("2024-12-20"),
          startDate: new Date("2024-06-01"),
          endDate: new Date("2024-12-31"),
          paymentTerms: "advance-partial-final",
          qualityParameters: "Sugarcane with 12% sucrose content",
          additionalTerms: "Transportation arranged by buyer",
          status: "disputed" as ContractStatus,
          progress: 30,
          createdAt: new Date("2024-05-01T00:00:00Z"),
          updatedAt: new Date("2024-05-15T00:00:00Z"),
          disputeReason: "Quality standards not met"
        }
      ]

      // Get user-created contracts from localStorage
      let userContracts: Contract[] = []
      try {
        const storedContracts = localStorage.getItem('contracts')
        if (storedContracts) {
          const parsedContracts = JSON.parse(storedContracts)
          
          // Convert dates for user contracts and ensure unique IDs
          userContracts = parsedContracts
            .filter((contract: any) => {
              // Filter out any contracts that have IDs matching static contracts
              return !staticContracts.some(sc => sc.id === contract.id)
            })
            .map((contract: any) => ({
              ...contract,
              deliveryDate: new Date(contract.deliveryDate),
              startDate: new Date(contract.startDate || Date.now()),
              endDate: new Date(contract.endDate || Date.now()),
              createdAt: new Date(contract.createdAt),
              updatedAt: new Date(contract.updatedAt)
            }))
        }
      } catch (error) {
        console.error("Error reading from localStorage:", error)
        userContracts = []
      }

      // Get updated versions of static contracts from localStorage
      const updatedStaticContracts = staticContracts.map(staticContract => {
        const storedContract = userContracts.find(uc => uc.id === staticContract.id)
        return storedContract || staticContract
      })

      // Combine static and user contracts, ensuring no duplicates
      const allContracts = [...updatedStaticContracts, ...userContracts]
      
      // Set all contracts without filtering by role
      setContracts(allContracts)
      console.log("Loaded contracts:", allContracts)
    } catch (error) {
      console.error("Error loading contracts:", error)
      setContracts([])
    }
  }

  // Load contracts when component mounts
  useEffect(() => {
    loadContracts()
  }, [])

  // Show success message and refresh contracts when a new contract is created
  useEffect(() => {
    if (searchParams.get("success") === "created") {
      toast.success("Contract created successfully!")
      loadContracts()
    }
  }, [searchParams])

  // Filter contracts based on search term and status
  const filteredContracts = contracts
    .filter((contract) => {
      const matchesSearch =
        contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.counterpartyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || contract.status === statusFilter

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortField === "date") {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        return sortOrder === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
      } else {
        return sortOrder === "asc" ? a.totalPrice - b.totalPrice : b.totalPrice - a.totalPrice
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
            <div className="text-2xl font-bold">
              {contracts.filter((c) => c.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {contracts.filter((c) => c.status === "active").length > 0
                ? "Next delivery on " + (contracts.find((c) => c.status === "active")?.deliveryDate 
                  ? new Date(contracts.find((c) => c.status === "active")!.deliveryDate).toLocaleDateString()
                  : "Not specified")
                : "No active contracts"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Contracts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contracts.filter((c) => c.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {contracts.filter((c) => c.status === "pending").length > 0 ? "Awaiting approval" : "No pending contracts"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed Contracts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contracts.filter((c) => c.status === "completed").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {contracts.filter((c) => c.status === "completed").length > 0
                ? "Last completed on " + (contracts.find((c) => c.status === "completed")?.updatedAt
                  ? new Date(contracts.find((c) => c.status === "completed")!.updatedAt).toLocaleDateString()
                  : "Not specified")
                : "No completed contracts"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Disputed Contracts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contracts.filter((c) => c.status === "disputed").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {contracts.filter((c) => c.status === "disputed").length > 0 ? "Requires attention" : "No disputed contracts"}
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
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="negotiating">Negotiating</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
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
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="negotiating">Negotiating</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
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
                  <p className="text-sm text-muted-foreground">
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
                        <TableHead>Created Date</TableHead>
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
                                <AvatarFallback>{contract.counterpartyName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span>{contract.counterpartyName}</span>
                            </div>
                          </TableCell>
                          <TableCell>{contract.crop}</TableCell>
                          <TableCell>₹{(contract.totalPrice / 1000).toFixed(0)}K</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                contract.status === "active"
                                  ? "default"
                                  : contract.status === "completed"
                                    ? "secondary"
                                    : contract.status === "disputed"
                                      ? "destructive"
                                      : "outline"
                              }
                            >
                              {contract.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(contract.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/contract-details/${contract.id}`}>View</Link>
                              </Button>
                              <Button 
                                variant="default" 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => router.push(`/payment?contractId=${contract.id}&amount=${contract.totalPrice}&title=${encodeURIComponent(contract.title)}&counterparty=${encodeURIComponent(contract.counterpartyName)}`)}
                              >
                                Make Payment
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
                    {contracts.filter(c => c.status === "active").map((contract) => (
                      <TableRow key={contract.id}>
                        <TableCell className="font-medium">{contract.id}</TableCell>
                        <TableCell>{contract.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{contract.counterpartyName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{contract.counterpartyName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-24 rounded-full bg-muted">
                              <div
                                className="h-full rounded-full bg-green-600"
                                style={{ width: `${contract.progress || 0}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">{contract.progress || 0}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {contract.deliveryDate ? new Date(contract.deliveryDate).toLocaleDateString() : "Not specified"}
                        </TableCell>
                        <TableCell>
                          {contract.endDate ? new Date(contract.endDate).toLocaleDateString() : "Not specified"}
                        </TableCell>
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
                    {contracts.filter(c => c.status === "pending").map((contract) => (
                      <TableRow key={contract.id}>
                        <TableCell className="font-medium">{contract.id}</TableCell>
                        <TableCell>{contract.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{contract.counterpartyName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{contract.counterpartyName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{contract.status}</Badge>
                        </TableCell>
                        <TableCell>{new Date(contract.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {contract.startDate ? new Date(contract.startDate).toLocaleDateString() : "Not specified"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/contract-details/${contract.id}`}>View</Link>
                            </Button>
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              asChild
                            >
                              <Link href={`/contract-details/${contract.id}?mode=review`}>
                                {contract.status === "negotiating" ? "Negotiate" : "Review"}
                              </Link>
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
                    {contracts.filter(c => c.status === "completed").map((contract) => (
                      <TableRow key={contract.id}>
                        <TableCell className="font-medium">{contract.id}</TableCell>
                        <TableCell>{contract.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{contract.counterpartyName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{contract.counterpartyName}</span>
                          </div>
                        </TableCell>
                        <TableCell>₹{(contract.totalPrice / 1000).toFixed(0)}K</TableCell>
                        <TableCell>{new Date(contract.updatedAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {contract.startDate && contract.endDate
                            ? `${new Date(contract.startDate).toLocaleDateString()} - ${new Date(contract.endDate).toLocaleDateString()}`
                            : "Not specified"}
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
                    {contracts.filter(c => c.status === "disputed").map((contract) => (
                      <TableRow key={contract.id}>
                        <TableCell className="font-medium">{contract.id}</TableCell>
                        <TableCell>{contract.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{contract.counterpartyName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{contract.counterpartyName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{contract.disputeReason || "Not specified"}</TableCell>
                        <TableCell>
                          {contract.disputeDate ? new Date(contract.disputeDate).toLocaleDateString() : "Not specified"}
                        </TableCell>
                        <TableCell>
                          {contract.startDate && contract.endDate
                            ? `${new Date(contract.startDate).toLocaleDateString()} - ${new Date(contract.endDate).toLocaleDateString()}`
                            : "Not specified"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/contract-details/${contract.id}`}>View</Link>
                            </Button>
                            <Button 
                              onClick={() => router.push(`/payment?contractId=${contract.id}&amount=${contract.totalPrice}&title=${encodeURIComponent(contract.title)}&counterparty=${encodeURIComponent(contract.counterpartyName)}`)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Make Payment
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

