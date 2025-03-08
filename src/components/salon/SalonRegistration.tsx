import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { Check, CreditCard } from "lucide-react";

export default function SalonRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
    }, 1500);
  };

  if (isComplete) {
    return (
      <div className="max-w-3xl mx-auto py-12">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Registration Complete!</CardTitle>
            <CardDescription>
              Your salon has been successfully registered with HairBookPro.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p>Welcome to HairBookPro! Your salon account has been created and your free trial has started.</p>
            <p>You can now access your salon dashboard to set up your profile, add staff members, and define your services.</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button size="lg">Go to Salon Dashboard</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
