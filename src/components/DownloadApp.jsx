import { motion } from "framer-motion";

export default function DownloadApp() {
  return (
    <section className="bg-[#1E3A8A] text-white py-20" id="download">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Download Our Mobile App
        </motion.h2>

        <p className="max-w-2xl mx-auto text-gray-200 mb-8">
          Manage your airtime with ease — whether you’re converting, buying, or automating, our app has you covered.
        </p>

        <div className="flex justify-center gap-4">
          <img src="/images/appstore.png" alt="App Store" className="h-12 hover:scale-105 transition-transform" />
          <img src="/images/googleplay.png" alt="Google Play" className="h-12 hover:scale-105 transition-transform" />
        </div>
      </div>
    </section>
  );
}
