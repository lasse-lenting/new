import { Link } from "react-router-dom";
import { Scissors } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <Scissors className="h-6 w-6" />
              <span className="font-bold text-xl">HairBookPro</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              The ultimate appointment booking platform for hair salons.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Customers</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/salons"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Find a Salon
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Salons</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/salon/register"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Register Your Salon
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Features
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Support
                </Link>
              </li>
              <li>
                <a
                  href="mailto:info@hairbookpro.com"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  info@hairbookpro.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} HairBookPro. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/privacy"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
