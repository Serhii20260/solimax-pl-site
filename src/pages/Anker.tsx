// src/pages/Anker.tsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../lib/CartContext";
import { apiUrl } from "../lib/api";
import ProductCard from "../components/ProductCard";
import { useLanguage } from "../lib/LanguageContext";

interface SpecRow {
  key: string;
  value: string;
}

interface AnkerProduct {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  priceLabel: string;
  price: number | string | null | undefined;
  imageUrl: string;
  isActive: boolean;
  isPromo: boolean;
  promoLabel: string;
  subcategory: string;
  specs: SpecRow[];
}

export default function Anker() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { language, t } = useLanguage();
  const [products, setProducts] = useState<AnkerProduct[]>([]);

  useEffect(() => {
    const params = new URLSearchParams({
      category: "anker_product",
      lang: language,
    });

    fetch(apiUrl(`/packages?${params.toString()}`))
      .then((r) => r.json())
      .then((data: AnkerProduct[]) => setProducts(Array.isArray(data) ? data.filter((p) => p.isActive !== false) : []))
      .catch(() => {});
  }, [language]);

  const bySubcat = (sub: string) => products.filter((p) => p.subcategory === sub);

  const handleAddToCart = (id: string, title: string, price: number | string | null | undefined, priceLabel: string, imageUrl: string) => {
    addToCart({ id, name: title, price, priceDisplay: priceLabel, image: imageUrl, quantity: 1 });
  };

  return (
    <main className="flex flex-col">

      {/* HERO */}
      <section className="relative min-h-[60vh] md:min-h-[72vh] lg:min-h-[75vh] flex items-center">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            poster="/pl/hero-anker-poster.jpg" loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src="/pl/hero-anker.mp4"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 w-full">
          <div className="max-w-xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {t.ankerHeroTitle}
            </h1>
            <p className="text-slate-300 text-lg">
              {t.ankerHeroSubtitle}
            </p>
            <Link
              to="/propozycje"
              className="inline-flex items-center justify-center rounded-xl bg-yellow-500 px-6 py-3 text-base font-semibold text-black hover:bg-yellow-400 transition-colors"
            >
              {t.ankerHeroCta}
            </Link>
          </div>
        </div>
      </section>

      {/* BALCONY SYSTEMS */}
      {bySubcat("balcony").length > 0 && (
        <section className="bg-white py-16 px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">{t.ankerBalconyTitle}</h2>
            <p className="text-slate-500 mb-10">{t.ankerBalconySubtitle}</p>
            <div className="grid md:grid-cols-2 gap-8">
              {bySubcat("balcony").map((p) => {
                const pid = p.slug || p.id;
                return (
                  <ProductCard
                    key={pid}
                    id={pid}
                    slug={pid}
                    title={p.title}
                    shortDescription={p.shortDescription}
                    imageUrl={p.imageUrl}
                    priceLabel={p.priceLabel}
                    price={p.price}
                    onBuy={handleAddToCart}
                    onDetails={(slug) => navigate("/anker/" + slug)}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ACCESSORIES */}
      {bySubcat("accessory").length > 0 && (
        <section className="bg-slate-50 py-16 px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">{t.ankerAccessoriesTitle}</h2>
            <p className="text-slate-500 mb-10">{t.ankerAccessoriesSubtitle}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bySubcat("accessory").map((p) => {
                const pid = p.slug || p.id;
                return (
                  <ProductCard
                    key={pid}
                    id={pid}
                    slug={pid}
                    title={p.title}
                    shortDescription={p.shortDescription}
                    imageUrl={p.imageUrl}
                    priceLabel={p.priceLabel}
                    price={p.price}
                    onBuy={handleAddToCart}
                    onDetails={(slug) => navigate("/anker/" + slug)}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* PANELS */}
      {bySubcat("panel").length > 0 && (
        <section className="bg-white py-16 px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">{t.ankerPanelsTitle}</h2>
            <p className="text-slate-500 mb-10">{t.ankerPanelsSubtitle}</p>
            <div className="grid md:grid-cols-3 gap-6">
              {bySubcat("panel").map((p) => {
                const pid = p.slug || p.id;
                return (
                  <ProductCard
                    key={pid}
                    id={pid}
                    slug={pid}
                    title={p.title}
                    shortDescription={p.shortDescription}
                    imageUrl={p.imageUrl}
                    priceLabel={p.priceLabel}
                    price={p.price}
                    onBuy={handleAddToCart}
                    onDetails={(slug) => navigate("/anker/" + slug)}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* POWERSTATIONS */}
      {bySubcat("powerstation").length > 0 && (
        <section className="bg-slate-50 py-16 px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">{t.ankerPowerstationsTitle}</h2>
            <p className="text-slate-500 mb-10">{t.ankerPowerstationsSubtitle}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bySubcat("powerstation").map((p) => {
                const pid = p.slug || p.id;
                return (
                  <ProductCard
                    key={pid}
                    id={pid}
                    slug={pid}
                    title={p.title}
                    shortDescription={p.shortDescription}
                    imageUrl={p.imageUrl}
                    priceLabel={p.priceLabel}
                    price={p.price}
                    onBuy={handleAddToCart}
                    onDetails={(slug) => navigate("/anker/" + slug)}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-slate-900 text-white py-16 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">{t.ankerCtaTitle}</h2>
          <p className="text-slate-300 mb-8">
            {t.ankerCtaSubtitle}
          </p>
          <Link
            to="/propozycje"
            className="inline-flex items-center justify-center rounded-xl bg-yellow-500 px-8 py-4 text-lg font-semibold text-black hover:bg-yellow-400 transition-colors"
          >
            {t.ankerCtaButton}
          </Link>
        </div>
      </section>

    </main>
  );
}
