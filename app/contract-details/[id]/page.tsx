"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Download, FileText, Loader2 } from "lucide-react"
import { fetchContractDetails } from "@/lib/contract-actions"
import { ContractDocumentViewer } from "@/components/contract-document-viewer"

export default function ContractDetails() {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [contract, setContract] = useState<any>(null)
  const [showDocumentViewer, setShowDocumentViewer] = useState(false)

  // Fetch contract details on component mount
  useEffect(() => {
    const loadContractDetails = async () => {
      try {
        const data = await fetchContractDetails(id as string)
        setContract(data)
      } catch (error) {
        console.error("Failed to fetch contract details:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadContractDetails()
  }, [id])

  const handleDownload = () => {
    // In a real app, this would be an API call to download the document
    const documentData = `
CONTRACT AGREEMENT
Contract ID: ${mockContract.id}

1. CONTRACT DETAILS
Contract Title: ${mockContract.title}
Date: ${new Date().toLocaleDateString()}
Parties: Party A (Farmer) and Party B (Buyer)

2. TERMS AND CONDITIONS
This Agreement is entered into between the parties for the supply of agricultural products under the following terms:
- Quantity and quality specifications as per Annexure A
- Delivery schedule as per Annexure B
- Payment terms as per Clause 5
- Quality parameters as per Clause 6

3. CROP SPECIFICATIONS
The crop specifications, including variety, grade, moisture content, and other quality parameters are detailed in Annexure A of this agreement.

4. PRICE
The agreed price for the product is as specified in the contract details. Any price adjustments will be as per the terms specified in Clause 7.

5. PAYMENT TERMS
Payment shall be made as per the following schedule:
- 30% advance payment on signing of the contract
- 40% on verification of crop at mid-stage
- 30% on final delivery and quality verification
    `

    // Create a blob from the data
    const blob = new Blob([documentData], { type: "text/plain" })

    // Create a link element and trigger download
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Contract-${mockContract.id}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Mock data for demonstration
  const mockContract = {
    id: id || "C-1001",
    title: "Wheat Supply Contract",
    description:
      "Contract for the supply of premium quality wheat with protein content above 12%. Must be pesticide-free and organic certified.",
    status: "Active",
    progress: 40,
    startDate: "2025-04-15",
    endDate: "2025-10-20",
    parties: {
      farmer: {
        name: "Rajesh Kumar",
        type: "Farmer",
        location: "Ludhiana, Punjab",
        contact: "+91 98765 43210",
        email: "rajesh@example.com",
      },
      buyer: {
        name: "Global Foods Ltd.",
        type: "Buyer",
        location: "Mumbai, Maharashtra",
        contact: "+91 87654 32109",
        email: "procurement@globalfoods.com",
      },
    },
    crop: "Wheat",
    quantity: "50 tons",
    unit: "quintal",
    pricePerUnit: 2200,
    totalValue: 1100000,
    deliveryDate: "2025-09-15",
    paymentTerms: "30% advance, 40% mid-term, 30% on delivery",
    qualityParameters: "Protein content min 12%, moisture max 14%, foreign matter max 2%",
    transactions: [
      {
        id: "T-1001",
        date: "2025-04-15",
        amount: 330000,
        type: "Advance",
        status: "Completed",
      },
      {
        id: "T-1002",
        date: "2025-07-10",
        amount: 440000,
        type: "Mid-term",
        status: "Pending",
      },
      {
        id: "T-1003",
        date: "2025-09-15",
        amount: 330000,
        type: "Final",
        status: "Scheduled",
      },
    ],
    activities: [
      {
        date: "2025-04-15",
        description: "Contract signed",
        user: "Rajesh Kumar",
      },
      {
        date: "2025-04-15",
        description: "Advance payment received",
        user: "Global Foods Ltd.",
      },
      {
        date: "2025-05-10",
        description: "Crop planting confirmed",
        user: "Rajesh Kumar",
      },
      {
        date: "2025-06-20",
        description: "First inspection completed",
        user: "Anil Singh (Agent)",
      },
    ],
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="animate-spin h-10 w-10" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <Link href="/contract-list" className="flex items-center gap-2 text-blue-500 hover:text-blue-700">
          <ArrowLeft size={16} /> Back to Contracts
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold">{mockContract.title}</CardTitle>
              <CardDescription>{mockContract.description}</CardDescription>
            </div>
            <Badge variant="default">{mockContract.status}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Contract Status</h3>
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary">{mockContract.status}</Badge>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{mockContract.progress}%</span>
                    </div>
                    <Progress value={mockContract.progress} />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Farmer Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg?height=48&width=48" alt={mockContract.parties.farmer.name} />
                        <AvatarFallback>{mockContract.parties.farmer.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{mockContract.parties.farmer.name}</p>
                        <p className="text-sm text-muted-foreground">{mockContract.parties.farmer.type}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span>{mockContract.parties.farmer.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Contact:</span>
                        <span>{mockContract.parties.farmer.contact}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span>{mockContract.parties.farmer.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Buyer Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg?height=48&width=48" alt={mockContract.parties.buyer.name} />
                        <AvatarFallback>{mockContract.parties.buyer.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{mockContract.parties.buyer.name}</p>
                        <p className="text-sm text-muted-foreground">{mockContract.parties.buyer.type}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span>{mockContract.parties.buyer.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Contact:</span>
                        <span>{mockContract.parties.buyer.contact}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span>{mockContract.parties.buyer.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Crop Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Crop Type:</span>
                      <span>{mockContract.crop}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quantity:</span>
                      <span>{mockContract.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Unit:</span>
                      <span>{mockContract.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price per Unit:</span>
                      <span>₹{mockContract.pricePerUnit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Value:</span>
                      <span className="font-semibold">₹{mockContract.totalValue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Contract Period</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Start Date:</span>
                      <span>{mockContract.startDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">End Date:</span>
                      <span>{mockContract.endDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Date:</span>
                      <span>{mockContract.deliveryDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>6 months</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Payment Terms</h3>
                  <p>{mockContract.paymentTerms}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Quality Parameters</h3>
                  <p>{mockContract.qualityParameters}</p>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Attribute</TableHead>
                      <TableHead>Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Contract ID</TableCell>
                      <TableCell>{mockContract.id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Description</TableCell>
                      <TableCell>{mockContract.description}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Start Date</TableCell>
                      <TableCell>{mockContract.startDate}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>End Date</TableCell>
                      <TableCell>{mockContract.endDate}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Delivery Date</TableCell>
                      <TableCell>{mockContract.deliveryDate}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Status</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{mockContract.status}</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="transactions">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockContract.transactions.map((transaction: any) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>₹{transaction.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            transaction.status === "Completed"
                              ? "success"
                              : transaction.status === "Pending"
                                ? "outline"
                                : "secondary"
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="activity">
              <div className="space-y-4">
                {mockContract.activities.map((activity: any, index: number) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="rounded-full bg-green-100 p-2 dark:bg-green-800">
                      <FileText className="h-4 w-4 text-green-600 dark:text-green-200" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{activity.description}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span>{activity.date}</span>
                        <span className="mx-2">•</span>
                        <span>{activity.user}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => setShowDocumentViewer(true)}>
            <FileText className="mr-2 h-4 w-4" />
            View Document
          </Button>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </CardFooter>
      </Card>

      {/* Document Viewer Modal */}
      <ContractDocumentViewer
        contractId={mockContract.id}
        contractTitle={mockContract.title}
        isOpen={showDocumentViewer}
        onClose={() => setShowDocumentViewer(false)}
      />
    </div>
  )
}

