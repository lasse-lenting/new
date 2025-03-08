import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Check } from "lucide-react";

const benefits = [
  "Reduce no-shows with deposit payments",
  "Manage your calendar and staff schedules",
  "Attract new customers through our platform",
  "First month free, then just €29.99/month",
  "No long-term contracts, cancel anytime",
  "Dedicated support for your business",
];

export default function SalonCTA() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80"
              alt="Salon management"
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight">
              Grow Your Salon Business with HairBookPro
            </h2>
            <p className="text-lg text-muted-foreground">
              Join hundreds of salons already using our platform to streamline
              their booking process and grow their business.
            </p>

            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <Link to="/salon/register">
              <Button size="lg" className="mt-4">
                Register Your Salon
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
