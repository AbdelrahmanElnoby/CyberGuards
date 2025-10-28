import { useState } from "react";
import logo from "../../assets/images/11.png";

export default function Navbar({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const links = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "about", label: "About Us" },
    { id: "technology", label: "Technology" },
    { id: "features", label: "Features" },
    { id: "usecases", label: "Use Cases" },
    { id: "demo", label: "Demo" },
    { id: "contact", label: "Contact Us" },
  ];

  const handleNavigate = (path) => {
    window.location.href = path;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <nav className="flex items-center justify-between px-6 py-4 lg:px-10 max-w-[1400px] mx-auto">
        {/* Logo */}
        <button
          onClick={() => scrollToSection("home")}
          className="flex items-center gap-2 group"
        >
          <img
            src={logo}
            width={120}
            alt="Cyber Guards Logo"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </button>

        {/* Hamburger (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white p-2 rounded-md hover:bg-white/20 transition"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                isOpen
                  ? "M6 18L18 6M6 6l12 12" // X icon
                  : "M4 6h16M4 12h16M4 18h16" // hamburger
              }
            />
          </svg>
        </button>

        {/* Desktop Links */}
        <div className="hidden lg:flex flex-wrap justify-center gap-x-8 gap-y-2 text-white font-medium drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`transition-all duration-300 ${
                activeSection === link.id
                  ? "text-cyan-300 underline underline-offset-8"
                  : "hover:text-cyan-300"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden lg:flex gap-4 text-white font-medium drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">
          <button
            onClick={() => handleNavigate("/register")}
            className="px-4 py-2 border border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition"
          >
            Register
          </button>
          <button
            onClick={() => handleNavigate("/login")}
            className="px-4 py-2 border border-white/50 rounded-full hover:bg-white hover:text-black transition"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/95 flex flex-col items-center justify-center space-y-8 text-white text-xl font-medium transition-all duration-300">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`transition-colors duration-300 ${
                activeSection === link.id
                  ? "text-yellow-300 scale-110"
                  : "hover:text-yellow-300"
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="flex gap-6 pt-8">
            <button
              onClick={() => handleNavigate("/register")}
              className="px-6 py-2 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition"
            >
              Register
            </button>
            <button
              onClick={() => handleNavigate("/login")}
              className="px-6 py-2 rounded-full border border-white text-white hover:bg-white hover:text-black transition"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
