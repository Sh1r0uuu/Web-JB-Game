import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import { LogOut, LogIn, User, Phone, Mail, Edit2, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // State untuk form edit
  const [formData, setFormData] = useState({
    name: '',
    whatsapp_number: '',
    bio: ''
  });

  useEffect(() => {
    // Gunakan getUser() sesuai userService yang baru
    const currentUser = userService.getUser();
    setUser(currentUser);

    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        whatsapp_number: currentUser.whatsapp_number || '',
        bio: currentUser.bio || ''
      });
    }
  }, []);

  const handleLogout = () => {
    if (confirm("Yakin ingin keluar?")) {
      userService.logout();
    }
  };

  const handleSave = async () => {
    try {
      // Panggil fungsi update di service
      const updatedUser = await userService.updateProfile(user.id, formData);
      setUser(updatedUser);
      setIsEditing(false);
      toast.success("Profil berhasil diperbarui!");
    } catch (error) {
      toast.error("Gagal update profil");
      console.error(error);
    }
  };

  // Tampilan Jika Belum Login
  if (!user) return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center text-white gap-5 px-4 text-center">
        <div className="w-20 h-20 bg-[#1E293B] rounded-full flex items-center justify-center shadow-xl border border-white/5">
            <User size={40} className="text-slate-500"/>
        </div>
        <div>
            <h2 className="text-xl font-bold">Anda belum login</h2>
            <p className="text-slate-400 text-sm mt-1">Silakan login untuk menjual & menyimpan akun.</p>
        </div>
        <button onClick={() => navigate('/login')} className="bg-violet-600 hover:bg-violet-700 px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-all text-white">
            <LogIn size={20} /> Login Sekarang
        </button>
    </div>
  );

  // Tampilan Jika Sudah Login
  return (
    <div className="min-h-screen bg-[#0F172A] text-white pb-24 font-sans px-4 pt-8">
      <h1 className="text-3xl font-black text-center mb-8 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
        Profil Saya
      </h1>

      <div className="bg-[#1E293B] rounded-3xl p-6 border border-white/5 shadow-2xl overflow-hidden max-w-md mx-auto">
        <div className="text-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full mx-auto flex items-center justify-center text-4xl font-bold mb-4 shadow-lg text-white">
                {user.name ? user.name.charAt(0) : "U"}
            </div>
            
            {isEditing ? (
              <input 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="bg-[#0F172A] text-white text-center font-bold text-xl p-2 rounded border border-white/10 w-full mb-1 focus:border-violet-500 outline-none"
              />
            ) : (
              <h2 className="text-2xl font-bold text-white">{user.name}</h2>
            )}
            
            <p className="text-cyan-400 text-sm uppercase tracking-wide mt-1">{user.role}</p>
        </div>

        <div className="space-y-4 bg-[#0F172A]/50 p-5 rounded-2xl border border-white/5">
            {/* WhatsApp Section */}
            <div className="flex items-center gap-3">
                <Phone className="text-green-500 flex-shrink-0" size={18}/>
                <div className="w-full">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">WhatsApp</p>
                  {isEditing ? (
                    <input 
                      value={formData.whatsapp_number}
                      onChange={(e) => setFormData({...formData, whatsapp_number: e.target.value})}
                      className="bg-transparent border-b border-slate-600 w-full text-sm py-1 focus:border-green-500 outline-none"
                    />
                  ) : (
                    <p className="text-sm">{user.whatsapp_number}</p>
                  )}
                </div>
            </div>

            {/* Bio Section */}
            <div className="flex items-start gap-3">
                <User className="text-blue-500 flex-shrink-0 mt-1" size={18}/>
                <div className="w-full">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Bio</p>
                  {isEditing ? (
                    <textarea 
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      className="bg-transparent border-b border-slate-600 w-full text-sm py-1 focus:border-blue-500 outline-none resize-none"
                      rows="2"
                    />
                  ) : (
                    <p className="text-sm text-slate-300">{user.bio || "-"}</p>
                  )}
                </div>
            </div>

            {/* Username (Read Only) */}
            <div className="flex items-center gap-3 opacity-60">
                <Mail className="text-slate-400 flex-shrink-0" size={18}/>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Username</p>
                  <p className="text-sm">@{user.username}</p>
                </div>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                <Save size={16}/> Simpan
              </button>
              <button onClick={() => setIsEditing(false)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                <X size={16}/> Batal
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all border border-white/10">
              <Edit2 size={16}/> Edit
            </button>
          )}
        </div>

        <button onClick={handleLogout} className="w-full mt-3 bg-[#1E293B] border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
            <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
}