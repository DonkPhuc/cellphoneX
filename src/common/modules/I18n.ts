// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
import messages from '@intlify/unplugin-vue-i18n/messages';
import { createI18n } from 'vue-i18n';

import type { UserModule } from '~/types';

export const install: UserModule = ({ app }) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    globalInjection: true,
    messages,
  });

  app.use(i18n);
};
