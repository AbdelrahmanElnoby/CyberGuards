import { useState } from "react";
import axios from "axios";
import SectionWrapper from "../Common/SectionWrapper";
import { motion } from "framer-motion";
import { API_ENDPOINTS } from "../../config/api";

export default function Demo() {
  const [mode, setMode] = useState("url"); // url | csv
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const [downloadUrl, setDownloadUrl] = useState("");
  const [fileName, setFileName] = useState("");

  /* ================= URL MODEL ================= */
  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    const trimmedUrl = url.trim();
    if (!trimmedUrl.startsWith("http://") && !trimmedUrl.startsWith("https://")) {
      setError("URL must start with http:// or https://");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        API_ENDPOINTS.URL_PREDICT,
        { urls: [trimmedUrl] },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 30000,
        }
      );

      const data = Array.isArray(res.data) ? res.data[0] : res.data;
      setResult(data);
      savePrediction({ url: trimmedUrl, prediction: data.prediction });
    } catch (err) {
      setError("Failed to analyze URL");
    } finally {
      setLoading(false);
    }
  };

  /* ================= CSV MODEL ================= */
  const handleCsvSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setDownloadUrl("");
    setResult(null);

    if (!file) {
      setError("Please upload a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await axios.post(API_ENDPOINTS.NETWORK_ANALYSER, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 60000,
      });

      const data = res.data;

      // رابط التحميل
      const blob = new Blob([JSON.stringify(data.predictions)], { type: "text/csv" });
      const downloadLink = window.URL.createObjectURL(blob);
      setDownloadUrl(downloadLink);
      setFileName(data.filename || "result.csv");

      // تحديد النوع الأكثر شيوعًا
      const malwareCount = data.predictions.filter(
        (p) => p.Predicted_Attack_Category === "Malware"
      ).length;
      const benignCount = data.predictions.filter(
        (p) => p.Predicted_Attack_Category === "Benign"
      ).length;
      const mostCommon =
        malwareCount >= benignCount ? "Malware" : "Benign";

      setResult({ predictions: data.predictions, mostCommon });

      // حفظ النتيجة
      savePrediction({ url: file.name, prediction: mostCommon });
    } catch (err) {
      setError("Failed to analyze CSV file");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= SAVE TO LOCALSTORAGE ================= */
  const savePrediction = ({ url, prediction }) => {
    const saved = JSON.parse(localStorage.getItem("predictions")) || [];
    saved.push({
      url,
      prediction,
      date: new Date().toISOString(),
    });
    localStorage.setItem("predictions", JSON.stringify(saved));
  };

  /* ================= DOWNLOAD ================= */
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(downloadUrl);
  };

  const getPredictionColor = (p) =>
    p === "PHISHING" ? "text-red-400" : p === "MALWARE" ? "text-yellow-400" : "text-green-400";

  const getPredictionBgColor = (p) =>
    p === "PHISHING"
      ? "bg-red-500/20 border-red-500/50"
      : p === "MALWARE"
      ? "bg-yellow-500/20 border-yellow-500/50"
      : "bg-green-500/20 border-green-500/50";

  return (
    <SectionWrapper id="demo" title="Try Our Demo">
      <p className="max-w-3xl mb-8 opacity-90">
        Test our AI models: URL phishing detection or network traffic analysis.
      </p>

      {/* ===== MODE SWITCH ===== */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setMode("url")}
          className={`px-6 py-3 rounded-full font-semibold transition ${
            mode === "url" ? "bg-cyan-500 text-white" : "bg-white/10 text-white/70"
          }`}
        >
          URL Detector
        </button>

        <button
          onClick={() => setMode("csv")}
          className={`px-6 py-3 rounded-full font-semibold transition ${
            mode === "csv" ? "bg-cyan-500 text-white" : "bg-white/10 text-white/70"
          }`}
        >
          Network Analyser (CSV)
        </button>
      </div>

      {/* ===== URL MODEL UI ===== */}
      {mode === "url" && (
        <form onSubmit={handleUrlSubmit} className="space-y-4 max-w-2xl">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white"
          />

          <button
            disabled={loading}
            className="bg-cyan-500 text-white px-8 py-4 rounded-full"
          >
            {loading ? "Analyzing..." : "Analyze URL"}
          </button>

          {result && result.prediction && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-6 rounded-2xl border-2 ${getPredictionBgColor(result.prediction)}`}
            >
              <p className="text-white/70 mb-1">Prediction</p>
              <p className={`text-2xl font-bold ${getPredictionColor(result.prediction)}`}>
                {result.prediction}
              </p>
            </motion.div>
          )}
        </form>
      )}

      {/* ===== CSV MODEL UI ===== */}
      {mode === "csv" && (
        <form onSubmit={handleCsvSubmit} className="space-y-4 max-w-2xl">
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white"
          />

          <button
            disabled={loading}
            className="bg-cyan-500 text-white px-8 py-4 rounded-xl"
          >
            {loading ? "Analyzing..." : "Upload & Analyze"}
          </button>

          {result?.mostCommon && (
            <div
              className={`mt-6 p-6 rounded-xl border text-center font-bold text-xl ${
                result.mostCommon === "Malware"
                  ? "text-red-400 border-red-500 bg-red-500/20"
                  : "text-green-400 border-green-500 bg-green-500/20"
              }`}
            >
              Most Common: {result.mostCommon}
            </div>
          )}

          {/* عرض الملف القابل للتحميل */}
          {downloadUrl && (
            <div className="p-6 rounded-2xl bg-green-500/20 border border-green-500/50 text-center">
              <p className="mb-4 text-green-300 font-semibold">✅ Analysis completed</p>
              <button
                onClick={handleDownload}
                type="button"
                className="bg-green-500 text-black px-6 py-3 rounded-xl font-semibold"
              >
                Download Result File
              </button>
            </div>
          )}
        </form>
      )}

      {error && (
        <div className="mt-6 p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300">
          ❌ {error}
        </div>
      )}
    </SectionWrapper>
  );
}
