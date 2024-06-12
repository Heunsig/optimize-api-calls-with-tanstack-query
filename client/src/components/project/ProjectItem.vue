<script setup lang="ts">
import { deleteProject, type Project } from "@/api/projects.api";
import { useConfirm } from "primevue/useconfirm";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import Button from "primevue/button";

const confirm = useConfirm();

const queryClient = useQueryClient();
const { mutate: confirmToDelete } = useMutation({
  mutationFn: async (projectId: string) => {
    await deleteProject(projectId);
  },
  onSuccess: (_, projectId) => {
    queryClient.setQueryData(["projects"], (data: Project[] | undefined) => {
      return data?.filter((project) => project.id !== projectId);
    });
  },
  onError: (error) => {
    console.error(error);
  },
});

function handleDelete(event: MouseEvent, project: Project) {
  confirm.require({
    target: event.currentTarget as HTMLElement,
    message: "Are you sure you want to delete this project?",
    accept: () => {
      confirmToDelete(project.id);
    },
  });
}

defineProps<{
  project: Project;
}>();
</script>
<template>
  <div class="bg-[--surface-50] p-3 rounded-md my-2 flex items-center">
    <div class="font-semibold">
      {{ project.name }}
    </div>
    <div class="flex-grow"></div>
    <div>
      <Button
        severity="secondary"
        icon="pi pi-trash"
        text
        size="small"
        @click="(e) => handleDelete(e, project)"
      />
    </div>
  </div>
</template>
