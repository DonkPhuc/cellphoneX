/**
 * Copyright (c) 2023
 *
 * @summary
 * @author kiet.trac <kiet.trac@gss-sol.com>
 *
 * Created at     : 2023-04-14
 * Last modified  : 2023-04-14
 */
import { vMaska } from 'maska';

import type { UserModule } from '~/types';

export const install: UserModule = ({ app }) => {
  app.directive('maska', vMaska);
};
