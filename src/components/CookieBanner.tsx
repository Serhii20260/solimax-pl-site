// src/components/CookieBanner.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../lib/LanguageContext";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  if (!visible) return null;

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[70]">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2 text-sm text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">{t.cookieBannerTitle}</h2>
            <p className="leading-relaxed">
              {t.cookieBannerTextBeforePrivacy}{" "}
              <Link to="/polityka-konfidentsiinosti" className="font-medium text-yellow-700 underline underline-offset-2 hover:text-yellow-600">
                {t.cookieBannerPrivacyLink}
              </Link>{" "}
              {t.cookieBannerTextBetweenLinks}{" "}
              <Link to="/cookies" className="font-medium text-yellow-700 underline underline-offset-2 hover:text-yellow-600">
                {t.cookieBannerCookiesLink}
              </Link>
              .
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:pt-7">
            <button
              onClick={decline}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {t.cookieBannerDecline}
            </button>
            <button
              onClick={accept}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              {t.cookieBannerAccept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
