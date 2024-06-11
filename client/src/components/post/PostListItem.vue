<script setup lang="ts">
import { ref, toRefs } from "vue";
import { Post, deletePost } from "@/api/posts.api";
import { convertUTCToLocalTime } from "@/utils/date.util";
import Button from "primevue/button";
import Menu from "primevue/menu";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useToast } from "primevue/usetoast";

const props = defineProps<{
  post: Omit<Post, "content">;
  projectId: string;
}>();

const { projectId } = toRefs(props);

const toast = useToast();
const queryClient = useQueryClient();

const menu = ref<InstanceType<typeof Menu> | undefined>(undefined);
function toggle(event: MouseEvent) {
  menu.value?.toggle(event);
}

const { mutate } = useMutation({
  mutationFn: async (postId: string) => {
    return await deletePost(postId);
  },
  onSuccess: () => {
    queryClient.setQueryData(["posts", projectId.value], (data: Post[]) => {
      return data.filter((post) => post.id !== props.post.id);
    });

    toast.add({
      severity: "success",
      summary: "Post Deleted",
      detail: "Post has been deleted successfully.",
      life: 3000,
    });
  },
});

const items = ref([
  {
    label: "Edit",
    icon: "pi pi-pen-to-square",
  },
  {
    label: "Remove",
    icon: "pi pi-trash",
    command: () => {
      mutate(props.post.id);
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
