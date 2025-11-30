import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import accountService from '../services/accountService';
import FavoriteButton from '../components/FavoriteButton'; 
import { ShoppingBag, Gamepad2, Rocket, ShieldCheck, Zap, Search, Flame, Trophy, User, ChevronDown, ChevronUp } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const popularGames = [
    { name: "Mobile Legends", img: "https://play-lh.googleusercontent.com/MakersXM5uM985e35wK3z_jZqWc_rF_1i5_45_54_54", hot: true },
    { name: "Valorant", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/1200px-Valorant_logo_-_pink_color_version.svg.png", hot: true },
    { name: "PUBG Mobile", img: "https://w7.pngwing.com/pngs/380/764/png-transparent-pubg-mobile-logo.png", hot: false },
    { name: "Genshin Impact", img: "https://play-lh.googleusercontent.com/85WrwqB_h1C56v8Jd8gW5_55_55_55", hot: false },
    { name: "Free Fire", img: "https://w7.pngwing.com/pngs/689/542/png-transparent-garena-free-fire-logo.png", hot: false },
    { name: "Honkai: Star Rail", img: "https://upload.wikimedia.org/wikipedia/en/thumb/9/96/Honkai_Star_Rail_logo.svg/1200px-Honkai_Star_Rail_logo.svg.png", hot: true },
    { name: "Wuthering Waves", img: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/Wuthering_Waves_logo.svg/1200px-Wuthering_Waves_logo.svg.png", hot: true },
    { name: "Clash of Clans", img: "https://upload.wikimedia.org/wikipedia/en/5/59/Clash_of_Clans_Logo.png", hot: false },
    { name: "CODM", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Call_of_Duty_Mobile_Logo.png/800px-Call_of-Duty_Mobile_Logo.png", hot: false },
    { name: "Clash Royale", img: "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Clash_Royale_logo.svg/1200px-Clash_Royale_logo.svg.png", hot: false },
  ];
  
  const [showAllGames, setShowAllGames] = useState(false);
  const displayedGames = showAllGames ? popularGames : popularGames.slice(0, 5);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await accountService.getAll();
        setAccounts(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleGameClick = (gameName) => {
    navigate('/explore', { state: { search: gameName } });
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center gap-4">
      <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-violet-400 font-bold tracking-widest animate-pulse">INITIALIZING...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0F172A] text-white pb-24 font-sans selection:bg-violet-500 selection:text-white overflow-x-hidden">
      
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-violet-600/20 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-80 h-80 bg-cyan-500/10 rounded-full blur-[128px]"></div>
      </div>

      <header className="fixed top-0 w-full z-50 bg-[#0F172A]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 p-2 rounded-lg shadow-lg shadow-violet-500/20">
              <img src="/app-logo-192.png" alt="Logo" className="w-7 h-7 object-contain" />
            </div>
            <h1 className="text-xl font-bold tracking-wide">
              GGEZ<span className="text-violet-400">Store</span>
            </h1>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <input 
              type="text" 
              placeholder="Cari akun impian..." 
              className="w-full bg-[#1E293B] border border-white/10 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-white placeholder-slate-500 cursor-pointer hover:bg-[#253247]"
              onClick={() => navigate('/explore')}
              readOnly
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          </div>

          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-[2px] cursor-pointer hover:scale-105 transition-transform" onClick={() => navigate('/profil')}>
             <div className="w-full h-full rounded-full bg-[#0F172A] flex items-center justify-center overflow-hidden">
                <User size={20} className="text-white"/>
             </div>
          </div>
        </div>
      </header>

      <section className="relative pt-32 pb-12 px-6 z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-bold mb-6 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            MARKETPLACE AKUN GAME #1 INDONESIA
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
            Level Up Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-white">Gaming Experience</span>
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button onClick={() => navigate('/explore')} className="px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl shadow-lg shadow-violet-600/25 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
              <Rocket size={20} /> Mulai Eksplorasi
            </button>
            <button onClick={() => navigate('/jual')} className="px-8 py-4 bg-[#1E293B] hover:bg-[#283547] text-white border border-white/5 font-bold rounded-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
              Jual Akun
            </button>
          </div>

          <div className="border-t border-white/5 pt-10">
            <div className="flex items-center justify-center gap-2 mb-8">
                <Trophy className="text-yellow-500 fill-yellow-500" size={20} />
                <h3 className="text-lg font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600">
                    TOP POPULAR GAMES
                </h3>
                <Trophy className="text-yellow-500 fill-yellow-500" size={20} />
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 max-w-4xl mx-auto transition-all duration-500 ease-in-out">
              {displayedGames.map((game, index) => (
                <div 
                  key={index}
                  onClick={() => handleGameClick(game.name)}
                  className="group relative bg-[#1E293B]/60 border border-white/5 hover:border-violet-500/50 rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-violet-600/20 overflow-hidden flex flex-col items-center gap-3"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 to-fuchsia-600/0 group-hover:from-violet-600/20 group-hover:to-fuchsia-600/20 transition-all duration-500"></div>
                  
                  {game.hot && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-bl-lg z-20 flex items-center gap-1">
                        <Flame size={8} className="fill-white"/> HOT
                    </div>
                  )}

                  <div className="relative z-10 w-14 h-14 md:w-16 md:h-16 bg-[#0F172A] rounded-xl p-2 flex items-center justify-center shadow-inner border border-white/5 group-hover:scale-110 transition-transform duration-300 group-hover:border-violet-500/30">
                    <img src={game.img} alt={game.name} className="w-full h-full object-contain drop-shadow-lg" />
                  </div>
                  
                  <span className="relative z-10 text-[10px] md:text-xs font-bold text-slate-400 group-hover:text-white text-center uppercase tracking-wide transition-colors leading-tight">
                    {game.name}
                  </span>
                </div>
              ))}
            </div>

            {popularGames.length > 5 && (
                <button 
                  onClick={() => setShowAllGames(!showAllGames)}
                  className="mt-8 text-sm font-bold text-slate-400 hover:text-white flex items-center justify-center gap-2 mx-auto transition-colors px-4 py-2 rounded-full hover:bg-white/5"
                >
                  {showAllGames ? (
                    <>Sembunyikan <ChevronUp size={16} /></>
                  ) : (
                    <>Lihat Semua Game <ChevronDown size={16} /></>
                  )}
                </button>
            )}
          </div>

        </div>
      </section>

      <section className="py-8 px-6 relative z-10 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1E293B]/50 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-violet-500/50 transition-colors group">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform"><ShieldCheck size={24} /></div>
            <h3 className="text-lg font-bold mb-2 text-white">Aman & Terpercaya</h3><p className="text-slate-400 text-sm">Transaksi dipantau demi keamanan bersama.</p>
          </div>
          <div className="bg-[#1E293B]/50 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-violet-500/50 transition-colors group">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center text-yellow-400 mb-4 group-hover:scale-110 transition-transform"><Zap size={24} /></div>
            <h3 className="text-lg font-bold mb-2 text-white">Transaksi Kilat</h3><p className="text-slate-400 text-sm">Negosiasi langsung via WhatsApp tanpa ribet.</p>
          </div>
          <div className="bg-[#1E293B]/50 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-violet-500/50 transition-colors group">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center text-green-400 mb-4 group-hover:scale-110 transition-transform"><ShoppingBag size={24} /></div>
            <h3 className="text-lg font-bold mb-2 text-white">Harga Terbaik</h3><p className="text-slate-400 text-sm">Pilihan akun dari harga pelajar hingga sultan.</p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2 text-white"><Flame className="text-orange-500 fill-orange-500 animate-pulse" /> Trending Now</h2>
            <p className="text-slate-400 mt-1">Akun-akun panas yang baru saja diupload.</p>
          </div>
          <button onClick={() => navigate('/explore')} className="text-violet-400 hover:text-violet-300 text-sm font-semibold flex items-center gap-1">Lihat Semua <Rocket size={14}/></button>
        </div>
        
        {accounts.length === 0 ? (
           <div className="bg-[#1E293B]/30 border border-dashed border-slate-700 rounded-3xl p-12 text-center">
             <p className="text-slate-500">Belum ada akun yang dijual saat ini.</p>
             <button onClick={() => navigate('/jual')} className="mt-4 text-violet-400 font-bold hover:underline">Jadilah Penjual Pertama!</button>
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {accounts.map((account) => (
              <div key={account.id} onClick={() => navigate(`/account/${account.id}`)} className="group bg-[#1E293B] rounded-2xl overflow-hidden border border-white/5 hover:border-violet-500/50 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-2">
                <div className="h-52 bg-slate-800 relative overflow-hidden">
                  <img src={account.image_url || "https://placehold.co/600x400?text=No+Image"} alt={account.title} className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${account.is_sold ? 'grayscale opacity-50' : ''}`}/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-transparent opacity-80"></div>
                  <span className="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 flex items-center gap-1"><Gamepad2 size={10}/> {account.games?.name}</span>
                  <div className="absolute top-2 right-2 z-20"><FavoriteButton account={account} /></div>
                  {account.is_sold && <div className="absolute inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm"><span className="text-red-500 font-black text-xl border-4 border-red-500 px-4 py-1 rounded -rotate-12 shadow-lg shadow-red-500/20">SOLD</span></div>}
                </div>
                <div className="p-5 relative">
                  <div className="absolute -top-6 right-4 w-10 h-10 rounded-full bg-[#1E293B] p-1">
                    <div className="w-full h-full rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">{account.sellers?.name ? account.sellers.name.charAt(0) : 'U'}</div>
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2 line-clamp-1 group-hover:text-violet-400 transition-colors">{account.title}</h3>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Harga</p>
                      <p className={`text-lg font-bold ${account.is_sold ? 'text-slate-500 line-through' : 'text-violet-400'}`}>Rp {parseInt(account.price).toLocaleString('id-ID')}</p>
                    </div>
                    {!account.is_sold && <button className="bg-white/5 hover:bg-violet-600 hover:text-white text-slate-400 p-2.5 rounded-xl transition-all group-hover:bg-violet-600 group-hover:text-white"><ShoppingBag size={18} /></button>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}