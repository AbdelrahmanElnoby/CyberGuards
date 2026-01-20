import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import bgImage from "../../assets/screens/1.jpg";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("❌ Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      // التسجيل
      const registerResponse = await axios.post(
        "https://authtest.skysoft-erb/api/auth/register",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      console.log("Register Response:", registerResponse.data);

      setSuccessMsg("✅ Registration successful!");
      
      // تجهيز بيانات المستخدم
      const userData = {
        id: registerResponse.data.id || registerResponse.data.user?.id,
        email: registerResponse.data.email || registerResponse.data.user?.email || formData.email,
        username: registerResponse.data.username || registerResponse.data.user?.username || formData.username,
      };

      // Save to localStorage (even if no token, we save user data)
      if (registerResponse.data.token) {
        localStorage.setItem("token", registerResponse.data.token);
      } else {
        // If no token, use a flag to indicate user is logged in
        localStorage.setItem("token", "logged_in");
      }
      localStorage.setItem("user", JSON.stringify(userData));

      // Update context from localStorage
      const token = localStorage.getItem("token");
      login(token, userData);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error(error);
      setErrorMsg(error.response?.data?.message || "❌ Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center p-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-blue-900/40 to-black/70 backdrop-blur-sm"></div>

      <div className="relative z-10 bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-8 w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6 tracking-wide">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 text-lg font-semibold rounded-lg transition-all duration-300 ${
              loading
                ? "bg-blue-400/60 text-white cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {errorMsg && <p className="text-red-400 text-sm text-center mt-2">{errorMsg}</p>}
          {successMsg && <p className="text-green-400 text-sm text-center mt-2">{successMsg}</p>}
        </form>

        <p className="text-sm text-center mt-6 text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
