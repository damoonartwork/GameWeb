import { useEffect, useState } from 'react';
import { About } from './components/About';
import { BackToTop } from './components/BackToTop';
import { CtaBanner } from './components/CtaBanner';
import { Faq } from './components/Faq';
import { Features } from './components/Features';
import { FontLab } from './components/FontLab';
import { Footer } from './components/Footer';
import { GridLines } from './components/GridLines';
import { Hero } from './components/Hero';
import { Navigation } from './components/Navigation';
import { Roadmap } from './components/Roadmap';
import { Landscape } from './components/Scenery';
import { Signature } from './components/Signature';
import { Steps } from './components/Steps';
import { Team } from './components/Team';
import { assetUrl, criticalAssets } from './config/assets';
import { ScrollTrigger } from './lib/gsap';
import { initSmoothScroll } from './lib/scroll';

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
      <GridLines className="page-grid" spacing={240} line="rgba(255,255,255,0.03)" glow={LIME} streaks={5} intensity={0.55} />
      <Navigation introReady={introReady} />
      <main id="main" tabIndex={-1}>
        <Hero introReady={introReady} />
        <About />
        <Features />
        <Signature />
        <Steps />
        <Roadmap />
        <Landscape />
        <Team />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
      <BackToTop />
      {import.meta.env.DEV && <FontLab />}
    </>
  );
}
