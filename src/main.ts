// register vue composition api globally
import 'font-awesome/css/font-awesome.min.css';
import '@vueform/multiselect/themes/default.css';
import './common/styles/style.css';

import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';
import { ViteSSG } from 'vite-ssg';

import App from './App.vue';
import type { UserModule } from './types';

const routes = setupLayouts(generatedRoutes);

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(App, { routes, base: import.meta.env.BASE_URL }, (ctx) => {
  // install all modules under `**/modules/`
  Object.values(
    import.meta.glob<{ install: UserModule }>('./**/modules/*.ts', {
      eager: true,
    })
  ).forEach((i) => i.install?.(ctx));
});
