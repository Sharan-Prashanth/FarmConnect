"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Assuming you are using a UI library like ShadCN
import jsPDF from "jspdf"; // To generate the payslip

const PaymentPage = () => {
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const router = useRouter();

  // Crop details and amount
  const cropDetails = {
    cropName: "Organic Wheat",
    quantity: "100 kg",
    pricePerKg: 50,
  };

  const totalAmount =
  parseFloat(cropDetails.quantity.split(" ")[0]) * cropDetails.pricePerKg;


  // Handle payment confirmation
  const handleConfirmPayment = () => {
    setPaymentConfirmed(true);
    generatePaySlip();
  };

  // Generate pay slip as PDF
  const generatePaySlip = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Payment Receipt", 20, 20);
    doc.setFontSize(14);
    doc.text(`Crop Name: ${cropDetails.cropName}`, 20, 40);
    doc.text(`Quantity: ${cropDetails.quantity}`, 20, 50);
    doc.text(`Price per kg: ₹${cropDetails.pricePerKg}`, 20, 60);
    doc.text(`Total Amount: ₹${totalAmount}`, 20, 70);
    doc.text(`Payment Status: Confirmed ✅`, 20, 90);
    
    // Save and download the PDF
    doc.save("Payment_Slip.pdf");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Payment Summary</h2>
        <p className="text-lg">Crop Name: <strong>{cropDetails.cropName}</strong></p>
        <p className="text-lg">Quantity: <strong>{cropDetails.quantity}</strong></p>
        <p className="text-lg">Price per kg: ₹<strong>{cropDetails.pricePerKg}</strong></p>
        <p className="text-lg mt-2">Total Amount: ₹<strong>{totalAmount}</strong></p>

        {!paymentConfirmed ? (
          <Button
            onClick={handleConfirmPayment}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white"
          >
            Confirm Payment
          </Button>
        ) : (
          <p className="text-green-600 mt-4 font-semibold">
            ✅ Payment Confirmed! Your pay slip is downloaded.
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
