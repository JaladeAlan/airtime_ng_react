import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, X } from "lucide-react";

export default function AppPreview() {
  const [isOpen, setIsOpen] = useState(false);

  return (
 <section className="relative bg-gradient-to-b from-white to-gray-50 py-12 md:py-16 overflow-hidden mb-0">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
        >
          See How <span className="text-[#f59e0b]">Airtime.ng</span> Works
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto mb-10"
        >
          Watch a quick demo of how you can convert airtime to cash, top up your
          phone, and automate airtime rewards in seconds.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center gap-2 bg-[#1E3A8A] text-white px-6 py-3 rounded-lg mx-auto shadow-md hover:bg-[#172a6d] transition-all"
        >
          <PlayCircle size={22} />
          Watch Demo
        </motion.button>
      </div>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-black rounded-2xl overflow-hidden max-w-3xl w-full aspect-video"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 bg-white/20 hover:bg-white/30 p-2 rounded-full text-white z-10"
              >
                <X size={20} />
              </button>

              {/* You can swap this for your own MP4 or hosted file */}
              <iframe
                src="https://www.youtube.com/embed/fF46-B19tNA"
                title="Airtime.ng Demo Video"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
