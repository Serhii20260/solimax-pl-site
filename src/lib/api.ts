// src/lib/api.ts
// API client for packages

const API_BASE =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://127.0.0.1:4001/api' : '/pl-api');

export const apiUrl = (path: string) => `${API_BASE}${path}`;

/**
 * Приводить шлях до картинки з бази до того, що реально лежить на диску.
 *
 * Дві поправки, обидві — наслідок історії, а не примха:
 *  1) частина записів зберігає абсолютний URL на старий домен solimax.xyz —
 *     відкидаємо хост, бо той самий шлях віддається і з solimax.pl;
 *  2) шляхи записані з розширенням .png/.jpg, а статику переведено у WebP —
 *     підміняємо розширення. Каталог /pl/uploads/ не чіпаємо: там файли,
 *     завантажені через адмінку, вони у WebP не переганялись.
 *
 * Базу даних не редагуємо, тому підміна робиться на льоту в одному місці —
 * через нього мають проходити ВСІ дані пакетів, звідки б вони не прийшли.
 */
export const normalizeAssetUrl = (url: string): string => {
  if (!url) return url;
  const m = url.match(/^https?:\/\/(?:www\.)?solimax\.(?:xyz|pl)(\/.*)$/i);
  const relative = m ? m[1] : url;
  return relative.startsWith('/pl/') && !relative.startsWith('/pl/uploads/')
    ? relative.replace(/\.(png|jpe?g)$/i, '.webp')
    : relative;
};

/** Те саме для одного пакета: imageUrl + галерея images (рядок JSON або масив). */
export const normalizePackageAssets = <T extends { imageUrl?: string | null; images?: unknown }>(pkg: T): T => {
  if (!pkg) return pkg;
  const out: T = { ...pkg };
  if (typeof out.imageUrl === 'string') {
    out.imageUrl = normalizeAssetUrl(out.imageUrl) as T['imageUrl'];
  }
  const imgs = out.images;
  if (Array.isArray(imgs)) {
    out.images = imgs.map((i) => (typeof i === 'string' ? normalizeAssetUrl(i) : i)) as T['images'];
  } else if (typeof imgs === 'string' && imgs.trim().startsWith('[')) {
    try {
      const parsed = JSON.parse(imgs);
      if (Array.isArray(parsed)) {
        out.images = JSON.stringify(parsed.map((i) => (typeof i === 'string' ? normalizeAssetUrl(i) : i))) as T['images'];
      }
    } catch { /* лишаємо як є */ }
  }
  return out;
};

export interface PackageSpec {
  key: string;
  value: string;
}

export interface Package {
  id: string;
  category: 'home' | 'business' | 'heatpumps' | 'heating' | 'carport';
  tier: 'standard' | 'premium';
  title: string;
  shortDescription: string;
  fullDescription: string;
  manufacturerName: string;
  manufacturerUrl: string;
  imageUrl: string;
  datasheetUrl: string | null;
  // priceLabel — головна цифра, priceNote — дрібний рядок під нею.
  // Обидва приходять готовими з API (buildPriceLabel), тут їх не збирають.
  priceLabel: string | null;
  priceNote?: string | null;
  priceIndicative?: boolean;
  priceNetto?: number | null;
  priceBrutto?: number | null;
  specs: PackageSpec[] | null;
  isActive: boolean;
  isPromo: boolean;
  isNew: boolean;
  promoLabel: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface PackageFilters {
  category?: 'home' | 'business' | 'heatpumps' | 'heating' | 'carport';
  tier?: 'standard' | 'premium';
  promoOnly?: boolean;
  newOnly?: boolean;
  activeOnly?: boolean;
}

/**
 * Fetch packages with optional filters
 */
export async function fetchPackages(filters: PackageFilters = {}): Promise<Package[]> {
  const params = new URLSearchParams();
  
  if (filters.category) params.set('category', filters.category);
  if (filters.tier) params.set('tier', filters.tier);
  if (filters.promoOnly) params.set('promoOnly', 'true');
  if (filters.newOnly) params.set('newOnly', 'true');
  if (filters.activeOnly === false) params.set('activeOnly', 'false');
  
  const url = `${API_BASE}/packages${params.toString() ? `?${params}` : ''}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch packages: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Fetch packages for banners (promo or new)
 */
export async function fetchBannerPackages(): Promise<Package[]> {
  const response = await fetch(`${API_BASE}/packages/banners`);
  if (!response.ok) {
    throw new Error(`Failed to fetch banner packages: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Fetch single package by ID
 */
export async function fetchPackageById(id: string): Promise<Package> {
  const response = await fetch(`${API_BASE}/packages/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch package: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Category labels for display
 */
export const CATEGORY_LABELS: Record<Package['category'], string> = {
  home: 'Для дому',
  business: 'Для бізнесу',
  heatpumps: 'Теплові насоси',
  heating: 'Теплові насоси',
  carport: 'Carport',
};

/**
 * Tier labels for display
 */
export const TIER_LABELS: Record<Package['tier'], string> = {
  standard: 'Standard',
  premium: 'Premium',
};
