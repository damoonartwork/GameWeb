import { useEffect, useState } from 'react';
import { About } from './components/About';
import { Cta } from './components/Cta';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Navigation } from './components/Navigation';
import { Preloader } from './components/Preloader';
import { Projects } from './components/Projects';
import { Showcase } from './components/Showcase';
import { ScrollTrigger } from './lib/gsap';
import { initSmoothScroll, lockScroll } from './lib/scroll';

export function App() {
  const [introReady, setIntroReady] = useState(false);
  const [loaderGone, setLoaderGone] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    const stop = initSmoothScroll();
    lockScroll(true);
    // Late-loading images/fonts can change heights: keep trigger positions honest.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    document.fonts?.ready.then(onLoad);
    return () => {
      stop();
      window.removeEventListener('load', onLoad);
    };
  }, []);

  const reveal = () => {
    document.documentElement.classList.remove('is-loading');
    lockScroll(false);
    setIntroReady(true);
  };

  return (
    <>
      <div className="grain" aria-hidden="true" />
      {!loaderGone && <Preloader onReveal={reveal} onDone={() => setLoaderGone(true)} />}
      <Navigation introReady={introReady} />
      <main id="main" tabIndex={-1} aria-busy={!introReady}>
        <Hero introReady={introReady} />
        <Marquee />
        <Projects />
        <About />
        <Showcase />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
