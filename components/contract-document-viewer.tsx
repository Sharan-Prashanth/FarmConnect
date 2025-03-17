"use client"

import { useState } from "react"
import { Download, Printer, Share2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ContractDocumentViewerProps {
  contractId: string
  contractTitle: string
  isOpen: boolean
  onClose: () => void
}

export function ContractDocumentViewer({ contractId, contractTitle, isOpen, onClose }: ContractDocumentViewerProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 3 // Mock total pages

  const handleDownload = () => {
    // In a real app, this would be an API call to download the document
    const documentData = generateMockContractDocument(contractId, contractTitle)

    // Create a blob from the data
    const blob = new Blob([documentData], { type: "application/pdf" })

    // Create a link element and trigger download
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Contract-${contractId}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between pb-2">
          <DialogTitle className="text-xl font-semibold">Contract: {contractTitle}</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="flex-1 overflow-auto border rounded-md p-4 bg-white">
          {/* Document content - in a real app this would be a PDF viewer or document renderer */}
          <div className="space-y-4 min-h-[500px]">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">CONTRACT AGREEMENT</h1>
              <h2 className="text-xl mb-4">Contract ID: {contractId}</h2>
              <p className="text-sm text-muted-foreground">Generated on {new Date().toLocaleDateString()}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">1. CONTRACT DETAILS</h3>
              <p>
                <strong>Contract Title:</strong> {contractTitle}
              </p>
              <p>
                <strong>Date:</strong> {new Date().toLocaleDateString()}
              </p>
              <p>
                <strong>Parties:</strong> Party A (Farmer) and Party B (Buyer)
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">2. TERMS AND CONDITIONS</h3>
              <p>
                This Agreement is entered into between the parties for the supply of agricultural products under the
                following terms:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Quantity and quality specifications as per Annexure A</li>
                <li>Delivery schedule as per Annexure B</li>
                <li>Payment terms as per Clause 5</li>
                <li>Quality parameters as per Clause 6</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">3. CROP SPECIFICATIONS</h3>
              <p>
                The crop specifications, including variety, grade, moisture content, and other quality parameters are
                detailed in Annexure A of this agreement.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">4. PRICE</h3>
              <p>
                The agreed price for the product is as specified in the contract details. Any price adjustments will be
                as per the terms specified in Clause 7.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">5. PAYMENT TERMS</h3>
              <p>Payment shall be made as per the following schedule:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>30% advance payment on signing of the contract</li>
                <li>40% on verification of crop at mid-stage</li>
                <li>30% on final delivery and quality verification</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">6. QUALITY PARAMETERS</h3>
              <p>
                The product must meet the quality standards specified in Annexure A. Quality verification will be
                conducted at the delivery point by a mutually agreed third-party inspector.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">7. DISPUTE RESOLUTION</h3>
              <p>
                Any disputes arising from this contract shall first be addressed through mutual negotiation. If
                unresolved, the parties agree to submit to arbitration under the Arbitration and Conciliation Act.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t">
              <p className="text-center">
                Page {currentPage} of {totalPages}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Helper function to generate mock document data
function generateMockContractDocument(contractId: string, contractTitle: string): string {
  return `
CONTRACT AGREEMENT
Contract ID: ${contractId}

1. CONTRACT DETAILS
Contract Title: ${contractTitle}
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

6. QUALITY PARAMETERS
The product must meet the quality standards specified in Annexure A. Quality verification will be conducted at the delivery point by a mutually agreed third-party inspector.

7. DISPUTE RESOLUTION
Any disputes arising from this contract shall first be addressed through mutual negotiation. If unresolved, the parties agree to submit to arbitration under the Arbitration and Conciliation Act.
  `
}

