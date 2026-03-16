import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { TabCloakProvider } from './context/TabCloakContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TabCloakProvider>
      <App />
    </TabCloakProvider>
  </StrictMode>,
);
