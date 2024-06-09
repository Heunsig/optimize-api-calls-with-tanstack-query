<script setup lang="ts">
function ping() {
  fetch('https://rnltd-1-235-97-71.a.free.pinggy.link/ping').then((res) => {
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

