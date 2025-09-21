// User roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

// Sweet categories
export const SWEET_CATEGORIES = {
  CHOCOLATE: 'chocolate',
  CANDY: 'candy',
  CAKE: 'cake',
  COOKIE: 'cookie',
  ICE_CREAM: 'ice-cream',
  GUMMY: 'gummy',
  OTHER: 'other'
};

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};

// Order/Purchase status
export const ORDER_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    PROFILE: '/auth/me',
    UPDATE_PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
    LOGOUT: '/auth/logout'
  },
  SWEETS: {
    GET_ALL: '/sweets',
    SEARCH: '/sweets/search',
    GET_BY_ID: (id) => `/sweets/${id}`,
    CREATE: '/sweets',
    UPDATE: (id) => `/sweets/${id}`,
    DELETE: (id) => `/sweets/${id}`,
    PURCHASE: (id) => `/sweets/${id}/purchase`,
    RESTOCK: (id) => `/sweets/${id}/restock`,
    FEATURED: '/sweets/featured'
  },
  PURCHASES: {
    MY_PURCHASES: '/purchases/my-purchases',
    GET_BY_ID: (id) => `/purchases/${id}`,
    GET_ALL: '/purchases',
    STATISTICS: '/purchases/statistics',
    CANCEL: (id) => `/purchases/${id}/cancel`
  },
  STATS: {
    DASHBOARD: '/stats/dashboard',
    INVENTORY: '/stats/inventory',
    USER_ACTIVITY: '/stats/user-activity'
  }
};

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  CART: 'cart',
  PREFERENCES: 'preferences'
};

// Default pagination
export const PAGINATION = {
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 50,
  DEFAULT_PAGE: 1
};

// Price ranges for filtering
export const PRICE_RANGES = [
  { label: 'Under $5', min: 0, max: 5 },
  { label: '$5 - $10', min: 5, max: 10 },
  { label: '$10 - $25', min: 10, max: 25 },
  { label: '$25 - $50', min: 25, max: 50 },
  { label: 'Over $50', min: 50, max: null }
];

// Sort options
export const SORT_OPTIONS = [
  { value: 'createdAt-desc', label: 'Newest First' },
  { value: 'createdAt-asc', label: 'Oldest First' },
  { value: 'name-asc', label: 'Name A-Z' },
  { value: 'name-desc', label: 'Name Z-A' },
  { value: 'price-asc', label: 'Price Low to High' },
  { value: 'price-desc', label: 'Price High to Low' }
];

// Toast notification durations
export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 4000,
  LONG: 6000
};

// File upload limits
export const UPLOAD_LIMITS = {
  IMAGE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp']
};

// Validation rules
export const VALIDATION = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 30,
    PATTERN: /^[a-zA-Z0-9_]+$/
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 128
  },
  SWEET_NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100
  },
  DESCRIPTION: {
    MAX_LENGTH: 500
  },
  PRICE: {
    MIN: 0,
    MAX: 10000
  }
};

// Default values
export const DEFAULTS = {
  SWEET_IMAGE: 'https://via.placeholder.com/300x300?text=Sweet+Image',
  USER_AVATAR: (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=ec4899&color=fff&size=128`,
  ITEMS_PER_PAGE: 12,
  SEARCH_DEBOUNCE: 300, // milliseconds
  CART_STORAGE_KEY: 'sweet-shop-cart'
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You need to login to access this feature.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again later.'
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Login successful!',
  REGISTER: 'Account created successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  ITEM_ADDED_TO_CART: 'Item added to cart!',
  PURCHASE_SUCCESSFUL: 'Purchase completed successfully!',
  ORDER_CANCELLED: 'Order cancelled successfully!'
};

export default {
  USER_ROLES,
  SWEET_CATEGORIES,
  HTTP_STATUS,
  ORDER_STATUS,
  API_ENDPOINTS,
  STORAGE_KEYS,
  PAGINATION,
  PRICE_RANGES,
  SORT_OPTIONS,
  TOAST_DURATION,
  UPLOAD_LIMITS,
  VALIDATION,
  DEFAULTS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES
};