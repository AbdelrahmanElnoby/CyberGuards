import SectionWrapper from "../Common/SectionWrapper";

export default function Features() {
  const list = [
    "Phishing URL Detection (ML-powered)",
    "Real-Time Network Monitoring",
    "Custom Alert Configuration",
    "Threat Visualization Dashboard",
    "Secure API for Integration",
    "Cloud & On-premise Deployment",
  ];

  return (
    <SectionWrapper id="features" title="Key Features">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl text-left">
        {list.map((f, i) => (
          <li
            key={i}
            className="bg-gray-800/60 border border-cyan-400/30 p-4 rounded-lg hover:bg-cyan-400/10 transition"
          >
            {f}
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}
