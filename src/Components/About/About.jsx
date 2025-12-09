import { motion } from "framer-motion";
import { Users, Brain, Globe } from "lucide-react";
import SectionWrapper from "../Common/SectionWrapper";

export default function About() {
  return (
    <SectionWrapper id="about" title="About Us">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-lg max-w-3xl mb-12 opacity-90"
      >
        We are cybersecurity professionals specializing in phishing detection and 
        network monitoring. Our mission is to build intelligent systems that prevent 
        digital threats before they happen.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mb-12 px-4">
        {[
          { 
            icon: <Users className="w-8 h-8 sm:w-10 sm:h-10" />,
            title: "Expert Team", 
            desc: "Certified experts in AI, ML, and Cyber Defense." 
          },
          { 
            icon: <Brain className="w-8 h-8 sm:w-10 sm:h-10" />,
            title: "AI-Powered Security", 
            desc: "Detects phishing and intrusions in real-time." 
          },
          { 
            icon: <Globe className="w-8 h-8 sm:w-10 sm:h-10" />,
            title: "Global Trust", 
            desc: "Used by companies, banks, and government sectors." 
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="group relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 backdrop-blur-sm shadow-xl border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10">
              <div className="mb-4 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-cyan-300 group-hover:text-cyan-200 transition-colors">
                {item.title}
              </h3>
              <p className="opacity-80 text-gray-200 text-sm sm:text-base leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        onClick={() => {
          const demoSection = document.getElementById("demo");
          if (demoSection) {
            demoSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
        className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-full 
                   font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
      >
        Try Our Demo
      </motion.button>
    </SectionWrapper>
  );
}
