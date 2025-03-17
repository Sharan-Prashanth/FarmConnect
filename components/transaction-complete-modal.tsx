"use client"

import { useState } from "react"
import { CheckCircle, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface TransactionCompleteModalProps {
  isOpen: boolean
  onClose: () => void
  transaction: any
  onComplete: () => void
}

export function TransactionCompleteModal({ isOpen, onClose, transaction, onComplete }: TransactionCompleteModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const handleComplete = () => {
    setIsProcessing(true)

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsCompleted(true)

      // After showing success message, close and notify parent
      setTimeout(() => {
        setIsCompleted(false)
        onComplete()
        onClose()
      }, 1500)
    }, 2000)
  }

  if (!transaction) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        {isCompleted ? (
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-800">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-200" />
            </div>
            <DialogTitle>Transaction Completed!</DialogTitle>
            <DialogDescription className="text-center">
              Transaction {transaction.id} has been successfully marked as completed.
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Complete Transaction</DialogTitle>
              <DialogDescription>Are you sure you want to mark this transaction as completed?</DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="rounded-md border p-4 bg-muted/30">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Transaction ID:</span>
                    <span className="text-sm font-medium">{transaction.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Amount:</span>
                    <span className="text-sm font-medium">₹{transaction.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Type:</span>
                    <span className="text-sm font-medium capitalize">{transaction.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Contract:</span>
                    <span className="text-sm font-medium">{transaction.contractId}</span>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                This action will mark the transaction as completed and cannot be undone. Make sure you have received the
                payment before proceeding.
              </p>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Complete Transaction"
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

