<script setup lang="ts">
import { reactive, ref } from "vue";
import { useProjects } from "@/composables/useProjects";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import ConfirmPopup from "primevue/confirmpopup";
import ProjectItem from "./ProjectItem.vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { Project, createProject } from "@/api/projects.api";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const form = reactive({
  name: "",
});

const visible = ref(false);
function toggleDialog(value?: boolean) {
  visible.value = value ?? !visible.value;
}

const { data: projects } = useProjects();

const queryClient = useQueryClient();
const { mutate: submit, isPending } = useMutation({
  mutationFn: async () => {
    return await createProject({ name: form.name });
  },
  onSuccess: (data: { insertedId: string }) => {
    // 1. API 콜을 하지 않고 로컬 상태만 변경하는 방법
    // queryClient.setQueryData(["projects"], (old: Array<Project>) => {
    //   return [...old, { id: data.insertedId, name: form.name }];
    // });

    // 2. API 콜을 하고 로컬 상태를 변경하는 방법
    queryClient.invalidateQueries({
      queryKey: ["projects"],
      exact: true
    });

    form.name = "";
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

defineExpose({ toggleDialog });
</script>
<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Manage Project"
    :style="{ width: '50rem' }"
  >
    <div>
      <div class="flex flex-col gap-2">
        <label for="name">Name</label>
        <div class="flex items-center gap-2">
          <InputText id="name" v-model="form.name" class="flex-grow" />
          <Button 
            severity="secondary" 
            label="Add" 
            @click="() => submit()" 
            :loading="isPending"
          />
        </div>
      </div>
    </div>
    <div class="mt-6">
      <template v-if="projects?.length">
        <ProjectItem
          v-for="project in projects"
          :key="project.id"
          :project="project"
        />
      </template>
      <template v-else>
        <div class="text-center text-[--surface-400]">No projects found</div>
      </template>
      <ConfirmPopup></ConfirmPopup>
    </div>
  </Dialog>
</template>
