import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Staff } from "@/types";

interface StaffListProps {
  salonId: string;
}

// Mock data for staff
const mockStaff: Staff[] = [
  {
    id: "1",
    salonId: "1",
    name: "Emma Johnson",
    email: "emma@elegantcuts.com",
    phone: "+31 20 123 4567",
    role: "owner",
    specialties: ["Coloring", "Styling", "Cutting"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    isActive: true,
  },
  {
    id: "2",
    salonId: "1",
    name: "David Smith",
    email: "david@elegantcuts.com",
    phone: "+31 20 123 4568",
    role: "stylist",
    specialties: ["Men's Cuts", "Beard Trimming"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    isActive: true,
  },
  {
    id: "3",
    salonId: "1",
    name: "Sophia Chen",
    email: "sophia@elegantcuts.com",
    phone: "+31 20 123 4569",
    role: "stylist",
    specialties: ["Extensions", "Bridal Hair", "Coloring"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
    isActive: true,
  },
  {
    id: "4",
    salonId: "1",
    name: "Michael Rodriguez",
    email: "michael@elegantcuts.com",
    phone: "+31 20 123 4570",
    role: "stylist",
    specialties: ["Cutting", "Styling"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    isActive: true,
  },
];

export default function StaffList({ salonId }: StaffListProps) {
  const [staff, setStaff] = useState<Staff[]>([]);

  useEffect(() => {
    // In a real app, this would fetch staff data from an API
    const filteredStaff = mockStaff.filter((s) => s.salonId === salonId);
    setStaff(filteredStaff);
  }, [salonId]);

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "owner":
        return "Owner & Stylist";
      case "manager":
        return "Manager";
      case "stylist":
        return "Hair Stylist";
      case "assistant":
        return "Assistant";
      default:
        return role;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {staff.map((member) => (
          <Card key={member.id} className="overflow-hidden">
            <div className="aspect-square bg-muted flex items-center justify-center">
              <Avatar className="h-32 w-32">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardHeader className="pb-2">
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">
                {getRoleLabel(member.role)}
              </p>
            </CardHeader>
            <CardContent>
              {member.specialties && member.specialties.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium mb-1">Specialties:</p>
                  <div className="flex flex-wrap gap-1">
                    {member.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
