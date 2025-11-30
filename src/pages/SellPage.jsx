import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import accountService from "../services/accountService";
import userService from "../services/userService";
import { Send, Gamepad2, Link, User } from "lucide-react"; // Tambah Icon User
import toast from 'react-hot-toast';

export default function SellPage() {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // State Data
  const [formData, setFormData] = useState({
    title: "", 
    game_id: "", 
    price: "", 
    description: "", 
    image_url: "", 
    seller_name: "", 
    seller_wa: "",
    seller_id: "" // Tambahan ID
  });

  // 1. Cek Login & Autofill Data
  useEffect(() => {
    const user = userService.getUser();
    if (!user) {
      toast.error("Anda harus login untuk menjual akun!");
      navigate("/login");
    } else {
        // ISI OTOMATIS DARI PROFIL
        setFormData(prev => ({
            ...prev, 
            seller_name: user.name, 
            seller_wa: user.whatsapp_number,
            seller_id: user.id // Simpan ID user
        }));
    }
  }, []);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await accountService.getGames();
        setGames(data || []);
      } catch (err) { console.error("Gagal ambil game", err); }
    };
    fetchGames();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Format Rupiah
    if (name === 'price') {
        const rawValue = value.replace(/\D/g, '');
        setFormData({ ...formData, price: rawValue });
    } else {
        setFormData({ ...formData, [name]: value });
    }
  };

  const formatDisplayPrice = (price) => {
    if (!price) return "";
    return parseInt(price).toLocaleString('id-ID');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!formData.game_id) { toast.error("Pilih game!"); setLoading(false); return; }
      
      // Kirim data (termasuk seller_id)
      await accountService.create(formData);
      
      toast.success("Berhasil memposting akun!");
      navigate("/"); 
    } catch (error) {
      toast.error("Gagal posting: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#13141f] text-white pb-24 px-4 pt-6 font-sans">
      <h1 className="text-2xl font-bold text-white mb-6">Jual Akun Kamu</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Judul */}
        <div className="bg-[#1e1f2b] p-4 rounded-xl border border-white/5">
          <label className="block text-sm text-gray-400 mb-2">Judul Iklan</label>
          <input 
            type="text" name="title" required placeholder="Contoh: Akun ML Sultan" 
            className="w-full bg-[#13141f] p-3 rounded text-white border border-gray-700 outline-none focus:border-blue-500"
            onChange={handleChange} 
          />
        </div>

        {/* Game & Harga */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#1e1f2b] p-4 rounded-xl border border-white/5">
            <label className="block text-sm text-gray-400 mb-2">Game</label>
            <select name="game_id" required className="w-full bg-[#13141f] p-3 rounded text-white border border-gray-700 outline-none" onChange={handleChange}>
              <option value="">-- Pilih --</option>
              {games.map((g) => (<option key={g.id} value={g.id}>{g.name}</option>))}
            </select>
          </div>
          <div className="bg-[#1e1f2b] p-4 rounded-xl border border-white/5">
            <label className="block text-sm text-gray-400 mb-2">Harga (Rp)</label>
            <input 
                type="text" name="price" required placeholder="50.000"
                className="w-full bg-[#13141f] p-3 rounded text-white border border-gray-700 outline-none" 
                value={formatDisplayPrice(formData.price)} onChange={handleChange} 
            />
          </div>
        </div>

        {/* Spesifikasi */}
        <div className="bg-[#1e1f2b] p-4 rounded-xl border border-white/5">
          <label className="block text-sm text-gray-400 mb-2">Spesifikasi</label>
          <textarea name="description" required rows="4" placeholder="Detail akun..." className="w-full bg-[#13141f] p-3 rounded text-white border border-gray-700 outline-none resize-none" onChange={handleChange}></textarea>
        </div>

        {/* Link Gambar */}
        <div className="bg-[#1e1f2b] p-4 rounded-xl border border-white/5">
          <label className="block text-sm text-gray-400 mb-2">Link Gambar (URL)</label>
          <div className="flex gap-2">
            <input type="url" name="image_url" required placeholder="https://..." className="w-full bg-[#13141f] p-3 rounded text-white border border-gray-700 outline-none text-sm" onChange={handleChange} />
            <div className="bg-[#2c2d3a] p-3 rounded-lg"><Link size={20} className="text-gray-400" /></div>
          </div>
        </div>

        {/* Data Penjual (OTOMATIS & TERKUNCI) */}
        <div className="bg-[#1e1f2b] p-5 rounded-xl border border-blue-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-600 text-[10px] font-bold px-3 py-1 rounded-bl-xl text-white">
            AUTO-FILL DARI PROFIL
          </div>
          <h3 className="font-bold text-blue-400 mb-4 text-sm uppercase flex items-center gap-2">
            <User size={16}/> Identitas Penjual
          </h3>
          <div className="space-y-4">
            <div>
                <label className="text-[10px] text-gray-500 uppercase font-bold">Nama Penjual</label>
                <input 
                    type="text" value={formData.seller_name} disabled 
                    className="w-full bg-[#13141f] p-2 rounded text-gray-400 border border-gray-700 cursor-not-allowed mt-1" 
                />
            </div>
            <div>
                <label className="text-[10px] text-gray-500 uppercase font-bold">WhatsApp</label>
                <input 
                    type="text" value={formData.seller_wa} disabled 
                    className="w-full bg-[#13141f] p-2 rounded text-gray-400 border border-gray-700 cursor-not-allowed mt-1" 
                />
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50">
          {loading ? "Sedang Memposting..." : (<> <Send size={18} /> Posting Iklan Sekarang </>)}
        </button>

      </form>
    </div>
  );
}