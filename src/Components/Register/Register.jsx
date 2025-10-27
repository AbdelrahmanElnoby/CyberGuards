import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/screens/1.jpg"; // عدّل المسار حسب مكان الصورة

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
      const response = await axios.post(
        "http://authtest.duckdns.org/api/auth/register",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      setSuccessMsg("✅ Registration successful!");
      console.log("Response:", response.data);

      setTimeout(() => {
        navigate("/home");
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
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Card */}
      <div className="relative z-10 bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-lg font-medium rounded-lg text-white transition-all duration-300 ${loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {errorMsg && (
            <p className="text-red-600 text-sm text-center font-medium mt-2">
              {errorMsg}
            </p>
          )}
          {successMsg && (
            <p className="text-green-600 text-sm text-center font-medium mt-2">
              {successMsg}
            </p>
          )}
        </form>

        <p className="text-sm text-center mt-6 text-gray-200">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 font-medium hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
