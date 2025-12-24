'use client';

import Link from 'next/link';
import { useStore } from '@/lib/store';
import { config } from '@/data/config';

export default function MembershipCard() {
  const { isMembershipActive, getDaysRemaining, isHydrated } = useStore();

  const isActive = isMembershipActive();
  const daysLeft = getDaysRemaining();

  if (!isHydrated) {
    return (
      <div className="card-elevated p-6 animate-pulse">
        <div className="h-3 bg-gray-200 rounded w-24 mb-4"></div>
        <div className="h-5 bg-gray-200 rounded w-44 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </div>
    );
  }

  if (isActive) {
    return (
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white shadow-soft">
        <div className="flex items-start justify-between mb-3">
          <span className="inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-white/90">
            <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse"></span>
            Active Member
          </span>
          <span className="text-xl">👑</span>
        </div>

        <h3 className="text-[1.25rem] font-bold tracking-tight mb-0.5">
          Free Delivery
        </h3>
        <p className="text-white/70 text-[0.8125rem] font-normal mb-4">
          {daysLeft} day{daysLeft !== 1 ? 's' : ''} remaining
        </p>

        <Link
          href="/membership"
          className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/25 text-white text-[0.8125rem] font-semibold py-2 px-4 rounded-xl transition-colors"
        >
          View Details
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    );
  }

  return (
    <div className="card-elevated p-6">
      <div className="flex items-start justify-between mb-3">
        <span className="text-[0.6875rem] font-semibold uppercase tracking-wider text-gray-400">
          Join Today
        </span>
        <span className="text-xl">⭐</span>
      </div>

      <h3 className="text-[1.25rem] font-bold text-gray-900 tracking-tight mb-1">
        Become a Member
      </h3>
      <p className="text-[1.125rem] font-bold text-emerald-600 tabular-nums mb-0.5">
        {config.currency}{config.membershipPrice}
        <span className="text-[0.8125rem] font-normal text-gray-400">/month</span>
      </p>
      <p className="text-[0.8125rem] text-gray-500 mb-4 leading-relaxed">
        Get free delivery on all orders
      </p>

      <Link
        href="/membership"
        className="inline-flex items-center gap-1.5 btn-primary text-[0.8125rem] py-2.5 px-4"
      >
        Learn More
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
