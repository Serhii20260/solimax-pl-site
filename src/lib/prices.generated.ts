// ЗГЕНЕРОВАНО — не редагувати руками.
// Джерело: /home/pricing/price-source.json (нетто) -> export_price_display.py
//          -> gen_prices.js -> цей файл.
// Підписи зібрані тим самим форматером, що працює в API
// (solimax-pl-backend-site/src/services/priceLabel.js), тож сторінка
// /pl/propozycje і відповіді API не можуть розійтись.
//
// price-source версія: 1.5.0
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
    pl: "54 500,00 zł netto + VAT",
    en: "54 500,00 zł net + VAT",
    netto: 54500,
    indicative: false,
  },
  "anker-x1-12kw": {
    pl: "71 100,00 zł netto + VAT",
    en: "71 100,00 zł net + VAT",
    netto: 71100,
    indicative: false,
  },
  "anker-x1-5kw": {
    pl: "38 300,00 zł netto + VAT",
    en: "38 300,00 zł net + VAT",
    netto: 38300,
    indicative: false,
  },
  "bazik-10kw": {
    pl: "39 081,00 zł netto + VAT",
    en: "39 081,00 zł net + VAT",
    netto: 39081,
    indicative: false,
  },
  "bazik-12kw": {
    pl: "49 492,41 zł netto + VAT",
    en: "49 492,41 zł net + VAT",
    netto: 49492.41,
    indicative: false,
  },
  "bazik-8kw": {
    pl: "34 219,63 zł netto + VAT",
    en: "34 219,63 zł net + VAT",
    netto: 34219.63,
    indicative: false,
  },
  "biznes-100kw": {
    pl: "230 000,00 zł netto + VAT",
    en: "230 000,00 zł net + VAT",
    netto: 230000,
    indicative: false,
  },
  "biznes-200kw": {
    pl: "450 000,00 zł netto + VAT",
    en: "450 000,00 zł net + VAT",
    netto: 450000,
    indicative: false,
  },
  "biznes-30kw": {
    pl: "89 000,00 zł netto + VAT",
    en: "89 000,00 zł net + VAT",
    netto: 89000,
    indicative: false,
  },
  "bp1000": {
    pl: "2 844,72 zł netto + VAT",
    en: "2 844,72 zł net + VAT",
    netto: 2844.72,
    indicative: false,
  },
  "bp1600": {
    pl: "2 275,61 zł netto + VAT",
    en: "2 275,61 zł net + VAT",
    netto: 2275.61,
    indicative: false,
  },
  "bp2700": {
    pl: "3 251,22 zł netto + VAT",
    en: "3 251,22 zł net + VAT",
    netto: 3251.22,
    indicative: false,
  },
  "bp3800": {
    pl: "11 381,30 zł netto + VAT",
    en: "11 381,30 zł net + VAT",
    netto: 11381.3,
    indicative: false,
  },
  "c1000": {
    pl: "2 926,02 zł netto + VAT",
    en: "2 926,02 zł net + VAT",
    netto: 2926.02,
    indicative: false,
  },
  "c800": {
    pl: "3 413,82 zł netto + VAT",
    en: "3 413,82 zł net + VAT",
    netto: 3413.82,
    indicative: false,
  },
  "carport-business-grid": {
    pl: "od 45 850,00 zł netto + VAT",
    en: "from 45 850,00 zł net + VAT",
    netto: 45850,
    indicative: false,
  },
  "carport-hybrid-3f": {
    pl: "od 42 600,00 zł netto + VAT",
    en: "from 42 600,00 zł net + VAT",
    netto: 42600,
    indicative: true,
  },
  "carport-premium-dc-ev": {
    pl: "od 58 500,00 zł netto + VAT",
    en: "from 58 500,00 zł net + VAT",
    netto: 58500,
    indicative: true,
  },
  "daikin-ht-14kw": {
    pl: "74 185,19 zł netto + VAT",
    en: "74 185,19 zł net + VAT",
    netto: 74185.19,
    indicative: false,
  },
  "daikin-mt-10kw": {
    pl: "61 489,81 zł netto + VAT",
    en: "61 489,81 zł net + VAT",
    netto: 61489.81,
    indicative: false,
  },
  "f3000": {
    pl: "7 316,26 zł netto + VAT",
    en: "7 316,26 zł net + VAT",
    netto: 7316.26,
    indicative: false,
  },
  "f3800": {
    pl: "16 259,35 zł netto + VAT",
    en: "16 259,35 zł net + VAT",
    netto: 16259.35,
    indicative: false,
  },
  "fs20": {
    pl: "1 625,20 zł / 4 szt. netto + VAT",
    en: "1 625,20 zł / 4 pcs net + VAT",
    netto: 1625.2,
    indicative: false,
  },
  "premium-10kw": {
    pl: "66 000,00 zł netto + VAT",
    en: "66 000,00 zł net + VAT",
    netto: 66000,
    indicative: false,
  },
  "premium-12kw": {
    pl: "73 000,00 zł netto + VAT",
    en: "73 000,00 zł net + VAT",
    netto: 73000,
    indicative: false,
  },
  "premium-8kw": {
    pl: "50 000,00 zł netto + VAT",
    en: "50 000,00 zł net + VAT",
    netto: 50000,
    indicative: false,
  },
  "rs40p": {
    pl: "1 218,70 zł / 2 szt. netto + VAT",
    en: "1 218,70 zł / 2 pcs net + VAT",
    netto: 1218.7,
    indicative: false,
  },
  "rs50s": {
    pl: "812,20 zł / 1 szt. netto + VAT",
    en: "812,20 zł / 1 pcs net + VAT",
    netto: 812.2,
    indicative: false,
  },
  "sb2-e1600-ac": {
    pl: "od 2 600,81 zł netto + VAT",
    en: "from 2 600,81 zł net + VAT",
    netto: 2600.81,
    indicative: false,
  },
  "sb3-e2700-pro": {
    pl: "4 552,03 zł netto + VAT",
    en: "4 552,03 zł net + VAT",
    netto: 4552.03,
    indicative: false,
  },
  "schuko-cable": {
    pl: "161,79 zł netto + VAT",
    en: "161,79 zł net + VAT",
    netto: 161.79,
    indicative: false,
  },
  "smart-meter": {
    pl: "161,79 zł netto + VAT",
    en: "161,79 zł net + VAT",
    netto: 161.79,
    indicative: false,
  },
  "smart-plug": {
    pl: "121,14 zł netto + VAT",
    en: "121,14 zł net + VAT",
    netto: 121.14,
    indicative: false,
  },
  "solar-cable": {
    pl: "202,44 zł netto + VAT",
    en: "202,44 zł net + VAT",
    netto: 202.44,
    indicative: false,
  },
  "vaillant-12kw": {
    pl: "85 296,30 zł netto + VAT",
    en: "85 296,30 zł net + VAT",
    netto: 85296.3,
    indicative: false,
  },
  "vaillant-7kw": {
    pl: "69 833,33 zł netto + VAT",
    en: "69 833,33 zł net + VAT",
    netto: 69833.33,
    indicative: false,
  },
};

// Три «популярні конфігурації» на /pl/dom — це ті самі каталожні пакети,
// показані як ціна «від». Третя — сума двох пакетів (PV 8 kW + Vaillant 12 kW),
// порахована з тих самих нетто, а не вписана окремо. Раніше тут стояли
// PLN-суми без ставки ПДВ і без зв'язку з каталогом.
export const COMBOS: Record<string, PriceEntry> = {
  "dom-standard": {
    pl: "34 219,63 zł netto + VAT",
    en: "34 219,63 zł net + VAT",
    netto: 34219.63,
    indicative: false,
  },
  "dom-premium": {
    pl: "66 000,00 zł netto + VAT",
    en: "66 000,00 zł net + VAT",
    netto: 66000,
    indicative: false,
  },
  "dom-heatpump": {
    pl: "119 515,93 zł netto + VAT",
    en: "119 515,93 zł net + VAT",
    netto: 119515.93,
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
