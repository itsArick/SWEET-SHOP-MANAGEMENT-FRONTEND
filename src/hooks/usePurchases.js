import { useState, useCallback } from 'react';
import { purchaseService } from '../services/purchaseService';
import { useApp } from '../contexts/AppContext';
import toast from 'react-hot-toast';

export const usePurchases = () => {
  const { purchases, setPurchases, addPurchase, setLoading } = useApp();
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });

  const fetchMyPurchases = useCallback(async (params = {}) => {
    try {
      setLoading('purchases', true);
      const response = await purchaseService.getMyPurchases(params);
      setPurchases(response.data.purchases);
      
      if (response.data.pagination) {
        setPagination(response.data.pagination);
      }
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching purchases:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading('purchases', false);
    }
  }, [setPurchases, setLoading]);

  const fetchAllPurchases = useCallback(async (params = {}) => {
    try {
      setLoading('purchases', true);
      const response = await purchaseService.getAllPurchases(params);
      setPurchases(response.data.purchases);
      
      if (response.data.pagination) {
        setPagination(response.data.pagination);
      }
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching all purchases:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading('purchases', false);
    }
  }, [setPurchases, setLoading]);

  const fetchPurchaseById = async (id) => {
    try {
      const response = await purchaseService.getPurchaseById(id);
      return { success: true, data: response.data.purchase };
    } catch (error) {
      console.error('Error fetching purchase:', error);
      return { success: false, error: error.message };
    }
  };

  const cancelPurchase = async (id) => {
    try {
      const response = await purchaseService.cancelPurchase(id);
      toast.success('Purchase cancelled successfully!');
      // Refresh purchases list
      fetchMyPurchases();
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to cancel purchase';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  return {
    purchases,
    pagination,
    fetchMyPurchases,
    fetchAllPurchases,
    fetchPurchaseById,
    cancelPurchase,
  };
};

export const usePurchaseStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPurchaseStats = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      const response = await purchaseService.getPurchaseStatistics(params);
      setStats(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching purchase stats:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    stats,
    loading,
    fetchPurchaseStats,
  };
};