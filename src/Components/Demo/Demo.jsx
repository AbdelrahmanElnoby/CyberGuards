import SectionWrapper from "../Common/SectionWrapper";

export default function Demo() {
  return (
    <SectionWrapper id="demo" title="Try Our Demo">
      <p className="max-w-3xl mb-8 opacity-90">
        Experience real-time phishing detection in action. Analyze URLs, monitor network traffic,
        and visualize threats instantly.
      </p>
      <button className="bg-cyan-500 text-white px-8 py-3 rounded-full hover:bg-cyan-600 transition">
        Launch Demo
      </button>
    </SectionWrapper>
  );
}
