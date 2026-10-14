/**
 * All interface copy lives here. Components never hardcode visible text.
 * Starter copy only: no fabricated clients, awards, statistics, team members or game titles.
 * Everything marked "placeholder" in a comment is meant to be replaced with real content.
 */

export type Lang = 'en' | 'fa';

type Titled = { title: string; text: string };

export type Dictionary = {
  meta: { title: string; description: string };
  nav: {
    about: string;
    features: string;
    process: string;
    faq: string;
    cta: string;
    menu: string;
    close: string;
    skip: string;
  };
  hero: {
    titleLines: string[];
    sub: string;
    cta: string;
    card: { label: string; value: string; open: string; alt: string };
    feature: { name: string; text: string };
    /** value is animated with the scramble effect; keep it short */
    stats: { value: string; label: string }[];
    alt: string;
  };
  about: {
    label: string;
    statement: string;
    statement2: string;
    tags: string[];
    cards: { label: string; value: string; alt: string }[];
  };
  features: {
    label: string;
    title: string;
    text: string;
    items: (Titled & { alt: string })[];
    cardCta: Titled & { button: string };
  };
  signature: {
    label: string;
    title: string;
    text: string;
    stats: { value: string; label: string }[];
    alt: string;
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
  roadmap: {
    label: string;
    title: string;
    phase: string;
    items: { title: string; points: string[] }[];
  };
  team: {
    label: string;
    title: string;
    text: string;
    members: { name: string; role: string; alt: string }[];
  };
  faq: {
    label: string;
    title: string;
    text: string;
    items: { q: string; a: string }[];
  };
  cta: { label: string; title: string; text: string; button: string; alt: string };
  footer: {
    tagline: string;
    studio: string;
    quick: string;
    language: string;
    rights: string;
    contactPending: string;
  };
  backToTop: string;
  a11y: { placeholder: string; language: string; logo: string; open: string; scenery: string };
};

const en: Dictionary = {
  meta: {
    title: 'Gaming Creative Studio',
    description: 'Characters, worlds and campaigns for games.',
  },
  nav: {
    about: 'About',
    features: 'What we make',
    process: 'Process',
    faq: 'FAQ',
    cta: 'Start a project',
    menu: 'Menu',
    close: 'Close',
    skip: 'Skip to content',
  },
  hero: {
    titleLines: ['Unmask the', 'future of play'],
    sub: 'We design characters, worlds and campaigns that pull players straight into the game.',
    cta: 'Explore the work',
    card: { label: 'Power level', value: '9.0/10', open: 'Open character', alt: 'Featured character card' },
    feature: { name: 'Hero #001', text: 'Your featured character goes here — one line of story to hook the player.' },
    stats: [
      { value: '05+', label: 'Featured projects on show' },
      { value: '02', label: 'Languages, one experience' },
      { value: '100%', label: 'Original artwork' },
    ],
    alt: 'Main hero character',
  },
  about: {
    label: 'About us',
    statement: 'We are a creative studio building characters and worlds for games.',
    statement2: 'Every character is crafted with its own story, style and hidden power.',
    tags: ['Character #01', 'Character #02'],
    cards: [
      { label: 'Class', value: 'Scout', alt: 'Character card one' },
      { label: 'Class', value: 'Tank', alt: 'Character card two' },
      { label: 'Class', value: 'Rogue', alt: 'Character card three' },
    ],
  },
  features: {
    label: 'What we make',
    title: 'Unlock the craft',
    text: 'A full creative pipeline built for games — from first sketch to launch day.',
    items: [
      { title: 'Characters with soul', text: 'Heroes and villains designed from silhouette to final render.', alt: 'Character design sample' },
      { title: 'Game artwork & key art', text: 'Worlds, environments and launch visuals that stop the scroll.', alt: 'Game artwork sample' },
      { title: 'Gaming branding', text: 'Logos, identities and visual systems that play as hard as the game.', alt: 'Gaming branding sample' },
    ],
    cardCta: {
      title: 'Ready to join the clan?',
      text: 'Bring us your game, character or launch — we will build the world around it.',
      button: 'Start a project',
    },
  },
  signature: {
    label: 'Signature',
    title: 'The shadow craft',
    text: 'Every project blends four disciplines into one recognisable style.',
    stats: [
      { value: '2D', label: 'Illustration' },
      { value: '3D', label: 'Renders' },
      { value: 'UI', label: 'Game interfaces' },
      { value: 'FX', label: 'Motion & effects' },
    ],
    alt: 'Signature character',
  },
  steps: {
    label: 'How it works',
    title: 'Start your project in 3 steps',
    text: 'A simple, transparent way to go from idea to playable art.',
    items: [
      { title: 'Share your idea', text: 'Tell us about your game, character or campaign.' },
      { title: 'Design & iterate', text: 'We sketch, refine and polish together with you.' },
      { title: 'Launch together', text: 'Final assets delivered, ready for players.' },
    ],
    boxLabel: 'Grab our address and start your adventure in the shadows!',
    boxEmpty: 'Contact email coming soon',
    copy: 'Copy',
    copied: 'Copied!',
  },
  roadmap: {
    label: 'Process',
    title: 'From sketch to launch',
    phase: 'Phase',
    items: [
      { title: 'Concept', points: ['Brief, references and goals', 'Mood boards and direction', 'First silhouettes'] },
      { title: 'Character design', points: ['Turnarounds and expressions', 'Colour and costume passes', 'Signature details'] },
      { title: 'World building', points: ['Environments and props', 'Lighting and atmosphere', 'Key art compositions'] },
      { title: 'Production', points: ['Final renders and assets', 'Brand and UI elements', 'Motion and effects'] },
      { title: 'Launch', points: ['Campaign visuals', 'Web and social formats', 'Support after release'] },
    ],
  },
  team: {
    label: 'The cast',
    title: 'Meet the crew',
    text: 'The characters behind the work — replace them with your own crew.',
    members: [
      { name: 'Character 01', role: 'Role or title', alt: 'Crew portrait one' },
      { name: 'Character 02', role: 'Role or title', alt: 'Crew portrait two' },
      { name: 'Character 03', role: 'Role or title', alt: 'Crew portrait three' },
    ],
  },
  faq: {
    label: 'FAQ',
    title: 'Frequently asked questions',
    text: 'Here are some of the most common questions.',
    items: [
      { q: 'What do you create?', a: 'Characters, game artwork, key art, gaming brand identities and digital experiences for games.' },
      { q: 'How do I start a project?', a: 'Send us a short description of your idea. We reply with questions and a proposed plan.' },
      { q: 'Do you work in 2D and 3D?', a: 'Yes — the style is chosen per project to fit the game, the team and the platform.' },
      { q: 'How long does a project take?', a: 'It depends on the scope. After the first conversation you get a clear timeline before any work starts.' },
      { q: 'Can you handle the launch campaign too?', a: 'Yes. We can extend the artwork into campaign visuals, web and social formats.' },
    ],
  },
  cta: {
    label: 'Get started',
    title: 'Start your project today!',
    text: 'Join the clan — tell us about your game and we will bring its characters to life.',
    button: 'Join the clan',
    alt: 'Closing banner characters',
  },
  footer: {
    tagline: 'Forged in shadows. Made for players.',
    studio: 'Studio',
    quick: 'Quick links',
    language: 'Language',
    rights: 'All rights reserved.',
    contactPending: 'Contact details coming soon.',
  },
  backToTop: 'Back to top',
  a11y: { placeholder: 'Image placeholder', language: 'Language', logo: 'Home', open: 'Toggle answer', scenery: 'Decorative landscape' },
};

const fa: Dictionary = {
  meta: {
    title: 'استودیو خلاق گیمینگ',
    description: 'کاراکتر، جهان و کمپین برای بازی‌ها.',
  },
  nav: {
    about: 'درباره ما',
    features: 'چه می‌سازیم',
    process: 'فرایند',
    faq: 'سؤالات',
    cta: 'شروع پروژه',
    menu: 'منو',
    close: 'بستن',
    skip: 'رفتن به محتوا',
  },
  hero: {
    titleLines: ['نقاب از آینده', 'بازی بردارید'],
    sub: 'ما کاراکترها، جهان‌ها و کمپین‌هایی طراحی می‌کنیم که بازیکن را مستقیم به دل بازی می‌برند.',
    cta: 'دیدن نمونه‌کارها',
    card: { label: 'سطح قدرت', value: '۹٫۰/۱۰', open: 'باز کردن کاراکتر', alt: 'کارت کاراکتر ویژه' },
    feature: { name: 'قهرمان #۰۰۱', text: 'کاراکتر ویژه شما اینجا قرار می‌گیرد؛ یک خط داستان برای جذب بازیکن.' },
    stats: [
      { value: '۰۵+', label: 'پروژه منتخب در ویترین' },
      { value: '۰۲', label: 'زبان، یک تجربه' },
      { value: '۱۰۰٪', label: 'آرت کاملاً اورجینال' },
    ],
    alt: 'کاراکتر اصلی',
  },
  about: {
    label: 'درباره ما',
    statement: 'ما استودیویی خلاق هستیم که برای بازی‌ها کاراکتر و جهان می‌سازد.',
    statement2: 'هر کاراکتر با داستان، سبک و قدرت پنهان خودش ساخته می‌شود.',
    tags: ['کاراکتر #۰۱', 'کاراکتر #۰۲'],
    cards: [
      { label: 'کلاس', value: 'پیشرو', alt: 'کارت کاراکتر اول' },
      { label: 'کلاس', value: 'مدافع', alt: 'کارت کاراکتر دوم' },
      { label: 'کلاس', value: 'سایه', alt: 'کارت کاراکتر سوم' },
    ],
  },
  features: {
    label: 'چه می‌سازیم',
    title: 'قفل خلاقیت را باز کنید',
    text: 'یک مسیر کامل خلاقانه برای بازی‌ها؛ از اولین طرح تا روز رونمایی.',
    items: [
      { title: 'کاراکترهایی با روح', text: 'قهرمان‌ها و شخصیت‌های منفی؛ از سایه‌نما تا رندر نهایی.', alt: 'نمونه طراحی کاراکتر' },
      { title: 'آرت بازی و کی‌آرت', text: 'جهان‌ها، محیط‌ها و تصاویر رونمایی که اسکرول را متوقف می‌کنند.', alt: 'نمونه آرت بازی' },
      { title: 'برندینگ گیمینگ', text: 'لوگو، هویت و سیستم بصری که به اندازه خود بازی پرانرژی است.', alt: 'نمونه برندینگ گیمینگ' },
    ],
    cardCta: {
      title: 'آماده پیوستن به قبیله هستید؟',
      text: 'بازی، کاراکتر یا رونمایی‌تان را بیاورید؛ ما جهانش را می‌سازیم.',
      button: 'شروع پروژه',
    },
  },
  signature: {
    label: 'امضای ما',
    title: 'هنر سایه‌ها',
    text: 'هر پروژه چهار تخصص را در یک سبک قابل‌شناسایی ترکیب می‌کند.',
    stats: [
      { value: '2D', label: 'تصویرسازی' },
      { value: '3D', label: 'رندر' },
      { value: 'UI', label: 'رابط بازی' },
      { value: 'FX', label: 'موشن و افکت' },
    ],
    alt: 'کاراکتر شاخص',
  },
  steps: {
    label: 'چطور کار می‌کند',
    title: 'پروژه‌تان را در ۳ قدم شروع کنید',
    text: 'مسیری ساده و شفاف از ایده تا آرت آماده بازی.',
    items: [
      { title: 'ایده‌تان را بگویید', text: 'درباره بازی، کاراکتر یا کمپین‌تان برایمان بنویسید.' },
      { title: 'طراحی و بازبینی', text: 'با هم طرح می‌زنیم، اصلاح می‌کنیم و صیقل می‌دهیم.' },
      { title: 'رونمایی با هم', text: 'فایل‌های نهایی، آماده برای بازیکن‌ها تحویل می‌شود.' },
    ],
    boxLabel: 'آدرس ما را بردارید و ماجراجویی‌تان را در سایه‌ها شروع کنید!',
    boxEmpty: 'ایمیل تماس به‌زودی',
    copy: 'کپی',
    copied: 'کپی شد!',
  },
  roadmap: {
    label: 'فرایند',
    title: 'از طرح اولیه تا رونمایی',
    phase: 'مرحله',
    items: [
      { title: 'ایده‌پردازی', points: ['بریف، رفرنس‌ها و اهداف', 'مودبورد و جهت هنری', 'اولین سایه‌نماها'] },
      { title: 'طراحی کاراکتر', points: ['نماهای چرخشی و حالت‌های چهره', 'رنگ و لباس', 'جزئیات امضادار'] },
      { title: 'جهان‌سازی', points: ['محیط‌ها و اشیا', 'نور و فضا', 'ترکیب‌بندی کی‌آرت'] },
      { title: 'تولید', points: ['رندرها و فایل‌های نهایی', 'المان‌های برند و رابط', 'موشن و افکت'] },
      { title: 'رونمایی', points: ['تصاویر کمپین', 'قالب‌های وب و شبکه‌های اجتماعی', 'پشتیبانی پس از انتشار'] },
    ],
  },
  team: {
    label: 'شخصیت‌ها',
    title: 'با گروه آشنا شوید',
    text: 'شخصیت‌های پشت کار؛ آن‌ها را با گروه خودتان جایگزین کنید.',
    members: [
      { name: 'کاراکتر ۰۱', role: 'نقش یا عنوان', alt: 'پرتره اول گروه' },
      { name: 'کاراکتر ۰۲', role: 'نقش یا عنوان', alt: 'پرتره دوم گروه' },
      { name: 'کاراکتر ۰۳', role: 'نقش یا عنوان', alt: 'پرتره سوم گروه' },
    ],
  },
  faq: {
    label: 'سؤالات',
    title: 'سؤالات متداول',
    text: 'پاسخ رایج‌ترین سؤال‌ها اینجاست.',
    items: [
      { q: 'چه چیزهایی می‌سازید؟', a: 'کاراکتر، آرت بازی، کی‌آرت، هویت بصری برندهای گیمینگ و تجربه‌های دیجیتال برای بازی‌ها.' },
      { q: 'چطور پروژه را شروع کنم؟', a: 'توضیح کوتاهی از ایده‌تان بفرستید. با چند سؤال و یک برنامه پیشنهادی پاسخ می‌دهیم.' },
      { q: 'دوبعدی و سه‌بعدی کار می‌کنید؟', a: 'بله؛ سبک هر پروژه متناسب با بازی، تیم و پلتفرم انتخاب می‌شود.' },
      { q: 'هر پروژه چقدر طول می‌کشد؟', a: 'به اندازه پروژه بستگی دارد. بعد از اولین گفتگو، پیش از شروع کار یک زمان‌بندی مشخص دریافت می‌کنید.' },
      { q: 'کمپین رونمایی را هم انجام می‌دهید؟', a: 'بله. می‌توانیم آرت را به تصاویر کمپین و قالب‌های وب و شبکه‌های اجتماعی گسترش دهیم.' },
    ],
  },
  cta: {
    label: 'شروع کنید',
    title: 'همین امروز پروژه‌تان را شروع کنید!',
    text: 'به قبیله بپیوندید؛ از بازی‌تان بگویید تا کاراکترهایش را زنده کنیم.',
    button: 'پیوستن به قبیله',
    alt: 'کاراکترهای بنر پایانی',
  },
  footer: {
    tagline: 'ساخته‌شده در سایه‌ها، برای بازیکن‌ها.',
    studio: 'استودیو',
    quick: 'لینک‌های سریع',
    language: 'زبان',
    rights: 'تمامی حقوق محفوظ است.',
    contactPending: 'اطلاعات تماس به‌زودی.',
  },
  backToTop: 'بازگشت به بالا',
  a11y: { placeholder: 'جای تصویر', language: 'زبان', logo: 'خانه', open: 'نمایش یا بستن پاسخ', scenery: 'منظره تزئینی' },
};

export const translations: Record<Lang, Dictionary> = { en, fa };
