import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import SalonList from "./components/salon/SalonList";
import SalonDetail from "./components/salon/SalonDetail";
import SalonRegistration from "./components/salon/SalonRegistration";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardHome from "./pages/dashboard/index";
import tempoRoutes from "tempo-routes";
import { AuthProvider } from "./lib/auth";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import MainLayout from "./components/layout/MainLayout";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/salons" element={<SalonList />} />
            <Route path="/salons/:id" element={<SalonDetail />} />
            <Route path="/salon/register" element={<SalonRegistration />} />
          </Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="appointments" element={<div>Appointments Page</div>} />
            <Route path="staff" element={<div>Staff Management Page</div>} />
            <Route
              path="treatments"
              element={<div>Treatments Management Page</div>}
            />
            <Route path="analytics" element={<div>Analytics Page</div>} />
            <Route path="settings" element={<div>Settings Page</div>} />
          </Route>
          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(tempoRoutes)}
      </Suspense>
    </AuthProvider>
  );
}

export default App;
