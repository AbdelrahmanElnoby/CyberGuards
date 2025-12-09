import { motion } from "framer-motion";
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mb-12">
        {[
          { title: "Expert Team", desc: "Certified experts in AI, ML, and Cyber Defense." },
          { title: "AI-Powered Security", desc: "Detects phishing and intrusions in real-time." },
          { title: "Global Trust", desc: "Used by companies, banks, and government sectors." },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/20 shadow-lg border border-cyan-400/20"
          >
            <h3 className="text-2xl font-semibold mb-3 text-cyan-300">{item.title}</h3>
            <p className="opacity-80 text-gray-200">{item.desc}</p>
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
