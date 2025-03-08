import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import StaffSelection from "./StaffSelection";
import TreatmentSelection from "./TreatmentSelection";
import DateTimeSelection from "./DateTimeSelection";
import CustomerDetails from "./CustomerDetails";
import PaymentStep from "./PaymentStep";
import ConfirmationStep from "./ConfirmationStep";
import { Staff, Treatment } from "@/types";

interface AppointmentWizardProps {
  salonId: string;
  onComplete: () => void;
}

export default function AppointmentWizard({
  salonId,
  onComplete,
}: AppointmentWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [appointmentData, setAppointmentData] = useState({
    salonId,
    staffId: "",
    treatmentId: "",
    date: "",
    time: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    notes: "",
    depositPaid: false,
  });

  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(
    null,
  );

  const updateAppointmentData = (data: Partial<typeof appointmentData>) => {
    setAppointmentData((prev) => ({ ...prev, ...data }));
  };

  const handleStaffSelect = (staff: Staff) => {
    setSelectedStaff(staff);
    updateAppointmentData({ staffId: staff.id });
    setCurrentStep(2);
  };

  const handleTreatmentSelect = (treatment: Treatment) => {
    setSelectedTreatment(treatment);
    updateAppointmentData({ treatmentId: treatment.id });
    setCurrentStep(3);
  };

  const handleDateTimeSelect = (date: string, time: string) => {
    updateAppointmentData({ date, time });
    setCurrentStep(4);
  };

  const handleCustomerDetailsSubmit = (data: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  }) => {
    updateAppointmentData({
      customerName: data.name,
      customerEmail: data.email,
      customerPhone: data.phone,
      notes: data.notes,
    });
    setCurrentStep(5);
  };

  const handlePaymentComplete = (depositPaid: boolean) => {
    updateAppointmentData({ depositPaid });
    setCurrentStep(6);
  };

  const handleBookingComplete = () => {
    // In a real app, this would submit the appointment data to an API
    console.log("Booking completed:", appointmentData);
    onComplete();
  };

  const steps = [
    { number: 1, label: "Stylist" },
    { number: 2, label: "Service" },
    { number: 3, label: "Date & Time" },
    { number: 4, label: "Your Details" },
    { number: 5, label: "Payment" },
    { number: 6, label: "Confirmation" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        {steps.map((step) => (
          <div
            key={step.number}
            className={`flex flex-col items-center ${currentStep === step.number ? "text-primary" : "text-muted-foreground"}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep === step.number ? "bg-primary text-primary-foreground" : currentStep > step.number ? "bg-primary/20" : "bg-muted"}`}
            >
              {step.number}
            </div>
            <span className="text-xs hidden md:block">{step.label}</span>
          </div>
        ))}
      </div>

      <Card className="p-6">
        {currentStep === 1 && (
          <StaffSelection salonId={salonId} onSelect={handleStaffSelect} />
        )}

        {currentStep === 2 && (
          <TreatmentSelection
            salonId={salonId}
            onSelect={handleTreatmentSelect}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <DateTimeSelection
            salonId={salonId}
            staffId={appointmentData.staffId}
            treatmentId={appointmentData.treatmentId}
            treatmentDuration={selectedTreatment?.duration || 60}
            onSelect={handleDateTimeSelect}
            onBack={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 4 && (
          <CustomerDetails
            onSubmit={handleCustomerDetailsSubmit}
            onBack={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 5 && (
          <PaymentStep
            amount={5} // €5 deposit
            treatmentName={selectedTreatment?.name || ""}
            treatmentPrice={selectedTreatment?.price || 0}
            onComplete={handlePaymentComplete}
            onBack={() => setCurrentStep(4)}
          />
        )}

        {currentStep === 6 && (
          <ConfirmationStep
            appointmentData={appointmentData}
            staffName={selectedStaff?.name || ""}
            treatmentName={selectedTreatment?.name || ""}
            onComplete={handleBookingComplete}
          />
        )}
      </Card>
    </div>
  );
}
