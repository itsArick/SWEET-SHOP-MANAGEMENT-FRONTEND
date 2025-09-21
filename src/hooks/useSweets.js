import { useState, useEffect, useCallback } from 'react';
import { sweetService } from '../services/sweetService';
import { useApp } from '../contexts/AppContext';
import toast from 'react-hot-toast';

export const useSweets = () => {
  const { sweets, setSweets, setLoading } = useApp();
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });

  const fetchSweets = useCallback(async (params = {}) => {
    try {
      setLoading('sweets', true);
      const response = await sweetService.getAllSweets(params);
      setSweets(response.data.sweets);
      
      if (response.data.pagination) {
        setPagination(response.data.pagination);
      }
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching sweets:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading('sweets', false);
    }
  }, [setSweets, setLoading]);

  const fetchSweetById = async (id) => {
    try {
      const response = await sweetService.getSweetById(id);
      return { success: true, data: response.data.sweet };
    } catch (error) {
      console.error('Error fetching sweet:', error);
      return { success: false, error: error.message };
    }
  };

  const searchSweets = async (params) => {
    try {
      setLoading('sweets', true);
      const response = await sweetService.searchSweets(params);
      setSweets(response.data.sweets);
      
      if (response.data.pagination) {
        setPagination(response.data.pagination);
      }
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error searching sweets:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading('sweets', false);
    }
  };

  const getFeaturedSweets = async (limit = 6) => {
    try {
      const response = await sweetService.getFeaturedSweets(limit);
      return { success: true, data: response.data.sweets };
    } catch (error) {
      console.error('Error fetching featured sweets:', error);
      return { success: false, error: error.message };
    }
  };

  const getSweetsByCategory = async (category, params = {}) => {
    try {
      setLoading('sweets', true);
      const response = await sweetService.getSweetsByCategory(category, params);
      setSweets(response.data.sweets);
      
      if (response.data.pagination) {
        setPagination(response.data.pagination);
      }
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching sweets by category:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading('sweets', false);
    }
  };

  return {
    sweets,
    pagination,
    fetchSweets,
    fetchSweetById,
    searchSweets,
    getFeaturedSweets,
    getSweetsByCategory,
  };
};

export const useSweetActions = () => {
  const { addSweet, updateSweet, deleteSweet } = useApp();

  const createSweet = async (sweetData) => {
    try {
      const response = await sweetService.createSweet(sweetData);
      addSweet(response.data.sweet);
      toast.success('Sweet created successfully!');
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create sweet';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const editSweet = async (id, sweetData) => {
    try {
      const response = await sweetService.updateSweet(id, sweetData);
      updateSweet(response.data.sweet);
      toast.success('Sweet updated successfully!');
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update sweet';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const removeSweet = async (id) => {
    try {
      await sweetService.deleteSweet(id);
      deleteSweet(id);
      toast.success('Sweet deleted successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete sweet';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const purchaseSweet = async (id, quantity = 1) => {
    try {
      const response = await sweetService.purchaseSweet(id, quantity);
      toast.success(`Successfully purchased ${quantity} item(s)!`);
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Purchase failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const restockSweet = async (id, quantity) => {
    try {
      const response = await sweetService.restockSweet(id, quantity);
      // Update the sweet in the state if needed
      toast.success(`Successfully restocked ${quantity} items!`);
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Restock failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const toggleFeaturedStatus = async (id) => {
    try {
      const response = await sweetService.toggleFeatured(id);
      toast.success(response.data.message);
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update featured status';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const applyDiscount = async (id, discountData) => {
    try {
      const response = await sweetService.applyDiscount(id, discountData);
      toast.success('Discount applied successfully!');
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to apply discount';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  return {
    createSweet,
    editSweet,
    removeSweet,
    purchaseSweet,
    restockSweet,
    toggleFeaturedStatus,
    applyDiscount,
  };
};