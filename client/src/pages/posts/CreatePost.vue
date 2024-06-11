<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { createReusableTemplate } from "@vueuse/core";
import { useMutation } from "@tanstack/vue-query";
import { createPost } from "@/api/posts.api";
import { useToast } from "primevue/usetoast";
import { useQueryClient } from "@tanstack/vue-query";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Editor from "primevue/editor";

const [DefineTemplate, FormField] = createReusableTemplate();

const queryClient = useQueryClient();
const toast = useToast();
const route = useRoute();
const router = useRouter();
const projectIdParam = computed(() => route.params.projectId.toString());

const title = ref("");
const content = ref("");

const { mutate, isPending } = useMutation({
  mutationFn: async (payload: {
    projectId: string;
    title: string;
    content: string;
  }) => {
    const { projectId, ..._payload } = payload;
    return await createPost(projectId, _payload);
  },
  onSuccess: () => {
    queryClient.refetchQueries({
      queryKey: ["posts", projectIdParam],
      exact: true,
    });

    toast.add({
      severity: "success",
      summary: "Post Created",
      detail: "Post has been created successfully.",
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
    projectId: projectIdParam.value,
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
</template>
