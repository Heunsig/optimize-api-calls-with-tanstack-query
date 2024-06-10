<script setup lang="ts">
import { computed } from "vue";
import { useProjects } from "@/composables/useProjects";
import Button from "primevue/button";
import { useRoute } from "vue-router";
import { usePosts } from "@/composables/usePosts";
import { convertUTCToLocalTime } from "@/utils/date.util";

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
      <div
        v-for="post in posts" :key="post.id"
        class="bg-[--surface-card] rounded-md py-6 px-6"
      >
        <div class="flex justify-between gap-3">
          <div>
            <router-link
              :to="{
                name: 'projects/[projectId]/posts/[postId]',
                params: {
                  projectId: projectIdParam,
                  postId: post.id,
                }
              }"
              class="hover:underline"
            >
              {{ post.title }}
            </router-link>
          </div>
          <div class="flex-shrink-0">{{ convertUTCToLocalTime(post.createdAt) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
