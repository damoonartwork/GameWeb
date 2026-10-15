import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource-variable/inter';
import '@fontsource-variable/vazirmatn';
import './styles/global.css';
import { App } from './App';
import { LanguageProvider } from './i18n/LanguageContext';
import { CartProvider, FilterProvider } from './store/CartContext';
import { applyFonts } from './lib/customFonts';

// Fonts dropped into the project's fonts/ folder override the built-in ones (see fonts/README.txt).
applyFonts();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <CartProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </CartProvider>
    </LanguageProvider>
  </StrictMode>,
);
