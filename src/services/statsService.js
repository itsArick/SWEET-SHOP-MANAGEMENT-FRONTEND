import api from './api';

export const statsService = {
  // Get dashboard statistics (admin only)
  getDashboardStats: async () => {
    const response = await api.get('/stats/dashboard');
    return response.data;
  },

  // Get inventory status (admin only)
  getInventoryStatus: async () => {
    const response = await api.get('/stats/inventory');
    return response.data;
  },

  // Get user activity statistics (admin only)
  getUserActivity: async (params = {}) => {
    const response = await api.get('/stats/user-activity', { params });
    return response.data;
  },
};