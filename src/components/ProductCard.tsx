'use client';

import { useState } from 'react';
import { Product } from '@/data/products';
import { useStore } from '@/lib/store';
import { config } from '@/data/config';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { cart, addToCart, updateQuantity } = useStore();
  const [imageError, setImageError] = useState(false);

  const cartItem = cart.find(item => item.id === product.id);
  const qty = cartItem?.qty || 0;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all active:scale-[0.98]">
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-gray-50 to-gray-100">
            {product.emoji}
          </div>
        )}

        {/* Add Button Overlay */}
        <div className="absolute bottom-2 right-2">
          {qty > 0 ? (
            <div className="flex items-center bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <button
                onClick={() => updateQuantity(product.id, -1)}
                className="w-8 h-8 flex items-center justify-center text-purple-600 font-bold text-lg hover:bg-purple-50 active:bg-purple-100"
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-bold text-gray-800 tabular-nums">
                {qty}
              </span>
              <button
                onClick={() => updateQuantity(product.id, 1)}
                className="w-8 h-8 flex items-center justify-center text-purple-600 font-bold text-lg hover:bg-purple-50 active:bg-purple-100"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="w-9 h-9 bg-white rounded-xl shadow-lg border border-purple-200 flex items-center justify-center text-purple-600 font-bold text-xl hover:bg-purple-50 active:scale-95 transition-all"
            >
              +
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <p className="text-[0.65rem] font-semibold text-purple-500 uppercase tracking-wider mb-0.5">
          {product.unit}
        </p>
        <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-1 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-gray-900">
            {config.currency}{product.price}
          </span>
        </div>
      </div>
    </div>
  );
}
