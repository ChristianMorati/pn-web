import { useAppSelector } from "../store/hooks/useAppSelector";
import './index.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "../layout/navbar";
import HomeScreen from "../pages/home";
import MyTransactionsScreen from "../pages/my-transactions";
import AuthScreen from "../pages/LoginScreen";
import NotFoundScreen from "../pages/not-founded";

export default function RootNavigator() {
    const { signedIn } = useAppSelector(store => store.user);

    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={signedIn ? <HomeScreen /> : <Navigate to="/login" />} />
                    <Route path="my-transactions" element={signedIn ? <MyTransactionsScreen /> : <Navigate to="/login" />} />
                    <Route path="/login" element={<AuthScreen />} />
                    <Route path="*" element={<NotFoundScreen />} />
                </Routes>
            </Router>
        </>
    );
}
