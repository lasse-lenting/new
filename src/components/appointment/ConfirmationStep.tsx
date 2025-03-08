import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Calendar, Clock, User, Scissors, CheckCircle } from "lucide-react";
import { format } from "date-fns";

interface ConfirmationStepProps {
  appointmentData: {
    date: string;
    time: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    notes?: string;
    depositPaid: boolean;
  };
  staffName: string;
  treatmentName: string;
  onComplete: () => void;
}

export default function ConfirmationStep({
  appointmentData,
  staffName,
  treatmentName,
  onComplete,
}: ConfirmationStepProps) {
  const formattedDate = appointmentData.date
    ? format(new Date(appointmentData.date), "EEEE, MMMM d, yyyy")
    : "";

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Booking Confirmed!</h2>
        <p className="text-muted-foreground">
          Your appointment has been successfully booked
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
          <CardDescription>Here's a summary of your booking</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Date:</span>
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Time:</span>
              <span>{appointmentData.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Stylist:</span>
              <span>{staffName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Scissors className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Service:</span>
              <span>{treatmentName}</span>
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <h4 className="font-medium mb-2">Your Information</h4>
            <div className="space-y-1">
              <p>{appointmentData.customerName}</p>
              <p>{appointmentData.customerEmail}</p>
              <p>{appointmentData.customerPhone}</p>
              {appointmentData.notes && (
                <div className="mt-2">
                  <p className="font-medium">Special Requests:</p>
                  <p className="text-sm text-muted-foreground">
                    {appointmentData.notes}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-muted p-4 rounded-md mt-4">
            <p className="text-sm">
              {appointmentData.depositPaid ? (
                <span className="font-medium">
                  €5.00 deposit has been paid. The remaining balance will be due
                  at the salon.
                </span>
              ) : (
                <span>Full payment will be collected at the salon.</span>
              )}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={onComplete}>
            Done
          </Button>
        </CardFooter>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <p>
          A confirmation email has been sent to {appointmentData.customerEmail}
        </p>
        <p className="mt-1">
          You can cancel or reschedule your appointment up to 24 hours in
          advance.
        </p>
      </div>
    </div>
  );
}
