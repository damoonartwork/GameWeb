/**
 * STORE CATALOGUE — edit everything here.
 *
 * ⚠️ All products, prices and discounts below are SAMPLE DATA so the shop has something to show.
 *    Replace them with your real catalogue before publishing.
 *
 * Images: put a file named `<image>` (any of .png .webp .jpg) in src/assets/images/.
 *    e.g. product `ps5-slim` → src/assets/images/product-ps5-slim.png
 *    Missing images show a labelled placeholder.
 * Prices are in Toman (integers). `oldPrice` (optional) makes the item a discounted deal.
 */

export type L10n = { en: string; fa: string };

export type CategoryId = 'consoles' | 'controllers' | 'games' | 'accessories' | 'headsets' | 'digital';

export type Category = { id: CategoryId; name: L10n; image: string };

export type Product = {
  id: string;
  category: CategoryId;
  name: L10n;
  price: number;
  oldPrice?: number;
  image: string;
  /** small badge on the card, e.g. "Original" — optional */
  badge?: L10n;
};

export const categories: Category[] = [
  { id: 'consoles', name: { en: 'Consoles', fa: 'کنسول' }, image: 'cat-consoles' },
  { id: 'controllers', name: { en: 'Controllers', fa: 'دسته بازی' }, image: 'cat-controllers' },
  { id: 'games', name: { en: 'Games', fa: 'بازی' }, image: 'cat-games' },
  { id: 'accessories', name: { en: 'Accessories', fa: 'لوازم جانبی' }, image: 'cat-accessories' },
  { id: 'headsets', name: { en: 'Headsets', fa: 'هدست' }, image: 'cat-headsets' },
  { id: 'digital', name: { en: 'Gift cards', fa: 'گیفت کارت' }, image: 'cat-digital' },
];

export const products: Product[] = [
  // consoles
  { id: 'ps5-slim', category: 'consoles', name: { en: 'PlayStation 5 Slim', fa: 'کنسول پلی‌استیشن ۵ اسلیم' }, price: 38_500_000, oldPrice: 41_900_000, image: 'product-ps5-slim' },
  { id: 'xbox-series-x', category: 'consoles', name: { en: 'Xbox Series X', fa: 'کنسول ایکس‌باکس سری X' }, price: 36_900_000, image: 'product-xbox-series-x' },
  { id: 'switch-oled', category: 'consoles', name: { en: 'Nintendo Switch OLED', fa: 'نینتندو سوییچ OLED' }, price: 21_400_000, oldPrice: 22_800_000, image: 'product-switch-oled' },
  // controllers
  { id: 'dualsense', category: 'controllers', name: { en: 'DualSense controller (white)', fa: 'دسته دوال‌سنس سفید' }, price: 5_980_000, oldPrice: 6_490_000, image: 'product-dualsense' },
  { id: 'dualshock4', category: 'controllers', name: { en: 'DualShock 4 controller (black)', fa: 'دسته دوال‌شاک ۴ مشکی' }, price: 3_250_000, image: 'product-dualshock4' },
  { id: 'xbox-controller', category: 'controllers', name: { en: 'Xbox wireless controller', fa: 'دسته بی‌سیم ایکس‌باکس' }, price: 4_790_000, oldPrice: 5_190_000, image: 'product-xbox-controller' },
  // games
  { id: 'game-ps5', category: 'games', name: { en: 'Game title (PS5)', fa: 'عنوان بازی (PS5)' }, price: 3_400_000, image: 'product-game-ps5' },
  { id: 'game-xbox', category: 'games', name: { en: 'Game title (Xbox)', fa: 'عنوان بازی (ایکس‌باکس)' }, price: 2_950_000, oldPrice: 3_300_000, image: 'product-game-xbox' },
  // accessories
  { id: 'charging-station', category: 'accessories', name: { en: 'DualSense charging station', fa: 'پایه شارژ دسته PS5' }, price: 1_980_000, oldPrice: 2_190_000, image: 'product-charging-station' },
  { id: 'ps5-case', category: 'accessories', name: { en: 'PS5 Slim carry case', fa: 'کیف حمل PS5 اسلیم' }, price: 780_000, oldPrice: 1_180_000, image: 'product-ps5-case' },
  { id: 'xbox-battery', category: 'accessories', name: { en: 'Xbox rechargeable battery + USB-C', fa: 'باتری شارژی دسته ایکس‌باکس + کابل USB-C' }, price: 1_680_000, image: 'product-xbox-battery' },
  // headsets
  { id: 'pulse-headset', category: 'headsets', name: { en: 'Wireless gaming headset', fa: 'هدست گیمینگ بی‌سیم' }, price: 7_450_000, oldPrice: 7_990_000, image: 'product-pulse-headset' },
  // digital
  { id: 'ps-plus', category: 'digital', name: { en: 'PlayStation Plus subscription', fa: 'اشتراک پلی‌استیشن پلاس' }, price: 1_450_000, image: 'gift-ps-plus' },
  { id: 'game-pass', category: 'digital', name: { en: 'Xbox Game Pass Ultimate', fa: 'اشتراک گیم‌پس آلتیمیت' }, price: 1_290_000, image: 'gift-game-pass' },
  { id: 'steam-wallet', category: 'digital', name: { en: 'Steam wallet gift card', fa: 'گیفت کارت استیم' }, price: 980_000, image: 'gift-steam' },
  { id: 'eshop', category: 'digital', name: { en: 'Nintendo eShop gift card', fa: 'گیفت کارت نینتندو' }, price: 1_150_000, image: 'gift-eshop' },
  { id: 'psn-card', category: 'digital', name: { en: 'PSN gift card', fa: 'گیفت کارت PSN' }, price: 1_050_000, image: 'gift-psn' },
  { id: 'cod-points', category: 'digital', name: { en: 'Call of Duty points', fa: 'سی‌پی کالاف دیوتی' }, price: 690_000, image: 'gift-cod' },
];

/** Digital-products section (gift-card tiles), in display order. Colour = tile background. */
export const digitalTiles: { id: string; color: string }[] = [
  { id: 'ps-plus', color: '#1f1f22' },
  { id: 'game-pass', color: '#107c10' },
  { id: 'steam-wallet', color: '#1b2838' },
  { id: 'eshop', color: '#e60012' },
  { id: 'psn-card', color: '#0b3d91' },
  { id: 'cod-points', color: '#2b2b26' },
];

/** Featured product in the hero card, and the three best-sellers in the fanned cards. */
export const heroProductId = 'dualsense';
export const bestSellerIds = ['ps5-slim', 'dualsense', 'pulse-headset'];

/** Budget shortcuts (Toman). Clicking one filters the shop to "up to" that price. */
export const budgets = [2_000_000, 4_000_000, 6_000_000, 8_000_000];

/**
 * Special-deals countdown. Leave empty to count down to the end of each day (resets at midnight),
 * or set an ISO date like '2026-11-01T23:59:59+03:30' for a fixed campaign end.
 */
export const dealsEndAt = '';

export const productById = (id: string) => products.find((p) => p.id === id);
export const deals = () => products.filter((p) => p.oldPrice && p.oldPrice > p.price);
export const discountPercent = (p: Product) => (p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0);

/** Locale-aware price, e.g. 5,980,000 / ۵٬۹۸۰٬۰۰۰ */
export function formatPrice(n: number, lang: 'en' | 'fa') {
  return new Intl.NumberFormat(lang === 'fa' ? 'fa-IR' : 'en-US').format(n);
}
