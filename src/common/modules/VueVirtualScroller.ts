// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
import VueVirtualScroller from 'vue-virtual-scroller';

import type { UserModule } from '~/types';

export const install: UserModule = ({ app }) => {
  app.use(VueVirtualScroller);
};
