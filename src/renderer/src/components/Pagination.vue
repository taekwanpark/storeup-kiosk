<template>
  <div v-if="links?.length > 3" class="mt-10 mb-10 flex justify-center">
    <div class="flex flex-wrap -mb-1">
      <template v-for="(link, index) in links" :key="index">
        <div
          v-if="link.url === null"
          class="mr-1 mb-1 px-2 py-2 text-sm font-medium leading-4 text-zinc-400"
          v-html="link.label"
        />
        <a
          v-else
          :class="{ 'text-indigo-500 font-bold': link.active }"
          :href="link.url"
          class="mr-1 mb-1 px-2 py-2 text-sm leading-4 hover:text-indigo-500 focus:border-indigo-500 focus:text-indigo-500"
          preserve-scroll
          v-html="link.label"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  links: null
})
</script>

<style scoped></style>
