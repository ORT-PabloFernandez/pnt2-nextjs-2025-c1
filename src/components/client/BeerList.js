'use client';

import { useCart } from '../../app/context/CartContext';
import beers from '../../app/beers/beers';
import { ShoppingCart, Plus, X } from 'lucide-react';
import { useState } from 'react';

export default function BeerList() {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Nuestras Cervezas</h1>
        <div className="relative">
          <button 
            className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 flex items-center gap-2 transition-colors duration-200"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <ShoppingCart className="w-5 h-5" />            
          </button>
          {getTotalItems() > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {getTotalItems()}
            </span>
          )}
          
          {isCartOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Tu Carrito</h3>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
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
                        <X className="w-4 h-4" />
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
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {beers.map((beer) => (
          <div key={beer.name} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img 
              src={beer.label} 
              alt={beer.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-amber-800 mb-2">{beer.name}</h2>
              <p className="text-gray-600 mb-2">Tipo: {beer.type}</p>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">ABV: {beer.abv}%</p>
                <p className="text-amber-800 font-semibold">${beer.price}</p>
              </div>
              <button 
                onClick={() => addToCart(beer)}
                className="w-full bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 flex items-center justify-center gap-2 transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
