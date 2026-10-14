import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/anton/400.css';
import '@fontsource/lalezar/400.css';
import '@fontsource-variable/inter';
import '@fontsource-variable/vazirmatn';
import './styles/global.css';
import { App } from './App';
import { LanguageProvider } from './i18n/LanguageContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);
