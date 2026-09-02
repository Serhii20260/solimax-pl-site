// ЗГЕНЕРОВАНО — не редагувати руками.
// Каталог для калькулятора: ті самі пакети й ті самі ціни, що на /pl/propozycje.
// Джерело: /home/pricing/price-source.json -> export_price_display.py -> gen_prices.js
// price-source версія: 1.6.0
//
// kwp і storageKwh пораховані зі СКЛАДУ пакета (панель x кількість,
// батарея x кількість), а не вписані окремо.

export type CatalogueLabel = { pl: string; en: string };

export type CataloguePv = {
  slug: string;
  name: CatalogueLabel;
  tier: string;
  kwp: number;
  storageKwh: number;
  netto: number;
  from: CatalogueLabel;
};

export type CatalogueHeatPump = Omit<CataloguePv, 'kwp' | 'storageKwh' | 'tier'> & { kw: number };

export const CATALOGUE_PV: CataloguePv[] = [
  {
    slug: "anker-smart-system",
    name: { pl: "Anker SOLIX Smart System", en: "Anker SOLIX Smart System" },
    tier: "premium",
    kwp: 5.34,
    storageKwh: 16.14,
    netto: 54500,
    from: { pl: "od 54 500,00 zł netto + VAT", en: "from 54 500,00 zł net + VAT" },
  },
  {
    slug: "anker-x1-5kw",
    name: { pl: "Anker SOLIX X1 5 kW", en: "Anker SOLIX X1 5 kW" },
    tier: "premium",
    kwp: 5.7,
    storageKwh: 5,
    netto: 38300,
    from: { pl: "od 38 300,00 zł netto + VAT", en: "from 38 300,00 zł net + VAT" },
  },
  {
    slug: "bazik-8kw",
    name: { pl: "Standard PV 8 kW", en: "Standard PV 8 kW" },
    tier: "standard",
    kwp: 8.01,
    storageKwh: 6.14,
    netto: 35570.31,
    from: { pl: "od 35 570,31 zł netto + VAT", en: "from 35 570,31 zł net + VAT" },
  },
  {
    slug: "premium-8kw",
    name: { pl: "Premium PV 8 kW", en: "Premium PV 8 kW" },
    tier: "premium",
    kwp: 8.07,
    storageKwh: 9.04,
    netto: 50000,
    from: { pl: "od 50 000,00 zł netto + VAT", en: "from 50 000,00 zł net + VAT" },
  },
  {
    slug: "bazik-10kw",
    name: { pl: "Standard PV 10 kW", en: "Standard PV 10 kW" },
    tier: "standard",
    kwp: 9.79,
    storageKwh: 6.14,
    netto: 39081,
    from: { pl: "od 39 081,00 zł netto + VAT", en: "from 39 081,00 zł net + VAT" },
  },
  {
    slug: "premium-10kw",
    name: { pl: "Premium PV 10 kW", en: "Premium PV 10 kW" },
    tier: "premium",
    kwp: 9.97,
    storageKwh: 18.08,
    netto: 66000,
    from: { pl: "od 66 000,00 zł netto + VAT", en: "from 66 000,00 zł net + VAT" },
  },
  {
    slug: "anker-x1-12kw",
    name: { pl: "Anker SOLIX X1 12 kW", en: "Anker SOLIX X1 12 kW" },
    tier: "premium",
    kwp: 11.4,
    storageKwh: 15,
    netto: 71100,
    from: { pl: "od 71 100,00 zł netto + VAT", en: "from 71 100,00 zł net + VAT" },
  },
  {
    slug: "bazik-12kw",
    name: { pl: "Standard PV 12 kW", en: "Standard PV 12 kW" },
    tier: "standard",
    kwp: 12.02,
    storageKwh: 12.28,
    netto: 49492.41,
    from: { pl: "od 49 492,41 zł netto + VAT", en: "from 49 492,41 zł net + VAT" },
  },
  {
    slug: "premium-12kw",
    name: { pl: "Premium PV 12 kW", en: "Premium PV 12 kW" },
    tier: "premium",
    kwp: 12.35,
    storageKwh: 18.08,
    netto: 73000,
    from: { pl: "od 73 000,00 zł netto + VAT", en: "from 73 000,00 zł net + VAT" },
  },
];

export const CATALOGUE_HEAT_PUMPS: CatalogueHeatPump[] = [
  {
    slug: "vaillant-7kw",
    name: { pl: "Vaillant aroTHERM Plus 7 kW R290", en: "Vaillant aroTHERM Plus 7 kW R290" },
    kw: 7,
    netto: 69833.33,
    from: { pl: "od 69 833,33 zł netto + VAT", en: "from 69 833,33 zł net + VAT" },
  },
  {
    slug: "daikin-mt-10kw",
    name: { pl: "Daikin Altherma 3 H MT 10 kW", en: "Daikin Altherma 3 H MT 10 kW" },
    kw: 10,
    netto: 61489.81,
    from: { pl: "od 61 489,81 zł netto + VAT", en: "from 61 489,81 zł net + VAT" },
  },
  {
    slug: "vaillant-12kw",
    name: { pl: "Vaillant aroTHERM Plus 12 kW R290", en: "Vaillant aroTHERM Plus 12 kW R290" },
    kw: 12,
    netto: 85296.3,
    from: { pl: "od 85 296,30 zł netto + VAT", en: "from 85 296,30 zł net + VAT" },
  },
  {
    slug: "daikin-ht-14kw",
    name: { pl: "Daikin Altherma 3 H HT 14 kW", en: "Daikin Altherma 3 H HT 14 kW" },
    kw: 14,
    netto: 74185.19,
    from: { pl: "od 74 185,19 zł netto + VAT", en: "from 74 185,19 zł net + VAT" },
  },
];

/**
 * Найближчий каталожний пакет за потужністю.
 *
 * Спершу звужуємо вибір тим, що просив клієнт: лінійка (standard/premium)
 * і мінімальний магазин енергії. Якщо під ці умови не підходить жоден пакет —
 * не вигадуємо конфігурацію, а беремо найближчий з усіх і показуємо ціну
 * як «від» з приміткою про індивідуальний розрахунок.
 */
export function nearestPv(
  kwp: number,
  opts: { tier?: string; minStorageKwh?: number } = {},
): CataloguePv {
  const narrow = (list: CataloguePv[]) => (list.length ? list : null);
  const byTier = opts.tier
    ? narrow(CATALOGUE_PV.filter((p) => p.tier === opts.tier))
    : null;
  const base = byTier ?? CATALOGUE_PV;
  const byStorage = opts.minStorageKwh
    ? narrow(base.filter((p) => p.storageKwh >= (opts.minStorageKwh as number)))
    : null;
  const pool = byStorage ?? base;
  return pool.reduce((best, p) =>
    Math.abs(p.kwp - kwp) < Math.abs(best.kwp - kwp) ? p : best
  , pool[0]);
}

/** Чи є вибраний пакет точним попаданням у запит клієнта. */
export function isExactPvMatch(
  pkg: CataloguePv,
  kwp: number,
  opts: { tier?: string; minStorageKwh?: number } = {},
): boolean {
  if (opts.tier && pkg.tier !== opts.tier) return false;
  if (opts.minStorageKwh && pkg.storageKwh < opts.minStorageKwh) return false;
  return Math.abs(pkg.kwp - kwp) <= 0.5;
}

export function nearestHeatPump(kw: number): CatalogueHeatPump {
  return CATALOGUE_HEAT_PUMPS.reduce((best, p) =>
    Math.abs(p.kw - kw) < Math.abs(best.kw - kw) ? p : best
  , CATALOGUE_HEAT_PUMPS[0]);
}
