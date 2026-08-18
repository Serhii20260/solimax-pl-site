// src/pages/Finansowanie.tsx
import { Link } from "react-router-dom";
import LeadFormSection from "../components/LeadFormSection";
import { useLanguage } from "../lib/LanguageContext";

export default function Finansowanie() {
  const { t } = useLanguage();

  return (
    <div className="space-y-16 md:space-y-24">
      <section className="relative w-full min-h-[60vh] md:min-h-[72vh] lg:min-h-[75vh] overflow-hidden">
        <div className="absolute inset-0">
          <picture>
            <img
              src="/pl/hero-finansowanie.png"
              alt={t.finansowanieHeroAlt}
              className="w-full h-full object-cover"
            />
          </picture>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="relative z-10 flex h-full min-h-[60vh] md:min-h-[72vh] lg:min-h-[75vh] items-center">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16">
            <div className="max-w-xl space-y-4">
              <h1 className="text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-5xl xl:text-6xl">
                {t.finansowanieHeroTitle}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 md:space-y-24 md:px-6 md:py-24 lg:px-8">
        <section className="space-y-6">
          <div className="w-full space-y-6">
            <p className="text-lg leading-relaxed text-slate-700 md:text-xl md:leading-relaxed">
              {t.finansowanieIntroText1}
            </p>
            <p className="text-lg leading-relaxed text-slate-700 md:text-xl md:leading-relaxed">
              {t.finansowanieIntroText2}
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">{t.finansowanieHowTitle}</h2>
          <div className="grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7 space-y-4">
              <p className="text-slate-600 leading-relaxed">{t.finansowanieHowIntro}</p>
              <ol className="grid gap-4 md:grid-cols-2 text-slate-600">
                <li>1. {t.finansowanieHowStep1}</li>
                <li>2. {t.finansowanieHowStep2}</li>
                <li>3. {t.finansowanieHowStep3}</li>
                <li>4. {t.finansowanieHowStep4}</li>
              </ol>
              <p className="text-slate-600 leading-relaxed">{t.finansowanieHowNote}</p>
            </div>
            <div className="md:col-span-5">
              <img src="/pl/finansowanie-1.png" alt={t.finansowanieAnalysisAlt} className="h-56 md:h-72 w-full rounded-2xl object-cover shadow-sm" />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">{t.finansowanieProgramsTitle}</h2>
          <div className="grid md:grid-cols-2 gap-6">

            {/* Nowy program BESS 2026 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-yellow-400 transition-colors">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">{t.finansowanieProgramBessMeta}</p>
                  <h3 className="text-lg font-semibold text-slate-900">{t.finansowanieProgramBessTitle}</h3>
                </div>
                <div className="shrink-0 bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-1.5 text-center">
                  <p className="text-xs text-yellow-700 font-medium">{t.finansowanieProgramBessAmount}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                {t.finansowanieProgramBessText}
              </p>
              <p className="text-xs text-slate-400 mb-2">{t.finansowanieProgramBessNote}</p>
              <a href="https://mojprad.gov.pl" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline font-medium">
                {t.finansowanieProgramBessLink}
              </a>
            </div>

            {/* Czyste Powietrze */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-yellow-400 transition-colors">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">{t.finansowanieProgramCzysteMeta}</p>
                  <h3 className="text-lg font-semibold text-slate-900">{t.finansowanieProgramCzysteTitle}</h3>
                </div>
                <div className="shrink-0 bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-1.5 text-center">
                  <p className="text-xs text-yellow-700 font-medium">{t.finansowanieProgramCzysteAmount}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                {t.finansowanieProgramCzysteText}
              </p>
              <a href="https://czystepowietrze.gov.pl" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline font-medium">
                {t.finansowanieProgramCzysteLink}
              </a>
            </div>

            {/* Moje Ciepło */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-yellow-400 transition-colors">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">{t.finansowanieProgramMojeMeta}</p>
                  <h3 className="text-lg font-semibold text-slate-900">{t.finansowanieProgramMojeTitle}</h3>
                </div>
                <div className="shrink-0 bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-1.5 text-center">
                  <p className="text-xs text-yellow-700 font-medium">{t.finansowanieProgramMojeAmount}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                {t.finansowanieProgramMojeText}
              </p>
              <a href="https://mojecieplo.gov.pl" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline font-medium">
                {t.finansowanieProgramMojeLink}
              </a>
            </div>

            {/* Ulga termomodernizacyjna */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-yellow-400 transition-colors">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">{t.finansowanieProgramUlgaMeta}</p>
                  <h3 className="text-lg font-semibold text-slate-900">{t.finansowanieProgramUlgaTitle}</h3>
                </div>
                <div className="shrink-0 bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-1.5 text-center">
                  <p className="text-xs text-yellow-700 font-medium">{t.finansowanieProgramUlgaAmount}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                {t.finansowanieProgramUlgaText}
              </p>
              <a href="https://www.gov.pl/web/kas/ulga-termomodernizacyjna" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline font-medium">
                {t.finansowanieProgramUlgaLink}
              </a>
            </div>

            {/* Mój Prąd 6.0 — zamknięto */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">{t.finansowanieProgramMojPradMeta}</p>
                  <h3 className="text-lg font-semibold text-slate-500">{t.finansowanieProgramMojPradTitle}</h3>
                </div>
                <div className="shrink-0 bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 text-center">
                  <p className="text-xs text-slate-500 font-medium">{t.finansowanieProgramMojPradStatus}</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                {t.finansowanieProgramMojPradText}
              </p>
            </div>

          </div>

          {/* Programy biznesowe */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">{t.finansowanieBusinessTitle}</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-yellow-400 transition-colors">
                <p className="text-xs text-slate-500 mb-1">{t.finansowanieBusinessMeta}</p>
                <h3 className="text-base font-semibold text-slate-900 mb-2">{t.finansowanieBusinessBgkTitle}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  {t.finansowanieBusinessBgkText}
                </p>
                <a href="https://www.bgk.pl/programy-i-fundusze/programy/kredyt-ekologiczny/" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline font-medium">
                  {t.finansowanieBusinessBgkLink}
                </a>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-yellow-400 transition-colors">
                <p className="text-xs text-slate-500 mb-1">{t.finansowanieBusinessMeta}</p>
                <h3 className="text-base font-semibold text-slate-900 mb-2">{t.finansowanieBusinessEuTitle}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  {t.finansowanieBusinessEuText}
                </p>
                <a href="https://www.funduszeeuropejskie.gov.pl" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline font-medium">
                  {t.finansowanieBusinessEuLink}
                </a>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-yellow-400 transition-colors">
                <p className="text-xs text-slate-500 mb-1">{t.finansowanieBusinessMeta}</p>
                <h3 className="text-base font-semibold text-slate-900 mb-2">{t.finansowanieBusinessOptimizationTitle}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t.finansowanieBusinessOptimizationText}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-600">
            <p>{t.finansowanieRegionalNote}</p>
          </div>

          {/* Przykłady po dotacji */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-2">{t.finansowanieExamplesTitle}</h3>
            <p className="text-slate-600 text-sm mb-6">{t.finansowanieExamplesSubtitle}</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-xs text-slate-500 mb-1">{t.finansowanieExampleHousePvMeta}</p>
                <p className="font-semibold text-slate-900 text-lg mb-3">{t.finansowanieExamplePvTitle}</p>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between text-slate-600">
                    <span>{t.finansowanieExampleSystemCost}</span>
                    <span className="font-medium">PLN 45,000</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>{t.finansowanieExampleBessSubsidy}</span>
                    <span className="font-medium text-green-700">- PLN ~16,000</span>
                  </div>
                  <div className="border-t border-slate-100 pt-2 flex justify-between">
                    <span className="font-semibold text-slate-900">{t.finansowanieExampleYourCost}</span>
                    <span className="font-bold text-slate-900 text-lg">PLN ~29,000</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400">{t.finansowanieExamplePvNote}</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-xs text-slate-500 mb-1">{t.finansowanieExampleHeatPumpMeta}</p>
                <p className="font-semibold text-slate-900 text-lg mb-3">{t.finansowanieExampleHeatPumpTitle}</p>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between text-slate-600">
                    <span>{t.finansowanieExampleSystemCost}</span>
                    <span className="font-medium">PLN 120,000</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>{t.finansowanieExampleCzysteSubsidy}</span>
                    <span className="font-medium text-green-700">- PLN 28,000-40,000</span>
                  </div>
                  <div className="border-t border-slate-100 pt-2 flex justify-between">
                    <span className="font-semibold text-slate-900">{t.finansowanieExampleYourCost}</span>
                    <span className="font-bold text-slate-900 text-lg">PLN 80,000-92,000</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400">{t.finansowanieExampleHeatPumpNote}</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-xs text-slate-500 mb-1">{t.finansowanieExampleComplexMeta}</p>
                <p className="font-semibold text-slate-900 text-lg mb-3">{t.finansowanieExampleComplexTitle}</p>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between text-slate-600">
                    <span>{t.finansowanieExampleSystemCost}</span>
                    <span className="font-medium">PLN ~165,000</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>{t.finansowanieExampleCzysteHp}</span>
                    <span className="font-medium text-green-700">{t.finansowanieExampleCzysteHpAmount}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>{t.finansowanieExampleBessSubsidy}</span>
                    <span className="font-medium text-green-700">- PLN ~16,000</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>{t.finansowanieExampleThermoRelief}</span>
                    <span className="font-medium text-green-700">{t.finansowanieExampleThermoReliefAmount}</span>
                  </div>
                  <div className="border-t border-slate-100 pt-2 flex justify-between">
                    <span className="font-semibold text-slate-900">{t.finansowanieExampleYourCost}</span>
                    <span className="font-bold text-slate-900 text-lg">PLN ~97,000-107,000</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400">{t.finansowanieExampleComplexNote}</p>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-center">
                <p className="font-semibold text-slate-900 text-lg mb-3">{t.finansowanieCalculationTitle}</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {t.finansowanieCalculationText}
                </p>
                <Link to="/calculator" className="inline-flex items-center justify-center rounded-xl bg-yellow-400 hover:bg-yellow-300 px-5 py-3 text-sm font-semibold text-black transition-colors">
                  {t.finansowanieCalculationCta}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-10 md:grid-cols-12 md:items-start">
          <div className="md:col-span-7 space-y-4 max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">{t.finansowanieSummaryTitle}</h2>
            <p className="text-slate-600 leading-relaxed">{t.finansowanieSummaryIntro}</p>
            <ul className="space-y-2 text-slate-600">
              <li>{t.finansowanieSummaryItem1}</li>
              <li>{t.finansowanieSummaryItem2}</li>
              <li>{t.finansowanieSummaryItem3}</li>
              <li>{t.finansowanieSummaryItem4}</li>
            </ul>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">{t.finansowanieImportantTitle}</h2>
            <ul className="space-y-2 text-slate-600">
              <li>{t.finansowanieImportantItem1}</li>
              <li>{t.finansowanieImportantItem2}</li>
              <li>{t.finansowanieImportantItem3}</li>
              <li>{t.finansowanieImportantItem4}</li>
            </ul>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">{t.finansowanieWhyNowTitle}</h2>
            <p className="text-slate-600 leading-relaxed">
              {t.finansowanieWhyNowText}
            </p>
          </div>
          <div className="md:col-span-5">
            <img src="/pl/finansowanie-2.png" alt={t.finansowanieContextAlt} className="aspect-[3/4] w-full rounded-2xl object-cover shadow-sm" />
          </div>
        </section>

        <LeadFormSection
          id="lead-form"
          title={t.leadFormTitle}
          subtitle={t.leadFormSubtitle}
          description={<p>{t.leadFormDescription}</p>}
        />
      </div>
    </div>
  );
}
