import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar, Users, DollarSign, Clock } from "lucide-react";
import { AppointmentStatus } from "@/types";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: number;
  className?: string;
}

const StatCard = ({
  title = "",
  value = 0,
  icon,
  description = "",
  trend,
  className,
}: StatCardProps) => {
  return (
    <Card className={cn("h-full bg-white", className)}>
      <CardContent className="flex items-center p-6">
        <div className="mr-4 rounded-full bg-primary/10 p-3">{icon}</div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="flex items-baseline">
            <p className="text-2xl font-bold">{value}</p>
            {trend !== undefined && (
              <span
                className={cn(
                  "ml-2 text-xs font-medium",
                  trend > 0 ? "text-green-600" : "text-red-600",
                )}
              >
                {trend > 0 ? "+" : ""}
                {trend}%
              </span>
            )}
          </div>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface DashboardStatsProps {
  todayAppointments?: number;
  todayRevenue?: number;
  upcomingAppointments?: number;
  staffAvailable?: number;
  appointmentsByStatus?: Record<AppointmentStatus, number>;
  className?: string;
}

const DashboardStats = ({
  todayAppointments = 8,
  todayRevenue = 560,
  upcomingAppointments = 24,
  staffAvailable = 5,
  appointmentsByStatus = {
    scheduled: 15,
    confirmed: 9,
    completed: 42,
    cancelled: 3,
    "no-show": 1,
  },
  className,
}: DashboardStatsProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      <StatCard
        title="Today's Appointments"
        value={todayAppointments}
        icon={<Calendar className="h-5 w-5 text-primary" />}
        description="Scheduled for today"
        trend={5}
      />

      <StatCard
        title="Today's Revenue"
        value={`€${todayRevenue}`}
        icon={<DollarSign className="h-5 w-5 text-primary" />}
        description="Expected earnings"
        trend={12}
      />

      <StatCard
        title="Upcoming Appointments"
        value={upcomingAppointments}
        icon={<Clock className="h-5 w-5 text-primary" />}
        description="Next 7 days"
        trend={-3}
      />

      <StatCard
        title="Staff Available"
        value={staffAvailable}
        icon={<Users className="h-5 w-5 text-primary" />}
        description="Active stylists"
      />
    </div>
  );
};

export default DashboardStats;
