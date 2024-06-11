<script setup lang="ts">
import { ref, toRefs } from "vue";
import { Post, deletePost } from "@/api/posts.api";
import { convertUTCToLocalTime } from "@/utils/date.util";
import Button from "primevue/button";
import Menu from "primevue/menu";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";

const props = defineProps<{
  post: Omit<Post, "content">;
  projectId: string;
}>();

const { projectId } = toRefs(props);

const router = useRouter();
const toast = useToast();

const menu = ref<InstanceType<typeof Menu> | undefined>(undefined);
function toggle(event: MouseEvent) {
  menu.value?.toggle(event);
}

async function del(postId: string) {
  await deletePost(postId);
  toast.add({
    severity: "success",
    summary: "Post Deleted",
    detail: "Post has been deleted successfully.",
    life: 3000,
  });

  // NOTE: 삭제 후 어떻게 처리 방식 
  // 1. 삭제 후 새로고침 (API 콜 필요)
  // 2. 삭제 후 삭제된 아이템의 it emit을 한 다음 PostList.vue에서 삭제 (API 콜 필요 X)
}

const items = ref([
  {
    label: "Edit",
    icon: "pi pi-pen-to-square",
    command: () => {
      router.push({
        name: "projects/[projectId]/posts/[postId]/edit",
        params: {
          projectId: projectId.value,
          postId: props.post.id,
        },
      });
    },
  },
  {
    label: "Remove",
    icon: "pi pi-trash",
    command: () => {
      del(props.post.id);
    },
  },
]);
</script>

<template>
  <div class="bg-[--surface-card] rounded-md py-6 px-6">
    <div class="flex gap-3 items-center">
      <div>
        <router-link
          :to="{
            name: 'projects/[projectId]/posts/[postId]',
            params: {
              projectId: projectId,
              postId: post.id,
            },
          }"
          class="hover:underline"
        >
          {{ post.title }}
        </router-link>
      </div>
      <div class="flex-grow"></div>
      <div class="flex-shrink-0 text-sm text-[--surface-400]">
        {{ convertUTCToLocalTime(post.createdAt) }}
      </div>
      <div>
        <Button
          text
          icon="pi pi-ellipsis-v"
          size="small"
          @click="(e) => toggle(e)"
        />
        <Menu ref="menu" :model="items" popup />
      </div>
    </div>
  </div>
</template>
