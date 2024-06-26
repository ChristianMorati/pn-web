import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "../pages/home";
import MyTransactionsScreen from "../pages/my-transactions";
import Navbar from "../layout/navbar";
import AuthScreen from "../pages/LoginScreen";

export default function AuthRouter() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<AuthScreen />} />
        <Route path="my-account" element={<HomeScreen />} />
        <Route path="my-transactions" element={<MyTransactionsScreen />} />
      </Routes>
    </Router>
  );
}