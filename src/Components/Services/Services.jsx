import { motion } from "framer-motion";
import { ShieldCheck, Activity, Globe2, Headphones } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Activity className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" />,
      title: "Network Monitoring",
      desc: "Real-time traffic analysis, anomaly detection, and continuous monitoring to keep your network secure.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" />,
      title: "Phishing URL Detection",
      desc: "ML-powered detection of phishing URLs with automatic blocking and instant alerts to your team.",
    },
    {
      icon: <Globe2 className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" />,
      title: "Incident Reporting",
      desc: "Comprehensive dashboards and alerts for all detected incidents with forensic-level detail.",
    },
    {
      icon: <Headphones className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" />,
      title: "Consulting & Support",
      desc: "Expert cybersecurity guidance and strategy sessions tailored to your organization’s needs.",
    },
  ];

  return (
    <section
      id="services"
      className="relative flex flex-col items-center justify-center min-h-screen text-center text-white px-6 py-24 overflow-hidden"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-10" />

      {/* Glow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-40 bg-cyan-500/20 blur-3xl rounded-full" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.h2
          initial={{ y: -40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
        >
          Our Services
        </motion.h2>

        <motion.p
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl max-w-3xl mb-16 text-gray-300 leading-relaxed"
        >
          Empowering organizations with adaptive defense mechanisms, advanced threat monitoring,
          and AI-driven cybersecurity solutions.
        </motion.p>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl"
        >
          {services.map((srv, i) => (
            <motion.div
              key={i}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ scale: 1.05, rotateY: 3 }}
              className="relative group bg-gradient-to-br from-slate-900/70 to-slate-800/60 border border-cyan-400/20 
                         rounded-3xl p-8 backdrop-blur-2xl shadow-[0_0_30px_rgba(6,182,212,0.1)] 
                         hover:shadow-[0_0_50px_rgba(6,182,212,0.4)] transition-all duration-500 overflow-hidden"
            >
              {/* Neon border glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/40"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

              {/* Icon */}
              <div className="mb-5 flex justify-center">{srv.icon}</div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-semibold text-cyan-300 mb-3 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                {srv.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {srv.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex flex-wrap gap-4 justify-center"
        >
          <button
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500
                       text-white font-semibold px-10 py-3 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] 
                       hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] transition-transform hover:scale-105"
            onClick={() => {
              const demoSection = document.getElementById("demo");
              if (demoSection) {
                demoSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Try Demo
          </button>
          <button
            className="border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400/10
                       font-semibold px-10 py-3 rounded-full transition-all duration-300"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Contact Us
          </button>
        </motion.div>
      </div>
    </section>
  );
}
