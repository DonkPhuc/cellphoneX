<script setup lang="ts">
interface BreadcrumbItem {
  title: string;
  url?: string;
}

interface VBreadcrumbProps {
  items: BreadcrumbItem[];
}

const props = defineProps<VBreadcrumbProps>();
const { items } = toRefs(props);

const router = useRouter();

const breadcrumbItems = computed((): BreadcrumbItem[] => {
  return [
    {
      title: 'ホーム',
      url: '/',
    },
    ...items.value,
  ];
});

function handleClick(item: BreadcrumbItem, index: number) {
  if (breadcrumbItems.value.length - 1 !== index) {
    router.push(item.url || '/');
  }
}
</script>

<template>
  <nav class="bg-white px-4 py-2 text-sm text-gray-500" aria-label="Breadcrumb">
    <ol class="inline-flex items-center gap-2">
      <template v-for="(item, index) in breadcrumbItems" :key="index">
        <li class="inline-flex items-center gap-1 md:gap-2">
          <VIcon :icon="index === 0 ? 'fa-home' : 'fa-chevron-right'" />
          <a
            :class="breadcrumbItems.length - 1 === index ? 'font-bold' : 'cursor-pointer hover:text-primary'"
            @click="handleClick(item, index)"
          >
            {{ item.title }}
          </a>
        </li>
      </template>
    </ol>
  </nav>
</template>
