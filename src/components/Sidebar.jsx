import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, PlusSquare, User, Heart, LogOut } from 'lucide-react';
import userService from '../services/userService';
import toast from 'react-hot-toast';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const user = userService.getUser();

  const handleSellClick = () => {
    if (user) {
      navigate('/jual');
    } else {
      toast.error("Silakan login untuk menjual akun!");
      navigate('/login');
    }
  };

  const confirmLogout = () => {
    userService.logout();
    setShowLogoutModal(false);
    toast.success("Anda telah logout.");
  };

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-[#1E293B] border-r border-white/5 fixed left-0 top-0 z-50 p-6">
      
      <ConfirmModal 
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
        title="Konfirmasi Logout"
        message="Apakah Anda yakin ingin keluar dari sesi ini?"
        isDanger={true}
      />
      
      <div className="flex items-center gap-3 mb-10 cursor-pointer" onClick={() => navigate('/')}>
        <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 p-2 rounded-lg shadow-lg shadow-violet-500/20">
            <img 
                src="/app-logo-192.png" 
                alt="GGEZ Store Logo" 
                className="w-7 h-7 object-contain" 
            />
        </div>
        <h1 className="text-xl font-bold text-white tracking-wide">
            GGEZ<span className="text-violet-400">Store</span>
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        <SidebarItem icon={<Home size={20} />} label="Beranda" active={isActive('/')} onClick={() => navigate('/')} />
        <SidebarItem icon={<Search size={20} />} label="Explore" active={isActive('/explore')} onClick={() => navigate('/explore')} />
        <SidebarItem icon={<Heart size={20} />} label="Wishlist" active={isActive('/wishlist')} onClick={() => navigate('/wishlist')} />
        <SidebarItem icon={<User size={20} />} label="Profil Saya" active={isActive('/profil')} onClick={() => navigate('/profil')} />
      </nav>

      <div className="mt-auto space-y-4">
        <button 
            onClick={handleSellClick}
            className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-violet-600/20 transition-all active:scale-95"
        >
            <PlusSquare size={20} /> Jual Akun
        </button>

        {user && (
            <button 
                onClick={() => setShowLogoutModal(true)}
                className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-xl transition-all"
            >
                <LogOut size={20} />
                <span className="font-medium">Logout ({user.username})</span>
            </button>
        )}
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label, active, onClick }) {
    return (
        <button 
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                active 
                ? 'bg-violet-600/10 text-violet-400 font-bold border border-violet-600/20' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
        >
            <div className={`transition-colors ${active ? 'text-violet-400' : 'group-hover:text-white'}`}>
                {icon}
            </div>
            <span>{label}</span>
        </button>
    );
}