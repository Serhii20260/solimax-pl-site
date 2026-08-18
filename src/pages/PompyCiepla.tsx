// src/pages/PompyCiepla.tsx
// v2 - Updated Daikin cards: ETVH12/ETVH16, 72k/85k PLN
import LeadFormSection from "../components/LeadFormSection";
import { useLanguage } from "../lib/LanguageContext";
import { Link } from "react-router-dom";
import PromoBanner from "../components/PromoBanner";

export default function PompyCiepla() {
  const { t } = useLanguage();

  const efficiencyBadges = [
    { icon: "📊", title: t.pompyCieplaEfficiencyBadgeScopTitle, text: t.pompyCieplaEfficiencyBadgeScopText },
    { icon: "🌱", title: t.pompyCieplaEfficiencyBadgeEcoTitle, text: t.pompyCieplaEfficiencyBadgeEcoText },
    { icon: "⚡", title: t.pompyCieplaEfficiencyBadgeConsumptionTitle, text: t.pompyCieplaEfficiencyBadgeConsumptionText },
    { icon: "🇪🇺", title: t.pompyCieplaEfficiencyBadgeEuTitle, text: t.pompyCieplaEfficiencyBadgeEuText },
  ];

  const warrantyBadges = [
    t.pompyCieplaWarrantyBadge1,
    t.pompyCieplaWarrantyBadge2,
    t.pompyCieplaWarrantyBadge3,
    t.pompyCieplaWarrantyBadge4,
  ];

  return (
    <main className="bg-white text-slate-900">
      <section className="relative w-full min-h-[60vh] md:min-h-[72vh] lg:min-h-[75vh] overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            poster="/pl/hero-pompy-poster.jpg" loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/pl/hero-pompy.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="relative z-10 flex h-full min-h-[60vh] md:min-h-[72vh] lg:min-h-[75vh] items-center">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16">
            <div className="max-w-xl space-y-4">
              <h1 className="text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-5xl xl:text-6xl">
                {t.pompyCieplaHeroTitle}
              </h1>
              <p className="text-lg leading-relaxed text-white/85 md:text-xl lg:text-2xl">
                {t.pompyCieplaHeroSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-10 md:grid-cols-[1.1fr,0.9fr] md:items-stretch">
            <div className="flex flex-col justify-center space-y-6">
              <h2 className="text-2xl font-semibold md:text-3xl">{t.pompyCieplaIntroTitle}</h2>
              <p className="text-lg leading-relaxed text-slate-700 md:text-xl md:leading-relaxed">{t.pompyCieplaIntroText}</p>
              <div className="space-y-3">
                <div className="border-l-2 border-yellow-400 pl-4 py-2">
                  <h3 className="text-lg font-semibold text-slate-900">{t.pompyCieplaBenefitEfficiencyTitle}</h3>
                  <p className="text-sm text-slate-600 mt-1">{t.pompyCieplaBenefitEfficiencyText}</p>
                </div>
                <div className="border-l-2 border-yellow-400 pl-4 py-2">
                  <h3 className="text-lg font-semibold text-slate-900">{t.pompyCieplaBenefitTechTitle}</h3>
                  <p className="text-sm text-slate-600 mt-1">{t.pompyCieplaBenefitTechText}</p>
                </div>
                <div className="border-l-2 border-yellow-400 pl-4 py-2">
                  <h3 className="text-lg font-semibold text-slate-900">{t.pompyCieplaBenefitServiceTitle}</h3>
                  <p className="text-sm text-slate-600 mt-1">{t.pompyCieplaBenefitServiceText}</p>
                </div>
              </div>
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

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-3 md:text-3xl">{t.pompyCieplaSystemsTitle}</h2>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{t.pompyCieplaAirWaterTitle}</h3>
                <p className="text-lg leading-relaxed text-slate-700 md:text-xl md:leading-relaxed">
                  {t.pompyCieplaAirWaterText}
                </p>
                <ul className="space-y-2 text-slate-700">
                  <li>• {t.pompyCieplaAirWaterItem1}</li>
                  <li>• {t.pompyCieplaAirWaterItem2}</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-4">
                <h3 className="text-xl font-semibold">{t.pompyCieplaAirAirTitle}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {t.pompyCieplaAirAirText}
                </p>
                <Link
                  to="/kontakt"
                  className="inline-flex items-center text-sm font-medium text-slate-900 hover:text-slate-700"
                >
                  {t.pompyCieplaAirAirCta}
                </Link>
              </div>
            </div>

            <div>
              <img src="/pl/schema-pompy.jpg" alt={t.pompyCieplaSchemaAlt} className="w-full h-auto rounded-xl object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-stretch">
            <div className="space-y-8">
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold md:text-3xl">{t.pompyCieplaEfficiencyTitle}</h2>
                <div className="grid grid-cols-2 gap-3">
                  {efficiencyBadges.map((badge) => (
                    <div key={badge.title} className="space-y-1">
                      <div className="text-xl">{badge.icon}</div>
                      <h4 className="font-semibold text-slate-900">{badge.title}</h4>
                      <p className="text-sm text-slate-600">{badge.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-semibold md:text-3xl">{t.pompyCieplaReliabilityTitle}</h2>
                <p className="text-slate-700">
                  {t.pompyCieplaReliabilityText}
                </p>
                <div className="flex flex-wrap gap-2">
                  {warrantyBadges.map((badge) => (
                    <span key={badge} className="px-3 py-1.5 bg-slate-100 rounded-full text-xs font-medium text-slate-600 border border-slate-200">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <img src="/pl/placeholder2tn.jpg" alt={t.pompyCieplaEfficiencyAlt} className="w-full h-auto rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-3 md:text-3xl">{t.pompyCieplaApproachTitle}</h2>
                <p className="text-slate-700 mb-4">{t.pompyCieplaApproachIntro}</p>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">✓</span>
                    <span>{t.pompyCieplaApproachItem1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">✓</span>
                    <span>{t.pompyCieplaApproachItem2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">✓</span>
                    <span>{t.pompyCieplaApproachItem3}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">✓</span>
                    <span>{t.pompyCieplaApproachItem4}</span>
                  </li>
                </ul>
                <p className="mt-3 text-slate-600">{t.pompyCieplaApproachNote}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 md:text-3xl">{t.pompyCieplaWorkTitle}</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black text-sm font-semibold flex items-center justify-center">1</span>
                    <div>
                      <h4 className="font-semibold">{t.pompyCieplaWorkStep1Title}</h4>
                      <p className="text-sm text-slate-600">{t.pompyCieplaWorkStep1Text}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black text-sm font-semibold flex items-center justify-center">2</span>
                    <div>
                      <h4 className="font-semibold">{t.pompyCieplaWorkStep2Title}</h4>
                      <p className="text-sm text-slate-600">{t.pompyCieplaWorkStep2Text}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black text-sm font-semibold flex items-center justify-center">3</span>
                    <div>
                      <h4 className="font-semibold">{t.pompyCieplaWorkStep3Title}</h4>
                      <p className="text-sm text-slate-600">{t.pompyCieplaWorkStep3Text}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black text-sm font-semibold flex items-center justify-center">4</span>
                    <div>
                      <h4 className="font-semibold">{t.pompyCieplaWorkStep4Title}</h4>
                      <p className="text-sm text-slate-600">{t.pompyCieplaWorkStep4Text}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <img src="/pl/placeholder3tn.jpg" alt={t.pompyCieplaProcessAlt} className="w-full h-auto rounded-xl" />
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
