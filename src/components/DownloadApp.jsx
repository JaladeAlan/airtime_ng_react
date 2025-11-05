import { motion } from "framer-motion";
import appstore from "../assets/appstore.png";
import googleplay from "../assets/googleplay.png";

export default function DownloadApp() {
  return (
    <section className="bg-white pt-20 pb-10 md:pb-20" id="download">
      <div className="max-w-6xl mx-auto px-6">
        {/* Rounded Inner Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-[#134E4A] rounded-3xl text-center py-14 px-6 shadow-lg"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Download Our Mobile App
          </h2>

          <p className="text-gray-200 max-w-2xl mx-auto mb-8">
            Experience the easiest way to manage your airtime today. Whether
            you're converting, buying, or automating, our platform has got you
            covered.
          </p>

          <div className="flex justify-center gap-4">
            <img
              src={appstore}
              alt="App Store"
              className="h-12"
            />
            <img
              src={googleplay}
              alt="Google Play"
              className="h-12"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
