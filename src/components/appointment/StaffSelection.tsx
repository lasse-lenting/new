import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Staff } from "@/types";

interface StaffSelectionProps {
  salonId: string;
  onSelect: (staff: Staff) => void;
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

export default function StaffSelection({
  salonId,
  onSelect,
}: StaffSelectionProps) {
  const [staff, setStaff] = useState<Staff[]>([]);

  useEffect(() => {
    // In a real app, this would fetch staff data from an API
    const filteredStaff = mockStaff.filter((s) => s.salonId === salonId);
    setStaff(filteredStaff);
  }, [salonId]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2">Choose Your Stylist</h2>
        <p className="text-muted-foreground">
          Select a stylist for your appointment
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {staff.map((member) => (
          <Card
            key={member.id}
            className="overflow-hidden cursor-pointer transition-all hover:border-primary"
            onClick={() => onSelect(member)}
          >
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
            </CardHeader>
            <CardContent>
              {member.specialties && member.specialties.length > 0 && (
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
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
