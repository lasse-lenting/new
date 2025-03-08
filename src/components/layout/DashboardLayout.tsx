import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [salonData, setSalonData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading } = useAuth();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // Check if user is a salon owner
        const { data: salonOwnerData, error: salonError } = await supabase
          .from("salon_staff")
          .select("*, salon:salons(*)")
          .eq("user_id", user.id)
          .eq("role", "owner")
          .single();

        if (salonOwnerData) {
          setSalonData(salonOwnerData.salon);
          setUserData({
            name: salonOwnerData.name,
            avatar: salonOwnerData.avatar,
            role: salonOwnerData.role,
          });
        } else {
          // Check if user is a staff member
          const { data: staffData, error: staffError } = await supabase
            .from("salon_staff")
            .select("*, salon:salons(*)")
            .eq("user_id", user.id)
            .single();

          if (staffData) {
            setSalonData(staffData.salon);
            setUserData({
              name: staffData.name,
              avatar: staffData.avatar,
              role: staffData.role,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching salon data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading) {
      fetchData();
    }
  }, [user, loading]);

  // Redirect to login if not authenticated
  if (!loading && !user) {
    return <Navigate to="/login" replace />;
  }

  // Show loading state
  if (loading || isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect to salon registration if authenticated but not a salon owner/staff
  if (!salonData && !isLoading) {
    return <Navigate to="/salon/register" replace />;
  }

  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar
        salonName={salonData?.name || "Your Salon"}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebar}
        userRole={userData?.role}
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader
          salonName={salonData?.name || "Your Salon"}
          userName={userData?.name || user?.email}
          userAvatar={
            userData?.avatar ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`
          }
          notificationCount={0}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 max-w-[1200px] mx-auto w-full">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
