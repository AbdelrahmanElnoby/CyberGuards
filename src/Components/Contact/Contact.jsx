import { motion } from "framer-motion";
import SectionWrapper from "../Common/SectionWrapper";

export default function Contact() {
  return (
    <SectionWrapper id="contact" title="Contact Us">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-lg max-w-3xl mb-10 opacity-90"
      >
        Have a question or want to partner with us? Reach out and let’s discuss your cybersecurity needs.
      </motion.p>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full bg-gray-900/60 backdrop-blur-sm p-8 rounded-xl border border-cyan-400/30 shadow-lg space-y-6"
      >
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 rounded-md bg-gray-800/80 border border-cyan-400/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 rounded-md bg-gray-800/80 border border-cyan-400/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
        />
        <textarea
          placeholder="Your Message"
          rows="5"
          className="w-full p-3 rounded-md bg-gray-800/80 border border-cyan-400/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition resize-none"
        ></textarea>
        <button 
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-md 
                     hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 font-semibold
                     shadow-lg hover:shadow-cyan-500/30"
        >
          Send Message
        </button>
      </motion.form>
    </SectionWrapper>
  );
}
