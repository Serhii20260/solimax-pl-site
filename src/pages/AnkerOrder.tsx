// src/pages/AnkerOrder.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatZlotyAmount, normalizeCartPrice, useCart } from "../lib/CartContext";
import { apiUrl } from "../lib/api";
import { useLanguage } from "../lib/LanguageContext";

export default function AnkerOrder() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "" });

  const total = cart.reduce((sum, item) => {
    const price = normalizeCartPrice(item.price);
    return sum + (price ?? 0) * item.quantity;
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert(t.orderEmptyAlert);
      return;
    }
    setIsLoading(true);

    const orderData = {
      type: "order",
      name: form.name,
      phone: form.phone,
      email: form.email,
      address: form.address,
      items: cart.map((item) => ({ id: item.id, name: item.name, quantity: item.quantity })),
      total,
      source: "anker-order",
    };

    try {
      await fetch(apiUrl("/consultant/lead"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      setIsSubmitted(true);
      clearCart();
    } catch {
      alert(t.orderSubmitError);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-12 text-center max-w-md shadow-lg">
          <div className="text-6xl mb-6">OK</div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">{t.orderSuccessTitle}</h1>
          <p className="text-slate-500 mb-8">{t.orderSuccessMessage}</p>
          <button onClick={() => navigate("/anker")} className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700 transition-colors">
            {t.orderBackToCatalog}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-6">
          <button onClick={() => navigate("/anker")} className="text-slate-500 hover:text-slate-700 text-sm flex items-center gap-1">
            {t.orderBackToCatalog}
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h1 className="text-2xl font-bold text-slate-900">{t.orderPageTitle}</h1>
          </div>

          {cart.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <p className="mb-4">{t.orderEmptyCart}</p>
              <button onClick={() => navigate("/anker")} className="text-yellow-600 hover:text-yellow-700 font-semibold">
                {t.orderGoToCatalog}
              </button>
            </div>
          ) : (
            <>
              <div className="p-6 space-y-4">
                {cart.map((item) => {
                  const price = normalizeCartPrice(item.price);
                  const lineTotal = price !== null ? price * item.quantity : null;

                  return (
                  <div key={item.id} className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                    <img loading="lazy" decoding="async" src={item.image} alt={item.name} className="w-20 h-20 object-contain bg-white rounded-lg" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900">{item.name}</h4>
                      <div className="text-sm text-slate-500">
                        {price !== null ? `${formatZlotyAmount(price)} x ${item.quantity}` : (item.priceDisplay || t.orderPriceOnRequest)}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQuantity(item.id, -1)} aria-label={t.orderDecreaseQuantity} className="w-8 h-8 rounded-lg bg-slate-200 hover:bg-slate-300 font-bold">-</button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} aria-label={t.orderIncreaseQuantity} className="w-8 h-8 rounded-lg bg-slate-200 hover:bg-slate-300 font-bold">+</button>
                        <button onClick={() => removeFromCart(item.id)} className="ml-auto text-red-500 hover:text-red-700 text-sm">{t.orderRemove}</button>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900">{lineTotal !== null ? formatZlotyAmount(lineTotal) : item.priceDisplay || t.orderPriceOnRequest}</span>
                    </div>
                  </div>
                  );
                })}
              </div>

              <div className="p-6 bg-slate-100 border-t border-slate-200">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold text-slate-900">{t.orderTotal}</span>
                  <span className="text-2xl font-bold text-slate-900">{formatZlotyAmount(total)}</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t.orderNameLabel}</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none" placeholder={t.orderNamePlaceholder} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t.orderPhoneLabel}</label>
                    <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none" placeholder="+48 XXX XXX XXX" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t.orderEmailLabel}</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none" placeholder="jan@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t.orderAddressLabel}</label>
                    <textarea required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows={3} className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none resize-none" placeholder={t.orderAddressPlaceholder} />
                  </div>
                  <button type="submit" disabled={isLoading} className="w-full rounded-xl bg-yellow-500 px-6 py-4 text-lg font-semibold text-black hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {isLoading ? t.orderSending : t.orderSubmit}
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
