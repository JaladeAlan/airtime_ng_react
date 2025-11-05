import { motion } from "framer-motion";
import { Wallet, RefreshCw, CreditCard } from "lucide-react";

export default function Steps() {
  const steps = [
    {
      id: 1,
      title: "Select Your Service ",
      desc: "Choose  between converting  airtime  to  cash, buying  bulk  airtime, or setting  up  Airtime  Triggers.",
      icon: <Wallet className="w-8 h-8 text-[#1E3A8A]" />,
      delay: 0,
    },
    {
      id: 2,
      title: "Enter  Details",
      desc: "Choose  between converting  airtime  to  cash, buying  bulk  airtime, or setting  up  Airtime  Triggers.",
      icon: <CreditCard className="w-8 h-8 text-[#1E3A8A]" />,
      delay: 0.2,
    },
    {
      id: 3,
      title: "Confirm  and  Execute",
      desc: "Choose  between converting  airtime  to  cash, buying  bulk  airtime, or setting  up  Airtime  Triggers.",
      icon: <RefreshCw className="w-8 h-8 text-[#1E3A8A]" />,
      delay: 0.4,
    },
  ];

  return (
    <section className="relative bg-white py-24 md:py-12">
      <div className="max-w-6xl mx-auto px-6 text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-800 text-3xl md:text-4xl font-bold mb-3"
        >
          How It Works
        </motion.h2>
        <div className="mx-auto w-24 h-[3px] bg-[#f59e0b] rounded-full" />
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm md:text-base">
          Get started in just a few simple steps. Convert, withdraw, and manage
          your airtime in minutes.
        </p>
      </div>

      {/* Steps grid */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {steps.map((step) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: step.delay }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-2 duration-300 p-8 text-center"
          >
            <div className="bg-[#E0F2FE] w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              {step.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Gradient glow behind */}
      <div className="absolute top-0 left-0 w-full h-[250px] bg-gradient-to-b from-[#FEF3C7]/40 to-transparent -z-10" />
    </section>
  );
}
