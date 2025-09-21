// Export all custom hooks
export { useSweets, useSweetActions } from './useSweets';
export { usePurchases, usePurchaseStats } from './usePurchases';
export { useCart } from './useCart';
export { useDashboard } from './useDashboard';
export { useForm, validationRules } from './useForm';
export { useLocalStorage } from './useLocalStorage';
export { useApi } from './useApi';

// Re-export context hooks
export { useAuth } from '../contexts/AuthContext';
export { useApp } from '../contexts/AppContext';