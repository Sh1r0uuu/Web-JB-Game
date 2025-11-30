import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import accountService from '../services/accountService';
import { Search, Gamepad2, AlertCircle, Filter, Sparkles, ShoppingBag } from 'lucide-react'; // Heart dihapus

export default function ExplorePage() {
  // ... (State & useEffect sama persis, tidak ada perubahan) ...
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => { if (location.state?.search) { setSearch(location.state.search); } }, [location.state]);
  useEffect(() => {
    const fetchData = async () => {
      try { setLoading(true); const data = await accountService.getAll(); setAccounts(data || []); setFilteredAccounts(data || []); } 
      catch (err) { console.error("Gagal ambil data", err); } finally { setLoading(false); }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!accounts) return;
    const results = accounts.filter(acc => {
      const searchTerm = search.toLowerCase();
      return acc.title?.toLowerCase().includes(searchTerm) || acc.games?.name?.toLowerCase().includes(searchTerm);
    });
    setFilteredAccounts(results);
  }, [search, accounts]);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white pb-24 font-sans">
      {/* Header Sticky */}
      <div className="sticky top-0 z-30 bg-[#0F172A]/95 backdrop-blur-xl border-b border-white/5 px-4 pt-4 pb-4 md:px-6 md:pt-6">
        <div className="flex justify-between items-center mb-4">
          <div><h1 className="text-2xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Explore</h1><p className="text-slate-400 text-[10px] md:text-xs mt-0.5">Temukan akun impianmu</p></div>
          <div className="p-2 bg-[#1E293B] rounded-xl border border-white/10 shadow-lg shadow-violet-500/10"><Sparkles className="text-violet-400 animate-pulse" size={18} /></div>
        </div>
        <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative flex items-center bg-[#1E293B] rounded-xl border border-white/10">
                <div className="pl-3 text-slate-400"><Search size={18} /></div>
                <input type="text" placeholder="Cari 'Mobile Legends', 'Sultan'..." className="w-full p-3 bg-transparent text-white text-sm focus:outline-none placeholder-slate-500" value={search} onChange={(e) => setSearch(e.target.value)}/>
                
            </div>
        </div>
      </div>

      <div className="px-4 md:px-6 mt-6">
        {loading && <div className="flex flex-col items-center justify-center py-20 gap-3"><div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div><p className="text-violet-400 text-xs tracking-widest">SCANNING...</p></div>}
        {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAccounts.length > 0 ? (
                filteredAccounts.map((account) => (
                <div key={account.id} onClick={() => navigate(`/account/${account.id}`)} className="group bg-[#1E293B] rounded-2xl overflow-hidden border border-white/5 hover:border-violet-500/50 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1">
                    <div className="h-48 bg-slate-800 relative overflow-hidden">
                        <img src={account.image_url || "https://placehold.co/600x400?text=No+Image"} alt={account.title} className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${account.is_sold ? 'grayscale' : ''}`}/>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-transparent opacity-80"></div>
                        <span className="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/10">{account.games?.name}</span>
                        {/* TOMBOL FAVORIT DIHAPUS DARI SINI */}
                        {account.is_sold && <div className="absolute inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm"><span className="text-red-500 font-black text-xl border-4 border-red-500 px-4 py-1 rounded -rotate-12">SOLD</span></div>}
                    </div>
                    
                    <div className="p-4 relative">
                        <div className="absolute -top-5 right-3 w-10 h-10 rounded-full bg-[#1E293B] p-1">
                            <div className="w-full h-full rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold text-white">{account.sellers?.name ? account.sellers.name.charAt(0) : 'U'}</div>
                        </div>
                        <h3 className="font-bold text-white mb-1 line-clamp-1 group-hover:text-violet-400 transition-colors text-lg">{account.title}</h3>
                        <p className="text-slate-400 text-xs line-clamp-1 mb-4">{account.description}</p>
                        <div className="flex justify-between items-center border-t border-white/5 pt-3">
                            <div>
                                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Harga</p>
                                <p className={`font-bold text-base ${account.is_sold ? 'text-slate-500 line-through' : 'text-cyan-400'}`}>Rp {parseInt(account.price).toLocaleString('id-ID')}</p>
                            </div>
                            {!account.is_sold && <button className="bg-white/5 hover:bg-violet-600 hover:text-white text-slate-400 p-2 rounded-lg transition-all"><ShoppingBag size={16} /></button>}
                        </div>
                    </div>
                </div>
                ))
            ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-500 opacity-60"><AlertCircle size={48} className="mb-3" /><p className="text-sm">Tidak ada akun yang cocok.</p></div>
            )}
            </div>
        )}
      </div>
    </div>
  );
}