import React from "react";
import { Routes, Route } from "react-router-dom";
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
// import Blog from "./components/Blog";

import Login from "./pages/Auth/Login";

export default function App() {
  return (
    <>
      <Navbar />

      <main className="[&>section]:py-2 md:[&>section]:py-3 [&>section:first-child]:pt-2">
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <section id="home">
                  <Hero />
                </section>

                <section id="features">
                  <Features />
                </section>

                <section id="steps">
                  <Steps />
                </section>

                <section id="app-preview">
                  <AppPreview />
                </section>

                <section id="why-choose-us">
                  <WhyChooseUs />
                </section>

                <section id="partners">
                  <Partners />
                </section>

                <section id="download-app">
                  <DownloadApp />
                </section>

                <Footer />
              </>
            }
          />

          {/* Individual Pages */}
          <Route path="/home" element={<Hero />} />
          <Route path="/features" element={<Features />} />
          <Route path="/download-app" element={<DownloadApp />} />
          {/* <Route path="/blog" element={<Blog />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </>
  );
}
