import { motion } from "framer-motion";
import SectionWrapper from "../Common/SectionWrapper";

export default function Technology() {
  const steps = [
    { step: "Data Collection", desc: "Gathering URLs, DNS, and traffic data securely." },
    { step: "Feature Extraction", desc: "Analyzing URLs, content, and network signatures." },
    { step: "ML Detection", desc: "Applying trained models to identify phishing attempts." },
    { step: "Real-time Monitoring", desc: "Continuous system scanning and alert generation." },
  ];

  return (
    <SectionWrapper id="technology" title="Our Technology">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="p-6 border border-cyan-500/30 rounded-xl bg-black/40"
          >
            <h3 className="text-2xl font-semibold mb-3 text-cyan-300">{s.step}</h3>
            <p className="opacity-80">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
