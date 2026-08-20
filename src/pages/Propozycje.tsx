// src/pages/Propozycje.tsx
// v3 - Daikin ETVH12/ETVH16 update
import { Link } from 'react-router-dom'
import { useLanguage } from '../lib/LanguageContext'
import { priceLabelOf, PRICES } from '../lib/prices.generated'

type PackageCard = {
  id: string
  title?: string
  subtitle?: string
  kw?: string
  components?: string
  brand?: string
  model?: string
  tag?: string
  temp?: string
  image: string
  features: string[]
  subsidy?: string
  bessPL?: string
}

/**
 * Ціна на картці. Головна цифра й дрібний рядок під нею приходять із
 * prices.generated.ts — того самого джерела, з якого їх віддає API.
 * Тут нічого не форматується й не дописується.
 */
function CardPrice({ id, lang, note }: { id: string; lang: string; note: string }) {
  const price = priceLabelOf(id, lang)
  if (!price) return null
  const indicative = PRICES[id]?.indicative
  return (
    <>
      <p className="text-2xl font-bold text-slate-900">{price.main}</p>
      <p className="text-xs text-slate-500 mt-0.5">{price.sub}</p>
      {indicative && <p className="text-xs text-slate-500 mt-0.5">{note}</p>}
    </>
  )
}

export default function Propozycje() {
  const { t, language } = useLanguage()

  const ankerPakiet: PackageCard = {
    id: 'anker-smart-system',
    title: 'Anker SOLIX Smart System',
    subtitle: 'Power Dock + 3× Solarbank 3 + 3× BP2700 + 12× RS40P',
    image: '/pl/anker-smart-system.webp',
    features: [
      t.propozycjeAnkerSmartFeature1,
      t.propozycjeAnkerSmartFeature2,
      t.propozycjeAnkerSmartFeature3,
      t.propozycjeAnkerSmartFeature4,
      t.propozycjeAnkerSmartFeature5,
    ],
  }

  const ankerX1Pakiety: PackageCard[] = [
    {
      id: 'anker-x1-5kw',
      title: t.propozycjeAnkerX1_5Title,
      subtitle: t.propozycjeAnkerX1_5Subtitle,
      image: '/pl/anker-x1-5kwh.webp',
      features: [
        t.propozycjeAnkerX1_5Feature1,
        t.propozycjeAnkerX1_5Feature2,
        t.propozycjeAnkerX1_5Feature3,
        t.propozycjeAnkerX1Feature4,
      ],
    },
    {
      id: 'anker-x1-12kw',
      title: t.propozycjeAnkerX1_12Title,
      subtitle: t.propozycjeAnkerX1_12Subtitle,
      image: '/pl/anker-x1-15kwh.webp',
      features: [
        t.propozycjeAnkerX1_12Feature1,
        t.propozycjeAnkerX1_12Feature2,
        t.propozycjeAnkerX1_12Feature3,
        t.propozycjeAnkerX1Feature4,
      ],
    },
  ]

  const pvBazikPakiety: PackageCard[] = [
    {
      id: 'bazik-8kw',
      kw: '8 kW',
      components: t.propozycjeBazik8Components,
      image: '/pl/pakiet-deye.webp',
      features: [
        '18× Trina Vertex S+ 445W full black glass-glass',
        t.propozycjeBazik8Feature2,
        t.propozycjeBazik8Feature3,
        t.propozycjeRegistrationIncluded,
      ],
    },
    {
      id: 'bazik-10kw',
      kw: '10 kW',
      components: t.propozycjeBazik10Components,
      image: '/pl/pakiet-deye.webp',
      features: [
        '22× Trina Vertex S+ 445W full black glass-glass',
        t.propozycjeBazik10Feature2,
        t.propozycjeBazik8Feature3,
        t.propozycjeRegistrationIncluded,
      ],
    },
    {
      id: 'bazik-12kw',
      kw: '12 kW',
      components: t.propozycjeBazik12Components,
      image: '/pl/pakiet-deye-2.webp',
      features: [
        '27× Trina Vertex S+ 445W full black glass-glass',
        t.propozycjeBazik12Feature2,
        t.propozycjeBazik12Feature3,
        t.propozycjeRegistrationIncluded,
      ],
    },
  ]

  const pvPremiumPakiety: PackageCard[] = [
    {
      id: 'premium-8kw',
      kw: '8 kW',
      components: 'Sigenergy 8 kW + 8 kWh + AIKO 475W',
      image: '/pl/sigenergy-pakiet.webp',
      features: [
        t.propozycjePremium8Feature1,
        t.propozycjePremium8Feature2,
        t.propozycjePremiumFeature3,
        t.propozycjeRegistrationIncluded,
      ],
    },
    {
      id: 'premium-10kw',
      kw: '10 kW',
      components: 'Sigenergy 8 kW + 16 kWh + AIKO 475W',
      image: '/pl/sigenergy-pakiet.webp',
      features: [
        t.propozycjePremium10Feature1,
        t.propozycjePremium10Feature2,
        t.propozycjePremium10Feature3,
        t.propozycjeRegistrationIncluded,
      ],
    },
    {
      id: 'premium-12kw',
      kw: '12 kW',
      components: 'Sigenergy 12 kW + 16 kWh + AIKO 475W',
      image: '/pl/sigenergy-pakiet.webp',
      features: [
        t.propozycjePremium12Feature1,
        t.propozycjePremium12Feature2,
        t.propozycjePremium12Feature3,
        t.propozycjeRegistrationIncluded,
      ],
    },
  ]

  const tnPakiety: PackageCard[] = [
    {
      id: 'daikin-mt-10kw',
      brand: 'Daikin',
      model: 'Altherma 3 H MT 10 kW',
      tag: t.propozycjeHeatDaikinMtTag,
      temp: t.propozycjeHeatDaikinMtTemp,
      image: '/pl/daikin-pakiet.webp',
      features: [
        t.propozycjeHeatDaikinMtFeature1,
        t.propozycjeHeatDaikinMtFeature2,
        t.propozycjeHeatBuffer80,
        t.propozycjeHeatInstallFeature,
        'Czyste Powietrze — do 40 000,00 zł',
        t.propozycjeWarrantyDocsFeature,
      ],
      subsidy: t.propozycjeSubsidyCzyste,
    },
    {
      id: 'daikin-ht-14kw',
      brand: 'Daikin',
      model: 'Altherma 3 H HT 14 kW',
      tag: t.propozycjeHeatDaikinHtTag,
      temp: t.propozycjeHeatDaikinHtTemp,
      image: '/pl/daikin-pakiet.webp',
      features: [
        t.propozycjeHeatDaikinHtFeature1,
        t.propozycjeHeatDaikinHtFeature2,
        t.propozycjeHeatBuffer150,
        t.propozycjeHeatInstallFeature,
        'Czyste Powietrze — do 40 000,00 zł',
        t.propozycjeWarrantyDocsFeature,
      ],
      subsidy: t.propozycjeSubsidyCzyste,
    },
    {
      id: 'vaillant-7kw',
      brand: 'Vaillant',
      model: 'aroTHERM Plus 7 kW R290',
      tag: t.propozycjeHeatVaillant7Tag,
      temp: t.propozycjeHeatVaillant7Temp,
      image: '/pl/vaillant-pakiet.webp',
      features: [
        'Jednostka zewnętrzna: Vaillant aroTHERM Plus VWL 75/6A',
        t.propozycjeHeatVaillant7Feature2,
        t.propozycjeHeatBuffer80,
        t.propozycjeHeatR290Feature,
        'Czyste Powietrze — do 40 000,00 zł',
        t.propozycjeWarrantyDocsFeature,
      ],
      subsidy: t.propozycjeSubsidyCzyste,
    },
    {
      id: 'vaillant-12kw',
      brand: 'Vaillant',
      model: 'aroTHERM Plus 12 kW R290',
      tag: t.propozycjeHeatVaillant12Tag,
      temp: t.propozycjeHeatVaillant12Temp,
      image: '/pl/vaillant-pakiet-12.webp',
      features: [
        'Jednostka zewnętrzna: Vaillant aroTHERM Plus VWL 125/6A',
        t.propozycjeHeatVaillant12Feature2,
        t.propozycjeHeatBuffer150,
        t.propozycjeHeatR290Feature,
        'Czyste Powietrze — do 40 000,00 zł',
        t.propozycjeWarrantyDocsFeature,
      ],
      subsidy: t.propozycjeSubsidyCzyste,
    },
  ]

  const biznesPakiety: PackageCard[] = [
    {
      id: 'biznes-30kw',
      kw: '30 kW',
      components: '2× Deye 15 kW + 65× Trina 460W',
      image: '/pl/biznes-deye-30kw.webp',
      features: [
        '65× Trina Vertex S+ 460W',
        t.propozycjeBusiness30Feature2,
        t.propozycjeBusiness30Feature3,
        t.propozycjeBusinessDocsFeature,
      ],
      bessPL: '+42 000,00 zł z BESS',
    },
    {
      id: 'biznes-100kw',
      kw: '100 kW',
      components: '1× Sungrow SG110CX + 218× Trina 460W',
      image: '/pl/biznes-sungrow.webp',
      features: [
        '218× Trina Vertex S+ 460W',
        t.propozycjeBusiness100Feature2,
        t.propozycjeBusiness100Feature3,
        t.propozycjeBusinessDocsFeature,
      ],
      bessPL: '+220 000,00 zł z PowerStack',
    },
    {
      id: 'biznes-200kw',
      kw: '200 kW',
      components: '2× Sungrow SG110CX + 435× Trina 460W',
      image: '/pl/biznes-sungrow.webp',
      features: [
        '435× Trina Vertex S+ 460W',
        t.propozycjeBusiness200Feature2,
        t.propozycjeBusiness200Feature3,
        t.propozycjeBusinessDocsFeature,
      ],
      bessPL: '+440 000,00 zł z PowerStack',
    },
  ]

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* ═══ HERO ═══ */}
      <section className="relative w-full min-h-[60vh] md:min-h-[72vh] lg:min-h-[75vh] overflow-hidden">
        <div className="absolute inset-0">
          <img loading="lazy" decoding="async"
            src="/pl/hero-propozycje.webp"
            alt={t.propozycjeHeroAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="relative z-10 flex h-full min-h-[60vh] md:min-h-[72vh] lg:min-h-[75vh] items-center">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16">
            <div className="max-w-xl space-y-4">
              <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase">{t.propozycjeHeroEyebrow}</p>
              <h1 className="text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-5xl xl:text-6xl">
                {t.propozycjeHeroTitle}
              </h1>
              <p className="text-lg leading-relaxed text-white/85 md:text-xl lg:text-2xl">
                {t.propozycjeHeroSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ANKER ═══ */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">⚡</span>
            <h2 className="text-2xl font-semibold">{t.propozycjeAnkerSectionTitle}</h2>
          </div>
          <p className="text-slate-500 text-sm mb-8">{t.propozycjeAnkerSectionSubtitle}</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-yellow-400 transition-colors flex flex-col">
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-5">
                <span className="text-xs font-semibold tracking-widest text-yellow-400 uppercase">Anker SOLIX</span>
                <h3 className="text-xl font-bold text-white mt-1">Smart System</h3>
                <p className="text-slate-400 text-xs mt-1">{ankerPakiet.subtitle}</p>
              </div>
              <div className="p-5 space-y-4 flex flex-col flex-1">
                <div className="relative w-full h-64 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex flex-col items-center justify-center gap-3 mb-1">
                  <img loading="lazy" decoding="async" src={ankerPakiet.image} alt={ankerPakiet.title} className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 right-2 bg-yellow-400 text-slate-900 font-medium text-[10px] px-2 py-0.5 rounded">{t.propozycjeDeliveryInstallIncluded}</span>
                </div>
                <ul className="space-y-1.5 flex-1">
                  {ankerPakiet.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="text-yellow-500 mt-0.5">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <div className="pt-3 border-t border-slate-100 mt-auto">
                  <CardPrice id={ankerPakiet.id} lang={language} note={t.propozycjePriceIndicativeNote} />
                </div>
                <Link to={`/propozycje/${ankerPakiet.id}`} className="block w-full text-center bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2.5 rounded-xl transition-colors text-sm">
                  {t.propozycjeDetailsButton}
                </Link>
              </div>
            </div>
            {/* Anker X1 packages */}
            {ankerX1Pakiety.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-yellow-400 transition-colors flex flex-col">
                <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-5">
                  <span className="text-xs font-semibold tracking-widest text-yellow-400 uppercase">Anker SOLIX</span>
                  <h3 className="text-xl font-bold text-white mt-1">{p.title}</h3>
                  <p className="text-slate-400 text-xs mt-1">{p.subtitle}</p>
                </div>
                <div className="p-5 space-y-4 flex flex-col flex-1">
                  <div className="relative w-full h-64 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex flex-col items-center justify-center gap-3 mb-1">
                    {p.image ? (
                      <img loading="lazy" decoding="async" src={p.image} alt={p.title} className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <svg width="64" height="64" viewBox="0 0 80 80" fill="none" className="opacity-30">
                          <rect x="8" y="20" width="64" height="40" rx="4" stroke="#475569" strokeWidth="2"/>
                          <line x1="8" y1="32" x2="72" y2="32" stroke="#475569" strokeWidth="1.5"/>
                          <line x1="8" y1="44" x2="72" y2="44" stroke="#475569" strokeWidth="1.5"/>
                          <line x1="24" y1="20" x2="24" y2="60" stroke="#475569" strokeWidth="1.5"/>
                          <line x1="40" y1="20" x2="40" y2="60" stroke="#475569" strokeWidth="1.5"/>
                          <line x1="56" y1="20" x2="56" y2="60" stroke="#475569" strokeWidth="1.5"/>
                          <rect x="32" y="62" width="16" height="8" rx="2" stroke="#475569" strokeWidth="1.5"/>
                        </svg>
                        <span className="text-xs text-slate-400 uppercase tracking-widest">{t.propozycjePackagePhoto}</span>
                      </>
                    )}
                    <span className="absolute bottom-2 right-2 bg-yellow-400 text-slate-900 font-medium text-[10px] px-2 py-0.5 rounded">{t.propozycjeDeliveryInstallIncluded}</span>
                  </div>
                  <ul className="space-y-1.5 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-yellow-500 mt-0.5">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-slate-100 mt-auto">
                    <CardPrice id={p.id} lang={language} note={t.propozycjePriceIndicativeNote} />
                  </div>
                  <Link to={`/propozycje/${p.id}`} className="block w-full text-center bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2.5 rounded-xl transition-colors text-sm">
                    {t.propozycjeDetailsButton}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PV STANDARD ═══ */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🏠</span>
            <h2 className="text-2xl font-semibold">{t.propozycjePvStandardTitle}</h2>
          </div>
          <p className="text-slate-500 text-sm mb-8">{t.propozycjePvStandardSubtitle}</p>
          <div className="grid md:grid-cols-3 gap-6">
            {pvBazikPakiety.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-yellow-400 transition-colors">
                <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-5">
                  <span className="text-xs font-semibold tracking-widest text-yellow-400 uppercase">{t.propozycjeStandardLabel}</span>
                  <h3 className="text-xl font-bold text-white mt-1">{p.kw}</h3>
                  <p className="text-slate-400 text-xs mt-1 break-words">{p.components}</p>
                </div>
                <div className="p-5 space-y-4">
                  <div className="relative w-full h-64 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex flex-col items-center justify-center gap-3 mb-1">
                    {p.image ? (
                      <img loading="lazy" decoding="async" src={p.image} alt={p.kw} className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <svg width="64" height="64" viewBox="0 0 56 56" fill="none" className="opacity-30">
                          <rect x="4" y="14" width="48" height="30" rx="3" stroke="#475569" strokeWidth="1.5"/>
                          <line x1="4" y1="22" x2="52" y2="22" stroke="#475569" strokeWidth="1"/>
                          <line x1="4" y1="30" x2="52" y2="30" stroke="#475569" strokeWidth="1"/>
                          <line x1="4" y1="38" x2="52" y2="38" stroke="#475569" strokeWidth="1"/>
                          <line x1="16" y1="14" x2="16" y2="44" stroke="#475569" strokeWidth="1"/>
                          <line x1="28" y1="14" x2="28" y2="44" stroke="#475569" strokeWidth="1"/>
                          <line x1="40" y1="14" x2="40" y2="44" stroke="#475569" strokeWidth="1"/>
                          <line x1="24" y1="44" x2="32" y2="50" stroke="#475569" strokeWidth="1.5"/>
                          <line x1="20" y1="50" x2="36" y2="50" stroke="#475569" strokeWidth="1.5"/>
                        </svg>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest">{t.propozycjeSystemPhoto}</span>
                      </>
                    )}
                    <span className="absolute bottom-2 right-2 bg-yellow-400 text-slate-900 font-medium text-[10px] px-2 py-0.5 rounded">{t.propozycjeDeliveryInstallIncluded}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-yellow-500 mt-0.5">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-slate-100">
                    <CardPrice id={p.id} lang={language} note={t.propozycjePriceIndicativeNote} />
                  </div>
                  <Link to={`/propozycje/${p.id}`} className="block w-full text-center bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2.5 rounded-xl transition-colors text-sm">
                    {t.propozycjeDetailsButton}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PV PREMIUM ═══ */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">⭐</span>
            <h2 className="text-2xl font-semibold">{t.propozycjePvPremiumTitle}</h2>
          </div>
          <p className="text-slate-500 text-sm mb-8">{t.propozycjePvPremiumSubtitle}</p>
          <div className="grid md:grid-cols-3 gap-6">
            {pvPremiumPakiety.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-yellow-400 transition-colors">
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-5">
                  <span className="text-xs font-semibold tracking-widest text-yellow-400 uppercase">{t.propozycjePremiumLabel}</span>
                  <h3 className="text-xl font-bold text-white mt-1">{p.kw}</h3>
                  <p className="text-slate-400 text-xs mt-1 break-words">{p.components}</p>
                </div>
                <div className="p-5 space-y-4">
                  <div className="relative w-full h-64 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex flex-col items-center justify-center gap-3 mb-1">
                    {p.image ? (
                      <img loading="lazy" decoding="async" src={p.image} alt={p.kw} className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <svg width="64" height="64" viewBox="0 0 56 56" fill="none" className="opacity-30">
                          <rect x="4" y="14" width="48" height="30" rx="3" stroke="#475569" strokeWidth="1.5"/>
                          <line x1="4" y1="22" x2="52" y2="22" stroke="#475569" strokeWidth="1"/>
                          <line x1="4" y1="30" x2="52" y2="30" stroke="#475569" strokeWidth="1"/>
                          <line x1="4" y1="38" x2="52" y2="38" stroke="#475569" strokeWidth="1"/>
                          <line x1="16" y1="14" x2="16" y2="44" stroke="#475569" strokeWidth="1"/>
                          <line x1="28" y1="14" x2="28" y2="44" stroke="#475569" strokeWidth="1"/>
                          <line x1="40" y1="14" x2="40" y2="44" stroke="#475569" strokeWidth="1"/>
                          <line x1="24" y1="44" x2="32" y2="50" stroke="#475569" strokeWidth="1.5"/>
                          <line x1="20" y1="50" x2="36" y2="50" stroke="#475569" strokeWidth="1.5"/>
                        </svg>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest">{t.propozycjeSystemPhoto}</span>
                      </>
                    )}
                    <span className="absolute bottom-2 right-2 bg-yellow-400 text-slate-900 font-medium text-[10px] px-2 py-0.5 rounded">{t.propozycjeDeliveryInstallIncluded}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-yellow-500 mt-0.5">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                <div className="pt-3 border-t border-slate-100">
                  <CardPrice id={p.id} lang={language} note={t.propozycjePriceIndicativeNote} />
                </div>
                  <Link to={`/propozycje/${p.id}`} className="block w-full text-center bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2.5 rounded-xl transition-colors text-sm">
                    {t.propozycjeDetailsButton}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HEAT PUMPS */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">♨️</span>
            <h2 className="text-2xl font-semibold">{t.propozycjeHeatPumpsTitle}</h2>
          </div>
          <p className="text-slate-500 text-sm mb-8">{t.propozycjeHeatPumpsSubtitle}</p>
          <div className="grid md:grid-cols-2 gap-6">
            {tnPakiety.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-yellow-400 transition-colors">
                <div className="bg-gradient-to-r from-slate-100 to-slate-50 p-5 border-b border-slate-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-semibold tracking-widest text-slate-500 uppercase">{p.brand}</span>
                      <h3 className="text-lg font-bold text-slate-900 mt-0.5">{p.model}</h3>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">{p.tag}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-slate-400">{t.propozycjeFlowTempLabel}</p>
                      <p className="text-sm font-bold text-slate-700">{p.temp}</p>
                    </div>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div className="relative w-full h-64 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col items-center justify-center gap-3 mb-1">
                    {p.image ? (
                      <img loading="lazy" decoding="async" src={p.image} alt={p.model} className="w-full h-full object-contain" />
                    ) : (
                      <>
                        <svg width="64" height="64" viewBox="0 0 56 56" fill="none" className="opacity-30">
                          <rect x="4" y="14" width="48" height="30" rx="3" stroke="#475569" strokeWidth="1.5"/>
                          <line x1="4" y1="22" x2="52" y2="22" stroke="#475569" strokeWidth="1"/>
                          <line x1="4" y1="30" x2="52" y2="30" stroke="#475569" strokeWidth="1"/>
                          <line x1="4" y1="38" x2="52" y2="38" stroke="#475569" strokeWidth="1"/>
                          <line x1="16" y1="14" x2="16" y2="44" stroke="#475569" strokeWidth="1"/>
                          <line x1="28" y1="14" x2="28" y2="44" stroke="#475569" strokeWidth="1"/>
                          <line x1="40" y1="14" x2="40" y2="44" stroke="#475569" strokeWidth="1"/>
                          <line x1="24" y1="44" x2="32" y2="50" stroke="#475569" strokeWidth="1.5"/>
                          <line x1="20" y1="50" x2="36" y2="50" stroke="#475569" strokeWidth="1.5"/>
                        </svg>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest">{t.propozycjeSystemPhoto}</span>
                      </>
                    )}
                    <span className="absolute bottom-2 right-2 bg-yellow-400 text-slate-900 font-medium text-[10px] px-2 py-0.5 rounded">{t.propozycjeDeliveryInstallIncluded}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-yellow-500 mt-0.5">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-xs text-slate-500">{p.subsidy}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-end justify-between">
                    <div>
                      <CardPrice id={p.id} lang={language} note={t.propozycjePriceIndicativeNote} />
                    </div>
                    <Link to={`/propozycje/${p.id}`} className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-5 rounded-xl transition-colors text-sm">
                      {t.propozycjeDetailsButton}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🏭</span>
            <h2 className="text-2xl font-semibold">{t.propozycjeBusinessTitle}</h2>
          </div>
          <p className="text-slate-500 text-sm mb-8">{t.propozycjeBusinessSubtitle}</p>
          <div className="grid md:grid-cols-3 gap-6">
            {biznesPakiety.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-yellow-400 transition-colors">
                <div className="bg-gradient-to-r from-slate-700 to-slate-600 p-5">
                  <span className="text-xs font-semibold tracking-widest text-yellow-400 uppercase">{t.propozycjeBusinessLabel}</span>
                  <h3 className="text-xl font-bold text-white mt-1">{p.kw}</h3>
                  <p className="text-slate-300 text-xs mt-1 break-words">{p.components}</p>
                </div>
                <div className="p-5 space-y-4">
                  <div className="relative w-full h-64 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex flex-col items-center justify-center gap-3 mb-1">
                    {p.image ? (
                      <img loading="lazy" decoding="async" src={p.image} alt={p.kw} className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <svg width="64" height="64" viewBox="0 0 56 56" fill="none" className="opacity-30">
                          <rect x="4" y="14" width="48" height="30" rx="3" stroke="#475569" strokeWidth="1.5"/>
                          <line x1="4" y1="22" x2="52" y2="22" stroke="#475569" strokeWidth="1"/>
                          <line x1="4" y1="30" x2="52" y2="30" stroke="#475569" strokeWidth="1"/>
                          <line x1="4" y1="38" x2="52" y2="38" stroke="#475569" strokeWidth="1"/>
                          <line x1="16" y1="14" x2="16" y2="44" stroke="#475569" strokeWidth="1"/>
                          <line x1="28" y1="14" x2="28" y2="44" stroke="#475569" strokeWidth="1"/>
                          <line x1="40" y1="14" x2="40" y2="44" stroke="#475569" strokeWidth="1"/>
                          <line x1="24" y1="44" x2="32" y2="50" stroke="#475569" strokeWidth="1.5"/>
                          <line x1="20" y1="50" x2="36" y2="50" stroke="#475569" strokeWidth="1.5"/>
                        </svg>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest">{t.propozycjeSystemPhoto}</span>
                      </>
                    )}
                    <span className="absolute bottom-2 right-2 bg-yellow-400 text-slate-900 font-medium text-[10px] px-2 py-0.5 rounded">{t.propozycjeDeliveryInstallIncluded}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-yellow-500 mt-0.5">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-slate-100">
                    <CardPrice id={p.id} lang={language} note={t.propozycjePriceIndicativeNote} />
                    <p className="text-xs text-yellow-600 mt-1 font-medium">{p.bessPL}</p>
                  </div>
                  <Link to={`/propozycje/${p.id}`} className="block w-full text-center bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2.5 rounded-xl transition-colors text-sm">
                    {t.propozycjeDetailsButton}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CARPORT ═══ */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🚗</span>
            <h2 className="text-2xl font-semibold">{t.propozycjeCarportTitle}</h2>
          </div>
          <p className="text-slate-500 text-sm mb-8">{t.propozycjeCarportSubtitle}</p>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Carport Hybrid 3F */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="aspect-[4/3] overflow-hidden">
                <img loading="lazy" decoding="async"
                  src="/pl/carport-hybrid.webp"
                  alt="Carport Hybrid 3F"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🚘</span>
                  <h3 className="font-bold text-lg text-slate-800">Carport Hybrid 3F</h3>
                </div>
                <p className="text-slate-500 text-sm mb-4">{t.propozycjeCarportHybridMeta}</p>
                <ul className="text-sm text-slate-600 space-y-2 mb-6">
                  <li>• {t.propozycjeCarportPanels10}</li>
                  <li>• {t.propozycjeCarportHybridFeature2}</li>
                  <li>• {t.propozycjeCarportHybridFeature3}</li>
                  <li>• Wallbox Anker SOLIX V1 7,4 kW AC (Type 2)</li>
                  <li>• {t.propozycjeCarportHybridFeature5}</li>
                </ul>
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-2xl font-bold text-slate-900">{t.propozycjeFromLabel} 42 600 <span className="text-base font-normal">{t.propozycjeNetPriceLabel}</span></p>
                  <p className="text-sm text-slate-500 mt-1">{t.propozycjeCarportHybridBattery}</p>
                </div>
              </div>
              <div className="px-6 pb-6">
                <Link to="/carport" className="block w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 px-4 rounded-xl transition-colors text-center text-sm">
                  {t.propozycjeDetailsArrow}
                </Link>
              </div>
            </div>
            {/* Carport Premium DC EV */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="aspect-[4/3] overflow-hidden">
                <img loading="lazy" decoding="async" src="/pl/carport-premium.webp" alt="Carport Premium DC EV" className="w-full h-full object-cover"/>
              </div>
              <div className="p-6 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">⚡</span>
                  <h3 className="font-bold text-lg text-slate-800">Carport Premium DC EV</h3>
                </div>
                <p className="text-slate-500 text-sm mb-4">{t.propozycjeCarportPremiumMeta}</p>
                <ul className="text-sm text-slate-600 space-y-2 mb-6">
                  <li>• {t.propozycjeCarportPanels10}</li>
                  <li>• Sigenergy SigenStor 5 kW all-in-one</li>
                  <li>• {t.propozycjeCarportPremiumFeature3}</li>
                  <li>• {t.propozycjeCarportPremiumFeature4}</li>
                  <li>• {t.propozycjeCarportPremiumFeature5}</li>
                </ul>
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-2xl font-bold text-slate-900">{t.propozycjeFromLabel} 58 500 <span className="text-base font-normal">{t.propozycjeNetPriceLabel}</span></p>
                  <p className="text-sm text-slate-500 mt-1">{t.propozycjeCarportPremiumBattery}</p>
                </div>
              </div>
              <div className="px-6 pb-6">
                <Link to="/carport" className="block w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 px-4 rounded-xl transition-colors text-center text-sm">
                  {t.propozycjeDetailsArrow}
                </Link>
              </div>
            </div>
            {/* Carport Business Grid */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="aspect-[4/3] overflow-hidden">
                <img loading="lazy" decoding="async" src="/pl/carport-biznes.webp" alt="Carport Business Grid" className="w-full h-full object-cover"/>
              </div>
              <div className="p-6 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🏢</span>
                  <h3 className="font-bold text-lg text-slate-800">Carport Business Grid</h3>
                </div>
                <p className="text-slate-500 text-sm mb-4">{t.propozycjeCarportBusinessMeta}</p>
                <ul className="text-sm text-slate-600 space-y-2 mb-6">
                  <li>• {t.propozycjeCarportBusinessFeature1}</li>
                  <li>• {t.propozycjeCarportBusinessFeature2}</li>
                  <li>• {t.propozycjeCarportBusinessFeature3}</li>
                  <li>• {t.propozycjeCarportBusinessFeature4}</li>
                  <li>• {t.propozycjeCarportBusinessFeature5}</li>
                </ul>
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-2xl font-bold text-slate-900">{t.propozycjeFromLabel} 45 850 <span className="text-base font-normal">{t.propozycjeNetPriceLabel}</span></p>
                  <p className="text-sm text-slate-500 mt-1">{t.propozycjeCarportBusinessExtra}</p>
                </div>
              </div>
              <div className="px-6 pb-6">
                <Link to="/carport" className="block w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 px-4 rounded-xl transition-colors text-center text-sm">
                  {t.propozycjeCalculateProject}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-16 bg-slate-100 border-t border-slate-200">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">{t.propozycjeCtaTitle}</h2>
          <p className="text-slate-600 mb-6">
            {t.propozycjeCtaSubtitle}
          </p>
        </div>
      </section>
    </main>
  )
}


