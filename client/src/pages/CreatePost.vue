<script setup lang="ts">
import { ref } from 'vue';

const title = ref('');
const content = ref('');

function createPost() {
  fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title.value,
      content: content.value,
    }),
  }).then((res) => {
    return res.json();
  }).then((data) => {
    console.log(data);
  });
}
</script>
<template>
  <div>
    <form @submit.prevent>
      <input type="text" placeholder="Title" v-model="title" />
      <textarea placeholder="Content" v-model="content"></textarea>
      <button type="submit" @click="() => createPost()">Create Post</button>
    </form>
  </div>
</template>