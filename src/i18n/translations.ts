/**
 * All interface copy lives here. Components never hardcode visible text.
 * Copy is editable starter text: no fabricated clients, awards, statistics or game titles.
 */

export type Lang = 'en' | 'fa';

type Project = { title: string; category: string; description: string; alt: string };

export type Dictionary = {
  meta: { title: string; description: string };
  nav: {
    work: string;
    about: string;
    showcase: string;
    contact: string;
    menu: string;
    close: string;
    skip: string;
    switchTo: string;
    home: string;
  };
  preloader: { loading: string; ready: string };
  hero: {
    eyebrow: string;
    lines: string[];
    sub: string;
    cta: string;
    scroll: string;
    badge: string;
    alts: { main: string; side1: string; side2: string };
  };
  marquee: string[];
  projects: {
    label: string;
    title: string[];
    intro: string;
    view: string;
    drag: string;
    items: Project[];
  };
  about: {
    label: string;
    statement: string;
    pillars: { title: string; text: string }[];
    alts: { a: string; b: string };
  };
  showcase: {
    label: string;
    title: string[];
    text: string;
    captions: string[];
    alts: { main: string; a: string; b: string };
  };
  cta: {
    label: string;
    title: string[];
    text: string;
    primary: string;
    secondary: string;
    alt: string;
  };
  footer: {
    tagline: string;
    navigate: string;
    contact: string;
    follow: string;
    contactPending: string;
    rights: string;
    top: string;
  };
  a11y: { placeholder: string; language: string; logo: string };
};

const en: Dictionary = {
  meta: {
    title: 'Gaming Creative Studio',
    description: 'Characters, worlds and campaigns for games.',
  },
  nav: {
    work: 'Work',
    about: 'About',
    showcase: 'Showcase',
    contact: 'Contact',
    menu: 'Menu',
    close: 'Close',
    skip: 'Skip to content',
    switchTo: 'Switch to English',
    home: 'Home',
  },
  preloader: { loading: 'Loading the world', ready: 'Ready' },
  hero: {
    eyebrow: 'Gaming creative studio',
    lines: ['Play', 'Beyond', 'the frame'],
    sub: 'We craft characters, worlds and campaigns that make players stop scrolling and start playing.',
    cta: 'See the work',
    scroll: 'Scroll to explore',
    badge: 'Press start • Press start • ',
    alts: {
      main: 'Main hero character artwork',
      side1: 'Secondary character artwork',
      side2: 'Game artwork detail',
    },
  },
  marquee: ['Character design', 'Game artwork', 'Gaming branding', 'Campaigns', 'Digital experiences'],
  projects: {
    label: 'Selected work',
    title: ['Featured', 'projects'],
    intro: 'A selection of characters, worlds and campaigns built for players.',
    view: 'View project',
    drag: 'Keep scrolling',
    items: [
      {
        title: 'Character series',
        category: 'Character design',
        description: 'A cast of heroes designed from silhouette to final render.',
        alt: 'Character series cover artwork',
      },
      {
        title: 'Key art campaign',
        category: 'Promotional campaign',
        description: 'Launch visuals built to stop the scroll.',
        alt: 'Key art campaign cover artwork',
      },
      {
        title: 'World concept',
        category: 'Game artwork',
        description: 'Environments and moods for a world worth exploring.',
        alt: 'World concept cover artwork',
      },
      {
        title: 'Brand identity',
        category: 'Gaming branding',
        description: 'A visual system that plays as hard as the game.',
        alt: 'Brand identity cover artwork',
      },
      {
        title: 'Launch experience',
        category: 'Digital experience',
        description: 'An interactive web moment for a game reveal.',
        alt: 'Launch experience cover artwork',
      },
    ],
  },
  about: {
    label: 'Who we are',
    statement:
      'We are a creative studio obsessed with games — the characters, the worlds, and the moments players remember long after the screen goes dark.',
    pillars: [
      { title: 'Characters with soul', text: 'Every hero starts with a story and a silhouette you can read in a second.' },
      { title: 'Worlds to explore', text: 'Art direction that turns a setting into a place players want to be.' },
      { title: 'Campaigns that play', text: 'Launch work that feels like part of the game, not an ad for it.' },
    ],
    alts: { a: 'Studio artwork, character close-up', b: 'Studio artwork detail' },
  },
  showcase: {
    label: 'Signature',
    title: ['Worlds', 'in motion'],
    text: 'Our strongest frames, shown big — the way they were meant to be seen.',
    captions: ['Key frame', 'Character study', 'Environment'],
    alts: { main: 'Signature full-width game artwork', a: 'Character study artwork', b: 'Environment artwork' },
  },
  cta: {
    label: 'Next level',
    title: ["Let's build", 'your world'],
    text: 'Have a game, a character or a launch in mind? Tell us about it.',
    primary: 'Start a project',
    secondary: 'Explore the work',
    alt: 'Closing artwork',
  },
  footer: {
    tagline: 'Made for players.',
    navigate: 'Navigate',
    contact: 'Contact',
    follow: 'Follow',
    contactPending: 'Contact details coming soon.',
    rights: 'All rights reserved.',
    top: 'Back to top',
  },
  a11y: { placeholder: 'Image placeholder', language: 'Language', logo: 'Home' },
};

const fa: Dictionary = {
  meta: {
    title: 'استودیو خلاق گیمینگ',
    description: 'کاراکتر، جهان و کمپین برای بازی‌ها.',
  },
  nav: {
    work: 'نمونه‌کارها',
    about: 'درباره ما',
    showcase: 'ویترین',
    contact: 'تماس',
    menu: 'منو',
    close: 'بستن',
    skip: 'رفتن به محتوا',
    switchTo: 'تغییر به فارسی',
    home: 'خانه',
  },
  preloader: { loading: 'در حال ساختن جهان', ready: 'آماده' },
  hero: {
    eyebrow: 'استودیو خلاق گیمینگ',
    lines: ['بازی کن', 'فراتر از', 'قاب'],
    sub: 'ما کاراکترها، جهان‌ها و کمپین‌هایی می‌سازیم که بازیکن را از اسکرول کردن به بازی کردن می‌کشانند.',
    cta: 'دیدن نمونه‌کارها',
    scroll: 'برای کاوش اسکرول کنید',
    badge: 'شروع بازی • شروع بازی • ',
    alts: {
      main: 'تصویر اصلی کاراکتر',
      side1: 'تصویر کاراکتر دوم',
      side2: 'جزئیات آرت بازی',
    },
  },
  marquee: ['طراحی کاراکتر', 'آرت بازی', 'برندینگ گیمینگ', 'کمپین تبلیغاتی', 'تجربه دیجیتال'],
  projects: {
    label: 'نمونه‌کارهای منتخب',
    title: ['پروژه‌های', 'برگزیده'],
    intro: 'گزیده‌ای از کاراکترها، جهان‌ها و کمپین‌هایی که برای بازیکن‌ها ساخته‌ایم.',
    view: 'مشاهده پروژه',
    drag: 'ادامه دهید',
    items: [
      {
        title: 'مجموعه کاراکتر',
        category: 'طراحی کاراکتر',
        description: 'گروهی از قهرمان‌ها؛ از طرح سایه‌نما تا رندر نهایی.',
        alt: 'تصویر کاور مجموعه کاراکتر',
      },
      {
        title: 'کمپین کی‌آرت',
        category: 'کمپین تبلیغاتی',
        description: 'تصاویر رونمایی که اسکرول را متوقف می‌کنند.',
        alt: 'تصویر کاور کمپین کی‌آرت',
      },
      {
        title: 'طراحی جهان',
        category: 'آرت بازی',
        description: 'محیط‌ها و حال‌وهوایی برای جهانی که ارزش کاوش دارد.',
        alt: 'تصویر کاور طراحی جهان',
      },
      {
        title: 'هویت بصری',
        category: 'برندینگ گیمینگ',
        description: 'سیستمی بصری که به اندازه خود بازی پرانرژی است.',
        alt: 'تصویر کاور هویت بصری',
      },
      {
        title: 'تجربه رونمایی',
        category: 'تجربه دیجیتال',
        description: 'یک لحظه تعاملی وب برای معرفی یک بازی.',
        alt: 'تصویر کاور تجربه رونمایی',
      },
    ],
  },
  about: {
    label: 'ما که هستیم',
    statement:
      'ما استودیویی خلاق و شیفته بازی هستیم؛ شیفته کاراکترها، جهان‌ها و لحظه‌هایی که بازیکن‌ها مدت‌ها بعد از خاموش شدن صفحه هنوز به یاد دارند.',
    pillars: [
      { title: 'کاراکترهایی با روح', text: 'هر قهرمان با یک داستان و سایه‌نمایی شروع می‌شود که در یک نگاه خوانده شود.' },
      { title: 'جهان‌هایی برای کاوش', text: 'هدایت هنری‌ای که یک فضا را به جایی تبدیل می‌کند که بازیکن بخواهد در آن بماند.' },
      { title: 'کمپین‌هایی که بازی می‌کنند', text: 'کارهای رونمایی که بخشی از خود بازی به نظر می‌رسند، نه تبلیغی برای آن.' },
    ],
    alts: { a: 'آرت استودیو، نمای نزدیک کاراکتر', b: 'جزئیات آرت استودیو' },
  },
  showcase: {
    label: 'امضای ما',
    title: ['جهان‌هایی', 'در حرکت'],
    text: 'قوی‌ترین قاب‌های ما، در بزرگ‌ترین اندازه؛ همان‌طور که باید دیده شوند.',
    captions: ['قاب کلیدی', 'مطالعه کاراکتر', 'محیط'],
    alts: { main: 'آرت تمام‌عرض شاخص بازی', a: 'آرت مطالعه کاراکتر', b: 'آرت محیط' },
  },
  cta: {
    label: 'مرحله بعد',
    title: ['بیایید جهان', 'شما را بسازیم'],
    text: 'بازی، کاراکتر یا رونمایی‌ای در ذهن دارید؟ برایمان بگویید.',
    primary: 'شروع پروژه',
    secondary: 'کاوش نمونه‌کارها',
    alt: 'آرت پایانی',
  },
  footer: {
    tagline: 'ساخته‌شده برای بازیکن‌ها.',
    navigate: 'پیمایش',
    contact: 'تماس',
    follow: 'دنبال کنید',
    contactPending: 'اطلاعات تماس به‌زودی.',
    rights: 'تمامی حقوق محفوظ است.',
    top: 'بازگشت به بالا',
  },
  a11y: { placeholder: 'جای تصویر', language: 'زبان', logo: 'خانه' },
};

export const translations: Record<Lang, Dictionary> = { en, fa };
