import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import User from "./pages/User";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route  path="/user" element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          } 
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
