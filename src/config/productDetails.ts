/**
 * PRODUCT PAGE CONTENT — description, highlights and specs per product id (see store.ts).
 *
 * ⚠️ Starter copy only: general descriptions written so each page has something to show.
 *    Check every line against the exact model you sell (region, storage, edition, warranty)
 *    before publishing. A product with no entry here still gets a page, with a short
 *    description built from its category.
 *
 * Extra gallery images: add `product-<id>-2`, `product-<id>-3`, … to src/assets/images/
 * and they appear as thumbnails on that product's page automatically.
 */
import type { L10n } from './store';

export type ProductDetails = {
  description: L10n;
  highlights: L10n[];
  specs: { label: L10n; value: L10n }[];
};

const s = (en: string, fa: string): L10n => ({ en, fa });
const spec = (label: L10n, value: L10n) => ({ label, value });

// shared spec labels
const L = {
  platform: s('Platform', 'پلتفرم'),
  type: s('Type', 'نوع'),
  connection: s('Connection', 'اتصال'),
  color: s('Color', 'رنگ'),
  delivery: s('Delivery', 'نحوه تحویل'),
  inBox: s('In the box', 'محتویات جعبه'),
};

export const productDetails: Record<string, ProductDetails> = {
  'ps5-slim': {
    description: s(
      'The slimmer PlayStation 5: the same next-gen performance in a smaller body, with ultra-fast SSD loading and the DualSense controller in the box.',
      'نسخه باریک‌تر پلی‌استیشن ۵؛ همان قدرت نسل جدید در بدنه‌ای کوچک‌تر، با بارگذاری بسیار سریع SSD و دسته دوال‌سنس داخل جعبه.',
    ),
    highlights: [
      s('Smaller, lighter design than the original PS5', 'طراحی کوچک‌تر و سبک‌تر از PS5 اولیه'),
      s('Fast SSD for near-instant loading', 'حافظه SSD سریع برای بارگذاری تقریباً آنی'),
      s('DualSense controller with haptic feedback included', 'همراه با دسته دوال‌سنس با بازخورد لمسی'),
      s('Plays PS5 and most PS4 games', 'اجرای بازی‌های PS5 و بیشتر بازی‌های PS4'),
    ],
    specs: [
      spec(L.platform, s('PlayStation 5', 'پلی‌استیشن ۵')),
      spec(L.type, s('Home console', 'کنسول خانگی')),
      spec(L.inBox, s('Console, DualSense controller, cables', 'کنسول، دسته دوال‌سنس، کابل‌ها')),
    ],
  },
  'xbox-series-x': {
    description: s(
      "Microsoft's most powerful Xbox: 4K gaming, quick resume between games and access to Game Pass.",
      'قدرتمندترین ایکس‌باکس مایکروسافت؛ بازی با کیفیت 4K، جابه‌جایی سریع بین بازی‌ها و دسترسی به گیم‌پس.',
    ),
    highlights: [
      s('Built for 4K gaming', 'ساخته‌شده برای بازی با کیفیت 4K'),
      s('Quick Resume to jump between several games', 'قابلیت Quick Resume برای جابه‌جایی بین چند بازی'),
      s('Works with Xbox Game Pass', 'سازگار با اشتراک ایکس‌باکس گیم‌پس'),
      s('Wireless controller included', 'همراه با دسته بی‌سیم'),
    ],
    specs: [
      spec(L.platform, s('Xbox Series X|S', 'ایکس‌باکس سری X|S')),
      spec(L.type, s('Home console', 'کنسول خانگی')),
      spec(L.inBox, s('Console, wireless controller, cables', 'کنسول، دسته بی‌سیم، کابل‌ها')),
    ],
  },
  'switch-oled': {
    description: s(
      'Play at home on the TV or anywhere in handheld mode, now with a vivid OLED screen and a wide adjustable stand.',
      'روی تلویزیون در خانه یا به‌صورت دستی در هر جا بازی کنید؛ حالا با صفحه OLED پرجلوه و پایه قابل تنظیم.',
    ),
    highlights: [
      s('Vibrant OLED screen', 'صفحه نمایش OLED با رنگ‌های زنده'),
      s('TV, tabletop and handheld modes', 'حالت‌های تلویزیون، رومیزی و دستی'),
      s('Detachable Joy-Con controllers', 'دسته‌های جداشدنی جوی‌کان'),
      s('Dock with wired LAN port', 'داک با پورت شبکه سیمی'),
    ],
    specs: [
      spec(L.platform, s('Nintendo Switch', 'نینتندو سوییچ')),
      spec(L.type, s('Hybrid console', 'کنسول هیبریدی')),
      spec(L.inBox, s('Console, Joy-Con, dock, cables', 'کنسول، جوی‌کان، داک، کابل‌ها')),
    ],
  },
  dualsense: {
    description: s(
      'The PS5 controller that you can feel: haptic feedback and adaptive triggers bring every action to your hands.',
      'دسته‌ای که بازی را حس می‌کنید؛ بازخورد لمسی و ماشه‌های تطبیقی هر اتفاق بازی را به دستان شما می‌رسانند.',
    ),
    highlights: [
      s('Haptic feedback', 'بازخورد لمسی (Haptic)'),
      s('Adaptive triggers', 'ماشه‌های تطبیقی'),
      s('Built-in microphone and touchpad', 'میکروفون داخلی و تاچ‌پد'),
      s('Rechargeable battery via USB-C', 'باتری شارژی با درگاه USB-C'),
    ],
    specs: [
      spec(L.platform, s('PlayStation 5, PC', 'پلی‌استیشن ۵، کامپیوتر')),
      spec(L.connection, s('Bluetooth / USB-C', 'بلوتوث / USB-C')),
      spec(L.color, s('White', 'سفید')),
    ],
  },
  dualshock4: {
    description: s(
      'The classic PlayStation 4 controller with touchpad, light bar and built-in speaker.',
      'دسته کلاسیک پلی‌استیشن ۴ با تاچ‌پد، نوار نوری و اسپیکر داخلی.',
    ),
    highlights: [
      s('Touchpad and light bar', 'تاچ‌پد و نوار نوری'),
      s('Built-in speaker and headset jack', 'اسپیکر داخلی و جک هدست'),
      s('Rechargeable battery', 'باتری شارژی'),
    ],
    specs: [
      spec(L.platform, s('PlayStation 4, PC', 'پلی‌استیشن ۴، کامپیوتر')),
      spec(L.connection, s('Bluetooth / Micro-USB', 'بلوتوث / Micro-USB')),
      spec(L.color, s('Black', 'مشکی')),
    ],
  },
  'xbox-controller': {
    description: s(
      'The Xbox Wireless Controller: textured grips, a hybrid D-pad and a share button, for Xbox and PC.',
      'دسته بی‌سیم ایکس‌باکس؛ دستگیره‌های بافت‌دار، دی‌پد هیبریدی و دکمه اشتراک‌گذاری، برای ایکس‌باکس و کامپیوتر.',
    ),
    highlights: [
      s('Textured grips', 'دستگیره‌های بافت‌دار'),
      s('Hybrid D-pad', 'دی‌پد هیبریدی'),
      s('Share button', 'دکمه اشتراک‌گذاری'),
      s('Works with Xbox and PC', 'سازگار با ایکس‌باکس و کامپیوتر'),
    ],
    specs: [
      spec(L.platform, s('Xbox Series X|S, Xbox One, PC', 'ایکس‌باکس سری X|S، ایکس‌باکس وان، کامپیوتر')),
      spec(L.connection, s('Xbox Wireless / Bluetooth / USB-C', 'Xbox Wireless / بلوتوث / USB-C')),
    ],
  },
  'game-ps5': {
    description: s(
      'A disc game for PlayStation 5. Replace this text with the real title, genre and edition you sell.',
      'بازی دیسکی برای پلی‌استیشن ۵. این متن را با نام، ژانر و نسخه واقعی بازی جایگزین کنید.',
    ),
    highlights: [s('Physical disc', 'نسخه فیزیکی (دیسک)'), s('For PlayStation 5', 'مخصوص پلی‌استیشن ۵')],
    specs: [spec(L.platform, s('PlayStation 5', 'پلی‌استیشن ۵')), spec(L.type, s('Disc', 'دیسک'))],
  },
  'game-xbox': {
    description: s(
      'A disc game for Xbox. Replace this text with the real title, genre and edition you sell.',
      'بازی دیسکی برای ایکس‌باکس. این متن را با نام، ژانر و نسخه واقعی بازی جایگزین کنید.',
    ),
    highlights: [s('Physical disc', 'نسخه فیزیکی (دیسک)'), s('For Xbox Series X|S', 'مخصوص ایکس‌باکس سری X|S')],
    specs: [spec(L.platform, s('Xbox Series X|S', 'ایکس‌باکس سری X|S')), spec(L.type, s('Disc', 'دیسک'))],
  },
  'charging-station': {
    description: s(
      'Charge two DualSense controllers at once — just click them into the dock, no cables to plug in.',
      'دو دسته دوال‌سنس را هم‌زمان شارژ کنید؛ فقط دسته‌ها را روی پایه بگذارید، بدون نیاز به وصل کردن کابل.',
    ),
    highlights: [
      s('Charges two controllers at once', 'شارژ هم‌زمان دو دسته'),
      s('Click-in design', 'طراحی جاگذاری آسان'),
      s('Keeps controllers tidy and ready', 'دسته‌ها مرتب و همیشه آماده'),
    ],
    specs: [spec(L.platform, s('DualSense (PS5)', 'دوال‌سنس (PS5)')), spec(L.type, s('Charging dock', 'پایه شارژ'))],
  },
  'ps5-case': {
    description: s(
      'A padded carry case to take your PS5 Slim, controllers and cables anywhere safely.',
      'کیف حمل ضربه‌گیر برای جابه‌جایی ایمن PS5 اسلیم، دسته‌ها و کابل‌ها.',
    ),
    highlights: [
      s('Padded protection', 'محافظت با لایه ضربه‌گیر'),
      s('Room for controllers and cables', 'جای مخصوص دسته‌ها و کابل‌ها'),
      s('Carry handle', 'دسته حمل'),
    ],
    specs: [spec(L.platform, s('PS5 Slim', 'PS5 اسلیم')), spec(L.type, s('Carry case', 'کیف حمل')), spec(L.color, s('Black', 'مشکی'))],
  },
  'xbox-battery': {
    description: s(
      'A rechargeable battery pack for Xbox controllers, with a USB-C cable for charging while you play.',
      'باتری شارژی برای دسته‌های ایکس‌باکس، همراه کابل USB-C برای شارژ هنگام بازی.',
    ),
    highlights: [
      s('No more disposable batteries', 'بی‌نیاز از باتری یک‌بارمصرف'),
      s('Charge while you play', 'شارژ هنگام بازی'),
      s('USB-C cable included', 'همراه کابل USB-C'),
    ],
    specs: [spec(L.platform, s('Xbox Series X|S, Xbox One controllers', 'دسته‌های ایکس‌باکس سری X|S و وان')), spec(L.inBox, s('Battery, USB-C cable', 'باتری، کابل USB-C'))],
  },
  'pulse-headset': {
    description: s(
      'A wireless gaming headset for long sessions: clear game audio, a noise-reducing mic and a comfortable fit.',
      'هدست گیمینگ بی‌سیم برای ساعت‌ها بازی؛ صدای شفاف، میکروفون با کاهش نویز و طراحی راحت.',
    ),
    highlights: [
      s('Wireless connection', 'اتصال بی‌سیم'),
      s('Noise-reducing microphone', 'میکروفون با کاهش نویز'),
      s('Comfortable for long sessions', 'راحت برای بازی‌های طولانی'),
    ],
    specs: [spec(L.type, s('Wireless headset', 'هدست بی‌سیم')), spec(L.connection, s('Wireless', 'بی‌سیم'))],
  },
  'ps-plus': {
    description: s(
      'PlayStation Plus membership: online multiplayer, monthly games and exclusive discounts on PlayStation Store.',
      'اشتراک پلی‌استیشن پلاس؛ بازی آنلاین چندنفره، بازی‌های ماهانه و تخفیف‌های ویژه فروشگاه پلی‌استیشن.',
    ),
    highlights: [
      s('Online multiplayer', 'بازی آنلاین چندنفره'),
      s('Monthly games', 'بازی‌های ماهانه'),
      s('Member discounts', 'تخفیف‌های ویژه اعضا'),
    ],
    specs: [
      spec(L.platform, s('PlayStation', 'پلی‌استیشن')),
      spec(L.delivery, s('Digital code', 'کد دیجیتال')),
    ],
  },
  'game-pass': {
    description: s(
      'Xbox Game Pass Ultimate: a large library of games for console and PC, online multiplayer and cloud gaming.',
      'ایکس‌باکس گیم‌پس آلتیمیت؛ کتابخانه بزرگ بازی برای کنسول و کامپیوتر، بازی آنلاین و بازی ابری.',
    ),
    highlights: [
      s('Hundreds of games on console and PC', 'صدها بازی روی کنسول و کامپیوتر'),
      s('Online multiplayer included', 'شامل بازی آنلاین چندنفره'),
      s('Cloud gaming', 'بازی ابری'),
    ],
    specs: [
      spec(L.platform, s('Xbox, PC', 'ایکس‌باکس، کامپیوتر')),
      spec(L.delivery, s('Digital code', 'کد دیجیتال')),
    ],
  },
  'steam-wallet': {
    description: s('Top up your Steam wallet to buy games, DLC and in-game items on Steam.', 'کیف پول استیم را شارژ کنید و بازی، DLC و آیتم‌های درون‌بازی بخرید.'),
    highlights: [s('Use on any Steam purchase', 'قابل استفاده برای هر خرید در استیم'), s('Great as a gift', 'هدیه‌ای مناسب برای گیمرها')],
    specs: [spec(L.platform, s('Steam (PC)', 'استیم (کامپیوتر)')), spec(L.delivery, s('Digital code', 'کد دیجیتال'))],
  },
  eshop: {
    description: s('Nintendo eShop credit for games and add-ons on Nintendo Switch.', 'اعتبار نینتندو ای‌شاپ برای خرید بازی و محتوای اضافه روی نینتندو سوییچ.'),
    highlights: [s('Buy digital Switch games', 'خرید بازی‌های دیجیتال سوییچ'), s('Add-ons and DLC', 'محتوای اضافه و DLC')],
    specs: [spec(L.platform, s('Nintendo Switch', 'نینتندو سوییچ')), spec(L.delivery, s('Digital code', 'کد دیجیتال'))],
  },
  'psn-card': {
    description: s('PlayStation Store credit for games, add-ons and subscriptions.', 'اعتبار فروشگاه پلی‌استیشن برای خرید بازی، محتوای اضافه و اشتراک.'),
    highlights: [s('Use on PlayStation Store', 'قابل استفاده در فروشگاه پلی‌استیشن'), s('Games, DLC and subscriptions', 'بازی، DLC و اشتراک')],
    specs: [spec(L.platform, s('PlayStation', 'پلی‌استیشن')), spec(L.delivery, s('Digital code', 'کد دیجیتال'))],
  },
  'cod-points': {
    description: s('Call of Duty Points (CP) for the battle pass, bundles and in-game items.', 'سی‌پی (CP) کالاف دیوتی برای بتل‌پس، باندل‌ها و آیتم‌های درون‌بازی.'),
    highlights: [s('Battle pass and bundles', 'بتل‌پس و باندل‌ها'), s('Delivered as a digital code', 'تحویل به‌صورت کد دیجیتال')],
    specs: [spec(L.type, s('In-game currency', 'ارز درون‌بازی')), spec(L.delivery, s('Digital code', 'کد دیجیتال'))],
  },
};
