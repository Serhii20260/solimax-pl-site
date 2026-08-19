// src/components/PromoBanner.tsx
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBannerPackages } from '../hooks/usePackages';
import type { Package } from '../lib/api';
import { useLanguage } from '../lib/LanguageContext';

interface PromoBannerProps {
  /** Auto-slide interval in ms (default: 2000) */
  interval?: number;
  /** Callback when package is clicked (optional - defaults to navigation) */
  onPackageClick?: (pkg: Package) => void;
  /** Custom class for container */
  className?: string;
  /** Layout variant: 1 = card bottom, 2 = card center, 3 = card with large visual */
  variant?: 1 | 2 | 3;
}

const promoBannerCopy = {
  pl: {
    categoryLabels: {
      home: 'Dla domu',
      business: 'Dla biznesu',
      heatpumps: 'Pompy ciepla',
      heating: 'Pompy ciepla',
      carport: 'Carport',
    },
  },
  en: {
    categoryLabels: {
      home: 'For home',
      business: 'For business',
      heatpumps: 'Heat pumps',
      heating: 'Heat pumps',
      carport: 'Carport',
    },
  },
} as const;

export default function PromoBanner({
  interval = 2000,
  onPackageClick,
  className = '',
  variant = 1,
}: PromoBannerProps) {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const copy = promoBannerCopy[language];
  const { packages, loading, error } = useBannerPackages();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (packages.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % packages.length);
    }, interval);

    return () => clearInterval(timer);
  }, [packages.length, interval, isPaused]);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % packages.length);
  }, [packages.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + packages.length) % packages.length);
  }, [packages.length]);

  const handleClick = useCallback((pkg: Package) => {
    if (onPackageClick) {
      onPackageClick(pkg);
    } else {
      navigate(`/propozycje#${pkg.id}`);
    }
  }, [onPackageClick, navigate]);

  if (loading) {
    return (
      <div className={`rounded-2xl border border-slate-200 bg-slate-50 p-6 animate-pulse ${className}`}>
        <div className="h-6 bg-slate-200 rounded w-1/3 mb-3" />
        <div className="h-4 bg-slate-200 rounded w-2/3" />
      </div>
    );
  }

  if (error || packages.length === 0) {
    return null;
  }

  const currentPackage = packages[currentIndex];

  const renderCategory = () => (
    <span className="text-xs font-medium text-slate-500 uppercase">
      {copy.categoryLabels[currentPackage.category]}
    </span>
  );

  const renderPromoLabel = (classNameValue: string) => currentPackage.promoLabel && (
    <span className={classNameValue}>
      {currentPackage.promoLabel}
    </span>
  );

  const renderVariant1 = () => (
    <div
      onClick={() => handleClick(currentPackage)}
      className="h-full flex flex-col cursor-pointer hover:bg-slate-50/50 transition"
    >
      <div className="flex-1 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative overflow-hidden">
        {currentPackage.imageUrl ? (
          <img loading="lazy" decoding="async"
            src={currentPackage.imageUrl}
            alt={currentPackage.title}
            className="w-full h-full object-contain p-2"
          />
        ) : (
          <div className="text-center p-6">
            <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-yellow-400/20 flex items-center justify-center">
              <svg className="w-10 h-10 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="3" y="8" width="18" height="10" rx="1" strokeWidth={1.5} />
                <path d="M12 3v5M8 5l4-2 4 2" strokeWidth={1.5} strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-sm text-slate-500 uppercase tracking-wider">{t.promoBannerPackageSolutions}</span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
          {currentIndex + 1} / {packages.length}
        </div>
      </div>

      <div className="p-4 md:p-5 bg-white border-t border-slate-200 text-left">
        <div className="flex items-center gap-2 mb-2">
          {renderCategory()}
          {renderPromoLabel('px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800')}
        </div>
        <h3 className="text-lg font-semibold text-slate-900 line-clamp-1">{currentPackage.title}</h3>
        <p className="mt-1 text-sm text-slate-600 line-clamp-2">{currentPackage.shortDescription}</p>
        {currentPackage.priceLabel && (
          <div className="mt-2 text-sm font-medium text-slate-900">{currentPackage.priceLabel}</div>
        )}
      </div>
    </div>
  );

  const renderVariant2 = () => (
    <div
      onClick={() => handleClick(currentPackage)}
      className="h-full flex flex-col cursor-pointer hover:bg-slate-50/50 transition"
    >
      <div className="h-40 bg-gradient-to-r from-slate-100 to-slate-200 flex items-center justify-between px-5 relative overflow-hidden">
        {currentPackage.imageUrl ? (
          <>
            <img loading="lazy" decoding="async"
              src={currentPackage.imageUrl}
              alt={currentPackage.title}
              className="absolute inset-0 w-full h-full object-contain p-2"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10" />
          </>
        ) : null}
        <div className="relative z-10">
          <span className="text-black font-semibold text-lg">SOLIMAX</span>
          <span className="ml-2 text-black/70 text-sm">{t.promoBannerPackageSolutions}</span>
        </div>
        <div className="relative z-10 bg-black/20 text-white text-xs px-2 py-1 rounded-full">
          {currentIndex + 1} / {packages.length}
        </div>
      </div>

      <div className="flex-1 p-5 md:p-6 bg-white text-left flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-3">
          {renderCategory()}
          {renderPromoLabel('px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800')}
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">{currentPackage.title}</h3>
        <p className="text-sm text-slate-600 line-clamp-3">{currentPackage.shortDescription}</p>
        {currentPackage.priceLabel && (
          <div className="mt-4 text-base font-semibold text-slate-900">{currentPackage.priceLabel}</div>
        )}
      </div>

      <div className="h-12 bg-slate-100 flex items-center justify-center px-5 border-t border-slate-200">
        <span className="text-xs text-yellow-600 font-medium">{t.promoBannerGoToProposals}</span>
      </div>
    </div>
  );

  const renderVariant3 = () => (
    <div
      onClick={() => handleClick(currentPackage)}
      className="h-full flex cursor-pointer hover:bg-slate-50/50 transition"
    >
      <div className="w-32 bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center relative overflow-hidden">
        {currentPackage.imageUrl ? (
          <>
            <img loading="lazy" decoding="async"
              src={currentPackage.imageUrl}
              alt={currentPackage.title}
              className="absolute inset-0 w-full h-full object-contain p-1"
            />
            <div className="absolute inset-0 bg-white/10" />
          </>
        ) : null}
        <span className="relative z-10 text-xs text-black/80 font-medium bg-white/80 px-2 py-1 rounded">{currentIndex + 1}/{packages.length}</span>
      </div>

      <div className="flex-1 flex flex-col bg-slate-50">
        <div className="px-5 py-4 border-b border-slate-200 bg-white">
          <span className="text-sm font-medium text-slate-700">{t.promoBannerCurrentProposals}</span>
        </div>

        <div className="flex-1 p-5 md:p-6 text-left flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            {renderPromoLabel('px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-400 text-black')}
            {renderCategory()}
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mb-2">{currentPackage.title}</h3>
          <p className="text-sm text-slate-600 line-clamp-3 flex-1">{currentPackage.shortDescription}</p>

          {currentPackage.priceLabel && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <span className="text-lg font-bold text-slate-900">{currentPackage.priceLabel}</span>
            </div>
          )}
        </div>

        <div className="px-5 py-3 bg-white border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">{packages.length} {t.promoBannerProposalsCount}</span>
          <span className="text-xs text-yellow-600 font-medium">{t.promoBannerLearnMore}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`relative rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {packages.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 shadow hover:bg-white transition"
            aria-label={t.promoBannerPrevious}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 shadow hover:bg-white transition"
            aria-label={t.promoBannerNext}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {variant === 1 && renderVariant1()}
      {variant === 2 && renderVariant2()}
      {variant === 3 && renderVariant3()}

      {packages.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
          {packages.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => { e.stopPropagation(); goTo(idx); }}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? 'bg-yellow-400 w-4'
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`${t.promoBannerGoToSlide} ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
