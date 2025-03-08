import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Scissors, Menu, X } from "lucide-react";
import { useAuth } from "@/lib/auth";
import MainContainer from "./MainContainer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <MainContainer>
        <div className="py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Scissors className="h-6 w-6" />
            <span className="font-bold text-xl">HairBookPro</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link
              to="/salons"
              className="text-sm font-medium hover:text-primary"
            >
              Find Salon
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium hover:text-primary"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium hover:text-primary"
            >
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <Button size="sm" variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center py-4">
                    <Link
                      to="/"
                      className="flex items-center gap-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Scissors className="h-6 w-6" />
                      <span className="font-bold text-xl">HairBookPro</span>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <nav className="flex flex-col gap-4 py-8">
                    <Link
                      to="/"
                      className="text-base font-medium hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      to="/salons"
                      className="text-base font-medium hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Find Salon
                    </Link>
                    <Link
                      to="/about"
                      className="text-base font-medium hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      About
                    </Link>
                    <Link
                      to="/contact"
                      className="text-base font-medium hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contact
                    </Link>
                  </nav>
                  <div className="mt-auto flex flex-col gap-3 py-4">
                    {user ? (
                      <>
                        <Link
                          to="/dashboard"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Button className="w-full">Dashboard</Button>
                        </Link>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                          }}
                        >
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                          <Button variant="outline" className="w-full">
                            Login
                          </Button>
                        </Link>
                        <Link
                          to="/register"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Button className="w-full">Register</Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </MainContainer>
    </header>
  );
}
