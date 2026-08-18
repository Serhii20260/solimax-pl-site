// src/components/Navbar.tsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../lib/LanguageContext";
import type { SupportedLanguage } from "../lib/i18n";
import logoDark from "../assets/logo-dark.svg";
import { useCart } from "../lib/CartContext";
import CartDrawer from "./CartDrawer";

const languageLabels: Record<SupportedLanguage, string> = {
  pl: "PL",
  en: "EN",
};

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { cart } = useCart();
  const [rishennyaOpen, setRishennyaOpen] = useState(false);
  const [kompaniyaOpen, setKompaniyaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const rishennya = [
    { to: "/dom", label: t.forHome },
    { to: "/biznes", label: t.forBusiness },
    { to: "/carport", label: "Carport" },
    { to: "/pompy-ciepla", label: t.heatPumps },
    { to: "/anker", label: "Anker SOLIX" },
    { to: "/propozycje", label: t.proposals },
    { to: "/finansowanie", label: t.financing },
  ];

  const kompaniya = [
    { to: "/o-nas", label: t.aboutUs },
    { to: "/kontakt", label: t.contact },
  ];

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img src={logoDark} alt="Solimax" className="h-7 w-auto" />
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">

          {/* Рішення dropdown */}
          <div className="relative"
            onMouseEnter={() => setRishennyaOpen(true)}
            onMouseLeave={() => setRishennyaOpen(false)}
          >
            <button className="flex items-center gap-1 rounded-full px-3 py-1.5 hover:bg-slate-100 transition-colors font-medium">
              {t.rishennya}
              <svg className="w-3 h-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {rishennyaOpen && (
              <div className="absolute top-full left-0 pt-2 w-52">
                <div className="rounded-2xl border border-slate-100 bg-white shadow-lg py-2 z-50">
                {rishennya.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `block px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors ${isActive ? "text-slate-900 font-semibold" : "text-slate-600"}`
                    }
                    onClick={() => setRishennyaOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                ))}
                </div>
              </div>
            )}
          </div>

          {/* Компанія dropdown */}
          <div className="relative"
            onMouseEnter={() => setKompaniyaOpen(true)}
            onMouseLeave={() => setKompaniyaOpen(false)}
          >
            <button className="flex items-center gap-1 rounded-full px-3 py-1.5 hover:bg-slate-100 transition-colors font-medium">
              {t.kompaniya}
              <svg className="w-3 h-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {kompaniyaOpen && (
              <div className="absolute top-full left-0 pt-2 w-44">
                <div className="rounded-2xl border border-slate-100 bg-white shadow-lg py-2 z-50">
                {kompaniya.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `block px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors ${isActive ? "text-slate-900 font-semibold" : "text-slate-600"}`
                    }
                    onClick={() => setKompaniyaOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                ))}
                </div>
              </div>
            )}
          </div>

          {/* Language selector */}
          <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-1 py-1">
            {(Object.keys(languageLabels) as SupportedLanguage[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                  language === lang
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {languageLabels[lang]}
              </button>
            ))}
          </div>

          {/* Cart icon */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors"
            aria-label={t.cartTitle}
          >
            <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile cart icon */}
        <button
          onClick={() => setCartOpen(true)}
          className="md:hidden relative p-2 rounded-xl hover:bg-slate-100 transition-colors"
          aria-label={t.cartTitle}
        >
          <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2 rounded-xl hover:bg-slate-100"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pb-4">
          <div className="pt-3 pb-1 text-xs font-bold uppercase tracking-widest text-slate-400">{t.rishennya}</div>
          {rishennya.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="block py-2.5 text-sm text-slate-700 hover:text-slate-900"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="pt-3 pb-1 text-xs font-bold uppercase tracking-widest text-slate-400">{t.kompaniya}</div>
          {kompaniya.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="block py-2.5 text-sm text-slate-700 hover:text-slate-900"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-1 py-1 mt-3 w-fit">
            {(Object.keys(languageLabels) as SupportedLanguage[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                  language === lang ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {languageLabels[lang]}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>

    <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
