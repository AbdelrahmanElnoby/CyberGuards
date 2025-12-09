import { useState } from "react";
import axios from "axios";
import SectionWrapper from "../Common/SectionWrapper";
import { motion } from "framer-motion";
import { API_ENDPOINTS } from "../../config/api";

export default function Demo() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    setLoading(true);
    try {
      // POST request to https://url-detector.skysoft-erb.com/predict
      // Body: { url: "..." }
      const response = await axios.post(
        API_ENDPOINTS.URL_PREDICT, // https://url-detector.skysoft-erb.com/predict
        { url: url.trim() }, // Send URL in request body
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000, // 30 seconds timeout
        }
      );

      setResult(response.data);
    } catch (err) {
      console.error("Error:", err);
      
      // Handle different types of errors
      if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        setError(
          "Network Error: Unable to connect to the server.\n\n" +
          "Possible causes:\n" +
          "• CORS is not configured on the backend server\n" +
          "• The API server is down or unreachable\n" +
          "• Check your internet connection\n\n" +
          "Please ensure CORS is enabled on the backend to allow requests from this origin."
        );
      } else if (err.response) {
        // Server responded with error status
        setError(
          err.response?.data?.message ||
          `Server Error: ${err.response.status} - ${err.response.statusText}`
        );
      } else if (err.request) {
        // Request was made but no response received
        setError("No response from server. Please check your connection and try again.");
      } else {
        // Something else happened
        setError(err.message || "Failed to analyze URL. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getPredictionColor = (prediction) => {
    return prediction === "PHISHING" ? "text-red-400" : "text-green-400";
  };

  const getPredictionBgColor = (prediction) => {
    return prediction === "PHISHING"
      ? "bg-red-500/20 border-red-500/50"
      : "bg-green-500/20 border-green-500/50";
  };

  return (
    <SectionWrapper id="demo" title="Try Our Demo">
      <p className="max-w-3xl mb-8 opacity-90">
        Experience real-time phishing detection in action. Analyze URLs and get instant
        predictions about their legitimacy.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL to analyze (e.g., https://www.example.com)"
              className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-cyan-500 text-white px-8 py-4 rounded-full hover:bg-cyan-600 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold whitespace-nowrap"
            >
              {loading ? "Analyzing..." : "Analyze URL"}
            </button>
          </div>
        </form>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300"
          >
            <p className="font-semibold">❌ Error</p>
            <p>{error}</p>
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`p-6 rounded-2xl backdrop-blur-sm border-2 ${getPredictionBgColor(
              result.prediction
            )} shadow-xl`}
          >
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2 text-white">URL Analyzed:</h3>
              <p className="text-cyan-300 break-all font-mono text-sm">{result.url}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-black/30 p-4 rounded-xl">
                <p className="text-white/70 text-sm mb-1">Prediction</p>
                <p
                  className={`text-2xl font-bold ${getPredictionColor(
                    result.prediction
                  )}`}
                >
                  {result.prediction}
                </p>
              </div>

              <div className="bg-black/30 p-4 rounded-xl">
                <p className="text-white/70 text-sm mb-1">Confidence</p>
                <p className="text-2xl font-bold text-cyan-400">
                  {(result.confidence * 100).toFixed(2)}%
                </p>
              </div>
            </div>

            <div className="bg-black/30 p-4 rounded-xl">
              <p className="text-white/70 text-sm mb-2">Phishing Probability</p>
              <div className="w-full bg-gray-700/50 rounded-full h-4 mb-2">
                <div
                  className="bg-gradient-to-r from-red-500 to-orange-500 h-4 rounded-full transition-all duration-500"
                  style={{
                    width: `${(result.phishing_probability * 100).toFixed(2)}%`,
                  }}
                ></div>
              </div>
              <p className="text-white font-semibold">
                {(result.phishing_probability * 100).toFixed(2)}%
              </p>
            </div>
          </motion.div>
        )}

        {!result && !loading && !error && (
          <div className="text-center text-white/60 mt-8">
            <p>Enter a URL above to check if it's legitimate or phishing</p>
          </div>
        )}
      </motion.div>
    </SectionWrapper>
  );
}
