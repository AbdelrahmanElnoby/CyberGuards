import { motion } from "framer-motion";
import SectionWrapper from "../Common/SectionWrapper";

export default function Technology() {
  const steps = [
    {
      step: "Data Collection",
      desc: "Securely aggregating URLs, DNS, and network traffic data from multiple trusted sources in real time.",
    },
    {
      step: "Feature Extraction",
      desc: "Intelligently analyzing URLs, HTML content, and connection metadata to identify suspicious patterns.",
    },
    {
      step: "ML Detection",
      desc: "Applying advanced machine learning models to classify and detect phishing and malicious attempts instantly.",
    },
    {
      step: "Real-time Monitoring",
      desc: "Continuous system surveillance with automated alerts and adaptive model updates for new threats.",
    },
  ];

  return (
    <SectionWrapper id="technology" title="Our Technology">
      <div className="relative flex flex-col items-center py-10 md:py-16">
        {/* Central glowing vertical line */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-[2px] bg-gradient-to-b from-cyan-400 via-cyan-400/40 to-transparent blur-[1px]" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 max-w-7xl w-full relative">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
              className={`
                relative group z-10
                p-6 md:p-8
                rounded-2xl border border-cyan-500/20
                bg-gradient-to-br from-slate-900/70 to-black/50
                shadow-[0_0_25px_rgba(6,182,212,0.05)]
                backdrop-blur-md
                transition-all duration-500
                ${i % 2 === 0 ? "md:ml-auto" : "md:mr-auto"}
              `}
            >
              {/* Connector line to center */}
              <div
                aria-hidden
                className={`hidden md:block absolute top-1/2 -translate-y-1/2 ${
                  i % 2 === 0 ? "-right-[18px]" : "-left-[18px]"
                } w-6 h-[2px] ${
                  i % 2 === 0
                    ? "bg-gradient-to-r from-cyan-400/70 to-transparent"
                    : "bg-gradient-to-l from-cyan-400/70 to-transparent"
                }`}
              />

              {/* Step badge */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <div className="text-cyan-300 text-xs md:text-sm font-mono tracking-wider uppercase">
                  Step {i + 1}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-cyan-100 group-hover:text-cyan-300 transition-colors duration-300">
                {s.step}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                {s.desc}
              </p>

              {/* Animated underline */}
              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.4 }}
                className="h-[2px] mt-4 bg-gradient-to-r from-cyan-400/70 to-transparent rounded"
              />

              {/* Glow hover ring */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.25, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 rounded-2xl bg-cyan-400/10 blur-xl -z-10"
              />
            </motion.div>
          ))}
        </div>

        {/* Ambient background glow */}
        <div className="absolute inset-0 -z-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,180,255,0.07)_0%,transparent_70%)]" />
        </div>

        {/* Subtle bottom glow pulse */}
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-cyan-500/20 blur-[100px] rounded-full -z-10"
        />
      </div>
    </SectionWrapper>
  );
}
