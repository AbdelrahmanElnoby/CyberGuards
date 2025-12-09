import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import Profile from "./Components/Profile/Profile.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main layout (home page sections inside Layout) */}
        <Route path="/" element={<Layout />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
