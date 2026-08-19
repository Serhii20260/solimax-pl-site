// src/pages/Carport.tsx
import { Link } from "react-router-dom";
import { Umbrella, Sun, Zap, Euro } from "lucide-react";
import LeadFormSection from "../components/LeadFormSection";
import PromoBanner from "../components/PromoBanner";
import { useLanguage } from "../lib/LanguageContext";

export default function Carport() {
  const { t } = useLanguage();

  return (
    <main className="bg-white text-slate-900">
      <section className="relative w-full min-h-[60vh] md:min-h-[72vh] lg:min-h-[75vh] overflow-hidden bg-slate-900">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/pl/hero-carport-poster.webp"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/pl/hero-carport-720.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="relative z-10 flex h-full min-h-[60vh] md:min-h-[72vh] lg:min-h-[75vh] items-center">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16">
            <div className="max-w-xl space-y-4">
              <h1 className="text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-5xl xl:text-6xl">
                {t.carportHeroTitle}
              </h1>
              <p className="text-lg leading-relaxed text-white/85 md:text-xl lg:text-2xl">
                {t.carportHeroSubtitle}
              </p>
              <Link
                to="/kontakt"
                className="inline-flex items-center justify-center rounded-xl bg-yellow-500 px-6 py-3 text-base font-semibold text-black hover:bg-yellow-400 transition-colors mt-4"
              >
                {t.carportHeroCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-10 md:grid-cols-[1.1fr,0.9fr] md:items-stretch">
            <div className="flex flex-col justify-center space-y-6">
              <h2 className="text-2xl font-semibold md:text-3xl">{t.carportIntroTitle}</h2>
              <p className="text-lg leading-relaxed text-slate-700 md:text-xl md:leading-relaxed">
                {t.carportIntroText1}
              </p>
              <p className="text-lg leading-relaxed text-slate-700 md:text-xl md:leading-relaxed">
                {t.carportIntroText2}
              </p>
              <p className="text-lg leading-relaxed text-slate-700 md:text-xl md:leading-relaxed">
                {t.carportIntroText3}
              </p>
              <p className="text-lg leading-relaxed text-slate-700 md:text-xl md:leading-relaxed font-medium">
                {t.carportIntroText4}
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

      <section className="bg-slate-50 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <h2 className="text-2xl font-semibold md:text-3xl text-center mb-12">{t.carportConfigTitle}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-2xl">🏠</div>
                <h3 className="text-xl font-bold text-slate-800">{t.carportPrivateTitle}</h3>
              </div>
              <p className="text-slate-600 mb-4">
                {t.carportPrivateText1Before}<strong>{t.carportPrivateStrong}</strong>{t.carportPrivateText1After}
              </p>
              <p className="text-slate-600">
                {t.carportPrivateText2Before}<strong>{t.carportPrivateProgram1}</strong>{t.carportPrivateText2Middle}<strong>{t.carportPrivateProgram2}</strong>{t.carportPrivateText2After}
              </p>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden">
              <img loading="lazy" decoding="async"
                src="/pl/carport-home.webp"
                alt={t.carportHomeAlt}
                className="w-full h-full object-cover"
                style={{ minHeight: '320px' }}
              width={1200} height={835} />
            </div>

            <div className="bg-white rounded-2xl overflow-hidden">
              <img loading="lazy" decoding="async"
                src="/pl/carport-business.webp"
                alt={t.carportBusinessAlt}
                className="w-full h-full object-cover"
                style={{ minHeight: '320px' }}
              width={1200} height={717} />
            </div>

            <div className="bg-slate-50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-2xl">🏢</div>
                <h3 className="text-xl font-bold text-slate-800">{t.carportBusinessTitle}</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-700 mb-1">{t.carportBusinessOfficeTitle}</p>
                  <p className="text-slate-600 text-sm">{t.carportBusinessOfficeText}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-700 mb-1">{t.carportBusinessFleetTitle}</p>
                  <p className="text-slate-600 text-sm">{t.carportBusinessFleetText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <h2 className="text-2xl font-semibold md:text-3xl text-center mb-12">{t.carportBenefitsTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border-l-2 border-yellow-400 pl-4 py-2">
              <Umbrella size={32} className="text-green-600 mb-3" />
              <h3 className="text-lg font-semibold text-slate-900">{t.carportBenefitWeatherTitle}</h3>
              <p className="text-sm text-slate-600 mt-1">{t.carportBenefitWeatherText}</p>
            </div>
            <div className="border-l-2 border-yellow-400 pl-4 py-2">
              <Sun size={32} className="text-green-600 mb-3" />
              <h3 className="text-lg font-semibold text-slate-900">{t.carportBenefitEnergyTitle}</h3>
              <p className="text-sm text-slate-600 mt-1">{t.carportBenefitEnergyText}</p>
            </div>
            <div className="border-l-2 border-yellow-400 pl-4 py-2">
              <Zap size={32} className="text-green-600 mb-3" />
              <h3 className="text-lg font-semibold text-slate-900">{t.carportBenefitEvTitle}</h3>
              <p className="text-sm text-slate-600 mt-1">{t.carportBenefitEvText}</p>
            </div>
            <div className="border-l-2 border-yellow-400 pl-4 py-2">
              <Euro size={32} className="text-green-600 mb-3" />
              <h3 className="text-lg font-semibold text-slate-900">{t.carportBenefitSubsidiesTitle}</h3>
              <p className="text-sm text-slate-600 mt-1">{t.carportBenefitSubsidiesText}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <LeadFormSection
            id="lead-form"
            title={t.carportLeadTitle}
            subtitle={t.carportLeadSubtitle}
            description={
              <>
                <p>{t.carportLeadDescription}</p>
              </>
            }
          />
        </div>
      </section>
    </main>
  );
}
