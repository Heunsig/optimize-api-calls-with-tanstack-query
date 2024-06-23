<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { createReusableTemplate } from "@vueuse/core";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { updatePost } from "@/api/posts.api";
import { useToast } from "primevue/usetoast";
import { usePostById } from "@/composables/usePostById";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Editor from "primevue/editor";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const [DefineTemplate, FormField] = createReusableTemplate();

const queryClient = useQueryClient();
const toast = useToast();
const route = useRoute();
const router = useRouter();
const projectIdParam = computed(() => route.params.projectId.toString());
const postIdParam = computed(() => route.params.postId.toString());

const title = ref("");
const content = ref("");

// 이렇게도 사용 가능할 것 같음 (참고용)
// queryClient.resetQueries({
//   queryKey: ["post", postIdParam],
//   exact: true,
// });

const { data: post } = usePostById(postIdParam);
watch(post, async post => {
  if (post) {
    title.value = post.title;
    content.value = post.content;
  }
}, { immediate: true });

const { mutate, isPending } = useMutation({
  mutationFn: async (payload: {
    postId: string;
    title: string;
    content: string;
  }) => {
    const { postId, ..._payload } = payload;
    return await updatePost(postId, _payload);
  },
  onSuccess: async () => {
    await queryClient.refetchQueries({
      queryKey: ["posts", projectIdParam],
      exact: true,
    });

    await queryClient.invalidateQueries({
      queryKey: ["post", postIdParam],
      exact: true,
      refetchType: 'none'
    });

    toast.add({
      severity: "success",
      summary: "Post Updated",
      detail: "Post has been updated successfully.",
      life: 3000,
    });

    router.push({
      name: "projects/[projectId]/posts",
      params: {
        projectId: projectIdParam.value,
      },
    });
  },
  onError: (error) => {
    toast.add({
      severity: "error",
      summary: "Form Validation Error",
      detail: error.message,
      life: 3000,
    });
  },
});

function submit() {
  mutate({
    postId: postIdParam.value,
    title: title.value,
    content: content.value,
  });
}
</script>
<template>
  <DefineTemplate v-slot="{ $slots }">
    <div class="flex flex-col gap-2">
      <component :is="$slots.default" />
    </div>
  </DefineTemplate>
  <DefaultLayout>
    <div>
      <div class="mb-6">
        <router-link
          :to="{
            name: 'projects/[projectId]/posts',
            params: {
              projectId: projectIdParam,
            },
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
      <form @submit.prevent>
        <div class="flex flex-col gap-8 bg-[--surface-card] p-8 rounded-md">
          <FormField>
            <label for="title">Title</label>
            <InputText
              v-model="title"
              type="text"
              placeholder="Title"
              id="title"
            />
          </FormField>
          <FormField>
            <label for="content">Content</label>
            <Editor v-model="content" editorStyle="height: 320px" id="content" />
          </FormField>
          <div>
            <Button
              type="submit"
              label="Submit"
              :loading="isPending"
              @click="() => submit()"
            />
          </div>
        </div>
      </form>
    </div>
  </DefaultLayout>
</template>
