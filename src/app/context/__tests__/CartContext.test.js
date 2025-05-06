'use client';

import { renderHook, act } from '@testing-library/react-hooks';
import { CartProvider, useCart } from '../CartContext';

const mockBeer = {
  name: 'Test Beer',
  type: 'IPA',
  abv: 5.5,
  label: 'test-label.jpg',
  price: 250
};

describe('CartContext', () => {
  it('should add items to cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    });

    act(() => {
      result.current.addToCart(mockBeer);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].name).toBe(mockBeer.name);
    expect(result.current.cartItems[0].quantity).toBe(1);
  });

  it('should increment quantity for existing items', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    });

    act(() => {
      result.current.addToCart(mockBeer);
      result.current.addToCart(mockBeer);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].quantity).toBe(2);
  });

  it('should remove items from cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    });

    act(() => {
      result.current.addToCart(mockBeer);
      result.current.addToCart(mockBeer);
      result.current.removeFromCart(mockBeer.name);
    });

    expect(result.current.cartItems[0].quantity).toBe(1);
  });

  it('should calculate total items correctly', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    });

    act(() => {
      result.current.addToCart(mockBeer);
      result.current.addToCart(mockBeer);
    });

    expect(result.current.getTotalItems()).toBe(2);
  });

  it('should calculate total price correctly', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    });

    act(() => {
      result.current.addToCart(mockBeer);
      result.current.addToCart(mockBeer);
    });

    expect(result.current.getTotalPrice()).toBe(500);
  });
});
