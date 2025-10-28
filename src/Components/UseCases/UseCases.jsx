// src/Components/Sections/UseCases.jsx
import { motion } from "framer-motion";
import SectionWrapper from "../Common/SectionWrapper";
import { ShieldCheck, Network, Landmark } from "lucide-react";

export default function UseCases() {
  const cases = [
    {
      name: "Banks & Financial Institutions",
      desc: "Shield customers from phishing, fake portals, and fraudulent transactions with real-time AI protection.",
      icon: <ShieldCheck className="w-12 h-12 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]" />,
      points: [
        "Instant phishing URL detection",
        "Secure transaction monitoring",
        "Credential theft prevention",
      ],
    },
    {
      name: "Large Enterprises",
      desc: "Power your security teams with adaptive AI that learns from evolving threats and automates response.",
      icon: <Network className="w-12 h-12 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]" />,
      points: [
        "Threat feed and SIEM integration",
        "Custom alert automation",
        "Self-learning detection engines",
      ],
    },
    {
      name: "Government & Public Sector",
      desc: "Strengthen national security with deep monitoring and intelligence systems built for large-scale defense.",
      icon: <Landmark className="w-12 h-12 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]" />,
      points: [
        "National-scale threat analytics",
        "Zero-trust infrastructure support",
        "Defense-grade resilience tools",
      ],
    },
  ];

  return (
    <SectionWrapper id="usecases" title="Use Cases">
      <div className="relative w-full max-w-7xl mx-auto px-4 py-20 overflow-hidden">
        {/* Cyber grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,transparent_70%)] z-0" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,182,212,0.08)_1px,transparent_1px),linear-gradient(rgba(6,182,212,0.08)_1px,transparent_1px)] bg-[size:45px_45px] opacity-10" />

        {/* Animated curved path */}
        <motion.svg
          viewBox="0 0 800 300"
          className="absolute top-1/3 left-0 w-full h-[400px] opacity-30 z-0"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        >
          <defs>
            <linearGradient id="cyberLine" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d="M100,250 C250,100 550,100 700,250"
            fill="none"
            stroke="url(#cyberLine)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </motion.svg>

        {/* Cyber cards */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-stretch gap-16 md:gap-10 mt-16">
          {cases.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              whileHover={{ scale: 1.05, rotateY: 3 }}
              className="relative group flex flex-col items-center text-center 
                         bg-gradient-to-br from-slate-900/80 to-slate-800/60 
                         backdrop-blur-2xl border border-cyan-400/20 
                         rounded-3xl p-8 shadow-[0_0_25px_rgba(6,182,212,0.15)] 
                         hover:shadow-[0_0_45px_rgba(6,182,212,0.4)] 
                         transition-all duration-500 w-full md:w-[30%]
                         overflow-hidden"
            >
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/40"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl md:text-2xl font-semibold text-cyan-300 mb-2 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                {item.name}
              </h3>
              <p className="text-gray-300 text-sm md:text-base mb-4 leading-relaxed">
                {item.desc}
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                {item.points.map((p, j) => (
                  <li key={j} className="flex items-center justify-center gap-2">
                    <span className="text-cyan-400 text-lg">▹</span> {p}
                  </li>
                ))}
              </ul>

              {/* Floating particle */}
              <motion.div
                className="absolute -top-8 w-3 h-3 rounded-full bg-cyan-400/70 blur-sm"
                animate={{ y: [0, -12, 0], opacity: [0.9, 0.3, 0.9] }}
                transition={{ repeat: Infinity, duration: 3, delay: i * 0.6 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom glow effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-32 bg-cyan-500/10 blur-3xl rounded-full" />
      </div>
    </SectionWrapper>
  );
}
