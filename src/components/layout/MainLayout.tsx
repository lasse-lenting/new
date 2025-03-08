import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MainContainer from "./MainContainer";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-8">
        <MainContainer>
          <Outlet />
        </MainContainer>
      </main>
      <Footer />
    </div>
  );
}
