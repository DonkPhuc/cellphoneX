import Notifications from '@kyvg/vue3-notification';

import type { UserModule } from '~/types';

export const install: UserModule = ({ isClient, initialState, app }) => {
  app.use(Notifications);
};
