import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import accountService from '../services/accountService';
import userService from '../services/userService';
import { ArrowLeft, MessageCircle, User, Gamepad2, ShieldCheck, Edit, Trash2, CheckCircle, X, ZoomIn } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmModal from '../components/ConfirmModal';
import FavoriteButton from '../components/FavoriteButton';

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isImageOpen, setIsImageOpen] = useState(false); // State untuk Modal Gambar

  const currentUser = userService.getUser();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSoldModal, setShowSoldModal] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const response = await accountService.getById(id);
        setAccount(response);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchDetail();
  }, [id]);

  const isOwner = currentUser && account && currentUser.id === account.seller_id;

  const handleBuy = () => {
    if (!account) return;
    const message = `Halo, saya tertarik dengan akun *${account.title}*...`;
    window.open(`https://wa.me/${account.sellers?.whatsapp_number}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const confirmDelete = async () => {
    try { await accountService.delete(id); setShowDeleteModal(false); toast.success("Akun dihapus"); navigate('/'); } catch (e) { toast.error("Gagal hapus"); }
  };

  const confirmSold = async () => {
    try {
        const updated = { ...account, is_sold: true };
        await accountService.update(id, updated);
        setAccount(updated);
        setShowSoldModal(false);
        toast.success("Status Sold Out!");
    } catch(e) { toast.error("Gagal update"); }
  };

  if (loading) return <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-violet-500">Loading...</div>;
  if (!account) return <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-red-500">404 Not Found</div>;

  return (
    <div className="min-h-screen bg-[#0F172A] text-white pb-28 font-sans">
      
      <ConfirmModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={confirmDelete} title="Hapus?" message="Yakin hapus akun ini?" isDanger={true}/>
      <ConfirmModal isOpen={showSoldModal} onClose={() => setShowSoldModal(false)} onConfirm={confirmSold} title="Tandai Terjual?" message="Akun akan dilabeli SOLD OUT."/>

      {/* --- MODAL GAMBAR FULL SCREEN --- */}
      {isImageOpen && (
        <div 
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in cursor-zoom-out"
            onClick={() => setIsImageOpen(false)}
        >
            <button className="absolute top-4 right-4 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all">
                <X size={24} />
            </button>
            <img 
                src={account.image_url} 
                alt={account.title} 
                className="max-w-full max-h-full rounded-lg shadow-2xl object-contain transform transition-transform duration-300 scale-100"
                onClick={(e) => e.stopPropagation()} // Biar diklik gambarnya gak nutup
            />
        </div>
      )}

      {/* Header Fixed */}
      <div className="fixed top-0 left-0 right-0 p-4 z-30 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto flex gap-2">
            <button onClick={() => navigate(-1)} className="p-3 bg-[#0F172A]/60 backdrop-blur-md rounded-full hover:bg-white/10 border border-white/10 shadow-lg">
            <ArrowLeft size={20} />
            </button>
        </div>

        <div className="pointer-events-auto flex gap-2 items-center">
            <FavoriteButton account={account} className="bg-[#0F172A]/60 backdrop-blur-md border border-white/10 w-11 h-11 flex items-center justify-center shadow-lg" />
            {isOwner && (
                <>
                <button onClick={() => navigate(`/edit/${id}`)} className="p-3 bg-[#0F172A]/60 backdrop-blur-md rounded-full text-cyan-400 border border-cyan-500/30 shadow-lg"><Edit size={18}/></button>
                <button onClick={() => setShowDeleteModal(true)} className="p-3 bg-[#0F172A]/60 backdrop-blur-md rounded-full text-red-400 border border-red-500/30 shadow-lg"><Trash2 size={18}/></button>
                </>
            )}
        </div>
      </div>

      {/* GAMBAR UTAMA (Hero) */}
      <div className="relative w-full h-[50vh] group cursor-pointer" onClick={() => setIsImageOpen(true)}>
        <img src={account.image_url} alt={account.title} className="w-full h-full object-cover"/>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent"></div>
        
        {/* Icon Zoom saat Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
            <div className="bg-black/50 p-3 rounded-full text-white border border-white/20 backdrop-blur-md">
                <ZoomIn size={32} />
            </div>
        </div>

        {account.is_sold && <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm"><span className="text-3xl font-black text-red-500 border-4 border-red-500 px-6 py-2 rounded-xl -rotate-12 tracking-widest shadow-2xl">SOLD</span></div>}
      </div>

      <div className="px-6 -mt-16 relative z-10">
        {/* Badge Game */}
        <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-violet-600 text-white px-3 py-1.5 rounded-xl text-[10px] font-bold flex items-center gap-1.5 shadow-lg shadow-violet-600/40 border border-violet-400/20">
              <Gamepad2 size={14} /> {account.games?.name}
            </span>
            <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1.5 rounded-xl text-[10px] font-bold flex items-center gap-1.5 border border-cyan-500/20 backdrop-blur-md">
              <ShieldCheck size={14} /> Verified Seller
            </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black leading-tight mb-2 text-white drop-shadow-lg">{account.title}</h1>
        
        {/* Card Harga & Penjual */}
        <div className="bg-[#1E293B]/80 backdrop-blur-xl p-5 rounded-3xl border border-white/10 mb-8 mt-6 shadow-2xl flex justify-between items-center relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
           
           <div className="relative z-10">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1 font-bold">Harga Penawaran</p>
              <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                Rp {parseInt(account.price).toLocaleString('id-ID')}
              </p>
           </div>
           
           <div className="relative z-10 text-right pl-6 border-l border-white/10">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1 font-bold">Penjual</p>
              <div className="flex items-center gap-3 justify-end">
                  <p className="text-sm font-bold text-violet-300">{account.sellers?.name}</p>
                  <div className="w-10 h-10 bg-gradient-to-tr from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center text-sm font-bold shadow-lg ring-2 ring-[#0F172A]">
                    {account.sellers?.name?.charAt(0)}
                  </div>
              </div>
           </div>
        </div>

        {/* Spesifikasi */}
        <div className="mb-10">
          <h3 className="font-bold text-lg mb-4 text-white flex items-center gap-3">
            <div className="w-1.5 h-6 bg-cyan-500 rounded-full shadow-[0_0_10px_cyan]"></div> 
            Spesifikasi Akun
          </h3>
          <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line bg-[#1E293B]/40 p-6 rounded-3xl border border-white/5 shadow-inner">
            {account.description}
          </div>
        </div>

        {isOwner && !account.is_sold && (
            <button onClick={() => setShowSoldModal(true)} className="w-full py-4 border-2 border-dashed border-slate-600 text-slate-400 font-bold rounded-2xl hover:border-red-500 hover:text-red-500 hover:bg-red-500/5 transition-all text-sm uppercase tracking-wider mb-4">
                Tandai Sebagai Terjual
            </button>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0F172A]/80 backdrop-blur-xl p-5 border-t border-white/5 z-40 pb-safe">
        <div className="max-w-2xl mx-auto">
            <button 
                onClick={handleBuy} 
                disabled={account.is_sold} 
                className={`w-full font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl text-lg transition-all active:scale-95 ${
                    account.is_sold 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5' 
                    : 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-emerald-500/20'
                }`}
            >
                <MessageCircle size={22} /> {account.is_sold ? 'Barang Habis' : 'Hubungi Penjual'}
            </button>
        </div>
      </div>
    </div>
  );
}