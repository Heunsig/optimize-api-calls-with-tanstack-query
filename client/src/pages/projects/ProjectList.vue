<script setup lang="ts">
import { ref } from "vue";
import Dropdown from "primevue/dropdown";
import { useRouter } from "vue-router";
import { useProjects } from "@/composables/useProjects";

const router = useRouter();

const selectedProject = ref<string | null>(null);

const { data: projects } = useProjects();

function handleChange() {
  if (selectedProject.value) {
    router.push({
      name: "projects/[projectId]/posts",
      params: {
        projectId: selectedProject.value,
      },
    });
  }
}
</script>

<template>
  <div class="h-screen -my-6 flex items-center justify-center">
    <div class="flex flex-col gap-2">
      <label for="project">Project</label>
      <Dropdown
        v-model="selectedProject"
        :options="projects"
        option-label="name"
        option-value="id"
        placeholder="Select a project"
        :pt="{
          root: {
            class: 'min-w-52',
          },
        }"
        @change="() => handleChange()"
        input-id="project"
      />
    </div>
  </div>
</template>
