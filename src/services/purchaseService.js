import api from './api';

export const purchaseService = {
  // Get user's purchase history
  getMyPurchases: async (params = {}) => {
    const response = await api.get('/purchases/my-purchases', { params });
    return response.data;
  },

  // Get single purchase
  getPurchaseById: async (id) => {
    const response = await api.get(`/purchases/${id}`);
    return response.data;
  },

  // Get all purchases (admin only)
  getAllPurchases: async (params = {}) => {
    const response = await api.get('/purchases', { params });
    return response.data;
  },

  // Get purchase statistics (admin only)
  getPurchaseStatistics: async (params = {}) => {
    const response = await api.get('/purchases/statistics', { params });
    return response.data;
  },

  // Cancel purchase
  cancelPurchase: async (id) => {
    const response = await api.put(`/purchases/${id}/cancel`);
    return response.data;
  },
};