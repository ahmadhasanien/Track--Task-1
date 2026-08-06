import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PackageProvider } from './context/PackageContext';
import { TenantProvider } from './context/TenantContext';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PackageProvider>
      <TenantProvider>
        <App />
      </TenantProvider>
    </PackageProvider>
  </StrictMode>,
);
