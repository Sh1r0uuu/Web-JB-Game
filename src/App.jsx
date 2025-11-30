import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import DetailPage from './pages/DetailPage';
import SellPage from './pages/SellPage';
import ProfilePage from './pages/ProfilePage';
import EditPage from './pages/EditPage';
import WishlistPage from './pages/WishlistPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <div className="app-container font-sans text-gray-900 min-h-screen bg-[#0F172A] flex flex-col md:flex-row">
        
        {/* Toaster Global */}
        <Toaster position="top-center" toastOptions={{ style: { background: '#1E293B', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }}/>

        {/* SIDEBAR (Desktop Only) */}
        <Sidebar />

        {/* KONTEN UTAMA */}
        {/* Di mobile (default) lebar full. Di desktop (md) geser ke kanan 64 (lebar sidebar) */}
        <div className="flex-1 w-full md:ml-64 min-h-screen transition-all duration-300 relative z-0">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/jual" element={<SellPage />} />
                <Route path="/profil" element={<ProfilePage />} />
                <Route path="/account/:id" element={<DetailPage />} />
                <Route path="/edit/:id" element={<EditPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </div>
        
        {/* BOTTOM NAV (Mobile Only) */}
        {/* Pastikan diletakkan di luar div konten agar fixed position bekerja benar */}
        <BottomNav />
        
      </div>
    </Router>
  );
}

export default App;