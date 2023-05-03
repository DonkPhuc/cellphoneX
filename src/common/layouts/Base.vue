<template>
  <div class="h-full w-full">
    <VHeader />

    <main class="overflow-y-hidden pb-10 pt-14">
      <RouterView />
    </main>

    <div class="hidden md:flex">
      <VFooter />
    </div>
  </div>
</template>
