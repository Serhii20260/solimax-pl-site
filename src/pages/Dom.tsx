// src/pages/Dom.tsx
import { Link } from "react-router-dom";
import EnergySchema from "../components/EnergySchema";
import LeadFormSection from "../components/LeadFormSection";
import PromoBanner from "../components/PromoBanner";
import { useLanguage } from "../lib/LanguageContext";
import { COMBOS } from '../lib/prices.generated';

export default function Dom() {
  const { t, language } = useLanguage();

  const domSolutions = [
    {
      title: t.domSolutionPvTitle,
      icon: "☀️",
      text: t.domSolutionPvText,
    },
    {
      title: t.domSolutionStorageTitle,
      icon: "🔋",
      text: t.domSolutionStorageText,
    },
    {
      title: t.domSolutionHeatingTitle,
      icon: "♻️",
      text: t.domSolutionHeatingText,
    },
    {
      title: t.domSolutionSmartTitle,
      icon: "⚙️",
      text: t.domSolutionSmartText,
    },
  ];

  const popularConfigs = [
    {
      name: t.domConfigStandardName,
      desc: t.domConfigStandardDesc,
      price: COMBOS['dom-standard'][language === 'en' ? 'en' : 'pl'],
      link: "/propozycje",
    },
    {
      name: t.domConfigPremiumName,
      desc: t.domConfigPremiumDesc,
      price: COMBOS['dom-premium'][language === 'en' ? 'en' : 'pl'],
      link: "/propozycje",
    },
    {
      name: t.domConfigHeatPumpName,
      desc: t.domConfigHeatPumpDesc,
      price: COMBOS['dom-heatpump'][language === 'en' ? 'en' : 'pl'],
      link: "/propozycje",
    },
  ];

  return (
    <main className="bg-white text-slate-900">
      <section className="relative w-full min-h-[60vh] md:min-h-[72vh] lg:min-h-[75vh] overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/pl/hero-dom-poster.webp"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/pl/hero-dom-720.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="relative z-10 flex h-full min-h-[60vh] md:min-h-[72vh] lg:min-h-[75vh] items-center">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16">
            <div className="max-w-xl space-y-4">
              <h1 className="text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-5xl xl:text-6xl">
                {t.domHeroTitle}
              </h1>
              <p className="text-lg leading-relaxed text-white/85 md:text-xl lg:text-2xl">
                {t.domHeroSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-10 md:grid-cols-[1.1fr,0.9fr] md:items-stretch">
            <div className="flex flex-col justify-center space-y-6">
              <h2 className="text-2xl font-semibold md:text-3xl">{t.domIntroTitle}</h2>
              <p className="text-lg leading-relaxed text-slate-700 md:text-xl md:leading-relaxed">
                {t.domIntroText1}
              </p>
              <p className="text-lg leading-relaxed text-slate-700 md:text-xl md:leading-relaxed">
                {t.domIntroText2}
              </p>
            </div>
            <div className="flex items-stretch">
              <PromoBanner 
                className="w-full rounded-2xl aspect-[3/4]"
                variant={1}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="relative">
              <img loading="lazy" decoding="async" 
                src="/pl/benefits-dom.webp"
                alt={t.domBenefitsAlt}
                style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold md:text-3xl">{t.domBenefitsTitle}</h2>
              <div className="space-y-4">
                <div className="border-l-2 border-yellow-400 pl-4 py-2">
                  <h3 className="text-lg font-semibold text-slate-900">{t.domBenefitBillsTitle}</h3>
                  <p className="text-sm text-slate-600 mt-1">{t.domBenefitBillsText}</p>
                </div>
                <div className="border-l-2 border-yellow-400 pl-4 py-2">
                  <h3 className="text-lg font-semibold text-slate-900">{t.domBenefitPredictabilityTitle}</h3>
                  <p className="text-sm text-slate-600 mt-1">{t.domBenefitPredictabilityText}</p>
                </div>
                <div className="border-l-2 border-yellow-400 pl-4 py-2">
                  <h3 className="text-lg font-semibold text-slate-900">{t.domBenefitFutureTitle}</h3>
                  <p className="text-sm text-slate-600 mt-1">{t.domBenefitFutureText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4 md:text-3xl">{t.domProcessTitle}</h2>
                <p className="text-slate-700 leading-relaxed">
                  {t.domProcessIntro}
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-400 text-black text-sm font-semibold flex items-center justify-center">1</span>
                  <p className="text-slate-700 leading-relaxed pt-1">{t.domProcessStep1}</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-400 text-black text-sm font-semibold flex items-center justify-center">2</span>
                  <p className="text-slate-700 leading-relaxed pt-1">{t.domProcessStep2}</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-400 text-black text-sm font-semibold flex items-center justify-center">3</span>
                  <p className="text-slate-700 leading-relaxed pt-1">{t.domProcessStep3}</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-400 text-black text-sm font-semibold flex items-center justify-center">4</span>
                  <p className="text-slate-700 leading-relaxed pt-1">{t.domProcessStep4}</p>
                </div>
              </div>

              <p className="text-slate-500 mt-6 text-sm">{t.domProcessNote}</p>
            </div>

            <div className="flex items-center justify-center">
              <img loading="lazy" decoding="async" 
                src="/pl/steps-dom.webp"
                alt={t.domProcessAlt}
                className="w-full rounded-2xl"
                style={{ aspectRatio: '4/3', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold md:text-3xl">{t.domSolutionsTitle}</h2>
              <div className="space-y-4">
                {domSolutions.map((solution) => (
                  <div key={solution.title} className="border-l-2 border-yellow-400 pl-4 py-2">
                    <h3 className="text-lg font-semibold text-slate-900">{solution.icon} {solution.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{solution.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <EnergySchema />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <h2 className="text-2xl font-semibold mb-2">{t.domConfigsTitle}</h2>
          <p className="text-slate-500 text-sm mb-8">{t.domConfigsSubtitle}</p>
          <div className="grid md:grid-cols-3 gap-4">
            {popularConfigs.map((c) => (
              <div key={c.name} className="border border-slate-200 rounded-2xl p-5 hover:border-yellow-400 transition-colors">
                <div className="border-l-2 border-yellow-400 pl-3 mb-4">
                  <p className="font-semibold text-slate-900">{c.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{c.desc}</p>
                </div>
                <div className="flex items-end justify-between gap-2">
                  <span>
                    <span className="block text-lg font-bold text-slate-900">{c.price.main}</span>
                    <span className="block text-[11px] text-slate-500">{c.price.sub}</span>
                  </span>
                  <Link to={c.link} className="text-sm text-yellow-600 font-medium hover:text-yellow-500 whitespace-nowrap">{t.domConfigDetails}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-stretch">
            <div className="space-y-8">
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold md:text-3xl">{t.domAestheticsTitle}</h2>
                <p className="text-slate-700">{t.domAestheticsText1}</p>
                <p className="text-slate-700">
                  {t.domAestheticsText2}
                </p>
                <p className="text-slate-700">
                  {t.domAestheticsText3}
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-semibold md:text-3xl">{t.domFinanceLogicTitle}</h2>
                <p className="text-slate-700">{t.domFinanceLogicIntro}</p>
                <ul className="space-y-1 text-slate-700">
                  <li>• {t.domFinanceLogicItem1}</li>
                  <li>• {t.domFinanceLogicItem2}</li>
                  <li>• {t.domFinanceLogicItem3}</li>
                  <li>• {t.domFinanceLogicItem4}</li>
                </ul>
                <p className="text-slate-700">
                  {t.domFinanceLogicText}
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-semibold md:text-3xl">{t.domFinancingTitle}</h2>
                <p className="text-slate-700">
                  {t.domFinancingText}
                </p>
              </div>
            </div>

            <div className="flex">
              <img loading="lazy" decoding="async" 
                src="/pl/aesthetics-dom.webp"
                alt={t.domAestheticsAlt}
                className="w-full rounded-2xl object-contain"
              width={1200} height={900} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-3 md:text-3xl">{t.domRenewableTitle}</h2>
                <div className="space-y-3 text-slate-700">
                  <p>{t.domRenewableText1}</p>
                  <p>{t.domRenewableText2}</p>
                  <p>{t.domRenewableText3}</p>
                  <p>{t.domRenewableText4}</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-3 md:text-3xl">{t.domWarrantyTitle}</h2>
                <p className="text-slate-700">
                  {t.domWarrantyText}
                </p>
              </div>
            </div>

            <div>
              <img loading="lazy" decoding="async" 
                src="/pl/sustainability-dom.webp"
                alt={t.domSustainabilityAlt}
                className="w-full rounded-xl object-contain"
                style={{ aspectRatio: '4/3' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <LeadFormSection
            id="lead-form"
            title={t.leadFormTitle}
            subtitle={t.leadFormSubtitle}
            description={t.leadFormDescription}
          />
        </div>
      </section>
    </main>
  );
}
