import { useCallback } from 'react';
import { useApp } from '../contexts/AppContext';
import toast from 'react-hot-toast';

export const useCart = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useApp();

  const addItemToCart = useCallback((sweet, quantity = 1) => {
    if (sweet.quantity === 0) {
      toast.error('Sorry, this item is out of stock!');
      return false;
    }

    if (quantity > sweet.quantity) {
      toast.error(`Only ${sweet.quantity} items available in stock!`);
      return false;
    }

    addToCart(sweet._id, quantity, sweet);
    toast.success(`${sweet.name} added to cart!`);
    return true;
  }, [addToCart]);

  const removeItemFromCart = useCallback((sweetId) => {
    removeFromCart(sweetId);
    toast.success('Item removed from cart!');
  }, [removeFromCart]);

  const updateQuantity = useCallback((sweetId, newQuantity, sweetData) => {
    if (newQuantity <= 0) {
      removeFromCart(sweetId);
      return;
    }

    if (sweetData && newQuantity > sweetData.quantity) {
      toast.error(`Only ${sweetData.quantity} items available in stock!`);
      return false;
    }

    // Remove and re-add with new quantity
    removeFromCart(sweetId);
    addToCart(sweetId, newQuantity, sweetData);
    return true;
  }, [addToCart, removeFromCart]);

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => {
      return total + (item.sweetData?.price || 0) * item.quantity;
    }, 0);
  }, [cart]);

  const getCartItemCount = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const clearAllItems = useCallback(() => {
    clearCart();
    toast.success('Cart cleared!');
  }, [clearCart]);

  return {
    cart,
    cartTotal: getCartTotal(),
    itemCount: getCartItemCount(),
    addItemToCart,
    removeItemFromCart,
    updateQuantity,
    clearAllItems,
    isEmpty: cart.length === 0,
  };
};