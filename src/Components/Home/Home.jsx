import { motion } from "framer-motion";
import SectionWrapper from "../Common/SectionWrapper";

export default function Home() {
  return (
    <SectionWrapper id="home" title="Cyber Guards">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-lg md:text-xl max-w-3xl opacity-90 mb-10"
      >
        Protect your organization from phishing and network threats using 
        AI-powered monitoring and machine learning detection.
      </motion.p>

      <div className="flex gap-4">
        <button className="bg-cyan-500 text-white px-6 py-3 rounded-full hover:bg-cyan-600 transition">
          Try Demo
        </button>
        <button className="border border-cyan-400 px-6 py-3 rounded-full hover:bg-cyan-400/10 transition">
          Learn More
        </button>
      </div>
    </SectionWrapper>
  );
}
