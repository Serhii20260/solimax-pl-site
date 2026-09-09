import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { CartProvider } from "./lib/CartContext";
import MainLayout from "./layouts/MainLayout";
import RouteFallback from "./components/RouteFallback";

// Головна лишається в основному чанку: це точка входу, і окремий запит
// за нею лише додав би затримку до першого показу.
import Home from "./pages/Home";

// Решта маршрутів — окремими чанками. Найважливіше: адмінка (AdminPackages
// + AdminPricing) і калькулятор більше не їдуть відвідувачу головної.
const Dom = lazy(() => import("./pages/Dom"));
const Biznes = lazy(() => import("./pages/Biznes"));
const PompyCiepla = lazy(() => import("./pages/PompyCiepla"));
const Finansowanie = lazy(() => import("./pages/Finansowanie"));
const Kontakt = lazy(() => import("./pages/Kontakt"));
const ONas = lazy(() => import("./pages/ONas"));
const Anker = lazy(() => import("./pages/Anker"));
const AnkerProductDetails = lazy(() => import("./pages/AnkerProductDetails"));
const AnkerOrder = lazy(() => import("./pages/AnkerOrder"));
const Carport = lazy(() => import("./pages/Carport"));
const Propozycje = lazy(() => import("./pages/Propozycje"));
const PropozycjeDetails = lazy(() => import("./pages/PropozycjeDetails"));
const Polityka = lazy(() => import("./pages/Polityka"));
const Cookies = lazy(() => import("./pages/Cookies"));
const DaniKompanii = lazy(() => import("./pages/DaniKompanii"));
const CalculatorWizard = lazy(() => import("./pages/CalculatorWizard"));
const AdminPricing = lazy(() => import("./pages/AdminPricing"));
const AdminPackages = lazy(() => import("./pages/AdminPackages"));
const AdminLeads = lazy(() => import("./pages/AdminLeads"));

function RequireAdmin({ children }: { children: React.ReactNode }) {
  const token = sessionStorage.getItem('admin_token');
  if (!token) return <Navigate to="/admin/packages" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <CartProvider>
      <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="dom" element={<Suspense fallback={<RouteFallback />}><Dom /></Suspense>} />
        <Route path="biznes" element={<Suspense fallback={<RouteFallback />}><Biznes /></Suspense>} />
        <Route path="pompy-ciepla" element={<Suspense fallback={<RouteFallback />}><PompyCiepla /></Suspense>} />
        <Route path="finansowanie" element={<Suspense fallback={<RouteFallback />}><Finansowanie /></Suspense>} />
        <Route path="kontakt" element={<Suspense fallback={<RouteFallback />}><Kontakt /></Suspense>} />
        <Route path="contact" element={<Suspense fallback={<RouteFallback />}><Kontakt /></Suspense>} />

        <Route path="o-nas" element={<Suspense fallback={<RouteFallback />}><ONas /></Suspense>} />
        <Route path="anker" element={<Suspense fallback={<RouteFallback />}><Anker /></Suspense>} />
        <Route path="anker/:slug" element={<Suspense fallback={<RouteFallback />}><AnkerProductDetails /></Suspense>} />
        <Route path="zamow" element={<Suspense fallback={<RouteFallback />}><AnkerOrder /></Suspense>} />
        <Route path="carport" element={<Suspense fallback={<RouteFallback />}><Carport /></Suspense>} />
        <Route path="propozycje" element={<Suspense fallback={<RouteFallback />}><Propozycje /></Suspense>} />
        <Route path="propozycje/:slug" element={<Suspense fallback={<RouteFallback />}><PropozycjeDetails /></Suspense>} />

        <Route path="polityka-konfidentsiinosti" element={<Suspense fallback={<RouteFallback />}><Polityka /></Suspense>} />
        <Route path="cookies" element={<Suspense fallback={<RouteFallback />}><Cookies /></Suspense>} />
        <Route path="dani-kompanii" element={<Suspense fallback={<RouteFallback />}><DaniKompanii /></Suspense>} />

        <Route path="calculator" element={<Suspense fallback={<RouteFallback />}><CalculatorWizard /></Suspense>} />
        <Route path="admin" element={<RequireAdmin><Suspense fallback={<RouteFallback />}><AdminPricing /></Suspense></RequireAdmin>} />
        <Route path="admin/packages" element={<Suspense fallback={<RouteFallback />}><AdminPackages /></Suspense>} />
        <Route path="admin/leads" element={<RequireAdmin><Suspense fallback={<RouteFallback />}><AdminLeads /></Suspense></RequireAdmin>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
    </CartProvider>
  );
}
