// src/hooks/usePackages.ts
import { useState, useEffect, useCallback } from 'react';
import type { Package, PackageFilters, PackageSpec } from '../lib/api';
import { apiUrl, fetchPackages, fetchPackageById } from '../lib/api';
import { useLanguage } from '../lib/LanguageContext';
import type { SupportedLanguage } from '../lib/i18n';

interface UsePackagesState {
  packages: Package[];
  loading: boolean;
  error: string | null;
}

type PackageBase = Omit<
  Package,
  'title' | 'shortDescription' | 'fullDescription' | 'specs' | 'promoLabel'
>;

type PackageCopy = {
  title: string;
  shortDescription: string;
  fullDescription: string;
  specs: PackageSpec[];
  promoLabel: string | null;
};

const nowIso = () => new Date().toISOString();

/**
 * Каталог у базі частину картинок зберігає абсолютним URL на старий домен
 * solimax.xyz (напр. sb3-e2700-pro). Для solimax.pl це зайвий DNS + TLS до
 * чужого хоста на кожному відкритті сторінки. Той самий шлях /pl/uploads/…
 * nginx віддає і з solimax.pl, тому досить прибрати хост і лишити відносний
 * шлях — файл їде з того самого з'єднання. Базу цим не чіпаємо.
 */
const localizeImageUrl = (url: string): string => {
  if (!url) return url;
  const m = url.match(/^https?:\/\/(?:www\.)?solimax\.(?:xyz|pl)(\/.*)$/i);
  return m ? m[1] : url;
};

const withLocalImage = <T extends { imageUrl: string }>(pkg: T): T => {
  const local = localizeImageUrl(pkg.imageUrl);
  return local === pkg.imageUrl ? pkg : { ...pkg, imageUrl: local };
};


const packageBase = (
  id: string,
  category: Package['category'],
  tier: Package['tier'],
  manufacturerName: string,
  imageUrl: string,
  priceLabel: string | null,
  flags: Pick<Package, 'isPromo' | 'isNew' | 'sortOrder'>,
): PackageBase => ({
  id,
  category,
  tier,
  manufacturerName,
  manufacturerUrl: '',
  imageUrl,
  datasheetUrl: null,
  priceLabel,
  isActive: true,
  ...flags,
  createdAt: nowIso(),
  updatedAt: nowIso(),
});

const BASE_PACKAGES: PackageBase[] = [
  packageBase('anker-smart', 'home', 'premium', 'Anker SOLIX', '/pl/anker-smart-system.webp', '54 500,00 zl', { isPromo: true, isNew: false, sortOrder: 1 }),
  packageBase('anker-x1-5kw', 'home', 'premium', 'Anker SOLIX', '/pl/anker-x1-5kwh.webp', '38 300,00 zl', { isPromo: false, isNew: true, sortOrder: 2 }),
  packageBase('anker-x1-12kw', 'home', 'premium', 'Anker SOLIX', '/pl/anker-x1-15kwh.webp', '71 100,00 zl', { isPromo: false, isNew: true, sortOrder: 3 }),
  packageBase('pv-standard-8', 'home', 'standard', 'Deye + Trina', '/pl/pakiet-deye.webp', '37 000,00 zl netto + VAT', { isPromo: true, isNew: false, sortOrder: 4 }),
  packageBase('pv-standard-10', 'home', 'standard', 'Deye + Trina', '/pl/pakiet-deye.webp', '39 000,00 zl netto + VAT', { isPromo: false, isNew: false, sortOrder: 5 }),
  packageBase('pv-standard-12', 'home', 'standard', 'Deye + Trina', '/pl/pakiet-deye-2.webp', '43 000,00 zl netto + VAT', { isPromo: false, isNew: false, sortOrder: 6 }),
  packageBase('pv-premium-8', 'home', 'premium', 'Sigenergy + AIKO', '/pl/sigenergy-pakiet.webp', '50 000,00 zl netto + VAT', { isPromo: false, isNew: false, sortOrder: 7 }),
  packageBase('pv-premium-10', 'home', 'premium', 'Sigenergy + AIKO', '/pl/sigenergy-pakiet.webp', '66 000,00 zl netto + VAT', { isPromo: false, isNew: false, sortOrder: 8 }),
  packageBase('pv-premium-12', 'home', 'premium', 'Sigenergy + AIKO', '/pl/sigenergy-pakiet.webp', '73 000,00 zl netto + VAT', { isPromo: false, isNew: false, sortOrder: 9 }),
  packageBase('daikin-mt', 'heating', 'standard', 'Daikin', '/pl/daikin-pakiet.webp', '72 000,00 zl', { isPromo: true, isNew: false, sortOrder: 10 }),
  packageBase('daikin-ht', 'heating', 'premium', 'Daikin', '/pl/daikin-pakiet.webp', '85 000,00 zl', { isPromo: true, isNew: false, sortOrder: 11 }),
  packageBase('vaillant-9', 'heating', 'premium', 'Vaillant', '/pl/vaillant-pakiet.webp', '83 000,00 zl', { isPromo: false, isNew: true, sortOrder: 12 }),
  packageBase('vaillant-12', 'heating', 'premium', 'Vaillant', '/pl/vaillant-pakiet-12.webp', '98 000,00 zl', { isPromo: false, isNew: true, sortOrder: 13 }),
  packageBase('biznes-30', 'business', 'standard', 'Deye + Trina', '/pl/biznes-deye-30kw.webp', '89 000,00 zl netto + VAT', { isPromo: false, isNew: false, sortOrder: 14 }),
  packageBase('biznes-100', 'business', 'standard', 'Sungrow + Trina', '/pl/biznes-sungrow.webp', '230 000,00 zl netto + VAT', { isPromo: false, isNew: false, sortOrder: 15 }),
  packageBase('biznes-200', 'business', 'premium', 'Sungrow + Trina', '/pl/biznes-sungrow.webp', '450 000,00 zl netto + VAT', { isPromo: false, isNew: false, sortOrder: 16 }),
  packageBase('carport-hybrid', 'carport', 'standard', 'Deye', '/pl/carport-hybrid.webp', '42 600,00 zl netto + VAT', { isPromo: true, isNew: false, sortOrder: 17 }),
  packageBase('carport-premium', 'carport', 'premium', 'Sigenergy', '/pl/carport-premium.webp', '58 500,00 zl netto + VAT', { isPromo: false, isNew: true, sortOrder: 18 }),
  packageBase('carport-business', 'carport', 'premium', 'Sungrow', '/pl/carport-biznes.webp', '35 000,00 zl netto + VAT', { isPromo: false, isNew: false, sortOrder: 19 }),
];

const PL_COPY: Record<string, PackageCopy> = {
  'anker-smart': {
    title: 'Anker SOLIX Smart System',
    shortDescription: 'Power Dock + 3x Solarbank 3 + 3x BP2700 + 12x RS40P - 10.8 kW PV, 13.44 kWh baterii',
    fullDescription: 'Modulowy ekosystem Anker SOLIX z Power Dock do podlaczenia do domowej rozdzielnicy. Wyjscie 3,600 W.',
    specs: [{ key: 'PV', value: '10.8 kW' }, { key: 'Bateria', value: '13.44 kWh' }, { key: 'Wyjscie', value: '3,600 W' }],
    promoLabel: 'System modulowy',
  },
  'anker-x1-5kw': {
    title: 'Anker SOLIX X1 5 kW',
    shortDescription: '12x AIKO 475W · 5.7 kW · bateria 5 kWh - falownik Anker X1-H5K-T 3F',
    fullDescription: 'Kompaktowy system z falownikiem Anker X1-H5K-T 5 kW i bateria 5 kWh.',
    specs: [{ key: 'PV', value: '5.7 kW' }, { key: 'Bateria', value: '5 kWh' }, { key: 'Falownik', value: '5 kW 3F' }],
    promoLabel: null,
  },
  'anker-x1-12kw': {
    title: 'Anker SOLIX X1 12 kW',
    shortDescription: '24x AIKO 475W · 11.4 kW · bateria 15 kWh - falownik Anker X1-H12K-T 3F',
    fullDescription: 'Mocny system z falownikiem Anker X1-H12K-T 12 kW i bateria 15 kWh.',
    specs: [{ key: 'PV', value: '11.4 kW' }, { key: 'Bateria', value: '15 kWh' }, { key: 'Falownik', value: '12 kW 3F' }],
    promoLabel: null,
  },
  'pv-standard-8': {
    title: 'PV Standard 8 kW',
    shortDescription: 'DEYE SUN-8K-SG05LP3-EU + 18x Trina 445W + bateria 6 kWh',
    fullDescription: 'Kompletny system z hybrydowym falownikiem Deye i bateria.',
    specs: [{ key: 'PV', value: '8 kW' }, { key: 'Bateria', value: '6 kWh' }, { key: 'Panele', value: '18x Trina 445W' }],
    promoLabel: 'Bestseller',
  },
  'pv-standard-10': {
    title: 'PV Standard 10 kW',
    shortDescription: 'DEYE SUN-10K-SG05LP3-EU + 22x Trina 445W + bateria 6 kWh',
    fullDescription: 'Rozszerzony system z hybrydowym falownikiem Deye 10 kW.',
    specs: [{ key: 'PV', value: '10 kW' }, { key: 'Bateria', value: '6 kWh' }, { key: 'Panele', value: '22x Trina 445W' }],
    promoLabel: null,
  },
  'pv-standard-12': {
    title: 'PV Standard 12 kW',
    shortDescription: 'DEYE SUN-12K-SG05LP3-EU + 27x Trina 445W + 2x bateria 12 kWh',
    fullDescription: 'Maksymalny system z hybrydowym falownikiem Deye 12 kW i podwojna bateria.',
    specs: [{ key: 'PV', value: '12 kW' }, { key: 'Bateria', value: '12 kWh' }, { key: 'Panele', value: '27x Trina 445W' }],
    promoLabel: null,
  },
  'pv-premium-8': {
    title: 'PV Premium 8 kW',
    shortDescription: 'Sigenergy 8 kW + 8 kWh + 17x AIKO 475W - optymalizacja AI',
    fullDescription: 'System premium z Sigenergy SigenStor all-in-one i panelami AIKO Neostar.',
    specs: [{ key: 'PV', value: '8 kW' }, { key: 'Bateria', value: '8 kWh' }, { key: 'Panele', value: '17x AIKO 475W' }],
    promoLabel: 'Premium',
  },
  'pv-premium-10': {
    title: 'PV Premium 10 kW',
    shortDescription: 'Sigenergy 8 kW + 16 kWh + 21x AIKO 475W - optymalizacja AI + glass-glass',
    fullDescription: 'Rozszerzony system premium z duza bateria i panelami glass-glass.',
    specs: [{ key: 'PV', value: '10 kW' }, { key: 'Bateria', value: '16 kWh' }, { key: 'Panele', value: '21x AIKO 475W' }],
    promoLabel: 'Premium',
  },
  'pv-premium-12': {
    title: 'PV Premium 12 kW',
    shortDescription: 'Sigenergy 12 kW + 16 kWh + 26x AIKO 475W - maksymalna niezaleznosc',
    fullDescription: 'Maksymalny system premium dla wysokiej niezaleznosci od sieci.',
    specs: [{ key: 'PV', value: '12 kW' }, { key: 'Bateria', value: '16 kWh' }, { key: 'Panele', value: '26x AIKO 475W' }],
    promoLabel: 'Premium',
  },
  'daikin-mt': {
    title: 'Daikin Altherma 3 H MT 10 kW',
    shortDescription: 'Nowe domy / ogrzewanie podlogowe - do 55°C, ETVH12 ze zbiornikiem 230 l',
    fullDescription: 'Pompa ciepla Daikin dla nowych domow z ogrzewaniem podlogowym. Dotacja do PLN 40,000.',
    specs: [{ key: 'Moc', value: '10 kW' }, { key: 'Temp.', value: 'do 55°C' }, { key: 'Zbiornik CWU', value: '230 l' }],
    promoLabel: 'Czyste Powietrze',
  },
  'daikin-ht': {
    title: 'Daikin Altherma 3 H HT 14 kW',
    shortDescription: 'Starsze grzejniki 80/60°C - do 70°C, ETVH16 ze zbiornikiem 180 l',
    fullDescription: 'Wysokotemperaturowa pompa ciepla Daikin dla budynkow ze starszymi grzejnikami.',
    specs: [{ key: 'Moc', value: '14 kW' }, { key: 'Temp.', value: 'do 70°C' }, { key: 'Zbiornik CWU', value: '180 l' }],
    promoLabel: 'Czyste Powietrze',
  },
  'vaillant-9': {
    title: 'Vaillant aroTHERM Plus 7 kW',
    shortDescription: 'R290 propan GWP=3 - do 75°C, uniTOWER plus + zbiornik 190 l',
    fullDescription: 'Ekologiczna pompa ciepla Vaillant z naturalnym czynnikiem chlodniczym R290.',
    specs: [{ key: 'Moc', value: '7 kW' }, { key: 'Temp.', value: 'do 75°C' }, { key: 'Czynnik', value: 'R290' }],
    promoLabel: 'R290 Eco',
  },
  'vaillant-12': {
    title: 'Vaillant aroTHERM Plus 12 kW',
    shortDescription: 'Starsze grzejniki - do 75°C przy -15°C, uniTOWER plus + zbiornik 190 l',
    fullDescription: 'Mocna pompa ciepla Vaillant dla starszych grzejnikow z R290.',
    specs: [{ key: 'Moc', value: '12 kW' }, { key: 'Temp.', value: 'do 75°C przy -15°C' }, { key: 'Czynnik', value: 'R290' }],
    promoLabel: 'R290 Eco',
  },
  'biznes-30': {
    title: 'PV Biznes 30 kW',
    shortDescription: '2x Deye 15 kW + 65x Trina 460W - opcja BESS BYD 27.6 kWh',
    fullDescription: 'Komercyjny system dla biznesu z opcja magazynu BYD.',
    specs: [{ key: 'PV', value: '30 kW' }, { key: 'Falownik', value: '2x Deye 15 kW' }, { key: 'BESS', value: 'BYD 27.6 kWh' }],
    promoLabel: 'Dla biznesu',
  },
  'biznes-100': {
    title: 'PV Biznes 100 kW',
    shortDescription: 'Sungrow SG110CX + 218x Trina 460W - opcja BESS 225 kWh',
    fullDescription: 'Sredniej skali system komercyjny z Sungrow PowerStack.',
    specs: [{ key: 'PV', value: '100 kW' }, { key: 'Falownik', value: 'Sungrow SG110CX' }, { key: 'BESS', value: '225 kWh' }],
    promoLabel: 'Komercyjna',
  },
  'biznes-200': {
    title: 'PV Biznes 200 kW',
    shortDescription: '2x Sungrow SG110CX + 435x Trina 460W - opcja BESS 514 kWh',
    fullDescription: 'Duzy komercyjny system z podwojnym Sungrow PowerStack.',
    specs: [{ key: 'PV', value: '200 kW' }, { key: 'Falownik', value: '2x Sungrow SG110CX' }, { key: 'BESS', value: '514 kWh' }],
    promoLabel: 'Komercyjna',
  },
  'carport-hybrid': {
    title: 'Carport Hybrid 3F',
    shortDescription: '1 miejsce · 4.3 kWp · Deye 5 kW · Wallbox 7 kW AC',
    fullDescription: 'Fotowoltaiczna wiata na 1 miejsce z hybrydowym falownikiem Deye i wallboxem.',
    specs: [{ key: 'PV', value: '4.3 kWp' }, { key: 'Falownik', value: 'Deye 5 kW' }, { key: 'Wallbox', value: '7 kW AC' }],
    promoLabel: 'Carport',
  },
  'carport-premium': {
    title: 'Carport Premium DC EV',
    shortDescription: '1 miejsce · 4.3 kWp · Sigenergy · ladowanie DC 25 kW',
    fullDescription: 'Premium carport PV z Sigenergy i szybkim ladowaniem DC.',
    specs: [{ key: 'PV', value: '4.3 kWp' }, { key: 'Falownik', value: 'Sigenergy 5 kW' }, { key: 'Ladowanie DC', value: '25 kW CCS2' }],
    promoLabel: 'DC Fast',
  },
  'carport-business': {
    title: 'Carport Business Grid',
    shortDescription: '3-10 miejsc · Sungrow · skalowany system od 12 do 50+ kWp',
    fullDescription: 'Modulowy carport biznesowy z falownikiem sieciowym Sungrow.',
    specs: [{ key: 'PV', value: '12-50+ kWp' }, { key: 'Miejsca', value: '3-10' }, { key: 'Falownik', value: 'Sungrow' }],
    promoLabel: 'Dla biznesu',
  },
};

const EN_COPY: Record<string, PackageCopy> = {
  'anker-smart': {
    title: 'Anker SOLIX Smart System',
    shortDescription: 'Power Dock + 3x Solarbank 3 + 3x BP2700 + 12x RS40P - 10.8 kW PV, 13.44 kWh battery',
    fullDescription: 'Modular Anker SOLIX ecosystem with Power Dock for connection to the home distribution board. 3,600 W output.',
    specs: [{ key: 'PV', value: '10.8 kW' }, { key: 'Battery', value: '13.44 kWh' }, { key: 'Output', value: '3,600 W' }],
    promoLabel: 'Modular system',
  },
  'anker-x1-5kw': {
    title: 'Anker SOLIX X1 5 kW',
    shortDescription: '12x AIKO 475W · 5.7 kW · 5 kWh battery - Anker X1-H5K-T 3F inverter',
    fullDescription: 'Compact system with Anker X1-H5K-T 5 kW inverter and 5 kWh battery.',
    specs: [{ key: 'PV', value: '5.7 kW' }, { key: 'Battery', value: '5 kWh' }, { key: 'Inverter', value: '5 kW 3F' }],
    promoLabel: null,
  },
  'anker-x1-12kw': {
    title: 'Anker SOLIX X1 12 kW',
    shortDescription: '24x AIKO 475W · 11.4 kW · 15 kWh battery - Anker X1-H12K-T 3F inverter',
    fullDescription: 'High-power system with Anker X1-H12K-T 12 kW inverter and 15 kWh battery.',
    specs: [{ key: 'PV', value: '11.4 kW' }, { key: 'Battery', value: '15 kWh' }, { key: 'Inverter', value: '12 kW 3F' }],
    promoLabel: null,
  },
  'pv-standard-8': { ...PL_COPY['pv-standard-8'], title: 'PV Standard 8 kW', shortDescription: 'DEYE SUN-8K-SG05LP3-EU + 18x Trina 445W + 6 kWh battery', fullDescription: 'Complete system with Deye hybrid inverter and battery.', specs: [{ key: 'PV', value: '8 kW' }, { key: 'Battery', value: '6 kWh' }, { key: 'Panels', value: '18x Trina 445W' }] },
  'pv-standard-10': { ...PL_COPY['pv-standard-10'], title: 'PV Standard 10 kW', shortDescription: 'DEYE SUN-10K-SG05LP3-EU + 22x Trina 445W + 6 kWh battery', fullDescription: 'Expanded system with Deye 10 kW hybrid inverter.', specs: [{ key: 'PV', value: '10 kW' }, { key: 'Battery', value: '6 kWh' }, { key: 'Panels', value: '22x Trina 445W' }] },
  'pv-standard-12': { ...PL_COPY['pv-standard-12'], title: 'PV Standard 12 kW', shortDescription: 'DEYE SUN-12K-SG05LP3-EU + 27x Trina 445W + 2x 12 kWh battery', fullDescription: 'Maximum system with Deye 12 kW hybrid inverter and dual battery.', specs: [{ key: 'PV', value: '12 kW' }, { key: 'Battery', value: '12 kWh' }, { key: 'Panels', value: '27x Trina 445W' }] },
  'pv-premium-8': { ...PL_COPY['pv-premium-8'], title: 'PV Premium 8 kW', shortDescription: 'Sigenergy 8 kW + 8 kWh + 17x AIKO 475W - AI optimization', fullDescription: 'Premium system with Sigenergy SigenStor all-in-one and AIKO Neostar panels.', specs: [{ key: 'PV', value: '8 kW' }, { key: 'Battery', value: '8 kWh' }, { key: 'Panels', value: '17x AIKO 475W' }] },
  'pv-premium-10': { ...PL_COPY['pv-premium-10'], title: 'PV Premium 10 kW', shortDescription: 'Sigenergy 8 kW + 16 kWh + 21x AIKO 475W - AI optimization + glass-glass', fullDescription: 'Expanded premium system with a large battery and glass-glass panels.', specs: [{ key: 'PV', value: '10 kW' }, { key: 'Battery', value: '16 kWh' }, { key: 'Panels', value: '21x AIKO 475W' }] },
  'pv-premium-12': { ...PL_COPY['pv-premium-12'], title: 'PV Premium 12 kW', shortDescription: 'Sigenergy 12 kW + 16 kWh + 26x AIKO 475W - maximum independence', fullDescription: 'Maximum premium system for high independence from the grid.', specs: [{ key: 'PV', value: '12 kW' }, { key: 'Battery', value: '16 kWh' }, { key: 'Panels', value: '26x AIKO 475W' }] },
  'daikin-mt': { ...PL_COPY['daikin-mt'], title: 'Daikin Altherma 3 H MT 10 kW', shortDescription: 'New homes / underfloor heating - up to 55°C, ETVH12 with 230 l tank', fullDescription: 'Daikin heat pump for new homes with underfloor heating. Subsidy up to PLN 40,000.', specs: [{ key: 'Power', value: '10 kW' }, { key: 'Temp.', value: 'up to 55°C' }, { key: 'DHW tank', value: '230 l' }] },
  'daikin-ht': { ...PL_COPY['daikin-ht'], title: 'Daikin Altherma 3 H HT 14 kW', shortDescription: 'Older radiators 80/60°C - up to 70°C, ETVH16 with 180 l tank', fullDescription: 'High-temperature Daikin heat pump for buildings with older radiators.', specs: [{ key: 'Power', value: '14 kW' }, { key: 'Temp.', value: 'up to 70°C' }, { key: 'DHW tank', value: '180 l' }] },
  'vaillant-9': { ...PL_COPY['vaillant-9'], title: 'Vaillant aroTHERM Plus 7 kW', shortDescription: 'R290 propane GWP=3 - up to 75°C, uniTOWER plus + 190 l tank', fullDescription: 'Eco heat pump by Vaillant with natural R290 refrigerant.', specs: [{ key: 'Power', value: '7 kW' }, { key: 'Temp.', value: 'up to 75°C' }, { key: 'Refrigerant', value: 'R290' }] },
  'vaillant-12': { ...PL_COPY['vaillant-12'], title: 'Vaillant aroTHERM Plus 12 kW', shortDescription: 'Older radiators - up to 75°C at -15°C, uniTOWER plus + 190 l tank', fullDescription: 'High-power Vaillant heat pump for older radiators with R290.', specs: [{ key: 'Power', value: '12 kW' }, { key: 'Temp.', value: 'up to 75°C at -15°C' }, { key: 'Refrigerant', value: 'R290' }] },
  'biznes-30': { ...PL_COPY['biznes-30'], title: 'PV Business 30 kW', shortDescription: '2x Deye 15 kW + 65x Trina 460W - BYD 27.6 kWh BESS option', fullDescription: 'Commercial system for business with BYD storage option.', specs: [{ key: 'PV', value: '30 kW' }, { key: 'Inverter', value: '2x Deye 15 kW' }, { key: 'BESS', value: 'BYD 27.6 kWh' }], promoLabel: 'For business' },
  'biznes-100': { ...PL_COPY['biznes-100'], title: 'PV Business 100 kW', shortDescription: 'Sungrow SG110CX + 218x Trina 460W - 225 kWh BESS option', fullDescription: 'Mid-scale commercial system with Sungrow PowerStack.', specs: [{ key: 'PV', value: '100 kW' }, { key: 'Inverter', value: 'Sungrow SG110CX' }, { key: 'BESS', value: '225 kWh' }], promoLabel: 'Commercial' },
  'biznes-200': { ...PL_COPY['biznes-200'], title: 'PV Business 200 kW', shortDescription: '2x Sungrow SG110CX + 435x Trina 460W - 514 kWh BESS option', fullDescription: 'Large commercial system with dual Sungrow PowerStack.', specs: [{ key: 'PV', value: '200 kW' }, { key: 'Inverter', value: '2x Sungrow SG110CX' }, { key: 'BESS', value: '514 kWh' }], promoLabel: 'Commercial' },
  'carport-hybrid': { ...PL_COPY['carport-hybrid'], title: 'Carport Hybrid 3F', shortDescription: '1 parking space · 4.3 kWp · Deye 5 kW · 7 kW AC wallbox', fullDescription: 'PV carport for one parking space with Deye hybrid inverter and wallbox.', specs: [{ key: 'PV', value: '4.3 kWp' }, { key: 'Inverter', value: 'Deye 5 kW' }, { key: 'Wallbox', value: '7 kW AC' }] },
  'carport-premium': { ...PL_COPY['carport-premium'], title: 'Carport Premium DC EV', shortDescription: '1 parking space · 4.3 kWp · Sigenergy · 25 kW DC charging', fullDescription: 'Premium PV carport with Sigenergy and fast DC charging.', specs: [{ key: 'PV', value: '4.3 kWp' }, { key: 'Inverter', value: 'Sigenergy 5 kW' }, { key: 'DC charging', value: '25 kW CCS2' }] },
  'carport-business': { ...PL_COPY['carport-business'], title: 'Carport Business Grid', shortDescription: '3-10 spaces · Sungrow · scalable system from 12 to 50+ kWp', fullDescription: 'Modular business carport with Sungrow grid inverter.', specs: [{ key: 'PV', value: '12-50+ kWp' }, { key: 'Spaces', value: '3-10' }, { key: 'Inverter', value: 'Sungrow' }], promoLabel: 'For business' },
};

const FALLBACK_COPY: Record<SupportedLanguage, Record<string, PackageCopy>> = {
  pl: PL_COPY,
  en: EN_COPY,
};

const getFallbackPackages = (language: SupportedLanguage): Package[] =>
  BASE_PACKAGES.map((base) => ({
    ...base,
    ...FALLBACK_COPY[language][base.id],
  }));

const localizeBannerPackage = (
  pkg: Package,
  language: SupportedLanguage,
): Package => {
  const fallback = FALLBACK_COPY[language][pkg.id];
  return fallback ? { ...pkg, ...fallback } : pkg;
};

/**
 * Hook to fetch packages with filters
 */
export function usePackages(filters: PackageFilters = {}) {
  const [state, setState] = useState<UsePackagesState>({
    packages: [],
    loading: true,
    error: null,
  });

  const refetch = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await fetchPackages(filters);
      setState({ packages: data.map(withLocalImage), loading: false, error: null });
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to fetch packages',
      }));
    }
  }, [filters.category, filters.tier, filters.promoOnly, filters.newOnly, filters.activeOnly]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { ...state, refetch };
}

/**
 * Hook to fetch banner packages (promo or new)
 * Falls back to localized proposal packages if DB/API data is unavailable.
 */
export function useBannerPackages() {
  const { language } = useLanguage();
  const [state, setState] = useState<UsePackagesState>({
    packages: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(apiUrl(`/packages?lang=${language}`));
        if (!response.ok) {
          throw new Error(`Failed to fetch banner packages: ${response.statusText}`);
        }

        const data = (await response.json()) as Package[];
        const bannerPackages = data
          .filter((pkg) => pkg.isPromo || pkg.isNew)
          .map((pkg) => withLocalImage(localizeBannerPackage(pkg, language)));
        const packages = bannerPackages.length > 0 ? bannerPackages : getFallbackPackages(language);
        setState({ packages, loading: false, error: null });
      } catch {
        setState({
          packages: getFallbackPackages(language),
          loading: false,
          error: null,
        });
      }
    };
    load();
  }, [language]);

  return state;
}

/**
 * Hook to fetch single package
 */
export function usePackage(id: string | null) {
  const [pkg, setPackage] = useState<Package | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setPackage(null);
      return;
    }

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPackageById(id);
        setPackage(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch package');
        setPackage(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  return { package: pkg, loading, error };
}
