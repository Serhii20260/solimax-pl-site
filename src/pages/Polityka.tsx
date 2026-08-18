import { useLanguage } from "../lib/LanguageContext";

export default function Polityka() {
  const { t } = useLanguage();

  const sections = [
    {
      title: t.legalPrivacySection1Title,
      paragraphs: [t.legalPrivacySection1P1, t.legalPrivacySection1P2],
    },
    {
      title: t.legalPrivacySection2Title,
      paragraphs: [t.legalPrivacySection2P1, t.legalPrivacySection2P2, t.legalPrivacySection2P3],
    },
    {
      title: t.legalPrivacySection3Title,
      paragraphs: [t.legalPrivacySection3P1, t.legalPrivacySection3P2],
    },
    {
      title: t.legalPrivacySection4Title,
      paragraphs: [t.legalPrivacySection4P1, t.legalPrivacySection4P2],
    },
    {
      title: t.legalPrivacySection5Title,
      paragraphs: [t.legalPrivacySection5P1, t.legalPrivacySection5P2],
    },
    {
      title: t.legalPrivacySection6Title,
      paragraphs: [t.legalPrivacySection6P1, t.legalPrivacySection6P2],
    },
    {
      title: t.legalPrivacySection7Title,
      paragraphs: [t.legalPrivacySection7P1],
    },
    {
      title: t.legalPrivacySection8Title,
      paragraphs: [t.legalPrivacySection8P1],
    },
    {
      title: t.legalPrivacySection9Title,
      paragraphs: [t.legalPrivacySection9P1],
    },
    {
      title: t.legalPrivacySection10Title,
      paragraphs: [t.legalPrivacySection10P1],
    },
    {
      title: t.legalPrivacySection11Title,
      paragraphs: [t.legalPrivacySection11P1],
    },
  ];

  return (
    <main className="bg-white text-slate-900 min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <h1 className="text-3xl font-semibold mb-2">{t.legalPrivacyTitle}</h1>
        <p className="text-sm text-slate-400 mb-10">{t.legalPrivacyUpdated}</p>

        <div className="space-y-8 text-slate-700 leading-relaxed">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mb-3">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <p className="text-sm text-slate-400 pt-8 border-t border-slate-100">{t.legalPrivacyFooter}</p>
        </div>
      </div>
    </main>
  );
}
