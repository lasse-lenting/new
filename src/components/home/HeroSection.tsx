import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
              Book Your Perfect Haircut with Ease
            </h1>
            <p className="text-xl text-muted-foreground">
              Find and book appointments at the best hair salons in your area.
              No more waiting on the phone or dealing with scheduling conflicts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/salons">
                <Button size="lg">Find a Salon</Button>
              </Link>
              <Link to="/salon/register">
                <Button variant="outline" size="lg">
                  Register Your Salon
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80"
              alt="Hair salon"
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
