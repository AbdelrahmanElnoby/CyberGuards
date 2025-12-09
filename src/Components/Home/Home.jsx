import { motion } from "framer-motion";
import SectionWrapper from "../Common/SectionWrapper";

export default function Home() {
  return (
    <SectionWrapper id="home" title="Cyber Guards">
      {/* Background glow effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-blue-900/30 rounded-full blur-3xl"></div>
      </div>

      {/* Animated heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
      >
        Shield Your Network with <br />
        <span className="text-white">AI-Powered Defense</span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="text-lg md:text-xl text-gray-300 max-w-3xl mb-10 leading-relaxed"
      >
        Protect your organization from phishing, intrusion, and advanced network threats using 
        <span className="text-cyan-400 font-medium"> real-time AI monitoring</span> and 
        <span className="text-cyan-400 font-medium"> machine learning detection</span>.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="flex flex-wrap gap-4 mb-20"
      >
        <button 
          onClick={() => {
            const demoSection = document.getElementById("demo");
            if (demoSection) {
              demoSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
        >
          Try Demo
        </button>
        <button 
          onClick={() => {
            const servicesSection = document.getElementById("services");
            if (servicesSection) {
              servicesSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="border border-cyan-400 text-cyan-300 px-8 py-3 rounded-full font-semibold hover:bg-cyan-400/10 transition-all duration-300"
        >
          Learn More
        </button>
      </motion.div>

      {/* Scroll for learn more */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="flex flex-col items-center text-cyan-400/80"
      >
        <span className="text-sm tracking-wide mb-5">Scroll for learn more</span>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-cyan-400"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.div>

      {/* Subtle background grid */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,rgba(0,100,150,0.1)_0%,transparent_70%)] pointer-events-none"></div>
    </SectionWrapper>
  );
}
