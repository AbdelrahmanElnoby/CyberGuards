// src/Components/Common/SectionWrapper.jsx
import { motion } from "framer-motion";

export default function SectionWrapper({ id, title, children }) {
  return (
    <section
      id={id}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 text-white text-center overflow-hidden"
      style={{
        backgroundImage: "url('/your-background.jpg')", // 🖼️ replace with your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 🔮 Semi-transparent gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-gray-900/70 to-black/90 z-0" />

      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-4xl md:text-5xl font-bold mb-8 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]"
      >
        {title}
      </motion.h2>

      <div className="relative z-10 w-full flex flex-col items-center">
        {children}
      </div>

      {/* ✨ Optional subtle ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)] z-0" />
    </section>
  );
}
