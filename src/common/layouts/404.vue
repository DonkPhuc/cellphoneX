<script setup lang="ts">
const router = useRouter();
const { t } = useI18n();
</script>

<template>
  <div class="middle-box animated fadeInDown text-center">
    <h1>404</h1>
    <h3 class="font-bold">{{ t('not-found.title') }}</h3>

    <div class="error-desc">
      <RouterView />
      <form class="form-inline m-t justify-content-center" role="form">
        <div class="form-group">
          <input type="text" class="form-control" :placeholder="t('input-placeholder.search')" />
        </div>
        <button type="submit" class="btn btn-primary">{{ t('button.search') }}</button>
      </form>
    </div>
  </div>
</template>
