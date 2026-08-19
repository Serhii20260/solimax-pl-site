// src/components/RouteFallback.tsx
/**
 * Заглушка для Suspense на рівні маршруту.
 *
 * Свідомо НЕ спінер: спінер посеред екрана дає порожнечу, а потім стрибок,
 * коли приїжджає справжній вміст. Замість цього — скелет тієї ж структури,
 * що й у типової сторінки: повноекранний блок героя, під ним смуги тексту
 * і сітка карток. Висота задана в тих самих одиницях (min-h-[60vh] /
 * md:min-h-[72vh] / lg:min-h-[75vh]), що й у справжніх героїв, тому підміна
 * скелета на вміст не зсуває нічого нижче.
 */
export default function RouteFallback() {
  return (
    <div aria-hidden="true" className="animate-pulse">
      {/* герой */}
      <div className="w-full min-h-[60vh] md:min-h-[72vh] lg:min-h-[75vh] bg-slate-200" />

      {/* смуги тексту */}
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-12 md:py-16 space-y-4">
        <div className="h-8 w-2/3 rounded bg-slate-200" />
        <div className="h-4 w-full rounded bg-slate-100" />
        <div className="h-4 w-11/12 rounded bg-slate-100" />
        <div className="h-4 w-10/12 rounded bg-slate-100" />
      </div>

      {/* сітка карток */}
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="h-64 rounded-2xl bg-slate-100" />
          <div className="h-64 rounded-2xl bg-slate-100" />
          <div className="h-64 rounded-2xl bg-slate-100" />
        </div>
      </div>
    </div>
  );
}
