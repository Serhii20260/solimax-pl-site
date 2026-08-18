import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import CalculatorWizard from "./pages/CalculatorWizard";
import AdminPricing from "./pages/AdminPricing";
import AdminPackages from "./pages/AdminPackages";

import Home from "./pages/Home";
import Dom from "./pages/Dom";
import Biznes from "./pages/Biznes";
import PompyCiepla from "./pages/PompyCiepla";
import Finansowanie from "./pages/Finansowanie";
import Kontakt from "./pages/Kontakt";

import Anker from "./pages/Anker";
import AnkerOrder from "./pages/AnkerOrder";
import AnkerProductDetails from "./pages/AnkerProductDetails";
import { CartProvider } from "./lib/CartContext";
import Carport from "./pages/Carport";
import ONas from "./pages/ONas";
import Propozycje from "./pages/Propozycje";
import PropozycjeDetails from "./pages/PropozycjeDetails";
import Polityka from "./pages/Polityka";
import Cookies from "./pages/Cookies";
import DaniKompanii from "./pages/DaniKompanii";
import MainLayout from "./layouts/MainLayout";

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
        <Route path="dom" element={<Dom />} />
        <Route path="biznes" element={<Biznes />} />
        <Route path="pompy-ciepla" element={<PompyCiepla />} />
        <Route path="finansowanie" element={<Finansowanie />} />
        <Route path="kontakt" element={<Kontakt />} />
        <Route path="contact" element={<Kontakt />} />

        <Route path="o-nas" element={<ONas />} />
        <Route path="anker" element={<Anker />} />
        <Route path="anker/:slug" element={<AnkerProductDetails />} />
        <Route path="zamow" element={<AnkerOrder />} />
        <Route path="carport" element={<Carport />} />
        <Route path="propozycje" element={<Propozycje />} />
        <Route path="propozycje/:slug" element={<PropozycjeDetails />} />

        <Route path="polityka-konfidentsiinosti" element={<Polityka />} />
        <Route path="cookies" element={<Cookies />} />
        <Route path="dani-kompanii" element={<DaniKompanii />} />

        <Route path="calculator" element={<CalculatorWizard />} />
        <Route path="admin" element={<RequireAdmin><AdminPricing /></RequireAdmin>} />
        <Route path="admin/packages" element={<AdminPackages />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
    </CartProvider>
  );
}
