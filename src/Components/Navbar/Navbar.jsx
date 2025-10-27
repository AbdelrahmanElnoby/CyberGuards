import { useState } from 'react';
import logo from '../../assets/images/11.png';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <nav className="flex items-center justify-between px-6 py-4 lg:px-8">
        
        {/* Logo */}
        <NavLink to={'home'}>
          <img src={logo} width={120} alt="Logo" />
        </NavLink>

        {/* Hamburger - Mobile */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white bg-transparent p-2 rounded-md hover:bg-white/20 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Links - Desktop */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-center space-x-8 capitalize text-white font-medium">
          <NavLink to={'home'} className={({ isActive }) => isActive ? "text-yellow-300" : "hover:text-yellow-300"}>home</NavLink>
          <NavLink to={'cart'} className={({ isActive }) => isActive ? "text-yellow-300" : "hover:text-yellow-300"}>cart</NavLink>
          <NavLink to={'brands'} className={({ isActive }) => isActive ? "text-yellow-300" : "hover:text-yellow-300"}>brands</NavLink>
          <NavLink to={'categories'} className={({ isActive }) => isActive ? "text-yellow-300" : "hover:text-yellow-300"}>categories</NavLink>
          <NavLink to={'products'} className={({ isActive }) => isActive ? "text-yellow-300" : "hover:text-yellow-300"}>products</NavLink>
        </div>

        {/* Auth Links - Desktop */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-4 text-white font-medium">
          <NavLink to={'/register'} className="hover:text-yellow-300">Register</NavLink>
          <NavLink to={'login'} className="hover:text-yellow-300">Login</NavLink>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-black/70 backdrop-blur-md fixed inset-0 z-40 flex flex-col items-center justify-center space-y-6 text-white text-lg capitalize">
          <NavLink to={'home'} onClick={() => setIsOpen(false)}>home</NavLink>
          <NavLink to={'cart'} onClick={() => setIsOpen(false)}>cart</NavLink>
          <NavLink to={'brands'} onClick={() => setIsOpen(false)}>brands</NavLink>
          <NavLink to={'categories'} onClick={() => setIsOpen(false)}>categories</NavLink>
          <NavLink to={'products'} onClick={() => setIsOpen(false)}>products</NavLink>
          <NavLink to={'/register'} onClick={() => setIsOpen(false)}>Register</NavLink>
          <NavLink to={'login'} onClick={() => setIsOpen(false)}>Login</NavLink>
          <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-white text-2xl">&times;</button>
        </div>
      )}
    </header>
  );
}
