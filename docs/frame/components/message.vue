<script setup>
import { ref } from 'vue'

const msg = ref('')
</script>

<template>
  <p>
    Message is: {{ msg }} <input class="message" v-model="msg" placeholder="请输入" />
  </p>
</template>

<style lang="css" scoped>
  .message {
    width: 200px;
    border: 1px solid #666;
    border-radius: 4px;
    padding: 0px 4px;
    margin-left: 20px;
  }
</style>