import api from './api';

export const authService = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response; // Return full response object, not response.data
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response; // Return full response object, not response.data
  },

  // Get current user profile
  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response; // Return full response object
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.put('/auth/profile', userData);
    return response; // Return full response object
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await api.put('/auth/change-password', passwordData);
    return response; // Return full response object
  },

  // Logout user
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response; // Return full response object
  },

  // Get all users (admin only)
  getAllUsers: async (params = {}) => {
    const response = await api.get('/auth/users', { params });
    return response; // Return full response object
  },

  // Deactivate user (admin only)
  deactivateUser: async (userId) => {
    const response = await api.put(`/auth/users/${userId}/deactivate`);
    return response; // Return full response object
  },

  // Activate user (admin only)
  activateUser: async (userId) => {
    const response = await api.put(`/auth/users/${userId}/activate`);
    return response; // Return full response object
  },
};




// import api from './api';

// export const authService = {
//   // Register new user
//   register: async (userData) => {
//     const response = await api.post('/auth/register', userData);
//     return response.data;
//   },

//   // Login user
//   login: async (credentials) => {
//     const response = await api.post('/auth/login', credentials);
//     return response.data;
//   },

//   // Get current user profile
//   getProfile: async () => {
//     const response = await api.get('/auth/me');
//     return response.data;
//   },

//   // Update user profile
//   updateProfile: async (userData) => {
//     const response = await api.put('/auth/profile', userData);
//     return response.data;
//   },

//   // Change password
//   changePassword: async (passwordData) => {
//     const response = await api.put('/auth/change-password', passwordData);
//     return response.data;
//   },

//   // Logout user
//   logout: async () => {
//     const response = await api.post('/auth/logout');
//     return response.data;
//   },

//   // Get all users (admin only)
//   getAllUsers: async (params = {}) => {
//     const response = await api.get('/auth/users', { params });
//     return response.data;
//   },

//   // Deactivate user (admin only)
//   deactivateUser: async (userId) => {
//     const response = await api.put(`/auth/users/${userId}/deactivate`);
//     return response.data;
//   },

//   // Activate user (admin only)
//   activateUser: async (userId) => {
//     const response = await api.put(`/auth/users/${userId}/activate`);
//     return response.data;
//   },
// };