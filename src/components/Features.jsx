import { motion } from "framer-motion";

// Large images
import convertImg from "../assets/convert.png";
import buyImg from "../assets/buy.png";
import bulkImg from "../assets/bulk.png";

// Small icons
import convertIcon from "../assets/convert-icon.png";
import buyIcon from "../assets/buy-icon.png";
import bulkIcon from "../assets/bulk-icon.png";

export default function Features() {
  const features = [
    {
      id: 1,
      title: "Convert Your Airtime to Cash",
      desc: "Turn your unused or excess airtime into real cash instantly in your bank account or wallet.",
      img: convertImg,
      icon: convertIcon,
      bg: "bg-[#FEF8EC]",
    },
    {
      id: 2,
      title: "Buy Airtime",
      desc: "Top up your phone or others easily and enjoy reliable instant delivery with Airtime.ng.",
      img: buyImg,
      icon: buyIcon,
      bg: "bg-[#F3F6FF]",
    },
    {
      id: 3,
      title: "Buy Bulk Airtime",
      desc: "Automate large airtime purchases and enjoy discounts for organizations or campaigns.",
      img: bulkImg,
      icon: bulkIcon,
      bg: "bg-[#16404D]",
      text: "text-white",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-white to-[#F8FAFC] py-20 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto px-6 text-center mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-800 text-3xl md:text-4xl font-bold mb-3"
        >
          Innovative Features Designed
          <br className="hidden md:block" /> for Your Airtime Needs
        </motion.h2>
        <div className="mx-auto w-24 h-[3px] bg-[#f59e0b] rounded-full" />
      </div>

      {/* Feature Cards */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
        {features.slice(0, 2).map((feature, i) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            viewport={{ once: true }}
            className={`${feature.bg} ${feature.text || "text-gray-800"} p-8 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-2 duration-300 flex flex-col justify-between`}
          >
            {/* Icon + Text */}
            <div>
              <img src={feature.icon} alt="" className="w-7 h-7 mb-4" />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-base leading-relaxed opacity-90">{feature.desc}</p>
            </div>

            {/* Bottom 3D Image */}
            <div className="mt-6 flex justify-center">
              <img
                src={feature.img}
                alt={feature.title}
                className="w-30 h-38 md:w-72 md:h-72 object-contain"
              />
            </div>
          </motion.div>
        ))}

        {/* Third Feature (Full Width) */}
        <motion.div
          key={features[2].id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className={`${features[2].bg} ${features[2].text || "text-gray-800"} md:col-span-2 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-2 duration-300 flex flex-col md:flex-row justify-between items-start`}
        >
          {/* Text Section (Top-aligned) */}
          <div className="max-w-lg">
            <img src={features[2].icon} alt="" className="w-8 h-8 mb-4" />
            <h3 className="text-2xl font-semibold mb-3 text-white">{features[2].title}</h3>
            <p className="text-base leading-relaxed opacity-90">{features[2].desc}</p>
          </div>

          {/* Image Section */}
          <div className="mt-6 md:mt-0 flex justify-center md:justify-end w-full md:w-auto">
            <img
              src={features[2].img}
              alt={features[2].title}
              className="w-60 h-60 md:w-96 md:h-96 object-contain"
            />
          </div>
        </motion.div>
      </div>

      <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-[#e0f2fe]/40 to-transparent -z-10" />
    </section>
  );
}
