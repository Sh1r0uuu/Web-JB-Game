import { apiClient } from '../config/api';

const AccountService = {
  async getAll() { return await apiClient.get('/api/accounts'); },
  async getById(id) { return await apiClient.get(`/api/accounts/${id}`); },
  async getGames() { return await apiClient.get('/api/games'); },
  
  async delete(id) { return await apiClient.delete(`/api/accounts/${id}`); },

  // KEMBALI KE JSON BIASA
  async create(data) {
    try {
      const response = await apiClient.post('/api/accounts', data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // KEMBALI KE JSON BIASA
  async update(id, data) {
    try {
      const response = await apiClient.put(`/api/accounts/${id}`, data);
      return response;
    } catch (error) {
      throw error;
    }
  }
};

export default AccountService;