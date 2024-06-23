<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useProjects } from "@/composables/useProjects";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import ManageProjectDialog from "@/components/project/ManageProjectDialog.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { Nullable } from "primevue/ts-helpers";

const router = useRouter();

const selectedProject = ref<string | null>(null);

const { data: projects, error, isPending } = useProjects();

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

const manageProjectDialogRef =
  ref<Nullable<InstanceType<typeof ManageProjectDialog>>>(undefined);
function openManageProjectDialog() {
  manageProjectDialogRef.value?.toggleDialog(true);
}


</script>

<template>
  <DefaultLayout
    :error="error"
  >
    <div class="h-screen -my-6 flex items-center justify-center">
      <div class="flex flex-col gap-2 w-80">
        <div class="flex items-center">
          <label for="project" class="text-lg">Project</label>
          <div class="flex-grow"></div>
          <Button
            icon="pi pi-cog"
            size="small"
            text
            rounded
            @click="() => openManageProjectDialog()"
          />
        </div>
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
          :loading="isPending"
        />
      </div>
    </div>
  </DefaultLayout>

  <ManageProjectDialog ref="manageProjectDialogRef" />
</template>
