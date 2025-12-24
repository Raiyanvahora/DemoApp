'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import CartBar from '@/components/CartBar';
import BottomNav from '@/components/BottomNav';
import { useStore } from '@/lib/store';
import { products, categories } from '@/data/products';
import { config } from '@/data/config';

export default function HomePage() {
  const { getCartCount } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  const featuredProducts = products.slice(0, 6);
  const cartCount = getCartCount();

  return (
    <main className="bg-gray-50 min-h-screen pb-32">
      {/* Header with Location & Search */}
      <header className="bg-purple-600 text-white px-4 pt-12 pb-4">
        {/* Location Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-sm">Home</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <p className="text-xs text-white/70 truncate max-w-[200px]">
                Sector 15, Local Market Area
              </p>
            </div>
          </div>
          <Link href="/profile" className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>
        </div>

        {/* Delivery Time Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-white text-purple-600 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            <span className="font-bold text-sm">Delivery in 30 mins</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search for groceries, vegetables..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-gray-800 placeholder-gray-400 py-3 pl-11 pr-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>
      </header>

      {/* Promotional Banner */}
      <div className="px-4 py-4">
        <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 rounded-2xl p-5 relative overflow-hidden">
          <div className="relative z-10">
            <span className="bg-white/90 text-orange-600 text-xs font-bold px-2 py-1 rounded-full">
              MEMBER SPECIAL
            </span>
            <h2 className="text-white text-xl font-bold mt-2 mb-1">
              Get FREE Delivery
            </h2>
            <p className="text-white/90 text-sm mb-3">
              Join membership @ ₹{config.membershipPrice}/month
            </p>
            <Link
              href="/membership"
              className="inline-block bg-white text-orange-600 font-bold text-sm px-4 py-2 rounded-lg"
            >
              Join Now →
            </Link>
          </div>
          <div className="absolute right-2 bottom-2 text-6xl opacity-30">
            🚀
          </div>
        </div>
      </div>

      {/* Category Icons */}
      <div className="px-4 pb-4">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {categories.slice(1).map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="flex flex-col items-center min-w-[72px]"
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl mb-1.5 active:scale-95 transition-transform border border-gray-100">
                {category.emoji}
              </div>
              <span className="text-xs font-medium text-gray-700 text-center">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-4 text-white">
            <span className="text-2xl mb-2 block">🥬</span>
            <h3 className="font-bold text-sm">Fresh Vegetables</h3>
            <p className="text-xs text-white/80 mt-0.5">Farm fresh daily</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-4 text-white">
            <span className="text-2xl mb-2 block">🥛</span>
            <h3 className="font-bold text-sm">Dairy & Milk</h3>
            <p className="text-xs text-white/80 mt-0.5">Delivered cold</p>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900">Popular Items</h2>
          <Link href="/products" className="text-purple-600 text-sm font-semibold">
            See All →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* All Categories Section */}
      <div className="px-4 pb-4">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Shop by Category</h2>
        <div className="space-y-3">
          {categories.slice(1).map((category) => {
            const categoryProducts = products.filter(p => p.category === category.id).slice(0, 2);
            return (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-gray-100 active:bg-gray-50"
              >
                <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">
                  {category.emoji}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {products.filter(p => p.category === category.id).length} items
                  </p>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Store Info */}
      <div className="px-4 pb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🏪</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">{config.storeName}</h3>
              <p className="text-xs text-gray-500">{config.tagline}</p>
            </div>
          </div>
          <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-green-500">●</span>
              Open Now
            </div>
            <div className="text-sm text-gray-500">
              8 AM - 9 PM
            </div>
          </div>
        </div>
      </div>

      <CartBar />
      <BottomNav />
    </main>
  );
}
