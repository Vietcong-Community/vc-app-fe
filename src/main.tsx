import dayjs from 'dayjs';
import 'dayjs/locale/cs';
import { createRoot } from 'react-dom/client';

import { App } from './app';
import './css/global.css';
import { LanguageProvider } from './providers/LanguageProvider/LanguageProvider';
import { NotificationsProvider } from './providers/NotificationsProvider/NotificationsProvider';
import { ReactQueryProvider } from './providers/ReactQueryProvider/ReactQueryProvider';
import { ThemeProvider } from './providers/ThemeProvider/ThemeProvider';

dayjs.locale('cs');

createRoot(document.getElementById('root')!).render(
  <ReactQueryProvider>
    <ThemeProvider>
      <LanguageProvider>
        <NotificationsProvider>
          <App />
        </NotificationsProvider>
      </LanguageProvider>
    </ThemeProvider>
  </ReactQueryProvider>,
);
