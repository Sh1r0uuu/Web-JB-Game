import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import wishlistService from '../services/wishlistService';
import { Heart, ShoppingBag, Trash2, AlertCircle, Gamepad2, User, Ghost } from 'lucide-react';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil data terbaru setiap kali halaman dibuka
    // PENTING: Di aplikasi real, idealnya kita fetch ulang ke API untuk cek status is_sold terbaru
    // Tapi untuk saat ini kita pakai data yang tersimpan di localStorage
    const data = wishlistService.getWishlist();
    setWishlist(data);
  }, []);

  const handleRemove = (e, account) => {
    e.stopPropagation(); 
    wishlistService.toggleWishlist(account);
    setWishlist(wishlistService.getWishlist());
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white pb-24 px-6 pt-8 font-sans">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
        <div className="p-4 bg-pink-500/10 rounded-2xl border border-pink-500/20 shadow-lg shadow-pink-500/10">
            <Heart size={28} className="text-pink-500 fill-current animate-pulse" />
        </div>
        <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              Wishlist
            </h1>
            <p className="text-slate-400 text-xs mt-1 tracking-wide">
              {wishlist.length} akun tersimpan
            </p>
        </div>
      </div>

      {/* List Akun */}
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((account) => (
            <div 
              key={account.id} 
              onClick={() => navigate(`/account/${account.id}`)}
              className="group bg-[#1E293B] rounded-3xl overflow-hidden border border-white/5 hover:border-pink-500/50 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-pink-500/10 relative"
            >
              {/* Gambar */}
              <div className="h-48 bg-slate-800 relative overflow-hidden">
                <img 
                  src={account.image_url || "https://placehold.co/600x400"} 
                  alt={account.title} 
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${account.is_sold ? 'grayscale opacity-50' : ''}`}
                />
                
                {/* Badge Game */}
                <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-pink-400 text-[10px] font-bold px-3 py-1 rounded-full border border-pink-500/30">
                  {account.games?.name}
                </span>
                
                {/* Tombol Hapus (Tong Sampah) */}
                <button 
                    onClick={(e) => handleRemove(e, account)}
                    className="absolute top-3 right-3 p-2 bg-black/40 text-white hover:bg-red-500 backdrop-blur-md rounded-full transition-all border border-white/10 z-20 hover:rotate-12"
                    title="Hapus dari wishlist"
                >
                    <Trash2 size={16} />
                </button>

                {/* --- PERBAIKAN: STATUS SOLD OUT --- */}
                {account.is_sold && (
                  <div className="absolute inset-0 bg-black/70 z-10 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xl font-black text-red-500 border-4 border-red-500 px-4 py-1 rounded-xl -rotate-12 tracking-widest shadow-2xl shadow-red-900/50">
                      SOLD OUT
                    </span>
                  </div>
                )}
              </div>

              {/* Detail */}
              <div className="p-5">
                <h3 className="font-bold text-lg text-white mb-1 line-clamp-1 group-hover:text-pink-400 transition-colors">
                  {account.title}
                </h3>
                
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 pb-4 border-b border-white/5">
                    <User size={14} /> <span>{account.sellers?.name || "Penjual"}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`font-bold text-lg ${account.is_sold ? 'text-slate-500 line-through' : 'text-pink-400'}`}>
                    Rp {parseInt(account.price).toLocaleString('id-ID')}
                  </span>
                  
                  {!account.is_sold && (
                    <button className="bg-[#13141f] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-pink-600 transition-colors border border-white/5">
                      <ShoppingBag size={14} /> Beli
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-32 text-slate-500 opacity-60">
            <div className="w-24 h-24 bg-[#1E293B] rounded-full flex items-center justify-center mb-6 shadow-inner">
              <Ghost size={40} className="text-slate-600" />
            </div>
            <p className="text-lg font-bold text-slate-400">Wishlist masih kosong.</p>
            <p className="text-xs text-slate-600 mb-6">Simpan akun impianmu di sini sebelum diambil orang!</p>
            <button onClick={() => navigate('/explore')} className="px-6 py-3 bg-[#1E293B] hover:bg-pink-600 text-white rounded-xl font-bold text-sm transition-all border border-white/10 hover:border-pink-500">
              Cari Akun Sekarang
            </button>
        </div>
      )}
    </div>
  );
}