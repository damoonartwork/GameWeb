/**
 * All interface copy lives here (product names/prices live in config/store.ts).
 * Starter copy only: no invented reviews, statistics, delivery times or guarantees.
 * FAQ answers are written as templates — replace them with your real policies.
 */

export type Lang = 'en' | 'fa';

type Titled = { title: string; text: string };

export type Dictionary = {
  meta: { title: string; description: string };
  nav: {
    categories: string;
    deals: string;
    digital: string;
    shop: string;
    faq: string;
    cart: string;
    menu: string;
    close: string;
    skip: string;
  };
  hero: {
    titleLines: string[];
    sub: string;
    cta: string;
    cardLabel: string;
    featureText: string;
    stats: { value: string; label: string }[];
    alt: string;
  };
  product: {
    addToCart: string;
    added: string;
    currency: string;
    off: string;
    from: string;
  };
  categories: { label: string; title: string; text: string };
  deals: {
    label: string;
    title: string;
    viewAll: string;
    endsIn: string;
    units: { h: string; m: string; s: string };
    prev: string;
    next: string;
  };
  about: { label: string; statement: string; statement2: string; tags: string[] };
  digital: { label: string; title: string; text: string; bannerTitle: string; bannerText: string; bannerCta: string };
  budget: { label: string; title: string; text: string; upTo: string; million: string; alt: string };
  shop: {
    label: string;
    title: string;
    text: string;
    all: string;
    anyPrice: string;
    upTo: string;
    empty: string;
    reset: string;
  };
  steps: {
    label: string;
    title: string;
    text: string;
    items: Titled[];
    boxLabel: string;
    boxEmpty: string;
    copy: string;
    copied: string;
  };
  roadmap: { label: string; title: string; phase: string; items: { title: string; points: string[] }[] };
  platforms: { label: string; title: string; text: string; items: { name: string; text: string; alt: string }[] };
  faq: { label: string; title: string; text: string; items: { q: string; a: string }[] };
  cta: { label: string; title: string; text: string; button: string; alt: string };
  cart: {
    title: string;
    empty: string;
    subtotal: string;
    checkout: string;
    checkoutNote: string;
    remove: string;
    increase: string;
    decrease: string;
    close: string;
    browse: string;
  };
  footer: {
    tagline: string;
    shop: string;
    help: string;
    language: string;
    rights: string;
    contactPending: string;
  };
  backToTop: string;
  a11y: { placeholder: string; language: string; logo: string; open: string; scenery: string };
};

const en: Dictionary = {
  meta: { title: 'Gaming Store', description: 'Consoles, controllers, games, accessories and gift cards.' },
  nav: {
    categories: 'Categories',
    deals: 'Deals',
    digital: 'Gift cards',
    shop: 'Shop',
    faq: 'FAQ',
    cart: 'Cart',
    menu: 'Menu',
    close: 'Close',
    skip: 'Skip to content',
  },
  hero: {
    titleLines: ['Level up', 'your gear'],
    sub: 'Consoles, controllers, games, accessories and gift cards — everything a player needs, in one place.',
    cta: 'Shop now',
    cardLabel: 'Price',
    featureText: 'Our featured pick this week — ready to ship to your setup.',
    stats: [
      { value: 'PS5', label: 'PlayStation gear & games' },
      { value: 'XBOX', label: 'Xbox consoles & Game Pass' },
      { value: 'PC', label: 'Gift cards & accessories' },
    ],
    alt: 'Hero character',
  },
  product: { addToCart: 'Add to cart', added: 'Added!', currency: 'Toman', off: 'off', from: 'from' },
  categories: { label: 'Browse', title: 'Shop by category', text: 'Pick a category to filter the shop below.' },
  deals: {
    label: 'Limited time',
    title: 'Flash deals',
    viewAll: 'View all products',
    endsIn: 'Ends in',
    units: { h: 'h', m: 'm', s: 's' },
    prev: 'Previous',
    next: 'Next',
  },
  about: {
    label: 'Why shop here',
    statement: 'A store built by players, for players — gear we would use ourselves.',
    statement2: 'Every product is picked for how it plays, not just how it looks on a shelf.',
    tags: ['Best seller', 'Hot pick'],
  },
  digital: {
    label: 'Digital',
    title: 'Gift cards & subscriptions',
    text: 'PlayStation Plus, Game Pass, Steam and more — add any card to your cart.',
    bannerTitle: 'All gift cards in one place',
    bannerText: 'Top up your wallet or gift a subscription.',
    bannerCta: 'View & buy',
  },
  budget: {
    label: 'Your budget',
    title: 'Shop by budget',
    text: 'Pick a ceiling and we will show what fits.',
    upTo: 'Up to',
    million: 'million',
    alt: 'Budget character',
  },
  shop: {
    label: 'Shop',
    title: 'All products',
    text: 'Filter by category or budget.',
    all: 'All',
    anyPrice: 'Any price',
    upTo: 'Up to',
    empty: 'Nothing matches these filters yet.',
    reset: 'Clear filters',
  },
  steps: {
    label: 'How to buy',
    title: 'Order in 3 steps',
    text: 'Simple from browsing to unboxing.',
    items: [
      { title: 'Pick your gear', text: 'Browse categories, deals and gift cards.' },
      { title: 'Add to cart', text: 'Review your cart and quantities in one place.' },
      { title: 'Check out', text: 'Complete your order and get ready to play.' },
    ],
    boxLabel: 'Questions before you buy? Copy our support address.',
    boxEmpty: 'Support email coming soon',
    copy: 'Copy',
    copied: 'Copied!',
  },
  roadmap: {
    label: 'Your order',
    title: 'From cart to controller',
    phase: 'Step',
    items: [
      { title: 'Order placed', points: ['Cart confirmed', 'Order summary shown', 'Confirmation sent'] },
      { title: 'Checked & packed', points: ['Item and accessories checked', 'Safely packed', 'Ready to ship'] },
      { title: 'On the way', points: ['Handed to the courier', 'Tracking details shared', 'Digital codes delivered online'] },
      { title: 'Delivered', points: ['Unbox and set up', 'Keep your invoice', 'Contact support anytime'] },
      { title: 'Game on', points: ['Download your games', 'Activate subscriptions', 'Come back for the next upgrade'] },
    ],
  },
  platforms: {
    label: 'Platforms',
    title: 'Every platform covered',
    text: 'Replace these with your own platform or brand images.',
    items: [
      { name: 'PlayStation', text: 'Consoles, DualSense, PS Plus', alt: 'PlayStation' },
      { name: 'Xbox', text: 'Series X|S, controllers, Game Pass', alt: 'Xbox' },
      { name: 'Nintendo', text: 'Switch, Joy-Con, eShop', alt: 'Nintendo' },
    ],
  },
  faq: {
    label: 'FAQ',
    title: 'Frequently asked questions',
    text: 'Edit these answers to match your store policies.',
    items: [
      { q: 'Are the products original?', a: 'Describe your sourcing and authenticity policy here.' },
      { q: 'Is there a warranty?', a: 'Describe the warranty terms for each product type here.' },
      { q: 'How are gift cards delivered?', a: 'Explain how and when digital codes reach the customer.' },
      { q: 'How long does shipping take?', a: 'List your shipping methods and delivery times here.' },
      { q: 'Can I return a product?', a: 'Explain your return and exchange policy here.' },
    ],
  },
  cta: {
    label: 'Get started',
    title: 'Ready for your next level?',
    text: 'New gear, new games, new subscriptions — your next session starts here.',
    button: 'Start shopping',
    alt: 'Banner characters',
  },
  cart: {
    title: 'Your cart',
    empty: 'Your cart is empty.',
    subtotal: 'Subtotal',
    checkout: 'Checkout',
    checkoutNote: 'Online payment is not connected yet.',
    remove: 'Remove',
    increase: 'Increase quantity',
    decrease: 'Decrease quantity',
    close: 'Close cart',
    browse: 'Browse products',
  },
  footer: {
    tagline: 'Gear up. Game on.',
    shop: 'Shop',
    help: 'Help',
    language: 'Language',
    rights: 'All rights reserved.',
    contactPending: 'Contact details coming soon.',
  },
  backToTop: 'Back to top',
  a11y: { placeholder: 'Image placeholder', language: 'Language', logo: 'Home', open: 'Toggle answer', scenery: 'Decorative landscape' },
};

const fa: Dictionary = {
  meta: { title: 'فروشگاه گیمینگ', description: 'کنسول، دسته، بازی، لوازم جانبی و گیفت کارت.' },
  nav: {
    categories: 'دسته‌بندی‌ها',
    deals: 'تخفیف‌ها',
    digital: 'گیفت کارت',
    shop: 'فروشگاه',
    faq: 'سؤالات',
    cart: 'سبد خرید',
    menu: 'منو',
    close: 'بستن',
    skip: 'رفتن به محتوا',
  },
  hero: {
    titleLines: ['تجهیزاتت رو', 'لِوِل‌آپ کن'],
    sub: 'کنسول، دسته، بازی، لوازم جانبی و گیفت کارت؛ هر چیزی که یک گیمر لازم دارد، یک‌جا.',
    cta: 'خرید کنید',
    cardLabel: 'قیمت',
    featureText: 'انتخاب ویژه این هفته؛ آماده برای اضافه شدن به ست‌آپ شما.',
    stats: [
      { value: 'PS5', label: 'تجهیزات و بازی‌های پلی‌استیشن' },
      { value: 'XBOX', label: 'کنسول ایکس‌باکس و گیم‌پس' },
      { value: 'PC', label: 'گیفت کارت و لوازم جانبی' },
    ],
    alt: 'کاراکتر اصلی',
  },
  product: { addToCart: 'افزودن به سبد', added: 'اضافه شد!', currency: 'تومان', off: 'تخفیف', from: 'از' },
  categories: { label: 'مرور', title: 'خرید بر اساس دسته‌بندی', text: 'یک دسته را انتخاب کنید تا فروشگاه پایین فیلتر شود.' },
  deals: {
    label: 'زمان محدود',
    title: 'تخفیف‌های ویژه',
    viewAll: 'مشاهده همه محصولات',
    endsIn: 'پایان در',
    units: { h: 'ساعت', m: 'دقیقه', s: 'ثانیه' },
    prev: 'قبلی',
    next: 'بعدی',
  },
  about: {
    label: 'چرا از ما بخرید',
    statement: 'فروشگاهی که گیمرها برای گیمرها ساخته‌اند؛ تجهیزاتی که خودمان هم استفاده می‌کنیم.',
    statement2: 'هر محصول برای تجربه بازی انتخاب می‌شود، نه فقط برای ظاهرش در ویترین.',
    tags: ['پرفروش', 'پیشنهاد داغ'],
  },
  digital: {
    label: 'دیجیتال',
    title: 'گیفت کارت و اشتراک',
    text: 'پلی‌استیشن پلاس، گیم‌پس، استیم و بیشتر؛ هر کارتی را به سبدتان اضافه کنید.',
    bannerTitle: 'همه گیفت کارت‌ها یک‌جا',
    bannerText: 'کیف پولتان را شارژ کنید یا یک اشتراک هدیه بدهید.',
    bannerCta: 'مشاهده و خرید',
  },
  budget: {
    label: 'بودجه شما',
    title: 'خرید بر اساس بودجه',
    text: 'سقف بودجه را انتخاب کنید تا محصولات مناسب را ببینید.',
    upTo: 'تا',
    million: 'میلیون',
    alt: 'کاراکتر بخش بودجه',
  },
  shop: {
    label: 'فروشگاه',
    title: 'همه محصولات',
    text: 'بر اساس دسته‌بندی یا بودجه فیلتر کنید.',
    all: 'همه',
    anyPrice: 'هر قیمتی',
    upTo: 'تا',
    empty: 'فعلاً محصولی با این فیلترها نیست.',
    reset: 'حذف فیلترها',
  },
  steps: {
    label: 'نحوه خرید',
    title: 'سفارش در ۳ قدم',
    text: 'از انتخاب تا باز کردن جعبه، ساده.',
    items: [
      { title: 'انتخاب کنید', text: 'دسته‌بندی‌ها، تخفیف‌ها و گیفت کارت‌ها را ببینید.' },
      { title: 'به سبد اضافه کنید', text: 'سبد و تعدادها را یک‌جا بررسی کنید.' },
      { title: 'تسویه کنید', text: 'سفارش را نهایی کنید و آماده بازی شوید.' },
    ],
    boxLabel: 'قبل از خرید سؤالی دارید؟ آدرس پشتیبانی را کپی کنید.',
    boxEmpty: 'ایمیل پشتیبانی به‌زودی',
    copy: 'کپی',
    copied: 'کپی شد!',
  },
  roadmap: {
    label: 'سفارش شما',
    title: 'از سبد خرید تا دسته بازی',
    phase: 'مرحله',
    items: [
      { title: 'ثبت سفارش', points: ['تأیید سبد خرید', 'نمایش خلاصه سفارش', 'ارسال تأییدیه'] },
      { title: 'بررسی و بسته‌بندی', points: ['بررسی کالا و لوازم همراه', 'بسته‌بندی ایمن', 'آماده ارسال'] },
      { title: 'در مسیر', points: ['تحویل به پیک', 'اعلام اطلاعات رهگیری', 'ارسال آنلاین کدهای دیجیتال'] },
      { title: 'تحویل', points: ['باز کردن و راه‌اندازی', 'نگهداری فاکتور', 'تماس با پشتیبانی در هر زمان'] },
      { title: 'شروع بازی', points: ['دانلود بازی‌ها', 'فعال‌سازی اشتراک‌ها', 'برگشت برای ارتقای بعدی'] },
    ],
  },
  platforms: {
    label: 'پلتفرم‌ها',
    title: 'همه پلتفرم‌ها',
    text: 'این تصاویر را با تصاویر پلتفرم یا برندهای خودتان جایگزین کنید.',
    items: [
      { name: 'پلی‌استیشن', text: 'کنسول، دوال‌سنس، پلی‌استیشن پلاس', alt: 'پلی‌استیشن' },
      { name: 'ایکس‌باکس', text: 'سری X|S، دسته، گیم‌پس', alt: 'ایکس‌باکس' },
      { name: 'نینتندو', text: 'سوییچ، جوی‌کان، ای‌شاپ', alt: 'نینتندو' },
    ],
  },
  faq: {
    label: 'سؤالات',
    title: 'سؤالات متداول',
    text: 'این پاسخ‌ها را مطابق قوانین فروشگاه خودتان ویرایش کنید.',
    items: [
      { q: 'محصولات اورجینال هستند؟', a: 'سیاست تأمین و اصالت کالای فروشگاه را اینجا بنویسید.' },
      { q: 'محصولات گارانتی دارند؟', a: 'شرایط گارانتی هر نوع محصول را اینجا بنویسید.' },
      { q: 'گیفت کارت‌ها چطور تحویل داده می‌شوند؟', a: 'توضیح دهید کدهای دیجیتال چطور و چه زمانی به مشتری می‌رسد.' },
      { q: 'ارسال چقدر طول می‌کشد؟', a: 'روش‌های ارسال و زمان تحویل را اینجا بنویسید.' },
      { q: 'امکان مرجوع کردن کالا هست؟', a: 'شرایط مرجوعی و تعویض کالا را اینجا بنویسید.' },
    ],
  },
  cta: {
    label: 'شروع کنید',
    title: 'آماده مرحله بعدی هستید؟',
    text: 'تجهیزات تازه، بازی‌های تازه، اشتراک‌های تازه؛ بازی بعدی‌تان از اینجا شروع می‌شود.',
    button: 'شروع خرید',
    alt: 'کاراکترهای بنر',
  },
  cart: {
    title: 'سبد خرید',
    empty: 'سبد خرید شما خالی است.',
    subtotal: 'جمع کل',
    checkout: 'تسویه حساب',
    checkoutNote: 'درگاه پرداخت آنلاین هنوز وصل نشده است.',
    remove: 'حذف',
    increase: 'افزایش تعداد',
    decrease: 'کاهش تعداد',
    close: 'بستن سبد',
    browse: 'مشاهده محصولات',
  },
  footer: {
    tagline: 'تجهیز شو، بازی کن.',
    shop: 'فروشگاه',
    help: 'راهنما',
    language: 'زبان',
    rights: 'تمامی حقوق محفوظ است.',
    contactPending: 'اطلاعات تماس به‌زودی.',
  },
  backToTop: 'بازگشت به بالا',
  a11y: { placeholder: 'جای تصویر', language: 'زبان', logo: 'خانه', open: 'نمایش یا بستن پاسخ', scenery: 'منظره تزئینی' },
};

export const translations: Record<Lang, Dictionary> = { en, fa };
