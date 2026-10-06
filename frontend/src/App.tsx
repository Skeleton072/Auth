import { Routes, Route } from "react-router-dom";
import AuthForm from "./auth/loginSignup/page";
import LandingPage from "./landingPage/page";
import EmailVerification from "./auth/verifyOTP/page";

export default function App() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/auth/:mode" element={<AuthForm />} />
      <Route path="/auth/emailVerification" element={<EmailVerification />} />

      <Route path="/dashboard" element />
    </Routes>
  )
}