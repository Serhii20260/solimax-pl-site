// ЗГЕНЕРОВАНО — не редагувати руками.
// Джерело: /home/pricing/price-source.json (нетто) -> export_price_display.py
//          -> gen_prices.js -> цей файл.
// Підписи зібрані тим самим форматером, що працює в API
// (solimax-pl-backend-site/src/services/priceLabel.js), тож сторінка
// /pl/propozycje і відповіді API не можуть розійтись.
//
// price-source версія: 1.5.0
// Подання: residential і goods — брутто (ustawa o informowaniu o cenach),
//          business — нетто (B2B).

export type PriceLabel = { main: string; sub: string };
export type PriceEntry = { pl: PriceLabel; en: PriceLabel; indicative: boolean };

export const PRICES: Record<string, PriceEntry> = {
  "anker-smart-system": {
    pl: { main: "67 035,00 zł", sub: "netto 54 500,00 zł + 23% VAT" },
    en: { main: "67 035,00 zł", sub: "net 54 500,00 zł + 23% VAT" },
    indicative: false,
  },
  "anker-x1-12kw": {
    pl: { main: "76 788,00 zł", sub: "netto 71 100,00 zł + 8% VAT" },
    en: { main: "76 788,00 zł", sub: "net 71 100,00 zł + 8% VAT" },
    indicative: false,
  },
  "anker-x1-5kw": {
    pl: { main: "41 364,00 zł", sub: "netto 38 300,00 zł + 8% VAT" },
    en: { main: "41 364,00 zł", sub: "net 38 300,00 zł + 8% VAT" },
    indicative: false,
  },
  "bazik-10kw": {
    pl: { main: "42 207,48 zł", sub: "netto 39 081,00 zł + 8% VAT" },
    en: { main: "42 207,48 zł", sub: "net 39 081,00 zł + 8% VAT" },
    indicative: false,
  },
  "bazik-12kw": {
    pl: { main: "53 451,80 zł", sub: "netto 49 492,41 zł + 8% VAT" },
    en: { main: "53 451,80 zł", sub: "net 49 492,41 zł + 8% VAT" },
    indicative: false,
  },
  "bazik-8kw": {
    pl: { main: "36 957,20 zł", sub: "netto 34 219,63 zł + 8% VAT" },
    en: { main: "36 957,20 zł", sub: "net 34 219,63 zł + 8% VAT" },
    indicative: false,
  },
  "biznes-100kw": {
    pl: { main: "230 000,00 zł", sub: "netto + 23% VAT" },
    en: { main: "230 000,00 zł", sub: "net + 23% VAT" },
    indicative: false,
  },
  "biznes-200kw": {
    pl: { main: "450 000,00 zł", sub: "netto + 23% VAT" },
    en: { main: "450 000,00 zł", sub: "net + 23% VAT" },
    indicative: false,
  },
  "biznes-30kw": {
    pl: { main: "89 000,00 zł", sub: "netto + 23% VAT" },
    en: { main: "89 000,00 zł", sub: "net + 23% VAT" },
    indicative: false,
  },
  "bp1000": {
    pl: { main: "3 499,00 zł", sub: "netto 2 844,72 zł + 23% VAT" },
    en: { main: "3 499,00 zł", sub: "net 2 844,72 zł + 23% VAT" },
    indicative: false,
  },
  "bp1600": {
    pl: { main: "2 799,00 zł", sub: "netto 2 275,61 zł + 23% VAT" },
    en: { main: "2 799,00 zł", sub: "net 2 275,61 zł + 23% VAT" },
    indicative: false,
  },
  "bp2700": {
    pl: { main: "3 999,00 zł", sub: "netto 3 251,22 zł + 23% VAT" },
    en: { main: "3 999,00 zł", sub: "net 3 251,22 zł + 23% VAT" },
    indicative: false,
  },
  "bp3800": {
    pl: { main: "13 999,00 zł", sub: "netto 11 381,30 zł + 23% VAT" },
    en: { main: "13 999,00 zł", sub: "net 11 381,30 zł + 23% VAT" },
    indicative: false,
  },
  "c1000": {
    pl: { main: "3 599,00 zł", sub: "netto 2 926,02 zł + 23% VAT" },
    en: { main: "3 599,00 zł", sub: "net 2 926,02 zł + 23% VAT" },
    indicative: false,
  },
  "c800": {
    pl: { main: "4 199,00 zł", sub: "netto 3 413,82 zł + 23% VAT" },
    en: { main: "4 199,00 zł", sub: "net 3 413,82 zł + 23% VAT" },
    indicative: false,
  },
  "carport-business-grid": {
    pl: { main: "od 45 850,00 zł", sub: "netto + 23% VAT" },
    en: { main: "from 45 850,00 zł", sub: "net + 23% VAT" },
    indicative: false,
  },
  "carport-hybrid-3f": {
    pl: { main: "od 52 398,00 zł", sub: "netto 42 600,00 zł + 23% VAT" },
    en: { main: "from 52 398,00 zł", sub: "net 42 600,00 zł + 23% VAT" },
    indicative: true,
  },
  "carport-premium-dc-ev": {
    pl: { main: "od 71 955,00 zł", sub: "netto 58 500,00 zł + 23% VAT" },
    en: { main: "from 71 955,00 zł", sub: "net 58 500,00 zł + 23% VAT" },
    indicative: true,
  },
  "daikin-ht-14kw": {
    pl: { main: "80 120,01 zł", sub: "netto 74 185,19 zł + 8% VAT" },
    en: { main: "80 120,01 zł", sub: "net 74 185,19 zł + 8% VAT" },
    indicative: false,
  },
  "daikin-mt-10kw": {
    pl: { main: "66 408,99 zł", sub: "netto 61 489,81 zł + 8% VAT" },
    en: { main: "66 408,99 zł", sub: "net 61 489,81 zł + 8% VAT" },
    indicative: false,
  },
  "f3000": {
    pl: { main: "8 999,00 zł", sub: "netto 7 316,26 zł + 23% VAT" },
    en: { main: "8 999,00 zł", sub: "net 7 316,26 zł + 23% VAT" },
    indicative: false,
  },
  "f3800": {
    pl: { main: "19 999,00 zł", sub: "netto 16 259,35 zł + 23% VAT" },
    en: { main: "19 999,00 zł", sub: "net 16 259,35 zł + 23% VAT" },
    indicative: false,
  },
  "fs20": {
    pl: { main: "1 999,00 zł / 4 szt.", sub: "netto 1 625,20 zł + 23% VAT" },
    en: { main: "1 999,00 zł / 4 pcs", sub: "net 1 625,20 zł + 23% VAT" },
    indicative: false,
  },
  "premium-10kw": {
    pl: { main: "71 280,00 zł", sub: "netto 66 000,00 zł + 8% VAT" },
    en: { main: "71 280,00 zł", sub: "net 66 000,00 zł + 8% VAT" },
    indicative: false,
  },
  "premium-12kw": {
    pl: { main: "78 840,00 zł", sub: "netto 73 000,00 zł + 8% VAT" },
    en: { main: "78 840,00 zł", sub: "net 73 000,00 zł + 8% VAT" },
    indicative: false,
  },
  "premium-8kw": {
    pl: { main: "54 000,00 zł", sub: "netto 50 000,00 zł + 8% VAT" },
    en: { main: "54 000,00 zł", sub: "net 50 000,00 zł + 8% VAT" },
    indicative: false,
  },
  "rs40p": {
    pl: { main: "1 499,00 zł / 2 szt.", sub: "netto 1 218,70 zł + 23% VAT" },
    en: { main: "1 499,00 zł / 2 pcs", sub: "net 1 218,70 zł + 23% VAT" },
    indicative: false,
  },
  "rs50s": {
    pl: { main: "999,00 zł / 1 szt.", sub: "netto 812,20 zł + 23% VAT" },
    en: { main: "999,00 zł / 1 pcs", sub: "net 812,20 zł + 23% VAT" },
    indicative: false,
  },
  "sb2-e1600-ac": {
    pl: { main: "od 3 199,00 zł", sub: "netto 2 600,81 zł + 23% VAT" },
    en: { main: "from 3 199,00 zł", sub: "net 2 600,81 zł + 23% VAT" },
    indicative: false,
  },
  "sb3-e2700-pro": {
    pl: { main: "5 599,00 zł", sub: "netto 4 552,03 zł + 23% VAT" },
    en: { main: "5 599,00 zł", sub: "net 4 552,03 zł + 23% VAT" },
    indicative: false,
  },
  "schuko-cable": {
    pl: { main: "199,00 zł", sub: "netto 161,79 zł + 23% VAT" },
    en: { main: "199,00 zł", sub: "net 161,79 zł + 23% VAT" },
    indicative: false,
  },
  "smart-meter": {
    pl: { main: "199,00 zł", sub: "netto 161,79 zł + 23% VAT" },
    en: { main: "199,00 zł", sub: "net 161,79 zł + 23% VAT" },
    indicative: false,
  },
  "smart-plug": {
    pl: { main: "149,00 zł", sub: "netto 121,14 zł + 23% VAT" },
    en: { main: "149,00 zł", sub: "net 121,14 zł + 23% VAT" },
    indicative: false,
  },
  "solar-cable": {
    pl: { main: "249,00 zł", sub: "netto 202,44 zł + 23% VAT" },
    en: { main: "249,00 zł", sub: "net 202,44 zł + 23% VAT" },
    indicative: false,
  },
  "vaillant-12kw": {
    pl: { main: "92 120,00 zł", sub: "netto 85 296,30 zł + 8% VAT" },
    en: { main: "92 120,00 zł", sub: "net 85 296,30 zł + 8% VAT" },
    indicative: false,
  },
  "vaillant-7kw": {
    pl: { main: "75 420,00 zł", sub: "netto 69 833,33 zł + 8% VAT" },
    en: { main: "75 420,00 zł", sub: "net 69 833,33 zł + 8% VAT" },
    indicative: false,
  },
};

// Три «популярні конфігурації» на /pl/dom — це ті самі каталожні пакети,
// показані як ціна «від». Третя — сума двох пакетів (PV 8 kW + Vaillant 12 kW),
// порахована з тих самих нетто, а не вписана окремо. Раніше тут стояли
// PLN-суми без ставки ПДВ і без зв'язку з каталогом.
export const COMBOS: Record<string, PriceEntry> = {
  "dom-standard": {
    pl: { main: "od 36 957,20 zł", sub: "netto 34 219,63 zł + 8% VAT" },
    en: { main: "from 36 957,20 zł", sub: "net 34 219,63 zł + 8% VAT" },
    indicative: false,
  },
  "dom-premium": {
    pl: { main: "od 71 280,00 zł", sub: "netto 66 000,00 zł + 8% VAT" },
    en: { main: "from 71 280,00 zł", sub: "net 66 000,00 zł + 8% VAT" },
    indicative: false,
  },
  "dom-heatpump": {
    pl: { main: "od 129 077,20 zł", sub: "netto 119 515,93 zł + 8% VAT" },
    en: { main: "from 129 077,20 zł", sub: "net 119 515,93 zł + 8% VAT" },
    indicative: false,
  },
};

export function priceLabelOf(slug: string, lang: string): PriceLabel | null {
  const entry = PRICES[slug];
  if (!entry) return null;
  return lang === 'en' ? entry.en : entry.pl;
}
