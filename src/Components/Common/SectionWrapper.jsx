// src/Components/Common/SectionWrapper.jsx
import { motion } from "framer-motion";

export default function SectionWrapper({ id, title, children, className = "" }) {
  return (
    <section
      id={id}
      className={`relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-white text-center overflow-hidden scroll-snap-section ${className}`}
      style={{
        backgroundImage: "url('/your-background.jpg')", // 🖼️ replace with your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* 🔮 Semi-transparent gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-gray-900/70 to-black/90 z-0" />

      {title && (
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]"
        >
          {title}
        </motion.h2>
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        {children}
      </div>

      {/* ✨ Optional subtle ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)] z-0 pointer-events-none" />
    </section>
  );
}
