import { motion } from "framer-motion";

// Import image assets 
import punch from "../assets/punch.png";
import naijaloaded from "../assets/naijaloaded.png";
import pulse from "../assets/pulse.png";
import vanguard from "../assets/vanguard.png";
import techpoint from "../assets/techpoint.png";

export default function Partners() {
  const logos = [punch, naijaloaded, pulse, vanguard, techpoint];

  return (
    <section className="pt-20 pb-20 bg-white" id="partners">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-gray-800 text-3xl md:text-4xl font-bold pb-6 mb-0"
        >
          Our Partners
        </motion.h2>
         <div className="mx-auto w-24 h-[4px] bg-[#f59e0b] rounded-full mb-10" />

        <div className="flex flex-wrap justify-center items-center gap-8 pb-0 mb-0">
          {logos.map((logo, index) => (
            <motion.img
              key={index}
              src={logo}
              alt={`partner-${index}`}
              className="h-10 object-contain"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
