import { useLanguage } from "../lib/LanguageContext";

export default function Cookies() {
  const { t } = useLanguage();

  const cookieRows = [
    ["solimax_lang", t.legalCookiesLangPurpose, t.legalCookiesOneYear],
    ["solimax_consent", t.legalCookiesConsentPurpose, t.legalCookiesOneYear],
  ];

  const browserSettings = [
    t.legalCookiesSection5Chrome,
    t.legalCookiesSection5Firefox,
    t.legalCookiesSection5Safari,
    t.legalCookiesSection5Edge,
  ];

  return (
    <main className="bg-white text-slate-900 min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <h1 className="text-3xl font-semibold mb-2">{t.legalCookiesTitle}</h1>
        <p className="text-sm text-slate-400 mb-10">{t.legalCookiesUpdated}</p>

        <div className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">{t.legalCookiesSection1Title}</h2>
            <p className="mb-3">{t.legalCookiesSection1P1}</p>
            <p>{t.legalCookiesSection1P2}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">{t.legalCookiesSection2Title}</h2>
            <p>{t.legalCookiesSection2P1}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">{t.legalCookiesSection3Title}</h2>

            <h3 className="font-medium text-slate-800 mb-2 mt-4">{t.legalCookiesEssentialTitle}</h3>
            <p className="mb-3">{t.legalCookiesEssentialP1}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border border-slate-200 px-3 py-2 text-left">{t.legalCookiesTableName}</th>
                    <th className="border border-slate-200 px-3 py-2 text-left">{t.legalCookiesTablePurpose}</th>
                    <th className="border border-slate-200 px-3 py-2 text-left">{t.legalCookiesTableDuration}</th>
                  </tr>
                </thead>
                <tbody>
                  {cookieRows.map(([name, purpose, duration]) => (
                    <tr key={name}>
                      <td className="border border-slate-200 px-3 py-2">{name}</td>
                      <td className="border border-slate-200 px-3 py-2">{purpose}</td>
                      <td className="border border-slate-200 px-3 py-2">{duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="font-medium text-slate-800 mb-2 mt-6">{t.legalCookiesAnalyticsTitle}</h3>
            <p className="mb-3">{t.legalCookiesAnalyticsP1}</p>

            <h3 className="font-medium text-slate-800 mb-2 mt-6">{t.legalCookiesFunctionalTitle}</h3>
            <p>{t.legalCookiesFunctionalP1}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">{t.legalCookiesSection4Title}</h2>
            <p className="mb-3">{t.legalCookiesSection4P1}</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Google Analytics -{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-slate-700 underline">
                  policies.google.com/privacy
                </a>
              </li>
              <li>
                Brevo -{" "}
                <a href="https://www.brevo.com/legal/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-slate-700 underline">
                  brevo.com/legal/privacypolicy
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">{t.legalCookiesSection5Title}</h2>
            <p className="mb-3">{t.legalCookiesSection5P1}</p>
            <ul className="list-disc pl-6 space-y-2">
              {browserSettings.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">{t.legalCookiesSection6Title}</h2>
            <p>{t.legalCookiesSection6P1}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">{t.legalCookiesSection7Title}</h2>
            <p>{t.legalCookiesSection7P1}</p>
          </section>

          <p className="text-sm text-slate-400 pt-8 border-t border-slate-100">{t.legalCookiesFooter}</p>
        </div>
      </div>
    </main>
  );
}
