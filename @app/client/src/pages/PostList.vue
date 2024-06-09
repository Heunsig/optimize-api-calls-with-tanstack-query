<script setup lang="ts">
import { ref, onMounted } from 'vue';

const posts = ref<Array<{
  id: string
  title: string
  content: string
}>>([]);
onMounted(() => {
  fetch('/api/posts')
    .then((res) => res.json())
    .then((data) => {
      posts.value = data.data;
    });
})

</script>
<template>
  <div>
    <div 
      v-for="post in posts"
      :key="post.id"
    >
      <div>
        <div>
          {{ post.title }}
        </div>
        <div v-html="post.content"></div>
      </div>
    </div>
  </div>
</template>