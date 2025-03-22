"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  // Get contract details from URL parameters
  const contractId = searchParams.get("contractId");
  const amount = searchParams.get("amount");
  const title = searchParams.get("title");
  const counterparty = searchParams.get("counterparty");

  // If no contract details are provided, redirect back to contracts list
  useEffect(() => {
    if (!contractId || !amount || !title || !counterparty) {
      toast.error("Invalid payment details");
      router.push("/contract-list");
    }
  }, [contractId, amount, title, counterparty, router]);

  const printReceipt = () => {
    if (!contractId || !amount || !title || !counterparty) {
      toast.error("Missing payment details");
      return false;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error("Failed to open print window. Please check your popup blocker.");
      return false;
    }

    const receiptContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Payment Receipt - ${contractId}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              max-width: 800px;
              margin: 0 auto;
            }
            .header {
              background-color: #22c55e;
              color: white;
              padding: 20px;
              text-align: center;
              margin-bottom: 30px;
            }
            .content {
              margin-bottom: 30px;
            }
            .row {
              display: flex;
              padding: 10px 0;
              border-bottom: 1px solid #eee;
            }
            .label {
              font-weight: bold;
              width: 200px;
            }
            .value {
              flex: 1;
            }
            .footer {
              margin-top: 50px;
              text-align: center;
              color: #666;
              font-size: 12px;
            }
            @media print {
              .no-print {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>FarmConnect</h1>
            <h2>Payment Receipt</h2>
          </div>
          <div class="content">
            <div class="row">
              <div class="label">Receipt Date:</div>
              <div class="value">${new Date().toLocaleDateString()}</div>
            </div>
            <div class="row">
              <div class="label">Contract ID:</div>
              <div class="value">${contractId}</div>
            </div>
            <div class="row">
              <div class="label">Contract Title:</div>
              <div class="value">${decodeURIComponent(title)}</div>
            </div>
            <div class="row">
              <div class="label">Counterparty:</div>
              <div class="value">${decodeURIComponent(counterparty)}</div>
            </div>
            <div class="row">
              <div class="label">Amount Paid:</div>
              <div class="value">₹${Number(amount).toLocaleString()}</div>
            </div>
            <div class="row">
              <div class="label">Payment Status:</div>
              <div class="value">Completed</div>
            </div>
            <div class="row">
              <div class="label">Transaction ID:</div>
              <div class="value">TXN${Date.now()}</div>
            </div>
          </div>
          <div class="footer">
            This is a computer generated receipt and does not require signature.
          </div>
          <div class="no-print">
            <button onclick="window.print(); window.close();" style="
              background-color: #22c55e;
              color: white;
              padding: 10px 20px;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              margin: 20px auto;
              display: block;
            ">
              Print Receipt
            </button>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(receiptContent);
    printWindow.document.close();
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update contract payment status in localStorage
      const contracts = JSON.parse(localStorage.getItem("contracts") || "[]");
      const updatedContracts = contracts.map((contract: any) => {
        if (contract.id === contractId) {
          return {
            ...contract,
            paymentStatus: "paid",
            lastPaymentDate: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
        }
        return contract;
      });
      localStorage.setItem("contracts", JSON.stringify(updatedContracts));

      // Generate and print receipt
      const receiptGenerated = printReceipt();

      if (receiptGenerated) {
        toast.success("Payment processed successfully. Please print your receipt.");
      } else {
        toast.error("Payment processed but failed to generate receipt");
      }
      
      router.push("/contract-list?success=payment");
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment processing failed: " + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!contractId || !amount || !title || !counterparty) {
    return null;
  }

  return (
    <div className="container max-w-lg px-4 py-8">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>Make payment for contract {contractId}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Contract Title</Label>
              <Input value={decodeURIComponent(title)} disabled />
            </div>
            <div className="space-y-2">
              <Label>Counterparty</Label>
              <Input value={decodeURIComponent(counterparty)} disabled />
            </div>
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input value={`₹${Number(amount).toLocaleString()}`} disabled />
            </div>
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Select defaultValue="card">
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="netbanking">Net Banking</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Card Number</Label>
              <Input placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Expiry Date</Label>
                <Input placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <Label>CVV</Label>
                <Input placeholder="123" type="password" maxLength={3} />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay ₹{Number(amount).toLocaleString()}
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
