import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import wishlistService from '../services/wishlistService';
import toast from 'react-hot-toast';

export default function FavoriteButton({ account, className = "" }) {
  const [isLiked, setIsLiked] = useState(false);

  // 1. Cek status saat halaman dimuat
  useEffect(() => {
    if (account && account.id) {
       const status = wishlistService.isWishlisted(account.id);
       setIsLiked(status);
    }
  }, [account]);

  // 2. Fungsi saat tombol diklik
  const handleToggle = (e) => {
    e.stopPropagation(); // Mencegah masuk ke halaman detail saat klik love
    
    const isAdded = wishlistService.toggleWishlist(account);
    setIsLiked(isAdded); // Update warna tombol langsung

    // Tampilkan notifikasi kecil
    if (isAdded) {
        toast.success("Disimpan ke Wishlist", { 
            icon: '❤️', 
            style: { background: '#1E293B', color: '#fff' } 
        });
    } else {
        toast.success("Dihapus dari Wishlist", { 
            icon: '💔',
            style: { background: '#1E293B', color: '#fff' } 
        });
    }
  };

  return (
    <button 
      onClick={handleToggle}
      className={`p-2 rounded-full transition-all active:scale-90 z-20 ${className} ${
        isLiked 
          ? 'bg-pink-500/20 text-pink-500 border border-pink-500/50' 
          : 'bg-black/40 text-slate-300 hover:bg-pink-500/20 hover:text-pink-400 hover:border-pink-500/30 border border-transparent'
      }`}
      title={isLiked ? "Hapus dari Wishlist" : "Tambah ke Wishlist"}
    >
      <Heart size={20} className={isLiked ? "fill-current" : ""} />
    </button>
  );
}