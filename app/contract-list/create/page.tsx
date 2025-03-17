"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CalendarIcon, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { requireAuth } from "@/lib/auth"
import { createContract } from "@/lib/contract-actions"
import type { UserSession } from "@/lib/types"
import { cn } from "@/lib/utils"

export default function CreateContract() {
  const router = useRouter()
  const [user, setUser] = useState<UserSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deliveryDate, setDeliveryDate] = useState<Date>()
  const [contractStartDate, setContractStartDate] = useState<Date>()
  const [contractEndDate, setContractEndDate] = useState<Date>()
  const [quantity, setQuantity] = useState<string>("0")
  const [pricePerUnit, setPricePerUnit] = useState<string>("0")
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [counterpartyType, setCounterpartyType] = useState<"farmer" | "buyer">("buyer")

  // Calculate total price when quantity or price per unit changes
  useEffect(() => {
    const calculatedTotal = Number.parseFloat(quantity) * Number.parseFloat(pricePerUnit) || 0
    setTotalPrice(calculatedTotal)
  }, [quantity, pricePerUnit])

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await requireAuth()
        setUser(session)

        // Set default counterparty type based on user role
        if (session.role === "farmer") {
          setCounterpartyType("buyer")
        } else if (session.role === "buyer") {
          setCounterpartyType("farmer")
        }

        setIsLoading(false)
      } catch (error) {
        router.push("/login")
      }
    }

    checkAuth()
  }, [router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Get form data
    const formData = new FormData(e.currentTarget)

    // Prepare contract data
    const contractData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,

      // Counterparty details
      counterpartyName: formData.get("counterpartyName") as string,
      counterpartyEmail: formData.get("counterpartyEmail") as string,
      counterpartyPhone: formData.get("counterpartyPhone") as string,
      counterpartyAddress: formData.get("counterpartyAddress") as string,
      counterpartyType: counterpartyType,

      // Set the appropriate IDs based on user role and counterparty type
      farmerId: user?.role === "farmer" ? user.id : "",
      buyerId: user?.role === "buyer" ? user.id : "",

      // Crop details
      crop: formData.get("crop") as string,
      quantity: Number.parseFloat(formData.get("quantity") as string),
      unit: formData.get("unit") as string,
      pricePerUnit: Number.parseFloat(formData.get("pricePerUnit") as string),
      totalPrice: totalPrice,

      // Dates
      deliveryDate: deliveryDate,
      startDate: contractStartDate,
      endDate: contractEndDate,

      // Terms
      paymentTerms: formData.get("paymentTerms") as string,
      qualityParameters: formData.get("qualityParameters") as string,
      additionalTerms: formData.get("additionalTerms") as string,

      // Initial status
      status: "draft",
    }

    try {
      // Call the server action to create the contract
      const result = await createContract(contractData)

      if (result.success) {
        // Redirect to contract list with success message
        router.push("/contract-list?success=created")
      } else {
        // Handle error
        console.error("Error creating contract:", result.error)
        // In a real app, you would show an error message to the user
      }
    } catch (error) {
      console.error("Error creating contract:", error)
      // Handle error state
    } finally {
      setIsSubmitting(false)
    }
  }

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
      <div className="mb-8">
        <Button variant="outline" size="sm" asChild>
          <Link href="/contract-list">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Contracts
          </Link>
        </Button>
      </div>

      <div className="flex flex-col space-y-6 md:flex-row md:space-x-8 md:space-y-0">
        <div className="md:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle>Create New Contract</CardTitle>
              <CardDescription>Set up a new contract farming agreement with a {counterpartyType}</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {/* Basic Contract Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Basic Information</h3>
                  <div className="space-y-2">
                    <Label htmlFor="title">Contract Title</Label>
                    <Input id="title" name="title" placeholder="e.g. Organic Wheat Supply Agreement" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Brief description of the contract"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>

                <Separator />

                {/* Counterparty Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Counterparty Information</h3>

                  <div className="space-y-2">
                    <Label>Counterparty Type</Label>
                    <RadioGroup
                      value={counterpartyType}
                      onValueChange={(value) => setCounterpartyType(value as "farmer" | "buyer")}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="farmer" id="farmer" />
                        <Label htmlFor="farmer" className="font-normal">
                          Farmer
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="buyer" id="buyer" />
                        <Label htmlFor="buyer" className="font-normal">
                          Buyer
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="counterpartyName">Counterparty Name</Label>
                    <Input
                      id="counterpartyName"
                      name="counterpartyName"
                      placeholder={`${counterpartyType === "farmer" ? "Farmer" : "Buyer"}'s name or company name`}
                      required
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="counterpartyEmail">Email</Label>
                      <Input
                        id="counterpartyEmail"
                        name="counterpartyEmail"
                        type="email"
                        placeholder="contact@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="counterpartyPhone">Phone</Label>
                      <Input id="counterpartyPhone" name="counterpartyPhone" placeholder="+91 98765 43210" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="counterpartyAddress">Address</Label>
                    <Textarea id="counterpartyAddress" name="counterpartyAddress" placeholder="Full address" />
                  </div>
                </div>

                <Separator />

                {/* Crop Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Crop Details</h3>
                  <div className="space-y-2">
                    <Label htmlFor="crop">Crop Type</Label>
                    <Select name="crop" required>
                      <SelectTrigger id="crop">
                        <SelectValue placeholder="Select crop" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wheat">Wheat</SelectItem>
                        <SelectItem value="rice">Rice</SelectItem>
                        <SelectItem value="corn">Corn</SelectItem>
                        <SelectItem value="potatoes">Potatoes</SelectItem>
                        <SelectItem value="soybeans">Soybeans</SelectItem>
                        <SelectItem value="sugarcane">Sugarcane</SelectItem>
                        <SelectItem value="cotton">Cotton</SelectItem>
                        <SelectItem value="tomatoes">Tomatoes</SelectItem>
                        <SelectItem value="onions">Onions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        name="quantity"
                        type="number"
                        min="0"
                        step="0.01"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">Unit</Label>
                      <Select name="unit" defaultValue="kg" required>
                        <SelectTrigger id="unit">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kg">Kilograms (kg)</SelectItem>
                          <SelectItem value="ton">Metric Tons</SelectItem>
                          <SelectItem value="quintal">Quintals</SelectItem>
                          <SelectItem value="piece">Pieces</SelectItem>
                          <SelectItem value="dozen">Dozen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Pricing Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Pricing Information</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="pricePerUnit">Price Per Unit (₹)</Label>
                      <Input
                        id="pricePerUnit"
                        name="pricePerUnit"
                        type="number"
                        min="0"
                        step="0.01"
                        value={pricePerUnit}
                        onChange={(e) => setPricePerUnit(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="totalPrice">Total Price (₹)</Label>
                      <Input
                        id="totalPrice"
                        name="totalPrice"
                        type="number"
                        value={totalPrice.toFixed(2)}
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Dates and Schedule */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Dates and Schedule</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Contract Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !contractStartDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {contractStartDate ? format(contractStartDate, "PPP") : <span>Select date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={contractStartDate}
                            onSelect={setContractStartDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>Contract End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !contractEndDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {contractEndDate ? format(contractEndDate, "PPP") : <span>Select date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={contractEndDate}
                            onSelect={setContractEndDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Delivery Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !deliveryDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {deliveryDate ? format(deliveryDate, "PPP") : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={deliveryDate}
                          onSelect={setDeliveryDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <Separator />

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Terms and Conditions</h3>
                  <div className="space-y-2">
                    <Label htmlFor="paymentTerms">Payment Terms</Label>
                    <Select name="paymentTerms" defaultValue="advance-partial-final" required>
                      <SelectTrigger id="paymentTerms">
                        <SelectValue placeholder="Select payment terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="advance-partial-final">Advance + Partial + Final Payment</SelectItem>
                        <SelectItem value="advance-final">Advance + Final Payment</SelectItem>
                        <SelectItem value="partial-payments">Multiple Partial Payments</SelectItem>
                        <SelectItem value="delivery-payment">Payment on Delivery</SelectItem>
                        <SelectItem value="custom">Custom Payment Schedule</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qualityParameters">Quality Parameters</Label>
                    <Textarea
                      id="qualityParameters"
                      name="qualityParameters"
                      placeholder="Specify quality standards, grading criteria, etc."
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="additionalTerms">Additional Terms</Label>
                    <Textarea
                      id="additionalTerms"
                      name="additionalTerms"
                      placeholder="Any additional terms or conditions"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="termsAgreed" name="termsAgreed" required />
                    <label
                      htmlFor="termsAgreed"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the terms and conditions of this contract
                    </label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" asChild>
                  <Link href="/contract-list">Cancel</Link>
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Contract...
                    </>
                  ) : (
                    "Create Contract"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        <div className="md:w-1/3">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contract Preview</CardTitle>
                <CardDescription>Summary of your contract details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Contract Value</p>
                  <p className="text-2xl font-bold">₹{totalPrice.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Counterparty Type</p>
                  <p className="text-base capitalize">{counterpartyType}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Quantity</p>
                  <p className="text-base">{Number.parseFloat(quantity) > 0 ? `${quantity} units` : "Not specified"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Delivery Date</p>
                  <p className="text-base">{deliveryDate ? format(deliveryDate, "PPP") : "Not specified"}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contract Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
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
                      className="mr-2 h-4 w-4 text-green-600 mt-0.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Be specific about quality parameters to avoid disputes later.</span>
                  </li>
                  <li className="flex items-start">
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
                      className="mr-2 h-4 w-4 text-green-600 mt-0.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Consider including provisions for price adjustments based on market conditions.</span>
                  </li>
                  <li className="flex items-start">
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
                      className="mr-2 h-4 w-4 text-green-600 mt-0.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Clearly define delivery logistics and who bears transportation costs.</span>
                  </li>
                  <li className="flex items-start">
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
                      className="mr-2 h-4 w-4 text-green-600 mt-0.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Include dispute resolution mechanisms in the additional terms.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to format dates
function format(date: Date, formatStr: string) {
  const day = date.getDate()
  const month = date.toLocaleString("default", { month: "long" })
  const year = date.getFullYear()

  // Simple implementation of PPP format (e.g., "April 29, 2023")
  if (formatStr === "PPP") {
    return `${month} ${day}, ${year}`
  }

  return date.toDateString()
}

