<template>
  <div class="border border-pink-500">{{ route }}</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped></style>
