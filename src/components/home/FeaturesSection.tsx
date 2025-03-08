import {
  Calendar,
  Clock,
  Users,
  Scissors,
  CreditCard,
  Settings,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const features = [
  {
    title: "Easy Booking",
    description: "Book appointments in just a few clicks, 24/7 from anywhere.",
    icon: Calendar,
  },
  {
    title: "Real-time Availability",
    description: "See up-to-date availability for all stylists and services.",
    icon: Clock,
  },
  {
    title: "Choose Your Stylist",
    description:
      "Select your preferred stylist based on expertise and reviews.",
    icon: Users,
  },
  {
    title: "Wide Range of Services",
    description: "From haircuts to coloring, find all the services you need.",
    icon: Scissors,
  },
  {
    title: "Secure Payments",
    description: "Pay deposits securely online to confirm your appointment.",
    icon: CreditCard,
  },
  {
    title: "Salon Management",
    description:
      "Powerful tools for salons to manage staff, services, and bookings.",
    icon: Settings,
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold tracking-tight mb-4">
            Why Choose HairBookPro?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform makes booking and managing hair appointments simple for
            both customers and salons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-border bg-card">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
