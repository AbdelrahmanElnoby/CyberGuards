import Navbar from '../Navbar/Navbar.jsx'
import { Outlet } from 'react-router-dom'
import bgImage from '../../assets/screens/1.jpg'  // عدّل المسار حسب مكان الصورة

export default function Layout() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center relative bg-full"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay لتوضيح النصوص */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* المحتوى */}
      <div className="relative z-10">
        <Navbar />
        <div className="container mt-4 py-12">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
