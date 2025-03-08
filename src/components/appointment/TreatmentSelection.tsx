import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Clock, ChevronLeft } from "lucide-react";
import { Treatment } from "@/types";

interface TreatmentSelectionProps {
  salonId: string;
  onSelect: (treatment: Treatment) => void;
  onBack: () => void;
}

// Mock data for treatments
const mockTreatments: Treatment[] = [
  {
    id: "1",
    salonId: "1",
    name: "Women's Haircut",
    description: "Includes consultation, shampoo, cut, and style.",
    duration: 60,
    price: 45,
    category: "Haircuts",
    isActive: true,
  },
  {
    id: "2",
    salonId: "1",
    name: "Men's Haircut",
    description: "Includes consultation, shampoo, cut, and style.",
    duration: 45,
    price: 35,
    category: "Haircuts",
    isActive: true,
  },
  {
    id: "3",
    salonId: "1",
    name: "Children's Haircut",
    description: "For children under 12 years old.",
    duration: 30,
    price: 25,
    category: "Haircuts",
    isActive: true,
  },
  {
    id: "4",
    salonId: "1",
    name: "Full Color",
    description: "All-over permanent hair color.",
    duration: 90,
    price: 75,
    category: "Color",
    isActive: true,
  },
  {
    id: "5",
    salonId: "1",
    name: "Highlights",
    description: "Partial or full head of foil highlights.",
    duration: 120,
    price: 95,
    category: "Color",
    isActive: true,
  },
  {
    id: "6",
    salonId: "1",
    name: "Balayage",
    description: "Hand-painted highlights for a natural, sun-kissed look.",
    duration: 150,
    price: 120,
    category: "Color",
    isActive: true,
  },
  {
    id: "7",
    salonId: "1",
    name: "Blowout",
    description: "Shampoo and blowdry styling.",
    duration: 45,
    price: 35,
    category: "Styling",
    isActive: true,
  },
  {
    id: "8",
    salonId: "1",
    name: "Special Occasion Style",
    description: "Formal styling for weddings, proms, and special events.",
    duration: 60,
    price: 65,
    category: "Styling",
    isActive: true,
  },
];

export default function TreatmentSelection({
  salonId,
  onSelect,
  onBack,
}: TreatmentSelectionProps) {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // In a real app, this would fetch treatments data from an API
    const filteredTreatments = mockTreatments.filter(
      (t) => t.salonId === salonId,
    );
    setTreatments(filteredTreatments);

    // Extract unique categories
    const uniqueCategories = Array.from(
      new Set(filteredTreatments.map((t) => t.category)),
    );
    setCategories(uniqueCategories);
  }, [salonId]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2">Select a Service</h2>
        <p className="text-muted-foreground">
          Choose the service you'd like to book
        </p>
      </div>

      <Tabs defaultValue={categories[0] || "all"} className="w-full">
        <TabsList className="w-full flex overflow-x-auto">
          <TabsTrigger value="all">All Services</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {treatments.map((treatment) => (
              <TreatmentCard
                key={treatment.id}
                treatment={treatment}
                onSelect={() => onSelect(treatment)}
              />
            ))}
          </div>
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {treatments
                .filter((t) => t.category === category)
                .map((treatment) => (
                  <TreatmentCard
                    key={treatment.id}
                    treatment={treatment}
                    onSelect={() => onSelect(treatment)}
                  />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-start mt-6">
        <Button variant="ghost" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Stylist Selection
        </Button>
      </div>
    </div>
  );
}

interface TreatmentCardProps {
  treatment: Treatment;
  onSelect: () => void;
}

function TreatmentCard({ treatment, onSelect }: TreatmentCardProps) {
  return (
    <Card
      className="cursor-pointer transition-all hover:border-primary"
      onClick={onSelect}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{treatment.name}</CardTitle>
          <div className="text-lg font-bold">€{treatment.price}</div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{treatment.description}</p>
        <div className="flex items-center mt-4 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          <span>{treatment.duration} minutes</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={onSelect}>
          Select Service
        </Button>
      </CardFooter>
    </Card>
  );
}
