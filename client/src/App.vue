<script setup lang="ts">
import Toast from 'primevue/toast';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <div 
    class="w-full sm:w-2/5 sm:max-w-[50rem] sm:min-w-[35rem] m-auto px-4 py-6">
    <router-view/>

    <Toast 
      :pt="{
        content: {
          class: 'border-none'
        }
      }"
    />
  </div>
  <VueQueryDevtools/>
</template>

