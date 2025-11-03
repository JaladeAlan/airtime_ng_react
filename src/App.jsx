import React from "react";  
import Navbar from "./components/Navbar";
import Hero from "./components/Hero"; 
import Features from "./components/Features";
import Steps from "./components/Steps";
import AppPreview from "./components/AppPreview";
import WhyChooseUs from "./components/WhyChooseUs";
import Partners from "./components/Partners";
import DownloadApp from "./components/DownloadApp";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
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
      </main>
    </>
  );
}
