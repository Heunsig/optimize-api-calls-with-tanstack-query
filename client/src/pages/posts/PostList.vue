<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import Button from "primevue/button";
import PostListItem from "@/components/post/PostListItem.vue";
import { Project, getProjects } from "@/api/projects.api";
import { Post, getPosts } from "@/api/posts.api";

const route = useRoute();
const projectIdParam = computed(() => route.params.projectId.toString());

const projects = ref<Array<Project>>([]);
const posts = ref<Array<Omit<Post, "content">>>([]);

// NOTE: project name을 찾는 방법
// 1. getProjects API 호출 후 projectId를 가지고 project name 찾기
// 2. 백엔드에서 Project name 정보 같이 내려주기
const projectName = computed(
  () =>
    projects.value?.find((p) => p.id === projectIdParam.value)?.name ??
    "Unknown"
);

async function init() {
  projects.value = await getProjects();
  posts.value = await getPosts(projectIdParam.value);
}

init();
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
        <Button label="New Post" size="small" />
      </router-link>
    </div>
    <div class="flex flex-col gap-2">
      <template v-if="!posts || posts.length === 0">
        <div
          class="text-center bg-[--surface-card] p-4 rounded-md text-[--surface-300]"
        >
          No posts found
        </div>
      </template>
      <template v-else>
        <PostListItem
          v-for="post in posts"
          :key="post.id"
          :post="post"
          :projectId="projectIdParam"
        />
      </template>
    </div>
  </div>
</template>
