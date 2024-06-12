<script setup lang="ts">
import { deleteProject, type Project } from "@/api/projects.api";
import { useConfirm } from "primevue/useconfirm";
import Button from "primevue/button";

defineProps<{
  project: Project;
}>();

// delete가 완료되었음을 부모에게 알리기 위함
const emit = defineEmits<{
  deleted: [];
}>();

const confirm = useConfirm();

async function confirmToDelete(projectId: string) {
  await deleteProject(projectId);
  emit("deleted");
}

function handleDelete(event: MouseEvent, project: Project) {
  confirm.require({
    target: event.currentTarget as HTMLElement,
    message: "Are you sure you want to delete this project?",
    accept: () => {
      confirmToDelete(project.id);
    },
  });
}
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
