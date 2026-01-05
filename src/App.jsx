import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/Privateroute";

const Home = lazy(() => import("./pages/Home"));
const SignIn = lazy(() => import("./pages/SignIn"));
const User = lazy(() => import("./pages/User"));

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route
            path="/user"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>

      <Footer />
    </BrowserRouter>
  );
}

