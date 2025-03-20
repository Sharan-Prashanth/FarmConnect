"use client";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useState } from "react";

interface PayPalButtonProps {
  amount: number;
  onSuccess: () => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, onSuccess }) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const [error, setError] = useState<string | null>(null);

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount.toString(),
          },
        },
      ],
    });
  };

  const onApprove = async (data: any, actions: any) => {
    const order = await actions.order.capture();
    console.log("Order completed:", order);
    onSuccess(); // Trigger success on button click
  };

  const onError = (err: any) => {
    console.error("PayPal error:", err);
    setError("An error occurred while processing the payment.");
  };

  return (
    <div className="mt-4">
      {isPending && <div>Loading PayPal Button...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </div>
  );
};

export default PayPalButton;
