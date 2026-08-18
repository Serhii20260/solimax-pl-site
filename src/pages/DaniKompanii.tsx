import { useLanguage } from "../lib/LanguageContext";

export default function DaniKompanii() {
  const { t } = useLanguage();

  const rows = [
    [t.legalCompanyFullName, t.legalCompanyFullNameValue],
    [t.legalCompanyLegalForm, t.legalCompanyLegalFormValue],
    ["KRS", "0001192599"],
    ["NIP", "8971959206"],
    ["REGON", "542652846"],
    [t.legalCompanyRegister, t.legalCompanyRegisterValue],
    [t.legalCompanyAddress, t.legalCompanyAddressValue],
    [t.legalCompanyRegion, t.legalCompanyRegionValue],
    [t.legalCompanyActivity, t.legalCompanyActivityValue],
    [t.legalCompanyMarkets, t.legalCompanyMarketsValue],
    [t.legalCompanySince, t.legalCompanySinceValue],
    [t.legalCompanyWebsite, "solimax.pl"],
  ];

  return (
    <main className="bg-white text-slate-900 min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <h1 className="text-3xl font-semibold mb-2">{t.legalCompanyTitle}</h1>
        <p className="text-sm text-slate-400 mb-10">{t.legalCompanySubtitle}</p>

        <div className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">{t.legalCompanyBasicTitle}</h2>
            <table className="w-full text-sm border-collapse">
              <tbody>
                {rows.map(([label, value]) => (
                  <tr key={label} className="border-b border-slate-100">
                    <td className="py-3 pr-6 text-slate-500 w-48 align-top">{label}</td>
                    <td className="py-3">{value}</td>
                  </tr>
                ))}
                <tr className="border-b border-slate-100">
                  <td className="py-3 pr-6 text-slate-500 align-top">Email</td>
                  <td className="py-3">
                    <a href="mailto:info@solimax.pl" className="text-slate-700 underline hover:no-underline">
                      info@solimax.pl
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">{t.legalCompanyImpressumTitle}</h2>
            <p>{t.legalCompanyImpressumP1}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">{t.legalCompanyDisclaimerTitle}</h2>
            <h3 className="font-medium text-slate-800 mb-2">{t.legalCompanyDisclaimerContentTitle}</h3>
            <p className="mb-4">{t.legalCompanyDisclaimerContentP1}</p>

            <h3 className="font-medium text-slate-800 mb-2">{t.legalCompanyDisclaimerLinksTitle}</h3>
            <p className="mb-4">{t.legalCompanyDisclaimerLinksP1}</p>

            <h3 className="font-medium text-slate-800 mb-2">{t.legalCompanyCopyrightTitle}</h3>
            <p>{t.legalCompanyCopyrightP1}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">{t.legalCompanyOdrTitle}</h2>
            <p className="mb-3">{t.legalCompanyOdrP1}</p>
            <p>
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-slate-700 underline">
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
            <p className="mt-3">{t.legalCompanyOdrP2}</p>
          </section>

          <p className="text-sm text-slate-400 pt-8 border-t border-slate-100">{t.legalCompanyFooter}</p>
        </div>
      </div>
    </main>
  );
}
