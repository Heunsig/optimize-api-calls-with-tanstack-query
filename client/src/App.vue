<script setup lang="ts">
import Toast from 'primevue/toast';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { onErrorCaptured } from 'vue';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

onErrorCaptured((error) => {
  if (error instanceof UnauthorizedError) {
    router.push({
      name: 'signin',
      query: {
        redirect: route.fullPath
      }
    })
  }

  return false;
});
</script>

<template>
  <router-view />
  <Toast 
    :pt="{
      content: {
        class: 'border-none'
      }
    }"
  />
  <VueQueryDevtools/>
</template>

