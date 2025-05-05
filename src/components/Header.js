'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBeer, faUser, faX, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../app/context/CartContext';
import { useState } from 'react';

export default function Header() {
  const { cartItems, addToCart, removeFromCart, getTotalItems, getTotalPrice } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header className="bg-amber-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo y nombre de la tienda */}
        <div className="flex items-center gap-4">
          <FontAwesomeIcon icon={faBeer} className="text-4xl" />
          <h1 className="text-2xl font-bold">BrewShop</h1>
        </div>

        {/* Barra de navegación */}
        <nav className="hidden md:flex gap-8">
          <a href="/" className="hover:text-amber-50 transition-colors">Inicio</a>
          <a href="/beers" className="hover:text-amber-50 transition-colors">Cervezas</a>
          <a href="/about" className="hover:text-amber-50 transition-colors">Sobre Nosotros</a>
        </nav>

        {/* Carrito y usuario */}
        <div className="flex items-center gap-4">
          {/* Carrito */}
          <div className="relative">
            <button 
              className="p-2 hover:bg-amber-600 rounded-full transition-colors"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <ShoppingCart className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-50 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>

          {/* Usuario */}
          <div className="relative group">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faUser} className="text-xl" />
              <span className="text-sm">Usuario</span>
            </div>

            {/* Carrito */}
            {isCartOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Tu Carrito</h3>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FontAwesomeIcon icon={faX} className="w-4 h-4" />
                  </button>
                </div>
                
                {cartItems.length === 0 ? (
                  <p className="text-center text-gray-500">El carrito está vacío</p>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex items-center p-2 bg-amber-50 rounded-lg">
                        <img 
                          src={item.label} 
                          alt={item.name} 
                          className="w-12 h-12 object-cover rounded mr-4"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-2">
                            <p className="font-semibold text-amber-800">{item.name}</p>
                            <div className="flex items-center gap-2">
                              <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-sm">
                                x{item.quantity}
                              </span>
                              <span className="text-amber-800 font-semibold">${item.price * item.quantity}</span>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Tipo: {item.type}</p>
                            <p>Precio unitario: ${item.price}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.name)}
                          className="text-amber-800 hover:text-amber-900"
                        >
                          <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold">Total</p>
                        <p className="text-2xl font-bold text-amber-800">${getTotalPrice()}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Dropdown del usuario */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-2 hidden group-hover:block">
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">Mi Perfil</button>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">Pedidos</button>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-red-500">Cerrar Sesión</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
