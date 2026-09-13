// ЗГЕНЕРОВАНО — не редагувати руками.
// Джерело: /home/pricing/price-source.json (нетто) -> export_price_display.py
//          -> gen_prices.js -> цей файл.
// Підписи зібрані тим самим форматером, що працює в API
// (solimax-pl-backend-site/src/services/priceLabel.js), тож сторінка
// /pl/propozycje і відповіді API не можуть розійтись.
//
// price-source версія: 1.6.0
// Одна форма для всіх типів пакетів: нетто + підпис «netto + VAT».
// Ставка ПДВ на сайті не вказується — вона визначається під клієнта й об'єкт.

// Одна форма підпису на весь сайт: «X zł netto + VAT».
// Ставка ПДВ і брутто тут не з'являються — вони визначаються під клієнта
// й об'єкт, а не під пакет.
export type PriceEntry = { pl: string; en: string; netto: number; indicative: boolean };

// Суфікс підпису — з того самого форматера, що й усі ціни. Потрібен там, де
// сума рахується на льоту (калькулятор), а не береться з каталогу.
export const NETTO_SUFFIX = { pl: "netto + VAT", en: "net + VAT" } as const;

export const PRICES: Record<string, PriceEntry> = {
  "anker-smart-system": {
    pl: "54 500 zł netto + VAT",
    en: "54 500 zł net + VAT",
    netto: 54500,
    indicative: false,
  },
  "anker-x1-12kw": {
    pl: "71 100 zł netto + VAT",
    en: "71 100 zł net + VAT",
    netto: 71100,
    indicative: false,
  },
  "anker-x1-5kw": {
    pl: "38 300 zł netto + VAT",
    en: "38 300 zł net + VAT",
    netto: 38300,
    indicative: false,
  },
  "bazik-10kw": {
    pl: "39 100 zł netto + VAT",
    en: "39 100 zł net + VAT",
    netto: 39100,
    indicative: false,
  },
  "bazik-12kw": {
    pl: "49 500 zł netto + VAT",
    en: "49 500 zł net + VAT",
    netto: 49500,
    indicative: false,
  },
  "bazik-8kw": {
    pl: "35 600 zł netto + VAT",
    en: "35 600 zł net + VAT",
    netto: 35600,
    indicative: false,
  },
  "biznes-100kw": {
    pl: "230 000 zł netto + VAT",
    en: "230 000 zł net + VAT",
    netto: 230000,
    indicative: false,
  },
  "biznes-200kw": {
    pl: "450 000 zł netto + VAT",
    en: "450 000 zł net + VAT",
    netto: 450000,
    indicative: false,
  },
  "biznes-30kw": {
    pl: "89 000 zł netto + VAT",
    en: "89 000 zł net + VAT",
    netto: 89000,
    indicative: false,
  },
  "bp1000": {
    pl: "2 840 zł netto + VAT",
    en: "2 840 zł net + VAT",
    netto: 2840,
    indicative: false,
  },
  "bp1600": {
    pl: "2 280 zł netto + VAT",
    en: "2 280 zł net + VAT",
    netto: 2280,
    indicative: false,
  },
  "bp2700": {
    pl: "3 250 zł netto + VAT",
    en: "3 250 zł net + VAT",
    netto: 3250,
    indicative: false,
  },
  "bp3800": {
    pl: "11 400 zł netto + VAT",
    en: "11 400 zł net + VAT",
    netto: 11400,
    indicative: false,
  },
  "c1000": {
    pl: "2 930 zł netto + VAT",
    en: "2 930 zł net + VAT",
    netto: 2930,
    indicative: false,
  },
  "c800": {
    pl: "3 410 zł netto + VAT",
    en: "3 410 zł net + VAT",
    netto: 3410,
    indicative: false,
  },
  "carport-business-grid": {
    pl: "od 45 900 zł netto + VAT",
    en: "from 45 900 zł net + VAT",
    netto: 45900,
    indicative: false,
  },
  "carport-hybrid-3f": {
    pl: "od 42 600 zł netto + VAT",
    en: "from 42 600 zł net + VAT",
    netto: 42600,
    indicative: true,
  },
  "carport-premium-dc-ev": {
    pl: "od 58 500 zł netto + VAT",
    en: "from 58 500 zł net + VAT",
    netto: 58500,
    indicative: true,
  },
  "daikin-ht-14kw": {
    pl: "74 200 zł netto + VAT",
    en: "74 200 zł net + VAT",
    netto: 74200,
    indicative: false,
  },
  "daikin-mt-10kw": {
    pl: "61 500 zł netto + VAT",
    en: "61 500 zł net + VAT",
    netto: 61500,
    indicative: false,
  },
  "f3000": {
    pl: "7 320 zł netto + VAT",
    en: "7 320 zł net + VAT",
    netto: 7320,
    indicative: false,
  },
  "f3800": {
    pl: "16 300 zł netto + VAT",
    en: "16 300 zł net + VAT",
    netto: 16300,
    indicative: false,
  },
  "fs20": {
    pl: "1 630 zł / 4 szt. netto + VAT",
    en: "1 630 zł / 4 pcs net + VAT",
    netto: 1630,
    indicative: false,
  },
  "premium-10kw": {
    pl: "66 000 zł netto + VAT",
    en: "66 000 zł net + VAT",
    netto: 66000,
    indicative: false,
  },
  "premium-12kw": {
    pl: "73 000 zł netto + VAT",
    en: "73 000 zł net + VAT",
    netto: 73000,
    indicative: false,
  },
  "premium-8kw": {
    pl: "50 000 zł netto + VAT",
    en: "50 000 zł net + VAT",
    netto: 50000,
    indicative: false,
  },
  "rs40p": {
    pl: "1 220 zł / 2 szt. netto + VAT",
    en: "1 220 zł / 2 pcs net + VAT",
    netto: 1220,
    indicative: false,
  },
  "rs50s": {
    pl: "810 zł / 1 szt. netto + VAT",
    en: "810 zł / 1 pcs net + VAT",
    netto: 810,
    indicative: false,
  },
  "sb2-e1600-ac": {
    pl: "od 2 600 zł netto + VAT",
    en: "from 2 600 zł net + VAT",
    netto: 2600,
    indicative: false,
  },
  "sb3-e2700-pro": {
    pl: "4 550 zł netto + VAT",
    en: "4 550 zł net + VAT",
    netto: 4550,
    indicative: false,
  },
  "schuko-cable": {
    pl: "162 zł netto + VAT",
    en: "162 zł net + VAT",
    netto: 162,
    indicative: false,
  },
  "smart-meter": {
    pl: "162 zł netto + VAT",
    en: "162 zł net + VAT",
    netto: 162,
    indicative: false,
  },
  "smart-plug": {
    pl: "121 zł netto + VAT",
    en: "121 zł net + VAT",
    netto: 121,
    indicative: false,
  },
  "solar-cable": {
    pl: "202 zł netto + VAT",
    en: "202 zł net + VAT",
    netto: 202,
    indicative: false,
  },
  "vaillant-12kw": {
    pl: "85 300 zł netto + VAT",
    en: "85 300 zł net + VAT",
    netto: 85300,
    indicative: false,
  },
  "vaillant-7kw": {
    pl: "69 800 zł netto + VAT",
    en: "69 800 zł net + VAT",
    netto: 69800,
    indicative: false,
  },
};

// Три «популярні конфігурації» на /pl/dom — це ті самі каталожні пакети,
// показані як ціна «від». Третя — сума двох пакетів (PV 8 kW + Vaillant 12 kW),
// порахована з тих самих нетто, а не вписана окремо. Раніше тут стояли
// PLN-суми без ставки ПДВ і без зв'язку з каталогом.
export const COMBOS: Record<string, PriceEntry> = {
  "dom-standard": {
    pl: "35 600 zł netto + VAT",
    en: "35 600 zł net + VAT",
    netto: 35600,
    indicative: false,
  },
  "dom-premium": {
    pl: "66 000 zł netto + VAT",
    en: "66 000 zł net + VAT",
    netto: 66000,
    indicative: false,
  },
  "dom-heatpump": {
    pl: "120 900 zł netto + VAT",
    en: "120 900 zł net + VAT",
    netto: 120900,
    indicative: false,
  },
};

export function priceLabelOf(slug: string, lang: string): string | null {
  const entry = PRICES[slug];
  if (!entry) return null;
  return lang === 'en' ? entry.en : entry.pl;
}

export function priceNettoOf(slug: string): number | null {
  return PRICES[slug]?.netto ?? null;
}
