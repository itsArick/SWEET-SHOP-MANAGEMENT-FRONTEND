import { useState, useCallback } from 'react';
import { statsService } from '../services/statsService';
import toast from 'react-hot-toast';

export const useDashboard = () => {
  const [dashboardStats, setDashboardStats] = useState(null);
  const [inventoryStatus, setInventoryStatus] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [loading, setLoading] = useState({
    dashboard: false,
    inventory: false,
    userActivity: false,
  });

  const fetchDashboardStats = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, dashboard: true }));
      const response = await statsService.getDashboardStats();
      setDashboardStats(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast.error('Failed to load dashboard statistics');
      return { success: false, error: error.message };
    } finally {
      setLoading(prev => ({ ...prev, dashboard: false }));
    }
  }, []);

  const fetchInventoryStatus = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, inventory: true }));
      const response = await statsService.getInventoryStatus();
      setInventoryStatus(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching inventory status:', error);
      toast.error('Failed to load inventory status');
      return { success: false, error: error.message };
    } finally {
      setLoading(prev => ({ ...prev, inventory: false }));
    }
  }, []);

  const fetchUserActivity = useCallback(async (params = {}) => {
    try {
      setLoading(prev => ({ ...prev, userActivity: true }));
      const response = await statsService.getUserActivity(params);
      setUserActivity(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching user activity:', error);
      toast.error('Failed to load user activity data');
      return { success: false, error: error.message };
    } finally {
      setLoading(prev => ({ ...prev, userActivity: false }));
    }
  }, []);

  return {
    dashboardStats,
    inventoryStatus,
    userActivity,
    loading,
    fetchDashboardStats,
    fetchInventoryStatus,
    fetchUserActivity,
  };
};