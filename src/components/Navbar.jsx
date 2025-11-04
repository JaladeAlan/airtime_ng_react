import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "react-feather";
import { Link } from "react-router-dom"; 
import logo from "../assets/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "download-app", label: "Download App" },
    // { id: "blog", label: "Blog" },
  ];

  return (
    <header className="fixed w-full z-40 bg-transparent backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo only */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="airtime logo" className="h-10 object-contain" />
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="text-slate-700 hover:text-slate-900 transition-colors"
            >
              {l.label}
            </a>
          ))}

          {/* Go to Register Page */}
          <Link
            to="/register"
            className="ml-4 inline-block px-4 py-2 rounded-md bg-teal-700 text-white hover:bg-teal-800 shadow"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
            className="p-2 rounded-md bg-white/60 backdrop-blur text-slate-700 shadow"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden bg-white/80 backdrop-blur border-t"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="py-2 text-slate-800 font-medium hover:text-teal-700 transition-colors"
                >
                  {l.label}
                </a>
              ))}

              {/* Go to Register Page on Mobile */}
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="mt-2 inline-block px-8 py-3 rounded-md bg-[#16404D] text-white font-medium hover:bg-[#172a6d] transition-all shadow-md hover:shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
