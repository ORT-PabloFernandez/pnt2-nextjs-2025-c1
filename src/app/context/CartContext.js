'use client';

import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (beer) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.name === beer.name);
      if (existingItem) {
        return prev.map(item => 
          item.name === beer.name 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...beer, quantity: 1 }];
    });
  };

  const removeFromCart = (beerName) => {
    setCartItems(prev => {
      const itemIndex = prev.findIndex(item => item.name === beerName);
      if (itemIndex === -1) return prev;
      
      const updatedItem = { ...prev[itemIndex] };
      if (updatedItem.quantity > 1) {
        updatedItem.quantity -= 1;
        return [...prev.slice(0, itemIndex), updatedItem, ...prev.slice(itemIndex + 1)];
      }
      return prev.filter(item => item.name !== beerName);
    });
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotalItems, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
