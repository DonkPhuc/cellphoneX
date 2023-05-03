<script setup lang="ts">
import { isDark, preferredDark } from '~/common/composables';

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: '動態管理',
  meta: [
    { name: 'description', content: 'Uqey Rent Car' },
    {
      name: 'theme-color',
      content: '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg',
    },
  ],
});
</script>

<template>
  <RouterView />
</template>
