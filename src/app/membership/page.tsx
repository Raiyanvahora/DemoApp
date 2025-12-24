'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import { useStore } from '@/lib/store';
import { config } from '@/data/config';

export default function MembershipPage() {
  const router = useRouter();
  const { isMembershipActive, getDaysRemaining, activateMembership, user } = useStore();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const isActive = isMembershipActive();
  const daysLeft = getDaysRemaining();

  const handlePayment = () => {
    activateMembership();
    setShowPaymentModal(false);
  };

  const expiryDate = user.membershipExpiry
    ? new Date(user.membershipExpiry).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <main className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <header className="bg-purple-600 text-white px-4 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/"
            className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-lg font-bold">Membership</h1>
        </div>

        {/* Price Card */}
        <div className="bg-white rounded-2xl p-5 text-center">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            BEST VALUE
          </div>
          <div className="flex items-baseline justify-center gap-1 mb-2">
            <span className="text-4xl font-extrabold text-gray-900 tabular-nums">
              {config.currency}{config.membershipPrice}
            </span>
            <span className="text-gray-500 text-sm">/month</span>
          </div>
          <p className="text-gray-500 text-sm mb-4">Unlimited free deliveries</p>

          {isActive ? (
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 py-2 px-4 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="font-semibold text-sm">Active until {expiryDate}</span>
            </div>
          ) : (
            <button
              onClick={() => setShowPaymentModal(true)}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold py-4 rounded-xl active:scale-[0.98] transition-all shadow-lg"
              style={{ boxShadow: '0 4px 20px rgba(124, 58, 237, 0.35)' }}
            >
              Join Now
            </button>
          )}
        </div>
      </header>

      <div className="px-4 py-5 space-y-4">
        {/* Benefits */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Member Benefits</h3>
          <ul className="space-y-4">
            {[
              { icon: '🚚', title: 'Free Delivery', desc: 'On every order, no minimum' },
              { icon: '⚡', title: 'Priority Service', desc: 'Get your orders first' },
              { icon: '💬', title: 'WhatsApp Ordering', desc: 'Order anytime via chat' },
              { icon: '📍', title: 'Wide Coverage', desc: `Delivery within ${config.deliveryRadius}` },
            ].map((benefit, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-11 h-11 bg-purple-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{benefit.title}</h4>
                  <p className="text-gray-500 text-xs mt-0.5">{benefit.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* How it works */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5">
          <h3 className="font-bold text-purple-900 mb-3">How it works</h3>
          <div className="space-y-3">
            {[
              { step: '1', text: 'Pay ₹200 membership fee' },
              { step: '2', text: 'Get free delivery for 30 days' },
              { step: '3', text: 'Order unlimited times via WhatsApp' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-7 h-7 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {item.step}
                </div>
                <span className="text-purple-800 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Renew button for active members */}
        {isActive && (
          <button
            onClick={() => setShowPaymentModal(true)}
            className="w-full bg-white text-purple-600 font-bold py-4 rounded-xl border-2 border-purple-600 active:scale-[0.98] transition-all"
          >
            Renew Membership
          </button>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center"
          onClick={() => setShowPaymentModal(false)}
        >
          <div
            className="bg-white rounded-t-3xl p-6 w-full max-w-md animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-5"></div>
            <h2 className="text-xl font-bold text-gray-900 mb-1 text-center">
              Complete Payment
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              Demo mode - no real payment
            </p>

            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-500">Membership</span>
                <span className="font-semibold text-gray-900">1 Month</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-purple-600 tabular-nums">
                  {config.currency}{config.membershipPrice}
                </span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold py-4 rounded-xl active:scale-[0.98] transition-all shadow-lg mb-3"
              style={{ boxShadow: '0 4px 20px rgba(124, 58, 237, 0.35)' }}
            >
              Pay {config.currency}{config.membershipPrice}
            </button>
            <button
              onClick={() => setShowPaymentModal(false)}
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
