import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Salon } from "@/types";
import { MapPin, Clock, Star } from "lucide-react";

interface SalonCardProps {
  salon: Salon;
}

export default function SalonCard({ salon }: SalonCardProps) {
  return (
    <Card className="overflow-hidden border border-border bg-card h-full flex flex-col">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={
            salon.logo ||
            "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80"
          }
          alt={salon.name}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold">{salon.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">4.8</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
            <span className="text-sm text-muted-foreground">
              {salon.address}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-muted-foreground mt-1" />
            <span className="text-sm text-muted-foreground">
              Open today:{" "}
              {salon.openingHours.monday.isOpen
                ? `${salon.openingHours.monday.openTime} - ${salon.openingHours.monday.closeTime}`
                : "Closed"}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
            {salon.description}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/salons/${salon.id}`} className="w-full">
          <Button variant="default" className="w-full">
            Book Appointment
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
