import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, PlusSquare, User, Heart } from 'lucide-react';
import userService from '../services/userService';
import toast from 'react-hot-toast';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const user = userService.getUser();

  const handleSellClick = () => {
    if (user) {
      navigate('/jual');
    } else {
      toast.error("Silakan login untuk menjual akun!");
      navigate('/login');
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0F172A]/80 backdrop-blur-xl border-t border-white/5 z-50 pb-safe h-20">
      <div className="flex justify-around items-center h-full max-w-md mx-auto px-4">
        
        <button onClick={() => navigate('/')} className={`flex flex-col items-center transition-all ${isActive('/') ? 'text-violet-400 scale-110' : 'text-slate-500 hover:text-slate-300'}`}>
          <Home size={22} className={isActive('/') ? "fill-violet-400/20" : ""} />
        </button>

        <button onClick={() => navigate('/explore')} className={`flex flex-col items-center transition-all ${isActive('/explore') ? 'text-violet-400 scale-110' : 'text-slate-500 hover:text-slate-300'}`}>
          <Search size={22} />
        </button>

        <button onClick={handleSellClick} className="relative -top-6">
          <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 p-4 rounded-2xl shadow-lg shadow-violet-600/40 border-4 border-[#0F172A] hover:scale-105 transition-transform">
            <PlusSquare size={24} className="text-white" />
          </div>
        </button>

        <button onClick={() => navigate('/wishlist')} className={`flex flex-col items-center transition-all ${isActive('/wishlist') ? 'text-pink-500 scale-110' : 'text-slate-500 hover:text-slate-300'}`}>
          <Heart size={22} className={isActive('/wishlist') ? "fill-pink-500/20" : ""} />
        </button>

        <button onClick={() => navigate('/profil')} className={`flex flex-col items-center transition-all ${isActive('/profil') ? 'text-violet-400 scale-110' : 'text-slate-500 hover:text-slate-300'}`}>
          <User size={22} className={isActive('/profil') ? "fill-violet-400/20" : ""} />
        </button>

      </div>
    </div>
  );
}