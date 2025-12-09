import { motion } from "framer-motion";
import SectionWrapper from "../Common/SectionWrapper";

export default function Features() {
  const list = [
    "Phishing URL Detection (AI-Driven)",
    "Adaptive Network Intelligence",
    "Behavior-Based Threat Analysis",
    "Real-Time Incident Dashboard",
    "Secure Integration APIs",
    "Hybrid Cloud Deployment",
  ];

  return (
    <SectionWrapper id="features" title="features">
      <div className="relative w-full overflow-hidden py-16 md:py-24 flex flex-col items-center">
        {/* ⚙️ Animated background grid */}
        <div className="absolute inset-0 -z-20 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,180,255,0.06)_0%,transparent_70%)]">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(90deg,rgba(6,182,212,0.2)_1px,transparent_1px),linear-gradient(0deg,rgba(6,182,212,0.2)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        {/* ⚡ Feature field */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl w-full px-4 relative">
          {list.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{
                rotateY: i % 2 === 0 ? 8 : -8,
                rotateX: 4,
                scale: 1.05,
              }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative group p-6 md:p-8 rounded-2xl 
                         bg-gradient-to-br from-slate-900/70 to-black/40 
                         border border-cyan-500/20 
                         shadow-[0_0_25px_rgba(6,182,212,0.1)]
                         backdrop-blur-xl transform-gpu
                         cursor-pointer overflow-hidden"
            >
              {/* Glowing accent border on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-transparent to-cyan-400/10 rounded-2xl blur-md"
              />

              {/* Neon ring corner accent */}
              <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-cyan-400/20 blur-md group-hover:blur-lg transition-all duration-500" />

              {/* Feature content */}
              <div className="relative z-10 flex flex-col items-start">
                <h3 className="text-xl md:text-2xl font-semibold text-cyan-300 mb-3 tracking-wide group-hover:text-cyan-200 transition-colors duration-300">
                  {f.split(" ")[0]}
                  <span className="text-gray-300 ml-2">{f.split(" ").slice(1).join(" ")}</span>
                </h3>

                <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                  Cutting-edge technology that empowers your organization to detect, predict, and neutralize cyber threats in milliseconds.
                </p>
              </div>

              {/* Floating particle glow */}
              <motion.div
                animate={{
                  opacity: [0.05, 0.2, 0.05],
                  scale: [1, 1.2, 1],
                  x: [0, 10, -10, 0],
                  y: [0, -10, 10, 0],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-10 right-10 w-20 h-20 bg-cyan-400/10 blur-3xl rounded-full -z-10"
              />
            </motion.div>
          ))}
        </div>

        {/* Ambient bottom pulse */}
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[180px] bg-cyan-500/20 blur-[120px] rounded-full -z-10"
        />

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <button
            onClick={() => {
              const demoSection = document.getElementById("demo");
              if (demoSection) {
                demoSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500
                       text-white font-semibold px-10 py-3 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] 
                       hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] transition-transform hover:scale-105"
          >
            Experience Our Demo
          </button>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
