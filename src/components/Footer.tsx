// src/components/Footer.tsx
import { Link } from "react-router-dom";
import { useLanguage } from "../lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="footer" className="mt-16 bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 text-sm text-slate-600 md:grid-cols-3 md:items-start md:gap-10 md:px-6 lg:px-8">
        <div className="space-y-2">
          <div className="text-base font-semibold text-slate-900">{t.footerBrand}</div>
          <div>{t.footerDescription}</div>
          <div className="text-xs">{t.footerCopyright} {new Date().getFullYear()}</div>
        </div>

        <nav className="flex flex-col gap-2">
          <Link to="/" className="hover:text-slate-900">{t.footerHome}</Link>
          <Link to="/dom" className="hover:text-slate-900">{t.footerForHome}</Link>
          <Link to="/biznes" className="hover:text-slate-900">{t.footerForBusiness}</Link>
          <Link to="/finansowanie" className="hover:text-slate-900">{t.footerFinancing}</Link>
          <Link to="/projekty" className="hover:text-slate-900">{t.footerProjects}</Link>
          <Link to="/kontakt" className="hover:text-slate-900">{t.footerContact}</Link>
        </nav>

        <div className="flex flex-col gap-2">
          <Link to="/polityka-konfidentsiinosti" className="hover:text-slate-900">{t.footerPrivacyPolicy}</Link>
          <Link to="/cookies" className="hover:text-slate-900">{t.footerCookies}</Link>
          <Link to="/dani-kompanii" className="hover:text-slate-900">{t.footerCompanyData}</Link>
        </div>
      </div>
    </footer>
  );
}
