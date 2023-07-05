<template>
  <button
    class="flex-none py-3 pl-3 px-5 rounded-[15px] transition-all"
    :class="isSelected ? color : 'bg-white'"
  >
    <div class="flex items-center gap-x-2">
      <div class="w-11 aspect-square">
        <SvgIcon :icon="MapChipType[dynamicIconType]" />
      </div>
      <span
        class="transition-all"
        :class="isSelected ? 'chip-btn-text-white' : 'chip-btn-text-dark'"
      >
        {{ text }}
      </span>
    </div>
  </button>
</template>

<script setup lang="ts">
import { MapChipType, MapChipIconType } from '@renderer/types/iconType'
import SvgIcon from '@renderer/assets/icon/SvgIcon.vue'
import { computed, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted } from 'vue'

interface Props {
  isSelected: boolean
  chipType: MapChipIconType
  text: string
  color: string
}
const props = defineProps<Props>()
const dynamicIconType = computed(() => {
  let icon: string = MapChipIconType[props.chipType] as string
  if (props.isSelected) {
    icon += 'White'
  } else {
    icon += 'Color'
  }
  return MapChipType[icon]
})
onBeforeMount(() => console.log('onBeforeMount'))
onMounted(() => console.log('onMounted'))
onBeforeUnmount(() => console.log('onBeforeUnmount'))
onUnmounted(() => console.log('onUnmounted'))
</script>

<style scoped>
button {
  box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.2);
}
</style>
