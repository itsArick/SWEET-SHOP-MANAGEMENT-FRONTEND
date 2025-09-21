import api from './api';

export const sweetService = {
  // Get all sweets
  getAllSweets: async (params = {}) => {
    const response = await api.get('/sweets', { params });
    return response.data;
  },

  // Get single sweet
  getSweetById: async (id) => {
    const response = await api.get(`/sweets/${id}`);
    return response.data;
  },

  // Search sweets
  searchSweets: async (params = {}) => {
    const response = await api.get('/sweets/search', { params });
    return response.data;
  },

  // Get featured sweets
  getFeaturedSweets: async (limit = 6) => {
    const response = await api.get(`/sweets/featured?limit=${limit}`);
    return response.data;
  },

  // Get sweets by category
  getSweetsByCategory: async (category, params = {}) => {
    const response = await api.get(`/sweets/category/${category}`, { params });
    return response.data;
  },

  // Create sweet (admin only)
  createSweet: async (sweetData) => {
    const response = await api.post('/sweets', sweetData);
    return response.data;
  },

  // Update sweet (admin only)
  updateSweet: async (id, sweetData) => {
    const response = await api.put(`/sweets/${id}`, sweetData);
    return response.data;
  },

  // Delete sweet (admin only)
  deleteSweet: async (id) => {
    const response = await api.delete(`/sweets/${id}`);
    return response.data;
  },

  // Purchase sweet
  purchaseSweet: async (id, quantity = 1) => {
    const response = await api.post(`/sweets/${id}/purchase`, { quantity });
    return response.data;
  },

  // Restock sweet (admin only)
  restockSweet: async (id, quantity) => {
    const response = await api.post(`/sweets/${id}/restock`, { quantity });
    return response.data;
  },

  // Toggle featured status (admin only)
  toggleFeatured: async (id) => {
    const response = await api.put(`/sweets/${id}/featured`);
    return response.data;
  },

  // Apply discount (admin only)
  applyDiscount: async (id, discountData) => {
    const response = await api.put(`/sweets/${id}/discount`, discountData);
    return response.data;
  },
};