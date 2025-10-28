// src/Components/Common/SectionWrapper.jsx
import { motion } from "framer-motion";

export default function SectionWrapper({ id, title, children }) {
  return (
    <section
      id={id}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 
      bg-gradient-to-b from-black via-gray-900 to-black text-white text-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold mb-8 text-cyan-400"
      >
        {title}
      </motion.h2>
      {children}
    </section>
  );
}
