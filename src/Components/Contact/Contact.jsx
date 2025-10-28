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

      <form className="max-w-xl w-full bg-gray-900/60 p-8 rounded-xl border border-cyan-400/30 shadow-lg space-y-6">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 rounded-md bg-gray-800 border border-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 rounded-md bg-gray-800 border border-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <textarea
          placeholder="Your Message"
          rows="5"
          className="w-full p-3 rounded-md bg-gray-800 border border-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        ></textarea>
        <button className="w-full bg-cyan-500 text-white py-3 rounded-md hover:bg-cyan-600 transition">
          Send Message
        </button>
      </form>
    </SectionWrapper>
  );
}
