import { useEffect, useRef, useState } from 'react';
import { About } from './components/About';
import { BackToTop } from './components/BackToTop';
import { CtaBanner } from './components/CtaBanner';
import { ControllerSpin } from './components/ControllerSpin';
import { Faq } from './components/Faq';
import { FontLab } from './components/FontLab';
import { Footer } from './components/Footer';
import { GridLines } from './components/GridLines';
import { Hero } from './components/Hero';
import { Navigation } from './components/Navigation';
import { Roadmap } from './components/Roadmap';
import { Steps } from './components/Steps';
import { Budget } from './components/store/Budget';
import { CartDrawer } from './components/store/CartDrawer';
import { Categories } from './components/store/Categories';
import { Deals } from './components/store/Deals';
import { Digital } from './components/store/Digital';
import { Platforms } from './components/store/Platforms';
import { Shop } from './components/store/Shop';
import { ProductPage } from './components/store/ProductPage';
import { takePendingSection, useRoute } from './lib/router';
import { jumpTo, scrollToTarget } from './lib/scroll';
import { assetUrl, criticalAssets } from './config/assets';
import { ScrollTrigger } from './lib/gsap';
import { initSmoothScroll } from './lib/scroll';
import { useLanguage } from './i18n/LanguageContext';
import { brand } from './config/brand';

const LIME: [number, number, number] = [218, 255, 18];

const MAX_WAIT = 2500; // ms — the reference has no loading screen, so never hold the intro for long

function loadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = img.onerror = () => resolve();
    img.src = src;
  });
}

export function App() {
  const [introReady, setIntroReady] = useState(false);
  const route = useRoute();
  const { lang, t } = useLanguage();
  const first = useRef(true);

  // page switches: top of the new page (or the section a nav link asked for), fresh triggers
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const section = takePendingSection();
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (route.name === 'home' && section) scrollToTarget(section);
      else jumpTo(0);
    });
    if (route.name === 'home') document.title = `${lang === 'fa' ? brand.nameFa : brand.name} — ${t.meta.title}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.name === 'product' ? route.id : 'home']);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    const stop = initSmoothScroll();

    // Like the reference: no preloader screen. The hero starts dim and its intro plays as soon as
    // fonts + hero images are ready (capped), so nothing pops in half-loaded.
    const jobs: Promise<unknown>[] = [document.fonts.ready];
    for (const key of criticalAssets) {
      const url = assetUrl(key);
      if (url) jobs.push(loadImage(url));
    }
    const timeout = new Promise((r) => window.setTimeout(r, MAX_WAIT));
    Promise.race([Promise.all(jobs), timeout]).then(() => {
      document.documentElement.classList.remove('is-loading');
      setIntroReady(true);
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    return () => {
      stop();
      window.removeEventListener('load', onLoad);
    };
  }, []);

  return (
    <>
      <GridLines className="page-grid" spacing={240} line="rgba(255,255,255,0.03)" glow={LIME} streaks={11} intensity={0.7} />
      <Navigation introReady={introReady} />
      <main id="main" tabIndex={-1}>
        {route.name === 'product' ? (
          <ProductPage id={route.id} />
        ) : (
          <>
            <Hero introReady={introReady} />
            <Categories />
            <Deals />
            <Digital />
            <About />
            <Budget />
            <Shop />
            <Steps />
            <Roadmap />
            <ControllerSpin />
            <Platforms />
            <Faq />
            <CtaBanner />
          </>
        )}
      </main>
      <Footer />
      <BackToTop />
      <CartDrawer />
      {import.meta.env.DEV && <FontLab />}
    </>
  );
}
