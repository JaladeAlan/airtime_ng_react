import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroPhones from "../assets/phone.png";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-gradient-to-b from-white to-[#F8FAFC] overflow-hidden py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-16 w-full">
        {/* LEFT TEXT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 mb-4 md:mb-6">
            Your all in one <br className="hidden md:block" />
            <span className="text-[#f59e0b]">Airtime Solution</span>
          </h1>

          <p className="text-gray-600 mb-8 md:mb-10 max-w-md mx-auto md:mx-0 text-base md:text-lg leading-relaxed">
            Convert unused airtime to cash, buy bulk airtime for less, and
            automate airtime rewards — all in one simple, fast, and reliable platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <Link
              to="/register"
              className="bg-[#16404D] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#172a6d] transition-all shadow-md hover:shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </motion.div>

        {/* RIGHT IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex-1 flex justify-center md:justify-end relative"
        >
          <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-[#E0F2FE] via-[#FDE68A]/40 to-transparent rounded-full blur-3xl opacity-70 -z-10" />

          <img
            src={heroPhones}
            alt="Airtime.ng App Preview"
            className="w-[380px] md:w-[480px] lg:w-[540px] object-contain drop-shadow-2xl select-none"
          />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
    </section>
  );
}
