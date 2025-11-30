import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, isDanger = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#1E293B] w-full max-w-sm rounded-3xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden transform transition-all scale-100">
        
        <div className="p-6 text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDanger ? 'bg-red-500/20 text-red-500' : 'bg-violet-500/20 text-violet-500'}`}>
            <AlertTriangle size={32} />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{message}</p>
        </div>

        <div className="flex border-t border-white/5">
          <button 
            onClick={onClose}
            className="flex-1 py-4 text-sm font-bold text-slate-400 hover:bg-white/5 transition-colors"
          >
            Batal
          </button>
          <div className="w-[1px] bg-white/5"></div>
          <button 
            onClick={onConfirm}
            className={`flex-1 py-4 text-sm font-bold transition-colors ${isDanger ? 'text-red-500 hover:bg-red-500/10' : 'text-violet-400 hover:bg-violet-500/10'}`}
          >
            Ya, Lanjutkan
          </button>
        </div>

      </div>
    </div>
  );
}