"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Download, FileText, Loader2 } from "lucide-react"
import { fetchContractDetails, updateContractStatus, updateContract, moveToNegotiation } from "@/lib/contract-actions"
import { ContractDocumentViewer } from "@/components/contract-document-viewer"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ContractStatus, Contract } from "@/lib/types"

function isValidContract(contract: Contract | null): contract is Contract {
  return contract !== null
}

export default function ContractDetails() {
  const { id } = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [contract, setContract] = useState<Contract | null>(null)
  const [showDocumentViewer, setShowDocumentViewer] = useState(false)
  
  // Show action buttons for both review mode and draft/pending status
  const shouldShowActions = searchParams.get("mode") === "review" || 
    (contract && (contract.status === "draft" || contract.status === "pending"))
  
  const [showNegotiationDialog, setShowNegotiationDialog] = useState(false)
  const [negotiationDetails, setNegotiationDetails] = useState({
    proposedPrice: "",
    proposedQuantity: "",
    proposedDeliveryDate: "",
    comments: ""
  })
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateData, setUpdateData] = useState({
    title: "",
    description: "",
    quantity: "",
    pricePerUnit: "",
    deliveryDate: "",
    qualityParameters: "",
    additionalTerms: ""
  })

  // Load contract data
  useEffect(() => {
    const loadContract = async () => {
      if (!id) return
      
      try {
        setIsLoading(true)
        
        // First check localStorage for any overrides of static contracts
        const storedContracts = localStorage.getItem('contracts')
        let userContracts: Contract[] = []
        if (storedContracts) {
          userContracts = JSON.parse(storedContracts)
          // Check if this contract exists in localStorage
          const storedContract = userContracts.find((c: Contract) => c.id === id)
          if (storedContract) {
            // Convert dates for stored contract
            const foundContract = {
              ...storedContract,
              deliveryDate: new Date(storedContract.deliveryDate),
              startDate: new Date(storedContract.startDate || Date.now()),
              endDate: new Date(storedContract.endDate || Date.now()),
              createdAt: new Date(storedContract.createdAt),
              updatedAt: new Date(storedContract.updatedAt)
            }
            setContract(foundContract)
            setUpdateData({
              title: foundContract.title,
              description: foundContract.description,
              quantity: foundContract.quantity.toString(),
              pricePerUnit: foundContract.pricePerUnit.toString(),
              deliveryDate: new Date(foundContract.deliveryDate).toISOString().split('T')[0],
              qualityParameters: foundContract.qualityParameters,
              additionalTerms: foundContract.additionalTerms || ''
            })
            setIsLoading(false)
            return
          }
        }
        
        // If not found in localStorage, check static contracts
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
            status: "pending" as ContractStatus,
            progress: 45,
            createdAt: new Date("2024-03-01"),
            updatedAt: new Date("2024-03-15")
          },
          {
            id: "CONTRACT-002",
            title: "Rice Supply Agreement",
            description: "Supply of premium basmati rice",
            counterpartyName: "Rice Traders Ltd",
            counterpartyEmail: "info@ricetraders.com",
            counterpartyPhone: "+91 98765 43211",
            counterpartyAddress: "456 Trade Center, Delhi",
            counterpartyType: "buyer",
            farmerId: "FARMER-002",
            buyerId: "BUYER-002",
            crop: "rice",
            quantity: 3000,
            unit: "kg",
            pricePerUnit: 45,
            totalPrice: 135000,
            deliveryDate: new Date("2024-07-15"),
            startDate: new Date("2024-04-01"),
            endDate: new Date("2024-07-30"),
            paymentTerms: "advance-partial-final",
            qualityParameters: "Premium basmati rice with 12% moisture content",
            additionalTerms: "Delivery at buyer's warehouse",
            status: "draft" as ContractStatus,
            progress: 20,
            createdAt: new Date("2024-03-15"),
            updatedAt: new Date("2024-03-15")
          }
        ]

        // Find the contract in static data
        const staticContract = staticContracts.find(c => c.id === id)
        
        if (staticContract) {
          setContract(staticContract)
          setUpdateData({
            title: staticContract.title,
            description: staticContract.description,
            quantity: staticContract.quantity.toString(),
            pricePerUnit: staticContract.pricePerUnit.toString(),
            deliveryDate: new Date(staticContract.deliveryDate).toISOString().split('T')[0],
            qualityParameters: staticContract.qualityParameters,
            additionalTerms: staticContract.additionalTerms || ''
          })
        } else {
          setError("Contract not found")
        }
      } catch (error) {
        console.error("Error loading contract:", error)
        setError("Failed to load contract")
      } finally {
        setIsLoading(false)
      }
    }

    loadContract()
  }, [id])

  const updateContractStatus = async (newStatus: ContractStatus) => {
    if (!isValidContract(contract)) {
      toast.error("No contract found")
      return
    }
    
    try {
      setIsUpdating(true)
      
      const updatedContract: Contract = {
        ...contract,
        status: newStatus,
        updatedAt: new Date()
      }

      // For static contracts, store the updated version in localStorage
      const storedContracts = localStorage.getItem('contracts') || '[]'
      const contracts = JSON.parse(storedContracts)
      const existingIndex = contracts.findIndex((c: Contract) => c.id === contract.id)
      
      if (existingIndex !== -1) {
        contracts[existingIndex] = updatedContract
      } else {
        contracts.push(updatedContract)
      }
      
      localStorage.setItem('contracts', JSON.stringify(contracts))
      setContract(updatedContract)
      toast.success(`Contract ${newStatus} successfully!`)
      router.push("/contract-list")
    } catch (error) {
      console.error(`Error updating contract status to ${newStatus}:`, error)
      toast.error(`Failed to update contract status to ${newStatus}`)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleNegotiate = async () => {
    if (!isValidContract(contract)) {
      toast.error("No contract found")
      return
    }
    
    try {
      setIsUpdating(true)
      
      const updatedContract: Contract = {
        ...contract,
        status: "negotiating" as ContractStatus,
        updatedAt: new Date(),
        pricePerUnit: negotiationDetails.proposedPrice ? Number(negotiationDetails.proposedPrice) : contract.pricePerUnit,
        quantity: negotiationDetails.proposedQuantity ? Number(negotiationDetails.proposedQuantity) : contract.quantity,
        deliveryDate: negotiationDetails.proposedDeliveryDate ? new Date(negotiationDetails.proposedDeliveryDate) : contract.deliveryDate,
        additionalTerms: negotiationDetails.comments ? 
          `${contract.additionalTerms || ''}\n\nNegotiation Comments: ${negotiationDetails.comments}` : 
          contract.additionalTerms
      }

      // Update total price based on new quantity and price
      updatedContract.totalPrice = updatedContract.quantity * updatedContract.pricePerUnit

      // Update in localStorage if it's a user contract
      const storedContracts = localStorage.getItem('contracts') || '[]'
      const contracts = JSON.parse(storedContracts)
      const existingIndex = contracts.findIndex((c: Contract) => c.id === contract.id)
      
      if (existingIndex !== -1) {
        contracts[existingIndex] = updatedContract
      } else {
        contracts.push(updatedContract)
      }
      
      localStorage.setItem('contracts', JSON.stringify(contracts))
      setContract(updatedContract)
      setShowNegotiationDialog(false)
      toast.success("Negotiation submitted successfully")
      router.push("/contract-list")
    } catch (error) {
      console.error("Error submitting negotiation:", error)
      toast.error("Failed to submit negotiation")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleUpdate = async () => {
    if (!contract) return;
    
    try {
      setIsUpdating(true)
      const result = await updateContract(id as string, {
        title: updateData.title || contract.title,
        description: updateData.description || contract.description,
        quantity: updateData.quantity ? Number(updateData.quantity) : contract.quantity,
        pricePerUnit: updateData.pricePerUnit ? Number(updateData.pricePerUnit) : contract.pricePerUnit,
        deliveryDate: updateData.deliveryDate ? new Date(updateData.deliveryDate) : contract.deliveryDate,
        qualityParameters: updateData.qualityParameters || contract.qualityParameters,
        additionalTerms: updateData.additionalTerms || contract.additionalTerms,
      })

      if (result.success) {
        toast.success("Contract updated successfully!")
        router.push("/contract-list")
      } else {
        toast.error(result.error || "Failed to update contract")
      }
    } catch (error) {
      toast.error("Failed to update contract")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDownload = () => {
    if (!isValidContract(contract)) return;
    
    // In a real app, this would be an API call to download the document
    const documentData = `
CONTRACT AGREEMENT
Contract ID: ${contract.id}

1. CONTRACT DETAILS
Contract Title: ${contract.title}
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
    a.download = `Contract-${contract.id}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="animate-spin h-10 w-10" />
      </div>
    )
  }

  // Error state
  if (error || !contract) {
    return (
      <div className="flex flex-col justify-center items-center h-48 gap-4">
        <p className="text-red-500">{error || "Contract not found"}</p>
        <Button variant="outline" onClick={() => router.push("/contract-list")}>
          Return to Contract List
        </Button>
      </div>
    )
  }

  // Now we can safely use contract as it's guaranteed to be non-null
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
              <CardTitle className="text-2xl font-bold">{contract.title}</CardTitle>
              <CardDescription>{contract.description}</CardDescription>
            </div>
            <Badge variant="default">{contract.status}</Badge>
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
                  <Badge variant="secondary">{contract.status}</Badge>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{contract.progress || 0}%</span>
                    </div>
                    <Progress value={contract.progress || 0} />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Counterparty Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{contract.counterpartyName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{contract.counterpartyName}</p>
                        <p className="text-sm text-muted-foreground">{contract.counterpartyType}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span>{contract.counterpartyAddress || "Not specified"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Contact:</span>
                        <span>{contract.counterpartyPhone || "Not specified"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span>{contract.counterpartyEmail || "Not specified"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Contract Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Crop Type:</span>
                      <span>{contract.crop}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quantity:</span>
                      <span>{contract.quantity} {contract.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price per Unit:</span>
                      <span>₹{contract.pricePerUnit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Price:</span>
                      <span className="font-semibold">₹{contract.totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Date:</span>
                      <span>{new Date(contract.deliveryDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Contract Period</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Start Date:</span>
                    <span>{contract.startDate ? new Date(contract.startDate).toLocaleDateString() : "Not specified"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">End Date:</span>
                    <span>{contract.endDate ? new Date(contract.endDate).toLocaleDateString() : "Not specified"}</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Payment Terms</h3>
                  <p>{contract.paymentTerms}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Quality Parameters</h3>
                  <p>{contract.qualityParameters}</p>
                </div>

                {contract.additionalTerms && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Additional Terms</h3>
                    <p>{contract.additionalTerms}</p>
                  </div>
                )}

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
                      <TableCell>{contract.id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Created At</TableCell>
                      <TableCell>{new Date(contract.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Last Updated</TableCell>
                      <TableCell>{new Date(contract.updatedAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                    {contract.disputeReason && (
                      <TableRow>
                        <TableCell>Dispute Reason</TableCell>
                        <TableCell>{contract.disputeReason}</TableCell>
                      </TableRow>
                    )}
                    {contract.disputeDate && (
                      <TableRow>
                        <TableCell>Dispute Date</TableCell>
                        <TableCell>{new Date(contract.disputeDate).toLocaleDateString()}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="transactions">
              <div className="text-center py-8 text-muted-foreground">
                <p>No transactions recorded yet.</p>
              </div>
            </TabsContent>

            <TabsContent value="activity">
              <div className="text-center py-8 text-muted-foreground">
                <p>No activity recorded yet.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          {shouldShowActions && (
            <>
              <Button 
                variant="outline" 
                onClick={() => updateContractStatus("rejected" as ContractStatus)}
                className="bg-red-50 hover:bg-red-100 text-red-600"
                disabled={isUpdating}
              >
                {isUpdating ? "Rejecting..." : "Reject"}
              </Button>
              {contract.status === "negotiating" ? (
                <>
                  <Button 
                    onClick={() => setShowNegotiationDialog(true)} 
                    className="bg-yellow-600 hover:bg-yellow-700"
                    disabled={isUpdating}
                  >
                    Negotiate
                  </Button>
                  <Dialog open={showNegotiationDialog} onOpenChange={setShowNegotiationDialog}>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Submit Negotiation</DialogTitle>
                        <DialogDescription>
                          Propose changes to the contract terms. Current values are shown for reference.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="proposedPrice">Proposed Price per Unit</Label>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Current: ₹{contract.pricePerUnit.toLocaleString()}</span>
                            <Input
                              id="proposedPrice"
                              type="number"
                              placeholder="Enter proposed price"
                              value={negotiationDetails.proposedPrice}
                              onChange={(e) => setNegotiationDetails({ ...negotiationDetails, proposedPrice: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="proposedQuantity">Proposed Quantity</Label>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Current: {contract.quantity} {contract.unit}</span>
                            <Input
                              id="proposedQuantity"
                              type="number"
                              placeholder="Enter proposed quantity"
                              value={negotiationDetails.proposedQuantity}
                              onChange={(e) => setNegotiationDetails({ ...negotiationDetails, proposedQuantity: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="proposedDeliveryDate">Proposed Delivery Date</Label>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Current: {new Date(contract.deliveryDate).toLocaleDateString()}</span>
                            <Input
                              id="proposedDeliveryDate"
                              type="date"
                              value={negotiationDetails.proposedDeliveryDate}
                              onChange={(e) => setNegotiationDetails({ ...negotiationDetails, proposedDeliveryDate: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="comments">Additional Comments</Label>
                          <Textarea
                            id="comments"
                            placeholder="Explain your proposed changes..."
                            value={negotiationDetails.comments}
                            onChange={(e) => setNegotiationDetails({ ...negotiationDetails, comments: e.target.value })}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowNegotiationDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleNegotiate} className="bg-yellow-600 hover:bg-yellow-700">
                          Submit Negotiation
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              ) : (
                <Button 
                  onClick={() => updateContractStatus("active" as ContractStatus)}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Accepting..." : "Accept"}
                </Button>
              )}
            </>
          )}
          <Button 
            variant="outline" 
            onClick={() => setShowDocumentViewer(true)}
            disabled={isUpdating}
          >
            <FileText className="mr-2 h-4 w-4" />
            View Document
          </Button>
          <Button 
            onClick={handleDownload}
            disabled={isUpdating}
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </CardFooter>
      </Card>

      {/* Document Viewer Modal */}
      <ContractDocumentViewer
        contractId={contract.id.toString()}
        contractTitle={contract.title}
        isOpen={showDocumentViewer}
        onClose={() => setShowDocumentViewer(false)}
      />
    </div>
  )
}


