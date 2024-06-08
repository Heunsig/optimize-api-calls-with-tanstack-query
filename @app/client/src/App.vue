<script setup lang="ts">
function ping() {
  fetch('http://localhost:3000/ping').then((res) => {
    return res.json();
  }).then((data) => {
    console.log(data);
  });
}
</script>
<template>
  <div>
    <h1>Hello World</h1>
    <button 
      type="button"
      @click="() => ping()"
    >Ping</button>
  </div>
</template>

