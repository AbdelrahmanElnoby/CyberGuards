import { motion } from "framer-motion";
import { Shield, Network, Brain, Activity, Code, Cloud } from "lucide-react";
import SectionWrapper from "../Common/SectionWrapper";

export default function Features() {
  const features = [
    { 
      icon: <Shield className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: "Phishing URL Detection",
      subtitle: "AI-Driven",
      desc: "Advanced machine learning algorithms detect phishing attempts in real-time with 99%+ accuracy."
    },
    { 
      icon: <Network className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: "Adaptive Network Intelligence",
      subtitle: "Smart Monitoring",
      desc: "Self-learning systems that adapt to new threats and network patterns automatically."
    },
    { 
      icon: <Brain className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: "Behavior-Based Analysis",
      subtitle: "Threat Detection",
      desc: "Analyze user behavior patterns to identify anomalies and potential security breaches."
    },
    { 
      icon: <Activity className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: "Real-Time Dashboard",
      subtitle: "Incident Monitoring",
      desc: "Comprehensive live dashboard with instant alerts and detailed incident reporting."
    },
    { 
      icon: <Code className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: "Secure Integration APIs",
      subtitle: "Seamless Integration",
      desc: "RESTful APIs for easy integration with your existing security infrastructure."
    },
    { 
      icon: <Cloud className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: "Hybrid Cloud Deployment",
      subtitle: "Flexible Architecture",
      desc: "Deploy on-premises, cloud, or hybrid environments with enterprise-grade security."
    },
  ];

  return (
    <SectionWrapper id="features" title="features">
      <div className="relative w-full overflow-hidden py-16 md:py-24 flex flex-col items-center">
        {/* ⚙️ Animated background grid */}
        <div className="absolute inset-0 -z-20 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,180,255,0.06)_0%,transparent_70%)]">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(90deg,rgba(6,182,212,0.2)_1px,transparent_1px),linear-gradient(0deg,rgba(6,182,212,0.2)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        {/* ⚡ Feature field */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-7xl w-full px-4 relative">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{
                rotateY: i % 2 === 0 ? 5 : -5,
                rotateX: 2,
                scale: 1.03,
                y: -5,
              }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative group p-6 sm:p-8 rounded-2xl 
                         bg-gradient-to-br from-slate-900/80 to-black/50 
                         border-2 border-cyan-500/20 
                         shadow-[0_0_25px_rgba(6,182,212,0.1)]
                         backdrop-blur-xl transform-gpu
                         cursor-pointer overflow-hidden
                         hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)]
                         transition-all duration-300"
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
              <div className="relative z-10 flex flex-col">
                {/* Icon */}
                <div className="mb-4 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-cyan-300 mb-1 tracking-wide group-hover:text-cyan-200 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-cyan-400/70 mb-3 font-medium">
                  {feature.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  {feature.desc}
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
