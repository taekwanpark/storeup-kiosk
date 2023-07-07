<template>
  <KioskLayout is-main>
    <template #contents>
      <!-- video -->
      <video
        class="object-cover object-center"
        style="height: 51.5rem"
        autoplay="true"
        loop="true"
        src="../assets/videos/video_example1.mp4"
      >
        <source src="../assets/videos/video_example1.mp4" type="video/webm" />
      </video>
    </template>
  </KioskLayout>
</template>

<script setup lang="ts">
// lib
import KioskLayout from '@renderer/common/layouts/KioskLayout.vue'
</script>

<style></style>
