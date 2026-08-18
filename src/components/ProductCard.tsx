// src/components/ProductCard.tsx
import { useState } from "react";
import { useLanguage } from "../lib/LanguageContext";

interface ProductCardProps {
  id: string;
  slug: string;
  title: string;
  shortDescription?: string;
  imageUrl?: string;
  images?: string[];
  priceLabel: string;
  price: number | string | null | undefined;
  onBuy: (id: string, title: string, price: number | string | null | undefined, priceLabel: string, imageUrl: string) => void;
  onDetails: (slug: string) => void;
}

export default function ProductCard({
  id,
  slug,
  title,
  shortDescription,
  imageUrl,
  images,
  priceLabel,
  price,
  onBuy,
  onDetails,
}: ProductCardProps) {
  const { t } = useLanguage();
  const [bought, setBought] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  const imgs = images && images.length > 0 ? images : imageUrl ? [imageUrl] : [];
  const currentImg = imgs[imgIndex] ?? "";
  const hasMultiple = imgs.length >= 2;

  function handleBuy(e: React.MouseEvent) {
    e.stopPropagation();
    onBuy(id, title, price, priceLabel, imageUrl ?? "");
    setBought(true);
    setTimeout(() => setBought(false), 2000);
  }

  function handleDetails(e: React.MouseEvent) {
    e.stopPropagation();
    onDetails(slug || id);
  }

  return (
    <div
      onClick={() => onDetails(slug || id)}
      className="group rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col cursor-pointer hover:border-slate-400 hover:shadow-lg transition-all"
    >
      {/* Image — 4:3 */}
      <div className="relative w-full" style={{ paddingBottom: "75%" }}>
        <div className="absolute inset-0 bg-white flex items-center justify-center p-4">
          {currentImg ? (
            <img
              src={currentImg}
              alt={title}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-16 h-16 rounded-xl bg-slate-100" />
          )}
        </div>
        {hasMultiple && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setImgIndex((i) => (i - 1 + imgs.length) % imgs.length); }}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/80 text-slate-700 flex items-center justify-center shadow hover:bg-white transition-colors text-lg leading-none"
            >‹</button>
            <button
              onClick={(e) => { e.stopPropagation(); setImgIndex((i) => (i + 1) % imgs.length); }}
              className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/80 text-slate-700 flex items-center justify-center shadow hover:bg-white transition-colors text-lg leading-none"
            >›</button>
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 pointer-events-none">
              {imgs.map((_, i) => (
                <span key={i} className={`inline-block w-1.5 h-1.5 rounded-full ${i === imgIndex ? 'bg-slate-600' : 'bg-slate-300'}`} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex-1 space-y-2">
          <h3 className="font-semibold text-slate-900 text-base leading-snug line-clamp-2">
            {title}
          </h3>
          {shortDescription && (
            <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
              {shortDescription}
            </p>
          )}
        </div>

        <div className="text-xl font-bold text-slate-900 mt-auto">{priceLabel}</div>

        {/* Buttons */}
        <div className="flex gap-2 pt-1 border-t border-slate-200">
          <button
            onClick={handleBuy}
            className="flex-1 rounded-xl bg-yellow-500 px-3 py-2.5 text-sm font-semibold text-black hover:bg-yellow-400 transition-colors"
          >
            {bought ? t.productCardAddedToCart : t.productCardBuy}
          </button>
          <button
            onClick={handleDetails}
            className="flex-1 rounded-xl border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:border-slate-400 transition-colors"
          >
            {t.productCardDetails}
          </button>
        </div>
      </div>
    </div>
  );
}
