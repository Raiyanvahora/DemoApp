'use client';

import { config } from '@/data/config';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

export default function Header({ title, showBack, onBack, rightElement }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-br from-primary-600 to-primary-700 text-white px-5 pt-12 pb-5">
      {showBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-white/80 text-[0.8125rem] font-medium mb-2 -ml-1 active:opacity-70"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[1.375rem] font-bold tracking-tight leading-tight">
            {title || config.storeName}
          </h1>
          {!showBack && (
            <p className="text-white/70 text-[0.8125rem] font-normal mt-0.5 tracking-normal">
              {config.tagline}
            </p>
          )}
        </div>
        {rightElement}
      </div>
    </header>
  );
}
