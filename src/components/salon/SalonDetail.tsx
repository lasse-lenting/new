import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  User,
  Scissors,
} from "lucide-react";
import { Salon } from "@/types";
import AppointmentWizard from "../appointment/AppointmentWizard";
import StaffList from "../staff/StaffList";
import TreatmentList from "../treatment/TreatmentList";

// Mock data for a salon
const mockSalon: Salon = {
  id: "1",
  name: "Elegant Cuts",
  description:
    "A premium salon offering the latest trends in haircuts and styling. Our team of experienced stylists is dedicated to providing exceptional service and ensuring you leave looking and feeling your best.",
  logo: "https://images.unsplash.com/photo-1470259078422-826894b933aa?w=800&q=80",
  address: "123 Main St, Amsterdam",
  phone: "+31 20 123 4567",
  email: "info@elegantcuts.com",
  openingHours: {
    monday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
    tuesday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
    wednesday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
    thursday: { isOpen: true, openTime: "09:00", closeTime: "20:00" },
    friday: { isOpen: true, openTime: "09:00", closeTime: "20:00" },
    saturday: { isOpen: true, openTime: "10:00", closeTime: "17:00" },
    sunday: { isOpen: false },
  },
  isActive: true,
};

export default function SalonDetail() {
  const { id } = useParams<{ id: string }>();
  const [salon, setSalon] = useState<Salon | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch the salon data from an API
    setSalon(mockSalon);
  }, [id]);

  if (!salon) {
    return <div className="py-12 text-center">Loading...</div>;
  }

  const weekdays = [
    { day: "Monday", hours: salon.openingHours.monday },
    { day: "Tuesday", hours: salon.openingHours.tuesday },
    { day: "Wednesday", hours: salon.openingHours.wednesday },
    { day: "Thursday", hours: salon.openingHours.thursday },
    { day: "Friday", hours: salon.openingHours.friday },
    { day: "Saturday", hours: salon.openingHours.saturday },
    { day: "Sunday", hours: salon.openingHours.sunday },
  ];

  return (
    <div className="space-y-8">
      <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=1200&q=80"
          alt={salon.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-6 text-white">
            <h1 className="text-3xl font-bold">{salon.name}</h1>
            <div className="flex items-center mt-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{salon.address}</span>
            </div>
          </div>
        </div>
      </div>

      {showBooking ? (
        <div className="bg-card border rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Book an Appointment</h2>
            <Button variant="ghost" onClick={() => setShowBooking(false)}>
              Cancel
            </Button>
          </div>
          <AppointmentWizard
            salonId={salon.id}
            onComplete={() => setShowBooking(false)}
          />
        </div>
      ) : (
        <div className="flex justify-end">
          <Button size="lg" onClick={() => setShowBooking(true)}>
            <Calendar className="mr-2 h-5 w-5" />
            Book Appointment
          </Button>
        </div>
      )}

      <Tabs defaultValue="about">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>About {salon.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{salon.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{salon.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{salon.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{salon.address}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Opening Hours</h3>
                  <div className="space-y-2">
                    {weekdays.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="font-medium">{item.day}</span>
                        <span>
                          {item.hours.isOpen
                            ? `${item.hours.openTime} - ${item.hours.closeTime}`
                            : "Closed"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="pt-6">
          <StaffList salonId={salon.id} />
        </TabsContent>

        <TabsContent value="services" className="pt-6">
          <TreatmentList salonId={salon.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
