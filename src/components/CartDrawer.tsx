// src/components/CartDrawer.tsx
import { formatZlotyAmount, normalizeCartPrice, useCart } from '../lib/CartContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../lib/LanguageContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: Props) {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const total = cart.reduce((sum, item) => {
    const price = normalizeCartPrice(item.price);
    return sum + (price ?? 0) * item.quantity;
  }, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">{t.cartTitle}</h2>
            {totalItems > 0 && (
              <span className="bg-yellow-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <button onClick={onClose} aria-label={t.cartCloseLabel} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center text-slate-400 py-16">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="font-medium">{t.cartEmpty}</p>
              <button
                onClick={onClose}
                className="mt-4 text-yellow-600 hover:text-yellow-700 text-sm font-semibold"
              >
                {t.cartGoToCatalog}
              </button>
            </div>
          ) : (
            cart.map(item => {
              const price = normalizeCartPrice(item.price);
              const lineTotal = price !== null ? price * item.quantity : null;

              return (
                <div key={item.id} className="flex gap-3 bg-slate-50 rounded-xl p-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain bg-white rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 leading-tight">{item.name}</p>
                    <p className="text-sm text-slate-500 mt-0.5">
                      {price !== null ? (
                        <>
                          {item.priceDisplay} x {item.quantity} = <span className="font-semibold text-slate-800">{formatZlotyAmount(lineTotal ?? 0)}</span>
                        </>
                      ) : (
                        <span className="font-semibold text-slate-800">{item.priceDisplay || t.cartPriceOnRequest}</span>
                      )}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label={t.cartDecreaseQuantity}
                        className="w-7 h-7 rounded-lg bg-slate-200 hover:bg-slate-300 text-sm font-bold flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label={t.cartIncreaseQuantity}
                        className="w-7 h-7 rounded-lg bg-slate-200 hover:bg-slate-300 text-sm font-bold flex items-center justify-center"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-red-400 hover:text-red-600 text-xs transition-colors"
                      >
                        {t.cartRemove}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-200 space-y-3 bg-white">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-700">{t.cartTotal}</span>
              <span className="text-xl font-bold text-slate-900">{formatZlotyAmount(total)}</span>
            </div>
            <button
              onClick={() => { onClose(); navigate('/zamow'); }}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3.5 rounded-xl transition-colors"
            >
              {t.cartCheckout}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
