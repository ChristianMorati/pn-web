import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthScreen from "../pages/LoginScreen";

export default function NonAuthRouter() {
  return (
    <Router>
      <Routes>
        <Route path="auth" element={<AuthScreen />} />
      </Routes>
    </Router>
  );
}