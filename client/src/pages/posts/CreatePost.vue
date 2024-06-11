<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { createReusableTemplate } from "@vueuse/core";
import { createPost } from "@/api/posts.api";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Editor from "primevue/editor";

const [DefineTemplate, FormField] = createReusableTemplate();

const toast = useToast();
const route = useRoute();
const router = useRouter();
const projectIdParam = computed(() => route.params.projectId.toString());

const title = ref("");
const content = ref("");

const loading = ref(false)

async function submit() {
  try {
    loading.value = true;
    await createPost(projectIdParam.value, {
      title: title.value,
      content: content.value,
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
    
  } catch(error) {
    toast.add({
      severity: "error",
      summary: "Form Validation Error",
      detail: (error as Error).message,
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
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
            :loading="loading"
            @click="() => submit()"
          />
        </div>
      </div>
    </form>
  </div>
</template>
