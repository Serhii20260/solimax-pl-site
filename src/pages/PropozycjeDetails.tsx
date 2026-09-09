// src/pages/PropozycjeDetails.tsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiUrl, normalizePackageAssets } from '../lib/api';
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

interface Package {
  id: string;
  slug: string;
  title: string;
  category: string;
  tier: string;
  shortDescription: string;
  fullDescription: string | null;
  manufacturerName: string | null;
  manufacturerUrl: string | null;
  specs: Spec[] | string | null;
  components?: Component[] | string | null;
  priceLabel: string | null;
  priceIndicative?: boolean;
  promoLabel: string | null;
  imageUrl: string | null;
  images?: string[] | string | null;
  datasheetUrl: string | null;
  isActive: boolean;
  isPromo: boolean;
  isNew: boolean;
}

const BRAND_LINKS: Array<{ match: string; name: string; url: string }> = [
  { match: 'trina', name: 'Trina Solar', url: 'https://www.trinasolar.com' },
  { match: 'ja solar', name: 'JA Solar', url: 'https://www.jasolar.com' },
  { match: 'deye', name: 'DEYE', url: 'https://www.deye.com.cn' },
  { match: 'sungrow', name: 'Sungrow', url: 'https://en.sungrowpower.com' },
  { match: 'pylontech', name: 'Pylontech', url: 'https://www.pylontech.com.cn' },
  { match: 'anker', name: 'Anker SOLIX', url: 'https://www.anker.com' },
  { match: 'sigenergy', name: 'Sigenergy', url: 'https://www.sigenergy.com' },
  { match: 'daikin', name: 'Daikin', url: 'https://www.daikin.pl' },
  { match: 'vaillant', name: 'Vaillant', url: 'https://www.vaillant.pl' },
  { match: 'k2', name: 'K2 Systems', url: 'https://k2-systems.com' },
];

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

function getManufacturer(name: string): { name: string; url: string } | null {
  const lower = name.toLowerCase();
  const brand = BRAND_LINKS.find((b) => lower.includes(b.match));
  if (!brand) return null;
  return { name: brand.name, url: brand.url };
}

function componentPriority(component: Component): number {
  const marker = `${component.type} ${component.name}`.toLowerCase();
  if (marker.includes('panel') || marker.includes('modul')) return 1;
  if (marker.includes('inverter') || marker.includes('falownik') || marker.includes('all-in-one') || marker.includes('system')) return 2;
  if (marker.includes('bater') || marker.includes('battery') || marker.includes('akumulator')) return 3;
  if (marker.includes('montaz') || marker.includes('installation') || marker.includes('konstruk')) return 4;
  if (marker.includes('cable') || marker.includes('kabel')) return 5;
  return 6;
}

export default function PropozycjeDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    const params = new URLSearchParams({ lang: language });

    fetch(apiUrl(`/packages/${slug}?${params.toString()}`))
      .then((res) => {
        if (!res.ok) throw new Error(t.propozycjeDetailsNotFound);
        return res.json();
      })
      .then((data) => {
        setPkg(normalizePackageAssets(data));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug, language, t.propozycjeDetailsNotFound]);

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

  if (error || !pkg) {
    return (
      <main className="bg-slate-50 min-h-screen py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">{t.propozycjeDetailsNotFound}</h1>
          <p className="text-slate-600 mb-6">{error || t.propozycjeDetailsMissing}</p>
          <Link
            to="/propozycje"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            {t.propozycjeDetailsBackToList}
          </Link>
        </div>
      </main>
    );
  }

  const specs: Spec[] = parseArrayField<Spec>(pkg.specs);
  const components: Component[] = parseArrayField<Component>(pkg.components).sort((a, b) => componentPriority(a) - componentPriority(b));
  const isHeatPump = pkg.category === 'heat_pump' || pkg.category === 'heatpumps';
  const summaryComponents = components.filter(c => componentPriority(c) <= 3);
  const categoryLabels: Record<string, string> = {
    home: t.propozycjeDetailsCategoryHome,
    business: t.propozycjeDetailsCategoryBusiness,
    anker: 'Anker SOLIX',
    anker_product: 'Anker SOLIX',
    heat_pump: t.propozycjeDetailsCategoryHeatPumps,
    heatpumps: t.propozycjeDetailsCategoryHeatPumps,
    carport: 'Carport',
  };
  const tierLabels: Record<string, string> = {
    standard: t.propozycjeDetailsTierStandard,
    premium: t.propozycjeDetailsTierPremium,
    basic: t.propozycjeDetailsTierBasic,
    anker: t.propozycjeDetailsTierAnker,
  };
  const categoryLabel = categoryLabels[pkg.category] || pkg.category;
  const tierLabel = tierLabels[pkg.tier] || pkg.tier;
  const displayTitle = pkg.title || '';
  const rawImgs: string[] = parseArrayField<string>(pkg.images);
  const galleryImgs: string[] = rawImgs.length > 0 ? rawImgs : (pkg.imageUrl ? [pkg.imageUrl] : []);
  const currentImg = galleryImgs[imgIndex] ?? null;
  const hasMultipleImgs = galleryImgs.length >= 2;

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-4">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-slate-700">{t.propozycjeDetailsHomeBreadcrumb}</Link>
            <span>/</span>
            <Link to="/propozycje" className="hover:text-slate-700">{t.propozycjeDetailsListBreadcrumb}</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{displayTitle}</span>
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
                <img loading="lazy" decoding="async"
                  src={currentImg}
                  alt={pkg.title}
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
                  <p className="mt-4 text-sm">{t.propozycjeDetailsImageFallback}</p>
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
                    <img loading="lazy" decoding="async" src={url} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Package description opposite image */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold tracking-widest text-yellow-600 uppercase">
                  {categoryLabel}
                </span>
                {tierLabel && (
                  <>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
                      {tierLabel}
                    </span>
                  </>
                )}
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mt-1">{displayTitle}</h1>
              <p className="text-slate-600 mt-2">{pkg.shortDescription}</p>
              {pkg.priceLabel && (
                <>
                  <p className="text-2xl font-bold text-slate-900 mt-3">{pkg.priceLabel}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {pkg.priceIndicative
                      ? t.propozycjePriceIndicativeNote
                      : t.propozycjePriceIndividualNote}
                  </p>
                </>
              )}
            </div>

            {pkg.fullDescription && (
              <div className="prose prose-slate max-w-none">
                <p>{pkg.fullDescription}</p>
              </div>
            )}

            {/* Package inclusions description - beside image */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
              <p className="text-xl font-semibold text-slate-700 leading-relaxed">
                {t.propozycjeDetailsIncludedText}
              </p>
              {isHeatPump && (
                <p className="text-xl font-semibold text-slate-700 leading-relaxed">
                  {t.propozycjeDetailsHeatPumpIncludedText}
                </p>
              )}
              {specs.length > 0 && (
                <div className="pt-2 border-t border-slate-100">
                  <ul className="space-y-1 text-xl font-semibold text-slate-600">
                    {specs.map((spec, i) => (
                      <li key={i}>{spec.key}: {spec.value}</li>
                    ))}
                  </ul>
                </div>
              )}
              {summaryComponents.length > 0 && (
                <div className="pt-2 border-t border-slate-100">
                  <ul className="space-y-1 text-xl font-semibold text-slate-600">
                    {summaryComponents.map((c, i) => (
                      <li key={i}>{c.name}: {c.quantity} {t.propozycjeDetailsUnit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full-width content below */}
        <div className="space-y-6 mt-10">

          {/* Equipment */}
          {components.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900">{t.propozycjeDetailsEquipmentHeading}</h2>
              {components.map((component, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6">
                  <div className="mb-4 space-y-2">
                    <h3 className="text-base font-semibold text-slate-900">
                      {component.name}
                    </h3>
                    <p className="text-sm text-slate-700">{t.propozycjeDetailsComponentType}: {component.type}</p>
                    {(() => {
                      const manufacturer = getManufacturer(component.name);
                      if (!manufacturer) return null;
                      return (
                        <p className="text-sm text-slate-700">
                          {t.propozycjeDetailsManufacturer}: <a href={manufacturer.url} target="_blank" rel="noopener noreferrer" className="text-yellow-700 hover:text-yellow-800 underline">{manufacturer.name}</a>
                        </p>
                      );
                    })()}
                    <p className="text-sm text-slate-700">{t.propozycjeDetailsQuantity}: {component.quantity} {t.propozycjeDetailsUnit}</p>
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
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                                <tbody>
                                  {section.items.map((item, itemIdx) => (
                                    <tr key={itemIdx} className="border-b border-slate-100 last:border-b-0">
                                      <td className="py-2 px-3 text-slate-600 bg-slate-50 w-1/2 break-words">{item.key}</td>
                                      <td className="py-2 px-3 text-slate-900 break-words">{item.value}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
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
          {pkg.datasheetUrl && (
            <a
              href={pkg.datasheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-slate-100 hover:bg-slate-200 rounded-xl px-5 py-4 transition-colors"
            >
              <p className="text-sm font-medium text-slate-900">{t.propozycjeDetailsDatasheetTitle}</p>
              <p className="text-sm text-slate-500">{t.propozycjeDetailsDatasheetDownload}</p>
            </a>
          )}

          {/* Price and CTA */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            {pkg.priceLabel && (
              <p className="text-3xl font-bold text-slate-900 mb-4">{pkg.priceLabel}</p>
            )}
            <p className="text-xs text-slate-500 mb-6">
              {t.propozycjeDetailsPriceNote}
            </p>
            <div className="space-y-3 sm:max-w-sm">
              <Link
                to="/kontakt"
                className="block w-full text-center bg-slate-900 hover:bg-slate-700 text-white font-semibold py-3.5 rounded-xl transition-colors"
              >
                {t.propozycjeDetailsConsultationCta}
              </Link>
              <Link
                to="/propozycje"
                className="block w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 rounded-xl transition-colors text-sm"
              >
                {t.propozycjeDetailsOtherProposals}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
