import { motion } from "framer-motion";

// ✅ Import image assets directly
import punch from "../assets/punch.png";
import naijaloaded from "../assets/naijaloaded.png";
import pulse from "../assets/pulse.png";
import vanguard from "../assets/vanguard.png";
import techpoint from "../assets/techpoint.png";

export default function Partners() {
  // ✅ Store imported assets in an array
  const logos = [punch, naijaloaded, pulse, vanguard, techpoint];

  return (
    <section className="py-20 bg-white" id="partners">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-10"
        >
          Our Partners
        </motion.h2>

        <div className="flex flex-wrap justify-center items-center gap-8">
          {logos.map((logo, index) => (
            <motion.img
              key={index}
              src={logo}
              alt={`partner-${index}`}
              className="h-10 object-contain grayscale hover:grayscale-0 transition-all"
              whileHover={{ scale: 1.1 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
