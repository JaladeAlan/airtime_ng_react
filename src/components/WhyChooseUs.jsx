import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const perks = [
    { title: "Fast and Reliable", desc: "Enjoy seamless transactions with quick processing times." },
    { title: "Secure Platform", desc: "Experience safety and encryption for all your airtime operations." },
    { title: "Instant Processing", desc: "No delays — get results within seconds." },
    { title: "24/7 Availability", desc: "Transact anytime, anywhere." },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white" id="why-us">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        >
          Perks of Choosing <span className="text-[#1E3A8A]">Our Airtime Services</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-600 max-w-2xl mx-auto mb-12"
        >
          Enjoy fast, secure, and reliable airtime conversions and purchases.
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {perks.map((perk, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900">{perk.title}</h3>
              <p className="text-gray-600 text-sm">{perk.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
