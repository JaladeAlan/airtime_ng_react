import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero"; 
import Features from "./components/Features";

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

        <section id="support" className="min-h-screen flex items-center justify-center">
          <div className="text-slate-500 text-sm italic">Support section placeholder</div>
        </section>

        <section id="blog" className="min-h-screen flex items-center justify-center">
          <div className="text-slate-500 text-sm italic">Blog section placeholder</div>
        </section>

        <section id="get-started" className="min-h-screen flex items-center justify-center">
          <div className="text-slate-500 text-sm italic">Get Started section placeholder</div>
        </section>
      </main>
    </>
  );
}
