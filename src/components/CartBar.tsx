'use client';

import Link from 'next/link';
import { useStore } from '@/lib/store';
import { sendOrderOnWhatsApp } from '@/lib/whatsapp';
import { config } from '@/data/config';

export default function CartBar() {
  const { cart, getCartTotal, getCartCount, isMembershipActive, clearCart, isHydrated } = useStore();

  const total = getCartTotal();
  const count = getCartCount();
  const isActive = isMembershipActive();

  if (!isHydrated || count === 0) {
    return null;
  }

  const handleSendOrder = () => {
    sendOrderOnWhatsApp(cart, total, isActive);
    clearCart();
  };

  return (
    <div className="fixed bottom-[72px] left-0 right-0 z-40 px-4 pb-2">
      <div className="max-w-md mx-auto">
        <div
          className="rounded-2xl p-3 flex items-center justify-between"
          style={{
            background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
            boxShadow: '0 8px 32px rgba(124, 58, 237, 0.35)'
          }}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-[0.625rem] font-bold text-purple-900">{count}</span>
              </div>
            </div>
            <div className="text-white">
              <p className="text-xs opacity-80">{count} item{count !== 1 ? 's' : ''}</p>
              <p className="text-lg font-bold tracking-tight tabular-nums">
                {config.currency}{total}
              </p>
            </div>
          </div>

          <button
            onClick={handleSendOrder}
            className="bg-white text-purple-700 text-sm font-bold py-3 px-5 rounded-xl flex items-center gap-2 active:scale-[0.97] transition-all shadow-lg"
          >
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Order Now
          </button>
        </div>

        {isActive && (
          <div className="bg-green-500 text-white text-xs font-semibold text-center py-1.5 rounded-b-xl -mt-2 pt-3">
            Free delivery with membership! 🎉
          </div>
        )}
      </div>
    </div>
  );
}
