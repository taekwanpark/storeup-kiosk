<template>
  <button
    class="flex-none py-3 pl-3 px-5 rounded-[15px] transition-all"
    :class="isSelected ? color : 'bg-white'"
  >
    <div class="flex items-center gap-x-2">
      <div class="w-11 aspect-square">
        <Transition
          enter-active-class="transition ease-in duration-150"
          enter-from-class="transform opacity-50"
          enter-to-class="transform opacity-100"
          leave-active-class="transition ease-in duration-100"
          leave-from-class="transform opacity-100"
          leave-to-class="transform opacity-50"
        >
          <SvgIcon :icon="chipType" :is-selected="isSelected" />
        </Transition>
      </div>
      <span
        class="chip-btn-text transition-all whitespace-nowrap"
        :class="isSelected ? 'text-white_ff' : 'text-dark_24'"
      >
        {{ text }}
      </span>
    </div>
  </button>
</template>

<script setup lang="ts">
// type
import { MapChipType } from '@renderer/components/icon/types'
//vue
import SvgIcon from '@renderer/components/icon/SvgIcon.vue'

export interface MapChipProps {
  text: string
  chipType: MapChipType
  color: string
  isSelected?: boolean
}

defineProps<MapChipProps>()
</script>

<style scoped>
button {
  box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.2);
}

/* 
  |-------------------------------
  | chip-btn
  |------------------------------- 
  */
.chip-btn-text {
  @apply text-k6 leading-normal -tracking-normal font-medium;
}
</style>
