<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useProjects } from "@/composables/useProjects";
import { usePosts } from "@/composables/usePosts";
import Button from "primevue/button";
import PostListItem from "@/components/post/PostListItem.vue";

const route = useRoute();
const projectIdParam = computed(() => route.params.projectId.toString());

const { data: projects } = useProjects();
const projectName = computed(
  () =>
    projects.value?.find((p) => p.id === projectIdParam.value)?.name ??
    "Unknown"
);

const { data: posts } = usePosts(projectIdParam);
</script>
<template>
  <div>
    <div class="mb-6">
      <router-link
        :to="{
          name: 'projects',
        }"
      >
        <Button
          label="Projects"
          text
          size="small"
          icon="pi pi-angle-left"
          class="px-2"
        />
      </router-link>
    </div>
    <div class="flex justify-between mb-3">
      <h1 class="text-lg font-bold">{{ projectName }}</h1>
      <router-link
        :to="{
          name: 'projects/[projectId]/posts/create',
          params: { projectId: projectIdParam },
        }"
      >
        <Button label="New Post" size="small"/>
      </router-link>
    </div>
    <div class="flex flex-col gap-2">
      <PostListItem 
        v-for="post in posts" :key="post.id"
        :post="post"
        :projectId="projectIdParam"
      />
    </div>
  </div>
</template>
