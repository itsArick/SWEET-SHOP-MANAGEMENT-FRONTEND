import React, { createContext, useContext, useState, useReducer } from 'react';

// App state reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SWEETS':
      return { ...state, sweets: action.payload };
    case 'ADD_SWEET':
      return { ...state, sweets: [action.payload, ...state.sweets] };
    case 'UPDATE_SWEET':
      return {
        ...state,
        sweets: state.sweets.map(sweet =>
          sweet._id === action.payload._id ? action.payload : sweet
        ),
      };
    case 'DELETE_SWEET':
      return {
        ...state,
        sweets: state.sweets.filter(sweet => sweet._id !== action.payload),
      };
    case 'SET_PURCHASES':
      return { ...state, purchases: action.payload };
    case 'ADD_PURCHASE':
      return { ...state, purchases: [action.payload, ...state.purchases] };
    case 'SET_CART':
      return { ...state, cart: action.payload };
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.sweetId === action.payload.sweetId);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.sweetId === action.payload.sweetId
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, action.payload] };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.sweetId !== action.payload),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'SET_LOADING':
      return { ...state, loading: { ...state.loading, [action.key]: action.value } };
    default:
      return state;
  }
};

const initialState = {
  sweets: [],
  purchases: [],
  cart: [],
  loading: {
    sweets: false,
    purchases: false,
    dashboard: false,
  },
  filters: {
    category: '',
    priceRange: [0, 1000],
    searchTerm: '',
  },
};

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sweet actions
  const setSweets = (sweets) => {
    dispatch({ type: 'SET_SWEETS', payload: sweets });
  };

  const addSweet = (sweet) => {
    dispatch({ type: 'ADD_SWEET', payload: sweet });
  };

  const updateSweet = (sweet) => {
    dispatch({ type: 'UPDATE_SWEET', payload: sweet });
  };

  const deleteSweet = (sweetId) => {
    dispatch({ type: 'DELETE_SWEET', payload: sweetId });
  };

  // Purchase actions
  const setPurchases = (purchases) => {
    dispatch({ type: 'SET_PURCHASES', payload: purchases });
  };

  const addPurchase = (purchase) => {
    dispatch({ type: 'ADD_PURCHASE', payload: purchase });
  };

  // Cart actions
  const addToCart = (sweetId, quantity = 1, sweetData) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { sweetId, quantity, sweetData },
    });
  };

  const removeFromCart = (sweetId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: sweetId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Loading actions
  const setLoading = (key, value) => {
    dispatch({ type: 'SET_LOADING', key, value });
  };

  const value = {
    ...state,
    sidebarOpen,
    setSidebarOpen,
    // Actions
    setSweets,
    addSweet,
    updateSweet,
    deleteSweet,
    setPurchases,
    addPurchase,
    addToCart,
    removeFromCart,
    clearCart,
    setLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};