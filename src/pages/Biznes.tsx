// src/pages/Biznes.tsx
import BusinessKPI from "../components/BusinessKPI";
import ESGDashboard from "../components/ESGDashboard";
import LeadFormSection from "../components/LeadFormSection";
import PromoBanner from "../components/PromoBanner";
import { useLanguage } from "../lib/LanguageContext";

export default function Biznes() {
  const { t } = useLanguage();

  const biznesSolutions = [
    {
      title: t.biznesSolutionPvTitle,
      icon: "☀️",
      text: t.biznesSolutionPvText,
    },
    {
      title: t.biznesSolutionBessTitle,
      icon: "🔋",
      text: t.biznesSolutionBessText,
    },
    {
      title: t.biznesSolutionEvTitle,
      icon: "🚗",
      text: t.biznesSolutionEvText,
    },
    {
      title: t.biznesSolutionEmsTitle,
      icon: "⚙️",
      text: t.biznesSolutionEmsText,
    },
  ];

  const warrantyBadges = [
    t.biznesWarrantyBadge1,
    t.biznesWarrantyBadge2,
    t.biznesWarrantyBadge3,
    t.biznesWarrantyBadge4,
  ];

  return (
    <main className="bg-white text-slate-900 overflow-x-hidden">
      <section className="relative w-full min-h-[60vh] md:min-h-[72vh] lg:min-h-[75vh] overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            poster="/pl/hero-biznes-poster.jpg" loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/pl/hero-biznes.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="relative z-10 flex h-full min-h-[60vh] md:min-h-[72vh] lg:min-h-[75vh] items-center">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16">
            <div className="max-w-xl space-y-4">
              <h1 className="text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-5xl xl:text-6xl">
                {t.biznesHeroTitle}
              </h1>
              <p className="text-lg leading-relaxed text-white/85 md:text-xl lg:text-2xl">
                {t.biznesHeroSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-10 md:grid-cols-[0.9fr,1.1fr] md:items-stretch">
            <div className="flex items-stretch order-2 md:order-1">
              <PromoBanner 
                className="w-full rounded-2xl aspect-[3/4]"
                variant={1}
              />
            </div>
            
            <div className="flex flex-col justify-center space-y-6 order-1 md:order-2">
              <h2 className="text-2xl font-semibold md:text-3xl">{t.biznesIntroTitle}</h2>
              <p className="text-lg leading-relaxed text-slate-700 md:text-xl md:leading-relaxed">
                {t.biznesIntroText1}
              </p>
              <p className="text-lg leading-relaxed text-slate-700 md:text-xl md:leading-relaxed">
                {t.biznesIntroText2}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold md:text-3xl">{t.biznesChallengesTitle}</h2>
              <div className="space-y-4">
                <div className="border-l-2 border-yellow-400 pl-4 py-2">
                  <h3 className="text-lg font-semibold text-slate-900">{t.biznesChallengeCostTitle}</h3>
                  <p className="text-sm text-slate-600 mt-1">{t.biznesChallengeCostText}</p>
                </div>
                <div className="border-l-2 border-yellow-400 pl-4 py-2">
                  <h3 className="text-lg font-semibold text-slate-900">{t.biznesChallengePredictabilityTitle}</h3>
                  <p className="text-sm text-slate-600 mt-1">{t.biznesChallengePredictabilityText}</p>
                </div>
                <div className="border-l-2 border-yellow-400 pl-4 py-2">
                  <h3 className="text-lg font-semibold text-slate-900">{t.biznesChallengeExpansionTitle}</h3>
                  <p className="text-sm text-slate-600 mt-1">{t.biznesChallengeExpansionText}</p>
                </div>
                <div className="border-l-2 border-yellow-400 pl-4 py-2">
                  <h3 className="text-lg font-semibold text-slate-900">{t.biznesChallengeEsgTitle}</h3>
                  <p className="text-sm text-slate-600 mt-1">{t.biznesChallengeEsgText}</p>
                </div>
              </div>
            </div>

            <div className="w-full min-h-[420px]">
              <BusinessKPI />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-3 md:text-3xl">{t.biznesProcessTitle}</h2>
                <p className="text-slate-700">
                  {t.biznesProcessIntro}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black text-sm font-semibold flex items-center justify-center">1</span>
                  <p className="text-slate-700">{t.biznesProcessStep1}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black text-sm font-semibold flex items-center justify-center">2</span>
                  <p className="text-slate-700">{t.biznesProcessStep2}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black text-sm font-semibold flex items-center justify-center">3</span>
                  <p className="text-slate-700">{t.biznesProcessStep3}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black text-sm font-semibold flex items-center justify-center">4</span>
                  <p className="text-slate-700">{t.biznesProcessStep4}</p>
                </div>
              </div>

              <p className="text-slate-600">{t.biznesProcessNote}</p>
            </div>

            <div>
              <img 
                src="/pl/analysis-biznes.jpg"
                alt={t.biznesAnalysisAlt}
                className="w-full rounded-xl object-contain"
                style={{ aspectRatio: '4/3' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="relative order-2 md:order-1">
              <img 
                src="/pl/solutions-biznes.jpg"
                alt={t.biznesSolutionsAlt}
                className="w-full rounded-2xl object-contain"
                style={{ aspectRatio: '4/3' }}
              />
            </div>

            <div className="space-y-6 order-1 md:order-2">
              <h2 className="text-2xl font-semibold md:text-3xl">{t.biznesSolutionsTitle}</h2>
              <div className="space-y-4">
                {biznesSolutions.map((solution) => (
                  <div key={solution.title} className="border-l-2 border-yellow-400 pl-4 py-2">
                    <h3 className="text-lg font-semibold text-slate-900">{solution.icon} {solution.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{solution.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-stretch">
            <div className="space-y-8">
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold md:text-3xl">{t.biznesFinanceTitle}</h2>
                <p className="text-slate-700">{t.biznesFinanceIntro}</p>
                <ul className="space-y-1 text-slate-700">
                  <li>• {t.biznesFinanceItem1}</li>
                  <li>• {t.biznesFinanceItem2}</li>
                  <li>• {t.biznesFinanceItem3}</li>
                  <li>• {t.biznesFinanceItem4}</li>
                </ul>
                <p className="text-slate-700">
                  {t.biznesFinanceText}
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-semibold md:text-3xl">{t.biznesFinancingTitle}</h2>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-slate-100 rounded-full text-xs font-medium text-slate-600 border border-slate-200">{t.biznesFinancingChip1}</span>
                  <span className="px-3 py-1.5 bg-slate-100 rounded-full text-xs font-medium text-slate-600 border border-slate-200">{t.biznesFinancingChip2}</span>
                  <span className="px-3 py-1.5 bg-slate-100 rounded-full text-xs font-medium text-slate-600 border border-slate-200">{t.biznesFinancingChip3}</span>
                  <span className="px-3 py-1.5 bg-slate-100 rounded-full text-xs font-medium text-slate-600 border border-slate-200">{t.biznesFinancingChip4}</span>
                  <span className="px-3 py-1.5 bg-slate-100 rounded-full text-xs font-medium text-slate-600 border border-slate-200">{t.biznesFinancingChip5}</span>
                </div>
                <p className="text-slate-700">
                  {t.biznesFinancingText}
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-semibold md:text-3xl">{t.biznesRenewableTitle}</h2>
                <p className="text-slate-700">
                  {t.biznesRenewableText1}
                </p>
                <p className="text-slate-700">
                  {t.biznesRenewableText2}
                </p>
                <p className="text-slate-700">
                  {t.biznesRenewableText3}
                </p>
              </div>
            </div>

            <div className="w-full min-h-[500px]">
              <ESGDashboard />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <div>
              <h2 className="text-2xl font-semibold mb-3 md:text-3xl">{t.biznesWarrantyTitle}</h2>
              <p className="text-slate-700 mb-3">
                {t.biznesWarrantyText}
              </p>
              <div className="flex flex-wrap gap-2">
                {warrantyBadges.map((badge) => (
                  <span key={badge} className="px-3 py-1.5 bg-slate-100 rounded-full text-xs font-medium text-slate-600 border border-slate-200">
                    {badge}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-slate-600">{t.biznesWarrantyNote}</p>
            </div>

            <div>
              <img src="/pl/team-biznes.jpg" alt={t.biznesTeamAlt} className="w-full h-auto rounded-xl object-cover" />
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
