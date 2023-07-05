<template>
  <component :is="dynamicComponent" />
</template>

<script setup lang="ts">
import {
  IconDirectoryType,
  EtcIconType,
  MapIconType,
  CountryIconType,
  NavigationIconType,
  MapChipType
} from '@renderer/types/iconType'
import { computed, defineAsyncComponent } from 'vue'

interface Props {
  icon: EtcIconType | MapIconType | CountryIconType | NavigationIconType | MapChipType
}
const props = defineProps<Props>()
const dynamicComponent = computed(() => {
  let directory
  if (EtcIconType[props.icon] !== undefined) {
    directory = IconDirectoryType.Etc
  } else if (NavigationIconType[props.icon] !== undefined) {
    directory = IconDirectoryType.Navigation
  } else if (MapIconType[props.icon] !== undefined) {
    directory = IconDirectoryType.Map
  } else if (CountryIconType[props.icon] !== undefined) {
    directory = IconDirectoryType.Country
  } else if (MapChipType[props.icon] !== undefined) {
    directory = IconDirectoryType.MapChip
  }
  return defineAsyncComponent(() => import(`@renderer/assets/icon/${directory}/${props.icon}.vue`))
})
</script>

<style scoped></style>
