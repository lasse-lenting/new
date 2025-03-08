import React from "react";
import { Bell, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  salonName?: string;
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
}

const DashboardHeader = ({
  salonName = "Salon Beautiful",
  userName = "Jane Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  notificationCount = 3,
}: DashboardHeaderProps) => {
  return (
    <header className="sticky top-0 z-10 flex h-20 w-full items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-gray-800">{salonName}</h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0"
              >
                {notificationCount}
              </Badge>
            )}
          </Button>
        </div>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 rounded-full p-1 hover:bg-gray-100"
            >
              <Avatar>
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium md:inline-block">
                {userName}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
