import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Scissors } from "lucide-react";

export default function Navbar() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Scissors className="h-6 w-6" />
          <span className="font-bold text-xl">HairBookPro</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link to="/salons" className="text-sm font-medium hover:text-primary">
            Find Salon
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary">
            About
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium hover:text-primary"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="outline" size="sm">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Register</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
