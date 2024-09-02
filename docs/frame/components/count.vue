<script setup>
  import { ref } from 'vue'

  const count = ref(0)
</script>

<template>
  <p>
    Count is: {{ count }} <button class="btn" @click="count++">count++</button>
  </p>
</template>

<style lang="css" scoped>
  .btn {
    background-color: #333;
    border: 1px solid #ccc;
    padding: 0px 10px;
    border-radius: 5px;
    margin-left: 20px;
  }
</style>