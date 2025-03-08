import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, isBefore, startOfToday } from "date-fns";
import { TimeSlot } from "@/types";

interface DateTimeSelectionProps {
  salonId: string;
  staffId: string;
  treatmentId: string;
  treatmentDuration: number;
  onSelect: (date: string, time: string) => void;
  onBack: () => void;
}

// Generate mock time slots
const generateTimeSlots = (date: Date, duration: number): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const today = startOfToday();
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  // Start at 9:00 AM
  let hour = 9;
  let minute = 0;

  // If it's today, start from the next available hour
  if (isToday) {
    const now = new Date();
    hour = now.getHours() + 1;
    minute = 0;
  }

  // Generate slots until 6:00 PM
  while (hour < 18) {
    const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

    // Randomly determine if the slot is available (for demo purposes)
    const available = Math.random() > 0.3;

    slots.push({ time, available });

    // Increment by 15 minutes
    minute += 15;
    if (minute >= 60) {
      hour += 1;
      minute = 0;
    }
  }

  return slots;
};

export default function DateTimeSelection({
  salonId,
  staffId,
  treatmentId,
  treatmentDuration,
  onSelect,
  onBack,
}: DateTimeSelectionProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    if (date) {
      // In a real app, this would fetch available time slots from an API
      const slots = generateTimeSlots(date, treatmentDuration);
      setTimeSlots(slots);
      setSelectedTime(null);
    }
  }, [date, treatmentDuration]);

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    if (date && selectedTime) {
      onSelect(format(date, "yyyy-MM-dd"), selectedTime);
    }
  };

  const today = new Date();
  const oneMonthFromNow = addDays(today, 30);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2">Select Date & Time</h2>
        <p className="text-muted-foreground">
          Choose when you'd like to book your appointment
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-medium mb-4">Select a Date</h3>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            disabled={(date) =>
              isBefore(date, today) || isBefore(oneMonthFromNow, date)
            }
            className="rounded-md border"
          />
        </div>

        <div>
          <h3 className="font-medium mb-4">Select a Time</h3>
          {date ? (
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot, index) => (
                <Button
                  key={index}
                  variant={selectedTime === slot.time ? "default" : "outline"}
                  className={`${!slot.available ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={!slot.available}
                  onClick={() => slot.available && handleTimeSelect(slot.time)}
                >
                  {slot.time}
                </Button>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Please select a date first</p>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="ghost" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Button onClick={handleContinue} disabled={!date || !selectedTime}>
          Continue
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
