<script setup lang="ts">
import { reactive, ref } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import ConfirmPopup from "primevue/confirmpopup";
import ProjectItem from "./ProjectItem.vue";
import { Project, createProject, getProjects } from "@/api/projects.api";
import { useToast } from "primevue/usetoast";


// 부모에게 projects 가 업데이트 되었음을 알리기 위함
// API 호출을 줄이고 싶다면 부모에게 _projects를 전달하고 부모에서 projects를 업데이트하는 방법 있음
// 지금은 편의상 event만 발생시킴
const emit = defineEmits<{
  'update:projects': []
}>()

const toast = useToast();
const _projects = ref<Project[]>([]);
const form = reactive({
  name: "",
});

const visible = ref(false);

// 오픈 할 때 projects를 받아오는 것이 까다로워짐
function toggleDialog(value?: boolean, projects?: Project[]) {
  visible.value = value ?? !visible.value;

  if (visible.value && projects) {
    _projects.value = projects;
  }
}

const loading = ref(false);
async function submit() {
  await createProject({ name: form.name });
  _projects.value = await getProjects();
  toast.add({
    severity: "success",
    summary: "Success",
    detail: "Project created",
  });

  form.name = "";
  emit('update:projects');
}

function removeProjectFromList(projectId: string) {
  _projects.value = _projects.value.filter((p) => p.id !== projectId);
  emit('update:projects');
}

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
            :loading="loading"
          />
        </div>
      </div>
    </div>
    <div class="mt-6">
      <template v-if="_projects?.length">
        <ProjectItem
          v-for="project in _projects"
          :key="project.id"
          :project="project"
          @deleted="() => removeProjectFromList(project.id)"
        />
      </template>
      <template v-else>
        <div class="text-center text-[--surface-400]">No projects found</div>
      </template>
      <ConfirmPopup></ConfirmPopup>
    </div>
  </Dialog>
</template>
