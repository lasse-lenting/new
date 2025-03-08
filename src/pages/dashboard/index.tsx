import DashboardStats from "@/components/dashboard/DashboardStats";
import UpcomingAppointments from "@/components/dashboard/UpcomingAppointments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>

      <DashboardStats />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <UpcomingAppointments />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Total Appointments
                  </span>
                  <span className="font-medium">124</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Revenue</span>
                  <span className="font-medium">€4,560</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Clients</span>
                  <span className="font-medium">86</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Staff Members</span>
                  <span className="font-medium">5</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
