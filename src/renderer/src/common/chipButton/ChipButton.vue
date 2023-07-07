<template>
  <button
    class="flex-none py-3 pl-3 px-5 rounded-[15px] transition-all"
    :class="isSelected ? color : 'bg-white'"
  >
    <div class="flex items-center gap-x-2">
      <div class="w-11 aspect-square">
        <SvgIcon :icon="chipType" />
      </div>
      <span
        class="transition-all chip-btn-text"
        :class="isSelected ? 'text-white_ff' : 'text-dark_24'"
      >
        {{ text }}
      </span>
    </div>
  </button>
</template>

<script setup lang="ts">
// type
import { MapChipType } from '@renderer/common/chipButton/chipButtonType'
//vue
import SvgIcon from '@renderer/assets/icon/SvgIcon.vue'

interface Props {
  isSelected: boolean
  chipType: MapChipType
  text: string
  color: string
}
defineProps<Props>()
</script>

<style scoped>
button {
  box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.2);
}
</style>
