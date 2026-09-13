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
    tier: "anker",
    kwp: 5.34,
    storageKwh: 16.14,
    netto: 54500,
    from: { pl: "od 54 500 zł netto + VAT", en: "from 54 500 zł net + VAT" },
  },
  {
    slug: "anker-x1-5kw",
    name: { pl: "Anker SOLIX X1 5 kW", en: "Anker SOLIX X1 5 kW" },
    tier: "anker",
    kwp: 5.7,
    storageKwh: 5,
    netto: 38300,
    from: { pl: "od 38 300 zł netto + VAT", en: "from 38 300 zł net + VAT" },
  },
  {
    slug: "bazik-8kw",
    name: { pl: "Standard PV 8 kW", en: "Standard PV 8 kW" },
    tier: "standard",
    kwp: 8.01,
    storageKwh: 6.14,
    netto: 35600,
    from: { pl: "od 35 600 zł netto + VAT", en: "from 35 600 zł net + VAT" },
  },
  {
    slug: "premium-8kw",
    name: { pl: "Premium PV 8 kW", en: "Premium PV 8 kW" },
    tier: "premium",
    kwp: 8.07,
    storageKwh: 9.04,
    netto: 50000,
    from: { pl: "od 50 000 zł netto + VAT", en: "from 50 000 zł net + VAT" },
  },
  {
    slug: "bazik-10kw",
    name: { pl: "Standard PV 10 kW", en: "Standard PV 10 kW" },
    tier: "standard",
    kwp: 9.79,
    storageKwh: 6.14,
    netto: 39100,
    from: { pl: "od 39 100 zł netto + VAT", en: "from 39 100 zł net + VAT" },
  },
  {
    slug: "premium-10kw",
    name: { pl: "Premium PV 10 kW", en: "Premium PV 10 kW" },
    tier: "premium",
    kwp: 9.97,
    storageKwh: 18.08,
    netto: 66000,
    from: { pl: "od 66 000 zł netto + VAT", en: "from 66 000 zł net + VAT" },
  },
  {
    slug: "anker-x1-12kw",
    name: { pl: "Anker SOLIX X1 12 kW", en: "Anker SOLIX X1 12 kW" },
    tier: "anker",
    kwp: 11.4,
    storageKwh: 15,
    netto: 71100,
    from: { pl: "od 71 100 zł netto + VAT", en: "from 71 100 zł net + VAT" },
  },
  {
    slug: "bazik-12kw",
    name: { pl: "Standard PV 12 kW", en: "Standard PV 12 kW" },
    tier: "standard",
    kwp: 12.02,
    storageKwh: 12.28,
    netto: 49500,
    from: { pl: "od 49 500 zł netto + VAT", en: "from 49 500 zł net + VAT" },
  },
  {
    slug: "premium-12kw",
    name: { pl: "Premium PV 12 kW", en: "Premium PV 12 kW" },
    tier: "premium",
    kwp: 12.35,
    storageKwh: 18.08,
    netto: 73000,
    from: { pl: "od 73 000 zł netto + VAT", en: "from 73 000 zł net + VAT" },
  },
];

export const CATALOGUE_HEAT_PUMPS: CatalogueHeatPump[] = [
  {
    slug: "vaillant-7kw",
    name: { pl: "Vaillant aroTHERM Plus 7 kW R290", en: "Vaillant aroTHERM Plus 7 kW R290" },
    kw: 7,
    netto: 69800,
    from: { pl: "od 69 800 zł netto + VAT", en: "from 69 800 zł net + VAT" },
  },
  {
    slug: "daikin-mt-10kw",
    name: { pl: "Daikin Altherma 3 H MT 10 kW", en: "Daikin Altherma 3 H MT 10 kW" },
    kw: 10,
    netto: 61500,
    from: { pl: "od 61 500 zł netto + VAT", en: "from 61 500 zł net + VAT" },
  },
  {
    slug: "vaillant-12kw",
    name: { pl: "Vaillant aroTHERM Plus 12 kW R290", en: "Vaillant aroTHERM Plus 12 kW R290" },
    kw: 12,
    netto: 85300,
    from: { pl: "od 85 300 zł netto + VAT", en: "from 85 300 zł net + VAT" },
  },
  {
    slug: "daikin-ht-14kw",
    name: { pl: "Daikin Altherma 3 H HT 14 kW", en: "Daikin Altherma 3 H HT 14 kW" },
    kw: 14,
    netto: 74200,
    from: { pl: "od 74 200 zł netto + VAT", en: "from 74 200 zł net + VAT" },
  },
];

/**
 * Найближчий каталожний пакет за потужністю.
 *
 * Добір ЗАВЖДИ повертає пакет (рішення власника 2026-09-09): готовий комплект
 * називається як орієнтир навіть тоді, коли потреба виходить за межі лінійки.
 * Мовчазних фолбеків немає — чужий ярус не підставляється, а якщо потреба в
 * ємності вища за всю лінійку, беремо пакет із найбільшою ємністю, і це видно
 * в pvFit(), а не ховається.
 *
 * Те саме правило й ті самі константи діють у pricegate (sizing.py):
 * калькулятор і телефонний консьєрж мусять відповідати однаково.
 */
export const PV_POWER_TOLERANCE = 0.40;
export const PV_STORAGE_TOLERANCE_BELOW = 0.10;

export function nearestPv(
  kwp: number,
  opts: { tier?: string; minStorageKwh?: number } = {},
): CataloguePv | null {
  const byTier = opts.tier
    ? CATALOGUE_PV.filter((p) => p.tier === opts.tier)
    : CATALOGUE_PV.slice();
  if (!byTier.length) return null;

  let pool = byTier;
  if (opts.minStorageKwh) {
    const floor = (opts.minStorageKwh as number) * (1 - PV_STORAGE_TOLERANCE_BELOW);
    const covering = pool.filter((p) => p.storageKwh >= floor);
    if (covering.length) {
      pool = covering;
    } else {
      const top = Math.max(...pool.map((p) => p.storageKwh));
      pool = pool.filter((p) => p.storageKwh === top);
    }
  }
  return pool.reduce((b, p) =>
    Math.abs(p.kwp - kwp) < Math.abs(b.kwp - kwp) ? p : b
  , pool[0]);
}

/**
 * Наскільки підібраний пакет відповідає потребі. На добір НЕ впливає —
 * керує лише поясненням, яке бачить клієнт. Дзеркало sizing.pv_fit().
 * inTolerance=false, коли потреба лежить ПОЗА діапазоном лінійки.
 * PV_POWER_TOLERANCE — запобіжник на випадок зміни каталогу; зараз він ні на
 * що не впливає, бо найгірше відхилення всередині діапазону близько 11 %.
 */
export type PvFit = {
  inTolerance: boolean;
  parameter: "power_kwp" | "storage_kwh" | "tier" | null;
  direction: "below" | "above" | null;
  requested: number;
  lineEdge: number | null;
  pickedKwp: number | null;
  pickedStorage: number | null;
};

export function pvFit(
  kwp: number,
  opts: { tier?: string; minStorageKwh?: number } = {},
): PvFit {
  const pool = opts.tier
    ? CATALOGUE_PV.filter((p) => p.tier === opts.tier)
    : CATALOGUE_PV.slice();
  const best = nearestPv(kwp, opts);
  if (!pool.length || !best) {
    return { inTolerance: false, parameter: "tier", direction: null,
             requested: kwp, lineEdge: null, pickedKwp: null, pickedStorage: null };
  }
  const lineMin = Math.min(...pool.map((p) => p.kwp));
  const lineMax = Math.max(...pool.map((p) => p.kwp));
  const lineMaxStorage = Math.max(...pool.map((p) => p.storageKwh));
  const base: PvFit = { inTolerance: true, parameter: null, direction: null,
                        requested: kwp, lineEdge: null,
                        pickedKwp: best.kwp, pickedStorage: best.storageKwh };

  if (opts.minStorageKwh &&
      best.storageKwh < (opts.minStorageKwh as number) * (1 - PV_STORAGE_TOLERANCE_BELOW)) {
    return { ...base, inTolerance: false, parameter: "storage_kwh",
             direction: "above", requested: opts.minStorageKwh as number,
             lineEdge: lineMaxStorage };
  }
  if (kwp < lineMin) {
    return { ...base, inTolerance: false, parameter: "power_kwp",
             direction: "below", lineEdge: lineMin };
  }
  if (kwp > lineMax) {
    return { ...base, inTolerance: false, parameter: "power_kwp",
             direction: "above", lineEdge: lineMax };
  }
  if (kwp > 0 && Math.abs(best.kwp - kwp) / kwp > PV_POWER_TOLERANCE) {
    return { ...base, inTolerance: false, parameter: "power_kwp",
             direction: best.kwp < kwp ? "below" : "above", lineEdge: best.kwp };
  }
  return base;
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
