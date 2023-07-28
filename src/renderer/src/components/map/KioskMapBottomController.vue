<template>
  <div class="relative">
    <div class="absolute bottom-6 left-2 flex flex-col">
      <button @click="zoomIn">
        <SvgIcon :icon="MapIconType.PlusShadow" />
      </button>
      <button @click="zoomOut">
        <SvgIcon :icon="MapIconType.MinusShadow" />
      </button>
    </div>
    <div class="absolute bottom-6 right-2">
      <button @click="moveToDefault">
        <SvgIcon :icon="MapIconType.CurrentPointerShadow" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// type
import { MapIconType } from '@renderer/components/icon/types'
//vue
import SvgIcon from '@renderer/components/icon/SvgIcon.vue'

interface KioskMapBottomControllerProps {
  zoomIn: (() => void) | undefined
  zoomOut: (() => void) | undefined
  moveToDefault: (() => void) | undefined
}

defineProps<KioskMapBottomControllerProps>()
</script>

<style scoped></style>
