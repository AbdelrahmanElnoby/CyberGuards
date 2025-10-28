import { motion } from "framer-motion";

export default function Services() {
  return (
    <section
      id="services"
      className="relative flex flex-col items-center justify-center min-h-screen text-center text-white px-6 py-16"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg"
        >
          Our Services
        </motion.h2>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl max-w-3xl mb-12 opacity-90"
        >
          We protect your business with advanced monitoring, ML-powered phishing detection, and expert cybersecurity consulting.
        </motion.p>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl"
        >
          <div className="bg-blue-600/30 p-6 rounded-xl shadow-lg hover:bg-teal-500/40 transition transform hover:-translate-y-2 flex flex-col items-center">
            <h3 className="text-2xl font-semibold mb-3">Network Monitoring</h3>
            <p className="text-base opacity-90">
              Real-time traffic analysis, anomaly detection, and continuous monitoring to keep your network secure.
            </p>
          </div>

          <div className="bg-blue-600/30 p-6 rounded-xl shadow-lg hover:bg-teal-500/40 transition transform hover:-translate-y-2 flex flex-col items-center">
            <h3 className="text-2xl font-semibold mb-3">Phishing URL Detection</h3>
            <p className="text-base opacity-90">
              ML-powered detection of phishing URLs with automatic blocking and real-time alerts.
            </p>
          </div>

          <div className="bg-blue-600/30 p-6 rounded-xl shadow-lg hover:bg-teal-500/40 transition transform hover:-translate-y-2 flex flex-col items-center">
            <h3 className="text-2xl font-semibold mb-3">Incident Reporting</h3>
            <p className="text-base opacity-90">
              Detailed dashboards and reports with alerts for all detected security incidents.
            </p>
          </div>

          <div className="bg-blue-600/30 p-6 rounded-xl shadow-lg hover:bg-teal-500/40 transition transform hover:-translate-y-2 flex flex-col items-center">
            <h3 className="text-2xl font-semibold mb-3">Consulting & Support</h3>
            <p className="text-base opacity-90">
              Expert guidance on cybersecurity strategy and best practices tailored to your organization.
            </p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 bg-blue-600 hover:bg-teal-500 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
        >
          Start Protecting Now
        </motion.button>
      </div>
    </section>
  );
}
