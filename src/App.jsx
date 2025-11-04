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
import Register from "./components/Register";

// import Blog from "./components/Blog";

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          {/* 🏠 Landing Page */}
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

          {/* Features Page */}
          <Route path="/home" element={<Hero />} />

          {/* Features Page */}
          <Route path="/features" element={<Features />} />

          {/* Support Page */}
          <Route path="/dowload-app" element={<DownloadApp />} />

          {/* Blog Page */}
          {/* <Route path="/blog" element={<Blog />} /> */}

          {/* Register Page */}
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </>
  );
}
