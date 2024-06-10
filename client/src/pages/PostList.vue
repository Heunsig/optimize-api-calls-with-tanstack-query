<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getPosts } from '../api/post.api';

const posts = ref<Array<{
  id: string
  title: string
  content: string
}>>([]);


onMounted(async () => {
  posts.value = await getPosts()
})

</script>
<template>
  <div class="border">
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