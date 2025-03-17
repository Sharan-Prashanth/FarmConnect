"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowUpDown, Download, Filter, Loader2, Search } from "lucide-react"

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
import { TransactionDetailModal } from "@/components/transaction-detail-modal"
import { TransactionCompleteModal } from "@/components/transaction-complete-modal"
import { toast } from "@/components/ui/use-toast"

export default function TransactionList() {
  const router = useRouter()
  const [user, setUser] = useState<UserSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [sortField, setSortField] = useState<"date" | "amount">("date")

  // State for modals
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showCompleteModal, setShowCompleteModal] = useState(false)

  // State for transactions
  const [transactions, setTransactions] = useState<any[]>([])

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await requireAuth()
        setUser(session)
        setIsLoading(false)

        // Initialize with mock data
        setTransactions(mockTransactions)
      } catch (error) {
        router.push("/login")
      }
    }

    checkAuth()
  }, [router])

  // Mock data for transactions
  const mockTransactions = [
    {
      id: "T-1001",
      contractId: "C-1001",
      contractTitle: "Premium Wheat Supply Contract",
      amount: 770000,
      type: "advance",
      status: "completed",
      date: "2025-07-01",
      description: "Advance payment for wheat contract",
      from: {
        id: "B-1001",
        name: "Global Foods Inc.",
        type: "Buyer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      to: {
        id: "F-1001",
        name: "Green Valley Farms",
        type: "Farmer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      timeline: [
        { title: "Transaction initiated", date: "2025-07-01 09:15 AM", status: "completed" },
        { title: "Payment processed", date: "2025-07-01 09:30 AM", status: "completed" },
        { title: "Transaction completed", date: "2025-07-01 10:00 AM", status: "completed" },
      ],
    },
    {
      id: "T-1002",
      contractId: "C-1001",
      contractTitle: "Premium Wheat Supply Contract",
      amount: 330000,
      type: "partial",
      status: "pending",
      date: "2025-09-15",
      description: "Payment for first delivery",
      from: {
        id: "B-1001",
        name: "Global Foods Inc.",
        type: "Buyer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      to: {
        id: "F-1001",
        name: "Green Valley Farms",
        type: "Farmer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      timeline: [
        { title: "Transaction initiated", date: "2025-09-15 14:20 PM", status: "completed" },
        { title: "Payment processing", date: "Pending", status: "pending" },
        { title: "Transaction completion", date: "Pending", status: "pending" },
      ],
    },
    {
      id: "T-1003",
      contractId: "C-1002",
      contractTitle: "Organic Rice Supply Agreement",
      amount: 735000,
      type: "advance",
      status: "completed",
      date: "2025-06-15",
      description: "Advance payment for rice contract",
      from: {
        id: "B-1002",
        name: "Healthy Foods Co.",
        type: "Buyer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      to: {
        id: "F-1001",
        name: "Green Valley Farms",
        type: "Farmer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      timeline: [
        { title: "Transaction initiated", date: "2025-06-15 10:30 AM", status: "completed" },
        { title: "Payment processed", date: "2025-06-15 11:15 AM", status: "completed" },
        { title: "Transaction completed", date: "2025-06-15 12:00 PM", status: "completed" },
      ],
    },
    {
      id: "T-1004",
      contractId: "C-1002",
      contractTitle: "Organic Rice Supply Agreement",
      amount: 315000,
      type: "partial",
      status: "pending",
      date: "2025-09-20",
      description: "Payment for first delivery",
      from: {
        id: "B-1002",
        name: "Healthy Foods Co.",
        type: "Buyer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      to: {
        id: "F-1001",
        name: "Green Valley Farms",
        type: "Farmer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      timeline: [
        { title: "Transaction initiated", date: "2025-09-20 09:45 AM", status: "completed" },
        { title: "Payment processing", date: "Pending", status: "pending" },
        { title: "Transaction completion", date: "Pending", status: "pending" },
      ],
    },
    {
      id: "T-1005",
      contractId: "C-0901",
      contractTitle: "Tomato Supply Contract",
      amount: 350000,
      type: "advance",
      status: "completed",
      date: "2025-01-01",
      description: "Advance payment for tomato contract",
      from: {
        id: "B-1003",
        name: "Fresh Sauce Co.",
        type: "Buyer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      to: {
        id: "F-1001",
        name: "Green Valley Farms",
        type: "Farmer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      timeline: [
        { title: "Transaction initiated", date: "2025-01-01 08:30 AM", status: "completed" },
        { title: "Payment processed", date: "2025-01-01 09:15 AM", status: "completed" },
        { title: "Transaction completed", date: "2025-01-01 10:00 AM", status: "completed" },
      ],
    },
    {
      id: "T-1006",
      contractId: "C-0901",
      contractTitle: "Tomato Supply Contract",
      amount: 150000,
      type: "final",
      status: "completed",
      date: "2025-05-31",
      description: "Final payment for tomato contract",
      from: {
        id: "B-1003",
        name: "Fresh Sauce Co.",
        type: "Buyer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      to: {
        id: "F-1001",
        name: "Green Valley Farms",
        type: "Farmer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      timeline: [
        { title: "Transaction initiated", date: "2025-05-31 14:00 PM", status: "completed" },
        { title: "Payment processed", date: "2025-05-31 14:30 PM", status: "completed" },
        { title: "Transaction completed", date: "2025-05-31 15:00 PM", status: "completed" },
      ],
    },
    {
      id: "T-1007",
      contractId: "C-0801",
      contractTitle: "Sugarcane Supply Contract",
      amount: 2170000,
      type: "advance",
      status: "completed",
      date: "2025-03-01",
      description: "Advance payment for sugarcane contract",
      from: {
        id: "B-1004",
        name: "SweetSugar Mills",
        type: "Buyer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      to: {
        id: "F-1001",
        name: "Green Valley Farms",
        type: "Farmer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      timeline: [
        { title: "Transaction initiated", date: "2025-03-01 10:00 AM", status: "completed" },
        { title: "Payment processed", date: "2025-03-01 10:45 AM", status: "completed" },
        { title: "Transaction completed", date: "2025-03-01 11:30 AM", status: "completed" },
      ],
    },
    {
      id: "T-1008",
      contractId: "C-0801",
      contractTitle: "Sugarcane Supply Contract",
      amount: 930000,
      type: "partial",
      status: "disputed",
      date: "2025-08-15",
      description: "Payment for delivery (disputed due to quality issues)",
      from: {
        id: "B-1004",
        name: "SweetSugar Mills",
        type: "Buyer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      to: {
        id: "F-1001",
        name: "Green Valley Farms",
        type: "Farmer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      timeline: [
        { title: "Transaction initiated", date: "2025-08-15 09:00 AM", status: "completed" },
        { title: "Payment processing", date: "2025-08-15 09:30 AM", status: "completed" },
        { title: "Dispute raised", date: "2025-08-15 11:00 AM", status: "completed" },
        { title: "Dispute resolution", date: "Pending", status: "pending" },
      ],
    },
    {
      id: "T-1009",
      contractId: "C-1003",
      contractTitle: "Premium Potato Supply Contract",
      amount: 504000,
      type: "advance",
      status: "completed",
      date: "2025-08-01",
      description: "Advance payment for potato contract",
      from: {
        id: "B-1005",
        name: "Crisp Chips Ltd.",
        type: "Buyer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      to: {
        id: "F-1001",
        name: "Green Valley Farms",
        type: "Farmer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      timeline: [
        { title: "Transaction initiated", date: "2025-08-01 13:15 PM", status: "completed" },
        { title: "Payment processed", date: "2025-08-01 14:00 PM", status: "completed" },
        { title: "Transaction completed", date: "2025-08-01 14:30 PM", status: "completed" },
      ],
    },
    {
      id: "T-1010",
      contractId: "C-0902",
      contractTitle: "Onion Supply Agreement",
      amount: 700000,
      type: "final",
      status: "completed",
      date: "2025-06-15",
      description: "Final payment for onion contract",
      from: {
        id: "B-1006",
        name: "Global Exports Ltd.",
        type: "Buyer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      to: {
        id: "F-1001",
        name: "Green Valley Farms",
        type: "Farmer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      timeline: [
        { title: "Transaction initiated", date: "2025-06-15 15:00 PM", status: "completed" },
        { title: "Payment processed", date: "2025-06-15 15:30 PM", status: "completed" },
        { title: "Transaction completed", date: "2025-06-15 16:00 PM", status: "completed" },
      ],
    },
  ]

  // Filter transactions based on search term, status, and type
  const filteredTransactions = transactions
    .filter((transaction) => {
      const matchesSearch =
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.contractId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.contractTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.from.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.to.name.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || transaction.status === statusFilter

      const matchesType = typeFilter === "all" || transaction.type === typeFilter

      return matchesSearch && matchesStatus && matchesType
    })
    .sort((a, b) => {
      if (sortField === "date") {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return sortOrder === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
      } else {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount
      }
    })

  // Calculate statistics
  const totalTransactions = transactions.length
  const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
  const pendingAmount = transactions
    .filter((transaction) => transaction.status === "pending")
    .reduce((sum, transaction) => sum + transaction.amount, 0)
  const completedTransactions = transactions.filter((transaction) => transaction.status === "completed").length

  // Handle view transaction
  const handleViewTransaction = (transaction: any) => {
    setSelectedTransaction(transaction)
    setShowDetailModal(true)
  }

  // Handle complete transaction
  const handleCompleteTransaction = (transaction: any) => {
    setSelectedTransaction(transaction)
    setShowCompleteModal(true)
  }

  // Complete transaction
  const completeTransaction = () => {
    // Update the transaction status in our state
    const updatedTransactions = transactions.map((t) => {
      if (t.id === selectedTransaction.id) {
        // Add completion to timeline
        const updatedTimeline = [
          ...(t.timeline || []),
          {
            title: "Transaction completed",
            date: new Date().toLocaleString(),
            status: "completed",
          },
        ]

        return {
          ...t,
          status: "completed",
          timeline: updatedTimeline,
        }
      }
      return t
    })

    setTransactions(updatedTransactions)

    // Show success toast
    toast({
      title: "Transaction Completed",
      description: `Transaction ${selectedTransaction.id} has been marked as completed.`,
      variant: "success",
    })
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <p className="text-sm text-muted-foreground">Loading transactions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transaction History</h1>
          <p className="text-muted-foreground">View and manage all your financial transactions</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Transaction Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTransactions}</div>
            <p className="text-xs text-muted-foreground">Across all contracts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(totalAmount / 100000).toFixed(2)}L</div>
            <p className="text-xs text-muted-foreground">Value of all transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(pendingAmount / 100000).toFixed(2)}L</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTransactions}</div>
            <p className="text-xs text-muted-foreground">Successfully processed</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search transactions by ID, contract, or description..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="disputed">Disputed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[150px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="advance">Advance</SelectItem>
              <SelectItem value="partial">Partial</SelectItem>
              <SelectItem value="final">Final</SelectItem>
              <SelectItem value="refund">Refund</SelectItem>
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

      {/* Transaction Tabs */}
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="incoming">Incoming</TabsTrigger>
          <TabsTrigger value="outgoing">Outgoing</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>Complete history of all financial transactions</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredTransactions.length === 0 ? (
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
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">No transactions found</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                    No transactions match your current filters. Try adjusting your search or filters.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm("")
                      setStatusFilter("all")
                      setTypeFilter("all")
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
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Contract</TableHead>
                        <TableHead>From</TableHead>
                        <TableHead>To</TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="-ml-3 h-8 data-[state=open]:bg-accent"
                            onClick={() => {
                              setSortField("amount")
                              setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                            }}
                          >
                            Amount
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead>Type</TableHead>
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
                      {filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>
                            <Link
                              href={`/contract-details/${transaction.contractId}`}
                              className="text-primary hover:underline"
                            >
                              {transaction.contractId}
                            </Link>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={transaction.from.avatar} alt={transaction.from.name} />
                                <AvatarFallback>{transaction.from.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span>{transaction.from.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={transaction.to.avatar} alt={transaction.to.name} />
                                <AvatarFallback>{transaction.to.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span>{transaction.to.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>₹{(transaction.amount / 1000).toFixed(0)}K</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                transaction.type === "advance"
                                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                                  : transaction.type === "partial"
                                    ? "bg-amber-50 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                                    : transaction.type === "final"
                                      ? "bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                                      : "bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-300"
                              }
                            >
                              {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                transaction.status === "completed"
                                  ? "success"
                                  : transaction.status === "pending"
                                    ? "outline"
                                    : transaction.status === "disputed"
                                      ? "destructive"
                                      : "secondary"
                              }
                            >
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleViewTransaction(transaction)}>
                                View
                              </Button>
                              {transaction.status === "pending" && (
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleCompleteTransaction(transaction)}
                                >
                                  Process
                                </Button>
                              )}
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

        <TabsContent value="incoming">
          <Card>
            <CardHeader>
              <CardTitle>Incoming Transactions</CardTitle>
              <CardDescription>Payments received from buyers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Contract</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions
                      .filter((t) => t.to.id === "F-1001")
                      .map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>
                            <Link
                              href={`/contract-details/${transaction.contractId}`}
                              className="text-primary hover:underline"
                            >
                              {transaction.contractId}
                            </Link>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={transaction.from.avatar} alt={transaction.from.name} />
                                <AvatarFallback>{transaction.from.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span>{transaction.from.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>₹{(transaction.amount / 1000).toFixed(0)}K</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                transaction.type === "advance"
                                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                                  : transaction.type === "partial"
                                    ? "bg-amber-50 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                                    : transaction.type === "final"
                                      ? "bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                                      : "bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-300"
                              }
                            >
                              {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                transaction.status === "completed"
                                  ? "success"
                                  : transaction.status === "pending"
                                    ? "outline"
                                    : transaction.status === "disputed"
                                      ? "destructive"
                                      : "secondary"
                              }
                            >
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleViewTransaction(transaction)}>
                                View
                              </Button>
                              {transaction.status === "pending" && (
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleCompleteTransaction(transaction)}
                                >
                                  Confirm
                                </Button>
                              )}
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

        <TabsContent value="outgoing">
          <Card>
            <CardHeader>
              <CardTitle>Outgoing Transactions</CardTitle>
              <CardDescription>Payments made to suppliers or refunds</CardDescription>
            </CardHeader>
            <CardContent>
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
                    <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold">No outgoing transactions</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                  You haven't made any outgoing payments yet. Outgoing transactions will appear here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <TransactionDetailModal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          transaction={selectedTransaction}
        />
      )}

      {/* Transaction Complete Modal */}
      {selectedTransaction && (
        <TransactionCompleteModal
          isOpen={showCompleteModal}
          onClose={() => setShowCompleteModal(false)}
          transaction={selectedTransaction}
          onComplete={completeTransaction}
        />
      )}
    </div>
  )
}

