import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import SalonCard from "./SalonCard";
import { Salon } from "@/types";

// Mock data for salons
const mockSalons: Salon[] = [
  {
    id: "1",
    name: "Elegant Cuts",
    description:
      "A premium salon offering the latest trends in haircuts and styling.",
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
  },
  {
    id: "2",
    name: "Modern Style",
    description:
      "Contemporary salon with a focus on modern styling techniques and personalized service.",
    logo: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    address: "456 High St, Rotterdam",
    phone: "+31 10 987 6543",
    email: "info@modernstyle.com",
    openingHours: {
      monday: { isOpen: false },
      tuesday: { isOpen: true, openTime: "10:00", closeTime: "19:00" },
      wednesday: { isOpen: true, openTime: "10:00", closeTime: "19:00" },
      thursday: { isOpen: true, openTime: "10:00", closeTime: "19:00" },
      friday: { isOpen: true, openTime: "10:00", closeTime: "21:00" },
      saturday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
      sunday: { isOpen: false },
    },
    isActive: true,
  },
  {
    id: "3",
    name: "Classic Barbers",
    description:
      "Traditional barbershop offering classic cuts and hot towel shaves in a relaxed atmosphere.",
    logo: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
    address: "789 Barber Lane, Utrecht",
    phone: "+31 30 345 6789",
    email: "info@classicbarbers.com",
    openingHours: {
      monday: { isOpen: true, openTime: "08:00", closeTime: "17:00" },
      tuesday: { isOpen: true, openTime: "08:00", closeTime: "17:00" },
      wednesday: { isOpen: true, openTime: "08:00", closeTime: "17:00" },
      thursday: { isOpen: true, openTime: "08:00", closeTime: "17:00" },
      friday: { isOpen: true, openTime: "08:00", closeTime: "17:00" },
      saturday: { isOpen: true, openTime: "09:00", closeTime: "15:00" },
      sunday: { isOpen: false },
    },
    isActive: true,
  },
];

export default function SalonList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [salons, setSalons] = useState<Salon[]>(mockSalons);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API with the search term
    const filteredSalons = mockSalons.filter(
      (salon) =>
        salon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        salon.address.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setSalons(filteredSalons);
  };

  return (
    <div className="space-y-8">
      <div className="bg-muted p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Find a Salon</h2>
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by salon name or location"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {salons.length > 0 ? (
          salons.map((salon) => <SalonCard key={salon.id} salon={salon} />)
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">
              No salons found matching your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
