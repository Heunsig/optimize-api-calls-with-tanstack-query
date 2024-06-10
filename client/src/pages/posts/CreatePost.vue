<script setup lang="ts">
import { computed, ref } from "vue";
import Button from "primevue/button";
import { useRoute } from "vue-router";

const route = useRoute();
const projectIdParam = computed(() => route.params.projectId.toString());

const title = ref("");
const content = ref("");

function createPost() {
  fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title.value,
      content: content.value,
      projectId: projectIdParam.value,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    });
}
</script>
<template>
  <div>
    <div class="mb-6">
      <router-link
        :to="{
          name: 'projects/[projectId]/posts',
          params: {
            projectId: projectIdParam,
          }
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
      <input type="text" placeholder="Title" v-model="title" />
      <textarea placeholder="Content" v-model="content"></textarea>
      <!-- <button type="submit" @click="() => createPost()">Create Post</button> -->
      <Button type="submit" label="Submit" @click="createPost" />
    </form>
  </div>
</template>
