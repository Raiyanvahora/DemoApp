'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import { useStore } from '@/lib/store';
import { openWhatsApp } from '@/lib/whatsapp';
import { config } from '@/data/config';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isMembershipActive, updateUserName, resetStore, isHydrated } = useStore();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState('');

  const isActive = isMembershipActive();

  const expiryDate = user.membershipExpiry
    ? new Date(user.membershipExpiry).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  const handleEditName = () => {
    setEditName(user.name);
    setShowEditModal(true);
  };

  const handleSaveName = () => {
    if (editName.trim()) {
      updateUserName(editName.trim());
      setShowEditModal(false);
    }
  };

  const handleReset = () => {
    if (confirm('This will reset all demo data including your cart and membership. Continue?')) {
      resetStore();
      router.push('/');
    }
  };

  if (!isHydrated) {
    return (
      <main className="bg-gray-50 min-h-screen pb-24">
        <header className="bg-purple-600 text-white px-4 pt-12 pb-24">
          <h1 className="text-lg font-bold">Account</h1>
        </header>
        <div className="px-4 -mt-16 animate-pulse">
          <div className="h-36 bg-white rounded-2xl mb-4 shadow-lg"></div>
          <div className="h-48 bg-white rounded-2xl shadow-sm"></div>
        </div>
        <BottomNav />
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <header className="bg-purple-600 text-white px-4 pt-12 pb-24">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">Account</h1>
          <button
            onClick={handleEditName}
            className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
      </header>

      <div className="px-4 -mt-16 space-y-4">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-5 text-center shadow-lg">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-3 shadow-md">
            <span className="text-white text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            {user.name}
          </h2>
          {isActive ? (
            <div className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-700 py-1.5 px-3 rounded-full text-xs font-semibold">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 3l3.5 7L12 6l3.5 4L19 3l-1 12H6L5 3z M6 15h12v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-2z" />
              </svg>
              Premium Member
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Free Account</p>
          )}
        </div>

        {/* Membership Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">Membership Status</p>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                  <span className={`font-semibold ${isActive ? 'text-green-600' : 'text-gray-500'}`}>
                    {isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              {isActive && expiryDate && (
                <div className="text-right">
                  <p className="text-xs text-gray-500">Valid until</p>
                  <p className="font-semibold text-gray-900 text-sm">{expiryDate}</p>
                </div>
              )}
            </div>
          </div>
          <Link
            href="/membership"
            className="flex items-center justify-between p-4 active:bg-gray-50"
          >
            <span className="font-medium text-purple-600">
              {isActive ? 'View Benefits' : 'Upgrade to Premium'}
            </span>
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Menu Options */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={handleEditName}
            className="w-full flex items-center gap-4 p-4 border-b border-gray-100 active:bg-gray-50"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-gray-900">Edit Profile</p>
              <p className="text-xs text-gray-500">Change your display name</p>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={() => openWhatsApp(isActive)}
            className="w-full flex items-center gap-4 p-4 border-b border-gray-100 active:bg-gray-50"
          >
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-gray-900">Contact Store</p>
              <p className="text-xs text-gray-500">Chat with us on WhatsApp</p>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <Link
            href="/products"
            className="flex items-center gap-4 p-4 active:bg-gray-50"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-gray-900">Browse Products</p>
              <p className="text-xs text-gray-500">View all available items</p>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="w-full flex items-center justify-center gap-2 text-red-500 font-medium py-4 active:bg-red-50 rounded-xl"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset Demo Data
        </button>

        {/* App Info */}
        <div className="text-center py-4">
          <p className="text-xs text-gray-400">{config.storeName}</p>
          <p className="text-xs text-gray-300 mt-1">Demo App v1.0</p>
        </div>
      </div>

      {/* Edit Name Modal */}
      {showEditModal && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="bg-white rounded-t-3xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-5"></div>
            <h2 className="text-xl font-bold text-gray-900 mb-1 text-center">
              Edit Your Name
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              This will be displayed on your profile
            </p>

            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Enter your name"
              className="w-full bg-gray-100 rounded-xl py-4 px-4 text-gray-900 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none mb-6 transition-all"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
            />

            <button
              onClick={handleSaveName}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold py-4 rounded-xl active:scale-[0.98] transition-all shadow-lg mb-3"
              style={{ boxShadow: '0 4px 20px rgba(124, 58, 237, 0.35)' }}
            >
              Save Changes
            </button>
            <button
              onClick={() => setShowEditModal(false)}
              className="w-full text-gray-500 font-medium py-3"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </main>
  );
}
