'use client';

import { CartProvider } from '../../app/context/CartContext';

export function ClientProvider({ children }) {
  return <CartProvider>{children}</CartProvider>;
}
