import { motion } from "framer-motion";
import { User, Mail, MessageSquare, Send } from "lucide-react";
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
        className="max-w-xl w-full bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border-2 border-cyan-400/30 shadow-2xl space-y-5 sm:space-y-6"
      >
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400/60" />
          <input
            type="text"
            placeholder="Your Name"
            className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl bg-gray-800/60 border-2 border-cyan-400/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 text-sm sm:text-base"
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400/60" />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl bg-gray-800/60 border-2 border-cyan-400/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 text-sm sm:text-base"
          />
        </div>
        <div className="relative">
          <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-cyan-400/60" />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl bg-gray-800/60 border-2 border-cyan-400/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 resize-none text-sm sm:text-base"
          ></textarea>
        </div>
        <button 
          type="submit"
          className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 sm:py-4 rounded-xl 
                     hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 font-semibold
                     shadow-lg hover:shadow-cyan-500/30 hover:scale-105 text-sm sm:text-base"
        >
          <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          <span>Send Message</span>
        </button>
      </motion.form>
    </SectionWrapper>
  );
}
