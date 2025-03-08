import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  parseISO,
  isWithinInterval,
  set,
} from "date-fns";
import { ChevronLeft, ChevronRight, Clock, User, Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";

interface Appointment {
  id: string;
  customer_name: string;
  date: string;
  time: string;
  duration: number;
  service_name: string;
  staff_name: string;
  status: "scheduled" | "confirmed" | "completed" | "cancelled" | "no-show";
}

interface OpeningHours {
  day_of_week: number;
  is_open: boolean;
  open_time?: string;
  close_time?: string;
}

const getStatusColor = (status: Appointment["status"]) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 border-green-300";
    case "scheduled":
      return "bg-blue-100 border-blue-300";
    case "completed":
      return "bg-gray-100 border-gray-300";
    case "cancelled":
      return "bg-red-100 border-red-300";
    case "no-show":
      return "bg-yellow-100 border-yellow-300";
    default:
      return "bg-gray-100 border-gray-300";
  }
};

export default function AppointmentCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<"day" | "week">("day");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [openingHours, setOpeningHours] = useState<OpeningHours[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Fetch salon data and appointments
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        setIsLoading(true);

        // First, get the salon ID for the current user
        const { data: staffData, error: staffError } = await supabase
          .from("salon_staff")
          .select("salon_id")
          .eq("user_id", user.id)
          .single();

        if (staffError) throw staffError;
        const salonId = staffData.salon_id;

        // Fetch opening hours
        const { data: hoursData, error: hoursError } = await supabase
          .from("salon_opening_hours")
          .select("*")
          .eq("salon_id", salonId);

        if (hoursError) throw hoursError;
        setOpeningHours(hoursData);

        // Fetch appointments
        const { data: appointmentsData, error: appointmentsError } =
          await supabase
            .from("appointments")
            .select(
              `
            id,
            date,
            time,
            duration,
            status,
            customers(name),
            salon_staff(name),
            treatments(name)
          `,
            )
            .eq("salon_id", salonId)
            .gte("date", format(startOfWeek(selectedDate), "yyyy-MM-dd"))
            .lte("date", format(endOfWeek(selectedDate), "yyyy-MM-dd"));

        if (appointmentsError) throw appointmentsError;

        // Transform the data to match our interface
        const formattedAppointments = appointmentsData.map((appt) => ({
          id: appt.id,
          customer_name: appt.customers?.name || "Unknown Customer",
          date: appt.date,
          time: appt.time,
          duration: appt.duration,
          service_name: appt.treatments?.name || "Unknown Service",
          staff_name: appt.salon_staff?.name || "Unknown Staff",
          status: appt.status,
        }));

        setAppointments(formattedAppointments);
      } catch (error) {
        console.error("Error fetching appointment data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, selectedDate]);

  // Generate time slots based on opening hours
  const generateTimeSlots = () => {
    const dayOfWeek = selectedDate.getDay();
    const dayHours = openingHours.find((h) => h.day_of_week === dayOfWeek);

    if (
      !dayHours ||
      !dayHours.is_open ||
      !dayHours.open_time ||
      !dayHours.close_time
    ) {
      return [];
    }

    const [openHour, openMinute] = dayHours.open_time.split(":").map(Number);
    const [closeHour, closeMinute] = dayHours.close_time.split(":").map(Number);

    const slots = [];
    let currentHour = openHour;
    let currentMinute = openMinute;

    while (
      currentHour < closeHour ||
      (currentHour === closeHour && currentMinute < closeMinute)
    ) {
      slots.push(
        `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`,
      );

      currentMinute += 15;
      if (currentMinute >= 60) {
        currentHour += 1;
        currentMinute = 0;
      }
    }

    return slots;
  };

  const timeSlots = openingHours.length > 0 ? generateTimeSlots() : [];

  // Filter appointments for the selected date
  const filteredAppointments = appointments.filter((appointment) => {
    if (view === "day") {
      return appointment.date === format(selectedDate, "yyyy-MM-dd");
    } else {
      const start = startOfWeek(selectedDate);
      const end = endOfWeek(selectedDate);
      const appointmentDate = parseISO(appointment.date);
      return isWithinInterval(appointmentDate, { start, end });
    }
  });

  // For week view, get all days in the current week
  const weekDays = eachDayOfInterval({
    start: startOfWeek(selectedDate),
    end: endOfWeek(selectedDate),
  });

  const handlePrevious = () => {
    if (view === "day") {
      setSelectedDate((prev) => addDays(prev, -1));
    } else {
      setSelectedDate((prev) => addDays(prev, -7));
    }
  };

  const handleNext = () => {
    if (view === "day") {
      setSelectedDate((prev) => addDays(prev, 1));
    } else {
      setSelectedDate((prev) => addDays(prev, 7));
    }
  };

  // Check if the salon is open on the selected date
  const isSalonOpen = () => {
    const dayOfWeek = selectedDate.getDay();
    const dayHours = openingHours.find((h) => h.day_of_week === dayOfWeek);
    return dayHours?.is_open || false;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center space-x-2">
          <Button
            variant={view === "day" ? "default" : "outline"}
            onClick={() => setView("day")}
          >
            Day
          </Button>
          <Button
            variant={view === "week" ? "default" : "outline"}
            onClick={() => setView("week")}
          >
            Week
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold">
            {view === "day"
              ? format(selectedDate, "MMMM d, yyyy")
              : `${format(weekDays[0], "MMM d")} - ${format(
                  weekDays[6],
                  "MMM d, yyyy",
                )}`}
          </h2>
          <Button variant="outline" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-64">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md border"
          />

          {openingHours.length > 0 && (
            <Card className="mt-4">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Opening Hours</h3>
                <div className="space-y-1 text-sm">
                  {[
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ].map((day, index) => {
                    const dayHours = openingHours.find(
                      (h) => h.day_of_week === index,
                    );
                    return (
                      <div key={day} className="flex justify-between">
                        <span
                          className={
                            selectedDate.getDay() === index ? "font-medium" : ""
                          }
                        >
                          {day}
                        </span>
                        <span>
                          {dayHours?.is_open
                            ? `${dayHours.open_time} - ${dayHours.close_time}`
                            : "Closed"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex-1">
          {isLoading ? (
            <Card>
              <CardContent className="p-6 flex justify-center items-center min-h-[400px]">
                <div className="text-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
                  <p className="mt-4 text-muted-foreground">
                    Loading appointments...
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : view === "day" ? (
            <Card>
              <CardContent className="p-0">
                {!isSalonOpen() ? (
                  <div className="p-6 text-center text-muted-foreground">
                    <p>The salon is closed on this day.</p>
                  </div>
                ) : timeSlots.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">
                    <p>No time slots available for this day.</p>
                  </div>
                ) : (
                  <div className="relative min-h-[600px]">
                    {/* Time slots */}
                    <div className="absolute top-0 left-0 w-16 h-full border-r">
                      {timeSlots.map((time, index) => (
                        <div
                          key={time}
                          className={`h-12 flex items-center justify-center text-xs text-muted-foreground ${index % 4 === 0 ? "border-t" : ""}`}
                        >
                          {index % 4 === 0 ? time : ""}
                        </div>
                      ))}
                    </div>

                    {/* Appointments */}
                    <div className="ml-16 relative">
                      {timeSlots.map((time, index) => (
                        <div
                          key={time}
                          className={`h-12 ${index % 4 === 0 ? "border-t" : ""}`}
                        ></div>
                      ))}

                      {filteredAppointments.map((appointment) => {
                        const startTime = appointment.time;
                        const [hours, minutes] = startTime
                          .split(":")
                          .map(Number);

                        // Calculate position based on opening hours
                        const dayHours = openingHours.find(
                          (h) => h.day_of_week === selectedDate.getDay(),
                        );
                        if (!dayHours || !dayHours.open_time) return null;

                        const [openHour, openMinute] = dayHours.open_time
                          .split(":")
                          .map(Number);
                        const startMinutes =
                          hours * 60 + minutes - (openHour * 60 + openMinute);
                        const durationInMinutes = appointment.duration;
                        const top = (startMinutes / 15) * 48; // 48px per 15 minutes
                        const height = (durationInMinutes / 15) * 48;

                        return (
                          <div
                            key={appointment.id}
                            className={`absolute left-0 right-0 mx-1 p-2 rounded-md border ${getStatusColor(
                              appointment.status,
                            )}`}
                            style={{
                              top: `${top}px`,
                              height: `${height}px`,
                            }}
                          >
                            <div className="text-sm font-medium truncate">
                              {appointment.customer_name}
                            </div>
                            <div className="text-xs flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {appointment.time} - {appointment.service_name}
                            </div>
                            <div className="text-xs flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              {appointment.staff_name}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="grid grid-cols-7 border-b">
                  {weekDays.map((day) => (
                    <div
                      key={day.toString()}
                      className="p-2 text-center border-r last:border-r-0"
                    >
                      <div className="font-medium">{format(day, "EEE")}</div>
                      <div className="text-sm">{format(day, "d")}</div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 min-h-[600px]">
                  {weekDays.map((day) => {
                    const dayOfWeek = day.getDay();
                    const dayHours = openingHours.find(
                      (h) => h.day_of_week === dayOfWeek,
                    );
                    const isClosed = !dayHours?.is_open;

                    const dayAppointments = appointments.filter(
                      (appointment) =>
                        appointment.date === format(day, "yyyy-MM-dd"),
                    );

                    return (
                      <div
                        key={day.toString()}
                        className="border-r last:border-r-0 p-2 relative"
                      >
                        {isClosed ? (
                          <div className="text-xs text-center text-muted-foreground mt-2">
                            Closed
                          </div>
                        ) : dayAppointments.length === 0 ? (
                          <div className="text-xs text-center text-muted-foreground mt-2">
                            No appointments
                          </div>
                        ) : (
                          dayAppointments.map((appointment, index) => (
                            <div
                              key={appointment.id}
                              className={`mb-2 p-2 rounded-md border text-xs ${getStatusColor(
                                appointment.status,
                              )}`}
                              style={{
                                top: `${index * 80 + 10}px`,
                              }}
                            >
                              <div className="font-medium truncate">
                                {appointment.customer_name}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {appointment.time}
                              </div>
                              <div className="truncate">
                                {appointment.service_name}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
