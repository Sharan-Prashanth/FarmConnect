"use client"

import { useState } from "react"
import { ArrowRight, Calendar, CheckCircle, Clock, Download, Printer, X } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

interface TransactionDetailModalProps {
  isOpen: boolean
  onClose: () => void
  transaction: any
}

export function TransactionDetailModal({ isOpen, onClose, transaction }: TransactionDetailModalProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = () => {
    setIsDownloading(true)

    // Simulate download process
    setTimeout(() => {
      // Create receipt content
      const receiptContent = `
TRANSACTION RECEIPT
===================

Transaction ID: ${transaction.id}
Date: ${transaction.date}
Type: ${transaction.type}
Status: ${transaction.status}

From: ${transaction.from.name}
To: ${transaction.to.name}

Amount: ₹${transaction.amount.toLocaleString()}

Contract ID: ${transaction.contractId}
Contract Title: ${transaction.contractTitle || "Contract Title"}

Description: ${transaction.description || "Payment for agricultural contract"}

Payment Method: Bank Transfer
Reference Number: REF-${Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0")}

This is an electronically generated receipt.
      `

      // Create a blob and trigger download
      const blob = new Blob([receiptContent], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `Receipt-${transaction.id}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setIsDownloading(false)
    }, 1500)
  }

  if (!transaction) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Transaction Details</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>Complete information about transaction {transaction.id}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Transaction Header */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{transaction.type} Payment</h3>
              <p className="text-sm text-muted-foreground">
                {transaction.contractTitle || `Contract ${transaction.contractId}`}
              </p>
            </div>
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
              className="capitalize"
            >
              {transaction.status}
            </Badge>
          </div>

          {/* Transaction Amount */}
          <div className="flex flex-col items-center justify-center py-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">Transaction Amount</p>
            <p className="text-3xl font-bold">₹{transaction.amount.toLocaleString()}</p>
          </div>

          {/* Transaction Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Transaction ID</p>
                <p className="font-medium">{transaction.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Date</p>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">{transaction.date}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Contract ID</p>
                <p className="font-medium">{transaction.contractId}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Payment Type</p>
                <p className="font-medium capitalize">{transaction.type}</p>
              </div>
            </div>

            <Separator />

            {/* From/To */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">From</p>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={transaction.from.avatar} alt={transaction.from.name} />
                    <AvatarFallback>{transaction.from.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{transaction.from.name}</p>
                    <p className="text-xs text-muted-foreground">{transaction.from.type || "Buyer"}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">To</p>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={transaction.to.avatar} alt={transaction.to.name} />
                    <AvatarFallback>{transaction.to.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{transaction.to.name}</p>
                    <p className="text-xs text-muted-foreground">{transaction.to.type || "Farmer"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            {transaction.timeline && (
              <div className="space-y-2 pt-2">
                <p className="text-sm font-medium">Transaction Timeline</p>
                <div className="space-y-3">
                  {transaction.timeline.map((event: any, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="mt-0.5">
                        {event.status === "completed" ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Clock className="h-4 w-4 text-amber-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{event.title}</p>
                        <p className="text-xs text-muted-foreground">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {transaction.description && (
              <div className="space-y-2 pt-2">
                <p className="text-sm font-medium">Description</p>
                <p className="text-sm text-muted-foreground">{transaction.description}</p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex justify-between items-center">
          <div>
            {transaction.status === "pending" && (
              <Button variant="outline" size="sm">
                <ArrowRight className="mr-2 h-4 w-4" />
                View Contract
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleDownload} disabled={isDownloading}>
              {isDownloading ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download Receipt
                </>
              )}
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

