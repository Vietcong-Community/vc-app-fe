import { ConfigProvider } from 'antd';
import locale from 'antd/locale/cs_CZ';
import dayjs from 'dayjs';
import 'dayjs/locale/cs';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import { App } from './app';
import './css/global.css';
import { LanguageProvider } from './providers/LanguageProvider/LanguageProvider';
import { NotificationsProvider } from './providers/NotificationsProvider/NotificationsProvider';
import { ReactQueryProvider } from './providers/ReactQueryProvider/ReactQueryProvider';
import { theme } from './theme/theme';

dayjs.locale('cs');

createRoot(document.getElementById('root')!).render(
  <ReactQueryProvider>
    <ConfigProvider
      locale={locale}
      theme={{
        token: {
          fontFamily: 'Poppins, serif',
        },
      }}
    >
      <LanguageProvider>
        <ThemeProvider theme={theme}>
          <NotificationsProvider>
            <App />
          </NotificationsProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ConfigProvider>
  </ReactQueryProvider>,
);
