import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Steps from "./components/Steps";
import AppPreview from "./components/AppPreview";
import WhyChooseUs from "./components/WhyChooseUs";
import Partners from "./components/Partners";
import DownloadApp from "./components/DownloadApp";
import Footer from "./components/Footer";
import Register from "./pages/Auth/Register";
import VerifyEmailPhone from "./pages/Auth/VerifyEmailPhone";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";
import Dashboard from  "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const location = useLocation();

  const hideNavbarRoutes = ["/login", "/register", "/forgot-password", "/verify", "/dashboard"];

  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}

      <main className="[&>section]:py-2 md:[&>section]:py-3 [&>section:first-child]:pt-2">
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <section id="home"><Hero /></section>
                <section id="features"><Features /></section>
                <section id="steps"><Steps /></section>
                <section id="app-preview"><AppPreview /></section>
                <section id="why-choose-us"><WhyChooseUs /></section>
                <section id="partners"><Partners /></section>
                <section id="download-app"><DownloadApp /></section>
                <Footer />
              </>
            }
          />

          {/* Individual Pages */}
          <Route path="/home" element={<Hero />} />
          <Route path="/features" element={<Features />} />
          <Route path="/download-app" element={<DownloadApp />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<VerifyEmailPhone />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={<h1 className="text-center mt-10">404 - Page Not Found</h1>}
          />
        </Routes>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
}
