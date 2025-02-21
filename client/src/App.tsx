import Dashboard from "./pages/Dashboard";
import { ErrorPage } from "./pages/ErrorPage";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signin" element={<AuthPage type="signin" />} />
        <Route path="/signup" element={<AuthPage type="signup" />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}
