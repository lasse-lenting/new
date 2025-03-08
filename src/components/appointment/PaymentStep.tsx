import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChevronLeft, CreditCard, Info } from "lucide-react";

interface PaymentStepProps {
  amount: number;
  treatmentName: string;
  treatmentPrice: number;
  onComplete: (depositPaid: boolean) => void;
  onBack: () => void;
}

export default function PaymentStep({
  amount,
  treatmentName,
  treatmentPrice,
  onComplete,
  onBack,
}: PaymentStepProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayDeposit = () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onComplete(true);
    }, 1500);
  };

  const handleSkipPayment = () => {
    onComplete(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2">Secure Your Appointment</h2>
        <p className="text-muted-foreground">
          Pay a small deposit to confirm your booking
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
          <CardDescription>Review your appointment details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Service:</span>
            <span>{treatmentName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total Price:</span>
            <span>€{treatmentPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Deposit Amount:</span>
            <span>€{amount.toFixed(2)}</span>
          </div>
          <div className="bg-muted p-4 rounded-md flex items-start gap-3 mt-4">
            <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p>
                The deposit will be deducted from the total price of your
                service. It helps us reduce no-shows and ensures your spot is
                reserved.
              </p>
              <p className="mt-2">
                The remaining balance will be paid at the salon after your
                appointment.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col space-y-4">
          <Button
            className="w-full"
            onClick={handlePayDeposit}
            disabled={isProcessing}
          >
            {isProcessing ? (
              "Processing..."
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Pay €{amount.toFixed(2)} Deposit
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            className="w-full"
            onClick={handleSkipPayment}
          >
            Skip Deposit (Not Recommended)
          </Button>
        </CardFooter>
      </Card>

      <div className="flex justify-start mt-6">
        <Button variant="ghost" onClick={onBack} disabled={isProcessing}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
    </div>
  );
}
