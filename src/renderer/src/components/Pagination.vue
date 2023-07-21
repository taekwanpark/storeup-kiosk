<template>
  <div class="h-full w-full min-w-[67.5rem] flex justify-center items-center gap-x-[0.688rem]">
    <button
      class="w-9 aspect-square border border-grey_bluey_9b rounded-[0.375rem] flex items-center justify-center"
    >
      <SvgIcon :icon="PaginationIconType.ChevronDoubleLeft" />
    </button>
    <button
      class="w-9 aspect-square border border-grey_bluey_9b rounded-[0.375rem] flex items-center justify-center"
    >
      <SvgIcon :icon="PaginationIconType.ChevronLeft" />
    </button>
    <!--  -->
    <template v-for="item in [1, 2, 3, 4, 5]" :key="item">
      <button
        :class="item === 2 ? 'bg-dark_24' : 'border border-grey_bluey_9b'"
        class="w-9 aspect-square rounded-[0.375rem] flex items-center justify-center"
      >
        <span
          :class="item === 2 ? 'text-white_ff' : 'text-grey_battleship'"
          class="text-k5 font-normal tracking-[-0.3px]"
        >
          {{ item }}
        </span>
      </button>
    </template>
    <!--  -->
    <button
      class="w-9 aspect-square border border-grey_bluey_9b rounded-[0.375rem] flex items-center justify-center"
    >
      <SvgIcon :icon="PaginationIconType.ChevronRight" />
    </button>
    <button
      class="w-9 aspect-square border border-grey_bluey_9b rounded-[0.375rem] flex items-center justify-center"
    >
      <SvgIcon :icon="PaginationIconType.ChevronDoubleRight" />
    </button>
  </div>
</template>

<script setup lang="ts">
// type
import { PaginationIconType } from '@renderer/components/icon/types'
// vue
import SvgIcon from '@renderer/components/icon/SvgIcon.vue'

defineProps({
  links: null
})
</script>

<style scoped></style>
