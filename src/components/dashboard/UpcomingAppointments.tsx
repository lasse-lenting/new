import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { format, parseISO, isToday, isTomorrow, addDays } from "date-fns";

interface Appointment {
  id: string;
  customer_name: string;
  customer_email: string;
  date: string;
  time: string;
  duration: number;
  service_name: string;
  staff_name: string;
  status: "scheduled" | "confirmed" | "completed" | "cancelled" | "no-show";
}

const getStatusColor = (status: Appointment["status"]) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800";
    case "scheduled":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-gray-100 text-gray-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    case "no-show":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const formatDate = (dateStr: string) => {
  const date = parseISO(dateStr);
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  return format(date, "EEE, MMM d");
};

export default function UpcomingAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) return;

      try {
        setIsLoading(true);

        // Get salon ID for the current user
        const { data: staffData, error: staffError } = await supabase
          .from("salon_staff")
          .select("salon_id")
          .eq("user_id", user.id)
          .single();

        if (staffError) throw staffError;
        const salonId = staffData.salon_id;

        // Get today's date and 7 days from now
        const today = new Date();
        const nextWeek = addDays(today, 7);

        // Fetch upcoming appointments
        const { data, error } = await supabase
          .from("appointments")
          .select(
            `
            id,
            date,
            time,
            duration,
            status,
            customers(name, email),
            salon_staff(name),
            treatments(name)
          `,
          )
          .eq("salon_id", salonId)
          .gte("date", format(today, "yyyy-MM-dd"))
          .lte("date", format(nextWeek, "yyyy-MM-dd"))
          .order("date", { ascending: true })
          .order("time", { ascending: true })
          .limit(5);

        if (error) throw error;

        // Transform the data
        const formattedAppointments = data.map((appt) => ({
          id: appt.id,
          customer_name: appt.customers?.name || "Unknown Customer",
          customer_email: appt.customers?.email || "",
          date: appt.date,
          time: appt.time,
          duration: appt.duration,
          service_name: appt.treatments?.name || "Unknown Service",
          staff_name: appt.salon_staff?.name || "Unknown Staff",
          status: appt.status,
        }));

        setAppointments(formattedAppointments);
      } catch (error) {
        console.error("Error fetching upcoming appointments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No upcoming appointments for the next 7 days.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors gap-4"
        >
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${appointment.customer_email}`}
              />
              <AvatarFallback>
                {appointment.customer_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium">{appointment.customer_name}</h4>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                <span className="mr-2">{formatDate(appointment.date)}</span>
                <Clock className="mr-1 h-3 w-3" />
                <span>{appointment.time}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 ml-12 md:ml-0">
            <div className="text-right">
              <div className="text-sm font-medium">
                {appointment.service_name}
              </div>
              <div className="text-xs text-muted-foreground flex items-center justify-end">
                <User className="mr-1 h-3 w-3" />
                <span>{appointment.staff_name}</span>
              </div>
            </div>
            <Badge
              variant="outline"
              className={`${getStatusColor(appointment.status)} border-0`}
            >
              {appointment.status}
            </Badge>
            <Button variant="ghost" size="sm">
              Details
            </Button>
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-4">
        <Button variant="outline" asChild>
          <a href="/dashboard/appointments">View All Appointments</a>
        </Button>
      </div>
    </div>
  );
}
