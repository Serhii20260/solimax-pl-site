// src/layouts/MainLayout.tsx
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import ConsultantWidget from "../components/ConsultantWidget";
import { useLanguage } from "../lib/LanguageContext";

type MainLayoutProps = {
  children?: React.ReactNode;
};

const CONTACT_PHONE_TEL = "+48732071337";

export default function MainLayout({ children }: MainLayoutProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [consultantOpen, setConsultantOpen] = useState(false);
  const [ctaStyle, setCtaStyle] = useState<{ top?: number; bottom?: number }>({ bottom: 40 });

  useEffect(() => {
    const updatePosition = () => {
      const footer = document.getElementById("footer");
      const viewportHeight = window.innerHeight;

      // Position from bottom (above footer if visible)
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const overlap = Math.max(0, viewportHeight - footerRect.top);
        setCtaStyle({ bottom: 40 + overlap });
      } else {
        setCtaStyle({ bottom: 40 });
      }
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  // Scroll to top on route change (if no hash)
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname]);

  // Scroll to hash after navigation
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.slice(1);
      setTimeout(() => {
        const target = document.getElementById(elementId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          // Focus on first input if it's a form
          const focusTarget = target.querySelector<HTMLElement>("input, select, textarea");
          if (focusTarget) {
            setTimeout(() => focusTarget.focus({ preventScroll: true }), 300);
          }
        }
      }, 100);
    }
  }, [location]);

  const handleLeadClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    // Always navigate to contact page with lead form
    navigate("/kontakt#lead-form");
  };

  const handleCalculatorClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    // Always navigate to calculator page
    navigate("/calculator");
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <Navbar />

      <main className="flex-1 w-full pt-20 md:pt-24 pb-36 sm:pb-0">
        {children ?? <Outlet />}
      </main>

      <Footer />
      <CookieBanner />

      <div className="fixed left-4 right-4 z-40 grid grid-cols-2 gap-2 sm:left-auto sm:right-4 sm:flex sm:flex-col sm:items-end sm:gap-4" style={ctaStyle}>
        <ConsultantWidget open={consultantOpen} onClose={() => setConsultantOpen(false)} />
        <a
          href={`tel:${CONTACT_PHONE_TEL}`}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-yellow-500 px-3 py-2.5 text-sm font-semibold text-black shadow-lg transition-colors hover:bg-yellow-400 sm:hidden"
          aria-label={t.callButton}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.3-.3.74-.39 1.13-.26 1.24.41 2.57.63 3.96.63.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.85 21 3 13.15 3 3.5c0-.55.45-1 1-1h3.45c.55 0 1 .45 1 1 0 1.39.22 2.72.63 3.96.13.39.04.83-.26 1.13l-2.2 2.2z" />
          </svg>
          {t.callButton}
        </a>
        <Link
          to="/kontakt#callback-form"
          className="hidden items-center justify-center gap-2 rounded-xl bg-yellow-500 px-5 py-3.5 text-base font-semibold text-black shadow-lg hover:bg-yellow-400 transition-colors sm:inline-flex"
          aria-label={t.callButton}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.3-.3.74-.39 1.13-.26 1.24.41 2.57.63 3.96.63.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.85 21 3 13.15 3 3.5c0-.55.45-1 1-1h3.45c.55 0 1 .45 1 1 0 1.39.22 2.72.63 3.96.13.39.04.83-.26 1.13l-2.2 2.2z" />
          </svg>
          {t.callButton}
        </Link>
        <Link
          to="/kontakt#lead-form"
          onClick={handleLeadClick}
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-yellow-500 px-3 py-2.5 text-center text-sm font-semibold text-black shadow-lg transition-colors hover:bg-yellow-400 sm:px-6 sm:py-4 sm:text-lg"
        >
          {t.leaveRequest}
        </Link>
        <Link
          to="/calculator"
          onClick={handleCalculatorClick}
          className="inline-flex min-h-11 items-center justify-center rounded-xl border-2 border-yellow-500 bg-slate-800 px-3 py-2.5 text-center text-sm font-semibold text-yellow-400 shadow-lg transition-colors hover:bg-slate-700 sm:px-5 sm:py-3.5 sm:text-base"
        >
          {t.calculator}
        </Link>
        <button
          type="button"
          onClick={() => setConsultantOpen((prev) => !prev)}
          className="inline-flex min-h-11 items-center justify-center rounded-xl border-2 border-yellow-500 bg-slate-800 px-3 py-2.5 text-center text-sm font-semibold text-yellow-400 shadow-lg transition-colors hover:bg-slate-700 sm:px-5 sm:py-3.5 sm:text-base"
        >
          {t.consultant}
        </button>
      </div>
    </div>
  );
}
