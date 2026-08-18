// src/pages/AnkerProductDetails.tsx
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { normalizeCartPrice, useCart } from '../lib/CartContext';
import { apiUrl } from '../lib/api';
import { useLanguage } from '../lib/LanguageContext';

interface Spec {
  key: string;
  value: string;
}

interface ComponentSection {
  title: string;
  content?: string;
  items?: { key: string; value: string }[];
}

interface Component {
  name: string;
  type: string;
  quantity: number;
  image: string;
  sections: ComponentSection[];
}

interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string | null;
  specs: Spec[] | string | null;
  components?: Component[] | string | null;
  price?: number;
  priceLabel: string | null;
  promoLabel: string | null;
  imageUrl: string | null;
  images?: string[] | string | null;
  datasheetUrl: string | null;
  isNew: boolean;
  isPromo: boolean;
}

function parseArrayField<T>(value: T[] | string | null | undefined): T[] {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? (parsed as T[]) : [];
    } catch {
      return [];
    }
  }
  return [];
}

export default function AnkerProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { language, t } = useLanguage();
  const [addedToCart, setAddedToCart] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const productNotFoundMessage = t.ankerDetailsProductNotFound;

  useEffect(() => {
    if (!slug) return;
    const params = new URLSearchParams({ lang: language });

    fetch(apiUrl(`/packages/${slug}?${params.toString()}`))
      .then((res) => {
        if (!res.ok) throw new Error(productNotFoundMessage);
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug, language, productNotFoundMessage]);

  if (loading) {
    return (
      <main className="bg-slate-50 min-h-screen py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-1/3 mb-4" />
            <div className="h-64 bg-slate-200 rounded-xl mb-6" />
            <div className="h-4 bg-slate-200 rounded w-2/3 mb-2" />
            <div className="h-4 bg-slate-200 rounded w-1/2" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="bg-slate-50 min-h-screen py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">{t.ankerDetailsProductNotFound}</h1>
          <p className="text-slate-600 mb-6">{error || t.ankerDetailsProductMissing}</p>
          <Link
            to="/anker"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            {t.ankerDetailsBackToCatalog}
          </Link>
        </div>
      </main>
    );
  }

  const specs: Spec[] = parseArrayField<Spec>(product.specs);
  const components: Component[] = parseArrayField<Component>(product.components);
  const rawImgs: string[] = parseArrayField<string>(product.images);
  const galleryImgs: string[] = rawImgs.length > 0 ? rawImgs : (product.imageUrl ? [product.imageUrl] : []);
  const currentImg = galleryImgs[imgIndex] ?? null;
  const hasMultipleImgs = galleryImgs.length >= 2;

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-4">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-slate-700">{t.ankerDetailsHomeBreadcrumb}</Link>
            <span>/</span>
            <Link to="/anker" className="hover:text-slate-700">Anker SOLIX</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 aspect-square flex items-center justify-center overflow-hidden relative">
              {currentImg ? (
                <img
                  src={currentImg}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center text-slate-400">
                  <svg width="120" height="120" viewBox="0 0 56 56" fill="none" className="opacity-30 mx-auto">
                    <rect x="4" y="14" width="48" height="30" rx="3" stroke="#475569" strokeWidth="1.5"/>
                    <line x1="4" y1="22" x2="52" y2="22" stroke="#475569" strokeWidth="1"/>
                    <line x1="4" y1="30" x2="52" y2="30" stroke="#475569" strokeWidth="1"/>
                    <line x1="16" y1="14" x2="16" y2="44" stroke="#475569" strokeWidth="1"/>
                    <line x1="28" y1="14" x2="28" y2="44" stroke="#475569" strokeWidth="1"/>
                    <line x1="40" y1="14" x2="40" y2="44" stroke="#475569" strokeWidth="1"/>
                  </svg>
                  <p className="mt-4 text-sm">{t.ankerDetailsImageFallback}</p>
                </div>
              )}
              {hasMultipleImgs && (
                <>
                  <button onClick={() => setImgIndex((i) => (i - 1 + galleryImgs.length) % galleryImgs.length)} className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 shadow text-slate-700 flex items-center justify-center hover:bg-white transition-colors text-xl leading-none">‹</button>
                  <button onClick={() => setImgIndex((i) => (i + 1) % galleryImgs.length)} className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 shadow text-slate-700 flex items-center justify-center hover:bg-white transition-colors text-xl leading-none">›</button>
                </>
              )}
            </div>
            {hasMultipleImgs && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {galleryImgs.map((url, i) => (
                  <button key={i} onClick={() => setImgIndex(i)} className={`shrink-0 w-14 h-14 rounded-lg border-2 overflow-hidden bg-white ${i === imgIndex ? 'border-yellow-400' : 'border-slate-200 hover:border-slate-400'}`}>
                    <img src={url} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="space-y-6">
            <div>
              <div className="text-xs font-semibold tracking-widest text-yellow-600 uppercase mb-1">
                Anker SOLIX
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mt-1">{product.title}</h1>
              <p className="text-slate-600 mt-2">{product.shortDescription}</p>
            </div>

            {product.fullDescription && (
              <div className="prose prose-slate max-w-none">
                <p>{product.fullDescription}</p>
              </div>
            )}

            {specs.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {specs.map((spec, i) => (
                      <tr key={i} className="border-b border-slate-100 last:border-b-0">
                        <td className="py-3 px-4 text-slate-500 bg-slate-50 w-1/2">{spec.key}</td>
                        <td className="py-3 px-4 text-slate-900 font-medium">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Price and CTA */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              {product.priceLabel && (
                <p className="text-3xl font-bold text-slate-900 mb-2">{product.priceLabel}</p>
              )}
              <p className="text-xs text-slate-500 mb-5">{t.ankerDetailsPriceNote}</p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    if (product) {
                      addToCart({ id: product.id, name: product.title, price: normalizeCartPrice(product.price), priceDisplay: product.priceLabel ?? '', image: product.imageUrl ?? '', quantity: 1 });
                      setAddedToCart(true);
                      setTimeout(() => setAddedToCart(false), 2000);
                    }
                  }}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3.5 rounded-xl transition-colors"
                >
                  {addedToCart ? t.ankerDetailsAddedToCart : t.ankerDetailsBuyOnline}
                </button>
                <button
                  onClick={() => navigate('/anker')}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 rounded-xl transition-colors text-sm"
                >
                  {t.ankerDetailsCatalogCta}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Components section */}
        {components.length > 0 && (
          <div className="space-y-4 mt-12">
            <h2 className="text-lg font-semibold text-slate-900">{t.ankerDetailsTechnicalHeading}</h2>
            {components.map((component, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="mb-4 space-y-1">
                  <h3 className="text-base font-semibold text-slate-900">{component.name}</h3>
                  {component.type && (
                    <p className="text-sm text-slate-500">{t.ankerDetailsComponentType}: {component.type}</p>
                  )}
                  {component.quantity !== undefined && component.quantity !== null && (
                    <p className="text-sm text-slate-500">{t.ankerDetailsComponentQuantity}: {component.quantity} {t.ankerDetailsComponentUnit}</p>
                  )}
                </div>
                {component.sections && component.sections.length > 0 && (
                  <div className="space-y-3">
                    {component.sections.map((section, secIdx) => (
                      <div key={secIdx} className="border-t border-slate-100 pt-3 first:border-t-0 first:pt-0">
                        {section.title && (
                          <p className="text-sm font-medium text-slate-900 mb-2">{section.title}</p>
                        )}
                        {section.content && (
                          <p className="text-sm text-slate-600">{section.content}</p>
                        )}
                        {section.items && section.items.length > 0 && (
                          <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                            <tbody>
                              {section.items.map((item, itemIdx) => (
                                <tr key={itemIdx} className="border-b border-slate-100 last:border-b-0">
                                  <td className="py-2 px-3 text-slate-600 bg-slate-50 w-1/2">{item.key}</td>
                                  <td className="py-2 px-3 text-slate-900">{item.value}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Datasheet */}
        {product.datasheetUrl && (
          <div className="mt-6">
            <a
              href={product.datasheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-slate-100 hover:bg-slate-200 rounded-xl px-5 py-4 transition-colors"
            >
              <p className="text-sm font-medium text-slate-900">{t.ankerDetailsDatasheetTitle}</p>
              <p className="text-sm text-slate-500">{t.ankerDetailsDatasheetDownload}</p>
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
