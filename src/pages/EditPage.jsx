import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import accountService from "../services/accountService";
import { Save, ArrowLeft, Link } from "lucide-react";
import toast from 'react-hot-toast';

export default function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: "", game_id: "", price: "", description: "", image_url: "" });

  useEffect(() => {
    const loadData = async () => {
      try {
        const g = await accountService.getGames(); setGames(g || []);
        const a = await accountService.getById(id);
        if (a) setFormData({ title: a.title, game_id: a.game_id, price: a.price, description: a.description, image_url: a.image_url });
      } catch (err) { toast.error("Gagal load data"); navigate("/"); } finally { setLoading(false); }
    };
    loadData();
  }, [id, navigate]);

  // LOGIKA BARU INPUT HARGA
  const handleChange = (e) => {
    const { name, value } = e.target;
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
  // ------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try { await accountService.update(id, formData); toast.success("Update Berhasil!"); navigate(`/account/${id}`); } 
    catch (error) { toast.error("Gagal"); } finally { setLoading(false); }
  };

  if (loading) return <div className="min-h-screen bg-[#13141f] flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#13141f] text-white pb-24 px-4 pt-6 font-sans">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 mb-4"><ArrowLeft size={20}/> Batal</button>
      <h1 className="text-2xl font-bold mb-6">Edit Akun</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-[#1e1f2b] p-4 rounded-xl border border-white/5">
            <label className="text-sm text-gray-400">Judul</label>
            <input className="w-full bg-[#13141f] p-3 rounded text-white border border-gray-700 outline-none" name="title" value={formData.title} onChange={handleChange} required/>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1e1f2b] p-4 rounded-xl border border-white/5">
                <label className="text-sm text-gray-400">Game</label>
                <select name="game_id" value={formData.game_id} required className="w-full bg-[#13141f] p-3 rounded text-white border border-gray-700 outline-none" onChange={handleChange}>
                <option value="">-- Pilih --</option>
                {games.map((g) => (<option key={g.id} value={g.id}>{g.name}</option>))}
                </select>
            </div>
            
            {/* INPUT HARGA BARU */}
            <div className="bg-[#1e1f2b] p-4 rounded-xl border border-white/5">
                <label className="text-sm text-gray-400">Harga</label>
                <input 
                    type="text" 
                    name="price" 
                    className="w-full bg-[#13141f] p-3 rounded text-white border border-gray-700 outline-none" 
                    value={formatDisplayPrice(formData.price)} 
                    onChange={handleChange} 
                    required
                />
            </div>
        </div>

        <div className="bg-[#1e1f2b] p-4 rounded-xl border border-white/5">
            <label className="text-sm text-gray-400">Deskripsi</label>
            <textarea className="w-full bg-[#13141f] p-3 rounded text-white border border-gray-700 outline-none" rows="4" value={formData.description} onChange={handleChange} required></textarea>
        </div>
        
        <div className="bg-[#1e1f2b] p-4 rounded-xl border border-white/5">
            <label className="text-sm text-gray-400">Link Gambar</label>
            <div className="flex gap-2">
                <input type="url" name="image_url" className="w-full bg-[#13141f] p-3 rounded text-white border border-gray-700 outline-none text-sm" value={formData.image_url} onChange={handleChange} required/>
                <div className="bg-[#2c2d3a] p-3 rounded"><Link size={20} className="text-gray-400"/></div>
            </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
           {loading ? "Menyimpan..." : <><Save size={18} /> Simpan Perubahan</>} 
        </button>
      </form>
    </div>
  );
}