<template>
  <kiosk-layout :is-main="route.name === 'home'">
    <template #contents>
      <router-view />
    </template>
  </kiosk-layout>
</template>

<script setup lang="ts">
// vue
import KioskLayout from '@renderer/components/layouts/KioskLayout.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style></style>
