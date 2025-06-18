import { Outlet, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import PresentationPage from "./pages/Presentation/PresentationPage";
import { Onboarding } from "./pages/Auth/Onboarding";
import {WelcomeScreens} from "./pages/Main/WelcomeScreens";
import { SignupPage } from "./pages/Auth/SignupPage";
import { MouseMoveEffect } from "./components/common/MouseMoveEffect";
import { ForgotPasswordPage } from "./pages/Auth/ForgotPasswordPage";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import TrashPage from "./pages/Dashboard/Trash/TrashPage";
import SharedPage from "./pages/Dashboard/Shared/SharedPage";
import { PricingPage } from "./pages/Dashboard/Price/PricingPage";
import ProjectFormPage from "./pages/Dashboard/ProjectForm/ProjectFormPage";
import ChatInterface from "./pages/Dashboard/ProjectForm/Chat/ChatInterface";
import PaymentSuccess from "./pages/Dashboard/Price/Payment/PaymentSuccess";
import PaymentFailed from "./pages/Dashboard/Price/Payment/PaymentFailed";
import ReceiptPage from "./pages/Dashboard/Price/Payment/ReceiptPage";
import SettingsPage from "./pages/Dashboard/Settings/SettingsPage";
import ProjectsPage from "./pages/Dashboard/Projects/ProjectsPage";
import AdminDashboard from "./pages/Dashboard/Dashboards/AdminDashboard";
import UserDashboard from './pages/Dashboard/Dashboards/UserDashboard';

function App() {
  return (
    <div className="dark relative min-h-screen w-full overflow-auto bg-gradient-to-br from-black via-zinc-900 to-zinc-800">
      <Routes>
        <Route
          element={
            <>
              <MouseMoveEffect />
              <Outlet />
            </>
          }
        >
          <Route path="/" element={<WelcomeScreens />} />
          <Route path="/on-boarding" element={<Onboarding />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>
        <Route path="/presentation/:id" element={<PresentationPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-error" element={<PaymentFailed />} />
        <Route path="/payment-receipt" element={<ReceiptPage />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/trash" element={<TrashPage />} />
          <Route path="/shared" element={<SharedPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/project-form" element={<ProjectFormPage />} />
          <Route path="/chat/:id" element={<ChatInterface />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
      {/* Invisible translator component */}
      {/* <Translator targetLang="ar" /> */}
      <Toaster />
    </div>
  );
}

export default App;
