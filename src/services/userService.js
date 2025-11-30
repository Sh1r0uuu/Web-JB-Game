import axios from 'axios';
import { apiClient, BASE_URL } from '../config/api';

const USER_KEY = 'user_session';

const userService = {
  // Simpan data user di browser
  saveUser(userData) {
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
  },

  // Ambil data user
  getUser() {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  // Logout
  logout() {
    localStorage.removeItem(USER_KEY);
    window.location.href = '/login';
  },

  // Login ke API
  async login(username, password) {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, { username, password });
      if (response.data) this.saveUser(response.data);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Login Gagal";
    }
  },

  // Register ke API
  async register(formData) {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/register`, formData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Register Gagal";
    }
  },

  // Update Profil
  async updateProfile(id, data) {
    const response = await axios.put(`${BASE_URL}/api/auth/profile/${id}`, data);
    const currentUser = this.getUser();
    this.saveUser({ ...currentUser, ...response.data });
    return response.data;
  }
};

export default userService;