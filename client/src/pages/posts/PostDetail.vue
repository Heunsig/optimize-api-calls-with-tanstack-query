<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { usePostById } from "@/composables/usePostById";
import Button from "primevue/button";
import Skeleton from "primevue/skeleton";

const route = useRoute();
const postIdParam = computed(() => route.params.postId.toString());

const { data: post, isFetching } = usePostById(postIdParam);

</script>
<template>
  <div>
    <div class="mb-6">
      <router-link
        :to="{
          name: 'projects/[projectId]/posts',
        }"
      >
        <Button
          label="Posts"
          text
          size="small"
          icon="pi pi-angle-left"
          class="px-2"
        />
      </router-link>
    </div>
    <div>
      <template v-if="isFetching">
        <Skeleton height="1.5rem" width="20rem" class="mb-3" />
        <Skeleton height="1rem" width="10rem" class="mb-6"/>
        <Skeleton height="10rem" />
      </template>
      <template v-else-if="post">
        <h1 class="text-lg font-bold mb-3">{{ post.title }}</h1>
        <div class="mb-6">
          {{ post.createdAt }}
        </div>
        <div v-html="post.content"></div>
      </template>
      <template v-else>
        <div>Error</div>
      </template>
    </div>
  </div>
</template>