import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import bgImage from "../../assets/screens/1.jpg";

import { Trash2, ExternalLink, Copy } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


export default function ProfileDashboard() {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();
  const [predictions, setPredictions] = useState([]);
  const [filter, setFilter] = useState("all"); // all | phishing | legitimate | malware | benign
  const [typeFilter, setTypeFilter] = useState("all"); // all | url | network
  const [sortOrder, setSortOrder] = useState("desc"); // desc = newest first, asc = oldest first
  const [searchQuery, setSearchQuery] = useState(""); // بحث حسب URL

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    const savedPredictions = localStorage.getItem("predictions");
    if (savedPredictions) setPredictions(JSON.parse(savedPredictions));
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const deletePrediction = (index) => {
    const updated = predictions.filter((_, i) => i !== index);
    setPredictions(updated);
    localStorage.setItem("predictions", JSON.stringify(updated));
  };

  const clearAllPredictions = () => {
    if (window.confirm("Are you sure you want to delete all predictions?")) {
      setPredictions([]);
      localStorage.removeItem("predictions");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const COLORS = {
    PHISHING: "#f87171",
    LEGITIMATE: "#34d399",
    MALWARE: "#fbbf24",
    BENIGN: "#60a5fa",
    Default: "#9ca3af",
  };

  const getPredictionColor = (prediction) => COLORS[prediction] || COLORS.Default;
  const getPredictionBgColor = (prediction) =>
    prediction === "PHISHING"
      ? "bg-red-500/20 border-red-500/50"
      : prediction === "LEGITIMATE"
      ? "bg-green-500/20 border-green-500/50"
      : prediction === "MALWARE"
      ? "bg-yellow-500/20 border-yellow-500/50"
      : "bg-blue-500/20 border-blue-500/50";

  // فلترة وترتيب البيانات
const filteredPredictions = predictions
  // فلترة حسب نوع prediction (PHISHING, LEGITIMATE, MALWARE, BENIGN)
  .filter((p) => filter === "all" || p.prediction.toLowerCase() === filter)
  // فلترة حسب النوع: url أو network
  .filter((p) => {
    if (typeFilter === "all") return true;
    if (typeFilter === "url") return p.prediction.toLowerCase() === "phishing" || p.prediction.toLowerCase() === "legitimate";
    if (typeFilter === "network") return p.prediction.toLowerCase() === "malware" || p.prediction.toLowerCase() === "benign";
    return true;
  })
  // فلترة حسب البحث
  .filter((p) => p.url.toLowerCase().includes(searchQuery.toLowerCase()))
  // الترتيب
  .sort((a, b) =>
    sortOrder === "desc"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );


  // إعداد بيانات الإحصائيات
  const counts = filteredPredictions.reduce(
    (acc, p) => {
      acc[p.prediction] = (acc[p.prediction] || 0) + 1;
      acc.total++;
      return acc;
    },
    { total: 0 }
  );

  const chartData = Object.entries(counts)
    .filter(([key]) => key !== "total")
    .map(([name, value]) => ({
      name,
      value,
      fill: COLORS[name] || COLORS.Default,
    }));

  if (!isLoggedIn || !user) return null;

  return (
    <div

      className="min-h-screen bg-cover bg-center relative flex flex-col items-center p-6"

      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-blue-900/50 to-black/80 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-7xl flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2">Dashboard</h1>
            <p className="text-gray-300">
              Welcome back, <span className="text-cyan-400 font-semibold">{user.username || user.email}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 md:mt-0 px-6 py-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full font-semibold transition-all duration-300"
          >
            Logout
          </button>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          {/* فلتر Prediction */}
          <div className="flex gap-2 flex-wrap">
            {["all", "phishing", "legitimate", "malware", "benign"].map((f) => (
              <button
                key={f}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  filter === f ? "bg-cyan-500 text-white" : "bg-white/10 text-white/70"
                }`}
                onClick={() => setFilter(f)}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            {/* فلتر النوع */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 rounded-lg bg-white/50 border border-white/20 text-black"
            >
              <option value="all">All Types</option>
              <option value="url">URL</option>
              <option value="network">Network</option>
            </select>

            {/* فلتر الترتيب */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-3 py-2 rounded-lg bg-white/50 border border-white/20 text-black"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>

            {/* البحث حسب URL */}
            <input
              type="text"
              placeholder="Search URL..."
              className="ml-2 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-black/30 p-4 rounded-xl border border-white/20 text-center">
            <p className="text-gray-400 text-sm">Total Predictions</p>
            <p className="text-white text-2xl font-bold">{counts.total || 0}</p>
          </div>
          {["PHISHING", "LEGITIMATE", "MALWARE", "BENIGN"].map((type) => {
            const percentage = counts.total
              ? ((counts[type] || 0) / counts.total) * 100
              : 0;
            return (
              <div
                key={type}
                className={`p-4 rounded-xl border text-center ${getPredictionBgColor(type)}`}
              >
                <p className="text-gray-200 text-sm">{type}</p>
                <p className="text-white text-2xl font-bold">
                  {counts[type] || 0} ({percentage.toFixed(0)}%)
                </p>
              </div>
            );
          })}
        </div>

        {/* Chart */}
        {chartData.length > 0 && (
          <div className="p-6 rounded-2xl bg-white/10 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4">Prediction Summary</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", borderRadius: "8px", border: "none" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Saved Predictions */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-cyan-400">
              Saved Predictions ({filteredPredictions.length})
            </h2>
            {filteredPredictions.length > 0 && (
              <button
                onClick={clearAllPredictions}
                className="px-4 py-2 bg-red-500/50 hover:bg-red-500/70 text-white rounded-lg text-sm font-semibold transition"
              >
                Clear All
              </button>
            )}
          </div>

          {filteredPredictions.length === 0 ? (
            <div className="text-center py-12 bg-black/20 rounded-xl border border-white/10">
              <p className="text-gray-400 text-lg mb-2">No saved predictions</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPredictions.map((prediction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-2xl backdrop-blur-sm border-2 ${getPredictionBgColor(
                    prediction.prediction
                  )} shadow-xl relative hover:scale-[1.02] transition-transform`}
                >
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => deletePrediction(index)}
                      className="p-2 bg-red-500/50 hover:bg-red-500/70 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => copyToClipboard(prediction.url)}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
                      title="Copy URL"
                    >
                      <Copy className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  <div className="mb-4 pr-8">
                    <h3 className="text-sm text-gray-400 mb-1">URL</h3>
                    <div className="flex items-center gap-2">
                      <p className="text-cyan-300 break-all font-mono text-sm flex-1">{prediction.url}</p>
                      <a
                        href={prediction.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 transition"
                        title="Open URL"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="bg-black/30 p-3 rounded-xl flex justify-between items-center">
                    <p className="text-white/70 text-xs">Prediction</p>
                    <p
                      className="text-xl font-bold"
                      style={{ color: getPredictionColor(prediction.prediction) }}
                    >
                      {prediction.prediction}
                    </p>
                  </div>

                  {prediction.date && (
                    <p className="text-gray-500 text-xs mt-3">
                      Analyzed: {new Date(prediction.date).toLocaleString()}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Scroll to Top Button */}
  
    </div>
  );
}
