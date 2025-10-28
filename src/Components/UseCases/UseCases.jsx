import SectionWrapper from "../Common/SectionWrapper";

export default function UseCases() {
  const cases = [
    { name: "Banks", desc: "Prevent phishing-based financial fraud and fake login portals." },
    { name: "Enterprises", desc: "Monitor network traffic for malicious links and anomalies." },
    { name: "Governments", desc: "Strengthen public sector infrastructure security." },
  ];

  return (
    <SectionWrapper id="usecases" title="Use Cases">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
        {cases.map((c, i) => (
          <div
            key={i}
            className="p-6 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-3">{c.name}</h3>
            <p className="opacity-85">{c.desc}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
