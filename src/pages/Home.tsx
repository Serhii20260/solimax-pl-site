import LeadFormSection from "../components/LeadFormSection";
import PromoBanner from "../components/PromoBanner";
import { useLanguage } from "../lib/LanguageContext";
import { Link } from "react-router-dom";

const brands = [
  "AIKO", "Trina Solar", "JA Solar", "Deye", "Sungrow",
  "Pylontech", "Sigenergy", "Anker SOLIX", "Daikin", "Vaillant"
];

const brandLogos: Record<string, string> = {
  "AIKO": "/pl/logo-aiko.webp",
  "Trina Solar": "/pl/logo-trina.webp",
  "JA Solar": "/pl/logo-jasolar.webp",
  "Deye": "/pl/logo-deye.webp",
  "Sungrow": "/pl/logo-sungrow.webp",
  "Pylontech": "/pl/logo-pylontech.webp",
  "Sigenergy": "/pl/logo-sigenergy.webp",
  "Anker SOLIX": "/pl/logo-anker.webp",
  "Daikin": "/pl/logo-daikin.webp",
  "Vaillant": "/pl/logo-vaillant.webp",
};

const darkBgBrands = new Set(["AIKO", "Trina Solar", "Pylontech", "Sigenergy"]);

export default function Home() {
  const { t } = useLanguage();

  const modules = [
    {
      title: t.homeModulePvTitle,
      text: t.homeModulePvText,
    },
    {
      title: t.homeModuleStorageTitle,
      text: t.homeModuleStorageText,
    },
    {
      title: t.homeModuleHeatingTitle,
      text: t.homeModuleHeatingText,
    },
    {
      title: t.homeModuleSmartTitle,
      text: t.homeModuleSmartText,
    },
  ];

  const whySolimax = [
    t.homeWhyItem1,
    t.homeWhyItem2,
    t.homeWhyItem3,
    t.homeWhyItem4,
  ];

  const warrantyBadges = [
    t.homeWarrantyBadge1,
    t.homeWarrantyBadge2,
    t.homeWarrantyBadge3,
    t.homeWarrantyBadge4,
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
            poster="/pl/hero-poster.webp"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/pl/hero-720.mp4" type="video/mp4" />
          </video>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

        <div className="relative z-10 flex h-full min-h-[60vh] md:min-h-[72vh] lg:min-h-[75vh] items-center">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16">
            <div className="max-w-xl space-y-4">
              <h1 className="text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-5xl xl:text-6xl">
                {t.homeHeroTitle}
              </h1>
              <p className="text-lg leading-relaxed text-white/85 md:text-xl lg:text-2xl">
                {t.homeHeroSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-10 md:grid-cols-[1.1fr,0.9fr] md:items-stretch">
            <div className="flex flex-col justify-center space-y-6">
              <p className="text-lg leading-relaxed text-slate-700 md:text-xl md:leading-relaxed">
                {t.homeIntroParagraph1}
              </p>
              <p className="text-lg leading-relaxed text-slate-700 md:text-xl md:leading-relaxed">
                {t.homeIntroParagraph2}
              </p>
              <p className="text-lg leading-relaxed text-slate-700 md:text-xl md:leading-relaxed">
                {t.homeIntroParagraph3}
              </p>
              <p className="text-lg leading-relaxed text-slate-700 md:text-xl md:leading-relaxed">
                {t.homeIntroParagraph4}
              </p>
              <p className="text-lg leading-relaxed text-slate-700 md:text-xl md:leading-relaxed font-medium">
                {t.homeIntroParagraph5}
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
                src="/pl/home-solutions.webp" 
                alt={t.homeSolutionsAlt}
                className="rounded-2xl w-full"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold md:text-3xl">{t.homeSolutionsTitle}</h2>
              <div className="space-y-4">
                {modules.map((module) => (
                  <div key={module.title} className="border-l-2 border-yellow-400 pl-4 py-2">
                    <h3 className="text-lg font-semibold text-slate-900">{module.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{module.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <img loading="lazy" decoding="async" src="/pl/home-private.webp" alt={t.homePrivateAlt} className="w-full aspect-[4/3] object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-3">{t.homePrivateTitle}</h3>
              <p className="text-slate-600 mb-4">
                {t.homePrivateText}
              </p>
              <Link
                to="/dom"
                className="inline-flex items-center justify-center rounded-lg bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-yellow-300"
              >
                {t.homePrivateCta}
              </Link>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <img loading="lazy" decoding="async" src="/pl/home-business.webp" alt={t.homeBusinessAlt} className="w-full aspect-[4/3] object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-3">{t.homeBusinessTitle}</h3>
              <p className="text-slate-600 mb-4">
                {t.homeBusinessText}
              </p>
              <Link
                to="/biznes"
                className="inline-flex items-center justify-center rounded-lg bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-yellow-300"
              >
                {t.homeBusinessCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-stretch">
            <div className="space-y-8">
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold md:text-3xl">{t.homeEcologyTitle}</h2>
                <p className="text-slate-700">
                  {t.homeEcologyParagraph1}
                </p>
                <p className="text-slate-700">
                  {t.homeEcologyParagraph2}
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-semibold md:text-3xl">{t.homeFinanceTitle}</h2>
                <p className="text-slate-700">
                  {t.homeFinanceText}
                </p>
                <Link
                  to="/finansowanie"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-yellow-400 bg-slate-200 px-5 py-2.5 text-sm font-semibold text-yellow-600 transition hover:bg-slate-300"
                >
                  {t.homeFinanceCta}
                </Link>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-semibold md:text-3xl">{t.homeCalculatorTitle}</h2>
                <p className="text-slate-700">
                  {t.homeCalculatorText}
                </p>
                <Link
                  to="/calculator"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-yellow-400 bg-slate-200 px-5 py-2.5 text-sm font-semibold text-yellow-600 transition hover:bg-slate-300"
                >
                  {t.homeCalculatorCta}
                </Link>
              </div>
            </div>

            <div className="flex">
              <img loading="lazy" decoding="async" src="/pl/home-energy.webp" alt={t.homeEnergyAlt} className="w-full min-h-[400px] md:min-h-full rounded-2xl object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-3 md:text-3xl">{t.homeManufacturersTitle}</h2>
                <p className="text-slate-700">
                  {t.homeManufacturersText}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-3 md:text-3xl">{t.homeWhyTitle}</h2>
                <ul className="space-y-2">
                  {whySolimax.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-slate-700">
                      <span className="text-yellow-500 mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-slate-600">{t.homeWhyText}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-3 md:text-3xl">{t.homeWarrantyTitle}</h2>
                <p className="text-slate-700 mb-3">
                  {t.homeWarrantyText}
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

            <div className="space-y-4">
              <img loading="lazy" decoding="async" src="/pl/team1.webp" alt={t.homeTeamAlt} className="h-44 w-full object-cover rounded-xl" />
              <img loading="lazy" decoding="async" src="/pl/team2.webp" alt={t.homeInstallAlt} className="h-44 w-full object-cover rounded-xl" />
              <img loading="lazy" decoding="async" src="/pl/office.webp" alt={t.homeOfficeAlt} className="h-44 w-full object-cover rounded-xl" />
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-200">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {brands.map((brand) => (
                <span key={brand} className={`rounded-lg text-sm font-medium flex items-center justify-center ${brand === "Anker SOLIX" ? "p-0 border-0 bg-transparent" : `px-5 py-2.5 border min-h-[40px] ${darkBgBrands.has(brand) ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-200 text-slate-600'}`}`}>
                  {brandLogos[brand] ? (
                    <img loading="lazy" decoding="async" src={brandLogos[brand]} alt={brand} className={brand === "Anker SOLIX" ? "h-24 w-auto object-contain" : "h-6 object-contain"} />
                  ) : (
                    brand
                  )}
                </span>
              ))}
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
