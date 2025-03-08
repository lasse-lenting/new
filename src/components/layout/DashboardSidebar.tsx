import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Calendar,
  Users,
  Scissors,
  Settings,
  BarChart3,
  LogOut,
  Home,
  Menu,
  X,
  Clock,
} from "lucide-react";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  isCollapsed?: boolean;
}

const SidebarLink = ({
  to,
  icon,
  label,
  isActive = false,
  isCollapsed = false,
}: SidebarLinkProps) => {
  if (isCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to={to}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                size="icon"
                className={cn(
                  "w-12 h-12 my-1",
                  isActive && "bg-secondary text-secondary-foreground",
                )}
              >
                {icon}
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">{label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Link to={to}>
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start my-1 px-4",
          isActive && "bg-secondary text-secondary-foreground",
        )}
      >
        <span className="mr-3">{icon}</span>
        {label}
      </Button>
    </Link>
  );
};

interface DashboardSidebarProps {
  salonName?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  userRole?: string;
}

const DashboardSidebar = ({
  salonName = "Salon Dashboard",
  isCollapsed = false,
  onToggleCollapse = () => {},
  userRole = "owner",
}: DashboardSidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { signOut } = useAuth();

  // Define links based on user role
  const getLinks = () => {
    const links = [
      {
        to: "/dashboard",
        icon: <Home size={20} />,
        label: "Dashboard",
        path: "/dashboard",
        roles: ["owner", "manager", "stylist", "assistant"],
      },
      {
        to: "/dashboard/appointments",
        icon: <Calendar size={20} />,
        label: "Appointments",
        path: "/dashboard/appointments",
        roles: ["owner", "manager", "stylist", "assistant"],
      },
      {
        to: "/dashboard/schedule",
        icon: <Clock size={20} />,
        label: "Schedule",
        path: "/dashboard/schedule",
        roles: ["owner", "manager", "stylist"],
      },
      {
        to: "/dashboard/staff",
        icon: <Users size={20} />,
        label: "Staff",
        path: "/dashboard/staff",
        roles: ["owner", "manager"],
      },
      {
        to: "/dashboard/treatments",
        icon: <Scissors size={20} />,
        label: "Services",
        path: "/dashboard/treatments",
        roles: ["owner", "manager"],
      },
      {
        to: "/dashboard/analytics",
        icon: <BarChart3 size={20} />,
        label: "Analytics",
        path: "/dashboard/analytics",
        roles: ["owner", "manager"],
      },
      {
        to: "/dashboard/settings",
        icon: <Settings size={20} />,
        label: "Settings",
        path: "/dashboard/settings",
        roles: ["owner"],
      },
    ];

    return links.filter((link) => link.roles.includes(userRole));
  };

  const sidebarLinks = getLinks();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div
      className={cn(
        "h-full bg-background border-r flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold truncate">{salonName}</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="ml-auto"
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>

      <Separator />

      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="px-2 space-y-1">
          {sidebarLinks.map((link) => (
            <SidebarLink
              key={link.path}
              to={link.to}
              icon={link.icon}
              label={link.label}
              isActive={
                currentPath === link.path ||
                (link.path !== "/dashboard" &&
                  currentPath.startsWith(link.path))
              }
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>
      </div>

      <div className="p-4">
        <Separator className="my-2" />
        {isCollapsed ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-12 h-12 text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;
