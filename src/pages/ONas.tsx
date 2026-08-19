// src/pages/ONas.tsx
import LeadFormSection from "../components/LeadFormSection";
import { useLanguage } from "../lib/LanguageContext";

export default function ONas() {
  const { t } = useLanguage();
  return (
    <main className="flex flex-col">

      {/* HERO */}
      <section className="relative w-full min-h-[60vh] md:min-h-[72vh] lg:min-h-[75vh] overflow-hidden">
        <div className="absolute inset-0">
          <picture>
            <img loading="lazy" decoding="async"
              src="/pl/hero-onas.webp"
              alt={t.oNasHeroAlt}
              className="w-full h-full object-cover"
            />
          </picture>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="relative z-10 flex h-full min-h-[60vh] md:min-h-[72vh] lg:min-h-[75vh] items-center">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16">
            <div className="max-w-xl space-y-4">
              <div className="inline-block bg-yellow-500 text-black text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                {t.oNasHeroBadge}
              </div>
              <h1 className="text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-5xl xl:text-6xl">
                {t.oNasHeroTitle}
              </h1>
              <p className="text-slate-200 text-lg max-w-2xl">
                {t.oNasHeroSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white py-16 px-4">
        <div className="mx-auto max-w-4xl grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-slate-900 mb-2">2020</div>
            <div className="text-slate-500">{t.oNasStatsMarket}</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-slate-900 mb-2">1000+</div>
            <div className="text-slate-500">{t.oNasStatsWorks}</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-slate-900 mb-2">EU</div>
            <div className="text-slate-500">{t.oNasStatsMarketLabel}</div>
          </div>
        </div>
      </section>

      {/* IDEOLOGY */}
      <section className="bg-slate-50 py-16 px-4">
        <div className="mx-auto max-w-4xl grid md:grid-cols-2 gap-12">
          <div>
            <div className="text-yellow-500 font-bold uppercase tracking-widest text-xs mb-3">{t.oNasIdeologyLabel}</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.oNasIdeologyTitle}</h2>
            <p className="text-slate-600 leading-relaxed">
              {t.oNasIdeologyText}
            </p>
          </div>
          <div>
            <div className="text-yellow-500 font-bold uppercase tracking-widest text-xs mb-3">{t.oNasApproachLabel}</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.oNasApproachTitle}</h2>
            <p className="text-slate-600 leading-relaxed">
              {t.oNasApproachText}
            </p>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION - merged from Projekty */}
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 md:space-y-24 md:px-6 md:py-24 lg:px-8">
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            {t.oNasCasesIntroTitle}
          </h2>
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="space-y-4">
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {t.oNasCasesIntroText1}
              </p>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {t.oNasCasesIntroText2}
              </p>
              <ul className="space-y-2 text-slate-700 text-sm sm:text-base">
                <li>{t.oNasCasesIntroItem1}</li>
                <li>{t.oNasCasesIntroItem2}</li>
                <li>{t.oNasCasesIntroItem3}</li>
                <li>{t.oNasCasesIntroItem4}</li>
              </ul>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {t.oNasCasesIntroText3}
              </p>
            </div>
            <div>
              <img loading="lazy" decoding="async" src="/pl/onas-1.webp" alt={t.oNasCasesIntroAlt} className="h-56 md:h-72 w-full rounded-2xl object-cover shadow-sm" />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            {t.oNasPrivateCaseTitle}
          </h2>
          <div className="grid gap-10 md:grid-cols-12 md:items-start">
            <div className="md:col-span-7">
              <img loading="lazy" decoding="async" src="/pl/projekt-privat.webp" alt={t.oNasPrivateCaseAlt} className="w-full rounded-2xl shadow-sm" />
            </div>
            <div className="md:col-span-5 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-2 text-slate-700 text-sm sm:text-base shadow-sm">
                <div>
                  <strong>{t.oNasCaseObjectType}</strong> {t.oNasPrivateCaseObject}
                </div>
                <div>
                  <strong>{t.oNasCaseTask}</strong> {t.oNasPrivateCaseTask}
                </div>
                <div>
                  <strong>{t.oNasCaseSolution}</strong> {t.oNasPrivateCaseSolution}
                </div>
                <div>
                  <strong>{t.oNasCaseResult}</strong> {t.oNasPrivateCaseResult}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {t.oNasPrivateCaseNote}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            {t.oNasBusinessCaseTitle}
          </h2>
          <div className="grid gap-10 md:grid-cols-12 md:items-start">
            <div className="md:col-span-5 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-2 text-slate-700 text-sm sm:text-base shadow-sm">
                <div>
                  <strong>{t.oNasCaseObjectType}</strong> {t.oNasBusinessCaseObject}
                </div>
                <div>
                  <strong>{t.oNasCaseTask}</strong> {t.oNasBusinessCaseTask}
                </div>
                <div>
                  <strong>{t.oNasCaseSolution}</strong> {t.oNasBusinessCaseSolution}
                </div>
                <div>
                  <strong>{t.oNasCaseResult}</strong> {t.oNasBusinessCaseResult}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {t.oNasBusinessCaseNote}
                </p>
              </div>
            </div>
            <div className="md:col-span-7">
              <img loading="lazy" decoding="async" src="/pl/projekt-biznes.webp" alt={t.oNasBusinessCaseAlt} className="aspect-[16/9] w-full rounded-2xl object-cover shadow-sm" />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            {t.oNasHeatPumpCaseTitle}
          </h2>
          <div className="grid gap-10 md:grid-cols-12 md:items-start">
            <div className="md:col-span-7">
              <img loading="lazy" decoding="async" src="/pl/projekt-heatpump.webp" alt={t.oNasHeatPumpCaseAlt} className="aspect-[16/9] w-full rounded-2xl object-cover shadow-sm" />
            </div>
            <div className="md:col-span-5 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-2 text-slate-700 text-sm sm:text-base shadow-sm">
                <div>
                  <strong>{t.oNasCaseObjectType}</strong> {t.oNasHeatPumpCaseObject}
                </div>
                <div>
                  <strong>{t.oNasCaseTask}</strong> {t.oNasHeatPumpCaseTask}
                </div>
                <div>
                  <strong>{t.oNasCaseSolution}</strong> {t.oNasHeatPumpCaseSolution}
                </div>
                <div>
                  <strong>{t.oNasCaseSubsidy}</strong> {t.oNasHeatPumpCaseSubsidy}
                </div>
                <div>
                  <strong>{t.oNasCaseResult}</strong> {t.oNasHeatPumpCaseResult}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {t.oNasHeatPumpCaseNote}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            {t.oNasWhyTitle}
          </h2>
          <div className="max-w-3xl space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
            <p>
              {t.oNasWhyText1}
            </p>
            <p>{t.oNasWhyIntro}</p>
            <ul className="space-y-2">
              <li>{t.oNasWhyItem1}</li>
              <li>{t.oNasWhyItem2}</li>
              <li>{t.oNasWhyItem3}</li>
            </ul>
          </div>
        </section>

        <LeadFormSection
          id="lead-form"
          title={t.leadFormTitle}
          subtitle={t.leadFormSubtitle}
          description={<p>{t.leadFormDescription}</p>}
        />
      </div>

    </main>
  );
}
