import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bgImage from "../../assets/screens/1.jpg"; // عدّل المسار حسب مكان الصورة

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center p-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay لتوضيح النصوص */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* محتوى الصفحة */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg text-center border border-blue-100"
      >
        <motion.h1
          className="text-4xl font-extrabold text-blue-700 mb-3"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          👋 Welcome Home!
        </motion.h1>

        <p className="text-gray-600 text-lg mb-8">
          You’ve successfully logged in. Enjoy your stay 😄
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <button
            onClick={handleLogout}
            className="bg-blue-600 text-white font-medium px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            Logout
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
