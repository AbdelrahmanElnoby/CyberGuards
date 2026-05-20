import { useState } from "react";
import axios from "axios";
import SectionWrapper from "../Common/SectionWrapper";
import { motion } from "framer-motion";
import { API_ENDPOINTS } from "../../config/api";

const getSpamRowLabel = (row) => {
  if (row == null || typeof row !== "object") return String(row ?? "Unknown");
  const v =
    row.prediction ??
    row.label ??
    row.Predicted_Label ??
    row.Spam ??
    row.is_spam ??
    row.result;
  return v != null ? String(v) : "Unknown";
};

const isSpamLabel = (label) => {
  const s = String(label).toLowerCase();
  return (
    s === "spam" ||
    s === "1" ||
    s === "true" ||
    (s.includes("spam") && !s.includes("ham") && !s.includes("not"))
  );
};

const normalizeSpamResults = (data) => {
  if (Array.isArray(data)) return data;
  if (data?.results && Array.isArray(data.results)) return data.results;
  if (data?.predictions && Array.isArray(data.predictions)) return data.predictions;
  return null;
};

export default function Demo() {
  const [mode, setMode] = useState("url"); // url | network | spam
  const [url, setUrl] = useState("");
  const [networkFile, setNetworkFile] = useState(null);
  const [spamFile, setSpamFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const [downloadUrl, setDownloadUrl] = useState("");
  const [fileName, setFileName] = useState("");

  const switchMode = (next) => {
    setMode(next);
    setError("");
    setResult(null);
    setDownloadUrl("");
  };

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

    if (!networkFile) {
      setError("Please upload a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", networkFile);

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
      savePrediction({ url: networkFile.name, prediction: mostCommon });
    } catch (err) {
      setError("Failed to analyze CSV file");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= SPAM DETECTOR ================= */
  const handleSpamSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setDownloadUrl("");
    setResult(null);

    if (!spamFile) {
      setError("Please upload a CSV file with email data");
      return;
    }

    const formData = new FormData();
    formData.append("file", spamFile);

    setLoading(true);
    try {
      const res = await axios.post(API_ENDPOINTS.SPAM_SCAN, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 60000,
      });

      const data = res.data;
      const rows = normalizeSpamResults(data);

      if (rows?.length) {
        const spamCount = rows.filter((row) => isSpamLabel(getSpamRowLabel(row))).length;
        const hamCount = rows.length - spamCount;
        const mostCommon = spamCount >= hamCount ? "Spam" : "Ham";

        setResult({ type: "spam", rows, spamCount, hamCount, mostCommon, raw: data });

        const blob = new Blob([JSON.stringify(rows, null, 2)], { type: "application/json" });
        setDownloadUrl(window.URL.createObjectURL(blob));
        setFileName("spam-scan-results.json");

        savePrediction({ url: spamFile.name, prediction: mostCommon });
      } else {
        setResult({ type: "spam", rows: null, raw: data });
        if (typeof data === "string" || typeof data === "object") {
          const blob = new Blob(
            [typeof data === "string" ? data : JSON.stringify(data, null, 2)],
            { type: "application/json" }
          );
          setDownloadUrl(window.URL.createObjectURL(blob));
          setFileName("spam-scan-results.json");
        }
      }
    } catch (err) {
      const msg =
        err.response?.data?.detail?.[0]?.msg ||
        err.response?.data?.detail ||
        err.message;
      setError(
        typeof msg === "string"
          ? `Failed to scan emails: ${msg}`
          : "Failed to scan emails. Check your CSV format and try again."
      );
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
        Test our AI models: URL phishing detection, network traffic analysis, or email spam detection.
      </p>

      {/* ===== MODE SWITCH ===== */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          type="button"
          onClick={() => switchMode("url")}
          className={`px-6 py-3 rounded-full font-semibold transition ${
            mode === "url" ? "bg-cyan-500 text-white" : "bg-white/10 text-white/70"
          }`}
        >
          URL Detector
        </button>

        <button
          type="button"
          onClick={() => switchMode("network")}
          className={`px-6 py-3 rounded-full font-semibold transition ${
            mode === "network" ? "bg-cyan-500 text-white" : "bg-white/10 text-white/70"
          }`}
        >
          Network Analyser (CSV)
        </button>

        <button
          type="button"
          onClick={() => switchMode("spam")}
          className={`px-6 py-3 rounded-full font-semibold transition ${
            mode === "spam" ? "bg-cyan-500 text-white" : "bg-white/10 text-white/70"
          }`}
        >
          Spam Detector (CSV)
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

      {/* ===== NETWORK CSV UI ===== */}
      {mode === "network" && (
        <form onSubmit={handleCsvSubmit} className="space-y-4 max-w-2xl">
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setNetworkFile(e.target.files[0])}
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

      {/* ===== SPAM DETECTOR UI ===== */}
      {mode === "spam" && (
        <form onSubmit={handleSpamSubmit} className="space-y-4 max-w-2xl">
          <p className="text-white/70 text-sm">
            Upload a CSV file with email data. The API returns spam detection results for each row.
          </p>

          <input
            type="file"
            accept=".csv"
            onChange={(e) => setSpamFile(e.target.files[0])}
            className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white"
          />

          <button
            disabled={loading}
            className="bg-cyan-500 text-white px-8 py-4 rounded-xl disabled:opacity-60"
          >
            {loading ? "Scanning..." : "Upload & Scan"}
          </button>

          {result?.type === "spam" && result.mostCommon && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div
                className={`p-4 rounded-xl border text-center ${
                  result.mostCommon === "Spam"
                    ? "text-red-400 border-red-500 bg-red-500/20"
                    : "text-green-400 border-green-500 bg-green-500/20"
                }`}
              >
                <p className="text-white/60 text-sm">Most common</p>
                <p className="font-bold text-xl">{result.mostCommon}</p>
              </div>
              <div className="p-4 rounded-xl border border-red-500/50 bg-red-500/10 text-center">
                <p className="text-white/60 text-sm">Spam</p>
                <p className="font-bold text-xl text-red-400">{result.spamCount}</p>
              </div>
              <div className="p-4 rounded-xl border border-green-500/50 bg-green-500/10 text-center">
                <p className="text-white/60 text-sm">Ham</p>
                <p className="font-bold text-xl text-green-400">{result.hamCount}</p>
              </div>
            </div>
          )}

          {result?.type === "spam" && result.rows?.length > 0 && (
            <div className="mt-4 max-h-64 overflow-auto rounded-xl border border-white/20 bg-white/5">
              <table className="w-full text-sm text-left text-white/90">
                <thead className="sticky top-0 bg-black/40 text-white/60">
                  <tr>
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Prediction</th>
                  </tr>
                </thead>
                <tbody>
                  {result.rows.slice(0, 20).map((row, i) => {
                    const label = getSpamRowLabel(row);
                    const spam = isSpamLabel(label);
                    return (
                      <tr key={i} className="border-t border-white/10">
                        <td className="px-4 py-2">{i + 1}</td>
                        <td
                          className={`px-4 py-2 font-medium ${
                            spam ? "text-red-400" : "text-green-400"
                          }`}
                        >
                          {label}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {result.rows.length > 20 && (
                <p className="px-4 py-2 text-white/50 text-xs">
                  Showing first 20 of {result.rows.length} rows.
                </p>
              )}
            </div>
          )}

          {result?.type === "spam" && !result.rows?.length && result.raw != null && (
            <pre className="mt-4 p-4 rounded-xl bg-white/5 border border-white/20 text-white/80 text-sm overflow-auto max-h-64">
              {typeof result.raw === "string"
                ? result.raw
                : JSON.stringify(result.raw, null, 2)}
            </pre>
          )}

          {downloadUrl && result?.type === "spam" && (
            <div className="p-6 rounded-2xl bg-green-500/20 border border-green-500/50 text-center">
              <p className="mb-4 text-green-300 font-semibold">Scan completed</p>
              <button
                onClick={handleDownload}
                type="button"
                className="bg-green-500 text-black px-6 py-3 rounded-xl font-semibold"
              >
                Download Results
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
