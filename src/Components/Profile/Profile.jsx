import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bgImage from "../../assets/screens/1.jpg";
import { Trash2, ExternalLink } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token) {
      navigate("/login");
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Load saved predictions
    const savedPredictions = localStorage.getItem("predictions");
    if (savedPredictions) {
      setPredictions(JSON.parse(savedPredictions));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Trigger auth change event
    window.dispatchEvent(new Event("authChange"));
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

  const getPredictionColor = (prediction) => {
    return prediction === "PHISHING" ? "text-red-400" : "text-green-400";
  };

  const getPredictionBgColor = (prediction) => {
    return prediction === "PHISHING"
      ? "bg-red-500/20 border-red-500/50"
      : "bg-green-500/20 border-green-500/50";
  };

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center p-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-blue-900/50 to-black/80 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/20"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-white/20">
            <div>
              <h1 className="text-4xl font-extrabold text-white mb-2">My Profile</h1>
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

          {/* User Info */}
          <div className="mb-8 p-6 bg-black/30 rounded-xl border border-cyan-400/20">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Account Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.username && (
                <div>
                  <p className="text-gray-400 text-sm mb-1">Username</p>
                  <p className="text-white font-semibold">{user.username}</p>
                </div>
              )}
              {user.email && (
                <div>
                  <p className="text-gray-400 text-sm mb-1">Email</p>
                  <p className="text-white font-semibold">{user.email}</p>
                </div>
              )}
            </div>
          </div>

          {/* Saved Predictions */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-cyan-400">
                Saved Predictions ({predictions.length})
              </h2>
              {predictions.length > 0 && (
                <button
                  onClick={clearAllPredictions}
                  className="px-4 py-2 bg-red-500/50 hover:bg-red-500/70 text-white rounded-lg text-sm font-semibold transition"
                >
                  Clear All
                </button>
              )}
            </div>

            {predictions.length === 0 ? (
              <div className="text-center py-12 bg-black/20 rounded-xl border border-white/10">
                <p className="text-gray-400 text-lg mb-2">No saved predictions yet</p>
                <p className="text-gray-500 text-sm">
                  Analyze URLs in the Demo section to save predictions here
                </p>
                <button
                  onClick={() => {
                    const demoSection = document.getElementById("demo");
                    if (demoSection) {
                      window.location.href = "/";
                      setTimeout(() => {
                        demoSection.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }
                  }}
                  className="mt-4 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full font-semibold transition"
                >
                  Go to Demo
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {predictions.map((prediction, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-2xl backdrop-blur-sm border-2 ${getPredictionBgColor(
                      prediction.prediction
                    )} shadow-xl relative`}
                  >
                    <button
                      onClick={() => deletePrediction(index)}
                      className="absolute top-4 right-4 p-2 bg-red-500/50 hover:bg-red-500/70 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>

                    <div className="mb-4 pr-8">
                      <h3 className="text-sm text-gray-400 mb-1">URL</h3>
                      <div className="flex items-center gap-2">
                        <p className="text-cyan-300 break-all font-mono text-sm flex-1">
                          {prediction.url}
                        </p>
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

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-black/30 p-3 rounded-xl">
                        <p className="text-white/70 text-xs mb-1">Prediction</p>
                        <p
                          className={`text-xl font-bold ${getPredictionColor(
                            prediction.prediction
                          )}`}
                        >
                          {prediction.prediction}
                        </p>
                      </div>

                      <div className="bg-black/30 p-3 rounded-xl">
                        <p className="text-white/70 text-xs mb-1">Confidence</p>
                        <p className="text-xl font-bold text-cyan-400">
                          {(prediction.confidence * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>

                    <div className="bg-black/30 p-3 rounded-xl">
                      <p className="text-white/70 text-xs mb-2">Phishing Probability</p>
                      <div className="w-full bg-gray-700/50 rounded-full h-3 mb-2">
                        <div
                          className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                          style={{
                            width: `${(prediction.phishing_probability * 100).toFixed(2)}%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-white text-sm font-semibold">
                        {(prediction.phishing_probability * 100).toFixed(1)}%
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
        </motion.div>
      </div>
    </div>
  );
}

